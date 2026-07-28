import { useEffect, useRef } from 'react'

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`

/* Revela a segunda foto por um "blob" que segue o cursor, com borda líquida
   (ruído), leve refração das UVs e um aro vermelho on-brand. Vinheta funde as
   bordas no preto do site, unificando os fundos diferentes das duas fotos. */
const FRAG = `
precision mediump float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_amt;
uniform sampler2D u_base;
uniform sampler2D u_rev;

float hash(vec2 p){ p = fract(p * vec2(123.34, 345.45)); p += dot(p, p + 34.345); return fract(p.x * p.y); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  float a = hash(i), b = hash(i + vec2(1.0, 0.0)), c = hash(i + vec2(0.0, 1.0)), d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

void main(){
  vec2 uv = gl_FragCoord.xy / u_res;
  vec2 tuv = vec2(uv.x, 1.0 - uv.y);
  float agr = u_res.x / u_res.y;

  vec2 d = (uv - u_mouse) * vec2(agr, 1.0);
  float dist = length(d);

  float n = noise(uv * 6.0 + u_time * 0.15);
  float radius = 0.24 + 0.045 * sin(u_time * 0.7);
  float edge = 0.11;
  float mask = 1.0 - smoothstep(radius - edge, radius + edge, dist + (n - 0.5) * 0.07);
  mask *= u_amt;

  vec2 disp = normalize(d + 1e-5) * mask * (1.0 - mask) * 0.035;
  vec3 base = texture2D(u_base, tuv).rgb;
  vec3 rev  = texture2D(u_rev, tuv + disp).rgb;
  vec3 col = mix(base, rev, mask);

  // aro brasa (âmbar) na transição do blob
  float rim = smoothstep(0.0, 0.45, mask) * (1.0 - smoothstep(0.45, 0.95, mask));
  col += vec3(1.0, 0.35, 0.12) * rim * 0.6;

  // vinheta suave (funde bordas no preto)
  float r = distance(uv, vec2(0.5, 0.44));
  col *= smoothstep(1.02, 0.30, r);

  gl_FragColor = vec4(col, 1.0);
}
`

type Props = { base: string; reveal: string; className?: string }

/**
 * Retrato interativo nativo (WebGL puro, sem dependências). Uma <img> da foto
 * base fica por baixo: se a GPU falhar, o canvas some e a foto continua ali.
 * No desktop o blob segue o mouse; no toque, percorre um caminho lento sozinho.
 */
export default function InteractivePortrait({ base, reveal, className = '' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.style.display = '' // reverte um bail anterior (ex.: remontagem em dev)
    const bail = () => {
      canvas.style.display = 'none'
    }
    const gl = canvas.getContext('webgl', { antialias: false, alpha: true, premultipliedAlpha: false })
    if (!gl) return bail()

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!
      gl.shaderSource(s, src)
      gl.compileShader(s)
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) return null
      return s
    }
    const vs = compile(gl.VERTEX_SHADER, VERT)
    const fs = compile(gl.FRAGMENT_SHADER, FRAG)
    if (!vs || !fs) return bail()
    const prog = gl.createProgram()!
    gl.attachShader(prog, vs)
    gl.attachShader(prog, fs)
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return bail()
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'a_pos')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(prog, 'u_res')
    const uTime = gl.getUniformLocation(prog, 'u_time')
    const uMouse = gl.getUniformLocation(prog, 'u_mouse')
    const uAmt = gl.getUniformLocation(prog, 'u_amt')

    // Texturas (NPOT: CLAMP + LINEAR, sem mipmap)
    const makeTex = (unit: number) => {
      const tex = gl.createTexture()
      gl.activeTexture(gl.TEXTURE0 + unit)
      gl.bindTexture(gl.TEXTURE_2D, tex)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
      // 1px transparente até a imagem carregar
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 0]))
      return tex
    }
    const texBase = makeTex(0)
    const texRev = makeTex(1)
    gl.uniform1i(gl.getUniformLocation(prog, 'u_base'), 0)
    gl.uniform1i(gl.getUniformLocation(prog, 'u_rev'), 1)

    let loaded = 0
    const load = (url: string, unit: number, tex: WebGLTexture) => {
      const img = new Image()
      img.onload = () => {
        gl.activeTexture(gl.TEXTURE0 + unit)
        gl.bindTexture(gl.TEXTURE_2D, tex)
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img)
        loaded++
      }
      img.src = url
    }
    load(base, 0, texBase)
    load(reveal, 1, texRev)

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      const w = Math.max(1, Math.floor(parent.clientWidth * dpr))
      const h = Math.max(1, Math.floor(parent.clientHeight * dpr))
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
        gl.viewport(0, 0, w, h)
      }
    }
    resize()
    const ro = new ResizeObserver(resize)
    if (canvas.parentElement) ro.observe(canvas.parentElement)

    // Alvo do blob: cursor quando ativo; caminho lento quando ocioso/toque
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const target = { x: 0.5, y: 0.55 }
    const cur = { x: 0.5, y: 0.55 }
    let pointerActive = false
    let lastMove = -9999

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      target.x = (e.clientX - r.left) / r.width
      target.y = 1 - (e.clientY - r.top) / r.height
      pointerActive = true
      lastMove = performance.now()
    }
    const onLeave = () => {
      pointerActive = false
    }
    const host = canvas.parentElement
    if (canHover && host) {
      host.addEventListener('pointermove', onMove)
      host.addEventListener('pointerleave', onLeave)
    }

    let raf = 0
    const t0 = performance.now()
    const draw = () => {
      resize()
      const now = performance.now()
      const t = (now - t0) / 1000

      // Caminho automático (Lissajous suave)
      const idle = {
        x: 0.5 + 0.26 * Math.sin(t * 0.55),
        y: 0.52 + 0.16 * Math.sin(t * 0.9 + 1.3),
      }
      // Se o ponteiro não se move há 1,8s, volta ao caminho automático
      const useIdle = !pointerActive || now - lastMove > 1800
      const tx = useIdle ? idle.x : target.x
      const ty = useIdle ? idle.y : target.y
      cur.x += (tx - cur.x) * 0.08
      cur.y += (ty - cur.y) * 0.08

      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform1f(uTime, t)
      gl.uniform2f(uMouse, cur.x, cur.y)
      gl.uniform1f(uAmt, Math.min(1, loaded / 2))
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      if (canHover && host) {
        host.removeEventListener('pointermove', onMove)
        host.removeEventListener('pointerleave', onLeave)
      }
      // Nota: NÃO chamamos loseContext() aqui — em dev (StrictMode remonta o
      // efeito) isso derrubava o contexto reaproveitado pela 2ª montagem.
    }
  }, [base, reveal])

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Fallback: a foto base fica por baixo; se o WebGL falhar, permanece */}
      <img
        src={base}
        alt="Paulo Pires"
        className="absolute inset-0 h-full w-full object-cover object-top"
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      />
    </div>
  )
}

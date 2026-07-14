import { useEffect, useRef } from 'react'

const VERT = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`

/* Gradiente orgânico fluindo — camadas de ondas (fbm barato) na paleta
   vinho/terracota, com vinheta pra fundir no preto do site. */
const FRAG = `
precision mediump float;
uniform vec2 u_res;
uniform float u_time;

float n(vec2 p) { return sin(p.x) * sin(p.y); }

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  vec2 p = uv * 3.0;
  p.x *= u_res.x / u_res.y;
  float t = u_time * 0.06;

  float v = 0.0;
  v += 0.50 * n(p + vec2(t, -t * 0.7));
  v += 0.25 * n(p * 2.1 + vec2(-t * 1.3, t));
  v += 0.125 * n(p * 4.3 + vec2(t * 0.8, t * 1.1));
  v = v * 0.5 + 0.5;

  vec3 deep = vec3(0.055, 0.038, 0.034);
  vec3 wine = vec3(0.40, 0.15, 0.13);
  vec3 terra = vec3(0.70, 0.38, 0.24);

  vec3 col = mix(deep, wine, smoothstep(0.22, 0.78, v));
  col = mix(col, terra, smoothstep(0.78, 0.97, v) * 0.30);

  float d = distance(uv, vec2(0.5, 0.42));
  col *= 1.0 - d * 0.6;

  gl_FragColor = vec4(col, 1.0);
}
`

/**
 * Fundo WebGL real: shader de gradiente quente que flui sozinho.
 * Sem dependências (WebGL puro), leve, com limpeza correta do contexto.
 */
export default function ShaderBackdrop({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    // Se qualquer etapa falhar na GPU, escondemos o canvas — o fundo
    // escuro normal do site permanece (nunca mostrar superfície "crua").
    const bail = () => {
      canvas.style.display = 'none'
    }
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false })
    if (!gl) return bail()

    // Limpa imediatamente para o tom do fundo: mesmo antes do 1º frame,
    // a superfície nunca fica com memória não inicializada (cinza/branco).
    gl.clearColor(0.07, 0.047, 0.043, 1)
    gl.clear(gl.COLOR_BUFFER_BIT)

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

    canvas.addEventListener('webglcontextlost', bail)

    // Triângulo que cobre a tela inteira
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'a_pos')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(prog, 'u_res')
    const uTime = gl.getUniformLocation(prog, 'u_time')

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
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

    let raf = 0
    const t0 = performance.now()
    const draw = () => {
      resize() // barato: só realoca quando as medidas mudam
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform1f(uTime, (performance.now() - t0) / 1000)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [])

  return <canvas ref={ref} className={className} aria-hidden="true" />
}

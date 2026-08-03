import { useEffect, useRef } from 'react'
import { Renderer, Program, Mesh, Color, Triangle } from 'ogl'

type Variant = 'dark' | 'red' | 'light'

/** Cores do "aurora" (ramp da esquerda p/ direita) por tipo de fundo. */
const STOPS: Record<Variant, [string, string, string]> = {
  // Simétrico e na mesma família de vermelho (cores da marca) para combinar.
  dark: ['#B00C22', '#FF3B2A', '#B00C22'],
  red: ['#9c0a1c', '#FF7A5C', '#9c0a1c'],
  light: ['#FBDAD3', '#FF7F66', '#FBDAD3'],
}

const VERT = `#version 300 es
in vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }`

const FRAG = `#version 300 es
precision highp float;
uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;
out vec4 fragColor;

vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m; m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

struct ColorStop { vec3 color; float position; };

#define COLOR_RAMP(colors, factor, finalColor) {              \
  int index = 0;                                              \
  for (int i = 0; i < 2; i++) {                               \
     ColorStop currentColor = colors[i];                      \
     bool isInBetween = currentColor.position <= factor;      \
     index = int(mix(float(index), float(i), float(isInBetween))); \
  }                                                           \
  ColorStop currentColor = colors[index];                     \
  ColorStop nextColor = colors[index + 1];                    \
  float range = nextColor.position - currentColor.position;   \
  float lerpFactor = (factor - currentColor.position) / range; \
  finalColor = mix(currentColor.color, nextColor.color, lerpFactor); \
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  uv.y = 1.0 - uv.y; // brilho no rodapé (topo livre para o título)

  ColorStop colors[3];
  colors[0] = ColorStop(uColorStops[0], 0.0);
  colors[1] = ColorStop(uColorStops[1], 0.5);
  colors[2] = ColorStop(uColorStops[2], 1.0);

  vec3 rampColor;
  COLOR_RAMP(colors, uv.x, rampColor);

  float height = snoise(vec2(uv.x * 2.0 + uTime * 0.1, uTime * 0.25)) * 0.5 * uAmplitude;
  height = exp(height);
  height = (uv.y * 2.0 - height + 0.2);
  float intensity = 0.6 * height;

  float midPoint = 0.20;
  float alpha = smoothstep(midPoint - uBlend * 0.5, midPoint + uBlend * 0.5, intensity);

  fragColor = vec4(rampColor * alpha, alpha);
}`

/**
 * Fundo animado "Aurora" (shader WebGL via OGL — o mesmo efeito do componente
 * "Floating Animation"/Aurora do Framer). Imperativo, sem hooks de biblioteca
 * (não dá o erro de "Invalid hook call"). Pausa quando sai da tela.
 */
export default function AnimatedGradient({ variant = 'dark' }: { variant?: Variant }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctn = ref.current
    if (!ctn) return

    const renderer = new Renderer({ alpha: true, premultipliedAlpha: true, antialias: true })
    const gl = renderer.gl
    gl.clearColor(0, 0, 0, 0)
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
    gl.canvas.style.backgroundColor = 'transparent'
    gl.canvas.style.width = '100%'
    gl.canvas.style.height = '100%'

    const geometry = new Triangle(gl)
    if (geometry.attributes.uv) delete (geometry.attributes as Record<string, unknown>).uv

    const stops = STOPS[variant].map((hex) => {
      const c = new Color(hex)
      return [c.r, c.g, c.b]
    })

    const program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uAmplitude: { value: 1.0 },
        uColorStops: { value: stops },
        uResolution: { value: [ctn.offsetWidth, ctn.offsetHeight] },
        uBlend: { value: 0.5 },
      },
    })
    const mesh = new Mesh(gl, { geometry, program })
    ctn.appendChild(gl.canvas)

    const resize = () => {
      const w = ctn.offsetWidth
      const h = ctn.offsetHeight
      renderer.setSize(w, h)
      program.uniforms.uResolution.value = [w, h]
    }
    const ro = new ResizeObserver(resize)
    ro.observe(ctn)
    resize()

    let raf = 0
    let running = false
    const update = (t: number) => {
      raf = requestAnimationFrame(update)
      program.uniforms.uTime.value = t * 0.001 * 0.4
      renderer.render({ scene: mesh })
    }
    const start = () => {
      if (running) return
      running = true
      raf = requestAnimationFrame(update)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }
    // Só anima quando a seção está visível.
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), {
      rootMargin: '120px',
    })
    io.observe(ctn)

    return () => {
      stop()
      ro.disconnect()
      io.disconnect()
      if (gl.canvas.parentElement === ctn) ctn.removeChild(gl.canvas)
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [variant])

  return <div ref={ref} className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" />
}

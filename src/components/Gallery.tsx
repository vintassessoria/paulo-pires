import { motion } from 'framer-motion'
import { Sparkles, Trophy, Music2 } from 'lucide-react'

/**
 * Seção Destaque — Foto do Paulo na lateral acompanhada por resumo biográfico e conquistas.
 */
export default function Gallery() {
  return (
    <section id="fotos" className="relative isolate overflow-hidden bg-black py-20 sm:py-28">
      <div className="container-pp">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12"
        >
          {/* Foto na lateral */}
          <div className="lg:col-span-5">
            <div className="group relative overflow-hidden rounded-3xl border border-white/15 bg-coal shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
              <img
                src="/images/paulo-single.jpg"
                alt="Paulo Pires"
                className="h-[420px] w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 sm:h-[500px]"
              />
            </div>
          </div>

          {/* Texto Biográfico na outra lateral */}
          <div className="text-left lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-gold-light">
              <Sparkles className="h-3.5 w-3.5" />
              Trajetória &amp; História
            </span>

            <h2 className="mt-4 font-display text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
              A força do sertanejo e a voz dos maiores sucessos.
            </h2>

            <p className="mt-5 text-base leading-relaxed text-cream/80 sm:text-lg">
              Goiano e apaixonado pela arte de criar, Paulo Pires tornou-se um dos nomes mais influentes da música brasileira. Além de assinar composições gravadas por mais de 80% dos grandes artistas nacionais — como Marília Mendonça, Gusttavo Lima e Maiara &amp; Maraisa —, conquistou o país como intérprete do mega hit <strong className="text-white">“Ameaça”</strong>.
            </p>

            {/* Destaques em cards rápidos */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3.5 rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold-light">
                  <Trophy className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-heading text-sm font-bold text-white">4x Diamante</h4>
                  <p className="mt-0.5 text-xs text-cream/60">Certificação oficial com a faixa “Ameaça”.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold-light">
                  <Music2 className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-heading text-sm font-bold text-white">+80% do Sertanejo</h4>
                  <p className="mt-0.5 text-xs text-cream/60">Gravações pelos maiores artistas do país.</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <a href="#biografia" className="btn-gold">
                Ler biografia completa
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

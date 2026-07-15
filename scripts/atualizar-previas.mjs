/**
 * Atualiza as URLs de capa e prévia das composições em src/data/site.ts.
 *
 *   node scripts/atualizar-previas.mjs
 *
 * Por que isto existe: o site não consulta a busca do iTunes em tempo real.
 * Ela falha em parte dos celulares (a Apple limita requisições por IP, e as
 * operadoras colocam milhares de aparelhos atrás do mesmo IP), o que deixava
 * músicas mudas. As URLs ficam fixas no site.ts e este script as renova.
 *
 * Rode ao adicionar/trocar uma música, ou se alguma prévia parar de tocar.
 */
import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const arquivo = resolve(raiz, 'src/data/site.ts')

const buscar = async (song, artist) => {
  const term = encodeURIComponent(`${song} ${artist.split(',')[0]}`)
  const url = `https://itunes.apple.com/search?term=${term}&media=music&entity=song&limit=1&country=BR`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  // A API responde como text/javascript, então o .json() do fetch não serve
  const r = JSON.parse(await res.text()).results?.[0]
  if (!r) throw new Error('sem resultado')
  return {
    cover: r.artworkUrl100?.replace('100x100', '600x600'),
    preview: r.previewUrl,
    encontrado: `${r.trackName} — ${r.artistName}`,
  }
}

const fonte = await readFile(arquivo, 'utf8')

// Lê os pares song/artist já declarados no site.ts
const bloco = fonte.match(/export const compositions[\s\S]*?\n\]\n/)
if (!bloco) {
  console.error('Não encontrei o bloco `compositions` em src/data/site.ts')
  process.exit(1)
}
const musicas = [...bloco[0].matchAll(/song: '([^']+)',\s*\n\s*artist: '([^']+)'/g)].map(
  (m) => ({ song: m[1], artist: m[2] }),
)

if (!musicas.length) {
  console.error('Não consegui ler nenhuma música do bloco `compositions`')
  process.exit(1)
}

let saida = fonte
let falhas = 0

for (const { song, artist } of musicas) {
  try {
    const { cover, preview, encontrado } = await buscar(song, artist)
    // Troca cover/preview apenas dentro do objeto desta música
    const alvo = new RegExp(
      `(song: '${song.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}',[\\s\\S]{0,600}?)` +
        `cover:\\s*\\n?\\s*'[^']*',(\\s*\\n\\s*)preview:\\s*\\n?\\s*'[^']*',`,
    )
    if (!alvo.test(saida)) {
      console.log(`?  ${song.padEnd(24)} não achei os campos para substituir`)
      falhas++
      continue
    }
    saida = saida.replace(alvo, `$1cover:\n      '${cover}',$2preview:\n      '${preview}',`)
    console.log(`ok ${song.padEnd(24)} ${encontrado}`)
  } catch (e) {
    console.log(`!  ${song.padEnd(24)} ${e.message}`)
    falhas++
  }
}

if (saida !== fonte) {
  await writeFile(arquivo, saida)
  console.log('\nsrc/data/site.ts atualizado.')
} else {
  console.log('\nNada mudou.')
}
if (falhas) {
  console.log(`${falhas} música(s) precisam de ajuste manual.`)
  process.exit(1)
}

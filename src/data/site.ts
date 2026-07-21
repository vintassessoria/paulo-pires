/**
 * ============================================================
 *  CONTEÚDO DO SITE — PAULO PIRES
 * ============================================================
 *  Centralizamos aqui TODOS os textos, números, links e dados
 *  que mudam com o tempo. Para atualizar o site, basta editar
 *  os valores deste arquivo — sem mexer no restante do código.
 * ============================================================
 */

/* ---------- Contato comercial ---------- */
export const contact = {
  // Número exibido na tela (formatação livre)
  whatsappDisplay: '(61) 98348-6282',
  // Apenas dígitos, com código do país (55) + DDD + número, para o link wa.me
  whatsappDigits: '5561983486282',
  whatsappMessage:
    'Olá! Gostaria de informações para contratar o show do Paulo Pires.',
  email: 'paulipirescantor@gmail.com',
}

export const whatsappLink = `https://wa.me/${contact.whatsappDigits}?text=${encodeURIComponent(
  contact.whatsappMessage,
)}`

export const mailtoLink = `mailto:${contact.email}?subject=${encodeURIComponent(
  'Contratação de show — Paulo Pires',
)}`

/* ---------- Redes sociais e plataformas ---------- */
export const socials = {
  spotify: 'https://open.spotify.com/artist/3whgFbrRxsOmYVrq3t4hCY',
  youtube: 'https://www.youtube.com/@PauloPiresofc',
  instagram: 'https://instagram.com/paulopirescantor',
  tiktok: 'https://www.tiktok.com/@paulopirescantor',
}

// ID do artista no Spotify (usado no player incorporado)
export const spotifyArtistId = '3whgFbrRxsOmYVrq3t4hCY'

/* ---------- Conquista de destaque (número-síntese) ----------
 * Um total só, somando as plataformas — pedido do artista para condensar
 * os antigos quatro cards (execuções do “Ameaça”, certificação Triplo
 * Diamante, Top 1 Spotify Brasil e Top 200 Global). É um array de um item
 * porque a home ainda percorre `achievements` (cartão de destaque + rotador
 * “Em alta” no hero); para voltar a ter vários, basta acrescentar objetos. */
export const achievements = [
  {
    value: '+925 milhões',
    label: 'de execuções',
    sub: 'somando Spotify e YouTube',
  },
]

/* ---------- Números de redes (fácil de atualizar) ---------- */
export const socialStats = [
  { platform: 'Spotify', value: '+2 milhões', label: 'ouvintes mensais' },
  { platform: 'YouTube', value: '+550 mil', label: 'inscritos' },
  { platform: 'Instagram', value: '+464 mil', label: 'seguidores' },
]

/* ---------- Linha do tempo (biografia) ---------- */
export const timeline = [
  { year: '1986', title: 'Nascimento em Goiás', text: 'Uma infância cercada de música e influências de família e amigos.' },
  { year: '12 anos', title: 'Início na música', text: 'Entra para sua primeira banda e dá os primeiros passos no palco.' },
  { year: '19 anos', title: 'Início como compositor', text: 'Começa a carreira de compositor no meio secular.' },
  { year: '2013', title: 'Carreira solo', text: 'Grava seu primeiro CD e se dedica integralmente à composição.' },
  { year: '—', title: 'Grandes composições nacionais', text: 'Assina sucessos gravados pelos maiores nomes do país.' },
  { year: '2020', title: 'Retomada como cantor', text: 'Volta aos palcos ao lado da Best Produções Artísticas.' },
  { year: '2021', title: 'Sucesso de “Ameaça”', text: 'Triplo Diamante, Top 1 do Spotify Brasil e Top 200 Global.' },
]

/* ---------- Composições (hits assinados por Paulo Pires) ---------- */
// `cover` é opcional: ao colocar a imagem no caminho indicado, ela aparece
// automaticamente no coverflow (enquanto não existir, mostra o placeholder).
/* ---------- Composições ----------
 * `cover` (capa) e `preview` (prévia de 30s) apontam direto para a CDN da
 * Apple e ficam fixos aqui de propósito: o site NÃO consulta a busca do
 * iTunes em tempo real. Aquela busca falhava em parte dos celulares — a
 * Apple limita requisições por IP, e as operadoras põem milhares de
 * aparelhos atrás do mesmo IP —, então uma parte das músicas ficava sem som.
 *
 * Para trocar uma música (ou se a Apple mudar alguma URL), rode:
 *   node scripts/atualizar-previas.mjs
 * que rebusca tudo e reescreve os dois campos abaixo.
 */
export const compositions: {
  song: string
  artist: string
  cover?: string
  preview?: string
}[] = [
  {
    song: 'Ciumeira',
    artist: 'Marília Mendonça',
    cover:
      'https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/0e/3b/e6/0e3be64d-5995-09bb-9532-6f23ac696eef/7891430304270.jpg/600x600bb.jpg',
    preview:
      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/b2/4f/d3/b24fd3f9-58d9-2b25-b67a-251b3397236e/mzaf_6814259644343346011.plus.aac.p.m4a',
  },
  {
    song: 'Homem de Família',
    artist: 'Gusttavo Lima',
    cover:
      'https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/f5/fe/bf/f5febf1c-d6cb-ec8b-dadf-e42be13cd64e/196589312891.jpg/600x600bb.jpg',
    preview:
      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview122/v4/df/ea/bf/dfeabfab-e796-d438-1b0f-55457d56347d/mzaf_9886894401197650929.plus.aac.p.m4a',
  },
  {
    song: 'Não Deixo Não',
    artist: 'Mano Walter',
    cover:
      'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/f1/16/e7/f116e74a-0840-ec6f-b625-21839c90e234/7891430345778.jpg/600x600bb.jpg',
    preview:
      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/c1/60/d9/c160d9a8-3d19-7b0b-e24b-14b42ba618e9/mzaf_1786255163786465891.plus.aac.p.m4a',
  },
  {
    song: 'Sorte Que Cê Beija Bem',
    artist: 'Maiara & Maraisa',
    cover:
      'https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/d1/30/5e/d1305efd-80d1-ff59-24ad-5f7e4271f25c/7891430143374.jpg/600x600bb.jpg',
    preview:
      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/51/36/83/51368346-5b17-dd3a-2167-e8e01ad9b439/mzaf_14778188693732695191.plus.aac.p.m4a',
  },
  {
    song: 'Amor Atual',
    artist: 'Henrique & Juliano',
    cover:
      'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/57/d2/07/57d20750-4ea6-1c16-22dd-9774475ee279/00602438598663_Cover.jpg/600x600bb.jpg',
    preview:
      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/c1/6e/19/c16e192e-d197-a88a-83b9-01b743a6cd83/mzaf_15568305507636470932.plus.aac.p.m4a',
  },
  {
    song: 'Rapariga Não',
    artist: 'João Neto & Frederico, Simone & Simaria',
    cover:
      'https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/85/7f/dc/857fdc16-057e-c4c3-c823-505937b0c6af/7891430185572.jpg/600x600bb.jpg',
    preview:
      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/c3/cb/5c/c3cb5c9a-8578-9c28-62d1-0709ff129f37/mzaf_2589662222899953218.plus.aac.p.m4a',
  },
]

/* ---------- Agenda de shows ----------
 * Sem datas confirmadas no momento. Para divulgar um show,
 * adicione um objeto ao array abaixo seguindo o exemplo:
 *
 *   { date: '2025-08-15', city: 'Goiânia', state: 'GO',
 *     venue: 'Arena Goiânia', ticketUrl: 'https://...' }
 *
 * A seção mostra automaticamente o estado "Agenda em atualização"
 * enquanto este array estiver vazio.
 */
export const shows: {
  date: string
  city: string
  state: string
  venue: string
  ticketUrl?: string
}[] = []

/* ---------- Tipos de evento (seção de contratação) ---------- */
export const eventTypes = [
  'Shows',
  'Eventos corporativos',
  'Festas públicas',
  'Rodeios',
  'Festivais',
  'Casas de show',
]

/* ---------- Galeria de fotos ----------
 * Para trocar/adicionar fotos, coloque os arquivos em /public/images
 * e ajuste os caminhos abaixo. */
/* ---------- Navegação ---------- */
export const navLinks = [
  { label: 'Início', href: '#inicio' },
  { label: 'Músicas', href: '#musicas' },
  { label: 'Biografia', href: '#biografia' },
  { label: 'Composições', href: '#composicoes' },
  { label: 'Agenda', href: '#agenda' },
  { label: 'Contrate', href: '#contrate' },
]

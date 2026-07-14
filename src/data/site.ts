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
  whatsappDisplay: '(61) 8348-6282',
  // Apenas dígitos, com código do país (55) + DDD + número, para o link wa.me
  // ⚠️ Se o WhatsApp não abrir, confira se falta o "9" inicial do celular.
  whatsappDigits: '556183486282',
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

/* ---------- Conquistas / autoridade (cards de destaque) ---------- */
export const achievements = [
  {
    value: '+650 milhões',
    label: 'de execuções',
    sub: 'com o hit “Ameaça”',
  },
  {
    value: 'Triplo Diamante',
    label: 'certificação',
    sub: 'conquistada com “Ameaça”',
  },
  {
    value: 'Top 1',
    label: 'Spotify Brasil',
    sub: 'sucesso nacional nas plataformas',
  },
  {
    value: 'Top 200',
    label: 'Global',
    sub: 'alcance internacional',
  },
]

/* ---------- Números de redes (fácil de atualizar) ---------- */
export const socialStats = [
  { platform: 'Spotify', value: '2 milhões', label: 'ouvintes mensais' },
  { platform: 'YouTube', value: '505 mil', label: 'inscritos' },
  { platform: 'Instagram', value: '283 mil', label: 'seguidores' },
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
export const compositions: { song: string; artist: string; cover?: string }[] = [
  { song: 'Ciumeira', artist: 'Marília Mendonça', cover: '/images/covers/ciumeira.jpg' },
  { song: 'Homem de Família', artist: 'Gusttavo Lima', cover: '/images/covers/homem-de-familia.jpg' },
  { song: 'Não Deixo Não', artist: 'Mano Walter', cover: '/images/covers/nao-deixo-nao.jpg' },
  { song: 'Sorte Que Cê Beija Bem', artist: 'Maiara & Maraisa', cover: '/images/covers/sorte-que-ce-beija-bem.jpg' },
  { song: 'Amor Atual', artist: 'Henrique & Juliano', cover: '/images/covers/amor-atual.jpg' },
  { song: 'Rapariga Não', artist: 'João Neto & Frederico, Simone & Simaria', cover: '/images/covers/rapariga-nao.jpg' },
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
export const galleryPhotos = [
  { src: '/images/gallery-1.jpg', alt: 'Paulo Pires — retrato' },
  { src: '/images/gallery-2.jpg', alt: 'Paulo Pires — retrato' },
  { src: '/images/gallery-3.jpg', alt: 'Paulo Pires — retrato' },
  { src: '/images/gallery-4.jpg', alt: 'Paulo Pires — retrato' },
]

/* ---------- Navegação ---------- */
export const navLinks = [
  { label: 'Início', href: '#inicio' },
  { label: 'Músicas', href: '#musicas' },
  { label: 'Biografia', href: '#biografia' },
  { label: 'Composições', href: '#composicoes' },
  { label: 'Agenda', href: '#agenda' },
  { label: 'Contrate', href: '#contrate' },
]

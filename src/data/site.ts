/**
 * ============================================================
 *  CONTEÚDO DO SITE — PAULO PIRES
 * ============================================================
 *  Todos os textos, números, links e dados que mudam com o
 *  tempo ficam aqui. Para atualizar o site, edite este arquivo.
 *
 *  Base: Mídia Kit oficial 2026 (v2).
 * ============================================================
 */

/* ---------- Contato comercial ---------- */
export const contact = {
  // Número exibido na tela (formatação livre)
  whatsappDisplay: '(61) 98348-6282',
  // Só dígitos: país (55) + DDD (61) + celular de 9 dígitos, para o wa.me
  whatsappDigits: '5561983486282',
  whatsappMessage:
    'Olá! Gostaria de informações para contratar o show do Paulo Pires.',
  // E-mail correto conforme o mídia kit (paulo, não "pauli")
  email: 'paulopirescantor@gmail.com',
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

/* ---------- Destaques rotativos do hero ("Em alta") ---------- */
export const achievements = [
  { value: '4x Diamante', label: 'certificação', sub: 'com o hit “Ameaça”' },
  { value: '+650 milhões', label: 'de streams', sub: 'só em “Ameaça”' },
  { value: '+80%', label: 'do sertanejo', sub: 'já gravou uma música sua' },
]

/* ---------- Números de redes (mídia kit 2026) ---------- */
export const socialStats = [
  { platform: 'Instagram', value: '+445 mil', label: 'seguidores' },
  { platform: 'Spotify', value: '+2,3 milhões', label: 'ouvintes mensais' },
  { platform: 'TikTok', value: '+205 mil', label: 'seguidores' },
  { platform: 'YouTube', value: '+566 mil', label: 'inscritos' },
]

/* ---------- Público / audiência (para contratantes) ---------- */
export const audience = {
  gender: { women: '39,7%', men: '60,3%' },
  // Principais faixas etárias (% do público)
  ageRanges: [
    { range: '13-17', pct: 1.2 },
    { range: '18-24', pct: 14.5 },
    { range: '25-34', pct: 44.6 },
    { range: '35-44', pct: 24.5 },
    { range: '45-54', pct: 10.0 },
    { range: '55-64', pct: 3.6 },
    { range: '65+', pct: 1.5 },
  ],
  cities: [
    'São Paulo · SP',
    'Goiânia · GO',
    'Belo Horizonte · MG',
    'Campinas · SP',
    'Curitiba · PR',
  ],
}

/* ---------- As Mais Ouvidas (hits do Paulo como ARTISTA) ----------
 * Capa e prévia fixas da CDN da Apple (o site não consulta a busca do
 * iTunes em tempo real — ela falhava em parte dos celulares). Para
 * atualizar, rode: node scripts/atualizar-previas.mjs */
export const topSongs: {
  title: string
  credit: string
  streams: string
  badge?: string
  cover: string
  preview?: string
}[] = [
  { title: 'Ameaça', credit: 'part. MC Danny e Marcynho Sensação', streams: '+650 milhões', badge: '4x Diamante',
    cover: 'https://is1-ssl.mzstatic.com/image/thumb/Music123/v4/e7/8b/5c/e78b5cbd-04c5-f349-6bc4-361a63a91af9/8445824076237_cover.jpg/600x600bb.jpg',
    preview: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview123/v4/5f/80/55/5f80555d-567c-fc47-e934-e54124b19b66/mzaf_6945942457561514816.plus.aac.p.m4a' },
  { title: 'Pane no Sistema', credit: 'Grego & Paulo Pires', streams: '+196 milhões',
    cover: 'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/bd/e0/81/bde0810c-265b-7681-5f20-d15e9060e842/cover.jpg/600x600bb.jpg',
    preview: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/7e/85/c2/7e85c2de-d0ea-df04-4afe-2fd7ac8a94ad/mzaf_14661804878196672242.plus.aac.p.m4a' },
  { title: 'Maloqueiro', credit: 'Natanzinho Lima & Paulo Pires · ao vivo', streams: '+51 milhões',
    cover: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/47/99/1d/47991d6e-5322-c4cd-bbe5-9bdbc25233a4/8721416112157.jpg/600x600bb.jpg',
    preview: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/8f/8c/47/8f8c47e1-a511-a5a1-6447-e10d58e8c7d3/mzaf_3165059774540793450.plus.aac.p.m4a' },
  { title: 'Princesinha', credit: 'Paulo Pires, Max e Luan', streams: '+19,3 milhões',
    cover: 'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/0a/eb/0c/0aeb0c3b-ccd1-ef98-9382-4c889350e6ec/195729275959_cover.jpg/600x600bb.jpg',
    preview: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/2d/33/0e/2d330ec7-c5ad-db0e-3719-f1efa86263e0/mzaf_17010888961089822517.plus.aac.p.m4a' },
  { title: 'De Pisadinha em Pisadinha', credit: 'Paulo Pires', streams: '+17,5 milhões',
    cover: 'https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/f8/d8/18/f8d818a3-49b4-146c-7c33-9ec9614ea13f/7892920098907_cover.jpg/600x600bb.jpg',
    preview: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview124/v4/80/09/a0/8009a00c-deb4-995d-b149-cb14f037817f/mzaf_5765540997049797610.plus.aac.p.m4a' },
  { title: 'Apaixonado Nela', credit: 'Paulo Pires, Diego & Ray e outros', streams: '+16,8 milhões',
    cover: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/14/55/16/14551606-4bcd-17d0-50de-ebe02ca74333/198937814989_cover.jpg/600x600bb.jpg',
    preview: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/1c/50/03/1c5003de-ca34-5ad9-a21f-b760349d2d22/mzaf_16985966000371024043.plus.aac.p.m4a' },
]

/* ---------- Composições em destaque (1 hit por artista, tocáveis) ----------
 * Alimentam o coverflow/player. Capa e prévia fixas da CDN da Apple. */
export const compositions: {
  song: string
  artist: string
  cover?: string
  preview?: string
}[] = [
  { song: 'Homem de Família', artist: 'Gusttavo Lima',
    cover: 'https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/f5/fe/bf/f5febf1c-d6cb-ec8b-dadf-e42be13cd64e/196589312891.jpg/600x600bb.jpg',
    preview: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview122/v4/df/ea/bf/dfeabfab-e796-d438-1b0f-55457d56347d/mzaf_9886894401197650929.plus.aac.p.m4a' },
  { song: 'Ciumeira', artist: 'Marília Mendonça',
    cover: 'https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/0e/3b/e6/0e3be64d-5995-09bb-9532-6f23ac696eef/7891430304270.jpg/600x600bb.jpg',
    preview: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/b2/4f/d3/b24fd3f9-58d9-2b25-b67a-251b3397236e/mzaf_6814259644343346011.plus.aac.p.m4a' },
  { song: 'Sorte Que Cê Beija Bem', artist: 'Maiara & Maraisa',
    cover: 'https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/d1/30/5e/d1305efd-80d1-ff59-24ad-5f7e4271f25c/7891430143374.jpg/600x600bb.jpg',
    preview: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/51/36/83/51368346-5b17-dd3a-2167-e8e01ad9b439/mzaf_14778188693732695191.plus.aac.p.m4a' },
  { song: 'Não Deixo Não', artist: 'Mano Walter',
    cover: 'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/f1/16/e7/f116e74a-0840-ec6f-b625-21839c90e234/7891430345778.jpg/600x600bb.jpg',
    preview: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/c1/60/d9/c160d9a8-3d19-7b0b-e24b-14b42ba618e9/mzaf_1786255163786465891.plus.aac.p.m4a' },
  { song: 'Lua', artist: 'Ana Castela, Hungria e Alok',
    cover: 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/c1/48/48/c14848af-ef9a-3ed7-3ef0-54da1ff18dbd/8721056665624.png/600x600bb.jpg',
    preview: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/c6/b0/24/c6b024a5-e55a-0900-06d7-2554a2a6db8f/mzaf_1098652669412056320.plus.aac.p.m4a' },
  { song: 'Mulher Também Trai', artist: 'João Neto & Frederico',
    cover: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/3c/bf/df/3cbfdf5e-2baa-1496-dba8-1b921993903f/0.jpg/600x600bb.jpg',
    preview: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/0f/b8/53/0fb85319-0be3-b1aa-9fb1-6d0b5d6bf03c/mzaf_8156581367006585486.plus.aac.p.m4a' },
  { song: 'Amor Atual', artist: 'Henrique & Juliano',
    cover: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/57/d2/07/57d20750-4ea6-1c16-22dd-9774475ee279/00602438598663_Cover.jpg/600x600bb.jpg',
    preview: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/c1/6e/19/c16e192e-d197-a88a-83b9-01b743a6cd83/mzaf_15568305507636470932.plus.aac.p.m4a' },
  { song: 'Enquanto Eu Brindo, Cê Chora', artist: 'Bruno & Marrone',
    cover: 'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/52/ec/2a/52ec2a55-6bc0-968e-2ab3-fde461319c15/17UM1IM05810.rgb.jpg/600x600bb.jpg',
    preview: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/3c/80/87/3c8087b9-f96a-2608-2ba7-52c16c703e71/mzaf_7469140087145405154.plus.aac.p.m4a' },
  { song: 'Clone', artist: 'Luan Santana',
    cover: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/9f/55/75/9f557568-4f28-991a-3c93-1f54d6854756/196872368024.jpg/600x600bb.jpg',
    preview: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/88/9d/72/889d722e-6814-90ca-9ffe-d0f9a15e02d6/mzaf_7675481336549709821.plus.aac.p.m4a' },
  { song: 'A Gente Continua', artist: 'Zé Neto & Cristiano',
    cover: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/9e/28/29/9e2829f5-f1de-b588-b14a-103c032a7b10/7891430250379.jpg/600x600bb.jpg',
    preview: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/ef/d1/2b/efd12b49-700a-345e-9a36-8e3d818afbc1/mzaf_16916663320969761511.plus.aac.p.m4a' },
]

/* ---------- Créditos completos de composição (agrupados por artista) ---------- */
export const compositionCredits: {
  artist: string
  songs: { title: string; plays: string }[]
}[] = [
  { artist: 'Gusttavo Lima', songs: [
    { title: 'Homem de Família', plays: '216 mi' },
    { title: '10 Anos', plays: '6,2 mi' },
    { title: 'Tudo Que Vai Um Dia Volta', plays: '53 mi' },
    { title: 'Cuidar de Você', plays: '8,7 mi' },
    { title: 'Tão Rara', plays: '5,9 mi' },
  ] },
  { artist: 'Marília Mendonça', songs: [
    { title: 'Ciumeira', plays: '295 mi' },
    { title: 'Serenata', plays: '209 mi' },
    { title: 'Passa Mal', plays: '115 mi' },
    { title: 'Cuidar de Você', plays: '96 mi' },
    { title: 'Não Casa Não', plays: '53 mi' },
  ] },
  { artist: 'Maiara & Maraisa', songs: [
    { title: 'Sorte Que Cê Beija Bem', plays: '269 mi' },
    { title: 'Se Seu Coração Falasse', plays: '42 mi' },
    { title: 'Casalzinho Botequeiro', plays: '31 mi' },
    { title: 'Disk Sex', plays: '30 mi' },
    { title: 'Por Telefone Não', plays: '14 mi' },
    { title: 'Meu Dele Nosso', plays: '1,1 mi' },
    { title: 'Problema', plays: '704 k' },
  ] },
  { artist: 'João Neto & Frederico', songs: [
    { title: 'Mulher Também Trai', plays: '310 mi' },
    { title: 'Rapariga Não', plays: '149 mi' },
    { title: 'Chorou na Escadaria', plays: '22 mi' },
    { title: 'Assim Como Você', plays: '1,8 mi' },
    { title: 'Pior Que Tá Não Fica', plays: '1,2 mi' },
    { title: 'Distribuidora de Bebidas', plays: '306 k' },
  ] },
  { artist: 'Bruno & Marrone', songs: [
    { title: 'Enquanto Eu Brindo, Cê Chora', plays: '43 mi' },
    { title: 'Foi Só Um Susto', plays: '3,5 mi' },
    { title: 'Chorou na Escadaria', plays: '22 mi' },
    { title: 'UTI', plays: '2,9 mi' },
    { title: 'Fechou Tamo Junto', plays: '1,2 mi' },
  ] },
  { artist: 'Mano Walter', songs: [{ title: 'Não Deixo Não', plays: '334 mi' }] },
  { artist: 'Ana Castela, Hungria e Alok', songs: [{ title: 'Lua', plays: '295 mi' }] },
  { artist: 'Henrique & Juliano', songs: [{ title: 'Amor Atual', plays: '157 mi' }] },
  { artist: 'Zé Neto & Cristiano', songs: [{ title: 'A Gente Continua', plays: '51 mi' }] },
  { artist: 'Luan Santana', songs: [{ title: 'Clone', plays: '18 mi' }] },
]

/* ---------- Na Mídia (presenças em TV e podcasts) ---------- */
export const mediaAppearances: { program: string; outlet: string }[] = [
  { program: 'The Noite com Danilo Gentili', outlet: 'SBT' },
  { program: 'Programa do Ratinho', outlet: 'SBT' },
  { program: 'Programa Silvio Santos', outlet: 'SBT' },
  { program: 'Programa Raul Gil', outlet: 'SBT' },
  { program: 'Arena SBT', outlet: 'SBT' },
  { program: 'Chance de Ouro', outlet: 'SBT' },
  { program: 'Acerte ou Caia', outlet: 'RECORD' },
  { program: 'Domingo Espetacular', outlet: 'RECORD' },
  { program: 'Mega Senha', outlet: 'RedeTV!' },
  { program: '“Ameaça” nas festas do BBB 22', outlet: 'Globo' },
  { program: 'Inteligência Ltda', outlet: 'Podcast' },
  { program: 'Fala Sucesso', outlet: 'Podcast' },
  { program: 'Prosa e Boteco', outlet: 'Podcast' },
  { program: 'Fama Cast', outlet: 'TV Fama' },
  { program: 'Prosa e Papo com Amanda Françozo', outlet: 'TV' },
]

/* ---------- Linha do tempo (biografia) ---------- */
export const timeline = [
  { year: '1986', title: 'Nascimento em Goiás', text: 'Cresce imerso na música, influenciado por familiares e amigos do meio.' },
  { year: '19 anos', title: 'Começa a compor', text: 'No grupo Plenitude, na Igreja de Cristo em Goiânia, inicia a trajetória de compositor.' },
  { year: '2013', title: 'Carreira solo', text: 'Após se casar com Paula Pires, lança a carreira solo e grava o primeiro CD.' },
  { year: '2015', title: 'Foco na composição', text: 'Com o nascimento da filha Helena, decide se dedicar exclusivamente a compor.' },
  { year: '—', title: 'Assina o sertanejo do país', text: 'Mais de 80% dos grandes artistas gravam uma composição sua.' },
  { year: '2020', title: 'Volta como cantor', text: 'Retoma a carreira artística de forma independente.' },
  { year: '2021', title: '“Ameaça” estoura', text: '4x Diamante, +650 milhões de streams e Top 1 do Spotify.' },
]

/* ---------- Biografia (texto corrido) ---------- */
export const bio = [
  'Goiano, nascido em 1986, Paulo Pires cresceu imerso na música, influenciado por familiares e amigos ligados ao meio. Aos 19 anos, no grupo Plenitude da Igreja de Cristo, em Goiânia, começou a compor no cenário secular. Em 2013, após se casar com Paula Pires, lançou a carreira solo e gravou o primeiro CD.',
  'Com o nascimento da filha Helena, em 2015, decidiu se dedicar exclusivamente à composição — escolha que o levou a um sucesso extraordinário, com músicas gravadas por mais de 80% dos artistas do sertanejo nacional: “Homem de Família” (Gusttavo Lima), “Ciumeira” (Marília Mendonça), “Não Deixo Não” (Mano Walter), “Lua” (Ana Castela, Hungria e Alok) e “Clone” (Luan Santana), entre outras.',
  'Desde 2020, mantém uma carreira independente como cantor. Um de seus maiores sucessos, “Ameaça”, alcançou o Top 1 do Spotify e consolidou seu nome entre os grandes da música brasileira da atualidade.',
]

/* ---------- Agenda de shows ----------
 * Sem datas confirmadas no momento. Para divulgar um show, adicione um
 * objeto ao array (ex.: { date: '2026-08-15', city: 'Goiânia', state:
 * 'GO', venue: 'Arena', ticketUrl: 'https://...' }). Vazio → a seção
 * mostra "Agenda em atualização". */
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

/* ---------- Navegação ---------- */
export const navLinks = [
  { label: 'Início', href: '#inicio' },
  { label: 'Sucessos', href: '#sucessos' },
  { label: 'Biografia', href: '#biografia' },
  { label: 'Público', href: '#publico' },
  { label: 'Na Mídia', href: '#midia' },
  { label: 'Composições', href: '#composicoes' },
  { label: 'Contato', href: '#contato' },
]

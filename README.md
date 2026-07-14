# Paulo Pires — Site Oficial

Site oficial do cantor e compositor **Paulo Pires**. Construído com foco em
impacto visual, apresentação premium e contratação de shows.

## Tecnologias

- **React 18** + **Vite** + **TypeScript**
- **TailwindCSS** (tema escuro com luz de palco dourada)
- **Framer Motion** (animações suaves)
- **lucide-react** (ícones)

## Rodando localmente

```bash
npm install      # instala as dependências
npm run dev      # ambiente de desenvolvimento (http://localhost:5173)
npm run build    # gera a versão de produção em /dist
npm run preview  # pré-visualiza a build de produção
```

## Como atualizar o conteúdo

Quase tudo que muda com o tempo está em **um único arquivo**:

> `src/data/site.ts`

Lá você edita, sem mexer no código:

- **Contato** (WhatsApp e e-mail)
- **Redes sociais** e perfil do Spotify
- **Números** (execuções, certificações, seguidores)
- **Composições** (lista de hits)
- **Linha do tempo** da biografia
- **Agenda de shows** — adicione datas no array `shows` (ver exemplo no arquivo).
  Enquanto estiver vazio, o site mostra automaticamente “Agenda em atualização”.

### Fotos e logo

Veja `public/images/README.md`. Basta soltar os arquivos com os nomes
indicados; o site passa a exibi-los automaticamente.

## Estrutura

```
src/
├── App.tsx                 # monta todas as seções
├── data/site.ts            # ✏️ conteúdo editável
└── components/
    ├── Header.tsx          # menu fixo + mobile
    ├── Hero.tsx            # primeira dobra
    ├── Stats.tsx           # números / autoridade
    ├── MusicSection.tsx    # Spotify + plataformas
    ├── Biography.tsx       # história + linha do tempo
    ├── Compositions.tsx    # hits compostos
    ├── Agenda.tsx          # agenda de shows
    ├── Booking.tsx         # contratação (conversão)
    ├── Footer.tsx
    ├── WhatsAppFloat.tsx   # botão fixo de WhatsApp
    ├── icons/BrandIcons.tsx
    └── ui/                 # componentes reutilizáveis
```

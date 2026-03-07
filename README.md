# loosewire.dev

Marketing site for [Loose Wire](https://loosewire.dev) and its products. Built with Astro 5, deployed to Cloudflare Pages.

Loose Wire is the umbrella brand. Each product gets its own section, layout, design system, and blog — all served from a single Astro site.

**Live:** https://loosewire.dev

## Products

### Harknotes (`/harknotes`)

Privacy-first meeting transcription. No bot joins your call — audio is captured at the OS level and transcribed locally with whisper.cpp. Only the text transcript is sent to OpenAI GPT-4o mini for summarisation. Notes are saved as Markdown.

- **Landing page:** `/harknotes`
- **Blog:** `/harknotes/blog`
- **Comparisons:** `/harknotes/vs/otter-ai`, `/harknotes/vs/fireflies`, `/harknotes/vs/tl-dv`
- **Privacy:** `/harknotes/privacy`
- **Linux:** `/harknotes/linux`

## Dev

```sh
pnpm install
pnpm dev          # localhost:4321
pnpm build        # static output in dist/
pnpm preview      # preview production build
pnpm test         # run tests
```

## Architecture

```
src/
├── components/
│   ├── harknotes/       # Product-specific components
│   ├── loosewire/       # Brand components (Logo, Nav, Footer)
│   ├── ui/              # Shared primitives (Button, Badge, Card, etc.)
│   └── blog/            # Blog content components (Prose, Callout, etc.)
├── content/             # MDX content collections
│   ├── harknotes-blog/  # Blog posts
│   ├── harknotes-vs/    # Competitor comparisons
│   └── config.ts        # Collection schemas
├── layouts/             # LooseWireLayout, HarknotesLayout
├── lib/                 # Utilities (JSON-LD schema generators)
├── pages/               # File-based routing
└── styles/
    └── styleguides/     # Design tokens per brand (CSS custom properties)
```

### Design System

Each product has its own CSS styleguide with namespaced custom properties:

- **Loose Wire** (`--lw-*`): Pine green palette, Nunito Sans + DM Sans
- **Harknotes** (`--hk-*`): Mint green palette, Geist font, light/dark theme support

No preprocessors, no CSS-in-JS, no utility frameworks. Just custom properties and plain CSS.

### Icons

Lucide icons via `astro-icon`. No emojis anywhere in the codebase.

```astro
import { Icon } from 'astro-icon/components';
<Icon name="lucide:shield" />
```

### SEO

- Auto-generated sitemap via `@astrojs/sitemap`
- JSON-LD structured data (SoftwareApplication, FAQPage, Article)
- OG/Twitter meta tags on all pages
- Canonical URLs
- Security headers in `public/_headers`

## Adding a New Product

1. Create a styleguide: `src/styles/styleguides/<product>.css`
2. Create a layout: `src/layouts/<Product>Layout.astro`
3. Add components: `src/components/<product>/`
4. Add pages: `src/pages/<product>/`
5. Optional blog: add collection in `src/content/` and update `config.ts`
6. Add product card to homepage and blog index

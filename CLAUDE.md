# loosewire.dev — Marketing Site

Astro 5 static marketing site for Loose Wire LLC and its products: Harknotes, Farscry, Unclouded, and Mealforge.

## Quick Reference

```sh
pnpm dev          # localhost:4321
pnpm build        # static output → dist/
pnpm preview      # preview production build
pnpm test         # vitest run
pnpm test:watch   # vitest watch mode
pnpm deploy       # wrangler deploy
```

**Deploy:** Cloudflare Workers (static assets + `@astrojs/cloudflare` adapter, config in `wrangler.jsonc`) at https://loosewire.dev
**Domain redirect:** `harknotes.loosewire.dev` → `loosewire.dev/harknotes` (301)

## Project Structure

```
src/
├── components/
│   ├── harknotes/     # Harknotes product components (Nav, Hero, PricingCard, etc.)
│   ├── farscry/       # Farscry product components (Logo, Wordmark, Nav, Footer)
│   ├── unclouded/     # Unclouded product components (Logo, Wordmark, Nav, Footer)
│   ├── mealforge/     # Mealforge product components (Logo, Wordmark, Nav, Footer)
│   ├── loosewire/     # Loose Wire brand components (Logo, Wordmark, Nav, FooterCredit)
│   ├── ui/            # Shared UI primitives (Button, Badge, Card, Input, Toggle, Toast, Menu)
│   └── blog/          # Blog content components (Prose, ArticleHeader, Callout, etc.)
├── content/
│   ├── loosewire-journal/ # Handwritten journal entries (Gav only)
│   ├── harknotes-blog/  # MDX blog posts
│   ├── harknotes-vs/    # MDX competitor comparisons (otter-ai, fireflies, tl-dv)
│   ├── farscry-blog/    # MDX blog posts
│   ├── unclouded-blog/  # MDX blog posts
│   ├── mealforge-blog/  # MDX blog posts
│   └── config.ts        # Zod collection schemas
├── layouts/
│   ├── LooseWireLayout.astro   # Loose Wire pages (paper/notebook theme, light/dark toggle)
│   ├── HarknotesLayout.astro   # Harknotes pages (mint theme, auto light/dark)
│   ├── FarscryLayout.astro     # Farscry pages (violet theme)
│   ├── UncloudedLayout.astro   # Unclouded pages (butter-on-dark theme)
│   └── MealforgeLayout.astro   # Mealforge pages (flour & cast iron theme, auto light/dark)
├── lib/
│   ├── schema.ts        # JSON-LD structured data generators
│   └── schema.test.ts   # Schema tests
├── pages/               # File-based routing (see Routes below)
└── styles/
    ├── global.css                    # Reset + styleguide imports
    └── styleguides/
        ├── loosewire.css             # Paper/notebook palette (--lw-*), Courier Prime / DM Mono / Lora
        ├── harknotes.css             # Mint palette (--hk-*), Geist, light/dark
        ├── farscry.css               # Violet palette (--fc-*), Geist
        ├── unclouded.css             # Butter palette (--uc-*), Fraunces / Plus Jakarta Sans
        └── mealforge.css             # Flour & cast iron palette (--mf-*), Fraunces, light/dark
```

## Routes

| Path | Layout | Purpose |
|------|--------|---------|
| `/` | LooseWire | Umbrella homepage — product listing |
| `/blog` | LooseWire | The Journal (handwritten entries) + product post index |
| `/blog/[slug]` | LooseWire | Individual journal entry (Person author schema) |
| `/harknotes` | Harknotes | Product landing page |
| `/harknotes/blog[/slug]` | Harknotes | Blog index + posts |
| `/harknotes/vs/[competitor]` | Harknotes | Competitor comparison page |
| `/harknotes/privacy` | Harknotes | Privacy policy |
| `/harknotes/linux` | Harknotes | Linux download & support info |
| `/harknotes/roadmap` | Harknotes | Public roadmap |
| `/harknotes/checkout/success` | Harknotes | Post-checkout deep link back into app (noindex) |
| `/farscry` | Farscry | Product landing page (coming soon) |
| `/farscry/blog[/slug]` | Farscry | Blog index + posts |
| `/unclouded` | Unclouded | Product landing page |
| `/unclouded/blog[/slug]` | Unclouded | Blog index + posts |
| `/mealforge` | Mealforge | Product landing page |
| `/mealforge/blog[/slug]` | Mealforge | Blog index + posts |
| `/api/posts.json` | — | Static JSON feed for the backlink network |
| `/rss.xml`, `/<product>/rss.xml` | — | RSS feeds |

## Conventions

### Icons — Lucide only, no emojis
```astro
import { Icon } from 'astro-icon/components';
<Icon name="lucide:shield" style="width: 24px; height: 24px;" />
```
Configured via `astro-icon` integration + `@iconify-json/lucide`.

### CSS
- All design tokens are CSS custom properties (no preprocessors)
- Token prefixes: `--lw-*` (Loose Wire), `--hk-*` (Harknotes), `--fc-*` (Farscry), `--uc-*` (Unclouded), `--mf-*` (Mealforge)
- Themes switch on `data-theme="light|dark"` set on `<html>` (auto from `prefers-color-scheme` in product layouts; manual toggle on the Loose Wire homepage)
- Fluid typography via `clamp()`
- No CSS-in-JS, no utility frameworks

### Content Collections
- Journal: `src/content/loosewire-journal/*.mdx` — **handwritten by Gav, never AI-generate these**; schema has `title`, `description`, `pubDate`, `keywords[]`, `video?` (YouTube URL), `readTime?`. `_example-entry.mdx` is the template.
- Blog: `src/content/<product>-blog/*.mdx` — schema has `title`, `description`, `pubDate`, `keywords[]`, `tldr?`, `readTime?`
- Comparisons: `src/content/harknotes-vs/*.mdx` — schema has `competitor`, `competitorSlug`, `description`, `pubDate`, `keywords[]`

### Structured Data
Use generators from `src/lib/schema.ts`:
- `softwareAppSchema()` — Harknotes product page
- `faqPageSchema(items)` — FAQ sections
- `articleSchema(opts)` — blog posts; pass `author: 'person'` for journal entries
- `orgSchema()` / `websiteSchema()` — homepage @graph, sameAs (GitHub, YouTube @loosewiredev, Ko-fi)
- `breadcrumbSchema(items)` — on every blog post and vs page

### SEO conventions
- Canonical URLs always end with a trailing slash (layouts normalize this) — keep sitemap and canonicals identical
- Every page needs a unique title + description; blog posts get breadcrumbs in their @graph
- `public/llms.txt` describes the site for AI assistants — update it when products change
(Farscry/Unclouded/Mealforge pages define their SoftwareApplication schema inline.)

### OG Images
Each brand has a 1200×630 `public/og-<brand>.png` referenced as the layout default. If a brand's look changes, regenerate the image (they were rendered from HTML templates via headless Chromium).

### Testing
Vitest for unit tests. Tests live next to source files (`*.test.ts`).

## Content Rules

- **No GDPR/HIPAA claims** — we're not lawyers, don't assert regulatory compliance
- **No auto-detect mentions** — that's a Harknotes v2 feature, not shipped yet
- **No emojis** — use Lucide icons everywhere
- **Privacy messaging (Harknotes):** audio stays local (whisper.cpp), only text transcript sent to OpenAI GPT-4o mini for summarisation
- **Brand voice:** independent dev energy, not corporate. "Independent dev, shipping products."

## Product Facts

### Harknotes
- Silent OS-level audio capture (no bot joins the call)
- Audio transcribed locally via whisper.cpp (bundled binary)
- Text transcript → OpenAI GPT-4o mini → structured summary
- Notes saved as Markdown to user-chosen folder
- macOS 13+ and Linux (AppImage, DEB, RPM); not yet notarized on macOS
- Pricing: Free (10 summaries/mo), Local $6/mo (50), Pro Local $12/mo (200)
- Downloads: https://github.com/LooseWireDev/harknotes-releases/releases/latest

### Farscry (coming soon)
- Self-hostable, E2E-encrypted (WebRTC DTLS-SRTP) video calling, iOS + Android
- No phone number — email signup + 6-character friend codes
- One Docker container, one SQLite file; AGPL-3.0
- Pricing: self-hosted free; managed $3/mo individual, $6/mo family (up to 5)

### Unclouded (live at https://unclouded.app)
- Privacy-focused app discovery and comparison; Obtainium config generation
- Free web app, no account; AGPL-3.0; mobile scanner planned for v2

### Mealforge (live, self-hosted only)
- AI-planned weekly meals over MCP: any MCP-capable chat (LibreChat, Claude) pushes plans into the app
- No recipe catalog — recipes generated in conversation; favorites + history for recall
- Recipe cards, cook mode, grocery list derived automatically (aggregated, grouped by store section)
- One Docker container on port 8090, single SQLite file; MIT licensed
- **No built-in auth** — marketing copy must keep the "private network / Tailscale / auth proxy" caveat
- Repo: https://github.com/LooseWireDev/mealforge

## Cross-Site Backlinking

This site is part of a backlinking network across gavyncaldwell.com, loosewire.dev, and future sites. Full spec:
https://raw.githubusercontent.com/LooseWireDev/loosewire-web/main/docs/backlink-network.md

Key files:
- `src/pages/api/posts.json.ts` — JSON feed endpoint consumed by all other sites
- `docs/backlink-network.md` — The canonical spec (this is the source of truth)

When adding a new product with a blog, update the posts.json.ts endpoint to include the new collection.

## Adding a New Product

This site is the umbrella for all Loose Wire products. To add a new product:

1. Create a styleguide in `src/styles/styleguides/<product>.css` with `--<prefix>-*` tokens, and import it from `src/styles/global.css`
2. Create a layout in `src/layouts/<Product>Layout.astro`
3. Add components in `src/components/<product>/` (Logo, Wordmark, Nav, Footer)
4. Add pages under `src/pages/<product>/`
5. Add `public/favicon-<product>.svg` and `public/og-<product>.png`
6. If it has a blog, add a content collection in `src/content/<product>-blog/`, update `src/content/config.ts`, `src/pages/blog/index.astro`, and `src/pages/api/posts.json.ts`
7. Add the product card to the homepage (`src/pages/index.astro`) and homepage footer
8. Add the product link to `src/pages/404.astro`

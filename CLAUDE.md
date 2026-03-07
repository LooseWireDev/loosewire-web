# loosewire.dev — Marketing Site

Astro 5 static marketing site for Loose Wire and its products. Currently ships Harknotes.

## Quick Reference

```sh
pnpm dev          # localhost:4321
pnpm build        # static output → dist/
pnpm preview      # preview production build
pnpm test         # vitest run
pnpm test:watch   # vitest watch mode
```

**Deploy:** Cloudflare Pages at https://loosewire.dev
**Domain redirect:** `harknotes.loosewire.dev` → `loosewire.dev/harknotes` (301)

## Project Structure

```
src/
├── components/
│   ├── harknotes/     # Harknotes product components (Nav, Hero, PricingCard, etc.)
│   ├── loosewire/     # Loose Wire brand components (Logo, Wordmark, Nav, FooterCredit)
│   ├── ui/            # Shared UI primitives (Button, Badge, Card, Input, Toggle, Toast, Menu)
│   └── blog/          # Blog content components (Prose, ArticleHeader, Callout, etc.)
├── content/
│   ├── harknotes-blog/  # MDX blog posts (5 posts)
│   ├── harknotes-vs/    # MDX competitor comparisons (otter-ai, fireflies, tl-dv)
│   └── config.ts        # Zod collection schemas
├── layouts/
│   ├── LooseWireLayout.astro   # Loose Wire pages (pine theme)
│   └── HarknotesLayout.astro   # Harknotes pages (mint theme, light/dark)
├── lib/
│   ├── schema.ts        # JSON-LD structured data generators
│   └── schema.test.ts   # Schema tests
├── pages/               # File-based routing (see Routes below)
└── styles/
    ├── global.css                    # Reset + imports
    └── styleguides/
        ├── loosewire.css             # Pine palette, Nunito Sans / DM Sans
        └── harknotes.css             # Mint palette, Geist, light/dark themes
```

## Routes

| Path | Layout | Purpose |
|------|--------|---------|
| `/` | LooseWire | Umbrella homepage — product listing |
| `/blog` | LooseWire | Aggregated blog index across products |
| `/harknotes` | Harknotes | Product landing page |
| `/harknotes/blog` | Harknotes | Harknotes blog index |
| `/harknotes/blog/[slug]` | Harknotes | Individual blog post |
| `/harknotes/vs/[competitor]` | Harknotes | Competitor comparison page |
| `/harknotes/privacy` | Harknotes | Privacy policy |
| `/harknotes/linux` | Harknotes | Linux download & support info |

## Conventions

### Icons — Lucide only, no emojis
```astro
import { Icon } from 'astro-icon/components';
<Icon name="lucide:shield" style="width: 24px; height: 24px;" />
```
Configured via `astro-icon` integration + `@iconify-json/lucide`.

### CSS
- All design tokens are CSS custom properties (no preprocessors)
- Loosewire tokens: `--lw-*` (pine green palette)
- Harknotes tokens: `--hk-*` (mint green palette, supports `data-theme="light|dark"`)
- Fluid typography via `clamp()`
- No CSS-in-JS, no utility frameworks

### Content Collections
- Blog: `src/content/harknotes-blog/*.mdx` — schema has `title`, `description`, `pubDate`, `keywords[]`, `tldr?`, `readTime?`
- Comparisons: `src/content/harknotes-vs/*.mdx` — schema has `competitor`, `competitorSlug`, `description`, `pubDate`, `keywords[]`

### Structured Data
Use generators from `src/lib/schema.ts`:
- `softwareAppSchema()` — product page
- `faqPageSchema(items)` — FAQ sections
- `articleSchema(opts)` — blog posts

### Testing
Vitest for unit tests. Tests live next to source files (`*.test.ts`).

## Content Rules

- **No GDPR/HIPAA claims** — we're not lawyers, don't assert regulatory compliance
- **No auto-detect mentions** — that's a v2 feature, not shipped yet
- **No emojis** — use Lucide icons everywhere
- **Privacy messaging:** audio stays local (whisper.cpp), only text transcript sent to OpenAI GPT-4o mini for summarisation
- **Brand voice:** independent dev energy, not corporate. "Independent dev, shipping products."

## Harknotes Product Facts

- Silent OS-level audio capture (no bot joins the call)
- Audio transcribed locally via whisper.cpp (bundled binary)
- Text transcript → OpenAI GPT-4o mini → structured summary
- Notes saved as Markdown to user-chosen folder
- macOS 13+ and Linux (AppImage, DEB, RPM)
- Pricing: Free (10/mo), Local $6/mo (50), Pro Local $12/mo (200)
- Downloads: https://github.com/LooseWireDev/harknotes/releases/latest

## Adding a New Product

This site is the umbrella for all Loose Wire products. To add a new product:

1. Create a styleguide in `src/styles/styleguides/<product>.css` with `--<prefix>-*` tokens
2. Create a layout in `src/layouts/<Product>Layout.astro`
3. Add components in `src/components/<product>/`
4. Add pages under `src/pages/<product>/`
5. If it has a blog, add a content collection in `src/content/<product>-blog/` and update `src/content/config.ts`
6. Add the product card to the homepage (`src/pages/index.astro`)
7. Update `src/pages/blog/index.astro` to include the new product's posts

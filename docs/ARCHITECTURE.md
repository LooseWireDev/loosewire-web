# Architecture

## Overview

loosewire.dev is a static Astro 5 site that serves as the marketing umbrella for all Loose Wire products. It's designed to scale — each product gets its own layout, design system, component set, and content collections while sharing UI primitives and infrastructure.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Astro 5 (static output, zero JS by default) |
| Content | MDX via `@astrojs/mdx` |
| Icons | Lucide via `astro-icon` + `@iconify-json/lucide` |
| SEO | `@astrojs/sitemap`, JSON-LD, OG tags |
| Testing | Vitest |
| Deploy | Cloudflare Pages |
| Package manager | pnpm |

## Multi-Product Architecture

The site is designed around a repeatable pattern for each product:

```
Product = Styleguide + Layout + Components + Pages + Content
```

### Current: Harknotes

```
styles/styleguides/harknotes.css    → --hk-* tokens, light/dark themes
layouts/HarknotesLayout.astro       → head, fonts, theme script, schema slot
components/harknotes/*              → Nav, Hero, PricingCard, Footer, etc.
pages/harknotes/*                   → landing, blog, privacy, linux, comparisons
content/harknotes-blog/             → MDX blog posts
content/harknotes-vs/               → MDX competitor comparisons
```

### Adding Another Product

Follow the same pattern with a new prefix. The homepage (`pages/index.astro`) and main blog index (`pages/blog/index.astro`) aggregate across all products.

## Routing

Astro file-based routing. Dynamic routes use `getStaticPaths()`:

- `pages/harknotes/blog/[slug].astro` — generates a page per blog post
- `pages/harknotes/vs/[competitor].astro` — generates a page per comparison

All output is static HTML. No SSR, no API routes.

## Design Tokens

CSS custom properties organised by brand:

- `--lw-pine`, `--lw-bg`, `--lw-text`, `--lw-font-*` — Loose Wire brand
- `--hk-mint`, `--hk-bg`, `--hk-text-*`, `--hk-font` — Harknotes brand

Harknotes supports `data-theme="light|dark"` with automatic detection via a `<script>` in the layout head. Tokens swap values based on the theme attribute.

## Component Organisation

```
components/
├── harknotes/     # Product-specific, use --hk-* tokens
├── loosewire/     # Brand-level, use --lw-* tokens
├── ui/            # Theme-agnostic primitives (Button, Badge, Card, etc.)
└── blog/          # Content rendering (Prose, Callout, ArticleHeader, etc.)
```

**ui/** components are shared across products. They accept `class` and `variant` props for styling flexibility without coupling to any specific design system.

**blog/** components handle MDX content rendering. `Prose.astro` wraps rendered markdown with typography styles. Components like `Callout`, `FeatureBox`, and `ComparisonBox` are used directly in MDX files.

## Content Collections

Defined in `src/content/config.ts` with Zod schemas:

### harknotes-blog
Fields: `title`, `description`, `pubDate`, `updatedDate?`, `keywords?`, `tldr?`, `readTime?`

### harknotes-vs
Fields: `competitor`, `competitorSlug`, `description`, `pubDate`, `keywords?`

## Structured Data

`src/lib/schema.ts` exports JSON-LD generators:

- `softwareAppSchema()` — for the Harknotes product page. Includes pricing tiers, OS support, download URL.
- `faqPageSchema(items)` — wraps FAQ Q&A pairs in schema.org FAQPage format.
- `articleSchema(opts)` — for blog posts. Includes headline, dates, author/publisher.

These are passed to `HarknotesLayout` via the `schema` prop and rendered as `<script type="application/ld+json">`.

## Security

- `public/_headers`: X-Frame-Options DENY, X-Content-Type-Options nosniff, strict referrer policy
- `public/_redirects`: 301 redirect from legacy harknotes subdomain
- No user input, no forms, no API calls — pure static site
- No third-party scripts beyond Google Fonts

## Domain Setup

- `loosewire.dev` — primary domain on Cloudflare Pages
- `harknotes.loosewire.dev` — 301 redirects to `loosewire.dev/harknotes` via `_redirects`

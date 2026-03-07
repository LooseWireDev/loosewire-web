# loosewire.dev + Harknotes Marketing Site — Design Doc

**Date:** 2026-03-06
**Status:** Approved

---

## Overview

Build `loosewire.dev` as a minimal umbrella brand site with `loosewire.dev/harknotes` as the full product marketing section for Harknotes. SEO is the primary goal — the site needs to rank for privacy-first meeting transcription keywords in a competitive space.

**Domains:**
- `loosewire.dev` — canonical root, Netlify-hosted
- `harknotes.loosewire.dev` — 301 redirects to `loosewire.dev/harknotes`

**Tech:** Astro, Netlify, no framework (zero-JS static by default)

---

## Architecture

### Repo

Separate repo: `LooseWireDev/loosewire-web`
Deploy: Netlify, whole repo, site root = `loosewire.dev`

### URL Structure

```
loosewire.dev/                           ← umbrella homepage
loosewire.dev/blog/                      ← aggregated blog index (all products)
loosewire.dev/harknotes/                 ← product landing page
loosewire.dev/harknotes/blog/            ← harknotes blog index
loosewire.dev/harknotes/blog/[slug]      ← individual posts (canonical)
loosewire.dev/harknotes/vs/[competitor]  ← comparison pages
loosewire.dev/harknotes/privacy          ← privacy deep-dive
loosewire.dev/harknotes/linux            ← linux-specific page
```

### Project Structure

```
src/
  pages/
    index.astro
    blog/
      index.astro               ← aggregated index, links to product posts
    harknotes/
      index.astro
      privacy.astro
      linux.astro
      blog/
        index.astro
        [slug].astro
      vs/
        [competitor].astro
  content/
    harknotes-blog/             ← MDX blog posts
    harknotes-vs/               ← MDX comparison content
  layouts/
    LooseWireLayout.astro       ← loosewire brand (light-only)
    HarknotesLayout.astro       ← harknotes brand (auto-themed)
  components/
    loosewire/
    harknotes/
public/
  robots.txt
astro.config.mjs
```

---

## Design Systems

### loosewire.dev (light-only)
- Fonts: Nunito Sans (display), DM Sans (body), Geist Mono (labels)
- Brand color: pine green (`#2e6e62`)
- Background: warm off-white (`#f6f8f7`)
- No dark mode — matches existing brand guide exactly

### harknotes section (auto-themed)
- Font: Geist
- Brand color: mint green (`#3dd68c` dark / `#1c9e62` light)
- Full dark + light token sets from harknotes style guide
- Auto theming via inline script on `<html>` before first paint — reads `prefers-color-scheme`, sets `data-theme="dark"|"light"` attribute. CSS custom properties handle all colour switching. No user toggle.

```html
<!-- In HarknotesLayout.astro <head>, before any CSS -->
<script is:inline>
  const theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', theme);
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
  });
</script>
```

---

## Page Content

### loosewire.dev homepage
- Brief brand statement ("small tools, built carefully")
- Product card: Harknotes — links to `/harknotes`
- Link to `/blog`
- Minimal footer

### loosewire.dev/blog
- Aggregated index of all posts across all products
- Tagged by product
- Links to canonical post URLs under each product's path
- Cross-links to product landing pages

### harknotes landing (index.astro)
Sections in order:
1. **Hero** — tagline, sub-headline, CTA (Download / Get Started)
2. **Problem** — why bots joining meetings is a problem (privacy, compliance, awkward)
3. **How it works** — 3-step: Record → Transcribe locally → Get notes
4. **Features** — local whisper, speaker labels, markdown output, macOS + Linux
5. **Pricing** — Free / Local / Pro Local tier cards
6. **Download** — links to GitHub Releases (DMG, AppImage, DEB, RPM)
7. **FAQ** — 6–8 questions with FAQPage schema
8. **Footer** — links to blog, privacy page, GitHub

### Comparison pages (/harknotes/vs/[competitor])
Target: "otter ai alternative", "fireflies alternative" searches
Competitors: `otter-ai`, `fireflies`, `tl-dv`
Content via MDX in `content/harknotes-vs/` — AI-generated per competitor

### /harknotes/privacy
Target: "private meeting transcription", "no bot meeting recorder", "local meeting AI"
Deep explainer: what data stays local, what leaves the machine (only text transcript for summarization), how whisper.cpp works, no cloud audio

### /harknotes/linux
Target: "linux meeting transcription", "whisper linux meeting notes"
Linux-specific: AppImage, DEB, RPM install steps, PulseAudio/PipeWire support, tested distros

### Blog articles (AI-generated, MDX)
Target keywords:
- "meeting transcription without a bot joining"
- "local whisper meeting notes setup"
- "private alternative to otter ai"
- "best meeting transcription app linux"
- "whisper.cpp meeting notes"
- "gdpr compliant meeting transcription"
- "how to transcribe meetings without cloud"

---

## SEO Architecture

### Canonical + redirects
- All harknotes content: `<link rel="canonical" href="https://loosewire.dev/harknotes/...">` in HarknotesLayout
- Netlify `_redirects`:
  ```
  https://harknotes.loosewire.dev/* https://loosewire.dev/harknotes/:splat 301!
  ```

### Structured data
- **SoftwareApplication** schema on `/harknotes` — name, OS (macOS, Linux), price (free tier), applicationCategory: "Productivity"
- **FAQPage** schema on `/harknotes` FAQ section — generated from FAQ data array
- **Article** schema on all blog posts — author, datePublished, headline

### Sitemap + robots
- `@astrojs/sitemap` generates `/sitemap-index.xml` automatically
- `/robots.txt`: allow all, point to sitemap

### Open Graph + Twitter cards
- HarknotesLayout injects OG tags per page — title, description, image, url
- LooseWireLayout does the same for umbrella pages

### Internal cross-linking
Every page links back to related pages:
- Blog posts → `/harknotes` product page, `/harknotes/blog`
- `/harknotes` → `/blog`, comparison pages, `/harknotes/privacy`
- `loosewire.dev` homepage → `/harknotes`, `/blog`
- Comparison pages → `/harknotes` (CTA), other comparison pages

### External link targets (post-launch)
- ProductHunt launch
- Hacker News Show HN
- AlternativeTo listing
- r/privacy, r/selfhosted, r/linux
- Obsidian forum/Discord (markdown output)
- opensource.builders

---

## Astro Config

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://loosewire.dev',
  integrations: [sitemap()],
});
```

No base path needed — the site owns the full domain.

---

## App Auto Theming (Separate Task — harknotes repo)

The Electron app currently has no auto theming. The harknotes style guide defines full dark + light CSS custom property tokens. Implementation:
1. Add inline script in renderer HTML `<head>` (same pattern as above)
2. Tailwind config already uses CSS vars — no changes needed there
3. Listen for `prefers-color-scheme` changes and update `data-theme` attribute live

This is a small isolated change in `apps/desktop/src/renderer/` — implement separately from the web build.

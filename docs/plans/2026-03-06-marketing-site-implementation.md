# loosewire.dev Marketing Site Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build the loosewire.dev marketing site — a minimal umbrella homepage plus the full Harknotes product marketing section — optimised for SEO from day one.

**Architecture:** Standalone Astro 5 site at the repo root. Two distinct design systems (loosewire brand light-only, harknotes brand auto-themed via `prefers-color-scheme`). All content pages use Astro content collections with MDX for blog posts and comparison pages.

**Tech Stack:** Astro 5, `@astrojs/sitemap`, pnpm, Netlify, MDX, Vitest (for schema utilities)

**Design docs:**
- `docs/plans/2026-03-06-marketing-site-design.md` — full architecture and content spec

---

## Task 1: Scaffold Astro project

**Files:**
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `package.json`
- Create: `src/env.d.ts`

**Step 1: Initialise Astro**

From `~/Programming/personal/loosewire`:

```bash
pnpm create astro@latest . --template minimal --typescript strictest --no-git --skip-houston
```

When prompted, say yes to install dependencies.

**Step 2: Install additional dependencies**

```bash
pnpm add @astrojs/sitemap @astrojs/mdx
pnpm add -D vitest @vitest/ui
```

**Step 3: Update `astro.config.mjs`**

```js
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://loosewire.dev',
  integrations: [sitemap(), mdx()],
});
```

**Step 4: Add vitest config to `package.json`**

Add to the existing `package.json`:

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

**Step 5: Verify build works**

```bash
pnpm build
```

Expected: Build succeeds, `dist/` created with `index.html`.

**Step 6: Commit**

```bash
git add .
git commit -m "feat: scaffold astro project with sitemap + mdx"
```

---

## Task 2: Design tokens

**Files:**
- Create: `src/styles/tokens-loosewire.css`
- Create: `src/styles/tokens-harknotes.css`
- Create: `src/styles/global.css`

**Step 1: Create loosewire tokens**

```css
/* src/styles/tokens-loosewire.css */
:root {
  --lw-pine:         #2e6e62;
  --lw-pine-light:   #3d8a7c;
  --lw-pine-dim:     #1e4e46;
  --lw-pine-subtle:  rgba(46,110,98,0.07);
  --lw-pine-glow:    rgba(46,110,98,0.04);

  --lw-bg:           #f6f8f7;
  --lw-bg-warm:      #f0f4f3;
  --lw-surface:      #ffffff;
  --lw-surface-2:    #eef2f1;
  --lw-surface-3:    #e4eae8;

  --lw-border:       rgba(0,0,0,0.07);
  --lw-border-strong: rgba(0,0,0,0.13);

  --lw-text:         #1a2422;
  --lw-text-mid:     #5a7a74;
  --lw-text-dim:     #94aaa4;
  --lw-text-inverse: #f6f8f7;

  --lw-font-display: 'Nunito Sans', sans-serif;
  --lw-font-body:    'DM Sans', sans-serif;
  --lw-font-mono:    'Geist Mono', monospace;
}
```

**Step 2: Create harknotes tokens (dark + light)**

```css
/* src/styles/tokens-harknotes.css */
:root,
[data-theme="dark"] {
  --hk-mint:          #3dd68c;
  --hk-mint-dark:     #28b874;
  --hk-mint-forest:   #1e9460;
  --hk-mint-subtle:   rgba(61,214,140,0.12);
  --hk-mint-glow:     rgba(61,214,140,0.07);

  --hk-bg:            #0e0f11;
  --hk-bg-elevated:   #131517;
  --hk-surface-1:     #181a1d;
  --hk-surface-2:     #1e2124;
  --hk-surface-3:     #252a2e;

  --hk-border-subtle: rgba(255,255,255,0.05);
  --hk-border:        rgba(255,255,255,0.09);
  --hk-border-strong: rgba(255,255,255,0.16);

  --hk-text-primary:   #f0f2f4;
  --hk-text-secondary: #8c939e;
  --hk-text-tertiary:  #4e5762;
  --hk-text-inverse:   #0a1a14;

  --hk-shadow-sm:   0 1px 3px rgba(0,0,0,0.5);
  --hk-shadow-md:   0 4px 16px rgba(0,0,0,0.6);
  --hk-shadow-lg:   0 16px 48px rgba(0,0,0,0.7), 0 4px 12px rgba(0,0,0,0.4);
  --hk-shadow-mint: 0 0 24px rgba(61,214,140,0.18), 0 4px 12px rgba(0,0,0,0.4);

  color-scheme: dark;
}

[data-theme="light"] {
  --hk-mint:          #1c9e62;
  --hk-mint-dark:     #158050;
  --hk-mint-forest:   #0f6640;
  --hk-mint-subtle:   rgba(28,158,98,0.1);
  --hk-mint-glow:     rgba(28,158,98,0.06);

  --hk-bg:            #f5f6f8;
  --hk-bg-elevated:   #ffffff;
  --hk-surface-1:     #ffffff;
  --hk-surface-2:     #f0f2f5;
  --hk-surface-3:     #e8eaee;

  --hk-border-subtle: rgba(0,0,0,0.06);
  --hk-border:        rgba(0,0,0,0.1);
  --hk-border-strong: rgba(0,0,0,0.18);

  --hk-text-primary:   #0f1117;
  --hk-text-secondary: #4a5264;
  --hk-text-tertiary:  #9199a8;
  --hk-text-inverse:   #ffffff;

  --hk-shadow-sm:   0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06);
  --hk-shadow-md:   0 4px 16px rgba(0,0,0,0.1), 0 2px 6px rgba(0,0,0,0.06);
  --hk-shadow-lg:   0 16px 48px rgba(0,0,0,0.14), 0 4px 12px rgba(0,0,0,0.08);
  --hk-shadow-mint: 0 0 20px rgba(28,158,98,0.15), 0 4px 12px rgba(0,0,0,0.08);

  color-scheme: light;
}
```

**Step 3: Create global.css**

```css
/* src/styles/global.css */
@import './tokens-loosewire.css';
@import './tokens-harknotes.css';

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
```

**Step 4: Commit**

```bash
git add src/styles/
git commit -m "feat: design tokens for loosewire and harknotes brands"
```

---

## Task 3: Layouts

**Files:**
- Create: `src/layouts/LooseWireLayout.astro`
- Create: `src/layouts/HarknotesLayout.astro`

**Step 1: Create LooseWireLayout**

```astro
---
// src/layouts/LooseWireLayout.astro
import '../styles/global.css';

interface Props {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
}

const { title, description, canonicalUrl, ogImage } = Astro.props;
const canonical = canonicalUrl ?? Astro.url.href;
const image = ogImage ?? 'https://loosewire.dev/og-loosewire.png';
---
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={canonical} />

  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={canonical} />
  <meta property="og:image" content={image} />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={image} />

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:opsz,wght@6..12,300;6..12,400;6..12,500;6..12,600;6..12,700;6..12,800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Geist+Mono:wght@400;500;600&display=swap" rel="stylesheet" />

  <link rel="sitemap" href="/sitemap-index.xml" />
</head>
<body style="background: var(--lw-bg); color: var(--lw-text); font-family: var(--lw-font-body);">
  <slot />
</body>
</html>
```

**Step 2: Create HarknotesLayout**

```astro
---
// src/layouts/HarknotesLayout.astro
import '../styles/global.css';

interface Props {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  schema?: object;
}

const { title, description, canonicalUrl, ogImage, schema } = Astro.props;
const canonical = canonicalUrl ?? new URL(Astro.url.pathname, 'https://loosewire.dev').href;
const image = ogImage ?? 'https://loosewire.dev/og-harknotes.png';
---
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- Auto theme: set before any CSS to avoid flash -->
  <script is:inline>
    (function() {
      const t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', t);
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
      });
    })();
  </script>

  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={canonical} />

  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={canonical} />
  <meta property="og:image" content={image} />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={image} />

  {schema && <script type="application/ld+json" set:html={JSON.stringify(schema)} />}

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700;800&family=Geist+Mono:wght@400;500;600&display=swap" rel="stylesheet" />

  <link rel="sitemap" href="/sitemap-index.xml" />
</head>
<body style="background: var(--hk-bg); color: var(--hk-text-primary); font-family: 'Geist', system-ui, sans-serif;">
  <slot />
</body>
</html>
```

**Step 3: Verify build still passes**

```bash
pnpm build
```

**Step 4: Commit**

```bash
git add src/layouts/
git commit -m "feat: loosewire and harknotes layouts with SEO and auto-theme"
```

---

## Task 4: Schema utilities + tests

**Files:**
- Create: `src/lib/schema.ts`
- Create: `src/lib/schema.test.ts`

**Step 1: Write failing tests**

```typescript
// src/lib/schema.test.ts
import { describe, it, expect } from 'vitest';
import { softwareAppSchema, faqPageSchema, articleSchema } from './schema';

describe('softwareAppSchema', () => {
  it('returns valid SoftwareApplication schema', () => {
    const schema = softwareAppSchema();
    expect(schema['@type']).toBe('SoftwareApplication');
    expect(schema.name).toBe('Harknotes');
    expect(schema.operatingSystem).toContain('macOS');
    expect(schema.offers).toBeDefined();
  });
});

describe('faqPageSchema', () => {
  it('returns valid FAQPage schema from items', () => {
    const items = [{ q: 'Is it free?', a: 'Yes, there is a free tier.' }];
    const schema = faqPageSchema(items);
    expect(schema['@type']).toBe('FAQPage');
    expect(schema.mainEntity).toHaveLength(1);
    expect(schema.mainEntity[0]['@type']).toBe('Question');
    expect(schema.mainEntity[0].name).toBe('Is it free?');
  });
});

describe('articleSchema', () => {
  it('returns valid Article schema', () => {
    const schema = articleSchema({
      title: 'Test Article',
      description: 'A test',
      datePublished: '2026-03-06',
      url: 'https://loosewire.dev/harknotes/blog/test',
    });
    expect(schema['@type']).toBe('Article');
    expect(schema.headline).toBe('Test Article');
    expect(schema.datePublished).toBe('2026-03-06');
  });
});
```

**Step 2: Run tests to verify they fail**

```bash
pnpm test
```

Expected: 3 test failures — `schema` module not found.

**Step 3: Implement schema utilities**

```typescript
// src/lib/schema.ts

export function softwareAppSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Harknotes',
    description: 'Privacy-first meeting transcription. No bot joins your calls. Audio stays local. Whisper AI runs on your machine.',
    applicationCategory: 'ProductivityApplication',
    operatingSystem: ['macOS', 'Linux'],
    offers: [
      { '@type': 'Offer', price: '0', priceCurrency: 'USD', name: 'Free' },
      { '@type': 'Offer', price: '6', priceCurrency: 'USD', name: 'Local' },
      { '@type': 'Offer', price: '12', priceCurrency: 'USD', name: 'Pro Local' },
    ],
    url: 'https://loosewire.dev/harknotes',
    downloadUrl: 'https://github.com/LooseWireDev/harknotes/releases/latest',
    author: {
      '@type': 'Organization',
      name: 'Loose Wire LLC',
      url: 'https://loosewire.dev',
    },
  };
}

interface FaqItem { q: string; a: string; }

export function faqPageSchema(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

interface ArticleOpts {
  title: string;
  description: string;
  datePublished: string;
  url: string;
  dateModified?: string;
}

export function articleSchema(opts: ArticleOpts) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.title,
    description: opts.description,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    url: opts.url,
    author: {
      '@type': 'Organization',
      name: 'Loose Wire LLC',
      url: 'https://loosewire.dev',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Loose Wire LLC',
      url: 'https://loosewire.dev',
    },
  };
}
```

**Step 4: Run tests to verify they pass**

```bash
pnpm test
```

Expected: 3 passing tests.

**Step 5: Commit**

```bash
git add src/lib/
git commit -m "feat: schema.org utility functions with tests"
```

---

## Task 5: Content collections

**Files:**
- Create: `src/content/config.ts`
- Create: `src/content/harknotes-blog/.gitkeep`
- Create: `src/content/harknotes-vs/.gitkeep`

**Step 1: Configure content collections**

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const harknotsBlog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.string(),
    updatedDate: z.string().optional(),
    keywords: z.array(z.string()).default([]),
  }),
});

const harknotesVs = defineCollection({
  type: 'content',
  schema: z.object({
    competitor: z.string(),           // display name e.g. "Otter.ai"
    competitorSlug: z.string(),       // url slug e.g. "otter-ai"
    description: z.string(),
    pubDate: z.string(),
    keywords: z.array(z.string()).default([]),
  }),
});

export const collections = {
  'harknotes-blog': harknotsBlog,
  'harknotes-vs': harknotesVs,
};
```

**Step 2: Create placeholder files**

```bash
mkdir -p src/content/harknotes-blog src/content/harknotes-vs
touch src/content/harknotes-blog/.gitkeep src/content/harknotes-vs/.gitkeep
```

**Step 3: Verify build passes**

```bash
pnpm build
```

**Step 4: Commit**

```bash
git add src/content/
git commit -m "feat: content collections for harknotes blog and comparison pages"
```

---

## Task 6: loosewire.dev homepage

**Files:**
- Modify: `src/pages/index.astro`

**Step 1: Write the homepage**

```astro
---
// src/pages/index.astro
import LooseWireLayout from '../layouts/LooseWireLayout.astro';
---
<LooseWireLayout
  title="Loose Wire — Small tools, built carefully"
  description="Loose Wire LLC builds focused software tools. Currently: Harknotes, privacy-first meeting transcription."
>
  <main style="max-width: 740px; margin: 0 auto; padding: 0 32px;">

    <header style="padding: 100px 0 64px; text-align: center;">
      <!-- wordmark -->
      <div style="margin-bottom: 48px;">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style="display: inline-block;">
          <rect width="48" height="48" rx="12" fill="#0e1816"/>
          <circle cx="24" cy="24" r="8" stroke="#2e6e62" stroke-width="2" fill="none"/>
          <circle cx="24" cy="24" r="3" fill="#2e6e62"/>
          <line x1="24" y1="8" x2="24" y2="16" stroke="#2e6e62" stroke-width="2" stroke-linecap="round"/>
          <line x1="24" y1="32" x2="24" y2="40" stroke="#2e6e62" stroke-width="2" stroke-linecap="round"/>
          <line x1="8" y1="24" x2="16" y2="24" stroke="#2e6e62" stroke-width="2" stroke-linecap="round"/>
          <line x1="32" y1="24" x2="40" y2="24" stroke="#2e6e62" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </div>
      <h1 style="font-family: var(--lw-font-display); font-size: clamp(36px, 6vw, 52px); font-weight: 800; letter-spacing: -0.035em; line-height: 1; color: var(--lw-text); margin-bottom: 8px;">
        Loose <span style="color: var(--lw-pine);">Wire</span>
      </h1>
      <p style="font-family: var(--lw-font-mono); font-size: 12px; letter-spacing: 0.08em; color: var(--lw-text-dim); text-transform: uppercase; margin-bottom: 32px;">
        Small tools, built carefully
      </p>
      <p style="font-family: var(--lw-font-display); font-size: 18px; font-weight: 400; color: var(--lw-text-mid); max-width: 480px; margin: 0 auto; line-height: 1.6;">
        We build <strong style="color: var(--lw-text); font-weight: 600;">focused software</strong> that respects your privacy and does one thing well.
      </p>
    </header>

    <section style="padding: 0 0 80px;">
      <p style="font-family: var(--lw-font-mono); font-size: 10px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--lw-text-dim); margin-bottom: 20px; padding-bottom: 10px; border-bottom: 1px solid var(--lw-border);">
        Products
      </p>

      <a href="/harknotes" style="display: block; background: var(--lw-surface); border: 1px solid var(--lw-border); border-radius: 16px; padding: 32px; text-decoration: none; transition: border-color 0.15s, box-shadow 0.15s;"
         onmouseover="this.style.borderColor='var(--lw-pine)'; this.style.boxShadow='0 4px 24px rgba(46,110,98,0.1)'"
         onmouseout="this.style.borderColor='var(--lw-border)'; this.style.boxShadow='none'">
        <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 12px;">
          <div style="width: 40px; height: 40px; border-radius: 10px; background: #0e0f11; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="5" stroke="#3dd68c" stroke-width="1.5"/><circle cx="10" cy="10" r="2" fill="#3dd68c"/></svg>
          </div>
          <div>
            <h2 style="font-family: var(--lw-font-display); font-size: 18px; font-weight: 700; color: var(--lw-text); letter-spacing: -0.02em; margin-bottom: 2px;">Harknotes</h2>
            <span style="font-family: var(--lw-font-mono); font-size: 10px; color: var(--lw-pine); letter-spacing: 0.06em;">macOS · Linux</span>
          </div>
        </div>
        <p style="font-size: 15px; color: var(--lw-text-mid); line-height: 1.6; margin-bottom: 16px;">
          Privacy-first meeting transcription. No bot joins your calls. Whisper AI runs locally — audio never leaves your machine.
        </p>
        <span style="font-size: 13px; color: var(--lw-pine); font-weight: 600;">Learn more →</span>
      </a>
    </section>

    <section style="padding: 40px 0 80px; border-top: 1px solid var(--lw-border);">
      <p style="font-family: var(--lw-font-mono); font-size: 10px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--lw-text-dim); margin-bottom: 20px;">
        From the blog
      </p>
      <a href="/blog" style="font-family: var(--lw-font-display); font-size: 15px; color: var(--lw-pine); font-weight: 600; text-decoration: none;">View all articles →</a>
    </section>

  </main>

  <footer style="border-top: 1px solid var(--lw-border); padding: 32px; text-align: center;">
    <p style="font-size: 13px; color: var(--lw-text-dim);">
      © 2026 Loose Wire LLC ·
      <a href="/harknotes" style="color: var(--lw-text-mid); text-decoration: none;">Harknotes</a> ·
      <a href="/blog" style="color: var(--lw-text-mid); text-decoration: none;">Blog</a>
    </p>
  </footer>
</LooseWireLayout>
```

**Step 2: Build and verify**

```bash
pnpm build && pnpm preview
```

Open `http://localhost:4321` and verify the homepage renders.

**Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: loosewire.dev homepage"
```

---

## Task 7: Harknotes landing page

**Files:**
- Create: `src/pages/harknotes/index.astro`

This is the main product page. Build it in sections — each section is a `<section>` element. Use `HarknotesLayout` with `SoftwareApplication` schema.

**Step 1: Define FAQ data and pricing data (top of file)**

```astro
---
// src/pages/harknotes/index.astro
import HarknotesLayout from '../../layouts/HarknotesLayout.astro';
import { softwareAppSchema, faqPageSchema } from '../../lib/schema';

const faqItems = [
  {
    q: 'Does a bot join my meeting?',
    a: 'No. Harknotes captures your system audio and microphone directly on your Mac or Linux machine. No bot, no meeting link, no recording indicator visible to other participants.',
  },
  {
    q: 'Does my audio ever leave my machine?',
    a: 'Never. Transcription runs entirely locally using whisper.cpp — a compiled binary bundled with the app. Only the text transcript is sent to the AI for summarisation.',
  },
  {
    q: 'Which platforms are supported?',
    a: 'macOS 13+ and Linux (AppImage, DEB, RPM). Windows support is on the roadmap.',
  },
  {
    q: 'How does speaker identification work?',
    a: 'Harknotes captures microphone and system audio as separate streams. Your mic is labelled "You", and other speakers are identified using tinydiarize, a local speaker diarisation model.',
  },
  {
    q: 'What AI model generates the notes?',
    a: 'GPT-4o mini via a secure proxy API. The transcript text is sent for summarisation — no audio, no personal metadata.',
  },
  {
    q: 'What is the free tier?',
    a: 'The free tier includes 10 AI note summaries per month. Recording and local transcription are unlimited on all tiers.',
  },
  {
    q: 'Where are my notes saved?',
    a: 'Notes are saved as Markdown files to a folder you choose on your machine — great for Obsidian, Notion imports, or plain file storage.',
  },
  {
    q: 'Do you support auto-detection of meetings?',
    a: 'Yes. Harknotes can watch for Google Meet, Zoom, and Teams and prompt you to start recording when detected.',
  },
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    softwareAppSchema(),
    faqPageSchema(faqItems),
  ],
};
---
<HarknotesLayout
  title="Harknotes — Private Meeting Transcription. No Bot."
  description="Meeting transcription that doesn't join your call. Local whisper AI, speaker labels, markdown notes. macOS & Linux."
  schema={schema}
>
```

**Step 2: Hero section**

```astro
  <!-- HERO -->
  <header style="background: var(--hk-bg); border-bottom: 1px solid var(--hk-border-subtle);">
    <nav style="max-width: 1100px; margin: 0 auto; padding: 20px 32px; display: flex; justify-content: space-between; align-items: center;">
      <a href="/" style="font-family: 'Geist', sans-serif; font-size: 14px; color: var(--hk-text-tertiary); text-decoration: none;">loosewire.dev</a>
      <div style="display: flex; gap: 24px; align-items: center;">
        <a href="/harknotes/blog" style="font-size: 14px; color: var(--hk-text-secondary); text-decoration: none;">Blog</a>
        <a href="#pricing" style="font-size: 14px; color: var(--hk-text-secondary); text-decoration: none;">Pricing</a>
        <a href="#download" style="font-size: 13px; font-weight: 600; color: var(--hk-text-inverse); background: var(--hk-mint); padding: 8px 18px; border-radius: 8px; text-decoration: none;">Download</a>
      </div>
    </nav>

    <div style="max-width: 800px; margin: 0 auto; padding: 100px 32px 120px; text-align: center;">
      <div style="display: inline-flex; align-items: center; gap: 8px; background: var(--hk-mint-subtle); border: 1px solid rgba(61,214,140,0.2); border-radius: 100px; padding: 6px 14px; margin-bottom: 40px;">
        <span style="width: 6px; height: 6px; border-radius: 50%; background: var(--hk-mint); display: inline-block;"></span>
        <span style="font-family: 'Geist Mono', monospace; font-size: 11px; color: var(--hk-mint); letter-spacing: 0.06em;">No bot. No cloud audio. Local whisper.</span>
      </div>
      <h1 style="font-size: clamp(36px, 6vw, 64px); font-weight: 800; letter-spacing: -0.04em; line-height: 1.05; color: var(--hk-text-primary); margin-bottom: 24px;">
        Meeting notes<br/>without the<br/><span style="color: var(--hk-mint);">privacy trade-off</span>
      </h1>
      <p style="font-size: clamp(16px, 2vw, 20px); color: var(--hk-text-secondary); max-width: 560px; margin: 0 auto 48px; line-height: 1.6;">
        Harknotes transcribes your meetings locally using Whisper AI. No bot joins your call. No audio leaves your machine. You get clean, structured notes saved as Markdown.
      </p>
      <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
        <a href="#download" style="font-size: 15px; font-weight: 600; color: var(--hk-text-inverse); background: var(--hk-mint); padding: 14px 28px; border-radius: 10px; text-decoration: none;">
          Download free
        </a>
        <a href="#how-it-works" style="font-size: 15px; font-weight: 500; color: var(--hk-text-secondary); background: var(--hk-surface-2); padding: 14px 28px; border-radius: 10px; text-decoration: none; border: 1px solid var(--hk-border);">
          How it works
        </a>
      </div>
    </div>
  </header>
```

**Step 3: Problem, How it works, Features, Pricing, Download, FAQ, Footer**

After the hero, continue in the same file with these sections. Each is a `<section>` with `id` attributes matching nav anchor links.

```astro
  <main>

    <!-- PROBLEM -->
    <section style="max-width: 900px; margin: 0 auto; padding: 96px 32px; text-align: center;">
      <p style="font-family: 'Geist Mono', monospace; font-size: 11px; color: var(--hk-mint); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 16px;">The problem</p>
      <h2 style="font-size: clamp(28px, 4vw, 44px); font-weight: 700; letter-spacing: -0.03em; color: var(--hk-text-primary); margin-bottom: 20px; line-height: 1.1;">
        Every other tool sends a bot into your meeting
      </h2>
      <p style="font-size: 17px; color: var(--hk-text-secondary); max-width: 600px; margin: 0 auto 56px; line-height: 1.7;">
        Otter, Fireflies, tl;dv — they all join as a participant. Everyone can see it. Your audio is uploaded to their servers. You're locked into their ecosystem.
      </p>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; text-align: left;">
        {[
          { icon: '👀', title: 'Visible to everyone', desc: 'A bot joining your call signals to all participants that you\'re recording. Awkward in client calls, problematic in sensitive discussions.' },
          { icon: '☁️', title: 'Audio sent to the cloud', desc: 'Your meeting audio — containing confidential business information — is uploaded to third-party servers you don\'t control.' },
          { icon: '🔒', title: 'Compliance risk', desc: 'GDPR, HIPAA, NDA clauses — cloud recording creates real legal exposure. Many companies ban these tools entirely.' },
        ].map(({ icon, title, desc }) => (
          <div style="background: var(--hk-surface-1); border: 1px solid var(--hk-border); border-radius: 14px; padding: 28px;">
            <div style="font-size: 28px; margin-bottom: 12px;">{icon}</div>
            <h3 style="font-size: 15px; font-weight: 600; color: var(--hk-text-primary); margin-bottom: 8px;">{title}</h3>
            <p style="font-size: 14px; color: var(--hk-text-secondary); line-height: 1.6;">{desc}</p>
          </div>
        ))}
      </div>
    </section>

    <!-- HOW IT WORKS -->
    <section id="how-it-works" style="background: var(--hk-surface-1); border-top: 1px solid var(--hk-border-subtle); border-bottom: 1px solid var(--hk-border-subtle);">
      <div style="max-width: 900px; margin: 0 auto; padding: 96px 32px; text-align: center;">
        <p style="font-family: 'Geist Mono', monospace; font-size: 11px; color: var(--hk-mint); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 16px;">How it works</p>
        <h2 style="font-size: clamp(28px, 4vw, 44px); font-weight: 700; letter-spacing: -0.03em; color: var(--hk-text-primary); margin-bottom: 56px; line-height: 1.1;">
          Three steps. Everything stays local.
        </h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 32px; text-align: left;">
          {[
            { n: '01', title: 'Record', desc: 'Click record in the menu bar or let Harknotes auto-detect when Google Meet, Zoom, or Teams opens. Mic and system audio captured separately.' },
            { n: '02', title: 'Transcribe locally', desc: 'When the meeting ends, whisper.cpp runs on your machine. No internet required. Speaker diarisation identifies who said what.' },
            { n: '03', title: 'Get structured notes', desc: 'A clean summary, action items, decisions, and full transcript are generated and saved as Markdown to your chosen folder.' },
          ].map(({ n, title, desc }) => (
            <div>
              <div style="font-family: 'Geist Mono', monospace; font-size: 36px; font-weight: 600; color: var(--hk-mint); margin-bottom: 16px; opacity: 0.4;">{n}</div>
              <h3 style="font-size: 18px; font-weight: 600; color: var(--hk-text-primary); margin-bottom: 10px; letter-spacing: -0.02em;">{title}</h3>
              <p style="font-size: 14px; color: var(--hk-text-secondary); line-height: 1.7;">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <!-- FEATURES -->
    <section style="max-width: 1000px; margin: 0 auto; padding: 96px 32px;">
      <p style="font-family: 'Geist Mono', monospace; font-size: 11px; color: var(--hk-mint); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 16px; text-align: center;">Features</p>
      <h2 style="font-size: clamp(28px, 4vw, 44px); font-weight: 700; letter-spacing: -0.03em; color: var(--hk-text-primary); margin-bottom: 56px; line-height: 1.1; text-align: center;">
        Built for privacy-conscious teams
      </h2>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 12px;">
        {[
          { title: 'No bot, no trace', desc: 'Silent capture — no recording indicator visible to other participants.' },
          { title: 'Local Whisper AI', desc: 'whisper.cpp runs as a bundled binary. Transcription works offline.' },
          { title: 'Speaker diarisation', desc: 'Identifies speakers from mic vs system audio. Rename them in the app.' },
          { title: 'Markdown output', desc: 'Notes saved to any folder. Works with Obsidian, Notion imports, git.' },
          { title: 'Auto-detect meetings', desc: 'Watches for Zoom, Meet, Teams. Prompts you to record when they start.' },
          { title: 'macOS + Linux', desc: 'Native audio capture on both platforms. AppImage, DEB, RPM available.' },
          { title: 'Structured notes', desc: 'Summary, action items, decisions, full transcript — every time.' },
          { title: 'Usage control', desc: 'See exactly how many summaries you\'ve used. Hard limits, no surprise bills.' },
        ].map(({ title, desc }) => (
          <div style="background: var(--hk-surface-1); border: 1px solid var(--hk-border); border-radius: 12px; padding: 24px;">
            <div style="width: 6px; height: 6px; border-radius: 50%; background: var(--hk-mint); margin-bottom: 16px;"></div>
            <h3 style="font-size: 14px; font-weight: 600; color: var(--hk-text-primary); margin-bottom: 6px;">{title}</h3>
            <p style="font-size: 13px; color: var(--hk-text-secondary); line-height: 1.6;">{desc}</p>
          </div>
        ))}
      </div>
    </section>

    <!-- PRICING -->
    <section id="pricing" style="background: var(--hk-surface-1); border-top: 1px solid var(--hk-border-subtle); border-bottom: 1px solid var(--hk-border-subtle);">
      <div style="max-width: 900px; margin: 0 auto; padding: 96px 32px; text-align: center;">
        <p style="font-family: 'Geist Mono', monospace; font-size: 11px; color: var(--hk-mint); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 16px;">Pricing</p>
        <h2 style="font-size: clamp(28px, 4vw, 44px); font-weight: 700; letter-spacing: -0.03em; color: var(--hk-text-primary); margin-bottom: 16px; line-height: 1.1;">Simple, honest pricing</h2>
        <p style="font-size: 17px; color: var(--hk-text-secondary); margin-bottom: 56px;">Recording and local transcription are unlimited on all tiers. You pay for AI summaries.</p>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; text-align: left;">
          {[
            { name: 'Free', price: '$0', period: 'forever', summaries: '10 summaries / month', features: ['Unlimited recording', 'Local transcription', 'Speaker diarisation', 'Markdown export'], highlight: false },
            { name: 'Local', price: '$6', period: '/month', summaries: '50 summaries / month', features: ['Everything in Free', 'Priority transcription', 'Email support'], highlight: true },
            { name: 'Pro Local', price: '$12', period: '/month', summaries: '200 summaries / month', features: ['Everything in Local', 'Longer recording limit', 'Priority support'], highlight: false },
          ].map(({ name, price, period, summaries, features, highlight }) => (
            <div style={`background: ${highlight ? 'var(--hk-mint-subtle)' : 'var(--hk-bg)'}; border: 1px solid ${highlight ? 'rgba(61,214,140,0.3)' : 'var(--hk-border)'}; border-radius: 16px; padding: 32px;`}>
              <h3 style="font-size: 15px; font-weight: 600; color: var(--hk-text-primary); margin-bottom: 4px;">{name}</h3>
              <div style="margin-bottom: 8px;">
                <span style="font-size: 36px; font-weight: 700; color: var(--hk-text-primary); letter-spacing: -0.03em;">{price}</span>
                <span style="font-size: 14px; color: var(--hk-text-secondary);">{period}</span>
              </div>
              <p style="font-family: 'Geist Mono', monospace; font-size: 11px; color: var(--hk-mint); margin-bottom: 24px;">{summaries}</p>
              <ul style="list-style: none; margin-bottom: 28px;">
                {features.map(f => (
                  <li style="font-size: 14px; color: var(--hk-text-secondary); padding: 5px 0; display: flex; gap: 8px; align-items: flex-start;">
                    <span style="color: var(--hk-mint); flex-shrink: 0;">✓</span> {f}
                  </li>
                ))}
              </ul>
              <a href="#download" style={`display: block; text-align: center; padding: 11px; border-radius: 8px; font-size: 14px; font-weight: 600; text-decoration: none; ${highlight ? 'background: var(--hk-mint); color: var(--hk-text-inverse);' : 'background: var(--hk-surface-2); color: var(--hk-text-primary); border: 1px solid var(--hk-border);'}`}>
                Get started
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>

    <!-- DOWNLOAD -->
    <section id="download" style="max-width: 800px; margin: 0 auto; padding: 96px 32px; text-align: center;">
      <p style="font-family: 'Geist Mono', monospace; font-size: 11px; color: var(--hk-mint); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 16px;">Download</p>
      <h2 style="font-size: clamp(28px, 4vw, 44px); font-weight: 700; letter-spacing: -0.03em; color: var(--hk-text-primary); margin-bottom: 16px; line-height: 1.1;">
        Get Harknotes
      </h2>
      <p style="font-size: 17px; color: var(--hk-text-secondary); margin-bottom: 48px;">Free to download. No account required to try it.</p>
      <div style="display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; margin-bottom: 24px;">
        <a href="https://github.com/LooseWireDev/harknotes/releases/latest" style="display: flex; align-items: center; gap: 10px; background: var(--hk-surface-1); border: 1px solid var(--hk-border); border-radius: 10px; padding: 14px 24px; text-decoration: none; font-size: 14px; font-weight: 500; color: var(--hk-text-primary);">
          <span>macOS</span><span style="font-family: 'Geist Mono', monospace; font-size: 11px; color: var(--hk-text-tertiary);">DMG</span>
        </a>
        <a href="https://github.com/LooseWireDev/harknotes/releases/latest" style="display: flex; align-items: center; gap: 10px; background: var(--hk-surface-1); border: 1px solid var(--hk-border); border-radius: 10px; padding: 14px 24px; text-decoration: none; font-size: 14px; font-weight: 500; color: var(--hk-text-primary);">
          <span>Linux</span><span style="font-family: 'Geist Mono', monospace; font-size: 11px; color: var(--hk-text-tertiary);">AppImage</span>
        </a>
        <a href="https://github.com/LooseWireDev/harknotes/releases/latest" style="display: flex; align-items: center; gap: 10px; background: var(--hk-surface-1); border: 1px solid var(--hk-border); border-radius: 10px; padding: 14px 24px; text-decoration: none; font-size: 14px; font-weight: 500; color: var(--hk-text-primary);">
          <span>Linux</span><span style="font-family: 'Geist Mono', monospace; font-size: 11px; color: var(--hk-text-tertiary);">DEB</span>
        </a>
        <a href="https://github.com/LooseWireDev/harknotes/releases/latest" style="display: flex; align-items: center; gap: 10px; background: var(--hk-surface-1); border: 1px solid var(--hk-border); border-radius: 10px; padding: 14px 24px; text-decoration: none; font-size: 14px; font-weight: 500; color: var(--hk-text-primary);">
          <span>Linux</span><span style="font-family: 'Geist Mono', monospace; font-size: 11px; color: var(--hk-text-tertiary);">RPM</span>
        </a>
      </div>
      <p style="font-size: 13px; color: var(--hk-text-tertiary);">
        View all releases on <a href="https://github.com/LooseWireDev/harknotes/releases" style="color: var(--hk-text-secondary);">GitHub</a>
      </p>
    </section>

    <!-- FAQ -->
    <section style="background: var(--hk-surface-1); border-top: 1px solid var(--hk-border-subtle);">
      <div style="max-width: 720px; margin: 0 auto; padding: 96px 32px;">
        <p style="font-family: 'Geist Mono', monospace; font-size: 11px; color: var(--hk-mint); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 16px; text-align: center;">FAQ</p>
        <h2 style="font-size: clamp(28px, 4vw, 40px); font-weight: 700; letter-spacing: -0.03em; color: var(--hk-text-primary); margin-bottom: 48px; line-height: 1.1; text-align: center;">
          Common questions
        </h2>
        <div style="display: flex; flex-direction: column; gap: 2px;">
          {faqItems.map(({ q, a }) => (
            <div style="border-bottom: 1px solid var(--hk-border-subtle); padding: 24px 0;">
              <h3 style="font-size: 15px; font-weight: 600; color: var(--hk-text-primary); margin-bottom: 10px;">{q}</h3>
              <p style="font-size: 14px; color: var(--hk-text-secondary); line-height: 1.7;">{a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

  </main>

  <!-- FOOTER -->
  <footer style="border-top: 1px solid var(--hk-border-subtle); padding: 40px 32px;">
    <div style="max-width: 1100px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
      <div>
        <p style="font-size: 14px; font-weight: 600; color: var(--hk-text-primary); margin-bottom: 4px;">Harknotes</p>
        <p style="font-size: 13px; color: var(--hk-text-tertiary);">by <a href="/" style="color: var(--hk-text-secondary); text-decoration: none;">Loose Wire LLC</a></p>
      </div>
      <nav style="display: flex; gap: 24px; flex-wrap: wrap;">
        <a href="/harknotes/privacy" style="font-size: 13px; color: var(--hk-text-secondary); text-decoration: none;">Privacy</a>
        <a href="/harknotes/linux" style="font-size: 13px; color: var(--hk-text-secondary); text-decoration: none;">Linux</a>
        <a href="/harknotes/blog" style="font-size: 13px; color: var(--hk-text-secondary); text-decoration: none;">Blog</a>
        <a href="/harknotes/vs/otter-ai" style="font-size: 13px; color: var(--hk-text-secondary); text-decoration: none;">vs Otter.ai</a>
        <a href="https://github.com/LooseWireDev/harknotes" style="font-size: 13px; color: var(--hk-text-secondary); text-decoration: none;">GitHub</a>
      </nav>
    </div>
  </footer>

</HarknotesLayout>
```

**Step 4: Build and visually verify**

```bash
pnpm build && pnpm preview
```

Open `http://localhost:4321/harknotes`. Check dark/light auto-theme by toggling system appearance.

**Step 5: Commit**

```bash
git add src/pages/harknotes/
git commit -m "feat: harknotes landing page with all sections"
```

---

## Task 8: Harknotes blog pages

**Files:**
- Create: `src/pages/harknotes/blog/index.astro`
- Create: `src/pages/harknotes/blog/[slug].astro`

**Step 1: Blog index**

```astro
---
// src/pages/harknotes/blog/index.astro
import HarknotesLayout from '../../../layouts/HarknotesLayout.astro';
import { getCollection } from 'astro:content';

const posts = (await getCollection('harknotes-blog')).sort(
  (a, b) => new Date(b.data.pubDate).valueOf() - new Date(a.data.pubDate).valueOf()
);
---
<HarknotesLayout
  title="Harknotes Blog — Meeting Transcription Insights"
  description="Articles on privacy-first meeting transcription, local AI, and productivity."
>
  <nav style="padding: 20px 32px; border-bottom: 1px solid var(--hk-border-subtle);">
    <a href="/harknotes" style="font-size: 14px; color: var(--hk-text-secondary); text-decoration: none;">← Harknotes</a>
  </nav>

  <main style="max-width: 720px; margin: 0 auto; padding: 64px 32px;">
    <h1 style="font-size: clamp(28px, 4vw, 40px); font-weight: 700; letter-spacing: -0.03em; color: var(--hk-text-primary); margin-bottom: 8px;">Blog</h1>
    <p style="font-size: 16px; color: var(--hk-text-secondary); margin-bottom: 48px; line-height: 1.6;">
      Articles on privacy-first meeting transcription, local AI, and getting more from your meetings.
    </p>

    {posts.length === 0 && (
      <p style="color: var(--hk-text-tertiary);">Articles coming soon.</p>
    )}

    <div style="display: flex; flex-direction: column; gap: 0;">
      {posts.map(post => (
        <a href={`/harknotes/blog/${post.slug}`}
           style="display: block; padding: 28px 0; border-bottom: 1px solid var(--hk-border-subtle); text-decoration: none;">
          <p style="font-family: 'Geist Mono', monospace; font-size: 11px; color: var(--hk-text-tertiary); margin-bottom: 8px;">{post.data.pubDate}</p>
          <h2 style="font-size: 18px; font-weight: 600; color: var(--hk-text-primary); margin-bottom: 8px; letter-spacing: -0.02em;">{post.data.title}</h2>
          <p style="font-size: 14px; color: var(--hk-text-secondary); line-height: 1.6;">{post.data.description}</p>
        </a>
      ))}
    </div>
  </main>
</HarknotesLayout>
```

**Step 2: Blog post page**

```astro
---
// src/pages/harknotes/blog/[slug].astro
import HarknotesLayout from '../../../layouts/HarknotesLayout.astro';
import { getCollection } from 'astro:content';
import { articleSchema } from '../../../lib/schema';

export async function getStaticPaths() {
  const posts = await getCollection('harknotes-blog');
  return posts.map(post => ({ params: { slug: post.slug }, props: { post } }));
}

const { post } = Astro.props;
const { Content } = await post.render();
const canonicalUrl = `https://loosewire.dev/harknotes/blog/${post.slug}`;
const schema = articleSchema({
  title: post.data.title,
  description: post.data.description,
  datePublished: post.data.pubDate,
  dateModified: post.data.updatedDate,
  url: canonicalUrl,
});
---
<HarknotesLayout
  title={`${post.data.title} — Harknotes Blog`}
  description={post.data.description}
  canonicalUrl={canonicalUrl}
  schema={schema}
>
  <nav style="padding: 20px 32px; border-bottom: 1px solid var(--hk-border-subtle);">
    <a href="/harknotes/blog" style="font-size: 14px; color: var(--hk-text-secondary); text-decoration: none;">← Blog</a>
  </nav>

  <article style="max-width: 720px; margin: 0 auto; padding: 64px 32px;">
    <p style="font-family: 'Geist Mono', monospace; font-size: 11px; color: var(--hk-text-tertiary); margin-bottom: 16px;">{post.data.pubDate}</p>
    <h1 style="font-size: clamp(28px, 4vw, 44px); font-weight: 700; letter-spacing: -0.03em; color: var(--hk-text-primary); margin-bottom: 24px; line-height: 1.1;">{post.data.title}</h1>
    <p style="font-size: 18px; color: var(--hk-text-secondary); margin-bottom: 48px; line-height: 1.6; border-bottom: 1px solid var(--hk-border-subtle); padding-bottom: 32px;">{post.data.description}</p>

    <div class="prose">
      <Content />
    </div>

    <div style="margin-top: 64px; padding-top: 32px; border-top: 1px solid var(--hk-border-subtle); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
      <a href="/harknotes" style="font-size: 14px; color: var(--hk-mint); text-decoration: none; font-weight: 500;">Try Harknotes →</a>
      <a href="/harknotes/blog" style="font-size: 14px; color: var(--hk-text-secondary); text-decoration: none;">← All articles</a>
    </div>
  </article>
</HarknotesLayout>

<style>
  .prose { color: var(--hk-text-secondary); font-size: 16px; line-height: 1.8; }
  .prose h2 { font-size: 24px; font-weight: 700; color: var(--hk-text-primary); margin: 40px 0 16px; letter-spacing: -0.02em; }
  .prose h3 { font-size: 18px; font-weight: 600; color: var(--hk-text-primary); margin: 32px 0 12px; }
  .prose p { margin-bottom: 20px; }
  .prose ul, .prose ol { padding-left: 24px; margin-bottom: 20px; }
  .prose li { margin-bottom: 8px; }
  .prose strong { color: var(--hk-text-primary); font-weight: 600; }
  .prose a { color: var(--hk-mint); }
  .prose code { font-family: 'Geist Mono', monospace; font-size: 13px; background: var(--hk-surface-2); padding: 2px 6px; border-radius: 4px; }
</style>
```

**Step 3: Build and verify**

```bash
pnpm build
```

Expected: Build passes. Blog routes exist (no posts yet = empty state shown).

**Step 4: Commit**

```bash
git add src/pages/harknotes/blog/
git commit -m "feat: harknotes blog index and post pages"
```

---

## Task 9: Comparison pages

**Files:**
- Create: `src/pages/harknotes/vs/[competitor].astro`

**Step 1: Create the comparison page template**

```astro
---
// src/pages/harknotes/vs/[competitor].astro
import HarknotesLayout from '../../../layouts/HarknotesLayout.astro';
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const pages = await getCollection('harknotes-vs');
  return pages.map(page => ({ params: { competitor: page.data.competitorSlug }, props: { page } }));
}

const { page } = Astro.props;
const { Content } = await page.render();
const canonicalUrl = `https://loosewire.dev/harknotes/vs/${page.data.competitorSlug}`;
---
<HarknotesLayout
  title={`Harknotes vs ${page.data.competitor} — Privacy-First Alternative`}
  description={page.data.description}
  canonicalUrl={canonicalUrl}
>
  <nav style="padding: 20px 32px; border-bottom: 1px solid var(--hk-border-subtle);">
    <a href="/harknotes" style="font-size: 14px; color: var(--hk-text-secondary); text-decoration: none;">← Harknotes</a>
  </nav>

  <article style="max-width: 720px; margin: 0 auto; padding: 64px 32px;">
    <p style="font-family: 'Geist Mono', monospace; font-size: 11px; color: var(--hk-mint); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 16px;">Comparison</p>
    <h1 style="font-size: clamp(28px, 4vw, 44px); font-weight: 700; letter-spacing: -0.03em; color: var(--hk-text-primary); margin-bottom: 24px; line-height: 1.1;">
      Harknotes vs {page.data.competitor}
    </h1>
    <p style="font-size: 18px; color: var(--hk-text-secondary); margin-bottom: 48px; line-height: 1.6; border-bottom: 1px solid var(--hk-border-subtle); padding-bottom: 32px;">
      {page.data.description}
    </p>

    <div class="prose">
      <Content />
    </div>

    <div style="margin-top: 64px; padding: 32px; background: var(--hk-mint-subtle); border: 1px solid rgba(61,214,140,0.2); border-radius: 16px; text-align: center;">
      <h2 style="font-size: 22px; font-weight: 700; color: var(--hk-text-primary); margin-bottom: 12px;">Ready to switch?</h2>
      <p style="font-size: 15px; color: var(--hk-text-secondary); margin-bottom: 24px;">Free tier available. No account required to try it.</p>
      <a href="/harknotes#download" style="display: inline-block; background: var(--hk-mint); color: var(--hk-text-inverse); font-size: 15px; font-weight: 600; padding: 12px 28px; border-radius: 10px; text-decoration: none;">
        Download Harknotes →
      </a>
    </div>
  </article>
</HarknotesLayout>

<style>
  .prose { color: var(--hk-text-secondary); font-size: 16px; line-height: 1.8; }
  .prose h2 { font-size: 24px; font-weight: 700; color: var(--hk-text-primary); margin: 40px 0 16px; letter-spacing: -0.02em; }
  .prose h3 { font-size: 18px; font-weight: 600; color: var(--hk-text-primary); margin: 32px 0 12px; }
  .prose p { margin-bottom: 20px; }
  .prose table { width: 100%; border-collapse: collapse; margin-bottom: 28px; }
  .prose th { text-align: left; font-size: 12px; font-weight: 600; color: var(--hk-text-tertiary); text-transform: uppercase; letter-spacing: 0.08em; padding: 10px 12px; border-bottom: 1px solid var(--hk-border); }
  .prose td { padding: 12px; border-bottom: 1px solid var(--hk-border-subtle); font-size: 14px; }
  .prose strong { color: var(--hk-text-primary); font-weight: 600; }
  .prose ul { padding-left: 24px; margin-bottom: 20px; }
  .prose li { margin-bottom: 8px; }
</style>
```

**Step 2: Create comparison MDX files**

```bash
mkdir -p src/content/harknotes-vs
```

Create `src/content/harknotes-vs/otter-ai.mdx`:

```mdx
---
competitor: "Otter.ai"
competitorSlug: "otter-ai"
description: "Otter.ai sends a bot into your meetings and uploads your audio to the cloud. Harknotes transcribes locally — no bot, no cloud audio, no compliance risk."
pubDate: "2026-03-06"
keywords: ["otter ai alternative", "otter ai privacy", "meeting transcription no bot", "local meeting transcription"]
---

## The key difference: where your audio goes

Otter.ai works by joining your meeting as a participant. It records the call from inside the meeting room, uploads the audio to Otter's servers, and transcribes it there.

Harknotes captures audio directly from your operating system. No bot joins your meeting. No one else can see a recording indicator. Your audio is transcribed on your machine using [whisper.cpp](https://github.com/ggerganov/whisper.cpp) — a local AI model.

## Feature comparison

| Feature | Harknotes | Otter.ai |
|---|---|---|
| Bot joins your meeting | **No** | Yes |
| Audio sent to cloud | **No** | Yes |
| Works offline | **Yes** | No |
| macOS support | **Yes** | Yes |
| Linux support | **Yes** | No |
| Free tier | **10 summaries/mo** | 300 minutes/mo |
| Speaker diarisation | **Yes (local)** | Yes (cloud) |
| Markdown export | **Yes** | No |

## Privacy

Otter.ai's privacy policy states that audio recordings are stored on their servers. This creates risk for:

- **GDPR compliance** — participant consent, data residency requirements
- **NDA-protected conversations** — legal, financial, and HR meetings
- **Client calls** — many clients object to being recorded by a third-party service

Harknotes' approach: audio never leaves your machine. Only the text transcript is sent to the AI for summarisation, and that's under your control.

## Pricing comparison

Otter.ai's paid plans start at $16.99/month. Harknotes Local is $6/month, with a generous free tier for casual users.

## Who should use Harknotes instead of Otter.ai?

- Teams with GDPR or compliance requirements
- Anyone who can't have a recording bot visible in client meetings
- Linux users (Otter has no Linux app)
- People who want their notes as Markdown files
```

Create `src/content/harknotes-vs/fireflies.mdx`:

```mdx
---
competitor: "Fireflies.ai"
competitorSlug: "fireflies"
description: "Fireflies.ai is a cloud-based meeting recorder that joins as a bot. Harknotes is the privacy-first alternative — local transcription, no bot, no audio in the cloud."
pubDate: "2026-03-06"
keywords: ["fireflies ai alternative", "fireflies privacy", "no bot meeting recorder", "private meeting transcription"]
---

## Fireflies vs Harknotes: cloud vs local

Fireflies.ai is a powerful meeting intelligence platform — but it works by sending "Fred" (their bot) into every meeting. Fred joins as a participant, records the audio, and uploads it to Fireflies' cloud for processing.

Harknotes takes the opposite approach. It captures your system audio and microphone locally, runs Whisper AI on your machine, and never sends audio anywhere.

## Feature comparison

| Feature | Harknotes | Fireflies.ai |
|---|---|---|
| Bot joins meeting | **No** | Yes (Fred bot) |
| Audio stored in cloud | **No** | Yes |
| Works offline | **Yes** | No |
| Linux support | **Yes** | No |
| Markdown notes | **Yes** | No (proprietary format) |
| Free tier | **Yes** | Limited |
| Speaker labels | **Yes** | Yes |

## The bot problem

Fireflies' Fred bot is visible to every meeting participant. In many situations this is a problem:

- Client calls where you haven't obtained recording consent
- Legal, HR, or sensitive internal discussions
- Calls with participants in jurisdictions with strict recording laws

With Harknotes, no one in the meeting knows you're transcribing. There's nothing to see.

## Who should use Harknotes instead of Fireflies?

- Anyone who needs transcription without a visible bot
- Privacy-focused teams or those with compliance requirements
- Linux users
- Teams that want notes in Markdown for use with Obsidian or other tools
```

Create `src/content/harknotes-vs/tl-dv.mdx`:

```mdx
---
competitor: "tl;dv"
competitorSlug: "tl-dv"
description: "tl;dv records meetings via a browser extension and cloud storage. Harknotes transcribes locally — no extension, no cloud audio, works on any platform."
pubDate: "2026-03-06"
keywords: ["tldv alternative", "tl dv alternative", "local meeting transcription", "meeting recorder no extension"]
---

## tl;dv vs Harknotes

tl;dv is a popular meeting recorder for Google Meet and Zoom. It works via a browser extension that captures the meeting and uploads recordings to tl;dv's cloud.

Harknotes is a desktop app that captures audio at the OS level — no browser extension required, works with any meeting platform (or no meeting platform at all).

## Feature comparison

| Feature | Harknotes | tl;dv |
|---|---|---|
| Requires browser extension | **No** | Yes |
| Audio stored in cloud | **No** | Yes |
| Works with any meeting tool | **Yes** | Google Meet, Zoom, Teams only |
| Linux support | **Yes** | Limited |
| Offline transcription | **Yes** | No |
| Markdown export | **Yes** | No |
| Free tier | **10 summaries/mo** | Limited |

## Platform flexibility

tl;dv only works with Google Meet, Zoom, and Teams. Harknotes captures system audio — so it works with any meeting platform: Webex, Whereby, Discord, a phone call on speaker, or an in-person conversation.

## Who should use Harknotes instead of tl;dv?

- People using platforms other than Meet/Zoom/Teams
- Anyone who prefers not to install a browser extension
- Privacy-conscious users who don't want meeting audio in the cloud
- Linux users
```

**Step 3: Build and verify**

```bash
pnpm build
```

Expected: Three comparison pages built at `/harknotes/vs/otter-ai`, `/harknotes/vs/fireflies`, `/harknotes/vs/tl-dv`.

**Step 4: Commit**

```bash
git add src/pages/harknotes/vs/ src/content/harknotes-vs/
git commit -m "feat: comparison pages for otter-ai, fireflies, tl-dv"
```

---

## Task 10: Privacy and Linux pages

**Files:**
- Create: `src/pages/harknotes/privacy.astro`
- Create: `src/pages/harknotes/linux.astro`

**Step 1: Privacy page**

```astro
---
// src/pages/harknotes/privacy.astro
import HarknotesLayout from '../../layouts/HarknotesLayout.astro';
---
<HarknotesLayout
  title="Harknotes Privacy — Local Audio, No Cloud Recording"
  description="How Harknotes keeps your meetings private: local whisper transcription, no audio upload, only text sent for AI summarisation."
  canonicalUrl="https://loosewire.dev/harknotes/privacy"
>
  <nav style="padding: 20px 32px; border-bottom: 1px solid var(--hk-border-subtle);">
    <a href="/harknotes" style="font-size: 14px; color: var(--hk-text-secondary); text-decoration: none;">← Harknotes</a>
  </nav>
  <main style="max-width: 720px; margin: 0 auto; padding: 64px 32px;">
    <p style="font-family: 'Geist Mono', monospace; font-size: 11px; color: var(--hk-mint); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 16px;">Privacy</p>
    <h1 style="font-size: clamp(28px, 4vw, 44px); font-weight: 700; letter-spacing: -0.03em; color: var(--hk-text-primary); margin-bottom: 24px; line-height: 1.1;">
      Your meetings stay on your machine
    </h1>
    <p style="font-size: 18px; color: var(--hk-text-secondary); margin-bottom: 48px; line-height: 1.6; border-bottom: 1px solid var(--hk-border-subtle); padding-bottom: 32px;">
      Harknotes is built around a single principle: your audio never leaves your device. Here's exactly what stays local and what doesn't.
    </p>

    <div style="display: flex; flex-direction: column; gap: 40px; color: var(--hk-text-secondary); font-size: 16px; line-height: 1.8;">

      <section>
        <h2 style="font-size: 22px; font-weight: 700; color: var(--hk-text-primary); margin-bottom: 16px; letter-spacing: -0.02em;">What stays on your machine</h2>
        <ul style="padding-left: 24px; margin-bottom: 20px;">
          <li style="margin-bottom: 10px;"><strong style="color: var(--hk-text-primary);">All audio</strong> — mic and system audio captured, processed, and deleted locally. Never transmitted.</li>
          <li style="margin-bottom: 10px;"><strong style="color: var(--hk-text-primary);">WAV files</strong> — temporary audio files created during recording are deleted after transcription.</li>
          <li style="margin-bottom: 10px;"><strong style="color: var(--hk-text-primary);">Transcript and notes</strong> — saved as Markdown to the folder you choose. No sync, no cloud backup.</li>
          <li style="margin-bottom: 10px;"><strong style="color: var(--hk-text-primary);">Whisper model weights</strong> — downloaded once to your machine. Transcription runs entirely offline.</li>
        </ul>
      </section>

      <section>
        <h2 style="font-size: 22px; font-weight: 700; color: var(--hk-text-primary); margin-bottom: 16px; letter-spacing: -0.02em;">What leaves your machine</h2>
        <ul style="padding-left: 24px; margin-bottom: 20px;">
          <li style="margin-bottom: 10px;"><strong style="color: var(--hk-text-primary);">The text transcript</strong> — sent to our API for AI summarisation. No audio. No metadata. Just the words.</li>
          <li style="margin-bottom: 10px;"><strong style="color: var(--hk-text-primary);">Your auth token</strong> — used to verify your account and check usage limits.</li>
        </ul>
        <div style="background: var(--hk-mint-subtle); border: 1px solid rgba(61,214,140,0.2); border-radius: 12px; padding: 20px 24px; font-size: 14px;">
          The text transcript is processed by GPT-4o mini and discarded. We don't store transcripts on our servers.
        </div>
      </section>

      <section>
        <h2 style="font-size: 22px; font-weight: 700; color: var(--hk-text-primary); margin-bottom: 16px; letter-spacing: -0.02em;">How whisper.cpp works</h2>
        <p style="margin-bottom: 16px;">
          Harknotes bundles <a href="https://github.com/ggerganov/whisper.cpp" style="color: var(--hk-mint);">whisper.cpp</a> — a C++ implementation of OpenAI's Whisper speech recognition model — as a compiled binary. When you stop recording, Harknotes spawns this binary as a child process on your machine.
        </p>
        <p>No internet connection is required for transcription. The Whisper model weights (downloaded once on first run) run entirely on your CPU or GPU.</p>
      </section>

      <section>
        <h2 style="font-size: 22px; font-weight: 700; color: var(--hk-text-primary); margin-bottom: 16px; letter-spacing: -0.02em;">No bot, no visible recording</h2>
        <p>
          Unlike Otter.ai, Fireflies, or tl;dv, Harknotes does not join your meeting as a participant. It captures audio at the operating system level — the same way screen recorders work. Other participants cannot see any recording indicator.
        </p>
      </section>

    </div>

    <div style="margin-top: 64px; text-align: center;">
      <a href="/harknotes#download" style="display: inline-block; background: var(--hk-mint); color: var(--hk-text-inverse); font-size: 15px; font-weight: 600; padding: 14px 28px; border-radius: 10px; text-decoration: none;">
        Download Harknotes →
      </a>
    </div>
  </main>
</HarknotesLayout>
```

**Step 2: Linux page**

```astro
---
// src/pages/harknotes/linux.astro
import HarknotesLayout from '../../layouts/HarknotesLayout.astro';
---
<HarknotesLayout
  title="Harknotes for Linux — Local Meeting Transcription"
  description="Harknotes runs natively on Linux. AppImage, DEB, and RPM packages. PulseAudio and PipeWire support. whisper.cpp transcription, no cloud."
  canonicalUrl="https://loosewire.dev/harknotes/linux"
>
  <nav style="padding: 20px 32px; border-bottom: 1px solid var(--hk-border-subtle);">
    <a href="/harknotes" style="font-size: 14px; color: var(--hk-text-secondary); text-decoration: none;">← Harknotes</a>
  </nav>
  <main style="max-width: 720px; margin: 0 auto; padding: 64px 32px;">
    <p style="font-family: 'Geist Mono', monospace; font-size: 11px; color: var(--hk-mint); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 16px;">Linux</p>
    <h1 style="font-size: clamp(28px, 4vw, 44px); font-weight: 700; letter-spacing: -0.03em; color: var(--hk-text-primary); margin-bottom: 24px; line-height: 1.1;">
      Harknotes for Linux
    </h1>
    <p style="font-size: 18px; color: var(--hk-text-secondary); margin-bottom: 48px; line-height: 1.6; border-bottom: 1px solid var(--hk-border-subtle); padding-bottom: 32px;">
      Native Linux support with PulseAudio and PipeWire. The only privacy-first meeting transcription tool built for Linux.
    </p>

    <div style="display: flex; flex-direction: column; gap: 40px; color: var(--hk-text-secondary); font-size: 16px; line-height: 1.8;">

      <section>
        <h2 style="font-size: 22px; font-weight: 700; color: var(--hk-text-primary); margin-bottom: 20px; letter-spacing: -0.02em;">Download</h2>
        <div style="display: flex; flex-direction: column; gap: 10px;">
          {[
            { format: 'AppImage', desc: 'Universal — runs on any Linux distro', href: 'https://github.com/LooseWireDev/harknotes/releases/latest' },
            { format: 'DEB', desc: 'Debian, Ubuntu, Linux Mint, Pop!_OS', href: 'https://github.com/LooseWireDev/harknotes/releases/latest' },
            { format: 'RPM', desc: 'Fedora, RHEL, openSUSE', href: 'https://github.com/LooseWireDev/harknotes/releases/latest' },
          ].map(({ format, desc, href }) => (
            <a href={href} style="display: flex; align-items: center; justify-content: space-between; background: var(--hk-surface-1); border: 1px solid var(--hk-border); border-radius: 12px; padding: 20px 24px; text-decoration: none;">
              <div>
                <p style="font-family: 'Geist Mono', monospace; font-size: 14px; font-weight: 600; color: var(--hk-text-primary); margin-bottom: 4px;">{format}</p>
                <p style="font-size: 13px; color: var(--hk-text-secondary);">{desc}</p>
              </div>
              <span style="color: var(--hk-mint); font-size: 13px; font-weight: 600;">Download →</span>
            </a>
          ))}
        </div>
      </section>

      <section>
        <h2 style="font-size: 22px; font-weight: 700; color: var(--hk-text-primary); margin-bottom: 16px; letter-spacing: -0.02em;">Audio support</h2>
        <p style="margin-bottom: 16px;">Harknotes captures audio using PulseAudio or PipeWire — whichever your system uses. Both system audio (loopback) and microphone are captured as separate streams for accurate speaker diarisation.</p>
        <ul style="padding-left: 24px;">
          <li style="margin-bottom: 8px;"><strong style="color: var(--hk-text-primary);">PulseAudio</strong> — supported on Ubuntu 20.04+, older Debian-based systems</li>
          <li style="margin-bottom: 8px;"><strong style="color: var(--hk-text-primary);">PipeWire</strong> — supported on Fedora 34+, Ubuntu 22.10+, modern distros</li>
        </ul>
      </section>

      <section>
        <h2 style="font-size: 22px; font-weight: 700; color: var(--hk-text-primary); margin-bottom: 16px; letter-spacing: -0.02em;">Tested distributions</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 10px;">
          {['Ubuntu 22.04+', 'Fedora 39+', 'Debian 12', 'Linux Mint 21', 'Pop!_OS 22.04', 'openSUSE Tumbleweed'].map(distro => (
            <div style="background: var(--hk-surface-1); border: 1px solid var(--hk-border); border-radius: 8px; padding: 12px 16px; font-size: 13px; color: var(--hk-text-secondary);">
              {distro}
            </div>
          ))}
        </div>
      </section>

    </div>
  </main>
</HarknotesLayout>
```

**Step 3: Build and verify**

```bash
pnpm build
```

**Step 4: Commit**

```bash
git add src/pages/harknotes/privacy.astro src/pages/harknotes/linux.astro
git commit -m "feat: privacy and linux pages"
```

---

## Task 11: loosewire.dev/blog aggregator

**Files:**
- Create: `src/pages/blog/index.astro`

```astro
---
// src/pages/blog/index.astro
import LooseWireLayout from '../../layouts/LooseWireLayout.astro';
import { getCollection } from 'astro:content';

const harknotePosts = (await getCollection('harknotes-blog')).sort(
  (a, b) => new Date(b.data.pubDate).valueOf() - new Date(a.data.pubDate).valueOf()
);
---
<LooseWireLayout
  title="Loose Wire Blog — Software, Privacy, and Building in Public"
  description="Articles from Loose Wire LLC on privacy-first software, local AI, and the products we build."
>
  <main style="max-width: 740px; margin: 0 auto; padding: 0 32px;">

    <header style="padding: 80px 0 48px;">
      <a href="/" style="font-family: var(--lw-font-mono); font-size: 12px; color: var(--lw-text-dim); text-decoration: none; letter-spacing: 0.06em; display: block; margin-bottom: 32px;">
        ← loosewire.dev
      </a>
      <h1 style="font-family: var(--lw-font-display); font-size: clamp(32px, 5vw, 44px); font-weight: 800; letter-spacing: -0.035em; color: var(--lw-text); margin-bottom: 12px; line-height: 1.1;">Blog</h1>
      <p style="font-size: 16px; color: var(--lw-text-mid); line-height: 1.6;">Articles on privacy-first software, local AI, and building focused tools.</p>
    </header>

    {harknotePosts.length > 0 && (
      <section style="padding-bottom: 64px; border-bottom: 1px solid var(--lw-border);">
        <p style="font-family: var(--lw-font-mono); font-size: 10px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--lw-text-dim); margin-bottom: 20px; padding-bottom: 10px; border-bottom: 1px solid var(--lw-border);">
          Harknotes
        </p>
        <div>
          {harknotePosts.map(post => (
            <a href={`/harknotes/blog/${post.slug}`}
               style="display: block; padding: 24px 0; border-bottom: 1px solid var(--lw-border); text-decoration: none;">
              <p style="font-family: var(--lw-font-mono); font-size: 11px; color: var(--lw-text-dim); margin-bottom: 6px;">{post.data.pubDate}</p>
              <h2 style="font-family: var(--lw-font-display); font-size: 17px; font-weight: 700; color: var(--lw-text); margin-bottom: 6px; letter-spacing: -0.02em;">{post.data.title}</h2>
              <p style="font-size: 14px; color: var(--lw-text-mid); line-height: 1.6;">{post.data.description}</p>
            </a>
          ))}
        </div>
      </section>
    )}

    {harknotePosts.length === 0 && (
      <p style="color: var(--lw-text-dim); padding: 48px 0;">Articles coming soon.</p>
    )}

  </main>

  <footer style="border-top: 1px solid var(--lw-border); padding: 32px; text-align: center; margin-top: 64px;">
    <p style="font-size: 13px; color: var(--lw-text-dim);">
      © 2026 Loose Wire LLC ·
      <a href="/" style="color: var(--lw-text-mid); text-decoration: none;">Home</a> ·
      <a href="/harknotes" style="color: var(--lw-text-mid); text-decoration: none;">Harknotes</a>
    </p>
  </footer>
</LooseWireLayout>
```

**Step 2: Build and verify**

```bash
pnpm build
```

**Step 3: Commit**

```bash
git add src/pages/blog/
git commit -m "feat: loosewire.dev/blog aggregated index"
```

---

## Task 12: SEO infrastructure — robots.txt and sitemap verification

**Files:**
- Create: `public/robots.txt`

**Step 1: Create robots.txt**

```
# public/robots.txt
User-agent: *
Allow: /

Sitemap: https://loosewire.dev/sitemap-index.xml
```

**Step 2: Verify sitemap generates on build**

```bash
pnpm build
ls dist/sitemap*.xml
```

Expected: `dist/sitemap-index.xml` and `dist/sitemap-0.xml` exist.

**Step 3: Check sitemap contains all expected URLs**

```bash
cat dist/sitemap-0.xml | grep "<loc>"
```

Expected: Should include `/`, `/blog/`, `/harknotes/`, `/harknotes/blog/`, `/harknotes/privacy`, `/harknotes/linux`, `/harknotes/vs/otter-ai`, `/harknotes/vs/fireflies`, `/harknotes/vs/tl-dv`.

**Step 4: Commit**

```bash
git add public/robots.txt
git commit -m "feat: robots.txt and verify sitemap generation"
```

---

## Task 13: Netlify configuration

**Files:**
- Create: `netlify.toml`
- Create: `public/_redirects`

**Step 1: Create netlify.toml**

```toml
# netlify.toml
[build]
  command = "pnpm build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

**Step 2: Create _redirects for subdomain**

```
# public/_redirects
https://harknotes.loosewire.dev/* https://loosewire.dev/harknotes/:splat 301!
```

**Step 3: Commit**

```bash
git add netlify.toml public/_redirects
git commit -m "feat: netlify config and subdomain redirect"
```

---

## Task 14: AI-generated blog content

**Step 1: Generate 6 blog posts**

For each post, create a file in `src/content/harknotes-blog/`. Use an LLM to generate 600–900 word articles. Each needs frontmatter + body content.

Target keywords and slugs:

| Slug | Title | Target keyword |
|---|---|---|
| `meeting-transcription-without-bot` | Meeting transcription without a bot joining your call | "meeting transcription without bot" |
| `local-whisper-meeting-notes` | How to get meeting notes using local Whisper AI | "local whisper meeting notes" |
| `private-otter-ai-alternative` | The privacy-first alternative to Otter.ai | "private otter ai alternative" |
| `meeting-transcription-linux` | The best meeting transcription app for Linux | "meeting transcription linux" |
| `gdpr-compliant-meeting-transcription` | GDPR-compliant meeting transcription: what it actually means | "gdpr meeting transcription" |
| `how-to-transcribe-meetings-without-cloud` | How to transcribe meetings without uploading to the cloud | "transcribe meetings without cloud" |

**Frontmatter format for each:**

```mdx
---
title: "Meeting Transcription Without a Bot Joining Your Call"
description: "Most meeting transcription tools send a bot into your meeting. Here's why that's a problem — and how to transcribe meetings without anyone knowing."
pubDate: "2026-03-06"
keywords: ["meeting transcription without bot", "private meeting transcription", "no bot meeting recorder"]
---
```

**Step 2: Build and verify all posts appear**

```bash
pnpm build
```

Check `dist/harknotes/blog/` for generated HTML files.

**Step 3: Commit**

```bash
git add src/content/harknotes-blog/
git commit -m "content: add 6 AI-generated blog articles"
```

---

## Task 15: App auto theming (harknotes repo)

> This task is in the **harknotes repo** (`~/Programming/personal/harknotes`), not loosewire-web.

**Files:**
- Modify: `apps/desktop/src/renderer/index.html` (or wherever the renderer HTML entry is)

**Step 1: Find the renderer HTML entry**

```bash
find apps/desktop/src -name "index.html" | head -5
# or check vite config for the entry
cat apps/desktop/vite.renderer.config.ts
```

**Step 2: Add auto-theme script to `<head>` before any stylesheets**

In the renderer's HTML entry file, add this as the very first script in `<head>`:

```html
<script>
  (function() {
    var t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', t);
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
      document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    });
  })();
</script>
```

**Step 3: Verify the existing CSS uses `[data-theme="dark"]` and `[data-theme="light"]`**

Check `apps/desktop/src/renderer/` for existing theme CSS. The harknotes style guide tokens use `[data-theme="dark"]` and `[data-theme="light"]` selectors — confirm these are already in the app's CSS.

**Step 4: Test in dev mode**

```bash
cd apps/desktop && pnpm start
```

Toggle system appearance (macOS: System Settings → Appearance → Dark/Light) and verify the app updates live.

**Step 5: Commit (in harknotes repo)**

```bash
git add apps/desktop/src/renderer/
git commit -m "feat: auto theme via prefers-color-scheme in Electron renderer"
```

---

## Final: Push and connect Netlify

**Step 1: Push all commits**

```bash
cd ~/Programming/personal/loosewire
git push origin main
```

**Step 2: Connect to Netlify**

In the Netlify dashboard:
1. "Add new site" → "Import an existing project" → GitHub → `LooseWireDev/loosewire-web`
2. Build command: `pnpm build`
3. Publish directory: `dist`
4. Add custom domain: `loosewire.dev`
5. Add domain alias: `harknotes.loosewire.dev`

**Step 3: Verify redirects work**

Once deployed, visit `https://harknotes.loosewire.dev` — should redirect to `https://loosewire.dev/harknotes`.

**Step 4: Submit sitemap to Google Search Console**

Add `loosewire.dev` to Google Search Console and submit `https://loosewire.dev/sitemap-index.xml`.

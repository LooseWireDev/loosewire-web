# Component Library Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a shared Astro component library from the brand styleguides, fix content accuracy, overhaul blog styling, and reorganise CSS.

**Architecture:** Components in `src/components/{loosewire,harknotes,ui,blog}/`, design tokens in `src/styles/styleguides/`. Pages refactored to import components instead of inline styles. Blog MDX files updated to use rich visual components.

**Tech Stack:** Astro 5, CSS custom properties, MDX

---

## Phase 1: CSS Reorganisation (Foundation)

### Task 1: Move token files and update imports

**Files:**
- Move: `src/styles/tokens-loosewire.css` → `src/styles/styleguides/loosewire.css`
- Move: `src/styles/tokens-harknotes.css` → `src/styles/styleguides/harknotes.css`
- Modify: `src/styles/global.css`

**Step 1: Create styleguides directory and move files**

```bash
mkdir -p src/styles/styleguides
mv src/styles/tokens-loosewire.css src/styles/styleguides/loosewire.css
mv src/styles/tokens-harknotes.css src/styles/styleguides/harknotes.css
```

**Step 2: Update global.css imports**

```css
/* src/styles/global.css */
@import './styleguides/loosewire.css';
@import './styleguides/harknotes.css';

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
```

**Step 3: Verify build**

Run: `npx astro build`
Expected: Build succeeds with no import errors.

**Step 4: Commit**

```bash
git add -A src/styles/
git commit -m "refactor: move design tokens to src/styles/styleguides/"
```

---

## Phase 2: Brand Components (Logos & Wordmarks)

### Task 2: LooseWire Logo component

**Files:**
- Create: `src/components/loosewire/Logo.astro`

**Step 1: Create the component**

```astro
---
// src/components/loosewire/Logo.astro
interface Props {
  size?: number;
  class?: string;
}

const { size = 36, class: className } = Astro.props;
---
<svg width={size} height={size} viewBox="0 0 120 120" fill="none" class={className} aria-label="Loose Wire logo">
  <rect width="120" height="120" rx="28" fill="#0e1816"/>
  <path d="M20 60 L32 60 L40 30 L52 84 L64 36 L76 78 L84 48 L92 60 L100 60"
    stroke="var(--lw-pine, #3d7a6e)" stroke-width="10"
    stroke-linecap="round" stroke-linejoin="round" fill="none"/>
</svg>
```

**Step 2: Verify build**

Run: `npx astro build`
Expected: Build succeeds.

### Task 3: LooseWire Wordmark component

**Files:**
- Create: `src/components/loosewire/Wordmark.astro`

**Step 1: Create the component**

```astro
---
// src/components/loosewire/Wordmark.astro
import Logo from './Logo.astro';

interface Props {
  logoSize?: number;
  fontSize?: string;
  class?: string;
}

const { logoSize = 36, fontSize = '22px', class: className } = Astro.props;
---
<div class:list={["lw-wordmark", className]}>
  <Logo size={logoSize} />
  <span class="lw-wordmark-text" style={`font-size: ${fontSize};`}>loose<span class="accent">wire</span></span>
</div>

<style>
  .lw-wordmark {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .lw-wordmark-text {
    font-family: var(--lw-font-display);
    font-weight: 700;
    letter-spacing: -0.025em;
    color: var(--lw-text);
  }
  .lw-wordmark-text .accent {
    color: var(--lw-pine);
  }
</style>
```

### Task 4: Harknotes Logo component

**Files:**
- Create: `src/components/harknotes/Logo.astro`

**Step 1: Create the component**

The Harknotes logo uses gradient defs. Use a unique ID prefix to avoid SVG ID collisions when multiple logos appear on one page.

```astro
---
// src/components/harknotes/Logo.astro
interface Props {
  size?: number;
  class?: string;
}

const { size = 30, class: className } = Astro.props;
const uid = `hk-${Math.random().toString(36).slice(2, 8)}`;
---
<svg width={size} height={size} viewBox="0 0 512 512" fill="none" class={className} aria-label="Harknotes logo">
  <defs>
    <linearGradient id={`${uid}-bg`} x1="0" y1="0" x2="512" y2="512">
      <stop offset="0%" stop-color="#0d2520"/>
      <stop offset="100%" stop-color="#061210"/>
    </linearGradient>
    <radialGradient id={`${uid}-gl`} cx="50%" cy="25%" r="60%">
      <stop offset="0%" stop-color="#1a4a3a" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="transparent" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="512" height="512" rx="112" fill={`url(#${uid}-bg)`}/>
  <rect width="512" height="512" rx="112" fill={`url(#${uid}-gl)`}/>
  <rect x="98"  y="138" width="52" height="236" rx="26" fill="#3dd68c"/>
  <rect x="168" y="182" width="44" height="148" rx="22" fill="#3dd68c" opacity="0.52"/>
  <rect x="98"  y="232" width="316" height="48"  rx="24" fill="#3dd68c"/>
  <rect x="300" y="182" width="44" height="148" rx="22" fill="#3dd68c" opacity="0.52"/>
  <rect x="362" y="138" width="52" height="236" rx="26" fill="#3dd68c"/>
</svg>
```

### Task 5: Harknotes Wordmark component

**Files:**
- Create: `src/components/harknotes/Wordmark.astro`

```astro
---
// src/components/harknotes/Wordmark.astro
import Logo from './Logo.astro';

interface Props {
  logoSize?: number;
  fontSize?: string;
  class?: string;
}

const { logoSize = 30, fontSize = '16px', class: className } = Astro.props;
---
<div class:list={["hk-wordmark", className]}>
  <Logo size={logoSize} />
  <span class="hk-wordmark-text" style={`font-size: ${fontSize};`}>hark<span class="accent">notes</span></span>
</div>

<style>
  .hk-wordmark {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .hk-wordmark-text {
    font-family: 'Geist', system-ui, sans-serif;
    font-weight: 700;
    letter-spacing: -0.025em;
    color: var(--hk-text-primary);
  }
  .hk-wordmark-text .accent {
    color: var(--hk-mint);
  }
</style>
```

**Step 2: Verify build**

Run: `npx astro build`
Expected: Build succeeds.

**Step 3: Commit**

```bash
git add src/components/loosewire/ src/components/harknotes/
git commit -m "feat: add brand logo and wordmark components for LooseWire and Harknotes"
```

---

## Phase 3: LooseWire Page Components

### Task 6: LooseWire FooterCredit component

**Files:**
- Create: `src/components/loosewire/FooterCredit.astro`

```astro
---
// src/components/loosewire/FooterCredit.astro
import Logo from './Logo.astro';

interface Props {
  variant?: 'light' | 'dark';
}

const { variant = 'light' } = Astro.props;
---
<div class:list={["lw-footer-credit", `lw-footer-credit--${variant}`]}>
  <div class="lw-footer-credit-left">
    <Logo size={14} />
    <span class="lw-footer-credit-text">&copy; {new Date().getFullYear()} Loose Wire LLC</span>
  </div>
  <slot />
</div>

<style>
  .lw-footer-credit {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
  }
  .lw-footer-credit-left {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .lw-footer-credit-text {
    font-family: var(--lw-font-mono);
    font-size: 11px;
  }
  .lw-footer-credit--light .lw-footer-credit-text {
    color: var(--lw-text-dim, #94aaa4);
  }
  .lw-footer-credit--dark .lw-footer-credit-text {
    color: #4e5762;
  }
</style>
```

### Task 7: LooseWire Nav component

**Files:**
- Create: `src/components/loosewire/Nav.astro`

```astro
---
// src/components/loosewire/Nav.astro
import Wordmark from './Wordmark.astro';
---
<nav class="lw-nav">
  <a href="/" class="lw-nav-home">
    <Wordmark logoSize={24} fontSize="16px" />
  </a>
  <div class="lw-nav-links">
    <slot />
  </div>
</nav>

<style>
  .lw-nav {
    max-width: 740px;
    margin: 0 auto;
    padding: 20px 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .lw-nav-home {
    text-decoration: none;
  }
  .lw-nav-links {
    display: flex;
    gap: 24px;
    align-items: center;
  }
  .lw-nav-links :global(a) {
    font-size: 14px;
    color: var(--lw-text-mid);
    text-decoration: none;
  }
</style>
```

**Step 1: Verify build and commit**

```bash
npx astro build
git add src/components/loosewire/
git commit -m "feat: add LooseWire nav and footer credit components"
```

---

## Phase 4: Harknotes Page Components

### Task 8: Harknotes Nav component

**Files:**
- Create: `src/components/harknotes/Nav.astro`

Extract the nav from `src/pages/harknotes/index.astro:56-63`. Add the Harknotes wordmark.

```astro
---
// src/components/harknotes/Nav.astro
import Wordmark from './Wordmark.astro';

interface Props {
  showCta?: boolean;
}

const { showCta = true } = Astro.props;
---
<nav class="hk-nav">
  <a href="/harknotes" class="hk-nav-home">
    <Wordmark logoSize={24} fontSize="15px" />
  </a>
  <div class="hk-nav-links">
    <a href="/harknotes/blog">Blog</a>
    <a href="#pricing">Pricing</a>
    {showCta && <a href="#download" class="hk-nav-cta">Download</a>}
  </div>
</nav>

<style>
  .hk-nav {
    max-width: 1100px;
    margin: 0 auto;
    padding: 20px 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .hk-nav-home {
    text-decoration: none;
  }
  .hk-nav-links {
    display: flex;
    gap: 24px;
    align-items: center;
  }
  .hk-nav-links a {
    font-size: 14px;
    color: var(--hk-text-secondary);
    text-decoration: none;
  }
  .hk-nav-cta {
    font-size: 13px !important;
    font-weight: 600;
    color: var(--hk-text-inverse) !important;
    background: var(--hk-mint);
    padding: 8px 18px;
    border-radius: 8px;
  }
</style>
```

### Task 9: Harknotes Footer component

**Files:**
- Create: `src/components/harknotes/Footer.astro`

Extract from `src/pages/harknotes/index.astro:244-258`. Include the "by Loose Wire LLC" attribution from the styleguide.

```astro
---
// src/components/harknotes/Footer.astro
import Logo from '../loosewire/Logo.astro';
---
<footer class="hk-footer">
  <div class="hk-footer-inner">
    <div class="hk-footer-brand">
      <p class="hk-footer-name">Harknotes</p>
      <p class="hk-footer-by">
        by
        <Logo size={12} />
        <a href="/" class="hk-footer-parent">loosewire</a>
      </p>
    </div>
    <nav class="hk-footer-nav">
      <a href="/harknotes/privacy">Privacy</a>
      <a href="/harknotes/linux">Linux</a>
      <a href="/harknotes/blog">Blog</a>
      <a href="/harknotes/vs/otter-ai">vs Otter.ai</a>
      <a href="https://github.com/LooseWireDev/harknotes">GitHub</a>
    </nav>
  </div>
</footer>

<style>
  .hk-footer {
    border-top: 1px solid var(--hk-border-subtle);
    padding: 40px 32px;
  }
  .hk-footer-inner {
    max-width: 1100px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;
  }
  .hk-footer-name {
    font-size: 14px;
    font-weight: 600;
    color: var(--hk-text-primary);
    margin-bottom: 4px;
  }
  .hk-footer-by {
    font-size: 13px;
    color: var(--hk-text-tertiary);
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .hk-footer-parent {
    font-family: var(--lw-font-display, 'Nunito Sans', sans-serif);
    font-size: 12px;
    font-weight: 600;
    color: var(--hk-text-tertiary);
    text-decoration: none;
  }
  .hk-footer-nav {
    display: flex;
    gap: 24px;
    flex-wrap: wrap;
  }
  .hk-footer-nav a {
    font-size: 13px;
    color: var(--hk-text-secondary);
    text-decoration: none;
  }
</style>
```

### Task 10: Harknotes Hero component

**Files:**
- Create: `src/components/harknotes/Hero.astro`

```astro
---
// src/components/harknotes/Hero.astro
interface Props {
  badge?: string;
  headline: string;
  highlightedText?: string;
  subtitle: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

const { badge, headline, highlightedText, subtitle, primaryCta, secondaryCta } = Astro.props;
---
<div class="hk-hero">
  {badge && (
    <div class="hk-hero-badge">
      <span class="hk-hero-badge-dot"></span>
      <span>{badge}</span>
    </div>
  )}
  <h1 class="hk-hero-headline" set:html={highlightedText
    ? headline.replace(highlightedText, `<span class="hk-hero-highlight">${highlightedText}</span>`)
    : headline} />
  <p class="hk-hero-subtitle">{subtitle}</p>
  {(primaryCta || secondaryCta) && (
    <div class="hk-hero-actions">
      {primaryCta && <a href={primaryCta.href} class="hk-hero-primary">{primaryCta.label}</a>}
      {secondaryCta && <a href={secondaryCta.href} class="hk-hero-secondary">{secondaryCta.label}</a>}
    </div>
  )}
</div>

<style>
  .hk-hero {
    max-width: 800px;
    margin: 0 auto;
    padding: 100px 32px 120px;
    text-align: center;
  }
  .hk-hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: var(--hk-mint-subtle);
    border: 1px solid rgba(61,214,140,0.2);
    border-radius: 100px;
    padding: 6px 14px;
    margin-bottom: 40px;
    font-family: 'Geist Mono', monospace;
    font-size: 11px;
    color: var(--hk-mint);
    letter-spacing: 0.06em;
  }
  .hk-hero-badge-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--hk-mint);
    display: inline-block;
  }
  .hk-hero-headline {
    font-size: clamp(36px, 6vw, 64px);
    font-weight: 800;
    letter-spacing: -0.04em;
    line-height: 1.05;
    color: var(--hk-text-primary);
    margin-bottom: 24px;
  }
  .hk-hero-headline :global(.hk-hero-highlight) {
    color: var(--hk-mint);
  }
  .hk-hero-subtitle {
    font-size: clamp(16px, 2vw, 20px);
    color: var(--hk-text-secondary);
    max-width: 560px;
    margin: 0 auto 48px;
    line-height: 1.6;
  }
  .hk-hero-actions {
    display: flex;
    gap: 16px;
    justify-content: center;
    flex-wrap: wrap;
  }
  .hk-hero-primary {
    font-size: 15px;
    font-weight: 600;
    color: var(--hk-text-inverse);
    background: var(--hk-mint);
    padding: 14px 28px;
    border-radius: 10px;
    text-decoration: none;
  }
  .hk-hero-secondary {
    font-size: 15px;
    font-weight: 500;
    color: var(--hk-text-secondary);
    background: var(--hk-surface-2);
    padding: 14px 28px;
    border-radius: 10px;
    text-decoration: none;
    border: 1px solid var(--hk-border);
  }
</style>
```

### Task 11: Harknotes FeatureCard component

**Files:**
- Create: `src/components/harknotes/FeatureCard.astro`

```astro
---
// src/components/harknotes/FeatureCard.astro
interface Props {
  title: string;
  description: string;
}

const { title, description } = Astro.props;
---
<div class="hk-feature-card">
  <div class="hk-feature-card-dot"></div>
  <h3 class="hk-feature-card-title">{title}</h3>
  <p class="hk-feature-card-desc">{description}</p>
</div>

<style>
  .hk-feature-card {
    background: var(--hk-surface-1);
    border: 1px solid var(--hk-border);
    border-radius: 12px;
    padding: 24px;
  }
  .hk-feature-card-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--hk-mint);
    margin-bottom: 16px;
  }
  .hk-feature-card-title {
    font-size: 14px;
    font-weight: 600;
    color: var(--hk-text-primary);
    margin-bottom: 6px;
  }
  .hk-feature-card-desc {
    font-size: 13px;
    color: var(--hk-text-secondary);
    line-height: 1.6;
  }
</style>
```

### Task 12: Harknotes StepCard component

**Files:**
- Create: `src/components/harknotes/StepCard.astro`

```astro
---
// src/components/harknotes/StepCard.astro
interface Props {
  number: string;
  title: string;
  description: string;
}

const { number, title, description } = Astro.props;
---
<div class="hk-step-card">
  <div class="hk-step-card-number">{number}</div>
  <h3 class="hk-step-card-title">{title}</h3>
  <p class="hk-step-card-desc">{description}</p>
</div>

<style>
  .hk-step-card-number {
    font-family: 'Geist Mono', monospace;
    font-size: 36px;
    font-weight: 600;
    color: var(--hk-mint);
    margin-bottom: 16px;
    opacity: 0.4;
  }
  .hk-step-card-title {
    font-size: 18px;
    font-weight: 600;
    color: var(--hk-text-primary);
    margin-bottom: 10px;
    letter-spacing: -0.02em;
  }
  .hk-step-card-desc {
    font-size: 14px;
    color: var(--hk-text-secondary);
    line-height: 1.7;
  }
</style>
```

### Task 13: Harknotes PricingCard component

**Files:**
- Create: `src/components/harknotes/PricingCard.astro`

```astro
---
// src/components/harknotes/PricingCard.astro
interface Props {
  name: string;
  price: string;
  period: string;
  summaries: string;
  features: string[];
  highlight?: boolean;
  ctaHref?: string;
  ctaLabel?: string;
}

const { name, price, period, summaries, features, highlight = false, ctaHref = '#download', ctaLabel = 'Get started' } = Astro.props;
---
<div class:list={["hk-pricing-card", { "hk-pricing-card--highlight": highlight }]}>
  <h3 class="hk-pricing-card-name">{name}</h3>
  <div class="hk-pricing-card-price">
    <span class="hk-pricing-card-amount">{price}</span>
    <span class="hk-pricing-card-period">{period}</span>
  </div>
  <p class="hk-pricing-card-summaries">{summaries}</p>
  <ul class="hk-pricing-card-features">
    {features.map(f => <li><span class="check">&#10003;</span> {f}</li>)}
  </ul>
  <a href={ctaHref} class:list={["hk-pricing-card-cta", { "hk-pricing-card-cta--highlight": highlight }]}>
    {ctaLabel}
  </a>
</div>

<style>
  .hk-pricing-card {
    background: var(--hk-bg);
    border: 1px solid var(--hk-border);
    border-radius: 16px;
    padding: 32px;
  }
  .hk-pricing-card--highlight {
    background: var(--hk-mint-subtle);
    border-color: rgba(61,214,140,0.3);
  }
  .hk-pricing-card-name {
    font-size: 15px;
    font-weight: 600;
    color: var(--hk-text-primary);
    margin-bottom: 4px;
  }
  .hk-pricing-card-price {
    margin-bottom: 8px;
  }
  .hk-pricing-card-amount {
    font-size: 36px;
    font-weight: 700;
    color: var(--hk-text-primary);
    letter-spacing: -0.03em;
  }
  .hk-pricing-card-period {
    font-size: 14px;
    color: var(--hk-text-secondary);
  }
  .hk-pricing-card-summaries {
    font-family: 'Geist Mono', monospace;
    font-size: 11px;
    color: var(--hk-mint);
    margin-bottom: 24px;
  }
  .hk-pricing-card-features {
    list-style: none;
    margin-bottom: 28px;
  }
  .hk-pricing-card-features li {
    font-size: 14px;
    color: var(--hk-text-secondary);
    padding: 5px 0;
    display: flex;
    gap: 8px;
    align-items: flex-start;
  }
  .check {
    color: var(--hk-mint);
    flex-shrink: 0;
  }
  .hk-pricing-card-cta {
    display: block;
    text-align: center;
    padding: 11px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    background: var(--hk-surface-2);
    color: var(--hk-text-primary);
    border: 1px solid var(--hk-border);
  }
  .hk-pricing-card-cta--highlight {
    background: var(--hk-mint);
    color: var(--hk-text-inverse);
    border: none;
  }
</style>
```

### Task 14: Harknotes FaqItem component

**Files:**
- Create: `src/components/harknotes/FaqItem.astro`

```astro
---
// src/components/harknotes/FaqItem.astro
interface Props {
  question: string;
  answer: string;
}

const { question, answer } = Astro.props;
---
<details class="hk-faq-item">
  <summary class="hk-faq-question">{question}</summary>
  <p class="hk-faq-answer">{answer}</p>
</details>

<style>
  .hk-faq-item {
    border-bottom: 1px solid var(--hk-border-subtle);
    padding: 24px 0;
  }
  .hk-faq-question {
    font-size: 15px;
    font-weight: 600;
    color: var(--hk-text-primary);
    cursor: pointer;
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .hk-faq-question::after {
    content: '+';
    font-size: 20px;
    font-weight: 300;
    color: var(--hk-text-tertiary);
    transition: transform 0.2s;
  }
  .hk-faq-item[open] .hk-faq-question::after {
    content: '-';
  }
  .hk-faq-question::-webkit-details-marker {
    display: none;
  }
  .hk-faq-answer {
    font-size: 14px;
    color: var(--hk-text-secondary);
    line-height: 1.7;
    margin-top: 12px;
  }
</style>
```

### Task 15: Harknotes ComparisonTable component

**Files:**
- Create: `src/components/harknotes/ComparisonTable.astro`

```astro
---
// src/components/harknotes/ComparisonTable.astro
interface Props {
  competitor: string;
  rows: { label: string; harknotes: string; competitor: string }[];
}

const { competitor, rows } = Astro.props;
---
<div class="hk-comparison-table">
  <div class="hk-comparison-header">
    <span></span>
    <span>Harknotes</span>
    <span>{competitor}</span>
  </div>
  {rows.map(({ label, harknotes, competitor: comp }) => (
    <div class="hk-comparison-row">
      <span class="hk-comparison-label">{label}</span>
      <span class="hk-comparison-value">{harknotes}</span>
      <span class="hk-comparison-value">{comp}</span>
    </div>
  ))}
</div>

<style>
  .hk-comparison-table {
    border: 1px solid var(--hk-border);
    border-radius: 12px;
    overflow: hidden;
  }
  .hk-comparison-header {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1px;
    background: var(--hk-surface-2);
    padding: 14px 20px;
    border-bottom: 1px solid var(--hk-border);
    font-size: 12px;
    font-weight: 600;
    color: var(--hk-text-primary);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    font-family: 'Geist Mono', monospace;
  }
  .hk-comparison-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1px;
    padding: 14px 20px;
    border-bottom: 1px solid var(--hk-border-subtle);
    font-size: 14px;
  }
  .hk-comparison-row:last-child {
    border-bottom: none;
  }
  .hk-comparison-label {
    color: var(--hk-text-primary);
    font-weight: 500;
  }
  .hk-comparison-value {
    color: var(--hk-text-secondary);
  }
</style>
```

**Step: Verify build and commit**

```bash
npx astro build
git add src/components/harknotes/
git commit -m "feat: add Harknotes page components (nav, footer, hero, cards, FAQ, pricing, comparison)"
```

---

## Phase 5: UI Primitives

### Task 16: Button component

**Files:**
- Create: `src/components/ui/Button.astro`

```astro
---
// src/components/ui/Button.astro
interface Props {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  class?: string;
  [key: string]: any;
}

const { variant = 'primary', size = 'md', href, class: className, ...rest } = Astro.props;
const Tag = href ? 'a' : 'button';
---
<Tag
  href={href}
  class:list={[`btn btn--${variant} btn--${size}`, className]}
  {...rest}
>
  <slot />
</Tag>

<style>
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-weight: 600;
    text-decoration: none;
    border: none;
    cursor: pointer;
    transition: background 0.15s, border-color 0.15s, box-shadow 0.15s;
  }
  .btn--sm { font-size: 13px; padding: 8px 16px; border-radius: 8px; }
  .btn--md { font-size: 14px; padding: 11px 22px; border-radius: 10px; }
  .btn--lg { font-size: 15px; padding: 14px 28px; border-radius: 10px; }
  .btn--primary {
    background: var(--hk-mint, var(--lw-pine));
    color: var(--hk-text-inverse, var(--lw-text-inverse));
  }
  .btn--secondary {
    background: var(--hk-surface-2, var(--lw-surface-2));
    color: var(--hk-text-primary, var(--lw-text));
    border: 1px solid var(--hk-border, var(--lw-border));
  }
  .btn--ghost {
    background: transparent;
    color: var(--hk-text-secondary, var(--lw-text-mid));
  }
</style>
```

### Task 17: Badge component

**Files:**
- Create: `src/components/ui/Badge.astro`

```astro
---
// src/components/ui/Badge.astro
interface Props {
  variant?: 'default' | 'mint' | 'red' | 'warning';
  class?: string;
}

const { variant = 'default', class: className } = Astro.props;
---
<span class:list={[`badge badge--${variant}`, className]}>
  <slot />
</span>

<style>
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-family: 'Geist Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.04em;
    padding: 4px 10px;
    border-radius: 6px;
  }
  .badge--default {
    background: var(--hk-surface-2, var(--lw-surface-2));
    color: var(--hk-text-secondary, var(--lw-text-mid));
  }
  .badge--mint {
    background: var(--hk-mint-subtle, var(--lw-pine-subtle));
    color: var(--hk-mint, var(--lw-pine));
  }
  .badge--red {
    background: var(--hk-record-red-dim, rgba(239,68,68,0.12));
    color: var(--hk-record-red, #ef4444);
  }
  .badge--warning {
    background: var(--hk-warning-dim, rgba(245,158,11,0.12));
    color: var(--hk-warning, #f59e0b);
  }
</style>
```

### Task 18: Card component

**Files:**
- Create: `src/components/ui/Card.astro`

```astro
---
// src/components/ui/Card.astro
interface Props {
  class?: string;
  padding?: string;
}

const { class: className, padding = '24px' } = Astro.props;
---
<div class:list={["card", className]} style={`padding: ${padding};`}>
  <slot />
</div>

<style>
  .card {
    background: var(--hk-surface-1, var(--lw-surface));
    border: 1px solid var(--hk-border, var(--lw-border));
    border-radius: 14px;
  }
</style>
```

### Task 19: Input component

**Files:**
- Create: `src/components/ui/Input.astro`

```astro
---
// src/components/ui/Input.astro
interface Props {
  type?: string;
  placeholder?: string;
  label?: string;
  name?: string;
  class?: string;
  [key: string]: any;
}

const { type = 'text', placeholder, label, name, class: className, ...rest } = Astro.props;
---
<div class:list={["input-group", className]}>
  {label && <label class="input-label" for={name}>{label}</label>}
  <input class="input-field" type={type} placeholder={placeholder} name={name} id={name} {...rest} />
</div>

<style>
  .input-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .input-label {
    font-size: 13px;
    font-weight: 500;
    color: var(--hk-text-primary, var(--lw-text));
  }
  .input-field {
    font-family: inherit;
    font-size: 14px;
    padding: 10px 14px;
    border-radius: 8px;
    border: 1px solid var(--hk-border, var(--lw-border));
    background: var(--hk-surface-1, var(--lw-surface));
    color: var(--hk-text-primary, var(--lw-text));
    outline: none;
    transition: border-color 0.15s;
  }
  .input-field:focus {
    border-color: var(--hk-mint, var(--lw-pine));
  }
  .input-field::placeholder {
    color: var(--hk-text-tertiary, var(--lw-text-dim));
  }
</style>
```

### Task 20: Toggle component

**Files:**
- Create: `src/components/ui/Toggle.astro`

```astro
---
// src/components/ui/Toggle.astro
interface Props {
  checked?: boolean;
  name?: string;
  label?: string;
  class?: string;
}

const { checked = false, name, label, class: className } = Astro.props;
---
<label class:list={["toggle", className]}>
  <input type="checkbox" name={name} checked={checked} class="toggle-input" />
  <span class="toggle-track">
    <span class="toggle-thumb"></span>
  </span>
  {label && <span class="toggle-label">{label}</span>}
</label>

<style>
  .toggle {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
  }
  .toggle-input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }
  .toggle-track {
    width: 36px;
    height: 20px;
    border-radius: 10px;
    background: var(--hk-surface-3, var(--lw-surface-3));
    position: relative;
    transition: background 0.2s;
  }
  .toggle-input:checked + .toggle-track {
    background: var(--hk-mint, var(--lw-pine));
  }
  .toggle-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: white;
    position: absolute;
    top: 2px;
    left: 2px;
    transition: transform 0.2s;
  }
  .toggle-input:checked + .toggle-track .toggle-thumb {
    transform: translateX(16px);
  }
  .toggle-label {
    font-size: 14px;
    color: var(--hk-text-primary, var(--lw-text));
  }
</style>
```

### Task 21: Toast component

**Files:**
- Create: `src/components/ui/Toast.astro`

```astro
---
// src/components/ui/Toast.astro
interface Props {
  variant?: 'info' | 'success' | 'warning' | 'error';
  class?: string;
}

const { variant = 'info', class: className } = Astro.props;
---
<div class:list={[`toast toast--${variant}`, className]} role="alert">
  <slot />
</div>

<style>
  .toast {
    padding: 14px 18px;
    border-radius: 10px;
    font-size: 14px;
    line-height: 1.5;
    display: flex;
    align-items: flex-start;
    gap: 10px;
    box-shadow: var(--hk-shadow-md, 0 4px 16px rgba(0,0,0,0.1));
  }
  .toast--info {
    background: var(--hk-surface-2, var(--lw-surface-2));
    border: 1px solid var(--hk-border, var(--lw-border));
    color: var(--hk-text-primary, var(--lw-text));
  }
  .toast--success {
    background: var(--hk-mint-subtle, var(--lw-pine-subtle));
    border: 1px solid rgba(61,214,140,0.2);
    color: var(--hk-mint, var(--lw-pine));
  }
  .toast--warning {
    background: var(--hk-warning-dim, rgba(245,158,11,0.12));
    border: 1px solid rgba(245,158,11,0.2);
    color: var(--hk-warning, #f59e0b);
  }
  .toast--error {
    background: rgba(248,113,113,0.12);
    border: 1px solid rgba(248,113,113,0.2);
    color: var(--hk-error, #f87171);
  }
</style>
```

### Task 22: Menu component

**Files:**
- Create: `src/components/ui/Menu.astro`

```astro
---
// src/components/ui/Menu.astro
interface Props {
  class?: string;
}

const { class: className } = Astro.props;
---
<div class:list={["menu", className]}>
  <slot />
</div>

<style>
  .menu {
    background: var(--hk-surface-1, var(--lw-surface));
    border: 1px solid var(--hk-border, var(--lw-border));
    border-radius: 10px;
    padding: 4px;
    box-shadow: var(--hk-shadow-lg, 0 16px 48px rgba(0,0,0,0.14));
    min-width: 180px;
  }
  .menu :global(.menu-item) {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 13px;
    color: var(--hk-text-primary, var(--lw-text));
    text-decoration: none;
    cursor: pointer;
    border: none;
    background: none;
    width: 100%;
    text-align: left;
  }
  .menu :global(.menu-item:hover) {
    background: var(--hk-surface-2, var(--lw-surface-2));
  }
  .menu :global(.menu-separator) {
    height: 1px;
    background: var(--hk-border-subtle, var(--lw-border));
    margin: 4px 0;
  }
</style>
```

**Step: Verify build and commit**

```bash
npx astro build
git add src/components/ui/
git commit -m "feat: add shared UI primitive components (button, badge, card, input, toggle, toast, menu)"
```

---

## Phase 6: Blog Components & Overhaul

### Task 23: Blog Prose component

**Files:**
- Create: `src/components/blog/Prose.astro`

This replaces the `.prose` styles in `[slug].astro` and adds richer typography.

```astro
---
// src/components/blog/Prose.astro
---
<div class="prose">
  <slot />
</div>

<style>
  .prose {
    color: var(--hk-text-secondary);
    font-size: 16px;
    line-height: 1.8;
  }
  .prose :global(h2) {
    font-size: 24px;
    font-weight: 700;
    color: var(--hk-text-primary);
    margin: 48px 0 16px;
    letter-spacing: -0.02em;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--hk-border-subtle);
  }
  .prose :global(h3) {
    font-size: 18px;
    font-weight: 600;
    color: var(--hk-text-primary);
    margin: 36px 0 12px;
  }
  .prose :global(p) {
    margin-bottom: 20px;
  }
  .prose :global(ul), .prose :global(ol) {
    padding-left: 24px;
    margin-bottom: 20px;
  }
  .prose :global(li) {
    margin-bottom: 8px;
  }
  .prose :global(strong) {
    color: var(--hk-text-primary);
    font-weight: 600;
  }
  .prose :global(a) {
    color: var(--hk-mint);
  }
  .prose :global(code) {
    font-family: 'Geist Mono', monospace;
    font-size: 13px;
    background: var(--hk-surface-2);
    padding: 2px 6px;
    border-radius: 4px;
  }
  .prose :global(pre) {
    background: var(--hk-surface-1);
    border: 1px solid var(--hk-border);
    border-radius: 10px;
    padding: 20px 24px;
    margin-bottom: 24px;
    overflow-x: auto;
  }
  .prose :global(pre code) {
    background: none;
    padding: 0;
    font-size: 13px;
    line-height: 1.7;
  }
  .prose :global(blockquote) {
    border-left: 3px solid var(--hk-mint);
    padding-left: 20px;
    margin: 24px 0;
    color: var(--hk-text-secondary);
    font-style: italic;
  }
  .prose :global(table) {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 24px;
    font-size: 14px;
  }
  .prose :global(th) {
    text-align: left;
    padding: 10px 14px;
    background: var(--hk-surface-2);
    color: var(--hk-text-primary);
    font-weight: 600;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    font-family: 'Geist Mono', monospace;
  }
  .prose :global(td) {
    padding: 10px 14px;
    border-bottom: 1px solid var(--hk-border-subtle);
    color: var(--hk-text-secondary);
  }
</style>
```

### Task 24: Blog ArticleHeader component

**Files:**
- Create: `src/components/blog/ArticleHeader.astro`

```astro
---
// src/components/blog/ArticleHeader.astro
interface Props {
  title: string;
  date: string;
  description: string;
  readTime?: string;
  tldr?: string;
}

const { title, date, description, readTime, tldr } = Astro.props;
---
<header class="article-header">
  <div class="article-header-meta">
    <span>{date}</span>
    {readTime && <span>&middot; {readTime}</span>}
  </div>
  <h1 class="article-header-title">{title}</h1>
  <p class="article-header-desc">{description}</p>
  {tldr && (
    <div class="article-header-tldr">
      <span class="article-header-tldr-label">TL;DR</span>
      <p>{tldr}</p>
    </div>
  )}
</header>

<style>
  .article-header {
    margin-bottom: 48px;
    padding-bottom: 32px;
    border-bottom: 1px solid var(--hk-border-subtle);
  }
  .article-header-meta {
    font-family: 'Geist Mono', monospace;
    font-size: 11px;
    color: var(--hk-text-tertiary);
    margin-bottom: 16px;
    display: flex;
    gap: 8px;
  }
  .article-header-title {
    font-size: clamp(28px, 4vw, 44px);
    font-weight: 700;
    letter-spacing: -0.03em;
    color: var(--hk-text-primary);
    margin-bottom: 16px;
    line-height: 1.1;
  }
  .article-header-desc {
    font-size: 18px;
    color: var(--hk-text-secondary);
    line-height: 1.6;
  }
  .article-header-tldr {
    margin-top: 24px;
    background: var(--hk-mint-subtle);
    border: 1px solid rgba(61,214,140,0.2);
    border-radius: 12px;
    padding: 20px 24px;
  }
  .article-header-tldr-label {
    font-family: 'Geist Mono', monospace;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--hk-mint);
    display: block;
    margin-bottom: 8px;
  }
  .article-header-tldr p {
    font-size: 14px;
    color: var(--hk-text-secondary);
    line-height: 1.6;
  }
</style>
```

### Task 25: Blog Callout component

**Files:**
- Create: `src/components/blog/Callout.astro`

```astro
---
// src/components/blog/Callout.astro
interface Props {
  type?: 'info' | 'tip' | 'warning';
  title?: string;
}

const { type = 'info', title } = Astro.props;
const icons = { info: 'i', tip: '!', warning: '⚠' };
---
<aside class:list={[`callout callout--${type}`]}>
  <div class="callout-header">
    <span class="callout-icon">{icons[type]}</span>
    {title && <span class="callout-title">{title}</span>}
  </div>
  <div class="callout-body">
    <slot />
  </div>
</aside>

<style>
  .callout {
    border-radius: 12px;
    padding: 20px 24px;
    margin: 24px 0;
    font-size: 14px;
    line-height: 1.6;
  }
  .callout--info {
    background: var(--hk-surface-2);
    border: 1px solid var(--hk-border);
  }
  .callout--tip {
    background: var(--hk-mint-subtle);
    border: 1px solid rgba(61,214,140,0.2);
  }
  .callout--warning {
    background: var(--hk-warning-dim, rgba(245,158,11,0.12));
    border: 1px solid rgba(245,158,11,0.2);
  }
  .callout-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
  }
  .callout-icon {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: 700;
  }
  .callout--info .callout-icon { background: var(--hk-surface-3); color: var(--hk-text-secondary); }
  .callout--tip .callout-icon { background: rgba(61,214,140,0.2); color: var(--hk-mint); }
  .callout--warning .callout-icon { background: rgba(245,158,11,0.2); color: var(--hk-warning, #f59e0b); }
  .callout-title {
    font-weight: 600;
    color: var(--hk-text-primary);
    font-size: 13px;
  }
  .callout-body {
    color: var(--hk-text-secondary);
  }
</style>
```

### Task 26: Blog FeatureBox component

**Files:**
- Create: `src/components/blog/FeatureBox.astro`

```astro
---
// src/components/blog/FeatureBox.astro
interface Props {
  title: string;
  icon?: string;
}

const { title, icon = '→' } = Astro.props;
---
<div class="feature-box">
  <div class="feature-box-header">
    <span class="feature-box-icon">{icon}</span>
    <span class="feature-box-title">{title}</span>
  </div>
  <div class="feature-box-body">
    <slot />
  </div>
</div>

<style>
  .feature-box {
    background: var(--hk-surface-1);
    border: 1px solid var(--hk-border);
    border-radius: 12px;
    padding: 24px;
    margin: 24px 0;
  }
  .feature-box-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
  }
  .feature-box-icon {
    width: 28px;
    height: 28px;
    border-radius: 7px;
    background: var(--hk-mint-subtle);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
  }
  .feature-box-title {
    font-size: 15px;
    font-weight: 600;
    color: var(--hk-text-primary);
  }
  .feature-box-body {
    font-size: 14px;
    color: var(--hk-text-secondary);
    line-height: 1.6;
  }
</style>
```

### Task 27: Blog ComparisonBox component

**Files:**
- Create: `src/components/blog/ComparisonBox.astro`

```astro
---
// src/components/blog/ComparisonBox.astro
interface Props {
  leftLabel?: string;
  rightLabel?: string;
}

const { leftLabel = 'Cloud-based', rightLabel = 'Local (Harknotes)' } = Astro.props;
---
<div class="comparison-box">
  <div class="comparison-box-col comparison-box-col--left">
    <div class="comparison-box-label comparison-box-label--left">{leftLabel}</div>
    <div class="comparison-box-content"><slot name="left" /></div>
  </div>
  <div class="comparison-box-col comparison-box-col--right">
    <div class="comparison-box-label comparison-box-label--right">{rightLabel}</div>
    <div class="comparison-box-content"><slot name="right" /></div>
  </div>
</div>

<style>
  .comparison-box {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2px;
    border-radius: 12px;
    overflow: hidden;
    margin: 24px 0;
  }
  .comparison-box-col {
    padding: 20px;
  }
  .comparison-box-col--left {
    background: rgba(248,113,113,0.06);
  }
  .comparison-box-col--right {
    background: var(--hk-mint-subtle);
  }
  .comparison-box-label {
    font-family: 'Geist Mono', monospace;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 12px;
  }
  .comparison-box-label--left {
    color: var(--hk-error, #f87171);
  }
  .comparison-box-label--right {
    color: var(--hk-mint);
  }
  .comparison-box-content {
    font-size: 14px;
    color: var(--hk-text-secondary);
    line-height: 1.6;
  }
  .comparison-box-content :global(ul) {
    list-style: none;
    padding: 0;
  }
  .comparison-box-content :global(li) {
    padding: 4px 0;
  }
</style>
```

### Task 28: Blog SectionHeading component

**Files:**
- Create: `src/components/blog/SectionHeading.astro`

```astro
---
// src/components/blog/SectionHeading.astro
interface Props {
  icon?: string;
  label?: string;
}

const { icon, label } = Astro.props;
---
<div class="section-heading">
  {icon && <span class="section-heading-icon">{icon}</span>}
  {label && <span class="section-heading-label">{label}</span>}
  <span class="section-heading-line"></span>
</div>

<style>
  .section-heading {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 48px 0 24px;
  }
  .section-heading-icon {
    font-size: 16px;
  }
  .section-heading-label {
    font-family: 'Geist Mono', monospace;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--hk-mint);
    white-space: nowrap;
  }
  .section-heading-line {
    flex: 1;
    height: 1px;
    background: var(--hk-border-subtle);
  }
</style>
```

### Task 29: Blog CodeBlock component

**Files:**
- Create: `src/components/blog/CodeBlock.astro`

```astro
---
// src/components/blog/CodeBlock.astro
interface Props {
  title?: string;
  lang?: string;
}

const { title, lang } = Astro.props;
---
<div class="code-block">
  {(title || lang) && (
    <div class="code-block-header">
      {title && <span class="code-block-title">{title}</span>}
      {lang && <span class="code-block-lang">{lang}</span>}
    </div>
  )}
  <div class="code-block-body">
    <slot />
  </div>
</div>

<style>
  .code-block {
    background: var(--hk-surface-1);
    border: 1px solid var(--hk-border);
    border-radius: 10px;
    overflow: hidden;
    margin: 24px 0;
  }
  .code-block-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 16px;
    border-bottom: 1px solid var(--hk-border-subtle);
    background: var(--hk-surface-2);
  }
  .code-block-title {
    font-family: 'Geist Mono', monospace;
    font-size: 11px;
    color: var(--hk-text-secondary);
  }
  .code-block-lang {
    font-family: 'Geist Mono', monospace;
    font-size: 10px;
    color: var(--hk-text-tertiary);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
  .code-block-body {
    padding: 16px 20px;
    overflow-x: auto;
  }
  .code-block-body :global(pre) {
    margin: 0;
    padding: 0;
    border: none;
    background: none;
  }
  .code-block-body :global(code) {
    font-family: 'Geist Mono', monospace;
    font-size: 13px;
    line-height: 1.7;
    background: none;
    padding: 0;
  }
</style>
```

**Step: Verify build and commit**

```bash
npx astro build
git add src/components/blog/
git commit -m "feat: add blog MDX components (prose, article header, callout, feature box, comparison, section heading, code block)"
```

---

## Phase 7: Wire Up Pages to Use Components

### Task 30: Refactor src/pages/index.astro

**Files:**
- Modify: `src/pages/index.astro`

Replace the TODO placeholder icons with real components. Replace inline footer with FooterCredit.

The page should import and use:
- `loosewire/Logo` — hero wordmark area (size 48)
- `loosewire/Wordmark` — hero below the logo
- `harknotes/Logo` — product card icon (size 40)
- `loosewire/FooterCredit` — footer

Remove the empty `<div>` placeholders and inline `onmouseover`/`onmouseout` handlers (replace with CSS `:hover`).

**Step 1: Edit the file** — full rewrite of index.astro using components
**Step 2: Verify build** — `npx astro build`
**Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "refactor: wire index.astro to brand components, replace placeholder icons"
```

### Task 31: Refactor src/pages/harknotes/index.astro

**Files:**
- Modify: `src/pages/harknotes/index.astro`

Replace inline markup with components:
- `harknotes/Nav` — replace the inline `<nav>` (lines 56-63)
- `harknotes/Hero` — replace the hero section (lines 65-84)
- `harknotes/StepCard` — How It Works section (lines 120-132)
- `harknotes/FeatureCard` — Features grid (lines 142-159)
- `harknotes/PricingCard` — Pricing section (lines 168-194)
- `harknotes/FaqItem` — FAQ section (lines 230-237)
- `harknotes/Footer` — replace inline footer (lines 244-258)

Also apply content fixes in this task:
- How It Works step 01: Remove "or let Harknotes auto-detect when Google Meet, Zoom, or Teams opens"
- Features grid: Remove the "Auto-detect meetings" card
- FAQ Q2 answer: Change to "Never. Transcription runs entirely locally using whisper.cpp. Only the text transcript is sent to OpenAI GPT-4o mini for summarisation."
- FAQ Q5 answer: Change "secure proxy API" to "OpenAI GPT-4o mini. The transcript text is sent for summarisation — no audio, no personal metadata."
- FAQ Q8 (auto-detect): Remove entirely from the `faqItems` array

**Step 1: Edit the frontmatter** — update imports, fix faqItems
**Step 2: Edit the template** — replace inline markup with components
**Step 3: Verify build** — `npx astro build`
**Step 4: Commit**

```bash
git add src/pages/harknotes/index.astro
git commit -m "refactor: wire harknotes index to components, fix privacy messaging, remove auto-detect"
```

### Task 32: Fix src/pages/harknotes/privacy.astro

**Files:**
- Modify: `src/pages/harknotes/privacy.astro`

Content fixes:
- Line 37: Change "sent to our API for AI summarisation" → "sent to OpenAI GPT-4o mini for AI summarisation"
- Line 41: "processed by GPT-4o mini" — already correct, keep

Also refactor to use Nav and Footer components.

**Step 1: Edit the file**
**Step 2: Verify build** — `npx astro build`
**Step 3: Commit**

```bash
git add src/pages/harknotes/privacy.astro
git commit -m "fix: privacy page uses OpenAI instead of 'our API', add nav/footer components"
```

### Task 33: Refactor blog templates

**Files:**
- Modify: `src/pages/harknotes/blog/[slug].astro`
- Modify: `src/pages/harknotes/blog/index.astro`

Update `[slug].astro`:
- Replace inline prose styles with `blog/Prose` component
- Replace inline article header with `blog/ArticleHeader` component
- Add Harknotes Nav and Footer components
- Remove the `<style>` block at the bottom (replaced by Prose component)

Update blog index:
- Add Harknotes Nav and Footer components

**Step 1: Edit both files**
**Step 2: Verify build** — `npx astro build`
**Step 3: Commit**

```bash
git add src/pages/harknotes/blog/
git commit -m "refactor: blog templates use shared components (prose, article header, nav, footer)"
```

---

## Phase 8: Content Fixes

### Task 34: Fix blog post auto-detect mentions

**Files:**
- Modify: `src/content/harknotes-blog/meeting-transcription-without-bot.mdx` (line ~42)
- Modify: `src/content/harknotes-blog/local-whisper-meeting-notes.mdx` (line ~42)
- Modify: `src/content/harknotes-blog/meeting-transcription-linux.mdx` (line ~66)
- Modify: `src/content/harknotes-blog/how-to-transcribe-meetings-without-cloud.mdx` (line ~69)

For each file, find and remove the auto-detect phrase. The exact edits:
- "or let it auto-detect when a meeting app opens" → remove
- "or let it auto-detect your meeting app" → remove
- "Automatic recording triggered by meeting detection" → change to "Manual recording via menu bar"

**Step 1: Edit each file** — search for "auto-detect" and remove/replace
**Step 2: Verify build** — `npx astro build`
**Step 3: Commit**

```bash
git add src/content/harknotes-blog/
git commit -m "fix: remove auto-detect mentions from blog posts (v2 feature, not in v1)"
```

### Task 35: Delete GDPR blog post

**Files:**
- Delete: `src/content/harknotes-blog/gdpr-compliant-meeting-transcription.mdx`

**Step 1: Delete the file**

```bash
rm src/content/harknotes-blog/gdpr-compliant-meeting-transcription.mdx
```

**Step 2: Verify build** — `npx astro build`
**Step 3: Commit**

```bash
git add src/content/harknotes-blog/gdpr-compliant-meeting-transcription.mdx
git commit -m "content: remove GDPR blog post (legal risk, will rewrite later)"
```

---

## Phase 9: Blog Visual Overhaul

### Task 36: Add TL;DR and read time to blog content schema

**Files:**
- Modify: `src/content/config.ts`

Add optional `tldr` and `readTime` fields to the blog schema:

```typescript
const harknotsBlog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.string(),
    updatedDate: z.string().optional(),
    keywords: z.array(z.string()).default([]),
    tldr: z.string().optional(),
    readTime: z.string().optional(),
  }),
});
```

**Step 1: Edit the file**
**Step 2: Verify build** — `npx astro build`
**Step 3: Commit**

```bash
git add src/content/config.ts
git commit -m "feat: add tldr and readTime fields to blog content schema"
```

### Task 37: Update blog posts with visual components and TL;DR

**Files:**
- Modify: All 5 remaining blog MDX files

For each post:
1. Add `tldr` and `readTime` to frontmatter
2. Add MDX imports for blog components at the top
3. Add `<Callout>`, `<FeatureBox>`, `<ComparisonBox>`, `<SectionHeading>` at appropriate points in the content
4. Keep all existing text — just enhance with visual structure

Example pattern for each post — add imports after frontmatter:
```mdx
import Callout from '../../../components/blog/Callout.astro';
import FeatureBox from '../../../components/blog/FeatureBox.astro';
import ComparisonBox from '../../../components/blog/ComparisonBox.astro';
import SectionHeading from '../../../components/blog/SectionHeading.astro';
```

Then wrap key sections with components. Each post is different so use judgment on which components fit where. General pattern:
- Key privacy facts → `<FeatureBox>`
- Cloud vs local comparisons → `<ComparisonBox>`
- Important notes → `<Callout type="tip">`
- Section transitions → `<SectionHeading>`

Do this for all 5 posts. The exact edits per file will vary.

**Step 1: Edit all 5 MDX files**
**Step 2: Verify build** — `npx astro build`
**Step 3: Commit**

```bash
git add src/content/harknotes-blog/
git commit -m "content: add visual components (callouts, feature boxes, comparisons) to all blog posts"
```

---

## Phase 10: Final Verification

### Task 38: Full build and visual check

**Step 1: Run full build**

```bash
npx astro build
```

Expected: Build succeeds with no warnings.

**Step 2: Run dev server and visually verify**

```bash
npx astro dev
```

Check these pages:
- `/` — LooseWire logo + Harknotes product card icon visible
- `/harknotes` — Nav has wordmark, no auto-detect in features/FAQ/how-it-works
- `/harknotes/privacy` — Says "OpenAI GPT-4o mini" not "our API"
- `/harknotes/blog` — Blog index renders
- `/harknotes/blog/[any-slug]` — Article has TL;DR box, visual components render
- Verify GDPR article is gone (404)

**Step 3: Run tests**

```bash
npx vitest run
```

**Step 4: Final commit if any cleanup needed**

```bash
git add -A
git commit -m "chore: final cleanup after component library implementation"
```

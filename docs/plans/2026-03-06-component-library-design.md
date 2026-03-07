# Component Library & Styleguide Implementation Design

**Date:** 2026-03-06
**Status:** Approved

## Overview

Build a shared Astro component library based on the LooseWire and Harknotes styleguides. Components live in `src/components/` organized by brand, with shared UI primitives. Also: fix content accuracy, overhaul blog styling, reorganise CSS.

## Architecture

```
src/
├── components/
│   ├── loosewire/           # Parent brand
│   │   ├── Logo.astro           # Signal waveform SVG (configurable size)
│   │   ├── Wordmark.astro       # Icon + "loosewire" text lockup
│   │   ├── FooterCredit.astro   # "© 2026 Loose Wire LLC" (dark/light)
│   │   └── Nav.astro            # Top nav for loosewire.dev pages
│   │
│   ├── harknotes/           # Product brand
│   │   ├── Logo.astro           # H-bar icon SVG (with gradient defs)
│   │   ├── Wordmark.astro       # Icon + "harknotes" text lockup
│   │   ├── Nav.astro            # Harknotes page nav (logo, links, CTA)
│   │   ├── Footer.astro         # Harknotes footer with LooseWire credit
│   │   ├── Hero.astro           # Hero pattern (badge, headline, subtitle, CTAs)
│   │   ├── FeatureCard.astro    # Icon + title + description card
│   │   ├── PricingCard.astro    # Tier card (name, price, features, CTA)
│   │   ├── FaqItem.astro        # Expandable Q&A
│   │   ├── ComparisonTable.astro # vs-competitor table
│   │   └── StepCard.astro       # Numbered how-it-works step
│   │
│   ├── ui/                  # Brand-agnostic primitives
│   │   ├── Button.astro         # Primary/secondary/ghost variants
│   │   ├── Badge.astro          # Status badges
│   │   ├── Card.astro           # Base card container
│   │   ├── Input.astro          # Text input
│   │   ├── Toggle.astro         # On/off toggle
│   │   ├── Toast.astro          # Notification toast
│   │   └── Menu.astro           # Dropdown menu
│   │
│   └── blog/                # Blog MDX components
│       ├── ArticleHeader.astro  # Title, date, read time, tags, TL;DR box
│       ├── Callout.astro        # Tip/warning/info callout boxes
│       ├── FeatureBox.astro     # Inline product feature highlight
│       ├── ComparisonBox.astro  # Side-by-side "this vs that"
│       ├── CodeBlock.astro      # Styled code with copy button
│       ├── SectionHeading.astro # Icon-labeled section divider
│       └── Prose.astro          # Base prose wrapper (typography)
│
├── styles/
│   ├── global.css               # Imports + shared resets
│   └── styleguides/             # Renamed from tokens-*
│       ├── loosewire.css        # LooseWire design tokens
│       └── harknotes.css        # Harknotes design tokens (dark/light)
```

## Brand Icons (SVG Sources)

### LooseWire — "The Signal"
- viewBox: `0 0 120 120`
- Container: `<rect rx="28" fill="#0e1816"/>`
- Waveform: `<path d="M20 60 L32 60 L40 30 L52 84 L64 36 L76 78 L84 48 L92 60 L100 60" stroke="#3d7a6e" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`
- Wordmark font: Nunito Sans 700, -0.025em tracking, "wire" in pine color

### Harknotes — "H-bar"
- viewBox: `0 0 512 512`
- Container: `<rect rx="112" fill="#0d2520"/>` + radial gradient overlay
- Mark: 5 rects forming an H shape with horizontal bar, fill `#3dd68c`, inner bars at 0.52 opacity
- Wordmark font: Geist 700, -0.025em tracking, "notes" in mint color

## Content Fixes

### Privacy messaging (harknotes/index.astro)
- FAQ Q2: Reword — audio stays local, text transcript sent to OpenAI GPT-4o mini
- FAQ Q5: Change "secure proxy API" to "OpenAI GPT-4o mini"
- FAQ Q8 (auto-detection): Remove entirely — v2 feature
- How it Works step 01: Remove auto-detect mention
- Features grid: Remove "Auto-detect meetings" card
- General: Ensure hero/subtitle are accurate (currently fine)

### Privacy page (harknotes/privacy.astro)
- Fix "secure proxy API" to "OpenAI"

### Blog posts — auto-detect removal
- meeting-transcription-without-bot.mdx (line 42)
- local-whisper-meeting-notes.mdx (line 42)
- meeting-transcription-linux.mdx (line 66)
- how-to-transcribe-meetings-without-cloud.mdx (line 69)

### Blog posts — delete
- gdpr-compliant-meeting-transcription.mdx (legal risk, rewrite later)

## Blog Visual Overhaul

Transform wall-of-text MDX into visual cards+sections layout using blog components:
- ArticleHeader with TL;DR summary box
- SectionHeading with icon labels
- FeatureBox for inline product highlights
- ComparisonBox for side-by-side comparisons
- Callout boxes for key points

Style: Vercel/Linear blog aesthetic adapted to Harknotes dark theme.

## CSS Reorganisation

- `src/styles/tokens-loosewire.css` -> `src/styles/styleguides/loosewire.css`
- `src/styles/tokens-harknotes.css` -> `src/styles/styleguides/harknotes.css`
- Update `src/styles/global.css` imports

## Key Principles

- LooseWire components are muted/background (maker's mark, not corporate identity)
- Harknotes owns its identity fully
- UI primitives styled via CSS variables, work in either brand context
- Components accept props for size/variant, not hardcoded styles
- Blog components designed for MDX import (used directly in .mdx files)

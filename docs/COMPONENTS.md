# Component Reference

## UI Primitives (`src/components/ui/`)

Shared across all products. Theme-agnostic — styled via props and CSS classes.

### Button
```astro
<Button variant="primary" size="md" href="/download">Download</Button>
```
| Prop | Type | Default |
|------|------|---------|
| `variant` | `'primary' \| 'secondary' \| 'ghost'` | `'primary'` |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` |
| `href` | `string?` | — (renders `<a>` if set, `<button>` otherwise) |
| `class` | `string?` | — |

### Badge
```astro
<Badge variant="mint">New</Badge>
```
| Prop | Type | Default |
|------|------|---------|
| `variant` | `'default' \| 'mint' \| 'red' \| 'warning'` | `'default'` |

### Card
```astro
<Card padding="2rem">Content here</Card>
```
| Prop | Type | Default |
|------|------|---------|
| `padding` | `string?` | — |
| `class` | `string?` | — |

### Input
```astro
<Input label="Email" type="email" name="email" placeholder="you@example.com" />
```
| Prop | Type | Default |
|------|------|---------|
| `label` | `string?` | — |
| `type` | `string` | `'text'` |
| `name` | `string?` | — |
| `placeholder` | `string?` | — |

### Toggle
```astro
<Toggle label="Dark mode" name="theme" checked />
```
| Prop | Type | Default |
|------|------|---------|
| `label` | `string?` | — |
| `name` | `string?` | — |
| `checked` | `boolean` | `false` |

### Toast
```astro
<Toast variant="success">Saved successfully</Toast>
```
| Prop | Type | Default |
|------|------|---------|
| `variant` | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` |

### Menu
```astro
<Menu>Menu items here</Menu>
```
Dropdown container with shadow and min-width.

---

## Loose Wire Brand (`src/components/loosewire/`)

### Logo
```astro
<Logo size={48} />
```
SVG wave pattern in pine color.

### Wordmark
```astro
<Wordmark logoSize={32} fontSize="1.5rem" />
```
Logo + "loose**wire**" text.

### Nav
```astro
<Nav><a href="/blog">Blog</a></Nav>
```
Bar with Wordmark on left, slot for links on right.

### FooterCredit
```astro
<FooterCredit variant="light"><a href="/blog">Blog</a></FooterCredit>
```
| Prop | Type | Default |
|------|------|---------|
| `variant` | `'light' \| 'dark'` | `'light'` |

---

## Harknotes Product (`src/components/harknotes/`)

### Nav
```astro
<Nav showCta={true} />
```
Navigation with Wordmark, Blog link, Pricing anchor, optional Download CTA.

### Hero
```astro
<Hero
  badge="Privacy-first"
  headline="Meeting notes without the"
  highlightedText="surveillance"
  subtitle="Local transcription, no bot."
  primaryCta={{ label: "Download", href: "#download" }}
  secondaryCta={{ label: "Learn more", href: "#features" }}
/>
```

### FeatureCard
```astro
<FeatureCard title="Local transcription" description="Audio never leaves your machine." />
```
Displays with a mint dot indicator.

### StepCard
```astro
<StepCard number="01" title="Start a call" description="Harknotes captures audio silently." />
```

### PricingCard
```astro
<PricingCard
  name="Pro Local"
  price="$12"
  period="/month"
  summaries="200 summaries/mo"
  features={["whisper.cpp", "GPT-4o mini", "Priority support"]}
  highlight={true}
  ctaHref="#download"
  ctaLabel="Get started"
/>
```

### FaqItem
```astro
<FaqItem question="Does a bot join my call?" answer="No. Harknotes captures audio at the OS level." />
```
Renders as a `<details>/<summary>` element.

### ComparisonTable
```astro
<ComparisonTable
  competitor="Otter.ai"
  rows={[
    { label: "Bot joins call", harknotes: "No", competitor: "Yes" },
    { label: "Local audio", harknotes: "Yes", competitor: "No" },
  ]}
/>
```

### Footer
No props. Renders brand info, navigation links (Privacy, Linux, Blog, comparisons, GitHub).

---

## Blog Components (`src/components/blog/`)

### Prose
```astro
<Prose><Content /></Prose>
```
Wraps rendered MDX with typography styles (headings, lists, code blocks, blockquotes, tables, links).

### ArticleHeader
```astro
<ArticleHeader
  title="How to transcribe meetings locally"
  date="2026-03-06"
  description="Three approaches to local transcription."
  readTime="5 min"
  tldr="Use whisper.cpp for privacy-first transcription."
/>
```

### Callout (MDX component)
```mdx
<Callout type="tip" title="Pro tip">Use keyboard shortcuts for faster workflows.</Callout>
```
| Prop | Type | Default |
|------|------|---------|
| `type` | `'info' \| 'tip' \| 'warning'` | `'info'` |
| `title` | `string?` | — |

### FeatureBox (MDX component)
```mdx
<FeatureBox title="Local processing" icon="lucide:cpu">Runs entirely on your machine.</FeatureBox>
```

### ComparisonBox (MDX component)
```mdx
<ComparisonBox leftLabel="Before" rightLabel="After">
  <Fragment slot="left">Manual notes</Fragment>
  <Fragment slot="right">Automated summaries</Fragment>
</ComparisonBox>
```

### SectionHeading (MDX component)
```mdx
<SectionHeading icon="lucide:shield" label="Privacy" />
```

### CodeBlock (MDX component)
```mdx
<CodeBlock title="Install" lang="sh">brew install harknotes</CodeBlock>
```

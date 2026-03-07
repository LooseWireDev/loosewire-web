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
    downloadUrl: 'https://github.com/LooseWireDev/harknotes-releases/releases/latest',
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

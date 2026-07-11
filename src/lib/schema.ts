export function softwareAppSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Harknotes',
    description: 'Free, open-source, privacy-first meeting transcription. No bot joins your calls. Audio stays local. Whisper AI runs on your machine.',
    applicationCategory: 'ProductivityApplication',
    operatingSystem: ['Linux'],
    offers: [
      { '@type': 'Offer', price: '0', priceCurrency: 'USD', name: 'Free & open source' },
    ],
    license: 'https://www.gnu.org/licenses/agpl-3.0.html',
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

export const SAME_AS = [
  'https://github.com/LooseWireDev',
  'https://www.youtube.com/@loosewiredev',
  'https://ko-fi.com/loosewire',
];

export function orgSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Loose Wire LLC',
    url: 'https://loosewire.dev',
    email: 'info@loosewire.dev',
    founder: { '@type': 'Person', name: 'Gav' },
    sameAs: SAME_AS,
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Loose Wire',
    alternateName: 'loosewire.dev',
    url: 'https://loosewire.dev/',
    publisher: {
      '@type': 'Organization',
      name: 'Loose Wire LLC',
      url: 'https://loosewire.dev',
    },
  };
}

interface Crumb { name: string; url: string; }

export function breadcrumbSchema(items: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

interface ArticleOpts {
  title: string;
  description: string;
  datePublished: string;
  url: string;
  dateModified?: string;
  keywords?: string[];
  /** 'person' for handwritten journal entries; defaults to the org */
  author?: 'person' | 'org';
}

export function articleSchema(opts: ArticleOpts) {
  const author =
    opts.author === 'person'
      ? {
          '@type': 'Person',
          name: 'Gav',
          url: 'https://loosewire.dev',
          sameAs: SAME_AS,
        }
      : {
          '@type': 'Organization',
          name: 'Loose Wire LLC',
          url: 'https://loosewire.dev',
        };
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.title,
    description: opts.description,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    url: opts.url,
    ...(opts.keywords?.length && { keywords: opts.keywords }),
    author,
    publisher: {
      '@type': 'Organization',
      name: 'Loose Wire LLC',
      url: 'https://loosewire.dev',
    },
  };
}

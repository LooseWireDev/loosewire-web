import { describe, it, expect } from 'vitest';
import { softwareAppSchema, faqPageSchema, articleSchema, orgSchema, websiteSchema, breadcrumbSchema } from './schema';

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

  it('defaults to Organization author', () => {
    const schema = articleSchema({
      title: 'T', description: 'D', datePublished: '2026-03-06', url: 'https://loosewire.dev/x',
    });
    expect(schema.author['@type']).toBe('Organization');
  });

  it('uses Person author with sameAs for journal entries', () => {
    const schema = articleSchema({
      title: 'T', description: 'D', datePublished: '2026-03-06', url: 'https://loosewire.dev/x',
      author: 'person',
    });
    expect(schema.author['@type']).toBe('Person');
    expect(schema.author.name).toBe('Gav');
    expect(schema.author.sameAs).toContain('https://www.youtube.com/@loosewiredev');
  });
});

describe('websiteSchema', () => {
  it('returns WebSite schema with site name', () => {
    const schema = websiteSchema();
    expect(schema['@type']).toBe('WebSite');
    expect(schema.name).toBe('Loose Wire');
  });
});

describe('breadcrumbSchema', () => {
  it('returns ordered BreadcrumbList', () => {
    const schema = breadcrumbSchema([
      { name: 'Loose Wire', url: 'https://loosewire.dev/' },
      { name: 'Harknotes', url: 'https://loosewire.dev/harknotes/' },
    ]);
    expect(schema['@type']).toBe('BreadcrumbList');
    expect(schema.itemListElement).toHaveLength(2);
    expect(schema.itemListElement[0].position).toBe(1);
    expect(schema.itemListElement[1].name).toBe('Harknotes');
  });
});

describe('orgSchema', () => {
  it('returns Organization schema with sameAs links', () => {
    const schema = orgSchema();
    expect(schema['@type']).toBe('Organization');
    expect(schema.sameAs).toContain('https://github.com/LooseWireDev');
    expect(schema.sameAs).toContain('https://www.youtube.com/@loosewiredev');
  });
});

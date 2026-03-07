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

import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import icon from 'astro-icon';

import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://loosewire.dev',
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/checkout/') &&
        !page.includes('/404'),
    }),
    mdx(),
    icon(),
  ],
  adapter: cloudflare(),
});
import { readFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

const repository = process.env.GITHUB_REPOSITORY ?? '';
const [owner, repo] = repository.split('/');
const site = process.env.SITE ?? (owner ? `https://${owner}.github.io` : 'http://localhost:4321');
const base = process.env.BASE_PATH ?? (process.env.GITHUB_ACTIONS && repo ? `/${repo}` : '/');
const withBase = (path) => `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
const sidebar = JSON.parse(readFileSync(new URL('./src/data/sidebar.json', import.meta.url), 'utf8'));

export default defineConfig({
  site,
  base,
  integrations: [
    starlight({
      title: 'Nevergrind Online 攻略 DB 繁中版',
      description: 'FC2 / atelier3 Nevergrind Online 攻略 DB 的台灣繁體中文整理版。',
      defaultLocale: 'root',
      locales: {
        root: {
          label: '繁體中文',
          lang: 'zh-TW',
        },
      },
      sidebar,
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 3,
      },
      customCss: ['./src/styles/custom.css'],
      head: [
        {
          tag: 'link',
          attrs: {
            rel: 'icon',
            type: 'image/png',
            sizes: '16x16',
            href: withBase('favicon-16x16.png'),
          },
        },
        {
          tag: 'link',
          attrs: {
            rel: 'icon',
            type: 'image/png',
            sizes: '32x32',
            href: withBase('favicon-32x32.png'),
          },
        },
        {
          tag: 'link',
          attrs: {
            rel: 'icon',
            type: 'image/png',
            href: withBase('favicon.png'),
          },
        },
        {
          tag: 'link',
          attrs: {
            rel: 'apple-touch-icon',
            sizes: '180x180',
            href: withBase('apple-touch-icon.png'),
          },
        },
        {
          tag: 'meta',
          attrs: {
            name: 'robots',
            content: 'index, follow',
          },
        },
      ],
    }),
  ],
});

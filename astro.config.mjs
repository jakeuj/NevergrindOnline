import { readdirSync, readFileSync } from 'node:fs';
import { copyFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import starlight from '@astrojs/starlight';
import matter from 'gray-matter';

const repository = process.env.GITHUB_REPOSITORY ?? '';
const [owner, repo] = repository.split('/');
const site = process.env.SITE ?? (owner ? `https://${owner}.github.io` : 'http://localhost:4321');
const base = process.env.BASE_PATH ?? (process.env.GITHUB_ACTIONS && repo ? `/${repo}` : '/');
const withBase = (path) => `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
const sidebar = JSON.parse(readFileSync(new URL('./src/data/sidebar.json', import.meta.url), 'utf8'));
const docsRoot = fileURLToPath(new URL('./src/content/docs/', import.meta.url));

function filesWithExtension(dir, extension) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...filesWithExtension(path, extension));
    } else if (entry.name.endsWith(extension)) {
      files.push(path);
    }
  }
  return files;
}

function routePathFromDocFile(file) {
  let slug = relative(docsRoot, file).replaceAll('\\', '/').replace(/\.md$/, '');
  if (slug === 'index') return '/';
  if (slug.endsWith('/index')) slug = slug.slice(0, -'/index'.length);
  return `/${slug}/`;
}

function reviewedAtToLastmod(value, file) {
  const raw = value instanceof Date ? value.toISOString() : String(value ?? '');
  const date = /^\d{4}-\d{2}-\d{2}$/.test(raw) ? new Date(`${raw}T00:00:00.000Z`) : new Date(raw);
  if (Number.isNaN(date.getTime())) {
    throw new Error(`${file} has invalid reviewedAt for sitemap lastmod: ${raw}`);
  }
  return date.toISOString();
}

const sitemapLastmodByPath = new Map(
  filesWithExtension(docsRoot, '.md').map((file) => {
    const parsed = matter(readFileSync(file, 'utf8'));
    return [routePathFromDocFile(file), reviewedAtToLastmod(parsed.data.reviewedAt, file)];
  }),
);
sitemapLastmodByPath.set(
  '/weapon-dps-calculator/',
  reviewedAtToLastmod('2026-06-12', 'src/pages/weapon-dps-calculator.astro'),
);

function sitemapCompatibilityAlias() {
  return {
    name: 'sitemap-compatibility-alias',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        await copyFile(new URL('./sitemap-index.xml', dir), new URL('./sitemap.xml', dir));
        logger.info('`sitemap.xml` compatibility alias created.');
      },
    },
  };
}

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
      components: {
        Head: './src/components/SeoHead.astro',
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
    sitemap({
      filter: (page) => !new URL(page).pathname.startsWith('/nevergrind-online/'),
      serialize: (item) => ({
        ...item,
        lastmod: sitemapLastmodByPath.get(new URL(item.url).pathname) ?? item.lastmod,
      }),
    }),
    sitemapCompatibilityAlias(),
  ],
});

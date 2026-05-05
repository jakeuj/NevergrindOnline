import { mkdir, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  EXPECTED_FC2_COUNT,
  FC2_BASE_URL,
  extractPage,
  fetchFc2Page,
  isInternalHtml,
} from './fc2-common.mjs';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const OUTPUT_PATH = join(ROOT, 'src/data/fc2-source-manifest.json');
const CACHE_ROOT = join(ROOT, '.cache/fc2');
const HTML_CACHE = join(CACHE_ROOT, 'html');
const PAGE_CACHE = join(CACHE_ROOT, 'pages');

async function crawl(baseUrl) {
  const base = new URL(baseUrl);
  const queue = [base.href];
  const seen = new Set();
  const pages = [];
  const errors = [];

  await rm(CACHE_ROOT, { recursive: true, force: true });
  await mkdir(HTML_CACHE, { recursive: true });
  await mkdir(PAGE_CACHE, { recursive: true });

  while (queue.length > 0) {
    const url = queue.shift();
    if (!url || seen.has(url) || !isInternalHtml(url, base)) continue;
    seen.add(url);

    try {
      const fetched = await fetchFc2Page(url);
      const page = extractPage(url, fetched.html, fetched);

      await writeFile(join(HTML_CACHE, page.file), fetched.html, 'utf8');
      await writeFile(join(PAGE_CACHE, `${page.file}.json`), `${JSON.stringify(page, null, 2)}\n`, 'utf8');

      pages.push({
        url: page.url,
        file: page.file,
        title: page.title,
        pageTitle: page.pageTitle,
        headings: page.headings,
        links: page.links,
        lastModified: page.lastModified,
        contentType: page.contentType,
        contentHash: page.contentHash,
        blockCounts: page.blockCounts,
      });

      for (const next of page.enqueue) {
        if (!seen.has(next) && !queue.includes(next)) queue.push(next);
      }
    } catch (error) {
      errors.push({
        url,
        message: error instanceof Error ? error.message : String(error),
      });
    }
  }

  pages.sort((a, b) => a.file.localeCompare(b.file));
  return {
    base: base.href,
    crawledAt: new Date().toISOString(),
    expectedCount: EXPECTED_FC2_COUNT,
    count: pages.length,
    errors,
    cache: {
      rawHtml: '.cache/fc2/html',
      structuredPages: '.cache/fc2/pages',
    },
    pages,
  };
}

const manifest = await crawl(FC2_BASE_URL);
await mkdir(dirname(OUTPUT_PATH), { recursive: true });
await writeFile(OUTPUT_PATH, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');

console.log(
  JSON.stringify(
    {
      output: OUTPUT_PATH,
      structuredPages: PAGE_CACHE,
      count: manifest.count,
      expectedCount: manifest.expectedCount,
      errors: manifest.errors.length,
    },
    null,
    2,
  ),
);

if (manifest.errors.length > 0) {
  process.exitCode = 2;
} else if (manifest.count !== EXPECTED_FC2_COUNT) {
  process.exitCode = 1;
}

import { mkdir, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as cheerio from 'cheerio';
import iconv from 'iconv-lite';

const BASE_URL = 'https://atelier3.web.fc2.com/ngo/index.html';
const OUTPUT_PATH = new URL('../src/data/fc2-source-manifest.json', import.meta.url);
const EXPECTED_COUNT = 106;
const USER_AGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/124.0 Safari/537.36';

function isInternalHtml(value, base) {
  try {
    const url = new URL(value, base);
    return url.origin === base.origin && url.pathname.startsWith('/ngo/') && url.pathname.endsWith('.html');
  } catch {
    return false;
  }
}

function decodeHtml(buffer, contentType = '') {
  const charset = contentType.match(/charset=([^;]+)/i)?.[1]?.trim();
  if (charset) {
    return iconv.decode(buffer, charset);
  }

  const utf8 = iconv.decode(buffer, 'utf8');
  if (!utf8.includes('\uFFFD')) {
    return utf8;
  }
  return iconv.decode(buffer, 'shift_jis');
}

function cleanText(value) {
  return value.replace(/\s+/g, ' ').trim();
}

async function fetchPage(url) {
  const response = await fetch(url, {
    headers: {
      'user-agent': USER_AGENT,
    },
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  const html = decodeHtml(buffer, response.headers.get('content-type') ?? '');
  return {
    html,
    lastModified: response.headers.get('last-modified') ?? '',
    contentType: response.headers.get('content-type') ?? '',
  };
}

function discover(url, html, base) {
  const $ = cheerio.load(html);
  const links = [];
  const enqueue = [];

  $('iframe[src], frame[src], a[href]').each((_, element) => {
    const attr = element.tagName === 'a' ? 'href' : 'src';
    const raw = $(element).attr(attr);
    if (!raw) return;

    const absolute = new URL(raw, url);
    absolute.hash = '';
    if (!isInternalHtml(absolute.href, base)) return;

    links.push({
      label: cleanText($(element).text()),
      url: absolute.href,
    });
    enqueue.push(absolute.href);
  });

  const headings = [];
  $('h1, h2, h3').each((_, element) => {
    const text = cleanText($(element).text());
    if (!text) return;
    headings.push({
      tag: element.tagName.toLowerCase(),
      text,
    });
  });

  return {
    title: cleanText($('title').first().text()),
    headings,
    links,
    enqueue,
  };
}

async function crawl(baseUrl) {
  const base = new URL(baseUrl);
  const queue = [base.href];
  const seen = new Set();
  const pages = [];
  const errors = [];

  while (queue.length > 0) {
    const url = queue.shift();
    if (!url || seen.has(url) || !isInternalHtml(url, base)) continue;
    seen.add(url);

    try {
      const fetched = await fetchPage(url);
      const discovered = discover(url, fetched.html, base);
      pages.push({
        url,
        file: new URL(url).pathname.split('/').pop(),
        title: discovered.title,
        headings: discovered.headings,
        links: discovered.links,
        lastModified: fetched.lastModified,
      });

      for (const next of discovered.enqueue) {
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
    expectedCount: EXPECTED_COUNT,
    count: pages.length,
    errors,
    pages,
  };
}

const manifest = await crawl(BASE_URL);
await mkdir(dirname(fileURLToPath(OUTPUT_PATH)), { recursive: true });
await writeFile(OUTPUT_PATH, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');

console.log(
  JSON.stringify(
    {
      output: fileURLToPath(OUTPUT_PATH),
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
} else if (manifest.count !== EXPECTED_COUNT) {
  process.exitCode = 1;
}

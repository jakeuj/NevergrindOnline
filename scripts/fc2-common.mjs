import { createHash } from 'node:crypto';
import { basename } from 'node:path';
import * as cheerio from 'cheerio';
import iconv from 'iconv-lite';

export const FC2_BASE_URL = 'https://atelier3.web.fc2.com/ngo/index.html';
export const EXPECTED_FC2_COUNT = 106;
export const USER_AGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/124.0 Safari/537.36';

export function isInternalHtml(value, base) {
  try {
    const url = new URL(value, base);
    return url.origin === base.origin && url.pathname.startsWith('/ngo/') && url.pathname.endsWith('.html');
  } catch {
    return false;
  }
}

export function decodeHtml(buffer, contentType = '') {
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

export function cleanText(value) {
  return String(value)
    .replace(/\u00a0/g, ' ')
    .replace(/[ \t]*\n[ \t]*/g, '\n')
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export function cleanInlineText(value) {
  return cleanText(value).replace(/\s+/g, ' ').trim();
}

export function fileForUrl(url) {
  return new URL(url).pathname.split('/').pop();
}

function imageRecord($, element, pageUrl, token = '') {
  const source = $(element).attr('src') ?? '';
  if (!source) return null;

  let absolute;
  try {
    absolute = new URL(source, pageUrl);
    absolute.hash = '';
  } catch {
    return null;
  }

  const alt = cleanInlineText($(element).attr('alt') ?? '');
  const title = cleanInlineText($(element).attr('title') ?? '');
  const file = basename(absolute.pathname);
  const label = alt || title || file;

  return {
    token,
    source,
    url: absolute.href,
    file,
    alt,
    title,
    label,
  };
}

function inlineText($, element, state) {
  const parts = [];

  $(element)
    .contents()
    .each((_, child) => {
      if (child.type === 'text') {
        parts.push(child.data ?? '');
        return;
      }

      if (child.type !== 'tag') return;
      const tag = child.tagName.toLowerCase();
      if (tag === 'script' || tag === 'style' || tag === 'iframe') return;
      if (tag === 'br') {
        parts.push('\n');
        return;
      }
      if (tag === 'img') {
        const token = `{{FC2_IMAGE_${state.images.length}}}`;
        const image = imageRecord($, child, state.pageUrl, token);
        if (image) {
          state.images.push(image);
          parts.push(` ${token} `);
        }
        return;
      }
      parts.push(inlineText($, child, state));
    });

  return cleanInlineText(parts.join(''));
}

function blockText($, element, state) {
  return inlineText($, element, state);
}

function hasBlockChildren($, element) {
  return $(element).children('h1,h2,h3,h4,h5,h6,p,ul,ol,table,div,section,article').length > 0;
}

function tableRows($, element, state) {
  const rows = [];

  $(element)
    .find('tr')
    .each((_, row) => {
      const cells = [];
      $(row)
        .children('th,td')
        .each((__, cell) => {
          const colspan = Number.parseInt($(cell).attr('colspan') ?? '1', 10) || 1;
          const text = blockText($, cell, state);
          cells.push(text);
          for (let index = 1; index < colspan; index += 1) {
            cells.push('');
          }
        });
      if (cells.some(Boolean)) rows.push(cells);
    });

  return rows;
}

function listItems($, element, state) {
  const items = [];
  let current = -1;

  $(element)
    .children()
    .each((_, child) => {
      if (child.type !== 'tag') return;
      const tag = child.tagName.toLowerCase();
      const text = blockText($, child, state);
      if (!text) return;

      if (tag === 'li') {
        items.push(text);
        current = items.length - 1;
        return;
      }

      if (current >= 0) {
        items[current] = `${items[current]}\n${text}`;
      } else {
        items.push(text);
        current = items.length - 1;
      }
    });

  return items;
}

function extractBlocksFrom($, parent, blocks, state) {
  $(parent)
    .children()
    .each((_, element) => {
      if (element.type !== 'tag') return;
      const tag = element.tagName.toLowerCase();
      if (['script', 'style', 'iframe'].includes(tag)) return;

      if (/^h[1-6]$/.test(tag)) {
        const text = blockText($, element, state);
        if (text) {
          blocks.push({
            type: 'heading',
            level: Number(tag.slice(1)),
            id: $(element).attr('id') ?? '',
            text,
          });
        }
        return;
      }

      if (tag === 'p') {
        const text = blockText($, element, state);
        if (text) blocks.push({ type: 'paragraph', text });
        return;
      }

      if (tag === 'ul' || tag === 'ol') {
        const items = listItems($, element, state);

        if ($(element).hasClass('tab-list')) {
          state.pendingTabs = items;
          return;
        }

        if (items.length > 0) {
          blocks.push({
            type: 'list',
            ordered: tag === 'ol',
            items,
          });
        }
        return;
      }

      if (tag === 'table') {
        const rows = tableRows($, element, state);
        if (rows.length > 0) blocks.push({ type: 'table', rows });
        return;
      }

      if (tag === 'div') {
        if ($(element).hasClass('tab-contents')) {
          $(element)
            .children('.tab-contents-item')
            .each((index, tab) => {
              const label = state.pendingTabs[index] || `Tab ${index + 1}`;
              blocks.push({
                type: 'heading',
                level: 3,
                id: '',
                text: `分頁：${label}`,
              });
              extractBlocksFrom($, tab, blocks, state);
            });
          state.pendingTabs = [];
          return;
        }

        if (!hasBlockChildren($, element)) {
          const text = blockText($, element, state);
          if (text) blocks.push({ type: 'paragraph', text });
          return;
        }

        extractBlocksFrom($, element, blocks, state);
        return;
      }

      const text = blockText($, element, state);
      if (text) blocks.push({ type: 'paragraph', text });
    });
}

export function extractPage(url, html, fetched = {}) {
  const base = new URL(FC2_BASE_URL);
  const $ = cheerio.load(html);
  const main = $('#main').first();
  const root = main.length ? main : $('body').first();
  const blocks = [];
  const state = {
    pendingTabs: [],
    pageUrl: url,
    images: [],
  };
  extractBlocksFrom($, root, blocks, state);

  const imageUrls = new Set(state.images.map((image) => image.url));
  $('img[src]').each((_, element) => {
    const image = imageRecord($, element, url, '');
    if (!image || imageUrls.has(image.url)) return;
    state.images.push(image);
    imageUrls.add(image.url);
  });

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
      label: cleanInlineText($(element).text()),
      url: absolute.href,
    });
    enqueue.push(absolute.href);
  });

  const headings = [];
  $('h1, h2, h3').each((_, element) => {
    const text = cleanInlineText($(element).text());
    if (!text) return;
    headings.push({
      tag: element.tagName.toLowerCase(),
      text,
    });
  });

  const file = fileForUrl(url);
  const title = cleanInlineText($('title').first().text()) || file;
  const pageTitle = blocks.find((block) => block.type === 'heading' && block.level === 1)?.text || title.split('|')[0].trim();
  const blockCounts = blocks.reduce((counts, block) => {
    counts[block.type] = (counts[block.type] ?? 0) + 1;
    return counts;
  }, {});

  return {
    url,
    file,
    title,
    pageTitle,
    headings,
    links,
    enqueue,
    lastModified: fetched.lastModified ?? '',
    contentType: fetched.contentType ?? '',
    contentHash: createHash('sha256').update(html).digest('hex'),
    blockCounts,
    images: state.images,
    blocks,
  };
}

export async function fetchFc2Page(url) {
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

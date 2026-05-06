import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { dirname, extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { USER_AGENT } from './fc2-common.mjs';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const PAGE_CACHE = join(ROOT, '.cache/fc2/pages');
const PUBLIC_ASSET_ROOT = join(ROOT, 'public/fc2-assets');
const PUBLIC_NGO_ROOT = join(PUBLIC_ASSET_ROOT, 'ngo');
const MANIFEST_PATH = join(ROOT, 'src/data/fc2-image-manifest.json');
const FC2_ORIGIN = 'https://atelier3.web.fc2.com';
const ALLOWED_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.gif']);

async function readJson(path) {
  return JSON.parse(await readFile(path, 'utf8'));
}

function normalizedUrl(value) {
  try {
    const url = new URL(value);
    url.hash = '';
    return url;
  } catch {
    return null;
  }
}

function skipReason(value) {
  const url = normalizedUrl(value);
  if (!url) return 'invalid-url';
  if (url.hostname === 'media.fc2.com' || url.pathname.includes('counter_img')) return 'tracking-image';
  if (url.origin !== FC2_ORIGIN) return 'external-origin';
  if (!url.pathname.startsWith('/ngo/')) return 'outside-ngo';
  if (!ALLOWED_EXTENSIONS.has(extname(url.pathname).toLowerCase())) return 'unsupported-extension';
  return '';
}

function publicPathFor(value) {
  const url = normalizedUrl(value);
  if (!url) throw new Error(`Invalid image URL: ${value}`);
  return `/fc2-assets${url.pathname}`;
}

function localPathFor(value) {
  const url = normalizedUrl(value);
  if (!url) throw new Error(`Invalid image URL: ${value}`);
  return join(PUBLIC_ASSET_ROOT, ...url.pathname.split('/').filter(Boolean));
}

async function collectImageReferences() {
  if (!existsSync(PAGE_CACHE)) {
    throw new Error(`Missing FC2 page cache: ${PAGE_CACHE}. Run npm run crawl:fc2 first.`);
  }

  const files = (await readdir(PAGE_CACHE)).filter((file) => file.endsWith('.json')).sort();
  const records = new Map();

  for (const file of files) {
    const page = await readJson(join(PAGE_CACHE, file));
    for (const image of page.images ?? []) {
      if (!image?.url) continue;
      if (!records.has(image.url)) {
        records.set(image.url, {
          url: image.url,
          references: [],
          referencedBy: new Set(),
        });
      }
      const record = records.get(image.url);
      record.referencedBy.add(page.url);
      record.references.push({
        pageFile: page.file,
        pageUrl: page.url,
        token: image.token || '',
        source: image.source || '',
        alt: image.alt || '',
        title: image.title || '',
      });
    }
  }

  return [...records.values()].map((record) => ({
    ...record,
    referencedBy: [...record.referencedBy].sort(),
  }));
}

async function downloadImage(record) {
  const response = await fetch(record.url, {
    headers: {
      'user-agent': USER_AGENT,
    },
  });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);

  const bytes = Buffer.from(await response.arrayBuffer());
  const localPath = localPathFor(record.url);
  await mkdir(dirname(localPath), { recursive: true });
  await writeFile(localPath, bytes);

  return {
    url: record.url,
    publicPath: publicPathFor(record.url),
    localPath: relative(ROOT, localPath),
    contentType: response.headers.get('content-type') ?? '',
    bytes: bytes.length,
    sha256: createHash('sha256').update(bytes).digest('hex'),
    referencedBy: record.referencedBy,
    references: record.references,
  };
}

async function main() {
  const references = await collectImageReferences();
  const images = [];
  const skipped = [];
  const errors = [];

  await rm(PUBLIC_NGO_ROOT, { recursive: true, force: true });

  for (const record of references) {
    const reason = skipReason(record.url);
    if (reason) {
      skipped.push({
        url: record.url,
        reason,
        referencedBy: record.referencedBy,
        references: record.references,
      });
      continue;
    }

    try {
      images.push(await downloadImage(record));
    } catch (error) {
      errors.push({
        url: record.url,
        message: error instanceof Error ? error.message : String(error),
        referencedBy: record.referencedBy,
      });
    }
  }

  images.sort((left, right) => left.publicPath.localeCompare(right.publicPath));
  skipped.sort((left, right) => left.url.localeCompare(right.url));

  const manifest = {
    generatedAt: new Date().toISOString(),
    source: 'FC2 / atelier3 Nevergrind Online 攻略 DB',
    publicRoot: 'public/fc2-assets/ngo',
    publicPathPrefix: '/fc2-assets/ngo',
    sourceImageCount: references.length,
    downloadedCount: images.length,
    skippedCount: skipped.length,
    errorCount: errors.length,
    images,
    skipped,
    errors,
  };

  await mkdir(dirname(MANIFEST_PATH), { recursive: true });
  await writeFile(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');

  console.log(
    JSON.stringify(
      {
        manifest: MANIFEST_PATH,
        sourceImageCount: manifest.sourceImageCount,
        downloaded: manifest.downloadedCount,
        skipped: manifest.skippedCount,
        errors: manifest.errorCount,
      },
      null,
      2,
    ),
  );

  if (errors.length > 0) process.exitCode = 1;
}

await main();

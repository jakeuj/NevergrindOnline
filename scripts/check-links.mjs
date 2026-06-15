import { existsSync } from 'node:fs';
import { readdir, readFile } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as cheerio from 'cheerio';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const DIST_ROOT = join(ROOT, 'dist');
const SITE_URL = 'https://ngo.jakeuj.com';
const SITE_ORIGIN = new URL(SITE_URL).origin;
const IGNORED_PROTOCOLS = new Set(['data:', 'javascript:', 'mailto:', 'tel:']);

async function filesWithExtension(dir, extension) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await filesWithExtension(path, extension)));
    } else if (entry.name.endsWith(extension)) {
      files.push(path);
    }
  }
  return files;
}

async function filesRecursive(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await filesRecursive(path)));
    } else {
      files.push(path);
    }
  }
  return files;
}

function rel(path) {
  return relative(ROOT, path).replaceAll('\\', '/');
}

function routeFromHtmlFile(file) {
  const distRel = relative(DIST_ROOT, file).replaceAll('\\', '/');
  if (distRel === 'index.html') return '/';
  if (distRel.endsWith('/index.html')) {
    return `/${dirname(distRel)}/`;
  }
  return `/${distRel}`;
}

function isLegacyRedirectRoute(route) {
  return route.startsWith('/nevergrind-online/');
}

function hashCandidates(hash) {
  if (!hash) return [];
  const raw = hash.slice(1);
  const candidates = new Set([raw]);
  try {
    candidates.add(decodeURIComponent(raw));
  } catch {
    // Keep the original candidate when malformed percent encoding appears.
  }
  return [...candidates];
}

function normalizeRoutePath(pathname) {
  if (pathname === '') return '/';
  if (pathname.endsWith('/')) return pathname;
  return `${pathname}/`;
}

function addHtmlIds(html, route, idsByRoute) {
  const $ = cheerio.load(html);
  const ids = new Set();
  $('[id]').each((_, element) => {
    const id = $(element).attr('id');
    if (id) ids.add(id);
  });
  $('a[name]').each((_, element) => {
    const name = $(element).attr('name');
    if (name) ids.add(name);
  });
  idsByRoute.set(route, ids);
}

function findLinkTarget(url, htmlRoutes, staticFiles) {
  const exactStaticPath = url.pathname;
  if (staticFiles.has(exactStaticPath)) {
    return { kind: 'static', path: exactStaticPath };
  }

  const routePath = normalizeRoutePath(url.pathname);
  if (htmlRoutes.has(routePath)) {
    return { kind: 'route', path: routePath };
  }

  if (htmlRoutes.has(url.pathname)) {
    return { kind: 'route', path: url.pathname };
  }

  return undefined;
}

function linkProblem({ file, route, href, message }) {
  return `${rel(file)} (${route}) -> ${href}: ${message}`;
}

if (!existsSync(DIST_ROOT)) {
  console.error('Missing dist/. Run SITE=https://ngo.jakeuj.com BASE_PATH=/ npm run build first.');
  process.exit(1);
}

const htmlFiles = await filesWithExtension(DIST_ROOT, '.html');
const htmlRoutes = new Map(htmlFiles.map((file) => [routeFromHtmlFile(file), file]));
const htmlRouteSet = new Set(htmlRoutes.keys());
const staticFiles = new Set(
  (await filesRecursive(DIST_ROOT)).map(
    (file) => `/${relative(DIST_ROOT, file).replaceAll('\\', '/')}`,
  ),
);
const idsByRoute = new Map();
const problems = [];
let checkedLinks = 0;

for (const file of htmlFiles) {
  const route = routeFromHtmlFile(file);
  const html = await readFile(file, 'utf8');
  addHtmlIds(html, route, idsByRoute);
}

for (const file of htmlFiles) {
  const route = routeFromHtmlFile(file);
  if (isLegacyRedirectRoute(route)) continue;

  const html = await readFile(file, 'utf8');
  const $ = cheerio.load(html);
  const pageUrl = new URL(route, SITE_URL);

  $('a[href]').each((_, element) => {
    const href = $(element).attr('href');
    if (!href || href.startsWith('#')) return;

    let url;
    try {
      url = new URL(href, pageUrl);
    } catch {
      problems.push(linkProblem({ file, route, href, message: 'invalid URL' }));
      return;
    }

    if (IGNORED_PROTOCOLS.has(url.protocol) || url.origin !== SITE_ORIGIN) return;
    checkedLinks += 1;

    const target = findLinkTarget(url, htmlRouteSet, staticFiles);
    if (!target) {
      problems.push(linkProblem({ file, route, href, message: `missing internal target ${url.pathname}` }));
      return;
    }

    if (target.kind !== 'route' || !url.hash) return;

    const targetIds = idsByRoute.get(target.path) ?? new Set();
    const hasHashTarget = hashCandidates(url.hash).some((candidate) => targetIds.has(candidate));
    if (!hasHashTarget) {
      problems.push(linkProblem({ file, route, href, message: `missing hash target ${url.hash}` }));
    }
  });
}

if (problems.length > 0) {
  for (const problem of problems.slice(0, 80)) {
    console.error(problem);
  }
  if (problems.length > 80) {
    console.error(`...and ${problems.length - 80} more internal link problems.`);
  }
  process.exit(1);
}

console.log(
  JSON.stringify(
    {
      htmlPages: htmlFiles.length,
      checkedLinks,
      status: 'ok',
    },
    null,
    2,
  ),
);

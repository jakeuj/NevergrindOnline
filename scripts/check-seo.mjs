import { existsSync } from 'node:fs';
import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const DOCS_ROOT = join(ROOT, 'src/content/docs');
const DIST_ROOT = join(ROOT, 'dist');
const PUBLIC_ROOT = join(ROOT, 'public');
const SITE_URL = 'https://ngo.jakeuj.com';
const SITEMAP_URL = `${SITE_URL}/sitemap-index.xml`;
const SITEMAP_ALIAS_URL = `${SITE_URL}/sitemap.xml`;
const DESCRIPTION_MIN = 70;
const DESCRIPTION_MAX = 150;

const BANNED_DESCRIPTION_PATTERNS = [
  { label: 'raw Markdown filename', pattern: /\b[\w./-]+\.md\b/i },
  { label: 'legacy nevergrind-online filename', pattern: /nevergrind-online-[\w-]+/i },
];

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

function fail(messages) {
  for (const message of messages) {
    console.error(message);
  }
  process.exit(1);
}

function rel(path) {
  return relative(ROOT, path).replaceAll('\\', '/');
}

function hasLine(text, line) {
  return text
    .split(/\r?\n/)
    .map((value) => value.trim())
    .includes(line);
}

function locsFromXml(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
}

function lastmodsFromXml(xml) {
  return [...xml.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((match) => match[1]);
}

function titleFromHtml(html) {
  return html.match(/<title>([^<]+)<\/title>/i)?.[1]?.trim();
}

function isCanonicalHtmlFile(file) {
  const fileRel = rel(file);
  return !fileRel.startsWith('dist/nevergrind-online/') && fileRel !== 'dist/404.html';
}

function hasDuplicatedPipeTitle(title) {
  const parts = title.split(/\s+\|\s+/);
  return parts.length === 2 && parts[0] === parts[1];
}

const problems = [];

const publicRobotsPath = join(PUBLIC_ROOT, 'robots.txt');
if (!existsSync(publicRobotsPath)) {
  problems.push('Missing public/robots.txt.');
} else {
  const robots = await readFile(publicRobotsPath, 'utf8');
  for (const line of ['User-agent: *', 'Allow: /', `Sitemap: ${SITEMAP_URL}`]) {
    if (!hasLine(robots, line)) {
      problems.push(`public/robots.txt is missing line: ${line}`);
    }
  }
}

const descriptionByText = new Map();
for (const file of await filesWithExtension(DOCS_ROOT, '.md')) {
  const raw = await readFile(file, 'utf8');
  const parsed = matter(raw);
  const description = parsed.data.description;
  const fileRel = rel(file);

  if (typeof description !== 'string') {
    problems.push(`${fileRel} has no string description.`);
    continue;
  }

  const length = [...description].length;
  if (length < DESCRIPTION_MIN || length > DESCRIPTION_MAX) {
    problems.push(
      `${fileRel} description is ${length} chars; expected ${DESCRIPTION_MIN}-${DESCRIPTION_MAX}.`,
    );
  }

  for (const { label, pattern } of BANNED_DESCRIPTION_PATTERNS) {
    if (pattern.test(description)) {
      problems.push(`${fileRel} description contains ${label}: ${description}`);
    }
  }

  const duplicate = descriptionByText.get(description);
  if (duplicate) {
    problems.push(`${fileRel} duplicates description from ${duplicate}.`);
  } else {
    descriptionByText.set(description, fileRel);
  }
}

if (!existsSync(DIST_ROOT)) {
  problems.push('Missing dist/. Run SITE=https://ngo.jakeuj.com BASE_PATH=/ npm run build first.');
} else {
  const distRobotsPath = join(DIST_ROOT, 'robots.txt');
  if (!existsSync(distRobotsPath)) {
    problems.push('Missing dist/robots.txt.');
  } else {
    const robots = await readFile(distRobotsPath, 'utf8');
    if (!hasLine(robots, `Sitemap: ${SITEMAP_URL}`)) {
      problems.push(`dist/robots.txt does not advertise ${SITEMAP_URL}.`);
    }
  }

  const sitemapFiles = (await readdir(DIST_ROOT))
    .filter((name) => /^sitemap.*\.xml$/.test(name))
    .map((name) => join(DIST_ROOT, name));

  if (sitemapFiles.length === 0) {
    problems.push('Missing dist sitemap XML files.');
  }

  const sitemapIndexPath = join(DIST_ROOT, 'sitemap-index.xml');
  const sitemapAliasPath = join(DIST_ROOT, 'sitemap.xml');
  if (!existsSync(sitemapIndexPath)) {
    problems.push('Missing dist/sitemap-index.xml.');
  }
  if (!existsSync(sitemapAliasPath)) {
    problems.push('Missing dist/sitemap.xml compatibility alias.');
  }
  if (existsSync(sitemapIndexPath) && existsSync(sitemapAliasPath)) {
    const [sitemapIndex, sitemapAlias] = await Promise.all([
      readFile(sitemapIndexPath, 'utf8'),
      readFile(sitemapAliasPath, 'utf8'),
    ]);
    if (sitemapAlias !== sitemapIndex) {
      problems.push('dist/sitemap.xml must match dist/sitemap-index.xml.');
    }
  }

  for (const file of sitemapFiles) {
    const xml = await readFile(file, 'utf8');
    if (/localhost|http:\/\/127\.0\.0\.1/i.test(xml)) {
      problems.push(`${rel(file)} contains a local URL.`);
    }
    if (/<loc>[^<]*\/nevergrind-online\//.test(xml)) {
      problems.push(`${rel(file)} includes legacy /nevergrind-online/ URLs.`);
    }
    for (const loc of locsFromXml(xml)) {
      if (!loc.startsWith(`${SITE_URL}/`)) {
        problems.push(`${rel(file)} has non-canonical loc: ${loc}`);
      }
    }
    if (xml.includes('<urlset')) {
      const locs = locsFromXml(xml);
      const lastmods = lastmodsFromXml(xml);
      if (lastmods.length !== locs.length) {
        problems.push(`${rel(file)} must include one <lastmod> for each sitemap URL.`);
      }
      for (const lastmod of lastmods) {
        if (Number.isNaN(Date.parse(lastmod))) {
          problems.push(`${rel(file)} has invalid lastmod: ${lastmod}`);
        }
      }
    }
  }

  const htmlFiles = await filesWithExtension(DIST_ROOT, '.html');
  for (const file of htmlFiles) {
    const html = await readFile(file, 'utf8');
    if (/http:\/\/localhost:4321|http:\/\/127\.0\.0\.1/i.test(html)) {
      problems.push(`${rel(file)} contains a local URL.`);
    }

    if (isCanonicalHtmlFile(file)) {
      const title = titleFromHtml(html);
      if (!title) {
        problems.push(`${rel(file)} is missing a <title>.`);
      } else if (hasDuplicatedPipeTitle(title)) {
        problems.push(`${rel(file)} has duplicated title text: ${title}`);
      }
    }
  }

  for (const page of ['index.html', 'guide/index.html', 'fc2-rune-craft-reference/index.html']) {
    const file = join(DIST_ROOT, page);
    if (!existsSync(file)) {
      problems.push(`Missing SEO smoke-test page: dist/${page}`);
      continue;
    }
    const html = await readFile(file, 'utf8');
    if (!html.includes('type="application/ld+json"')) {
      problems.push(`dist/${page} is missing JSON-LD.`);
    }
    if (!html.includes('"@type":"WebPage"')) {
      problems.push(`dist/${page} is missing WebPage JSON-LD.`);
    }
    if (page !== 'index.html' && !html.includes('"@type":"BreadcrumbList"')) {
      problems.push(`dist/${page} is missing BreadcrumbList JSON-LD.`);
    }
  }

  const legacyGuidePath = join(DIST_ROOT, 'nevergrind-online/guide/index.html');
  if (existsSync(legacyGuidePath)) {
    const legacyGuide = await readFile(legacyGuidePath, 'utf8');
    if (!/<meta name="robots" content="noindex"/.test(legacyGuide)) {
      problems.push('Legacy /nevergrind-online/guide/ page is missing noindex.');
    }
    if (!legacyGuide.includes('data-pagefind-ignore')) {
      problems.push('Legacy /nevergrind-online/guide/ page is not excluded from Pagefind.');
    }
    if (!/<link rel="canonical" href="\/guide\/"/.test(legacyGuide)) {
      problems.push('Legacy /nevergrind-online/guide/ page canonical does not point to /guide/.');
    }
  }
}

if (problems.length > 0) {
  fail(problems);
}

console.log(
  JSON.stringify(
    {
      descriptions: descriptionByText.size,
      site: SITE_URL,
      sitemap: SITEMAP_URL,
      sitemapAlias: SITEMAP_ALIAS_URL,
      sitemapLastmod: 'ok',
      status: 'ok',
    },
    null,
    2,
  ),
);

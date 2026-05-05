import { readdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const DOCS_ROOT = join(ROOT, 'src/content/docs');
const NEVERGRIND_DOCS = DOCS_ROOT;
const MANIFEST_PATH = join(ROOT, 'src/data/fc2-source-manifest.json');
const TOPIC_MAP_PATH = join(ROOT, 'src/data/fc2-topic-map.json');
const EXPECTED_COUNT = 106;
const REQUIRED_FRONTMATTER = ['title', 'description', 'sourcePages', 'reviewedAt', 'sourceLastModified', 'status'];

async function markdownFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await markdownFiles(path)));
    } else if (entry.name.endsWith('.md')) {
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

const problems = [];

if (!existsSync(MANIFEST_PATH)) {
  problems.push(`Missing source manifest: ${MANIFEST_PATH}`);
}
if (!existsSync(TOPIC_MAP_PATH)) {
  problems.push(`Missing FC2 topic map: ${TOPIC_MAP_PATH}`);
}
if (problems.length > 0) fail(problems);

const manifest = JSON.parse(await readFile(MANIFEST_PATH, 'utf8'));
const topicMap = JSON.parse(await readFile(TOPIC_MAP_PATH, 'utf8'));

if (manifest.count !== EXPECTED_COUNT) {
  problems.push(`FC2 manifest count is ${manifest.count}, expected ${EXPECTED_COUNT}.`);
}
if (manifest.errors?.length) {
  problems.push(`FC2 manifest contains ${manifest.errors.length} crawl error(s).`);
}

const docs = await markdownFiles(DOCS_ROOT);
const docByOutputFile = new Map();
const sourceUrlsInFrontmatter = new Map();

for (const doc of docs) {
  const raw = await readFile(doc, 'utf8');
  const parsed = matter(raw);
  for (const key of REQUIRED_FRONTMATTER) {
    if (!(key in parsed.data)) {
      problems.push(`${doc} is missing frontmatter field "${key}".`);
    }
  }

  if (/<\/?(tldr|note|tip|warning|code-block)\b/i.test(parsed.content)) {
    problems.push(`${doc} still contains Writerside-only XML tags.`);
  }
  if (/\]\([^)\s]+\.md(#[^)]+)?\)/.test(parsed.content)) {
    problems.push(`${doc} still links to a raw .md path.`);
  }

  if (doc.startsWith(NEVERGRIND_DOCS)) {
    docByOutputFile.set(doc.split('/').pop(), doc);
  }

  for (const sourcePage of parsed.data.sourcePages ?? []) {
    if (sourcePage?.url) {
      if (!sourceUrlsInFrontmatter.has(sourcePage.url)) {
        sourceUrlsInFrontmatter.set(sourcePage.url, []);
      }
      sourceUrlsInFrontmatter.get(sourcePage.url).push(doc);
    }
  }
}

const mappedUrls = new Set(topicMap.pages.map((page) => page.url));
for (const page of manifest.pages) {
  if (!mappedUrls.has(page.url)) {
    problems.push(`Missing topic-map entry for ${page.file} (${page.url}).`);
  }
  if (!sourceUrlsInFrontmatter.has(page.url)) {
    problems.push(`No generated doc frontmatter lists ${page.file} (${page.url}).`);
  }
}

for (const page of topicMap.pages) {
  if (!page.targets?.length) {
    problems.push(`Topic map page has no targets: ${page.file}`);
    continue;
  }
  for (const target of page.targets) {
    if (!docByOutputFile.has(target.outputFile)) {
      problems.push(`Mapped target does not exist for ${page.file}: ${target.outputFile}`);
    }
  }
}

if (problems.length > 0) {
  fail(problems);
}

console.log(
  JSON.stringify(
    {
      docs: docs.length,
      nevergrindDocs: docByOutputFile.size,
      fc2Pages: manifest.pages.length,
      mappedFc2Pages: mappedUrls.size,
      status: 'ok',
    },
    null,
    2,
  ),
);

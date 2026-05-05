import { copyFile, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { basename, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const WRITERSIDE_ROOT = '/Users/jakeuj/WritersideProjects/writerside';
const WRITERSIDE_TOPICS = join(WRITERSIDE_ROOT, 'Writerside/topics');
const WRITERSIDE_IMAGES = join(WRITERSIDE_ROOT, 'Writerside/images');
const HI_TREE = join(WRITERSIDE_ROOT, 'Writerside/hi.tree');
const OUTPUT_DOCS = join(ROOT, 'src/content/docs/nevergrind-online');
const DATA_DIR = join(ROOT, 'src/data');
const SOURCE_INDEX = join(WRITERSIDE_TOPICS, 'nevergrind-online-fc2-link-index.md');
const MANIFEST_PATH = join(DATA_DIR, 'fc2-source-manifest.json');
const TOPIC_MAP_PATH = join(DATA_DIR, 'fc2-topic-map.json');
const TODAY = '2026-05-05';

const FC2_BASE = 'https://atelier3.web.fc2.com/ngo/';

function stripPrefix(file) {
  return file.replace(/^nevergrind-online-/, '').replace(/\.md$/, '');
}

function outputFileForSource(file) {
  return `${stripPrefix(file)}.md`;
}

function slugForSource(file) {
  return `nevergrind-online/${stripPrefix(file)}`;
}

function escapeYaml(value) {
  return String(value).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function plainText(value) {
  return value
    .replace(/<[^>]+>/g, '')
    .replace(/\[[^\]]+\]\(([^)]+)\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseReviewedAt(markdown) {
  return markdown.match(/檢視日期：`?(\d{4}-\d{2}-\d{2})`?/)?.[1] ?? TODAY;
}

function parseH1(markdown, fallback) {
  return markdown.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? fallback;
}

function describe(markdown, title) {
  const body = markdown
    .replace(/^#\s+.+$/m, '')
    .replace(/^- .+$/gm, '')
    .split(/\n{2,}/)
    .map((block) => plainText(block))
    .find((block) => block.length > 24);
  return (body ?? `${title}的台灣繁體中文整理版。`).slice(0, 180);
}

function convertAdmonition(markdown, tag, label) {
  const pattern = new RegExp(`<${tag}>\\s*([\\s\\S]*?)\\s*<\\/${tag}>`, 'gi');
  return markdown.replace(pattern, (_, inner) => {
    const lines = cleanInlineHtml(inner)
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);
    return [`> **${label}**`, ...lines.map((line) => `> ${line}`)].join('\n');
  });
}

function cleanInlineHtml(markdown) {
  return markdown
    .replace(/<code>([\s\S]*?)<\/code>/gi, (_, code) => `\`${code.trim()}\``)
    .replace(/<a\s+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, (_, href, text) => `[${plainText(text)}](${href})`)
    .replace(/<\/?p>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function convertCodeBlocks(markdown) {
  return markdown.replace(
    /<code-block\s+lang="([^"]+)"[^>]*><!\[CDATA\[([\s\S]*?)\]\]><\/code-block>/gi,
    (_, lang, code) => `\n\`\`\`${lang === 'bash' ? 'bash' : 'text'}\n${code.trim()}\n\`\`\`\n`,
  );
}

function convertLinks(markdown, linkMap) {
  let converted = markdown;

  for (const [source, output] of linkMap.entries()) {
    const sourceEscaped = source.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const href = `./${output.replace(/\.md$/, '')}/`;
    converted = converted.replace(new RegExp(`\\]\\(${sourceEscaped}(#[^)]+)?\\)`, 'g'), (match, hash = '') =>
      match.replace(`(${source}${hash})`, `(${href}${hash})`),
    );
  }

  converted = converted.replace(/\]\((https?:\/\/[^)]+)\)\{[^}\n]+\}/g, ']($1)');
  converted = converted.replace(/\]\(([^)]+)\)\{ignore-vars="true"\}/g, ']($1)');
  return converted;
}

function convertHeadings(markdown) {
  return markdown.replace(/^(#{2,6}\s+.+?)\s+\{#([^}]+)\}\s*$/gm, '<a id="$2"></a>\n\n$1');
}

function blockKind(line) {
  if (/^```/.test(line)) return 'fence';
  if (/^#{2,6}\s+/.test(line)) return 'heading';
  if (/^\|.*\|\s*$/.test(line)) return 'table';
  if (/^\s*(?:[-*+]\s+|\d+\.\s+)/.test(line)) return 'list';
  if (/^>\s?/.test(line)) return 'quote';
  return 'other';
}

function normalizeBlockSpacing(markdown) {
  const lines = markdown.split('\n');
  const output = [];
  let inFence = false;

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];

    if (/^```/.test(line)) {
      if (output.at(-1)?.trim() !== '' && !inFence) output.push('');
      output.push(line);
      inFence = !inFence;
      if (!inFence && lines[index + 1]?.trim()) output.push('');
      continue;
    }

    if (inFence || line.trim() === '') {
      output.push(line);
      continue;
    }

    const kind = blockKind(line);
    const previous = output.at(-1) ?? '';
    const previousKind = blockKind(previous);
    if (
      ['heading', 'table', 'list'].includes(kind) &&
      previous.trim() !== '' &&
      !(kind === 'table' && previousKind === 'table') &&
      !(kind === 'list' && previousKind === 'list')
    ) {
      output.push('');
    }

    output.push(line);

    const next = lines[index + 1] ?? '';
    const nextKind = blockKind(next);
    if (
      ['heading', 'table', 'list'].includes(kind) &&
      next.trim() !== '' &&
      !(kind === 'table' && nextKind === 'table') &&
      !(kind === 'list' && nextKind === 'list')
    ) {
      output.push('');
    }
  }

  return output.join('\n').replace(/\n{3,}/g, '\n\n');
}

async function copyImages(markdown) {
  const imagePattern = /!\[([^\]]*)\]\(([^)]+)\)(\{[^}\n]+\})?/g;
  const copied = new Set();

  let converted = markdown;
  for (const match of markdown.matchAll(imagePattern)) {
    const [, alt, rawPath] = match;
    if (/^https?:\/\//.test(rawPath)) continue;
    const imageName = basename(rawPath);
    const source = join(WRITERSIDE_IMAGES, imageName);
    const destination = join(OUTPUT_DOCS, imageName);
    if (existsSync(source) && !copied.has(imageName)) {
      await copyFile(source, destination);
      copied.add(imageName);
    }
    converted = converted.replace(match[0], `![${alt}](./${imageName})`);
  }

  return converted;
}

function normalizeMarkdown(markdown, linkMap) {
  let converted = markdown.replace(/\r\n/g, '\n');
  converted = convertCodeBlocks(converted);
  converted = convertAdmonition(converted, 'tldr', '快速重點');
  converted = convertAdmonition(converted, 'note', '提醒');
  converted = convertAdmonition(converted, 'tip', '提示');
  converted = convertAdmonition(converted, 'warning', '注意');
  converted = cleanInlineHtml(converted);
  converted = convertLinks(converted, linkMap);
  converted = convertHeadings(converted);
  converted = converted.replace(/^#\s+.+\n+/, '');
  converted = normalizeBlockSpacing(converted);
  return converted.trim();
}

async function loadManifest() {
  if (!existsSync(MANIFEST_PATH)) return new Map();
  const manifest = JSON.parse(await readFile(MANIFEST_PATH, 'utf8'));
  return new Map(manifest.pages.map((page) => [page.url, page]));
}

async function parseFc2TopicMap(linkMap, manifestByUrl) {
  const index = await readFile(SOURCE_INDEX, 'utf8');
  const pages = [];

  for (const line of index.split('\n')) {
    if (!line.startsWith('|[`')) continue;
    const file = line.match(/\[`([^`]+\.html)`\]\((https:\/\/atelier3\.web\.fc2\.com\/ngo\/[^)]+\.html)\)/);
    if (!file) continue;

    const cells = line.split('|').map((cell) => cell.trim());
    const targets = (cells[3] ?? '')
      .replace(/`/g, '')
      .split('/')
      .map((target) => target.trim())
      .filter((target) => target.endsWith('.md'))
      .map((target) => (target.startsWith('nevergrind-online-') ? target : `nevergrind-online-${target}`))
      .filter((target) => linkMap.has(target))
      .map((target) => ({
        sourceTopic: target,
        outputFile: linkMap.get(target),
        slug: slugForSource(target),
      }));

    const manifest = manifestByUrl.get(file[2]);
    pages.push({
      file: file[1],
      url: file[2],
      title: manifest?.title || file[1],
      type: cells[2] ?? '',
      lastModified: manifest?.lastModified || '',
      targets,
    });
  }

  return {
    generatedAt: new Date().toISOString(),
    source: 'FC2 / atelier3 Nevergrind Online 攻略 DB',
    pages,
  };
}

function sourcePagesForTopic(topicMap, outputFile) {
  return topicMap.pages
    .filter((page) => page.targets.some((target) => target.outputFile === outputFile))
    .map((page) => ({
      file: page.file,
      title: page.title || page.file,
      url: page.url,
      lastModified: page.lastModified || undefined,
    }));
}

function latestModified(sourcePages) {
  const dated = sourcePages
    .map((page) => page.lastModified)
    .filter(Boolean)
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
  return dated[0] ?? 'N/A';
}

function frontmatterFor({ title, description, reviewedAt, sourcePages }) {
  const lines = [
    '---',
    `title: "${escapeYaml(title)}"`,
    `description: "${escapeYaml(description)}"`,
  ];

  if (sourcePages.length === 0) {
    lines.push('sourcePages: []');
  } else {
    lines.push('sourcePages:');
    for (const sourcePage of sourcePages) {
      lines.push(`  - file: "${escapeYaml(sourcePage.file)}"`);
      lines.push(`    title: "${escapeYaml(sourcePage.title)}"`);
      lines.push(`    url: "${escapeYaml(sourcePage.url)}"`);
      if (sourcePage.lastModified) {
        lines.push(`    lastModified: "${escapeYaml(sourcePage.lastModified)}"`);
      }
    }
  }

  lines.push(`reviewedAt: "${reviewedAt}"`);
  lines.push(`sourceLastModified: "${escapeYaml(latestModified(sourcePages))}"`);
  lines.push('status: "整理改寫"');
  lines.push('---');
  return lines.join('\n');
}

function sourceReminder() {
  return [
    '---',
    '',
    '> **版本提醒**',
    '> 本頁是玩家攻略與社群資料的繁中整理版；技能、裝備、掉落、配方與版本敏感數值，請以目前遊戲內 tooltip / UI 與官方公告為準。',
  ].join('\n');
}

async function main() {
  const files = (await readdir(WRITERSIDE_TOPICS)).filter((file) => /^nevergrind-online-.+\.md$/.test(file));
  const linkMap = new Map(files.map((file) => [file, outputFileForSource(file)]));
  const manifestByUrl = await loadManifest();
  const topicMap = await parseFc2TopicMap(linkMap, manifestByUrl);

  await rm(OUTPUT_DOCS, { recursive: true, force: true });
  await mkdir(OUTPUT_DOCS, { recursive: true });
  await mkdir(DATA_DIR, { recursive: true });

  const hiTree = await readFile(HI_TREE, 'utf8');
  const ordered = [...hiTree.matchAll(/topic="(nevergrind-online-[^"]+\.md)"/g)]
    .map((match) => match[1])
    .filter((file, index, all) => all.indexOf(file) === index && linkMap.has(file));
  const remaining = files.filter((file) => !ordered.includes(file)).sort();

  for (const file of [...ordered, ...remaining]) {
    const sourcePath = join(WRITERSIDE_TOPICS, file);
    const outputFile = linkMap.get(file);
    const outputPath = join(OUTPUT_DOCS, outputFile);
    const raw = await readFile(sourcePath, 'utf8');
    const title = parseH1(raw, file.replace(/\.md$/, ''));
    const reviewedAt = parseReviewedAt(raw);
    const description = describe(raw, title);
    const sourcePages = sourcePagesForTopic(topicMap, outputFile);
    const body = await copyImages(normalizeMarkdown(raw, linkMap));

    await mkdir(dirname(outputPath), { recursive: true });
    await writeFile(
      outputPath,
      `${frontmatterFor({ title, description, reviewedAt, sourcePages })}\n\n${body}\n\n${sourceReminder()}\n`,
      'utf8',
    );
  }

  await writeFile(TOPIC_MAP_PATH, `${JSON.stringify(topicMap, null, 2)}\n`, 'utf8');
  console.log(
    JSON.stringify(
      {
        outputDocs: OUTPUT_DOCS,
        topics: ordered.length + remaining.length,
        fc2Pages: topicMap.pages.length,
        topicMap: TOPIC_MAP_PATH,
      },
      null,
      2,
    ),
  );
}

await main();

import { readdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { EXPECTED_FC2_COUNT } from './fc2-common.mjs';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const DOCS_ROOT = join(ROOT, 'src/content/docs');
const NEVERGRIND_DOCS = DOCS_ROOT;
const MANIFEST_PATH = join(ROOT, 'src/data/fc2-source-manifest.json');
const TOPIC_MAP_PATH = join(ROOT, 'src/data/fc2-topic-map.json');

const PLACEHOLDER_PATTERNS = [
  /FC2\s*(玩家評語|流程重點|推薦重點|注意點)/,
  /原文屬玩家 meta snapshot/,
  /這段主要在談/,
  /自動摘要占位/,
  /可選課程/,
  /所有課程/,
  /職業業/,
  /班級/,
  /班級獎金/,
  /職業獎金/,
  /性別獎金/,
  /種族獎金/,
  /placeholder/i,
  /[⟦⟧⧦⧧⧟]|__NGO|__N|GON\d/,
];

const FC2_TERMINOLOGY_PATTERNS = [
  /Dexterity\|Dexterity/,
  /物理理/,
  /特殊怪物理/,
  /毒素物理抗性/,
  /毒素物抗性/,
  /物理品名稱/,
  /知恵/,
  /カリスマ|ｶﾘｽﾏ/,
  /老闆總結/,
  /正常為|惡夢為/,
  /Normal的|Nightmare的|Nightmare中|Hell為/,
  /《惡夢》和《Hell》/,
  /普通模式下|上級和Mastery/,
  /惡夢減少|惡夢最高|Hell減少|Hell最高/,
  /夢魘/,
  /Unique等級|普通Unique|UniqueDrop/,
  /\bTalent\b/,
  /城鎮左側的欄|自然能力/,
  /屬性抗性Rune/,
  /旋轉地[城牢]|地下城|地牢|副本|绕行|绕过|繞行|繞過去/,
  /fc2-dpscalc-(輸入表格|計算結果)|輸入博物館值|從裝備中選擇/,
  /\|Strength\|Stamina\|Agility\|Dexterity\|Intelligence\|Wisdom\|Charisma\|/,
  /\b(?:Cleric|Enchanter|Monk|Shadow Knight|Shaman|Templar|Warlock|Warrior|Wizard|Crusader|Rogue|Ranger|Bard|Druid)、/,
  /\b(?:Cleric|Enchanter|Monk|Shadow Knight|Shaman|Templar|Warlock|Warrior|Wizard|Crusader|Rogue|Ranger|Bard|Druid)\s+(?:Skill|Talent|才能)/,
  /\|(?:Warrior|Crusader|Shadow Knight|Monk|Rogue|Ranger|Bard|Druid|Cleric|Shaman|Warlock|Enchanter|Templar|Wizard)\|[+|]/,
  /單手套|雙手套|右手套|左手套|副手套/,
  /スペルパワー|ディフェンス|オフェンス|ブロック率|受流し|反撃/,
  /攻撃|連続|単体では|状態異常の|組み合わさる|減少効果|全体攻撃|硬くなる/,
];

function contentWithoutSourceTitleRows(content) {
  return content
    .split('\n')
    .filter((line) => !/^\|\[[^\]]+\.html\]\([^)]*\)\|.*Nevergrind Online 攻略DB\|/.test(line))
    .join('\n');
}

function faqSectionHasAnswers(content) {
  const faqStart = content.indexOf('<a id="fc2-faq"></a>');
  if (faqStart < 0) return true;

  const afterFaq = content.slice(faqStart);
  const nextPageStart = afterFaq.indexOf('\n<a id="fc2-gambling"></a>');
  const faqSection = nextPageStart >= 0 ? afterFaq.slice(0, nextPageStart) : afterFaq;
  const answerLines = faqSection
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => {
      if (!line) return false;
      if (line.startsWith('<a id=')) return false;
      if (line.startsWith('#')) return false;
      if (line.startsWith('- FC2 file')) return false;
      if (line.startsWith('- 原站 Last-Modified')) return false;
      if (line.startsWith('- ')) return false;
      return true;
    });

  return answerLines.length >= 15;
}

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
  for (const message of messages) console.error(message);
  process.exit(1);
}

const problems = [];

if (!existsSync(MANIFEST_PATH)) problems.push(`Missing FC2 manifest: ${MANIFEST_PATH}`);
if (!existsSync(TOPIC_MAP_PATH)) problems.push(`Missing FC2 topic map: ${TOPIC_MAP_PATH}`);
if (problems.length > 0) fail(problems);

const manifest = JSON.parse(await readFile(MANIFEST_PATH, 'utf8'));
const topicMap = JSON.parse(await readFile(TOPIC_MAP_PATH, 'utf8'));
const docs = await markdownFiles(NEVERGRIND_DOCS);
const docsBySourceUrl = new Map();
const docContentByPath = new Map();

if (manifest.count !== EXPECTED_FC2_COUNT) {
  problems.push(`FC2 manifest count is ${manifest.count}, expected ${EXPECTED_FC2_COUNT}.`);
}
if (manifest.errors?.length) {
  problems.push(`FC2 manifest contains ${manifest.errors.length} crawl error(s).`);
}

for (const doc of docs) {
  const raw = await readFile(doc, 'utf8');
  const parsed = matter(raw);
  docContentByPath.set(doc, parsed.content);
  const qualityContent = contentWithoutSourceTitleRows(parsed.content);

  for (const pattern of PLACEHOLDER_PATTERNS) {
    if (pattern.test(qualityContent)) {
      problems.push(`${doc} still contains generated placeholder text matching ${pattern}.`);
    }
  }

  if (doc.startsWith(NEVERGRIND_DOCS) && doc.split('/').pop().startsWith('fc2-')) {
    for (const pattern of FC2_TERMINOLOGY_PATTERNS) {
      if (pattern.test(qualityContent)) {
        problems.push(`${doc} still contains FC2 terminology drift matching ${pattern}.`);
      }
    }

    const kanaMatches = qualityContent.match(/[\u3040-\u30ffー]{8,}/g) ?? [];
    if (kanaMatches.length > 12) {
      problems.push(`${doc} still appears to contain large untranslated Japanese fragments: ${kanaMatches.slice(0, 8).join(', ')}`);
    }

    if (doc.endsWith('fc2-general-reference.md') && !faqSectionHasAnswers(qualityContent)) {
      problems.push(`${doc} appears to have a heading-only FC2 FAQ section without rendered answers.`);
    }
  }

  for (const sourcePage of parsed.data.sourcePages ?? []) {
    if (!sourcePage?.url) continue;
    if (!docsBySourceUrl.has(sourcePage.url)) docsBySourceUrl.set(sourcePage.url, []);
    docsBySourceUrl.get(sourcePage.url).push(doc);
  }
}

const mappedUrls = new Set(topicMap.pages.map((page) => page.url));
for (const page of manifest.pages) {
  if (!mappedUrls.has(page.url)) {
    problems.push(`Missing topic-map entry for ${page.file} (${page.url}).`);
  }

  const sourceDocs = docsBySourceUrl.get(page.url) ?? [];
  if (sourceDocs.length === 0) {
    problems.push(`No Nevergrind doc frontmatter lists ${page.file} (${page.url}).`);
    continue;
  }

  const renderedSomewhere = sourceDocs.some((doc) => {
    const content = docContentByPath.get(doc) ?? '';
    return content.includes(page.file) || content.includes(page.url);
  });
  if (!renderedSomewhere) {
    problems.push(`No rendered section or source row appears for ${page.file} (${page.url}).`);
  }
}

for (const page of topicMap.pages) {
  if (!page.targets?.length) {
    problems.push(`Topic map page has no targets: ${page.file}`);
  }
}

if (problems.length > 0) fail(problems);

console.log(
  JSON.stringify(
    {
      nevergrindDocs: docs.length,
      fc2Pages: manifest.pages.length,
      mappedFc2Pages: mappedUrls.size,
      placeholderPatterns: PLACEHOLDER_PATTERNS.length,
      status: 'ok',
    },
    null,
    2,
  ),
);

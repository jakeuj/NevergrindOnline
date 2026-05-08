import { readdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { basename, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { EXPECTED_FC2_COUNT } from './fc2-common.mjs';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const DOCS_ROOT = join(ROOT, 'src/content/docs');
const NEVERGRIND_DOCS = DOCS_ROOT;
const MANIFEST_PATH = join(ROOT, 'src/data/fc2-source-manifest.json');
const IMAGE_MANIFEST_PATH = join(ROOT, 'src/data/fc2-image-manifest.json');
const TOPIC_MAP_PATH = join(ROOT, 'src/data/fc2-topic-map.json');
const PUBLIC_ROOT = join(ROOT, 'public');
const IMAGE_REF_PATTERN = /!\[[^\]]*]\((\/fc2-assets\/ngo\/[^)\s]+)\)/g;
const TRACKING_IMAGE_PATTERN = /counter_img|media\.fc2\.com/i;

const PLACEHOLDER_PATTERNS = [
  /\[圖片[:：]|\[圖[:：]/,
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
  /In particular, Mastery|effect: skill name|written skill will be automatically activated|另一個衣缽/,
  /《惡夢》和《Hell》/,
  /普通模式下|上級和Mastery/,
  /惡夢減少|惡夢最高|Hell減少|Hell最高/,
  /夢魘/,
  /Unique等級|普通Unique|UniqueDrop|Unique\s+(?:裝備|\d+\s*個)|Rare\s+\d+\s*個|Legendary\s+裝備/,
  /\bTalent\b/,
  /城鎮左側的欄|自然能力/,
  /屬性抗性Rune/,
  /符號/,
  /標誌\/武器\s*DPS\s*計算器|確定獲得標誌|Gra\s*標誌|符號詞/,
  /(?:職業|性別|種族|物理)紅利/,
  /螳螂蝦|薩科|江湖之冠|埴輪|Haniwa舒莫奇/,
  /金金屬效率|金屬效率/,
  /帶回家的物品|工藝相關的項目|魔法等級也可能出現|稀有魔法鈍器（口袋、飛行手套）|地函魔法鈍器|龍斗篷魔鈍器|稀有物理風暴斗篷|棍棒打死|零件帶回家/,
  /控球天賦|左手斗篷|正確的斗篷|贏得天賦|Zimri's 智慧/,
  /禮[物品]|隱密至尊|連結裝備|作為連結|6\s*個目標/,
  /獨奏|單人轉|布朗|枠|次要技術維斯塔|維斯塔下幔|Vice Maneuve|副手樹/,
  /空手套|恢復傷害|譴責之樹|高級譴責|快速33|熱忱決心的概括|增幅時間/,
  /反亡靈|readore|稀有抽獎|鑄就熱忱|收集目標的DPS|裝甲職業|發射神光|元帥手套罪孽/,
  /\|(?:画像|圖片)\|部位\|Lv\|名稱\|/,
  /^\|(?:Goliath|Blood Knight|Protector|Falcon|Vestal)\|\|(?:Rupture|Shadow Break|Zealous Slam|Hurricane Kicks|Circle of Prayer)/m,
  /旋轉地[城牢]|地下城|地牢|副本|绕行|绕过|繞行|繞過去/,
  /fc2-dpscalc-(輸入表格|計算結果)|輸入博物館值|從裝備中選擇/,
  /\|Strength\|Stamina\|Agility\|Dexterity\|Intelligence\|Wisdom\|Charisma\|/,
  /\b(?:Cleric|Enchanter|Monk|Shadow Knight|Shaman|Templar|Warlock|Warrior|Wizard|Crusader|Rogue|Ranger|Bard|Druid)、/,
  /\b(?:Cleric|Enchanter|Monk|Shadow Knight|Shaman|Templar|Warlock|Warrior|Wizard|Crusader|Rogue|Ranger|Bard|Druid)\s+(?:Skill|Talent|才能)/,
  /\|(?:Warrior|Crusader|Shadow Knight|Monk|Rogue|Ranger|Bard|Druid|Cleric|Shaman|Warlock|Enchanter|Templar|Wizard)\|[+|]/,
  /單手套|雙手套|右手套|左手套|副手套/,
  /スペルパワー|ディフェンス|オフェンス|ブロック率|受流し|反撃/,
  /攻撃|連続|単体では|状態異常の|組み合わさる|減少効果|全体攻撃|硬くなる/,
  /隨機属性|沈黙|被弾時/,
];

const FC2_CRUSADER_TERMINOLOGY_PATTERNS = [
  /印刷能力|完全忘記了|祝福悍馬|Blessed Hummer|陸地城堡|輔助魔法師/,
  /艾達里昂|艾達里安|亞薩夫|雷德羅|騙子之冠|斯皮納爾茲的守夜者/,
  /水晶海的傳奇蒼穹法杖|透特心靈鏈接法杖|死亡引導者護腕|巨大風暴腰帶/,
  /奉獻閃爍|轉聖化|涼爽|康復|熱心大滿貫|狂熱猛擊|聖域印記/,
];

const FC2_ENCHANTER_TERMINOLOGY_PATTERNS = [
  /技能急速|防止技能急速|全黨|體力職業|黨員|上相刀|砍伐|卓越的色移|迷惑/,
  /高級增強|高級寧靜印記|無法合計|誘惑等級|Arcane降低|掉落率|下降幅度增加/,
  /輔助魔法師|低級閃光|心靈閃電戰|奧術墜落|火力魔法師|進階色移|超級靜止力場/,
  /保護臂|諾伊克移植物|稀有抽籤|財團拖鞋|增幅會先用完|涼爽|酷/,
  /\bEnthral\b|Senkou|身體活動|靜止力場凍結你的敵人/,
];

const FC2_WARRIOR_TERMINOLOGY_PATTERNS = [
  /坦克工作|飛行斗篷|輔助魔法師|服務員|狂亂|瘋狂|破裂|旋風斬|雙擲|狂暴順劈/,
  /Mastery：泰坦|M擲骰|跳躍攻擊不值得按鍵|自然之樹|歌利亞|右邊斗篷|科雷利亞精金槌/,
  /格拉標誌|稀有抽籤|Spinalzz的Vigil|奧莉薇亞的忠誠之鍊|暴君法則|德米特里姆的弩砲/,
  /向京|佔有天賦|指揮手指|例外設定|柵欄徽章|雷德羅|死亡之環是一種強力武器/,
  /基本上，反覆擊中|添加破裂|狂怒劈砍|由於傷害低於破裂/,
];

const FC2_CLASS_BUILD_INDEX_TERMINOLOGY_PATTERNS = [
  /拳打造型|瘋狂的角色|真正的無人機設備|輔助魔法師|服務員/,
  /雷德羅|稀有抽籤|Lair Dro|向京|分散斗篷|附身天賦/,
  /防護臂|保護臂|亡靈土堡|法爾贊(?:·天使)?|江湖騙子紋章|黑天鵝樂團/,
  /毒液箭|高級閃電和Mastery|Mastery：毀滅|突擊等角度/,
];

const FC2_RECIPE_TERMINOLOGY_PATTERNS = [
  /(?:^|\n)## 食譜/,
  /掉落天賦|所有技能|法術強度魔法|投擲者技能強化|飛衣斬|飛喉斬|斗篷斬擊/,
  /固有能力|總抗性|使用速度提升|命中率稀有掉落率|佔有天賦|敵敵抗性|對職業強化傷害/,
  /金華|慶典焰|滴管天生能力|運輸船技能增強|伤害增强|射箭职业天赋|闪现抗性|闪现伤害/,
  /毒素素|魔法Damage|Skill強化|Mana回復|Health回復|頁內連結/,
  /單手鈍器\(物\)|單手鈍器\(魔\)|雙手鈍器\(物\)|雙手鈍器\(魔\)|### 胸甲/,
];

const FC2_MYTHICAL_TERMINOLOGY_PATTERNS = [
  /(?:^|\n)## Craft/,
  /文文組|將將|基體|請求語句|請求碼|Socket中插入程式碼|創建Socket/,
  /創建的item|不能作為附錄|用於製作的印記|魔法師的影響|素体準拠|#### 乙醚/,
];

const FC2_GAMBLING_TERMINOLOGY_PATTERNS = [
  /進入城堡或進入新區域|符咒、頭部和戒律|魅力、千行和戒律/,
  /配件（例外\/精英）|護身符、帽子、戒律|項宗|薩彥萬花筒|黑天鵝樂隊|天之翼/,
  /扭蛋特別暗|非常有用的物品|EL皮革胸甲|EL板甲斗篷|尤里武器|恐怖球/,
  /購買 Leger|水晶海的蒼穹法杖|透特靈聯法杖/,
];

const FC2_CHART_TERMINOLOGY_PATTERNS = [
  /吟游诗人|总抵抗力|大大增加生命值|请注意|敌人的等级|精英装备|围绕该区域运行/,
  /神社騎士|薩摩男|隨從法師|魔法師有增加毒素抗性/,
  /敵方暗影騎士使用的伤害之触|伤害之触|抗流血能力/,
  /寄生、接收設備|瞄準賭博領域的精英地位|賭博配件|有關更多信息|購買成本/,
  /讓我們用精神來對抗元素吧/,
  /屬性抗性降低到|元素抗性降低到/,
];

const FC2_UNIMON_TERMINOLOGY_PATTERNS = [
  /苦工怪物|飛行員|加強地位\/抵抗力|前往城堡途中|指定角色|第一個mod|第二個和第三個是mod/,
  /保證掉落\s*[12]\s*件或更好的魔法物品|它的名字是|這個名字是一個紅色背景/,
  /整個過程中都會使用火焰箭|冰箭將在整個過程中使用|閃電箭將全程使用|他對一切事物都使用毒箭|抵抗力低/,
];

function contentWithoutSourceTitleRows(content) {
  return content
    .split('\n')
    .filter((line) => !/^\|\[[^\]]+\.html\]\([^)]*\)\|.*Nevergrind Online 攻略DB\|/.test(line))
    .join('\n');
}

function sectionBetween(content, startMarker, endMarker) {
  const start = content.indexOf(startMarker);
  if (start < 0) return '';
  const afterStart = content.slice(start);
  const end = afterStart.indexOf(endMarker);
  return end >= 0 ? afterStart.slice(0, end) : afterStart;
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

function faqSectionHasNoStaticIntroList(content) {
  const faqStart = content.indexOf('<a id="fc2-faq"></a>');
  if (faqStart < 0) return true;

  const afterFaq = content.slice(faqStart);
  const firstQuestionStart = afterFaq.indexOf('\n<a id="fc2-faq-');
  const faqIntro = firstQuestionStart >= 0 ? afterFaq.slice(0, firstQuestionStart) : afterFaq;
  return !/^\s*-\s+(關於角色建立|天梯與永久角色的差異|不知道如何進入地城)\s*$/m.test(faqIntro);
}

function generalReferenceStartsWithIndex(content) {
  const indexStart = content.indexOf('<a id="fc2-index"></a>');
  const chartStart = content.indexOf('<a id="fc2-chart"></a>');
  return indexStart >= 0 && chartStart >= 0 && indexStart < chartStart;
}

function generalReferenceFollowsSidebarOrder(content) {
  const anchors = [
    'fc2-index',
    'fc2-chart',
    'fc2-faq',
    'fc2-charamake',
    'fc2-statuseffect',
    'fc2-unimon',
    'fc2-boss',
    'fc2-english',
    'fc2-dpscalc',
    'fc2-loot',
    'fc2-gambling',
  ];
  const positions = anchors.map((anchor) => content.indexOf(`<a id="${anchor}"></a>`));
  return positions.every((position) => position >= 0) && positions.every((position, index) => index === 0 || positions[index - 1] < position);
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
if (!existsSync(IMAGE_MANIFEST_PATH)) problems.push(`Missing FC2 image manifest: ${IMAGE_MANIFEST_PATH}`);
if (!existsSync(TOPIC_MAP_PATH)) problems.push(`Missing FC2 topic map: ${TOPIC_MAP_PATH}`);
if (problems.length > 0) fail(problems);

const manifest = JSON.parse(await readFile(MANIFEST_PATH, 'utf8'));
const imageManifest = JSON.parse(await readFile(IMAGE_MANIFEST_PATH, 'utf8'));
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

if (!Array.isArray(imageManifest.images)) {
  problems.push(`FC2 image manifest has no images array: ${IMAGE_MANIFEST_PATH}.`);
} else {
  for (const image of imageManifest.images) {
    if (!image.publicPath?.startsWith('/fc2-assets/ngo/')) {
      problems.push(`FC2 image has unexpected public path: ${image.publicPath || image.url}`);
    }
    if (TRACKING_IMAGE_PATTERN.test(image.url ?? '')) {
      problems.push(`Tracking image was downloaded instead of skipped: ${image.url}`);
    }
    const publicPath = image.publicPath ? join(PUBLIC_ROOT, image.publicPath.replace(/^\//, '')) : '';
    const localPath = image.localPath ? join(ROOT, image.localPath) : publicPath;
    if (!publicPath || !existsSync(publicPath)) {
      problems.push(`FC2 image public file is missing: ${image.publicPath || image.url}`);
    }
    if (localPath && !existsSync(localPath)) {
      problems.push(`FC2 image manifest local file is missing: ${image.localPath || image.url}`);
    }
  }
}

if (Array.isArray(imageManifest.skipped)) {
  for (const image of imageManifest.skipped) {
    let pathname = '';
    try {
      pathname = new URL(image.url).pathname;
    } catch {
      pathname = '';
    }
    if (image.url?.startsWith('https://atelier3.web.fc2.com/ngo/') && /\.(?:png|jpe?g|gif)$/i.test(pathname)) {
      problems.push(`FC2 content image was skipped unexpectedly: ${image.url}`);
    }
  }
}

for (const doc of docs) {
  const docName = basename(doc);
  const raw = await readFile(doc, 'utf8');
  const parsed = matter(raw);
  docContentByPath.set(doc, parsed.content);
  const qualityContent = contentWithoutSourceTitleRows(parsed.content);

  for (const pattern of PLACEHOLDER_PATTERNS) {
    if (pattern.test(qualityContent)) {
      problems.push(`${doc} still contains generated placeholder text matching ${pattern}.`);
    }
  }

  if (doc.startsWith(NEVERGRIND_DOCS) && docName.startsWith('fc2-')) {
    if (TRACKING_IMAGE_PATTERN.test(qualityContent)) {
      problems.push(`${doc} contains a tracking or external FC2 image reference.`);
    }

    for (const match of qualityContent.matchAll(IMAGE_REF_PATTERN)) {
      const publicPath = join(PUBLIC_ROOT, match[1].replace(/^\//, ''));
      if (!existsSync(publicPath)) {
        problems.push(`${doc} references missing FC2 image asset: ${match[1]}`);
      }
    }

    for (const pattern of FC2_TERMINOLOGY_PATTERNS) {
      if (pattern.test(qualityContent)) {
        problems.push(`${doc} still contains FC2 terminology drift matching ${pattern}.`);
      }
    }

    if (docName === 'fc2-class-build-index.md') {
      for (const pattern of FC2_CLASS_BUILD_INDEX_TERMINOLOGY_PATTERNS) {
        if (pattern.test(qualityContent)) {
          problems.push(`${doc} still contains FC2 class-build terminology drift matching ${pattern}.`);
        }
      }

      const crusaderContent = sectionBetween(
        qualityContent,
        '<a id="fc2-crusader"></a>',
        '<a id="fc2-druid"></a>',
      );
      for (const pattern of FC2_CRUSADER_TERMINOLOGY_PATTERNS) {
        if (pattern.test(crusaderContent)) {
          problems.push(`${doc} still contains FC2 class-build terminology drift matching ${pattern}.`);
        }
      }

      const enchanterContent = sectionBetween(
        qualityContent,
        '<a id="fc2-enchanter"></a>',
        '<a id="fc2-monk"></a>',
      );
      for (const pattern of FC2_ENCHANTER_TERMINOLOGY_PATTERNS) {
        if (pattern.test(enchanterContent)) {
          problems.push(`${doc} still contains FC2 Enchanter terminology drift matching ${pattern}.`);
        }
      }

      const warriorContent = sectionBetween(
        qualityContent,
        '<a id="fc2-warrior"></a>',
        '<a id="fc2-wizard"></a>',
      );
      for (const pattern of FC2_WARRIOR_TERMINOLOGY_PATTERNS) {
        if (pattern.test(warriorContent)) {
          problems.push(`${doc} still contains FC2 Warrior terminology drift matching ${pattern}.`);
        }
      }
    }

    if (docName === 'fc2-recipes.md') {
      for (const pattern of FC2_RECIPE_TERMINOLOGY_PATTERNS) {
        if (pattern.test(qualityContent)) {
          problems.push(`${doc} still contains FC2 recipe terminology drift matching ${pattern}.`);
        }
      }
    }

    if (docName === 'fc2-rune-craft-reference.md') {
      for (const pattern of FC2_MYTHICAL_TERMINOLOGY_PATTERNS) {
        if (pattern.test(qualityContent)) {
          problems.push(`${doc} still contains FC2 Mythical Craft terminology drift matching ${pattern}.`);
        }
      }
    }

    if (docName === 'fc2-general-reference.md') {
      for (const pattern of [
        ...FC2_GAMBLING_TERMINOLOGY_PATTERNS,
        ...FC2_CHART_TERMINOLOGY_PATTERNS,
        ...FC2_UNIMON_TERMINOLOGY_PATTERNS,
      ]) {
        if (pattern.test(qualityContent)) {
          problems.push(`${doc} still contains FC2 general-reference terminology drift matching ${pattern}.`);
        }
      }
    }

    const kanaMatches = qualityContent.match(/[\u3040-\u30ffー]{8,}/g) ?? [];
    if (kanaMatches.length > 12) {
      problems.push(`${doc} still appears to contain large untranslated Japanese fragments: ${kanaMatches.slice(0, 8).join(', ')}`);
    }

    if (docName === 'fc2-general-reference.md' && !faqSectionHasAnswers(qualityContent)) {
      problems.push(`${doc} appears to have a heading-only FC2 FAQ section without rendered answers.`);
    }

    if (docName === 'fc2-general-reference.md' && !faqSectionHasNoStaticIntroList(qualityContent)) {
      problems.push(`${doc} still contains the non-clickable FC2 FAQ intro list before the rendered answers.`);
    }

    if (docName === 'fc2-general-reference.md' && !generalReferenceStartsWithIndex(qualityContent)) {
      problems.push(`${doc} should render the FC2 source homepage index.html before chart.html.`);
    }

    if (docName === 'fc2-general-reference.md' && !generalReferenceFollowsSidebarOrder(qualityContent)) {
      problems.push(`${doc} should render FC2 source sections in sidebar/menu order.`);
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

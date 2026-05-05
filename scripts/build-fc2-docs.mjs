import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const DOCS_DIR = join(ROOT, 'src/content/docs/nevergrind-online');
const DATA_DIR = join(ROOT, 'src/data');
const PAGE_CACHE = join(ROOT, '.cache/fc2/pages');
const TRANSLATION_CACHE = join(ROOT, '.cache/fc2/translations-ja-zh-tw.json');
const MANIFEST_PATH = join(DATA_DIR, 'fc2-source-manifest.json');
const TOPIC_MAP_PATH = join(DATA_DIR, 'fc2-topic-map.json');
const FC2_GENERATED_PREFIX = 'fc2-';
const FC2_LINK_INDEX = 'fc2-link-index.md';
const TRANSLATE_ENDPOINT = 'https://translate.googleapis.com/translate_a/single';
const TRANSLATE_DELAY_MS = 120;
const TRANSLATE_TIMEOUT_MS = 15000;
const CHUNK_LIMIT = 1400;
const SPLIT_MARKER = '<<<NGO_SPLIT_MARKER>>>';

const TOPIC_META = {
  'fc2-class-build-index.md': {
    title: 'Nevergrind Online FC2 職業 Build 全量參考',
    description: '整合 FC2 的 14 個職業頁，保留職業定位、Talent 範例、裝備例、操作與表格數值。',
  },
  'fc2-general-reference.md': {
    title: 'Nevergrind Online FC2 一般攻略全量參考',
    description: '整合 FC2 的流程、FAQ、角色建立、英文縮寫、掉寶、賭博、Boss、特殊怪物與狀態異常頁。',
  },
  'fc2-legendary-table.md': {
    title: 'Nevergrind Online FC2 Legendary 全量表',
    description: 'FC2 Legendary 裝備表的繁中化版本，保留名稱、需求等級、DPS、防禦與 Mods 數值。',
  },
  'fc2-recipes.md': {
    title: 'Nevergrind Online FC2 Recipe 全量表',
    description: 'FC2 Recipe 表格的繁中化版本，保留裝備欄位、需求等級、Rune 與 Mods。',
  },
  'fc2-rune-craft-reference.md': {
    title: 'Nevergrind Online FC2 Rune / Craft / Item Mods 全量參考',
    description: '整合 FC2 Rune、Rune Select、Mythical Craft 與 Item Mods 頁面，保留配置建議與數值表。',
  },
  'fc2-selected-unique-items.md': {
    title: 'Nevergrind Online FC2 嚴選 Unique 速查',
    description: 'FC2 嚴選 Unique 速查頁的繁中化版本，用於快速判斷值得保留的 Unique 裝備。',
  },
  'fc2-set-elite.md': {
    title: 'Nevergrind Online FC2 Elite Set 全量表',
    description: 'FC2 Elite Set 明細頁的繁中化版本，保留 set bonus、裝備名稱與 Mods。',
  },
  'fc2-set-exceptional.md': {
    title: 'Nevergrind Online FC2 Exceptional Set 全量表',
    description: 'FC2 Exceptional Set 明細頁的繁中化版本，保留 set bonus、裝備名稱與 Mods。',
  },
  'fc2-set-normal.md': {
    title: 'Nevergrind Online FC2 Normal Set 全量表',
    description: 'FC2 Normal Set 明細頁的繁中化版本，保留 set bonus、裝備名稱與 Mods。',
  },
  'fc2-signature-skills.md': {
    title: 'Nevergrind Online FC2 各職代表技能速查',
    description: 'FC2 各職代表技能表的繁中化版本，用於判斷其他職業裝備與 Talent / Skill 價值。',
  },
  'fc2-unique-accessories.md': {
    title: 'Nevergrind Online FC2 Unique 飾品全量表',
    description: 'FC2 Unique Charm、Amulet、Ring 頁面的繁中化版本，保留 Mods 與需求等級。',
  },
  'fc2-unique-armor.md': {
    title: 'Nevergrind Online FC2 Unique 防具全量表',
    description: 'FC2 Unique 防具頁面的繁中化版本，保留防禦、需求等級與 Mods。',
  },
  'fc2-unique-weapons.md': {
    title: 'Nevergrind Online FC2 Unique 武器全量表',
    description: 'FC2 Unique 武器與盾牌頁面的繁中化版本，保留傷害、DPS、需求等級與 Mods。',
  },
};

const SOURCE_TERM_REPLACEMENTS = [
  ['ゲームの流れ', '遊戲流程'],
  ['よくある質問', '常見問題'],
  ['キャラメイク', '角色建立'],
  ['選択可能クラス', '可選職業'],
  ['クラスボーナス', '職業紅利'],
  ['クラスカラー', '職業代表色'],
  ['性別ボーナス', '性別紅利'],
  ['種族ボーナス', '種族紅利'],
  ['全クラス', '所有職業'],
  ['サポートクラス', '輔助職業'],
  ['ボスまとめ', 'Boss 總表'],
  ['状態異常一覧', '狀態異常一覽'],
  ['装備収集', '裝備收集'],
  ['金銭効率', '金錢效率'],
  ['仕様', '規則'],
  ['更新履歴', '更新紀錄'],
  ['ページ内リンク', '頁內連結'],
  ['ノーマル', 'Normal'],
  ['ナイトメア', 'Nightmare'],
  ['ヘル', 'Hell'],
  ['ヒロイック', 'Heroic'],
  ['エリート', 'Elite'],
  ['エクセプショナル', 'Exceptional'],
  ['ユニーク', 'Unique'],
  ['レジェンダリー', 'Legendary'],
  ['ミシカル', 'Mythical'],
  ['セット装備', 'Set 裝備'],
  ['セット数効果', 'Set 件數效果'],
  ['ウォーリアー', 'Warrior'],
  ['ウォリ', 'Warrior'],
  ['クルセイダー', 'Crusader'],
  ['クルセ', 'Crusader'],
  ['クレリック', 'Cleric'],
  ['クレ', 'Cleric'],
  ['パラディン', 'Paladin'],
  ['テンプラー', 'Templar'],
  ['テンプラ', 'Templar'],
  ['シャドウナイト', 'Shadow Knight'],
  ['レンジャー', 'Ranger'],
  ['レンジャ', 'Ranger'],
  ['ローグ', 'Rogue'],
  ['モンク', 'Monk'],
  ['バード', 'Bard'],
  ['ドルイド', 'Druid'],
  ['ドル', 'Druid'],
  ['シャーマン', 'Shaman'],
  ['シャマ', 'Shaman'],
  ['エンチャンター', 'Enchanter'],
  ['エンチャ', 'Enchanter'],
  ['ウォーロック', 'Warlock'],
  ['ウォロ', 'Warlock'],
  ['ウィザード', 'Wizard'],
  ['ウィズ', 'Wizard'],
  ['タレント', 'Talent'],
  ['マスタリー', 'Mastery'],
  ['スキル', 'Skill'],
  ['パッシブ', 'Passive'],
  ['ルーン', 'Rune'],
  ['ソケット', 'Socket'],
  ['クラフト', 'Craft'],
  ['ギャンブル', 'Gambling'],
  ['スペルパワー', 'Spell Power'],
  ['レアドロップ率', 'Rare Drop Rate'],
  ['ドロップ率', 'Drop Rate'],
  ['ダメージ', 'Damage'],
  ['スピード', 'Speed'],
  ['要求レベル', '需求等級'],
  ['アイテム名', '物品名稱'],
  ['レベル', '等級'],
  ['クラス', '職業'],
  ['ボーナス', '紅利'],
  ['ブロック率', '格擋率'],
  ['ディフェンス', '防禦'],
  ['オフェンス', '攻擊'],
  ['受流し', '招架'],
  ['反撃', '反擊'],
  ['サブ', '副手'],
  ['多数', '多數'],
  ['物理防御', '物理防禦'],
  ['攻撃能力', 'Attack Rating'],
  ['攻撃速度', '攻擊速度'],
  ['詠唱速度', '施法速度'],
  ['クリティカルヒット', '暴擊'],
  ['クリティカル', '暴擊'],
  ['ヒット時', '命中時'],
  ['リジェネ', '恢復速度'],
  ['近接', '近戰'],
  ['スタン', '眩暈'],
  ['経験値獲得率', '經驗值取得率'],
  ['経験値', '經驗值'],
  ['ゴールド獲得率', 'Gold 取得率'],
  ['ゴールド', 'Gold'],
  ['ビースト', 'Beast'],
  ['ヒューマノイド', 'Humanoid'],
  ['ジャイアンツ', 'Giant'],
  ['ドラゴンスキン', 'Dragonkin'],
  ['ミスティック', 'Mystical'],
  ['アンデッド', 'Undead'],
  ['デーモン', 'Demon'],
  ['エレメンタル', 'Elemental'],
  ['アーケイン', 'Arcane'],
  ['効果', '效果'],
  ['単体', '單體'],
  ['冷却', '冷卻'],
  ['吸収する', '吸收'],
  ['Socket付き', 'Socketed'],
  ['ソケット付き', 'Socketed'],
  ['付き', '附帶'],
  ['の軽減', '減免'],
  ['才能ツリー', 'Talent 樹'],
  ['ツリー', '樹'],
  ['装備', '裝備'],
  ['片手斬り', '單手斬擊'],
  ['両手斬り', '雙手斬擊'],
  ['片手鈍器', '單手鈍器'],
  ['両手鈍器', '雙手鈍器'],
  ['片手', '單手'],
  ['両手', '雙手'],
  ['器用', 'Dexterity'],
  ['刺突', '刺擊'],
  ['盾', '盾牌'],
  ['弓術', '弓術'],
  ['素手', '空手'],
  ['二刀流', '雙持'],
  ['回避', '閃避'],
  ['頭', '頭部'],
  ['胴体', '胸甲'],
  ['肩', '肩部'],
  ['腕', '護腕'],
  ['手', '手套'],
  ['腰', '腰帶'],
  ['太腿', '腿甲'],
  ['靴', '靴子'],
  ['背中', '背部'],
  ['ネックレス', '項鍊'],
  ['指輪', '戒指'],
  ['チャーム', 'Charm'],
  ['布', '布甲'],
  ['革', '皮甲'],
  ['メイル', '鎖甲'],
  ['プレート', '板甲'],
  ['名前', '名稱'],
  ['備考', '備註'],
  ['種族', '種族'],
  ['防具', '防具'],
  ['基本的な情報', '基本資訊'],
  ['装備例', '裝備範例'],
  ['立ち回り', '操作與打法'],
  ['タレント例', 'Talent 範例'],
  ['職', '職業'],
  ['炎', '火焰'],
  ['氷', '冰冷'],
  ['雷', '閃電'],
  ['毒', '毒素'],
  ['出血', '出血'],
  ['物理', '物理'],
  ['耐性', '抗性'],
  ['筋力', 'Strength'],
  ['敏捷', 'Agility'],
  ['俊敏', 'Agility'],
  ['知性', 'Intelligence'],
  ['知恵', 'Intelligence'],
  ['賢さ', 'Wisdom'],
  ['カリスマ', 'Charisma'],
  ['ｶﾘｽﾏ', 'Charisma'],
  ['体力', 'Stamina'],
  ['ヘルス', 'Health'],
  ['マナ', 'Mana'],
  ['スピリット', 'Spirit'],
  ['キル時回復', '擊殺時恢復'],
  ['ヒット時回復', '命中時恢復'],
  ['被弾時回復', '受擊時恢復'],
  ['ランダム', '隨機'],
  ['増加', '增加'],
  ['強化', '強化'],
  ['削減', '降低'],
  ['全属性', '全屬性'],
  ['全ステータス', '全能力值'],
  ['全パッシブ', '全 Passive'],
  ['すべての才能', '所有 Talent'],
  ['低下', '降低'],
  ['確率', '機率'],
  ['発動', '觸發'],
  ['通常攻撃', '普通攻擊'],
  ['状態異常', '狀態異常'],
  ['特殊モンスター', '特殊怪物'],
  ['ボス', 'Boss'],
  ['武器', '武器'],
  ['防具', '防具'],
  ['魔法', '魔法'],
  ['物理理', '物理'],
];

const POSTPROCESS_REPLACEMENTS = [
  ['您', '你'],
  ['全能力，力量，耐力，敏捷，敏捷，智慧，智慧，魅力。', '全能力值、Strength、Stamina、Agility、Dexterity、Intelligence、Wisdom、Charisma。'],
  ['正常為 1，惡夢為 2，Hell為 3。', 'Normal 為 1 個、Nightmare 為 2 個、Hell 為 3 個。'],
  ['惡夢', 'Nightmare'],
  ['地獄', 'Hell'],
  ['老闆總結', 'Boss 總表'],
  ['可選課程', '可選職業'],
  ['所有課程', '所有職業'],
  ['職業業', '職業'],
  ['特殊怪物理', '特殊怪物'],
  ['物理理', '物理'],
  ['毒素物理抗性', '毒素抗性'],
  ['毒素物抗性', '毒素抗性'],
  ['物理品名稱', '物品名稱'],
  ['單手套', '單手'],
  ['雙手套', '雙手'],
  ['右手套', '右手'],
  ['左手套', '左手'],
  ['副手套', '副手'],
  ['狀態異常一覧', '狀態異常一覽'],
  ['装備収集', '裝備收集'],
  ['金銭効率', '金錢效率'],
  ['仕様', '規則'],
  ['知恵', 'Intelligence'],
  ['カリスマ', 'Charisma'],
  ['ｶﾘｽﾏ', 'Charisma'],
  ['俊敏', 'Agility'],
  ['スペルパワー', 'Spell Power'],
  ['ディフェンス', '防禦'],
  ['オフェンス', '攻擊'],
  ['ブロック率', '格擋率'],
  ['受流し', '招架'],
  ['反撃', '反擊'],
  ['物理Damage', '物理 Damage'],
  ['Damage減免', 'Damage 減免'],
  ['Arcane抗性', 'Arcane 抗性'],
  ['攻撃能力', 'Attack Rating'],
  ['攻撃', '攻擊'],
  ['連続', '連續'],
  ['半減', '減半'],
  ['二回攻擊', 'Double Attack'],
  ['二回攻撃', 'Double Attack'],
  ['班級獎金', '職業紅利'],
  ['班級顏色', '職業代表色'],
  ['類別顏色', '職業代表色'],
  ['職業獎金', '職業紅利'],
  ['性別獎金', '性別紅利'],
  ['種族獎金', '種族紅利'],
  ['人才', 'Talent'],
  ['天賦', 'Talent'],
  ['精通', 'Mastery'],
  ['符文', 'Rune'],
  ['插座', 'Socket'],
  ['普通攻擊命中時', '普通攻擊命中時'],
  ['正常攻擊', '普通攻擊'],
  ['正常難度', 'Normal 難度'],
  ['噩夢', 'Nightmare'],
  ['地獄', 'Hell'],
  ['英勇', 'Heroic'],
  ['十字軍', 'Crusader'],
  ['牧師', 'Cleric'],
  ['吟遊詩人', 'Bard'],
  ['德魯伊', 'Druid'],
  ['薩滿', 'Shaman'],
  ['巫師', 'Wizard'],
  ['術士', 'Warlock'],
  ['流氓', 'Rogue'],
  ['遊俠', 'Ranger'],
  ['武僧', 'Monk'],
  ['聖堂武士', 'Templar'],
  ['暗影騎士', 'Shadow Knight'],
];

const MANUAL_TRANSLATIONS = {
  'ノーマルで1個、ナイトメアで2個、ヘルで3個付与される。':
    'Normal 為 1 個、Nightmare 為 2 個、Hell 為 3 個。',
  '全ステータス、筋力、体力、俊敏、器用、知恵、賢さ、カリスマ。':
    '全能力值、Strength、Stamina、Agility、Dexterity、Intelligence、Wisdom、Charisma。',
  '物理スキルダメージと攻撃能力の上昇 物理スキルダメージに対する影響が非常に大きい':
    '物理技能傷害與 Attack Rating 提升；對物理技能傷害影響很大。',
  '最大ヘルスの上昇': '最大 Health 增加。',
  '回避率と物理防御の上昇': '閃避率與物理防禦提升。',
  '攻撃能力、受流し、反撃、ブロック率、クリティカルヒット率の上昇 攻撃能力は筋力ほどは上昇しない。':
    'Attack Rating、招架、反擊、格擋率與暴擊率提升；Attack Rating 的提升幅度不如 Strength。',
  '最大スピリットと Conjuration スペルの威力の上昇 Evocation スペルの威力にもわずかに影響':
    '最大 Spirit 與 Conjuration 法術強度提升；也會小幅影響 Evocation 法術強度。',
  '最大マナと Evocation スペルの威力の上昇 Conjuration スペルの威力にもわずかに影響':
    '最大 Mana 與 Evocation 法術強度提升；也會小幅影響 Conjuration 法術強度。',
  '最大スピリットと Alteration スペルの威力の上昇':
    '最大 Spirit 與 Alteration 法術強度提升。',
  '被物理ダメージ半減': '受到的物理 Damage 減半。',
  '物理ダメージの通りが悪いので魔法職が処理したい':
    '物理 Damage 不容易打穿，建議由魔法職業處理。',
  '敵が死ぬたびに攻撃力増加 出血耐性50%':
    '每當敵人死亡時攻擊力增加；出血抗性 50%。',
  '強化時に赤く光るのでそれで見つける 最後まで残すと一撃で倒されかねないので早めに倒す':
    '強化時會發紅光，可用這點辨識；拖到最後可能被一擊擊倒，建議優先處理。',
  '物理攻撃力増加': '物理攻擊力增加。',
  '物理全体攻撃を使用': '使用物理全體攻擊。',
  '単体ではさほど怖くないが他のModsと組み合わさると危険':
    '單獨出現不算太可怕，和其他 Mods 疊在一起會很危險。',
  '状態異常の時間が半減': '狀態異常持續時間減半。',
  '攻撃が必ず当たる': '攻擊必定命中。',
  '炎全体攻撃を使用 炎属性ダメージ強化40% 炎耐性50%':
    '使用火焰全體攻擊；火焰 Damage +40%；火焰抗性 50%。',
  '攻撃速度増加 Mods使用頻度増加': '攻擊速度增加；Mods 使用頻率增加。',
  'Rampageなどと組み合わさると回転率が上がり危険':
    '與 Rampage 等 Mods 搭配時，行動頻率會提高，很危險。',
  '氷全体攻撃を使用 氷属性ダメージ強化40% 氷耐性50% 冷却・凍結時間66%減少':
    '使用冰冷全體攻擊；冰冷 Damage +40%；冰冷抗性 50%；冷卻 / 凍結時間減少 66%。',
  '雷全体攻撃を使用 雷属性ダメージ強化40% 雷耐性50%':
    '使用閃電全體攻擊；閃電 Damage +40%；閃電抗性 50%。',
  '攻撃時マナ減少': '攻擊時減少 Mana。',
  '敵の攻撃にマナ減少効果が付与される 無敵状態であってもマナは減少する':
    '敵人的攻擊會附加 Mana 減少效果；即使處於無敵狀態，Mana 仍會減少。',
  '全属性ダメージ強化30% 全属性耐性30%': '全屬性 Damage +30%；全屬性抗性 30%。',
  '～Enchantedと組み合わさると耐性が跳ね上がる':
    '與各種 Enchanted Mods 疊加時，抗性會大幅上升。',
  '麻痺をかけて対策する': '以麻痺處理。',
  '毒全体攻撃を使用 毒属性ダメージ強化40% 毒耐性50%':
    '使用毒素全體攻擊；毒素 Damage +40%；毒素抗性 50%。',
  '物理連続攻撃': '物理連續攻擊。',
  '赤く光って音を鳴らしてから6回連続攻撃を行う スタンで止めることができる':
    '發紅光並發出聲音後，會連續攻擊 6 次；可用 Stun 中斷。',
  '攻撃時スピリット減少': '攻擊時減少 Spirit。',
  '敵の攻撃にスピリット減少効果が付与される 無敵状態であってもスピリットは減少する':
    '敵人的攻擊會附加 Spirit 減少效果；即使處於無敵狀態，Spirit 仍會減少。',
  HP大幅増加: 'HP 大幅增加。',
  '耐性系と組み合わさると非常に硬くなる':
    '與抗性類 Mods 疊加時會變得非常硬。',
};

function todayTaipei() {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Taipei',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function escapeYaml(value) {
  return String(value).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function latestModified(sourcePages) {
  const dated = sourcePages
    .map((page) => page.lastModified)
    .filter(Boolean)
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
  return dated[0] ?? 'N/A';
}

function frontmatterFor({ title, description, reviewedAt, sourcePages }) {
  const lines = ['---', `title: "${escapeYaml(title)}"`, `description: "${escapeYaml(description)}"`];
  lines.push('sourcePages:');
  for (const sourcePage of sourcePages) {
    lines.push(`  - file: "${escapeYaml(sourcePage.file)}"`);
    lines.push(`    title: "${escapeYaml(sourcePage.title)}"`);
    lines.push(`    url: "${escapeYaml(sourcePage.url)}"`);
    if (sourcePage.lastModified) {
      lines.push(`    lastModified: "${escapeYaml(sourcePage.lastModified)}"`);
    }
  }
  lines.push(`reviewedAt: "${reviewedAt}"`);
  lines.push(`sourceLastModified: "${escapeYaml(latestModified(sourcePages))}"`);
  lines.push('status: "FC2 原站高保真繁中化"');
  lines.push('---');
  return lines.join('\n');
}

function hasJapaneseKana(value) {
  return /[\u3040-\u30ff]/.test(value);
}

function replaceAllTerms(value, replacements) {
  let output = value;
  for (const [from, to] of [...replacements].sort((a, b) => b[0].length - a[0].length)) {
    output = output.split(from).join(to);
  }
  return output;
}

function normalizeSourceTerms(value) {
  return replaceAllTerms(value, SOURCE_TERM_REPLACEMENTS);
}

function postprocessTranslation(value) {
  let output = replaceAllTerms(value, POSTPROCESS_REPLACEMENTS);
  output = output
    .replace(/\s+([，。；：、])/g, '$1')
    .replace(/([（【])\s+/g, '$1')
    .replace(/\s+([）】])/g, '$1')
    .replace(/\s{2,}/g, ' ')
    .replace(/圖片\s*:\s*/g, '圖片:')
    .trim();
  return output;
}

async function readJson(path) {
  return JSON.parse(await readFile(path, 'utf8'));
}

class Translator {
  constructor(cache) {
    this.cache = cache;
  }

  static async load() {
    if (!existsSync(TRANSLATION_CACHE)) return new Translator({});
    return new Translator(await readJson(TRANSLATION_CACHE));
  }

  get(value) {
    if (!value) return '';
    if (MANUAL_TRANSLATIONS[value]) return MANUAL_TRANSLATIONS[value];
    return postprocessTranslation(this.cache[value] ?? normalizeSourceTerms(value));
  }

  local(value) {
    if (!value) return '';
    if (MANUAL_TRANSLATIONS[value]) return MANUAL_TRANSLATIONS[value];
    return postprocessTranslation(normalizeSourceTerms(value));
  }

  async save() {
    await mkdir(dirname(TRANSLATION_CACHE), { recursive: true });
    await writeFile(TRANSLATION_CACHE, `${JSON.stringify(this.cache, null, 2)}\n`, 'utf8');
  }

  async translateMany(values) {
    const unique = [...new Set(values.map((value) => String(value ?? '').trim()).filter(Boolean))];
    const pending = [];

    for (const value of unique) {
      if (this.cache[value] && !/[\u3040-\u30ffー]{4,}/.test(this.cache[value])) continue;
      const normalized = normalizeSourceTerms(value);
      if (!hasJapaneseKana(normalized)) {
        this.cache[value] = postprocessTranslation(normalized);
        continue;
      }
      pending.push(value);
    }

    let chunk = [];
    let chunkLength = 0;
    for (const value of pending) {
      const prepared = normalizeSourceTerms(value);
      if (chunkLength + prepared.length > CHUNK_LIMIT && chunk.length > 0) {
        await this.translateChunk(chunk);
        chunk = [];
        chunkLength = 0;
      }
      chunk.push(value);
      chunkLength += prepared.length + SPLIT_MARKER.length + 2;
    }
    if (chunk.length > 0) await this.translateChunk(chunk);
  }

  async translateChunk(values) {
    const normalizedValues = values.map((value) => normalizeSourceTerms(value));
    const query = normalizedValues.join(`\n${SPLIT_MARKER}\n`);

    try {
      const translated = await this.googleTranslate(query);
      const parts = translated.split(SPLIT_MARKER);
      if (parts.length !== values.length) {
        for (let index = 0; index < values.length; index += 1) {
          await this.translateSingle(values[index]);
        }
        return;
      }

      for (let index = 0; index < values.length; index += 1) {
        this.cache[values[index]] = postprocessTranslation(parts[index]);
      }
      await this.save();
      await sleep(TRANSLATE_DELAY_MS);
    } catch (error) {
      console.warn(`Translation chunk failed, retrying item by item: ${error.message}`);
      for (const value of values) {
        await this.translateSingle(value);
      }
    }
  }

  async translateSingle(value) {
    try {
      const translated = await this.googleTranslate(normalizeSourceTerms(value));
      this.cache[value] = postprocessTranslation(translated);
      await sleep(TRANSLATE_DELAY_MS);
    } catch (error) {
      console.warn(`Translation failed for "${value.slice(0, 80)}": ${error.message}`);
      this.cache[value] = postprocessTranslation(normalizeSourceTerms(value));
    }
  }

  async googleTranslate(value) {
    const params = new URLSearchParams({
      client: 'gtx',
      sl: 'ja',
      tl: 'zh-TW',
      dt: 't',
      q: value,
    });
    const response = await fetch(`${TRANSLATE_ENDPOINT}?${params}`, {
      headers: { 'user-agent': 'Mozilla/5.0' },
      signal: AbortSignal.timeout(TRANSLATE_TIMEOUT_MS),
    });
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    const json = await response.json();
    return json[0].map((part) => part[0]).join('');
  }
}

function generatedOutputFiles(topicMap) {
  const files = new Set();
  for (const page of topicMap.pages) {
    for (const target of page.targets ?? []) {
      if (target.outputFile.startsWith(FC2_GENERATED_PREFIX) && target.outputFile !== FC2_LINK_INDEX) {
        files.add(target.outputFile);
      }
    }
  }
  return [...files].sort();
}

function sourcePagesForOutput(topicMap, manifestByUrl, outputFile) {
  return topicMap.pages
    .filter((page) => page.targets?.some((target) => target.outputFile === outputFile))
    .map((page) => {
      const manifest = manifestByUrl.get(page.url);
      return {
        file: page.file,
        title: manifest?.title || page.title || page.file,
        url: page.url,
        lastModified: manifest?.lastModified || page.lastModified || undefined,
      };
    });
}

async function pageCacheFor(file) {
  const path = join(PAGE_CACHE, `${file}.json`);
  if (!existsSync(path)) {
    throw new Error(`Missing FC2 structured page cache for ${file}. Run npm run crawl:fc2 first.`);
  }
  return readJson(path);
}

function collectTexts(page) {
  const texts = [page.pageTitle, page.title];
  for (const block of page.blocks ?? []) {
    if (block.type === 'heading' || block.type === 'paragraph') {
      texts.push(block.text);
    } else if (block.type === 'list') {
      texts.push(...block.items);
    } else if (block.type === 'table') {
      for (const row of block.rows) {
        texts.push(...row.filter(shouldTranslateTableCell));
      }
    }
  }
  return texts;
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fff]+/gi, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function fileStem(file) {
  return file.replace(/\.html$/, '');
}

function escapeMarkdownCell(value) {
  return String(value || ' ')
    .replace(/\|/g, '\\|')
    .replace(/_/g, '\\_')
    .replace(/\n+/g, '<br>')
    .trim();
}

function shouldTranslateTableCell(value) {
  const text = String(value ?? '');
  return hasJapaneseKana(text);
}

function tableCellText(value, translator) {
  return shouldTranslateTableCell(value) ? translator.get(value) : translator.local(value);
}

function cleanHeadingText(value) {
  return value.replace(/[!！?？。．.：:；;、,\s]+$/g, '').trim();
}

function renderTable(rows, translator) {
  const maxColumns = Math.max(...rows.map((row) => row.length));
  const normalized = rows.map((row) => {
    const cells = row.map((cell) => tableCellText(cell, translator));
    while (cells.length < maxColumns) cells.push('');
    return cells;
  });

  const header = normalized[0].map((cell, index) => escapeMarkdownCell(cell || `欄位 ${index + 1}`));
  const body = normalized.slice(1).map((row) => `|${row.map(escapeMarkdownCell).join('|')}|`);
  return [`|${header.join('|')}|`, `|${header.map(() => '---').join('|')}|`, ...body].join('\n');
}

function renderPage(page, translator) {
  const lines = [
    `<a id="fc2-${fileStem(page.file)}"></a>`,
    '',
    `## ${translator.get(page.pageTitle)}`,
    '',
    `- FC2 file：[${page.file}](${page.url})`,
  ];
  if (page.lastModified) lines.push(`- 原站 Last-Modified：\`${page.lastModified}\``);
  lines.push('');

  let skippedFirstH1 = false;
  const headingIds = new Map();
  let baseSourceHeadingLevel = null;
  for (const block of page.blocks ?? []) {
    if (block.type === 'heading') {
      if (!skippedFirstH1 && block.level === 1) {
        skippedFirstH1 = true;
        continue;
      }
      const headingText = cleanHeadingText(translator.get(block.text));
      if (baseSourceHeadingLevel === null) baseSourceHeadingLevel = block.level;
      const baseId = block.id || slugify(headingText) || `section-${headingIds.size + 1}`;
      const idKey = `${fileStem(page.file)}-${baseId}`;
      const count = (headingIds.get(idKey) ?? 0) + 1;
      headingIds.set(idKey, count);
      const id = count === 1 ? idKey : `${idKey}-${count}`;
      const level = Math.min(3 + Math.max(0, block.level - baseSourceHeadingLevel), 6);
      lines.push(`<a id="fc2-${id}"></a>`, '', `${'#'.repeat(level)} ${headingText}`, '');
      continue;
    }

    if (block.type === 'paragraph') {
      const text = translator.get(block.text);
      if (text) lines.push(text, '');
      continue;
    }

    if (block.type === 'list') {
      const items = block.items.flatMap((item, index) => {
        const marker = block.ordered ? `${index + 1}.` : '-';
        const lines = translator.get(item).split('\n').filter(Boolean);
        if (lines.length === 0) return [];
        return [`${marker} ${lines[0]}`, ...lines.slice(1).map((line) => `  ${line}`)];
      });
      if (items.length > 0) lines.push(...items, '');
      continue;
    }

    if (block.type === 'table') {
      if (block.rows.length > 0) lines.push(renderTable(block.rows, translator), '');
    }
  }

  return lines.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

function sourceReminder() {
  return [
    '---',
    '',
    '> **版本提醒**',
    '> 本頁是 FC2 玩家攻略快照的繁中整理版；技能、裝備、掉落、配方與版本敏感數值，請以目前遊戲內 tooltip / UI 與官方公告為準。',
  ].join('\n');
}

function introFor(outputFile, sourcePages, reviewedAt) {
  return [
    '本頁由 FC2 / atelier3 原站 HTML 重新擷取後繁中化，保留原頁段落、清單、表格欄位與數值；原站圖片、CSS、JavaScript 不搬入公開站。',
    '',
    `- 檢視日期：\`${reviewedAt}\``,
    `- FC2 來源頁數：${sourcePages.length}`,
    '- 翻譯策略：保留英文 item / skill / class / rune 查詢詞，日文攻略語氣轉為台灣繁中說明。',
    '- 內容狀態：由 FC2 原站正文生成，不使用舊版摘要句。',
    '',
    '> **快速重點**',
    '> 這是玩家攻略與資料表的繁中化快照，適合查路線、裝備、Rune、Recipe、Set / Unique / Legendary 數值。',
    '> 投入 crafting、交易或丟裝前，仍建議回遊戲內 tooltip 確認。',
    '',
    `<a id="${outputFile.replace(/\.md$/, '')}-sources"></a>`,
    '',
    '## 本頁收錄來源',
    '',
    '|FC2 file|原站標題|Last-Modified|',
    '|---|---|---|',
    ...sourcePages.map((page) => `|[${page.file}](${page.url})|${escapeMarkdownCell(page.title)}|${page.lastModified ?? 'N/A'}|`),
  ].join('\n');
}

async function main() {
  if (!existsSync(MANIFEST_PATH)) throw new Error(`Missing manifest: ${MANIFEST_PATH}`);
  if (!existsSync(TOPIC_MAP_PATH)) throw new Error(`Missing topic map: ${TOPIC_MAP_PATH}`);
  if (!existsSync(PAGE_CACHE)) throw new Error(`Missing FC2 page cache: ${PAGE_CACHE}. Run npm run crawl:fc2 first.`);

  const manifest = await readJson(MANIFEST_PATH);
  const topicMap = await readJson(TOPIC_MAP_PATH);
  const manifestByUrl = new Map(manifest.pages.map((page) => [page.url, page]));
  const outputFiles = generatedOutputFiles(topicMap);
  const pagesByFile = new Map();
  const translator = await Translator.load();

  for (const page of manifest.pages) {
    pagesByFile.set(page.file, await pageCacheFor(page.file));
  }

  const texts = [];
  for (const page of pagesByFile.values()) {
    texts.push(...collectTexts(page));
  }
  await translator.translateMany(texts);
  await translator.save();

  const reviewedAt = todayTaipei();
  for (const outputFile of outputFiles) {
    const meta = TOPIC_META[outputFile];
    if (!meta) throw new Error(`Missing generated topic metadata for ${outputFile}`);
    const sourcePages = sourcePagesForOutput(topicMap, manifestByUrl, outputFile);
    const pageSections = sourcePages.map((sourcePage) => renderPage(pagesByFile.get(sourcePage.file), translator));
    const output = [
      frontmatterFor({
        title: meta.title,
        description: meta.description,
        reviewedAt,
        sourcePages,
      }),
      '',
      introFor(outputFile, sourcePages, reviewedAt),
      '',
      ...pageSections.flatMap((section) => [section, '']),
      sourceReminder(),
      '',
    ].join('\n');

    await mkdir(DOCS_DIR, { recursive: true });
    await writeFile(join(DOCS_DIR, outputFile), output.replace(/\n{4,}/g, '\n\n\n'), 'utf8');
  }

  console.log(
    JSON.stringify(
      {
        generated: outputFiles.length,
        outputFiles,
        sourcePages: manifest.pages.length,
        translationCache: TRANSLATION_CACHE,
      },
      null,
      2,
    ),
  );
}

await main();

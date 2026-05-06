import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const DOCS_DIR = join(ROOT, 'src/content/docs');
const DATA_DIR = join(ROOT, 'src/data');
const PAGE_CACHE = join(ROOT, '.cache/fc2/pages');
const TRANSLATION_CACHE = join(ROOT, '.cache/fc2/translations-ja-zh-tw.json');
const MANIFEST_PATH = join(DATA_DIR, 'fc2-source-manifest.json');
const TOPIC_MAP_PATH = join(DATA_DIR, 'fc2-topic-map.json');
const FC2_GENERATED_PREFIX = 'fc2-';
const FC2_LINK_INDEX = 'fc2-link-index.md';
const OUTPUT_PAGE_ORDER_OVERRIDES = {
  'fc2-general-reference.md': ['index.html'],
};
const TRANSLATE_ENDPOINT = 'https://translate.googleapis.com/translate_a/single';
const TRANSLATE_DELAY_MS = 120;
const TRANSLATE_TIMEOUT_MS = 15000;
const CHUNK_LIMIT = 1400;
const SPLIT_MARKER = '<<<NGO_SPLIT_MARKER>>>';

const TOPIC_META = {
  'fc2-class-build-index.md': {
    title: 'Nevergrind Online FC2 職業 Build 全量參考',
    description: '整合 FC2 的 14 個職業頁，保留職業定位、天賦範例、裝備例、操作與表格數值。',
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
    description: 'FC2 Recipe 表格的繁中化版本，保留裝備欄位、需求等級、符文與 Mods。',
  },
  'fc2-rune-craft-reference.md': {
    title: 'Nevergrind Online FC2 符文 / Craft / Item Mods 全量參考',
    description: '整合 FC2 符文、Rune Select、Mythical Craft 與 Item Mods 頁面，保留配置建議與數值表。',
  },
  'fc2-selected-unique-items.md': {
    title: 'Nevergrind Online FC2 嚴選獨特裝備速查',
    description: 'FC2 嚴選獨特裝備速查頁的繁中化版本，用於快速判斷值得保留的獨特裝備。',
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
    description: 'FC2 各職代表技能表的繁中化版本，用於判斷其他職業裝備與天賦 / Skill 價值。',
  },
  'fc2-unique-accessories.md': {
    title: 'Nevergrind Online FC2 獨特飾品全量表',
    description: 'FC2 獨特 Charm、Amulet、Ring 頁面的繁中化版本，保留 Mods 與需求等級。',
  },
  'fc2-unique-armor.md': {
    title: 'Nevergrind Online FC2 獨特防具全量表',
    description: 'FC2 獨特防具頁面的繁中化版本，保留防禦、需求等級與 Mods。',
  },
  'fc2-unique-weapons.md': {
    title: 'Nevergrind Online FC2 獨特武器全量表',
    description: 'FC2 獨特武器與盾牌頁面的繁中化版本，保留傷害、DPS、需求等級與 Mods。',
  },
};

const SOURCE_TERM_REPLACEMENTS = [
  ['ゲームの流れ', '遊戲流程'],
  ['よくある質問', '常見問題'],
  ['キャラメイク', '角色建立'],
  ['キャラクターメイキング', '角色建立'],
  ['選択可能クラス', '可選職業'],
  ['クラスボーナス', '職業加成'],
  ['クラスカラー', '職業代表色'],
  ['性別ボーナス', '性別加成'],
  ['種族ボーナス', '種族加成'],
  ['全クラス', '所有職業'],
  ['サポートクラス', '輔助職業'],
  ['ボスまとめ', 'Boss 總表'],
  ['状態異常一覧', '狀態異常一覽'],
  ['装備収集', '裝備收集'],
  ['金銭効率', '金錢效率'],
  ['仕様', '規則'],
  ['更新履歴', '更新紀錄'],
  ['ページ内リンク', '頁內連結'],
  ['ノーマル', '普通（Normal）'],
  ['ナイトメア', '惡夢（Nightmare）'],
  ['ヘル', '地獄（Hell）'],
  ['ヒロイック', '英雄（Heroic）'],
  ['エリート', 'Elite'],
  ['エクセプショナル', 'Exceptional'],
  ['ユニーク', '獨特'],
  ['シャコ', 'Shako'],
  ['ハニワ', 'Haniwa'],
  ['レジェンダリー', 'Legendary'],
  ['ミシカル', 'Mythical'],
  ['セット装備', 'Set 裝備'],
  ['セット数効果', 'Set 件數效果'],
  ['ウォーリアー', '戰士'],
  ['ウォリ', '戰士'],
  ['クルセイダー', '十字軍'],
  ['クルセ', '十字軍'],
  ['クレリック', '牧師'],
  ['クレ', '牧師'],
  ['パラディン', '聖騎士'],
  ['テンプラー', '聖殿騎士'],
  ['テンプラ', '聖殿騎士'],
  ['シャドウナイト', '暗影騎士'],
  ['レンジャー', '遊俠'],
  ['レンジャ', '遊俠'],
  ['ローグ', '盜賊'],
  ['モンク', '武僧'],
  ['バード', '吟遊詩人'],
  ['ドルイド', '德魯伊'],
  ['ドル', '德魯伊'],
  ['シャーマン', '薩滿'],
  ['シャマ', '薩滿'],
  ['エンチャンター', '附魔師'],
  ['エンチャ', '附魔師'],
  ['ウォーロック', '術士'],
  ['ウォロ', '術士'],
  ['ウィザード', '巫師'],
  ['ウィズ', '巫師'],
  ['タレント', '天賦'],
  ['マスタリー', 'Mastery'],
  ['スキル', 'Skill'],
  ['パッシブ', 'Passive'],
  ['ルーン', '符文'],
  ['ソケット', 'Socket'],
  ['クラフト', 'Craft'],
  ['ギャンブル', 'Gambling'],
  ['シーズン', '賽季'],
  ['ラダー', '天梯'],
  ['エターナル', '永久'],
  ['インベントリ', '背包'],
  ['アカデミー', '學院'],
  ['ミッション', '任務'],
  ['ダンジョン', '地城'],
  ['酒場', '酒館'],
  ['タウン', '城鎮'],
  ['リログ', '重新登入'],
  ['スペルパワー', 'Spell Power'],
  ['レアドロップ率', 'Rare Drop Rate'],
  ['ドロップ率', 'Drop Rate'],
  ['ダメージ', 'Damage'],
  ['スピード', 'Speed'],
  ['要求レベル', '需求等級'],
  ['アイテム名', '物品名稱'],
  ['レベル', '等級'],
  ['クラス', '職業'],
  ['ボーナス', '加成'],
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
  ['才能ツリー', '天賦樹'],
  ['ツリー', '樹'],
  ['装備', '裝備'],
  ['片手斬り', '單手斬擊'],
  ['両手斬り', '雙手斬擊'],
  ['片手鈍器', '單手鈍器'],
  ['両手鈍器', '雙手鈍器'],
  ['片手', '單手'],
  ['両手', '雙手'],
  ['器用', '靈巧'],
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
  ['タレント例', '天賦範例'],
  ['職', '職業'],
  ['炎', '火焰'],
  ['氷', '冰冷'],
  ['雷', '閃電'],
  ['毒', '毒素'],
  ['出血', '出血'],
  ['物理', '物理'],
  ['耐性', '抗性'],
  ['筋力', '力量'],
  ['敏捷', '敏捷'],
  ['俊敏', '敏捷'],
  ['知性', '智力'],
  ['知恵', '智力'],
  ['賢さ', '智慧'],
  ['カリスマ', '魅力'],
  ['ｶﾘｽﾏ', '魅力'],
  ['体力', '耐力'],
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
  ['すべての才能', '所有天賦'],
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

const INTERACTIVE_TOOL_PAGE_NOTES = {
  'dpscalc.html': [
    '這個來源頁是 FC2 原站的 JavaScript / 表單計算機。本站不搬原站 JavaScript，也尚未重製可操作版本，因此不把輸入表單與計算結果表格轉成靜態 Markdown。',
    '要實際試算武器 DPS，請直接開啟原站計算器。',
  ],
};

const PUBLIC_TERM_REPLACEMENTS = [
  ['UniqueDrop Rate', '獨特掉落率'],
  ['Unique Drop Rate', '獨特掉落率'],
  ['Talents', '天賦'],
  ['Talent', '天賦'],
  ['Unique', '獨特'],
  ['Rune Words', '符文組'],
  ['Runes', '符文'],
  ['Rune', '符文'],
  ['Strength', '力量'],
  ['Stamina', '耐力'],
  ['Agility', '敏捷'],
  ['Dexterity', '靈巧'],
  ['Intelligence', '智力'],
  ['Wisdom', '智慧'],
  ['Charisma', '魅力'],
];

const CLASS_NAME_REPLACEMENTS = [
  ['Shadow Knight', '暗影騎士'],
  ['Crusader', '十字軍'],
  ['Enchanter', '附魔師'],
  ['Templar', '聖殿騎士'],
  ['Warrior', '戰士'],
  ['Warlock', '術士'],
  ['Cleric', '牧師'],
  ['Ranger', '遊俠'],
  ['Shaman', '薩滿'],
  ['Wizard', '巫師'],
  ['Druid', '德魯伊'],
  ['Rogue', '盜賊'],
  ['Monk', '武僧'],
  ['Bard', '吟遊詩人'],
];

const POSTPROCESS_REPLACEMENTS = [
  ['您', '你'],
  ['全能力，力量，耐力，敏捷，敏捷，智慧，智慧，魅力。', '全能力值、力量、耐力、敏捷、靈巧、智力、智慧、魅力。'],
  [
    '正常為 1，惡夢為 2，Hell為 3。',
    '普通（Normal）為 1 個、惡夢（Nightmare）為 2 個、地獄（Hell）為 3 個。',
  ],
  [
    'Normal 為 1 個、Nightmare 為 2 個、Hell 為 3 個。',
    '普通（Normal）為 1 個、惡夢（Nightmare）為 2 個、地獄（Hell）為 3 個。',
  ],
  ['夢魘', '惡夢（Nightmare）'],
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
  ['金金屬效率', '金錢效率'],
  ['金屬效率', '金錢效率'],
  ['螳螂蝦', 'Shako'],
  ['薩科', 'Shako'],
  ['江湖之冠', "Charlatan's Crest"],
  ['埴輪', 'Haniwa'],
  ['Haniwa舒莫奇', '雙持 Haniwa'],
  ['神秘典範', 'Cryptic Paragon'],
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
  ['班級獎金', '職業加成'],
  ['職業紅利', '職業加成'],
  ['班級顏色', '職業代表色'],
  ['類別顏色', '職業代表色'],
  ['|類別|力量|耐力|', '|職業|力量|耐力|'],
  ['職業獎金', '職業加成'],
  ['性別獎金', '性別加成'],
  ['種族獎金', '種族加成'],
  ['性別紅利', '性別加成'],
  ['種族紅利', '種族加成'],
  ['物理紅利', '物理加成'],
  ['Unique 裝備', '獨特裝備'],
  ['Legendary 裝備', '傳奇裝備'],
  ['Unique 5 個', '獨特 5 個'],
  ['Rare 127 個', '稀有 127 個'],
  ['獨一無二', '獨特'],
  ['人才', '天賦'],
  ['自然能力', '天賦'],
  ['Talent 樹', '天賦樹'],
  ['Talent樹', '天賦樹'],
  ['精通', 'Mastery'],
  ['插座', 'Socket'],
  ['普通攻擊命中時', '普通攻擊命中時'],
  ['正常攻擊', '普通攻擊'],
  ['正常難度', '普通（Normal）難度'],
  ['噩夢', '惡夢（Nightmare）'],
  ['英勇', '英雄（Heroic）'],
  ['以太', '乙太'],
  ['符號文字', '符文'],
  ['符號文本', '符文'],
  ['旋轉地牢', '周回地城'],
  ['旋轉地城', '周回地城'],
  ['地下城', '地城'],
  ['地牢', '地城'],
  ['副本', '地城'],
  ['绕行', '周回'],
  ['绕过', '周回'],
  ['繞行', '周回'],
  ['繞過去', '周回'],
  ['非政府組織', 'NGO'],
  ['NGO內部', 'NGO 內部'],
  ['流氓', '盜賊'],
  ['聖堂武士', '聖殿騎士'],
  ['從城鎮左側的欄中選擇一個任務並進入。', '從城鎮左側的酒館選擇任務即可進入地城。'],
  ['你可以透過在城鎮右側的商人處支付金幣來做到這一點。', '到城鎮右側的商人支付 Gold 即可擴充。'],
  ['你可以透過在城鎮右上角的學院支付金幣來做到這一點。', '到城鎮右上的學院支付 Gold 即可重置天賦。'],
  ['你可以透過右鍵單擊來替換它。', '右鍵即可替換。'],
  ['一點也不。我唯一能說的是我可以使用公會聊天。', '沒有實質加成。勉強要說的話，就是可以使用公會聊天。'],
];

const MANUAL_TRANSLATIONS = {
  'ナイトメア・ヘルではそれぞれModsが2・3個に増加するが、その内容はランダム。':
    '惡夢（Nightmare）和地獄（Hell）的 Mods 數量分別增加為 2 個與 3 個，但組合內容是隨機的。',
  'ノーマルで1個、ナイトメアで2個、ヘルで3個付与される。':
    '普通（Normal）為 1 個、惡夢（Nightmare）為 2 個、地獄（Hell）為 3 個。',
  ノーマル: '普通（Normal）',
  ナイトメア: '惡夢（Nightmare）',
  ヘル: '地獄（Hell）',
  ヒロイック: '英雄（Heroic）',
  クラス: '職業',
  'ページ内リンク：ノーマル / ナイトメア / ヘル / ヒロイック':
    '頁內連結：普通（Normal） / 惡夢（Nightmare） / 地獄（Hell） / 英雄（Heroic）',
  'ゲームの最初の難易度であり、基本的なことを学ぶ。':
    '普通（Normal）是遊戲的第一個難度，你會在這裡學習基礎流程。',
  'なお余談ではあるが、ノーマル限定でAct.IVのボスを倒しても Ashenflow Peak のボスである Lord Szarthax まで全開放されない。だいたい Ashenflow Peak の半分くらいまで開放され、残りは進める必要がある。':
    '順帶一提，即使只在普通（Normal）擊敗 Act IV Boss，也不會完整解鎖 Ashenflow Peak 的 Boss Lord Szarthax。大約只會開放 Ashenflow Peak 的一半，剩下區域仍需要繼續推進。',
  '進行ルートは自由だが、アンデッド特攻を持つクルセイダーとクレリックは Salubrin Haven > Riven Grotto > Thule Crypt と進むのが一般的だ。':
    '推進路線可以自由選擇；如果是擁有不死族特攻的十字軍與牧師，通常會走 Salubrin Haven > Riven Grotto > Thule Crypt。',
  '運よく Gra ルーンを入手できたなら、ソケット付きの武器に鍛冶屋でエンチャントすれば楽ができる。':
    '如果幸運拿到 Gra 符文，可以到鐵匠鋪把它附到有插槽的武器上，推進會輕鬆很多。',
  '+2 すべての才能がついたレアネックレス（いちおうマジックにもつく）は非常に有用であり、筋力（最大+50）が同時につけば物理職で長く使うことができる。また+3 才能ツリーは特定職で有用であり、クルセイダーの Judicator やテンプラーの Visionary や Elementalist などはユニークを拾うまでの繋ぎになる。':
    '帶有 +2 所有天賦的稀有項鍊非常有用（魔法等級也可能出現）。如果同時附上力量（最高 +50），物理職業可以用很久。另外，+3 天賦樹對特定職業也很有價值，例如十字軍的 Judicator、聖殿騎士的 Visionary 或 Elementalist，都能作為撿到獨特裝備前的過渡品。',
  'またレアグローブにも+2 才能ツリーがつく。ウォーロックはレジェンダリーでしか+2がつかないし、テンプラーはレアでしか+2ができない。プレート職は Marshal Gauntlets Iniquity の目当ての才能ツリーを引くまでの繋ぎにもなりうる。ただし滅多に才能がつかないし、そこそこの代用品もあるのでそこまで重要でもない。':
    '稀有手套也可能出現 +2 天賦樹。術士只有傳奇裝備能出 +2，聖殿騎士則只有稀有裝備能出 +2。板甲職業也可以把它當成抽到 Marshal Gauntlets Iniquity 目標天賦樹前的過渡品。不過天賦詞綴很稀有，而且也有堪用替代品，所以重要度沒有那麼高。',
  '終盤であればノーマルは基本的に捨てて構わない。魔法両手鈍器はノーマルであっても全ての装備に才能がついているので良い値段で売れる。その他は才能や属性耐性がつくノーマルユニークを把握できているなら持ち帰る。':
    '到了遊戲後期，普通裝備基本上可以直接丟掉。不過魔法雙手鈍器即使是普通等級，也一定帶有天賦，因此能賣出不錯價格。其他部位則看你是否能辨認出帶天賦或屬性抗性的普通獨特裝備；能辨認的話就可以帶回家。',
  'また、ノーマルユニーク・セットの中には一部持ち帰るべき例外が弓にある。':
    '另外，普通獨特與套裝裡也有少數值得帶回家的例外，其中弓類特別需要留意。',
  '持ち帰ったユニークやセットの取捨選別に迷ったら、各職の代表スキル や 各職の厳選ユニーク、また各職のビルド紹介ページなどを参考にしてほしい。':
    '如果不確定帶回家的獨特或套裝該留還是該丟，可以參考各職代表技能、各職嚴選獨特裝備，以及各職業 Build 介紹頁。',
  'シャコ（エリート）': "Charlatan's Crest（Shako, Elite）",
  'ユニークの Charlatan\'s Crest はすべての才能+2、属性ダメージ強化、高レアドロの3点が揃っている優秀な装備で、多くの職で採用される。ぜひ全属性ぶんを揃えたいところ。':
    "獨特裝備 Charlatan's Crest 同時具備 +2 所有天賦、屬性傷害強化與高 Rare Drop Rate 三個重點，適合許多職業採用。理想上可以為常用屬性傷害 roll 各準備一頂。",
  '加えてレジェンダリーの Mosby\'s Ancient Crown も狙える優良商品。':
    "另外也有機會順便瞄準傳奇裝備 Mosby's Ancient Crown，是值得賭的品項。",
  'ハニワ（エリート）': 'Cryptic Paragon（Haniwa, Elite）',
  'こちらはユニークの Cryptic Paragon 一点狙いとなるが、ハニワはすべての才能+2、ランダムタレント、全属性耐性、全スペルダメージ、アンデッド特攻という全部乗せ装備であり、魔法職で活用されやすく、タレントとスキルが噛み合ったものを一生探すことになる。':
    '這一項主要是在瞄準獨特裝備 Cryptic Paragon。Haniwa 俗稱的價值在於 +2 所有天賦、隨機天賦、全屬性抗性、全 Spell Damage 與不死生物特攻都集中在同一件裝備上，法系職業很容易用得上；真正難的是找到天賦與技能 roll 都契合的那一把。',
  '参考：Haniwa 試行132回、レア127個、ユニーク5個（3.78%）':
    '參考：Haniwa 試行 132 次，稀有 127 個、獨特 5 個（3.78%）。',
  '通称ハニワ。基本的には 各職の代表スキル を確認。 スキル一致だけでも優秀だが、タレント一致は非常に強い。 特にヤバいのはドルイドの Tornado、エンチャの Superior Enthrall、ウィズの Superior Lightning Boltあたり。':
    '俗稱 Haniwa。基本上請對照各職代表技能；只要技能 roll 命中就很優秀，若天賦也命中會非常強。特別誇張的是德魯伊 Tornado、附魔師 Superior Enthrall、巫師 Superior Lightning Bolt 等。',
  '通称シャコ。すべての才能+2は必須で、そこから属性ダメージ+16%、レアドロ+50%に近ければ近いほどいい。出血だけハズレ。':
    '俗稱 Shako。+2 所有天賦是必備；屬性傷害越接近 +16%、Rare Drop Rate 越接近 +50% 越好。只有出血屬性比較不理想。',
  '才能が Phoenix か Falcon の+2で、できれば Dragon Punch か Hurricane Kicks が絡んでいるもの。 火力優先ならこれ、レアドロ優先ならシャコ。':
    '天賦是 Phoenix 或 Falcon +2，最好還帶 Dragon Punch 或 Hurricane Kicks。火力優先選這件；Rare Drop Rate 優先則選 Shako。',
  '雷才能+1～3と Chaos Mage +1～2で、合計が3以上のもの。 ウィズはエリートセットが優秀だが、ハニワ二刀流をする場合、とにかくタレント稼ぎが足りないので使うことがある。 エンチャの Psionicist やテンプラの Visionary も火力特化で採用。':
    'Lightning 類天賦 +1～3，加上 Chaos Mage +1～2，合計 3 以上。巫師的 Elite Set 很優秀，但如果要雙持 Haniwa，常會因為天賦等級不夠而採用。附魔師 Psionicist、聖殿騎士 Visionary 也可作為火力特化裝備。',
  'タレントが Tornado のもので合計が3以上。 よほど噛み合わない限りシャコの劣化でしかないが、回数増加がどうしても足りない時に採用する。Tornado +6になるとさすがに強い。 テンプラの Frozen Orb でも面白いと思う。':
    '隨機天賦是 Tornado，合計 3 以上。若沒有高度契合，通常只是 Shako 的下位替代；但當攻擊次數怎麼都不夠時可以採用。Tornado +6 真的會很強，聖殿騎士 Frozen Orb 也可能有趣。',
  '才能が Stormcaller、タレントが Tornado のもので合計が3以上。 よほど噛み合わない限りシャコの劣化でしかないが、回数増加がどうしても足りない時に採用する。':
    '天賦是 Stormcaller、隨機天賦是 Tornado，合計 3 以上。若沒有高度契合，通常只是 Shako 的下位替代；但當攻擊次數怎麼都不夠時可以採用。',
  '才能が Stormcaller、タレントが Tornado のもので合計が3以上。 よほど噛み合わない限りシャコの劣化でしかないが、回数増加がどうしても足りない時に採用する。 テンプラの Elementalist + Frozen Orb でも面白いと思う。':
    '天賦是 Stormcaller、隨機天賦是 Tornado，合計 3 以上。若沒有高度契合，通常只是 Shako 的下位替代；但當攻擊次數怎麼都不夠時可以採用。聖殿騎士 Elementalist + Frozen Orb 也可能有趣。',
  'タレントが Superior Lightning Bolt +3のものに限る。 ウィズはエリートセットが優秀だが、ハニワ二刀流をする場合、とにかくタレント稼ぎが足りないので使うことがある。 他布職の特化構成としても使える可能性あるかも。':
    '僅限隨機天賦為 Superior Lightning Bolt +3。巫師的 Elite Set 很優秀，但如果要雙持 Haniwa，常會因為天賦等級不夠而採用。其他布甲職業的特化配置也可能有用途。',
  'タレントが Superior Lightning Bolt +2～3のものに限る。 ウィズはエリートセットが優秀だが、ハニワ二刀流をする場合、とにかくタレント稼ぎが足りないので使うことがある。 他布職の特化構成としても使える可能性あるかも。':
    '僅限隨機天賦為 Superior Lightning Bolt +2～3。巫師的 Elite Set 很優秀，但如果要雙持 Haniwa，常會因為天賦等級不夠而採用。其他布甲職業的特化配置也可能有用途。',
  '収集すべきアイテムや、金銭効率といった話。': '談哪些物品值得帶回，以及金錢效率。',
  '装備収集・金銭効率': '裝備收集 / 金錢效率',
  'エクセプショナル以上であれば装備収集・金銭効率のどちらの面から見ても、すべて持ち帰っていい。':
    'Exceptional 以上的物品，無論從裝備收集還是金錢效率來看，基本上都可以帶回家。',
  キャラクターメイキングについて: '關於角色建立',
  'ラダーとエターナルの違い': '天梯與永久角色的差異',
  シーズンについて: '關於賽季',
  ダンジョンへの行き方が分からない: '不知道如何進入地城',
  鑑定するのがめんどくさい: '鑑定很麻煩',
  アイテムの売買がめんどくさい: '買賣物品很麻煩',
  'インベントリの拡張ってどうやるの？': '如何擴充背包？',
  'ルーンの装着ってどうやるの？': '如何鑲嵌符文？',
  'タレントのリセットってどうやるの？': '如何重置天賦？',
  'アイテムの共有ってどうやるの？': '如何分享物品？',
  '装備の比較ってどうやるの？': '如何比較裝備？',
  緑の剣の出し方が分からない: '不知道如何顯示綠色劍圖示',
  スキルショートカットを入れ替えたい: '想更換技能快捷鍵',
  チャットコマンドを知りたい: '想知道聊天指令',
  'ギルドに入ることで特典はある？': '加入公會有什麼好處？',
  'ダンジョンの報酬タイプって何？': '地城獎勵類型是什麼？',
  '装備のタレントやスキルの文字色は何？': '裝備上的天賦與技能文字顏色代表什麼？',
  '効果って何？': '效果是什麼？',
  'エーテル・不滅って何？': '乙太與不滅是什麼？',
  'ラピッドアタックって何？': 'Rapid Attack 是什麼？',
  ボス部屋の大まかな位置を絞りたい: '想大致判斷 Boss 房位置',
  ダンジョン内移動を楽にしたい: '想讓地城移動更輕鬆',
  ゲームが徐々に重くなる: '遊戲逐漸變卡',
  操作ができなくなることがある: '有時會無法操作',
  操作ができなくなる時がある: '有時會無法操作',
  アイテムが消えた: '物品消失了',
  '種族やステータスの割り振りに迷うかもしれませんが、誤差なので気にする必要はありません。 重要なのは顔画像だけです。やる気に直結するので慎重に選びましょう。':
    '種族與能力值分配可能會讓人猶豫，但差異不大，不需要太在意。最重要的是頭像，會直接影響遊玩動力，請慎重選擇。',
  'ラダーではレベルを競うリーダーボードが設置されます。シーズンが終了した時ラダーのキャラクターはエターナルへと送られます。以前はレジェンダリーがドロップしない・博物館が使えないという違いもありましたが、アップデートにより変更されました。':
    '天梯會設置排行榜，用角色等級競爭排名。賽季結束時，天梯角色會移到永久角色池。過去曾有不掉傳奇、不能使用博物館等差異，但已經隨更新調整。',
  '引き継ぎ要素は銀行の拡張枠だけです。 シーズンは三か月刻みで設定されており、シーズンを終えるとラダーで育成したキャラクターはエターナルへと送られます。この時装備やゴールド・インベントリの中身も一緒に送られ、これらはラダーへと送ることはできません。また銀行内のアイテムは消失します。':
    '可繼承的要素只有銀行擴充格。賽季以三個月為單位，賽季結束後天梯角色會移到永久角色池，身上的裝備、Gold 與背包內容也會一起移過去，但不能再轉回天梯；銀行內物品會消失。',
  'タウン左の酒場からミッションを選択して突入してください':
    '從城鎮左側的酒館選擇任務即可進入地城。',
  'タウン中央やや左にある薬屋にて一括鑑定ができます。 未鑑定アイテムを所持していると、薬屋ウィンドウの左側に「全て鑑定」というボタンが出ます。':
    '城鎮中央偏左的藥劑店可以一鍵鑑定。持有未鑑定物品時，藥劑店視窗左側會出現「全部鑑定」按鈕。',
  'Ctrl + 左クリックで簡易売買が可能です。':
    '使用 Ctrl + 左鍵即可快速買賣。',
  'タウン右の商人でゴールドを支払うことで行えます':
    '到城鎮右側的商人支付 Gold 即可擴充。',
  'タウン右の鍛冶屋で行えます。 ソケット付きの装備に装着でき、一度装着したら外したりはできません。':
    '到城鎮右側的鐵匠鋪即可鑲嵌。符文只能裝在有插槽的裝備上，而且一旦鑲嵌就無法拆下。',
  'タウン右上のアカデミーでゴールドを支払うことで行えます':
    '到城鎮右上的學院支付 Gold 即可重置天賦。',
  'アイテムにカーソルを合わせて、Shift+左クリックでチャットに貼り付けることができます。':
    '把游標移到物品上，按 Shift + 左鍵即可貼到聊天中。',
  'アイテムにカーソルを合わせて、Shiftで装備中のアイテムと比較できます。':
    '把游標移到物品上，按 Shift 即可和目前裝備中的物品比較。',
  'PTに加入した状態で自身の顔画像を右クリックし、「トグル：準備ができて」を押すことで表示させることができます。表示することでPTリーダーに準備完了を伝えることができます。':
    '加入隊伍後右鍵自己的頭像，選擇「Toggle: Ready」即可顯示綠色劍圖示，用來告知隊長你已準備完成。',
  '右クリックで入れ替えることができます': '右鍵即可替換。',
  'チャットに /help と入力することで一覧を呼び出せます。':
    '在聊天輸入 `/help` 可以叫出指令列表。',
  '一切ないです。しいて言うならギルドチャットが使えることくらい':
    '沒有實質加成。勉強要說的話，就是可以使用公會聊天。',
  'ボスドロップの一番上のものが、表示されているどちらかのアイテムタイプになります。 武器は種類ごとで分かれ、鈍器は物理・魔法の区別あり。防具は部位ごとで素材の区別なし。':
    'Boss 掉落最上方的物品，會是畫面顯示的兩種物品類型之一。武器依種類區分，鈍器還分物理與魔法；防具依部位區分，不區分材質。',
  'どのクラスに適用される効果なのかを判別しやすくしてあります。 たとえばウィザードなら赤、クレリックなら黄色といったようにです。':
    '這是為了讓你容易判斷效果適用於哪個職業。例如巫師是紅色、牧師是黃色。',
  '武器による自動攻撃で発動する追加効果です。 武器の一番下に書かれているものは確率で発動、タレントの一番下にあるマスタリーなどで獲得するものは基本的にクールタイムで発動します。':
    '效果是武器自動攻擊時觸發的追加效果。武器最下方寫的效果會依機率觸發；天賦底部的 Mastery 等來源取得的效果，基本上依冷卻時間觸發。',
  'アイコンが半透明なのが特徴で、エーテル的（100）の数値が耐久度を示す。 武器なら基礎攻撃力33%、防具なら基礎防御力が50％強化されている代わりに、低確率で耐久度が1～10程度減少していき、0となると装備が消滅する。不滅が付いているものは耐久度が減少しない。':
    '乙太裝備的圖示會呈半透明，乙太數值（100）代表耐久度。武器會提高基礎攻擊力 33%，防具會提高基礎防禦力 50%，但有低機率讓耐久減少約 1 到 10；耐久歸零時裝備會消失。帶有不滅的裝備不會減少耐久。',
  '武器による自動攻撃が高速化します。 タレントの一番下にあるマスタリーで獲得できる場合があります。':
    'Rapid Attack 會讓武器自動攻擊加速。有些職業可以透過天賦底部的 Mastery 取得。',
  'マップをマウスホイールで縮小し、ドラッグでスクロールしてみましょう。 余白の大きい先にあることが比較的多いです。':
    '用滑鼠滾輪縮小地圖，再拖曳捲動看看。Boss 房常常在地圖空白較大的方向深處。',
  '左クリック押しっぱで移動している場合、左クリックを押したままカーソルを 顔画像あたりまでドラッグしてから離すことで、前進し続ける状態を作れる。 また自動移動キーというものもあるのでホットキーを参照。':
    '如果你是按住左鍵移動，可以按住左鍵把游標拖到頭像附近再放開，角色會維持前進狀態。遊戲也有自動移動鍵，可參考快捷鍵設定。',
  '“キャンプとログアウト”でいったんタイトル画面に戻ると直ります。':
    '使用「Camp and Logout」回到標題畫面通常就會恢復。',
  'サーバー側の何かしらの都合なのか、日本時間の午前8時と8時半に謎の固まる時間があります':
    '可能是伺服器端因素，日本時間上午 8:00 與 8:30 左右有時會出現短暫卡住。',
  'このゲームにはアイテムもしくは空白が同じマスに重なってしまう不具合があり、アイテム情報と位置情報自体は残っていることが多いため、マスの上にアイテムを置いてからどかし、リログするとひょっこり出てきたりします。':
    '這款遊戲有物品或空白格重疊在同一格的問題。物品資訊與位置資訊通常仍在，可以先把另一個物品放到該格再移開，接著重新登入，有時物品就會重新出現。',
  '基本的にはノーマルの焼き直しであり、同じことを繰り返す。ノーマルとの違いは以下の通り。':
    '惡夢（Nightmare）基本上是普通（Normal）的重跑，需要重複同樣的流程；和普通（Normal）的差異如下。',
  '難易度は上がるが、Superior と Mastery を得たプレイヤーがあまりに強く、そこまで困ることもないはず。':
    '難度會提高，但取得 Superior 與 Mastery 的玩家通常已經很強，理論上不會太卡。',
  'ナイトメアでは属性耐性に30%のペナルティを受ける。ナイトメアの時点ではさほど問題とならないが、次の難易度であるヘルでは最重要となる。よってナイトメアは属性耐性を予習する期間であると言える。':
    '惡夢（Nightmare）會讓元素抗性受到 30% 懲罰。這在惡夢（Nightmare）階段還不算致命，但到了下一個難度地獄（Hell）會變成最重要的門檻。因此，惡夢（Nightmare）可以視為提前準備元素抗性的階段。',
  'ナイトメアではエクセプショナル装備を収集できる。':
    '惡夢（Nightmare）可以開始收集 Exceptional 裝備。',
  'また盾やセット装備にも優秀なものが多い。そして属性耐性を集め、大きく欠けた属性があるならレアの頭・靴・ネックレスなどで調整したり、ソケット付きの防具に属性耐性ルーンを入れたりするといい。':
    '盾牌與套裝裝備也有許多優秀選擇。接著要開始堆元素抗性；如果某個屬性缺口很大，可以用稀有頭盔、靴子、項鍊等部位補足，或在有插槽的防具上鑲嵌屬性抗性符文。',
  'エーテルとルーンを反映させた時の数値を調べる用。':
    '用來試算套用乙太與符文後的武器數值。',
  'ざっくりした目安としては、DPS7≒筋力30≒全パッシブ15≒攻撃能力100。':
    '粗略換算：DPS 7 ≒ 力量 30 ≒ 全 Passive 15 ≒ Attack Rating 100。',
  '非常に危険ではあるが、そのぶんアイテムの収集や経験値稼ぎはしやすくなる。':
    '雖然非常危險，但相對地更適合收集物品與刷經驗。',
  'Lv95以降のレベルアップに必要な経験値が馬鹿げているため、だいたいのプレイヤーはこのあたりで合流する。':
    'Lv95 以後升級所需經驗值非常誇張，多數玩家大約會在這裡開始匯合周回。',
  'このあたりになるとタレントは2種のツリーの Mastery を獲得するような形になっていると思われる。':
    '到了這個階段，天賦通常會變成取得兩條天賦樹 Mastery 的配置。',
  'ヒロイックに入る目安としては、エリートセットが揃っているか、もしくはそれに準じた装備が揃っていること。':
    '進入英雄（Heroic）的門檻，大致是湊齊 Elite Set 或同等級裝備。',
  'DPSでいえば75k相当の働きができていれば一人前であり、100k相当の働きをしていればキャリー側といった印象。':
    '以 DPS 來說，能打出約 75k 的貢獻就算成熟玩家；約 100k 則可視為 carry 端。',
  周回するダンジョン: '周回地城',
  'ヒロイックで周回するダンジョンは現状ではほぼ固定化している。':
    '英雄（Heroic）常見的周回地城目前幾乎已固定。',
  'Act.II - Riven Grotto - King of Riven Grotto\n一番人気。まずアンデッド特攻を持つクルセイダーとクレリックを十全に活かすことができる点。その他にマップの広さが普通で回りやすく、エリアボスであるためボスドロップが多いことが挙げられる。\nAct.IIIの Thule Crypt も同じアンデッドダンジョンだが、アーケイン耐性持ちが多いため劣化でしかない。':
    'Act.II - Riven Grotto - King of Riven Grotto\n最受歡迎。理由是能充分發揮十字軍與牧師的不死族特攻；地圖大小適中、路線好跑，又是區域 Boss，因此 Boss 掉落也多。\nAct.III 的 Thule Crypt 同樣是不死族地城，但 Arcane 抗性的怪物很多，整體只算下位替代。',
  'Act.III - Sylong Sanctuary - Lord Gazzion\n強力なレジェンダリーにミスティック特攻が増えたため、選択肢に挙がるようになってきた。アーケイン耐性が非常に高いため、クルセイダーやクレリックといったアーケイン職は苦手。':
    'Act.III - Sylong Sanctuary - Lord Gazzion\n因強力傳奇裝備增加 Mystical 特攻，逐漸成為可選地城。怪物 Arcane 抗性非常高，十字軍、牧師等 Arcane 職業比較不擅長。',
  'Act.IV - Galeblast Fortress - 前半のミッション\n氷耐性が高く、炎耐性が低いダンジョンであるため、ウィザード・モンク・ローグといった炎属性の職が回りやすい。またヒューマイドが多いため、ヒューマノイド特攻を伸ばせば周回がしやすい。\nダンジョン後半は物理耐性を持つジャイアントが出現するため人気がない。':
    'Act.IV - Galeblast Fortress - 前半任務\n這裡冰冷抗性高、火焰抗性低，巫師、武僧、盜賊等火焰屬性職業比較好刷。Humanoid 數量多，堆 Humanoid 特攻也能提高周回效率。\n地城後半會出現具物理抗性的 Giant，因此不受歡迎。',
  'Act.IV - Ashenflow Peak - 前半のミッション\n炎耐性が高く、氷耐性が低いダンジョンであるため、主にドルイドが中心となったパーティに選ばれやすい。\nこちらもヒューマノイド中心なので、ヒューマノイド特攻が有効。\nダンジョン後半は物理耐性を持つジャイアントや、アーケイン耐性を持つケルベロスがクソ。':
    'Act.IV - Ashenflow Peak - 前半任務\n這裡火焰抗性高、冰冷抗性低，常被以德魯伊為核心的隊伍選用。\n這裡也以 Humanoid 為主，因此 Humanoid 特攻有效。\n地城後半有物理抗性的 Giant，以及 Arcane 抗性的 Cerberus，很難處理。',
  '難易度上昇による強化点はナイトメアと同様で、より厳しくなったものが適用される。':
    '地獄（Hell）的強化方向和惡夢（Nightmare）相同，但數值與壓力都會更嚴苛。',
  '特に属性耐性が厳しく、ナイトメアからヘルで属性耐性がさらに40%減少し、合計すると70%もの減少となる。':
    '元素抗性尤其嚴苛；從惡夢（Nightmare）進入地獄（Hell）後，元素抗性會再降低 40%，合計等於降低 70%。',
  'ヘルに移行するための装備を集めるためにヘルに行きたい、そんな状態になる。':
    '常見卡點是「想去地獄（Hell）收集能轉進地獄（Hell）的裝備」。',
  'ヘル難易度ではエリート装備というLv60以降の装備を収集でき、これが非常に強力。だがナイトメアからヘルにステップアップする敷居が異様に高く、ここが問題となりやすい。解決する手法としてはこれらが挙げられる。':
    '地獄（Hell）難度可以收集 60 級以後的 Elite 裝備，威力非常強。不過，從惡夢（Nightmare）升到地獄（Hell）的門檻異常高，這裡很容易成為卡關點。常見解法如下。',
  'ナイトメアの Matron Maelentia / Lord Szarthax を周回する\nエクセプショナル装備を集めながら、宝箱からエリート装備を狙うような感じになるが、敵からエリート装備がまともに入手できないため、気長になりやすい。':
    '周回惡夢（Nightmare）的 Matron Maelentia / Lord Szarthax\n一邊收集 Exceptional 裝備，一邊從寶箱瞄準 Elite 裝備；因為敵人本身幾乎不會正常掉 Elite 裝備，所以通常需要耐心。',
  'ヘル難易度の Lord Szarthax を倒すと、ヘルのミッション選択画面にヒロイックのチェックボックスが追加される。':
    '擊敗地獄（Hell）難度的 Lord Szarthax 後，地獄（Hell）的任務選擇畫面會新增英雄（Heroic）勾選框。',
  '基本的な構造はヘルと同じだが、敵がさらに強くなるほか、チャンピオンモンスターの比率も増加する。':
    '基本結構與地獄（Hell）相同，但敵人會更強，Champion monster 的比例也會增加。',
  'ノーマル：キャラクターLv25以上、低Lvルーン？ Lv45ルーン確認':
    '普通（Normal）：角色 Lv25 以上；低 Lv 符文？已確認 Lv45 符文。',
  'ナイトメア：キャラクターLv50以上、Lv25～59ルーンを確認':
    '惡夢（Nightmare）：角色 Lv50 以上；已確認 Lv25 到 Lv59 符文。',
  'ヘル：キャラクターLv90以上、Lv39～Lv61まで':
    '地獄（Hell）：角色 Lv90 以上；Lv39 到 Lv61。',
  'ヘルス、マナ、スピリット。 武器の通常攻撃や物理スキル発動時に回復。多段スキルは1回とみなされる。 難易度によるペナルティが存在し、ナイトメアは33%・ヘルは50%減少する。':
    'Health、Mana、Spirit。使用武器普通攻擊或發動物理技能時恢復；多段技能視為一次。此效果會受到難度懲罰：惡夢（Nightmare）減少 33%，地獄（Hell）減少 50%。',
  'ヘルス、マナ、スピリット。 攻撃を受けた時に回復する。ヒットしなくても回復。 難易度によるペナルティが存在し、ナイトメアは33%・ヘルは50%減少する。':
    'Health、Mana、Spirit。受到攻擊時恢復；即使沒有被命中也會恢復。此效果會受到難度懲罰：惡夢（Nightmare）減少 33%，地獄（Hell）減少 50%。',
  '最大75%であり、各難易度ごとにペナルティがかかる。 合算するとナイトメアは105%、ヘルは145%で最大となる。':
    '上限為 75%，且每個難度都會套用懲罰。合計來看，惡夢（Nightmare）需要堆到 105%，地獄（Hell）需要堆到 145% 才能達到上限。',
  '最大50%であり、各難易度ごとにペナルティがかかる。 合算するとナイトメアは60%、ヘルは75%で最大となる。':
    '上限為 50%，且每個難度都會套用懲罰。合計來看，惡夢（Nightmare）需要堆到 60%，地獄（Hell）需要堆到 75% 才能達到上限。',
  '全ステータス、筋力、体力、俊敏、器用、知恵、賢さ、カリスマ。':
    '全能力值、力量、耐力、敏捷、靈巧、智力、智慧、魅力。',
  '物理スキルダメージと攻撃能力の上昇 物理スキルダメージに対する影響が非常に大きい':
    '物理技能傷害與 Attack Rating 提升；對物理技能傷害影響很大。',
  '最大ヘルスの上昇': '最大 Health 增加。',
  '回避率と物理防御の上昇': '閃避率與物理防禦提升。',
  '攻撃能力、受流し、反撃、ブロック率、クリティカルヒット率の上昇 攻撃能力は筋力ほどは上昇しない。':
    'Attack Rating、招架、反擊、格擋率與暴擊率提升；Attack Rating 的提升幅度不如力量。',
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

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function localizePublicTerms(value) {
  return replaceAllTerms(value, PUBLIC_TERM_REPLACEMENTS);
}

function localizeClassOnlyText(value) {
  const text = String(value ?? '');
  const classNames = CLASS_NAME_REPLACEMENTS.map(([from]) => escapeRegExp(from)).join('|');
  const classOnly = new RegExp(`^(?:${classNames}|SK|他|\\s|[、,/／&＋+])+$`);
  if (!classOnly.test(text.trim())) return text;

  let output = text.replace(/\bSK\b/g, '暗影騎士');
  for (const [from, to] of [...CLASS_NAME_REPLACEMENTS].sort((a, b) => b[0].length - a[0].length)) {
    output = output.replace(new RegExp(`\\b${escapeRegExp(from)}\\b`, 'g'), to);
  }
  return output;
}

function localizeClassNamesInReadableText(value) {
  let output = value;
  for (const [from, to] of [...CLASS_NAME_REPLACEMENTS].sort((a, b) => b[0].length - a[0].length)) {
    const term = escapeRegExp(from);
    output = output
      .replace(
        new RegExp(`(?<!圖片:)\\b${term}\\b(?=、|和|等|的|所|有|無法|只能|可以|也|都|用作|使用|對|為|是|將|武器|職業|套裝|Talent|Skill|系)`, 'g'),
        to,
      )
      .replace(new RegExp(`(?<!圖片:)\\b${term}\\b(?=\\s+(?:Skill|Talent|才能))`, 'g'), to)
      .replace(new RegExp(`(?<=、|和|例如|如|由|對|使用|擁有|目標|推薦|適合|大多數|\\(|（)\\s*${term}\\b`, 'g'), to);
  }
  return localizeClassOnlyText(output);
}

function normalizeSourceTerms(value) {
  return replaceAllTerms(value, SOURCE_TERM_REPLACEMENTS);
}

function postprocessTranslation(value) {
  let output = localizeClassNamesInReadableText(localizePublicTerms(replaceAllTerms(value, POSTPROCESS_REPLACEMENTS)));
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

function orderSourcePagesForOutput(outputFile, sourcePages) {
  const orderedFiles = OUTPUT_PAGE_ORDER_OVERRIDES[outputFile] ?? [];
  if (orderedFiles.length === 0) return sourcePages;

  const priorityByFile = new Map(orderedFiles.map((file, index) => [file, index]));
  return sourcePages
    .map((page, index) => ({ page, index }))
    .sort((left, right) => {
      const leftPriority = priorityByFile.has(left.page.file)
        ? priorityByFile.get(left.page.file)
        : Number.POSITIVE_INFINITY;
      const rightPriority = priorityByFile.has(right.page.file)
        ? priorityByFile.get(right.page.file)
        : Number.POSITIVE_INFINITY;
      if (leftPriority !== rightPriority) return leftPriority - rightPriority;
      return left.index - right.index;
    })
    .map(({ page }) => page);
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
  const skipInteractiveDetails = Boolean(INTERACTIVE_TOOL_PAGE_NOTES[page.file]);
  for (const block of page.blocks ?? []) {
    if (block.type === 'heading' || block.type === 'paragraph') {
      texts.push(block.text);
    } else if (block.type === 'list') {
      if (isRedundantHeadingList(page, block)) continue;
      texts.push(...block.items);
    } else if (!skipInteractiveDetails && block.type === 'table') {
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
  return localizeClassOnlyText(shouldTranslateTableCell(value) ? translator.get(value) : translator.local(value));
}

function cleanHeadingText(value) {
  return value.replace(/[!！?？。．.：:；;、,\s]+$/g, '').trim();
}

function isRedundantHeadingList(page, block) {
  if (block.type !== 'list' || block.ordered || block.items.length < 4) return false;
  const sourceHeadings = new Set(
    (page.blocks ?? [])
      .filter((item) => item.type === 'heading' && item.level > 1)
      .map((item) => cleanHeadingText(item.text)),
  );
  if (sourceHeadings.size === 0) return false;
  const matchingItems = block.items.filter((item) => sourceHeadings.has(cleanHeadingText(item))).length;
  return matchingItems >= 4 && matchingItems / block.items.length >= 0.8;
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
    `## ${localizeClassOnlyText(translator.get(page.pageTitle))}`,
    '',
    `- FC2 file：[${page.file}](${page.url})`,
  ];
  if (page.lastModified) lines.push(`- 原站 Last-Modified：\`${page.lastModified}\``);
  lines.push('');

  const interactiveNote = INTERACTIVE_TOOL_PAGE_NOTES[page.file];
  if (interactiveNote) {
    for (const block of page.blocks ?? []) {
      if (block.type !== 'paragraph') continue;
      const text = translator.get(block.text);
      if (text) lines.push(text, '');
    }
    lines.push('> **原站互動工具**');
    for (const note of interactiveNote) lines.push(`> ${note}`);
    lines.push(`> 原站連結：[${localizeClassOnlyText(translator.get(page.pageTitle))}](${page.url})。`);
    return lines.join('\n').replace(/\n{3,}/g, '\n\n').trim();
  }

  let skippedFirstH1 = false;
  const headingIds = new Map();
  let baseSourceHeadingLevel = null;
  for (const block of page.blocks ?? []) {
    if (block.type === 'heading') {
      if (!skippedFirstH1 && block.level === 1) {
        skippedFirstH1 = true;
        continue;
      }
      const headingText = cleanHeadingText(localizeClassOnlyText(translator.get(block.text)));
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
      if (isRedundantHeadingList(page, block)) continue;
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
  const hasInteractiveToolPage = sourcePages.some((page) => INTERACTIVE_TOOL_PAGE_NOTES[page.file]);
  const sourcePolicy = [
    '本頁由 FC2 / atelier3 原站 HTML 重新擷取後繁中化，保留原頁段落、清單、表格欄位與數值；原站圖片、CSS、JavaScript 不搬入公開站。',
    hasInteractiveToolPage ? '互動工具頁僅保留用途摘要與原站連結。' : '',
  ]
    .filter(Boolean)
    .join('');
  return [
    sourcePolicy,
    '',
    `- 檢視日期：\`${reviewedAt}\``,
    `- FC2 來源頁數：${sourcePages.length}`,
    '- 翻譯策略：職業、屬性、難度、天賦與符文採中文優先；英文 item / skill / boss / map 查詢詞按需保留。',
    '- 內容狀態：由 FC2 原站正文生成，不使用舊版摘要句。',
    '',
    '> **快速重點**',
    '> 這是玩家攻略與資料表的繁中化快照，適合查路線、裝備、符文、Recipe、套裝 / 獨特 / Legendary 數值。',
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
    const sourcePages = orderSourcePagesForOutput(outputFile, sourcePagesForOutput(topicMap, manifestByUrl, outputFile));
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

---
title: "Nevergrind Online 十字軍（Crusader / Paladin）坦克與神聖混合指南"
description: "十字軍（Crusader / Paladin）在 Tank 脈絡裡不是單純的高防禦職，而是把板甲、盾牌 threat、暈眩、自補、短暫無敵與神聖 / arcane 範圍傷害放在同一個角色裡。新手可以先把它理解成「能承傷的功能型前排」；進入中後期後，再依隊伍需求切向物理型續航、魔法型 AoE，或 undead / demon 特攻路線。"
sourcePages: []
reviewedAt: "2026-05-05"
sourceLastModified: "N/A"
status: "整理改寫"
---

十字軍（Crusader / Paladin）在 Tank 脈絡裡不是單純的高防禦職，而是把板甲、盾牌 threat、暈眩、自補、短暫無敵與神聖 / arcane 範圍傷害放在同一個角色裡。新手可以先把它理解成「能承傷的功能型前排」；進入中後期後，再依隊伍需求切向物理型續航、魔法型 AoE，或 undead / demon 特攻路線。

- 檢視日期：`2026-05-05`
- 分類：[Nevergrind Online 職業系統總覽](./classes/)
- 延伸閱讀：[進度路線與 FC2 攻略讀法](./progression-roadmap/)、[Set Items](./set-items/)、[Zamtil's Plenitude](./set-items/#zamtils-plenitude)
- 資料來源：Nevergrind Wiki `Paladin`、Fandom `Crusader` / `Classes` / `Races` / `General Game Mechanics`、FC2 / atelier3 `Crusader` 職業頁
- 版本提醒：`Crusader` 與 `Paladin` 名稱在來源間可能不一致；種族加成、技能名稱、threat 數值、rank 斷點與裝備例請以目前遊戲內 tooltip 為準

> **快速重點**
> Fandom 把 `Crusader` 列為 Tank，並描述為可穿 plate armor、混合 melee skills 與 spells 的職業。
> Nevergrind Wiki 的 `Paladin` 說法也接近：defensive hybrid melee、plate armor、stuns、healing，以及對 undead 的強化。
> 種族上可選 `Dwarf`、`Half Elf`、`High Elf`、`Human`、`Seraph`；高階 build 常在魔法型 Judicator 與物理型 Herald / Protector 之間取捨。

<a id="crusader-tank-context"></a>

## 在 Tank 脈絡中的定位

Tank 的基礎任務是建立威脅值（Threat / Aggro）並承受危險窗口。Fandom 的 general mechanics 說明，怪物通常會看誰的 threat 最高；如果脆皮輸出一開場就丟大型 AoE，很容易被怪轉頭。十字軍的特殊之處在於，它不是只靠血量或護甲接怪，而是用多種「打、暈、補、擋、短暫無敵」工具把前排壓力拆開處理。

和另外兩個 Tank 比較時，可以這樣讀：

| Tank | 主要語言 | 和十字軍的差異 |
| ------ | ------ | ------ |
| 戰士（Warrior） | 最直覺的物理前排；Fandom 說明其物理防禦與生命值最高 | 戰士更像標準節奏控制者；十字軍則用法術、治療、stun 與 undead / demon bonus 補出混合價值 |
| 暗影騎士（Shadow Knight） | 攻擊性最強的 Tank，帶 fear、life tap 與 debuff | 暗影騎士靠攻擊壓力與吸血維持節奏；十字軍更常被拿來處理神聖 AoE、無敵窗口與自保 |
| 十字軍（Crusader） | 板甲 + 盾牌 threat + healing + stun + arcane / holy 類輸出 | 不是最單純的肉盾，而是能依地城與隊伍補洞的功能型 Tank |

> **提醒**
> FC2 甚至把十字軍描述成「雖然曾被分類為 Tank，但現在更像範圍 DPS」的玩家觀點。公開筆記中適合把這句理解成 meta 觀察：高階玩家不只問十字軍能不能扛，還會問它能不能同時清怪、補耐性與處理 undead / demon 場景。

<a id="crusader-races"></a>

## 可選種族與取向

Fandom `Crusader` 頁列出的可選種族是 `Dwarf`、`Half Elf`、`High Elf`、`Human`、`Seraph`。`Races` 頁也提醒，種族與起始點數通常不至於把角色玩壞；如果不是要極限 min-max，外觀、頭像與你想長期玩的角色感反而很重要。

| 種族 | Fandom 種族加成重點 | 十字軍讀法 |
| ------ | ------ | ------ |
| 德瓦夫（`Dwarf`） | `+3` arcane / poison resist，`Defense` / `Alteration` cap `+5` | 偏硬派前排與生存；也能服務 `Divine Grace` / `Benevolence` 這類 alteration 工具 |
| 半精靈（`Half Elf`） | 所有 non-casting passive skills `+5`，含 weapon skills、dodge、parry、riposte、offense、defense | 平衡型物理 / 坦克選擇，適合想讓近戰、防禦與反擊能力都更穩的人 |
| 高精靈（`High Elf`） | `Evocation` cap `+10`，mana regen `+2` | 偏魔法型十字軍；`Divine Judgment`、`Holy Wrath`、`Seal of Damnation` 等 evocation / arcane 工具更合拍 |
| 人類（`Human`） | `1h Slash` / `2h Slash` cap `+10`，spirit regen `+2`，fear resist `15` | 泛用且穩；spirit regen 對治療、buff 與長線續航有吸引力，拿不定主意時很安全 |
| 塞拉菲姆（`Seraph`） | `Evocation` / `Alteration` / `Conjuration` cap `+5`，arcane resist `+5` | 法術型與混合型都能吃到；同時補施法被動、治療相關與 arcane 生存 |

> **提示**
> 簡單選法：想玩魔法 / AoE，就先看 `High Elf` 或 `Seraph`；想玩物理前排，就看 `Dwarf` 或 `Half Elf`；想要穩定泛用，就選 `Human`。但這些差距屬於優化層，不必為了種族重開一個自己不喜歡的角色。

<a id="crusader-tools"></a>

## 核心戰術工具

Fandom `Crusader` 頁列出的技能 threat 顯示，十字軍有多個能主動建立 threat 的技能，而且部分技能在裝備盾牌時會放大 threat。

| 技能 | 來源重點 | 實戰讀法 |
| ------ | ------ | ------ |
| `Zealous Slam` | Fandom 列為 225% threat、taunt target；裝盾時 threat amplified | 單體開怪與穩住目標的核心語言之一 |
| `Rebuke` | Fandom 列為 180% threat，cone 3 stagger，裝盾時 threat amplified | 面對多怪或前排壓力時，用來補範圍 threat 與打斷節奏 |
| `Vengeance` | Fandom 列為 150% threat，taunt target，並讓下一次物理攻擊有 riposte 互動 | 讓十字軍不是純施法前排，仍保留近戰反擊語言 |
| `Consecrate` | Fandom 列為 200% threat，可疊自身 `Consecrate`，提高 all resists | FC2 也把它當成物理型十字軍補耐性與循環的重要技能 |
| `Holy Wrath` | Fandom 說明會 stun；FC2 提到可作為 `Rampage` 對策 | 危險怪物連擊或關鍵技能前，用 stun 爭取安全窗口 |
| `Seal of Sanctuary` | Fandom 說明短時間保護自身免受傷害，並強化 healing 與 arcane damage | 戰鬥前或高壓組合出現時使用，是十字軍最像功能型 Tank 的保命按鍵 |
| `Divine Grace` / `Benevolence` | Fandom 列為單體與群體治療工具 | 自保與補位能力強，但治療也會影響 threat 節奏，不能取代正式 healer 的全程責任 |
| `Blessed Hammer` / `Divine Judgment` | Fandom 說明可造成 arcane damage，且對 undead / demon 有 bonus | 讓魔法型十字軍在特定地城中兼任 AoE / 特攻輸出 |

<a id="crusader-build-directions"></a>

## 物理型與魔法型怎麼分

FC2 把十字軍拆成偏魔法與偏物理的裝備 / talent 讀法。這些不是唯一答案，但很適合用來理解中後期轉向。

| 方向 | 核心技能 / 斷點 | 適合情境 | 注意 |
| ------ | ------ | ------ | ------ |
| 魔法型（`Judicator`） | `Blessed Hammer`、`Divine Judgment`、`Seal of Damnation`、`Seal of Sanctuary` | 對 undead / demon、Riven Grotto 類目標、需要 AoE 或 arcane 方向時 | FC2 把 `Superior Blessed Hammer` rank 29 視為早期目標，因為可達到 bonus hit `+4`；實際仍要看目前 tooltip 與裝備 rank |
| 物理型（`Herald` / `Protector`） | `Consecrate`、`Zealous Slam`、`Holy Wrath`、`Mastery: Harbinger` | 單體、較不挑地城、需要穩定前排續航時 | FC2 認為物理型對 Enchanter 支援依賴很高；其測試推估 `Mastery: Harbinger` rank 32 可把 `Consecrate` cooldown 壓到約 1.5 秒，需以目前版本確認 |
| 混合前排 | shield threat、stun、自補、耐性裝 | 小隊缺前排控制或需要 someone to hold the room 時 | 不要同時追所有方向；先決定這場要補 threat、生存、AoE，還是 undead / demon 特攻 |

> **提示**
> 如果你還在前中期，先把十字軍玩成穩定前排：補 armor、resists、stun、healing 與常用技能 rank。等能穩定刷 Hell / Heroic 後，再追 FC2 那種以技能斷點與特定裝備組合為核心的高階模板。

<a id="crusader-magic"></a>

### 魔法型操作重點

魔法型的核心是把 `Judicator`、`Blessed Hammer` rank、arcane damage 與施法節奏串起來。FC2 的裝備例會先追 `Superior Blessed Hammer` rank 29，再在不掉出這個斷點的前提下補 `Mastery: Disciple`，用來縮短 `Blessed Hammer` 相關效果的冷卻。

實戰上，`Blessed Hammer`、`Divine Judgment`、`Seal of Damnation` 通常是有 cooldown 就輪流打；因為 `Blessed Hammer` 是 cone AoE，優先打敵人聚在一起的位置。`Seal of Sanctuary` 則不只是保命，也能在啟動期間提高 healing 與 arcane damage，適合開戰前或危險怪物組合出現時使用。

<a id="crusader-physical"></a>

### 物理型操作重點

物理型比較像穩定前排與單體續航。FC2 的讀法是 talent tree 先看 `Herald`，技能則追 `Consecrate` 與 `Zealous Slam`：`Consecrate` cooldown 好了就打，空窗用 `Zealous Slam` 補傷害與 threat。

`Consecrate` 本身的傷害不一定是亮點，但它能堆疊 all resists，這讓物理型十字軍在高壓地城更像「靠循環維持硬度」的前排。`Holy Wrath` 則適合拿來處理 `Rampage` 或在 `Consecrate` 容易被迴避的時候補一個 stun 窗口。

<a id="crusader-shared-play"></a>

## 共用生存與資源管理

無論走魔法或物理，十字軍都應該把這幾個按鈕當成共用核心：

| 工具 | 用法 |
| ------ | ------ |
| `Seal of Sanctuary` | 開戰前、危險怪物組合、被集火或需要補爆發時使用；它同時是無敵窗口與輸出 / 治療放大器 |
| `Holy Wrath` | 對 `Rampage` 或危險連擊留 stun；物理型也可配合 `Consecrate` 節奏使用 |
| `Divine Grace` | 單體即時補血，適合救自己或關鍵隊友；治療也會產生 threat，使用時要看戰場節奏 |
| `Benevolence` | 群體補血工具；可補位，但不要把十字軍寫成能完全取代 healer |
| `Gra` rune / hit mana 回復 | FC2 提到 rapid attack 與 hit mana recovery rune 相性好；既有 [Runes 指南](./runes/#rune-tactical-uses) 也把十字軍列為可用 `Gra` 穩續航的例子 |

天賦點不足時，先保主路線：魔法型優先 `Judicator` 與 `Blessed Hammer` 斷點，物理型優先 `Herald`、`Consecrate` 與 `Mastery: Harbinger`。多出的點數再考慮 `Stamina`、`Divine Grace`、`Benevolence` 或 `Seal of Sanctuary` 這類提高容錯的功能點。

<a id="crusader-gear-team"></a>

## 裝備與隊伍協作

十字軍能穿 plate，也能使用多種近戰武器與弓術欄位；Fandom 也提到它取得 dual wield，但主要常被理解成能在副手裝 caster weapon 的彈性。作為 Tank 時，盾牌很重要，因為 general mechanics 說所有職業都能用盾牌格擋部分物理或 magic nuke 傷害，而十字軍本身又有多個「裝盾時 threat amplified」的技能。FC2 的高階裝備例則更偏「把十字軍當範圍 DPS 或單體輸出前排」來配，盾牌不一定出現在每個輸出模板裡。

裝備判斷可以先問三件事：

1. 這件裝有沒有讓我更穩：armor、stamina、all resists、stun / silence resistance、block、healing 或 resource。
2. 這件裝有沒有讓核心循環到斷點：`Blessed Hammer`、`Consecrate`、`Zealous Slam`、`Judicator`、`Herald` 或相關 mastery。
3. 這件裝有沒有服務地城目標：undead / demon bonus、arcane damage、enemy resistance reduction、magic find 或特定 route。

<a id="crusader-magic-gear"></a>

### 魔法型裝備例

FC2 的魔法型裝備例核心是讓 `Superior Blessed Hammer` 先達到 rank 29，然後維持這個斷點去補 `Mastery: Disciple`、`Judicator`、arcane damage、undead damage、magic find 與耐性。下面是適合當 farm / gambling / trade 關鍵字的候選，不是每個版本都要照抄的固定配裝。

| 部位 / 方向 | FC2 裝備例關鍵字 | 取捨重點 |
| ------ | ------ | ------ |
| 武器 / set 核心 | `Edarion's Soulfury`、`Edarion's Bravado` | 十字軍 elite set 的核心候選；戒指 roll 會影響能不能更輕鬆撐到 `Blessed Hammer` rank 29 或後續 mastery 目標 |
| 頭部 | `Charlatan's Crest` | 追 `All Talents`、屬性傷害與 rare drop / magic find；若只缺 rank，仍要比較套裝或 rare 部位是否更划算 |
| 胴體 | `Gwendolyn's Might`、`Fanatic's Sanctuary` | `Gwendolyn's Might` 偏高階輸出 / farm；若 `Edarion` 戒指或項鍊 roll 不夠，FC2 提到可用 `Fanatic's Sanctuary` 補 rank |
| 太腿 / 腿部 | `Dwarven Zeal Legplates`、`Zamtil's Plenitude` | 前者偏 undead 特攻；後者是高壓地城補 all resists 與控場抗性的跨職業借 slot |
| 弓 / ranged slot | `Stormcaller Bow`、`Demonslayer` | `Stormcaller Bow` 可在差一點 talent 時補洞；若 talent 已足，FC2 提到 legendary bow `Demonslayer` 的 undead 特攻可成為輸出候選 |
| 飾品 | `Asaph's Allure`、rare amulet | `Asaph's Allure` 可補 arcane / talent 方向；rare amulet 則看 `All Talents`、`Judicator`、抗性與資源是否命中 |

> **提醒**
> FC2 頁面把技能名寫成 `Blessed Hummer`，Fandom 與本指南採 `Blessed Hammer`。公開筆記中以 Fandom / 遊戲內技能名為主，遇到外部頁面拼字不同時用技能效果與 icon 對照。

<a id="crusader-physical-gear"></a>

### 物理型裝備例

物理型裝備更重視 `Consecrate` 與 `Zealous Slam` 的循環、`Mastery: Harbinger`、strength、attack ability、hit mana recovery 與高 socket 工具欄。FC2 的建議方向是先用 set / talent 裝把循環撐起來，等拿到更強 all talents 或 strength 裝後再逐步拆套。

| 部位 / 方向 | FC2 裝備例關鍵字 | 取捨重點 |
| ------ | ------ | ------ |
| 武器 / all talents | `Edarion's Soulfury`、`Firmament Staff of the Crystal Sea`、`Thoth Mindlink Staff` | 前期可先靠 `Edarion` set 撐職業斷點；取得高 `All Talents` legendary weapon 後，FC2 才會討論拆 set |
| 頭部 | `Uncle Herschel's Visage`、`Spinalzz's Vigil` | 都偏 strength / talent 方向；`Spinalzz's Vigil` 是跨職業 set 頭，採用與否取決於 skill enhancement 是否命中 |
| 手 / 腰 / 腕 | `Marshal Gauntlets Iniquity`、`Hulking Storm Belt`、`Deathly Usher's Bracers` | 拆 set 後的 strength 裝候選；適合物理型追單體輸出與 `Consecrate` 循環上限 |
| 弓 / ranged slot | `Demetrium's Ballista` | FC2 set 頁列為 `Socketed (1-6)`；重點是高 socket roll 與 rune space，不是每把都達到上限 |
| 戒指 | `Circle of Death`、`Edarion's Bravado` | `Circle of Death` 偏 strength；若要 boost `Mastery: Harbinger`，FC2 會回頭看 `Edarion` set ring 的 roll |

> **提示**
> 物理型若常缺 mana，不要只加傷害。先看 `Gra` 類 hit mana recovery、攻擊頻率與 ranged slot / 副手工具裝，讓循環不中斷通常比多一點帳面 strength 更有感。

FC2 的魔法型十字軍裝備例提到，雖然 `Consecrate` 可疊抗性，但高壓地城仍可能需要額外抗性腿；像 [Zamtil's Plenitude](./set-items/#zamtils-plenitude) 這種跨職業抗性裝就屬於「為了通過高難度生存檢查而借 slot」的案例。

隊伍上，十字軍和支援職的關係很密切。恩路者 / 幻術師（Enchanter）提供的 haste / control 會改善部分循環；吟遊詩人（Bard）則能用歌曲提高團隊節奏與容錯。相反地，如果輸出和治療在十字軍還沒建立 threat 前就爆發，十字軍再硬也很難把每隻怪立刻拉回來。

<a id="crusader-source-notes"></a>

## 讀來源時的注意事項

- Fandom 適合確認職業分類、技能名、threat、shield threat 與基礎 mechanics。
- Fandom `Races` 適合確認可選種族與種族加成；其中「種族不太會把角色玩壞」屬於社群 wiki 建議，仍可當新手安心提醒。
- Nevergrind Wiki `Paladin` 是舊式 / 官方 wiki 命名脈絡，適合確認「defensive hybrid melee、plate armor、stun、healing、undead」這條核心身份。
- FC2 適合讀高階 build、rank、裝備例與玩家 meta，但不要把它寫成官方規則。
- FC2 裝備例中的 socket 數、rank、rare amulet roll 與 legendary 候選都要回遊戲內 tooltip 核對；本指南只保留「為什麼看這個部位」的判斷邏輯。
- `Crusader` / `Paladin` 名稱不一致時，優先看技能組：板甲、stun、healing、undead / demon bonus、shield threat 與神聖 / arcane 工具。

## 參考資料

- [Nevergrind Online Wiki: Classes](https://nevergrind-online.fandom.com/wiki/Classes)
- [Nevergrind Online Wiki: Races](https://nevergrind-online.fandom.com/wiki/Races)
- [Nevergrind Online Wiki: General Game Mechanics](https://nevergrind-online.fandom.com/wiki/General_Game_Mechanics)
- [Nevergrind Online Wiki: Crusader](https://nevergrind-online.fandom.com/wiki/Crusader)
- [Nevergrind Online Wiki: Warrior](https://nevergrind-online.fandom.com/wiki/Warrior)
- [Nevergrind Online Wiki: ShadowKnight](https://nevergrind-online.fandom.com/wiki/ShadowKnight)
- [Nevergrind Wiki: Paladin](https://nevergrind.com/wiki/index.php?title=Paladin)
- [FC2 攻略 DB：Crusader](https://atelier3.web.fc2.com/ngo/crusader.html)
- [FC2 攻略 DB：Edarion set](https://atelier3.web.fc2.com/ngo/edarion.html)
- [FC2 攻略 DB：Fanatic set](https://atelier3.web.fc2.com/ngo/fanatic.html)
- [FC2 攻略 DB：Asaph set](https://atelier3.web.fc2.com/ngo/asaph.html)
- [FC2 攻略 DB：Demetrium set](https://atelier3.web.fc2.com/ngo/demetrium.html)
- [FC2 攻略 DB：Spinalzz set](https://atelier3.web.fc2.com/ngo/spinalzz.html)
- [FC2 攻略 DB：Zamtil set](https://atelier3.web.fc2.com/ngo/zamtil.html)
- [FC2 攻略 DB：Unique Head](https://atelier3.web.fc2.com/ngo/uhead.html)
- [FC2 攻略 DB：Unique Chest](https://atelier3.web.fc2.com/ngo/uchest.html)
- [FC2 攻略 DB：Unique Bracers](https://atelier3.web.fc2.com/ngo/ubracer.html)
- [FC2 攻略 DB：Unique Legs](https://atelier3.web.fc2.com/ngo/uleg.html)
- [FC2 攻略 DB：Unique Bow](https://atelier3.web.fc2.com/ngo/ubow.html)
- [FC2 攻略 DB：Unique Gloves](https://atelier3.web.fc2.com/ngo/uglove.html)
- [FC2 攻略 DB：Unique Belt](https://atelier3.web.fc2.com/ngo/ubelt.html)
- [FC2 攻略 DB：Unique Ring](https://atelier3.web.fc2.com/ngo/uring.html)
- [FC2 攻略 DB：Legendary](https://atelier3.web.fc2.com/ngo/legendary.html)
- [FC2 攻略 DB：Warrior](https://atelier3.web.fc2.com/ngo/warrior.html)

---

> **版本提醒**
> 本頁是玩家攻略與社群資料的繁中整理版；技能、裝備、掉落、配方與版本敏感數值，請以目前遊戲內 tooltip / UI 與官方公告為準。

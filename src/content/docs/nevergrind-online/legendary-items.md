---
title: "Nevergrind Online 傳奇裝備（Legendary Items）清單筆記"
description: "這份 Legendary Items 筆記把玩家整理的試算表當成查裝索引：先用 Quality、Slot、Proficiency、Level 篩出角色真的能穿的裝備，再看 All Talents、Tree Talents、Specific Talent、Specific Skill % 與核心攻防詞綴。資料表目前整理 65 件 legendary，分成 No"
sourcePages: []
reviewedAt: "2026-05-05"
sourceLastModified: "N/A"
status: "整理改寫"
---

這份 Legendary Items 筆記把玩家整理的試算表當成查裝索引：先用 `Quality`、`Slot`、`Proficiency`、`Level` 篩出角色真的能穿的裝備，再看 `All Talents`、`Tree Talents`、`Specific Talent`、`Specific Skill %` 與核心攻防詞綴。資料表目前整理 65 件 legendary，分成 Normal / Exceptional / Elite 三段；實際數值與掉落狀態仍以遊戲內 tooltip 為準。

- 檢視日期：`2026-05-05`
- 分類：[Nevergrind Online 物品與戰利品總覽](./items-loot/)
- 資料來源：[Swiftyhorn's Nevergrind Online - Legendary Items](https://docs.google.com/spreadsheets/d/1Do2qcmxTgIuzzhTcagiydvEu-TI86JoT5BOPFVuN0vA/edit?gid=1080992867#gid=1080992867)、FC2 / atelier3 攻略 DB legendary 與 rune select 頁
- 版本提醒：試算表、公開 wiki 與遊戲內版本可能不同步；交易、鑲嵌高價 rune 或判斷 BiS 前，請先回遊戲內 tooltip 核對

> **快速重點**
> 這份表比較適合拿來做「候選裝備索引」，不是直接照表宣告 BiS。
> 目前讀到 65 筆 item：Normal 22 件、Exceptional 21 件、Elite 22 件，等級從 9 到 75。
> 表格中的部分 roll range 可能被試算表自動格式化影響；看到可疑數字時，優先用圖片或遊戲 tooltip 確認。

## 試算表結構

這份 workbook 主要有四個 sheet：

| Sheet | 用途 | 筆記 |
| ------ | ------ | ------ |
| `Main Table` | Legendary item 主資料 | 65 筆有效 item，欄位一路展開到 `Stat 23` |
| `Images 1` / `Images 2` | 範例圖片 | 用來核對 tooltip、圖示與數值 |
| `Affixes` | 詞綴名稱整理 | 讀到 141 個 sorted affix 名稱 |

`Main Table` 前段欄位可以先分成幾組看：

| 欄位 | 怎麼用 |
| ------ | ------ |
| `Name`、`Base` | 先確認物品名稱與底材 |
| `Slot`、`Proficiency` | 判斷角色能不能穿、是不是符合武器 / 防具 proficiency |
| `Quality`、`Level` | 判斷裝備階段，Normal / Exceptional / Elite 大致對應前期、中期、後期 |
| `Armor`、`Block`、`Base Damage`、`Base Attack Speed`、`DPS` | 看基礎防禦、格擋或武器輸出底線 |
| `Class Talents`、`All Talents`、`Tree Talents`、`Specific Talent` | 看天賦加成是否真的命中 build |
| `Skill 1 %` 到 `Skill 4 %` | 看特定技能加成與 proc / chance 類線索 |
| `Stat 1` 到 `Stat 23` | 逐條看固定詞綴與隨機詞綴方向 |

> **提醒**
> 像 `1-3`、`2-4` 這種 roll range 在試算表工具裡很容易被當成日期或序號。整理 build 時，不要只複製匯入後的數字；要回原始 tooltip 圖片或遊戲內文字確認。

## 品質與等級分佈

| Quality | 件數 | 等級範圍 | 判斷方式 |
| ------ | --: | ------ | ------ |
| `Normal` | 22 | 9-35 | 前期成形、補關鍵抗性或技能方向，不一定值得重資源強化 |
| `Exceptional` | 21 | 38-55 | 中期 build 開始定型，可以留意能不能接到後期路線 |
| `Elite` | 22 | 59-75 | 後期候選裝，才比較值得認真比較 roll、socket 與 rune plan |

部位覆蓋很平均，大多數 slot 都有 3 件跨階段 item；`2h Blunt`、`Chest`、`Magic Offhand` 各有 4 件，`2h Staff` 有 2 件。這代表查表時最好先用 slot 篩選，不要只從整份清單硬找名字。

## 代表性裝備速查

下面這張表是從來源試算表與摘要內容整理出的「先看這幾件」版本；它適合拿來快速建立印象，但不取代完整表格、tooltip 圖片或遊戲內數值核對。

| 裝備名稱 | 等級 | 部位 | 關鍵屬性 / 備註 |
| ------ | --: | ------ | ------ |
| `Firmament Staff of the Crystal Sea` | 72 | 兩手杖 / `2h Staff` | `All Talents`、全屬性、magic find、施法速度，是 caster 向高階候選 |
| `Gloom Harvester` | 70 | 兩手斬擊 / `2h Slash` | `All Talents`、health / mana leech、力量、體力與多種屬性傷害 |
| `Starlight Atmos` | 75 | 盾牌 / `Shield` | 全抗、體力、智慧、施法速度與 block rate，偏防禦與 caster shield |
| `Treewind's Earthcaller` | 70 | 兩手鈍器 / `2h Blunt` | `All Talents`、全屬性、全抗、mana leech、magic find 與 `Effect: Earthcaller` |
| `Himmelsdolch` | 73 | 單手穿刺 / `1h Pierce` | `All Talents`、全屬性、exp find，並帶 undead / demon 特攻方向 |
| `Reito Doku` | 68 | 弓術 / `Bow` | FC2 `Rune Select` 用作高速 legendary bow 例子；`Socketed (2-4)`、高 attack speed 與 bow talents 讓 `Cros` / `Rok` / `Targ` 順位需要回實物比較 |
| `Mosby's Ancient Crown` | 72 | 頭部 / `Head` | `All Talents`、體力、智慧、魅力、spirit、magic find 與 fear resist；FC2 `Rune Select` 也把它當成可多角色輪用的 `Marr` farm 防具候選 |
| `Saladin's Makhalib` | 68 | 單手斬擊 / `1h Slash` | 物理傷害、attack speed、health / mana leech，並偏 humanoid / giant 特攻 |
| `Hydrafury Whorl` | 44 | 戒指 / `Ring` | `All Talents`、全屬性、attack、spell damage、magic find，中期戒指候選 |
| `Ginjirou's Emerald Sash` | 71 | 腰帶 / `Belt` | `All Talents`、agility / dexterity、全抗、run speed、dragonkin 特攻 |
| `Witherstorm` | 51 | 盾牌 / `Shield` | `All Passive Skills`、全抗、block rate、magic damage reduction |
| `Olivia's Chain of Fealty` | 12 | 胴體 / `Chest` | 低等就有 `All Talents`、多屬性、全抗與 magic find，前期過渡價值高 |
| [Cryptic Paragon（Haniwa）](./cryptic-paragon-haniwa/) | 75 | 單手鈍器 / `1h Blunt` | `All Talents`、隨機技能強化、全抗、全法術傷害、undead 特攻，caster / support 長期目標 |

## 快速索引

### 普通階級（Normal）

`Death Wish`、`Carpathian Mallet`、`Olivia's Chain of Fealty`、`Goremaggon's Bracer`、`Gaia's Wrath`、`Dyne's Golden Girdle`、`Painbearer's Tome`、`Destructor's Punishment`、`Kingdom's Reckoning`、`Pendleton's Exquisite Knickers`、`Charlemagne's Eminence`、`O'Donnell's Frostweaver`、`Pallbearers's Tome`、`Rasoir Brûlant`、`Icy Punisher`、`Falkland's Refuge`、`McQuaid's Heraldry`、`Crepesculan Lavalier`、`Mercator's Globetrotters`、`Zamza's Glaive`、`Naiko's Cinder`、`Fippy's Shoulder Spikes`

### 進階階級（Exceptional）

`Quantum Harmony Crystal`、`Volga's Aurora Robe`、`Fist of the Titan`、`Ameno Ohabari`、`Zebulon's Bloodbath`、`Astrakhan's Griffon Veil`、`Hydrafury Whorl`、`Kylorean Frostshard Bracers`、`Boneclasp`、`Scaled Hierophant Leggings`、`Dhampyre's Lurid Shawl`、`Umkhulu Inkemba`、`Pendant of King Chigowitz`、`Mobius Buster`、`Sinister Bone Sabatons`、`Caitlin's Hawkstrike Bow`、`Victor's Chains of Carthage`、`Goliath's Pendulum`、`Witherstorm`、`Xeronarth's Token`、`Karakum's Orchid`

### 精英階級（Elite）

`Firmament Staff of the Crystal Sea`、`Gloom Harvester`、`Saladin's Makhalib`、`Prodigal Thunderguards`、`Starlight Atmos`、`Treewind's Earthcaller`、`McMurdo's Twig`、`Himmelsdolch`、`Agathor's Wurmslaying Boots`、`Reito Doku`、`Damachi's Halycon Cloak`、`Grove Warder's Greaves`、`Ginjirou's Emerald Sash`、`Fuvu Kifo`、`Argent Dread Wristguards`、`Lunatic's Seal`、`Mosby's Ancient Crown`、`Honored Chains of Mallorca`、`Monark's Abstruse Relic`、`Stone of Miracles`、`Bettencourt's Imbued Pauldron's`、`Beads of Chilaga`

## 怎麼判斷一件傳奇（Legendary）裝

查到一件 legendary 後，建議照這個順序看：

1. `Level` 是否接近目前角色，避免為了名字硬穿低階裝。
2. `Slot` 和 `Proficiency` 是否符合職業，尤其是 weapon、shield、armor type。
3. 基礎值是否過關：武器看 damage / attack speed / DPS，防具看 armor / block。
4. 天賦線是否命中 build：`All Talents`、`Tree Talents`、`Specific Talent`、`Class Talents`。
5. 技能線是否真的有用，不要被高百分比但錯技能的 roll 迷惑。
6. 生存線是否補到高難度門檻：`All Res %`、`Res Physical %`、`All Status Res %`、health / mana / spirit。
7. 輸出線是否和流派一致：物理、元素、spell power、enemy resistance reduction、attack speed 或 cast rate。
8. 是否值得投入 [符文](./runes/)：普通過渡裝先不要塞高價 rune。

## 值得優先看的詞綴

| 類型 | 詞綴例子 | 看法 |
| ------ | ------ | ------ |
| 天賦與技能 | `All Talents`、`Tree Talents`、`Specific Talent`、`Specific Skill %` | 後期價值很高，但要命中核心技能才算真正有效 |
| 施法與輸出節奏 | `Faster Cast Rate`、`Increased Attack Speed %`、`Double Attack` | 會直接影響 rotation 手感與輸出窗口 |
| 物理與元素傷害 | `Enhanced Damage %`、`All Spell Damage %`、`Fire Damage %`、`Arcane Damage to Melee (Flat)` | 先確認你的 build 是 spell、melee、hybrid，避免混錯方向 |
| 破抗與抗性 | `Reduce Enemy Res Fire %`、`All Res %`、`Res Physical %`、`All Status Res %` | Hell 或高難度常比單純面板更重要 |
| 資源與續戰 | `Health Leech`、`Mana Leech`、`Mana Regen`、`Spirit Regen` | 長時間 farm 與 boss 戰會放大這些詞綴的價值 |
| 刷寶 | `Magic Find %`、`Gold Find %`、`Exp Find %` | 有餘裕再堆，不能壓垮輸出與生存 |
| 特殊效果 | `Effect: Earthcaller`、`Effect: Bloodbath`、`Effect: Mobius Crash` 等 | 通常是 legendary 最值得回 tooltip 確認的部分 |

## 詞綴中文速查

| 詞綴 | 中文理解 | 裝備判斷重點 |
| ------ | ------ | ------ |
| `All Talents` / `All Passive Skills` | 所有才能 / 所有被動技能 | 通常是高價值詞綴，但仍要看職業與技能循環是否吃得到 |
| `Enhanced Damage %` / `Enhanced Armor %` | 強化武器傷害 / 防具防禦 | 武器和防具的基礎值越好，這類百分比越有價值 |
| `Magic Find %` / `Exp Find %` | 魔法物品尋獲 / 經驗取得 | 適合 farm 裝，但不要為了刷寶壓垮生存與輸出 |
| `Faster Cast Rate` / `Increased Attack Speed %` | 施法速度 / 攻擊速度 | 會影響 rotation 手感、breakpoint 與輸出窗口 |
| `Health Leech` / `Mana Leech` / `Spirit Regen` | 吸血、吸魔、spirit 回復 | 長時間 farm、boss 戰與高難度續戰特別重要 |
| `Res Fire %` / `Res Ice %` / `Res Blood %` 等 | 各元素或狀態抗性 | Hell 或高難度先看抗性缺口，再追求面板 |
| `Absorb All %` / `Absorb Fire %` 等 | 吸收傷害 | 不是單純抗性，實戰價值要看敵人傷害型態 |
| `Reduce Enemy Res Fire %` 等 | 降低敵方元素抗性 | caster、元素 melee、hybrid build 的傷害放大來源 |
| `Strength` / `Stamina` / `Agility` / `Dexterity` / `Wisdom` / `Intelligence` / `Charisma` | 基礎屬性 | 先看職業主要屬性，再看是否補到生存或資源 |
| `Specific Skill %` | 特定技能強化 | 高 roll 但錯技能也可能沒用，必須命中核心技能 |
| `Run Speed` | 移動速度 | farm 與跑圖體感很好，但通常不能取代核心攻防詞綴 |

## 特殊觸發效果

傳奇武器常帶有獨特 `Effect:` 詞綴。這類效果通常比單純數字更需要回 tooltip 或實戰測試確認，因為它可能影響清怪方式、單體爆發、控場或元素路線。

常見名稱包含：

- `Effect: Earthcaller`
- `Effect: Bloodbath`
- `Effect: Midnight Glacier`
- `Effect: Final Heaven`
- `Effect: Reinigung`
- `Effect: Mobius Crash`
- `Effect: Poison Barrage`
- `Effect: Voltage Flux`

> **提示**
> Legendary 的數值通常有 roll range。追求 perfect roll 是後期樂趣之一，但如果裝備本身只是過渡用途，先不要為了追頂標投入太多 rune、升級或交易成本。若裝備帶有 `Ethereal` 或 `Indestructible` 類特殊屬性，也要一起看基礎性能與耐久風險。

## 和既有裝備筆記怎麼接

這份清單是「找名字與篩候選」用；真正做裝備決策時，還是要回到整體角色路線：

- 先用 [物品與戰利品總覽](./items-loot/) 判斷 magic find、商店、升級與掉落邏輯。
- 如果這件裝備有 socket 或會穿很久，再看 [符文（Runes）指南](./runes/)。
- 如果要用 gold 追特定部位或 elite 候選，先看 [賭博（Gambling）指南](./gambling/)，確認品質階級、圖示與版本規則。
- Caster / support 類高階武器可以參考 [Cryptic Paragon（Haniwa）](./cryptic-paragon-haniwa/) 的判斷方式：名字重要，但 roll、技能、天賦與 build 契合度更重要。

## 常見誤區

- 看到 `Elite` 就直接當 BiS，忽略職業 proficiency 與技能 roll。
- 只看 `Magic Find %`，把生存和輸出壓到無法穩定 farm。
- 把 roll range 的匯入值當成絕對數字，沒有回 tooltip 確認。
- 為了穿 legendary 犧牲抗性、資源或核心技能 breakpoint。
- 低等 legendary 明明只是過渡裝，卻投入太多升級與高階 rune。

<a id="fc2-legendary-full-table"></a>

## FC2 Legendary 全量表

FC2 的 Legendary 頁已整理成 [FC2 Legendary 全量表](./fc2-legendary-table/)。既有本文保留查裝策略與判斷流程；逐列數值與 mods 以全量表為主。

## 參考資料

- [Swiftyhorn's Nevergrind Online - Legendary Items](https://docs.google.com/spreadsheets/d/1Do2qcmxTgIuzzhTcagiydvEu-TI86JoT5BOPFVuN0vA/edit?gid=1080992867#gid=1080992867)
- [FC2 攻略 DB：Legendary](https://atelier3.web.fc2.com/ngo/legendary.html)
- [FC2 攻略 DB：Rune Select](https://atelier3.web.fc2.com/ngo/runeselect.html)

---

> **版本提醒**
> 本頁是玩家攻略與社群資料的繁中整理版；技能、裝備、掉落、配方與版本敏感數值，請以目前遊戲內 tooltip / UI 與官方公告為準。

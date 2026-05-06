---
title: "Nevergrind Online 牧師（Scion）輸出指南"
description: "Scion 牧師的核心不是把牧師（Cleric）當純補，而是用 Condemnation、Deliverance、Sacred Revelation、Holy Sanctuary、Smite 與 Force of Glory 串出高頻率爆發。這套玩法適合單刷、farm undead / demon 區域，或在隊伍安全時把牧師轉成高火力施法職。"
sourcePages: []
reviewedAt: "2026-05-06"
sourceLastModified: "N/A"
status: "整理改寫"
---

`Scion` 牧師的核心不是把牧師（Cleric）當純補，而是用 `Condemnation`、`Deliverance`、`Sacred Revelation`、`Holy Sanctuary`、`Smite` 與 `Force of Glory` 串出高頻率爆發。這套玩法適合單刷、farm undead / demon 區域，或在隊伍安全時把牧師轉成高火力施法職。

- 檢視日期：`2026-05-06`
- 前置閱讀：[Nevergrind Online 牧師（Cleric）指南](/cleric/)
- 技能速查：[Nevergrind Online 牧師技能參考（Twloli）](/cleric-skills-twloli/)
- 資料來源：來源摘要、FC2 牧師裝備範例、Nevergrind Wiki 牧師（Cleric）頁、Fandom 牧師（Cleric）頁、Xackery class list
- 版本提醒：本文的 rank 目標來自 來源摘要，屬於 build 方向，不是永久固定數值；實際點法請以遊戲內 tooltip、目前 patch 與裝備加成後的 breakpoints 為準

> **快速重點**
> 這套配法比較像 `Scion` 核心加上 `Arbiter` 的 `Condemnation`，不是完全只點單一天賦樹。
> 爆發窗口是 stun 目標後接 `Deliverance`，並用 `Condemnation` 處理 cone / 多目標與 undead / demon。
> 裝備先補 all talents / 牧師（Cleric） skill、casting haste、spirit / mana sustain；追高火力前要先解決資源和 aggro。

## 這套流派（build）在追什麼

官方 Nevergrind Wiki 的牧師（Cleric）頁把 `Scion` 天賦列為 `Smite`、`Deliverance`、`Holy Sanctuary`、`Sacred Revelation`、`Mastery: Augury` 等輸出相關能力；`Arbiter` 則包含 `Condemnation`、`Force of Glory`、`Seal of Redemption` 等傷害與防禦工具。

所以 來源摘要裡說的「Scion 高輸出」其實可以理解成：

- 用 `Scion` 強化 `Deliverance`、`Holy Sanctuary`、`Sacred Revelation` 與 cooldown / cast window。
- 用 `Arbiter` 的 `Condemnation` 補主力 AoE / cone 傷害。
- 用 `Smite` 壓縮下一次 `Deliverance` 或 `Holy Sanctuary` 的施法時間。
- 用 stun 技能創造 `Deliverance` 的高傷害窗口。

這不是主補型 Vestal，而是把牧師往 offensive caster 推的玩法。隊伍不安全時仍要回到治療與保命；安全時才把輸出循環完整打出來。

## 技能與天賦目標

| 區塊 | 技能 / 天賦 | 來源摘要目標 | 用途 |
| ------ | ------ | ------ | ------ |
| `Arbiter` | `Condemnation` | Rank 25 | 主力 cone / 多目標技能，對 demon / undead 有加成 |
| `Scion` | `Deliverance` | Rank 15 | 單體爆發，配合 stun 與 demon / undead 目標打高傷害 |
| `Scion` | `Holy Sanctuary` | Rank 16 | AoE 傷害與 threat 調整；若當前 tooltip 有強化效果再當作 opener |
| `Scion` | `Sacred Revelation` | Rank 16 | cone 傷害與 stun，替 `Deliverance` 開 burst window |
| `Scion` | `Mastery: Augury` | Rank 20 | 縮短 `Deliverance` 冷卻，讓爆發循環更密 |
| base skill | `Smite` | 依裝備與點數調整 | filler；每次施放會讓下一次 `Deliverance` 或 `Holy Sanctuary` 更快 |
| `Arbiter` | `Force of Glory` | 依點數調整 | instant stun / burst / emergency control |

> **提醒**
> Fandom 牧師（Cleric）頁目前把 `Holy Sanctuary` 描述為 AoE arcane damage 並降低自身 threat，不是 stun。若你的遊戲版本或 talent tooltip 顯示它會強化後續傷害，可以把它放在 opener；否則把它當 AoE 與 threat reset 會比較穩。

## 點數不足時的優先順序

天賦點數不夠一次補齊所有 breakpoint 時，先把 `Arbiter` 的 `Condemnation` 當成前置門檻：來源摘要建議先確認 `Condemnation` Rank 25，因為它是牧師輸出的主力 cone / 多目標工具，並在該門檻取得更好的 hit count / bonus hit 方向提升。若目前 tooltip 或裝備加成後的 breakpoint 不同，仍以遊戲內顯示為準。

| 優先 | 目標 | 為什麼先點 |
| ------ | ------ | ------ |
| 0 | `Condemnation` Rank 25 | `Arbiter` 前置核心；先確認 bonus hit / 次數提升是否已達成 |
| 1 | `Deliverance` Rank 15 | `Scion` 單體 burst 主砲；若 Rank 15 觸發 bonus hit / 次數增加，傷害體感會最明顯 |
| 2 | `Holy Sanctuary` Rank 16 | 若目前 tooltip 顯示 Rank 16 會強化後續輸出或 opener window，接著補到這個門檻；否則仍把它當 AoE / threat 工具 |
| 3 | `Sacred Revelation` Rank 16 | 提供 cone 傷害與 stun window，讓 `Deliverance` 更穩定吃到爆發條件 |
| 4 | `Mastery: Augury` Rank 20 | 點數有餘裕再補，目標是縮短 `Deliverance` 冷卻；來源摘要提到可壓到約 9.5 秒，但實際值看 tooltip |

簡單說，先把「能多打一次」的門檻拿到，再補讓 burst window 更穩、更常回轉的工具。`Deliverance` 影響單體擊殺效率，`Condemnation` 是牧師輸出的基底，`Holy Sanctuary` 與 `Sacred Revelation` 則負責把爆發窗口打開或放大。

> **提醒**
> 這裡的 `Bonus Hit` / 次數增加是來源摘要中的 breakpoint 說法。裝備上的 all talents、skill bonus 或後續 patch 都可能改變實際 rank，點之前先看技能 tooltip 是否已經達標。

## 為什麼 `Condemnation` 很重要

`Condemnation` 雖然在官方 wiki 的 talent list 裡屬於 `Arbiter`，但它很適合 Scion DPS 玩法，原因是它能補上三件事：

- cone / 多目標傷害，處理一波怪比只靠單體更快。
- 對 demon / undead 有傷害加成，和牧師 farm 路線高度契合。
- 造成 stagger，可以在輸出同時提供一點控制價值。

來源摘要建議把 `Condemnation` 目標拉到 Rank 25，理由是它在該等級能達到更好的命中數與傷害效率。這類 breakpoints 很吃版本與裝備加成，實際點法建議先看目前 tooltip 是否真的在 Rank 25 出現關鍵提升。

## 輸出循環

如果你要先查 Twloli 熱鍵、冷卻、施法時間與中文技能名，先開 [牧師技能參考（Twloli）](/cleric-skills-twloli/)。下面的循環則是把那些按鍵串成 Scion / Arbiter 輸出節奏。

單體 boss 或高價值 undead / demon 目標，可以用這個思路：

1. 進場前補好 `Seal of Redemption`、`Zealous Resolve` 等長效 buff。
2. 開場先觀察怪物 traits，不要在 `Spirit Drain`、降治療或延長施法壓力下硬貪。
3. 用 `Sacred Revelation` 或 `Force of Glory` 製造 stun window。
4. stun 後立刻接 `Deliverance`，吃 stunned 與 demon / undead 的加成。
5. 用 `Condemnation` 補 cone / 多目標傷害，尤其在 undead / demon 站位合適時。
6. 空檔用 `Smite`，壓縮下一次 `Deliverance` 或 `Holy Sanctuary` 的施法時間。
7. `Holy Sanctuary` 用在 AoE、降 threat、或你的當前版本 tooltip 明確支援的 opener window。
8. 等 `Mastery: Augury` 縮短後的 `Deliverance` 回轉，再重複 stun / burst 節奏。

簡化成優先順序：

```text
維持長效 buff
stun window -> Deliverance
Condemnation for cone / undead / demon
Smite filler to speed next Deliverance or Holy Sanctuary
Holy Sanctuary for AoE / threat reset / tooltip-based opener
Force of Glory for stun burst or emergency control
```

> **注意**
> 這套循環的爆發很高，但也會帶來資源消耗與 threat 壓力。單刷時要保留防守工具；組隊時要等 tank 穩住 aggro，不要把自己變成下一個被集火的目標。

## 單刷與組隊差異

### 單刷

單刷時 Scion 牧師（Cleric）的優勢是自帶治療、plate armor、stun 與 undead / demon 特攻。缺點是資源和冷卻一旦被打亂，輸出節奏會掉很快。

單刷重點：

- 優先挑 undead / demon 密集區，例如 [牧師刷區域指南](/cleric-farming-zones/) 裡的 `Riven Grotto`、[Fahlnir Citadel](/fahlnir-citadel/) 等。
- 不要把 `Force of Glory` 全拿來補傷害，危險 boss 要留一手控場。
- 遇到抽 spirit / mana 的 trait，先求穩，不要硬打完整 rotation。
- `Smite` 是讓節奏變滑順的 filler，不是每次都要卡滿。

### 組隊

組隊時 Scion 牧師（Cleric）的輸出很香，但 healer 身分仍然會讓隊伍期待你能救場。

組隊重點：

- tank 還沒抓穩前，不要用高 threat burst 開場。
- 隊伍缺主補時，輸出循環要主動降速。
- 有吟遊詩人（Bard）或恩路者 / 幻術師（Enchanter）提供回魔 / haste 時，Scion 的手感會明顯變好。
- 若隊伍已經有主補，你可以更大膽地追 `Condemnation` 與 `Deliverance` 窗口。

## 裝備與符文方向

來源摘要提到高階裝備常看 `Tunso` 套裝、`Charlatan's Crest` 與 [Cryptic Paragon（Haniwa）](/cryptic-paragon-haniwa/)，目標是 `all talents +2`、屬性傷害、undead damage、casting haste 與 magic find 等加成。這些名稱很適合作為 farm / trade 關鍵字，但實際價值仍要看當前版本 tooltip。

Scion 輸出牧師（Cleric）優先看：

- all talents / all skills / 牧師（Cleric）重要技能加成
- `Condemnation`、`Deliverance`、`Sacred Revelation`、`Holy Sanctuary` 相關加成
- casting haste
- spirit / mana sustain
- arcane / fire damage 或對應技能元素傷害
- undead / demon damage
- 生存、armor、抗性，尤其 Hell 難度

來源摘要也提到 `Gra Rune` 類每擊回復法力的資源方案。這類符文或裝備詞綴的價值取決於你的攻擊頻率與實際觸發規則；如果你常因 OOM / OOS 斷循環，資源詞綴通常比多一點帳面傷害更有感。

## 終局裝備與取得路線

這段整理成一般牧師（Cleric）終局目標，不綁定特定角色等級。進入地獄（Hell）後段或英雄（Heroic）地城後，裝備目標大致是三件事：把 `Superior Condemnation` 推到 Rank 25、保留足夠的抗性與資源回復，並在不死生物區域放大 `Condemnation` / `Deliverance` 的特攻價值。

FC2 的牧師裝備例是以 `King of Riven Grotto` 英雄周回為想定，核心是 `Tunso` 牧師套裝、`Fanatic` 2 件不死生物特攻，以及 `Zamtil` 部位補打寶與奧術方向。可先把它當成終局配裝骨架，再依實際 roll 和隊伍需求替換。

| 部位 | 優先候選 | 判斷重點 |
| ------ | ------ | ------ |
| 右手 | `Tunso's Atonement`；或 [Cryptic Paragon（Haniwa）](/cryptic-paragon-haniwa/) | `Tunso's Atonement` 是牧師精銳套裝核心；`Cryptic Paragon` 只有在隨機天賦 / 技能 roll 命中 `Arbiter`、`Condemnation` 或你的主輸出時才值得拆套 |
| 左手 / 副手 | `Tunso's Asylum`、`Zamtil's Residue` | `Tunso's Asylum` 補牧師天賦、抗性與打寶；`Zamtil's Residue` 常用來湊 `Zamtil` 3 件 |
| 頭部 | `Tunso's Renown`、`Charlatan's Crest` | 套裝頭穩定補牧師天賦；`Charlatan's Crest` 則追所有天賦、屬性傷害與 Rare Drop Rate（打寶 / MF） |
| 胴體 | `Tunso's Reproach`；可比較 `Gwendolyn's Might` | `Tunso's Reproach` 保留牧師套裝與不死生物 / 惡魔特攻；`Gwendolyn's Might` 偏打寶與不死生物特攻候選，換上前要先確認少掉的套裝 bonus 是否值得 |
| 手部 | `Zamtil's Sleight`、`Marshal Gauntlets Iniquity` | `Zamtil's Sleight` 服務 `Zamtil` 3 件；`Marshal Gauntlets Iniquity` 要看是否 roll 到 `Arbiter` 天賦 +2，否則不一定贏過套裝手 |
| 肩部 + 靴子 | `Fanatic's Gambrel` + `Fanatic's Expedition` | `Fanatic` 2 件給對不死生物傷害 +15%，很貼合 Riven Grotto 這類 undead 周回 |
| 腿部 | `Zamtil's Plenitude` | 高難度施法 / 支援職常借用的抗性腿，主要價值是補全屬性抗性、物理抗性與控制抗性 |
| 腰部 | `Edarion's Testimony` | 泛用精銳腰帶候選，提供所有天賦、抗性、Rare Drop Rate 與生存向詞綴 |
| 項鍊 | `Sayanim Kaleidoscope` 或所有天賦 +2 rare | 優先看所有天賦 +2、全抗、屬性傷害與主技能強化；名字只是入口，roll 才是重點 |
| 戒指 | `Tunso's Remorse` 搭配 `Black Swan Band`、`Heaven's Wing` 或高品質 rare | `Tunso's Remorse` 補牧師天賦與套裝；另一格依抗性、技能 roll、Rare Drop Rate 與生存缺口調整 |

取得順序可以更務實一點：

1. 先用 `Tunso` 牧師套裝撐起 `Condemnation`、牧師天賦、抗性與基本輸出。
2. 缺不死生物輸出時，優先湊 `Fanatic's Gambrel` + `Fanatic's Expedition`。
3. 抗性不穩時，先補 `Zamtil's Plenitude`、`Tunso's Asylum`、`Edarion's Testimony` 與高抗性飾品。
4. 金錢開始溢出後，把賭博重點放在飾品、`Charlatan's Crest`、`Cryptic Paragon` 與 `Marshal Gauntlets Iniquity` 這些能改變 build 上限的 slot。

### 推薦周回與取得方式

`King of Riven Grotto` 英雄（Heroic）是 FC2 chart 裡列出的熱門周回點。它屬於 Act II 的 `Riven Grotto`，價值不是章節最高，而是 undead 目標多、牧師與十字軍的特攻容易發揮，地圖效率也較適合反覆刷。

`Ashenflow Peak` 英雄（Heroic）則比較像 Act IV 的條件型選項。FC2 提到前半任務較容易利用元素抗性差異，但它不是牧師專屬農場；若你的隊伍或裝備比較適合火焰 / 冰冷抗性配置，再把它排進周回清單。

[Fahlnir Citadel（法爾尼爾城堡）](/fahlnir-citadel/) 可以當成成形後的高壓 undead / demon 測試場，但不要把它寫死成某幾件裝備的保證來源。實際刷裝仍要看任務掉落偏好、Boss 首通加成、目前地城等級與遊戲內 tooltip。

高效率取得的實務順序：

1. **商人賭博（Gambling）**：優先賭優秀（Exceptional）或精銳（Elite）飾品。FC2 賭博頁提到這類飾品沒有稀有（Rare）等級，因此很適合用來追獨特（Unique）或套裝（Set）飾品。
2. **鎖定圖示賭特定部位**：武器與防具圖示固定，想追 `Charlatan's Crest`、`Marshal Gauntlets Iniquity` 或特定套裝部位時，可以用圖示對照縮小範圍。
3. **看任務掉落偏好**：酒館任務會標出兩種優先掉落類型；缺戒指、腰帶、肩部或板甲手時，選對偏好比盲刷有效。
4. **清首通與檢查商店**：尚未完成的地城 Boss 首通有額外打寶價值；商店庫存會刷新，看到紫色獨特或綠色套裝時再進一步比較 roll。
5. **用全部鑑定提高週轉**：到藥劑師快速鑑定，再把沒命中天賦、抗性或打寶需求的裝備賣掉，轉成下一輪賭博資金。

延伸查表可以看 [FC2 牧師裝備範例](/fc2-class-build-index/#fc2-cleric-hdl3)、[通索的套裝](/fc2-set-elite/#fc2-tunso)、[Fanatic 套裝](/fc2-set-exceptional/#fc2-fanatic)、[Zamtil 套裝](/fc2-set-elite/#fc2-zamtil)、[嚴選獨特裝備](/fc2-selected-unique-items/#fc2-selectlist2) 與 [賭博建議](/fc2-general-reference/#fc2-gambling)。

## 常見失誤

- 只點輸出，不留治療與保命空間。
- 把 `Holy Sanctuary` 誤當 stun，而忽略真正的 stun window。
- 在非 undead / demon 區域硬套同一套 farm 效率期待。
- 沒看 boss traits，遇到抽資源、延長施法、降治療還硬打 full rotation。
- 組隊時搶在 tank 前開 burst。
- 忽略 `Smite` 的施法加速價值，導致 `Deliverance` 窗口變笨重。

## 參考資料

- [Nevergrind Wiki: 牧師（Cleric）](https://nevergrind.com/wiki/index.php?title=Cleric)
- [Nevergrind Online Wiki: 牧師（Cleric）](https://nevergrind-online.fandom.com/wiki/Cleric)
- [NeverGrind Online Class List](https://xackery.com/posts/nevergrind/class-list/)
- [Nevergrind Wiki: Monsters](https://nevergrind.com/wiki/index.php?title=Monsters)

---

> **版本提醒**
> 本頁是玩家攻略與社群資料的繁中整理版；技能、裝備、掉落、配方與版本敏感數值，請以目前遊戲內 tooltip / UI 與官方公告為準。

---
title: "Nevergrind Online 牧師（Cleric）指南"
description: "牧師（Cleric）是 Nevergrind Online 中最穩定的直接治療者：它穿 plate armor，擅長補血、增益、stun、魔法傷害與處理不死或召喚系敵人。把它只當「奶媽」會太窄；中後期的牧師更像是一個能補、能暈、能撐、也能在特定條件下打出傷害的防禦型混合職。"
sourcePages: []
reviewedAt: "2026-05-03"
sourceLastModified: "N/A"
status: "整理改寫"
---

牧師（Cleric）是 Nevergrind Online 中最穩定的直接治療者：它穿 plate armor，擅長補血、增益、stun、魔法傷害與處理不死或召喚系敵人。把它只當「奶媽」會太窄；中後期的牧師更像是一個能補、能暈、能撐、也能在特定條件下打出傷害的防禦型混合職。

- 檢視日期：`2026-05-03`
- 前置閱讀：[Nevergrind Online 治療者總覽](/healers/)
- 技能速查：[Nevergrind Online 牧師技能參考（Twloli）](/cleric-skills-twloli/)
- 版本提醒：技能名稱、天賦與數值可能隨版本調整；本文優先整理玩法判斷，不把特定數字當成永久固定答案

> **快速重點**
> 牧師（Cleric）的核心價值是直接治療、plate armor、防禦增益、stun 與救場。
> 高階玩法會把牧師往神聖傷害、anti-undead / summoned、控場與輸出補位推進。
> 真正難點不是會不會補，而是 spirit / mana、aggro、施法 knockback 與何時停手。

## 核心定位

Nevergrind Wiki 把牧師（Cleric）定位成 defensive healer，並指出它擁有遊戲中很高的治療潛力。它的作戰重點包含：

- 直接治療與群體治療。
- 提升隊友生命值、護甲與防禦容錯。
- 使用 stun 與控制技能壓住危險目標。
- 以魔法傷害處理敵人，特別是懲罰不死與召喚系敵人。
- 在危急時靠 plate armor 與防禦技能爭取時間。

這讓牧師（Cleric）成為三大治療者中最「穩」的選擇。德魯伊（Druid）比較偏進攻與自然控制，薩滿（Shaman）比較偏減益與續航；牧師則是救急、穩血、保隊伍下限。

## 三條天賦方向

官方 wiki 的牧師（Cleric）頁列出三個 talent 方向：`Scion`、`Vestal`、`Arbiter`。可以先用下面方式理解：

| 天賦方向 | 主要傾向 | 適合情境 |
| ------ | ------ | ------ |
| `Scion` | 偏魔法傷害與 offensive caster | 想把牧師推向輸出、神聖傷害或特定怪物特攻 |
| `Vestal` | 偏治療與直接支援 | 想當穩定主補、強化群補與治療循環 |
| `Arbiter` | 偏防禦、審判、控場與生存 | 想提升承壓、降 aggro、stun 或 hybrid front-line 容錯 |

來源摘要提到高階玩家會把牧師往輸出化發展，特別是搭配神聖傷害、暈眩與對不死 / 惡魔類目標的加成。這個方向可以放在 `Scion` 或攻擊型配置裡理解，但實際配點仍要看當前版本技能說明。

## 重要技能概念

不要死背每一招，先理解牧師的技能分工。若只是要查熱鍵、冷卻、施法時間與 Twloli 中文對照，可以直接看 [牧師技能參考（Twloli）](/cleric-skills-twloli/)。

| 類型 | 代表技能 / 天賦名稱 | 用法 |
| ------ | ------ | ------ |
| 單體與直接治療 | `Superior Healing`、`Divine Light` | 抬起危險隊友血線，適合處理單點壓力 |
| 群體治療 | `Circle of Prayer` | 隊伍集體掉血時救場，但要注意 aggro 與資源 |
| 防禦 buff | `Armor of Faith`、`Symbol of Naltron`、`Seal of Redemption` | 提升隊伍容錯，不要等出事才想起來 |
| 控場與 stun | `Binding Earth`、`Searing Revelation`、`Holy Wrath`、`Sacred Revelation` | 壓住危險怪，保護 healer 自己與後排 |
| 傷害與特攻 | `Smite`、`Deliverance`、`Condemnation` | 在安全時間補傷害，對特定怪物類型更有價值 |
| 降威脅 / 防守 | `Force of Glory`、`Guardian Angel`、`Divine Sanctuary` | aggro 失控或快被集火時爭取時間 |

SteamDB 的更新紀錄曾提到 `Imprecatory Psalm` 的行為調整：目標會決定它偏向攻擊怪物或治療隊伍，而不是同時做兩件事。這類紀錄提醒我們，牧師的天賦與技能互動會被版本調整；配點前最好看當前遊戲內說明。

## 牧師為什麼會變成 DPS

牧師（Cleric）的官方描述已經不是純治療，它本來就包含 stun、增益、healing、magical damage 與處理 tough situations 的 utility。高階玩法把牧師推向輸出，通常來自幾個原因：

- plate armor 讓它比多數 caster 更能承受意外傷害。
- 神聖與 arcane 類技能可以在安全窗口補輸出。
- 對不死、召喚物或特定怪物類型的懲罰能力，會讓它在某些地城效率很高。
- 治療與輸出天賦可能讓同一套技能在不同目標上承擔不同功能。
- stun 可以降低危險技能施放，等於間接提升隊伍輸出時間。

但這不代表新手牧師應該一開始就無腦打傷害。隊伍需要你救場時，你的第一責任仍然是讓隊伍活下來；輸出化是在資源、aggro 與治療節奏都穩定後才成立。

## 三個主要風險

### 精神（Spirit）/ 法力（Mana）被打乾

治療、增益、控制與傷害都會吃資源。長戰鬥中如果資源耗盡，牧師的價值會急速下降。

實務建議：

- 大補留給真正危險的血線。
- 裝備要看資源、回復、haste 與生存，不只看治療量。
- 先升級最常用的 healing / stun / buff 技能。
- 遇到會抽資源或拉長戰鬥的 boss，要提早調整節奏。

### 治療威脅值（aggro）過高

治療會製造威脅值，尤其在坦克尚未建立穩定 aggro 時很容易出事。牧師（Cleric）雖然穿 plate armor，但被多怪盯上仍然會出問題。

比較安全的節奏：

1. 開場先讓 tank 接怪。
2. 不急著用大群補。
3. 怪轉頭時先保命或控場，不要硬補硬打。
4. 等 tank 把 aggro 拉回去，再回到治療循環。

### 施法擊退（knockback）

施法者被攻擊時可能被打斷或延長施法時間。牧師的 plate armor 是容錯，不是免死金牌；如果被怪貼住，原本能救人的治療也可能因 knockback 來不及出手。

處理方式是預判而不是反應：血線快掉前先補防禦 buff，危險怪準備施法前先 stun，自己被盯上時先交保命或降威脅工具。

## 新手玩法建議

1. 先把自己定位成「穩定隊伍的人」，不要急著證明牧師能打。
2. 每次進地城前確認常用 buff 是否補齊。
3. 開場等 tank，血線穩定後再補傷害。
4. 練習把 stun 用在危險怪，而不是看到技能亮就按。
5. 中期開始準備兩套思路：一套主補，一套偏輸出或特定地城 farm。

牧師的魅力在於它不是單薄的補血機器。玩得好時，你會同時在做四件事：讓隊友不死、讓怪打不出關鍵技能、讓自己不被 aggro 打崩，並在安全時間把傷害補上去。

## 延伸：刷區域

如果目標是查每個按鍵的冷卻、施法時間、threat 與中文名稱，可以先看 [Nevergrind Online 牧師技能參考（Twloli）](/cleric-skills-twloli/)。那篇會把 `Smite`、`Deliverance`、`Condemnation`、`Sacred Revelation`、`Holy Sanctuary`、`Force of Glory` 與治療 / buff 技能整理成快捷鍵表。

如果目標是把牧師往輸出推，可以接著看 [Nevergrind Online 牧師（Scion）輸出指南](/cleric-scion-dps/)，裡面會整理 `Scion` / `Arbiter` 混合點法、`Deliverance` burst window、終局裝備與取得路線。

如果目標是把 undead / demon 特攻打出來，可以接著看 [Nevergrind Online 牧師刷區域指南](/cleric-farming-zones/)。那篇會把 `Riven Grotto`、`Thule Crypt`、`Fahlnir Citadel`、`Ashenflow Peak` 依 Normal、Nightmare、Hell 的風險整理成 farm 路線。

## 參考資料

- [Nevergrind Wiki: 牧師（Cleric）](https://nevergrind.com/wiki/index.php?title=Cleric)
- [Nevergrind Online Wiki: Classes](https://nevergrind-online.fandom.com/wiki/Classes)
- [SteamDB: 牧師（Cleric） talent update and talent itemization support](https://steamdb.info/patchnotes/12621770/)
- [SteamDB: Rune system progress and bug fixes](https://steamdb.info/patchnotes/15554768/)
- [Nevergrind Online on Steam](https://store.steampowered.com/app/853450/Nevergrind_Online/)

---

> **版本提醒**
> 本頁是玩家攻略與社群資料的繁中整理版；技能、裝備、掉落、配方與版本敏感數值，請以目前遊戲內 tooltip / UI 與官方公告為準。

---
title: "Nevergrind Online 牧師（Scion）輸出指南"
description: "Scion 牧師的核心不是把牧師（Cleric）當純補，而是用 Condemnation、Deliverance、Sacred Revelation、Holy Sanctuary、Smite 與 Force of Glory 串出高頻率爆發。這套玩法適合單刷、farm undead / demon 區域，或在隊伍安全時把牧師轉成高火力施法職。"
sourcePages: []
reviewedAt: "2026-05-03"
sourceLastModified: "N/A"
status: "整理改寫"
---

`Scion` 牧師的核心不是把牧師（Cleric）當純補，而是用 `Condemnation`、`Deliverance`、`Sacred Revelation`、`Holy Sanctuary`、`Smite` 與 `Force of Glory` 串出高頻率爆發。這套玩法適合單刷、farm undead / demon 區域，或在隊伍安全時把牧師轉成高火力施法職。

- 檢視日期：`2026-05-03`
- 前置閱讀：[Nevergrind Online 牧師（Cleric）指南](./cleric/)
- 技能速查：[Nevergrind Online 牧師技能參考（Twloli）](./cleric-skills-twloli/)
- 資料來源：來源摘要、Nevergrind Wiki 牧師（Cleric）頁、Fandom 牧師（Cleric）頁、Xackery class list
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

如果你要先查 Twloli 熱鍵、冷卻、施法時間與中文技能名，先開 [牧師技能參考（Twloli）](./cleric-skills-twloli/)。下面的循環則是把那些按鍵串成 Scion / Arbiter 輸出節奏。

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

- 優先挑 undead / demon 密集區，例如 [牧師刷區域指南](./cleric-farming-zones/) 裡的 `Riven Grotto`、[Fahlnir Citadel](./fahlnir-citadel/) 等。
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

來源摘要提到高階裝備常看 `Tunso` 套裝、`Charlatan's Crest` 與 [Cryptic Paragon（Haniwa）](./cryptic-paragon-haniwa/)，目標是 `all talents +2`、屬性傷害、undead damage、casting haste 與 magic find 等加成。這些名稱很適合作為 farm / trade 關鍵字，但實際價值仍要看當前版本 tooltip。

Scion 輸出牧師（Cleric）優先看：

- all talents / all skills / 牧師（Cleric）重要技能加成
- `Condemnation`、`Deliverance`、`Sacred Revelation`、`Holy Sanctuary` 相關加成
- casting haste
- spirit / mana sustain
- arcane / fire damage 或對應技能元素傷害
- undead / demon damage
- 生存、armor、抗性，尤其 Hell 難度

來源摘要也提到 `Gra Rune` 類每擊回復法力的資源方案。這類符文或裝備詞綴的價值取決於你的攻擊頻率與實際觸發規則；如果你常因 OOM / OOS 斷循環，資源詞綴通常比多一點帳面傷害更有感。

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

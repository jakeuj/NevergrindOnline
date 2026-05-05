---
title: "Nevergrind Online 牧師技能參考（Twloli）"
description: "這份筆記把 Twloli 牧師技能表整理成可公開查閱的 Nevergrind Online 牧師（Cleric）快速參考：先用熱鍵找技能，再看冷卻、施法時間、資源、中文名稱與戰術用途。要打 Scion 輸出循環時，最重要的是記住 Sacred Revelation / Force of Glory 製造 stun window，接 Deliverance，再"
sourcePages: []
reviewedAt: "2026-05-03"
sourceLastModified: "N/A"
status: "整理改寫"
---

這份筆記把 Twloli 牧師技能表整理成可公開查閱的 Nevergrind Online 牧師（Cleric）快速參考：先用熱鍵找技能，再看冷卻、施法時間、資源、中文名稱與戰術用途。要打 Scion 輸出循環時，最重要的是記住 `Sacred Revelation` / `Force of Glory` 製造 stun window，接 `Deliverance`，再用 `Condemnation` 與 `Smite` 補循環。

- 檢視日期：`2026-05-03`
- 前置閱讀：[Nevergrind Online 牧師（Cleric）指南](./cleric/)
- 流派參考：[Nevergrind Online 牧師（Scion）輸出指南](./cleric-scion-dps/)
- 資料來源：Twloli 技能表、Fandom 牧師（Cleric）頁、Nevergrind Wiki 牧師（Cleric）頁
- 版本提醒：技能名稱、資源類型、冷卻、施法時間與 threat 可能隨版本變動；正式配點與巨集邏輯仍以目前遊戲內 tooltip 為準

> **快速重點**
> `1` 到 `6` 是主要輸出、控場與 threat 工具；`7` 到 `=` 是治療、護盾與長效 buff。
> `Deliverance` 對 stunned、demon、undead 目標各有額外傷害，是牧師 burst 的核心。
> `Holy Sanctuary` 的公開 Fandom 描述是 AoE 傷害與降低自身 threat，不是 stun；真正的 stun window 主要來自 `Sacred Revelation` 與 `Force of Glory`。

## 讀表前先注意

Twloli 技能表與公開 wiki 的名稱有幾個差異：

| Twloli 名稱 | 公開 wiki / Fandom 對照 | 說明 |
| ------ | ------ | ------ |
| `Restore` | `Binding Grace` | 治療目標並同時治療施法者自己 |
| `Holy Shield` | `Guardian Angel` | 吸收傷害並提升恐懼抗性 |
| `Sacred Revelation` | Fandom 寫作 `Sacred Revelations` | AoE / cone arcane damage，並 stun 目標 |

另外，Twloli 表把輸出技能標成 `Mana`，治療與 buff 標成 `Spirit`。公開 Nevergrind Wiki 只明確說牧師（Cleric）是 wisdom-based caster、mana pool 受 Wisdom 影響；若你目前版本的資源名稱或消耗分類不同，請以遊戲內 tooltip 為準。

## 快捷鍵總表

| 熱鍵 | 技能名稱 | 消耗 | 冷卻 | 施法時間 | 中文名 | 核心用途 |
| :---: | ------ | :---: | :---: | ------ | ------ | ------ |
| `1` | `Smite` | Mana | 0 s | 3 s | 懲擊 | Arcane 單體傷害；每次施放讓下一次 `Deliverance` 或 `Holy Sanctuary` 施法時間縮短 0.5 秒 |
| `2` | `Deliverance` | Mana | 15 s | 2.5 s | 超脫 | Fire 單體爆發；對 stunned、demon、undead 目標有額外傷害 |
| `3` | `Condemnation` | Mana | 12 s | 3 s | 怒斥 | Cone / 多目標 arcane 傷害；stagger 目標，對 demon / undead 有額外傷害 |
| `4` | `Sacred Revelation` | Mana | 30 s | 2 s | 聖光啟示 | Cone / AoE arcane burst，附帶 stun，是 `Deliverance` 的主要啟動窗口 |
| `5` | `Holy Sanctuary` | Mana | 10 s | 2.5 s | 聖域 | AoE arcane 傷害，同時大幅降低自身 threat |
| `6` | `Force of Glory` | Mana | 1 m | Instant | 聖光之怒 | 強力單體 arcane 傷害，附帶強力 stun；Twloli 表註記約 2.5 s GCD |
| `7` | `Restore` / `Binding Grace` | Spirit | 8 s | 4 s | 聖光恩賜 | 治療目標與施法者自己，適合雙方都掉血時使用 |
| `8` | `Holy Shield` / `Guardian Angel` | Spirit | 15 s | 1.5 s | 守護天使 | 吸收傷害並提升 fear resistance；fear 狀態下治療效率會受影響時特別重要 |
| `9` | `Divine Light` | Spirit | 0 s | 2.5 s | 治癒聖光 | 快速單體直接治療，是最直覺的抬血工具 |
| `0` | `Circle of Prayer` | Spirit | 8 s | 4 s | 祈禱 | 全體治療；施法較長，使用前注意 aggro 與 knockback |
| `-` | `Seal of Redemption` | Spirit | 0 s | 2.5 s | 救贖印記 | 長效 buff，提升生命值上限與 blood magic resistance，持續約 12 分鐘 |
| `=` | `Zealous Resolve` | Spirit | 0 s | 2.5 s | 聖光加護 | 長效 buff，提升生命值上限與 armor，持續約 12 分鐘 |

## 威脅值（Threat）速查

公開 Fandom 牧師（Cleric）頁列出部分技能的 threat 倍率。這些數字很適合拿來理解「為什麼牧師一開場爆發會被怪轉頭」，但仍要以當前遊戲版本為準。

| 技能 | Fandom threat | 讀法 |
| ------ | ------ | ------ |
| `Force of Glory` | 300% | 爆發與 stun 很強，但也最容易拉怪 |
| `Smite` | 200% | filler 不是零成本，連發仍會堆 threat |
| `Sacred Revelation` | 160% | 開 burst window 前要確認 tank 已接住 |
| `Circle of Prayer` | 150% | 群補會明顯拉 threat，低血線時救命但別亂按 |
| `Guardian Angel` | 125% | 防守技也會製造壓力 |
| `Deliverance` | 100% | burst 核心，stun / undead / demon 加成都在這裡 |
| `Divine Light` | 90% | 穩定單補，但連續施放仍會累積 |
| `Condemnation` | 70% | 輸出與 stagger 兼具，threat 相對較低 |
| `Binding Grace` | 60% | 同時補目標與自己，threat 較低但施法很長 |
| `Holy Sanctuary` | -250% | 用來 AoE 與降低自身 threat，是 Scion 牧師的安全閥 |

## Scion 輸出記憶點

Scion / Arbiter 混合輸出可以先記這個優先順序：

1. 進場前維持 `Seal of Redemption` 與 `Zealous Resolve`。
2. 用 `Sacred Revelation` 或 `Force of Glory` 製造 stun window。
3. stunned 後立刻接 `Deliverance`，吃 stunned 加成；若目標同時是 demon / undead，傷害窗口更高。
4. 用 `Condemnation` 補 cone / 多目標與 demon / undead 傷害。
5. 空檔用 `Smite`，讓下一次 `Deliverance` 或 `Holy Sanctuary` 更快。
6. threat 太高或需要 AoE 時，用 `Holy Sanctuary` 當安全閥。

> **注意**
> `Holy Sanctuary` 很容易被誤記成 stun 技。以公開 Fandom 描述來看，它的重點是 AoE arcane damage 與降低自身 threat；若你的版本 tooltip 沒寫 stun，就不要把它當作 `Deliverance` 的 stun 前置。

## 治療與增益（buff）記憶點

牧師的治療按鍵可以用「快補、群補、雙補、護盾、長效 buff」來記：

- `Divine Light`：快速單體直接治療，適合最常用的救血線。
- `Circle of Prayer`：全體治療，適合全隊掉血；但施法時間長、threat 高。
- `Restore` / `Binding Grace`：同時補目標與自己，適合自己也被打到時使用。
- `Holy Shield` / `Guardian Angel`：提前吃傷害與補 fear resistance，不要只等低血量才按。
- `Seal of Redemption`、`Zealous Resolve`：進地城前先補，12 分鐘長效 buff 掉了就重上。

治療技能常見風險不是「補不夠」，而是按太早或太晚：太早會搶 aggro，太晚會被 knockback 或長施法拖住。實戰上，先讓 tank 建立 threat，再用最小必要治療穩住血線，會比無腦大補安全。

## 與其他牧師筆記的關係

這篇是技能表與熱鍵速查，不取代 build 文：

- 要理解牧師（Cleric）為什麼能補、能暈、能打，先看 [牧師（Cleric）指南](./cleric/)。
- 要把 `Deliverance`、`Condemnation`、`Smite` 串成輸出循環，看 [牧師（Scion）輸出指南](./cleric-scion-dps/)。
- 要找 undead / demon 密集區練輸出，看 [牧師刷區域指南](./cleric-farming-zones/)。

## 參考資料

- [Nevergrind Online Wiki: 牧師（Cleric）](https://nevergrind-online.fandom.com/wiki/Cleric)
- [Nevergrind Wiki: 牧師（Cleric）](https://nevergrind.com/wiki/index.php?title=Cleric)

---

> **版本提醒**
> 本頁是玩家攻略與社群資料的繁中整理版；技能、裝備、掉落、配方與版本敏感數值，請以目前遊戲內 tooltip / UI 與官方公告為準。

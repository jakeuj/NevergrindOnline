---
title: "Nevergrind Online 地城冒險與任務攻略"
description: "Nevergrind Online 的地城冒險可以看成一條循環：從 Edenburg（伊登堡）的 nevergrind-online-tavern.md 選任務，進入隨機生成的地城，依怪物 traits、站位與 aggro 控制戰鬥，打倒 boss 後再回城鑑定、整理與投資下一輪裝備。"
sourcePages: []
reviewedAt: "2026-05-06"
sourceLastModified: "N/A"
status: "整理改寫"
---

Nevergrind Online 的地城冒險可以看成一條循環：從 Edenburg（伊登堡）的 [酒館（Tavern）](./tavern/) 選任務，進入隨機生成的地城，依怪物 traits、站位與 aggro 控制戰鬥，打倒 boss 後再回城鑑定、整理與投資下一輪裝備。

- 檢視日期：`2026-05-03`
- 分類：[Nevergrind Online（絕不刷怪）遊戲指南](./guide/)
- 延伸閱讀：[怪物分類與 Traits](./monsters/)、[物品與戰利品總覽](./items-loot/)、[熱鍵與聊天指令速查](./hotkeys-commands/)
- 資料來源：來源摘要、來源資料整理、Nevergrind Wiki、Fandom game mechanics 與既有筆記交叉整理
- 版本提醒：任務數量、難度名稱、掉落偏好、`/players` 類指令與 boss 圖示可能因版本不同而改變；實際操作請以目前遊戲內 酒館（Tavern）、地圖 UI、tooltip 與 `/help` 為準

> **快速重點**
> 地城不是隨便進去打完就好；先在酒館（Tavern）看任務、掉落偏好、難度與隊伍狀態，再出發。
> 地獄（Hell）與英雄（Heroic）不是同一個開關：Hell 是世界 / 環境難度，Heroic 是任務模式，兩者可以疊加。
> 進地城後先看 con、monster type、traits、前後排與 boss 圖示，再決定開場技能、控制與集火順序。

## 出發前先決定目標

地城的第一個決策不在怪物面前，而是在酒館（Tavern）選任務時。來源摘要提到任務數量超過 100 種，且每項任務有特定環境、boss 與掉落偏好；這讓任務選擇本身就是 farming 計畫的一部分。

| 決策 | 問自己什麼 | 影響 |
| ------ | ------ | ------ |
| 任務 / mission | 這場要練等、首通、刷特定部位，還是追 boss 掉落 | 決定地圖環境、boss 與路線長度 |
| 掉落偏好 | 任務是否偏向 shield、plate、weapon、飾品或其他部位 | farm 特定裝備時，比盲刷更有方向 |
| 世界難度與任務模式 | 這場是普通（Normal）、惡夢（Nightmare）、地獄（Hell），是否還要開英雄（Heroic） | 決定怪物 traits / Mods 壓力、密度、風險與 loot / gold / MF 期待 |
| 隊伍人數 | solo、少人隊，還是滿 5 人 | 影響怪物壓力、資源消耗、收益與失誤容錯 |
| 角色狀態 | 技能、藥水、背包、抗性與裝備耐久是否準備好 | 少一次回頭整理，整場地城就順很多 |

如果目標是刷寶，不要只選「目前打得過」的任務。更好的問法是：這場任務的怪物類型、掉落偏好與 boss 風險，是否剛好服務我現在缺的裝備部位或 build 缺口。

## 世界難度、英雄模式與隊伍倍率

最容易混淆的是地獄（Hell）與英雄（Heroic）。它們屬於兩套不同系統：普通（Normal）、惡夢（Nightmare）、地獄（Hell）是世界 / 環境難度；英雄（Heroic）則是任務的進階模式，通常在酒館（Tavern）的任務選擇畫面勾選或切換。

FC2 chart 的整理提到，擊敗地獄（Hell）難度的 `Lord Szarthax` 後，地獄（Hell）的任務選擇畫面會新增英雄（Heroic）勾選框。也就是說，玩家可能會看到「地獄（Hell）的任務」再加上「英雄（Heroic）模式」：前者決定世界難度與怪物 Mods / traits 壓力，後者讓任務本身更密集、更危險，但也更適合刷經驗、物品、Gold 與 Magic Find（MF）。

| 系統 | 代表 UI / 名稱 | 主要影響 | 實戰理解 |
| ------ | ------ | ------ | ------ |
| 世界難度 | 普通（Normal）、惡夢（Nightmare）、地獄（Hell） | 怪物 Mods / traits 數量、抗性懲罰、整體數值壓力 | 先確認抗性、生存、資源回復是否足夠 |
| 任務模式 | 英雄（Heroic）勾選框或切換 | 怪物更強、數量更多，Champion monster 比例增加，收益期待提高 | 裝備成熟或隊伍有分工後再開 |
| 疊加狀態 | 地獄（Hell）任務 + 英雄（Heroic）模式 | 同時承受 Hell 的環境壓力與 Heroic 的密度 / 強度 | 終局刷寶路線，翻車成本高 |

來源摘要把 Heroic 怪物整理為更強、數量更多，但掉寶率、金幣或 Magic Find 期待也更高。實務上可以這樣理解：

| 情境 | 建議 |
| ------ | ------ |
| 第一次打新任務 | 先用 Normal 熟悉地圖節奏、怪物 traits 與 boss 行為 |
| 想刷首通或任務完成 | 選你能穩定收尾的難度，不要為了 MF 把 boss 打成翻車點 |
| 想挑戰 Heroic | 先確認 tank、healer、control、DPS、補給與抗性都有準備；solo 時至少要能穩定收掉同區 Hell |
| 組滿 5 人 | 用隊伍分工換更高壓力與更高收益，不是每個人各打各的 |
| solo 想調整難度 | 舊攻略可能提到 `/players 5` 類指令；先以目前遊戲內 `/help` 為準 |

> **注意**
> `/players 5` 這類指令在不同版本、伺服器規則或資料來源中可能不一致。如果目前遊戲內 `/help`、酒館（Tavern） tips 或官方說明沒有列出，不要把它當成一定可用的 farm 基礎。

## 地圖導航與探索

地城 layout 帶有隨機性，所以導航能力會直接影響清圖速度。你不需要每次都把地圖背起來，但要養成看 minimap、圖示與空間方向的習慣。

常用操作可以先記這幾個：

- `WASD`：基本移動。
- 點擊 minimap 上的下一個房間：讓角色往目標房間前進。
- 長按滑鼠左鍵或右鍵：在地城中持續向前。
- `Mouse Wheel`：縮放地圖，找路、看遠端房間或檢查可能的隱藏房。
- `Z`：若目前 keybind 支援，可用於 autorun；詳細可看 [熱鍵與聊天指令速查](./hotkeys-commands/)。

地圖圖示也值得注意：

| 圖示 / 線索 | 常見解讀 |
| ------ | ------ |
| 紫色 boss 圖示 | 常代表區域 boss 或特殊目標 |
| 紅色 boss 圖示 | 常代表壓力更高的 act boss 或章節 boss |
| 地圖空隙較大的方向 | 來源摘要提到可能暗示 boss 房或大型房間方向 |
| 未探索分岔 | 可能有額外怪群、chest、任務目標或隱藏路線 |

> **提醒**
> 地圖標示、boss 圖示與隱藏房規則請以目前 UI 為準。這篇保留的是來源摘要中的判斷方式，不把圖示規則寫成跨版本保證。

## 進戰鬥前先讀怪

每一場戰鬥開打前，先看三件事：怪物 con、怪物階級、traits。這三個資訊決定你要不要開爆發、先控場、先殺小怪，或先讓 tank 多等一秒。

| 觀察 | 為什麼重要 | 下一步 |
| ------ | ------ | ------ |
| Con color | 顯示怪物與玩家的等級差距；紅 con 通常代表命中與承傷壓力都很高 | 高 con 先保守，避免開場搶怪或硬讀條 |
| 名字背景 / 階級 | Champion、Unique、Boss 等通常有更高壓力與更好掉落期待 | 先看 traits，再決定控制與集火 |
| Monster class | 怪物可能使用類似玩家職業的技能 | 看到 caster、rogue、healer 類敵人時，優先注意打斷或集火 |
| Species / type | Undead、Demon、Dragonkin 等會影響特攻詞綴與技能加成 | 牧師（Cleric）、特攻裝與 farming route 會特別在意 |
| Mods / traits | Rampage、Bloodlusted、Armored、Drain、Enchanted 等會改變整場戰鬥 | 依 trait 改變擊殺順序與控制 |

完整怪物階級、con、species 與 traits 可看 [怪物分類與 Traits](./monsters/)。

## 團隊戰鬥節奏

地城最常見的翻車不是單一數字不夠，而是節奏亂掉：tank 還沒拉穩，DPS 已經開大；healer 一開始就大補，怪物轉頭；控制技能丟在低威脅小怪上，真正危險的 trait 沒人處理。

基本節奏可以這樣抓：

1. Tank 或前排職先碰怪，建立初始 aggro / threat。
2. Utility 或控制職確認高風險 traits，例如 `Rampage`、`Nimble`、`Drain` 或 caster 類目標。
3. DPS 等 threat 穩定後進入核心 rotation，不要開場就把大範圍 AoE 丟進未整理的怪群。
4. Healer 以最小必要治療穩住血線，避免每次小傷都立刻變成高 threat。
5. Boss 或 champion 開危險技能時，優先交 `Stun`、`Paralyze`、`Stagger` 或其他控制。

## 前後排與攻擊懲罰

來源摘要提到戰場分成前列與後列，物理近戰攻擊後列怪物可能有約 50% 傷害懲罰，除非前列已被清掉。這個規則會影響物理職的目標選擇。

| 情境 | 建議 |
| ------ | ------ |
| 前排還有怪，後排有 caster | 物理職可能先清前排或用可打後排技能；法系 / ranged 優先處理後排威脅 |
| 後排怪有危險 trait | 不要只因傷害懲罰放著不管；改用控制、法術或遠程工具處理 |
| Boss 在後排或被小怪保護 | 先清阻擋目標，再開爆發；避免把高冷卻技能打在低效率目標上 |

## 狀態異常怎麼用

控制不是為了看起來忙，而是為了讓危險技能進不了循環。

| 狀態 | 用途 | 典型目標 |
| ------ | ------ | ------ |
| `Stun` | 阻止怪物行動，可用來打斷 burst 或連擊 | `Rampage`、高傷 boss、準備放大招的敵人 |
| `Paralyze` | 讓怪物無法閃避、招架或反擊 | `Nimble`、高迴避或反擊壓力怪 |
| `Stagger` | 重置或延後普通攻擊節奏，拉長特殊技能間隔 | 攻速高、技能循環壓力大的怪 |
| Slow / haste control | 降低怪物攻擊與技能循環頻率 | 會靠攻擊次數推進技能循環的敵人 |

如果隊伍裡有恩路者 / 幻術師（Enchanter）、吟遊詩人（Bard）、薩滿（Shaman）或其他控制 / debuff 角色，不要只看個人 DPS。這些職業常常是讓地城從「硬扛」變成「可控」的關鍵。

## 高風險特性（traits）優先順序

怪物 mods 會顯示在血條下方，看到下列 traits 時要先決定誰負責處理：

| Trait | 風險 | 常見應對 |
| ------ | ------ | ------ |
| `Rampage` | 紅光後進行高壓連擊 | 及時 `Stun` 打斷，不要讓 healer 硬補整段 |
| `Bloodlusted` | 其他敵人死亡後攻擊力暴增 | 通常要優先擊殺，或避免最後才留它 |
| `Armored` | 物理傷害大幅降低 | 交給 magic DPS，或用法術 / debuff 轉換處理方式 |
| `Mana Drain` / `Spirit Drain` | 攻擊時削減玩家資源 | 儘快擊殺或控住，healer 尤其要保留 potion |
| Elemental `Enchanted` | 造成元素 AoE、增傷或提高元素抗性 | 補對應 resistance，避免低抗硬扛 |
| `Nimble` | 高閃避、招架或反擊壓力 | 用 `Paralyze` 或命中 / 控制工具解決 |

## 補給、背包與結算

地城結束不是「賣垃圾」而已，而是下一場效率的開頭。

出發前：

1. Healer / support 確認 `Spirit Potions`、mana / health 類補給與必要卷軸。
2. DPS 確認主要武器、rune、耐久、抗性與背包空間。
3. Tank 確認 armor、HP、threat 工具與 emergency cooldown。
4. 全隊確認任務、難度與 ready 狀態。

打完 boss 後：

- 背包滿時，若目前版本允許，可回城清理、鑑定，再回地城撿剩餘掉落；實際行為請以目前任務與地城保留規則為準。
- 到 [藥劑店（Apothecary）](./apothecary/) 使用 `Identify All` 類服務處理未鑑定裝。
- 把高價 set、unique、craft base、抗性裝、分身裝放銀行。
- 到 [商人（Merchant）](./merchant/) 清理低價物、升背包，或把多餘 gold 留給 [賭博（Gambling）](./gambling/)。
- 對長期裝才考慮 [符文（Runes）](./runes/) 或 [鐵匠鋪（Blacksmith） crafting](./blacksmith-crafting-recipe-research/)。

## 新手地城檢查表

1. 我知道這場任務的目標和掉落偏好嗎？
2. 我的背包、藥水、鑑定卷軸與技能等級準備好了嗎？
3. 進場後有先看 con、背景顏色、traits 與 boss 圖示嗎？
4. 我有等 tank 建立 threat，或讓隊伍知道我要開場控制嗎？
5. 我知道這場最怕哪種 trait，例如 `Rampage`、`Drain`、`Bloodlusted` 或 `Armored` 嗎？
6. 打完後有把裝備分成自用、出售、銀行、分身與 craft base 嗎？

<a id="fc2-general-reference"></a>

## FC2 一般攻略全量參考

FC2 的流程、Boss、特殊怪物、狀態異常與 FAQ 等頁面已集中在 [FC2 一般攻略全量參考](./fc2-general-reference/)。地城路線可先讀本文，再用全量參考查原站表格。

## 參考資料

- [酒館（Tavern）指南](./tavern/)
- [怪物分類與 Traits](./monsters/)
- [熱鍵與聊天指令速查](./hotkeys-commands/)
- [物品與戰利品總覽](./items-loot/)
- [Nevergrind Wiki: Monsters](https://nevergrind.com/wiki/index.php?title=Monsters)
- [Nevergrind Online Wiki: General Game Mechanics](https://nevergrind-online.fandom.com/wiki/General_Game_Mechanics)

---

> **版本提醒**
> 本頁是玩家攻略與社群資料的繁中整理版；技能、裝備、掉落、配方與版本敏感數值，請以目前遊戲內 tooltip / UI 與官方公告為準。

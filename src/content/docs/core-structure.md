---
title: "Nevergrind Online 系統總覽與核心架構"
description: "Nevergrind Online 可以先用四個核心系統來理解：職業決定隊伍責任，物品與戰利品決定長期成長，Edenburg（伊登堡）提供補給與角色養成節點，戰鬥機制則把仇恨值、位置、狀態與隊伍協作串成每一場地城的實際節奏。"
sourcePages: []
reviewedAt: "2026-05-03"
sourceLastModified: "N/A"
status: "整理改寫"
---

Nevergrind Online 可以先用四個核心系統來理解：職業決定隊伍責任，物品與戰利品決定長期成長，Edenburg（伊登堡）提供補給與角色養成節點，戰鬥機制則把仇恨值、位置、狀態與隊伍協作串成每一場地城的實際節奏。

- 檢視日期：`2026-05-03`
- 分類：[Nevergrind Online（絕不刷怪）遊戲指南](./guide/)
- 資料來源：來源摘要與來源資料整理
- 版本提醒：職業名稱、城鎮功能、技能與物品規則可能因版本不同而調整；實際名稱與數值請以目前遊戲內 UI / tooltip 為準

> **快速重點**
> 先把 NGO 看成「職業分工 + 地城任務 + 隨機戰利品 + 回城整理」的循環。
> 職業不是死板標籤；後期強度會被技能循環、天賦、裝備詞綴、runes 與隊伍協作改寫。
> 刷寶的重點不是只追顏色，而是讓裝備服務你的技能循環、生存缺口與 farm 目標。

這篇是攻略首頁底下的系統地圖，只保留各系統之間怎麼互相影響。若你已經理解四大系統，下一步可以看 [進度路線與 FC2 攻略讀法](./progression-roadmap/)，把 `Superior`、`Mastery`、`Nightmare`、`Hell` 與 `Heroic` 串成實際養成順序。

## 架構總覽

- 職業系統（Classes）
  - 決定坦克、治療、輸出、支援的基本責任。
  - 後期會被天賦、裝備詞綴、加速、抗性與隊伍需求改寫。
  - 詳細名詞對照與裝備可用性可看 [職業系統與裝備可用性總覽](./classes/)。
- 物品與戰利品（Items & Loot）
  - 透過 rarity、quality tier、mods、set bonus、unique effect 與 legendary effect 形成刷寶核心。
  - 詳細稀有度、magic find、鑑定與商店策略可看 [物品與戰利品總覽](./items-loot/)，鑑定流程則可接著看 [鑑定（Identification）指南](./identification/)。
- 城鎮設施（Town - Edenburg（伊登堡））
  - 負責任務、補給、技能、鑑定、銀行、背包與裝備強化；完整入口可看 [Edenburg（伊登堡）城鎮設施總覽](./edenburg/)。
  - 酒館是接任務、查看排行榜與出發前 ready 的核心入口；可看 [酒館（Tavern）指南](./tavern/)。
  - 藥劑店負責補給、`Identify All` 與 caster / healer 向裝備；可看 [藥劑店（Apothecary）指南](./apothecary/)。
  - 鐵匠鋪負責重甲、重武器與 rune / crafting 類後期強化；可看 [鐵匠鋪（Blacksmith）指南](./blacksmith/)。
  - 商人負責背包擴張、皮甲與隨機庫存，是刷寶續航的後勤核心；可看 [商人（Merchant）指南](./merchant/)。
  - 每次地城結束後，角色成長大多在這裡完成。
- 戰鬥與機制（Combat & Mechanics）
  - aggro / threat、前後排位置、異常狀態、難度與隊伍人數會共同影響戰鬥結果。
  - 新手先學會等 tank 建立威脅值，再進入輸出或治療循環。
  - 地城任務、難度、導航、怪物 traits 與結算流程可看 [地城冒險與任務攻略](./dungeons/)，怪物 con、階級與特殊屬性則可看 [怪物分類與 Traits](./monsters/)。
  - 熱鍵、物品操作與聊天指令可看 [熱鍵與聊天指令速查](./hotkeys-commands/)。

## 職業系統

來源資料把 14 種職業先分成五大定位。這個分類適合入門，但不要把它當成最終強度排行。

| 定位 | 職業 | 核心印象 |
| ------ | ------ | ------ |
| 坦克（Tank） | 戰士（Warrior）、十字軍（Crusader） / 聖騎士（Paladin）、暗影騎士（Shadow Knight） | 承傷、建立仇恨值、控制隊伍推進節奏 |
| 治療（Healer） | 牧師（Cleric）、德魯伊（Druid）、薩滿（Shaman） | 治療、持續治療（HoT）、減益、資源與救場 |
| 物理輸出（Physical DPS） | 武僧（Monk）、遊俠（Ranger）、盜賊（Rogue） | 攻速、武器傷害、弓術、背刺、毒素或近戰爆發 |
| 魔法輸出（Magical DPS） | 巫師（Wizard）、術士（Warlock） / 死靈法師（Necromancer）、天騎士（Templar） / 魔法師（Magician） | 元素傷害、持續傷害（DoT）、恐懼、生命吸取、施法節奏 |
| 支援（Utility） | 吟遊詩人（Bard）、恩路者 / 幻術師（Enchanter） | 歌曲、加速、控場、緩速、魅惑與隊伍增益 |

> **提醒**
> 來源資料使用十字軍（Crusader）、術士（Warlock）、天騎士（Templar）等名稱；官方 wiki 或遊戲內可能顯示聖騎士（Paladin）、死靈法師（Necromancer）、魔法師（Magician）等對應名稱。遇到名稱不一致時，優先對照技能組。

## 物品與戰利品

NGO 的物品系統把老派 RPG 的刷寶感做成核心循環：一件裝備的價值不只取決於顏色，也取決於部位、底材階級、詞綴方向、set bonus、socket、rune plan 與角色 rotation。

| 系統 | 重點 | 延伸閱讀 |
| ------ | ------ | ------ |
| 稀有度（Rarities） | `Magic`、`Rare`、`Unique`、`Set`、`Legendary` 各自代表不同隨機性與固定效果 | [物品與戰利品總覽](./items-loot/) |
| 品質階級（Quality Tiers） | `Normal`、`Exceptional`、`Elite` 影響基礎性能與裝備階段 | [傳奇裝備（Legendary Items）清單](./legendary-items/) |
| 套裝（Set Items） | 綠色裝備，多件同套會啟用 `Set Bonus` | [套裝（Set Items）指南](./set-items/) |
| 符文（Runes） | 帶孔裝備可以鑲嵌 rune，永久補強特定性能 | [符文（Runes）指南](./runes/) |
| 賭博（Gambling） | 用 gold 嘗試定向取得特定部位或高階裝備 | 後期金幣出口；可看 [賭博（Gambling）指南](./gambling/) |

特殊狀態也會改寫裝備價值：

- `Ethereal`：來源摘要提到會提高基礎攻擊或防禦，但伴隨耐久風險。
- `Indestructible`：如果和 ethereal 同時出現，通常會讓裝備價值大幅提高。
- Sockets：有些低等裝備因 sockets 多，仍可能在後期有 rune space 價值。

## 城鎮設施

Edenburg（伊登堡）可以想成每次地城之間的整理台。打完一場回來，不只是賣垃圾，而是要把角色下一場的成功率往上推；如果想先看完整城鎮循環，直接看 [Edenburg（伊登堡）城鎮設施總覽](./edenburg/)。

| 設施 | 功能 | 使用時機 |
| ------ | ------ | ------ |
| 酒館（Tavern） | 接任務、前往地城、查看排行榜與 tips | 每次出發前確認任務、掉落偏好與隊伍目標；可看 [酒館（Tavern）指南](./tavern/) |
| 學院（Academy） | 學習或升級職業技能 | 金幣優先投入常用 rotation 技能 |
| 藥劑店（Apothecary） | 購買藥水、鑑定卷軸、使用 `Identify All` 類服務 | 地城後大量鑑定與補給；可看 [藥劑店（Apothecary）指南](./apothecary/) |
| 鐵匠鋪（Blacksmith） | 購買重型武裝、裝備升級、rune / crafting 相關功能 | 裝備確定會穿一段時間後再投入；可看 [鐵匠鋪（Blacksmith）指南](./blacksmith/) |
| 商人（Merchant） | 擴展背包、購買皮甲或一般商品 | 背包空間不足會直接降低刷寶效率；可看 [商人（Merchant）指南](./merchant/) |
| 銀行（Bank） | 帳號共享倉庫 | 存 set、分身裝、抗性裝與高價交易品 |
| 公會大廳（Guild Hall） | 公會建立與管理 | 長期組隊、社群與固定團需求 |

## 遊戲機制

戰鬥不是只看面板。NGO 的地城節奏由 threat、站位、狀態、技能優先序與隊伍人數共同決定。

### 戰鬥核心

- 威脅值 / 仇恨（Aggro / Threat）：坦克需要先穩住威脅值，輸出和治療過早爆發都可能把怪拉走。
- 位置影響：前排與後排會影響物理攻擊效率，部分技能也會受目標位置限制。
- 異常狀態：`Stun`、`Fear`、`Silence`、root、slow 等控制會大幅改變戰鬥壓力。
- Rotation：高階玩法的重點是讓技能、talents、裝備詞綴與隊友 buff 在正確窗口疊起來。

### 隊伍協作

- 隊伍最多 5 人；人數增加通常也會提高風險與獎勵。
- 物理職常很吃 haste、命中、攻速與目標位置。
- 魔法職常看 casting speed、enemy resistance reduction、資源續航與控制窗口。
- 吟遊詩人（Bard）、恩路者 / 幻術師（Enchanter）、薩滿（Shaman）、天騎士（Templar） / 魔法師（Magician）類支援工具，常是整隊節奏變快的關鍵。

### 地城探險

- 地城布局、怪物與 boss 條件帶有隨機性。
- 普通（`Normal`）與英雄（`Heroic`）難度會改變風險與掉落期待。
- 首通、boss、monster con、任務偏好裝備類型，都可能影響 farm 路線。

## 下一步怎麼拆

系統地圖看懂後，不要把所有細節塞回同一頁。依你現在卡住的問題分流：

- 想決定職業、定位或裝備可用性：看 [職業系統與裝備可用性總覽](./classes/)。
- 想把成長節點接到 `Hell` / `Heroic`：看 [進度路線與 FC2 攻略讀法](./progression-roadmap/)。
- 想規劃地城、怪物 traits 與任務：看 [地城冒險與任務攻略](./dungeons/)。
- 想整理掉落、鑑定、留裝與金幣效率：看 [物品與戰利品總覽](./items-loot/)。
- 想研究牧師後期刷區域：看 [牧師刷區域指南](./cleric-farming-zones/)。

---

> **版本提醒**
> 本頁是玩家攻略與社群資料的繁中整理版；技能、裝備、掉落、配方與版本敏感數值，請以目前遊戲內 tooltip / UI 與官方公告為準。

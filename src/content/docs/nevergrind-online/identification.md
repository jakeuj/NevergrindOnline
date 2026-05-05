---
title: "Nevergrind Online 鑑定（Identification）指南"
description: "Nevergrind Online 的 Identification 鑑定不是單純的背包手續，而是把「未知戰利品」轉成「角色戰力」或「金幣收入」的關鍵流程。撿到未鑑定裝備後，先用部位、等級、職業可用性和潛在詞綴價值篩選，再用 Identify Scrolls 或城鎮 nevergrind-online-apothecary.md 的 Identify All"
sourcePages: []
reviewedAt: "2026-05-03"
sourceLastModified: "N/A"
status: "整理改寫"
---

Nevergrind Online 的 `Identification` 鑑定不是單純的背包手續，而是把「未知戰利品」轉成「角色戰力」或「金幣收入」的關鍵流程。撿到未鑑定裝備後，先用部位、等級、職業可用性和潛在詞綴價值篩選，再用 `Identify Scrolls` 或城鎮 [藥劑店（Apothecary）](./apothecary/) 的 `Identify All` 類服務揭示 mods，會比把每件裝備都無腦鑑定更有效率。

- 檢視日期：`2026-05-03`
- 分類：[Nevergrind Online 物品與戰利品總覽](./items-loot/)
- 資料來源：來源摘要、Swiftyhorn / 高階玩家指南相關來源摘要、公開 wiki 相關頁面整理
- 版本提醒：鑑定 UI、按鈕名稱、販售價格加成與掉落狀態可能因版本調整；實際操作請以目前遊戲內 tooltip 與城鎮 UI 為準

> **快速重點**
> 鑑定會揭示裝備的 mods、roll range 與實際價值，是刷寶循環裡從「期待」到「決策」的分水嶺。
> 地城中可用 `Identify Scrolls` 即時篩選，回城後則優先用 `Apothecary` 的 `Identify All` 類服務處理大量戰利品。
> 不要每件都花同樣心力；focus / stave、胴體、盾牌、頭盔與可能出 talents / 高抗性的裝備，通常更值得優先鑑定。

## 鑑定在刷寶循環中的位置

NGO 的物品系統保留了老派 RPG 的未知感：掉落時你先看到稀有度、部位與大致類型，但真正決定價值的 mods、數值與 roll，通常要鑑定後才知道。這讓每次回城整理背包都帶一點開獎感，也讓裝備篩選成為刷寶效率的一部分。

鑑定後通常會確認這些資訊：

- 裝備是否有 `Talents`、`All Talents`、才能樹加成或特定技能詞綴。
- 抗性、生命、資源、haste、attack、critical、magic find 等 mods 是否補到 build 缺口。
- [Unique Items](./unique-items/) 的固定詞綴實際 roll 值是否夠好。
- [Set Items](./set-items/) 是否值得湊 bonus，或只是暫時保留。
- 裝備販售價格是否因高價值 mods 明顯提高。

換句話說，鑑定不是在回答「這件是什麼顏色」，而是在回答「這件到底值不值得留下、穿上、賣掉、交易或給分身」。

## 兩種常見鑑定方式

來源摘要提到兩種主要做法：地城中用卷軸即時判斷，回城後用 `Apothecary` 大量處理。

| 方式 | 適合情境 | 使用重點 |
| ------ | ------ | ------ |
| `Identify Scrolls` | 地城中背包快滿、需要立刻決定去留 | 適合用在高價部位、可能升級當前裝備的掉落，或你不想帶回城的疑似低價物 |
| [藥劑店（Apothecary）](./apothecary/) 的 `Identify All` 類服務 | 回城後背包有大量未鑑定裝備 | 適合地城結束後一次處理，省去逐件點卷軸的操作 |

> **提醒**
> 不同版本或語系的按鈕名稱可能顯示為 `Identify All`、全部鑑定、全て鑑定或近似文字。這篇以來源摘要中的功能概念整理，實際名稱請以目前 UI 為準。

## 什麼裝備值得優先鑑定

背包空間、卷軸、回城時間和注意力都是資源。比較穩的做法，是先把未鑑定裝備分成「可能有自用價值」、「可能有高售價」、「大概率可丟」三類。

優先鑑定的候選：

- Focus / stave / magic blunt：caster、support 或混合法系很在意 talents、spell damage、faster cast rate 與 enemy resistance reduction。
- 胴體：基礎 armor、生命、抗性與防禦詞綴通常有較高實用與販售價值。
- 盾牌：block、all res、status res、magic damage reduction 或生存詞綴都值得看。
- 頭盔：talents、主屬性、magic find、抗性或資源詞綴可能讓它成為長期過渡裝。
- 飾品：amulet、ring、charm 不靠 armor，詞綴命中時可以跨很久。

較快放棄的情況：

- 等級或 quality tier 太低，且沒有特殊部位價值。
- 職業不能用，分身也沒有需求。
- 部位已經有明顯更好的 [Magic Items](./magic-items/)、[Rare Items](./rare-items/)、unique 或 set 候選。
- 背包空間不足，而這件裝備不是高價部位也不補當前缺口。

## 鑑定與金錢效率

來源摘要強調，鑑定後揭示的 mods 會影響裝備販售價格。帶有 talents、高額抗性或其他高價值詞綴的裝備，就算不適合目前角色，也可能賣出比未鑑定狀態更好的價格。

比較實用的經濟判斷：

1. 先留高價部位，例如 focus / stave、胴體、盾牌、頭盔與飾品。
2. 回城後用 `Identify All` 類服務批量揭示 mods。
3. 先看 talents、抗性、主屬性、資源、haste、attack、critical、magic find。
4. 自用候選放一邊，分身或交易候選放銀行。
5. 沒有 build 價值、交易價值或高售價的裝備再出售。

> **提示**
> 如果你已經開始刷高難度地城，不要只用稀有度顏色判斷是否鑑定。藍色高抗性、黃色 talents、紫色好 roll、綠色關鍵套裝件，都可能因鑑定結果翻身。

## 和不同稀有度的關係

鑑定對不同稀有度的意義不完全相同。

| 稀有度 | 鑑定後最該看什麼 |
| ------ | ------ |
| 藍色 `Magic` | 1 到 2 個 mods 是否有高 roll，尤其是抗性、資源或 talents 類短板 |
| 黃色 `Rare` | 2 到 6 個 mods 是否同時支援 build，而不是每條都只沾一點邊 |
| 紫色 `Unique` | 固定 mods 的實際數值、隨機技能或關鍵詞綴是否命中 |
| 綠色 `Set` | 單件屬性是否能穿、套裝件數是否值得為 bonus 保留 |
| Legendary / Mythical | 是否有足以改變 build 的特殊效果、觸發、技能或 roll |

因此，鑑定本身也是一種篩選策略：越接近後期，越不是「看到高稀有度就穿」，而是要看鑑定後的詞綴是否真的改善 rotation、生存、資源、magic find 或隊伍定位。

## 建議流程

1. 地城中先撿高稀有度、缺口部位與高價部位。
2. 背包快滿時，用 `Identify Scrolls` 處理最有可能升級或最高價的未鑑定裝。
3. 回城後先補給，再找 [藥劑店（Apothecary）](./apothecary/) 使用 `Identify All` 類服務。
4. 依照自用、分身、交易、出售四類整理。
5. 對可能投入 [符文](./runes/) 或升級的裝備，再多檢查 quality tier、sockets、roll 與長期替代品。

鑑定真正好玩的地方，是它把掉落物從「看起來可能有用」變成可比較的具體選擇。這也是 NGO 刷寶節奏很老派、但仍能讓玩家一直期待下一件掉落的原因。

---

> **版本提醒**
> 本頁是玩家攻略與社群資料的繁中整理版；技能、裝備、掉落、配方與版本敏感數值，請以目前遊戲內 tooltip / UI 與官方公告為準。

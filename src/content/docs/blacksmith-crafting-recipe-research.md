---
title: "Nevergrind Online 鐵匠鋪製作與配方（Blacksmith Crafting / Recipe）深度筆記"
description: "Nevergrind Online 的鐵匠鋪製作（Blacksmith crafting）不是單一版本一次完成的功能，而是從 Season 2 的 runes、socketed items、ethereal / indestructible 裝備開始鋪路，再逐步啟用 enchanting counter、Craft tab、Mythical items / "
sourcePages:
  - file: "mythical.html"
    title: "クラフト | Nevergrind Online 攻略DB"
    url: "https://atelier3.web.fc2.com/ngo/mythical.html"
    lastModified: "Thu, 26 Jun 2025 00:26:03 GMT"
reviewedAt: "2026-05-03"
sourceLastModified: "Thu, 26 Jun 2025 00:26:03 GMT"
status: "整理改寫"
---

Nevergrind Online 的鐵匠鋪製作（Blacksmith crafting）不是單一版本一次完成的功能，而是從 Season 2 的 runes、socketed items、ethereal / indestructible 裝備開始鋪路，再逐步啟用 enchanting counter、Craft tab、Mythical items / Rune Words、rune upgrade 與 Season 3 全配方。實務上，玩家應該先理解「已公開的規則」與「尚未公開的精確配方」之間的界線，再決定哪些 socketed base 值得留下來做 Mythical 裝備。

- 檢視日期：`2026-05-03`
- 前置閱讀：[鐵匠鋪（Blacksmith）指南](./blacksmith/)、[符文（Runes）指南](./runes/)
- 資料來源：使用者提供的研究報告摘要、SteamDB patch notes、[Nevergrind Online 攻略DB：クラフト](https://atelier3.web.fc2.com/ngo/mythical.html)
- 版本提醒：crafting recipes、rune upgrade、socket 上限、UI 成本顯示與可 craft 底材，仍可能隨版本更新；投入稀有 rune 前請再看當前遊戲內 UI

> **快速重點**
> 官方公開資料能確認 crafting 系統、底材規則、已完成的 Mythical item 家族與部分 bug 修正，但沒有公開完整逐件 recipe list。
> Crafting 最重要的素材不是只有 rune，而是灰色 / socketed base；帶有 special properties、Superior、Ethereal 或正確職業詞綴的 base 會大幅影響成品價值。
> 目前更安全的判讀方式是：規則看官方 patch notes，成品方向看資料庫，實際 recipe、金幣成本與可 craft 狀態以遊戲內 Craft tab 為準。

## 證據可靠性怎麼看

這類資料最容易混在一起：官方 patch notes、SteamDB 鏡射、日文攻略DB、社群資料庫、玩家討論串與舊版 Nevergrind wiki。建議用下面的順序採信：

| 來源類型 | 適合確認 | 不適合直接推論 |
| ------ | ------ | ------ |
| 官方公告 / SteamDB patch notes | 系統何時啟用、哪些 item family 完成、哪些 bug 被修 | 每件成品的完整 rune formula |
| 遊戲內 Craft tab / tooltip | 當前版本 recipe、gold cost、base 是否可用 | 跨版本歷史規則 |
| 攻略DB / 社群資料庫 | 成品名稱、roll 範圍、常見配裝方向 | 官方未公開的機率與成本 |
| 玩家討論串 | 常見卡住點、特定版本 bug | 已修正後的永久規則 |

> **注意**
> 原版 Nevergrind 的 item upgrade 資料不能直接套用到 Nevergrind Online。兩者名稱接近，但系統與版本脈絡不同。

## 已確認的系統架構

目前公開資料最清楚的分界，是 `Enchanting Counter` 與 `Craft tab / Crafting Counter`：

| 功能 | 做什麼 | 重點 |
| ------ | ------ | ------ |
| `Enchanting Counter` | 把 rune bonus 加到 socketed item 上 | 這是一般 rune socketing / enchanting，重點是 rune 對應部位與裝備是否值得長期穿 |
| `Craft tab` / `Crafting Counter` | 用 socketed base + recipe runes 製作 Mythical / Rune Words 類裝備 | runes 不需要先鑲進裝備；base 的 sockets 數、底材等級與原生詞綴才是核心 |
| Rune upgrade via crafting | 在 crafting counter 進行 rune upgrade | patch notes 顯示此功能曾分批測試與修成本顯示，實際成本看當前 UI |

最保守的實務結論是：crafting 更像「條件符合才可執行」的交易，不是有公開失敗率的 RNG 鍛造。公開資料有提到 gold、runes、正確 base 與正確 socket count，但沒有找到官方公開的成功率、失敗率、製作時間、炸裝機率或黑鐵匠熟練度需求。

<a id="crafting-quick-guide"></a>

## 快速製作指南

如果只想確認一輪 Craft 要怎麼做，可以先照這個順序檢查：

1. 前往 Edenburg（伊登堡）右側的 `Blacksmith`，切到 `Craft` tab。
2. 把要作為素體的灰色 / socketed base item 放在背包中。
3. 把 recipe 要求的 runes 放在背包中，不需要先把 runes 鑲進 base。
4. 選取 base item，確認 `Craft` 按鈕、gold、runes、base type 與 socket count 都符合目前 blueprint。
5. 執行 Craft 後，成品會轉成 Mythical / Rune Words 類裝備。

| 檢查點 | 判斷 |
| ------ | ------ |
| Base 顏色 / 狀態 | 使用灰色 socketed item，或帶 sockets 的白色裝備 |
| Socket count | 必須剛好等於 recipe rune 數；孔數過多或過少都不適合 |
| Runes | 只要在背包中即可，Craft 不是先鑲嵌再合成 |
| Gold | 若按鈕沒有亮，先檢查目前 blueprint 顯示的成本 |
| 成品限制 | Craft 後 sockets 會被消耗，通常不要期待再額外 rune socketing |

> **提醒**
> Craft 使用的 rune 不會把一般鑲嵌效果帶到成品上。成品吃的是 recipe 給的 Mythical / Rune Words 屬性，而不是「rune bonus + recipe bonus」雙重疊加。

## 素體裝備（Base Item）為什麼變重要

Crafting 系統讓灰色 / socketed base 的價值被重新定義。SteamDB patch notes 顯示，socketed items 後來能帶 special properties，normal / socketed items 也能出現在 vendors；攻略DB Craft 頁則補充，craft 後 base 上既有 talents、skill enhancements、Superior、Ethereal 與材質 / 基礎性能都會影響成品。

挑 base 時先看這些：

| 判斷 | 為什麼重要 |
| ------ | ------ |
| Sockets 數 | 必須剛好等於 recipe 要求的 rune 數，多一孔或少一孔都不適合 |
| Special properties | 官方 patch notes 指出 socketed base 的 special properties 在成功 craft Mythical item 後會保留 |
| `Superior` | 可保留武器傷害或防具物理防禦加成，但也曾有計算 bug 被修正 |
| `Ethereal` | 狀態會繼承，但 craft 不會恢復耐久度；是否值得投資要看風險 |
| 職業 talents / skill enhancements | 若 base 已有特定職業方向，成品隨機 mod 可能被鎖定到該職業 |
| Base level | 成品 required level 會取 recipe level 與 base item level 較高者 |
| 材質與基礎數值 | 成品的攻擊、速度、防禦與材質依 base 而定，例如 cloth base 做出來仍是 cloth armor |

<a id="crafting-base-selection"></a>

## 素材選擇優先級

素材選擇可以先分成三層：能不能 craft、值不值得 craft、是否值得投入高階 rune。第一層是硬性規則，第二層看 base 本身的品質，第三層才進入職業與 build 的微調。

| 層級 | 先看什麼 | 判斷 |
| ------ | ------ | ------ |
| 硬性規則 | 灰色 / socketed base、正確 type、正確 sockets 數 | 不符合 recipe 就不能 craft；孔數多一孔也不是加分 |
| 基礎性能 | `Normal` / `Exceptional` / `Elite`、base damage / speed / armor、required level | 高階底材會提高成品上限，但 required level 也會跟著走 |
| 特殊狀態 | `Superior`、`Ethereal`、`Indestructible`、special properties | 這些會決定是否值得投入稀有符文與長期保留 |
| 詞綴方向 | talents、skill enhancements、職業鎖定、資源 / 抗性 / 速度缺口 | 好 base 應該服務 build，而不是只因為 sockets 多 |

品質階級要和角色階段一起看：

| Quality tier | 適合用途 | 素材判斷 |
| ------ | ------ | ------ |
| `Normal` | 前期、測試 recipe、便宜確認 Craft tab 行為 | 不建議投入稀有 rune，除非它有特殊 sockets / utility 價值 |
| `Exceptional` | 中期成形與過渡 craft | 若 sockets、Superior 或職業詞綴正確，可以撐到後期前段 |
| `Elite` | 終盤 craft 與高成本 rune plan | 優先比較 base performance、required level、roll 與是否真的符合 build |

`Superior` 與 `Ethereal` 是最容易讓素材價值跳級的兩個標籤：

- `Superior`：來源摘要整理為武器可提高額外傷害、防具可提高物理防禦；這些加成會跟製作後屬性一起計算。
- `Ethereal`：來源摘要整理為武器基礎攻擊力提高約 33%、防具基礎防禦提高約 50%，但有耐久風險；craft 不會恢復耐久。
- `Indestructible`：若和 `Ethereal` 同時出現，通常會大幅提高素材價值，因為它能抵消最麻煩的耐久問題。

> **注意**
> Ethereal / Indestructible 的數值、耐久消耗與修復規則要以當前 tooltip 為準。只要裝備沒有可靠的耐久解法，就不要把最稀有的 rune 投進快壞掉的 ethereal base。

幾個特別值得記的素材方向：

| 方向 | 候選 / 判斷 | 為什麼值得看 |
| ------ | ------ | ------ |
| 物理職 ranged slot / 副手工具裝 | `Demetrium's Ballista`、高 sockets bow、來源摘要提到的 `Stormcaller Bow` | sockets 數或 `All Talents` 可能讓低等或非主手裝備仍有後期工具價值 |
| Caster / hybrid 武器 | focus、stave、piercing weapon、1H blunt | 不只看法術詞綴，也要看 weapon speed 是否配合 rotation / internal cooldown |
| 高價值回收素材 | plate、mail、high-level weapon base、focus / stave | 即使不 craft，鑑定後若有 talents、抗性或好底材，也可能有高售價 |
| 職業鎖定素材 | 帶特定職業 talents / skill enhancements 的 socketed base | Craft 追加 mod 可能鎖定該職業，適合追特定 build |

> **提醒**
> 來源摘要提到巫師（Wizard）雷型可能會依 internal cooldown 追特定 weapon speed，例如 1.5 到 1.7 區間的 piercing weapon。這類建議很吃版本與流派，寫成「速度匹配原則」比寫死某一把武器更安全。

<a id="crafting-inheritance"></a>

## 屬性繼承規則

Crafting 的核心不是把一件灰裝「洗成全新物品」，而是讓 base 的一部分價值被帶進 Mythical / Rune Words 成品。挑素材時可以用這張表確認哪些東西會影響成品：

| 類型 | 會怎麼影響成品 | 注意 |
| ------ | ------ | ------ |
| 基礎攻擊 / 速度 | 武器 base damage 與 speed 依素體而定 | 速度可能影響 proc、rotation 或 internal cooldown |
| 防禦 / 材質 | 防具 armor、physical defense 與 cloth / leather / mail / plate 材質依素體而定 | 用 cloth base 做出來仍是 cloth；職業可穿性要先確認 |
| Talents | base 上既有 talents 會保留；craft 新增 talents 不會重複抽到已存在項目 | 這能降低「重複浪費」的風險，但仍要看實際 roll |
| Skill enhancements | base 上既有 skill enhancements 會保留，且可能和 craft 新增項目堆疊 | 若剛好命中主技能，素材價值會大幅提高 |
| 職業方向 | base 有特定職業 talents / skill enhancements 時，craft 隨機 mod 可能鎖定該職業 | 適合追特定職業畢業裝，也代表錯職 base 可能不適合 |
| `Superior` | 額外 weapon damage 或 armor bonus 會和成品屬性一起計算 | 防具相關計算曾有 patch 修正，信任當前 UI |
| `Ethereal` | ethereal 狀態會保留，並保留其基礎性能優勢與耐久風險 | craft 不會恢復耐久；沒有 `Indestructible` 時要格外保守 |
| Required level | 成品取 base level 與 recipe level 較高者 | 不能靠低階 recipe 規避高階 base 的等級需求 |
| Sockets | Craft 後 sockets 會被視為消耗 | 不要期待成品再額外一般 socketing |
| Rune tooltip bonus | Craft 用的 runes 不會把一般鑲嵌效果附加到成品 | Craft 是 recipe 消耗，不是先 socket 再疊 recipe |

> **注意**
> 不要把已經鑲嵌過 rune 的裝備當成正常 craft base。SteamDB patch notes 曾把 previously enchanted items 可被 craft 視為 bug；實務上請用乾淨、符合 recipe 的 socketed base 來判斷。

## 官方明確提到的神話系列（Mythical Families）

官方沒有公開完整逐件 recipe list，但 patch notes 已經明確點名 Season 3 前後完成的一批 Mythical item families。

| 類型 | 官方公開狀態 | 筆記判讀 |
| ------ | ------ | ------ |
| Helmets | 2025-05-03 patch notes 提到完成 | 可視為 Season 3 Mythical crafting 家族之一 |
| Chest armor | 2025-05-03 patch notes 提到完成 | 胸甲底材要特別注意 Superior / armor 計算與 required level |
| Shields | 2025-05-04 patch notes 提到完成 | shield socket 上限與 rune / armor 顯示曾被調整，實作看當前 UI |
| Focus items | 2025-05-09 patch notes 提到完成 | 有一件 focus item 曾先在 Season 2 測試 |
| Bows | 2025-05-11 patch notes 提到完成 | 有一件 bow item 曾先解鎖測試 |
| Staves | 2025-05-17 patch notes 提到完成 | caster / healer 需要同時看 base、cast / resource 與職業詞綴 |
| 1HB、1HS、2HB、2HS、piercing weapons | 2025-05-17 patch notes 提到完成 | 這批構成近戰武器 Mythical crafting 的主要骨架 |
| All recipes | 2025-05-29 patch notes 提到 Season 3 crafting counter 開放全部 recipes | 舊版「preview / testing」資訊只當歷史脈絡，配方以當前 UI 為準 |

沒有在官方公告中逐件公開的內容，例如某件成品確切需要哪幾顆 rune、各幾顆、需要多少 gold、是否有隱藏權重，筆記中應維持「未公開」或「以 UI 為準」，不要把社群傳聞寫成固定規則。

## 素材與刷寶（farming）方向

想做 Mythical / Rune Words，素材管線比單件裝備更重要。

1. 先保留灰色 / socketed base，尤其是帶 special properties、Superior 或職業詞綴的底材。
2. 用鐵匠鋪（Blacksmith）、藥劑店（Apothecary）、商人（Merchant）巡店補 normal / socketed base；商店庫存通常會隨角色等級與 restock 節奏變動，來源整理可先抓約 1 小時巡一次，但仍以當前 UI 為準。
3. 若目標是稀有 rune，優先關注 party size rare rune bonus、Heroic Hell rune drop rate，以及 rune shrine。
4. 若目標是好 base，armor / weapon shrines 值得納入路線，因為 patch notes 明說它們有高機率掉 socketed items，並服務 crafting 目的。
5. 做裝前先到 Craft tab 確認 recipe、gold、runes、base type、socket count 與 required level。

簡化流程可以記成：

```mermaid
flowchart TD
    A["Dungeon / Heroic Hell / Shrines"] --> B["Socketed Base"]
    A --> C["Runes"]
    A --> D["Gold"]
    B --> E{"Base 是否符合 recipe"}
    C --> E
    D --> E
    E -->|否| F["保留、出售或換目標 recipe"]
    E -->|是| G["鐵匠鋪（Blacksmith） Craft tab"]
    G --> H["Mythical / Rune Words item"]
```

## 常見誤判

| 誤判 | 比較安全的判斷 |
| ------ | ------ |
| 有 sockets 就是好 craft base | sockets 只是門票；special properties、職業詞綴、Superior、Ethereal、quality tier 與 base level 才決定上限 |
| Craft 一定會吃到 rune 的一般鑲嵌效果 | Craft 消耗 rune 觸發 recipe，不等於先拿一般 rune bonus 再拿 recipe bonus |
| 找到一張舊配方表就能照抄 | Season 3 前後功能分階段開放，舊 preview 資訊只當歷史參考 |
| 成品等級看 recipe 就好 | 成品 required level 至少會考慮 base item level |
| 已 enchant 裝備也能拿來做 Mythical | patch notes 曾把 previously enchanted items 可被 craft 視為 bug |
| 成功率或失敗率可以假設存在 | 沒有官方公開百分比前，先把它當成條件式 crafting，而不是公開失敗率系統 |

## 版本與 bug 風險

Crafting 相關 patch notes 顯示，系統上線後修過不少 UI、成本、tooltip 與計算問題。這些不是要嚇人，而是提醒：看到舊截圖或舊討論串時，要先看日期。

| 日期 | 變動 / 修正 | 實務影響 |
| ------ | ------ | ------ |
| 2024-09-24 | runes、socketed items、ethereal、indestructible 進入遊戲 | Season 2 前置基礎形成 |
| 2024-10-24 | 鐵匠鋪（Blacksmith） enchanting counter 啟用 | 一般 rune socketing 正式可用 |
| 2024-10-27 | rare rune party bonus 加入 | 組隊刷 rune 的價值提高 |
| 2024-11-23 | Heroic Hell rune drop rate 提高 | 高難度路線更適合累積 rune |
| 2025-04-13 | socketed items 可帶 special properties | craft base 的保留價值上升 |
| 2025-04-22 | 修正 previously enchanted items 可被 craft 的問題 | 已 enchant 裝備不要當正常 craft base |
| 2025-05-04 | 修正 crafting slot tooltip、Superior armor 與固定 armor bonus 計算 | 評估防具 base 時要信任新版 UI，不要用舊版數字 |
| 2025-05-17 | 修正 crafting window 替換物品造成 inventory disabled 的問題 | 舊版 UI 卡住問題可能已不適用 |
| 2025-05-20 | rune upgrade via crafting 與 crafting UI item icons 加入 | Craft tab 開始同時承擔 recipe 分類與 rune upgrade |
| 2025-05-29 | Season 3 full crafting system unlocked | 以 Season 3 後 UI 當主準 |
| 2025-06-28 | armor / weapon / rune shrines 加入 | shrines 成為 crafting 素材來源之一 |
| 2025-10-07 | 修正 craft rune 後成本顯示錯誤 | rune upgrade / crafting cost 看當前 UI |

## 實務結論

鐵匠鋪（Blacksmith） crafting 的重點不是背一張不存在於官方公告中的完整配方表，而是建立一套穩定判斷：

1. 規則看官方 patch notes 與當前遊戲內 UI。
2. 目標成品可以參考攻略DB / 社群資料庫，但不要把未公開 recipe 寫成定論。
3. 灰色 / socketed base 只要帶有 special properties、Superior、Ethereal 或職業詞綴，就值得暫存比較。
4. 高階 rune 不要投入測試用 base；先用便宜素材確認 UI 邏輯。
5. 多人、Heroic Hell、rune shrine、armor / weapon shrine 都應納入 crafting 素材農法。

<a id="fc2-recipe-full-table"></a>

## FC2 Recipe 全量表

FC2 的 recipe 頁已整理成 [FC2 Recipe 全量表](./fc2-recipes/)，保留 recipe 名稱、需求等級、rune 組合與 mods。本文保留 crafting 規則與風險判讀。

## 參考資料

- [Nevergrind Online 攻略DB：クラフト](https://atelier3.web.fc2.com/ngo/mythical.html)
- [SteamDB: Season 2 Preview Patch](https://steamdb.info/patchnotes/15803867/)
- [SteamDB: Season 2 Begins! Enchanting With Runes Enabled](https://steamdb.info/patchnotes/16172899/)
- [SteamDB: Rune party bonus](https://steamdb.info/patchnotes/16195469/)
- [SteamDB: Improved rune drop rate in heroic hell](https://steamdb.info/patchnotes/16513214/)
- [SteamDB: Socketed items can now roll special properties](https://steamdb.info/patchnotes/18087916/)
- [SteamDB: Added Superior items and future crafting functionality](https://steamdb.info/patchnotes/18094203/)
- [SteamDB: Enabled the Crafting Counter](https://steamdb.info/patchnotes/18121869/)
- [SteamDB: Improved availability of socketed items](https://steamdb.info/patchnotes/18186975/)
- [SteamDB: Fixed crafting previously enchanted items](https://steamdb.info/patchnotes/18199384/)
- [SteamDB: Added new craftable mythical items](https://steamdb.info/patchnotes/18332694/)
- [SteamDB: Completed season 3 mythical shields](https://steamdb.info/patchnotes/18335716/)
- [SteamDB: Completed season 3 mythical focus items](https://steamdb.info/patchnotes/18397740/)
- [SteamDB: Completed season 3 mythical bows](https://steamdb.info/patchnotes/18421827/)
- [SteamDB: Completed initial season 3 crafting items](https://steamdb.info/patchnotes/18504437/)
- [SteamDB: Added ability to upgrade runes via crafting](https://steamdb.info/patchnotes/18527675/)
- [SteamDB: Season 3 full crafting system unlocked](https://steamdb.info/patchnotes/18665521/)
- [SteamDB: 3 New Room Types](https://steamdb.info/patchnotes/19038726/)
- [SteamDB: Crafting and 學院（Academy） Bug Fixes](https://steamdb.info/patchnotes/20293638/)

---

> **版本提醒**
> 本頁是玩家攻略與社群資料的繁中整理版；技能、裝備、掉落、配方與版本敏感數值，請以目前遊戲內 tooltip / UI 與官方公告為準。

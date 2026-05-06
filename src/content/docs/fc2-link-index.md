---
title: "Nevergrind Online FC2 原站 HTML 對照索引"
description: "對照 FC2 原站 106 個 HTML 檔案的分類、整理目標與完成狀態；實際全量表格分散在職業、Unique、Set、Legendary、Recipe、Rune / Craft 與一般攻略參考頁。"
sourcePages:
  - file: "index.html"
    title: "Nevergrind Online 攻略DB"
    url: "https://atelier3.web.fc2.com/ngo/index.html"
    lastModified: "Thu, 26 Jun 2025 00:18:25 GMT"
  - file: "menu.html"
    title: "menu.html"
    url: "https://atelier3.web.fc2.com/ngo/menu.html"
    lastModified: "Mon, 12 Jan 2026 18:07:47 GMT"
reviewedAt: "2026-05-05"
sourceLastModified: "Mon, 12 Jan 2026 18:07:47 GMT"
status: "整理改寫"
---

這篇是 FC2 原站 HTML 對照索引，負責記錄 106 個來源檔案的分類、整理目標與完成狀態；實際全量表格分散在職業、Unique、Set、Legendary、Recipe、Rune / Craft 與一般攻略參考頁。

- 檢視日期：`2026-05-05`
- 分類：[Nevergrind Online（絕不刷怪）遊戲指南](./guide/)
- 來源首頁：[Nevergrind Online 攻略DB](https://atelier3.web.fc2.com/ngo/index.html)
- 抓取範圍：本地鏡像中的 `/ngo/*.html` 與 `/ngo/` 內容圖片；CSS、JavaScript 與 tracking 圖不搬入公開攻略
- 收錄數量：106 個 HTML，全部已有整理目標且狀態為完成
- 版本提醒：FC2 是玩家攻略快照；build、裝備、掉落與版本假設可能落後目前遊戲版本

> **快速重點**
> 首頁看路線，本文查 FC2 原站頁面去哪個本地 topic。
> 完整表格已拆到大型參考頁，避免攻略首頁變成資料傾倒。
> 所有 FC2 claim 都以 player meta snapshot 處理，數值請回遊戲內 tooltip 確認。

<a id="fc2-local-file-classification"></a>

## 本地下載檔案分類

|副檔名|數量|處理方式|
|---|---:|---|
|`.png`|406|本地鏡像到 `/fc2-assets/ngo/`；主要是裝備、技能、符文與狀態圖示|
|`.html`|106|逐一抽出頁名、表格、數字與中文整理目標|
|`.jpg`|90|本地鏡像到 `/fc2-assets/ngo/`；主要是原站裝備例 / talent 圖|
|`.php`|1|FC2 counter / tracking 圖，記錄為 skipped，不下載、不公開|
|`.js`|3|不搬入 repo；只記錄工具頁用途|
|`.css`|2|不搬入 repo|

<a id="fc2-completion-matrix"></a>

## 全量整理完成矩陣

為避免搜尋索引把 106 列表格收成過大的單段內容，完成矩陣依來源類型拆成多段。每段欄位都固定為 `FC2 file`、`類型`、`整理目標 topic`、`狀態`、`備註`，全部狀態皆為完成。

|分段|內容|
|---|---|
|[一般與系統頁](#fc2-matrix-general-system)|首頁、流程、FAQ、工具、Legendary、Recipe、Rune、Craft、Item Mods、代表技能與嚴選 Unique 入口|
|[職業頁](#fc2-matrix-classes)|14 個 class build 頁|
|[Unique 武器](#fc2-matrix-unique-weapons)|Unique 總入口與武器 / 盾牌頁|
|[Unique 防具與飾品](#fc2-matrix-unique-armor-accessories)|Unique 防具、背部、Charm、Amulet、Ring 頁|
|[Set Normal](#fc2-matrix-set-normal)|Normal set 明細頁|
|[Set Exceptional](#fc2-matrix-set-exceptional)|Exceptional set 明細頁|
|[Set Elite](#fc2-matrix-set-elite)|Elite set 明細頁|

<a id="fc2-matrix-general-system"></a>

## 完成矩陣：一般與系統頁

|FC2 file|類型|整理目標 topic|狀態|備註|
|---|---|---|---|---|
|[`boss.html`](https://atelier3.web.fc2.com/ngo/boss.html)|一般攻略頁|`nevergrind-online-fc2-general-reference.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`charamake.html`](https://atelier3.web.fc2.com/ngo/charamake.html)|一般攻略頁|`nevergrind-online-fc2-general-reference.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`chart.html`](https://atelier3.web.fc2.com/ngo/chart.html)|一般攻略頁|`nevergrind-online-fc2-general-reference.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`dpscalc.html`](https://atelier3.web.fc2.com/ngo/dpscalc.html)|一般攻略頁|`nevergrind-online-fc2-general-reference.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`english.html`](https://atelier3.web.fc2.com/ngo/english.html)|一般攻略頁|`nevergrind-online-fc2-general-reference.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`faq.html`](https://atelier3.web.fc2.com/ngo/faq.html)|一般攻略頁|`nevergrind-online-fc2-general-reference.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`gambling.html`](https://atelier3.web.fc2.com/ngo/gambling.html)|一般攻略頁|`nevergrind-online-fc2-general-reference.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`index.html`](https://atelier3.web.fc2.com/ngo/index.html)|首頁|`nevergrind-online-fc2-link-index.md / nevergrind-online-fc2-general-reference.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`itemmods.html`](https://atelier3.web.fc2.com/ngo/itemmods.html)|Item Mods|`nevergrind-online-fc2-rune-craft-reference.md / terminology.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`legendary.html`](https://atelier3.web.fc2.com/ngo/legendary.html)|Legendary 全量表|`nevergrind-online-fc2-legendary-table.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`loot.html`](https://atelier3.web.fc2.com/ngo/loot.html)|一般攻略頁|`nevergrind-online-fc2-general-reference.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`menu.html`](https://atelier3.web.fc2.com/ngo/menu.html)|側欄導航|`nevergrind-online-fc2-link-index.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`mythical.html`](https://atelier3.web.fc2.com/ngo/mythical.html)|Craft 系統|`nevergrind-online-fc2-rune-craft-reference.md / blacksmith-crafting-recipe-research.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`recipe.html`](https://atelier3.web.fc2.com/ngo/recipe.html)|Recipe 全量表|`nevergrind-online-fc2-recipes.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`rune.html`](https://atelier3.web.fc2.com/ngo/rune.html)|Rune 全量表|`nevergrind-online-fc2-rune-craft-reference.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`runeselect.html`](https://atelier3.web.fc2.com/ngo/runeselect.html)|Rune Select|`nevergrind-online-fc2-rune-craft-reference.md / runes.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`selectlist.html`](https://atelier3.web.fc2.com/ngo/selectlist.html)|代表技能速查|`nevergrind-online-fc2-signature-skills.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`selectlist2.html`](https://atelier3.web.fc2.com/ngo/selectlist2.html)|嚴選 Unique 速查|`nevergrind-online-fc2-selected-unique-items.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`set.html`](https://atelier3.web.fc2.com/ngo/set.html)|Set 總入口|`nevergrind-online-fc2-set-normal.md / set-items.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`statuseffect.html`](https://atelier3.web.fc2.com/ngo/statuseffect.html)|一般攻略頁|`nevergrind-online-fc2-general-reference.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`unimon.html`](https://atelier3.web.fc2.com/ngo/unimon.html)|一般攻略頁|`nevergrind-online-fc2-general-reference.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`unique.html`](https://atelier3.web.fc2.com/ngo/unique.html)|Unique 總入口|`nevergrind-online-fc2-unique-weapons.md / unique-items.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|

<a id="fc2-matrix-classes"></a>

## 完成矩陣：職業頁

|FC2 file|類型|整理目標 topic|狀態|備註|
|---|---|---|---|---|
|[`bard.html`](https://atelier3.web.fc2.com/ngo/bard.html)|職業頁|`nevergrind-online-fc2-class-build-index.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`cleric.html`](https://atelier3.web.fc2.com/ngo/cleric.html)|職業頁|`nevergrind-online-fc2-class-build-index.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`crusader.html`](https://atelier3.web.fc2.com/ngo/crusader.html)|職業頁|`nevergrind-online-fc2-class-build-index.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`druid.html`](https://atelier3.web.fc2.com/ngo/druid.html)|職業頁|`nevergrind-online-fc2-class-build-index.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`enchanter.html`](https://atelier3.web.fc2.com/ngo/enchanter.html)|職業頁|`nevergrind-online-fc2-class-build-index.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`monk.html`](https://atelier3.web.fc2.com/ngo/monk.html)|職業頁|`nevergrind-online-fc2-class-build-index.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`ranger.html`](https://atelier3.web.fc2.com/ngo/ranger.html)|職業頁|`nevergrind-online-fc2-class-build-index.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`rogue.html`](https://atelier3.web.fc2.com/ngo/rogue.html)|職業頁|`nevergrind-online-fc2-class-build-index.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`shadowknight.html`](https://atelier3.web.fc2.com/ngo/shadowknight.html)|職業頁|`nevergrind-online-fc2-class-build-index.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`shaman.html`](https://atelier3.web.fc2.com/ngo/shaman.html)|職業頁|`nevergrind-online-fc2-class-build-index.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`templar.html`](https://atelier3.web.fc2.com/ngo/templar.html)|職業頁|`nevergrind-online-fc2-class-build-index.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`warlock.html`](https://atelier3.web.fc2.com/ngo/warlock.html)|職業頁|`nevergrind-online-fc2-class-build-index.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`warrior.html`](https://atelier3.web.fc2.com/ngo/warrior.html)|職業頁|`nevergrind-online-fc2-class-build-index.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`wizard.html`](https://atelier3.web.fc2.com/ngo/wizard.html)|職業頁|`nevergrind-online-fc2-class-build-index.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|

<a id="fc2-matrix-unique-weapons"></a>

## 完成矩陣：Unique 武器

|FC2 file|類型|整理目標 topic|狀態|備註|
|---|---|---|---|---|
|[`u1hbm.html`](https://atelier3.web.fc2.com/ngo/u1hbm.html)|Unique 武器頁|`nevergrind-online-fc2-unique-weapons.md / unique-items.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`u1hbp.html`](https://atelier3.web.fc2.com/ngo/u1hbp.html)|Unique 武器頁|`nevergrind-online-fc2-unique-weapons.md / unique-items.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`u1hs.html`](https://atelier3.web.fc2.com/ngo/u1hs.html)|Unique 武器頁|`nevergrind-online-fc2-unique-weapons.md / unique-items.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`u2hbm.html`](https://atelier3.web.fc2.com/ngo/u2hbm.html)|Unique 武器頁|`nevergrind-online-fc2-unique-weapons.md / unique-items.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`u2hbp.html`](https://atelier3.web.fc2.com/ngo/u2hbp.html)|Unique 武器頁|`nevergrind-online-fc2-unique-weapons.md / unique-items.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`u2hs.html`](https://atelier3.web.fc2.com/ngo/u2hs.html)|Unique 武器頁|`nevergrind-online-fc2-unique-weapons.md / unique-items.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`ubow.html`](https://atelier3.web.fc2.com/ngo/ubow.html)|Unique 武器頁|`nevergrind-online-fc2-unique-weapons.md / unique-items.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`upiercer.html`](https://atelier3.web.fc2.com/ngo/upiercer.html)|Unique 武器頁|`nevergrind-online-fc2-unique-weapons.md / unique-items.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`ushield.html`](https://atelier3.web.fc2.com/ngo/ushield.html)|Unique 武器頁|`nevergrind-online-fc2-unique-weapons.md / unique-items.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|

<a id="fc2-matrix-unique-armor-accessories"></a>

## 完成矩陣：Unique 防具與飾品

|FC2 file|類型|整理目標 topic|狀態|備註|
|---|---|---|---|---|
|[`uamulet.html`](https://atelier3.web.fc2.com/ngo/uamulet.html)|Unique 飾品頁|`nevergrind-online-fc2-unique-accessories.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`uback.html`](https://atelier3.web.fc2.com/ngo/uback.html)|Unique 防具頁|`nevergrind-online-fc2-unique-armor.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`ubelt.html`](https://atelier3.web.fc2.com/ngo/ubelt.html)|Unique 防具頁|`nevergrind-online-fc2-unique-armor.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`uboot.html`](https://atelier3.web.fc2.com/ngo/uboot.html)|Unique 防具頁|`nevergrind-online-fc2-unique-armor.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`ubracer.html`](https://atelier3.web.fc2.com/ngo/ubracer.html)|Unique 防具頁|`nevergrind-online-fc2-unique-armor.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`ucharm.html`](https://atelier3.web.fc2.com/ngo/ucharm.html)|Unique 飾品頁|`nevergrind-online-fc2-unique-accessories.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`uchest.html`](https://atelier3.web.fc2.com/ngo/uchest.html)|Unique 防具頁|`nevergrind-online-fc2-unique-armor.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`uglove.html`](https://atelier3.web.fc2.com/ngo/uglove.html)|Unique 防具頁|`nevergrind-online-fc2-unique-armor.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`uhead.html`](https://atelier3.web.fc2.com/ngo/uhead.html)|Unique 防具頁|`nevergrind-online-fc2-unique-armor.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`uleg.html`](https://atelier3.web.fc2.com/ngo/uleg.html)|Unique 防具頁|`nevergrind-online-fc2-unique-armor.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`uring.html`](https://atelier3.web.fc2.com/ngo/uring.html)|Unique 飾品頁|`nevergrind-online-fc2-unique-accessories.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`ushoulder.html`](https://atelier3.web.fc2.com/ngo/ushoulder.html)|Unique 防具頁|`nevergrind-online-fc2-unique-armor.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|

<a id="fc2-matrix-set-normal"></a>

## 完成矩陣：Set Normal

|FC2 file|類型|整理目標 topic|狀態|備註|
|---|---|---|---|---|
|[`aradune.html`](https://atelier3.web.fc2.com/ngo/aradune.html)|Set Normal 明細頁|`nevergrind-online-fc2-set-normal.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`bishop.html`](https://atelier3.web.fc2.com/ngo/bishop.html)|Set Normal 明細頁|`nevergrind-online-fc2-set-normal.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`chancellor.html`](https://atelier3.web.fc2.com/ngo/chancellor.html)|Set Normal 明細頁|`nevergrind-online-fc2-set-normal.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`demetrium.html`](https://atelier3.web.fc2.com/ngo/demetrium.html)|Set Normal 明細頁|`nevergrind-online-fc2-set-normal.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`emissary.html`](https://atelier3.web.fc2.com/ngo/emissary.html)|Set Normal 明細頁|`nevergrind-online-fc2-set-normal.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`furor.html`](https://atelier3.web.fc2.com/ngo/furor.html)|Set Normal 明細頁|`nevergrind-online-fc2-set-normal.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`golem.html`](https://atelier3.web.fc2.com/ngo/golem.html)|Set Normal 明細頁|`nevergrind-online-fc2-set-normal.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`magnate.html`](https://atelier3.web.fc2.com/ngo/magnate.html)|Set Normal 明細頁|`nevergrind-online-fc2-set-normal.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`martyr.html`](https://atelier3.web.fc2.com/ngo/martyr.html)|Set Normal 明細頁|`nevergrind-online-fc2-set-normal.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`minotaur.html`](https://atelier3.web.fc2.com/ngo/minotaur.html)|Set Normal 明細頁|`nevergrind-online-fc2-set-normal.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`miranda.html`](https://atelier3.web.fc2.com/ngo/miranda.html)|Set Normal 明細頁|`nevergrind-online-fc2-set-normal.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`orator.html`](https://atelier3.web.fc2.com/ngo/orator.html)|Set Normal 明細頁|`nevergrind-online-fc2-set-normal.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`sage.html`](https://atelier3.web.fc2.com/ngo/sage.html)|Set Normal 明細頁|`nevergrind-online-fc2-set-normal.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`samurai.html`](https://atelier3.web.fc2.com/ngo/samurai.html)|Set Normal 明細頁|`nevergrind-online-fc2-set-normal.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`sarvida.html`](https://atelier3.web.fc2.com/ngo/sarvida.html)|Set Normal 明細頁|`nevergrind-online-fc2-set-normal.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`servant.html`](https://atelier3.web.fc2.com/ngo/servant.html)|Set Normal 明細頁|`nevergrind-online-fc2-set-normal.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`tigole.html`](https://atelier3.web.fc2.com/ngo/tigole.html)|Set Normal 明細頁|`nevergrind-online-fc2-set-normal.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`vagabond.html`](https://atelier3.web.fc2.com/ngo/vagabond.html)|Set Normal 明細頁|`nevergrind-online-fc2-set-normal.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`vagrant.html`](https://atelier3.web.fc2.com/ngo/vagrant.html)|Set Normal 明細頁|`nevergrind-online-fc2-set-normal.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`wyvern.html`](https://atelier3.web.fc2.com/ngo/wyvern.html)|Set Normal 明細頁|`nevergrind-online-fc2-set-normal.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`zak.html`](https://atelier3.web.fc2.com/ngo/zak.html)|Set Normal 明細頁|`nevergrind-online-fc2-set-normal.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|

<a id="fc2-matrix-set-exceptional"></a>

## 完成矩陣：Set Exceptional

|FC2 file|類型|整理目標 topic|狀態|備註|
|---|---|---|---|---|
|[`alderon.html`](https://atelier3.web.fc2.com/ngo/alderon.html)|Set Exceptional 明細頁|`nevergrind-online-fc2-set-exceptional.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`asaph.html`](https://atelier3.web.fc2.com/ngo/asaph.html)|Set Exceptional 明細頁|`nevergrind-online-fc2-set-exceptional.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`daiyo.html`](https://atelier3.web.fc2.com/ngo/daiyo.html)|Set Exceptional 明細頁|`nevergrind-online-fc2-set-exceptional.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`falzain.html`](https://atelier3.web.fc2.com/ngo/falzain.html)|Set Exceptional 明細頁|`nevergrind-online-fc2-set-exceptional.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`fanatic.html`](https://atelier3.web.fc2.com/ngo/fanatic.html)|Set Exceptional 明細頁|`nevergrind-online-fc2-set-exceptional.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`scourge.html`](https://atelier3.web.fc2.com/ngo/scourge.html)|Set Exceptional 明細頁|`nevergrind-online-fc2-set-exceptional.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`scryer.html`](https://atelier3.web.fc2.com/ngo/scryer.html)|Set Exceptional 明細頁|`nevergrind-online-fc2-set-exceptional.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`sidey.html`](https://atelier3.web.fc2.com/ngo/sidey.html)|Set Exceptional 明細頁|`nevergrind-online-fc2-set-exceptional.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`starcaller.html`](https://atelier3.web.fc2.com/ngo/starcaller.html)|Set Exceptional 明細頁|`nevergrind-online-fc2-set-exceptional.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`stockade.html`](https://atelier3.web.fc2.com/ngo/stockade.html)|Set Exceptional 明細頁|`nevergrind-online-fc2-set-exceptional.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`tyranid.html`](https://atelier3.web.fc2.com/ngo/tyranid.html)|Set Exceptional 明細頁|`nevergrind-online-fc2-set-exceptional.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`ubar.html`](https://atelier3.web.fc2.com/ngo/ubar.html)|Set Exceptional 明細頁|`nevergrind-online-fc2-set-exceptional.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`volaki.html`](https://atelier3.web.fc2.com/ngo/volaki.html)|Set Exceptional 明細頁|`nevergrind-online-fc2-set-exceptional.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`zarth.html`](https://atelier3.web.fc2.com/ngo/zarth.html)|Set Exceptional 明細頁|`nevergrind-online-fc2-set-exceptional.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|

<a id="fc2-matrix-set-elite"></a>

## 完成矩陣：Set Elite

|FC2 file|類型|整理目標 topic|狀態|備註|
|---|---|---|---|---|
|[`daahoud.html`](https://atelier3.web.fc2.com/ngo/daahoud.html)|Set Elite 明細頁|`nevergrind-online-fc2-set-elite.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`edarion.html`](https://atelier3.web.fc2.com/ngo/edarion.html)|Set Elite 明細頁|`nevergrind-online-fc2-set-elite.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`fansy.html`](https://atelier3.web.fc2.com/ngo/fansy.html)|Set Elite 明細頁|`nevergrind-online-fc2-set-elite.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`jibekn.html`](https://atelier3.web.fc2.com/ngo/jibekn.html)|Set Elite 明細頁|`nevergrind-online-fc2-set-elite.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`noik.html`](https://atelier3.web.fc2.com/ngo/noik.html)|Set Elite 明細頁|`nevergrind-online-fc2-set-elite.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`nylith.html`](https://atelier3.web.fc2.com/ngo/nylith.html)|Set Elite 明細頁|`nevergrind-online-fc2-set-elite.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`procyon.html`](https://atelier3.web.fc2.com/ngo/procyon.html)|Set Elite 明細頁|`nevergrind-online-fc2-set-elite.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`sinifay.html`](https://atelier3.web.fc2.com/ngo/sinifay.html)|Set Elite 明細頁|`nevergrind-online-fc2-set-elite.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`spinalzz.html`](https://atelier3.web.fc2.com/ngo/spinalzz.html)|Set Elite 明細頁|`nevergrind-online-fc2-set-elite.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`swiftraven.html`](https://atelier3.web.fc2.com/ngo/swiftraven.html)|Set Elite 明細頁|`nevergrind-online-fc2-set-elite.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`tsubodai.html`](https://atelier3.web.fc2.com/ngo/tsubodai.html)|Set Elite 明細頁|`nevergrind-online-fc2-set-elite.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`tunso.html`](https://atelier3.web.fc2.com/ngo/tunso.html)|Set Elite 明細頁|`nevergrind-online-fc2-set-elite.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`yizeren.html`](https://atelier3.web.fc2.com/ngo/yizeren.html)|Set Elite 明細頁|`nevergrind-online-fc2-set-elite.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|
|[`zamtil.html`](https://atelier3.web.fc2.com/ngo/zamtil.html)|Set Elite 明細頁|`nevergrind-online-fc2-set-elite.md`|完成|已轉為繁體中文整理；內容圖片已本地鏡像。|

## 本地攻略入口

|主題|Topic|
|---|---|
|FC2 一般攻略全量參考|[nevergrind-online-fc2-general-reference.md](./fc2-general-reference/)|
|FC2 職業 Build 摘要|[nevergrind-online-fc2-class-build-index.md](./fc2-class-build-index/)|
|FC2 Unique 武器 / 防具 / 飾品|[武器](./fc2-unique-weapons/)、[防具](./fc2-unique-armor/)、[飾品](./fc2-unique-accessories/)|
|FC2 Set Normal / Exceptional / Elite|[Normal](./fc2-set-normal/)、[Exceptional](./fc2-set-exceptional/)、[Elite](./fc2-set-elite/)|
|FC2 Legendary 全量表|[nevergrind-online-fc2-legendary-table.md](./fc2-legendary-table/)|
|FC2 Recipe 全量表|[nevergrind-online-fc2-recipes.md](./fc2-recipes/)|
|FC2 Rune / Craft / Item Mods|[nevergrind-online-fc2-rune-craft-reference.md](./fc2-rune-craft-reference/)|

## 更新本地筆記時的注意事項

- 不要把 FC2 數值寫成官方保證。
- 若 FC2、Fandom、Steam 或遊戲內資料互相衝突，回到 [公開來源判讀與疑難排解](./public-source-notes/) 的來源優先順序。
- 新增 build 建議時，連到對應全量參考頁，而不是重複貼同一張大表。

---

> **版本提醒**
> 本頁是玩家攻略與社群資料的繁中整理版；技能、裝備、掉落、配方與版本敏感數值，請以目前遊戲內 tooltip / UI 與官方公告為準。

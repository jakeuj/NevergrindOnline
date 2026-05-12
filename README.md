# Nevergrind Online 攻略 DB 繁中版

這個 repository 是
[Nevergrind Online 攻略 DB](https://atelier3.web.fc2.com/ngo/index.html)
的台灣繁體中文整理版，使用 Astro Starlight 建立靜態文件站，並發布到
[ngo.jakeuj.com](https://ngo.jakeuj.com/)。

內容以 FC2 / atelier3 原站資料為主要來源，完整保留攻略資訊、段落結構、
表格、數值、來源連結、檢視日期與 `Last-Modified`。公開頁面以繁中翻譯
與整理改寫呈現；FC2 內容圖片會本地鏡像，CSS、JavaScript 與追蹤圖不搬入。

## 內容範圍

- FC2 原站 `/ngo/*.html` 共 106 頁的來源覆蓋矩陣。
- 一般攻略、流程、FAQ、角色建立、狀態異常、Boss 與特殊怪物。
- 14 職業頁、代表技能、職業 Build 與裝備判斷。
- 職業畢業裝倉庫保留清單，依 FC2 物品分類整理保留優先度與使用職業。
- Unique、Set、Legendary、Recipe、Rune、Craft 與 Item Mods 表格。
- 繁中補充攻略與中英名詞對照表。

FC2 內容是玩家攻略快照。Nevergrind Online 的技能、裝備、掉落與配方可能
隨版本更新調整，實際數值仍以目前遊戲內 tooltip / UI 與官方公告為準。

## 專案結構

```text
src/content/docs/                      繁中 Markdown / MDX 文件
src/content/docs/fc2-class-build-gear-keeper-list.md
                                       FC2 職業畢業裝倉庫保留清單
src/data/fc2-source-manifest.json    FC2 來源 manifest
src/data/fc2-image-manifest.json     FC2 內容圖片 manifest
src/data/fc2-topic-map.json          FC2 URL 到本地 topic 的對應
src/data/sidebar.json                Starlight 左側導覽
public/fc2-assets/ngo/               FC2 內容圖片本地鏡像
scripts/crawl-fc2.mjs                FC2 crawler
scripts/sync-fc2-images.mjs          FC2 圖片同步器
scripts/build-fc2-docs.mjs           FC2 HTML 到繁中 Markdown 產生器
scripts/check-coverage.mjs           106 頁來源覆蓋檢查
scripts/check-quality.mjs            內容品質與占位文字檢查
public/CNAME                         GitHub Pages custom domain
```

`.cache/fc2/`、`.astro/` 與 `dist/` 是本機產物，不應提交。

## 本機開發

需要 Node.js 22 以上。

```bash
npm install
npm run dev -- --port 4322
```

開啟 `http://127.0.0.1:4322/` 檢查站台。

## 更新 FC2 來源文件

重新抓取與產生 FC2 文件時，使用這組流程：

```bash
npm run crawl:fc2
npm run sync:fc2-images
npm run build:fc2-docs
npm run check:coverage
npm run check:quality
npm run lint:md
npm run build
```

重點規則：

- `crawl:fc2` 應維持 106 個 HTML 且沒有 crawler error。
- `sync:fc2-images` 只鏡像 FC2 `/ngo/` 內容圖，排除 counter / tracking 圖。
- `build:fc2-docs` 由 `.cache/fc2/pages` 重新產生 `fc2-*` 文件。
- 若翻譯或名詞不穩，優先修 `scripts/build-fc2-docs.mjs`，再重跑產生流程。
- 不要用舊的 Writerside seed 覆蓋 FC2 生成文件。
- 名詞以 `src/content/docs/terminology.md` 為準。
- `fc2-class-build-gear-keeper-list.md` 是補充整理頁，應保留玩家校正過的遊戲內裝備正名與 FC2 物品分類順序。

## 品質檢查

```bash
npm run check:coverage
npm run check:quality
npm run lint:md
npm run build
git diff --check
```

`check:coverage` 確認 106 個 FC2 URL 都有對應 topic 與 frontmatter。
`check:quality` 會阻擋摘要占位文字、舊式機器翻譯片語、名詞漂移、
缺少來源頁、表格資料遺失與未翻譯日文外洩；這個檢查用來提示「需要完整翻譯」，
不是要求刪除原站攻略內容。

## GitHub Pages

GitHub Actions 會在 push 到 `main` 時執行：

1. `npm ci`
2. `npm run check:coverage`
3. `npm run lint:md`
4. `npm run build`
5. 上傳 `dist/` 到 GitHub Pages

正式站使用 `public/CNAME` 中的 `ngo.jakeuj.com`。GitHub Pages 設定應選
`GitHub Actions` 作為 Build and deployment source。

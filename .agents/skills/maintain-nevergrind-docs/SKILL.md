---
name: maintain-nevergrind-docs
description: Maintain the repo-local Astro Starlight Traditional Chinese Nevergrind Online guide site, especially FC2 / atelier3 source-driven ingestion, zh-TW Markdown generation, terminology consistency, sidebar organization, coverage and quality gates, GitHub Pages publishing, and CNAME/domain-safe deployment. Use when Codex works in this repository on Nevergrind Online docs, FC2 HTML refreshes, placeholder cleanup, source URL coverage, translation quality, terminology drift, sidebar/menu changes, Starlight build issues, or pushing site updates.
---

# Maintain Nevergrind Docs

## Repo Shape

- Work from the current checkout's repository root, not from a hard-coded local path. Identify it with `git rev-parse --show-toplevel` or the current workspace directory before running scripts.
- Upstream repository: `https://github.com/jakeuj/NevergrindOnline`.
- Published site: `https://ngo.jakeuj.com/`.
- Public docs live under `src/content/docs/` so `https://ngo.jakeuj.com/` serves pages from root paths such as `/guide/` and `/fc2-general-reference/`.
- Do not place public docs under `src/content/docs/nevergrind-online/`; that would reintroduce the extra URL layer on the custom domain.
- The canonical terminology table is `src/content/docs/terminology.md`.
- The Starlight sidebar is data-driven from `src/data/sidebar.json`.
- FC2 routing lives in `src/data/fc2-topic-map.json`; crawl metadata lives in `src/data/fc2-source-manifest.json`; image mirror metadata lives in `src/data/fc2-image-manifest.json`.
- FC2 content images are mirrored under `public/fc2-assets/ngo/`; CSS, JavaScript, counter images, tracking images, and external non-`/ngo/` assets are not published.
- FC2 source snapshots are generated under `.cache/fc2/` and are intentionally ignored.
- The public site targets GitHub Pages and the custom domain `ngo.jakeuj.com`.
- Legacy `/nevergrind-online/...` compatibility pages live only in `src/pages/nevergrind-online/`; keep them `noindex`, `data-pagefind-ignore`, hash-preserving, and excluded from the sitemap.

## FC2 Refresh Workflow

Use this path for FC2 / atelier3 source refreshes, placeholder cleanup, or requests to verify a source URL such as `chart.html`.

```bash
npm run crawl:fc2
npm run sync:fc2-images
npm run build:fc2-docs
npm run check:coverage
npm run check:quality
npm run lint:md
npm run build
```

- `crawl:fc2` must still report 106 pages and 0 errors.
- `sync:fc2-images` downloads only FC2 `/ngo/` content images into `public/fc2-assets/ngo/`, preserving source paths and writing `src/data/fc2-image-manifest.json`; skipped tracker images belong only in the manifest `skipped` list.
- `build:fc2-docs` regenerates the source-driven `fc2-*` Markdown pages from `.cache/fc2/pages` into `src/content/docs/`.
- `check:coverage` verifies every FC2 URL is routed and appears in frontmatter.
- `check:quality` blocks old placeholder text, leaked translation guard tokens, missing render coverage, terminology drift, stale machine-translation phrases, and large untranslated Japanese fragments. It may intentionally ignore FC2 source-title rows where the Japanese original title is metadata.
- Do not use `import:writerside` for FC2 pages. It is intentionally disabled by default because the old Writerside seed can overwrite source-driven FC2 docs with placeholder summaries.

## Routes And Source Lookup

- Public links, sidebar `slug` values, and `src/data/fc2-topic-map.json` targets must use root routes such as `guide`, `fc2-general-reference`, and `/fc2-general-reference/#fc2-chart`.
- Do not add `/nevergrind-online/` to sidebar links, Markdown links, generated topic-map slugs, README examples, or GitHub Pages config.
- Keep `astro.config.mjs` using `@astrojs/sitemap` with a filter that excludes legacy `/nevergrind-online/` paths from `dist/sitemap*.xml`.
- When checking an FC2 source file, find its target with `src/data/fc2-topic-map.json`; the public section is `https://ngo.jakeuj.com/<slug>/#fc2-<source-file-stem>`, for example `chart.html` maps to `/fc2-general-reference/#fc2-chart`.
- In `fc2-general-reference.md`, render sections in sidebar / FC2 menu order via `OUTPUT_PAGE_ORDER_OVERRIDES`: `index.html`, `chart.html`, `faq.html`, `charamake.html`, `statuseffect.html`, `unimon.html`, `boss.html`, `english.html`, `dpscalc.html`, `loot.html`, `gambling.html`. Do not hand-move generated Markdown.
- If changing the custom-domain route strategy, update `src/content/docs/`, `src/data/sidebar.json`, `src/data/fc2-topic-map.json`, redirect pages, sitemap filtering, README, this skill, and GitHub Actions together.

## Terminology And Content Rules

- Write in Taiwan Traditional Chinese.
- Use `terminology.md` as the first source for Chinese names. In FC2 generated docs, prefer wording such as `可選職業` for class options and `種族加成` / `職業加成` for race or class bonus.
- In generated FC2 public docs, keep player-facing wording Chinese-first for difficulties, classes, attributes, talents, rarity tiers, and runes: for example `地獄（Hell）`, `牧師`, `力量`, `天賦`, `獨特`, and `符文`.
- Treat `周回` as farming / repeated runs, not rotation. Use `周回地城` or `刷地城` depending on context; never publish `旋轉地城` or `旋轉地牢`.
- Use `地城` for `ダンジョン`, `乙太` for `エーテル`, and `符文` for `Rune / ルーン` in player-facing prose. Never publish `符號` or `標誌` for runes; use `符文組` for `Rune Word / ルーンワード`.
- Translate `Recipe / レシピ` as `配方`, never `食譜`. On FC2 `recipe.html`, use `頁內索引`, `胴體`, `單手鈍器（物理）`, `單手鈍器（魔法）`, `雙手鈍器（物理）`, and `雙手鈍器（魔法）`.
- For FC2 `mythical.html`, translate `クラフト / Craft` as `神話製作（Craft）`; preserve UI / lookup terms such as `Socket`, `Socketed`, `Superior`, `Enchant`, and `Mythical / Mythic`; use `素體`, `要求符文`, and `符文組` in prose. Never publish drift such as `文文組`, `基體`, `請求語句`, `請求碼`, `程式碼`, `附錄`, `印記`, `魔法師的影響`, or `乙醚`.
- For FC2 `gambling.html`, use `賭博` or `Gambling（賭博）` by context; preserve lookup terms such as `Gold`, `Charm`, `Necklace`, `Ring`, `Normal / Exceptional / Elite`, `Rare`, `Unique`, `Set`, `Legendary`, and item names. Translate `アクセサリー類` as `飾品類`, `品揃え` as `商品列表`, and `金銭効率` as `金錢效率`; never publish drift such as `符咒、頭部和戒律`, `魅力、千行和戒律`, `項宗`, `進入城堡或進入新區域`, `EL板甲斗篷`, or `購買 Leger`.
- For FC2 `chart.html`, treat progression, route, and talent advice as high-risk prose. Preserve lookup terms such as `Superior` and `Mastery`, but translate the sentence naturally around them; never publish mixed cached translation such as `In particular, Mastery`, `effect: skill name`, or `written skill will be automatically activated`.
- Preserve English lookup terms for item names, skill names, bosses, maps, UI labels, and source metadata when those names are needed for in-game or FC2/wiki lookup.
- Preserve item names in English even when surrounding prose is Chinese. Prefer headings such as `Charlatan's Crest（Shako, Elite）` and `Cryptic Paragon（Haniwa, Elite）`; never publish machine mistranslations such as `螳螂蝦`, `薩科`, `埴輪`, or `江湖之冠`.
- Do not translate English fragments inside item names even if they look like stats or ordinary words, such as `Wisdom` in `Zimri's Wisdom`; add exact item names to `MANUAL_TRANSLATIONS` or improve table-cell handling when needed.
- Translate `金銭効率` as `金錢效率`, never `金屬效率`; translate `周回ダンジョン` as `周回地城`, not `旋轉地城` or `旋轉地牢`.
- Translate high-risk FC2 gameplay terms consistently: `すべての才能` as `所有天賦`, `才能ツリー` as `天賦樹`, `クール / クールタイム` as `冷卻時間`, `タゲ` as `仇恨` or `目標` by context, `右手 / 左手` equipment text as hand or weapon slots rather than cloak, `レアドロ` as `Rare Drop Rate`, `ソロ / solo` as `單刷` or `單刷能力`, `枠` as `欄位` or `候選欄位`, and `素手` as `空手`.
- In class/build pages, preserve talent tree and skill lookup names such as `Arbiter`, `Judicator`, `Vestal`, `Scion`, `Augury`, `Brawn`, `Rapid Attack`, and `Heal Damage` in English unless `terminology.md` defines a stable Chinese-first form. Never publish drift such as `布朗`, `維斯塔`, `副手樹`, `空手套`, `恢復傷害`, `readore`, or `稀有抽獎`.
- Keep stat names aligned with the terminology table: table headers should use `力量`, `耐力`, `敏捷`, `靈巧`, `智力`, `智慧`, and `魅力`.
- Preserve all factual rows, columns, numbers, source URLs, and `Last-Modified` metadata.
- Publish FC2 content images only through the local `/fc2-assets/ngo/` mirror. Do not publish FC2 CSS, JavaScript, counter images, tracking images, or unrelated external assets.
- For FC2 pages whose main value is JavaScript or form interaction, such as `dpscalc.html`, do not render unusable static form tables. Add the page to `INTERACTIVE_TOOL_PAGE_NOTES` in `scripts/build-fc2-docs.mjs`, keep a concise purpose summary and original source link, and skip translating/rendering tool-only tables.
- Do not drop FC2 gameplay text because of source-policy wording. Translate or faithfully localize the full source gameplay content into zh-TW, keeping original Japanese only where it is source metadata such as titles.
- Treat FC2 as a player meta snapshot. Keep or add version reminders that current game tooltip / UI should be final authority.

## Editing Guidance

- Prefer changing the generator or crawler when a problem would recur after regeneration.
- Only hand-edit generated `fc2-*` Markdown for emergency hotfixes; then backport the rule into `scripts/build-fc2-docs.mjs`.
- Keep generated table formatting Markdown-safe; escape pipes and underscores in table cells.
- If translation output is poor, improve `SOURCE_TERM_REPLACEMENTS`, `POSTPROCESS_REPLACEMENTS`, `MANUAL_TRANSLATIONS`, `shouldTranslateTableCell`, or `tableCellText` in `scripts/build-fc2-docs.mjs`, then rerun the FC2 refresh workflow.
- Treat dense FC2 data tables as high-risk for machine-translation drift. For `recipe.html`, keep `shouldUseSourceOnlyTableCells(page)` active so table cells are not sent to cached translation in `collectTexts`; render them with `translator.local` plus source and postprocess replacements so `Mods` rows remain factual and searchable.
- When a generated Chinese sentence is hard to understand, first inspect the original source in `.cache/fc2/pages/<file>.json` or `.cache/fc2/html/<file>.html`; do not infer only from the bad generated Chinese.
- For short, terminology-dense system pages such as `mythical.html`, prefer full-section exact `MANUAL_TRANSLATIONS` from the source cache over piecemeal postprocessing, then pair the fix with page-specific quality gates such as `FC2_MYTHICAL_TERMINOLOGY_PATTERNS`.
- If a source sentence needs high-fidelity phrasing, add it to `MANUAL_TRANSLATIONS` rather than relying on cached machine translation. This is especially important for route advice, farming recommendations, class evaluations, and other FC2 player judgement text.
- If a generated paragraph unexpectedly contains English prose from the translation cache, inspect the exact Japanese source and replace the full sentence with `MANUAL_TRANSLATIONS`; then add a `check:quality` pattern for the English fragment so the cache cannot reintroduce it.
- If `check:quality` flags terminology drift, fix the generator output or the term replacement source instead of patching only the generated Markdown.
- When fixing a bad generated phrase or unusable imported block, add a matching `check:quality` pattern so reruns cannot reintroduce it.
- Scope quality gates to the smallest safe surface. Use page-specific arrays such as `FC2_RECIPE_TERMINOLOGY_PATTERNS` when bad terms are only proven on one generated page; promote a pattern to global `FC2_TERMINOLOGY_PATTERNS` only after confirming it should fail every FC2 doc.
- For core cross-page terms such as `Rune / ルーン`, update both broad replacements (`SOURCE_TERM_REPLACEMENTS` or `POSTPROCESS_REPLACEMENTS`) and exact source phrases in `MANUAL_TRANSLATIONS` for headings, related-page labels, and reward text; then add a `check:quality` pattern for the bad Chinese drift.
- When a user points at a class heading such as `#fc2-cleric` and asks to check that block, inspect the whole source page section from `.cache/fc2/pages/<class>.json` or `.cache/fc2/html/<class>.html`, not just the selected sentence. Class pages often need section-level `MANUAL_TRANSLATIONS` plus quality patterns for talent names, rotations, equipment notes, and player judgement paragraphs.
- When FC2 image tokens split a sentence, remember the translator handles text fragments around each image separately. Add manual translations for the fragments too, otherwise good full-sentence translations may not apply.
- For class equipment examples where the source uses a leading portrait/equipment image with table `rowspan`, render the image above the Markdown table and keep the table columns aligned as `部位 / Lv / 名稱`. Markdown tables cannot preserve rowspans cleanly, so avoid leaving the image as the first row's table cell.
- If an FC2 page starts with a non-clickable list that only repeats later headings, such as FAQ or class-build intro lists, skip that list in `collectTexts` and `renderPage` via `isRedundantHeadingList`; keep the actual sections and answers below it.
- When changing generated page order, add quality assertions such as `generalReferenceStartsWithIndex` and `generalReferenceFollowsSidebarOrder` so regenerated docs cannot drift back.
- Keep sidebar labels Chinese-first and concise. Do not show raw `*.html` filenames or parenthesized English in the sidebar unless the user explicitly asks; source filenames belong in `fc2-link-index`, source tables, anchors, and frontmatter.
- Keep FC2 original-source navigation separate from user-facing supplemental guides. Use the FC2 section for source-aligned entries and the supplemental section for non-FC2 pages.
- After route, sidebar, or topic-map changes, search for accidental public nested paths with `rg -n 'nevergrind-online/' src/content/docs src/data README.md scripts .github/workflows .agents/skills/maintain-nevergrind-docs -S`. Allow only intentional legacy redirect code, sitemap filtering, and external source URLs.
- After `npm run build`, `rg -n '<loc>[^<]*/nevergrind-online/' dist/sitemap*.xml` should return nothing.
- For local route checks, root pages such as `http://127.0.0.1:4322/guide/` should render directly, while legacy pages such as `http://127.0.0.1:4322/nevergrind-online/guide/#x` should redirect to `/guide/#x`.
- Before committing, run `git diff --check` and confirm `.cache/`, `.astro/`, `dist/`, and `.idea/` are not staged. `public/fc2-assets/ngo/` is an intended tracked asset mirror.

## Deploy Workflow

- Commit source files and generated Markdown, not `.cache/`, `.astro/`, `dist/`, or `.idea/`.
- Keep `public/CNAME` set to `ngo.jakeuj.com` for the GitHub Pages custom domain.
- Keep GitHub Actions publishing with `SITE=https://ngo.jakeuj.com` and `BASE_PATH=/` so the custom domain serves root paths.
- Push `main` to `https://github.com/jakeuj/NevergrindOnline.git`.
- GitHub Actions builds Pages from source. After deploy, expected canonical URLs look like `https://ngo.jakeuj.com/guide/`, not `https://ngo.jakeuj.com/nevergrind-online/guide/`.
- If checking locally, use `npm run dev -- --port 4322` and open `http://127.0.0.1:4322/`.

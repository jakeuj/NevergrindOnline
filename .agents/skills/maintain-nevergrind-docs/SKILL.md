---
name: maintain-nevergrind-docs
description: Maintain the repo-local Astro Starlight Traditional Chinese Nevergrind Online guide site, especially FC2 / atelier3 source-driven ingestion, zh-TW Markdown generation, terminology consistency, sidebar organization, coverage and quality gates, GitHub Pages publishing, and CNAME/domain-safe deployment. Use when Codex works in this repository on Nevergrind Online docs, FC2 HTML refreshes, placeholder cleanup, source URL coverage, translation quality, terminology drift, sidebar/menu changes, Starlight build issues, or pushing site updates.
---

# Maintain Nevergrind Docs

## Repo Shape

- Work from the repository root. In this machine it is `/Users/jakeuj/Documents/New project 4`.
- Public docs live under `src/content/docs/` so `ngo.jakeuj.com` serves pages from root paths such as `/guide/` and `/fc2-general-reference/`.
- Do not place public docs under `src/content/docs/nevergrind-online/`; that would reintroduce the extra URL layer on the custom domain.
- The canonical terminology table is `src/content/docs/terminology.md`.
- The Starlight sidebar is data-driven from `src/data/sidebar.json`.
- FC2 routing lives in `src/data/fc2-topic-map.json`; crawl metadata lives in `src/data/fc2-source-manifest.json`.
- FC2 source snapshots are generated under `.cache/fc2/` and are intentionally ignored.
- The public site targets GitHub Pages and the custom domain `ngo.jakeuj.com`.
- Legacy `/nevergrind-online/...` compatibility pages live only in `src/pages/nevergrind-online/`; keep them `noindex`, `data-pagefind-ignore`, hash-preserving, and excluded from the sitemap.

## FC2 Refresh Workflow

Use this path for FC2 / atelier3 source refreshes, placeholder cleanup, or requests to verify a source URL such as `chart.html`.

```bash
npm run crawl:fc2
npm run build:fc2-docs
npm run check:coverage
npm run check:quality
npm run lint:md
npm run build
```

- `crawl:fc2` must still report 106 pages and 0 errors.
- `build:fc2-docs` regenerates the source-driven `fc2-*` Markdown pages from `.cache/fc2/pages` into `src/content/docs/`.
- `check:coverage` verifies every FC2 URL is routed and appears in frontmatter.
- `check:quality` blocks old placeholder text, leaked translation guard tokens, missing render coverage, terminology drift, stale machine-translation phrases, and large untranslated Japanese fragments. It may intentionally ignore FC2 source-title rows where the Japanese original title is metadata.
- Do not use `import:writerside` for FC2 pages. It is intentionally disabled by default because the old Writerside seed can overwrite source-driven FC2 docs with placeholder summaries.

## Routes And Source Lookup

- Public links, sidebar `slug` values, and `src/data/fc2-topic-map.json` targets must use root routes such as `guide`, `fc2-general-reference`, and `/fc2-general-reference/#fc2-chart`.
- Do not add `/nevergrind-online/` to sidebar links, Markdown links, generated topic-map slugs, README examples, or GitHub Pages config.
- Keep `astro.config.mjs` using `@astrojs/sitemap` with a filter that excludes legacy `/nevergrind-online/` paths from `dist/sitemap*.xml`.
- When checking an FC2 source file, find its target with `src/data/fc2-topic-map.json`; the public section is `https://ngo.jakeuj.com/<slug>/#fc2-<source-file-stem>`, for example `chart.html` maps to `/fc2-general-reference/#fc2-chart`.
- If changing the custom-domain route strategy, update `src/content/docs/`, `src/data/sidebar.json`, `src/data/fc2-topic-map.json`, redirect pages, sitemap filtering, README, this skill, and GitHub Actions together.

## Terminology And Content Rules

- Write in Taiwan Traditional Chinese.
- Use `terminology.md` as the first source for Chinese names. In FC2 generated docs, prefer wording such as `可選職業` for class options and `種族紅利` for race bonus.
- In generated FC2 public docs, keep player-facing wording Chinese-first for difficulties, classes, attributes, talents, rarity tiers, and runes: for example `地獄（Hell）`, `牧師`, `力量`, `天賦`, `獨特`, and `符文`.
- Treat `周回` as farming / repeated runs, not rotation. Use `周回地城` or `刷地城` depending on context; never publish `旋轉地城` or `旋轉地牢`.
- Use `地城` for `ダンジョン`, `乙太` for `エーテル`, and `符文` for `Rune / ルーン` in player-facing prose.
- Preserve English lookup terms for item names, skill names, bosses, maps, UI labels, and source metadata when those names are needed for in-game or FC2/wiki lookup.
- Keep stat names aligned with the terminology table: table headers should use `力量`, `耐力`, `敏捷`, `靈巧`, `智力`, `智慧`, and `魅力`.
- Preserve all factual rows, columns, numbers, source URLs, and `Last-Modified` metadata.
- Do not publish original FC2 images, CSS, or JavaScript.
- For FC2 pages whose main value is JavaScript or form interaction, such as `dpscalc.html`, do not render unusable static form tables. Add the page to `INTERACTIVE_TOOL_PAGE_NOTES` in `scripts/build-fc2-docs.mjs`, keep a concise purpose summary and original source link, and skip translating/rendering tool-only tables.
- Do not drop FC2 gameplay text because of source-policy wording. Translate or faithfully localize the full source gameplay content into zh-TW, keeping original Japanese only where it is source metadata such as titles.
- Treat FC2 as a player meta snapshot. Keep or add version reminders that current game tooltip / UI should be final authority.

## Editing Guidance

- Prefer changing the generator or crawler when a problem would recur after regeneration.
- Only hand-edit generated `fc2-*` Markdown for emergency hotfixes; then backport the rule into `scripts/build-fc2-docs.mjs`.
- Keep generated table formatting Markdown-safe; escape pipes and underscores in table cells.
- If translation output is poor, improve `SOURCE_TERM_REPLACEMENTS`, `POSTPROCESS_REPLACEMENTS`, `MANUAL_TRANSLATIONS`, `shouldTranslateTableCell`, or `tableCellText` in `scripts/build-fc2-docs.mjs`, then rerun the FC2 refresh workflow.
- If a source sentence needs high-fidelity phrasing, add it to `MANUAL_TRANSLATIONS` rather than relying on cached machine translation. This is especially important for route advice, farming recommendations, class evaluations, and other FC2 player judgement text.
- If `check:quality` flags terminology drift, fix the generator output or the term replacement source instead of patching only the generated Markdown.
- When fixing a bad generated phrase or unusable imported block, add a matching `check:quality` pattern so reruns cannot reintroduce it.
- Keep sidebar labels Chinese-first and concise. Do not show raw `*.html` filenames or parenthesized English in the sidebar unless the user explicitly asks; source filenames belong in `fc2-link-index`, source tables, anchors, and frontmatter.
- Keep FC2 original-source navigation separate from user-facing supplemental guides. Use the FC2 section for source-aligned entries and the supplemental section for non-FC2 pages.
- After route, sidebar, or topic-map changes, search for accidental public nested paths with `rg -n 'nevergrind-online/' src/content/docs src/data README.md scripts .github/workflows .agents/skills/maintain-nevergrind-docs -S`. Allow only intentional legacy redirect code, sitemap filtering, and external source URLs.
- After `npm run build`, `rg -n '<loc>[^<]*/nevergrind-online/' dist/sitemap*.xml` should return nothing.
- For local route checks, root pages such as `http://127.0.0.1:4322/guide/` should render directly, while legacy pages such as `http://127.0.0.1:4322/nevergrind-online/guide/#x` should redirect to `/guide/#x`.
- Before committing, run `git diff --check` and confirm `.cache/`, `.astro/`, `dist/`, and `.idea/` are not staged.

## Deploy Workflow

- Commit source files and generated Markdown, not `.cache/`, `.astro/`, `dist/`, or `.idea/`.
- Keep `public/CNAME` set to `ngo.jakeuj.com` for the GitHub Pages custom domain.
- Keep GitHub Actions publishing with `SITE=https://ngo.jakeuj.com` and `BASE_PATH=/` so the custom domain serves root paths.
- Push `main` to `https://github.com/jakeuj/NevergrindOnline.git`.
- GitHub Actions builds Pages from source. After deploy, expected canonical URLs look like `https://ngo.jakeuj.com/guide/`, not `https://ngo.jakeuj.com/nevergrind-online/guide/`.
- If checking locally, use `npm run dev -- --port 4322` and open `http://127.0.0.1:4322/`.

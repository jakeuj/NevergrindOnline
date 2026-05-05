---
name: maintain-nevergrind-docs
description: Maintain the repo-local Astro Starlight Traditional Chinese Nevergrind Online guide site, especially FC2 / atelier3 source-driven ingestion, zh-TW Markdown generation, terminology consistency, sidebar organization, coverage and quality gates, GitHub Pages publishing, and CNAME/domain-safe deployment. Use when Codex works in this repository on Nevergrind Online docs, FC2 HTML refreshes, placeholder cleanup, source URL coverage, translation quality, terminology drift, sidebar/menu changes, Starlight build issues, or pushing site updates.
---

# Maintain Nevergrind Docs

## Repo Shape

- Work from the repository root. In this machine it is `/Users/jakeuj/Documents/New project 4`.
- Public docs live under `src/content/docs/nevergrind-online/`.
- The canonical terminology table is `src/content/docs/nevergrind-online/terminology.md`.
- The Starlight sidebar is data-driven from `src/data/sidebar.json`.
- FC2 routing lives in `src/data/fc2-topic-map.json`; crawl metadata lives in `src/data/fc2-source-manifest.json`.
- FC2 source snapshots are generated under `.cache/fc2/` and are intentionally ignored.
- The public site targets GitHub Pages and the custom domain `ngo.jakeuj.com`.

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
- `build:fc2-docs` regenerates the source-driven `fc2-*` Markdown pages from `.cache/fc2/pages`.
- `check:coverage` verifies every FC2 URL is routed and appears in frontmatter.
- `check:quality` blocks old placeholder text, leaked translation guard tokens, missing render coverage, terminology drift, stale machine-translation phrases, and large untranslated Japanese fragments. It may intentionally ignore FC2 source-title rows where the Japanese original title is metadata.
- Do not use `import:writerside` for FC2 pages. It is intentionally disabled by default because the old Writerside seed can overwrite source-driven FC2 docs with placeholder summaries.

## Terminology And Content Rules

- Write in Taiwan Traditional Chinese.
- Use `terminology.md` as the first source for Chinese names. In FC2 generated docs, prefer wording such as `可選職業` for class options and `種族紅利` for race bonus.
- In generated FC2 public docs, keep player-facing wording Chinese-first for difficulties, classes, attributes, talents, rarity tiers, and runes: for example `地獄（Hell）`, `牧師`, `力量`, `天賦`, `獨特`, and `符文`.
- Preserve English lookup terms for item names, skill names, bosses, maps, UI labels, and source metadata when those names are needed for in-game or FC2/wiki lookup.
- Keep stat names aligned with the terminology table: table headers should use `力量`, `耐力`, `敏捷`, `靈巧`, `智力`, `智慧`, and `魅力`.
- Preserve all factual rows, columns, numbers, source URLs, and `Last-Modified` metadata.
- Do not publish original FC2 images, CSS, or JavaScript.
- Do not drop FC2 gameplay text because of source-policy wording. Translate or faithfully localize the full source gameplay content into zh-TW, keeping original Japanese only where it is source metadata such as titles.
- Treat FC2 as a player meta snapshot. Keep or add version reminders that current game tooltip / UI should be final authority.
- When checking a specific FC2 URL, find its target via `src/data/fc2-topic-map.json`, then inspect the generated Markdown section anchor `fc2-<source-file-stem>`.

## Editing Guidance

- Prefer changing the generator or crawler when a problem would recur after regeneration.
- Only hand-edit generated `fc2-*` Markdown for emergency hotfixes; then backport the rule into `scripts/build-fc2-docs.mjs`.
- Keep generated table formatting Markdown-safe; escape pipes and underscores in table cells.
- If translation output is poor, improve `SOURCE_TERM_REPLACEMENTS`, `POSTPROCESS_REPLACEMENTS`, `MANUAL_TRANSLATIONS`, `shouldTranslateTableCell`, or `tableCellText` in `scripts/build-fc2-docs.mjs`, then rerun the FC2 refresh workflow.
- If `check:quality` flags terminology drift, fix the generator output or the term replacement source instead of patching only the generated Markdown.
- Keep sidebar labels Chinese-first and concise. Do not show raw `*.html` filenames or parenthesized English in the sidebar unless the user explicitly asks; source filenames belong in `fc2-link-index`, source tables, anchors, and frontmatter.
- Keep FC2 original-source navigation separate from user-facing supplemental guides. Use the FC2 section for source-aligned entries and the supplemental section for non-FC2 pages.
- Before committing, run `git diff --check` and confirm `.cache/`, `.astro/`, `dist/`, and `.idea/` are not staged.

## Deploy Workflow

- Commit source files and generated Markdown, not `.cache/`, `.astro/`, `dist/`, or `.idea/`.
- Keep `public/CNAME` set to `ngo.jakeuj.com` for the GitHub Pages custom domain.
- Push `main` to `https://github.com/jakeuj/NevergrindOnline.git`.
- GitHub Actions builds Pages from source. If checking locally, use `npm run dev -- --port 4322` and open `http://127.0.0.1:4322/`.

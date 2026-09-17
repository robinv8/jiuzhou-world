---
id: gazetteer-entry-pages
title: "专条挂在章下，不另开 /entries"
category: decision
status: active
tags: [architecture, routing, i18n]
created: "2026-09-17T09:34:39"
updated: "2026-09-17T09:34:39"
---

<!-- compiled_truth -->
# 专条挂在章下，不另开 /entries

长文 **专条（entry）** 是章页短条之外的独立文章页，不是第五种章，也不是 `/entries/…` 或扁平 `/hangzhou/{slug}/`。

## URL

`/{volume}/{chapter}/{catalogId}/`。有 catalog id 时叶 slug 用 id（`westlake`、`tea`、`canal`、`zhinan`、`tianmu`、`liangzhu`、`lingyin`），不用 Linear kebab。无 catalog id 的新条才用描述 slug（`su-bai-causeway`、`linan-gazetteers`、`qian-liu`）。临安条挂在 `/hangzhou/linan/…`。

路由：`src/pages/hangzhou/[...entry].astro` 与 locale 镜像。登记表在 `src/i18n/entries.ts`，并并入 `seoPages`。

## 正文与 i18n

zh 长文在 `src/entries/bodies/*.md`（H1→参见），不进 locale JSON。`i18n:check` 要 key 对齐，所以各语言只放 `entries.{slug}.title` + `excerpt` 和对应 `seo.entry_*`。他语不编长篇假译文；页面仍渲染 zh 正文（`lang=zh-CN`）。

## 章页

父章短条保留。相关 条旁链到专条；无对应 条的新专条（苏白堤、临安三志）出现在章末「本章专条」。

## 图与 SEO

复用已有 hero slot，不新做 AI 封面。已刊专条进 sitemap / `seoPages`，JSON-LD 为 `Article`，**不要** noindex。


## Timeline

- time: 2026-09-17T09:34:39
  kind: decision
  summary: "Created this page: 专条挂在章下，不另开 /entries"
  source: SHIP 10 gazetteer entries
  affects: [gazetteer-entry-pages]

- time: 2026-09-17T09:34:39
  kind: decision
  summary: "专条是章下的长文页：catalog id 作叶 slug，zh 正文存 markdown，他语只 stub 标题与摘句。"
  source: "SHIP.md + implementation"
  affects: [gazetteer-entry-pages]

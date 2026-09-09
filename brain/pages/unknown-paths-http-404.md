---
id: unknown-paths-http-404
title: "未知路径必须返回 HTTP 404，不能回落到首页"
category: decision
status: active
tags: [cloudflare, 404, seo]
created: "2026-09-09T02:46:06"
updated: "2026-09-09T02:46:06"
---

<!-- compiled_truth -->
# 未知路径必须返回 HTTP 404

`https://jiuzhou.world` 托管在 Cloudflare Pages（[[cloudflare-pages-ci]]）。站点是 Astro 静态产出（[[astro-static-ssg]]），不是 SPA。

## 约束

对不是真实页面或静态资源的路径，响应必须是 **HTTP 404**（状态码 404，不是 200）。可以有一小张 404 页；不要新做营销页。真实路由（`/`、`/hangzhou/scenic/` 及已有本地化路径）保持 200。`/admin/page-login.html` 这类扫描路径按未知路径处理，不做特例。

## 真正改状态码的层

Cloudflare Pages：**没有顶层 `404.html` 时，按 SPA 处理**，把未匹配路径回落到 `/`，状态码 200。生产已核实（2026-09-09）：`GET /this-path-does-not-exist-xyz` 与 `GET /admin/page-login.html` 都是 200，正文是首页（title 九州志，canonical `https://jiuzhou.world/`）。`public/_redirects` 只有旧路径 301，没有 `/* /index.html 200`。

修复是发出 `dist/404.html`（`src/pages/404.astro`）。Pages 见到它就对未匹配路径返回 404。不要用 `_redirects` 把未知路径 200/301 到首页。

## 不要用 `getPageSeo` 做 404

`getPageSeo` 对未知 path 回退 `pages[0]`（首页），会把 homepage canonical / title 写进 404。404 页必须独立 SEO：`noindex`，标题以 `404` 开头，不能指向首页 canonical。

CI：`npm run 404:check` 在 `astro build` 之后确认 `dist/404.html` 存在且不是首页替身。


## Timeline

- time: 2026-09-09T02:46:06
  kind: decision
  summary: "Created this page: 未知路径必须返回 HTTP 404，不能回落到首页"
  source: "Robin 2026-09-09: unknown URLs on jiuzhou.world return homepage 200"
  affects: [unknown-paths-http-404]

- time: 2026-09-09T02:46:06
  kind: decision
  summary: "确认 Cloudflare Pages 无 404.html 时把未知路径当 SPA，以 200 回落到 /"
  source: "production curl 2026-09-09 + Cloudflare Serving Pages docs"
  affects: [unknown-paths-http-404]

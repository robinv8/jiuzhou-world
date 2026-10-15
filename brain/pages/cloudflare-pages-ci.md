---
id: cloudflare-pages-ci
title: "GitHub Actions + Wrangler 部署 Cloudflare Pages"
category: decision
status: active
created: "2026-10-13T08:58:31.400Z"
updated: "2026-10-13T08:58:31.799Z"
---

<!-- compiled_truth -->
推送 main 触发构建：Node 22、npm install、i18n:check、astro build、`npm run 404:check`，再用 wrangler pages deploy 发布到项目 jiuzhou-world。曾修复 CI 依赖安装（npm install 替代 npm ci）。密钥：CLOUDFLARE_API_TOKEN、CLOUDFLARE_ACCOUNT_ID。

**必须产出顶层 `dist/404.html`。** Cloudflare Pages 在缺少它时按 SPA 处理，把未匹配路径以 HTTP 200 回落到 `/`。未知路径的状态码由这一文件决定，见 [[unknown-paths-http-404]]。关联：[[astro-static-ssg]]。

## Timeline

- time: 2026-10-13T08:58:31.403Z
  kind: creation
  author: "user:robin"
  summary: 从本地 brain 迁移（jiuzhou-world/brain）
  affects: [cloudflare-pages-ci]

- time: 2026-08-15T07:32:31+08:00
  kind: decision
  author: "user:robin"
  summary: "Created this page: GitHub Actions + Wrangler 部署 Cloudflare Pages"
  source: .github/workflows/deploy.yml
  affects: [cloudflare-pages-ci]
  source_entry_id: "local:cloudflare-pages-ci:0"
  imported_at: 2026-10-13T08:58:31.790Z

- time: 2026-08-15T07:32:32+08:00
  kind: decision
  author: "user:robin"
  summary: CI 用 npm install（非 npm ci）构建并部署
  source: git log
  affects: [cloudflare-pages-ci]
  source_entry_id: "local:cloudflare-pages-ci:1"
  imported_at: 2026-10-13T08:58:31.790Z

- time: 2026-09-09T02:46:06+08:00
  kind: decision
  author: "user:robin"
  summary: 补上 404.html 约束：没有它 Pages 会把未知路径 200 回落到首页
  source: Cloudflare Serving Pages + production 2026-09-09
  affects: [cloudflare-pages-ci]
  source_entry_id: "local:cloudflare-pages-ci:2"
  imported_at: 2026-10-13T08:58:31.790Z

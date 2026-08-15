---
id: cloudflare-pages-ci
title: "GitHub Actions + Wrangler 部署 Cloudflare Pages"
category: decision
status: active
created: "2026-08-15T07:32:31"
updated: "2026-08-15T07:32:32"
---

<!-- compiled_truth -->
推送 main 触发构建：Node 22、npm install、astro build，再用 wrangler pages deploy 发布到项目 jiuzhou-world。曾修复 CI 依赖安装（npm install 替代 npm ci）。密钥：CLOUDFLARE_API_TOKEN、CLOUDFLARE_ACCOUNT_ID。关联：[[astro-static-ssg]]。


## Timeline

- time: 2026-08-15T07:32:31
  kind: decision
  summary: "Created this page: GitHub Actions + Wrangler 部署 Cloudflare Pages"
  source: .github/workflows/deploy.yml
  affects: [cloudflare-pages-ci]

- time: 2026-08-15T07:32:32
  kind: decision
  summary: "CI 用 npm install（非 npm ci）构建并部署"
  source: git log
  affects: [cloudflare-pages-ci]

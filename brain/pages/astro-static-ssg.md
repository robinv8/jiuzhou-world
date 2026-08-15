---
id: astro-static-ssg
title: "采用 Astro 静态站点而非 SPA/SSR"
category: decision
status: active
created: "2026-08-15T07:32:30"
updated: "2026-08-15T07:32:30"
---

<!-- compiled_truth -->
采用 Astro（static output）承载九州志：页面以 SSG 产出静态资源，交互部分用 React islands。相对纯 SPA，更利于 SEO、sitemap、hreflang 与边缘托管。部署目标为 Cloudflare Pages。关联：[[i18n-locale-routing]]、[[cloudflare-pages-ci]]。


## Timeline

- time: 2026-08-15T07:32:30
  kind: decision
  summary: "Created this page: 采用 Astro 静态站点而非 SPA/SSR"
  source: git log / package.json
  affects: [astro-static-ssg]

- time: 2026-08-15T07:32:30
  kind: decision
  summary: "从初始栈迁移到 Astro SSG，服务 SEO 与 Cloudflare Pages"
  source: git log
  affects: [astro-static-ssg]

---
slug: flow
title: Key flows
role: key flows
updated: "2026-08-15T08:23:39"
---

# Key flows

典型请求：读者打开某语言下的临安章节页。

```mermaid
sequenceDiagram
  participant U as Reader
  participant CDN as Cloudflare Pages
  participant HTML as Astro page
  participant H as SiteHeader island
  U->>CDN: GET /en/linan/history
  CDN->>HTML: 静态 HTML（正文已渲染）
  HTML->>H: 仅水合顶栏
  H-->>U: 换语言 / 菜单
```

正文不经过客户端 React。缺文案在构建期按 lang → en → zh 回退写进 HTML。

## 构建与发布
1. push `main` → GitHub Actions
2. `npm run i18n:check` → `npm run build` → `dist/`
3. `wrangler pages deploy dist --project-name=jiuzhou-world`

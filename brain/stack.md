---
slug: stack
title: Tech stack
role: tech-stack choices
updated: "2026-08-15T07:32:29"
---

# Tech stack

| 领域 | 选择 | 理由（从代码/依赖推断） |
|------|------|-------------------------|
| 框架 | Astro 5（`output: 'static'`） | SSG、SEO 友好、可混用 React islands |
| UI | React 19 + Tailwind 3 | 交互组件与样式系统 |
| 集成 | `@astrojs/react` / `tailwind` / `sitemap` | 官方集成；站点地图自动生成 |
| 工具类 | clsx / cva / tailwind-merge / lucide-react | 组件变体与图标 |
| 宿主 | Cloudflare Pages + Wrangler | CI 部署到 `jiuzhou.world` |
| 分析 | Google Analytics (`G-J12WBYEXR2`) | 已接入 |
| 语言 | TypeScript | 项目级 tsconfig |
| 项目记忆 | `@mindmux/brain-md`（dev） | BRAIN.md 协议 + `brain` CLI |

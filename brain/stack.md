---
slug: stack
title: Tech stack
role: tech-stack choices
updated: "2026-08-16T13:53:48"
---

# Tech stack

| 领域 | 选择 | 理由（从代码/依赖推断） |
|------|------|-------------------------|
| 框架 | Astro 5（`output: 'static'`） | SSG、SEO 友好、可混用 React islands |
| UI | React 19 + Tailwind CSS 4 | 交互组件与样式系统 |
| 样式接入 | `@tailwindcss/vite`（Vite 插件） | Tailwind 4 官方路径；已弃用 `@astrojs/tailwind`（仅支持 v3）；CSS-first 配置在 `src/index.css` 的 `@theme`，无 `tailwind.config.js` / PostCSS / autoprefixer |
| 动画 | `tw-animate-css` | `tailwindcss-animate` 的 v4 继任（仅未启用的 shadcn `ui/` 组件用到） |
| 集成 | `@astrojs/react` / `sitemap` | 官方集成；站点地图自动生成 |
| 工具类 | clsx / cva / tailwind-merge / lucide-react | 组件变体与图标 |
| 宿主 | Cloudflare Pages + Wrangler | CI 部署到 `jiuzhou.world` |
| 分析 | Google Analytics (`G-J12WBYEXR2`) | 已接入 |
| 语言 | TypeScript | 项目级 tsconfig |
| 项目记忆 | `@mindmux/brain-md`（dev） | BRAIN.md 协议 + `brain` CLI |

## 开放项
- `src/components/ui/`（shadcn 套件）当前无任何页面引用，可考虑移除。

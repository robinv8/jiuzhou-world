---
slug: stack
title: Tech stack
role: tech-stack choices
updated: "2026-08-16T14:03:22"
---

# Tech stack

| 领域 | 选择 | 理由（从代码/依赖推断） |
|------|------|-------------------------|
| 框架 | Astro 5（`output: 'static'`） | SSG、SEO 友好、可混用 React islands |
| UI | React 19 + Tailwind CSS 4 | 交互组件与样式系统 |
| 样式接入 | `@tailwindcss/vite`（Vite 插件） | Tailwind 4 官方路径；已弃用 `@astrojs/tailwind`（仅支持 v3）；CSS-first 配置在 `src/index.css` 的 `@theme`，无 `tailwind.config.js` / PostCSS / autoprefixer |
| 图标 | lucide-react | SiteHeader 与卷页箭头图标 |
| 集成 | `@astrojs/react` / `sitemap` | 官方集成；站点地图自动生成 |
| 宿主 | Cloudflare Pages + Wrangler | CI 部署到 `jiuzhou.world` |
| 分析 | Google Analytics (`G-J12WBYEXR2`) | 已接入 |
| 语言 | TypeScript | 项目级 tsconfig |
| 项目记忆 | `@mindmux/brain-md`（dev） | BRAIN.md 协议 + `brain` CLI |

注：2026-08-16 已删除整套未使用的 shadcn `src/components/ui/` 与 `lib/utils.ts`（`cn`），连带卸载 `class-variance-authority` / `clsx` / `tailwind-merge` / `tw-animate-css`。`@theme` 里的 shadcn 语义色 token 保留，目前也无页面使用，可视需要再清。

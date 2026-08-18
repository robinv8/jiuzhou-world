---
slug: stack
kind: root-page
title: Tech Stack
updated: "2026-08-16T14:07:19"
---

# Tech Stack

| 领域 | 当前选择 | 证据 / 约束 |
|------|----------|-------------|
| 框架 | Astro 5，`output: 'static'` | `astro.config.mjs` 使用 `defineConfig({ site, output: 'static' })`；目标是静态 HTML 与 SEO。 |
| 视图 | React 19 / React DOM 19 | `package.json` 依赖 `react`、`react-dom`；页面主体以 `.tsx` views 组织。 |
| 水合策略 | 只有 `SiteHeader` 明确 `client:load` | `PageShell.astro` 中 `<SiteHeader client:load />`；正文视图构建期渲染。 |
| 样式 | Tailwind CSS 4.3 + `@tailwindcss/vite` | Astro Vite 插件接入；`src/index.css` 使用 `@import 'tailwindcss'`、`@theme`、`@utility`。 |
| 视觉系统 | 自定义纸色 / 墨绿 / 印章红 + Serif display stack | `src/index.css` 定义 `--paper`、`--ink`、`--seal`，并按 `html[lang]` 切换 Noto Serif SC/JP/KR。 |
| 图标 | `lucide-react` | Header 菜单 / 关闭与章节箭头使用 lucide。 |
| i18n | 自研轻量 JSON catalog | `src/i18n/config.ts` 定义 `zh/en/ja/ko`；`t.ts` 当前语言优先，回退中文；`scripts/check-locales.mjs` 校验 key 对齐。 |
| SEO | Astro sitemap + 自研 SEO helper | `@astrojs/sitemap` 生成 sitemap；`src/lib/seo.ts` 输出 canonical、hreflang、OG、Twitter card、JSON-LD。 |
| 部署 | Cloudflare Pages + Wrangler | GitHub Actions 构建后 `wrangler pages deploy dist --project-name=jiuzhou-world`。 |
| CI | GitHub Actions + Node 22 + npm install | `.github/workflows/deploy.yml` 在 main/master push 或手动触发时运行。 |
| 分析 | Google Analytics `G-J12WBYEXR2` | `BaseLayout.astro` 直接注入 gtag。 |
| 类型 | TypeScript | `tsconfig.json` 与 TS/TSX 源码。 |
| 项目记忆 | `@mindmux/brain-md` | `package.json` 提供 `brain`、`brain:reindex`、`brain:lint` scripts；决策在 `brain/`。 |

## 已确认的工程决策

- 采用 Astro SSG + React islands，而不是纯 SPA；内容页面优先静态 HTML、SEO 与边缘托管。
- 中文为默认语言且无 URL 前缀；非默认语言才加 `/en`、`/ja`、`/ko`。
- 四语言 JSON 必须 key 完整一致；正文是改写，不是逐句对译。
- Tailwind 已迁移到 v4 官方 Vite 插件路径；不再使用 `@astrojs/tailwind`、`tailwind.config.js`、PostCSS / autoprefixer。
- 已移除未使用的 shadcn UI kit 与相关依赖，但 `src/index.css` 中仍保留一批 shadcn 语义色 token 映射，可后续清理。

## 运行命令

```bash
npm install
npm run dev
npm run i18n:check
npm run build
npm run preview
```

## 部署所需 secrets

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

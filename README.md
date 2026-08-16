# 九州志 · jiuzhou.world

一卷一城，线上的中国地方志。第一卷：临安（Vol. I — Lin'an）。

- 站点：https://jiuzhou.world

## 它是什么

以数字地方志的形式呈现中国城市的历史、山水、人文与名胜。内容以文学性长文为主，
中文是底本语言；不做评论、账号、公开相册或实时上传。读者可以通过邮件供图，
把自己拍的照片记入方志（见下文「供图」）。

## 技术栈

| 领域 | 选择 |
|------|------|
| 框架 | Astro 5，`output: 'static'` |
| UI | React 19 + Tailwind CSS 4（经 `@tailwindcss/vite` 接入，CSS-first 配置在 `src/index.css`，无 `tailwind.config.js` / PostCSS） |
| 集成 | `@astrojs/react` / `sitemap` 官方集成 |
| 渲染 | 正文构建期出静态 HTML，**只有顶栏是 React island**（其余视图 SSR 后不再水合） |
| 宿主 | Cloudflare Pages，GitHub Actions CI（`.github/workflows/deploy.yml`） |
| 分析 | Google Analytics |
| 项目记忆 | [`@mindmux/brain-md`](https://projectbrain.md) — 决策与约束写在 `brain/` |

## 开发

```bash
npm install
npm run dev          # 本地开发
npm run build        # 构建到 dist/
npm run preview      # 预览构建产物
npm run i18n:check   # 校验四份 locale key 对齐（CI 构建前也会跑）
```

CI 需要 GitHub secrets：`CLOUDFLARE_API_TOKEN`、`CLOUDFLARE_ACCOUNT_ID`。

## 目录结构

```
src/
├── pages/          # 路由壳：zh 无前缀 + [locale]/ 前缀，两个平行树
│   ├── linan/      # 卷一：mountains / scenic / history / culture / contribute
│   └── [locale]/linan/
├── views/          # 页面主体（React 组件，构建期渲染为静态 HTML）
├── components/     # 共享组件：SiteHeader（唯一 island）、Seal、PageHero 等
├── layouts/        # BaseLayout（SEO / 字体 / GA）+ PageShell
└── i18n/
    ├── config.ts       # LOCALES、LANG_META（标签 / hreflang / 字体）
    ├── catalogs.ts     # 不翻译的结构：卷目、景点、图片、供图地点
    ├── t.ts            # 取文案 + 回退逻辑
    └── locales/        # zh / en / ja / ko 四份 JSON
scripts/
├── check-locales.mjs   # locale key 对齐校验
└── sync-locales.mjs    # locale 同步辅助
```

## 多语言

| 代码 | URL | 说明 |
|------|-----|------|
| `zh` | `/…`（默认无前缀） | 底本语言，`x-default` 指向它 |
| `en` | `/en/…` | 全文 |
| `ja` | `/ja/…` | 全文 |
| `ko` | `/ko/…` | 全文 |

规则：

- 四份 locale 必须覆盖同一套 key；缺 key 回退到中文（不再先走英文）。
- 文案是**改写**，不是逐句对译：同一事实与语气，在各语言里独立成篇。
- 印章字、卷次编号、拉丁学名不进语言文件，写在 `catalogs.ts`。
- 刊头双语小字：中文页配英文，其余语言页配中文。
- 字体按 `html[lang]` 加载 Noto Serif SC / JP / KR；日韩页额外加载 SC（供中文小字）。
- 新增语言：复制 `en.json` 改写为该语言全文，加入 `config.ts` 的 `LOCALES` 与 `LANG_META`。

## 供图

供图按「卷」分标准，不是全站统一页：

- `/contribute` — 总入口：说明各地标准不同，列出开放中的卷（卡片带该卷收稿摘要）
- `/{city}/contribute`（如 `/linan/contribute`）— 该卷完整规则：why / what / how / license
- 投稿走邮件 `hello@jiuzhou.world`，subject 带卷名便于分拣

新增一城：在 `catalogs.ts` 的 `contributePlaces` 加条目 + locale 里补 `contribute.{city}` 文案
+ 建 `/{city}/contribute` 路由，总入口会自动多出一张卡。

## SEO

- 每页独立 `title` / `description` / Open Graph / canonical
- `hreflang`（zh-CN / en / ja / ko / x-default）
- JSON-LD（`WebSite` / `CollectionPage` / `AboutPage`）
- `robots.txt` + 自动生成的 `sitemap-index.xml`
- 图片 WebP + 关键 alt
- 旧路径（如 `/mountains`）通过 `public/_redirects` 301 到 `/linan/*`

## 项目脑（BRAIN.md）

决策、约束与路线图记录在 `brain/`，经 CLI 读写，**不要手改**：

```bash
npm run brain -- list-pages       # 知识页索引
npm run brain -- read-root stack  # 读根页（background / architecture / stack / roadmap …）
```

协议全文见根目录 `BRAIN.md`。

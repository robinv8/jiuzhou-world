# 九州志 · jiuzhou.world

一卷一城，线上的中国地方志。已开：浙江、杭州卷、其下临安卷。

- 站点：https://jiuzhou.world
- 仓库：https://github.com/robinv8/jiuzhou-world

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
| 项目记忆 | [`@mindmux/brain-md`](https://projectbrain.md) — 云端为准，仓库 `brain/` 是快照 |

## 开发

```bash
npm install
npm run dev          # 本地开发
npm run build        # 构建到 dist/
npm run preview      # 预览构建产物
npm run i18n:check   # 校验五种 locale 的 key 对齐（CI 构建前也会跑）
```

`package.json` 里的 `"private": true` 只是防止被误发到 npm。这是一个站点，不是要安装的包。

部署密钥放在 GitHub Actions secrets，不进仓库：`CLOUDFLARE_API_TOKEN`、`CLOUDFLARE_ACCOUNT_ID`。没有这两项时，本地 `npm run build` 仍然可以跑。

## 目录结构

```
src/
├── pages/          # 路由壳：简体无前缀，其他语言走 [locale]/
│   ├── zhejiang/   # 省页
│   ├── hangzhou/   # 杭州卷、临安卷，以及富阳等下辖卷
│   └── [locale]/   # zh-hant / en / ja / ko 的平行树
├── views/          # 页面主体（React 组件，构建期渲染为静态 HTML）
├── components/     # SiteHeader（唯一 island）、图注、落款等
├── layouts/        # BaseLayout（SEO / 字体 / GA）+ PageShell
└── i18n/
    ├── config.ts       # LOCALES、LANG_META
    ├── catalogs.ts     # 不翻译的结构：卷目、图位、供图地点
    ├── t.ts            # 取文案 + 回退
    └── locales/        # zh / zh-hant / en / ja / ko
design/             # 设计稿、图版出处、交接说明（不参与构建）
public/images/      # 站点用图
scripts/            # locale、404、下辖卷校验
```

## 多语言

| 代码 | URL | 说明 |
|------|-----|------|
| `zh` | `/…`（默认无前缀） | 简体中文底本，`x-default` 指向它 |
| `zh-hant` | `/zh-hant/…` | 繁體中文（字形轉換，不是台灣用詞） |
| `en` | `/en/…` | 全文 |
| `ja` | `/ja/…` | 全文 |
| `ko` | `/ko/…` | 全文 |

规则：

- 各 locale 必须覆盖同一套 key；缺 key 回退到简体中文（不再先走英文）。
- 文案是**改写**，不是逐句对译：同一事实与语气，在各语言里独立成篇。繁體由简体底本做字形轉換（地鐵不改成捷運）。
- 印章字、卷次编号、拉丁学名不进语言文件，写在 `catalogs.ts`。
- 刊头双语小字：简体 / 繁體页配英文，其余语言页配简体中文。
- 字体按 `html[lang]` 加载 Noto Serif SC / TC / JP / KR；日韩页额外加载 SC（供中文小字）。
- 新增语言：复制 `en.json` 改写为该语言全文，加入 `config.ts` 的 `LOCALES` 与 `LANG_META`。

## 供图

供图按「卷」分标准，不是全站统一页：

- `/contribute` — 总入口：说明各地标准不同，列出开放中的卷（卡片带该卷收稿摘要）
- `/hangzhou/linan/contribute` — 该卷完整规则：why / what / how / license
- 投稿走邮件 `hello@jiuzhou.world`，subject 带卷名便于分拣

新增一城：在 `catalogs.ts` 的 `contributePlaces` 加条目 + locale 里补 `contribute.{city}` 文案
+ 建 `/{city}/contribute` 路由，总入口会自动多出一张卡。

## SEO

- 每页独立 `title` / `description` / Open Graph / canonical
- `hreflang`（zh-CN / en / ja / ko / x-default）
- JSON-LD（`WebSite` / `CollectionPage` / `AboutPage`）
- `robots.txt` + 自动生成的 `sitemap-index.xml`
- 图片 WebP + 关键 alt
- 旧路径（如 `/linan`、`/mountains`）通过 `public/_redirects` 301 到 `/hangzhou/linan/...`

## 项目记忆

决定以 MindMux Cloud Brain 为准。仓库里的 `brain/` 是提交时导出的快照，不要手改。

本地绑定写在 `.mindmux/preferences.json`，这个文件不进仓库。可从 `.mindmux/preferences.example.json` 复制一份再填自己的 brain。

## 图

站点图在 `public/images/`。古籍、方志版画和古地图的出处在 `design/images/SOURCES.md`。用这些图时保留出处，不要改成没有来源的现代照片。

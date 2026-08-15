# 九州志 · jiuzhou.world

一卷一城，线上的中国地方志。第一卷：临安。

## 技术栈

- [Astro](https://astro.build) 静态站点 + React islands
- Tailwind CSS
- 部署：Cloudflare Pages（GitHub Actions CI）
- 项目记忆：[BRAIN.md](./BRAIN.md)（[`@mindmux/brain-md`](https://projectbrain.md)）— 决策与约束写在 `brain/`，经 `npx brain` / `npm run brain` 读写

## 项目脑（BRAIN.md）

```bash
npm install
npx brain list-pages    # 或 npm run brain -- list-pages
npx brain read-root stack
```

协议见根目录 `BRAIN.md`；不要手改 `brain/` 下文件。

## 开发

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
npm run preview
```

## 语言

| 代码 | URL | 文案 |
|------|-----|------|
| `zh` | `/…`（默认无前缀） | 完整 |
| `en` | `/en/…` | 完整 |
| `ja` | `/ja/…` | 结构已就绪，回退 en → zh |
| `ko` | `/ko/…` | 结构已就绪，回退 en → zh |

文案按语言分文件，放在 `src/i18n/locales/`（`zh.json` / `en.json` / `ja.json` / `ko.json`）。路由与语言列表仍在 `src/i18n/config.ts`。组件通过 `t('nav.home')` 取值，缺译时回退 **当前语言 → en → zh**。

新增语言：

1. 在 `src/i18n/config.ts` 的 `LOCALES` 增加代码
2. 新增 `src/i18n/locales/<code>.json`（可先只译部分 key，其余回退）
3. 在 `src/i18n/t.ts` 的 `catalogs` 里挂上该文件

## SEO

- 每页独立 `title` / `description` / Open Graph / canonical
- `hreflang`（zh-CN / en / ja / ko / x-default）
- JSON-LD（`WebSite` / `CollectionPage` / `AboutPage`）
- `robots.txt` + 自动生成 `sitemap-index.xml`
- 图片 WebP + 关键 alt
- 旧路径 `/mountains` 等 301 到 `/linan/*`

## 站点

- https://jiuzhou.world
- https://jiuzhou-world.pages.dev

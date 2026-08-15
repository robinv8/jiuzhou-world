# 九州志 · jiuzhou.world

一卷一城，线上的中国地方志。第一卷：临安。

## 技术栈

- [Astro](https://astro.build) 静态站点 + React islands
- Tailwind CSS
- 部署：Cloudflare Pages（GitHub Actions CI）

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

新增语言：在 `src/i18n/config.ts` 的 `LOCALES` 增加代码，并逐步补 `LocalizedString` 字段。

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

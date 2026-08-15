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

## SEO

- 每页独立 `title` / `description` / Open Graph / canonical
- `robots.txt` + 自动生成 `sitemap-index.xml`
- 默认语言 `zh-CN`，正文在构建时输出到 HTML
- 旧路径 `/mountains` 等 301 到 `/linan/*`

## 站点

- https://jiuzhou.world
- https://jiuzhou-world.pages.dev

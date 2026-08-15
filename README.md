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
| `zh` | `/…`（默认无前缀） | 全文 |
| `en` | `/en/…` | 全文 |
| `ja` | `/ja/…` | 全文 |
| `ko` | `/ko/…` | 全文 |

文案按语言分文件：

```
src/i18n/locales/zh.json   # 全文（中文底本）
src/i18n/locales/en.json   # 全文，key 与 zh 对齐
src/i18n/locales/ja.json   # 全文
src/i18n/locales/ko.json   # 全文
```

四份 locale 必须覆盖同一套 key，但文案是改写，不是逐句对译：同一事实与语气，各自语言里能独立成篇。印章字、卷次编号、拉丁学名不进语言文件。校验：`npm run i18n:check`。

新增完整语言：复制 `en.json`，译完全部 key，并加入 `LOCALES` 与 `TRANSLATED_LOCALES`。

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

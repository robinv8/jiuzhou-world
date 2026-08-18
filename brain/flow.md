---
slug: flow
kind: root-page
title: Key Flows
updated: "2026-08-16T14:07:19"
---

# Key Flows

## 1. 读者打开一个多语言章节页

典型例子：读者访问 `/en/linan/history`。

```mermaid
sequenceDiagram
  participant U as Reader
  participant CDN as Cloudflare Pages
  participant HTML as Static HTML
  participant H as SiteHeader island
  U->>CDN: GET /en/linan/history
  CDN-->>U: Astro 构建好的 HTML / CSS / assets
  HTML->>H: client:load 只水合顶栏
  H-->>U: 滚动隐藏 / 菜单 / 语言切换
```

关键点：

- 正文由 Astro 在构建期渲染，不依赖客户端 React 才能阅读。
- `BaseLayout` 在 HTML head 写入 canonical、hreflang、OG、JSON-LD 与字体。
- `SiteHeader` 是主要客户端交互层；正文 reveal、Ken Burns、hover zoom 等主要由 CSS 完成。

## 2. 页面生成流程

```mermaid
flowchart TD
  Route["src/pages 路由"] --> SEO["getPageSeo(basePath)"]
  Route --> Lang["锁定 lang\nzh 或 Astro.params.locale"]
  Lang --> Shell["PageShell"]
  SEO --> Shell
  Shell --> HeaderCopy["headerCopy(lang, path)"]
  Shell --> View["Home / Linan / Chapter / Contribute view"]
  View --> Catalogs["catalogs.ts 结构"]
  View --> Locale["messages(lang)"]
  Locale --> JSON["locales/*.json"]
  Shell --> Layout["BaseLayout SEO 输出"]
```

## 3. 语言切换流程

```mermaid
flowchart LR
  Current["当前 pathname"] --> Strip["stripLocale() 得到语言中立路径"]
  Strip --> With["withLocale(basePath, nextLang)"]
  With --> Link["Header 语言链接"]
```

规则：

- 中文是默认语言，不加 `/zh`。
- `en / ja / ko` 加语言前缀。
- `hreflang` 包含 `zh-CN / en / ja / ko / x-default`，其中 `x-default` 指向中文。

## 4. 供图流程

```mermaid
sequenceDiagram
  participant R as Reader
  participant Hub as /contribute
  participant Place as /linan/contribute
  participant Mail as hello@jiuzhou.world
  R->>Hub: 查看当前开放中的卷
  Hub->>Place: 进入临安卷供图规则
  Place-->>R: why / what / how / license
  R->>Mail: mailto，subject 带卷名
```

产品约束：供图按“一卷一城”拆分标准。全站总入口只列出开放卷；每一卷自己的 `/{city}/contribute` 才写完整规则。

## 5. 构建与发布流程

```mermaid
sequenceDiagram
  participant Dev as Developer
  participant CI as GitHub Actions
  participant Check as scripts/check-locales.mjs
  participant Build as astro build
  participant CF as Cloudflare Pages
  Dev->>CI: push main/master
  CI->>CI: npm install --no-fund --no-audit
  CI->>Check: npm run i18n:check
  Check-->>CI: en/ja/ko keys must match zh
  CI->>Build: npm run build
  Build-->>CI: dist/
  CI->>CF: wrangler pages deploy dist --project-name=jiuzhou-world
```

`check-locales.mjs` 把 `zh.json` 当 canonical key tree；`en / ja / ko` 缺 key 或多 key 都会让 CI 失败。

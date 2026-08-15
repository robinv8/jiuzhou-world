---
id: photo-contribute
title: "供图入口：邮件投稿，不是相册社区"
category: decision
status: active
created: "2026-08-15T12:41:49"
updated: "2026-08-15T21:27:06"
---

<!-- compiled_truth -->
供图是「一卷一城」：不同地域收的图不一样，不是全站同一套标准，也不是只服务临安。

结构：
- /contribute 总入口：说明各地标准不同，列出开放中的卷（卡片上是该卷收什么的摘要 blurb）
- /{city}/contribute 地方页：该卷完整规则（why / what / how / license）；「收什么」按地域写死
- 邮件 subject 带卷名，便于分拣

扩展下一城：catalogs.contributePlaces 加条目 + locales contribute.{city} + 路由 /{city}/contribute。总入口会自动多一张卡。


## Timeline

- time: 2026-08-15T12:41:49
  kind: decision
  summary: "Created this page: 供图入口：邮件投稿，不是相册社区"
  source: product
  affects: [photo-contribute]

- time: 2026-08-15T12:41:49
  kind: decision
  summary: "邮件供图入口，授权写在页上"
  source: product
  affects: [photo-contribute]

- time: 2026-08-15T21:22:12
  kind: decision
  summary: "供图按卷拆分，非全站统一页"
  source: product
  affects: [photo-contribute]

- time: 2026-08-15T21:22:12
  kind: decision
  summary: "供图改为按地方/卷独立页（/linan/contribute），旧全局路径 301"
  source: product
  affects: [photo-contribute, i18n-locale-routing]

- time: 2026-08-15T21:27:06
  kind: decision
  summary: "供图：总入口 + 各地不同收稿标准"
  source: product
  affects: [photo-contribute]

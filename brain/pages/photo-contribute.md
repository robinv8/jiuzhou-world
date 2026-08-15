---
id: photo-contribute
title: "供图入口：邮件投稿，不是相册社区"
category: decision
status: active
created: "2026-08-15T12:41:49"
updated: "2026-08-15T21:22:12"
---

<!-- compiled_truth -->
供图入口按「一卷一城」拆分：每个地方/卷有自己的供图页，不是全站共用一个 /contribute。

当前：
- 路径：/linan/contribute（及 /en|ja|ko/linan/contribute）
- 文案：locales 中 contribute.linan.*
- 邮件 subject 带「临安卷」
- 旧 /contribute 与各语言 /{locale}/contribute 经 _redirects 301 到临安卷

下一卷开城时：在 contributePlaces 增加条目、写 contribute.{city} 文案、加 /{city}/contribute 路由即可。仍用邮件收稿，不是上传社区。


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

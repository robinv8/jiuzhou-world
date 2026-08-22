---
id: photo-contribute
title: "供图入口：邮件投稿，不是相册社区"
category: decision
status: active
created: "2026-08-15T12:41:49"
updated: "2026-08-22T16:18:55"
---

<!-- compiled_truth -->
# 供图：按卷收稿，邮件，不是相册社区

供图跟写作单位走：市卷和下辖卷都可以单开，各收各的山川。不是全站同一套标准，也不是账号 / 上传 / 社区。

## 结构

- `/contribute` 总入口：说明各地标准不同，列出开放中的卷。
- `/{volume}/contribute` 地方页：该卷完整规则（why / what / how / license）。「收什么」按卷写死。
- 邮件 subject 带卷名，便于分拣。仍用 `hello@jiuzhou.world`。

## 开放卷

- **临安** `/hangzhou/linan/contribute`：山与水。天目与清凉、峡谷与湖、村与物产。已上线。
- **杭州** `/hangzhou/contribute`：湖与城。西湖与环湖山、茶山、灵隐、西溪、运河、钱塘江、吴山，以及城中人间。不收临安的山与谷。正文落地时一并做页。

两卷分拣，不要寄错。扩展下一城：`catalogs.contributePlaces` 加条目 + locales `contribute.{key}` + 路由。

关联 [[anthology-one-city-one-volume]]、[[hangzhou-narrative-spine]]、[[imagery-ai-first]]。


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

- time: 2026-08-22T16:18:55
  kind: decision
  summary: "杭州卷也单开供图：收湖与城，不收临安的山与谷。落地正文时做页，仍走邮件。"
  source: "当前聊天"
  affects: [photo-contribute]

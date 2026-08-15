---
id: i18n-locale-routing
title: "中文无前缀，其他语言 /[locale]；ja/ko 可回退"
category: decision
status: active
created: "2026-08-15T07:32:31"
updated: "2026-08-15T07:32:31"
---

<!-- compiled_truth -->
LOCALES = zh/en/ja/ko；DEFAULT_LANG=zh（URL 无前缀）。TRANSLATED_LOCALES 目前仅 zh、en 有完整手写文案；ja/ko 路由与 UI 就绪，字符串回退 en → zh。新增语言只需在 LOCALES 增加代码并逐步补 LocalizedString。关联：[[astro-static-ssg]]。


## Timeline

- time: 2026-08-15T07:32:31
  kind: decision
  summary: "Created this page: 中文无前缀，其他语言 /[locale]；ja/ko 可回退"
  source: src/i18n/config.ts
  affects: [i18n-locale-routing]

- time: 2026-08-15T07:32:31
  kind: decision
  summary: "确立可扩展多语言路由与翻译完备度分层"
  source: code
  affects: [i18n-locale-routing]

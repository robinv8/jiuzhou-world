---
id: i18n-locale-routing
title: "中文无前缀，其他语言 /[locale]；ja/ko 可回退"
category: decision
status: active
created: "2026-08-15T07:32:31"
updated: "2026-08-15T07:50:38"
---

<!-- compiled_truth -->
文案在 src/i18n/locales/{zh,en,ja,ko}.json，四份文件同一套 key 树（168 keys）。npm run i18n:check 校验对齐。ja/ko 未完稿的条目先与英文对齐，已有日韩短句（开卷、临安卷等）保留。组件用 t(key) 显示当前语言，双语微标用 counterpartLang（zh↔en）。结构数据仍在 catalogs.ts。新增语言：复制 en.json → locales/<code>.json，挂上 catalogs，再跑 i18n:check。


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

- time: 2026-08-15T07:47:01
  kind: decision
  summary: "文案改为按语言分 JSON 文件，不再在 TS 里写 { zh, en }"
  source: code
  affects: [i18n-locale-routing]

- time: 2026-08-15T07:50:38
  kind: decision
  summary: "四份 locale JSON 共用同一套 key；导航随当前语言显示"
  source: code
  affects: [i18n-locale-routing]

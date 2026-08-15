---
id: i18n-locale-routing
title: "中文无前缀，其他语言 /[locale]；ja/ko 可回退"
category: decision
status: active
created: "2026-08-15T07:32:31"
updated: "2026-08-15T07:57:40"
---

<!-- compiled_truth -->
zh / en 是全文。ja / ko 有路由，但只翻译少量界面短句（开卷、临安卷、口号等）；正文、SEO、各卷小传故意不译，回退 en → zh。这不是漏译。ja.json / ko.json 保持稀疏，不要为了对齐 key 而填入英文副本。印章字与卷次编号也不进语言文件。en.json 仍须与 zh.json 全 key 对齐。npm run i18n:check：en 必须完整，ja/ko 允许缺 key。


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

- time: 2026-08-15T07:57:40
  kind: decision
  summary: "ja/ko 只译少量界面短句，正文故意不译"
  source: product
  affects: [i18n-locale-routing]

---
id: i18n-locale-routing
title: "中文无前缀，其他语言 /[locale]；ja/ko 可回退"
category: decision
status: active
created: "2026-08-15T07:32:31"
updated: "2026-08-15T07:47:01"
---

<!-- compiled_truth -->
文案按语言分文件：src/i18n/locales/{zh,en,ja,ko}.json。路由与语言列表仍在 config.ts（zh 无前缀，en/ja/ko 走 /[locale]）。组件用 t('nav.home') / tList(...) 取值，缺译回退 当前语言 → en → zh。结构数据（id、图片、路由、拉丁名）留在 catalogs.ts，不进语言文件。新增语言：LOCALES 加代码 + 新增 locales/<code>.json + 在 t.ts catalogs 挂上。不再在 TypeScript 里写 { zh, en } LocalizedString。关联：[[astro-static-ssg]]。


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

---
id: i18n-locale-routing
title: "中文无前缀，其他语言 /[locale]；ja/ko 可回退"
category: decision
status: active
created: "2026-08-15T07:32:31"
updated: "2026-08-15T08:25:28"
---

<!-- compiled_truth -->
站点默认语言是中文：无 URL 前缀，x-default 指向中文。zh / en / ja / ko 四份 locale JSON 共用同一套 key，正文是改写不是对译。刊头双语小字以中文为默认对：中文页配英文，英/日/韩页配中文。缺 key 回退当前语言 → 中文（不再先走英文）。印章字、卷次编号、拉丁学名不进语言文件。字体按 html[lang] 加载 Noto Serif SC / JP / KR；日韩页额外加载 SC，供中文小字。npm run i18n:check：en/ja/ko 必须与 zh 全 key 对齐；CI 构建前会跑。


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

- time: 2026-08-15T08:05:01
  kind: decision
  summary: "正文译齐日韩；印章、卷次、拉丁名仍不译"
  source: product
  affects: [i18n-locale-routing]

- time: 2026-08-15T08:07:29
  kind: decision
  summary: "四语文案是改写，不是逐句对译"
  source: product
  affects: [i18n-locale-routing]

- time: 2026-08-15T08:16:19
  kind: decision
  summary: "刊头小字 en↔zh / 其他配英；按语言加载字体；CI 跑 i18n:check"
  source: product
  affects: [i18n-locale-routing]

- time: 2026-08-15T08:25:28
  kind: decision
  summary: "默认中文：刊头对译与缺 key 都回中文"
  source: product
  affects: [i18n-locale-routing]

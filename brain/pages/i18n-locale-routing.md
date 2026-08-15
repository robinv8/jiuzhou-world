---
id: i18n-locale-routing
title: "中文无前缀，其他语言 /[locale]；ja/ko 可回退"
category: decision
status: active
created: "2026-08-15T07:32:31"
updated: "2026-08-15T08:16:19"
---

<!-- compiled_truth -->
zh / en / ja / ko 四份 locale JSON 共用同一套 key。正文四种语言都写，但是改写，不是逐句对译。印章字、卷次编号、拉丁学名不进语言文件。刊头双语小字：英文页配中文，其余语言配英文（ja/ko 不再配中文）。字体按 html[lang] 分别加载 Noto Serif SC / JP / KR，不再用 CSS @import 一次拉全站中文宋。html lang 只由 BaseLayout 写入，不再被客户端改掉。回退链仍是 lang → en → zh。npm run i18n:check：en/ja/ko 必须与 zh 全 key 对齐；CI 构建前会跑。


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

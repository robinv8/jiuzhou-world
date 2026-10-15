---
id: i18n-locale-routing
title: "中文无前缀，其他语言 /[locale]；ja/ko 可回退"
category: decision
status: active
created: "2026-10-13T08:58:36.263Z"
updated: "2026-10-15T16:42:36"
---

<!-- compiled_truth -->
# 中文无前缀，其他语言 /[locale]

站点默认语言是**简体中文**：无 URL 前缀，`x-default` 指向它。

语言：`zh`（简体，默认）/ `zh-hant`（繁體，`/zh-hant`）/ `en` / `ja` / `ko`。各 locale JSON 共用同一套 key。en / ja / ko 正文是改写。繁體字符串值用 OpenCC **s2tw**（台湾字形，不含 s2twp 词汇：地铁不改捷运）。转完要改回这些错转：方志／地方志的「志」不改成「誌」；里程和地名里（一百许里、七里泷、千里、百里、公里、里畈、茅湾里、故里、里巷）保持「里」，「里面」才用「裡」；余姚、余杭、余暨在本志用古典「餘」；咸淳、范仲淹不改成鹹、範；于潜作「於潛」；纪念、苧萝、花岗岩按原词；拱宸桥西是「西历史街区」；钱塘江干流是「幹流」（不要被地名「江干」挡住）；「云漫上来」是「雲」；分水制笔作「製筆」，沙地划走作「劃走」。专条 markdown 是简体原文，繁体页照刊（文案写「全文简体」），不转换。日文只改 `seo.place` 里仍是简体的地名：富阳→富陽、桐庐→桐廬、萧山→蕭山；建德、淳安不动。

Robin 2026-09-08 签字的杭州景之卷 essence（灵隐、西溪、运河、钱塘江）只钉在 `zh.json`。他语不是这份正文的译本，不要按签字稿发明翻译；繁體也不在本轮跟改。

刊头双语小字：简体 / 繁體页配英文，英 / 日 / 韩页配简体中文。缺 key 回退当前语言 → 简体中文。印章字、卷次编号、拉丁学名不进语言文件。

字体按 `html[lang]` 加载 Noto Serif SC / TC / JP / KR；日韩页额外加载 SC，供中文小字。`hreflang`：`zh-CN` / `zh-Hant` / `en` / `ja` / `ko`。

`npm run i18n:check`：en / ja / ko / zh-hant 必须与 zh 全 key 对齐；CI 构建前会跑。


## Timeline

- time: 2026-10-13T08:58:36.266Z
  kind: creation
  author: "user:robin"
  summary: 从本地 brain 迁移（jiuzhou-world/brain）
  affects: [i18n-locale-routing]

- time: 2026-08-15T07:32:31+08:00
  kind: decision
  author: "user:robin"
  summary: "Created this page: 中文无前缀，其他语言 /[locale]；ja/ko 可回退"
  source: src/i18n/config.ts
  affects: [i18n-locale-routing]
  source_entry_id: "local:i18n-locale-routing:0"
  imported_at: 2026-10-13T08:58:36.641Z

- time: 2026-08-15T07:32:31+08:00
  kind: decision
  author: "user:robin"
  summary: 确立可扩展多语言路由与翻译完备度分层
  source: code
  affects: [i18n-locale-routing]
  source_entry_id: "local:i18n-locale-routing:1"
  imported_at: 2026-10-13T08:58:36.641Z

- time: 2026-08-15T07:47:01+08:00
  kind: decision
  author: "user:robin"
  summary: 文案改为按语言分 JSON 文件，不再在 TS 里写 { zh, en }
  source: code
  affects: [i18n-locale-routing]
  source_entry_id: "local:i18n-locale-routing:2"
  imported_at: 2026-10-13T08:58:36.641Z

- time: 2026-08-15T07:50:38+08:00
  kind: decision
  author: "user:robin"
  summary: 四份 locale JSON 共用同一套 key；导航随当前语言显示
  source: code
  affects: [i18n-locale-routing]
  source_entry_id: "local:i18n-locale-routing:3"
  imported_at: 2026-10-13T08:58:36.641Z

- time: 2026-08-15T07:57:40+08:00
  kind: decision
  author: "user:robin"
  summary: ja/ko 只译少量界面短句，正文故意不译
  source: product
  affects: [i18n-locale-routing]
  source_entry_id: "local:i18n-locale-routing:4"
  imported_at: 2026-10-13T08:58:36.641Z

- time: 2026-08-15T08:05:01+08:00
  kind: decision
  author: "user:robin"
  summary: 正文译齐日韩；印章、卷次、拉丁名仍不译
  source: product
  affects: [i18n-locale-routing]
  source_entry_id: "local:i18n-locale-routing:5"
  imported_at: 2026-10-13T08:58:36.641Z

- time: 2026-08-15T08:07:29+08:00
  kind: decision
  author: "user:robin"
  summary: 四语文案是改写，不是逐句对译
  source: product
  affects: [i18n-locale-routing]
  source_entry_id: "local:i18n-locale-routing:6"
  imported_at: 2026-10-13T08:58:36.641Z

- time: 2026-08-15T08:16:19+08:00
  kind: decision
  author: "user:robin"
  summary: "刊头小字 en↔zh / 其他配英；按语言加载字体；CI 跑 i18n:check"
  source: product
  affects: [i18n-locale-routing]
  source_entry_id: "local:i18n-locale-routing:7"
  imported_at: 2026-10-13T08:58:36.641Z

- time: 2026-08-15T08:25:28+08:00
  kind: decision
  author: "user:robin"
  summary: 默认中文：刊头对译与缺 key 都回中文
  source: product
  affects: [i18n-locale-routing]
  source_entry_id: "local:i18n-locale-routing:8"
  imported_at: 2026-10-13T08:58:36.641Z

- time: 2026-08-22T17:07:06+08:00
  kind: decision
  author: "user:robin"
  summary: 增加繁體中文 /zh-hant：字形轉換，刊頭配英文，字體 Noto Serif TC。
  source: 当前聊天
  affects: [i18n-locale-routing]
  source_entry_id: "local:i18n-locale-routing:9"
  imported_at: 2026-10-13T08:58:36.641Z

- time: 2026-09-08T10:19:45+08:00
  kind: decision
  author: "user:robin"
  summary: 签字中文景之卷 essence 不是他语底本；不要按签字稿发明 en/ja/ko/zh-hant 译文。
  source: Robin 签字稿 2026-09-08
  affects: [i18n-locale-routing]
  source_entry_id: "local:i18n-locale-routing:10"
  imported_at: 2026-10-13T08:58:36.641Z

- time: 2026-09-17T09:34:39+08:00
  kind: decision
  author: "user:robin"
  summary: 专条长文不进 locale JSON；他语只 stub 标题与摘句以过 key parity，正文回退简体。
  source: SHIP 10 gazetteer entries
  affects: [gazetteer-entry-pages, i18n-locale-routing]
  source_entry_id: "local:i18n-locale-routing:11"
  imported_at: 2026-10-13T08:58:36.641Z

- time: 2026-10-15T16:42:36
  kind: decision
  summary: "繁体用 OpenCC s2tw 字形，并记下里/志/余/干流等必须改回的错转；专条 markdown 不转"
  source: fix/zh-hant-chars
  affects: [i18n-locale-routing]

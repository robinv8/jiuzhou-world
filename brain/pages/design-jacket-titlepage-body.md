---
id: design-jacket-titlepage-body
title: "设计稿视觉结构：护封 → 书芯"
category: decision
status: active
tags: [design, visual, structure, pen]
created: "2026-10-13T08:58:32.065Z"
updated: "2026-10-14T03:12:19.560Z"
---

<!-- compiled_truth -->
# 设计稿视觉结构：护封 → 书芯（扉页已取消）

2026-10-13 Robin 定稿三层，2026-10-14 去掉扉页。设计稿在 `design/jiuzhou-design.pen`（pen.dev），交接说明在 `design/HANDOFF.md`。实现由本机 grok CLI 做，见 [[agent-roles-design-vs-build]]。

## 为什么分层

线上站（通栏大图、现代导航）和古籍书版式两种都被认可，但放在同一页里差别太大；混合稿和另起炉灶的「现代地理志」都被否了。解法是按书的物理层次分开：

- **护封**：线上风格。通栏古画或版画 + 渐变 + 顶栏导航，标题与副标题沿用站点文案。右下角落款：所属 + 刊行年 + 方印。
- **书芯**：书版式原样保留，不往线上风格稀释（读法、舆图、目录、结语、牌记）。

## 为什么去掉扉页

护封已有大字书名，扉页再写一遍是纯重复，多滚一屏没有新信息。扉页独有的印、刊行年、所属并进护封落款。护封上原有的两列竖排（如「南宋旧都」「西湖之畔」）也和副标题重复，一并换成落款。以后加新层先问：它有没有护封没有的信息？

## 只用老图

这四页不放 AI 重绘图和现代照片，护封、书衣、卡片全部用公版古画、方志版画、古地图，出处记在 `design/images/SOURCES.md`，见 [[public-domain-maps]]、[[imagery-ai-first]]。古画护封除首页外都做成纸色淡化、墨色字、副标题与落款衬签条。

## 各页落法

- **首页（总目）**：要恢弘大气。护封用《千里江山图》局部，深色压暗、浅色字，底栏右侧落款 + 印「九」；之后九州（禹迹图大图）、序、卷、省、牌记。「卷」只陈列杭州卷（书衣用李嵩《西湖图》孤山、保俶塔一段；小字「古扬州之地」），「省」只列浙江；不摆筹备卷与未开省，下辖卷不上首页。
- **省页（浙江）**：护封用《富春山居图》（无用师卷）局部；文案用站点 province.zhejiang。护封下是题签 + 1754 浙江图，再是诸市：只列已开的杭州（卡片用李嵩《西湖图》孤山、白堤一段）与其已开区县临安。
- **市卷（杭州）**：护封用南宋李嵩《西湖图》卷雷峰塔一段，落款印「湖」；书芯舆图用乾隆《杭州府志》府城图。
- **下辖卷（临安）**：护封用光绪二年（1876）《西天目祖山志》卷首西天目山图，落款印「临」；书芯目录与牌记是深色金石调，牌记拱顶框；舆图用乾隆《临安县志》形胜图。

## 图注

每张图都写图注：朝代、作者或刊本、图名、藏处。

## 约束

- 文案只用站点已有文字或可核实的事实；编出来的术语、篇目、季节句一律不放。目录用 `catalogs.ts` 的真实篇目。
- 九州只作序与注脚，目录按今省，见 [[root-pulse-mountains-rivers]]。只列已开，见 [[reader-route-province-city]]。
- 墨色用 `#1F2A26`。

## Timeline

- time: 2026-10-13T08:58:32.068Z
  kind: creation
  author: "user:robin"
  summary: 从本地 brain 迁移（jiuzhou-world/brain）
  affects: [design-jacket-titlepage-body]

- time: 2026-10-13T16:24:15+08:00
  kind: decision
  author: "user:robin"
  summary: Robin 定稿设计稿三层结构：护封（线上实景）→ 扉页（古籍书名页）→ 书芯（书版式不稀释）；首页要恢弘大气；临安卷用碑形扉页与深色金石书芯。
  source: Robin 2026-10-13 设计评审
  affects: [design-jacket-titlepage-body]
  source_entry_id: "local:design-jacket-titlepage-body:0"
  imported_at: 2026-10-13T08:58:32.432Z

- time: 2026-10-13T16:25:53+08:00
  kind: decision
  author: "user:robin"
  summary: 首页设计稿对齐 [[reader-route-province-city]] 与 [[root-pulse-mountains-rivers]]：去掉五本「筹备」卷与淡墨诸省，「省」只列浙江；下辖卷临安不上首页；「卷」只陈列杭州卷，小字「古扬州之地」在「卷一 · 浙江 · 杭州」之下。
  source: Robin 2026-10-13
  affects: [design-jacket-titlepage-body]
  source_entry_id: "local:design-jacket-titlepage-body:1"
  imported_at: 2026-10-13T08:58:32.432Z

- time: 2026-10-13T09:29:31.967Z
  kind: decision
  author: "user:robin"
  summary: 省页（浙江）补护封：用公版古画《富春山居图》（无用师卷）局部，不再与杭州卷共用西湖图；纸色底、深墨字，副标题衬签条。文案用站点 province.zhejiang（古扬州之南 / 七山一水二分田……）。省不是卷，不设扉页。同时按 [[reader-route-province-city]] 删去「未刊诸市」与杭州下五个「筹备」区县，只留已开的杭州与临安。
  source: Robin 2026-10-13 设计
  affects: [design-jacket-titlepage-body, reader-route-province-city]

- time: 2026-10-13T09:40:59.612Z
  kind: edit
  author: "user:robin"
  summary: Edited Page [[design-jacket-titlepage-body]] in MindMux Cloud
  affects: [design-jacket-titlepage-body]

- time: 2026-10-14T03:12:19.558Z
  kind: reversal
  author: "user:robin"
  summary: 去掉扉页（首页、杭州卷、临安卷）：它与护封重复书名。印、刊行年、所属并进护封右下角落款；护封上与副标题重复的两列竖排也换成落款。临安的圭首碑形扉页随之取消。
  source: Robin 2026-10-14：「第二屏临安山水志，显得多余了吧跟 hero 内容重复」；选择「去掉扉页、并入护封」，范围「首页、杭州、临安都改」
  affects: [design-jacket-titlepage-body]

---
id: chapter-skeleton
title: "四章骨架：山川、景、物、史"
category: decision
status: active
tags: [editorial, structure, chapters]
created: "2026-10-13T08:58:30.069Z"
updated: "2026-10-13T08:58:30.491Z"
---

<!-- compiled_truth -->
# 四章骨架：山川、景、物、史

全国各卷同一套**写作容器**。第一章原称「山之卷」，因总脉为山川为纲，改为「山川之卷」。见 [[root-pulse-mountains-rivers]]。

| 章 | 写什么 | 不写什么 |
|---|---|---|
| 山川 | 这一城的山川系统：山与水如何相对、如何被人类梳妆 | 不是景点小传 |
| 景 | 沿这条山川能立住读法的去处 | **不与山川抢同一个名字** |
| 物 | 山川养出来的人间 | 不把山川里的地貌再当一条物产写一遍 |
| 史 | 这座城如何成为它自己 | 不与下辖卷复读同一段史 |

内部路由 / catalog key 仍为 `mountains` / `scenic` / `culture` / `history`。中文标签为山川 / 景 / 物 / 史。英文等改写时，第一章对应 landscape，不必硬译成 Mountains。四章落地页 URL 不改。

## 市页三类（只改呈现）

杭州市页把已刊专条收成三类，见 [[reader-route-province-city]]：

- 山川美景 = `mountains`
- 名胜古迹 = `scenic`
- 历史文化 = `history` + `culture`（茶等物产归此）

不新建合并路由。章页与专条路径保持原样。

## 章号

「卷一」只指顶层市卷（杭州）。章可以叫「山川之卷」，但页上 kicker 不再写「卷一 / 卷二 / 卷三 / 卷四」，以免与卷号打架。

临安已遵守「不抢名」：山川是天目、大明、清凉、水；景是太湖源、峡谷、青山湖、指南村、河桥。杭州名单见 [[hangzhou-narrative-spine]]。

## Timeline

- time: 2026-10-13T08:58:30.076Z
  kind: creation
  author: "user:robin"
  summary: 从本地 brain 迁移（jiuzhou-world/brain）
  affects: [chapter-skeleton]

- time: 2026-08-22T16:04:19+08:00
  kind: decision
  author: "user:robin"
  summary: "Created this page: 四章骨架：山川、景、物、史"
  source: 当前聊天
  affects: [chapter-skeleton]
  source_entry_id: "local:chapter-skeleton:0"
  imported_at: 2026-10-13T08:58:30.487Z

- time: 2026-08-22T16:04:37+08:00
  kind: decision
  author: "user:robin"
  summary: 全国四章容器定为山川、景、物、史；第一章从「山」改为「山川」。内部 key 仍为 mountains。
  source: 当前聊天
  affects: [chapter-skeleton]
  source_entry_id: "local:chapter-skeleton:1"
  imported_at: 2026-10-13T08:58:30.487Z

- time: 2026-08-22T16:09:10+08:00
  kind: decision
  author: "user:robin"
  summary: 补章号规则：卷一只指市卷；章可称山川之卷，kicker 不用卷一、卷二。
  source: 当前聊天
  affects: [chapter-skeleton]
  source_entry_id: "local:chapter-skeleton:2"
  imported_at: 2026-10-13T08:58:30.487Z

- time: 2026-09-17T09:34:39+08:00
  kind: decision
  author: "user:robin"
  summary: 章下可挂长文专条；短条仍留在章页，专条走 /{volume}/{chapter}/{id}/。
  source: SHIP 10 gazetteer entries
  affects: [gazetteer-entry-pages, chapter-skeleton]
  source_entry_id: "local:chapter-skeleton:3"
  imported_at: 2026-10-13T08:58:30.487Z

- time: 2026-10-12T15:46:05+08:00
  kind: decision
  author: "user:robin"
  summary: 市页三类是呈现层；四章 key 与 URL 不变
  source: Robin 2026-10-12
  affects: [chapter-skeleton]
  source_entry_id: "local:chapter-skeleton:4"
  imported_at: 2026-10-13T08:58:30.487Z

- time: 2026-10-12T15:46:57+08:00
  kind: reversal
  author: "user:robin"
  summary: 撤回杭州市页直接列四章卡：市页按三类陈列已刊专条，四章 URL 仍在。
  source: Robin 2026-10-12
  affects: [reader-route-province-city]
  source_entry_id: "local:chapter-skeleton:5"
  imported_at: 2026-10-13T08:58:30.487Z

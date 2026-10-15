---
id: public-domain-maps
title: "设计稿舆图：只用公版真图，出处入表"
category: decision
status: active
tags: [design, maps, provenance, accuracy]
created: "2026-10-13T08:58:40.459Z"
updated: "2026-10-13T09:29:39.306Z"
---

<!-- compiled_truth -->
# 设计稿舆图：只用公版真图，出处入表

2026-10-13 Robin 要求「确保内容的真实性」。设计稿里原先的 AI 生成地图全部撤掉，换成公有领域的古地图；实在找不到真图的位置才允许用示意图，并且必须标「示意」。

## 规则

- 舆图只用公版原图（目前都经 Wikimedia Commons 获取），不用 AI 画的「古地图」。
- 每一张都在 `design/images/SOURCES.md` 登记：图名、年代、原件藏处、Commons 文件名、裁切方式。新增图必须先入表再上稿。
- 图注只写能从原件或藏处著录核实的信息，不给古图编故事。
- 器物、图名不改称、不简称成错的（例：《禹迹图》不叫「宋刻」）。

## 现用图

| 位置 | 图 | 年代 / 出处 |
|---|---|---|
| 首页护封 | 《千里江山图》局部 | 北宋 1113，王希孟，故宫博物院藏 |
| 首页九州 | 《禹迹图》拓本 | 阜昌七年（1136）刻石，原石西安碑林；拓本美国国会图书馆 gm71005080 |
| 浙江省页 | 《大清分省舆图》浙江图 | 乾隆十九年（1754），美国国会图书馆 2002626726 第 10 幅 |
| 杭州卷 | 府城图 | 乾隆《杭州府志》（Commons 标 1784），自「杭州省城、海塘、府學圖」裁出 |
| 临安卷 | 形胜图 | 乾隆二十四年（1759）《临安县志》刻本，PDF 第 35 页 |

## 已核实、写图注时不能错

- 阜昌是伪齐年号，《禹迹图》不简称「宋刻」。图上「每方折地百里」。
- 《禹贡》九州今天对不上：黄河已多次改道，不写「河还在原处」一类句子。
- 府城图**南在上**、西在右：城在左，西湖在右。
- 乾隆《临安县志》记的是清临安县，约当今临安区东部；西天目山当时属於潜县，不在此图内。

## 未决

- 站点地方场景图按 [[imagery-ai-first]] 是 AI 重画。是否在页面上标注（如「示意」）尚未定。

关联 [[design-jacket-titlepage-body]]、[[gazetteer-historical-accuracy]]、[[imagery-ai-first]]。

## Timeline

- time: 2026-10-13T08:58:40.462Z
  kind: creation
  author: "user:robin"
  summary: 从本地 brain 迁移（jiuzhou-world/brain）
  affects: [public-domain-maps]

- time: 2026-10-13T16:24:15+08:00
  kind: decision
  author: "user:robin"
  summary: Robin 要求内容真实：设计稿 AI 地图全部换成公版古地图（禹迹图、1754 浙江图、乾隆杭州府志府城图、乾隆临安县志形胜图），出处登记在 design/images/SOURCES.md；找不到真图才标示意。
  source: Robin 2026-10-13 设计评审
  affects: [public-domain-maps]
  source_entry_id: "local:public-domain-maps:0"
  imported_at: 2026-10-13T08:58:40.840Z

- time: 2026-10-13T09:29:39.304Z
  kind: decision
  author: "user:robin"
  summary: "新增护封古画：元黄公望《富春山居图》无用师卷（台北故宫，公有领域，Commons File:富春山居圖(無用師卷).jpg，裁 x=18700 段 1600×884）→ design/images/hero-zhejiang-fuchun.webp，已登记 SOURCES.md。图注不标具体地点（画江不是定点）。前段《剩山图》藏浙江省博，但 Commons 仅 1472×787，不够做通栏。"
  source: Robin 2026-10-13 设计
  affects: [public-domain-maps]

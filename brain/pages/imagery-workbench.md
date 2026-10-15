---
id: imagery-workbench
title: "配图工作台：左预览、右选底"
category: decision
status: active
tags: [imagery, studio, local-only]
created: "2026-10-13T08:58:37.523Z"
updated: "2026-10-13T08:58:37.991Z"
---

<!-- compiled_truth -->
# 配图工作台：左预览、右选底

本地选图后台，不是方志 CMS，也不把网上原片换上站点。

## 入口

`astro dev` 下打开 `/_studio`。Vite 插件只在 `serve` 挂载，`astro build` 不含此后台。

## 用法

- 左栏是真实页面。点挂了槽的图，即选中这个地方。
- 人勾「底」，再点「确定进队列」。AI 抓取和筛图，**不勾底、不进队列**。
- AI 只读确认过的底，按 [[imagery-ai-first]] 重画。原片不上站。
- 一条槽若正文点了多处（如环湖诸山：宝石山、葛岭、北高峰、吴山），用 **tab 分地**看底，不混在一格。抓取、清空、进队列都只作用于当前 tab。
- 抓取写 `_photo_candidates`，不得触发工作台整页刷新。

## 一地一图

只给**真地名**配图，不给页面配图。同一 `place` 在 catalogs 里共用同一张 `image`。

- 卷封面 = 该卷核（杭州西湖、临安西天目、富阳富春江、桐庐钓台、建德三江口、淳安千岛湖、萧山浦阳江）。
- 山川之卷 hero = 该章第一条（杭州即西湖，与卷封面同一张）。景/物/史封面 = 该章第一条。
- 章页没有单独的照片封面：标题+导言，第一张图就是第一条正文。导航因此用深色字，不按全幅照片起手。
- 山川西湖与吴越定都共用 `hangzhou-westlake.webp`。史·人间用当代湖滨稿 `hangzhou-modern.webp`。
- 狮峰茶山 `hangzhou-tea.webp`，龙井村 `hangzhou-longjing.webp`。
- 中插挂某一则详情，不另生成。总目封面仍是《千里江山图》。

抓底：每个地名抓约 50 张实景。队列只留人确定过的底，每地最多 **5** 张。重复地名不另排。

## 选图范围

工作台只点挂了槽的图：正文条目（山川/景/物/史）、总目封面、卷/省全幅核图、中插。列表卡（总目卷卡、省下城卡、卷下章卡、下辖卷卡）只复用展示，不挂槽、不可选。点列表卡会进对应页，再在正文里选。

## 不做

- 不为卷封面、章封面、中插、列表卡单独生成或单独选图。
- 候选原片不上 `public/images`。
- 不在读者页露出 `place`。
- AI 不代替人点「确定进队列」。

## Timeline

- time: 2026-10-13T08:58:37.527Z
  kind: creation
  author: "user:robin"
  summary: 从本地 brain 迁移（jiuzhou-world/brain）
  affects: [imagery-workbench]

- time: 2026-08-22T21:35:13+08:00
  kind: decision
  author: "user:robin"
  summary: "Created this page: 配图工作台：左预览、右选底"
  source: 当前聊天
  affects: [imagery-workbench]
  source_entry_id: "local:imagery-workbench:0"
  imported_at: 2026-10-13T08:58:37.983Z

- time: 2026-08-22T21:35:24+08:00
  kind: decision
  author: "user:robin"
  summary: 本地配图工作台：左网页预览点槽，右抓取/确认底图，AI 只读已确认的底重画；仅 astro dev 的 /_studio，不进生产。
  source: 当前聊天
  affects: [imagery-workbench]
  source_entry_id: "local:imagery-workbench:1"
  imported_at: 2026-10-13T08:58:37.983Z

- time: 2026-08-22T22:25:48+08:00
  kind: decision
  author: "user:robin"
  summary: 抓取源加必应图片页（解析 murl/turl）；维基仍可选。官方 Bing Image Search API 已于 2025-08 下线。
  source: 当前聊天
  affects: [imagery-workbench]
  source_entry_id: "local:imagery-workbench:2"
  imported_at: 2026-10-13T08:58:37.983Z

- time: 2026-08-22T23:10:55+08:00
  kind: decision
  author: "user:robin"
  summary: 槽的默认检索词用 catalogs.place 真实地名；不在读者页显示
  source: 当前聊天
  affects: [imagery-workbench]
  source_entry_id: "local:imagery-workbench:3"
  imported_at: 2026-10-13T08:58:37.983Z

- time: 2026-08-22T23:15:23+08:00
  kind: note
  author: "user:robin"
  summary: place 跟正文语境：写哪一处就搜哪一处，不跟诗意标题、不跟邻卷抢点（如环湖诸山不含飞来峰，钱塘江潮用海宁盐官，吴越定都不搜钱王陵）。
  source: 当前聊天
  affects: [imagery-workbench]
  source_entry_id: "local:imagery-workbench:4"
  imported_at: 2026-10-13T08:58:37.983Z

- time: 2026-08-22T23:20:51+08:00
  kind: decision
  author: "user:robin"
  summary: 一条槽若正文点了多处，place 只留一个默认地名，其余放 places，工作台一次搜一个。
  source: 当前聊天
  affects: [imagery-workbench]
  source_entry_id: "local:imagery-workbench:5"
  imported_at: 2026-10-13T08:58:37.983Z

- time: 2026-08-22T23:22:42+08:00
  kind: decision
  author: "user:robin"
  summary: Hero 只搜一个代表点：卷封面=该卷核（杭州西湖、临安西天目、桐庐钓台…）；章封面=该章第一条的 place。正文里的多地名仍用 chips，一次一个。
  source: 当前聊天
  affects: [imagery-workbench]
  source_entry_id: "local:imagery-workbench:6"
  imported_at: 2026-10-13T08:58:37.983Z

- time: 2026-08-22T23:28:08+08:00
  kind: decision
  author: "user:robin"
  summary: 钉死配图地名规则：一次一个能拍到的真地方；封面只留代表点；读者页不显示
  source: 当前聊天
  affects: [imagery-workbench]
  source_entry_id: "local:imagery-workbench:7"
  imported_at: 2026-10-13T08:58:37.983Z

- time: 2026-08-22T23:46:19+08:00
  kind: decision
  author: "user:robin"
  summary: 山川章封面改用卷核；中插检索跟图；产品名落到可拍的产地/馆庄
  source: 当前聊天
  affects: [imagery-workbench]
  source_entry_id: "local:imagery-workbench:8"
  imported_at: 2026-10-13T08:58:37.983Z

- time: 2026-08-23T09:11:24+08:00
  kind: decision
  author: "user:robin"
  summary: 抓底先筛：挡攻略/百科/视频/水印图库，只留下像这个地名的实景
  source: 当前聊天
  affects: [imagery-workbench]
  source_entry_id: "local:imagery-workbench:9"
  imported_at: 2026-10-13T08:58:37.983Z

- time: 2026-08-23T09:34:22+08:00
  kind: decision
  author: "user:robin"
  summary: 一地一图：只给正文地方生成；卷封面和章卡复用；章页不再做照片封面
  source: 当前聊天
  affects: [imagery-workbench]
  source_entry_id: "local:imagery-workbench:10"
  imported_at: 2026-10-13T08:58:37.983Z

- time: 2026-08-23T12:40:54+08:00
  kind: decision
  author: "user:robin"
  summary: 同一地名共用一张图；封面=该章第一条；队列按地名最多 5 张底
  source: 当前聊天
  affects: [imagery-workbench]
  source_entry_id: "local:imagery-workbench:11"
  imported_at: 2026-10-13T08:58:37.983Z

- time: 2026-08-23T12:46:51+08:00
  kind: decision
  author: "user:robin"
  summary: 列表卡不挂槽、不可选；工作台只点正文图、总目封面、卷/省全幅核图和中插。
  source: 当前聊天
  affects: [imagery-workbench]
  source_entry_id: "local:imagery-workbench:12"
  imported_at: 2026-10-13T08:58:37.983Z

- time: 2026-08-23T13:00:28+08:00
  kind: decision
  author: "user:robin"
  summary: 章页无照片封面，导航从一开始用深色字，不按全幅照片起手。
  source: 当前聊天
  affects: [imagery-workbench]
  source_entry_id: "local:imagery-workbench:13"
  imported_at: 2026-10-13T08:58:37.983Z

- time: 2026-08-23T14:15:17+08:00
  kind: decision
  author: "user:robin"
  summary: 一条槽若有多处地名，工作台用 tab 分地看底，不把宝石山/北高峰混在一格；抓取、清空、队列都按当前地名。
  source: 当前聊天
  affects: [imagery-workbench]
  source_entry_id: "local:imagery-workbench:14"
  imported_at: 2026-10-13T08:58:37.983Z

- time: 2026-08-23T14:25:40+08:00
  kind: decision
  author: "user:robin"
  summary: 抓取不得刷新工作台；AI 只抓+筛，不勾底、不进队列，确定由人来点。
  source: 当前聊天
  affects: [imagery-workbench]
  source_entry_id: "local:imagery-workbench:15"
  imported_at: 2026-10-13T08:58:37.983Z

- time: 2026-08-23T15:31:16+08:00
  kind: decision
  author: "user:robin"
  summary: 龙井村与狮峰茶山分图；史·人间用当代湖滨稿，不再复用山川西湖。
  source: 当前聊天
  affects: [imagery-workbench]
  source_entry_id: "local:imagery-workbench:16"
  imported_at: 2026-10-13T08:58:37.983Z

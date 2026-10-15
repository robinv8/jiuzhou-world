---
id: imagery-ai-first
title: "站点图像策略：老图优先，AI 仿古兜底"
category: decision
status: active
tags: [imagery, ai-generation, photo-pipeline]
created: "2026-10-13T08:58:36.880Z"
updated: "2026-10-15T01:46:57.758Z"
---

<!-- compiled_truth -->
# 站点图像策略：老图优先，AI 仿古兜底

2026-10-14 Robin 定，推翻早先「AI 重画实景为主」。

## 做法

1. **先找老图**：公版古画、方志与山志版画、古地图。出处记入 `design/images/SOURCES.md`，图注写朝代、作者或刊本、图名、藏处。见 [[public-domain-maps]]。
   - 清末民国老照片只用在「近代」一类章节（如杭州卷雷峰塔明信片）；其余图位即使有照片也不用，保持一卷画风统一。
   - 老图地点与图位不完全吻合时，宁可改图位的对应地或在图注里写清关系，也不要硬套：如临安「得名」用《临安山图》（「县取此山为名」），「天目盏」用《茶具图赞·陶宝文》并注明非天目窑器物。
   - 同一章内只用一个版本的方志插图（如《临安县志》1759 或 1910）。
2. **找不到再用 AI 仿古**：生成古画或版画风格的图。底线是不冒充真古画：
   - 图注写「{地名}　AI 仿绘」。
   - 画面不加假印章、假题款、假年款。
   - 地理仍要对：对着 `catalogs.place` 的真地方，参考实景定山形水势，见 [[imagery-workbench]]。
3. **不再用**：现代风景照，和写实风格的 AI 重画图。

## 已落实

- 首页护封：王希孟《千里江山图》。
- 浙江护封：黄公望《富春山居图》（无用师卷）。
- 杭州：李嵩《西湖图》卷三处裁切（护封、首页书衣、浙江卡片）。
- 临安护封：光绪二年《西天目祖山志》卷首西天目山图。

## 推进顺序

先杭州、临安两卷章节内页，再富阳、桐庐、建德、淳安、萧山等。

## 留用的旧经验

- 旧 AI 图入库前检查边角水印。老图扫描件也要检查藏馆水印（如浙江图书馆本）。
- Commons 上标《昌化县志》的光绪 1897 本与康熙本是海南昌化，不是浙江。
- 更好的实拍仍走授权与读者供图，见 [[photo-contribute]]。

## Timeline

- time: 2026-10-13T08:58:36.883Z
  kind: creation
  author: "user:robin"
  summary: 从本地 brain 迁移（jiuzhou-world/brain）
  affects: [imagery-ai-first]

- time: 2026-08-18T11:09:44+08:00
  kind: decision
  author: "user:robin"
  summary: "Created this page: 站点图像策略：AI 生成优先，真实照片暂缓"
  source: 当前聊天
  affects: [imagery-ai-first]
  source_entry_id: "local:imagery-ai-first:0"
  imported_at: 2026-10-13T08:58:37.302Z

- time: 2026-08-18T11:11:27+08:00
  kind: decision
  author: "user:robin"
  summary: 初始决策：AI 生成优先
  source: 当前聊天
  affects: [imagery-ai-first]
  source_entry_id: "local:imagery-ai-first:1"
  imported_at: 2026-10-13T08:58:37.302Z

- time: 2026-08-18T12:08:52+08:00
  kind: note
  author: "user:robin"
  summary: 发现旧图 hero-lake.webp 右下角带生成平台可见水印（星芒标），已重新生成替换（青山湖水上一森林主题，2048×1152）。排查确认其余 9 张旧图无水印。教训：旧 AI 图入库前应检查边角水印。
  source: 当前聊天
  affects: [imagery-ai-first]
  source_entry_id: "local:imagery-ai-first:2"
  imported_at: 2026-10-13T08:58:37.302Z

- time: 2026-08-20T15:07:50+08:00
  kind: decision
  author: "user:robin"
  summary: 原图作地理底，AI 重构图出站用图
  source: 当前聊天
  affects: [imagery-ai-first]
  source_entry_id: "local:imagery-ai-first:3"
  imported_at: 2026-10-13T08:58:37.302Z

- time: 2026-08-20T16:01:40+08:00
  kind: decision
  author: "user:robin"
  summary: 确认最终视觉标准：真实地方最好的一刻
  source: 青山湖 v3-v5 对比
  affects: [imagery-ai-first]
  source_entry_id: "local:imagery-ai-first:4"
  imported_at: 2026-10-13T08:58:37.302Z

- time: 2026-08-22T15:23:11+08:00
  kind: decision
  author: "user:robin"
  summary: 首页 hero 例外：改用公有领域古画——王希孟《千里江山图》（1113，故宫博物院藏）局部，青绿山水直接承载「华夏九州」意象；此为例外而非推翻 AI 重画策略，地方场景图仍按原策略。图源 Wikimedia Commons 全卷 39974×1600，cwebp 裁 2844×1600（x=13200 段）存为 hero-jiuzhou.webp
  source: 当前聊天
  affects: [imagery-ai-first]
  source_entry_id: "local:imagery-ai-first:5"
  imported_at: 2026-10-13T08:58:37.302Z

- time: 2026-08-22T20:21:34+08:00
  kind: decision
  author: "user:robin"
  summary: "富阳 hero 按青山湖流程入库：Wikimedia 实景作地理底（两山夹一江、沙洲分汊、渔船），AI 重画不搬原片；用户确认 sandbar-v4 → public/images/hero-fuyang.webp（16:9）与 fuyang-fuchun.webp（3:2）。"
  source: 当前聊天
  affects: [fuyang-gazetteer]
  source_entry_id: "local:imagery-ai-first:6"
  imported_at: 2026-10-13T08:58:37.302Z

- time: 2026-08-22T21:35:33+08:00
  kind: decision
  author: "user:robin"
  summary: 选底改走本地 /_studio 工作台（左预览右候选），见 [[imagery-workbench]]。
  source: 当前聊天
  affects: [imagery-workbench]
  source_entry_id: "local:imagery-ai-first:7"
  imported_at: 2026-10-13T08:58:37.302Z

- time: 2026-08-22T23:28:19+08:00
  kind: decision
  author: "user:robin"
  summary: 生成对着 catalogs.place 的一个真地方；封面用该卷/该章代表点。细则见工作台。
  source: 当前聊天
  affects: [imagery-ai-first]
  source_entry_id: "local:imagery-ai-first:8"
  imported_at: 2026-10-13T08:58:37.302Z

- time: 2026-10-13T09:57:43.591Z
  kind: decision
  author: "user:robin"
  summary: AI 重绘的地方风景图在页面上逐张标注：图注写「{地名}　AI 重绘　依实景参考」（如「西湖　AI 重绘　依实景参考」「西天目山　AI 重绘　依实景参考」），小字、与古画古图的出处图注同一层级。护封、书衣、列表缩图都标。公版古画古图写画名与藏处，不写 AI。设计稿已落实，站点实现由 grok 做。
  source: Robin 2026-10-13
  affects: [imagery-ai-first, design-jacket-titlepage-body, public-domain-maps]

- time: 2026-10-14T02:24:01.408Z
  kind: reversal
  author: "user:robin"
  summary: 设计稿四页（首页、浙江、杭州卷、临安卷）不再用 AI 重绘图或现代照片，护封、书衣、卡片全部换成老图：杭州用南宋李嵩《西湖图》卷（上海博物馆藏）三处裁切；临安护封用光绪二年（1876）禅源寺刊《西天目祖山志》卷首西天目山图（早稻田大学图书馆藏）。上一条「AI 图逐张标注」在这四页不再适用。章节内页（景、物、史等）是否也全部改老图，尚未决定。
  source: Robin 2026-10-14：「现在的设计稿中，没必要放现代版的图，可以找找老旧的信息」
  affects: [imagery-ai-first, design-jacket-titlepage-body, public-domain-maps]

- time: 2026-10-14T02:36:34.128Z
  kind: decision
  author: "user:robin"
  summary: 全站配图转向老图：章节内页也优先用公版古画、方志山志版画、古地图、老照片；确实找不到老图的，用 AI 生成仕古风格的图。AI 仕古图底线：不冒充真古画——图注写「{地名}　AI 仕绘」，画面不加假印章、假题款、假年款。推进顺序：先杭州、临安两卷内页，再其他卷。
  source: Robin 2026-10-14：「如果找不到老图，可以让 AI 生成老图」
  affects: [imagery-ai-first, imagery-workbench, public-domain-maps]

- time: 2026-10-14T02:37:22.018Z
  kind: note
  author: "user:robin"
  summary: 更正：上一条里的「仕古」「仕绘」是笔误，应为「仿古」「仿绘」；图注写「{地名}　AI 仿绘」。页面总结已重写为「老图优先，AI 仿古兜底」。
  source: Cursor 自查
  affects: [imagery-ai-first]

- time: 2026-10-14T09:46:07.849Z
  kind: decision
  author: "user:robin"
  summary: 章节内页老图三条拍板：① 清末民国照片只用在杭州卷「近代」一节（雷峰塔明信片），其余图位只用古画、版画，缺的用 AI 仿绘；② 临安卷「得名」改用乾隆《临安县志·临安山图》，图注写「县取此山为名」，不再配功臣山；③ 「天目盏」用《茶具图赞·陶宝文》，图注写明是宋人茶盏图、非天目窑器物。另：同一章内只用一个版本的《临安县志》（1759 或 1910）；Commons 上 1897 光绪与康熙《昌化县志》是海南昌化，不可用。
  source: Robin 2026-10-14 问卷回答；候选表 /tmp/oldimg/cand/hangzhou.md、linan.md
  affects: [imagery-ai-first, public-domain-maps]

- time: 2026-10-15T01:46:57.754Z
  kind: decision
  author: "user:robin"
  summary: "杭州卷、临安卷四章内页 35 张图版定稿（杭州 12 老图 + 5 AI 仿绘；临安 7 老图 + 11 AI 仿绘）。临安山川、史两章统一用宣统《临安县志》，景用乾隆本；钱王陵（precept）改为 AI 仿绘以免版本混用。竖幅方志半叶与册页衬纸色底做成 3:2，不裁画面。文件放 images/old/，避免覆盖富阳、桐庐、建德共用的旧图。每张图下一行图注，AI 图注写「{地名}　AI 仿绘」，其他语言必须译出。出处见 design/images/SOURCES.md，设计页 05。"
  source: Robin 2026-10-15「做吧」
  affects: [imagery-ai-first, design-jacket-titlepage-body]

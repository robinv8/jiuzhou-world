---
id: imagery-ai-first
title: "站点图像策略：AI 生成优先，真实照片暂缓"
category: decision
status: active
tags: [imagery, ai-generation, photo-pipeline]
created: "2026-08-18T11:09:44"
updated: "2026-08-22T23:28:19"
---

<!-- compiled_truth -->
# 站点图像策略：原图作底，AI 重画入库

站点图像以 AI 重画为主，不直接把网上风景照放进页面。抓哪一处、封面用哪一处，见 [[imagery-workbench]] 地名规则：一次一个能拍到的真地方；hero 只要代表点。

## 做法

- 真实照片只作**地理与物件的底**：认地方、认形制；多张参考共同校准，不复制某一张。
- 构图、光线、比例按网站重来。hero 2048×1152（16:9），spot/cover 1536×1024（3:2），输出 WebP。
- 网上图常有版权、游客、水印、正午快照与比例问题；参考后生成新图。

## 最终视觉标准

目标是 **「真实地方被拍到最好的一刻」**：

- 真实地貌、真实尺度、可信生态与活动方式优先。
- 意境来自纵深、湿气、侧光、安静和留白，而不是堆叠远山、神木、金色太阳、光柱、浓雾。
- 避免两个极端：普通景区宣传照（太平、太满）与仙境概念图（太假、符号堆满）。
- 青山湖 `qingshanhu-natural-mood-v5.png` 是当前认可样板：浮萍、水杉、栈道、可划船水路准确；氛围克制。

## 长期

更好的实拍仍走授权与读者供图，见 [[photo-contribute]]。旧 AI 图入库前检查边角水印。


## Timeline

- time: 2026-08-18T11:09:44
  kind: decision
  summary: "Created this page: 站点图像策略：AI 生成优先，真实照片暂缓"
  source: "当前聊天"
  affects: [imagery-ai-first]

- time: 2026-08-18T11:11:27
  kind: decision
  summary: "初始决策：AI 生成优先"
  source: "当前聊天"
  affects: [imagery-ai-first]

- time: 2026-08-18T12:08:52
  kind: note
  summary: "发现旧图 hero-lake.webp 右下角带生成平台可见水印（星芒标），已重新生成替换（青山湖水上一森林主题，2048×1152）。排查确认其余 9 张旧图无水印。教训：旧 AI 图入库前应检查边角水印。"
  source: "当前聊天"
  affects: [imagery-ai-first]

- time: 2026-08-20T15:07:50
  kind: decision
  summary: "原图作地理底，AI 重构图出站用图"
  source: "当前聊天"
  affects: [imagery-ai-first]

- time: 2026-08-20T16:01:40
  kind: decision
  summary: "确认最终视觉标准：真实地方最好的一刻"
  source: "青山湖 v3-v5 对比"
  affects: [imagery-ai-first]

- time: 2026-08-22T15:23:11
  kind: decision
  summary: "首页 hero 例外：改用公有领域古画——王希孟《千里江山图》（1113，故宫博物院藏）局部，青绿山水直接承载「华夏九州」意象；此为例外而非推翻 AI 重画策略，地方场景图仍按原策略。图源 Wikimedia Commons 全卷 39974×1600，cwebp 裁 2844×1600（x=13200 段）存为 hero-jiuzhou.webp"
  source: "当前聊天"
  affects: [imagery-ai-first]

- time: 2026-08-22T20:21:34
  kind: decision
  summary: "富阳 hero 按青山湖流程入库：Wikimedia 实景作地理底（两山夹一江、沙洲分汊、渔船），AI 重画不搬原片；用户确认 sandbar-v4 → public/images/hero-fuyang.webp（16:9）与 fuyang-fuchun.webp（3:2）。"
  source: "当前聊天"
  affects: [fuyang-gazetteer]

- time: 2026-08-22T21:35:33
  kind: decision
  summary: "选底改走本地 /_studio 工作台（左预览右候选），见 [[imagery-workbench]]。"
  source: "当前聊天"
  affects: [imagery-workbench]

- time: 2026-08-22T23:28:19
  kind: decision
  summary: "生成对着 catalogs.place 的一个真地方；封面用该卷/该章代表点。细则见工作台。"
  source: "当前聊天"
  affects: [imagery-ai-first]

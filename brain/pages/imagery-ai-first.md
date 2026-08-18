---
id: imagery-ai-first
title: "站点图像策略：AI 生成优先，真实照片暂缓"
category: decision
status: active
tags: [imagery, ai-generation, photo-pipeline]
created: "2026-08-18T11:09:44"
updated: "2026-08-18T12:08:52"
---

<!-- compiled_truth -->
# 站点图像策略：AI 生成优先，真实照片暂缓

站点图像以 **AI 生成的戏剧化风格图** 为主；`_photo_candidates/` 里已 shortlisted 的 23 张 CC 真实照片**暂缓接入**。

## 背景与理由

- 站点既有 hero/封面图是风格化的戏剧画面（金光、云雾、层峦），设定了「大气磅礴」的视觉基调。
- 从 Wikimedia Commons / Openverse 搜到的 CC 真实照片是纪实快照风格（正午霾光、构图随意、游客入镜），与既有视觉语言冲突；直接替换会是质感降级。
- 用户看过 shortlist 后确认「缺少大气磅礴的感觉」，决定先用 AI 生成。

## 当前约定

- 新图以既有 hero 图为风格参考生成，保持全站视觉统一。
- 尺寸约定：hero 2048×1152（16:9），spot/cover 1536×1024（3:2），输出 webp 到 `public/images/`。
- `_photo_candidates/` 保留不删，作为以后真实照片的候选池。

## 长期路径

真实照片并未放弃：未来通过摄影师主动授权（图虫/小红书/500px）和读者邮件供图（见 [[photo-contribute]]）逐步引入更好的真实影像。


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

---
id: cloud-brain-source-of-truth
title: "项目记忆以 MindMux Cloud Brain 为准"
category: decision
status: active
tags: [brain, mindmux, process]
created: "2026-10-13T09:02:43.211Z"
updated: "2026-10-15T02:48:04.538Z"
---

<!-- compiled_truth -->
# 项目记忆以 MindMux Cloud Brain 为准

2026-10-13 起，九州志的项目记忆以 robin's Workspace 下「九州志」项目的 Cloud Brain 为准。日常读写只走 MindMux MCP，不在仓库文件上改。

仓库里的 `brain/` 是云端快照。提交进仓库前从 Cloud Brain 整份导出，使它与云端保持一致。

## 绑定

- 仓库 `.mindmux/preferences.json` 的 `cloudBrain.brainId` 指向本 brain。绑定只在本地，不提交。
- 读写走 MindMux MCP（`https://mcp.mindmux.ai/mcp`），先 `resolve_brain` 再操作。

## 迁移

2026-10-13 从本地 brain 迁入：28 个页面、168 条时间线（保留原发生时间，sourceEntryId 形如 `local:<pageId>:<n>`）、6 个根页。页面 frontmatter 的 created 是迁移时间，真实历史看时间线。

## 已知问题

MindMux OAuth 同意后用 307 跳回调，浏览器以 POST 访问，`mcp-remote` 报「Cannot POST /oauth/callback」。临时办法：在报错页地址栏回车改用 GET。根治是服务端改 303。

## Timeline

- time: 2026-10-13T09:02:43.214Z
  kind: creation
  author: "user:robin"
  summary: Robin 确认项目记忆以云端为准，本地 brain/ 转为只读存档。
  affects: [cloud-brain-source-of-truth]

- time: 2026-10-15T02:48:04.536Z
  kind: decision
  author: "user:robin"
  summary: 仓库 brain/ 改为云端快照：提交前从 Cloud Brain 整份导出，与云端保持一致。日常仍只写云端，不在仓库文件上改。
  source: Robin 2026-10-15
  affects: [cloud-brain-source-of-truth]

---
id: agent-roles-design-vs-build
title: "分工：Cursor 只做设计，本机 grok CLI 写代码"
category: decision
status: active
tags: [process, agents, design]
created: "2026-10-13T09:24:29.490Z"
updated: "2026-10-13T10:10:26.534Z"
---

<!-- compiled_truth -->
# 分工：Cursor 只做设计，本机 grok CLI 写代码

2026-10-13 Robin 定。

- **Cursor agent**：只负责设计——`design/jiuzhou-design.pen`（pen.dev）、设计决策、配图与出处（`design/images/SOURCES.md`）、给实现方的设计交接说明。不改站点代码（`src/`、`public/` 等），不提交、不部署。
- **Robin 本机 grok CLI**：按设计稿与 brain 写代码、整理仓库、提交与部署。

实现类任务（如设计落地、仓库清理、MindMux 服务端 303 修复）由 grok 做；Cursor 只产出可交接的设计说明。关联 [[design-jacket-titlepage-body]]、[[public-domain-maps]]。

## Timeline

- time: 2026-10-13T09:24:29.493Z
  kind: creation
  author: "user:robin"
  summary: Robin：「你只负责设计，干活让我本机 grok cli 干」
  affects: [agent-roles-design-vs-build]

- time: 2026-10-13T10:10:26.532Z
  kind: note
  author: "user:robin"
  summary: pen.dev MCP 没有保存接口，改动只在 Pen 内存里。Cursor 已获 macOS 辅助功能授权，设计改完由 Cursor 用 osascript 激活 Pen 并发送 Cmd+S 保存，再核对 design/jiuzhou-design.pen 的修改时间确认落盘。保存前确认 Pen 当前画布是该文件。
  source: Robin 2026-10-13
  affects: [agent-roles-design-vs-build]

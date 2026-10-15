---
id: open-source-license
title: "开源许可：代码 MIT，正文与图版不放开"
category: decision
status: active
tags: [license, open-source]
created: "2026-10-15T02:57:08.294Z"
updated: "2026-10-15T02:57:08.298Z"
---

<!-- compiled_truth -->
# 开源许可：代码 MIT，正文与图版不放开

2026-10-15 Robin 定。GitHub 仓库 robinv8/jiuzhou-world 已是 public。

## 范围

- **MIT**：程序代码。`src/` 里的程序（不含方志正文）、`scripts/`、配置文件、`.github/workflows`。见仓库根目录 `LICENSE`。
- **不在 MIT 里**：方志正文（`src/i18n/locales/`、`src/entries/`）、`design/` 设计稿与 AI 仿绘、`public/images/` 与 `design/images/` 的图。版权仍归作者或原权利人。
- **古籍图**：按 `design/images/SOURCES.md` 的出处使用，不因本仓库再授权。
- **读者供图**：版权仍归拍摄者，只授权本站非商业展示。见 [[photo-contribute]]。

`package.json` 的 `private: true` 只防止误发到 npm，不表示仓库私有。

## Timeline

- time: 2026-10-15T02:57:08.298Z
  kind: creation
  author: "user:robin"
  summary: Robin 采纳建议：代码 MIT；方志正文、设计稿和 AI 仿绘版权留下；古籍图按出处表使用。
  affects: [open-source-license]

---
id: tailwind-v4-vite
title: "Tailwind CSS 3 → 4：@tailwindcss/vite + CSS-first 配置"
category: decision
status: active
tags: [tailwind, stack, astro]
created: "2026-08-16T13:53:56"
updated: "2026-08-16T13:54:06"
---

<!-- compiled_truth -->
2026-08-16 完成 Tailwind CSS 3.4 → 4.3 迁移。接入方式从 `@astrojs/tailwind` 集成（仅支持 v3）改为官方推荐的 `@tailwindcss/vite` 插件；配置从 `tailwind.config.js` 迁移为 `src/index.css` 内的 CSS-first `@theme` / `@utility`。同时移除 PostCSS 与 autoprefixer（v4 内置 LightningCSS 处理前缀），`tailwindcss-animate` 换成其 v4 继任 `tw-animate-css`。

迁移用官方 `@tailwindcss/upgrade` 工具跑 codemod：类名重命名均为等价形式（`bg-gradient-to-t`→`bg-linear-to-t`、`aspect-[3/2]`→`aspect-3/2`、`duration-[1400ms]`→`duration-1400`、`rotate-[-3deg]`→`-rotate-3`）。v4 的 `@utility` 按需生成顺带清掉了无人引用的死样式（`sticky-visual` 等）。验证：36 页构建通过、i18n:check 通过、构建产物 CSS 中全部在用样式（纸墨变量、字体栈、keyframes、自定义 utility）逐项核对存在。

注意：`src/components/ui/` 整个 shadcn 套件当前没有任何页面引用，是唯一消费 `tw-animate-css` 动画类的地方。关联：[[astro-static-ssg]]、[[i18n-locale-routing]]。


## Timeline

- time: 2026-08-16T13:53:56
  kind: decision
  summary: "Created this page: Tailwind CSS 3 → 4：@tailwindcss/vite + CSS-first 配置"
  source: code
  affects: [tailwind-v4-vite]

- time: 2026-08-16T13:54:06
  kind: decision
  summary: Rewrote compiled_truth to the new best understanding
  source: brain update-truth
  affects: [tailwind-v4-vite]

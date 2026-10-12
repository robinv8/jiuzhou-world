---
id: reader-route-province-city
title: "读者路线：省 → 市 → 三类页面"
category: decision
status: active
tags: [structure, navigation]
created: "2026-10-12T15:43:29"
updated: "2026-10-12T15:46:05"
---

<!-- compiled_truth -->
# 读者路线：省 → 市 → 三类页面

2026-10-12 Robin 钉死读者路线。写作骨架仍是四章（山川 / 景 / 物 / 史），见 [[chapter-skeleton]]。**只改呈现，不改 URL。**

## 首页

只列已开的省。现在只有浙江，链到 `/zhejiang/`。不列未写的省，不摆「待写 / 未写」空位。

## 省页 `/zhejiang/`

列已开的市。杭州为开。临安是杭州的区县，挂在杭州下面，不是与杭州并列的市。页上只列已开区县。

## 市页 `/hangzhou/`

已刊专条按三类陈列：

| 显示类 | 对应章 key | 现有专条 |
|---|---|---|
| 山川美景 | `mountains` | 西湖 |
| 名胜古迹 | `scenic` | 苏白堤、灵隐、运河 |
| 历史文化 | `history` + `culture` | 良渚、龙井茶 |

茶等物产归「历史文化」。不新建 `/hangzhou/heritage/`。临安页面不混进杭州三类，单独在市页「区县」栏，链 `/hangzhou/linan/`。

## URL 不变

`/`、`/zhejiang/`、`/hangzhou/`、四章落地页、专条、`/hangzhou/linan/...` 全部保留。市不挂在省路径下（仍是 `/hangzhou/`）。

关联 [[anthology-one-city-one-volume]]、[[anthology-spine]]、[[volume-hangzhou]]、[[hangzhou-subvolumes-roster]]。


## Timeline

- time: 2026-10-12T15:43:29
  kind: decision
  summary: "Created this page: 读者路线：省 → 市 → 三类页面"
  source: Robin 2026-10-12
  affects: [reader-route-province-city]

- time: 2026-10-12T15:46:05
  kind: decision
  summary: "2026-10-12 Robin：首页只列浙江；临安是杭州区县；市页三类只改呈现不改 URL"
  source: Robin 2026-10-12
  affects: [reader-route-province-city]

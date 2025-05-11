---
title: 节点
weight: 2
---

本页面中的字段结构与 Xray Json 配置结构基本一致。可参考官方文档学习。

[出站代理](https://xtls.github.io/config/outbound.html)

## XHTTP

`extra` 默认展示，当您未修改其中的默认值时，该字段将不会出现在 Xray 的最终配置文件中。

## Fragment

当开启 Fragment 时，App 会生成一个 `freedom` 出站，其 `tag` 为 **出站 tag + Fragment**。
如当前出站 `tag` 为 `proxy`，则 Fragment 出站 `tag` 为 `proxyFragment`。

## interface

该配置项仅适用于 Linux 和 Windows 系统。

您可为出站流量指定一张网卡。当不指定时，将使用您在 [Tun 设置]({{< relref path="../../setting/tun/index.md" lang="zh">}}) 中配置的网卡。

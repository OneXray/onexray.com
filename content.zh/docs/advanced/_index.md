---
title: "高级"
description: "管理各平台 VPN、路由数据、自动更新、测速、日志及实际生成的 Xray 配置。"
weight: 50
lastmod: 2026-09-12
---

高级是第三个根级入口，包含 **VPN 隧道**和 **Xray** 两个 Tab。

## VPN 隧道

[公共隧道设置]({{< relref "/docs/advanced/vpn-tunnel" >}})展示只读 TUN 地址、可编辑 DNS 设置、IPv6 与平台入口：

- [Apple 系统 VPN]({{< relref "/docs/advanced/apple" >}})：Wi-Fi 规则、始终开启、流量接管和排除网段。
- [Android 系统 VPN]({{< relref "/docs/advanced/android" >}})：独立的应用包含与排除列表。
- [Windows]({{< relref "/docs/advanced/windows" >}})：出口网卡与 MSIX 系统 VPN 策略。
- Windows/Linux：明确选择 Xray 出口网卡。

只展示当前平台和分发模式适用的设置。

## Xray

- [路由数据]({{< relref "/docs/advanced/geodata" >}})：默认与自定义 GeoData。
- [数据更新]({{< relref "/docs/advanced/data-updates" >}})：订阅和 GeoData 周期。
- [测速]({{< relref "/docs/advanced/latency" >}})：超时与请求 URL。
- [日志与生成的配置]({{< relref "/docs/advanced/logs" >}})：访问／错误日志和实际 Xray 输入。

影响当前连接的修改使用“保存并重新连接”。恢复默认仅改变草稿，保存后才生效。下载和测速有独立进度提示，不禁用整个界面。

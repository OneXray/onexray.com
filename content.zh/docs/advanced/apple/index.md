---
title: "Apple 系统 VPN"
description: "配置始终开启、Wi-Fi 按需连接与断开、蜂窝或 Ethernet 动作，以及接管全部流量的排除选项。"
weight: 20
lastmod: 2026-09-12
---

入口：高级 → VPN 隧道 → Apple 系统 VPN。选项依据系统版本和 App 版本的能力显示。

## 始终开启与按需连接

“始终开启”默认关闭。开启后请求系统在可用网络上建立连接，基于 Apple 按需机制实现；不等于受监督设备的 Always On VPN，也不承诺所有流量永远不会离开 VPN。

关闭“始终开启”后显示“按需连接”，后者也默认关闭。

Wi-Fi 规则包含两个独立列表：

- 连接这些 Wi-Fi 时自动连接 VPN。
- 连接这些 Wi-Fi 时断开 VPN。

使用完整、准确的 SSID 名称，同一名称不能同时出现在两边。未列出的 Wi-Fi 保持当前连接行为，不隐式归入任一列表。

iOS 另外设置蜂窝网络动作，macOS 另外设置 Ethernet 动作，分别选择自动连接或断开。保存后应用策略。

## 接管全部流量

默认关闭；开启后显示四个排除选项，在支持的系统上默认均开启：

- 局域网
- 蜂窝服务
- Apple 推送通知
- 与已连接 Apple 设备的通信

这些是系统层例外，与 Xray 路由规则不同。不当组合可能导致网络不可用，或影响本地服务。不了解影响时，请保留默认值。

## 绕过 VPN 的网段

关闭“接管全部流量”后，可在独立网段页面添加 IPv4/IPv6 CIDR，例如 `192.168.50.0/24`。默认列表为空，不自动排除全部私网。填写的网络由系统绕过 VPN，不再进入 Xray 路由。

重新开启“接管全部流量”会保留列表但停用它；关闭 IPv6 时也保留 IPv6 条目，但不应用。修改有效列表后保存，当前 VPN 需要重新连接。

排除网段不会自动修改 DNS，也不提供自动企业 Split DNS。需要解析内网域名时，还应配置[路由本地 DNS]({{< relref "/docs/connect/smart-routing" >}})。

## 隧道 DNS over TLS

Apple 隧道设置提供 DNS over TLS。DNS 地址和服务器域名在[VPN 隧道]({{< relref "/docs/advanced/vpn-tunnel" >}})中修改，默认域名为 `dns.google`；地址、域名和服务的 TLS 证书必须匹配。这是平台 DNS 选项，不替代 Xray 的本地／代理 DNS。

## macOS 版本与退出

Mac App Store 使用 Packet Tunnel，OneXraySE 使用 System Extension，后者不提供 Xray 文件日志区域。

关闭窗口只隐藏 App。“退出”不停止系统 VPN；“退出并停止 VPN”先断开再退出。需要停止隧道及其按需连接行为时，请使用后者。

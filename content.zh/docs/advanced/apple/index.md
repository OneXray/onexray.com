---
title: "Apple 系统 VPN"
description: "配置始终开启、Wi-Fi 按需连接与断开、蜂窝或 Ethernet 动作，以及接管全部流量的排除选项。"
weight: 20
lastmod: 2026-09-09
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

## 隧道 DNS over TLS

Apple 隧道设置还提供 DNS over TLS，使用托管的 dns.google 服务器名称。这是平台 DNS 选项，与 Xray 的直连／代理规则选择不同。

## macOS 版本与退出

Mac App Store 使用 Packet Tunnel，OneXraySE 使用 System Extension，后者不提供 Xray 文件日志区域。

关闭窗口只隐藏 App。“退出”不停止系统 VPN；“退出并停止 VPN”先断开再退出。需要停止隧道及其按需连接行为时，请使用后者。

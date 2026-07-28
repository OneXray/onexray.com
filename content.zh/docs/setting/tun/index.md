---
title: TUN 设置
weight: 1
---

TUN 设置作用于所有 Home 配置，用于控制平台隧道。

# DNS

TUN DNS 包含一个 IPv4 和一个 IPv6 地址，不包含端口。

- 平台隧道使用这些地址接收系统 DNS 流量。
- 简易配置将 IPv4 值只读显示为默认 `tcp://` DNS Server。
- 新建自定义 Xray 配置和 Full Config 时，第一个 DNS Server 默认使用该 IPv4 值。
- 运行时，开启 IPv6 会将 DNS `queryStrategy` 统一写为 `UseIP`，关闭时写为 `UseIPv4`。

# IPv6

IPv6 开关同时控制 TUN IPv6 路由、DNS 查询策略和是否写入 IPv6 FakeDNS 地址池。它取代了旧的逐项 `UseIP / UseIPv4 / UseIPv6` 选择。

# 路由（Apple）

iOS 和 macOS 提供默认开启的“排除局域网”。它让局域网和多播流量（如 AirPlay 与 DLNA/SSDP 发现）绕过 VPN。

这是 Apple 平台隧道的路由策略，与 Xray 配置中的 Routing Rule 相互独立。

# DNS over TLS

iOS 和 macOS 支持 DNS over TLS。启用后平台使用配置的 Server Name，Xray 配置中的 `dnsDoT` 规则可处理 853 端口流量。

# Metrics

Metrics 会写入运行时 policy/stats/metrics，并在 Home 显示流量计数。关闭后这些字段会从最终配置移除。

# 出站网卡

Windows 和 Linux 可选择 `auto` 或指定网卡。OneXray 会将结果写入 TUN 路由字段，并避免 Core 自身流量重新进入 TUN。

# On Demand

iOS 和 macOS 支持按网络接口类型与 Wi-Fi SSID 排序的 On Demand 规则，也可配置睡眠时断开。

# Per-App VPN

Android 支持允许列表和禁止列表。可从 Per-App VPN 分区进入“已选应用”和“已安装应用”。列表为空时按当前模式使用正常的全应用行为。

---
title: TUN 设置
weight: 1
---

TUN 设置控制所有配置共用的平台隧道和网卡行为。

# TUN

TUN 设备是一张虚拟网卡。VPN 启动后，平台会创建或激活隧道，并把流量导入 Xray-core。

## DNS

TUN DNS 包含一个 IPv4 地址和一个 IPv6 地址。它们是纯 IP 地址，不包含端口。

启动时，这些地址会应用到隧道上。系统 DNS 查询进入 Xray-core 后，由路由和 DNS outbound 处理。

这些 DNS 地址也会影响平台在 Xray Setting DNS 可用之前如何解析代理服务器域名。

## DNS over TLS

DNS over TLS 适用于 iOS 和 macOS。开启后，DoT 流量可由 `dnsDoT` 路由规则处理。

在部分 iOS packet tunnel 场景中，使用 DoT 可以降低内存压力。

## 优先级

优先级仅适用于 Linux。它控制 OneXray TUN 设备默认路由的 metric。

等效行为示例：

```shell
sudo ip route add default dev OneXrayTun metric 20
sudo ip -6 route add default dev OneXrayTun metric 20
```

## 网卡

网卡选择适用于 Linux 和 Windows。

开启网卡修正后，OneXray 可以把所选网卡写入 outbound socket option 和 TUN inbound 的 `autoOutboundsInterface`，用于确保代理流量走预期物理网卡。

## Metrics

Metrics 控制 OneXray 是否在运行时配置中写入 Xray 流量统计，并读取 Home 连接状态区展示所需的流量计数。

Metrics 关闭时，OneXray 不会把 `policy`、`stats` 或 `metrics` 写入生成后的运行时 Xray JSON。

# 按需开启

按需规则适用于 iOS 和 macOS。它允许系统根据网络条件决定是否激活 VPN。

# 按应用开启

按应用 VPN 适用于 Android。未选择 App 时，所有 App 使用 VPN；选择 App 后，仅选中的 App 使用 VPN。

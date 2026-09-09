---
title: "VPN 隧道"
description: "了解只读 TUN 地址、Google DNS、IPv6 开关和 Windows/Linux 的显式出口网卡选择。"
weight: 10
lastmod: 2026-09-09
---

入口：高级 → VPN 隧道。

## 托管地址与 DNS

TUN 地址和隧道 DNS 只展示，不允许修改。DNS 同时展示 IPv4、IPv6 和域名：

| 字段 | 值 |
| --- | --- |
| IPv4 DNS | 8.8.8.8 |
| IPv6 DNS | 2001:4860:4860::8888 |
| 域名 | dns.google |

这里是托管隧道参数，不是通用 DNS 编辑器。Xray DNS 的路径由[智能路由]({{< relref "/docs/connect/smart-routing" >}})或“所有流量经过 VPN”等模式决定。

## IPv6

“使用 IPv6”独立位于 DNS 下方。关闭后，Apple/Android 和原生 TUN 配置省略托管 IPv6 隧道参数，DNS 查询从 UseIP 改为 UseIPv4。Windows MSIX/VCore 保留其平台处理方式。

不会额外添加 IPv6 阻断规则，也不会删除 Raw JSON 中任意 IPv6 地址。该开关不是完整 IPv6 断网保护。

## Xray 出口网卡：Windows 与 Linux

进入独立网卡列表，明确选择实际网络接口。当前上网网卡会标记，但不会自动选中。回环网卡和 OneXray 自己的 TUN 不在候选中。

选择按名称保存，每次连接前检查存在性。未设置或已不存在时，需重新选择；不自动回退，也不持续监测网卡。Raw JSON 不能覆盖它。

连接中修改使用“保存并重新连接”。Windows 只给 Xray 绑定网卡，不给 VCore 增加绑定要求。

## 平台详情

[Apple]({{< relref "/docs/advanced/apple" >}}) · [Android]({{< relref "/docs/advanced/android" >}}) · [Windows]({{< relref "/docs/advanced/windows" >}})

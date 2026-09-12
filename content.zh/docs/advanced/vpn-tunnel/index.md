---
title: "VPN 隧道"
description: "配置隧道 IPv4/IPv6 DNS 和 Apple DoT 域名，区分本地 DNS，并选择 Windows/Linux 出口网卡。"
weight: 10
lastmod: 2026-09-12
---

入口：高级 → VPN 隧道。

## 托管地址与 DNS

TUN 地址仍只读。隧道 DNS 的三个字段可以编辑，默认值如下：

| 字段 | 默认值 |
| --- | --- |
| IPv4 DNS | 8.8.8.8 |
| IPv6 DNS | 2001:4860:4860::8888 |
| DNS 服务器域名 | dns.google |

IPv4/IPv6 DNS 必须填写对应地址族的 IP 地址。服务器域名仅用于 Apple DNS over TLS，不是搜索域；开启 DoT 时，地址和域名必须属于同一服务，并与 TLS 证书匹配。

这些是平台隧道参数，不会替代[智能路由]({{< relref "/docs/connect/smart-routing" >}})或[自定义路由]({{< relref "/docs/connect/custom-routing" >}})的本地 DNS，也不修改 Raw JSON 自己的 DNS 地址。内网域名不能解析时，通常需要修改路由中的本地 DNS，而非只改本页。

保存后生效；有效配置影响当前 VPN 时需要重新连接。未启用的 IPv6 或 Apple DoT 字段只保留，不因修改它们重连。恢复默认只修改草稿，仍需保存。

## IPv6

“使用 IPv6”独立位于 DNS 下方。关闭后，Apple/Android 和原生 TUN 配置省略托管 IPv6 隧道参数，DNS 查询从 UseIP 改为 UseIPv4。Windows MSIX/VCore 保留其平台处理方式。

不会额外添加 IPv6 阻断规则，也不会删除 Raw JSON 中任意 IPv6 地址。该开关不是完整 IPv6 断网保护。

## Xray 出口网卡：Windows 与 Linux

进入独立网卡列表，明确选择实际网络接口。当前上网网卡会标记，但不会自动选中。回环网卡和 OneXray 自己的 TUN 不在候选中。

选择按名称保存，每次连接前检查存在性。未设置或已不存在时，需重新选择；不自动回退，也不持续监测网卡。Raw JSON 不能覆盖它。

连接中修改使用“保存并重新连接”。Windows 只给 Xray 绑定网卡，不给 VCore 增加绑定要求。

## 平台详情

[Apple]({{< relref "/docs/advanced/apple" >}}) · [Android]({{< relref "/docs/advanced/android" >}}) · [Windows]({{< relref "/docs/advanced/windows" >}})

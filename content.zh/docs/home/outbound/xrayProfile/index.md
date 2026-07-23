---
title: Xray 配置
weight: 1
aliases:
  - /docs/home/outbound/xraySetting/
---

Xray 配置是 OneXray 必选的运行时基础。App 始终选中一个配置；内置简易配置是不可删除的兜底项。

# 最终配置合成

最终配置（Final Config）是启动 Xray-core 前写出的运行时 `xray.json`。

| Home 配置 | 合成方式 |
| --- | --- |
| Outbound | 节点成为运行时 `proxy`。配置最终出口后，最终出口成为 `proxy`，Home 节点成为 `chainProxy`，且 `proxy.dialerProxy` 指向 `chainProxy`。 |
| Full Config | 覆盖 Xray 配置的 `outbounds`、`routing` 和 `dns`；FakeDNS、inbounds、日志、metrics 等仍由当前 Xray 配置和 App runtime 提供。 |
| Raw Json | 提供主要 JSON 主体，但其 inbounds 会被丢弃，并替换为当前 Xray 配置的运行时 inbounds。 |

合成后再应用 Home 路由模式。全局模式删除 DNS/routing 并保留代理依赖链；直连模式只保留 `direct`。

# 自定义配置编辑器

编辑器包含六个分区：

| 分区 | 主要字段 |
| --- | --- |
| Inbounds | `tunIn` 和内部 `pingIn`。 |
| Outbounds | 最终出口和系统 `direct`、`fragment`、`block`、`dnsOut`。 |
| Routing | Domain Strategy、系统规则和可排序自定义规则。 |
| DNS | Hosts、可排序 Server、缓存/回退/过期选项、Client IP、并行查询和系统 Hosts。 |
| FakeDNS | IPv4 与 IPv6 地址池。 |
| Log | 日志级别、DNS 日志和地址脱敏。 |

手机上分区控件可横向滚动；宽屏使用侧边导航。两种布局的字段完全一致。

# DNS

新建 Xray 配置或 Full Config 时，第一个 DNS Server 默认使用 `TUN 设置 > IPv4 DNS`，之后可在编辑器中修改。

UI 不再显示全局或单个 Server 的 `queryStrategy`。运行时由 `TUN 设置 > 开启 IPv6` 统一覆盖：

| TUN IPv6 | 写入策略 |
| --- | --- |
| 开启 | `UseIP` |
| 关闭 | `UseIPv4` |

DNS Server 支持 address、port、domains、预期/非预期 IP、tag、client IP、timeout、fallback/cache/stale 和 final query 等字段。非空 DNS Server tag 可作为 Routing Rule 的 inbound tag。

# FakeDNS

FakeDNS 始终由当前 Xray 配置管理，即使启动的是 Full Config。Full Config 不保存或编辑 FakeDNS。

默认地址池：

| 地址池 | 地址 | 大小 |
| --- | --- | --- |
| IPv4 | `198.18.0.0/15` | `32768` |
| IPv6 | `fc00::/18` | `32768` |

仅在 TUN IPv6 开启时写入 IPv6 地址池。

# Routing

系统规则负责 DNS 组件流量、53 端口、DNS over TLS 和内部 ping。自定义规则可匹配 domain、IP、端口、网络、源/本地地址、inbound tag、协议、attrs，以及受支持平台的进程。

同一规则中的条件会组合匹配。例如同时包含 domain 和 IP 时，连接必须同时满足两者。

# Outbounds 与最终出口

| 保留 tag | 用途 |
| --- | --- |
| `proxy` | 运行时最终代理出口。 |
| `chainProxy` | 启用最终出口时，Home 节点使用的拨号中转 tag。 |
| `direct` | Freedom 直连出口。 |
| `fragment` | Freedom 分片出口。 |
| `block` | Blackhole 出口。 |
| `dnsOut` | DNS 出口。 |

最终出口从本地 Outbound 节点中选择。同一节点不能同时作为 Home 节点和最终出口。

# 简易配置

简易配置提供：

- 日志开关
- 最终出口选择
- 直连地区、Domain Strategy、Apple/本地直连、IP 规则、本地 DNS 和广告屏蔽
- FakeDNS 开关
- 只读的 `tcp://<TUN IPv4 DNS>` 默认 DNS

默认 DNS 通过 `proxy` 查询。可选的地区本地 DNS 只查询对应直连域名集合。

# 运行时所有权

OneXray 始终重写运行时 TUN 与 `pingIn`、ping/metrics 随机端口、GeoData 路径、Windows/Linux 路由字段和 macOS System Extension 日志行为。这些生成值不属于稳定的用户配置字段。

---
title: Home
weight: 2
---

Home 是查看连接状态和操作节点的主要页面。

连接信息会在运行时始终显示正在运行的节点；断开时显示当前选中的节点。Xray 配置、流量和位置使用独立的可点击区域，避免交互重叠。

# 路由模式

| 模式 | 最终配置行为 |
| --- | --- |
| 规则 | 使用选中节点，并保留当前 Xray 配置中的 DNS 与路由规则。 |
| 全局 | 所有流量使用选中节点；移除运行时 DNS 和 routing，只保留 `proxy` 及其必须的 `dialerProxy` 依赖链。 |
| 直连 | 所有流量使用 `direct`；不要求选择节点，移除 DNS 和 routing，并只保留 `direct` outbound。 |

连接中切换路由模式会停止并重新启动 Core，使新的最终配置立即生效。

# 配置类型

| 类型 | 用途 | 位置 |
| --- | --- | --- |
| Outbound | 单个代理出站，例如 VLESS、VMess、Trojan、Shadowsocks、SOCKS、HTTP 或 Hysteria2。 | Local 或订阅分组。 |
| Full Config | 自带 outbounds、routing 和 DNS 的结构化本地节点。 | Home 的 `Local` 分组。 |
| Raw Json | 以文本编辑的高级 Xray JSON 主体。 | Home 的 `Local` 分组。 |
| Xray 配置 | 必选的运行时基础，负责 inbounds、DNS、routing、系统 outbounds、日志、metrics 和 FakeDNS。 | Core > Xray 配置。 |
| 简易配置 | 内置的兜底 Xray 配置。 | Core > Xray 配置。 |

# 节点列表

本地 Outbound、Full Config 和 Raw Json 共用 `Local` 分组；订阅分组只包含 Outbound。搜索会过滤统一列表，卡片按类型提供编辑、分享、复制、测速和删除操作。

相关页面：

- [添加与导入]({{< relref path="add/index.md" lang="zh" >}})
- [Outbound 节点]({{< relref path="outbound/_index.md" lang="zh" >}})
- [Xray 配置]({{< relref path="outbound/xrayProfile/index.md" lang="zh" >}})
- [Raw Json]({{< relref path="rawConfig/index.md" lang="zh" >}})
- [启动与停止]({{< relref path="start/index.md" lang="zh" >}})

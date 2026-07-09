---
title: Home
weight: 2
---

Home 是连接状态和节点操作的主工作区。

它优先展示当前 VPN 状态、当前节点、启动/停止控制、Traffic 入口、Location 入口，以及统一节点列表。完整节点详情放在 Node Info 页面，而不是占据 Home 主工作区。

配置修改会在下次启动 VPN 时生效。如果 VPN 已经运行，请先编辑配置，再停止并重新启动 VPN。

# 配置类型

| 类型 | 用途 | 所属位置 |
| --- | --- | --- |
| Outbound | 单个 Xray outbound 节点，例如 VLESS、VMess、Trojan、Shadowsocks、SOCKS、HTTP 或 Hysteria2。 | Home 节点列表和订阅。 |
| Full Config | 结构化本地节点，包含自己的 outbounds、routing 和 DNS，运行时基于当前 Xray 配置生成。FakeDNS 由当前 Xray 配置管理。 | 仅 Home 的 Local 分组。 |
| Raw Json | 以文本方式导入和编辑的完整 Xray JSON 文档。 | 仅 Home 的 Local 分组。 |
| Xray 配置 | 由 OneXray 结构化页面生成的可复用 Xray 配置。 | Core > Xray 配置。 |
| Simple | 内置 Xray 配置写出器。 | Core > Xray 配置 > Simple。 |

# 推荐流程

1. 添加 Outbound 节点或订阅。
2. 将节点使用的 Xray 配置保持为 `Simple`。
3. 只有在需要不同直连区域、FakeDNS、最终出口或日志级别时才调整简易配置；DNS 查询策略由 TUN 设置中的 IPv6 开关统一控制。
4. 从 Home 页面启动 VPN。

# 节点列表

Home 不再区分 Outbound 和 JSON 标签页。本地 Outbound 节点、Full Config 节点和全部 Raw Json 配置会一起显示在 `Local` 分组下；订阅分组只包含订阅 Outbound 节点。Full Config 和 Raw Json 不会由订阅创建。

节点列表使用紧凑自适应网格。桌面端内容宽度会被限制，保证卡片可读性。

# 状态与测试

VPN 启动时，OneXray 会把 Xray config file 写入 App runtime 目录并启动平台网络隧道。启动后 App 可以测试延迟和节点 IP 信息。手动 ping、订阅 auto-ping 和启动后检查共用 Ping 设置。

# 详细页面

- [添加与导入]({{< relref path="add/index.md" lang="zh" >}})
- [Outbound 节点]({{< relref path="outbound/_index.md" lang="zh" >}})
- [Xray 配置]({{< relref path="outbound/xrayProfile/index.md" lang="zh" >}})
- [Raw Json]({{< relref path="rawConfig/index.md" lang="zh" >}})
- [启动与停止]({{< relref path="start/index.md" lang="zh" >}})

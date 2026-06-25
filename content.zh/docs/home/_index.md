---
title: Home
weight: 2
---

Home 是连接状态和节点操作的主工作区。

它优先展示当前 VPN 状态、当前节点、启动/停止控制、Traffic 入口、Location 入口，以及 Outbound / Raw Json 节点列表。完整节点详情放在 Node Info 页面，而不是占据 Home 主工作区。

配置修改会在下次启动 VPN 时生效。如果 VPN 已经运行，请先编辑配置，再停止并重新启动 VPN。

# 配置类型

| 类型 | 用途 | 所属位置 |
| --- | --- | --- |
| Outbound | 单个 Xray outbound 节点，例如 VLESS、VMess、Trojan、Shadowsocks、SOCKS、HTTP 或 Hysteria2。 | Home 节点列表和订阅。 |
| Raw Json | 以文本方式导入和编辑的完整 Xray JSON 文档。 | 仅本地 Raw Json 列表。 |
| Xray Setting | 由 OneXray 结构化页面生成的可复用 Xray 配置。 | Core > Xray Settings。 |
| Simple | 内置 Xray Setting 写出器。 | Core > Xray Settings > Simple。 |

# 推荐流程

1. 添加 Outbound 节点或订阅。
2. 将节点使用的 Xray Setting 保持为 `Simple`。
3. 只有在需要不同直连区域、FakeDNS、链式代理、DNS query strategy 或日志级别时才调整 Simple Setting。
4. 从 Home 页面启动 VPN。

# 节点列表

Outbound 节点会在需要时按订阅分组。Raw Json 固定显示在 Local 下，不会由订阅创建。

节点列表使用紧凑自适应网格。桌面端内容宽度会被限制，保证卡片可读性。

# 状态与测试

VPN 启动时，OneXray 会把 Xray config file 写入 App runtime 目录并启动平台网络隧道。启动后 App 可以测试延迟和节点 IP 信息。手动 ping、订阅 auto-ping 和启动后检查共用 Ping 设置。

# 详细页面

- [添加与导入]({{< relref path="add/index.md" lang="zh" >}})
- [Outbound 节点]({{< relref path="outbound/_index.md" lang="zh" >}})
- [Xray Setting]({{< relref path="outbound/xraySetting/index.md" lang="zh" >}})
- [Raw Json]({{< relref path="rawConfig/index.md" lang="zh" >}})
- [启动与停止]({{< relref path="start/index.md" lang="zh" >}})

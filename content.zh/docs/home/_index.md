---
title: 主页
weight: 2
---

主页是主要操作界面，包含节点列表、Xray Setting、Raw Config、订阅、启动和停止、搜索、导入以及状态反馈。

配置修改后不会立即影响正在运行的 VPN。修改配置后，需要停止 VPN 并重新启动，新的配置才会生效。

# 配置类型

| 类型 | 用途 | 适合对象 |
| --- | --- | --- |
| Outbound | 单个 Xray 出站节点，例如 VLESS、VMess、Trojan、Shadowsocks、SOCKS、HTTP、Hysteria2。 | 大多数用户和订阅节点。 |
| Xray Setting | 由 OneXray 结构化页面生成的可复用 Xray 配置。 | 需要自定义 DNS、路由、FakeDNS、链式代理、日志或额外出站的用户。 |
| Raw Config | 以文本方式导入和编辑的完整 Xray JSON。 | 熟悉 Xray-core 配置的高级用户。 |
| Simple | 内置 Xray Setting 写出器，由 Simple Setting 页面控制。 | 希望使用默认路由和 DNS 的用户。 |

# 推荐流程

1. 添加节点或订阅。
2. 将节点使用的 Xray Setting 保持为 `Simple`。
3. 仅在需要调整直连地区、FakeDNS、链式代理、DNS 查询策略或日志时修改 Simple Setting。
4. 在主页启动 VPN。

# 状态和测试

启动 VPN 时，OneXray 会把 Xray 配置写入 App 运行目录，并启动平台网络隧道。启动后，App 可以测试节点延迟和出口 IP 信息。手动测速、订阅自动测速和启动后的连接测试会共用 Ping 设置。

# 详细页面

- [添加和导入]({{< relref path="add/index.md" lang="zh" >}})
- [节点]({{< relref path="outbound/_index.md" lang="zh" >}})
- [Xray Setting]({{< relref path="outbound/xraySetting/index.md" lang="zh" >}})
- [Raw Config]({{< relref path="rawConfig/index.md" lang="zh" >}})
- [启动和停止]({{< relref path="start/index.md" lang="zh" >}})

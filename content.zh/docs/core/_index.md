---
title: Core
weight: 4
---

Core 包含直接影响 Xray-core、平台隧道、规则数据和诊断信息的设置。

| 页面 | 用途 |
| --- | --- |
| TUN | 平台隧道、DNS 地址、网卡绑定、Metrics、按需连接和分应用 VPN。 |
| Ping | 节点测试使用的 URL、超时和行为。 |
| Logs | App 日志、Xray 日志和生成后的 Xray 配置文件。 |
| Xray Settings | 结构化 Xray-core 配置，包括 Simple Setting 和高级 UI 编辑。 |
| GeoData | `geosite:` 和 `geoip:` 规则使用的内置和自定义规则集数据。 |

增强路由模板不再从 App 内部直接导入。请在 [Routing]({{< relref path="../routing/index.md" lang="zh" >}}) 页面复制当前 JSON 模板到 Xray Settings。

相关页面：

- [TUN 设置]({{< relref path="../setting/tun/index.md" lang="zh" >}})
- [Ping]({{< relref path="../setting/ping/index.md" lang="zh" >}})
- [Log]({{< relref path="../setting/log/index.md" lang="zh" >}})
- [Xray Setting]({{< relref path="../home/outbound/xraySetting/index.md" lang="zh" >}})
- [GeoData]({{< relref path="../setting/geoData/index.md" lang="zh" >}})

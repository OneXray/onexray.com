---
title: Core
weight: 4
---

Core 包含直接影响 Xray-core 的设置与诊断功能。

| 分区 | 用途 |
| --- | --- |
| 网络 | TUN 设置和 Ping 行为。 |
| 数据 | Xray 配置、GeoData 和增强路由模板。 |
| 日志 | 实时 access/error 日志和生成的最终配置。 |

Release 版本固定通过平台 TUN/VPN 运行。原有面向用户的 TUN/Proxy 切换以及本地 SOCKS/HTTP 入站已删除。

Access 和 Error 日志可直接从 Core 的日志分区打开。查看器只读取大文件的尾部并持续跟随新内容，不会一次加载完整日志。生成的 Xray 配置支持选择和复制文本。

相关页面：

- [TUN 设置]({{< relref path="../setting/tun/index.md" lang="zh" >}})
- [Ping]({{< relref path="../setting/ping/index.md" lang="zh" >}})
- [日志]({{< relref path="../setting/log/index.md" lang="zh" >}})
- [Xray 配置]({{< relref path="../home/outbound/xrayProfile/index.md" lang="zh" >}})
- [GeoData]({{< relref path="../setting/geoData/index.md" lang="zh" >}})

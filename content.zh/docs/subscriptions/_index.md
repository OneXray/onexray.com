---
title: Subscriptions
weight: 3
---

Subscriptions 用于管理远程 Outbound 节点来源。

# 支持的内容

订阅只导入 Outbound 节点。OneXray 通过内置 libXray API 读取支持的 Xray 分享链接、Clash.Meta YAML 或 Xray JSON，并把结果保存为 `CoreConfigType.outbound`。

订阅不会导入 Raw Json、Xray Setting、GeoData、DNS、routing、inbounds、policy、stats、metrics 或 logs。

# 列表行为

Subscriptions 页面展示订阅源。订阅行支持刷新、测速、以 HTTPS URL 分享、编辑、删除和清理。

点击订阅会进入该订阅下的 Outbound 节点列表。这个页面只用于查看和管理：点击节点不会把它设为 Home 当前节点。

# 恢复行为

备份会保存订阅记录和 URL，不保存订阅节点行。恢复时 OneXray 会重建订阅记录，并刷新订阅 URL 重新下载节点。

相关页面：

- [添加与导入]({{< relref path="../home/add/index.md" lang="zh" >}})
- [分享]({{< relref path="../share/index.md" lang="zh" >}})
- [备份与恢复]({{< relref path="../setting/backup/index.md" lang="zh" >}})

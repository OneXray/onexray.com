---
title: 分享
weight: 2
---

OneXray 使用通用格式分享数据，不再使用旧私有导入格式。

| 类型 | 分享格式 |
| --- | --- |
| Outbound 节点 | libXray 支持时导出标准 Xray 分享链接文本和二维码。 |
| 订阅 | 普通 HTTPS 订阅 URL。 |
| Raw Json | JSON 文本和 `.json` 文件。 |
| Xray Setting | JSON 文本和 `.json` 文件。 |
| GeoData | 不单独分享。完整迁移请使用 Backup。 |

# 导入

导入文本由当前运行的 App 按以下方式分类：

| 输入 | 行为 |
| --- | --- |
| `https://...` | 添加订阅并刷新。 |
| 标准 Xray 分享文本 | 通过 libXray 导入 Outbound 节点。 |
| 其他文本 | 如果 libXray 无法读取 Outbound 节点，则显示无有效配置。 |

二维码图片导入支持 `png`、`jpg` 和 `jpeg`。文本文件导入支持 `txt`、`json`、`yaml` 和 `yml`；这些文件仍然走同一套文本导入规则。

# Raw Json 和 Xray Setting

Raw Json 和 Xray Setting 可以从各自菜单导出为 JSON 文本或 JSON 文件。它们适合手动复制、外部编辑或备份流程。

它们不会通过通用分享/导入流程重新创建为 App 内部记录。需要创建 Raw Json 时，请使用 `Home > 添加 > 手动输入 > Raw Json`；需要创建 Xray Setting 时，请使用对应的 Core 页面。

# Backup

如果需要完整迁移本地配置、订阅和自定义 GeoData 文件，请使用 [备份与恢复]({{< relref path="../setting/backup/index.md" lang="zh" >}})。

---
title: GeoData
weight: 3
---

GeoData 提供 Xray-core 规则表达式使用的规则集文件，例如：

```text
geosite:CN
geoip:CN
```

OneXray 内置两个 GeoData 文件：

| 名称 | 类型 | 来源 |
| --- | --- | --- |
| `geosite` | `domain` | `v2fly/domain-list-community` 最新 `dlc.dat` |
| `geoip` | `ip` | `v2fly/geoip` 最新 `geoip.dat` |

# 自定义 GeoData

自定义规则集需要：

| 字段 | 含义 |
| --- | --- |
| Name | 唯一名称。它会成为文件基础名和规则前缀目标。 |
| Type | `domain` 表示 geosite 风格数据，`ip` 表示 geoip 风格数据。 |
| URL | `.dat` 文件下载 URL。 |

添加或更新自定义规则集时，OneXray 会下载 `.dat` 文件，请求 host core API 统计 category 和 rule 数量，保存 `.dat` 文件，并保存生成后的 JSON 摘要。

# 自动更新

GeoData 自动更新在 [Auto Update]({{< relref path="../subUpdate/index.md" lang="zh" >}}) 中配置。系统 GeoData 和自定义 GeoData 与订阅刷新分开检查，但由同一个更新服务执行。

# 分享与备份

GeoData 不再作为单独 App 链接分享。完整迁移请使用 [备份与恢复]({{< relref path="../backup/index.md" lang="zh" >}})，它会包含自定义 GeoData 数据库记录、`.dat` 文件和生成的 `.json` 摘要。

Routing 模板仍然可以通过 `ext:<Name>.dat:<Code>` 引用自定义 GeoData。把这些模板导入 Xray 配置之前，请先手动添加所需自定义 GeoData。

# iOS 和 iPadOS

非常大的规则集文件可能增加内存占用。如果 VPN 在 iOS 或 iPadOS 上无法启动，请使用更小的 GeoData 文件或更少的 routing rules。

---
title: GeoData
weight: 3
---

GeoData 提供 Xray-core 规则表达式使用的数据文件，例如：

```text
geosite:CN
geoip:CN
```

OneXray 内置两个 GeoData：

| 名称 | 类型 | 来源 |
| --- | --- | --- |
| `geosite` | `domain` | `v2fly/domain-list-community` 最新 `dlc.dat` |
| `geoip` | `ip` | `v2fly/geoip` 最新 `geoip.dat` |

# 自定义 GeoData

自定义规则集需要：

| 字段 | 含义 |
| --- | --- |
| 名称 | 唯一名称，会成为文件基础名和规则引用名。 |
| 类型 | `domain` 表示 geosite 类型数据，`ip` 表示 geoip 类型数据。 |
| URL | `.dat` 文件下载地址。 |

添加或更新自定义规则集时，OneXray 会下载 `.dat` 文件，通过 host core API 统计 category 和 rule 数量，保存 `.dat` 文件，并保存生成的 JSON 摘要。

# 自动更新

GeoData 自动更新在 [订阅更新]({{< relref path="../subUpdate/index.md" lang="zh" >}}) 中配置。系统 GeoData 和自定义 GeoData 与订阅刷新分开判断，但由同一个主页自动更新服务执行。

# 分享和备份

自定义 GeoData 可通过 OneXray URL Scheme 分享：

```text
onexray://onexray.com/dat/add?type=domain&url=https%3A%2F%2Fexample.com%2Fcustom.dat#custom
onexray://onexray.com/dat/add?type=ip&url=https%3A%2F%2Fexample.com%2Fcustom.dat#custom
```

当 Xray Setting 引用自定义 GeoData 时，OneXray 分享结果会在配置链接之前包含所需 GeoData 链接。

# iOS 和 iPadOS

非常大的规则集文件会增加内存占用。如果 iOS 或 iPadOS 上 VPN 无法启动，请使用更小的 GeoData 文件或更少的路由规则。

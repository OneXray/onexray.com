---
title: 备份与恢复
weight: 6
---

Backup 会把 OneXray 数据导出为 ZIP 文件，方便保存、分享和后续导入。

# 包含的数据

| 数据 | 是否包含 |
| --- | --- |
| 本地 Xray Settings | 是 |
| 本地 Outbound 节点 | 是 |
| Raw Json 配置 | 是 |
| 订阅 | 是，以订阅记录和 URL 保存 |
| 订阅节点行 | 否，恢复时通过订阅 URL 重新下载。 |
| 自定义 GeoData 记录 | 是 |
| 自定义 GeoData `.dat` 和生成的 `.json` 文件 | 是 |
| 内置 `geosite` 和 `geoip` 记录 | 否，它们会从内置资源恢复。 |
| Simple Setting 偏好 | 否，保留在备份数据之外。 |
| 其他 App 偏好 | 否 |

# 文件结构

备份文件按日期命名：

```text
OneXray-yyyy-MM-dd.zip
```

外层 ZIP 结构：

```text
timestamp.txt
sha256sum.txt
data.zip
```

`data.zip` 包含：

```text
manifest.json
core_configs.json
subscriptions.json
geo_data.json
dat/
```

`manifest.json` 表示这是当前结构化 v2 备份格式。缺少该 manifest 的备份不会被当前 OneXray 版本恢复。

`core_configs.json` 只包含本地配置，不包含订阅节点。

`subscriptions.json` 包含订阅名称、URL、timestamp 和 expanded 状态。恢复时 OneXray 会重建订阅并刷新 URL 重新下载节点。

`geo_data.json` 包含自定义 GeoData 元数据。`dat/` 目录包含对应的自定义 `.dat` 文件和生成的 `.json` 摘要。

# 恢复

恢复会清理 OneXray 业务数据和 GeoData 运行目录，恢复内置 `geosite` 和 `geoip`，复制备份中的自定义 GeoData 文件，恢复本地配置，恢复订阅，并刷新订阅 URL。

请单独保存重要备份 ZIP。系统级云备份不一定包含用户手动管理的备份文件。

---
title: 备份与恢复
weight: 6
---

Backup 会把 OneXray 数据导出为 ZIP 文件，方便保存、分享和后续导入。

# 包含的数据

| 数据 | 是否包含 |
| --- | --- |
| 本地 Xray 配置 | 是 |
| 本地 Outbound 节点 | 是 |
| Full Config | 是 |
| Raw Json 配置 | 是 |
| 订阅 | 是，包含 URL 和可选的 Age 密钥对 |
| 订阅节点行 | 否，恢复时通过订阅 URL 重新下载。 |
| 自定义 GeoData 记录 | 是 |
| 自定义 GeoData `.dat` 和生成的 `.json` 文件 | 是 |
| 内置 `geosite` 和 `geoip` 记录 | 否，它们会从内置资源恢复。 |
| 简易配置偏好 | 否，保留在备份数据之外。 |
| 其他 App 偏好 | 否 |

# 文件结构

备份文件名包含创建日期和时间，因此同一天创建多个备份时不会互相覆盖：

```text
OneXray-yyyy-MM-dd-HH-mm-ss.zip
```

ZIP 根目录结构：

```text
manifest.json
core_configs.json
subscriptions.json
geo_data.json
dat/
```

`manifest.json` 表示当前结构化 v4 备份格式，并记录创建时间。OneXray 可恢复结构化 v3 与 v4 备份；缺少受支持 manifest 的归档会被拒绝。

`core_configs.json` 只包含本地配置，不包含订阅节点。

`subscriptions.json` 包含订阅名称、URL、可选的 Age 公钥/私钥、timestamp 和 expanded 状态。恢复时 OneXray 会重建订阅并刷新 URL 重新下载节点。

`geo_data.json` 包含自定义 GeoData 元数据。`dat/` 目录包含对应的自定义 `.dat` 文件和生成的 `.json` 摘要。

# 恢复

恢复会清理 OneXray 业务数据和 GeoData 运行目录，恢复内置 `geosite` 和 `geoip`，复制备份中的自定义 GeoData 文件，恢复本地配置，恢复订阅，并刷新订阅 URL。

备份 ZIP 未加密，可能包含节点凭据、订阅 URL 和 Age 私钥，请按敏感文件保存，并在需要时保留独立副本。系统级云备份不一定包含用户手动管理的备份文件。

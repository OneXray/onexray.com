---
title: Settings
weight: 5
---

Settings 包含 App 级别的偏好和维护工具。

| 分区 | 页面或操作 | 用途 |
| --- | --- | --- |
| Data | Auto Update | App 初始化后按计划刷新订阅和 GeoData。 |
| Data | App 更新检查 | 检查当前发布渠道是否有新版本。 |
| Data | 清理数据 | 删除业务数据、运行文件、缓存和自定义 GeoData，同时保留应用偏好和本地备份文件。 |
| App | Backup | 导出和恢复 OneXray 数据。 |
| App | App Icon | 修改 iOS App 图标。 |
| App | Toolbox | macOS 工具操作。 |
| App | Theme | 选择 App 主题。 |
| App | Language | 选择 App 语言。 |
| Support | Docs、Review、Telegram、Issues、Source Code、Credits、Privacy | 支持与项目信息。 |
| Version | App 和 Xray 版本 | 展示已安装 App 版本和内置 Xray-core 版本。 |

Xray-core 相关页面已移到 [Core]({{< relref path="../core/_index.md" lang="zh" >}})。TUN、Ping、Logs、Xray Settings 和 GeoData 不再作为 Settings 根页面展示。

# 清理数据

清理数据会先停止 VPN。如果 VPN 无法停止，清理会取消。

清理成功后，OneXray 会删除本地配置、订阅、GeoData 数据库记录、运行文件、App 缓存和自定义 GeoData 文件。内置 `geosite` 和 `geoip` 会重新恢复。

这个操作会保留本地备份 ZIP 和应用偏好，例如隐私接受状态、first-run 状态、Simple Xray Setting、TUN Setting、主题、语言、Dock 设置、query-all-packages 授权和 iOS 原生 App 图标。清理后当前 Xray Setting 会重置为 `Simple`。

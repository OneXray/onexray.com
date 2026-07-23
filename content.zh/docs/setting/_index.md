---
title: 设置
weight: 5
---

设置页包含 App 级偏好、维护、版本信息和支持入口。

| 分区 | 内容 |
| --- | --- |
| 数据 | 自动更新、手动检查 App 更新、清除数据。 |
| App | 备份、iOS App 图标、macOS 工具箱、主题和语言。 |
| 版本 | 已安装的 OneXray 与 Xray-core 版本。 |
| 支持 | 文档、评价、Telegram、Issue、源码、致谢和隐私。 |

OneXray 启动后会检查较新的稳定 GitHub Release，但不再自动弹出更新窗口。存在更新时，移动端 Settings 导航项会显示提醒；桌面端侧边栏底部会显示可点击提醒。只有用户主动操作时才打开支持 Markdown 的完整更新说明。

# 清除数据

清除数据会先停止 VPN，停止失败时取消清理。

成功后会删除配置、订阅、GeoData 数据库记录、运行时文件、缓存和自定义 GeoData，并恢复内置 `geosite` 与 `geoip`，当前 Xray 配置回到简易配置。

本地备份 ZIP 和隐私确认、First Run、简易配置、TUN 设置、主题、语言及平台外观偏好会保留。

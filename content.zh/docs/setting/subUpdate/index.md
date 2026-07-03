---
title: Auto Update
weight: 4
---

Auto Update 控制 App 初始化完成后的自动数据刷新。它不会在早期启动阶段运行。

# 订阅刷新

| 选项 | 含义 |
| --- | --- |
| Enable | 自动刷新过期订阅。 |
| Interval | `1 day`、`3 days` 或 `1 week`。 |
| Auto Ping | 订阅刷新后对该订阅的 Outbound 节点测速。 |

刷新订阅不会影响已经运行中的配置，直到用户下一次启动 VPN 才会使用新节点。更新订阅会替换该订阅保存的 Outbound 节点，并更新 timestamp 和 count。

# GeoData 刷新

| 选项 | 含义 |
| --- | --- |
| Enable GeoData | 自动刷新系统和自定义 GeoData。 |
| GeoData interval | `1 day`、`3 days` 或 `1 week`。 |

系统 GeoData 会一起刷新 `geosite` 和 `geoip`。自定义 GeoData 会在 timestamp 超过所选间隔时逐个刷新。

# 执行规则

自动更新服务：

1. 仅在没有其他下载/更新任务运行时执行。
2. 读取保存的 Auto Update 设置。
3. 如果启用了订阅更新，则刷新过期订阅。
4. 如果启用了 GeoData 更新，则刷新过期 GeoData。
5. 工作期间使用 App 全局 downloading 状态。

---
title: 备份和恢复
weight: 6
---

备份会把 OneXray 数据导出为 ZIP 文件，可分享、保存并在之后导入。

# 包含的数据

| 数据 | 是否包含 |
| --- | --- |
| 本地 Xray Setting | 是 |
| 本地节点 | 是 |
| Raw Config | 是 |
| 订阅 | 是，以订阅链接形式保存 |
| 自定义 GeoData 行 | 是 |
| 自定义 GeoData `.dat` 和生成的 `.json` 文件 | 是 |
| 订阅中的节点行 | 否，恢复时会从订阅 URL 重新下载 |
| Simple Setting 偏好 | 否 |
| 其他 App 偏好 | 否 |

# 文件结构

备份文件按日期命名：

```text
OneXray-yyyy-MM-dd.zip
```

内部结构：

```text
timestamp.txt
sha256sum.txt
data.zip
```

`data.zip` 内包含：

```text
config.txt
subscription.txt
dat.txt
dat/
```

文本文件内保存 OneXray 分享链接。`dat` 目录保存自定义 GeoData 文件。

# 恢复

恢复会清空本地 OneXray 数据，恢复内置系统 GeoData 资源，复制备份中的自定义 GeoData 文件，然后导入保存的分享链接。

重要备份 ZIP 应单独保存。系统级云备份不一定会包含用户自行管理的备份文件。

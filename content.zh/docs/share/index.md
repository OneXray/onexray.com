---
title: 分享
weight: 2
---

OneXray 使用标准格式，不使用私有 App 链接格式。

| 类型 | 分享格式 |
| --- | --- |
| Outbound | libXray 支持的标准 Xray 分享文本与二维码。 |
| 订阅 | HTTPS URL。 |
| Raw Json | JSON 文本或 `.json` 文件。 |
| Xray 配置 | JSON 文本或 `.json` 文件。 |
| GeoData | 使用备份迁移。 |

# 导入判定

1. 去除首尾空白后以 `https://` 开头时，按每行一个 HTTPS 订阅处理。
2. 否则由 libXray 将完整内容解析为 Outbound 分享文本。

订阅 URL fragment 用作名称，保存前会被删除。文本文件支持 `txt`、`json`、`yaml`、`yml`；二维码图片支持 `png`、`jpg`、`jpeg`。

通用导入只创建订阅和 Outbound。Raw Json 与 Xray 配置导出内容用于手动编辑或备份，必须从各自页面创建。

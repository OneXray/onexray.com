---
title: 开发
weight: 4
---

本页面说明面向高级用户和集成工具的导入行为与运行时数据语义。

# 导入判断顺序

当 OneXray 从 App UI 收到导入文本时，按以下顺序判断：

1. 以 `https://` 开头的文本按订阅 URL 处理。
2. 其他文本交给 libXray 按 Outbound 分享内容解析。

当前导入流程不再处理旧私有导入文本、GeoData 导入 payload、Raw Json 记录或 Xray 配置记录。

# 支持的导入文本

| 格式 | 结果 |
| --- | --- |
| HTTPS 订阅 URL | 添加订阅行，刷新 URL，并导入 Outbound 节点。 |
| 标准 Xray 分享链接 | 通过 libXray 导入 Outbound 节点。 |
| 多行 Xray 分享文本 | libXray 支持时导入多个 Outbound 节点。 |
| Clash.Meta YAML | 内置 libXray API 支持时导入 Outbound 节点。 |
| Xray JSON | 内置 libXray API 支持时导入 Outbound 节点。 |

订阅只支持 Outbound。订阅不会创建 Raw Json、Xray 配置、GeoData、DNS、routing、inbounds、policy、stats、metrics 或 logs。

Raw Json 和 Xray 配置仍然可以从各自页面导出为 JSON 文本或 JSON 文件，但不会通过通用导入流程作为 App 内部记录导入。

# 桌面端集成

桌面端安装包只提供 App。本地启动、停止、导入、导出、备份和恢复都通过 OneXray UI 完成。

OneXray 不暴露稳定的本地机器控制接口。外部工具应把文档中的 JSON 视为数据格式，而不是运行时控制契约。

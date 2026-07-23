---
title: 日志
weight: 5
---

日志已合并为 Core 页面中的一个分区，不再是独立根页面。

| 项目 | 行为 |
| --- | --- |
| Access Log | 打开可用的 Xray access 日志。 |
| Error Log | 打开 Xray 诊断与运行时错误。 |
| Xray 配置 | 打开 Xray-core 实际使用的最终配置。 |

Access/Error 查看器首次只读取最近 1 MiB，轮询追加内容，并在用户未向上滚动时跟随底部，因此大日志文件也不会一次全部载入。可通过跟随按钮回到实时输出。

配置查看器使用可选择的等宽文本，可直接复制 JSON。平台允许时，Access/Error 文件仍提供分享与保存菜单。

Xray 日志级别由当前 Xray 配置控制。macOS System Extension 模式会在运行时关闭 Xray 文件日志，因此该模式下会隐藏 Access/Error 项。

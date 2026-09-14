---
title: "使用 AI 配置"
description: "把需求转换为可以导入 OneXray 的 JSON，并明确仍需操作的平台隧道设置。"
weight: -50
ai_order: 10
lastmod: 2026-09-14
---

描述希望实现的效果，让 AI 根据这份指南选择配置类型、询问缺失资料并生成完整 JSON。OneXray 不内置 AI 服务；由你选择助手，网站不接收配置。

{{% ai-links %}}

## 选择最简单的方案

| 需求 | 推荐结果 |
| --- | --- |
| 使用已有服务器 | outbound 节点文件，保留智能路由 |
| 调整直连、代理和阻断规则 | 自定义路由，复用 App 已导入的节点 |
| 完整控制 DNS、多条代理链或普通编辑器之外的能力 | Raw JSON |
| Android 应用选择、Apple Wi-Fi 行为、系统排除路由、网卡 | VPN Tunnel 操作步骤，必要时配合路由 JSON |

智能路由开关已经能够满足需求时，不必生成 Raw JSON。不要把平台设置写进虚构的 JSON section。

## 交给 AI 的提示词

填写括号中的资料，再复制下面的提示词。代码块的复制按钮只复制提示词正文。

{{% ai-prompt %}}

如果助手无法读取长文件，可以[下载完整指南](/zh/llms-full.txt)后附上文本，或逐章提供 Markdown。仅仅收到一个链接，不代表 AI 已经完整阅读。

## 需要准备的信息

- App 版本、平台和安装类型：Windows 的 EXE/ZIP 或 MSIX；macOS 的 App Store 版或 OneXraySE。
- 哪些目标需要代理、直连或阻断，以及优先级。“本地”是指某个国家、局域网还是 DNS，必须说清楚。
- 是否已有节点。生成 outbound 或 Raw JSON 时，需要真实协议、地址、端口、凭据、传输及 TLS/REALITY 参数。
- 本地 DNS、域名、可达网段；如使用自定义 Geodata，还需要文件名、真实分类和 HTTPS 地址。
- 如需开发中功能，确认安装的构建确实支持。

只向可信助手提供必要的敏感信息。脱敏资料可用于讨论，但不能生成可联网的服务器配置。OneXray 和示例均不提供 VPN 服务。

## 应得到什么结果

AI 应输出：选择的模式与兼容版本、需要时的完整 JSON、准确导入入口、剩余隧道操作、预期行为与验证步骤。资料不足时先询问，不猜测密钥、分类、网卡或 SSID。

先读[版本兼容]({{< relref "/docs/configuration/compatibility" >}})和[配置规范]({{< relref "/docs/configuration" >}})。可以导入不等于可以联网。

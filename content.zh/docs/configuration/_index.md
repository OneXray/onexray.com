---
title: "配置生成规范"
description: "先确定 JSON 文件类型、导入入口以及 App 和用户各自负责的字段。"
weight: -40
ai_order: 30
lastmod: 2026-09-15
---

这里规定 OneXray 的导入格式，不是给通用 Xray 配置换几个名称。必要规则均在站内，不要求使用者再阅读 App 源码。

{{% ai-links %}}

| 文件 | 结构 | 导入入口 | 仍由 App 配置 |
| --- | --- | --- | --- |
| [Outbound]({{< relref "/docs/configuration/outbound" >}}) | `outbounds` 中放真实节点；单节点编辑只允许一个 | 服务器 → 添加 → 手动 JSON；文件/文本可提取多个 | 节点选择、路由与隧道 |
| [自定义路由]({{< relref "/docs/configuration/custom-routing" >}}) | `name`、空 `outbounds` 槽、`routing`，可选 DNS 和导入依赖 | 连接 → 流量方式 → 自定义路由 → 导入 | 实际节点、代理 balancer、隧道 |
| [高级自定义]({{< relref "/docs/configuration/advanced-routing" >}}) | `name`、开头 1–3 个空槽、可选辅助出站、用户 DNS/规则/入站 | 自定义路由 → 高级 JSON → 导入或编辑 | 实际节点、固定 proxy 组、direct/block、平台设置 |
| [Raw JSON]({{< relref "/docs/configuration/raw-json" >}}) | `name` 和完整的用户 Xray 配置 | 连接 → 专家模式 → Raw JSON → 导入或编辑 | 托管隧道参数、日志、统计、DNS 查询策略和适用平台的网卡 |
| [VPN Tunnel]({{< relref "/docs/tunnel-guide" >}}) | 没有对应导入文件 | 高级 → VPN 隧道 | 通过 UI 保存平台设置 |

普通服务器导入只提取 outbounds，不安装根部 DNS 和 routing。不能把完整 Raw 文件当作普通节点导入。

## 生成规则

1. 每个文件明确一种导入类型。使用 UTF-8 严格 JSON，不含注释、尾随逗号、省略号或 Markdown。
2. 自定义路由和 Raw 的根部填写有意义的 `name`；节点名称写入 `tag`，不借用 `sendThrough`。
3. 输出完整文件，不是补丁或单独规则数组。文档元数据放在示例清单，不加入配置本体。
4. 仅生成该模式和版本接受的字段。自定义路由中的不支持字段会报错，不是可忽略提示。
5. 明确依赖、待替换资料、App 已有节点数量和剩余配置名额，再判断是否可以导入。
6. 使用 App 的导入/保存流程验证。自定义路由的空槽不是可运行的 Xray 出站，直接交给命令行内核不是正确的验证方式。

## 阅读顺序

[版本]({{< relref "/docs/configuration/compatibility" >}}) → 对应格式 → [DNS]({{< relref "/docs/configuration/dns" >}}) → [Geodata]({{< relref "/docs/configuration/geodata" >}}) → [场景方案]({{< relref "/docs/recipes" >}}) → [隧道指导]({{< relref "/docs/tunnel-guide" >}}) → [验证和排错]({{< relref "/docs/troubleshooting" >}})。

[分享与 App Link]({{< relref "/docs/sharing" >}})是可选的传输封装。AI 优先输出普通 JSON 文件；只有构造 App Link 时才需要 Base64。

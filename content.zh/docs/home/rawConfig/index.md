---
title: Raw Json
weight: 4
---

Raw Json 是用于编辑结构化页面未暴露字段的高级本地配置类型。

建议从以下位置复制生成的配置：

```text
Core > 日志 > Xray 配置
```

# 存储与校验

Raw Json 必须是有效 JSON，并包含非空顶层 `name`。

在校验、Real Ping 和保存前，OneXray 会删除用户提供的所有 `inbounds`，只写入 App 管理的 `pingIn`。手动保存随后会执行内置 Xray 配置测试。因此，用户自定义 inbounds 不会作为运行时入口契约保留。

通用分享/文件导入不会创建 Raw Json；请使用 `Home > 添加 > 手动输入 > Raw Json`。

# 最终配置

规则模式下，Raw Json 继续作为配置主体，但其 inbounds 会被当前 Xray 配置中的运行时 `tunIn` 和新生成的 `pingIn` 替换。

OneXray 还会应用：

| 区域 | 运行时行为 |
| --- | --- |
| DNS 策略 | 根据 TUN IPv6 设置重写 DNS 和各 DNS Server 的 `queryStrategy`。 |
| TUN 路由 | 写入 Windows/Linux 的 gateway、DNS、路由表和出站网卡字段。 |
| 日志 | 重写 access/error 路径；macOS System Extension 模式禁用 Xray 日志。 |
| Metrics | 根据 TUN 设置添加或移除 policy、stats 和 metrics。 |
| 环境 | 写入 App 管理的 asset 与 cert 路径。 |

全局模式会删除 `dns` 与 `routing`，并保留 `proxy` 以及通过 `dialerProxy` 递归找到的完整依赖链。

直连模式不会使用 Raw Json 主体。OneXray 会从当前 Xray 配置生成只包含 direct 的最终配置，因此不需要代理节点。

# Ping 规则

不要手动维护 `pingIn`。OneXray 会使用当前随机端口和认证信息重写入站及其 routing rule。

# 分享

Raw Json 可导出为 JSON 文本或 `.json` 文件。导出内容用于手动编辑或备份，通用导入不会将其重新创建为 Raw Json 记录。

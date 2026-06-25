---
title: 启动和停止
weight: 5
---

使用主页底部按钮启动和停止 VPN。

# 启动

启动一个节点时，OneXray 会：

1. 读取当前选中的节点。
2. 读取当前选中的 Xray Setting，或写出内置 Simple 配置。
3. 应用链式代理。
4. 应用平台运行时修正，例如网卡绑定、ping 端口、macOS System Extension 日志处理。
5. 写出 Xray JSON 运行时配置。
6. 启动平台 VPN 隧道。
7. 在可用时测试延迟和节点出口 IP。

# 停止

停止 VPN 会关闭平台隧道，并清理 App 中的运行状态。

# 启动校验

启动可能因为以下情况失败：

| 情况 | 含义 |
| --- | --- |
| 节点无效 | 当前节点无法转换为有效 Xray outbound。 |
| 缺少链式代理 | Simple Setting 指向了已删除的链式代理节点。 |
| 链式代理无效 | 链式代理行不是 outbound，或无法解析。 |
| 链式代理与出口相同 | 链式代理 id 与当前出口节点 id 相同。 |
| Raw Json 无效 | Raw JSON 未通过 OneXray 校验或 Xray-core 测试。 |

桌面端可通过 `onexray vpn start` 和 `onexray vpn stop` 进行机器控制。详见 [开发]({{< relref path="../../develop/index.md" lang="zh" >}})。

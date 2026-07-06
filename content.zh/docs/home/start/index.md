---
title: 启动和停止
weight: 5
---

使用主页底部按钮启动和停止当前运行模式。

OneXray 支持两种运行模式：

| 模式 | 行为 |
| --- | --- |
| TUN | 启动平台 VPN/TUN 集成，并把流量导入 Xray-core。 |
| 代理 | 启动本地 Xray，提供 SOCKS/HTTP 代理端口，不修改系统代理、路由、DNS 或系统 VPN 状态。 |

# 启动

启动一个节点时，OneXray 会：

1. 读取当前选中的节点。
2. 读取当前选中的 Xray 配置。如果保存的选择无效，则回落到内置 Simple 配置。
3. 根据当前节点和当前 Xray 配置合成最终配置（Final Config）。
4. 应用链式代理。
5. 应用运行时修正，例如当前模式的 inbounds、ping 端口、metrics、网卡绑定、env 路径和 macOS System Extension 日志处理。
6. 把最终配置写出为运行时 `xray.json`。
7. TUN 模式启动平台 VPN 隧道；代理模式启动本地 Xray。
8. 在可用时测试延迟和节点出口 IP。

TUN 和代理模式只影响最终配置中的运行时 inbounds 和 Core 启动方式，不改变 Xray 配置必须选中的规则。

# 停止

停止会关闭当前运行时，并清理 App 中的运行状态。

代理模式不会自动配置操作系统，也不会显示为系统 VPN 连接。使用代理模式时，请在浏览器、终端或系统代理中手动填写 Xray 配置里显示的 SOCKS 或 HTTP 地址。

# 启动校验

启动可能因为以下情况失败：

| 情况 | 含义 |
| --- | --- |
| 节点无效 | 当前节点无法转换为有效 Xray outbound。 |
| 缺少链式代理 | 简易配置指向了已删除的链式代理节点。 |
| 链式代理无效 | 链式代理行不是 outbound，或无法解析。 |
| 链式代理与出口相同 | 链式代理 id 与当前出口节点 id 相同。 |
| Raw Json 无效 | Raw JSON 未通过 OneXray 校验或 Xray-core 测试。 |

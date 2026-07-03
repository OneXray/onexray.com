---
title: 日志
weight: 5
---

日志页面提供诊断文件。

| 项目 | 含义 |
| --- | --- |
| App log | OneXray 应用日志。 |
| Xray access log | 开启时的 Xray-core access 日志。 |
| Xray error log | 开启时的 Xray-core error 日志。 |
| Xray config file | Xray-core 实际读取的最终 JSON。 |

# Xray 日志

Xray 日志由当前 Xray 配置或 简易配置控制。

结构化 Xray 配置：

```text
Xray 配置 > Edit Log
```

简易配置：

```text
简易配置 > Log > Enable Log
```

macOS 且启用 System Extension 模式时，OneXray 会在运行时配置中强制关闭 Xray 日志。

# 生成配置

生成的 Xray config file 是最重要的排查材料。它显示 OneXray 应用运行时修正后，Xray-core 实际读取的 JSON。

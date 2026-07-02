---
title: Raw Json
weight: 4
---

Raw Json 保存完整 Xray JSON 文档。当结构化 Xray Setting 页面没有暴露你需要的 Xray-core 功能时，可以使用 Raw Json。

这个页面需要 Xray-core 配置知识。保存前 OneXray 会校验 JSON，并通过内置 core API 测试配置。

[Xray-core 配置参考](https://xtls.github.io/config/)

最安全的流程是从以下位置复制生成后的 Xray 配置文件：

```text
Core > Logs > Xray config file
```

然后在副本基础上编辑 Raw Json。

# 仅本地

Raw Json 只作为本地配置。它会和本地 Outbound 节点一起显示在 Home 的 `Local` 分组下，不再按订阅分组。历史上 `subId` 非 Local 的 Raw 行仍会显示在 Local 下；数据库行不会迁移。

订阅不会创建 Raw Json 项。

# 必需字段

## `name`

OneXray 要求顶层存在非空 `name` 字段，用于配置列表显示。

## 运行时 Inbounds

Raw Json 不再接受自定义 `inbounds`。启动时 OneXray 会删除 Raw Json 中的 `inbounds` 数组，并根据当前选中的 Xray Setting 写入 App 管理的运行时 inbounds。

| 模式 | 运行时 inbounds |
| --- | --- |
| TUN | `tunIn` 和 `pingIn` |
| 代理 | `socksIn`、`httpIn` 和 `pingIn` |

Xray Setting 是必选的。如果保存的选择缺失或无效，OneXray 会在启动前回落到内置 Simple 配置。

# 运行时修正

启动前，OneXray 会按当前平台修正 Raw Json：

| 区域 | 运行时行为 |
| --- | --- |
| Inbounds | Raw Json 的 `inbounds` 会被删除。OneXray 会在 TUN 模式注入 `tunIn`，在代理模式注入 `socksIn/httpIn`，并始终注入 `pingIn`。 |
| 网卡 | TUN 模式会按当前平台写入接口和路由字段。代理模式不会修改系统路由或系统代理设置。 |
| Ping inbound | 不要在 Raw Json 中手写 `pingIn` 入站。OneXray 会写入带随机 ping 端口和 auth 的运行时 HTTP `pingIn` 入站，并重写 ping routing rule。 |
| 日志 | `access` 和 `error` 路径会改写到 OneXray 日志文件。macOS System Extension 模式下会强制关闭日志。 |
| Metrics | TUN metrics 启用时写入运行时 metrics 字段；关闭时不写入 `policy`、`metrics` 和 `stats`。 |

# 推荐 Routing Skeleton

```json
{
  "routing": {
    "rules": [
      {
        "domainMatcher": "hybrid",
        "inboundTag": [
          "dnsQuery"
        ],
        "outboundTag": "proxy",
        "ruleTag": "dnsQuery"
      },
      {
        "domainMatcher": "hybrid",
        "inboundTag": [
          "tunIn"
        ],
        "port": "53",
        "outboundTag": "dnsOut",
        "ruleTag": "dnsOut"
      },
      {
        "inboundTag": [
          "tunIn"
        ],
        "port": "853",
        "outboundTag": "proxy",
        "ruleTag": "dnsDoT"
      }
    ]
  }
}
```

第一条规则处理 DNS component queries。第二条把普通 `53` 端口 DNS 流量转给 DNS outbound。第三条处理 `853` 端口 DNS over TLS。

不要手写 `pingIn` routing rule。OneXray 会在写入运行时 `pingIn` 入站时一并插入运行时 ping rule。代理模式下，运行时修正会把 `tunIn` routing 匹配映射为 `socksIn/httpIn`，因此面向 TUN 编写的模板仍可作为 Raw Json 使用。

# 分享

Raw Json 可以从 Raw Json 节点菜单分享为 JSON 文本或 `.json` 文件。通用导入不会从这些文本重新创建 Raw Json 记录；需要创建或粘贴 Raw Json 时，请使用 `Home > 添加 > 手动输入 > Raw Json`。

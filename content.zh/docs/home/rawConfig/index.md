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

Raw Json 只作为本地配置。Raw Json 列表固定显示一个 `Local` 分组，不再按订阅分组。历史上 `subId` 非 Local 的 Raw 行仍会显示在 Local 下；数据库行不会迁移。

订阅不会创建 Raw Json 项。

# 必需字段

## `name`

OneXray 要求顶层存在非空 `name` 字段，用于配置列表显示。

## TUN Inbound

OneXray 要求至少存在一个 inbound：

| 字段 | 必需值 |
| --- | --- |
| `protocol` | `tun` |
| `tag` | `tunIn` |

建议开启 sniffing，因为基于域名的 routing 依赖它。

```json
{
  "name": "RawXrayConfig",
  "inbounds": [
    {
      "listen": "127.0.0.1",
      "protocol": "tun",
      "tag": "tunIn",
      "sniffing": {
        "enabled": true,
        "destOverride": [
          "http",
          "tls",
          "quic"
        ]
      }
    }
  ]
}
```

# 运行时修正

启动前，OneXray 会按当前平台修正 Raw Json：

| 区域 | 运行时行为 |
| --- | --- |
| 网卡 | TUN 网卡绑定启用时，会写入 outbound `streamSettings.sockopt.interface` 和 TUN `autoOutboundsInterface`。未启用时，会移除已有 outbound `interface` 字段。 |
| Ping inbound | 不要在 Raw Json 中手写 `pingIn` 入站。启动时 OneXray 会移除已有 `pingIn` 入站，写入带当前 ping 端口和 auth 的运行时 HTTP `pingIn` 入站，并重写 ping routing rule。 |
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

不要手写 `pingIn` routing rule。OneXray 会在写入运行时 `pingIn` 入站时一并插入运行时 ping rule。

# 分享

Raw Json 可以从 Raw Json 菜单分享为 JSON 文本或 `.json` 文件。通用导入不会从这些文本重新创建 Raw Json 记录；需要创建或粘贴 Raw Json 时，请使用 Core 里的 Xray 编辑器。

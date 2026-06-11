---
title: Raw Config
weight: 4
---

Raw Config 保存完整 Xray JSON 文档。当结构化 Xray Setting 页面没有暴露你需要的 Xray-core 功能时，可以使用 Raw Config。

该页面要求你理解 Xray-core 配置。保存前，OneXray 会校验 JSON，并通过内置 core API 测试配置。

[Xray-core 配置指南](https://xtls.github.io/config/)

推荐先复制 App 生成的 Xray 配置文件：

```text
设置 > 日志 > Xray 配置文件
```

然后在副本基础上编辑 Raw Config。

# 必要字段

## `name`

OneXray 要求顶层 `name` 非空，用于在配置列表中显示。

## TUN 入站

OneXray 要求至少存在一个 inbound 满足：

| 字段 | 必要值 |
| --- | --- |
| `protocol` | `tun` |
| `tag` | `tunIn` |

建议开启 sniffing，因为基于域名的路由依赖它。

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
    },
    {
      "listen": "127.0.0.1",
      "port": "11024",
      "protocol": "http",
      "tag": "pingIn"
    }
  ]
}
```

# 运行时修正

启动前，OneXray 会按当前平台修正 Raw Config：

| 区域 | 运行时行为 |
| --- | --- |
| 网卡 | 开启 TUN 网卡绑定时，填充 outbound `streamSettings.sockopt.interface` 和 TUN `autoOutboundsInterface`；未开启时，移除已有 outbound `interface` 字段。 |
| Ping inbound 端口 | `pingIn` HTTP inbound 若使用随机端口，会替换为运行时 ping 端口。 |
| 日志 | `access` 和 `error` 会改写为 OneXray 日志路径。macOS System Extension 模式下会强制关闭日志。 |
| Metrics | 运行时 Raw Config 会移除 `policy`、`metrics` 和 `stats`。 |

# 推荐路由骨架

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
      },
      {
        "inboundTag": [
          "pingIn"
        ],
        "outboundTag": "proxy",
        "ruleTag": "ping"
      }
    ]
  }
}
```

第一条规则处理 DNS 组件查询。第二条规则把普通 `53` 端口 DNS 流量转发到 DNS outbound。第三条规则处理 `853` 端口 DNS over TLS。第四条规则让 OneXray 测速流量走当前代理。

# 导入和分享

Raw Config 可通过 OneXray URL Scheme 使用 `type=raw` 导入。详见 [开发]({{< relref path="../../develop/index.md" lang="zh" >}})。

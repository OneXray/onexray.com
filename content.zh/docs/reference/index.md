---
title: AI 参考
weight: 8
---

本页是 OneXray 当前行为的紧凑机器可读参考，刻意保留精确 identifier、tag、path 和 JSON key。

# 核心概念

| Identifier | 含义 |
| --- | --- |
| `CoreConfigType.outbound` | 单个本地或订阅节点。 |
| `CoreConfigType.setting` | OneXray 保存的结构化 Xray Setting；在 Xray Setting 列表中统一显示在 Local 下。 |
| `CoreConfigType.raw` | 以文本保存的完整 Raw Json 配置；统一显示在 Home 的 `Local` 分组下。 |
| `Simple` | 内置 setting writer，id 为 `-1`。 |
| `proxy` | 当前出口节点的运行时 tag。 |
| `chainProxy` | 前置代理或中继节点的固定 tag。 |
| `tunIn` | TUN inbound tag。 |
| `pingIn` | HTTP ping inbound tag。 |
| `dnsQuery` | DNS component inbound tag 和 rule tag。 |
| `dnsOut` | DNS outbound tag 和 rule tag。 |
| `dnsDoT` | 端口 `853` 的 routing rule tag。 |
| `ping` | 测速流量 rule tag。 |

# 一级导航

| 一级路径 | 含义 |
| --- | --- |
| `/home` | 连接状态和节点操作。 |
| `/subscriptions` | 订阅源列表。 |
| `/core` | Xray-core 设置和诊断。 |
| `/settings` | App 偏好和支持。 |

二级页面注册在所有一级路径下。例如 `/home/tun`、`/core/tun` 和 `/settings/tun` 渲染同一个 TUN 页面，但会保持各自一级入口选中态。

# 导入文本分类

| 前缀或内容 | 导入结果 |
| --- | --- |
| `https://` | 订阅 URL。 |
| 其他 Xray 分享内容 | 通过 libXray 导入 Outbound 节点。 |

UI 导入接受的文本文件：`txt`、`json`、`yaml`、`yml`。

UI 导入接受的图片文件：`png`、`jpg`、`jpeg`。

不支持的旧私有导入文本和旧备份/分享文本会返回无有效配置。

# App 导入格式

文本导入支持从 App UI 读取剪贴板文本或选择文本文件。

| 格式 | 导入结果 |
| --- | --- |
| HTTPS 订阅 URL | 订阅行和下载后的 Outbound 节点。 |
| Xray 分享链接 | 通过 libXray 导入 Outbound 节点；本地 outbound model 支持 `vless`、`vmess`、`shadowsocks`、`trojan`、`socks`、`hysteria`。 |
| 多行 Xray 分享文本 | 通过 libXray 导入多个 Outbound 节点。 |
| Clash.Meta YAML 文本 | 内置 libXray API 支持时导入 Outbound 节点。 |
| Xray JSON 文本 | 内置 libXray API 支持时导入 Outbound 节点。 |

二维码图片通过 App UI 中的相机扫描或图片文件导入。

# 订阅语义

订阅只支持 Outbound。即使远端文本包含完整 Xray JSON sections，订阅导入和刷新也会忽略 Setting 和 Raw 语义。

| 数据 | 订阅行为 |
| --- | --- |
| `outbounds` | 解析并保存为订阅 Outbound 节点。 |
| `dns`、`routing`、`inbounds`、`log`、`policy`、`stats`、`metrics` | 订阅导入会忽略。 |
| Raw Json | 不会由订阅创建。 |
| Xray Setting | 不会由订阅创建。 |

# Simple Setting 默认值

| 字段 | 默认值 |
| --- | --- |
| `routing.domainStrategy` | `IpIfNonMatch` |
| `routing.queryStrategy` | `UseIPv4` |
| `routing.directSet` | `CN` |
| `routing.appleDirect` | `true` |
| `routing.localDirect` | `true` |
| `routing.enableIPRule` | `true` |
| `routing.localDns` | `true` |
| `dns` | 通过 `proxy` 访问 Cloudflare |
| `enableLog` | `false` |
| `fakeDns` | `false` |
| `chainProxyOutboundId` | `null` |

# Simple Setting 生成规则

| `ruleTag` | 条件 | `outboundTag` |
| --- | --- | --- |
| `defaultDnsProxy` | `inboundTag: ["defaultDns"]` | `proxy` |
| `localDnsDirect` | 启用 local DNS 时 `inboundTag: ["localDns"]` | `direct` |
| `domainDirect` | 直连域名规则 | `direct` |
| `ipDirect` | 直连 IP 规则 | `direct` |

直连域名规则：

| Direct set | Domains |
| --- | --- |
| `CN` | `geosite:CN` |
| `IR` | `geosite:CATEGORY-IR` |
| `RU` | `geosite:CATEGORY-GOV-RU`、`geosite:YANDEX`、`geosite:MAILRU`、`regexp:.ru$` |
| `Other` | 无 |

额外域名规则：

| 开关 | Domain |
| --- | --- |
| `appleDirect` | `geosite:APPLE` |
| `localDirect` | `geosite:PRIVATE` |

直连 IP 规则：

| Direct set | IP rules |
| --- | --- |
| `CN` | `geoip:CN` |
| `IR` | `geoip:IR` |
| `RU` | `geoip:RU` |
| `Other` | 无 |

额外 IP 规则：

| 开关 | IP rule |
| --- | --- |
| `localDirect` | `geoip:PRIVATE` |

# Simple DNS Servers

| 场景 | Server |
| --- | --- |
| 启用 FakeDNS | 第一个 server 是 `address: "fakedns"`。 |
| 默认 DNS | `tcp://1.1.1.1` 或 `https://1.1.1.1/dns-query`，通过 `proxy`。 |
| `CN` 本地 DNS | `tcp://223.5.5.5`，用于直连域名。 |
| `IR` 本地 DNS | `tcp://5.200.200.200`，用于直连域名。 |
| `RU` 本地 DNS | `tcp://9.9.9.9`，用于直连域名。 |
| `Other` 本地 DNS | `tcp://1.1.1.1`，用于直连域名。 |

Simple Setting 启用 FakeDNS 时，TUN sniffing 会包含 `fakedns+others`。

# Xray Setting FakeDNS

默认地址池：

```json
[
  {
    "ipPool": "198.18.0.0/15",
    "poolSize": 32768
  },
  {
    "ipPool": "fc00::/18",
    "poolSize": 32768
  }
]
```

写出的 pools 跟随 `dns.queryStrategy`：

| Strategy | Pools |
| --- | --- |
| `UseIP` | IPv4 和 IPv6 |
| `UseIPv4` | IPv4 |
| `UseIPv6` | IPv6 |

# Xray Setting 出站顺序

```text
proxy
chainProxy
<other custom outbounds>
direct
fragment
block
dnsOut
```

`chainProxy` 仅在已配置时存在。

# DNS Outbound

| 字段 | 默认值 |
| --- | --- |
| `network` | 空，不写出 |
| `address` | 空 |
| `port` | 空 |
| `rules` | `[{"action":"hijack","qType":"1,28"},{"action":"direct"}]` |
| `blockTypes` | `[]` |

只有 `rules` 为空时才写出 `blockTypes`。

# Routing Rule 字段

OneXray routing rules 可以写出：

```text
domain, ip, port, sourcePort, localPort, network, sourceIP, localIP,
inboundTag, protocol, attrs, process, outboundTag, ruleTag
```

`process` 只在 Windows 和 Linux 写出。

# Raw Json 校验

Raw Json 必须：

1. 是合法 JSON。
2. 有非空顶层 `name`。
3. OneXray 重写运行时 inbounds 和 metrics 后，能通过内置 Xray-core config test。

# 运行时修正

| 配置类型 | 运行时修正 |
| --- | --- |
| Xray Setting | Inbound 端口、ping auth、网卡绑定、macOS System Extension 日志关闭、可选 metrics。 |
| Raw Json | 按当前模式重写运行时 inbounds、ping auth、网卡绑定、日志路径或日志关闭、可选 metrics。 |

TUN metrics 关闭时，OneXray 不会把 `policy`、`stats` 或 `metrics` 写入运行时配置。macOS System Extension 模式会在运行时关闭 Xray 日志。

# Backup v3

ZIP 根目录：

```text
manifest.json
core_configs.json
subscriptions.json
geo_data.json
dat/
```

`manifest.json` 保存 `version: 3` 和备份创建时间。`core_configs.json` 只保存本地配置。订阅节点通过刷新订阅 URL 恢复。

---
title: AI 参考
weight: 8
---

本页是 OneXray 当前行为的机器可读参考，尽量使用准确的 identifier、tag、路径和 JSON key。

# 核心概念

| Identifier | 含义 |
| --- | --- |
| `CoreConfigType.outbound` | 单个本地或订阅节点。 |
| `CoreConfigType.setting` | OneXray 保存的结构化 Xray Setting。 |
| `CoreConfigType.raw` | 以文本保存的完整 Raw Config JSON。 |
| `Simple` | 内置设置写出器，id 为 `-1`。 |
| `proxy` | 当前出口节点的运行时 tag。 |
| `chainProxy` | 前置或中转节点的固定 tag。 |
| `tunIn` | TUN inbound tag。 |
| `pingIn` | HTTP ping inbound tag。 |
| `dnsQuery` | DNS 组件 inbound tag 和 rule tag。 |
| `dnsOut` | DNS outbound tag 和 rule tag。 |
| `dnsDoT` | `853` 端口规则 tag。 |
| `ping` | 测速流量规则 tag。 |

# 导入文本分类

| 前缀或内容 | 导入结果 |
| --- | --- |
| `onexray://onexray.com` | OneXray URL Scheme。 |
| `https://` | 订阅 URL。 |
| 其他 Xray 分享内容 | 通过 libXray 导入为节点。 |

UI 导入接受的文本文件：`txt`、`json`、`yaml`。

UI 导入接受的图片文件：`png`、`jpg`、`jpeg`。

# CLI 导入格式

`onexray import` 可通过 `--text`、`--file` 或 `--file -` 标准输入接收文本。

| 格式 | CLI 支持 | 导入结果 |
| --- | --- | --- |
| OneXray URL Scheme | 是 | 配置、订阅或 GeoData。 |
| HTTPS 订阅 URL | 是 | 创建订阅并下载节点。 |
| Xray 分享链接 | 是 | 通过 libXray 导入为节点；本地 outbound model 支持 `vless`、`vmess`、`shadowsocks`、`trojan`、`socks`、`hysteria`。 |
| 多行 Xray 分享文本 | 是 | 通过 libXray 导入多个节点。 |
| Clash.Meta YAML 文本 | 是 | 在内置 libXray API 支持时导入为节点。 |
| Xray JSON 文本 | 是 | 在内置 libXray API 支持时导入为节点。 |
| 多行 OneXray 分享文本 | 是 | 每行 `onexray://onexray.com/...` 独立解析。 |

CLI `--file` 读取文本文件，或使用 `-` 读取 stdin。二维码图片从 App UI 导入。

# URL Scheme `data`

`/config/add` 使用 `data=<base64>`：

```text
data = percentEncode(base64Encode(utf8Encode(jsonText)))
```

使用标准 Base64。

| `type` | `jsonText` 组织方式 | 名称来源 |
| --- | --- | --- |
| `outbound` | Xray JSON object；导入 `outbounds` 的第一个元素。 | 第一个 outbound 的 `name`，然后是 `sendThrough`、`tag`、`protocol`。 |
| `setting` | 完整 Xray Setting JSON object。 | 顶层 `name`。 |
| `raw` | 完整 Raw Config JSON 文本。 | URL fragment 作为数据库显示名称；JSON 顶层 `name` 仍然是校验必需字段。 |

最小 `outbound` payload：

```json
{
  "outbounds": [
    {
      "name": "My Node",
      "protocol": "vless",
      "settings": {}
    }
  ]
}
```

最小 `setting` payload：

```json
{
  "name": "My Setting",
  "log": {},
  "dns": {},
  "fakeDns": [],
  "routing": {},
  "inbounds": [],
  "outbounds": []
}
```

最小 `raw` payload：

```json
{
  "name": "My Raw Config",
  "inbounds": [
    {
      "tag": "tunIn",
      "protocol": "tun"
    }
  ],
  "outbounds": []
}
```

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
| `dns` | Cloudflare，通过 `proxy` |
| `enableLog` | `false` |
| `fakeDns` | `false` |
| `chainProxyOutboundId` | `null` |

# Simple Setting 生成的规则

| `ruleTag` | 条件 | `outboundTag` |
| --- | --- | --- |
| `defaultDnsProxy` | `inboundTag: ["defaultDns"]` | `proxy` |
| `localDnsDirect` | 开启 local DNS 时：`inboundTag: ["localDns"]` | `direct` |
| `domainDirect` | 直连域名规则 | `direct` |
| `ipDirect` | 直连 IP 规则 | `direct` |

直连域名规则：

| Direct set | Domains |
| --- | --- |
| `CN` | `geosite:CN` |
| `IR` | `geosite:CATEGORY-IR` |
| `RU` | `geosite:CATEGORY-GOV-RU`、`geosite:YANDEX`、`geosite:MAILRU`、`regexp:.ru$` |
| `Other` | 无 |

附加域名规则：

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

附加 IP 规则：

| 开关 | IP rule |
| --- | --- |
| `localDirect` | `geoip:PRIVATE` |

# Simple DNS Servers

| 情况 | Server |
| --- | --- |
| FakeDNS 开启 | 第一个 server 为 `address: "fakedns"`。 |
| 默认 DNS | `tcp://1.1.1.1` 或 `https://1.1.1.1/dns-query`，通过 `proxy`。 |
| `CN` local DNS | `tcp://223.5.5.5`，用于直连域名。 |
| `IR` local DNS | `tcp://5.200.200.200`，用于直连域名。 |
| `RU` local DNS | `tcp://9.9.9.9`，用于直连域名。 |
| `Other` local DNS | `tcp://1.1.1.1`，用于直连域名。 |

Simple Setting 开启 FakeDNS 时，TUN sniffing 会包含 `fakedns+others`。

# Xray Setting FakeDNS

默认池：

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

写出的池跟随 `dns.queryStrategy`：

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

只有配置了链式代理时才会出现 `chainProxy`。

# DNS Outbound

| 字段 | 默认值 |
| --- | --- |
| `network` | 空，不写出 |
| `address` | 空 |
| `port` | 空 |
| `rules` | `[{"action":"hijack","qType":"1,28"},{"action":"direct"}]` |
| `blockTypes` | `[]` |

仅当 `rules` 为空时，才会写出 `blockTypes`。

# Routing Rule 字段

OneXray 路由规则可写出：

```text
domain, ip, port, sourcePort, localPort, network, sourceIP, localIP,
inboundTag, protocol, attrs, process, outboundTag, ruleTag
```

`process` 只在 Windows 和 Linux 写出。

# Raw Config 校验

Raw Config 必须：

1. 是有效 JSON。
2. 顶层 `name` 非空。
3. 至少存在一个 `protocol: "tun"` 且 `tag: "tunIn"` 的 inbound。
4. 在 OneXray 为测试移除 TUN inbound 和 metrics 后，通过内置 Xray-core 配置测试。

# 运行时修正

| 配置类型 | 运行时修正 |
| --- | --- |
| Xray Setting | 网卡绑定、ping 端口、macOS System Extension 日志关闭。 |
| Raw Config | 网卡绑定、ping 端口、日志路径或日志关闭、metrics 移除。 |

macOS System Extension 模式会在运行时关闭 Xray 日志。

# URL Scheme

```text
onexray://onexray.com/config/add?type=setting&data=<base64>#<name>
onexray://onexray.com/config/add?type=outbound&data=<base64>#<name>
onexray://onexray.com/config/add?type=raw&data=<base64>#<name>
onexray://onexray.com/sub/add?url=<url>#<name>
onexray://onexray.com/dat/add?type=domain&url=<url>#<name>
onexray://onexray.com/dat/add?type=ip&url=<url>#<name>
```

`/config/add` 的 `data` 是 UTF-8 JSON 的标准 Base64，再作为 query value 进行百分号编码。

# CLI

```shell
onexray health
onexray status
onexray import --file /path/to/import.txt
onexray import --text 'vless://...'
onexray debug session
onexray vpn start
onexray vpn start --id 123
onexray vpn stop
```

# Automation API

| Method | Path | Body |
| --- | --- | --- |
| `GET` | `/v1/health` | 无 |
| `GET` | `/v1/status` | 无 |
| `POST` | `/v1/import` | `{ "text": "<import text>" }` |
| `POST` | `/v1/vpn/start` | `{ "configId": 123 }` 或 `{}` |
| `POST` | `/v1/vpn/stop` | `{}` |

所有请求都需要：

```http
Authorization: Bearer <token>
```

响应 envelope：

```json
{
  "ok": true,
  "data": {
    "key": "value"
  }
}
```

```json
{
  "ok": false,
  "code": "invalid_request",
  "message": "..."
}
```

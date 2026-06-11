---
title: AI Reference
weight: 8
---

Эта страница — компактный machine-readable reference текущего поведения OneXray. Здесь намеренно используются точные identifiers, tags, paths и JSON keys.

# Core Concepts

| Identifier | Значение |
| --- | --- |
| `CoreConfigType.outbound` | Один локальный или subscription node. |
| `CoreConfigType.setting` | Структурированный Xray Setting, сохраненный OneXray. |
| `CoreConfigType.raw` | Полный Raw Config JSON, сохраненный как текст. |
| `Simple` | Встроенный setting writer с id `-1`. |
| `proxy` | Runtime tag выбранного exit node. |
| `chainProxy` | Fixed tag для front или relay node. |
| `tunIn` | TUN inbound tag. |
| `pingIn` | HTTP ping inbound tag. |
| `dnsQuery` | DNS component inbound tag и rule tag. |
| `dnsOut` | DNS outbound tag и rule tag. |
| `dnsDoT` | Routing rule tag для port `853`. |
| `ping` | Routing rule tag для ping traffic. |

# Import Text Classification

| Prefix или content | Import result |
| --- | --- |
| `onexray://onexray.com` | OneXray URL Scheme. |
| `https://` | Subscription URL. |
| Other Xray share content | Outbound nodes через libXray. |

Text files для UI import: `txt`, `json`, `yaml`.

Image files для UI import: `png`, `jpg`, `jpeg`.

# Форматы импорта CLI

`onexray import` принимает text из `--text`, `--file` или stdin через `--file -`.

| Format | Accepted by CLI | Import result |
| --- | --- | --- |
| OneXray URL Scheme | yes | Configs, subscriptions или GeoData. |
| HTTPS subscription URL | yes | Subscription row и downloaded nodes. |
| Xray share link | yes | Outbound nodes через libXray; local outbound models поддерживают `vless`, `vmess`, `shadowsocks`, `trojan`, `socks` и `hysteria`. |
| Multi-line Xray share text | yes | Multiple outbound nodes через libXray. |
| Clash.Meta YAML text | yes | Outbound nodes, если поддерживает bundled libXray API. |
| Xray JSON text | yes | Outbound nodes, если поддерживает bundled libXray API. |
| Multi-line OneXray share text | yes | Каждая строка `onexray://onexray.com/...` разбирается отдельно. |

CLI `--file` читает text files или `-` для stdin. QR images импортируются из UI приложения.

# URL Scheme `data`

`/config/add` использует `data=<base64>`:

```text
data = percentEncode(base64Encode(utf8Encode(jsonText)))
```

Используйте стандартный Base64.

| `type` | Организация `jsonText` | Источник имени |
| --- | --- | --- |
| `outbound` | Xray JSON object; импортируется первый item массива `outbounds`. | Первый outbound `name`, затем `sendThrough`, затем `tag`, затем `protocol`. |
| `setting` | Полный Xray Setting JSON object. | Top-level `name`. |
| `raw` | Полный Raw Config JSON text. | URL fragment для DB display name; top-level JSON `name` все равно нужен для validation. |

Минимальный `outbound` payload:

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

Минимальный `setting` payload:

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

Минимальный `raw` payload:

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

# Simple Setting Defaults

| Field | Default |
| --- | --- |
| `routing.domainStrategy` | `IpIfNonMatch` |
| `routing.queryStrategy` | `UseIPv4` |
| `routing.directSet` | `CN` |
| `routing.appleDirect` | `true` |
| `routing.localDirect` | `true` |
| `routing.enableIPRule` | `true` |
| `routing.localDns` | `true` |
| `dns` | Cloudflare через `proxy` |
| `enableLog` | `false` |
| `fakeDns` | `false` |
| `chainProxyOutboundId` | `null` |

# Simple Setting Generated Rules

| `ruleTag` | Condition | `outboundTag` |
| --- | --- | --- |
| `defaultDnsProxy` | `inboundTag: ["defaultDns"]` | `proxy` |
| `localDnsDirect` | `inboundTag: ["localDns"]`, если local DNS включен | `direct` |
| `domainDirect` | direct domain rules | `direct` |
| `ipDirect` | direct IP rules | `direct` |

Direct domain rules:

| Direct set | Domains |
| --- | --- |
| `CN` | `geosite:CN` |
| `IR` | `geosite:CATEGORY-IR` |
| `RU` | `geosite:CATEGORY-GOV-RU`, `geosite:YANDEX`, `geosite:MAILRU`, `regexp:.ru$` |
| `Other` | none |

Additional domain rules:

| Toggle | Domain |
| --- | --- |
| `appleDirect` | `geosite:APPLE` |
| `localDirect` | `geosite:PRIVATE` |

Direct IP rules:

| Direct set | IP rules |
| --- | --- |
| `CN` | `geoip:CN` |
| `IR` | `geoip:IR` |
| `RU` | `geoip:RU` |
| `Other` | none |

Additional IP rule:

| Toggle | IP rule |
| --- | --- |
| `localDirect` | `geoip:PRIVATE` |

# Simple DNS Servers

| Case | Server |
| --- | --- |
| FakeDNS enabled | Первый server: `address: "fakedns"`. |
| Default DNS | `tcp://1.1.1.1` или `https://1.1.1.1/dns-query`, routed через `proxy`. |
| Local DNS for `CN` | `tcp://223.5.5.5` для direct domains. |
| Local DNS for `IR` | `tcp://5.200.200.200` для direct domains. |
| Local DNS for `RU` | `tcp://9.9.9.9` для direct domains. |
| Local DNS for `Other` | `tcp://1.1.1.1` для direct domains. |

Когда FakeDNS включен в Simple Setting, TUN sniffing содержит `fakedns+others`.

# Xray Setting FakeDNS

Default pools:

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

Записанные pools следуют `dns.queryStrategy`:

| Strategy | Pools |
| --- | --- |
| `UseIP` | IPv4 и IPv6 |
| `UseIPv4` | IPv4 |
| `UseIPv6` | IPv6 |

# Xray Setting Outbound Order

```text
proxy
chainProxy
<other custom outbounds>
direct
fragment
block
dnsOut
```

`chainProxy` присутствует только если настроен.

# DNS Outbound

| Field | Default |
| --- | --- |
| `network` | empty, not written |
| `address` | empty |
| `port` | empty |
| `rules` | `[{"action":"hijack","qType":"1,28"},{"action":"direct"}]` |
| `blockTypes` | `[]` |

`blockTypes` записывается только когда `rules` пустой.

# Routing Rule Fields

OneXray routing rules могут записывать:

```text
domain, ip, port, sourcePort, localPort, network, sourceIP, localIP,
inboundTag, protocol, attrs, process, outboundTag, ruleTag
```

`process` записывается только на Windows и Linux.

# Raw Config Validation

Raw Config должен:

1. Быть valid JSON.
2. Иметь непустой top-level `name`.
3. Иметь хотя бы один inbound с `protocol: "tun"` и `tag: "tunIn"`.
4. Пройти bundled Xray-core config test после того, как OneXray удалит TUN inbound и metrics для test pass.

# Runtime Fixes

| Config type | Runtime fixes |
| --- | --- |
| Xray Setting | Interface binding, ping port, macOS System Extension log disabling. |
| Raw Config | Interface binding, ping port, log path или log disabling, metrics removal. |

macOS System Extension mode отключает Xray logs в runtime.

# URL Scheme

```text
onexray://onexray.com/config/add?type=setting&data=<base64>#<name>
onexray://onexray.com/config/add?type=outbound&data=<base64>#<name>
onexray://onexray.com/config/add?type=raw&data=<base64>#<name>
onexray://onexray.com/sub/add?url=<url>#<name>
onexray://onexray.com/dat/add?type=domain&url=<url>#<name>
onexray://onexray.com/dat/add?type=ip&url=<url>#<name>
```

Для `/config/add` `data` — это standard Base64 от UTF-8 JSON, затем percent-encoded как query value.

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
| `GET` | `/v1/health` | none |
| `GET` | `/v1/status` | none |
| `POST` | `/v1/import` | `{ "text": "<import text>" }` |
| `POST` | `/v1/vpn/start` | `{ "configId": 123 }` или `{}` |
| `POST` | `/v1/vpn/stop` | `{}` |

Все requests требуют:

```http
Authorization: Bearer <token>
```

Response envelope:

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

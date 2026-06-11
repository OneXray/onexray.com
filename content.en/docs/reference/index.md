---
title: AI Reference
weight: 8
---

This page is a compact machine-readable reference for OneXray's current behavior. It intentionally uses exact identifiers, tags, paths, and JSON keys.

# Core Concepts

| Identifier | Meaning |
| --- | --- |
| `CoreConfigType.outbound` | A single local or subscription node. |
| `CoreConfigType.setting` | A structured Xray Setting stored by OneXray. |
| `CoreConfigType.raw` | A full Raw Config JSON stored as text. |
| `Simple` | Built-in setting writer with id `-1`. |
| `proxy` | Runtime tag of the selected exit node. |
| `chainProxy` | Fixed tag for the front or relay node. |
| `tunIn` | TUN inbound tag. |
| `pingIn` | HTTP ping inbound tag. |
| `dnsQuery` | DNS component inbound tag and rule tag. |
| `dnsOut` | DNS outbound tag and rule tag. |
| `dnsDoT` | Routing rule tag for port `853`. |
| `ping` | Routing rule tag for ping traffic. |

# Import Text Classification

| Prefix or content | Import result |
| --- | --- |
| `onexray://onexray.com` | OneXray URL Scheme. |
| `https://` | Subscription URL. |
| Other Xray share content | Outbound nodes through libXray. |

Text files accepted by UI import: `txt`, `json`, `yaml`.

Image files accepted by UI import: `png`, `jpg`, `jpeg`.

# CLI Import Formats

`onexray import` accepts text from `--text`, `--file`, or stdin through `--file -`.

| Format | Accepted by CLI | Import result |
| --- | --- | --- |
| OneXray URL Scheme | yes | Configs, subscriptions, or GeoData. |
| HTTPS subscription URL | yes | Subscription row and downloaded nodes. |
| Xray share link | yes | Outbound nodes through libXray; local outbound models support `vless`, `vmess`, `shadowsocks`, `trojan`, `socks`, and `hysteria`. |
| Multi-line Xray share text | yes | Multiple outbound nodes through libXray. |
| Clash.Meta YAML text | yes | Outbound nodes when supported by bundled libXray API. |
| Xray JSON text | yes | Outbound nodes when supported by bundled libXray API. |
| Multi-line OneXray share text | yes | Each `onexray://onexray.com/...` line is parsed independently. |

CLI `--file` reads text files or `-` for stdin. QR images are imported from the app UI.

# URL Scheme `data`

`/config/add` uses `data=<base64>`:

```text
data = percentEncode(base64Encode(utf8Encode(jsonText)))
```

Use standard Base64.

| `type` | `jsonText` organization | Name source |
| --- | --- | --- |
| `outbound` | Xray JSON object; first item of `outbounds` is imported. | First outbound `name`, then `sendThrough`, then `tag`, then `protocol`. |
| `setting` | Full Xray Setting JSON object. | Top-level `name`. |
| `raw` | Full Raw Config JSON text. | URL fragment for DB display name; top-level JSON `name` still required by validation. |

Minimal `outbound` payload:

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

Minimal `setting` payload:

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

Minimal `raw` payload:

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
| `dns` | Cloudflare through `proxy` |
| `enableLog` | `false` |
| `fakeDns` | `false` |
| `chainProxyOutboundId` | `null` |

# Simple Setting Generated Rules

| `ruleTag` | Condition | `outboundTag` |
| --- | --- | --- |
| `defaultDnsProxy` | `inboundTag: ["defaultDns"]` | `proxy` |
| `localDnsDirect` | `inboundTag: ["localDns"]` when local DNS is enabled | `direct` |
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
| FakeDNS enabled | First server is `address: "fakedns"`. |
| Default DNS | `tcp://1.1.1.1` or `https://1.1.1.1/dns-query`, routed through `proxy`. |
| Local DNS for `CN` | `tcp://223.5.5.5` for direct domains. |
| Local DNS for `IR` | `tcp://5.200.200.200` for direct domains. |
| Local DNS for `RU` | `tcp://9.9.9.9` for direct domains. |
| Local DNS for `Other` | `tcp://1.1.1.1` for direct domains. |

When FakeDNS is enabled in Simple Setting, TUN sniffing includes `fakedns+others`.

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

Written pools follow `dns.queryStrategy`:

| Strategy | Pools |
| --- | --- |
| `UseIP` | IPv4 and IPv6 |
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

`chainProxy` is present only when configured.

# DNS Outbound

| Field | Default |
| --- | --- |
| `network` | empty, not written |
| `address` | empty |
| `port` | empty |
| `rules` | `[{"action":"hijack","qType":"1,28"},{"action":"direct"}]` |
| `blockTypes` | `[]` |

`blockTypes` is written only when `rules` is empty.

# Routing Rule Fields

OneXray routing rules can write:

```text
domain, ip, port, sourcePort, localPort, network, sourceIP, localIP,
inboundTag, protocol, attrs, process, outboundTag, ruleTag
```

`process` is written only on Windows and Linux.

# Raw Config Validation

Raw Config must:

1. Be valid JSON.
2. Have a non-empty top-level `name`.
3. Have at least one inbound with `protocol: "tun"` and `tag: "tunIn"`.
4. Pass the bundled Xray-core config test after OneXray removes TUN inbound and metrics for the test pass.

# Runtime Fixes

| Config type | Runtime fixes |
| --- | --- |
| Xray Setting | Interface binding, ping port, macOS System Extension log disabling. |
| Raw Config | Interface binding, ping port, log path or log disabling, metrics removal. |

macOS System Extension mode disables Xray logs at runtime.

# URL Scheme

```text
onexray://onexray.com/config/add?type=setting&data=<base64>#<name>
onexray://onexray.com/config/add?type=outbound&data=<base64>#<name>
onexray://onexray.com/config/add?type=raw&data=<base64>#<name>
onexray://onexray.com/sub/add?url=<url>#<name>
onexray://onexray.com/dat/add?type=domain&url=<url>#<name>
onexray://onexray.com/dat/add?type=ip&url=<url>#<name>
```

For `/config/add`, `data` is standard Base64 of UTF-8 JSON, then percent-encoded as a query value.

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
| `POST` | `/v1/vpn/start` | `{ "configId": 123 }` or `{}` |
| `POST` | `/v1/vpn/stop` | `{}` |

All requests require:

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

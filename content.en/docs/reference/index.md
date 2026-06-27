---
title: AI Reference
weight: 8
---

This page is a compact machine-readable reference for OneXray's current behavior. It intentionally uses exact identifiers, tags, paths, and JSON keys.

# Core Concepts

| Identifier | Meaning |
| --- | --- |
| `CoreConfigType.outbound` | A single local or subscription node. |
| `CoreConfigType.setting` | A structured Xray Setting stored by OneXray; always shown under Local in the Xray Setting list. |
| `CoreConfigType.raw` | A full Raw Json config stored as text; always shown under Local in the Raw Json list. |
| `Simple` | Built-in setting writer with id `-1`. |
| `proxy` | Runtime tag of the selected exit node. |
| `chainProxy` | Fixed tag for the front or relay node. |
| `tunIn` | TUN inbound tag. |
| `pingIn` | HTTP ping inbound tag. |
| `dnsQuery` | DNS component inbound tag and rule tag. |
| `dnsOut` | DNS outbound tag and rule tag. |
| `dnsDoT` | Routing rule tag for port `853`. |
| `ping` | Routing rule tag for ping traffic. |

# Primary Navigation

| Primary route | Meaning |
| --- | --- |
| `/home` | Connection state and node operation. |
| `/subscriptions` | Subscription source list. |
| `/core` | Xray-core settings and diagnostics. |
| `/settings` | App preferences and support. |

Secondary pages are registered under every primary route. For example, `/home/tun`, `/core/tun`, and `/settings/tun` render the same TUN page while preserving the selected primary area.

# Import Text Classification

| Prefix or content | Import result |
| --- | --- |
| `https://` | Subscription URL. |
| Other Xray share content | Outbound nodes through libXray. |

Text files accepted by UI import: `txt`, `json`, `yaml`.

Image files accepted by UI import: `png`, `jpg`, `jpeg`.

Unsupported legacy private import text and old backup/share text return no valid config.

# App Import Formats

Text import accepts clipboard text and text files selected from the app UI.

| Format | Import result |
| --- | --- |
| HTTPS subscription URL | Subscription row and downloaded outbound nodes. |
| Xray share link | Outbound nodes through libXray; local outbound models support `vless`, `vmess`, `shadowsocks`, `trojan`, `socks`, and `hysteria`. |
| Multi-line Xray share text | Multiple outbound nodes through libXray. |
| Clash.Meta YAML text | Outbound nodes when supported by bundled libXray API. |
| Xray JSON text | Outbound nodes when supported by bundled libXray API. |

QR images are imported from camera scan or image file import in the app UI.

# Subscription Semantics

Subscriptions are outbound-only. Subscription import and refresh ignore Setting and Raw semantics even if the remote text contains full Xray JSON sections.

| Data | Subscription behavior |
| --- | --- |
| `outbounds` | Parsed and stored as subscription outbound nodes. |
| `dns`, `routing`, `inbounds`, `log`, `policy`, `stats`, `metrics` | Ignored by subscription import. |
| Raw Json | Not created from subscriptions. |
| Xray Setting | Not created from subscriptions. |

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

# Raw Json Validation

Raw Json must:

1. Be valid JSON.
2. Have a non-empty top-level `name`.
3. Have at least one inbound with `protocol: "tun"` and `tag: "tunIn"`.
4. Pass the bundled Xray-core config test after OneXray removes TUN inbound and runtime metrics for the test pass.

# Runtime Fixes

| Config type | Runtime fixes |
| --- | --- |
| Xray Setting | Inbound ports, ping auth, interface binding, macOS System Extension log disabling, and optional metrics. |
| Raw Json | Inbound ports, ping auth, interface binding, log path or log disabling, and optional metrics. |

When TUN metrics are disabled, OneXray does not write `policy`, `stats`, or `metrics` into runtime configs. macOS System Extension mode disables Xray logs at runtime.

# Backup v3

ZIP root:

```text
manifest.json
core_configs.json
subscriptions.json
geo_data.json
dat/
```

`manifest.json` stores `version: 3` and the backup creation timestamp. `core_configs.json` stores local configs only. Subscription nodes are restored by refreshing subscription URLs.


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

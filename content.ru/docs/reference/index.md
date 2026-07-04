---
title: AI Reference
weight: 8
---

Эта страница — компактный machine-readable reference текущего поведения OneXray. Она намеренно использует точные identifiers, tags, paths и JSON keys.

# Core Concepts

| Identifier | Meaning |
| --- | --- |
| `CoreConfigType.outbound` | Один local или subscription node. |
| `CoreConfigType.setting` | Structured Xray Profile, сохраненный OneXray; всегда показывается под Local в списке Xray Profile. |
| `CoreConfigType.full` | Structured Full Config node; всегда показывается в группе Home `Local`. |
| `CoreConfigType.raw` | Full Raw Json config, сохраненный как text; всегда показывается в группе Home `Local`. |
| `Simple` | Built-in profile writer с id `-1`. |
| `proxy` | Runtime tag выбранного exit node. |
| `chainProxy` | Fixed tag для front или relay node. |
| `tunIn` | TUN inbound tag. |
| `pingIn` | HTTP ping inbound tag. |
| `dnsQuery` | DNS component inbound tag и rule tag. |
| `dnsOut` | DNS outbound tag и rule tag. |
| `dnsDoT` | Routing rule tag для port `853`. |
| `ping` | Routing rule tag для ping traffic. |

# Primary Navigation

| Primary route | Meaning |
| --- | --- |
| `/home` | Connection state и node operation. |
| `/subscriptions` | Subscription source list. |
| `/core` | Xray-core settings и diagnostics. |
| `/settings` | App preferences и support. |

Secondary pages зарегистрированы под каждым primary route. Например, `/home/tun`, `/core/tun` и `/settings/tun` открывают одну и ту же TUN page, сохраняя выбранный primary section.

# Import Text Classification

| Prefix or content | Import result |
| --- | --- |
| `https://` | Subscription URL. |
| Other Xray share content | Outbound nodes через libXray. |

Text files accepted by UI import: `txt`, `json`, `yaml`, `yml`.

Image files accepted by UI import: `png`, `jpg`, `jpeg`.

Unsupported legacy private import text и old backup/share text возвращают no valid config.

# App Import Formats

Text import принимает clipboard text и text files, выбранные в UI приложения.

| Format | Import result |
| --- | --- |
| HTTPS subscription URL | Subscription row и downloaded outbound nodes. |
| Xray share link | Outbound nodes через libXray; local outbound models support `vless`, `vmess`, `shadowsocks`, `trojan`, `socks`, `hysteria`. |
| Multi-line Xray share text | Multiple outbound nodes через libXray. |
| Clash.Meta YAML text | Outbound nodes, если поддерживается bundled libXray API. |
| Xray JSON text | Outbound nodes, если поддерживается bundled libXray API. |

QR images импортируются через camera scan или image file import в UI приложения.

# Subscription Semantics

Subscriptions are outbound-only. Subscription import and refresh ignore Xray Profile and Raw Json semantics even if remote text contains full Xray JSON sections.

| Data | Subscription behavior |
| --- | --- |
| `outbounds` | Parsed and stored as subscription outbound nodes. |
| `dns`, `routing`, `inbounds`, `log`, `policy`, `stats`, `metrics` | Ignored by subscription import. |
| Raw Json | Not created from subscriptions. |
| Xray Profile | Not created from subscriptions. |

# Simple Profile Defaults

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

# Simple Profile Generated Rules

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

When FakeDNS is enabled in Simple Profile, TUN sniffing includes `fakedns+others`.

# Xray Profile FakeDNS

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

# Xray Profile Outbound Order

```text
proxy
chainProxy
<other custom outbounds>
direct
fragment
block
dnsOut
```

`chainProxy` present only when configured.

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
3. Pass the bundled Xray-core config test after OneXray rewrites runtime inbounds and metrics for the test pass.

# Runtime Fixes

| Config type | Runtime fixes |
| --- | --- |
| Xray Profile | Inbound ports, ping auth, interface binding, macOS System Extension log disabling, and optional metrics. |
| Raw Json | Runtime inbound rewrite for the current mode, ping auth, interface binding, log path or log disabling, and optional metrics. |

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

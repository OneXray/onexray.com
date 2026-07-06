---
title: Xray Profile
weight: 1
aliases:
  - /docs/home/outbound/xraySetting/
---

Xray Profile is OneXray's required runtime profile and structured writer for Xray-core JSON. It is suitable when UI-managed DNS, FakeDNS, routing, inbounds, outbounds, logs, or chain proxy behavior is required.

OneXray always keeps one Xray Profile selected. The built-in Simple Profile is the fallback profile and cannot be deleted.

# Final Config

Final Config means the runtime `xray.json` that OneXray writes immediately before starting Xray-core. It is not the same as a single Xray Profile, Outbound node, Full Config, or Raw Json record.

The selected Xray Profile provides the base runtime structure: `dns`, `fakeDns`, `routing`, `inbounds`, `outbounds`, `log`, and optional metrics-related fields.

The active node type then changes that base:

| Active node | How it changes Final Config |
| --- | --- |
| Outbound | The selected node becomes the runtime `proxy` outbound. If chain proxy is enabled, OneXray writes `chainProxy` and sets `proxy.dialerProxy` to `chainProxy`. |
| Full Config | Full Config replaces the selected Xray Profile's `outbounds`, `routing`, `dns`, and `fakeDns`. The selected Xray Profile and app runtime still provide runtime inbounds, logs, metrics, env, and platform fixes. |
| Raw Json | Raw Json is used as the main JSON body, but its `inbounds` are removed. OneXray writes runtime inbounds from the selected Xray Profile for the current TUN or Proxy mode. |

After this composition, the app runtime still owns `pingIn`, random ping and metrics ports, Windows/Linux TUN route fields, `env.xray.location.asset`, `env.xray.location.cert`, mobile `env.xray.tun.fd`, and macOS System Extension log disabling.

# Sections

| Section | Writes |
| --- | --- |
| Log | `log` |
| DNS | `dns` |
| FakeDNS | `fakeDns` |
| Routing | `routing` |
| Inbounds | `inbounds` |
| Outbounds | `outbounds` |

# DNS

The DNS page writes the Xray `dns` object.

| Field | Meaning |
| --- | --- |
| `hosts` | Static host mappings. |
| `servers` | DNS server list. Each server may have address, port, domains, expectIPs, skipFallback, clientIP, queryStrategy, and tag. |
| `queryStrategy` | `UseIP`, `UseIPv4`, or `UseIPv6`. |
| `disableCache` | Disables DNS cache. |
| `disableFallback` | Disables fallback server behavior. |
| `disableFallbackIfMatch` | Stops fallback when a domain rule matched. |
| `useSystemHosts` | Lets Xray use system hosts data. |

If a DNS server has a non-empty `tag`, OneXray exposes that tag as an `inboundTag` option for routing rules.

# FakeDNS

FakeDNS is always present in Xray Profile output. The FakeDNS page only configures the pools; it does not contain an enable switch.

Default pools:

| Pool | Default `ipPool` | Default `poolSize` |
| --- | --- | --- |
| IPv4 | `198.18.0.0/15` | `32768` |
| IPv6 | `fc00::/18` | `32768` |

The written pools follow DNS `queryStrategy`:

| `queryStrategy` | Written FakeDNS pools |
| --- | --- |
| `UseIP` | IPv4 and IPv6 |
| `UseIPv4` | IPv4 only |
| `UseIPv6` | IPv6 only |

To make FakeDNS useful, the TUN inbound sniffing destination override should include `fakedns+others`. The Simple Profile switch adds that value automatically.

# Routing

Routing writes `routing.domainStrategy` and `routing.rules`.

Default rules are included before custom rules:

| `ruleTag` | Match | Default outbound |
| --- | --- | --- |
| `dnsQuery` | `inboundTag: ["dnsQuery"]` | `proxy` |
| `dnsOut` | `inboundTag: ["tunIn"]`, `port: "53"` | `dnsOut` |
| `dnsDoT` | `inboundTag: ["tunIn"]`, `port: "853"` | `proxy` |
| `ping` | `inboundTag: ["pingIn"]` | `proxy` |

Rule conditions in a single rule are combined. A rule with both `domain` and `ip` matches only when both conditions match the same connection.

The `process` condition is written only on Windows and Linux. On macOS, iOS, and Android, OneXray does not write `process` into the generated Xray JSON.

# Inbounds

The Inbounds page is split by runtime role:

| Section | Inbounds |
| --- | --- |
| TUN Mode | `tunIn` |
| Proxy Mode | `socksIn`, `httpIn` |
| Internal | `pingIn` |

TUN mode injects `tunIn + pingIn` at startup. Proxy mode injects `socksIn + httpIn + pingIn`. `socksIn` defaults to port `11024`, and `httpIn` defaults to port `11025`; both ports can be changed. SOCKS and HTTP authentication are optional and empty by default.

`pingIn` and metrics ports are always assigned randomly at runtime.

# Outbounds

System outbound tags:

| Tag | Protocol | Purpose |
| --- | --- | --- |
| `proxy` | Selected node at runtime | Main exit node. |
| `chainProxy` | Imported or replaced custom node | Front proxy or relay node. |
| `direct` | `freedom` | Direct connection. |
| `fragment` | `freedom` | Fragment outbound. |
| `block` | `blackhole` | Block traffic. |
| `dnsOut` | `dns` | DNS outbound. |

Runtime order:

1. `proxy`
2. `chainProxy`, if configured
3. Other custom outbounds
4. `direct`
5. `fragment`
6. `block`
7. `dnsOut`

## Chain Proxy

The custom chain proxy tag is fixed:

```text
chainProxy
```

In Xray Profile, the Outbounds page supports importing, replacing, and deleting the chain proxy. In Simple Profile, the chain proxy is selected by outbound id from local outbound nodes.

When active, OneXray sets the selected `proxy` outbound's `dialerProxy` to `chainProxy`. Startup fails if the selected exit node and the chain proxy point to the same local outbound id.

## DNS Outbound

DNS outbound writes:

| Field | Behavior |
| --- | --- |
| `network` | Empty by default. Written only when `tcp` or `udp` is selected. |
| `address` | Optional upstream address. |
| `port` | Optional upstream port. |
| `rules` | Written when the rules list is not empty. |
| `blockTypes` | Written only when `rules` is empty and block types are configured. |

Default DNS outbound rules:

```json
[
  {
    "action": "hijack",
    "qType": "1,28"
  },
  {
    "action": "direct"
  }
]
```

`qType` is a string field.

# Runtime Inbound Notes

The structured writer includes the runtime TUN, SOCKS, HTTP, and ping inbound states. The TUN inbound should keep sniffing enabled for routing based on domain and protocol. When FakeDNS is enabled in Simple Profile, sniffing adds `fakedns+others`.

# Logs

On macOS with System Extension mode enabled, OneXray forces Xray Profile logs off before writing the runtime config:

```json
{
  "loglevel": "none",
  "dnsLog": false
}
```

# Sharing

Xray Profile can be shared as JSON text or a `.json` file from the Xray Profile menu.

Custom GeoData is not bundled into Xray Profile share output. If a profile references custom rule sets, add those GeoData entries manually first or use [Backup and Restore]({{< relref path="../../../setting/backup/index.md" lang="en" >}}) for full migration.

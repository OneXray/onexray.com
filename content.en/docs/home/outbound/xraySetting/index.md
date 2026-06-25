---
title: Xray Setting
weight: 1
---

Xray Setting is OneXray's structured writer for Xray-core JSON. It is suitable when UI-managed DNS, FakeDNS, routing, inbounds, outbounds, logs, or chain proxy behavior is required.

The final runtime config is generated from this state when the VPN starts. Runtime fixers may adjust ports, interfaces, and logs for the current platform.

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

FakeDNS is always present in Xray Setting output. The FakeDNS page only configures the pools; it does not contain an enable switch.

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

To make FakeDNS useful, the TUN inbound sniffing destination override should include `fakedns+others`. The Simple Setting switch adds that value automatically.

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

In Xray Setting, the Outbounds page supports importing, replacing, and deleting the chain proxy. In Simple Setting, the chain proxy is selected by outbound id from local outbound nodes.

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

# Inbounds

The structured writer includes the TUN inbound and ping inbound. The TUN inbound should keep sniffing enabled for routing based on domain and protocol. When FakeDNS is enabled in Simple Setting, sniffing adds `fakedns+others`.

# Logs

On macOS with System Extension mode enabled, OneXray forces Xray Setting logs off before writing the runtime config:

```json
{
  "loglevel": "none",
  "dnsLog": false
}
```

# Sharing

Xray Setting can be shared as JSON text or a `.json` file from the Xray Setting menu.

Custom GeoData is not bundled into Xray Setting share output. If a setting references custom rule sets, add those GeoData entries manually first or use [Backup and Restore]({{< relref path="../../../setting/backup/index.md" lang="en" >}}) for full migration.

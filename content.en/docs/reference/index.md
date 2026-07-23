---
title: AI Reference
weight: 8
---

This page is a compact reference for OneXray's current persisted and runtime semantics.

# Config Types and Tags

| Identifier | Meaning |
| --- | --- |
| `CoreConfigType.outbound` | Local or subscription outbound node. |
| `CoreConfigType.profile` | Xray Profile in Dart; persisted wire value remains `"setting"`. |
| `CoreConfigType.full` | Structured Full Config under Home `Local`. |
| `CoreConfigType.raw` | Raw Json under Home `Local`. |
| `Simple` | Built-in profile id `-1`. |
| `proxy` | Runtime final proxy exit. |
| `chainProxy` | Runtime relay tag for the Home node when Final Outbound is active. |
| `direct` | Direct freedom outbound. |
| `tunIn` | Runtime TUN inbound. |
| `pingIn` | Runtime HTTP ping inbound. |

# Home Routing Modes

| Mode | Required node | Transformation |
| --- | --- | --- |
| `rule` | Yes | Keeps composed DNS, routing, and outbound structure. |
| `global` | Yes | Removes DNS/routing; retains `proxy` and recursively required `dialerProxy` outbounds. |
| `direct` | No | Removes DNS/routing; retains only `direct` and clears its `dialerProxy`. |

A connected mode change restarts the Core.

# Import Classification

| Input | Result |
| --- | --- |
| Trimmed text beginning with `https://` | Every valid HTTPS line becomes a subscription import entry. |
| Other supported text | libXray returns outbound models. |

Subscription fragments provide names but are removed from saved URLs. File extensions: `txt`, `json`, `yaml`, `yml`, `png`, `jpg`, `jpeg`. Generic import never creates Raw Json, Full Config, Xray Profile, or GeoData.

# Simple Profile Defaults

| Field | Default |
| --- | --- |
| `routing.domainStrategy` | `IpIfNonMatch` |
| `routing.directSet` | `CN` |
| `routing.appleDirect` | `true` |
| `routing.localDirect` | `true` |
| `routing.enableIPRule` | `true` |
| `routing.localDns` | `true` |
| `routing.blockAds` | `false` |
| `enableLog` | `false` |
| `fakeDns` | `false` |
| `finalOutboundId` | `null` |
| Default DNS | `tcp://<TUN IPv4 DNS>`, tag `defaultDns`, routed through `proxy` |

Region-specific local DNS remains `223.5.5.5` for CN, `5.200.200.200` for IR, `9.9.9.9` for RU, and `8.8.8.8` for Other. It is used only for matching direct-domain rules when Local DNS is enabled.

Ad blocking adds the built-in ad-domain rule to `block`.

# DNS and FakeDNS

Runtime query strategy is derived from TUN Settings:

| IPv6 | Strategy | FakeDNS pools |
| --- | --- | --- |
| Enabled | `UseIP` | IPv4 `198.18.0.0/15` and IPv6 `fc00::/18` |
| Disabled | `UseIPv4` | IPv4 only |

New custom Profile and Full Config DNS servers default to the current TUN IPv4 DNS. Full Config owns `outbounds`, `routing`, and `dns`; it does not own FakeDNS.

# Runtime Composition

| Stored type | Rule-mode Final Config |
| --- | --- |
| Outbound | Selected profile plus Home outbound as `proxy`, with optional Final Outbound reversal through `chainProxy`. |
| Full Config | Profile base with Full Config `outbounds/routing/dns`; Profile FakeDNS/inbounds/log/metrics remain. |
| Raw Json | Raw body with app-managed inbounds, DNS strategy, logs, metrics, env, and route fields rewritten. |

Release runtime inbounds are `tunIn` and `pingIn`. User Raw Json inbounds are removed during validation, Real Ping, save, and startup.

# Runtime-Owned Fields

- Random `pingIn` and metrics ports
- `env.xray.location.asset` and `env.xray.location.cert`
- Mobile `env.xray.tun.fd`
- Windows/Linux TUN gateway, DNS, routes, and outbound interface
- Access/error log paths or macOS System Extension log disabling
- Optional policy/stats/metrics

# Routing Rule Fields

Custom rules support:

```text
domain, ip, port, sourcePort, localPort, network, sourceIP, localIP,
inboundTag, protocol, attrs, process, outboundTag, ruleTag
```

`process` is emitted only on Windows and Linux.

# Raw Json Validation

Raw Json must be a JSON object with a non-empty `name`. Manual validation replaces inbounds with `pingIn`, removes metrics, applies runtime env, and invokes the bundled Xray config test. Importing ordinary outbound/share content does not run this manual-save test.

# Backup v3

```text
manifest.json
core_configs.json
subscriptions.json
geo_data.json
dat/
```

The manifest stores version `3` and creation time. Local configs and GeoData are restored from the archive; subscription nodes are downloaded again from restored source URLs.

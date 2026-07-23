---
title: Xray Profile
weight: 1
aliases:
  - /docs/home/outbound/xraySetting/
---

An Xray Profile is OneXray's required runtime base. Exactly one profile is selected at all times; the built-in Simple Profile is the fallback and cannot be deleted.

# Final Config Composition

The Final Config is the runtime `xray.json` written immediately before Xray-core starts.

| Home config | Composition |
| --- | --- |
| Outbound | The node becomes runtime `proxy`. If Final Outbound is configured, it becomes `proxy`, the Home node becomes `chainProxy`, and `proxy.dialerProxy` points to `chainProxy`. |
| Full Config | Replaces the profile's `outbounds`, `routing`, and `dns`. The profile still supplies FakeDNS, inbounds, logs, metrics, and other runtime-owned sections. |
| Raw Json | Supplies the main JSON body, but its inbounds are discarded and replaced by the selected profile's runtime inbounds. |

The selected Home routing mode is applied after composition. Global removes DNS/routing and keeps the proxy dependency chain; Direct keeps only `direct`.

# Custom Profile Editor

The editor contains six sections:

| Section | Main fields |
| --- | --- |
| Inbounds | `tunIn` and internal `pingIn`. |
| Outbounds | Final Outbound and system `direct`, `fragment`, `block`, `dnsOut`. |
| Routing | Domain strategy, system rules, and ordered custom rules. |
| DNS | Hosts, ordered servers, cache/fallback/stale options, client IP, and parallel/system-host behavior. |
| FakeDNS | IPv4 and IPv6 pools. |
| Log | Log level, DNS log, and address masking. |

On phones these section controls scroll horizontally; on larger layouts they become a side navigation. The fields themselves are unchanged.

# DNS

New Xray Profiles and Full Configs initialize their first DNS server from `TUN Settings > IPv4 DNS`. The DNS address remains editable in the structured editor.

The global and per-server `queryStrategy` fields are not shown in the UI. At runtime OneXray overwrites them from `TUN Settings > Enable IPv6`:

| TUN IPv6 | Written strategy |
| --- | --- |
| Enabled | `UseIP` |
| Disabled | `UseIPv4` |

DNS servers support address, port, domains, expected/unexpected IPs, tag, client IP, timeout, fallback/cache/stale controls, and final-query behavior. A non-empty DNS-server tag can be selected as a routing-rule inbound tag.

# FakeDNS

FakeDNS is owned by the selected Xray Profile, including when a Full Config is active. Full Config does not store or edit FakeDNS.

Default pools are:

| Pool | Address | Size |
| --- | --- | --- |
| IPv4 | `198.18.0.0/15` | `32768` |
| IPv6 | `fc00::/18` | `32768` |

The IPv6 pool is written only when TUN IPv6 is enabled.

# Routing

System rules manage DNS component traffic, port 53, DNS over TLS, and internal ping. Custom rules can match domain, IP, ports, network, source/local addresses, inbound tags, protocols, attributes, and supported-platform processes.

Conditions inside one rule are combined. For example, a rule containing both domain and IP conditions requires both to match the same connection.

# Outbounds and Final Outbound

Reserved system tags:

| Tag | Purpose |
| --- | --- |
| `proxy` | Final proxy exit at runtime. |
| `chainProxy` | Home node used as the dialer relay when Final Outbound is active. |
| `direct` | Freedom/direct outbound. |
| `fragment` | Freedom fragmentation outbound. |
| `block` | Blackhole outbound. |
| `dnsOut` | DNS outbound. |

Final Outbound can be selected from local outbound nodes. The same node cannot be both the Home node and Final Outbound.

# Simple Profile

Simple Profile provides:

- Log enablement
- Final Outbound selection
- Direct region, domain strategy, Apple/local direct rules, IP rules, local DNS, and ad blocking
- FakeDNS enablement
- A read-only default DNS shown as `tcp://<TUN IPv4 DNS>`

The default DNS is routed through `proxy`. Optional region-specific local DNS is used only for the matching direct-domain set.

# Runtime Ownership

OneXray always rewrites runtime TUN and `pingIn` inbounds, ping/metrics ports, GeoData paths, Windows/Linux route fields, and macOS System Extension log behavior. Those generated values are not stable user-owned profile fields.

---
title: "Custom Routing JSON"
description: "Use empty entry slots, ordered rules, fixed actions, local DNS and explicit Geodata dependencies."
weight: 20
ai_order: 50
lastmod: 2026-09-14
---

Import through Connect → traffic method → Custom Routing, not ordinary Servers import. Select the imported profile and choose existing servers on Connect.

## Accepted document

| Field | Contract |
| --- | --- |
| `name` | Include a unique, nonempty display name, at most 32 characters |
| `outbounds` | Required: 1–3 empty objects; their count is the entry-node count |
| `routing.domainStrategy` | Write `IPIfNonMatch`; the App normalizes this value |
| `routing.rules` | Ordered list of rules below; an empty list uses the default outbound behavior |
| `dns` | Optional; the tagged Local DNS form below with an optional FakeDNS server, not arbitrary Xray DNS |
| `geodata.assets` | Optional import-only custom file dependencies, each with `file` and HTTPS `url` |

No other root fields belong to Custom. Do not define real nodes, `direct`, `block`, `dnsOut`, balancers, inbounds, logs, metrics, observatory, root FakeDNS pools or UI flags in this file.

## Rule fields and actions

Supported conditions: `domain` (string array), `ip` (string array), `port` (for example `"443"`, `"8000-8080"`, `"80,443"`), `network` (`"tcp"`, `"udp"` or `"tcp,udp"`), `protocol` (string array) and `localOS` (string array). `ruleTag` names the rule. The editor groups protocol and OS under “More matching conditions”.

Select **exactly one** action:

| Desired action | JSON |
| --- | --- |
| VPN | `"balancerTag": "proxy"` |
| Direct | `"outboundTag": "direct"` |
| Block | `"outboundTag": "block"` |

Do not write `outboundTag: proxy`. Do not write `type`, `enabled`, `sourceIP`, `sourcePort`, `attrs`, `inboundTag` or process conditions. Unsupported fields are rejected rather than silently removed.

Different condition types in one rule are AND. Multiple ordinary values within one condition are alternatives. Prefer separate rules when the intent is OR across domain and IP. Core-specific negated IP lists retain Core semantics; do not apply the simple OR explanation to a negated list without checking it.

Domain forms: `full:host.example.com` for one hostname, `domain:example.com` for that domain and subdomains, `geosite:CN` for a verified default category, `ext:other.dat:category` for a verified custom category. A bare string is a keyword match, not an exact-host match. Do not silently convert user intent to a broad substring or regular expression.

IP forms: an address, CIDR, `geoip:CN`, or `ext:other.dat:category`. Use [verified Geodata]({{< relref "/docs/configuration/geodata" >}}).

## Order and fallback

Rules are checked in order. With `IPIfNonMatch`, a domain destination is resolved for another IP-aware matching pass only when the first pass fails. Avoid an unconditional final proxy rule: it can prevent the IP pass.

OneXray generates a round-robin balancer `proxy`, even with one entry, with fallback `direct`. **Unmatched traffic uses the first outbound, not the balancer.** Add explicit proxy rules for destinations that should use balancing. Direct fallback is not a fail-closed guarantee.

Normal mode supplies the real nodes and system outbounds. Their tags are implementation details; only the three action references above belong in a Custom file.

## Local DNS

If present, include exactly one `{"tag":"app-dns-direct","address":"8.8.8.8"}` server. Change its address, not its tag. To enable FakeDNS, also include the `app-dns-fake` server described below. Do not add `domains`, `queryStrategy`, `skipFallback`, a port property or arbitrary DNS fields. A nondefault port belongs in a Core-supported address string, such as `tcp://192.168.50.53:5353`.

Only pure direct-domain rules contribute domains to this resolver. Combining a domain with IP, port, network, protocol or OS conditions prevents that rule from contributing DNS domains. IP-only direct rules do not resolve internal names. Proxy DNS remains `8.8.8.8`. See [DNS behavior]({{< relref "/docs/configuration/dns" >}}).

## Complete example

This recipe includes ad blocking, GitHub through VPN, and combined Apple/Microsoft/Bing/China/private direct rules. It needs both default DAT files and two eligible entry nodes. It has no credentials or unresolved placeholders.

{{% json-example "custom-cn.json" %}}

## Protocol and operating-system conditions

Use `protocol` (`http`, `tls`, `quic`, `bittorrent`) and `localOS` (`ios`, `android`, `darwin`, `windows`, `linux`), both arrays. Protocol means sniffed application traffic, **not** VLESS/VMess. OS means the OS running Xray, not a remote server or an individual Android app.

{{% json-example "custom-protocol.json" %}}

## FakeDNS

FakeDNS is off by default and is represented by an additional tagged DNS server, not a boolean root field. Include the direct server too; do not export generated pools or sniffing.

{{% json-example "custom-fakedns.json" %}}

[Compatibility]({{< relref "/docs/configuration/compatibility" >}}) · [FakeDNS limitations]({{< relref "/docs/configuration/dns" >}}) · [import dependencies]({{< relref "/docs/configuration/geodata" >}})

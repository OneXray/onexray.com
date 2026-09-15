---
title: "Advanced Routing JSON"
description: "Own DNS, sniffing, extra inbounds and rule order while reusing OneXray servers."
weight: 25
ai_order: 55
lastmod: 2026-09-15
---

Use **Connect → traffic method → New custom route → Advanced JSON**. Import the file or edit it, name it and save. Then select the route and an existing server, subscription or location on Connect. This is a Custom Routing template, **not** the homepage expert-mode Raw configuration. It contains no real proxy nodes and does not require their credentials.

Normal and advanced routes share the three-profile limit and unique 1–32-character names. A profile keeps its mode; there is no form/JSON conversion that could discard fields. To use another mode, create another profile. Raw has its separate existing limit.

## Node slots and fixed tags

Start `outbounds` with 1–3 consecutive empty objects. Auxiliary outbounds follow; do not interleave slots and real objects. Automatic, subscription and region selections need that many eligible, distinct App nodes. A fixed individual server replaces the entire slot region with one node. Changing the server selection does not change the template.

Runtime order is selected nodes first, user auxiliaries in their original order, then App-generated `direct` and `block`. Without a matching rule, Xray uses the **first outbound**, not automatically the balancer. App adds no catch-all. An explicit catch-all can prevent a second `IPIfNonMatch` pass: use it only deliberately.

| Tag | Contract |
| --- | --- |
| `proxy` | App-generated roundRobin balancer, full selected tags, `fallbackTag: direct` and required Observatory. Reference using `balancerTag`, never `outboundTag` or `dialerProxy`. Direct fallback is not fail-closed. |
| `direct`, `block` | App-generated outbounds; reference but never define them in the template. |
| `tunIn` | Managed platform inbound; may be referenced by rules. The template can supply only its `tag` and `sniffing`. |
| `dnsOut` | User-defined DNS outbound when needed; not generated automatically. |
| `app-entry-*`, `app-exit-*` | Internal node identities; do not define or reference them. |
| Other tags | User inbounds, DNS queries and auxiliary outbounds. DNS tags have no hidden proxy/direct behavior. |

Advanced routing does not add a final exit or arbitrary patches to App nodes. `dialerProxy` references an actual outbound, not a balancer. Use complete Raw when the document must own real nodes and chains.

## Accepted JSON

Root fields: `name`, `outbounds`, `inbounds`, `dns`, `routing`, `fakedns`, and import-only `geodata.assets`. Name and dependency metadata are removed from persisted template JSON; their records are stored separately. No extra `mode`, `enabled` or node-ID fields are added.

| Part | Fields / boundary |
| --- | --- |
| `routing` | `domainStrategy`, ordered `rules`; strategy and `ruleTag` remain as written. |
| Rule | `ruleTag`, `domain`, `ip`, `port`, `network`, `protocol`, `localOS`, `inboundTag`, `localIP`, `localPort`, `balancerTag`, `outboundTag`. Choose one action. |
| Managed `tunIn` | `tag`, `sniffing` only; do not set protocol/listen/port/settings. |
| Extra inbound | `tag`, `protocol`, `listen`, `port`, `settings`, `sniffing`. Protocol: `socks`, `http` or `tunnel`; multiple independent instances are allowed. |
| SOCKS settings | `auth`, `users`/`accounts`, `udp`; preserve all user/pass accounts. |
| HTTP settings | `users`/`accounts`; no `allowTransparent`. |
| Tunnel settings | `rewriteAddress`, `rewritePort`, `allowedNetwork`; this is port forwarding, not another system TUN. |
| Sniffing | `enabled`, `routeOnly`, `destOverride`, `metadataOnly`, `domainsExcluded`, `ipsExcluded`. Each inbound is independent. |
| Auxiliary outbound | `tag`, `protocol`, `settings`, `streamSettings.sockopt.dialerProxy`. Protocol: `freedom`, `blackhole`, `dns`; settings use the bundled Core's syntax. No actual remote proxy nodes. |
| DNS | Core-supported `hosts`, `servers`, `clientIp`, `tag`, cache/fallback/parallel-query options, etc.; see below. |
| FakeDNS | Explicit standard `fakedns` pools with `ipPool`/`poolSize`, plus the DNS and sniffing chain. Omitted pools follow Core defaults. |

`process`, source IP/port (`sourceIP`, `source`, `sourcePort`), HTTP attributes (`attrs`), routing `user` and HTTP `allowTransparent` are not accepted. Core validation decides field values; OneXray checks the template boundary and ownership, not a second domain/IP grammar. Complete Raw is not restricted by this template field list.

## DNS is yours

OneXray does **not** insert proxy/direct DNS servers, derive DNS domains from direct rules, inject port-53/853 rules or reorder user rules. Write the complete DNS path in the visible JSON, including the DNS outbound if rules reference it. Non-A/AAAA handling must also be explicit.

DNS root supports `hosts`, `servers`, `clientIp`, `tag`, `disableCache`, `serveStale`, `serveExpiredTTL`, `disableFallback`, `disableFallbackIfMatch`, `enableParallelQuery` and `useSystemHosts`. Servers can be address strings or objects with `address`, `port`, `clientIp`, `domains`, `expectedIPs`, `unexpectedIPs`, `skipFallback`, `tag`, `timeoutMs`, cache/stale options and `finalQuery`. Use syntax accepted by the bundled Core.

Omit root/server `queryStrategy`: OneXray owns it and rejects it in templates. At runtime IPv6 on/off applies `UseIP`/`UseIPv4`; DNS addresses stay unchanged. Local DNS transports ending in `+local` bypass Xray routing and cannot obey the required outbound interface on Windows/Linux, so those platforms reject them. A DNS `tag` alone does not change that behavior. See [DNS guidance]({{< relref "/docs/configuration/dns" >}}).

Logs, stats, metrics, policy, environment/resource paths, Observatory, balancers and outbound interfaces are App-managed, not accepted template fields. Use **Advanced → VPN Tunnel / Xray** for those settings.

## Sniffing and complete Raw differ

An advanced `tunIn` placeholder with `sniffing` uses that whole object; omitted child fields use Core defaults. If no sniffing object is supplied, App defaults apply, including FakeDNS detection. `routeOnly` alone does not enable sniffing. Explicit disabled sniffing is never silently enabled.

For **complete Raw**, an existing `tunIn` retains its position, sniffing and nonmanaged settings. App only merges the necessary platform settings; an absent sniffing object stays absent. A missing entire inbound receives the App default. See the exact six-field and SOCKS-adaptation rules in [Raw JSON]({{< relref "/docs/configuration/raw-json" >}}).

## Complete examples

All examples use existing App nodes. With two automatic slots, provide two eligible nodes or choose a fixed single node. They drop non-A/AAAA tunnel DNS queries explicitly; change the DNS outbound policy deliberately if those queries are needed. No example claims leak-proof or fail-closed operation.

### Loopback SOCKS and TUN routeOnly

Replace the additional SOCKS password; this is an inbound account, not a server credential. Connect a local client to `127.0.0.1:12080`. SOCKS traffic explicitly uses `proxy`; unmatched system traffic follows the first entry. Changing listen to a non-loopback address exposes the proxy to that network; review authentication and firewall access. Mobile background rules can limit additional listeners. Homepage traffic counts only `tunIn`, not these extra inbounds.

{{% json-example "advanced-socks.json" %}}

### China-direct rules and independent DNS

Requires default `geosite.dat:CN` and `geoip.dat:CN`. The direct resolver `1.1.1.1` must be reachable without the VPN proxy; replace it when necessary. DNS-direct and DNS-proxy rules precede destination rules. No catch-all is added, so `IPIfNonMatch` can reach its IP pass.

{{% json-example "advanced-split-dns.json" %}}

### Explicit FakeDNS

DNS, two pools and `destOverride: fakedns` are provided together. Fake IPs must enter the system tunnel; do not exclude their ranges. Existing cached fake IPs can expire after reconnect. The template retains a real DNS resolver for lookups that need one. See [FakeDNS limits]({{< relref "/docs/configuration/dns" >}}).

{{% json-example "advanced-fakedns.json" %}}

## Import, share and verify

- A bare JSON file gets its type from the chosen editor. Use the Advanced JSON import entry; do not infer its type from a DNS field or send it to the ordinary form.
- An App Link uses `/config/add?type=custom-advanced&data=<base64>#<name>`; ordinary Custom continues to use `custom`. Links can also be imported through the existing App-link entry.
- `geodata.assets` uses only `{file,url}`, omits default files, and rejects filename conflicts. Import downloads/stages dependencies; save commits them and removes transfer metadata. Pasting a manifest into the editor is not a download: use **Import**. Sharing reconstructs dependencies from semantic routing, DNS and sniffing references. See [Geodata]({{< relref "/docs/configuration/geodata" >}}).
- Save validates a copy via libXray `TestXray`: local freedom objects replace slots, the fixed balancer/direct/block are supplied, and a harmless inbound carries user TUN sniffing. It constructs/closes an instance, not Start; no node probing or VPN is performed.
- After selecting the profile, verify VPN start, required websites and DNS paths, each additional listener, and FakeDNS if used. Construction success is not connectivity, permission or port-binding evidence. Windows/Linux and Apple platform behavior must be checked on their own systems.

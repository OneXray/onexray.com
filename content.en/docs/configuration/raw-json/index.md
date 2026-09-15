---
title: "Raw JSON"
description: "Generate a complete user configuration without conflicting with the runtime settings owned by OneXray."
weight: 30
ai_order: 60
lastmod: 2026-09-15
---

Use Connect → expert mode → Raw JSON → import or editor. Include a root `name` and all actual proxy outbounds needed by the configuration. Normal-mode server selection, Smart Routing and Custom Routing do not merge into Raw.

A Raw file is complete **for OneXray**, not necessarily a standalone CLI configuration: the App adds its platform inbound.

## Ownership at runtime

| Setting | Owner / generation rule |
| --- | --- |
| Actual proxy outbounds, order and dependencies | User; no empty entry slots |
| Routing, balancers, DNS servers and user FakeDNS pools | User; do not assume Smart Routing supplies them |
| `inbounds[tag=tunIn]` | App supplies a missing inbound; for an existing one, only platform-owned settings are merged |
| Other inbounds | User, subject to platform and resource restrictions; do not add another TUN |
| `log`, `metrics`, traffic counters | App; omit generated paths/listeners and statistics policy |
| DNS query strategy | App's IPv6 choice; do not promise a conflicting user value takes effect |
| Asset/certificate paths and TUN file descriptor | App-managed runtime environment |
| Xray outbound interface on Windows/Linux | App's selected interface; cannot be bypassed through Raw JSON |

Saved source and runtime copy are different. Extra user fields are preserved outside the managed areas. A runtime dump can contain local ports, paths and generated settings: do not distribute it unchanged as a portable example.

### Existing `tunIn` is preserved

An existing `tunIn` keeps its array position, other inbound fields and user `sniffing`, including disabled or absent sniffing. For a TUN inbound, OneXray owns only these `settings` keys: `name`, `mtu`, `gateway`, `dns`, `autoSystemRoutingTable`, `autoOutboundsInterface`. Platform values overwrite them; Apple/Android remove the latter four when inapplicable. Other user settings remain intact. A non-SOCKS-adapter runtime expects `protocol: "tun"`.

Windows MSIX and the iOS simulator explicitly adapt this inbound to SOCKS, replacing protocol/listener/SOCKS settings as required while preserving unrelated fields. This is a platform adaptation, not permission to replace every inbound. Only when the entire `tunIn` is missing does the App generate one with default sniffing. Raw has no Advanced Custom template field whitelist.

## Complete VLESS and DNS example

Template only: replace server host, UUID, TLS parameters and port. This example needs no Geodata. It defines the DNS interception and forwarding itself; changing only a root DNS server is not a complete routing design.

{{% json-example "raw-vless-tls.json" %}}

The first outbound is the default proxy path. Tunnel DNS traffic on port 53 is sent to `user-dns`; A/AAAA is handled by Xray DNS; DNS-originated traffic uses the proxy. Non-A/AAAA forwarding uses the DNS outbound's `dialerProxy`. Private destination IPs use direct. App-managed `tunIn` is referenced by routing but intentionally not defined in the input.

Do not add port-53 interception without a DNS outbound, or forward the DNS resolver back into its own interception rule. Browser/application DoH on 443 is not automatically equivalent to ordinary port-53 DNS.

## Multiple paths and a final exit

Each final-exit copy must dial through its corresponding entry. The direction is: device → entry → final exit → destination. The exit outbound's `streamSettings.sockopt.dialerProxy` points to the entry tag, not the reverse.

Template only: supply two actual entries and one final-exit server. The two exit copies share the final server's credentials but have different tags and dependencies.

{{% json-example "raw-chain.json" %}}

The balancer selects full exit tags. Here explicitly matched `example.net` and DNS queries use balancing; unmatched traffic uses the first complete chain. Non-A/AAAA DNS forwarding uses the first exit. `fallbackTag: direct` permits direct fallback and is not a fail-closed design. This is a demonstration of composition, not a promise that every unmatched connection is balanced.

## Validation and dependencies

Saving checks a separate projection through libXray instance construction and close, without starting the instance. It excludes/reduces App-managed resources and retains user protocol/routing/DNS dependencies. Do not interpret this as permission, port-binding or connectivity validation.

For custom DAT dependencies, install the files first through Routing data or use the App's Raw sharing flow with separate Geodata App Links. Root `geodata.assets` is a Custom import contract, not a downloader for plain Raw files. See [dependencies]({{< relref "/docs/configuration/geodata" >}}). Do not embed local filesystem paths or rely on automatic downloads at VPN startup. Account explicitly for other required files/modules.

For advanced Core fields not covered here, consult the [version-matched Xray reference](https://xtls.github.io/config/). It does not override the App ownership table. A newly generated `tunIn` gets FakeDNS recovery when Raw declares a FakeDNS server or pool. An existing inbound keeps the user's sniffing unchanged: configure recovery yourself when required. See [FakeDNS behavior and limitations]({{< relref "/docs/configuration/dns" >}}).

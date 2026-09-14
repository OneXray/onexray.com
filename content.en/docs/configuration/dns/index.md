---
title: "DNS and FakeDNS"
description: "Separate route Local DNS, Raw DNS and system Tunnel DNS; avoid accidental resolver routing."
weight: 40
ai_order: 70
lastmod: 2026-09-14
---

## Three different settings

| Setting | Purpose | Where to change it |
| --- | --- | --- |
| Smart/Custom Local DNS | Resolve domains eligible for direct routing | Route editor; Custom stores `app-dns-direct` |
| Raw JSON DNS | The user's complete DNS and DNS-routing design | Raw JSON `dns`, related outbounds and routing |
| Tunnel DNS | Addresses advertised/applied by the platform tunnel | Advanced → VPN Tunnel; Apple DoT also uses the server name |

Tunnel DNS does not replace the resolver in a route. If an internal domain fails, inspect its route DNS before changing all three Tunnel fields.

## Normal-mode DNS

Proxy DNS is fixed to `8.8.8.8`. Smart/Custom also have a direct DNS address, defaulting to `8.8.8.8`. The servers have separate tags and outbound paths, even when their address is identical.

The direct resolver's domain list is generated only from **pure direct-domain rules**. A rule combining domains with destination IP, port, network, protocol or OS does not add that rule's domains to the list. The direct server is not a general fallback.

For corporate names, create a separate direct-domain rule and use the reachable corporate resolver. Add an appropriate IP route separately if necessary. A rule for `192.168.0.0/16` alone cannot tell DNS how to resolve `printer.corp.example.com`.

Smart Routing's Local DNS switch can disable the domain mapping while retaining the saved address. “All traffic through VPN” instead uses only the proxy DNS and no direct DNS server. It is a different mode, not a Custom file with an unconditional proxy rule.

## Address syntax and prerequisites

Use a Core-supported address string, for example an IP literal, `tcp://192.168.50.53:5353` or a provider's HTTPS DNS URL. The App's Custom format only stores `tag` and `address`; do not split an address into extra unsupported properties.

A direct resolver must be reachable without the selected proxy. A resolver accessible only through a particular proxy path requires a deliberate Raw DNS/routing design. Hostname-based encrypted DNS can also require bootstrap resolution; do not invent `hosts` entries or disable certificate checks to hide a bootstrap problem.

DNS URLs whose scheme ends in `+local` bypass Xray routing and do not receive the required outbound-interface policy. They are rejected at runtime on Windows/Linux. Use a normal routed DNS address instead; do not silently rewrite the user's resolver transport.

## IPv6

Turning the App's IPv6 option off changes managed tunnel parameters and sets DNS querying to `UseIPv4`; on, `UseIP`. Windows MSIX retains its platform-specific tunnel behavior. It does not inject IPv6-blocking rules or remove every user-defined IPv6 path. In Raw, the App manages the root and object-server query strategies, not the user's DNS addresses.

## FakeDNS — development only

Confirm support using [compatibility]({{< relref "/docs/configuration/compatibility" >}}). This is not part of the 26.9.2 baseline documented here.

Smart/Custom's FakeDNS is off by default. Custom enables it through a second server `{"tag":"app-dns-fake","address":"fakedns"}`; keep `app-dns-direct` as well. Do not add root `fakeDns: true` or Custom root `fakedns`.

The App creates pools `198.19.0.0/16` and `fc00:1::/64`, 32768 entries each, and enables FakeDNS recovery on its managed inbound. Direct-domain DNS still uses the real direct resolver. Other eligible A/AAAA queries can return fake IPs; routing can still choose direct, proxy or block. The real DNS path remains for `IPIfNonMatch` resolution.

For Raw, the reviewed implementation detects a `fakedns` DNS server or root pools and enables recovery on `tunIn`; the user's DNS servers and pools remain user-owned. Do not expect older builds to provide this integration.

Fake IPs must reach the tunnel, not a system bypass route. Mappings last only for the current Core instance. After restart, cached fake IPs in browsers or the OS may stop working until DNS is queried again. OneXray does not promise seamless cache recovery or intercept every application-owned DoH/DoT request.

Reference: [Xray DNS](https://xtls.github.io/config/dns.html). Read it together with OneXray's import and ownership contracts.

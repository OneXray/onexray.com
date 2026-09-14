---
title: "VPN Tunnel"
description: "Edit tunnel IPv4/IPv6 DNS and the Apple DoT server name, distinguish local DNS, and select an outbound interface."
weight: 10
ai_order: 120
lastmod: 2026-09-12
---

Open Advanced > VPN Tunnel.

## Managed addresses and DNS

TUN addresses remain read-only. All three tunnel DNS fields are editable, with these defaults:

| Field | Default |
| --- | --- |
| IPv4 DNS | 8.8.8.8 |
| IPv6 DNS | 2001:4860:4860::8888 |
| DNS server name | dns.google |

IPv4/IPv6 DNS must be IP addresses of the corresponding family. The server name is only for Apple DNS over TLS, not a search domain. When DoT is enabled, the addresses and name must belong to the same service and match its TLS certificate.

These platform tunnel values do not replace the local DNS in [Smart Routing]({{< relref "/docs/connect/smart-routing" >}}) or [Custom Routing]({{< relref "/docs/connect/custom-routing" >}}), or change a Raw JSON configuration's own DNS addresses. Internal-name resolution usually requires changing the route's local DNS, not just this page.

Save to apply changes; effective settings affecting an active VPN require reconnecting. Inactive IPv6 or Apple DoT fields are retained without causing a reconnect. Restore defaults changes the draft only and still requires saving.

## IPv6

Use IPv6 has its own section below DNS. When off, Apple/Android and native-TUN configurations omit the managed IPv6 tunnel parameters, while DNS queries use UseIPv4 instead of UseIP. Windows MSIX/VCore keeps its platform-specific handling.

The switch does not add IPv6-blocking rules or strip arbitrary IPv6 addresses from Raw JSON. Do not treat it as a universal IPv6 kill switch.

## Xray outbound interface — Windows and Linux

Open the interface list and select a real network adapter. The current internet adapter is marked for reference, but OneXray does not automatically pick it. Loopback and OneXray's own TUN are excluded.

The choice is saved by name and checked before connecting. If it is missing or no longer available, choose another adapter. There is no automatic fallback or continuous interface monitoring. Raw JSON cannot override this choice.

When connected, changing it uses Save and reconnect. Windows binds Xray to the adapter; it does not add a VCore interface-binding requirement.

## Platform settings

[Apple]({{< relref "/docs/advanced/apple" >}}) · [Android]({{< relref "/docs/advanced/android" >}}) · [Windows]({{< relref "/docs/advanced/windows" >}})

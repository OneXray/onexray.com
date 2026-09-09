---
title: "VPN Tunnel"
description: "Understand managed TUN addresses, Google DNS, IPv6 behavior, and explicit outbound-interface selection."
weight: 10
lastmod: 2026-09-09
---

Open Advanced > VPN Tunnel.

## Managed addresses and DNS

TUN addresses and tunnel DNS are read-only. The DNS section shows IPv4, IPv6, and domain:

| Field | Value |
| --- | --- |
| IPv4 DNS | 8.8.8.8 |
| IPv6 DNS | 2001:4860:4860::8888 |
| Domain | dns.google |

These are managed tunnel values, not a general DNS-server editor. [Smart Routing]({{< relref "/docs/connect/smart-routing" >}}) and All via VPN determine how managed Xray DNS requests are routed.

## IPv6

Use IPv6 has its own section below DNS. When off, Apple/Android and native-TUN configurations omit the managed IPv6 tunnel parameters, while DNS queries use UseIPv4 instead of UseIP. Windows MSIX/VCore keeps its platform-specific handling.

The switch does not add IPv6-blocking rules or strip arbitrary IPv6 addresses from Raw JSON. Do not treat it as a universal IPv6 kill switch.

## Xray outbound interface — Windows and Linux

Open the interface list and select a real network adapter. The current internet adapter is marked for reference, but OneXray does not automatically pick it. Loopback and OneXray's own TUN are excluded.

The choice is saved by name and checked before connecting. If it is missing or no longer available, choose another adapter. There is no automatic fallback or continuous interface monitoring. Raw JSON cannot override this choice.

When connected, changing it uses Save and reconnect. Windows binds Xray to the adapter; it does not add a VCore interface-binding requirement.

## Platform settings

[Apple]({{< relref "/docs/advanced/apple" >}}) · [Android]({{< relref "/docs/advanced/android" >}}) · [Windows]({{< relref "/docs/advanced/windows" >}})

---
title: "Advanced"
description: "Manage platform VPN settings, routing data, update schedules, latency tests, logs, and the generated Xray configuration."
weight: 50
lastmod: 2026-09-12
---

Advanced is the third main tab, with two sub-tabs: **VPN Tunnel** and **Xray**.

## VPN Tunnel

[Shared tunnel settings]({{< relref "/docs/advanced/vpn-tunnel" >}}) show read-only TUN addresses, editable DNS settings, IPv6 behavior, and platform-specific entry points:

- [Apple system VPN]({{< relref "/docs/advanced/apple" >}}): Wi-Fi rules, always-on behavior, traffic capture, and excluded networks.
- [Android system VPN]({{< relref "/docs/advanced/android" >}}): independent include/exclude application lists.
- [Windows]({{< relref "/docs/advanced/windows" >}}): outbound interface and MSIX system VPN policy.
- Windows/Linux: an explicit Xray outbound-interface selection.

Only settings for the current platform and distribution mode are shown.

## Xray

- [Routing data]({{< relref "/docs/advanced/geodata" >}}): default and custom GeoData.
- [Data updates]({{< relref "/docs/advanced/data-updates" >}}): subscription and GeoData schedules.
- [Latency tests]({{< relref "/docs/advanced/latency" >}}): timeout and request URL.
- [Logs and generated configuration]({{< relref "/docs/advanced/logs" >}}): local access/error logs and the actual Xray input.

Changes that affect an active connection use Save and reconnect. Restore defaults changes the draft only; save to apply it. Downloads and tests show their own progress without disabling the entire interface.

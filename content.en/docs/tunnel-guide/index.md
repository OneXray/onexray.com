---
title: "VPN Tunnel by requirement"
description: "Translate platform requirements into exact Tunnel UI settings without inventing importable JSON fields."
weight: -20
ai_order: 100
lastmod: 2026-09-14
---

VPN Tunnel settings are independent of outbound, Custom Routing and Raw JSON. An AI answer should name the platform/package, page, option, value, reason, reconnect requirement and verification step.

First ask whether the user is on iOS, macOS App Store, OneXraySE, Android, Windows EXE/ZIP, Windows MSIX, or Linux. Do not infer the edition from “desktop”.

## Platform decision table

| Requirement | Supported approach | Important boundary |
| --- | --- | --- |
| Resolve internal domains | Route Local DNS + pure direct-domain rule | Not merely Tunnel DNS |
| Change system tunnel DNS | Advanced → VPN Tunnel → DNS addresses | IPv4/IPv6 literals; Apple DoT server name is not a search domain |
| Select outbound adapter | Windows/Linux → VPN Tunnel → Xray outbound interface | Explicit selection by name; Raw cannot override it |
| Only certain applications use VPN | Android system VPN → Only selected apps → application picker | Separate include/exclude lists; not a Custom OS rule |
| Connect/disconnect on named Wi-Fi | Apple system VPN → Always on off → On-demand on → SSID lists | Exact SSIDs, no name in both lists |
| Cellular/Ethernet behavior | Apple on-demand: cellular on iOS, Ethernet on macOS | These are platform-specific controls |
| A subnet bypasses the VPN entirely | Apple Capture all traffic off → excluded networks; Windows MSIX → system VPN exclusions | System routing precedes Xray; do not offer an Apple/MSIX page on EXE or Linux |
| All eligible traffic enters Apple VPN | Capture all traffic | Review exclusions and the network-unavailability warning |

## DNS and IPv6 steps

Open Advanced → VPN Tunnel. TUN interface addresses are read-only. The editable default DNS values are `8.8.8.8`, `2001:4860:4860::8888`, and `dns.google`. The domain is used only for Apple DNS over TLS.

For a custom DoT service, obtain matching IP addresses and certificate name; do not put a DoH URL into the IPv4 field. Leave the domain alone on platforms where it has no effect. Route DNS and Raw DNS remain separate.

Use IPv6 controls managed tunnel configuration and DNS query strategy. It is not a universal IPv6 block. Windows MSIX keeps its specific behavior. Save changes; effective changes to a running tunnel require reconnecting. Restore defaults changes the draft and must be saved.

## Apple Wi-Fi recipe

1. Open Advanced → VPN Tunnel → Apple system VPN.
2. Turn Always on off, then turn On-demand on.
3. Put the user's exact trusted-home SSID in Disconnect VPN on these Wi-Fi networks; put only explicitly requested SSIDs in the connect list.
4. Choose the separate cellular action on iOS or Ethernet action on macOS according to the user's intent.
5. Save and verify after changing networks.

Unlisted Wi-Fi retains current behavior; it does not mean “connect everywhere except home”. Always on uses on-demand rules, not supervised-device Always On VPN or an unbreakable kill switch.

## Android application recipe

Open Android system VPN, choose Only selected apps, then select at least one installed application by name/package. The alternative All except selected apps has a different saved list. Save and reconnect if active. App icons help distinguish similarly named apps. Routing still applies to traffic from the included apps.

Do not substitute `localOS: ["android"]`: that condition applies to all traffic in an Android Core, not a package.

## Windows/Linux interface recipe

Open the Xray outbound interface list and ask the user to select the real internet-facing adapter. “Currently used for internet” is guidance, not an automatic choice. Loopback and OneXray's own TUN are excluded.

The saved name is checked before starting; a missing adapter requires a new selection, not an automatic fallback. Both Windows packages bind Xray; this is not a VCore binding setting. When connected, use Save and reconnect.

## System bypass versus Xray direct

An Xray direct rule still processes traffic inside the VPN before sending it directly. A system excluded route bypasses the tunnel before Xray can see it. If the user needs native LAN discovery or compatibility with another network client, clarify which behavior is needed. Neither choice automatically creates split DNS.

On Apple, excluded networks are active only with Capture all traffic off. The four exclusion toggles appear only with full capture on. Keep defaults unless a specific requirement warrants a change; inappropriate settings can make the network unavailable.

Read the detailed [Apple]({{< relref "/docs/advanced/apple" >}}), [Android]({{< relref "/docs/advanced/android" >}}), [Windows]({{< relref "/docs/advanced/windows" >}}) and [common Tunnel]({{< relref "/docs/advanced/vpn-tunnel" >}}) pages for the chosen platform.

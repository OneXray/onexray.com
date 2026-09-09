---
title: "Apple system VPN"
description: "Configure always-on and Wi-Fi on-demand VPN, separate cellular or Ethernet actions, and traffic-capture exclusions."
weight: 20
lastmod: 2026-09-09
---

Open Advanced > VPN Tunnel > Apple system VPN. Availability follows the installed Apple OS and app edition.

## Always on and on demand

Always on is off by default. Turning it on asks the system to connect on available networks. This uses Apple's on-demand mechanism; it is not the supervised-device Always On VPN feature or a guarantee that traffic can never leave without a VPN.

With Always on off, the On-demand controls become available. On-demand is also off by default.

Wi-Fi rules have two separate lists:

- Connect VPN when connected to these Wi-Fi networks.
- Disconnect VPN when connected to these Wi-Fi networks.

Enter exact SSID names. A name cannot belong to both lists. Unlisted Wi-Fi networks keep the current connection behavior rather than implicitly joining either list.

iOS adds a separate cellular action; macOS adds an Ethernet action. Choose connect or disconnect for that network type. Save the settings to apply the policy.

## Capture all traffic

Off by default. Turning it on reveals four exclusion options, each on by default where supported:

- Local networks
- Cellular services
- Apple push notifications
- Communication with connected Apple devices

These are system-level exceptions, separate from Xray routing rules. An unsuitable combination can make the network unavailable or disrupt local services. Keep the defaults unless you understand the intended change.

## Tunnel DNS over TLS

Apple tunnel settings also provide DNS over TLS using the managed dns.google server name. This is a platform DNS option, separate from choosing direct or proxy rules in Xray.

## macOS editions and quitting

Mac App Store uses Packet Tunnel. OneXraySE uses a System Extension and does not provide the Xray file-log section.

Closing the main window hides it. Quit exits the app without stopping the system VPN; Quit and Stop VPN disconnects first. Use the latter when you want the tunnel stopped, including its on-demand behavior.

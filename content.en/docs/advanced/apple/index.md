---
title: "Apple system VPN"
description: "Configure always-on and Wi-Fi on-demand VPN, separate cellular or Ethernet actions, and traffic-capture exclusions."
weight: 20
ai_order: 130
lastmod: 2026-09-12
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

## Networks that bypass VPN

With Capture all traffic off, open the network-list page and add IPv4/IPv6 CIDRs, such as `192.168.50.0/24`. The default list is empty; private networks are not automatically added. The system routes listed networks outside VPN, before Xray rules apply.

Turning full capture back on preserves the list but disables it. Turning IPv6 off similarly retains IPv6 entries without applying them. Save changes to the effective list and reconnect an active VPN.

Excluded networks do not change DNS automatically or provide automatic enterprise split DNS. For internal names, also configure the [route's local DNS]({{< relref "/docs/connect/smart-routing" >}}).

## Tunnel DNS over TLS

Apple tunnel settings provide DNS over TLS. Edit DNS addresses and the server name under [VPN Tunnel]({{< relref "/docs/advanced/vpn-tunnel" >}}); the default name is `dns.google`. Addresses, name, and the service's TLS certificate must match. This platform setting does not replace Xray's local/proxy DNS.

## macOS editions and quitting

Mac App Store uses Packet Tunnel. OneXraySE uses a System Extension and does not provide the Xray file-log section.

Closing the main window hides it. Quit exits the app without stopping the system VPN; Quit and Stop VPN disconnects first. Use the latter when you want the tunnel stopped, including its on-demand behavior.

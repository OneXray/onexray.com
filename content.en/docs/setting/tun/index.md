---
title: TUN Settings
weight: 1
---

TUN Settings apply to every Home configuration and control the platform tunnel.

# DNS

TUN DNS contains one IPv4 and one IPv6 address, without ports.

- The platform tunnel uses these addresses for system DNS traffic.
- Simple Profile shows the IPv4 value as its read-only default `tcp://` DNS server.
- New custom Xray Profiles and Full Configs initialize their first DNS server from the IPv4 value.
- At runtime, DNS `queryStrategy` is forced to `UseIP` when IPv6 is enabled and `UseIPv4` when it is disabled.

# IPv6

The IPv6 switch controls the TUN IPv6 route, DNS query strategy, and whether the IPv6 FakeDNS pool is written. It replaces the old per-DNS `UseIP / UseIPv4 / UseIPv6` controls.

# Apple Network Routing

These switches configure `NETunnelProviderProtocol` and are separate from Xray Profile routing rules:

| Setting | Default | Availability | Behavior |
| --- | --- | --- | --- |
| `includeAllNetworks` | Off | iOS 14.0+ / macOS 10.15+ | Routes most network traffic through the VPN. |
| `excludeLocalNetworks` | On | iOS 14.2+ / macOS 10.15+ | Keeps local-network traffic outside the VPN. |
| `excludeCellularServices` | On | iOS 16.4+ / macOS 13.3+ | Excludes supported cellular-service traffic. |
| `excludeAPNs` | On | iOS 16.4+ / macOS 13.3+ | Excludes Apple Push Notification service traffic. |
| `excludeDeviceCommunication` | On | iOS 17.4+ / macOS 14.4+ | Excludes communication with connected Apple devices. |

The four exclude switches are shown only when `includeAllNetworks` is enabled. Use them carefully: changing system-route ownership can affect local discovery, iMessage/push delivery, and device communication. Changes do not affect an already running VPN until it is restarted; OneXray offers to restart after saving while connected.

# DNS over TLS

DNS over TLS is available on iOS and macOS. When enabled, the platform uses the configured server name and the profile's `dnsDoT` rule can route port 853 traffic.

# Metrics

Metrics enables runtime policy/stats/metrics fields and the Home traffic counters. When disabled, these sections are removed from the Final Config.

# Network Interface

Windows and Linux can select `auto` or a specific outbound network interface. OneXray writes the resolved choice to TUN route fields and prevents the Core's own traffic from being routed back into the TUN device.

# On Demand

iOS and macOS support ordered on-demand rules based on network interface type and Wi-Fi SSID.

# Per-App VPN

Android supports allow-list and deny-list modes. Selected Apps and Installed Apps are managed from the Per-App VPN section. An empty list follows the current mode's normal all-app behavior.

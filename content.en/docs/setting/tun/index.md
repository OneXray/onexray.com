---
title: TUN Settings
weight: 1
---

TUN Settings control the platform tunnel and network-interface behavior used by all configurations.

# TUN

A TUN device is a virtual network interface. When the VPN starts, the platform creates or activates a tunnel and routes traffic through Xray-core.

## DNS

TUN DNS contains one IPv4 address and one IPv6 address. They are plain IP addresses without ports.

At startup, these addresses are applied to the tunnel. System DNS queries then enter Xray-core and are handled by routing and DNS outbound rules.

These DNS addresses also affect how the platform resolves proxy server domain names before Xray Profile DNS is available.

## DNS over TLS

DNS over TLS is available on iOS and macOS. When enabled, DoT traffic can be handled by the `dnsDoT` routing rule.

Using DoT can reduce memory pressure on some iOS packet tunnel setups.

## Priority

Priority is Linux-only. It controls the metric of default routes added for the OneXray TUN device.

Example equivalent behavior:

```shell
sudo ip route add default dev OneXrayTun metric 20
sudo ip -6 route add default dev OneXrayTun metric 20
```

## Network Interface

Network interface selection is available on Linux and Windows.

When interface fixing is enabled, OneXray can write the selected interface into outbound socket options and TUN inbound `autoOutboundsInterface`. This helps keep proxy traffic on the expected physical adapter.

## Metrics

Metrics controls whether OneXray writes Xray traffic statistics into runtime configs and reads traffic counters for the Home connection summary.

When metrics are disabled, OneXray does not write `policy`, `stats`, or `metrics` into the generated runtime Xray JSON.

# On Demand

On-demand rules are available on iOS and macOS. They let the system decide whether to activate the VPN for selected network conditions.

# Per-App VPN

Per-app VPN is available on Android. If no app is selected, all apps use the VPN. If apps are selected, only selected apps use the VPN.

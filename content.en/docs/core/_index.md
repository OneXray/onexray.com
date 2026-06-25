---
title: Core
weight: 4
---

Core contains settings that directly affect Xray-core, the platform tunnel, rule data, and diagnostics.

| Page | Purpose |
| --- | --- |
| TUN | Platform tunnel options, DNS addresses, interface binding, metrics, on-demand rules, and per-app VPN. |
| Ping | URL, timeout, and behavior used by node tests. |
| Logs | App logs, Xray logs, and generated Xray config files. |
| Xray Settings | Structured Xray-core configuration, including Simple Setting and advanced UI editing. |
| GeoData | Built-in and custom rule-set data used by `geosite:` and `geoip:` rules. |

The enhanced routing templates are no longer imported from inside the app. Use the [Routing]({{< relref path="../routing/index.md" lang="en" >}}) page to copy the current JSON templates into Xray Settings.

Related pages:

- [TUN Setting]({{< relref path="../setting/tun/index.md" lang="en" >}})
- [Ping]({{< relref path="../setting/ping/index.md" lang="en" >}})
- [Log]({{< relref path="../setting/log/index.md" lang="en" >}})
- [Xray Setting]({{< relref path="../home/outbound/xraySetting/index.md" lang="en" >}})
- [GeoData]({{< relref path="../setting/geoData/index.md" lang="en" >}})

---
title: Core
weight: 4
---

Core contains the settings and diagnostics that directly affect Xray-core.

| Section | Purpose |
| --- | --- |
| Network | TUN Settings and Ping behavior. |
| Data | Xray Profiles, GeoData, and enhanced routing templates. |
| Logs | Live access/error logs and the generated Final Config. |

Release builds run through the platform TUN/VPN integration. The old user-facing TUN/Proxy selector and local SOCKS/HTTP inbounds have been removed.

Access and error logs are opened directly from the Logs section. The viewer initially reads the latest part of a large file and follows new lines without loading the entire log into memory. The generated Xray config viewer supports text selection and copying.

Related pages:

- [TUN Settings]({{< relref path="../setting/tun/index.md" lang="en" >}})
- [Ping]({{< relref path="../setting/ping/index.md" lang="en" >}})
- [Logs]({{< relref path="../setting/log/index.md" lang="en" >}})
- [Xray Profile]({{< relref path="../home/outbound/xrayProfile/index.md" lang="en" >}})
- [GeoData]({{< relref path="../setting/geoData/index.md" lang="en" >}})

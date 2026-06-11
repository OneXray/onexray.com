---
title: GeoData
weight: 3
---

GeoData provides rule-set files used by Xray-core expressions such as:

```text
geosite:CN
geoip:CN
```

OneXray has two built-in GeoData files:

| Name | Type | Source |
| --- | --- | --- |
| `geosite` | `domain` | `v2fly/domain-list-community` latest `dlc.dat` |
| `geoip` | `ip` | `v2fly/geoip` latest `geoip.dat` |

# Custom GeoData

Custom rule sets require:

| Field | Meaning |
| --- | --- |
| Name | Unique name. It becomes the file base name and rule prefix target. |
| Type | `domain` for geosite-style data or `ip` for geoip-style data. |
| URL | Download URL for the `.dat` file. |

When a custom rule set is added or updated, OneXray downloads the `.dat` file, asks the host core API to count categories and rules, saves the `.dat` file, and saves a generated JSON summary.

# Auto Update

GeoData auto update is configured on [Subscription Update]({{< relref path="../subUpdate/index.md" lang="en" >}}). System GeoData and custom GeoData are checked separately from subscription refresh but run from the same Home-page update service.

# Sharing and Backup

Custom GeoData can be shared with OneXray URL Scheme:

```text
onexray://onexray.com/dat/add?type=domain&url=https%3A%2F%2Fexample.com%2Fcustom.dat#custom
onexray://onexray.com/dat/add?type=ip&url=https%3A%2F%2Fexample.com%2Fcustom.dat#custom
```

When an Xray Setting references custom GeoData, OneXray share output includes the needed GeoData links before the config link.

# iOS and iPadOS

Very large rule-set files can increase memory usage. If the VPN fails to start on iOS or iPadOS, use smaller GeoData files or fewer routing rules.

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

GeoData auto update is configured on [Auto Update]({{< relref path="../subUpdate/index.md" lang="en" >}}). System GeoData and custom GeoData are checked separately from subscription refresh but run from the same update service.

# Sharing and Backup

GeoData is no longer shared as a standalone app link. For full migration, use [Backup and Restore]({{< relref path="../backup/index.md" lang="en" >}}), which includes custom GeoData database rows, `.dat` files, and generated `.json` summaries.

Routing templates can still reference custom GeoData with `ext:<Name>.dat:<Code>`. Add the required custom GeoData manually before importing those templates into Xray Settings.

# iOS and iPadOS

Very large rule-set files can increase memory usage. If the VPN fails to start on iOS or iPadOS, use smaller GeoData files or fewer routing rules.

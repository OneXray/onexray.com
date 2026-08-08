---
title: GeoData
weight: 3
---

GeoData предоставляет rule-set files для Xray-core expressions:

```text
geosite:CN
geoip:CN
```

OneXray содержит два built-in GeoData files:

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

GeoData auto update is configured on [Auto Update]({{< relref path="../subUpdate/index.md" lang="ru" >}}). System GeoData and custom GeoData are checked separately from subscription refresh but run from the same update service.

# Sharing and Backup

Custom GeoData можно передать как `onexray://` link с типом и HTTPS URL. Приложение получателя скачивает и проверяет `.dat`; сам файл в ссылку не встраивается.

Если shared Outbound, Xray Profile, Full Config или Raw Json использует `ext:<Name>.dat:<Code>`, OneXray помещает соответствующие GeoData links перед config link.

Для полного offline migration используйте [Backup and Restore]({{< relref path="../backup/index.md" lang="ru" >}}), который включает записи custom GeoData, `.dat` и generated `.json` summaries.

# iOS and iPadOS

Very large rule-set files can increase memory usage. If the VPN fails to start on iOS or iPadOS, use smaller GeoData files or fewer routing rules.

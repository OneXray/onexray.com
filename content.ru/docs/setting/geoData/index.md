---
title: GeoData
weight: 3
---

GeoData предоставляет rule-set files для Xray-core expressions:

```text
geosite:CN
geoip:CN
```

OneXray имеет два встроенных GeoData файла:

| Name | Type | Source |
| --- | --- | --- |
| `geosite` | `domain` | latest `dlc.dat` из `v2fly/domain-list-community` |
| `geoip` | `ip` | latest `geoip.dat` из `v2fly/geoip` |

# Custom GeoData

Custom rule sets требуют:

| Поле | Значение |
| --- | --- |
| Name | Уникальное имя. Оно становится base name файла и целью rule prefix. |
| Type | `domain` для geosite-style data или `ip` для geoip-style data. |
| URL | Download URL для `.dat` file. |

Когда custom rule set добавляется или обновляется, OneXray загружает `.dat` file, вызывает host core API для подсчета categories и rules, сохраняет `.dat` file и generated JSON summary.

# Auto Update

GeoData auto update настраивается в [Subscription Update]({{< relref path="../subUpdate/index.md" lang="ru" >}}). System GeoData и custom GeoData проверяются отдельно от subscription refresh, но выполняются тем же Home-page update service.

# Sharing and Backup

Custom GeoData можно шарить через OneXray URL Scheme:

```text
onexray://onexray.com/dat/add?type=domain&url=https%3A%2F%2Fexample.com%2Fcustom.dat#custom
onexray://onexray.com/dat/add?type=ip&url=https%3A%2F%2Fexample.com%2Fcustom.dat#custom
```

Когда Xray Setting ссылается на custom GeoData, OneXray share output включает нужные GeoData links перед config link.

# iOS и iPadOS

Очень большие rule-set files могут увеличить потребление памяти. Если VPN не запускается на iOS или iPadOS, используйте меньшие GeoData files или меньше routing rules.

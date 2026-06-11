---
title: Sharing
weight: 2
---

OneXray может делиться конфигами как QR codes, text links или через системный share target.

Поддерживаемые объекты:

| Type | Share format |
| --- | --- |
| Outbound nodes | Standard Xray share links, если возможно; OneXray URL Scheme для app-native data. |
| Xray Setting | OneXray URL Scheme с Base64 config data. |
| Raw Config | OneXray URL Scheme с Base64 raw JSON. |
| Subscriptions | OneXray subscription link wrapper. |
| GeoData | OneXray GeoData link. |

# Common Protocol

Outbound nodes используют common Xray share-link formats через libXray, если возможно.

Subscriptions также можно делить как обычные `https://` URLs.

# OneXray URL Scheme

OneXray URL Scheme — native format для app-to-app import, backup, restore, CLI import и AI automation.

Основные paths:

```text
onexray://onexray.com/config/add?type=setting&data=<base64>#<name>
onexray://onexray.com/config/add?type=outbound&data=<base64>#<name>
onexray://onexray.com/config/add?type=raw&data=<base64>#<name>
onexray://onexray.com/sub/add?url=<url>#<name>
onexray://onexray.com/dat/add?type=domain&url=<url>#<name>
onexray://onexray.com/dat/add?type=ip&url=<url>#<name>
```

Когда Xray Setting ссылается на custom GeoData files, OneXray добавляет нужные GeoData links перед config link.

Точная семантика полей описана на странице [Develop]({{< relref path="../develop/index.md" lang="ru" >}}).

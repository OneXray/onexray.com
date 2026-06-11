---
title: Share
weight: 2
---

OneXray can share configs as QR codes, text links, or app share targets.

Supported share targets:

| Type | Share format |
| --- | --- |
| Outbound nodes | Standard Xray share links when possible; OneXray URL Scheme for app-native data. |
| Xray Setting | OneXray URL Scheme with Base64 config data. |
| Raw Config | OneXray URL Scheme with Base64 raw JSON. |
| Subscriptions | OneXray subscription link wrapper. |
| GeoData | OneXray GeoData link. |

# Common Protocol

Outbound nodes use common Xray share-link formats through libXray when possible.

Subscriptions can also be shared as plain `https://` URLs.

# OneXray URL Scheme

OneXray URL Scheme is the native format for app-to-app import, backup, restore, CLI import, and AI automation.

Main paths:

```text
onexray://onexray.com/config/add?type=setting&data=<base64>#<name>
onexray://onexray.com/config/add?type=outbound&data=<base64>#<name>
onexray://onexray.com/config/add?type=raw&data=<base64>#<name>
onexray://onexray.com/sub/add?url=<url>#<name>
onexray://onexray.com/dat/add?type=domain&url=<url>#<name>
onexray://onexray.com/dat/add?type=ip&url=<url>#<name>
```

When sharing an Xray Setting that references custom GeoData files, OneXray includes the required GeoData links before the config link.

See [Develop]({{< relref path="../develop/index.md" lang="en" >}}) for exact field semantics.

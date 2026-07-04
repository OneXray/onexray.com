---
title: Add and Import
weight: 1
---

Use the add menu on the Home page to create local nodes, add subscriptions, scan QR codes, pick files, pick images, or read text from the clipboard.

# Manual Input

Manual input открывает submenu. Выберите `Outbound`, чтобы создать structured local outbound node, `Full Config`, чтобы создать structured local node with custom outbounds and routing, или `Raw Json`, чтобы создать local full Xray JSON config.

Outbound editor записывает single outbound node. Full Config editor записывает structured node-level config. Raw Json editor записывает full JSON config. Все три варианта появляются в группе Home `Local`.

# Subscription Link

Subscription input creates a subscription row and immediately downloads it. The subscription name is read from the URL fragment when available. Empty names become `anonymous`.

Example:

```text
https://example.com/sub.txt#MySubscription
```

Subscriptions only import outbound nodes.

# Supported Import Text

OneXray classifies imported text by the first valid format it can read.

| Input | Behavior |
| --- | --- |
| `https://...` | Parsed as a subscription URL. |
| Xray share links | Parsed by libXray and imported as outbound nodes. |
| Multi-line share text | Multiple outbound nodes can be imported at once when libXray supports the content. |
| Clash.Meta YAML | Parsed by libXray when supported by the bundled core API. |
| Xray JSON | Parsed by libXray when supported by the bundled core API, but only outbound nodes are imported. |

The generic import pipeline does not create Full Config, Raw Json, Xray Profile, or GeoData records.

## Scan QRCode

The QR scan page reads camera QR codes. It is intended for short node links and HTTPS subscription URLs.

Long links can reduce QR recognition reliability. For long content, use text or file import.

## Pick Image

Image import supports common QR image files such as `png`, `jpg`, and `jpeg`.

## Pick File

File import supports:

| Extension | Handling |
| --- | --- |
| `png`, `jpg`, `jpeg` | Decode QR code from image. |
| `txt`, `json`, `yaml`, `yml` | Read file as text and import it. |

## Read Clipboard

Clipboard import reads plain text and passes it through the same import pipeline.

# Import Scope

Import выполняется через UI приложения. Используйте clipboard, file, image или QR scan import из add menu.

Imported subscriptions и share text создают только outbound nodes. Full Config можно создать через `Manual Input > Full Config`; Raw Json можно создать через `Manual Input > Raw Json`; Xray Profile и GeoData управляются со своих страниц.

---
title: Add and Import
weight: 1
---

Use the add menu on the Home page to create local nodes, add subscriptions, scan QR codes, pick files, pick images, or read text from the clipboard.

# Manual Input

Manual input opens a submenu. Choose `Outbound` to create a structured local outbound node, or choose `Raw Json` to create a local full Xray JSON config.

The outbound editor writes a single outbound node. The Raw Json editor writes a full JSON config. Both appear under the Home `Local` group, and at runtime OneXray assigns the active node the reserved `proxy` tag.

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

The generic import pipeline does not create Raw Json, Xray Setting, or GeoData records.

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

Import is an app UI workflow. Use clipboard, file, image, or QR scan import from the add menu.

Imported subscriptions and share text only create outbound nodes. Raw Json can be created from `Manual Input > Raw Json`; Xray Setting and GeoData are managed from their own pages.

---
title: Add and Import
weight: 1
---

Use the add menu on the Home page to create local nodes, add subscriptions, scan QR codes, pick files, pick images, or read text from the clipboard.

# Input

## Manual Input

Manual input opens the outbound editor. Use it when you want to create a local node directly in OneXray.

The outbound editor writes a single outbound node. At runtime OneXray assigns the active node the reserved `proxy` tag.

## Subscription Link

Subscription input creates a subscription row and immediately downloads it. The subscription name is read from the URL fragment when available. Empty names become `anonymous`.

Example:

```text
https://example.com/sub.txt#MySubscription
```

# Supported Import Text

OneXray classifies imported text by the first valid format it can read.

| Input | Behavior |
| --- | --- |
| `onexray://onexray.com/...` | Parsed as OneXray URL Scheme. Can import subscriptions, configs, and rule sets. |
| `https://...` | Parsed as a subscription URL. |
| Xray share links | Parsed by libXray and imported as outbound nodes. |
| Subscription text | Multiple share links can be imported at once. |
| Clash.Meta YAML | Parsed by libXray when supported by the bundled core API. |
| Xray JSON | Parsed by libXray when supported by the bundled core API. |

For the exact OneXray URL Scheme, see [Develop]({{< relref path="../../develop/index.md" lang="en" >}}).

## Scan QRCode

The QR scan page reads camera QR codes. It is intended for short node links and OneXray links.

Long links can reduce QR recognition reliability. For long XHTTP or complete setting payloads, use text, file, or URL Scheme.

## Pick Image

Image import supports common QR image files such as `png`, `jpg`, and `jpeg`.

## Pick File

File import supports:

| Extension | Handling |
| --- | --- |
| `png`, `jpg`, `jpeg` | Decode QR code from image. |
| `txt`, `json`, `yaml` | Read file as text and import it. |

## Read Clipboard

Clipboard import reads plain text and passes it through the same import pipeline.

# AI and CLI Import

Automation tools should use the desktop CLI when available:

```shell
onexray import --file /path/to/import.txt
onexray import --text 'vless://...'
cat import.txt | onexray import --file -
```

The app must be running because the CLI sends the import request to the local Automation API.

CLI import accepts the same text formats listed above: OneXray URL Scheme, HTTPS subscription URL, Xray share links, multi-line share text, Clash.Meta YAML, and Xray JSON. `--file -` reads text from stdin. QR images are imported from the app UI.

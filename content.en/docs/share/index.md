---
title: Share
weight: 2
---

OneXray supports interoperable formats and its proprietary `onexray://` URL scheme.

| Type | Share format |
| --- | --- |
| Outbound | Standard Xray share text/QR code when supported by libXray, or a OneXray Link. |
| Subscription | HTTPS URL or a OneXray Link. |
| Full Config | OneXray Link or JSON text/file. |
| Raw Json | OneXray Link or JSON text/file. |
| Xray Profile | OneXray Link or JSON text/file. |
| GeoData | OneXray Link or Backup. |

# OneXray URL Scheme

OneXray Links preserve OneXray-specific config types that standard Xray links cannot represent:

```text
onexray://onexray.com/config/add?type=outbound|profile|full|raw&data=<percent-encoded-base64-json>#Name
onexray://onexray.com/sub/add?url=<percent-encoded-https-url>[&age=x25519|hybrid]#Name
onexray://onexray.com/dat/add?type=domain|ip&url=<percent-encoded-https-url>#Name
```

Only the types above are accepted. Legacy `type=setting`, backup archives, and other commands are not supported.

An age-encrypted subscription link carries only the key type, never the sender's key pair. The receiving app generates a new local key pair, sends its public key on the first subscription request, and stores the pair only after a successful import.

When a shared config references custom GeoData available in OneXray, matching GeoData links are placed before the config link so they are imported first.

# Platform Registration

Android, iOS, and installed macOS apps register `onexray://` directly. Windows EXE/winget and Linux DEB packages also register it; Windows/Linux ZIP packages do not.

The Mac App Store build and OneXraySE register the same scheme. If both are installed, macOS may open either app.

# Import Decision

1. If trimmed text starts with `onexray://`, OneXray parses each valid OneXray Link.
2. If it starts with `https://`, OneXray treats it as subscription input and accepts one HTTPS link per line.
3. Otherwise, libXray parses the content as outbound share text.

Subscription URL fragments are used as names and removed before storage. Text files support `txt`, `json`, `yaml`, and `yml`; QR images support `png`, `jpg`, and `jpeg`.

Generic HTTPS/share-text import creates only subscriptions and outbound nodes. Full Config, Raw Json, Xray Profile, and GeoData require their corresponding OneXray Link or their dedicated import flow.

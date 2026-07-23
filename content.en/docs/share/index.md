---
title: Share
weight: 2
---

OneXray uses standard formats rather than a private app link format.

| Type | Share format |
| --- | --- |
| Outbound | Standard Xray share text and QR code when supported by libXray. |
| Subscription | HTTPS URL. |
| Raw Json | JSON text or `.json` file. |
| Xray Profile | JSON text or `.json` file. |
| GeoData | Use Backup for migration. |

# Import Decision

1. If trimmed text starts with `https://`, OneXray treats it as subscription input and accepts one HTTPS link per line.
2. Otherwise, libXray parses the content as outbound share text.

Subscription URL fragments are used as names and removed before storage. Text files support `txt`, `json`, `yaml`, and `yml`; QR images support `png`, `jpg`, and `jpeg`.

Generic import creates only subscriptions and outbound nodes. Raw Json and Xray Profile exports are intended for manual editing or backup and must be created from their own app pages.

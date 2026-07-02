---
title: Share
weight: 2
---

OneXray shares data with common formats instead of a legacy private import format.

| Type | Share format |
| --- | --- |
| Outbound nodes | Standard Xray share link text and QR code when supported by libXray. |
| Subscriptions | Plain HTTPS subscription URL. |
| Raw Json | JSON text and a `.json` file. |
| Xray Setting | JSON text and a `.json` file. |
| GeoData | Not shared separately. Use Backup for full migration. |

# Import

Imported text is classified by the running app:

| Input | Behavior |
| --- | --- |
| `https://...` | Adds a subscription and refreshes it. |
| Standard Xray share text | Imports outbound nodes through libXray. |
| Other text | Fails with no valid config if libXray cannot read outbound nodes from it. |

QR image import supports `png`, `jpg`, and `jpeg`. Text file import supports `txt`, `json`, `yaml`, and `yml`; those files still pass through the same text import rules.

# Raw Json and Xray Setting

Raw Json and Xray Setting can be exported from their menus as JSON text or JSON files. They are intended for manual copy, external editing, or backup workflows.

They are not imported through the generic share/import pipeline as app-native records. To create Raw Json inside OneXray, use `Home > Add > Manual Input > Raw Json`. To create Xray Setting, use the relevant Core page.

# Backup

Use [Backup and Restore]({{< relref path="../setting/backup/index.md" lang="en" >}}) when you need a complete migration that includes local configs, subscriptions, and custom GeoData files.

---
title: Subscriptions
weight: 3
---

Subscriptions are remote sources of outbound nodes.

# Supported Content

OneXray parses supported Xray share links, Clash / Mihomo YAML, and Xray JSON through libXray. Only valid outbound nodes are stored.

Subscriptions never create Full Config, Raw Json, Xray Profile, GeoData, DNS, routing, inbound, log, policy, stats, or metrics records.

# Adding and Batch Import

The dedicated add page accepts one HTTPS URL. Generic text/file/pasteboard import can add multiple subscriptions when the trimmed text starts with `https://` and each link is on its own line.

URL fragments provide initial names but are removed before storage:

```text
https://example.com/sub#Work
```

The saved URL is `https://example.com/sub`; the name is `Work`. Downloads use a 60-second receive timeout.

# List Behavior

A subscription can be opened, refreshed, pinged, shared, edited, cleaned, or deleted. Its node page reuses the Home list and search behavior but does not change the active Home node when a card is clicked.

Bulk import skips the automatic ping queue to keep large imports responsive. Single imports and normal refresh operations can still schedule node ping.

# Backup Restore

Backups store subscription source records, not downloaded subscription node rows. Restore recreates each source and downloads its nodes again.

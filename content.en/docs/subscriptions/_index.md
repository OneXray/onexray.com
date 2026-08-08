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

# Age-Encrypted Subscriptions

Use **Encryption** only when the subscription provider supports age encryption. Leave both key fields empty for ordinary subscriptions.

OneXray can accept an existing key pair or generate either:

- X25519
- Mihomo-compatible Hybrid (`ML-KEM-768 + X25519`)

For every initial download and refresh, OneXray sends the saved public recipient in the `X-Age-Public-Key` header. The secret key stays on the device and decrypts the response locally. The same pair is reused until it is replaced or cleared, and HTTPS remains required.

The decrypted subscription is limited to 16 MiB. Replacing the pair prevents the new secret key from decrypting responses encrypted for the previous public key.

# List Behavior

A subscription can be opened, refreshed, pinged, shared, edited, cleaned, or deleted. Its node page reuses the Home list and search behavior but does not change the active Home node when a card is clicked.

Bulk import skips the automatic ping queue to keep large imports responsive. Single imports and normal refresh operations can still schedule node ping.

# Backup Restore

Backups store subscription source records, including age key pairs, but not downloaded subscription node rows. Restore recreates each source and downloads its nodes again.

Backup ZIP files are not encrypted. Treat them as sensitive because they may contain subscription URLs and age secret keys.

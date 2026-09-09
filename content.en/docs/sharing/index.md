---
title: "Import and sharing formats"
description: "Understand standard share links, OneXray URLs, complete JSON, and GeoData dependencies without sharing private age keys."
weight: 70
lastmod: 2026-09-09
---

## Choose the right format

| Item | Format |
| --- | --- |
| Server | Supported protocol share link, node JSON, or OneXray link |
| Subscription | HTTPS URL or OneXray link |
| Custom Routing | Complete route JSON or OneXray link |
| Raw JSON | Complete configuration JSON or OneXray link |
| Custom GeoData | File name/type and HTTPS source link |

Standard protocol links cannot represent every Xray outbound field. Use complete node JSON or the OneXray format when preserving those fields matters.

Server import extracts nodes only. Complete configuration import belongs in Custom Routing or Raw JSON. There is no App backup archive workflow.

## OneXray links

```text
onexray://onexray.com/config/add?type=outbound|raw|custom&data=<percent-encoded-base64-json>#Name
onexray://onexray.com/sub/add?url=<percent-encoded-https-url>&age=x25519|hybrid#Name
onexray://onexray.com/dat/add?type=domain|ip&url=<percent-encoded-https-url>#Name
```

Choose one value wherever alternatives are shown; omit age for an unencrypted subscription. The fragment supplies a display name. Retired profile/full/setting configuration types are not supported.

age links include only the algorithm. The receiving device generates new keys; your existing private or public key is not shared.

## Route dependencies

A complete shared configuration may declare custom data:

```json
{
  "geodata": {
    "assets": [
      {"file": "other.dat", "url": "https://example.com/other.dat"}
    ]
  }
}
```

This is a dependency fragment, not a complete runnable configuration. Replace the example URL with your source.

Default geoip.dat and geosite.dat are omitted. A custom route exports only empty entry slots, not direct/block outbound definitions. Import validates dependencies, rejects file-name conflicts, and removes the import-only geodata field before storage.

## Opening links

Installed mobile/macOS apps, Windows EXE/MSIX, and Linux DEB register onexray://. Windows/Linux ZIP does not register it automatically; use clipboard/file import instead. When multiple Mac editions are installed, the OS chooses the link handler.

Sharing can expose credentials and URL tokens. Review the content first. Complete configurations and dependencies retain a confirmation flow even though ordinary node imports no longer have a second preview.

---
title: Add and Import
weight: 1
---

Use the Home add menu to create local nodes, add subscription links, scan QR codes, pick images or files, and read the pasteboard.

# Manual Input

`Manual Input` contains:

| Item | Result |
| --- | --- |
| Outbound | Creates one structured local outbound node. |
| Full Config | Creates a structured local node with outbounds, routing, and DNS. |
| Raw Json | Creates an advanced local Xray JSON config. |

All three are shown in the Home `Local` group.

# HTTPS Subscription Links

Text whose trimmed content starts with `https://` is treated as subscription input. Batch import accepts one HTTPS link per line.

```text
https://example.com/first#First
https://example.com/second#Second
```

The URL fragment is decoded as the initial subscription name and removed before the URL is saved. An empty name becomes `anonymous`. Invalid lines are skipped. Downloads use a 60-second receive timeout.

To import share links instead, the first non-whitespace content must not start with `https://`.

# Other Supported Text

Other text is parsed by libXray and imports outbound nodes only:

- Xray share links, including multi-line share text
- Clash / Mihomo YAML supported by libXray
- Xray JSON supported by libXray

Generic import does not create Full Config, Raw Json, Xray Profile, or GeoData records. Parsed outbounds are not passed through the manual-save Xray config test.

# QR, Image, File, and Pasteboard

| Entry | Supported input |
| --- | --- |
| Scan QR Code | Camera QR content. |
| Pick Image | `png`, `jpg`, `jpeg`. |
| Pick File | `txt`, `json`, `yaml`, `yml`, or the image formats above. |
| Read Pasteboard | Plain text passed through the same import decision order. |

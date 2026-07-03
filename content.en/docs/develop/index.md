---
title: Develop
weight: 4
---

This page documents import behavior and runtime data semantics for advanced users and integrations.

# Import Decision Order

When OneXray receives import text from the app UI, it uses this order:

1. Text starting with `https://` is treated as a subscription URL.
2. Other text is parsed as outbound share content by libXray.

The import pipeline no longer handles legacy private import text, GeoData import payloads, Raw Json records, or Xray Profile records.

# Supported Import Text

| Format | Result |
| --- | --- |
| HTTPS subscription URL | Adds a subscription row, refreshes the URL, and imports outbound nodes. |
| Standard Xray share link | Imports outbound nodes through libXray. |
| Multi-line Xray share text | Imports multiple outbound nodes when libXray can parse them. |
| Clash.Meta YAML | Imports outbound nodes when supported by the bundled libXray API. |
| Xray JSON | Imports outbound nodes when supported by the bundled libXray API. |

Subscriptions are outbound-only. They do not create Raw Json, Xray Profile, GeoData, DNS, routing, inbounds, policy, stats, metrics, or logs.

Raw Json and Xray Profile can still be exported as JSON text or JSON files from their own pages, but they are not accepted by the generic import pipeline as app-native records.

# Desktop Integration

Desktop packages are app-only. Start, stop, import, export, backup, and restore actions are exposed through the OneXray UI.

OneXray does not expose a stable local machine-control interface. External tools should treat the documented JSON formats as data formats, not as a runtime control contract.

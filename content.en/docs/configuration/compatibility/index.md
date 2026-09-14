---
title: "Versions and compatibility"
description: "OneXray import formats, routing conditions, FakeDNS and configuration requirements."
weight: 1
ai_order: 20
lastmod: 2026-09-14
---

OneXray supports outbound, Custom Routing and Raw JSON imports. Each import type has its own fields and requirements; choose the type that matches the task.

| Capability | Behavior |
| --- | --- |
| Outbound / Custom / Raw import | Supported |
| Custom domain, target IP, port, network | Supported |
| Custom local DNS via `app-dns-direct` | Supported |
| Custom `protocol` and `localOS` | Supported |
| Smart/Custom FakeDNS switch and `app-dns-fake` | Supported; off by default |
| Automatic FakeDNS recovery on the App-owned Raw inbound | Supported when Raw declares a FakeDNS server or pool |
| GitHub proxy priority with Microsoft bypass | Supported; precedes direct rules |

Older versions may not support every field described here. If an option is missing or a supported field is rejected, update the App first. Never silently drop conditions to make a configuration import; explain the limitation and agree on an alternative if the user must keep an older version. Raw JSON is not an automatic workaround for missing native integration.

## Traceable sources

- App implementation reviewed for this guide: [commit `eed1da1`](https://github.com/OneXray/OneXray/tree/eed1da12c7ef1d4cbae759110f708317152bd62b).
- Get the App through the [installation guide]({{< relref "/docs/install" >}}).
- Core used for this documentation's example checks: libXray commit `c145d94071088cebd445d7b0f4b1bea35732011e`, Xray-core `v1.260327.1-0.20260908222543-52a412d9e2f5`.
- Machine-readable [example manifest](/examples/manifest.json) records import types, dependencies and replacements per file.

The current upstream manual may describe fields newer than an installed App's Core. OneXray's envelope and ownership rules take precedence for App imports; protocol validity is decided by its bundled libXray. Do not mix syntax from unrelated clients or old VMess QR-code JSON into these documents.

## Limits and required data

Custom Routing supports up to three saved profiles, each with 1–3 empty entry slots and a unique name of 1–32 characters. New Raw configurations are limited to three; existing older Raw records above the limit remain usable, with Add hidden.

Normal mode needs actual nodes already in the App. Group/automatic selection must have enough eligible distinct nodes for the requested entry count. A fixed individual server uses that server. Raw JSON must contain its own actual proxy configuration; it does not borrow nodes from the normal-mode selection.

Node and Raw examples use reserved example domains and dummy IDs. Replace them with provider-supplied values. They are templates, not free working servers.

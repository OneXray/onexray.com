---
title: "Versions and compatibility"
description: "Separate the released import contract from development-only routing fields and FakeDNS."
weight: 1
ai_order: 20
lastmod: 2026-09-14
---

Reviewed on 2026-09-14. Default to the released **26.9.2** contract unless the user confirms another build. A development example is not evidence of App Store, Google Play or Microsoft Store availability.

| Capability | 26.9.2 baseline | Reviewed development implementation |
| --- | --- | --- |
| Outbound / Custom / Raw import | Yes | Yes |
| Custom domain, target IP, port, network | Yes | Yes |
| Custom local DNS via `app-dns-direct` | Yes | Yes |
| Custom `protocol` and `localOS` | No | Yes; explicit build confirmation required |
| Smart/Custom FakeDNS switch and `app-dns-fake` | No | Yes; explicit build confirmation required |
| Automatic FakeDNS recovery on the App-owned Raw inbound | Not promised by this guide | Yes in the reviewed FakeDNS implementation |

Unknown version: use baseline fields, or ask. Never silently downgrade a requested feature by dropping its conditions. If a preview feature is unavailable, explain the limitation and discuss a supported alternative; Raw JSON is not an automatic workaround for missing native integration.

## Traceable sources

- Released App: [v26.9.2](https://github.com/OneXray/OneXray/tree/v26.9.2), commit `4bc391330f200c95fceff2aab64012ce98849c43`.
- Development routing fields: App commit `92f34ad7ad2f11e0bb997aa3f92e0eed31336689`; FakeDNS was reviewed in the subsequent working implementation and is not identified here as a release.
- Core used for this documentation's example checks: libXray commit `c145d94071088cebd445d7b0f4b1bea35732011e`, Xray-core `v1.260327.1-0.20260908222543-52a412d9e2f5`.
- Machine-readable [example manifest](/examples/manifest.json) records compatibility and replacements per file.

The current upstream manual may describe fields newer than an installed App's Core. OneXray's envelope and ownership rules take precedence for App imports; protocol validity is decided by its bundled libXray. Do not mix syntax from unrelated clients or old VMess QR-code JSON into these documents.

## Limits and required data

Custom Routing supports up to three saved profiles, each with 1–3 empty entry slots and a unique name of 1–32 characters. New Raw configurations are limited to three; existing older Raw records above the limit remain usable, with Add hidden.

Normal mode needs actual nodes already in the App. Group/automatic selection must have enough eligible distinct nodes for the requested entry count. A fixed individual server uses that server. Raw JSON must contain its own actual proxy configuration; it does not borrow nodes from the normal-mode selection.

Node and Raw examples use reserved example domains and dummy IDs. Replace them with provider-supplied values. They are templates, not free working servers.

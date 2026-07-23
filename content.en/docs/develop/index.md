---
title: Develop
weight: 4
---

This page summarizes import and runtime boundaries for integrations.

# Import Boundary

The UI import decision is intentionally simple:

1. Trim the text.
2. If it starts with `https://`, parse every valid HTTPS line as a subscription.
3. Otherwise, pass the full text to libXray and keep valid outbound models.

Fragments are not persisted in subscription URLs. Generic import does not run the manual-save Xray config test and does not create Full Config, Raw Json, Xray Profile, or GeoData records.

# Runtime Boundary

OneXray's stored node/profile data is not the Xray-core process contract. Before startup the app composes a Final Config, applies the selected Rule/Global/Direct mode, rewrites runtime-owned fields, and writes `xray.json`.

Release builds use the platform TUN/VPN path. The Proxy run mode is an internal Debug-only facility and must not be treated as a public user feature or stable integration API.

# Desktop Integration

Desktop packages expose their lifecycle through the OneXray UI. There is no stable local machine-control API for external tools.

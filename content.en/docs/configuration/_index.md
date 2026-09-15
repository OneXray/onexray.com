---
title: "Configuration contracts"
description: "Choose the correct JSON envelope, import path and ownership boundary before generating a configuration."
weight: -40
ai_order: 30
lastmod: 2026-09-15
---

These are OneXray import contracts, not interchangeable names for a generic Xray configuration. Essential rules are on this site; reading App source is not required to use the documented formats.

{{% ai-links %}}

| Document | Root / content | Import entry | What remains in the App |
| --- | --- | --- | --- |
| [Outbound]({{< relref "/docs/configuration/outbound" >}}) | `outbounds` containing actual proxy objects; a single editor accepts exactly one | Servers → Add server → Manual JSON; file/text import can extract several nodes | Server selection, routing and Tunnel |
| [Custom Routing]({{< relref "/docs/configuration/custom-routing" >}}) | `name`, empty `outbounds` slots, `routing`, optional `dns` and import dependencies | Connect → traffic method → Custom Routing → import | Actual servers, proxy balancer and Tunnel |
| [Advanced Custom]({{< relref "/docs/configuration/advanced-routing" >}}) | `name`, 1–3 leading empty slots, optional auxiliary outbounds, user DNS/rules/inbounds | Custom Routing → Advanced JSON → import or editor | Actual servers, fixed `proxy` balancer, direct/block, platform settings |
| [Raw JSON]({{< relref "/docs/configuration/raw-json" >}}) | `name` and complete user-owned Xray configuration | Connect → expert mode → Raw JSON → import or editor | Managed Tunnel settings, logs, metrics, DNS query policy and applicable interface |
| [VPN Tunnel]({{< relref "/docs/tunnel-guide" >}}) | No import document | Advanced → VPN Tunnel | Platform settings are saved through the UI |

The ordinary Servers import extracts only outbounds. It does not install a root-level routing or DNS configuration. Do not offer a Raw file through that entry.

## Generation rules

1. Choose exactly one import type for each file. Use UTF-8 strict JSON: no comments, trailing commas, ellipses or Markdown inside the file.
2. Include a useful root `name` for Custom/Raw; use the outbound's `tag` for a node name. Do not use `sendThrough` for display text.
3. Generate complete files, not patches or isolated rule arrays. Never add documentation metadata to a configuration; metadata belongs in the example manifest.
4. Use only fields accepted by the chosen mode and target version. Unsupported Custom fields are errors, not harmless hints.
5. Document dependencies and placeholders before calling anything ready to import. Existing server count and storage capacity are prerequisites.
6. Validate through the App import/save path. Custom empty slots are not executable Xray outbounds: passing that file directly to the standalone Core is the wrong test.

## Reading order

[Compatibility]({{< relref "/docs/configuration/compatibility" >}}) → the chosen format → [DNS]({{< relref "/docs/configuration/dns" >}}) → [Geodata]({{< relref "/docs/configuration/geodata" >}}) → [recipes]({{< relref "/docs/recipes" >}}) → [Tunnel guidance]({{< relref "/docs/tunnel-guide" >}}) → [verification and errors]({{< relref "/docs/troubleshooting" >}}).

[App links and sharing]({{< relref "/docs/sharing" >}}) describe optional transport envelopes. A plain JSON file is simpler for AI output; do not Base64-encode it unless constructing an App Link.

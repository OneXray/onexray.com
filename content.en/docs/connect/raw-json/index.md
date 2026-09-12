---
title: "Raw JSON"
description: "Use expert mode for complete Xray JSON while understanding the tunnel, logs, DNS, and metrics settings managed by OneXray."
weight: 30
lastmod: 2026-09-12
---

Turn on expert mode on Connect. The Raw JSON section replaces normal server selection and opens the JSON editor through Add or Edit.

## Complete configuration, separate workflow

A new installation has no Raw configurations. You can add up to three. Existing configurations above that limit from an older database remain visible, selectable, and editable, with Add hidden.

Use a name to identify each configuration. Import and sharing support complete JSON and OneXray links. To start from the current generated configuration, open Advanced > Xray > generated configuration and copy its contents.

Ordinary server import extracts only nodes; it does not create a complete Raw configuration.

## What OneXray manages

| Area | Runtime behavior |
| --- | --- |
| Tunnel | OneXray supplies tunIn for the platform |
| Logs | App log policy and file paths take precedence |
| Traffic | App-owned metrics and statistics configuration |
| DNS queries | IPv6 preference sets query strategy |
| Files | App-managed routing-data and certificate paths |
| Windows / Linux | The selected Xray outbound interface is applied |

Other user fields and extra inbounds are retained, subject to compatibility with the platform and reserved resources. A conflicting port or extra TUN is not guaranteed to work. Saved source text is separate from the runtime copy.

Turning IPv6 off changes managed tunnel parameters and DNS querying; it does **not** add IPv6-blocking rules or promise that every user-defined IPv6 path is blocked.

## Validation and safety

Saving validates a separate copy through libXray: it loads the configuration, constructs a temporary Xray instance, and closes it without starting it. App-managed inbounds, update tasks, and runtime resources are excluded or reduced for this check; user nodes, routing, DNS, and required module dependencies remain. The saved source is not changed by this validation projection.

This catches instance-construction and local routing-data errors, but does not test excluded settings, listening ports, TUN permissions, or remote connectivity. Missing required local files are errors, not a trigger to download them. Actual VPN startup uses its own error reporting rather than a second preflight instance. Geodata automatic updates wait until VPN is connected; manual updates and import dependency downloads are separate.

Raw JSON does not use the Smart/Custom rules from normal mode. Review the configuration and its external services before connecting. Shared JSON can contain server credentials and subscription tokens.

[Import and sharing]({{< relref "/docs/sharing" >}})

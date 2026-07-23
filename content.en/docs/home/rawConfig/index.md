---
title: Raw Json
weight: 4
---

Raw Json is an advanced local configuration type for Xray JSON fields that are not exposed by the structured editors.

The safest starting point is the generated file at:

```text
Core > Logs > Xray Config
```

# Storage and Validation

Raw Json requires valid JSON and a non-empty top-level `name`.

Before validation, Real Ping, and save, OneXray removes all supplied `inbounds` and writes only an app-managed `pingIn`. Manual save then runs the bundled Xray config test. This means user-defined inbounds are never preserved as the runtime inbound contract.

Generic share/file import does not create Raw Json entries. Create one from `Home > Add > Manual Input > Raw Json`.

# Final Config

In Rule mode, Raw Json remains the main body, but OneXray replaces its inbounds with the selected Xray Profile's runtime `tunIn` plus a newly generated `pingIn`.

OneXray also applies:

| Area | Runtime behavior |
| --- | --- |
| DNS strategy | Rewrites DNS and DNS-server `queryStrategy` from TUN IPv6 settings. |
| TUN route | Applies Windows/Linux gateway, DNS, route table, and outbound-interface fields. |
| Logs | Rewrites access/error paths; macOS System Extension mode disables Xray logs. |
| Metrics | Adds or removes policy, stats, and metrics according to TUN Settings. |
| Environment | Writes the app-managed asset and certificate paths. |

Global mode removes `dns` and `routing`, then retains `proxy` and the complete outbound dependency chain reached through `dialerProxy`.

Direct mode does not use the Raw Json body. OneXray builds a direct-only Final Config from the selected Xray Profile so no proxy outbound is required.

# Ping Rule

Do not manage `pingIn` manually. OneXray rewrites both the inbound and its routing rule with the current random port and authentication.

# Sharing

Raw Json can be exported as JSON text or a `.json` file. Exported text is intended for manual editing or backup; generic import does not recreate it as a Raw Json record.

---
title: Raw Json
weight: 4
---

Raw Json stores a complete Xray JSON document. Use it when the structured Xray Setting pages do not expose the Xray-core feature you need.

This page expects Xray-core knowledge. OneXray validates the JSON and tests it through the bundled core API before saving.

[Xray-core Config Reference](https://xtls.github.io/en/config/)

The safest workflow is to copy the generated Xray config file from:

```text
Core > Logs > Xray config file
```

Then edit the copy as a Raw Json config.

# Local Only

Raw Json is local-only. It is shown in the Home `Local` group together with local Outbound nodes and does not use subscription grouping. Historical Raw rows with non-local subscription ids are still displayed under Local; the database rows are not migrated.

Subscriptions do not create Raw Json entries.

# Required Fields

## `name`

OneXray requires a non-empty top-level `name` field for display in the config list.

## Runtime Inbounds

Raw Json no longer accepts custom `inbounds`. OneXray removes the Raw Json `inbounds` array at startup and writes app-managed runtime inbounds from the selected Xray Setting.

| Mode | Runtime inbounds |
| --- | --- |
| TUN | `tunIn` and `pingIn` |
| Proxy | `socksIn`, `httpIn`, and `pingIn` |

The selected Xray Setting is required. If the saved selection is missing or invalid, OneXray falls back to the built-in Simple setting before startup.

# Runtime Fixing

Before startup, OneXray adjusts the Raw Json config for the current platform:

| Area | Runtime behavior |
| --- | --- |
| Inbounds | Raw Json `inbounds` are removed. OneXray injects `tunIn` for TUN mode, or `socksIn/httpIn` for Proxy mode, and always injects `pingIn`. |
| Interfaces | In TUN mode, interface and route fields are filled for the current platform. In Proxy mode, system route and proxy settings are not changed. |
| Ping inbound | Do not define `pingIn` in Raw Json. OneXray writes a runtime HTTP `pingIn` inbound with the current random ping port and auth, and rewrites the ping routing rule. |
| Logs | `access` and `error` paths are rewritten to OneXray's log files. On macOS System Extension mode, logs are forced off. |
| Metrics | When TUN metrics are enabled, runtime metrics fields are written. When disabled, `policy`, `metrics`, and `stats` are not written. |

# Suggested Routing Skeleton

```json
{
  "routing": {
    "rules": [
      {
        "domainMatcher": "hybrid",
        "inboundTag": [
          "dnsQuery"
        ],
        "outboundTag": "proxy",
        "ruleTag": "dnsQuery"
      },
      {
        "domainMatcher": "hybrid",
        "inboundTag": [
          "tunIn"
        ],
        "port": "53",
        "outboundTag": "dnsOut",
        "ruleTag": "dnsOut"
      },
      {
        "inboundTag": [
          "tunIn"
        ],
        "port": "853",
        "outboundTag": "proxy",
        "ruleTag": "dnsDoT"
      }
    ]
  }
}
```

The first rule routes DNS component queries. The second rule forwards normal port `53` DNS traffic to the DNS outbound. The third rule handles DNS over TLS traffic on port `853`.

Do not add a `pingIn` routing rule manually. OneXray inserts the runtime ping rule together with the runtime `pingIn` inbound. In Proxy mode, runtime fixing maps `tunIn` routing matches to `socksIn/httpIn` so templates written for TUN can still be used as Raw Json.

# Sharing

Raw Json can be shared as JSON text or a `.json` file from the Raw Json node menu. Generic import does not recreate a Raw Json record from that shared text; create or paste Raw Json from `Home > Add > Manual Input > Raw Json` when needed.

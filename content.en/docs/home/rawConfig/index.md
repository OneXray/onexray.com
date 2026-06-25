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

Raw Json is local-only. The Raw Json list always shows a single `Local` group and does not use subscription grouping. Historical Raw rows with non-local subscription ids are still displayed under Local; the database rows are not migrated.

Subscriptions do not create Raw Json entries.

# Required Fields

## `name`

OneXray requires a non-empty top-level `name` field for display in the config list.

## TUN Inbound

OneXray requires at least one inbound with:

| Field | Required value |
| --- | --- |
| `protocol` | `tun` |
| `tag` | `tunIn` |

Sniffing is recommended because domain-based routing depends on it.

```json
{
  "name": "RawXrayConfig",
  "inbounds": [
    {
      "listen": "127.0.0.1",
      "protocol": "tun",
      "tag": "tunIn",
      "sniffing": {
        "enabled": true,
        "destOverride": [
          "http",
          "tls",
          "quic"
        ]
      }
    }
  ]
}
```

# Runtime Fixing

Before startup, OneXray adjusts the Raw Json config for the current platform:

| Area | Runtime behavior |
| --- | --- |
| Interfaces | When TUN interface binding is enabled, outbound `streamSettings.sockopt.interface` and TUN `autoOutboundsInterface` are filled. When it is not enabled, existing outbound `interface` fields are removed. |
| Ping inbound | Do not define `pingIn` in Raw Json. At startup, OneXray removes any existing `pingIn` inbound, writes a runtime HTTP `pingIn` inbound with the current ping port and auth, and rewrites the ping routing rule. |
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

Do not add a `pingIn` routing rule manually. OneXray inserts the runtime ping rule together with the runtime `pingIn` inbound.

# Sharing

Raw Json can be shared as JSON text or a `.json` file from the Raw Json menu. Generic import does not recreate a Raw Json record from that shared text; create or paste Raw Json from the Core Xray editor when needed.

---
title: Raw Config
weight: 4
---

Raw Config stores a complete Xray JSON document. Use it when the structured Xray Setting pages do not expose the Xray-core feature you need.

This page expects Xray-core knowledge. OneXray validates the JSON and tests it through the bundled core API before saving.

[Xray-core Config Reference](https://xtls.github.io/en/config/)

The safest workflow is to copy the generated Xray config file from:

```text
Settings > Log > Xray config file
```

Then edit the copy as a Raw Config.

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
    },
    {
      "listen": "127.0.0.1",
      "port": "11024",
      "protocol": "http",
      "tag": "pingIn"
    }
  ]
}
```

# Runtime Fixing

Before startup, OneXray adjusts the Raw Config for the current platform:

| Area | Runtime behavior |
| --- | --- |
| Interfaces | When TUN interface binding is enabled, outbound `streamSettings.sockopt.interface` and TUN `autoOutboundsInterface` are filled. When it is not enabled, existing outbound `interface` fields are removed. |
| Ping inbound port | `pingIn` HTTP inbound with random port is replaced by the runtime ping port. |
| Logs | `access` and `error` paths are rewritten to OneXray's log files. On macOS System Extension mode, logs are forced off. |
| Metrics | `policy`, `metrics`, and `stats` are removed from runtime Raw Config. |

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
      },
      {
        "inboundTag": [
          "pingIn"
        ],
        "outboundTag": "proxy",
        "ruleTag": "ping"
      }
    ]
  }
}
```

The first rule routes DNS component queries. The second rule forwards normal port `53` DNS traffic to the DNS outbound. The third rule handles DNS over TLS traffic on port `853`. The fourth rule lets OneXray ping through the active proxy.

# Import and Sharing

Raw Config can be imported with OneXray URL Scheme using `type=raw`. See [Develop]({{< relref path="../../develop/index.md" lang="en" >}}).

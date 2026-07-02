---
title: Raw Json
weight: 4
---

Raw Json хранит полный Xray JSON document. Используйте его, когда structured Xray Setting pages не покрывают нужную функцию Xray-core.

Эта страница предполагает знание Xray-core. OneXray validates JSON и тестирует его через bundled core API перед сохранением.

[Xray-core Config Reference](https://xtls.github.io/en/config/)

Самый безопасный workflow — скопировать generated Xray config file из:

```text
Core > Logs > Xray config file
```

Затем отредактировать копию как Raw Json config.

# Local Only

Raw Json is local-only. Он показывается в группе Home `Local` вместе с local Outbound nodes и не использует subscription grouping. Historical Raw rows with non-local subscription ids are still displayed under Local; database rows are not migrated.

Subscriptions do not create Raw Json entries.

# Required Fields

## `name`

OneXray requires a non-empty top-level `name` field for display in the config list.

## Runtime Inbounds

Raw Json больше не принимает custom `inbounds`. При запуске OneXray удаляет массив Raw Json `inbounds` и записывает app-managed runtime inbounds из выбранного Xray Setting.

| Mode | Runtime inbounds |
| --- | --- |
| TUN | `tunIn` и `pingIn` |
| Proxy | `socksIn`, `httpIn` и `pingIn` |

Выбранный Xray Setting обязателен. Если сохраненный выбор отсутствует или недействителен, OneXray возвращается к встроенному Simple setting перед запуском.

# Runtime Fixing

Before startup, OneXray adjusts the Raw Json config for the current platform:

| Area | Runtime behavior |
| --- | --- |
| Inbounds | Raw Json `inbounds` удаляются. OneXray добавляет `tunIn` для TUN mode или `socksIn/httpIn` для Proxy mode, и всегда добавляет `pingIn`. |
| Interfaces | В TUN mode interface и route fields заполняются для текущей платформы. В Proxy mode system routes и system proxy settings не меняются. |
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

Do not add a `pingIn` routing rule manually. OneXray inserts the runtime ping rule together with the runtime `pingIn` inbound. In Proxy mode, runtime fixing maps `tunIn` routing matches to `socksIn/httpIn`, so templates written for TUN can still be used as Raw Json.

# Sharing

Raw Json can be shared as JSON text or a `.json` file from the Raw Json node menu. Generic import does not recreate a Raw Json record from that shared text; create or paste Raw Json from `Home > Add > Manual Input > Raw Json` when needed.

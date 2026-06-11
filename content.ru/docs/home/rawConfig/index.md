---
title: Raw Config
weight: 4
---

Raw Config хранит полный Xray JSON document. Используйте его, когда структурированные страницы Xray Setting не покрывают нужную функцию Xray-core.

Эта страница предполагает знание Xray-core. Перед сохранением OneXray проверяет JSON и тестирует его через встроенный core API.

[Xray-core Config Reference](https://xtls.github.io/en/config/)

Самый безопасный поток — скопировать сгенерированный Xray config file:

```text
Settings > Log > Xray config file
```

Затем редактировать копию как Raw Config.

# Обязательные поля

## `name`

OneXray требует непустое top-level поле `name` для отображения в списке конфигов.

## TUN inbound

OneXray требует хотя бы один inbound:

| Поле | Обязательное значение |
| --- | --- |
| `protocol` | `tun` |
| `tag` | `tunIn` |

Sniffing рекомендуется, потому что domain-based routing зависит от него.

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

Перед запуском OneXray изменяет Raw Config под текущую платформу:

| Область | Runtime behavior |
| --- | --- |
| Interfaces | Если включен TUN interface binding, outbound `streamSettings.sockopt.interface` и TUN `autoOutboundsInterface` заполняются. Если binding выключен, существующие outbound `interface` удаляются. |
| Ping inbound port | `pingIn` HTTP inbound со случайным портом заменяется на runtime ping port. |
| Logs | `access` и `error` переписываются на log files OneXray. В macOS System Extension mode logs отключаются. |
| Metrics | `policy`, `metrics` и `stats` удаляются из runtime Raw Config. |

# Рекомендуемый routing skeleton

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

Первая rule маршрутизирует DNS component queries. Вторая отправляет обычный DNS traffic на port `53` в DNS outbound. Третья обрабатывает DNS over TLS на port `853`. Четвертая позволяет OneXray выполнять ping через активный proxy.

# Import and Sharing

Raw Config можно импортировать через OneXray URL Scheme с `type=raw`. См. [Develop]({{< relref path="../../develop/index.md" lang="ru" >}}).

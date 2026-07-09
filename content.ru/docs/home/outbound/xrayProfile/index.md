---
title: Xray Profile
weight: 1
aliases:
  - /ru/docs/home/outbound/xraySetting/
---

Xray Profile — обязательный runtime profile и структурированный writer Xray-core JSON в OneXray. Он подходит, когда нужны DNS, FakeDNS, routing, inbounds, outbounds, logs или Final Outbound, управляемые через UI.

OneXray всегда держит один Xray Profile выбранным. Встроенный Simple Profile является fallback profile и не может быть удален.

# Final Config

Final Config — это runtime `xray.json`, который OneXray записывает непосредственно перед запуском Xray-core. Это не то же самое, что отдельный Xray Profile, Outbound node, Full Config или Raw Json record в UI.

Выбранный Xray Profile предоставляет базовую runtime structure: `dns`, `fakeDns`, `routing`, `inbounds`, `outbounds`, `log` и optional metrics-related fields.

Активный тип узла затем изменяет эту базу:

| Active node | Как он изменяет Final Config |
| --- | --- |
| Outbound | Без Final Outbound выбранный узел становится runtime outbound `proxy`. Если Final Outbound настроен, Final Outbound записывается как `proxy`; выбранный узел записывается как `chainProxy`; `proxy.dialerProxy` устанавливается в `chainProxy`. |
| Full Config | Full Config заменяет `outbounds`, `routing` и `dns` выбранного Xray Profile. Выбранный Xray Profile и app runtime все еще предоставляют FakeDNS, runtime inbounds, logs, metrics, env и platform fixes. |
| Raw Json | Raw Json используется как основной JSON body, но его `inbounds` удаляются. OneXray записывает runtime inbounds из выбранного Xray Profile для текущего TUN или Proxy mode. |

После этой композиции app runtime все еще управляет `pingIn`, случайными ping и metrics ports, Windows/Linux TUN route fields, `env.xray.location.asset`, `env.xray.location.cert`, mobile `env.xray.tun.fd` и отключением logs в macOS System Extension.

# Разделы

| Раздел | Что записывает |
| --- | --- |
| Log | `log` |
| DNS | `dns` |
| FakeDNS | `fakeDns` |
| Routing | `routing` |
| Inbounds | `inbounds` |
| Outbounds | `outbounds` |

# DNS

Страница DNS записывает объект Xray `dns`.

| Поле | Значение |
| --- | --- |
| `hosts` | Статические host mappings. |
| `servers` | Список DNS servers. Каждый server может иметь address, port, domains, expectIPs, skipFallback, clientIP, queryStrategy и tag. |
| `queryStrategy` | Записывается во время runtime из TUN Settings. `Enable IPv6` записывает `UseIP`; отключенный IPv6 записывает `UseIPv4`. |
| `disableCache` | Отключает DNS cache. |
| `disableFallback` | Отключает fallback server behavior. |
| `disableFallbackIfMatch` | Останавливает fallback, если сработало domain rule. |
| `useSystemHosts` | Разрешает Xray использовать system hosts. |

Если DNS server имеет непустой `tag`, OneXray показывает этот tag как вариант `inboundTag` для routing rules.

# FakeDNS

FakeDNS всегда присутствует в выводе Xray Profile. Страница FakeDNS только настраивает pools; переключателя enabled на ней нет.

Пулы по умолчанию:

| Pool | Default `ipPool` | Default `poolSize` |
| --- | --- | --- |
| IPv4 | `198.18.0.0/15` | `32768` |
| IPv6 | `fc00::/18` | `32768` |

Записанные pools следуют `TUN Settings > Enable IPv6`:

| TUN IPv6 | Записанные FakeDNS pools |
| --- | --- |
| Enabled | IPv4 и IPv6 |
| Disabled | Только IPv4 |

Чтобы FakeDNS был полезен, TUN inbound sniffing destination override должен содержать `fakedns+others`. Переключатель FakeDNS в Simple Profile добавляет это значение автоматически.

# Routing

Routing записывает `routing.domainStrategy` и `routing.rules`.

Default rules записываются перед custom rules:

| `ruleTag` | Match | Default outbound |
| --- | --- | --- |
| `dnsQuery` | `inboundTag: ["dnsQuery"]` | `proxy` |
| `dnsOut` | `inboundTag: ["tunIn"]`, `port: "53"` | `dnsOut` |
| `dnsDoT` | `inboundTag: ["tunIn"]`, `port: "853"` | `proxy` |
| `ping` | `inboundTag: ["pingIn"]` | `proxy` |

Условия в одной rule объединяются. Rule с `domain` и `ip` срабатывает только если оба условия совпали для одного соединения.

Условие `process` записывается только на Windows и Linux. На macOS, iOS и Android OneXray не пишет `process` в итоговый Xray JSON.

# Inbounds

Страница Inbounds разделена по runtime role:

| Section | Inbounds |
| --- | --- |
| TUN Mode | `tunIn` |
| Proxy Mode | `socksIn`, `httpIn` |
| Internal | `pingIn` |

TUN mode добавляет `tunIn + pingIn` при запуске. Proxy mode добавляет `socksIn + httpIn + pingIn`. `socksIn` по умолчанию использует порт `11024`, а `httpIn` — порт `11025`; оба порта можно изменить. SOCKS и HTTP authentication необязательны и по умолчанию пустые.

`pingIn` и metrics ports всегда назначаются случайно во время runtime.

# Outbounds

Системные outbound tags:

| Tag | Protocol | Назначение |
| --- | --- | --- |
| `proxy` | Выбранный узел или Final Outbound в runtime | Финальный выходной outbound. |
| `chainProxy` | Выбранный узел, когда Final Outbound настроен | Dialer relay, используемый `proxy.dialerProxy`. |
| `direct` | `freedom` | Прямое соединение. |
| `fragment` | `freedom` | Fragment outbound. |
| `block` | `blackhole` | Блокировка трафика. |
| `dnsOut` | `dns` | DNS outbound. |

Runtime order:

1. `proxy`
2. `chainProxy`, если настроен
3. Other custom outbounds
4. `direct`
5. `fragment`
6. `block`
7. `dnsOut`

## Final Outbound

Внутренний runtime relay tag остается фиксированным:

```text
chainProxy
```

В Xray Profile страница Outbounds поддерживает import, replace и delete Final Outbound. В Simple Profile Final Outbound выбирается по outbound id из локальных outbound nodes.

Если Final Outbound активен, OneXray записывает Final Outbound как runtime `proxy`. Выбранный на Home узел записывается как `chainProxy`, а `proxy.dialerProxy` устанавливается в `chainProxy`. Запуск завершается ошибкой, если выбранный на Home узел и Final Outbound указывают на один и тот же локальный outbound id.

## DNS Outbound

DNS outbound записывает:

| Поле | Поведение |
| --- | --- |
| `network` | По умолчанию пусто. Записывается только при выборе `tcp` или `udp`. |
| `address` | Необязательный upstream address. |
| `port` | Необязательный upstream port. |
| `rules` | Записывается, если список rules не пустой. |
| `blockTypes` | Записывается только если `rules` пустой и block types настроены. |

Default DNS outbound rules:

```json
[
  {
    "action": "hijack",
    "qType": "1,28"
  },
  {
    "action": "direct"
  }
]
```

`qType` — string field.

# Runtime Inbound Notes

Структурированный writer включает runtime TUN, SOCKS, HTTP и ping inbound states. TUN inbound должен оставлять sniffing включенным для routing по domain и protocol. Когда FakeDNS включен в Simple Profile, sniffing добавляет `fakedns+others`.

# Logs

На macOS с включенным System Extension mode OneXray принудительно отключает logs Xray Profile перед записью runtime config:

```json
{
  "loglevel": "none",
  "dnsLog": false
}
```

# Sharing

Xray Profile can be shared as JSON text or a `.json` file from the Xray Profile menu.

Custom GeoData is not bundled into Xray Profile share output. If a profile references custom rule sets, add those GeoData entries manually first or use [Backup and Restore]({{< relref path="../../../setting/backup/index.md" lang="ru" >}}) for full migration.

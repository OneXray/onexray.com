---
title: AI Reference
weight: 8
---

Краткий справочник текущей persisted и runtime семантики OneXray.

# Config Types и Tags

| Identifier | Значение |
| --- | --- |
| `CoreConfigType.outbound` | Локальный или subscription Outbound. |
| `CoreConfigType.profile` | Xray Profile в Dart; persisted wire value остается `"setting"`. |
| `CoreConfigType.full` | Full Config в Home `Local`. |
| `CoreConfigType.raw` | Raw Json в Home `Local`. |
| `Simple` | Встроенный profile id `-1`. |
| `proxy` | Runtime final proxy exit. |
| `chainProxy` | Runtime relay tag Home node при Final Outbound. |
| `direct` | Freedom direct outbound. |
| `tunIn` | Runtime TUN inbound. |
| `pingIn` | Runtime HTTP ping inbound. |

# Home Routing Modes

| Mode | Нужен узел | Transformation |
| --- | --- | --- |
| `rule` | Да | Сохраняет DNS, routing и outbound structure после composition. |
| `global` | Да | Удаляет DNS/routing; оставляет `proxy` и recursive `dialerProxy` dependencies. |
| `direct` | Нет | Удаляет DNS/routing; оставляет `direct` и очищает его `dialerProxy`. |

Смена при активном соединении перезапускает Core.

# Import Classification

| Input | Result |
| --- | --- |
| Trimmed text начинается с `https://` | Каждая валидная HTTPS-строка становится subscription entry. |
| Другой поддерживаемый текст | libXray возвращает Outbound models. |

Fragment задает имя, но не сохраняется в URL. Extensions: `txt`, `json`, `yaml`, `yml`, `png`, `jpg`, `jpeg`. Обычный import не создает Raw Json, Full Config, Xray Profile или GeoData.

# Startup Settings

| Setting | Scope | Default | Значение |
| --- | --- | --- | --- |
| `connectOnAppLaunch` | Все платформы | `false` | После подготовки сервисов запускает последнюю доступную конфигурацию; при необходимости выбирает случайный узел. Direct не требует узла. |
| Запускать при входе | macOS, Windows, Linux | Выключено | Использует пользовательскую регистрацию автозапуска платформы. |
| `desktopStartHidden` | macOS, Windows, Linux | `false` | Скрывает главное окно при каждом запуске OneXray независимо от запуска при входе. |
| Скрыть иконку в Dock | macOS | `false` | Применяется сразу к текущему сеансу приложения. |

Clear Data отменяет запуск при входе и удаляет настройки `connectOnAppLaunch` и `desktopStartHidden`.

# Simple Profile Defaults

| Field | Default |
| --- | --- |
| `routing.domainStrategy` | `IpIfNonMatch` |
| `routing.directSet` | `CN` |
| `routing.appleDirect` | `true` |
| `routing.localDirect` | `true` |
| `routing.enableIPRule` | `true` |
| `routing.localDns` | `true` |
| `routing.blockAds` | `false` |
| `enableLog` | `false` |
| `fakeDns` | `false` |
| `finalOutboundId` | `null` |
| Default DNS | `tcp://<TUN IPv4 DNS>`, tag `defaultDns`, через `proxy` |

Региональный local DNS: CN `223.5.5.5`, IR `5.200.200.200`, RU `9.9.9.9`, Other `8.8.8.8`. Он используется только для соответствующих direct domains при включенном Local DNS.

Block Ads добавляет встроенное правило рекламных доменов в `block`.

# DNS и FakeDNS

| IPv6 | Strategy | FakeDNS pools |
| --- | --- | --- |
| Включен | `UseIP` | IPv4 `198.18.0.0/15` и IPv6 `fc00::/18` |
| Выключен | `UseIPv4` | Только IPv4 |

Первый DNS Server нового custom Profile/Full Config равен TUN IPv4 DNS. Full Config управляет `outbounds`, `routing`, `dns`, но не FakeDNS.

# Дополнительные Profile Inbounds

Custom Xray Profile поддерживает дополнительные SOCKS, HTTP и dokodemo-door inbounds. SOCKS/HTTP могут слушать localhost или все интерфейсы; для всех интерфейсов обязательны полные credentials. dokodemo-door слушает localhost и поддерживает target address, target port и режим TCP/UDP.

Порты и tags должны быть уникальными. Tags доступны custom Routing rules, но OneXray не создает forwarding rules автоматически.

# Ping

Настройки Ping сохраняют только timeout, URL и Auto Ping New Configs. OneXray отправляет тесты фиксированными группами не более пяти узлов; persisted concurrency отсутствует.

# Runtime Composition

| Stored type | Rule-mode Final Config |
| --- | --- |
| Outbound | Profile + Home Outbound `proxy`, при необходимости Final Outbound через `chainProxy`. |
| Full Config | Profile base + Full Config `outbounds/routing/dns`; Profile FakeDNS/inbounds/log/metrics сохраняются. |
| Raw Json | Raw body с переписанными App/Profile inbounds, DNS strategy, logs, metrics, env и route fields. |

Release runtime inbounds: `tunIn`, дополнительные inbounds выбранного Profile и `pingIn`. Пользовательские Raw Json inbounds удаляются при validation, Real Ping, save и startup.

# Runtime-Owned Fields

- случайные `pingIn` и metrics ports;
- `env.xray.location.asset` и `env.xray.location.cert`;
- mobile `env.xray.tun.fd`;
- Windows/Linux TUN gateway, DNS, routes и outbound interface;
- Apple tunnel route policy `excludeLocalNetworks`, включенная по умолчанию;
- access/error paths или отключение logs в macOS System Extension;
- optional policy/stats/metrics.

# Routing Rule Fields

```text
domain, ip, port, sourcePort, localPort, network, sourceIP, localIP,
inboundTag, protocol, attrs, process, outboundTag, ruleTag
```

`process` записывается только на Windows и Linux.

# Raw Json Validation

Raw Json должен быть JSON object с непустым `name`. Manual validation заменяет inbounds на `pingIn`, удаляет metrics, применяет runtime env и вызывает Xray config test. Обычный import Outbound/share content этот test не запускает.

# Backup v3

```text
manifest.json
core_configs.json
subscriptions.json
geo_data.json
dat/
```

Manifest содержит version `3` и creation time. Local configs/GeoData восстанавливаются из архива, subscription nodes загружаются снова по восстановленным URL.

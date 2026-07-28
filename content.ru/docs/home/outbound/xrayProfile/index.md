---
title: Xray Profile
weight: 1
aliases:
  - /docs/home/outbound/xraySetting/
---

Xray Profile — обязательная runtime-основа OneXray. Всегда выбран один профиль; встроенный Simple Profile является резервным и не удаляется.

# Формирование Final Config

Final Config — runtime `xray.json`, записанный перед запуском Xray-core.

| Home config | Формирование |
| --- | --- |
| Outbound | Узел становится `proxy`. При наличии Final Outbound он становится `proxy`, Home node — `chainProxy`, а `proxy.dialerProxy` указывает на `chainProxy`. |
| Full Config | Заменяет `outbounds`, `routing` и `dns` профиля. FakeDNS, inbounds, logs, metrics и runtime sections остаются у выбранного профиля/приложения. |
| Raw Json | Предоставляет основное JSON-тело, но его inbounds отбрасываются и заменяются runtime inbounds профиля. |

После этого применяется режим Home: Global удаляет DNS/routing и оставляет proxy chain, Direct оставляет только `direct`.

# Редактор Custom Profile

| Раздел | Основные поля |
| --- | --- |
| Inbounds | `tunIn`, дополнительные SOCKS/HTTP/dokodemo-door inbounds и внутренний `pingIn`. |
| Outbounds | Final Outbound и системные `direct`, `fragment`, `block`, `dnsOut`. |
| Routing | Domain Strategy, системные и упорядоченные custom rules. |
| DNS | Hosts, упорядоченные servers, cache/fallback/stale, client IP, parallel query и system hosts. |
| FakeDNS | IPv4/IPv6 pools. |
| Log | Log level, DNS log и mask address. |

На телефонах навигация прокручивается горизонтально; на широком экране используется боковое меню. Набор полей одинаков.

# Дополнительные Inbounds

Custom Xray Profile может содержать любое количество локальных inbounds:

| Тип | Поля и поведение |
| --- | --- |
| SOCKS | localhost или все интерфейсы, порт, уникальный tag, необязательные user/password; UDP всегда включен. |
| HTTP | localhost или все интерфейсы, порт, уникальный tag и необязательные user/password. |
| dokodemo-door | Только localhost, порт, уникальный tag, target address/port и TCP, UDP или TCP+UDP. |

Для прослушивания всех интерфейсов необходимо указать и user, и password. Tags и порты прослушивания должны быть уникальными и не могут совпадать с app-managed или DNS inbound tags.

Tags дополнительных inbounds доступны в custom Routing rules. OneXray не создает forwarding rules автоматически: необходимые routing rules добавляет пользователь. При переименовании inbound ссылки в custom rules обновляются; inbound, на который еще ссылается правило, удалить нельзя.

В release/TUN Final Config содержит `tunIn`, дополнительные inbounds выбранного Profile и `pingIn`. Full Config и Raw Json используют те же Profile-owned inbounds; собственные inbounds Raw Json по-прежнему игнорируются.

# DNS

Новый Xray Profile или Full Config получает первый DNS Server из `TUN Settings > IPv4 DNS`; затем адрес можно изменить.

Глобальный и server-level `queryStrategy` не показываются в UI и переписываются во время запуска:

| TUN IPv6 | Strategy |
| --- | --- |
| Включен | `UseIP` |
| Выключен | `UseIPv4` |

DNS Server поддерживает address, port, domains, expected/unexpected IPs, tag, client IP, timeout, fallback/cache/stale и final query. Непустой tag доступен как inbound tag routing rule.

# FakeDNS

FakeDNS принадлежит выбранному Xray Profile, даже при запуске Full Config. Full Config не хранит и не редактирует FakeDNS.

| Pool | Address | Size |
| --- | --- | --- |
| IPv4 | `198.18.0.0/15` | `32768` |
| IPv6 | `fc00::/18` | `32768` |

IPv6 pool записывается только при включенном TUN IPv6.

# Routing

Системные правила обрабатывают DNS component, порт 53, DNS over TLS и внутренний ping. Custom rules могут использовать domain, IP, ports, network, source/local addresses, inbound tags, protocols, attrs и процессы на поддерживаемых платформах.

Условия внутри одного правила объединяются.

# Outbounds и Final Outbound

| Tag | Назначение |
| --- | --- |
| `proxy` | Итоговый proxy exit. |
| `chainProxy` | Home node как dialer relay при активном Final Outbound. |
| `direct` | Freedom/direct. |
| `fragment` | Freedom fragmentation. |
| `block` | Blackhole. |
| `dnsOut` | DNS outbound. |

Final Outbound выбирается среди локальных Outbound. Один узел нельзя использовать одновременно как Home node и Final Outbound.

# Simple Profile

Simple Profile содержит:

- включение логов;
- выбор Final Outbound;
- direct region, Domain Strategy, Apple/local direct, IP rules, local DNS и блокировку рекламы;
- переключатель FakeDNS;
- read-only DNS `tcp://<TUN IPv4 DNS>`.

Default DNS направляется через `proxy`. Региональный local DNS применяется только к соответствующим direct domains.

# Runtime Ownership

OneXray всегда переписывает app-managed runtime `tunIn`/`pingIn`, случайные ping/metrics ports, пути GeoData, Windows/Linux route fields и поведение logs в macOS System Extension. Дополнительные inbounds остаются частью Profile и в режиме TUN вставляются между `tunIn` и `pingIn`.

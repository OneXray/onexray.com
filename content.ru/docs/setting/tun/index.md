---
title: TUN Settings
weight: 1
---

TUN Settings применяются ко всем Home configs и управляют системным туннелем.

# DNS

TUN DNS содержит IPv4 и IPv6 адреса без портов.

- Системный туннель использует их для DNS-трафика.
- Simple Profile показывает IPv4 как read-only `tcp://` DNS Server.
- Новый Xray Profile и Full Config получают первый DNS Server из этого IPv4.
- Во время запуска `queryStrategy` становится `UseIP` при включенном IPv6 и `UseIPv4` при выключенном.

# IPv6

Переключатель одновременно управляет TUN IPv6 route, DNS query strategy и записью IPv6 FakeDNS pool. Он заменяет старые отдельные `UseIP / UseIPv4 / UseIPv6`.

# Apple Network Routing

Эти параметры настраивают `NETunnelProviderProtocol` и не относятся к routing rules Xray Profile:

| Setting | Default | Availability | Behavior |
| --- | --- | --- | --- |
| `includeAllNetworks` | Off | iOS 14.0+ / macOS 10.15+ | Направляет большую часть сетевого трафика через VPN. |
| `excludeLocalNetworks` | On | iOS 14.2+ / macOS 10.15+ | Оставляет локальный трафик вне VPN. |
| `excludeCellularServices` | On | iOS 16.4+ / macOS 13.3+ | Исключает поддерживаемый cellular-service traffic. |
| `excludeAPNs` | On | iOS 16.4+ / macOS 13.3+ | Исключает трафик Apple Push Notification service. |
| `excludeDeviceCommunication` | On | iOS 17.4+ / macOS 14.4+ | Исключает связь с подключенными устройствами Apple. |

Четыре exclude-параметра видны только при включенном `includeAllNetworks`. Используйте их осторожно: изменение системной маршрутизации может повлиять на local discovery, iMessage/push и связь устройств. Работающий VPN применит изменения только после перезапуска; OneXray предлагает restart после сохранения во время подключения.

# DNS over TLS

iOS и macOS поддерживают DoT с настроенным Server Name; правило `dnsDoT` может маршрутизировать порт 853.

# Metrics

Metrics добавляет policy/stats/metrics и счетчики Home. При выключении эти sections удаляются из Final Config.

# Network Interface

Windows и Linux позволяют выбрать `auto` или конкретный outbound interface. OneXray записывает выбор в TUN route fields и не дает трафику Core вернуться в TUN.

# On Demand

iOS и macOS поддерживают упорядоченные rules по interface type и Wi-Fi SSID.

# Per-App VPN

Android поддерживает allow-list и deny-list. Selected Apps и Installed Apps открываются из раздела Per-App VPN.

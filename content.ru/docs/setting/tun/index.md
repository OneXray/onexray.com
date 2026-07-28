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

# Route (Apple)

На iOS и macOS доступна включенная по умолчанию настройка `Исключать локальные сети`. Она оставляет трафик локальной сети и multicast, включая обнаружение AirPlay и DLNA/SSDP, вне VPN.

Это системная route policy туннеля Apple, независимая от routing rules в Xray Profile.

# DNS over TLS

iOS и macOS поддерживают DoT с настроенным Server Name; правило `dnsDoT` может маршрутизировать порт 853.

# Metrics

Metrics добавляет policy/stats/metrics и счетчики Home. При выключении эти sections удаляются из Final Config.

# Network Interface

Windows и Linux позволяют выбрать `auto` или конкретный outbound interface. OneXray записывает выбор в TUN route fields и не дает трафику Core вернуться в TUN.

# On Demand

iOS и macOS поддерживают упорядоченные rules по interface type и Wi-Fi SSID, а также disconnect on sleep.

# Per-App VPN

Android поддерживает allow-list и deny-list. Selected Apps и Installed Apps открываются из раздела Per-App VPN.

---
title: TUN Settings
weight: 1
---

TUN Settings управляют туннелем платформы и сетевыми интерфейсами, которые используются всеми конфигурациями.

# TUN

TUN device — виртуальный сетевой интерфейс. Когда VPN запускается, платформа создает или активирует tunnel и направляет трафик через Xray-core.

## DNS

TUN DNS содержит один IPv4 address и один IPv6 address. Это plain IP addresses без портов.

При запуске эти адреса применяются к tunnel. System DNS queries затем входят в Xray-core и обрабатываются routing и DNS outbound rules.

Эти DNS addresses также влияют на то, как платформа резолвит domain names proxy server до того, как DNS из Xray Profile станет доступен.

## DNS over TLS

DNS over TLS доступен на iOS и macOS. Когда он включен, DoT traffic может обрабатываться rule `dnsDoT`.

DoT может уменьшить memory pressure в некоторых iOS packet tunnel сценариях.

## Priority

Priority доступен только на Linux. Он управляет metric default routes для OneXray TUN device.

Эквивалентное поведение:

```shell
sudo ip route add default dev OneXrayTun metric 20
sudo ip -6 route add default dev OneXrayTun metric 20
```

## Network Interface

Выбор network interface доступен на Linux и Windows.

Когда interface fixing включен, OneXray может записать выбранный interface в outbound socket options и TUN inbound `autoOutboundsInterface`. Это помогает отправлять proxy traffic через ожидаемый физический адаптер.

## Metrics

Metrics controls whether OneXray writes Xray traffic statistics into runtime configs and reads traffic counters for the Home connection summary.

When metrics are disabled, OneXray does not write `policy`, `stats`, or `metrics` into the generated runtime Xray JSON.

# On Demand

On-demand rules доступны на iOS и macOS. Они позволяют системе решать, активировать ли VPN для выбранных network conditions.

# Per-App VPN

Per-app VPN доступен на Android. Если приложения не выбраны, VPN используют все приложения. Если приложения выбраны, VPN используют только выбранные приложения.

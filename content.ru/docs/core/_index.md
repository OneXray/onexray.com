---
title: Core
weight: 4
---

Core содержит настройки, которые напрямую влияют на Xray-core, платформенный туннель, rule-set данные и диагностику.

| Страница | Назначение |
| --- | --- |
| TUN | Параметры туннеля, DNS-адреса, привязка интерфейса, Metrics, on-demand rules и per-app VPN. |
| Ping | URL, timeout и поведение тестов узлов. |
| Logs | Логи приложения, логи Xray и сгенерированные Xray config files. |
| Xray Settings | Структурированная конфигурация Xray-core, включая Simple Setting и advanced UI editor. |
| GeoData | Встроенные и пользовательские rule-set данные для `geosite:` и `geoip:` rules. |

Enhanced routing templates больше не импортируются из приложения напрямую. Используйте страницу [Routing]({{< relref path="../routing/index.md" lang="ru" >}}), чтобы скопировать актуальные JSON templates в Xray Settings.

Связанные страницы:

- [TUN Setting]({{< relref path="../setting/tun/index.md" lang="ru" >}})
- [Ping]({{< relref path="../setting/ping/index.md" lang="ru" >}})
- [Log]({{< relref path="../setting/log/index.md" lang="ru" >}})
- [Xray Setting]({{< relref path="../home/outbound/xraySetting/index.md" lang="ru" >}})
- [GeoData]({{< relref path="../setting/geoData/index.md" lang="ru" >}})

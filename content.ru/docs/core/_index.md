---
title: Core
weight: 4
---

Core содержит настройки, которые напрямую влияют на Xray-core, runtime mode, платформенный туннель, rule-set данные и диагностику.

| Страница | Назначение |
| --- | --- |
| Run Mode | Переключение между TUN mode и Proxy mode. |
| TUN | Параметры туннеля, DNS-адреса, привязка интерфейса, Metrics, on-demand rules и per-app VPN. |
| Ping | URL, timeout и поведение тестов узлов. |
| Logs | Логи приложения, логи Xray и сгенерированные Xray config files. |
| Xray Profiles | Структурированная конфигурация Xray-core, включая Simple Profile и advanced UI editor. |
| GeoData | Встроенные и пользовательские rule-set данные для `geosite:` и `geoip:` rules. |

TUN mode сохраняет текущее поведение VPN/TUN. Proxy mode только запускает Xray внутри процесса приложения и открывает локальные SOCKS и HTTP proxy ports. Он не меняет system proxy, routes или DNS и не отображается как system VPN connection; настройте систему или браузер вручную при использовании Proxy mode.

Enhanced routing templates больше не импортируются из приложения напрямую. Используйте страницу [Routing]({{< relref path="../routing/index.md" lang="ru" >}}), чтобы скопировать актуальные JSON templates в Xray Profiles.

Связанные страницы:

- [TUN Settings]({{< relref path="../setting/tun/index.md" lang="ru" >}})
- [Ping]({{< relref path="../setting/ping/index.md" lang="ru" >}})
- [Log]({{< relref path="../setting/log/index.md" lang="ru" >}})
- [Xray Profile]({{< relref path="../home/outbound/xrayProfile/index.md" lang="ru" >}})
- [GeoData]({{< relref path="../setting/geoData/index.md" lang="ru" >}})

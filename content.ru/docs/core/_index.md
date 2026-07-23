---
title: Core
weight: 4
---

Раздел Core содержит настройки и диагностику, непосредственно влияющие на Xray-core.

| Раздел | Назначение |
| --- | --- |
| Network | Настройки TUN и Ping. |
| Data | Xray Profiles, GeoData и шаблоны расширенной маршрутизации. |
| Logs | Журналы access/error и сгенерированный Final Config. |

Release-сборки работают через системную интеграцию TUN/VPN. Пользовательский переключатель TUN/Proxy и локальные SOCKS/HTTP inbounds удалены.

Журналы Access и Error открываются прямо из раздела Logs. Просмотрщик читает только конец большого файла и отслеживает новые строки. Просмотрщик итогового Xray JSON поддерживает выделение и копирование текста.

Связанные страницы:

- [TUN Settings]({{< relref path="../setting/tun/index.md" lang="ru" >}})
- [Ping]({{< relref path="../setting/ping/index.md" lang="ru" >}})
- [Logs]({{< relref path="../setting/log/index.md" lang="ru" >}})
- [Xray Profile]({{< relref path="../home/outbound/xrayProfile/index.md" lang="ru" >}})
- [GeoData]({{< relref path="../setting/geoData/index.md" lang="ru" >}})

---
title: Auto Update
weight: 4
---

Auto Update обновляет subscriptions и GeoData после инициализации приложения и не относится к ручной проверке версии OneXray.

# Subscriptions

| Опция | Значение |
| --- | --- |
| Enable | Автоматически обновлять устаревшие подписки. |
| Interval | `1 day`, `3 days` или `1 week`. |
| Auto Ping | Проверять узлы после планового refresh. |

Refresh транзакционно заменяет узлы и обновляет timestamp/count. Запущенный VPN сохраняет текущий Final Config до restart.

# GeoData

Системные `geosite`/`geoip` и custom GeoData используют те же интервалы. Custom entries обновляются отдельно.

Одновременно выполняется только одна операция download/update; global downloading state очищается при успехе и ошибке.

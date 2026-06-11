---
title: Subscription Update
weight: 4
---

Subscription Update управляет автоматическим обновлением данных после запуска Home page. Он не выполняется во время ранней инициализации приложения.

# Subscription Refresh

| Setting | Значение |
| --- | --- |
| Enable | Автоматически обновлять устаревшие подписки. |
| Interval | `1 day`, `3 days` или `1 week`. |
| Auto Ping | Выполнять ping узлов обновленной подписки после обновления. |

Refresh сохраняет старый running config до следующего запуска VPN пользователем. Обновление подписки заменяет сохраненные nodes этой подписки и обновляет timestamp и count.

# GeoData Refresh

| Setting | Значение |
| --- | --- |
| Enable GeoData | Автоматически обновлять system и custom GeoData. |
| GeoData interval | `1 day`, `3 days` или `1 week`. |

System GeoData обновляет `geosite` и `geoip` вместе. Custom GeoData rows обновляются по одной, если их timestamp старше выбранного interval.

# Правила выполнения

Automatic update service:

1. Запускается только если нет другого активного download/update task.
2. Читает сохраненные Subscription Update settings.
3. Обновляет устаревшие subscriptions, если subscription update включен.
4. Обновляет устаревшие GeoData, если GeoData update включен.
5. Использует глобальное downloading state приложения во время работы.

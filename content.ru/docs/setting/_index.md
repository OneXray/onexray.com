---
title: Settings
weight: 5
---

Settings содержит настройки приложения и инструменты обслуживания.

| Раздел | Страница или действие | Назначение |
| --- | --- | --- |
| Data | Auto Update | Обновляет подписки и GeoData по расписанию после инициализации приложения. |
| Data | App update check | Проверяет обновления в текущем канале распространения. |
| Data | Clear Data | Удаляет рабочие данные, runtime files, cache и custom GeoData, сохраняя app preferences и local backup files. |
| App | Backup | Экспорт и восстановление данных OneXray. |
| App | App Icon | Изменение iOS app icon. |
| App | Toolbox | Utility actions для macOS. |
| App | Theme | Выбор темы приложения. |
| App | Language | Выбор языка приложения. |
| Support | Docs, Review, Telegram, Issues, Source Code, Credits, Privacy | Поддержка и информация о проекте. |
| Version | App и Xray versions | Показывает установленную версию приложения и встроенную версию Xray-core. |

Страницы, связанные с Xray-core, перенесены в [Core]({{< relref path="../core/_index.md" lang="ru" >}}). TUN, Ping, Logs, Xray Profiles и GeoData больше не отображаются как корневые элементы Settings.

# Clear Data

Clear Data сначала останавливает VPN. Если остановить VPN не удалось, очистка отменяется.

После успешной очистки OneXray удаляет local configs, subscriptions, GeoData database rows, runtime files, app cache и custom GeoData files. Встроенные `geosite` и `geoip` восстанавливаются.

Операция сохраняет local backup ZIP files и app preferences: privacy acceptance, first-run state, Simple Profile, TUN Settings, theme, language, Dock setting, query-all-packages acceptance и native iOS app icon. После очистки выбранный Xray Profile сбрасывается на `Simple`.

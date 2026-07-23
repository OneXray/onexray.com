---
title: Settings
weight: 5
---

Settings содержит настройки приложения, обслуживание, версии и ссылки поддержки.

| Раздел | Содержимое |
| --- | --- |
| Data | Auto Update, ручная проверка обновления приложения и Clear Data. |
| App | Backup, App Icon на iOS, Toolbox на macOS, Theme и Language. |
| Version | Установленные версии OneXray и Xray-core. |
| Support | Документация, review, Telegram, issues, source, credits и privacy. |

После запуска OneXray проверяет новый стабильный GitHub Release, но не открывает диалог автоматически. При наличии обновления индикатор появляется на Settings в мобильной навигации или как кликабельный пункт внизу desktop rail. Полный диалог с Markdown открывается только по действию пользователя.

# Clear Data

Сначала OneXray останавливает VPN; при ошибке stop очистка отменяется.

Успешная очистка удаляет configs, subscriptions, записи GeoData, runtime files, cache и custom GeoData, восстанавливает встроенные `geosite`/`geoip` и выбирает Simple Profile.

Локальные backup ZIP и настройки privacy, First Run, Simple Profile, TUN, theme, language и platform appearance сохраняются.

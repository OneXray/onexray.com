---
title: Share
weight: 2
---

OneXray использует общие форматы обмена данными вместо legacy private import format.

| Тип | Формат share |
| --- | --- |
| Outbound nodes | Стандартный Xray share link text и QR code, если это поддерживает libXray. |
| Subscriptions | Обычный HTTPS subscription URL. |
| Raw Json | JSON text и `.json` file. |
| Xray Profile | JSON text и `.json` file. |
| GeoData | Не передается отдельно. Для полной миграции используйте Backup. |

# Import

Imported text классифицируется запущенным приложением:

| Input | Behavior |
| --- | --- |
| `https://...` | Добавляет подписку и обновляет ее. |
| Standard Xray share text | Импортирует Outbound nodes через libXray. |
| Other text | Завершается без valid config, если libXray не может прочитать Outbound nodes. |

QR image import поддерживает `png`, `jpg` и `jpeg`. Text file import поддерживает `txt`, `json`, `yaml` и `yml`; такие файлы проходят через те же правила text import.

# Raw Json and Xray Profile

Raw Json и Xray Profile можно экспортировать из их меню как JSON text или JSON files. Это предназначено для ручного копирования, внешнего редактирования или backup workflows.

Они не импортируются generic share/import pipeline как app-native records. Чтобы создать Raw Json внутри OneXray, используйте `Home > Add > Manual Input > Raw Json`. Чтобы создать Xray Profile, используйте соответствующую страницу Core.

# Backup

Используйте [Backup and Restore]({{< relref path="../setting/backup/index.md" lang="ru" >}}), если нужна полная миграция local configs, subscriptions и custom GeoData files.

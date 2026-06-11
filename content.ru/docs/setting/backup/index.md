---
title: Backup and Restore
weight: 6
---

Backup экспортирует данные OneXray в ZIP file, который можно отправить, сохранить и позже импортировать.

# Включенные данные

| Data | Included |
| --- | --- |
| Local Xray Settings | Да |
| Local outbound nodes | Да |
| Raw Configs | Да |
| Subscriptions | Да, как subscription links |
| Custom GeoData rows | Да |
| Custom GeoData `.dat` и generated `.json` files | Да |
| Subscription node rows | Нет; они загружаются заново из subscription URLs при restore. |
| Simple Setting preferences | Нет |
| Other app preferences | Нет |

# File Structure

Backup files именуются по дате:

```text
OneXray-yyyy-MM-dd.zip
```

Внутренняя структура:

```text
timestamp.txt
sha256sum.txt
data.zip
```

`data.zip` содержит:

```text
config.txt
subscription.txt
dat.txt
dat/
```

Text files содержат OneXray share links. Директория `dat` содержит custom GeoData files.

# Restore

Restore очищает локальные данные OneXray, восстанавливает bundled system GeoData assets, копирует custom GeoData files из backup и импортирует сохраненные share links.

Храните важные backup ZIP files отдельно. System-level cloud backups могут не включать user-managed backup archives.

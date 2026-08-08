---
title: Backup and Restore
weight: 6
---

Backup экспортирует данные OneXray в ZIP file, который можно сохранить, передать и позже импортировать.

# Included Data

| Data | Included |
| --- | --- |
| Local Xray Profiles | Yes |
| Local outbound nodes | Yes |
| Full Configs | Yes |
| Raw Json configs | Yes |
| Subscriptions | Yes, включая URL и необязательные пары age-ключей |
| Subscription node rows | No; they are downloaded again from subscription URLs during restore. |
| Custom GeoData rows | Yes |
| Custom GeoData `.dat` and generated `.json` files | Yes |
| Built-in `geosite` and `geoip` rows | No; they are restored from bundled assets. |
| Simple Profile preferences | No; kept outside backup data. |
| Other app preferences | No |

# File Structure

Имя backup-файла содержит дату и время создания, поэтому несколько backup,
созданных в один день, не перезаписывают друг друга:

```text
OneXray-yyyy-MM-dd-HH-mm-ss.zip
```

ZIP root structure:

```text
manifest.json
core_configs.json
subscriptions.json
geo_data.json
dat/
```

`manifest.json` обозначает текущий structured v4 format и хранит время создания. OneXray восстанавливает structured v3 и v4 backups; архив без поддерживаемого manifest отклоняется.

`core_configs.json` contains local configs only. It does not contain subscription nodes.

`subscriptions.json` содержит имя, URL, необязательные public/secret age keys, timestamp и expanded state. При восстановлении OneXray заново создает subscriptions и загружает узлы по URL.

`geo_data.json` contains custom GeoData metadata. The `dat/` directory contains matching custom `.dat` files and generated `.json` summaries.

# Restore

Restore clears OneXray business data and the GeoData runtime directory, restores bundled `geosite` and `geoip`, copies custom GeoData files from backup, restores local configs, restores subscriptions, and refreshes subscription URLs.

Backup ZIP не зашифрован и может содержать credentials узлов, URL подписок и секретные ключи age. Храните его как конфиденциальный файл и при необходимости делайте отдельную копию. System-level cloud backup может не включать такие архивы.

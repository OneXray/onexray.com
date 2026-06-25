---
title: Backup and Restore
weight: 6
---

Backup экспортирует данные OneXray в ZIP file, который можно сохранить, передать и позже импортировать.

# Included Data

| Data | Included |
| --- | --- |
| Local Xray Settings | Yes |
| Local outbound nodes | Yes |
| Raw Json configs | Yes |
| Subscriptions | Yes, as subscription records and URLs |
| Subscription node rows | No; they are downloaded again from subscription URLs during restore. |
| Custom GeoData rows | Yes |
| Custom GeoData `.dat` and generated `.json` files | Yes |
| Built-in `geosite` and `geoip` rows | No; they are restored from bundled assets. |
| Simple Setting preferences | No; kept outside backup data. |
| Other app preferences | No |

# File Structure

Backup files are named by date:

```text
OneXray-yyyy-MM-dd.zip
```

Outer ZIP structure:

```text
timestamp.txt
sha256sum.txt
data.zip
```

`data.zip` contains:

```text
manifest.json
core_configs.json
subscriptions.json
geo_data.json
dat/
```

`manifest.json` identifies the current structured v2 backup format. Backups without this manifest are not restored by current OneXray versions.

`core_configs.json` contains local configs only. It does not contain subscription nodes.

`subscriptions.json` contains subscription name, URL, timestamp, and expanded state. During restore, OneXray recreates subscriptions and refreshes their URLs to download nodes again.

`geo_data.json` contains custom GeoData metadata. The `dat/` directory contains matching custom `.dat` files and generated `.json` summaries.

# Restore

Restore clears OneXray business data and the GeoData runtime directory, restores bundled `geosite` and `geoip`, copies custom GeoData files from backup, restores local configs, restores subscriptions, and refreshes subscription URLs.

Keep a separate copy of important backup ZIP files. System-level cloud backups may not include user-managed backup archives.

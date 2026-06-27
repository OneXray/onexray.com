---
title: Backup and Restore
weight: 6
---

Backup exports OneXray data to a ZIP file that can be saved, shared, and imported later.

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

ZIP root structure:

```text
manifest.json
core_configs.json
subscriptions.json
geo_data.json
dat/
```

`manifest.json` identifies the backup as the current structured v3 format and stores the backup creation timestamp. Backups without a v3 manifest are not restored by current OneXray versions.

`core_configs.json` contains local configs only. It does not contain subscription nodes.

`subscriptions.json` contains subscription name, URL, timestamp, and expanded state. During restore, OneXray recreates the subscriptions and refreshes their URLs to download nodes again.

`geo_data.json` contains custom GeoData metadata. The `dat/` directory contains matching custom `.dat` files and generated `.json` summaries.

# Restore

Restore clears OneXray business data and the GeoData runtime directory, restores bundled `geosite` and `geoip`, copies custom GeoData files from the backup, restores local configs, restores subscriptions, and refreshes subscription URLs.

Keep a separate copy of important backup ZIP files. System-level cloud backups may not include user-managed backup archives.

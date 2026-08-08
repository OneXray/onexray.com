---
title: Backup and Restore
weight: 6
---

Backup exports OneXray data to a ZIP file that can be saved, shared, and imported later.

# Included Data

| Data | Included |
| --- | --- |
| Local Xray Profiles | Yes |
| Local outbound nodes | Yes |
| Full Configs | Yes |
| Raw Json configs | Yes |
| Subscriptions | Yes, including URLs and optional age key pairs |
| Subscription node rows | No; they are downloaded again from subscription URLs during restore. |
| Custom GeoData rows | Yes |
| Custom GeoData `.dat` and generated `.json` files | Yes |
| Built-in `geosite` and `geoip` rows | No; they are restored from bundled assets. |
| Simple Profile preferences | No; kept outside backup data. |
| Other app preferences | No |

# File Structure

Backup files include the creation date and time so multiple backups created on
the same day do not overwrite each other:

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

`manifest.json` identifies the current structured v4 format and stores the backup creation timestamp. OneXray can restore structured v3 and v4 backups; archives without a supported manifest are rejected.

`core_configs.json` contains local configs only. It does not contain subscription nodes.

`subscriptions.json` contains subscription name, URL, optional age public/secret keys, timestamp, and expanded state. During restore, OneXray recreates the subscriptions and refreshes their URLs to download nodes again.

`geo_data.json` contains custom GeoData metadata. The `dat/` directory contains matching custom `.dat` files and generated `.json` summaries.

# Restore

Restore clears OneXray business data and the GeoData runtime directory, restores bundled `geosite` and `geoip`, copies custom GeoData files from the backup, restores local configs, restores subscriptions, and refreshes subscription URLs.

Backup ZIP files are not encrypted and may contain node credentials, subscription URLs, and age secret keys. Store them as sensitive files and keep a separate copy when needed. System-level cloud backups may not include user-managed backup archives.

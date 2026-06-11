---
title: Backup and Restore
weight: 6
---

Backup exports OneXray data to a ZIP file that can be shared, saved, and imported later.

# Included Data

| Data | Included |
| --- | --- |
| Local Xray Settings | Yes |
| Local outbound nodes | Yes |
| Raw Configs | Yes |
| Subscriptions | Yes, as subscription links |
| Custom GeoData rows | Yes |
| Custom GeoData `.dat` and generated `.json` files | Yes |
| Subscription node rows | No; they are downloaded again from subscription URLs during restore. |
| Simple Setting preferences | No |
| Other app preferences | No |

# File Structure

Backup files are named by date:

```text
OneXray-yyyy-MM-dd.zip
```

Internal structure:

```text
timestamp.txt
sha256sum.txt
data.zip
```

`data.zip` contains:

```text
config.txt
subscription.txt
dat.txt
dat/
```

The text files contain OneXray share links. The `dat` directory contains custom GeoData files.

# Restore

Restore clears local OneXray data, restores bundled system GeoData assets, copies backed-up custom GeoData files, then imports the saved share links.

Keep a separate copy of important backup ZIP files. System-level cloud backups may not include user-managed backup archives.

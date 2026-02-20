---
title: Backup and Restore
weight: 5
---

# Backup

The backup feature will back up the following information.

1. All "Xray Setting".
2. All "Local" outbounds.
3. All "Raw Config".
4. All "Subscription".
5. All "Rule Set".
6. Rule Set associated geosite.dat and geoip.dat files.

The following information will not be backed up.

1. "Outbound" in subscriptions. This data will be re-downloaded when restoring.
2. All "Simple" configurations.
3. Other configuration information.

## Backup Files

The backup files will be sorted by date. If a backup already exists on that day, the new backup file will overwrite the old one.

Backup files can be shared and saved. You can also import backup files from external sources.

# Restore

Restoring will delete all your data and then re-import it from the backup file.

# System Backup

When you flash or replace a device, the database and configuration information will be restored.
However, the geosite.dat and geoip.dat files associated with custom rule sets will not be restored.
After you restore the system, you will need to download these files again. You can click the "Refresh" button on the rule set page to download these files.

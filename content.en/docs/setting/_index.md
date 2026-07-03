---
title: Settings
weight: 5
---

Settings contains app-level preferences and maintenance tools.

| Section | Page or action | Purpose |
| --- | --- | --- |
| Data | Auto Update | Refresh subscriptions and GeoData on a schedule after the app has initialized. |
| Data | App update check | Check the current app release channel for updates. |
| Data | Clear Data | Delete business data, runtime files, cache, and custom GeoData while keeping app preferences and local backup files. |
| App | Backup | Export and restore OneXray data. |
| App | App Icon | Change the iOS app icon. |
| App | Toolbox | macOS utility actions. |
| App | Theme | Select the app theme. |
| App | Language | Select the app language. |
| Support | Docs, Review, Telegram, Issues, Source Code, Credits, Privacy | Support and project information. |
| Version | App and Xray versions | Show the installed app version and bundled Xray-core version. |

Xray-core related pages moved to [Core]({{< relref path="../core/_index.md" lang="en" >}}). TUN, Ping, Logs, Xray Profiles, and GeoData are no longer shown as Settings root items.

# Clear Data

Clear Data stops the VPN first. If the VPN cannot be stopped, cleanup is cancelled.

When cleanup succeeds, OneXray removes local configs, subscriptions, GeoData database rows, runtime files, app cache, and custom GeoData files. Built-in `geosite` and `geoip` are restored.

The operation keeps local backup ZIP files and app preferences such as privacy acceptance, first-run state, Simple Profile, TUN Settings, theme, language, Dock setting, query-all-packages acceptance, and the iOS native app icon. After cleanup, the selected Xray Profile is reset to `Simple`.

---
title: Settings
weight: 5
---

Settings contains app-level preferences, maintenance, version information, and support links.

| Section | Contents |
| --- | --- |
| Data | Auto Update, manual app update check, and Clear Data. |
| App | Backup, App Icon on iOS, Toolbox on macOS, Theme, and Language. |
| Version | Installed OneXray and Xray-core versions. |
| Support | Documentation, review, Telegram, issues, source, credits, and privacy. |

OneXray checks for a newer stable GitHub release after startup, but it no longer opens an update dialog automatically. An available update appears as an indicator on Settings in the mobile navigation or as a clickable item at the bottom of the desktop rail. The full Markdown release notes dialog opens only after a user action.

# Clear Data

Clear Data first stops the VPN. If stop fails, cleanup is cancelled.

Successful cleanup removes configs, subscriptions, GeoData database rows, runtime files, cache, and custom GeoData. Built-in `geosite` and `geoip` are restored, and the selected Xray Profile returns to Simple Profile.

Local backup ZIP files and app preferences such as privacy acceptance, first-run state, Simple Profile, TUN Settings, theme, language, and platform-specific appearance preferences are kept.

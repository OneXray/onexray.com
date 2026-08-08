---
title: Settings
weight: 5
---

Settings contains app-level preferences, maintenance, version information, and support links.

| Section | Contents |
| --- | --- |
| Data | Auto Update, manual app update check, and Clear Data. |
| App | General network/startup behavior, desktop startup, Backup, App Icon on iOS, Theme, and Language. |
| Version | Installed OneXray and Xray-core versions. |
| Support | Documentation, review, Telegram, issues, source, credits, and privacy. |

OneXray checks for a newer stable GitHub release after startup, but it no longer opens an update dialog automatically. An available update appears as an indicator on Settings in the mobile navigation or as a clickable item at the bottom of the desktop rail. The full Markdown release notes dialog opens only after a user action.

# General

The General page contains `Connect on App Launch` and the download `User-Agent` mode:

| Mode | Behavior |
| --- | --- |
| System User-Agent | Uses the real system browser identity on Android, iOS, and macOS. Windows and Linux use a compatible fixed browser identity. If the system value cannot be read, OneXray falls back to its own identity. |
| OneXray User-Agent | Sends a OneXray identity containing the app version, package, build, and platform. |

The selected identity is used by the download client for subscriptions and GeoData. System User-Agent is the default.

# Startup

`Connect on App Launch` is available on every platform and is off by default. When enabled, OneXray starts the last usable configuration after app services are ready. If that configuration no longer exists, it selects a random node. Direct mode can start without a node.

Desktop platforms also provide a `Desktop` page:

| Setting | Platforms | Behavior |
| --- | --- | --- |
| Launch at Login | macOS, Windows, Linux | Registers OneXray with the operating system's per-user startup mechanism. |
| Start Hidden | macOS, Windows, Linux | Keeps the main window hidden whenever the app starts. This is independent of Launch at Login. |
| Hide icon in Dock | macOS | Hides the Dock icon and applies immediately to the current session. |

macOS may require approval under `System Settings > General > Login Items`. OneXray provides a link to that page when approval is required.

# Clear Data

Clear Data first stops the VPN. If stop fails, cleanup is cancelled.

Successful cleanup removes configs, subscriptions, GeoData database rows, runtime files, cache, and custom GeoData. Built-in `geosite` and `geoip` are restored, and the selected Xray Profile returns to Simple Profile.

Cleanup also unregisters Launch at Login and resets Connect on App Launch, Start Hidden, and the download User-Agent to System. Local backup ZIP files and other app preferences, including privacy acceptance, first-run state, Simple Profile, TUN Settings, theme, language, and platform-specific appearance preferences, are kept.

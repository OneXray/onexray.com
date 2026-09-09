---
title: "Settings"
description: "Manage system-following theme and language, icons, desktop startup, download identity, updates, and local data."
weight: 60
lastmod: 2026-09-09
---

Settings contains app preferences rather than VPN tunnel or Xray runtime settings.

## Appearance and language

Theme and language follow the system on first installation. You can choose light/dark appearance or a supported language explicitly:

- English
- Simplified Chinese
- Traditional Chinese
- Russian
- Persian, with right-to-left layout

Unsupported system languages fall back to English. JSON, URLs, IPs, and logs keep left-to-right layout. Apple editions expose app-icon choices where supported.

## Startup

Connect when the app opens is separate from desktop launch at login and start hidden. All default to off.

Closing a desktop window hides it. On macOS/MSIX, use Quit and Stop VPN when you want to disconnect as well as exit; EXE/ZIP and Linux Quit stop VPN first.

## Download identity

The general network preference selects OneXray or System User-Agent for subscription and GeoData downloads. **OneXray is the default.** The current resolved value is visible; this is a request identifier, not analytics.

## Version and support

About shows the App version, update information, and support links. The About section also displays the Xray-core version. An available app update adds a dot to About; desktop navigation also shows a reminder. There is no separate Check App updates row on Settings.

Subscription and GeoData schedules are under [Advanced > Xray > Data updates]({{< relref "/docs/advanced/data-updates" >}}).

## Clear data

Clear data stops VPN before deleting application configuration, subscriptions, custom routing data, and preferences, then recreates default routing data. A failed stop prevents deletion. Privacy/setup completion is not reset.

This is destructive. Export individual items you need beforehand. **App backup and backup import/restore are not available.** Sharing individual nodes, subscriptions, custom routes, and Raw JSON remains supported.

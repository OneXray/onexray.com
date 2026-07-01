---
title: OneXray
type: docs
---

OneXray is a cross-platform Xray-core client for iOS, macOS, Android, Windows, and Linux.

The current app is organized around four primary areas:

| Area | Purpose |
| --- | --- |
| Home | Connection status, the selected node, VPN start and stop, and the main Outbound / Raw Json node lists. |
| Subscriptions | Subscription source management and per-subscription outbound node lists. |
| Core | Xray-core related settings such as TUN, Ping, Logs, Xray Settings, and GeoData. |
| Settings | App preferences, auto update, backup, clear data, support links, credits, and privacy. |

On phones, these areas are shown in the bottom navigation. On tablets and desktops, they are shown in the side rail. Secondary pages stay scoped under the current primary area.

## Download

| Platform | Requirements | Download |
| --- | --- | --- |
| iOS | iOS 15.0 and above, arm64 | [App Store](https://apps.apple.com/us/app/onexray/id6745748773), [IPA](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-ios.ipa) |
| macOS (Mac App Store) | macOS 12.0 and above, Apple silicon or Intel | [App Store](https://apps.apple.com/us/app/onexray/id6745748773) |
| macOS (Outside App Store) | macOS 12.0 and above, Apple silicon or Intel | Homebrew: `brew install --cask onexrayse`, [Universal ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-macos-universal.zip) |
| Android | Android 10.0 and above, arm32, arm64, or x86_64 | [Google Play](https://play.google.com/store/apps/details?id=net.yuandev.onexray), [Universal APK](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-android-universal.apk) |
| Windows | Windows 10 or Windows 11, x86_64 | winget: `winget install --id YuanDevLLC.OneXray -e`, [EXE](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-windows-amd64.exe), [ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-windows-amd64.zip) |
| Linux x86_64 | GLIBC >= 2.39 | [DEB](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-x86_64.deb), [ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-x86_64.zip) |
| Linux arm64 | GLIBC >= 2.39 | [DEB](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-aarch64.deb), [ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-aarch64.zip) |

For macOS outside-App-Store distribution, Windows winget, and Linux ZIP setup, see [Install]({{< relref path="docs/install/index.md" lang="en" >}}).

For integration notes and exact runtime semantics, start with the [AI reference]({{< relref path="docs/reference/index.md" lang="en" >}}) and the [Develop]({{< relref path="docs/develop/index.md" lang="en" >}}) page.

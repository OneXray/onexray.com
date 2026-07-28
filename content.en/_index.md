---
title: OneXray
type: docs
---

OneXray is a cross-platform Xray-core client for iOS, macOS, Android, Windows, and Linux.

The app is organized around four primary areas:

| Area | Purpose |
| --- | --- |
| Home | Connection state, Rule/Global/Direct routing, the active Xray Profile, traffic, location, and the node list. |
| Subscriptions | Subscription sources and their outbound nodes. |
| Core | TUN, Ping, Xray Profiles, GeoData, logs, and the generated Final Config. |
| Settings | Updates, startup behavior, backup, appearance, language, support, versions, credits, and privacy. |

Phones use bottom navigation. Tablets and desktops use a navigation rail. The responsive editors keep the same fields while adapting their navigation and layout to the available width.

## Download

| Platform | Requirements | Download |
| --- | --- | --- |
| iOS | iOS 15.0 and above, arm64 | [App Store](https://apps.apple.com/us/app/onexray/id6745748773), [IPA](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-ios.ipa) |
| macOS (Mac App Store) | macOS 13.0 and above, Apple silicon or Intel | [App Store](https://apps.apple.com/us/app/onexray/id6745748773) |
| macOS (Outside App Store) | macOS 13.0 and above, Apple silicon or Intel | Homebrew: `brew install --cask onexrayse`, [Universal ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-macos-universal.zip) |
| Android | Android 10.0 and above, arm64-v8a or x86_64 | [Google Play](https://play.google.com/store/apps/details?id=net.yuandev.onexray), [Universal APK](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-android-universal.apk) |
| Windows x86_64 | Windows 10 or Windows 11 | winget: `winget install --id YuanDevLLC.OneXray -e`, [EXE](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-windows-amd64.exe), [ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-windows-amd64.zip) |
| Windows ARM64 | Windows 11 | winget: `winget install --id YuanDevLLC.OneXray -e`, [EXE](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-windows-arm64.exe), [ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-windows-arm64.zip) |
| Linux x86_64 | GLIBC >= 2.39 | [DEB](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-x86_64.deb), [ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-x86_64.zip) |
| Linux arm64 | GLIBC >= 2.39 | [DEB](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-aarch64.deb), [ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-aarch64.zip) |

See [Install]({{< relref path="docs/install/index.md" lang="en" >}}) for platform-specific setup.

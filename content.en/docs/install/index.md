---
title: "Install OneXray"
description: "Download OneXray for iOS, macOS, Android, Windows, and Linux. Compare Windows EXE/ZIP and MSIX, and Mac App Store and OneXraySE."
weight: 10
lastmod: 2026-09-11
---

## Choose your platform

| Platform | Requirements | Downloads |
| --- | --- | --- |
| iPhone / iPad | iOS / iPadOS 15+ | [App Store](https://apps.apple.com/us/app/onexray/id6745748773) · [IPA](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-ios.ipa) |
| Mac App Store | macOS 13+, Apple silicon or Intel | [App Store](https://apps.apple.com/us/app/onexray/id6745748773) |
| Mac — OneXraySE | macOS 13+, Apple silicon or Intel | [Homebrew](https://formulae.brew.sh/cask/onexrayse) · [Universal ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-macos-universal.zip) |
| Android phones / tablets | Android 10+, arm64-v8a or x86_64 | [Google Play](https://play.google.com/store/apps/details?id=net.yuandev.onexray) · [APK](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-android-universal.apk) |
| Windows x64 | Windows 10 20H2+ | winget · [ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-windows-amd64.zip) · [Microsoft Store](https://apps.microsoft.com/detail/9NJ0MVHW215D) |
| Windows ARM64 | Windows 11 | winget · [ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-windows-arm64.zip) · [Microsoft Store](https://apps.microsoft.com/detail/9NJ0MVHW215D) |
| Linux x86_64 | glibc 2.39+ | [DEB](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-x86_64.deb) · [ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-x86_64.zip) |
| Linux arm64 | glibc 2.39+ | [DEB](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-aarch64.deb) · [ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-aarch64.zip) |

See [release notes and available assets](https://github.com/OneXray/OneXray/releases). Android 32-bit ARM is not supported.

## Windows

Install the standalone EXE through winget:

```powershell
winget install --id YuanDevLLC.OneXray -e
```

EXE and ZIP use a native TUN. Starting VPN requests administrator approval for Core, not for the main app. Extract the **entire ZIP** before opening OneXray; it does not register links or create shortcuts automatically.

The [Microsoft Store](https://apps.microsoft.com/detail/9NJ0MVHW215D) edition uses MSIX and Windows system VPN without UAC for Core. EXE/ZIP and MSIX have separate data locations; switching channels is not an in-place data migration. Both require an explicit Xray outbound-interface selection. [Windows behavior]({{< relref "/docs/advanced/windows" >}}).

## macOS

Mac App Store uses a Packet Tunnel extension. OneXraySE uses a System Extension:

```shell
brew install --cask onexrayse
```

For ZIP, move OneXraySE.app to /Applications before opening it. Complete setup and approve the VPN/Network Extension requests. macOS may direct you to Login Items & Extensions or Privacy & Security; follow any restart prompt. To update the ZIP edition, quit the app, replace it in /Applications, and approve extension updates if requested.

See [Apple's System Extension installation guide](https://developer.apple.com/documentation/systemextensions/installing-system-extensions-and-drivers).

## iOS IPA

The App Store is the simplest option. Sideloading an IPA requires re-signing both the app and its Packet Tunnel extension with profiles that permit Network Extension. A free Personal Team does not provide that capability. See [Apple's supported capabilities](https://developer.apple.com/help/account/reference/supported-capabilities-ios/).

## Linux

On Debian/Ubuntu, the DEB installs dependencies and grants Core its network capabilities:

```shell
sudo apt install ./OneXray-linux-x86_64.deb
```

Use OneXray-linux-aarch64.deb for arm64. For a ZIP build, run from the directory containing the extracted OneXray folder:

```shell
sudo apt install -y procps libcap2-bin libayatana-appindicator3-1
sudo setcap cap_net_admin,cap_net_raw+eip OneXray/OneXrayCore
```

Reapply capabilities if an update replaces Core. ZIP does not register onexray:// links. GNOME may need the [AppIndicator extension](https://github.com/ubuntu/gnome-shell-extension-appindicator) for tray controls.

Continue with [first connection]({{< relref "/docs/getting-started" >}}).

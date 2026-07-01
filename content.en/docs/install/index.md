---
title: Install
weight: 1
---

# Platform Support

| Platform | Minimum system | Distribution | Download |
| --- | --- | --- | --- |
| iOS | iOS 15 | App Store, IPA | [App Store](https://apps.apple.com/us/app/onexray/id6745748773), [IPA](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-ios.ipa) |
| macOS (Mac App Store) | macOS 12 | Mac App Store | [App Store](https://apps.apple.com/us/app/onexray/id6745748773) |
| macOS (Outside App Store) | macOS 12 | Homebrew, ZIP | Homebrew: `brew install --cask onexrayse`<br>[Universal ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-macos-universal.zip) |
| Android | Android 10 | Google Play, APK | [Google Play](https://play.google.com/store/apps/details?id=net.yuandev.onexray), [Universal APK](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-android-universal.apk) |
| Windows x86_64 | Windows 10 | winget, EXE, ZIP | winget: `winget install --id YuanDevLLC.OneXray -e`<br>[EXE](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-windows-amd64.exe), [ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-windows-amd64.zip) |
| Linux x86_64 | glibc 2.39 | DEB, ZIP | [DEB](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-x86_64.deb), [ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-x86_64.zip) |
| Linux arm64 | glibc 2.39 | DEB, ZIP | [DEB](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-aarch64.deb), [ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-aarch64.zip) |

OneXray bundles Xray-core and the platform network integration required by the app. The VPN is started and stopped from the app UI.

# macOS Outside App Store

The Homebrew cask token is `onexrayse`.

Homebrew installs the same Developer ID `macos_se` package as `OneXray-macos-universal.zip`, and the app bundle is `OneXraySE.app`. The Mac App Store version is a separate store package.

```shell
brew install --cask onexrayse
brew uninstall --cask onexrayse
```

# Windows winget

Install or uninstall OneXray with winget:

```shell
winget install --id YuanDevLLC.OneXray -e
winget uninstall --id YuanDevLLC.OneXray -e
```

# Linux ZIP

Install runtime dependencies:

```shell
sudo apt install -y procps libcap2-bin libayatana-appindicator3-1
```

Grant the core binary the capability required to create and operate the TUN device:

```shell
sudo setcap cap_net_admin,cap_net_raw+eip OneXray/bin/OneXrayCore
```

GNOME users may need an AppIndicator extension to show the tray icon.

# Linux DEB

Install:

```shell
sudo apt install ./OneXray-linux-x86_64.deb
```

Remove:

```shell
sudo apt remove onexray
```

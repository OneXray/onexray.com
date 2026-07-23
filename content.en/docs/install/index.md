---
title: Install
weight: 1
---

# Platform Support

| Platform | Minimum system | Distribution | Download |
| --- | --- | --- | --- |
| iOS | iOS 15 | App Store, IPA | [App Store](https://apps.apple.com/us/app/onexray/id6745748773), [IPA](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-ios.ipa) |
| macOS (Mac App Store) | macOS 12 | Mac App Store | [App Store](https://apps.apple.com/us/app/onexray/id6745748773) |
| macOS (Outside App Store) | macOS 12 | Homebrew, ZIP | `brew install --cask onexrayse`<br>[Universal ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-macos-universal.zip) |
| Android | Android 10, arm64-v8a or x86_64 | Google Play, APK | [Google Play](https://play.google.com/store/apps/details?id=net.yuandev.onexray), [Universal APK](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-android-universal.apk) |
| Windows x86_64 | Windows 10 | winget, EXE, ZIP | [EXE](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-windows-amd64.exe), [ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-windows-amd64.zip) |
| Windows ARM64 | Windows 11 | winget, EXE, ZIP | [EXE](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-windows-arm64.exe), [ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-windows-arm64.zip) |
| Linux x86_64 | glibc 2.39 | DEB, ZIP | [DEB](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-x86_64.deb), [ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-x86_64.zip) |
| Linux arm64 | glibc 2.39 | DEB, ZIP | [DEB](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-aarch64.deb), [ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-aarch64.zip) |

Android supports only `arm64-v8a` and `x86_64`. 32-bit ARM is not supported.

# macOS Outside App Store

Homebrew and the Universal ZIP contain the same Developer ID `macos_se` package and install `OneXraySE.app`. The Mac App Store build is a separate package.

```shell
brew install --cask onexrayse
brew uninstall --cask onexrayse
```

# Windows

Winget selects the installer matching x86_64 or ARM64:

```powershell
winget install --id YuanDevLLC.OneXray -e
winget uninstall --id YuanDevLLC.OneXray -e
```

# Linux DEB

The DEB installs under `/opt/OneXray` and grants the bundled Core its required network capabilities during installation.

```shell
sudo apt install ./OneXray-linux-x86_64.deb
sudo apt remove onexray
```

Use `OneXray-linux-aarch64.deb` on arm64.

# Linux ZIP

Install dependencies, then grant capabilities to the Core inside the extracted directory:

```shell
sudo apt install -y procps libcap2-bin libayatana-appindicator3-1
sudo setcap cap_net_admin,cap_net_raw+eip OneXray/bin/OneXrayCore
```

Run the command from the directory containing the extracted `OneXray` folder, or replace the path with its absolute path. GNOME may also require the [AppIndicator extension](https://extensions.gnome.org/extension/615/appindicator-support/).

Linux arm64 currently falls back to English for CJK locales.

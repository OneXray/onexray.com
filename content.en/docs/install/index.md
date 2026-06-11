---
title: Install
weight: 1
---

# Platform Support

| Platform | Minimum system | Distribution | Download |
| --- | --- | --- | --- |
| iOS | iOS 15 | App Store, IPA | [App Store](https://apps.apple.com/us/app/onexray/id6745748773), [IPA](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-ios.ipa) |
| macOS | macOS 12 | Mac App Store, ZIP | [Mac App Store](https://apps.apple.com/us/app/onexray/id6745748773), [Universal ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-macos-universal.zip) |
| Android | Android 10 | Google Play, APK | [Google Play](https://play.google.com/store/apps/details?id=net.yuandev.onexray), [Universal APK](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-android-universal.apk) |
| Windows x86_64 | Windows 10 | EXE, ZIP | [EXE](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-windows-amd64.exe), [ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-windows-amd64.zip) |
| Linux x86_64 | glibc 2.39 | DEB, ZIP | [DEB](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-x86_64.deb), [ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-x86_64.zip) |
| Linux arm64 | glibc 2.39 | DEB, ZIP | [DEB](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-aarch64.deb), [ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-aarch64.zip) |

OneXray bundles Xray-core and the platform network integration required by the app. The VPN is normally started from the app. Desktop builds also include a CLI that controls the running app through a local Automation API.

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

# Desktop CLI

Desktop packages include the `onexray` CLI. The app must be open before CLI commands can work.

```shell
onexray health
onexray status
onexray import --file /path/to/import.txt
onexray import --text 'vless://...'
```

See [Develop]({{< relref path="../develop/index.md" lang="en" >}}) for the full CLI and API contract.

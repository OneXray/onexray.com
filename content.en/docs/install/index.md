---
title: Install
weight: 1
---

# Platform Support

| Platform | Minimum system | Distribution |
| --- | --- | --- |
| iOS | iOS 15 | App Store, IPA |
| macOS | macOS 12 | Mac App Store, PKG, ZIP |
| Android | Android 10 | Google Play, AAB, APK |
| Windows | Windows 10 | EXE, ZIP |
| Linux | glibc 2.39 | DEB, ZIP |

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

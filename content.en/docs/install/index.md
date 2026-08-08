---
title: Install
weight: 1
---

# Platform Support

| Platform | Minimum system | Distribution | Download |
| --- | --- | --- | --- |
| iOS | iOS 15 | App Store, IPA | [App Store](https://apps.apple.com/us/app/onexray/id6745748773), [IPA](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-ios.ipa) |
| macOS (Mac App Store) | macOS 13 | Mac App Store | [App Store](https://apps.apple.com/us/app/onexray/id6745748773) |
| macOS (Outside App Store) | macOS 13 | Homebrew, ZIP | `brew install --cask onexrayse`<br>[Universal ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-macos-universal.zip) |
| Android | Android 10, arm64-v8a or x86_64 | Google Play, APK | [Google Play](https://play.google.com/store/apps/details?id=net.yuandev.onexray), [Universal APK](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-android-universal.apk) |
| Windows x86_64 | Windows 10 | winget, EXE, ZIP | [EXE](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-windows-amd64.exe), [ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-windows-amd64.zip) |
| Windows ARM64 | Windows 11 | winget, EXE, ZIP | [EXE](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-windows-arm64.exe), [ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-windows-arm64.zip) |
| Linux x86_64 | glibc 2.39 | DEB, ZIP | [DEB](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-x86_64.deb), [ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-x86_64.zip) |
| Linux arm64 | glibc 2.39 | DEB, ZIP | [DEB](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-aarch64.deb), [ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-aarch64.zip) |

Android supports only `arm64-v8a` and `x86_64`. 32-bit ARM is not supported.

# iOS IPA

Self-installing the IPA requires re-signing both OneXray and its Packet Tunnel extension with a provisioning profile that authorizes the Network Extension capability. Apple does not support this capability for free Personal Team accounts, so a paid Apple Developer Program membership is required. Without it, the app may open and ping nodes, but the VPN cannot start.

See [Apple Developer Forums](https://developer.apple.com/forums/thread/128767) and [Supported capabilities (iOS)](https://developer.apple.com/help/account/reference/supported-capabilities-ios/).

# macOS Outside App Store

Homebrew and the Universal ZIP contain the same Developer ID `macos_se` package and install `OneXraySE.app`. The Mac App Store build is a separate package.

```shell
brew install --cask onexrayse
brew uninstall --cask onexrayse
```

## Universal ZIP

1. Download and extract `OneXray-macos-universal.zip`.
2. Move `OneXraySE.app` to `/Applications`. Do not run it directly from Downloads or another folder; macOS requires an app containing a System Extension to be installed in a system Applications directory.
3. Open OneXraySE from Applications and accept the macOS launch confirmation.

For the first VPN connection:

1. Import a subscription or node, select a node, and click Start.
2. Open **System Settings > General > Login Items & Extensions**.
3. Under **Extensions**, open **Network Extensions**, enable **OneXraySE**, and click **Done**.
4. If **Privacy & Security** also shows an approval request, click **Allow** and restart the Mac if requested.
5. Return to OneXraySE and click Start again.

To update the ZIP build, quit OneXraySE, replace the existing app in `/Applications` with the newly extracted `OneXraySE.app`, and reopen it. Approve the System Extension update if macOS asks.

See [Installing System Extensions and Drivers](https://developer.apple.com/documentation/systemextensions/installing-system-extensions-and-drivers) and [Change Login Items & Extensions settings](https://support.apple.com/guide/mac-help/change-login-items-extension-settings-mtusr003/mac).

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

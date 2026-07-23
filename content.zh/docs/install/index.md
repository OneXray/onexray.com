---
title: 安装
weight: 1
---

# 平台支持

| 平台 | 最低系统 | 分发方式 | 下载 |
| --- | --- | --- | --- |
| iOS | iOS 15 | App Store、IPA | [App Store](https://apps.apple.com/us/app/onexray/id6745748773)、[IPA](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-ios.ipa) |
| macOS（Mac App Store） | macOS 12 | Mac App Store | [App Store](https://apps.apple.com/us/app/onexray/id6745748773) |
| macOS（商店外分发） | macOS 12 | Homebrew、ZIP | `brew install --cask onexrayse`<br>[Universal ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-macos-universal.zip) |
| Android | Android 10，arm64-v8a 或 x86_64 | Google Play、APK | [Google Play](https://play.google.com/store/apps/details?id=net.yuandev.onexray)、[Universal APK](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-android-universal.apk) |
| Windows x86_64 | Windows 10 | winget、EXE、ZIP | [EXE](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-windows-amd64.exe)、[ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-windows-amd64.zip) |
| Windows ARM64 | Windows 11 | winget、EXE、ZIP | [EXE](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-windows-arm64.exe)、[ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-windows-arm64.zip) |
| Linux x86_64 | glibc 2.39 | DEB、ZIP | [DEB](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-x86_64.deb)、[ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-x86_64.zip) |
| Linux arm64 | glibc 2.39 | DEB、ZIP | [DEB](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-aarch64.deb)、[ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-aarch64.zip) |

Android 仅支持 `arm64-v8a` 和 `x86_64`，不支持 32 位 ARM。

# macOS 商店外分发

Homebrew 和 Universal ZIP 包含同一份 Developer ID `macos_se` 包，安装 `OneXraySE.app`。Mac App Store 是独立商店包。

```shell
brew install --cask onexrayse
brew uninstall --cask onexrayse
```

# Windows

Winget 会自动选择 x86_64 或 ARM64 安装程序：

```powershell
winget install --id YuanDevLLC.OneXray -e
winget uninstall --id YuanDevLLC.OneXray -e
```

# Linux DEB

DEB 安装到 `/opt/OneXray`，并在安装过程中为内置 Core 设置所需网络 capability。

```shell
sudo apt install ./OneXray-linux-x86_64.deb
sudo apt remove onexray
```

arm64 请使用 `OneXray-linux-aarch64.deb`。

# Linux ZIP

安装依赖后，为解压目录中的 Core 授权：

```shell
sudo apt install -y procps libcap2-bin libayatana-appindicator3-1
sudo setcap cap_net_admin,cap_net_raw+eip OneXray/bin/OneXrayCore
```

请在包含 `OneXray` 解压目录的位置执行，或替换为绝对路径。GNOME 可能还需要安装 [AppIndicator 扩展](https://extensions.gnome.org/extension/615/appindicator-support/)。

Linux arm64 当前会将 CJK locale 回退为英文。

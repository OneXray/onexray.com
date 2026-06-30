---
title: 安装
weight: 1
---

# 平台支持

| 平台 | 最低系统 | 分发方式 | 下载 |
| --- | --- | --- | --- |
| iOS | iOS 15 | App Store、IPA | [App Store](https://apps.apple.com/us/app/onexray/id6745748773)、[IPA](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-ios.ipa) |
| macOS | macOS 12 | Mac App Store、Homebrew / ZIP（OneXraySE） | Mac App Store：[App Store](https://apps.apple.com/us/app/onexray/id6745748773)<br>Homebrew：`brew install --cask onexrayse`<br>[Universal ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-macos-universal.zip) |
| Android | Android 10 | Google Play、APK | [Google Play](https://play.google.com/store/apps/details?id=net.yuandev.onexray)、[Universal APK](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-android-universal.apk) |
| Windows x86_64 | Windows 10 | EXE、ZIP | [EXE](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-windows-amd64.exe)、[ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-windows-amd64.zip) |
| Linux x86_64 | glibc 2.39 | DEB、ZIP | [DEB](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-x86_64.deb)、[ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-x86_64.zip) |
| Linux arm64 | glibc 2.39 | DEB、ZIP | [DEB](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-aarch64.deb)、[ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-aarch64.zip) |

OneXray 内置 Xray-core 和各平台所需的网络集成。VPN 通过 App UI 启动和停止。

# macOS Homebrew / ZIP

Homebrew cask token 是 `onexrayse`。

Homebrew 安装的内容来自 `OneXray-macos-universal.zip`，和 Universal ZIP 一样都是 Developer ID `macos_se` 包，App bundle 为 `OneXraySE.app`。Mac App Store 版本是单独的商店包。

```shell
brew install --cask onexrayse
brew uninstall --cask onexrayse
```

# Linux ZIP

先安装运行依赖：

```shell
sudo apt install -y procps libcap2-bin libayatana-appindicator3-1
```

给核心二进制文件授予创建和操作 TUN 设备所需的 capability：

```shell
sudo setcap cap_net_admin,cap_net_raw+eip OneXray/bin/OneXrayCore
```

GNOME 用户可能需要安装 AppIndicator 扩展才能显示托盘图标。

# Linux DEB

安装：

```shell
sudo apt install ./OneXray-linux-x86_64.deb
```

卸载：

```shell
sudo apt remove onexray
```

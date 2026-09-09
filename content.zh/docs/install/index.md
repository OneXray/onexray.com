---
title: "安装 OneXray"
description: "下载 iOS、macOS、Android、Windows 和 Linux 版本，了解 EXE/ZIP、MSIX 以及 Mac App Store 与 OneXraySE 的区别。"
weight: 10
lastmod: 2026-09-09
---

## 选择平台

| 平台 | 系统要求 | 下载 |
| --- | --- | --- |
| iPhone / iPad | iOS / iPadOS 15+ | [App Store](https://apps.apple.com/us/app/onexray/id6745748773) · [IPA](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-ios.ipa) |
| Mac App Store | macOS 13+，Apple 芯片或 Intel | [App Store](https://apps.apple.com/us/app/onexray/id6745748773) |
| Mac — OneXraySE | macOS 13+，Apple 芯片或 Intel | [Homebrew](https://formulae.brew.sh/cask/onexrayse) · [Universal ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-macos-universal.zip) |
| Android 手机 / 平板 | Android 10+，arm64-v8a 或 x86_64 | [Google Play](https://play.google.com/store/apps/details?id=net.yuandev.onexray) · [APK](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-android-universal.apk) |
| Windows x64 | Windows 10 20H2+ | winget · [ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-windows-amd64.zip) · Microsoft Store |
| Windows ARM64 | Windows 11 | winget · [ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-windows-arm64.zip) · Microsoft Store |
| Linux x86_64 | glibc 2.39+ | [DEB](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-x86_64.deb) · [ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-x86_64.zip) |
| Linux arm64 | glibc 2.39+ | [DEB](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-aarch64.deb) · [ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-aarch64.zip) |

完整更新说明和安装包见 [Releases](https://github.com/OneXray/OneXray/releases)。Android 不支持 32 位 ARM。

## Windows

通过 winget 安装独立 EXE 版本：

```powershell
winget install --id YuanDevLLC.OneXray -e
```

EXE 与 ZIP 使用原生 TUN。启动 VPN 时为 Core 请求管理员批准，主 App 不需要以管理员身份运行。ZIP 必须**完整解压**后打开；它不会自动注册链接或创建快捷方式。

Microsoft Store 版本使用 MSIX 和 Windows 系统 VPN，Core 不请求 UAC。EXE/ZIP 与 MSIX 使用不同数据目录，切换渠道不等于原地迁移。两者都要求明确选择 Xray 出口网卡。参阅 [Windows 行为]({{< relref "/docs/advanced/windows" >}})。

## macOS

Mac App Store 版本使用 Packet Tunnel。OneXraySE 使用 System Extension：

```shell
brew install --cask onexrayse
```

使用 ZIP 时，将 OneXraySE.app 移入 /Applications 后再打开。完成初始化并批准 VPN 和网络扩展请求。macOS 可能引导您前往“登录项与扩展”或“隐私与安全性”；如要求重启，请按提示操作。更新 ZIP 版本时先退出 App，再替换应用程序目录中的旧版本，并批准可能出现的扩展更新。

参阅 [Apple 系统扩展安装说明](https://developer.apple.com/documentation/systemextensions/installing-system-extensions-and-drivers)。

## iOS IPA

建议优先使用 App Store。自行安装 IPA 需要为主 App 与 Packet Tunnel 扩展重新签名，并使用允许 Network Extension 的描述文件；免费 Personal Team 不提供该能力。参阅 [Apple 支持的能力](https://developer.apple.com/help/account/reference/supported-capabilities-ios/)。

## Linux

Debian/Ubuntu 的 DEB 安装会安装依赖并为 Core 授予网络 capability：

```shell
sudo apt install ./OneXray-linux-x86_64.deb
```

arm64 使用 OneXray-linux-aarch64.deb。ZIP 用户请在包含已解压 OneXray 文件夹的目录执行：

```shell
sudo apt install -y procps libcap2-bin libayatana-appindicator3-1
sudo setcap cap_net_admin,cap_net_raw+eip OneXray/OneXrayCore
```

更新替换 Core 后需要重新授权。ZIP 不自动注册 onexray:// 链接。GNOME 的托盘可能需要 [AppIndicator 扩展](https://github.com/ubuntu/gnome-shell-extension-appindicator)。

下一步：[首次连接]({{< relref "/docs/getting-started" >}})。

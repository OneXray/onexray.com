---
title: 安装
weight: 1
---

# 平台支持

| 平台 | 最低系统 | 分发方式 | 下载 |
| --- | --- | --- | --- |
| iOS | iOS 15 | App Store、IPA | [App Store](https://apps.apple.com/us/app/onexray/id6745748773)、[IPA](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-ios.ipa) |
| macOS（Mac App Store） | macOS 13 | Mac App Store | [App Store](https://apps.apple.com/us/app/onexray/id6745748773) |
| macOS（商店外分发） | macOS 13 | Homebrew、ZIP | `brew install --cask onexrayse`<br>[Universal ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-macos-universal.zip) |
| Android | Android 10，arm64-v8a 或 x86_64 | Google Play、APK | [Google Play](https://play.google.com/store/apps/details?id=net.yuandev.onexray)、[Universal APK](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-android-universal.apk) |
| Windows x86_64 | Windows 10 | winget、EXE、ZIP | [EXE](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-windows-amd64.exe)、[ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-windows-amd64.zip) |
| Windows ARM64 | Windows 11 | winget、EXE、ZIP | [EXE](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-windows-arm64.exe)、[ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-windows-arm64.zip) |
| Linux x86_64 | glibc 2.39 | DEB、ZIP | [DEB](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-x86_64.deb)、[ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-x86_64.zip) |
| Linux arm64 | glibc 2.39 | DEB、ZIP | [DEB](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-aarch64.deb)、[ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-aarch64.zip) |

Android 仅支持 `arm64-v8a` 和 `x86_64`，不支持 32 位 ARM。

# iOS IPA

自行安装 IPA 时，必须使用授权 Network Extension capability 的 provisioning profile，重新签名 OneXray 主 App 与 Packet Tunnel extension。Apple 不向免费的 Personal Team 账号提供该 capability，因此必须加入付费 Apple Developer Program。否则 App 可能可以打开并进行节点测速，但无法启动 VPN。

参阅 [Apple Developer Forums](https://developer.apple.com/forums/thread/128767) 和 [iOS 支持的能力](https://developer.apple.com/help/account/reference/supported-capabilities-ios/)。

# macOS 商店外分发

Homebrew 和 Universal ZIP 包含同一份 Developer ID `macos_se` 包，安装 `OneXraySE.app`。Mac App Store 是独立商店包。

```shell
brew install --cask onexrayse
brew uninstall --cask onexrayse
```

## Universal ZIP

1. 下载并解压 `OneXray-macos-universal.zip`。
2. 将 `OneXraySE.app` 移动到 `/Applications`（“应用程序”）目录。不要直接从“下载”目录或其他目录运行；macOS 要求包含 System Extension 的 App 安装在系统的“应用程序”目录中。
3. 从“应用程序”目录打开 OneXraySE，并确认 macOS 的首次打开提示。

首次连接 VPN：

1. 导入订阅或节点，选中节点，然后点击启动。
2. 打开“系统设置 > 通用 > 登录项与扩展”。
3. 在“扩展”区域打开“网络扩展”，启用 OneXraySE，然后点击“完成”。
4. 如果“隐私与安全性”页面也显示批准请求，请点击“允许”；系统要求重启时请重启 Mac。
5. 返回 OneXraySE，再次点击启动。

更新 ZIP 版本时，请先退出 OneXraySE，再用新解压的 `OneXraySE.app` 替换 `/Applications` 中的旧版本并重新打开。如果 macOS 要求批准 System Extension 更新，请按提示操作。

参阅 [Installing System Extensions and Drivers](https://developer.apple.com/documentation/systemextensions/installing-system-extensions-and-drivers) 和 [更改“登录项与扩展”设置](https://support.apple.com/guide/mac-help/change-login-items-extension-settings-mtusr003/mac)。

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

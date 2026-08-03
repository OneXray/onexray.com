---
title: OneXray
type: docs
---

OneXray 是适用于 iOS、macOS、Android、Windows 和 Linux 的跨平台 Xray-core 客户端。

App 由四个主要区域组成：

| 区域 | 用途 |
| --- | --- |
| Home | 连接状态、规则/全局/直连路由、当前 Xray 配置、流量、位置和节点列表。 |
| 订阅 | 管理订阅源及其中的 Outbound 节点。 |
| Core | 管理 TUN、Ping、Xray 配置、GeoData、日志和最终配置。 |
| 设置 | 管理更新、启动行为、备份、外观、语言、支持、版本、致谢和隐私。 |

手机使用底部导航；平板和桌面使用侧边导航。响应式编辑器会根据宽度调整导航和布局，但不会增删配置字段。

## 下载

| 平台 | 要求 | 下载 |
| --- | --- | --- |
| iOS | iOS 15.0 及以上，arm64 | [App Store](https://apps.apple.com/us/app/onexray/id6745748773)、[IPA](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-ios.ipa) |
| macOS（Mac App Store） | macOS 13.0 及以上，Apple silicon 或 Intel | [App Store](https://apps.apple.com/us/app/onexray/id6745748773) |
| macOS（商店外分发） | macOS 13.0 及以上，Apple silicon 或 Intel | Homebrew：`brew install --cask onexrayse`、[Universal ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-macos-universal.zip) |
| Android | Android 10.0 及以上，arm64-v8a 或 x86_64 | [Google Play](https://play.google.com/store/apps/details?id=net.yuandev.onexray)、[Universal APK](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-android-universal.apk) |
| Windows x86_64 | Windows 10 或 Windows 11 | winget：`winget install --id YuanDevLLC.OneXray -e`、[EXE](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-windows-amd64.exe)、[ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-windows-amd64.zip) |
| Windows ARM64 | Windows 11 | winget：`winget install --id YuanDevLLC.OneXray -e`、[EXE](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-windows-arm64.exe)、[ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-windows-arm64.zip) |
| Linux x86_64 | GLIBC >= 2.39 | [DEB](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-x86_64.deb)、[ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-x86_64.zip) |
| Linux arm64 | GLIBC >= 2.39 | [DEB](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-aarch64.deb)、[ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-aarch64.zip) |

自行安装 iOS IPA 需要付费 Apple Developer Program 账号，因为 Packet Tunnel extension 使用了 Network Extension capability。

平台相关设置请参阅[安装]({{< relref path="docs/install/index.md" lang="zh" >}})。

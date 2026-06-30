---
title: OneXray
type: docs
---

OneXray 是面向 iOS、macOS、Android、Windows 和 Linux 的跨平台 Xray-core 客户端。

当前 App 按四个一级入口组织：

| 入口 | 用途 |
| --- | --- |
| Home | 连接状态、当前节点、VPN 启动/停止，以及 Outbound / Raw Json 节点列表。 |
| Subscriptions | 订阅源管理和单个订阅下的 Outbound 节点列表。 |
| Core | Xray-core 相关设置，例如 TUN、Ping、Logs、Xray Settings、GeoData。 |
| Settings | App 偏好、自动更新、备份、清理数据、支持链接、Credits 和 Privacy。 |

手机上使用底部导航，平板和桌面端使用左侧导航栏。二级页面会保持在当前一级入口下。

## 下载

| 平台 | 要求 | 下载 |
| --- | --- | --- |
| iOS | iOS 15.0 及以上，arm64 | [App Store](https://apps.apple.com/us/app/onexray/id6745748773)，[IPA](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-ios.ipa) |
| macOS | macOS 12.0 及以上，Apple silicon 或 Intel | Mac App Store：[App Store](https://apps.apple.com/us/app/onexray/id6745748773)<br>Homebrew / Universal ZIP（OneXraySE）：`brew install --cask onexrayse`，[Universal ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-macos-universal.zip) |
| Android | Android 10.0 及以上，arm32、arm64 或 x86_64 | [Google Play](https://play.google.com/store/apps/details?id=net.yuandev.onexray)，[Universal APK](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-android-universal.apk) |
| Windows | Windows 10 或 Windows 11，x86_64 | [EXE](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-windows-amd64.exe)，[ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-windows-amd64.zip) |
| Linux x86_64 | GLIBC >= 2.39 | [DEB](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-x86_64.deb)，[ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-x86_64.zip) |
| Linux arm64 | GLIBC >= 2.39 | [DEB](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-aarch64.deb)，[ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-aarch64.zip) |

macOS Homebrew / ZIP 和 Linux ZIP 设置见 [安装]({{< relref path="docs/install/index.md" lang="zh" >}})。

如需了解集成说明和精确运行时语义，请优先阅读 [AI 参考]({{< relref path="docs/reference/index.md" lang="zh" >}}) 和 [开发]({{< relref path="docs/develop/index.md" lang="zh" >}})。

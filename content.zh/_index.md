---
title: OneXray
type: docs
---

OneXray 是一个跨平台 Xray-core 客户端，支持 iOS、macOS、Android、Windows 和 Linux。

它主要面向三类使用方式：

1. 导入节点或订阅，使用 Simple 配置启动 VPN。
2. 通过结构化页面维护可复用的 Xray Setting。
3. 在需要完整控制 Xray-core 时，导入或编辑 Raw Config。

## 下载

| 平台 | 要求 | 下载 |
| --- | --- | --- |
| iOS | iOS 15.0 及以上，arm64 | [App Store](https://apps.apple.com/us/app/onexray/id6745748773)、[IPA](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-ios.ipa) |
| macOS | macOS 12.0 及以上，Apple silicon 或 Intel | [Mac App Store](https://apps.apple.com/us/app/onexray/id6745748773)、[Universal ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-macos-universal.zip) |
| Android | Android 10.0 及以上，arm32、arm64 或 x86_64 | [Google Play](https://play.google.com/store/apps/details?id=net.yuandev.onexray)、[Universal APK](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-android-universal.apk) |
| Windows | Windows 10 或 Windows 11，x86_64 | [EXE](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-windows-amd64.exe)、[ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-windows-amd64.zip) |
| Linux x86_64 | GLIBC >= 2.39 | [DEB](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-x86_64.deb)、[ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-x86_64.zip) |
| Linux arm64 | GLIBC >= 2.39 | [DEB](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-aarch64.deb)、[ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-aarch64.zip) |

Linux ZIP 设置和桌面端 CLI 说明见 [安装]({{< relref path="docs/install/index.md" lang="zh" >}})。

如果你是自动化工具或 AI Agent，请优先阅读 [AI 参考]({{< relref path="docs/reference/index.md" lang="zh" >}}) 和 [开发]({{< relref path="docs/develop/index.md" lang="zh" >}})。这两页包含 URL Scheme、CLI、本地 Automation API、导入格式和当前配置语义。

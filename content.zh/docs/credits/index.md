---
title: "致谢与许可"
description: "OneXray 使用的 Xray-core、libXray、VCore、Flutter、GeoData 及 Wintun 来源和分发许可说明。"
weight: 90
lastmod: 2026-09-09
---

OneXray 基于开源软件构建，App 源码采用 [GPL-3.0](https://github.com/OneXray/OneXray/blob/main/LICENSE)，各依赖保留自己的许可。

## 内核与平台

- [Xray-core](https://github.com/XTLS/Xray-core)、[libXray](https://github.com/XTLS/libXray)、[VCore](https://github.com/OneXray/VCore)
- [Flutter](https://github.com/flutter/flutter)、[Dart](https://github.com/dart-lang/sdk)、[Go](https://go.dev/)
- [age](https://github.com/FiloSottile/age)
- [GeoSite / domain-list-community](https://github.com/v2fly/domain-list-community)、[GeoIP](https://github.com/v2fly/geoip)

## Windows Wintun

EXE/ZIP 使用官方发布、未修改且匹配架构的 wintun.dll 创建原生 TUN；MSIX 使用系统 VPN Provider。

[项目与源码](https://git.zx2c4.com/wintun/) · [上游分发说明](https://git.zx2c4.com/wintun/about/) · [官方预编译包](https://www.wintun.net/builds/wintun-0.14.1.zip)

预编译 DLL 的分发条款以官方发行包内 LICENSE.txt 为准。本页提供来源与许可入口。

## 界面与应用

[material_ui](https://pub.dev/packages/material_ui)、[shadcn_ui](https://pub.dev/packages/shadcn_ui)、[Lucide](https://pub.dev/packages/lucide_icons_flutter)、[flutter_bloc](https://pub.dev/packages/flutter_bloc)、[go_router](https://pub.dev/packages/go_router)、[re_editor](https://pub.dev/packages/re_editor)、[re_highlight](https://pub.dev/packages/re_highlight)。

## 数据、网络与工具

[Drift](https://pub.dev/packages/drift)、[SQLite](https://pub.dev/packages/sqlite3)、[Dio](https://pub.dev/packages/dio)、[Pigeon](https://pub.dev/packages/pigeon)、[FFI 生成](https://pub.dev/packages/ffigen)、[Fastforge](https://fastforge.dev/)、AndroidX、Kotlin，以及 App [依赖清单](https://github.com/OneXray/OneXray/blob/main/pubspec.yaml)中的平台插件。

文档站基于 [Hugo](https://gohugo.io/) 和 [Hextra](https://github.com/imfing/hextra)，网站专属说明保存在[网站仓库](https://github.com/OneXray/onexray.com/blob/main/THIRD_PARTY_NOTICES.md)。

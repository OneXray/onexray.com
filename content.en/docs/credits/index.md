---
title: "Credits and licenses"
description: "Open-source foundations of OneXray, including Xray-core, libXray, VCore, Flutter, routing data, and Wintun distribution references."
weight: 90
lastmod: 2026-09-09
---

OneXray builds on open-source software. Its source is licensed under [GPL-3.0](https://github.com/OneXray/OneXray/blob/main/LICENSE); dependencies retain their own licenses.

## Core and platform

- [Xray-core](https://github.com/XTLS/Xray-core), [libXray](https://github.com/XTLS/libXray), and [VCore](https://github.com/OneXray/VCore)
- [Flutter](https://github.com/flutter/flutter), [Dart](https://github.com/dart-lang/sdk), and [Go](https://go.dev/)
- [age](https://github.com/FiloSottile/age)
- [GeoSite / domain-list-community](https://github.com/v2fly/domain-list-community) and [GeoIP](https://github.com/v2fly/geoip)

## Wintun on Windows

EXE/ZIP uses the official, unmodified, architecture-matched wintun.dll for native TUN. MSIX uses the Windows VPN provider.

[Project and source](https://git.zx2c4.com/wintun/) · [Upstream distribution information](https://git.zx2c4.com/wintun/about/) · [Official prebuilt archive](https://www.wintun.net/builds/wintun-0.14.1.zip)

The prebuilt DLL's distribution terms are in LICENSE.txt in the official archive. This documentation page supplies the source and licensing references.

## Interface and application

[material_ui](https://pub.dev/packages/material_ui), [shadcn_ui](https://pub.dev/packages/shadcn_ui), [Lucide icons](https://pub.dev/packages/lucide_icons_flutter), [flutter_bloc](https://pub.dev/packages/flutter_bloc), [go_router](https://pub.dev/packages/go_router), [re_editor](https://pub.dev/packages/re_editor), and [re_highlight](https://pub.dev/packages/re_highlight).

## Storage, networking, and tools

[Drift](https://pub.dev/packages/drift), [SQLite](https://pub.dev/packages/sqlite3), [Dio](https://pub.dev/packages/dio), [Pigeon](https://pub.dev/packages/pigeon), [FFI generation](https://pub.dev/packages/ffigen), [Fastforge](https://fastforge.dev/), AndroidX, Kotlin, and the platform-integration plugins listed in the App's [dependency manifest](https://github.com/OneXray/OneXray/blob/main/pubspec.yaml).

This static website uses [Hugo](https://gohugo.io/) and [Hextra](https://github.com/imfing/hextra). Website-specific notices are maintained in the [site repository](https://github.com/OneXray/onexray.com/blob/main/THIRD_PARTY_NOTICES.md).

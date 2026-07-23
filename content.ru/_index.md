---
title: OneXray
type: docs
---

OneXray — кроссплатформенный клиент Xray-core для iOS, macOS, Android, Windows и Linux.

Приложение состоит из четырех основных разделов:

| Раздел | Назначение |
| --- | --- |
| Home | Состояние подключения, режимы Rule/Global/Direct, активный Xray Profile, трафик, местоположение и список узлов. |
| Subscriptions | Источники подписок и их outbound-узлы. |
| Core | TUN, Ping, Xray Profiles, GeoData, журналы и итоговая конфигурация. |
| Settings | Обновления, резервные копии, оформление, язык, поддержка, версии, лицензии и конфиденциальность. |

На телефонах используется нижняя навигация, на планшетах и компьютерах — боковая. Адаптивные редакторы меняют компоновку, но не набор полей.

## Скачать

| Платформа | Требования | Скачать |
| --- | --- | --- |
| iOS | iOS 15.0 и новее, arm64 | [App Store](https://apps.apple.com/us/app/onexray/id6745748773), [IPA](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-ios.ipa) |
| macOS (Mac App Store) | macOS 12.0 и новее, Apple silicon или Intel | [App Store](https://apps.apple.com/us/app/onexray/id6745748773) |
| macOS (вне App Store) | macOS 12.0 и новее, Apple silicon или Intel | Homebrew: `brew install --cask onexrayse`, [Universal ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-macos-universal.zip) |
| Android | Android 10.0 и новее, arm64-v8a или x86_64 | [Google Play](https://play.google.com/store/apps/details?id=net.yuandev.onexray), [Universal APK](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-android-universal.apk) |
| Windows x86_64 | Windows 10 или Windows 11 | winget: `winget install --id YuanDevLLC.OneXray -e`, [EXE](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-windows-amd64.exe), [ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-windows-amd64.zip) |
| Windows ARM64 | Windows 11 | winget: `winget install --id YuanDevLLC.OneXray -e`, [EXE](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-windows-arm64.exe), [ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-windows-arm64.zip) |
| Linux x86_64 | GLIBC >= 2.39 | [DEB](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-x86_64.deb), [ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-x86_64.zip) |
| Linux arm64 | GLIBC >= 2.39 | [DEB](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-aarch64.deb), [ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-aarch64.zip) |

Инструкции для отдельных платформ приведены на странице [Установка]({{< relref path="docs/install/index.md" lang="ru" >}}).

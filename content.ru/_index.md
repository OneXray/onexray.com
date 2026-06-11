---
title: OneXray
type: docs
---

OneXray — кроссплатформенный клиент Xray-core для iOS, macOS, Android, Windows и Linux.

Основные сценарии:

1. Импортировать outbound-узел или подписку и запустить VPN с настройкой Simple.
2. Создать переиспользуемый Xray Setting через структурированные страницы интерфейса.
3. Импортировать или редактировать полный Raw Config, если нужен прямой контроль Xray-core.

## Скачать

| Платформа | Требования | Скачать |
| --- | --- | --- |
| iOS | iOS 15.0 и выше, arm64 | [App Store](https://apps.apple.com/us/app/onexray/id6745748773), [IPA](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-ios.ipa) |
| macOS | macOS 12.0 и выше, Apple silicon или Intel | [Mac App Store](https://apps.apple.com/us/app/onexray/id6745748773), [Universal ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-macos-universal.zip) |
| Android | Android 10.0 и выше, arm32, arm64 или x86_64 | [Google Play](https://play.google.com/store/apps/details?id=net.yuandev.onexray), [Universal APK](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-android-universal.apk) |
| Windows | Windows 10 или Windows 11, x86_64 | [EXE](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-windows-amd64.exe), [ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-windows-amd64.zip) |
| Linux x86_64 | GLIBC >= 2.39 | [DEB](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-x86_64.deb), [ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-x86_64.zip) |
| Linux arm64 | GLIBC >= 2.39 | [DEB](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-aarch64.deb), [ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-aarch64.zip) |

Настройка Linux ZIP и заметки о настольном CLI описаны на странице [Установка]({{< relref path="docs/install/index.md" lang="ru" >}}).

Для средств автоматизации и ИИ-агентов начните с [AI Reference]({{< relref path="docs/reference/index.md" lang="ru" >}}) и страницы [Develop]({{< relref path="docs/develop/index.md" lang="ru" >}}). Там описаны точные URL Scheme, команды CLI, локальный Automation API, форматы импорта и текущая семантика конфигурации.

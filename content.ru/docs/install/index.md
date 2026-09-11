---
title: "Установка OneXray"
description: "Загрузите OneXray для iOS, macOS, Android, Windows и Linux; узнайте различия EXE/ZIP, MSIX и OneXraySE."
weight: 10
lastmod: 2026-09-11
---

## Выберите платформу

| Платформа | Требования | Загрузка |
| --- | --- | --- |
| iPhone / iPad | iOS / iPadOS 15+ | [App Store](https://apps.apple.com/us/app/onexray/id6745748773) · [IPA](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-ios.ipa) |
| Mac App Store | macOS 13+, Apple silicon или Intel | [App Store](https://apps.apple.com/us/app/onexray/id6745748773) |
| Mac — OneXraySE | macOS 13+, Apple silicon или Intel | [Homebrew](https://formulae.brew.sh/cask/onexrayse) · [Universal ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-macos-universal.zip) |
| Android, телефоны и планшеты | Android 10+, arm64-v8a или x86_64 | [Google Play](https://play.google.com/store/apps/details?id=net.yuandev.onexray) · [APK](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-android-universal.apk) |
| Windows x64 | Windows 10 20H2+ | winget · [ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-windows-amd64.zip) · [Microsoft Store](https://apps.microsoft.com/detail/9NJ0MVHW215D) |
| Windows ARM64 | Windows 11 | winget · [ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-windows-arm64.zip) · [Microsoft Store](https://apps.microsoft.com/detail/9NJ0MVHW215D) |
| Linux x86_64 | glibc 2.39+ | [DEB](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-x86_64.deb) · [ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-x86_64.zip) |
| Linux arm64 | glibc 2.39+ | [DEB](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-aarch64.deb) · [ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-aarch64.zip) |

Полный список файлов и изменений — в [Releases](https://github.com/OneXray/OneXray/releases). 32-битный ARM на Android не поддерживается.

## Windows

Установите самостоятельную EXE-версию через winget:

```powershell
winget install --id YuanDevLLC.OneXray -e
```

EXE и ZIP используют нативный TUN. При запуске VPN требуется подтверждение UAC для Core; само приложение работает без прав администратора. ZIP нужно **распаковать целиком**. Он не регистрирует ссылки и не создаёт ярлыки автоматически.

Версия [Microsoft Store](https://apps.microsoft.com/detail/9NJ0MVHW215D) использует MSIX и системный VPN Windows, без UAC для Core. EXE/ZIP и MSIX хранят данные раздельно; смена канала не переносит их автоматически. Обе версии требуют выбора исходящего интерфейса Xray. [Подробнее о Windows]({{< relref "/docs/advanced/windows" >}}).

## macOS

Версия Mac App Store использует Packet Tunnel. OneXraySE использует System Extension:

```shell
brew install --cask onexrayse
```

Для ZIP сначала перенесите OneXraySE.app в /Applications. При настройке разрешите VPN и сетевое расширение. macOS может открыть раздел расширений/объектов входа или конфиденциальности и безопасности; выполните запрос на перезагрузку, если он появится.

Для обновления ZIP закройте приложение, замените его в /Applications и подтвердите обновление расширения, если потребуется. См. [руководство Apple](https://developer.apple.com/documentation/systemextensions/installing-system-extensions-and-drivers).

## iOS IPA

Проще всего установить приложение из App Store. Для самостоятельной установки IPA нужно переподписать приложение и Packet Tunnel с профилями, разрешающими Network Extension. Бесплатная Personal Team этой возможности не предоставляет. См. [возможности Apple Developer](https://developer.apple.com/help/account/reference/supported-capabilities-ios/).

## Linux

На Debian/Ubuntu DEB устанавливает зависимости и выдаёт Core сетевые capabilities:

```shell
sudo apt install ./OneXray-linux-x86_64.deb
```

Для arm64 используйте OneXray-linux-aarch64.deb. Для ZIP выполните из каталога, содержащего распакованную папку OneXray:

```shell
sudo apt install -y procps libcap2-bin libayatana-appindicator3-1
sudo setcap cap_net_admin,cap_net_raw+eip OneXray/OneXrayCore
```

После замены Core при обновлении выдайте capabilities заново. ZIP не регистрирует onexray://. Для трея GNOME может понадобиться [AppIndicator](https://github.com/ubuntu/gnome-shell-extension-appindicator).

Далее: [первое подключение]({{< relref "/docs/getting-started" >}}).

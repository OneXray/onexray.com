---
title: Установка
weight: 1
---

# Поддержка платформ

| Платформа | Минимальная система | Дистрибуция | Скачать |
| --- | --- | --- | --- |
| iOS | iOS 15 | App Store, IPA | [App Store](https://apps.apple.com/us/app/onexray/id6745748773), [IPA](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-ios.ipa) |
| macOS (Mac App Store) | macOS 13 | Mac App Store | [App Store](https://apps.apple.com/us/app/onexray/id6745748773) |
| macOS (вне App Store) | macOS 13 | Homebrew, ZIP | `brew install --cask onexrayse`<br>[Universal ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-macos-universal.zip) |
| Android | Android 10, arm64-v8a или x86_64 | Google Play, APK | [Google Play](https://play.google.com/store/apps/details?id=net.yuandev.onexray), [Universal APK](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-android-universal.apk) |
| Windows x86_64 | Windows 10 | winget, EXE, ZIP | [EXE](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-windows-amd64.exe), [ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-windows-amd64.zip) |
| Windows ARM64 | Windows 11 | winget, EXE, ZIP | [EXE](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-windows-arm64.exe), [ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-windows-arm64.zip) |
| Linux x86_64 | glibc 2.39 | DEB, ZIP | [DEB](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-x86_64.deb), [ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-x86_64.zip) |
| Linux arm64 | glibc 2.39 | DEB, ZIP | [DEB](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-aarch64.deb), [ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-aarch64.zip) |

Android поддерживает только `arm64-v8a` и `x86_64`; 32-битный ARM не поддерживается.

# iOS IPA

Для самостоятельной установки IPA необходимо повторно подписать OneXray и расширение Packet Tunnel с помощью provisioning profile, разрешающего Network Extension capability. Apple не предоставляет эту возможность бесплатным учетным записям Personal Team, поэтому требуется платное членство в Apple Developer Program. Без него приложение может открываться и проверять задержку узлов, но VPN не запустится.

См. [Apple Developer Forums](https://developer.apple.com/forums/thread/128767) и [Поддерживаемые возможности iOS](https://developer.apple.com/help/account/reference/supported-capabilities-ios/).

# macOS вне App Store

Homebrew и Universal ZIP содержат один пакет Developer ID `macos_se` и устанавливают `OneXraySE.app`. Сборка Mac App Store является отдельным пакетом.

```shell
brew install --cask onexrayse
brew uninstall --cask onexrayse
```

## Universal ZIP

1. Скачайте и распакуйте `OneXray-macos-universal.zip`.
2. Переместите `OneXraySE.app` в `/Applications` («Программы»). Не запускайте приложение непосредственно из папки «Загрузки» или другой папки: macOS требует, чтобы приложение с System Extension находилось в системном каталоге Applications.
3. Откройте OneXraySE из папки «Программы» и подтвердите первый запуск в macOS.

При первом подключении VPN:

1. Импортируйте подписку или узел, выберите узел и нажмите кнопку запуска.
2. Откройте **Системные настройки > Основные > Объекты входа и расширения**.
3. В разделе **Расширения** откройте **Сетевые расширения**, включите **OneXraySE** и нажмите **Готово**.
4. Если в разделе **Конфиденциальность и безопасность** также отображается запрос, нажмите **Разрешить** и перезапустите Mac, если это потребуется.
5. Вернитесь в OneXraySE и снова нажмите кнопку запуска.

Для обновления ZIP-версии закройте OneXraySE, замените приложение в `/Applications` на новый распакованный `OneXraySE.app` и снова откройте его. Если macOS запросит подтверждение обновления System Extension, разрешите его.

См. [Installing System Extensions and Drivers](https://developer.apple.com/documentation/systemextensions/installing-system-extensions-and-drivers) и [Change Login Items & Extensions settings](https://support.apple.com/guide/mac-help/change-login-items-extension-settings-mtusr003/mac).

# Windows

Winget автоматически выбирает установщик x86_64 или ARM64:

```powershell
winget install --id YuanDevLLC.OneXray -e
winget uninstall --id YuanDevLLC.OneXray -e
```

# Linux DEB

DEB устанавливается в `/opt/OneXray` и во время установки выдает Core необходимые network capabilities.

```shell
sudo apt install ./OneXray-linux-x86_64.deb
sudo apt remove onexray
```

Для arm64 используйте `OneXray-linux-aarch64.deb`.

# Linux ZIP

Установите зависимости и выдайте capabilities файлу Core в распакованном каталоге:

```shell
sudo apt install -y procps libcap2-bin libayatana-appindicator3-1
sudo setcap cap_net_admin,cap_net_raw+eip OneXray/bin/OneXrayCore
```

Запустите команду из каталога, содержащего папку `OneXray`, либо укажите абсолютный путь. Для GNOME может потребоваться [AppIndicator](https://extensions.gnome.org/extension/615/appindicator-support/).

Linux arm64 в настоящее время использует английский язык для CJK locale.

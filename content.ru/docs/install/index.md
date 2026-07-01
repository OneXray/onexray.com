---
title: Установка
weight: 1
---

# Поддерживаемые платформы

| Платформа | Минимальная версия | Распространение | Скачать |
| --- | --- | --- | --- |
| iOS | iOS 15 | App Store, IPA | [App Store](https://apps.apple.com/us/app/onexray/id6745748773), [IPA](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-ios.ipa) |
| macOS (Mac App Store) | macOS 12 | Mac App Store | [App Store](https://apps.apple.com/us/app/onexray/id6745748773) |
| macOS (вне App Store) | macOS 12 | Homebrew, ZIP | Homebrew: `brew install --cask onexrayse`<br>[Universal ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-macos-universal.zip) |
| Android | Android 10 | Google Play, APK | [Google Play](https://play.google.com/store/apps/details?id=net.yuandev.onexray), [Universal APK](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-android-universal.apk) |
| Windows x86_64 | Windows 10 | winget, EXE, ZIP | winget: `winget install --id YuanDevLLC.OneXray -e`<br>[EXE](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-windows-amd64.exe), [ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-windows-amd64.zip) |
| Linux x86_64 | glibc 2.39 | DEB, ZIP | [DEB](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-x86_64.deb), [ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-x86_64.zip) |
| Linux arm64 | glibc 2.39 | DEB, ZIP | [DEB](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-aarch64.deb), [ZIP](https://github.com/OneXray/OneXray/releases/latest/download/OneXray-linux-aarch64.zip) |

OneXray включает Xray-core и сетевую интеграцию для каждой платформы. VPN запускается и останавливается из UI приложения.

# macOS вне App Store

Homebrew cask token — `onexrayse`.

Homebrew устанавливает тот же Developer ID пакет `macos_se`, что и `OneXray-macos-universal.zip`; app bundle называется `OneXraySE.app`. Версия Mac App Store — отдельный пакет из магазина.

```shell
brew install --cask onexrayse
brew uninstall --cask onexrayse
```

# Windows winget

Установить или удалить OneXray можно через winget:

```shell
winget install --id YuanDevLLC.OneXray -e
winget uninstall --id YuanDevLLC.OneXray -e
```

# Linux ZIP

Установите зависимости:

```shell
sudo apt install -y procps libcap2-bin libayatana-appindicator3-1
```

Дайте core-бинарнику capability для создания и использования TUN-устройства:

```shell
sudo setcap cap_net_admin,cap_net_raw+eip OneXray/bin/OneXrayCore
```

Пользователям GNOME может понадобиться расширение [AppIndicator](https://extensions.gnome.org/extension/615/appindicator-support/) для отображения значка в трее.

# Linux DEB

Установка:

```shell
sudo apt install ./OneXray-linux-x86_64.deb
```

Удаление:

```shell
sudo apt remove onexray
```

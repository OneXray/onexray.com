---
title: Установка
weight: 1
---

# Поддерживаемые платформы

| Платформа | Минимальная версия | Распространение |
| --- | --- | --- |
| iOS | iOS 15 | App Store, IPA |
| macOS | macOS 12 | Mac App Store, PKG, ZIP |
| Android | Android 10 | Google Play, AAB, APK |
| Windows | Windows 10 | EXE, ZIP |
| Linux | glibc 2.39 | DEB, ZIP |

OneXray включает Xray-core и сетевую интеграцию для каждой платформы. Обычно VPN запускается из приложения. В настольные сборки также входит CLI `onexray`, который управляет запущенным приложением через локальный Automation API.

# Linux ZIP

Установите зависимости:

```shell
sudo apt install -y procps libcap2-bin libayatana-appindicator3-1
```

Дайте core-бинарнику capability для создания и использования TUN-устройства:

```shell
sudo setcap cap_net_admin,cap_net_raw+eip OneXray/bin/OneXrayCore
```

Пользователям GNOME может понадобиться расширение AppIndicator для отображения значка в трее.

# Linux DEB

Установка:

```shell
sudo apt install ./OneXray-linux-x86_64.deb
```

Удаление:

```shell
sudo apt remove onexray
```

# Настольный CLI

Настольные пакеты содержат CLI `onexray`. Перед выполнением команд приложение должно быть открыто.

```shell
onexray health
onexray status
onexray import --file /path/to/import.txt
onexray import --text 'vless://...'
```

Полный контракт CLI и API описан на странице [Develop]({{< relref path="../develop/index.md" lang="ru" >}}).

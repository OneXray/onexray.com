---
title: 安装
weight: 1
---

# 平台支持

| 平台 | 最低系统 | 分发方式 |
| --- | --- | --- |
| iOS | iOS 15 | App Store、IPA |
| macOS | macOS 12 | Mac App Store、PKG、ZIP |
| Android | Android 10 | Google Play、AAB、APK |
| Windows | Windows 10 | EXE、ZIP |
| Linux | glibc 2.39 | DEB、ZIP |

OneXray 内置 Xray-core 和各平台所需的网络集成。通常应从 App 内启动 VPN。桌面端还包含 `onexray` CLI，CLI 会通过本地 Automation API 控制正在运行的 App。

# Linux ZIP

先安装运行依赖：

```shell
sudo apt install -y procps libcap2-bin libayatana-appindicator3-1
```

给核心二进制文件授予创建和操作 TUN 设备所需的 capability：

```shell
sudo setcap cap_net_admin,cap_net_raw+eip OneXray/bin/OneXrayCore
```

GNOME 用户可能需要安装 AppIndicator 扩展才能显示托盘图标。

# Linux DEB

安装：

```shell
sudo apt install ./OneXray-linux-x86_64.deb
```

卸载：

```shell
sudo apt remove onexray
```

# 桌面端 CLI

桌面端包内包含 `onexray` CLI。使用 CLI 前必须先打开 App。

```shell
onexray health
onexray status
onexray import --file /path/to/import.txt
onexray import --text 'vless://...'
```

完整 CLI 和 API 约定见 [开发]({{< relref path="../develop/index.md" lang="zh" >}})。

---
title: "Windows VPN 模式"
description: "对比 EXE/ZIP 原生 TUN 与 Microsoft Store MSIX 系统 VPN 的权限、网卡、数据、启动和退出行为。"
weight: 40
lastmod: 2026-09-09
---

Windows 运行模式由安装包决定，不是 App 内可切换的偏好。

| 行为 | EXE / ZIP | Microsoft Store / MSIX |
| --- | --- | --- |
| 隧道 | Xray 原生 TUN，使用 Wintun | VCore 对接 Windows VPN Provider |
| Core 权限 | 必要的 Core 操作请求 UAC | 普通用户权限，不请求 Core UAC |
| 系统 VPN 设置页 | 不显示 | 自动连接、绕过设置 |
| 数据目录 | 用户应用支持目录 | 包专属目录 |
| 登录时启动 | 当前用户启动目录快捷方式 | 包 StartupTask |
| 退出 | 停止 VPN 后退出 | 退出 App，保留 VPN |
| 退出并停止 VPN | 无独立操作 | 停止 VPN 后退出 |

两种模式关闭主窗口都只是隐藏。需要停止 VPN 的操作失败时，App 会保持打开。

## Xray 网卡

两种模式都要求在 VPN 隧道中选择出口网卡。OneXray 保存名称并在启动前确认网卡仍存在，只给 Xray 绑定，不给 VCore 绑定。

## MSIX 系统 VPN

详情页包含自动连接、局域网绕过和排除网段。这些是 Windows 隧道策略，不是自定义路由的条件。

VPN 由独立 Provider/Session Host 管理，因此普通“退出”后仍可运行。通过 OneXray、Windows VPN 控制或“退出并停止 VPN”来断开。

## 独立安装包

使用 winget 安装 EXE，或完整解压 ZIP。ZIP 不自动注册协议和创建快捷方式，也不代表用户数据存放在解压目录内。

切换 EXE/ZIP 与 MSIX 不自动迁移数据。[安装方式]({{< relref "/docs/install" >}})。Wintun 来源与分发许可入口见[致谢]({{< relref "/docs/credits" >}})。

---
title: "按需求配置 VPN 隧道"
description: "将平台需求转换为明确 UI 操作，而不是虚构可导入 JSON。"
weight: -20
ai_order: 100
lastmod: 2026-09-14
---

VPN Tunnel 独立于节点、自定义路由和 Raw JSON。AI 答复应包含平台/安装类型、页面、选项、值、原因、重连要求和验证方法。

先确认 iOS、macOS App Store、OneXraySE、Android、Windows EXE/ZIP、Windows MSIX 或 Linux，不从“桌面版”推断安装类型。

## 决策表

| 需求 | 配置方法 | 关键边界 |
| --- | --- | --- |
| 解析内网域名 | 路由本地 DNS + 纯域名直连规则 | 不只是隧道 DNS |
| 更改系统隧道 DNS | 高级 → VPN 隧道 → DNS | 地址族对应的 IP；Apple DoT 域名不是搜索域 |
| 出口网卡 | Windows/Linux → Xray 出口网卡 | 明确按名称选择，Raw 不可覆盖 |
| 仅指定应用进入 VPN | Android 系统 VPN → 仅所选应用 | 包含/排除名单分别保存，不是 OS 规则 |
| 指定 Wi-Fi 自动连接/断开 | Apple 系统 VPN → 关闭始终开启 → 开启按需连接 | 精确 SSID，不能同时出现在两份名单 |
| 蜂窝/Ethernet | iOS 蜂窝、macOS Ethernet 的独立动作 | 平台专属 |
| 网段完全绕过 VPN | Apple 关闭全量接管后添加排除；Windows MSIX 系统排除 | 系统路由在 Xray 之前；不向 EXE/Linux 推荐不存在的页面 |
| 全部符合条件流量进入 Apple VPN | 接管全部流量 | 核对例外与网络不可用警告 |

## DNS 和 IPv6

高级 → VPN 隧道中，TUN 地址只读。DNS 默认值为 8.8.8.8、2001:4860:4860::8888、dns.google。域名仅用于 Apple DNS over TLS。

自定义 DoT 要取得匹配的地址与证书域名，不能把 DoH URL 填进 IPv4 输入框。在不生效的平台无需更改域名；路由 DNS、Raw DNS 独立。

IPv6 开关控制托管隧道和查询策略，不是通用 IPv6 阻断。Windows MSIX 保留自身行为。保存后生效，有效设置影响当前连接时需要重连；恢复默认仅改草稿，仍需保存。

## Apple Wi-Fi 示例

1. 高级 → VPN 隧道 → Apple 系统 VPN。
2. 关闭始终开启，打开按需连接。
3. 将用户确认的家庭 SSID 加入“这些 Wi-Fi 断开 VPN”；仅将明确要求的 SSID 加入连接列表。
4. 按需求选择 iOS 蜂窝或 macOS Ethernet 的独立动作。
5. 保存，切换网络后验证。

未列出的 Wi-Fi 保持当前行为，不等于“除家里外全部连接”。始终开启基于按需机制，不是受监督设备 Always On VPN，也不是不可绕过的断网保护。

## Android 应用示例

打开 Android 系统 VPN，选择仅所选应用，按应用名称/包名选择至少一个已安装应用。另一种“除所选应用外的全部应用”有独立名单。保存并按需重连，图标帮助区分同名应用。应用进入隧道后仍受路由规则处理。

不能用 localOS: ["android"] 代替应用选择，该条件影响此 Android Core 的流量，不识别应用包。

## Windows/Linux 网卡示例

打开出口网卡列表，用户选择真实上网网卡。“当前用于上网”仅为参考，不自动选择。排除回环和 OneXray 自身 TUN。

保存名称，启动前检查存在；网卡消失时重新选择，不自动回退。Windows 两种包均绑定 Xray，不是 VCore 的绑定选项。已连接时使用保存并重新连接。

## 系统绕过与 Xray 直连

Xray 直连仍先进入 VPN 处理，再直接发送；系统排除在进入隧道之前绕开 Xray。局域网发现或与其他网络客户端协同时，先明确用户需要哪种行为。两者都不自动配置 split DNS。

Apple 的排除网段只在关闭全量接管时生效；四个例外开关只在全量接管打开后出现。没有明确需求时保留默认；不当配置可能导致网络不可用。

详细页面：[Apple]({{< relref "/docs/advanced/apple" >}})、[Android]({{< relref "/docs/advanced/android" >}})、[Windows]({{< relref "/docs/advanced/windows" >}})、[通用隧道]({{< relref "/docs/advanced/vpn-tunnel" >}})。

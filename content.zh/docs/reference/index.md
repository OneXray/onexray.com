---
title: AI 参考
weight: 8
---

本页汇总 OneXray 当前的持久化与运行时语义。

# 配置类型与 Tag

| 标识 | 含义 |
| --- | --- |
| `CoreConfigType.outbound` | 本地或订阅 Outbound。 |
| `CoreConfigType.profile` | Dart 中的 Xray 配置；持久化 wire value 仍为 `"setting"`。 |
| `CoreConfigType.full` | Home `Local` 下的 Full Config。 |
| `CoreConfigType.raw` | Home `Local` 下的 Raw Json。 |
| `Simple` | 内置 Profile，id 为 `-1`。 |
| `proxy` | 运行时最终代理出口。 |
| `chainProxy` | 启用最终出口时 Home 节点的运行时中转 tag。 |
| `direct` | Freedom 直连出口。 |
| `tunIn` | 运行时 TUN inbound。 |
| `pingIn` | 运行时 HTTP ping inbound。 |

# Home 路由模式

| 模式 | 是否要求节点 | 转换 |
| --- | --- | --- |
| `rule` | 是 | 保留合成后的 DNS、routing 和 outbound 结构。 |
| `global` | 是 | 删除 DNS/routing；保留 `proxy` 和递归依赖的 `dialerProxy` outbounds。 |
| `direct` | 否 | 删除 DNS/routing；只保留 `direct` 并清除其 `dialerProxy`。 |

连接中切换会重启 Core。

# 导入分类

| 输入 | 结果 |
| --- | --- |
| 去除首尾空白后以 `onexray://` 开头 | 导入受支持的 OneXray 配置、订阅或 GeoData 链接。 |
| 去除首尾空白后以 `https://` 开头 | 每个有效 HTTPS 行成为一个订阅导入项。 |
| 其他受支持文本 | libXray 返回 Outbound model。 |

订阅 fragment 用作名称，但不会保存到 URL。支持文件扩展名：`txt`、`json`、`yaml`、`yml`、`png`、`jpg`、`jpeg`。通用 HTTPS/分享文本导入不创建 Raw Json、Full Config、Xray 配置或 GeoData；受支持的 `onexray://` 链接可以创建。

Scheme 接受 `config/add` 的 `outbound/profile/full/raw`、`sub/add` 和 `dat/add`，拒绝旧版 `type=setting`、备份与其他命令。Age 订阅链接只携带 `x25519` 或 `hybrid`，不携带现有密钥对；接收端会生成自己的密钥对。

# Age 加密订阅

Age 加密为可选功能，并且需要供应商支持。OneXray 通过 `X-Age-Public-Key` 发送已保存的公钥，将私钥保留在本机，并在后续刷新时复用同一密钥对。可生成 X25519 与 Mihomo 兼容 Hybrid（`ML-KEM-768 + X25519`），解密后明文上限为 16 MiB。

# 启动设置

| 设置 | 范围 | 默认值 | 含义 |
| --- | --- | --- | --- |
| `connectOnAppLaunch` | 所有平台 | `false` | App 服务准备完成后启动上次可用配置；不可用时随机选择节点。直连模式不要求节点。 |
| 登录时启动 | macOS、Windows、Linux | 关闭 | 使用平台的用户级开机启动注册。 |
| `desktopStartHidden` | macOS、Windows、Linux | `false` | 每次启动 OneXray 时保持主窗口隐藏，与“登录时启动”相互独立。 |
| 在程序坞中隐藏图标 | macOS | `false` | 立即应用到当前 App 会话。 |

清除数据会取消“登录时启动”，并删除 `connectOnAppLaunch` 与 `desktopStartHidden` 偏好。

# 下载 User-Agent

默认使用系统 User-Agent。Android、iOS、macOS 读取系统浏览器标识；Windows、Linux 使用固定的兼容浏览器标识。OneXray User-Agent 包含 App 版本和构建信息。清除数据会把该偏好恢复为“系统”。

# 简易配置默认值

| 字段 | 默认值 |
| --- | --- |
| `routing.domainStrategy` | `IpIfNonMatch` |
| `routing.directSet` | `CN` |
| `routing.appleDirect` | `true` |
| `routing.localDirect` | `true` |
| `routing.enableIPRule` | `true` |
| `routing.localDns` | `true` |
| `routing.blockAds` | `false` |
| `enableLog` | `false` |
| `fakeDns` | `false` |
| `finalOutboundId` | `null` |
| 默认 DNS | `tcp://<TUN IPv4 DNS>`，tag 为 `defaultDns`，通过 `proxy` |

地区本地 DNS 仍为：CN `223.5.5.5`、IR `5.200.200.200`、RU `9.9.9.9`、Other `8.8.8.8`。仅在启用本地 DNS 时查询匹配的直连域名集合。

广告屏蔽会增加指向 `block` 的内置广告域名规则。

# DNS 与 FakeDNS

运行时策略由 TUN 设置派生：

| IPv6 | 策略 | FakeDNS 地址池 |
| --- | --- | --- |
| 开启 | `UseIP` | IPv4 `198.18.0.0/15` 和 IPv6 `fc00::/18` |
| 关闭 | `UseIPv4` | 仅 IPv4 |

新建自定义 Profile 和 Full Config 时，DNS Server 默认使用当前 TUN IPv4 DNS。Full Config 管理 `outbounds`、`routing` 和 `dns`，不管理 FakeDNS。

# Xray 配置额外入站

自定义 Xray 配置支持额外 SOCKS、HTTP 和 dokodemo-door 入站。SOCKS/HTTP 可监听本机或所有网卡；监听所有网卡时必须填写完整认证信息。dokodemo-door 仅监听本机，并支持目标地址、目标端口和 TCP/UDP 模式。

监听端口与 tag 必须唯一。tag 可用于自定义 Routing Rule，但 OneXray 不会自动创建转发规则。

# Ping

Ping 持久化设置只包含 timeout、URL 和 Auto Ping New Configs。OneXray 固定以最多 5 个节点为一组提交测速，不再保存并发数字段。

# 运行时合成

| 保存类型 | 规则模式最终配置 |
| --- | --- |
| Outbound | 当前 Profile 加 Home Outbound `proxy`；可通过 `chainProxy` 应用最终出口反转。 |
| Full Config | Profile 基础加 Full Config 的 `outbounds/routing/dns`；Profile 的 FakeDNS/inbounds/log/metrics 保留。 |
| Raw Json | Raw 主体加 App/Xray 配置重写的 inbounds、DNS 策略、日志、metrics、env 和路由字段。 |

Release 运行时 inbounds 为 `tunIn`、当前 Xray 配置的额外入站与 `pingIn`。用户 Raw Json inbounds 在校验、Real Ping、保存和启动时都会被删除。

# 运行时所有权字段

- 随机 `pingIn` 与 metrics 端口
- `env.xray.location.asset` 与 `env.xray.location.cert`
- 移动端 `env.xray.tun.fd`
- Windows/Linux TUN gateway、DNS、路由和出站网卡
- Apple `includeAllNetworks` 以及按条件启用的 `excludeLocalNetworks`、`excludeCellularServices`、`excludeAPNs`、`excludeDeviceCommunication` 隧道策略
- Access/Error 日志路径，或 macOS System Extension 日志禁用
- 可选 policy/stats/metrics

# Routing Rule 字段

自定义规则支持：

```text
domain, ip, port, sourcePort, localPort, network, sourceIP, localIP,
inboundTag, protocol, attrs, process, outboundTag, ruleTag
```

`process` 仅在 Windows 和 Linux 写出。

# Raw Json 校验

Raw Json 必须是包含非空 `name` 的 JSON object。手动校验会将 inbounds 替换为 `pingIn`、移除 metrics、应用运行时 env，并调用内置 Xray 配置测试。普通 Outbound/分享导入不执行该手动保存测试。

# Backup v4

```text
manifest.json
core_configs.json
subscriptions.json
geo_data.json
dat/
```

Manifest 保存版本 `4` 和创建时间。OneXray 可恢复结构化 v3 与 v4 归档。本地配置与 GeoData 从归档恢复；订阅节点通过恢复的源 URL 重新下载。v4 订阅记录还可包含 Age 公钥/私钥。备份 ZIP 未加密。

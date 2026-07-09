---
title: Xray 配置
weight: 1
aliases:
  - /zh/docs/home/outbound/xraySetting/
---

Xray 配置是 OneXray 必选的运行时配置，也是结构化 Xray-core JSON 写出器。适合需要通过 UI 管理 DNS、FakeDNS、路由、入站、出站、日志或最终出口的场景。

OneXray 会始终保持一个 Xray 配置处于选中状态。内置简易配置是兜底配置，不能删除。

# 最终配置（Final Config）

最终配置（Final Config）指 OneXray 在启动 Xray-core 前最终写出的运行时 `xray.json`。它不等同于 UI 中看到的单个 Xray 配置、Outbound 节点、Full Config 或 Raw Json 记录。

当前选中的 Xray 配置提供运行时基础结构：`dns`、`fakeDns`、`routing`、`inbounds`、`outbounds`、`log` 和可选的 metrics 相关字段。

当前启动的节点类型会在这个基础上继续修改最终配置：

| 启动节点 | 如何修改最终配置 |
| --- | --- |
| Outbound | 未配置最终出口时，当前节点会成为运行时 `proxy` 出站。配置最终出口后，最终出口会写为 `proxy`；当前节点会写为 `chainProxy`；`proxy.dialerProxy` 会设置为 `chainProxy`。 |
| Full Config | Full Config 会替换当前 Xray 配置中的 `outbounds`、`routing`、`dns` 和 `fakeDns`。当前 Xray 配置和 App runtime 仍负责运行时 inbounds、logs、metrics、env 和平台修正。 |
| Raw Json | Raw Json 作为主要 JSON 主体，但它的 `inbounds` 会被删除。OneXray 会根据当前 TUN 或代理模式，从当前 Xray 配置写入运行时 inbounds。 |

完成合成后，App runtime 仍然负责 `pingIn`、随机 ping 和 metrics 端口、Windows/Linux TUN route 字段、`env.xray.location.asset`、`env.xray.location.cert`、移动端 `env.xray.tun.fd`，以及 macOS System Extension 日志关闭逻辑。

# 页面结构

| 页面 | 写出内容 |
| --- | --- |
| Log | `log` |
| DNS | `dns` |
| FakeDNS | `fakeDns` |
| Routing | `routing` |
| Inbounds | `inbounds` |
| Outbounds | `outbounds` |

# DNS

DNS 页面写出 Xray 的 `dns` 对象。

| 字段 | 含义 |
| --- | --- |
| `hosts` | 静态 host 映射。 |
| `servers` | DNS server 列表。每个 server 可包含 address、port、domains、expectIPs、skipFallback、clientIP、queryStrategy 和 tag。 |
| `queryStrategy` | 运行时由 TUN 设置写出。开启 IPv6 时写为 `UseIP`；关闭 IPv6 时写为 `UseIPv4`。 |
| `disableCache` | 禁用 DNS 缓存。 |
| `disableFallback` | 禁用 fallback server 行为。 |
| `disableFallbackIfMatch` | 域名规则匹配后停止 fallback。 |
| `useSystemHosts` | 允许 Xray 使用系统 hosts 数据。 |

当 DNS server 设置了非空 `tag` 时，OneXray 会把该 tag 作为路由规则的 `inboundTag` 选项。

# FakeDNS

Xray 配置输出中固定写出 FakeDNS。FakeDNS 页面只负责配置地址池，不包含 enabled 开关。

默认地址池：

| 池 | 默认 `ipPool` | 默认 `poolSize` |
| --- | --- | --- |
| IPv4 | `198.18.0.0/15` | `32768` |
| IPv6 | `fc00::/18` | `32768` |

实际写出的池跟随 `TUN 设置 > 开启 IPv6`：

| TUN IPv6 | 写出的 FakeDNS 池 |
| --- | --- |
| 开启 | IPv4 和 IPv6 |
| 关闭 | 仅 IPv4 |

要让 FakeDNS 生效，TUN inbound 的 sniffing destination override 应包含 `fakedns+others`。简易配置的 FakeDNS 开关会自动添加该值。

# Routing

Routing 写出 `routing.domainStrategy` 和 `routing.rules`。

默认规则会写在自定义规则之前：

| `ruleTag` | 匹配条件 | 默认出站 |
| --- | --- | --- |
| `dnsQuery` | `inboundTag: ["dnsQuery"]` | `proxy` |
| `dnsOut` | `inboundTag: ["tunIn"]`，`port: "53"` | `dnsOut` |
| `dnsDoT` | `inboundTag: ["tunIn"]`，`port: "853"` | `proxy` |
| `ping` | `inboundTag: ["pingIn"]` | `proxy` |

单条规则内的条件是叠加关系。例如同一条规则同时包含 `domain` 和 `ip` 时，连接必须同时满足两者才会命中。

`process` 条件只会在 Windows 和 Linux 写入。macOS、iOS 和 Android 不会把 `process` 写入最终 Xray JSON。

# Inbounds

Inbounds 页面按运行时角色分区：

| 分区 | Inbounds |
| --- | --- |
| TUN 模式 | `tunIn` |
| 代理模式 | `socksIn`、`httpIn` |
| 内部入口 | `pingIn` |

TUN 模式启动时注入 `tunIn + pingIn`。代理模式启动时注入 `socksIn + httpIn + pingIn`。`socksIn` 默认端口为 `11024`，`httpIn` 默认端口为 `11025`，两个端口都可以修改。SOCKS 和 HTTP 认证是可选项，默认留空。

`pingIn` 和 metrics 端口始终在运行时随机分配。

# Outbounds

系统出站 tag：

| Tag | 协议 | 用途 |
| --- | --- | --- |
| `proxy` | 运行时选中的节点或最终出口 | 最终出口。 |
| `chainProxy` | 配置最终出口时的当前节点 | 由 `proxy.dialerProxy` 使用的拨号中转节点。 |
| `direct` | `freedom` | 直连。 |
| `fragment` | `freedom` | Fragment 出站。 |
| `block` | `blackhole` | 阻断。 |
| `dnsOut` | `dns` | DNS 出站。 |

运行时出站顺序：

1. `proxy`
2. `chainProxy`，如果已配置
3. 其他自定义出站
4. `direct`
5. `fragment`
6. `block`
7. `dnsOut`

## 最终出口

运行时中转 tag 仍固定为：

```text
chainProxy
```

在 Xray 配置中，Outbounds 页面支持导入、替换和删除最终出口。在简易配置中，最终出口通过本地 outbound 节点 id 选择。

启用最终出口后，OneXray 会把最终出口写为运行时 `proxy`。Home 当前节点会写为 `chainProxy`，并把 `proxy.dialerProxy` 设置为 `chainProxy`。如果 Home 当前节点和最终出口指向同一个本地 outbound id，启动会失败。

## DNS 出站

DNS 出站写出：

| 字段 | 行为 |
| --- | --- |
| `network` | 默认空，不写出；只有选择 `tcp` 或 `udp` 时写出。 |
| `address` | 可选上游地址。 |
| `port` | 可选上游端口。 |
| `rules` | 当 rules 列表非空时写出。 |
| `blockTypes` | 仅当 `rules` 为空且配置了 block types 时写出。 |

默认 DNS outbound rules：

```json
[
  {
    "action": "hijack",
    "qType": "1,28"
  },
  {
    "action": "direct"
  }
]
```

`qType` 是字符串字段。

# 运行时 Inbounds 说明

结构化写出器包含运行时 TUN、SOCKS、HTTP 和 ping inbound 状态。TUN inbound 建议保持 sniffing 开启，以便基于域名和协议分流。简易配置启用 FakeDNS 时，sniffing 会添加 `fakedns+others`。

# Logs

macOS 且启用 System Extension 模式时，OneXray 会在运行时写出前强制关闭 Xray 配置日志：

```json
{
  "loglevel": "none",
  "dnsLog": false
}
```

# 分享

Xray 配置可以从 Xray 配置菜单分享为 JSON 文本或 `.json` 文件。

自定义 GeoData 不会打包进 Xray 配置分享结果。如果某个配置引用了自定义规则集，请先手动添加对应 GeoData，或使用 [备份与恢复]({{< relref path="../../../setting/backup/index.md" lang="zh" >}}) 进行完整迁移。

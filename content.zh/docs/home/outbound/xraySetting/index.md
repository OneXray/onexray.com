---
title: Xray Setting
weight: 1
---

Xray Setting 是 OneXray 必选的运行时 Profile，也是结构化 Xray-core JSON 写出器。适合需要通过 UI 管理 DNS、FakeDNS、路由、入站、出站、日志或链式代理的场景。

最终运行时配置会在 VPN 启动时由该状态生成。根据当前平台，启动修正逻辑可能会调整端口、网卡和日志。

OneXray 会始终保持一个 Xray Setting 处于选中状态。内置 Simple 配置是兜底 Profile，不能删除。

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
| `queryStrategy` | `UseIP`、`UseIPv4` 或 `UseIPv6`。 |
| `disableCache` | 禁用 DNS 缓存。 |
| `disableFallback` | 禁用 fallback server 行为。 |
| `disableFallbackIfMatch` | 域名规则匹配后停止 fallback。 |
| `useSystemHosts` | 允许 Xray 使用系统 hosts 数据。 |

当 DNS server 设置了非空 `tag` 时，OneXray 会把该 tag 作为路由规则的 `inboundTag` 选项。

# FakeDNS

Xray Setting 输出中固定写出 FakeDNS。FakeDNS 页面只负责配置地址池，不包含 enabled 开关。

默认地址池：

| 池 | 默认 `ipPool` | 默认 `poolSize` |
| --- | --- | --- |
| IPv4 | `198.18.0.0/15` | `32768` |
| IPv6 | `fc00::/18` | `32768` |

实际写出的池跟随 DNS `queryStrategy`：

| `queryStrategy` | 写出的 FakeDNS 池 |
| --- | --- |
| `UseIP` | IPv4 和 IPv6 |
| `UseIPv4` | 仅 IPv4 |
| `UseIPv6` | 仅 IPv6 |

要让 FakeDNS 生效，TUN inbound 的 sniffing destination override 应包含 `fakedns+others`。Simple Setting 的 FakeDNS 开关会自动添加该值。

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
| `proxy` | 运行时选中的节点 | 主出口节点。 |
| `chainProxy` | 导入或替换的自定义节点 | 前置或中转节点。 |
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

## 链式代理

链式代理的 tag 固定为：

```text
chainProxy
```

在 Xray Setting 中，Outbounds 页面支持导入、替换和删除链式代理。在 Simple Setting 中，链式代理通过本地 outbound 节点 id 选择。

启用后，OneXray 会把当前 `proxy` 出站的 `dialerProxy` 设置为 `chainProxy`。如果当前出口节点和链式代理指向同一个本地 outbound id，启动会失败。

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

# Inbounds

结构化写出器包含 TUN inbound 和 ping inbound。TUN inbound 建议保持 sniffing 开启，以便基于域名和协议分流。Simple Setting 启用 FakeDNS 时，sniffing 会添加 `fakedns+others`。

# Logs

macOS 且启用 System Extension 模式时，OneXray 会在运行时写出前强制关闭 Xray Setting 日志：

```json
{
  "loglevel": "none",
  "dnsLog": false
}
```

# 分享

Xray Setting 可以从 Xray Setting 菜单分享为 JSON 文本或 `.json` 文件。

自定义 GeoData 不会打包进 Xray Setting 分享结果。如果某个 setting 引用了自定义规则集，请先手动添加对应 GeoData，或使用 [备份与恢复]({{< relref path="../../../setting/backup/index.md" lang="zh" >}}) 进行完整迁移。

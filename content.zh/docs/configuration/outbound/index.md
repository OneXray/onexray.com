---
title: "Outbound 节点 JSON"
description: "生成可导入的节点文件，完整保留协议、传输、TLS 和 REALITY 参数。"
weight: 10
ai_order: 40
lastmod: 2026-09-14
---

节点文件的根部是包含 `outbounds` 数组的对象，不是裸 outbound。单节点手动编辑要求数组只有一项；普通文件或文本导入可以提取多项。

入口：服务器 → 添加服务器 → 手动添加（JSON），或导入文件。普通节点导入不会安装文件根部的 routing、DNS、inbounds。

## 先取得真实参数

| 部分 | 所需信息 |
| --- | --- |
| 基础 | 显示名称 `tag`、协议、服务器地址、数值端口 |
| VLESS / VMess | 实际 UUID、服务端要求的 encryption/security 和 flow |
| Trojan / Shadowsocks / SOCKS | 协议要求的密码、加密算法或用户名密码 |
| 传输 | network、path、Host、serviceName 等实际参数 |
| TLS | 是否开启、证书域名、按需 ALPN/fingerprint |
| REALITY | serverName、fingerprint、公钥/password、shortId，按需 flow |

不能从节点名称或地区推断这些值。不要为消除错误随意添加 `allowInsecure`、关闭证书验证或添加 Vision flow。

## VLESS + TLS

这是模板：替换 `server.example.com`、端口和虚构 UUID，确认服务端使用 RAW/TCP + TLS。证书域名可能与连接地址不同，以服务端资料为准。

{{% json-example "outbound-vless-tls.json" %}}

XHTTP 使用 `network: "xhttp"` 和服务端的 `xhttpSettings`（host、path、mode、必要的 extra）；WebSocket 使用 `network: "ws"` 和 `wsSettings`（host、path）；gRPC 使用对应的 `grpcSettings.serviceName`。它们是可选传输方案，不是可以随意叠加的开关。

## VLESS + REALITY

公钥占位符故意没有填入有效凭据。保存前替换所有服务端相关参数。`realitySettings.password` 在这里承载服务端公钥，不是私钥；仅在服务端要求时添加用户 flow。

{{% json-example "outbound-vless-reality.json" %}}

## VMess + WebSocket + TLS

替换地址、UUID、路径和传输配置。这是原生 Xray outbound，不是已经移除的 `vmess://Base64(JSON)` VMessQrCode。

{{% json-example "outbound-vmess-ws.json" %}}

## 其他协议

相同 outbounds 封装保留完整协议配置，App 不通过固定字段表单重建节点。

- Trojan：`settings.servers` 中填写 address、port、password，传输和 TLS 放在 streamSettings。
- Shadowsocks：servers 中填写 address、port、method、password；密钥必须符合提供商算法要求。
- SOCKS：servers 中填写 address、port，可选 `users: [{"user":"…","pass":"…"}]`。SOCKS 自身不加密，不要把它描述成 TLS。
- 其他内核协议仅在配套 Core 支持其 JSON 时使用；没有标准分享 URI 不代表不支持原生 JSON。

上游参考：[VLESS](https://xtls.github.io/config/outbounds/vless.html)、[VMess](https://xtls.github.io/config/outbounds/vmess.html)、[Trojan](https://xtls.github.io/config/outbounds/trojan.html)、[Shadowsocks](https://xtls.github.io/config/outbounds/shadowsocks.html)、[SOCKS](https://xtls.github.io/config/outbounds/socks.html)。新增字段先检查[版本边界]({{< relref "/docs/configuration/compatibility" >}})。

## 名称、依赖与分享

节点名称使用 `tag`，新文件不生成旧 name 别名，不借用 sendThrough。普通模式会分配运行 tag，另一个节点的显示名称不能作为跨节点依赖的稳定标识。

独立节点模板不应引用其他节点的 dialerProxy/proxySettings.tag。智能路由通过最终出口选项组合链路；完整自定义链路放在 Raw 中。

JSON 通常比标准分享链接保留更多信息。VMessAEAD/VLESS、SS、SOCKS、Trojan 分享仍支持，旧 VMessQrCode 不支持。AI 优先输出完整 JSON 并标明入口。

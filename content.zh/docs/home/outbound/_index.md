---
title: 节点
weight: 2
---

节点是可复用的 Xray outbound 配置，保存代理协议、服务器地址、传输方式、TLS 或 REALITY、Mux 和出站 socket 选项。

# 运行时 Tag

启动节点时，OneXray 会把当前节点写为保留运行时 tag：

```text
proxy
```

Xray Setting 中的路由规则应使用 `proxy` 指向当前启动的出口节点。

# 支持的出站类型

编辑器遵循 Xray-core outbound 概念，并根据协议和传输方式显示对应字段。

| 区域 | 示例 |
| --- | --- |
| 协议 | VLESS、VMess、Trojan、Shadowsocks、SOCKS、HTTP、Hysteria2。 |
| 传输 | raw、TCP header、WebSocket、HTTPUpgrade、XHTTP、gRPC、KCP、Hysteria。 |
| 安全 | TLS、REALITY、ECH 相关字段、fingerprint、ALPN、固定证书。 |
| Mux | mux 开关、并发数、XUDP 行为。 |
| Socket 选项 | TCP Fast Open、MPTCP、网卡、dialer proxy。 |

# 链式代理

配置链式代理后，当前出口节点仍写为 `proxy`，但它的 `dialerProxy` 会被设置为：

```text
chainProxy
```

同一个节点不能同时作为当前出口节点和链式代理节点。OneXray 会拒绝这种启动路径。

# Fragment

Xray Setting 中包含系统 `fragment` 出站。需要 freedom fragmentation 行为时，可通过路由规则把指定流量转发到 `fragment`。

# 网卡

`interface` socket 选项只对 Linux 和 Windows 有意义。节点未填写时，启动修正逻辑可应用 TUN 设置中选择的网卡。

# 相关页面

- [Xray Setting]({{< relref path="xraySetting/index.md" lang="zh" >}})
- [TUN 设置]({{< relref path="../../setting/tun/index.md" lang="zh" >}})
- [AI 参考]({{< relref path="../../reference/index.md" lang="zh" >}})

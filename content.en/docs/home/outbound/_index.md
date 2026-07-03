---
title: Outbound Nodes
weight: 2
---

An outbound node is a reusable Xray outbound profile. It stores the proxy protocol, server address, transport, TLS or REALITY options, mux options, and outbound socket options.

# Runtime Tag

When you start a node, OneXray assigns the selected node the reserved runtime tag:

```text
proxy
```

Routing rules in Xray Profile should target `proxy` for the active node.

# Supported Outbound Families

The editor follows Xray-core outbound concepts and exposes fields according to the selected protocol and transport.

| Area | Examples |
| --- | --- |
| Protocol | VLESS, VMess, Trojan, Shadowsocks, SOCKS, HTTP, Hysteria2. |
| Transport | raw, TCP header, WebSocket, HTTPUpgrade, XHTTP, gRPC, KCP, Hysteria. |
| Security | TLS, REALITY, ECH-related fields, fingerprints, ALPN, pinned certificates. |
| Mux | mux enablement, concurrency, XUDP behavior. |
| Socket options | TCP Fast Open, MPTCP, network interface, dialer proxy. |

# Chain Proxy

When a chain proxy is configured, the active outbound is still written as `proxy`, but its `dialerProxy` is set to:

```text
chainProxy
```

The same node cannot be used as both the active outbound and the chain proxy. OneXray rejects that startup path.

# Fragment

The Xray Profile page contains a system `fragment` outbound. Use routing rules to send selected traffic to `fragment` when freedom fragmentation behavior is needed.

# Network Interface

The `interface` socket option is only meaningful on Linux and Windows. If a node leaves it empty, the startup fixer can apply the interface selected in TUN settings.

# Related Pages

- [Xray Profile]({{< relref path="xrayProfile/index.md" lang="en" >}})
- [TUN Settings]({{< relref path="../../setting/tun/index.md" lang="en" >}})
- [AI Reference]({{< relref path="../../reference/index.md" lang="en" >}})

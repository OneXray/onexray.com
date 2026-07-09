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

# Final Outbound

Without Final Outbound, the active Home node is written as:

```text
proxy
```

When Final Outbound is configured, the Final Outbound is written as `proxy`. The active Home node is written as:

```text
chainProxy
```

Then OneXray sets `proxy.dialerProxy` to `chainProxy`, so the Home node acts as the dialer relay and the Final Outbound is the final exit. The same node cannot be used as both the active Home node and the Final Outbound. OneXray rejects that startup path.

# Fragment

The Xray Profile page contains a system `fragment` outbound. Use routing rules to send selected traffic to `fragment` when freedom fragmentation behavior is needed.

# Network Interface

The `interface` socket option is only meaningful on Linux and Windows. If a node leaves it empty, the startup fixer can apply the interface selected in TUN settings.

# Related Pages

- [Xray Profile]({{< relref path="xrayProfile/index.md" lang="en" >}})
- [TUN Settings]({{< relref path="../../setting/tun/index.md" lang="en" >}})
- [AI Reference]({{< relref path="../../reference/index.md" lang="en" >}})

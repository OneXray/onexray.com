---
title: Home
weight: 2
---

Home is the main operating surface for connection state and node operation.

The connection summary shows the node that is actually running; while disconnected it shows the currently selected node. The Xray Profile, traffic, and location entries are separate interactive areas so each can be opened reliably.

# Routing Modes

| Mode | Final Config behavior |
| --- | --- |
| Rule | Uses the selected node together with the selected Xray Profile's DNS and routing rules. |
| Global | Uses the selected node for all traffic. Runtime DNS and routing sections are removed, and only the `proxy` outbound plus its required `dialerProxy` dependency chain is retained. |
| Direct | Sends traffic directly. No node is required; runtime DNS and routing are removed and only the `direct` outbound is retained. |

Changing the routing mode while connected stops and restarts the Core so the new Final Config takes effect.

# Configuration Types

| Type | Purpose | Location |
| --- | --- | --- |
| Outbound | One proxy outbound such as VLESS, VMess, Trojan, Shadowsocks, SOCKS, HTTP, or Hysteria2. | Local or subscription groups. |
| Full Config | A structured local node with its own outbounds, routing, and DNS. | Home `Local` group. |
| Raw Json | An advanced Xray JSON body edited as text. | Home `Local` group. |
| Xray Profile | The required runtime base for inbounds, DNS, routing, system outbounds, logs, metrics, and FakeDNS. | Core > Xray Profiles. |
| Simple Profile | The built-in fallback Xray Profile. | Core > Xray Profiles. |

# Node List

Local Outbound, Full Config, and Raw Json entries share the `Local` group. Subscription groups contain only outbound nodes. Search filters the unified list; card actions still provide edit, share, copy, ping, and delete where applicable.

Related pages:

- [Add and Import]({{< relref path="add/index.md" lang="en" >}})
- [Outbound Nodes]({{< relref path="outbound/_index.md" lang="en" >}})
- [Xray Profile]({{< relref path="outbound/xrayProfile/index.md" lang="en" >}})
- [Raw Json]({{< relref path="rawConfig/index.md" lang="en" >}})
- [Start and Stop]({{< relref path="start/index.md" lang="en" >}})

---
title: "Connect"
description: "Choose servers and a traffic method, or use expert-mode Raw JSON. Understand live traffic and reconnect behavior."
weight: 30
lastmod: 2026-09-12
---

Connect answers two questions: **which servers to use**, and **which traffic should use them**.

## Choose servers

- Automatic: choose eligible servers from your available nodes.
- Subscription: choose from one subscription.
- Location: choose from nodes with that detected exit region.
- Single server: use the exact selected node.

Smart and Custom Routing request 1–3 entry servers. Automatic/group selection uses latency results; a fixed server or All via VPN uses one. Background tests or subscription updates do not silently replace an active connection's nodes.

## Choose a traffic method

| Method | Use it for |
| --- | --- |
| [Smart Routing]({{< relref "/docs/connect/smart-routing" >}}) | Direct regions and services with switch-based settings |
| All via VPN | Sending traffic handled by the tunnel through the selected server |
| [Custom Routing]({{< relref "/docs/connect/custom-routing" >}}) | Your own ordered domain, IP, port, and network rules |

The selector is a dialog. Editing Smart or Custom Routing opens a separate page.

All via VPN uses only the proxy-routed Google DNS server; it does not add a second direct DNS server. Platform exclusions, such as Android per-app lists, still determine which traffic reaches the tunnel. This is not a system-wide kill-switch guarantee.

## Expert mode

Expert mode replaces the server-selection section with [Raw JSON]({{< relref "/docs/connect/raw-json" >}}). It does not combine a Raw configuration with normal Smart/Custom selection. Your normal choices are retained for switching back.

## Traffic and reconnecting

The page displays upload/download speed and counters for the **current connection**, not a historical total. Live sampling runs while Connect is visible, including when a desktop window loses focus. Hiding the window or leaving Connect stops sampling. The traffic display has no detail dialog.

There is no single “connection IP” that represents a multi-node connection. Node locations belong to individual test results.

Changes that affect the running connection require reconnecting. OneXray stops the old VPN before preparing and starting the new configuration. Startup uses the local routing-data files; it does not download missing files or wait for geodata updates. A failed start reports its cause and remains in a failure state instead of restarting the old connection automatically.

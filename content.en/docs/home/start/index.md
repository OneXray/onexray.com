---
title: Start and Stop
weight: 5
---

Use the Home page bottom button to start and stop the current mode.

OneXray supports two runtime modes:

| Mode | Behavior |
| --- | --- |
| TUN | Starts the platform VPN/TUN integration and routes traffic through Xray-core. |
| Proxy | Starts local Xray and exposes SOCKS/HTTP proxy ports without changing system proxy, route, DNS, or system VPN state. |

# Start

When you start a node, OneXray:

1. Loads the selected node.
2. Loads the selected Xray Profile. If the saved selection is invalid, OneXray falls back to the built-in Simple Profile.
3. Composes the Final Config from the selected node and the selected Xray Profile.
4. Applies chain proxy if configured.
5. Applies runtime fixes such as mode-specific inbounds, ping port, metrics, interface binding, env paths, and macOS System Extension log handling.
6. Writes the Final Config to the runtime `xray.json`.
7. Starts the platform VPN tunnel in TUN mode, or starts local Xray in Proxy mode.
8. Tests latency and node IP information when available.

TUN and Proxy mode change which runtime inbounds are written and how the core is started. They do not remove the requirement that one Xray Profile is selected.

# Stop

Stopping tears down the active runtime and clears the running state in the app.

Proxy mode does not configure your operating system automatically and does not appear as a system VPN connection. Use the SOCKS or HTTP address shown in Xray Profiles when configuring a browser, terminal, or system proxy manually.

# Startup Validation

Startup can fail when:

| Case | Meaning |
| --- | --- |
| Invalid outbound | The selected node cannot be converted to a valid Xray outbound. |
| Missing chain proxy | Simple Profile points to a deleted chain proxy node. |
| Invalid chain proxy | The selected chain proxy row is not an outbound or cannot be parsed. |
| Same chain proxy and outbound | The chain proxy id is the same as the exit node id. |
| Invalid Raw Json | The raw JSON fails OneXray validation or Xray-core test. |

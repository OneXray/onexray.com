---
title: Start and Stop
weight: 5
---

Use the Home power button to start or stop the VPN.

# Start

OneXray performs the following steps:

1. Reads the Home routing mode.
2. Loads the selected Xray Profile, falling back to Simple Profile if needed.
3. Loads the selected Outbound, Full Config, or Raw Json. Direct mode does not require a node.
4. Composes the Final Config and applies Final Outbound when applicable.
5. Applies Rule, Global, or Direct routing-mode transformation.
6. Writes runtime TUN and `pingIn` inbounds, random ports, metrics, GeoData paths, interface/route fields, and platform fixes.
7. Writes the runtime `xray.json` and starts the platform VPN/TUN integration.

# Routing Mode Changes

Changing Rule, Global, or Direct while connected is a restart operation. OneXray first stops the current Core, builds a new Final Config, and starts it again. If stopping or starting fails, the Home status reports the failure instead of pretending the new mode is connected.

# Stop

Stopping tears down the active VPN/Core and then clears the running state. The Home summary keeps the selected node ready for the next Rule or Global start.

# Startup Validation

Startup can fail when:

| Case | Meaning |
| --- | --- |
| Missing node | Rule or Global mode has no selected node. |
| Invalid outbound | The selected node cannot be converted to a valid Xray outbound. |
| Missing or invalid Final Outbound | The selected Final Outbound no longer exists or is not a valid outbound. |
| Same Final Outbound and current node | The same local outbound was selected for both roles. |
| Invalid Raw Json | The stored JSON cannot be normalized or used to build the runtime config. |
| Missing dependency | Global mode cannot find the `proxy` outbound or one of its `dialerProxy` dependencies. |

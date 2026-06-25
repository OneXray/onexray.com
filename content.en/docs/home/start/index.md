---
title: Start and Stop
weight: 5
---

Use the Home page bottom button to start and stop the VPN.

# Start

When you start an outbound node, OneXray:

1. Loads the selected node.
2. Loads the selected Xray Setting, or writes the built-in Simple setting.
3. Applies chain proxy if configured.
4. Applies platform runtime fixes such as interface binding, ping port, and macOS System Extension log handling.
5. Writes the Xray JSON runtime config.
6. Starts the platform VPN tunnel.
7. Tests latency and node IP information when available.

# Stop

Stopping the VPN tears down the platform tunnel and clears the running state in the app.

# Startup Validation

Startup can fail when:

| Case | Meaning |
| --- | --- |
| Invalid outbound | The selected node cannot be converted to a valid Xray outbound. |
| Missing chain proxy | Simple Setting points to a deleted chain proxy node. |
| Invalid chain proxy | The selected chain proxy row is not an outbound or cannot be parsed. |
| Same chain proxy and outbound | The chain proxy id is the same as the exit node id. |
| Invalid Raw Json | The raw JSON fails OneXray validation or Xray-core test. |

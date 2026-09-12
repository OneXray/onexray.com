---
title: "First connection"
description: "Choose a direct region and the required outbound interface together, authorize on entering Home, then add servers and connect."
weight: 20
lastmod: 2026-09-12
---

## 1. Complete the two-step setup

Read the privacy notice and select Agree and continue. On Get ready to connect, wait for local configuration and bundled routing data to be prepared:

- The country/region sets Smart Routing's direct rules, not the VPN server location. Choose one region, clear the selection, or leave it unchanged to keep the existing setting. A new installation's original default is Mainland China.
- Windows and Linux require an explicit Xray outbound interface on this same page. The current internet adapter is marked for reference, never automatically selected. Apple and Android do not show this option.

Select Go to Home to save. Setup does not advance automatically, request VPN authorization, import servers, or start VPN. Change the region later in [Smart Routing]({{< relref "/docs/connect/smart-routing" >}}).

## 2. Authorize on entering the main interface

Main-interface initialization reads the current VPN state and requests missing necessary authorization once, even without servers. Apple asks to add a VPN configuration; OneXraySE may also require System Extension approval. Android 17 and later additionally check local-network permission.

Declining or cancelling still allows browsing the app, but the required permissions must be granted before connecting. After adding servers, use the connection button to retry and approve authorization. Returning to the foreground alone does not repeatedly prompt. The initial authorization request on entering the main interface does not itself start VPN.

## 3. Add servers

Open [Servers > Add servers]({{< relref "/docs/servers/import" >}}). Add a subscription, paste share links, choose a file, or enter node JSON. iOS/Android also support QR scanning; file import opens the system picker directly.

Ordinary nodes save without a second preview confirmation or waiting for subsequent tests. Setup does not depend on server counts or latency results.

## 4. Select and connect

On Connect, choose a server source and traffic method. Start with Automatic selection and Smart Routing, or choose one server and All via VPN for a single-node test. Automatic selection needs eligible, usable test results.

Select Connect and wait for Connected. The button shows progress during permission checks, queued work, and connection changes. Traffic refreshes while the page and window are visible; an unfocused desktop window keeps updating.

## If something is missing

- No usable servers or too few entries: add servers, complete tests, or adjust the selection scope/entry count.
- Permission not ready: follow Connect's authorization action, use system settings if needed, and retry.
- Interface missing: select it under Advanced > VPN Tunnel. Each start checks it; no continuous interface monitoring is added.
- Configuration or routing-data error: read the specific cause and inspect [logs/the generated configuration]({{< relref "/docs/advanced/logs" >}}). Missing required data is reported; starting VPN does not download GeoData as a fallback.

Normal startup checks prerequisites again. Switching an active configuration stops the old VPN first; a failed new connection does not automatically restore it.

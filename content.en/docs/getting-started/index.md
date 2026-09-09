---
title: "First connection"
description: "Complete OneXray setup, grant VPN permission, select a direct region, import servers, and make your first connection."
weight: 20
lastmod: 2026-09-09
---

## 1. Prepare the system

Read the privacy notice and choose Agree and continue. System setup prepares local configuration and built-in routing data, then guides you through the required VPN permissions.

Windows and Linux require you to choose the Xray outbound network interface. The adapter marked as currently used for internet access is a reference, not an automatic selection. Apple devices require VPN authorization during setup; Android may also require local-network permission.

Setup does **not** start VPN. Complete each step with Continue; it does not advance automatically.

## 2. Choose a direct region — optional

The country/region is used by Smart Routing, not to select a VPN server location. Detection suggests a region from the current network without GPS permission. You may choose one manually, clear it, or skip.

Skipping keeps existing settings; a new installation defaults to Mainland China. To use no direct region, clear the selection, finish the picker, and continue. You can change it later in [Smart Routing]({{< relref "/docs/connect/smart-routing" >}}).

## 3. Add servers — optional

Import a subscription, paste a share link, choose a file, or enter node JSON. iOS and Android also support QR scanning. File import opens the system picker directly.

After nodes are saved, select Go to Home. You do not need to wait for latency or location tests. You may choose to add servers later; setup still shows this step when servers already exist.

## 4. Select and connect

On Connect, select a server source and traffic method. Automatic selection with Smart Routing is a starting point. For a single-server test, select a server and All via VPN.

Start VPN and wait for Connected. The page shows live speeds and traffic for this connection while it is visible. Stop the VPN from the same page.

## If something is missing

- No servers: use [Servers > Add servers]({{< relref "/docs/servers/import" >}}).
- Authorization missing: use the permission action on Connect and approve the system request.
- Network interface missing or changed: select it again under Advanced > VPN Tunnel.
- Connection fails: check the supplied configuration, routing data, and [local logs]({{< relref "/docs/advanced/logs" >}}).

Normal app startup checks its prerequisites again; finishing setup does not permanently waive permission or resource checks.

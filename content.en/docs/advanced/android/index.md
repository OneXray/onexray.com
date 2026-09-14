---
title: "Android system VPN"
description: "Select which Android apps use the VPN, with app icons and separately saved inclusion and exclusion lists."
weight: 30
ai_order: 140
lastmod: 2026-09-12
---

Open Advanced > VPN Tunnel > Android system VPN.

## Choose a mode

| Mode | Behavior |
| --- | --- |
| All apps | Route all eligible apps through the tunnel |
| Only selected apps | Route only the chosen apps |
| All except selected apps | Chosen apps bypass the tunnel |

The include and exclude lists are stored separately. Switching modes does not overwrite the other list.

## Select applications

Open the application picker, search by app or package name, and select entries. App icons help distinguish similar names. The installed-app list is used locally for this feature and is not uploaded to OneXray.

Only selected apps requires at least one installed app. Removing every app from an allow-list does not silently mean “all apps”.

Save to apply the list. If VPN is active, applying tunnel changes requires reconnecting. Per-app selection decides which applications reach the tunnel; Smart/Custom Routing then handles the traffic inside it.

## Permissions and system controls

After Setup, entering the main interface checks VPN status and requests missing permissions. Android 17 and later also require the applicable local-network permission. Declining does not prevent browsing the app; Connect lets you retry. Returning to the foreground refreshes status without repeatedly opening authorization dialogs.

The VPN can be controlled through OneXray, its foreground notification, the Quick Settings tile, and [app-icon shortcuts]({{< relref "/docs/shortcuts" >}}). Scanning QR codes requests camera access separately, only when used.

---
title: "Android system VPN"
description: "Select which Android apps use the VPN, with app icons and separately saved inclusion and exclusion lists."
weight: 30
lastmod: 2026-09-09
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

Android's VPN authorization is part of setup. Android 17 and later also require the applicable local-network permission. If permission is revoked, Connect offers an action to request it again.

The VPN can be controlled through OneXray, its foreground notification, and the Quick Settings tile. Scanning QR codes requests camera access separately, only when used.

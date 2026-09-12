---
title: "Shortcuts and system menus"
description: "Four mobile app-icon shortcuts and desktop tray actions for VPN, server selection, and data updates."
weight: 65
lastmod: 2026-09-12
---

Mobile shortcuts and desktop tray menus have different layouts. Both use the same connection and update operations as the main app.

## iOS and Android

Press and hold the OneXray app icon to access four actions:

| Action | What it does |
| --- | --- |
| Start VPN | Starts the saved connection; missing settings or permissions still need to be completed. |
| Stop VPN | Stops the current connection. |
| Switch configuration | Opens Servers in normal mode, or the Raw JSON selector on Connect in expert mode. |
| Update subscriptions | Updates subscriptions using their saved settings. |

These are app-icon quick actions, not Siri Shortcuts or a system automation integration.

## Desktop tray menu

Use the menu-bar or system-tray icon to:

- Start, stop, or reconnect the VPN.
- Select automatic server choice, a subscription, a location, or an individual node; switch Raw JSON configurations in expert mode.
- Change the traffic method.
- Update all subscriptions or an individual subscription.
- Update geodata, including the default pair or an individual custom source.
- Show the main window or quit the app.

Each data-driven list displays up to ten entries. This is a menu display limit, not a limit on saved data. Open the app to see all entries. Fixed items such as automatic selection, manually added servers, and Update all do not consume those ten slots; Update all still covers the full collection.

Changing a selection while disconnected saves it without starting the VPN. When connected, changes that affect the running connection use the app's confirmation and reconnection flow. Update results and failures use system notifications. A failed tray start, such as having no servers, does not by itself force the main window to open; settings or authorization that need interaction may open it.

## Quit behavior

On macOS and Windows MSIX, **Quit** leaves the VPN running. Use **Quit and Stop VPN** to stop it too. On Windows EXE/ZIP and Linux, quitting stops the VPN.

[Connection]({{< relref "/docs/connect" >}}) · [Windows channels]({{< relref "/docs/advanced/windows" >}})

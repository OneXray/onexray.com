---
title: "Updates and upgrading"
description: "What is new in OneXray 26.9.2, upgrading from 26.9.1, and moving from the older configuration model."
weight: 25
lastmod: 2026-09-12
---

## From 26.9.1 to 26.9.2

26.9.2 builds on the redesigned interface introduced in 26.9.1:

- Configure a [local DNS address]({{< relref "/docs/connect/smart-routing" >}}) for direct traffic in Smart or Custom Routing, and edit the three [tunnel DNS settings]({{< relref "/docs/advanced/vpn-tunnel" >}}).
- Optionally send a stable, randomly generated [subscription HWID]({{< relref "/docs/servers/subscriptions" >}}). It is off by default and does not identify your hardware.
- Use four mobile app-icon shortcuts and expanded [desktop tray menus]({{< relref "/docs/shortcuts" >}}).
- Add [Apple route exclusions]({{< relref "/docs/advanced/apple" >}}) when Capture all traffic is off.
- Follow a shorter first-run flow, with platform authorization handled when entering the main interface. Connection failures now show more specific causes.
- Geodata automatic updates run only while connected. Failed updates retain the previous files and do not restart or disconnect the VPN.
- Windows packages include the matching Microsoft Visual C++ runtime. Desktop Core lifecycle, VPN status, window behavior, sharing, and traffic refresh are improved.

The in-place database upgrade preserves nodes, subscriptions, Raw JSON, custom routes, preferences, and measured latency. New HWID switches remain off. Existing routes keep the default local DNS address unless you change it. A normal update from 26.9.1 does not require reinstalling the app or repeating Setup.

[Compare v26.9.1 and v26.9.2](https://github.com/OneXray/OneXray/compare/v26.9.1...v26.9.2)

## From v26.8.4 and earlier

The following changes apply to the older product model, not to the update from 26.9.1 to 26.9.2. Version 26.9.1 introduced four main tabs and separate server and routing choices.

### Before updating

Keep independent copies of configurations you may need to recreate. The new app does not import old backup ZIP archives. Check which installation channel you are using, especially on Windows.

### Retained data

The database upgrade retains local nodes, subscriptions, and Raw JSON configurations. Existing Raw entries above the three-item creation limit remain visible and usable; adding more is disabled.

Old Profile and Full Config records are not part of the new UI or connection workflow. They are not automatically converted into custom routes. Recreate the needed rules in Custom Routing, or prepare a compatible complete configuration for Raw JSON.

Running preferences are reset when upgrading from the old product model. Review the selected server source, routing, permissions, and platform VPN settings before connecting. Node latency information is measured again.

### Where features moved

| Previous workflow | Current workflow |
| --- | --- |
| Home node list and separate subscriptions | Servers, grouped by subscription or location |
| Simple Profile and separate Xray Profiles | Smart Routing and shared Advanced settings |
| Structured Full Config | Custom Routing for supported rules; Raw JSON for complete configurations |
| Rule / Global / Direct modes | Smart Routing / All via VPN / Custom Routing |
| Profile-level log and tunnel settings | Advanced > VPN Tunnel / Xray |
| Backup and restore | Removed; individual configuration sharing remains |
| Historical/device traffic totals | Removed; current-connection counters and speeds only |

The old standalone Direct mode is not a current traffic-method choice. Direct remains an action inside Smart and Custom Routing.

## Windows channels

EXE/ZIP use native TUN with UAC; MSIX uses Windows system VPN. They have separate data locations, startup integration, and quit behavior. Do not assume installing one channel imports the other's data.

[Windows details]({{< relref "/docs/advanced/windows" >}}) · [The 26.9.1 redesign](https://github.com/OneXray/OneXray/compare/v26.8.4...v26.9.1)

---
title: "Upgrading from v26.8.4"
description: "What is retained and what changes when moving from OneXray v26.8.4 to the redesigned 26.9.1 interface."
weight: 25
lastmod: 2026-09-09
---

OneXray 26.9.1 replaces the previous configuration workflow with four main tabs and separate server and routing choices.

## Before updating

Keep independent copies of configurations you may need to recreate. The new app does not import old backup ZIP archives. Check which installation channel you are using, especially on Windows.

## Retained data

The database upgrade retains local nodes, subscriptions, and Raw JSON configurations. Existing Raw entries above the three-item creation limit remain visible and usable; adding more is disabled.

Old Profile and Full Config records are not part of the new UI or connection workflow. They are not automatically converted into custom routes. Recreate the needed rules in Custom Routing, or prepare a compatible complete configuration for Raw JSON.

Running preferences are reset when upgrading from the old product model. Review the selected server source, routing, permissions, and platform VPN settings before connecting. Node latency information is measured again.

## Where features moved

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

[Windows details]({{< relref "/docs/advanced/windows" >}}) · [Current source changes](https://github.com/OneXray/OneXray/compare/v26.8.4...f3c5863a)

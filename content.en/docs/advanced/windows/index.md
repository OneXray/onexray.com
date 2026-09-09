---
title: "Windows VPN modes"
description: "Compare Windows EXE/ZIP native TUN and Microsoft Store MSIX system VPN, including UAC, interfaces, startup, and quitting."
weight: 40
lastmod: 2026-09-09
---

OneXray's Windows edition is selected by the installation package, not a setting inside the app.

| Behavior | EXE / ZIP | Microsoft Store / MSIX |
| --- | --- | --- |
| Tunnel | Xray native TUN with Wintun | Windows VPN provider through VCore |
| Core permission | UAC when required for Core operations | Normal user integrity; no Core UAC |
| System VPN settings page | Not shown | Automatic connection and bypass settings |
| Data | User application-support location | Package-specific location |
| Launch at login | User Startup Folder shortcut | Package StartupTask |
| Quit | Stop VPN, then exit | Exit app, keep VPN |
| Quit and Stop VPN | Not a separate action | Stop VPN, then exit |

Closing the main window only hides it in either mode. If a required stop fails, the app stays open.

## Xray interface

Both modes require you to choose the outbound network interface under VPN Tunnel. OneXray saves the name and checks that it still exists before starting. It binds Xray, not VCore, to that adapter.

## MSIX system VPN

The Windows system VPN page includes automatic connection, local-network bypass, and excluded network ranges. These are Windows tunnel policies, not Custom Routing rule conditions.

The provider/session host owns the VPN independently of the foreground window. Normal Quit can therefore leave it running. Stop from OneXray, Windows VPN controls, or Quit and Stop VPN.

## Standalone packages

Install EXE with winget, or fully extract ZIP. ZIP does not automatically register links or create shortcuts and does not mean that user data is stored inside the extracted folder.

Changing between EXE/ZIP and MSIX does not migrate data. [Install packages]({{< relref "/docs/install" >}}). Wintun source and distribution-license references are on the [credits page]({{< relref "/docs/credits" >}}).

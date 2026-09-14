---
title: "Raw JSON"
description: "Raw JSON — Import and sharing"
weight: 30
lastmod: 2026-09-14
---

Turn on expert mode on Connect. Raw JSON replaces the normal connection selection; Add/Edit opens the JSON editor. Use its complete-configuration import, not Servers import.

## Edit and apply

Name each configuration. A new installation has none. Up to three can be added; older records above the limit remain visible and editable, with Add hidden. Review credentials and dependencies before sharing.

Raw does not merge Smart/Custom rules or borrow the currently selected nodes. Save validates a separate copy; it does not rewrite the stored source into a platform-specific runtime dump. Effective changes to the active configuration require reconnecting.

## Generate the correct file

Read the [Raw JSON contract]({{< relref "/docs/configuration/raw-json" >}}) for complete templates, managed fields, DNS composition and chains. App-managed Tunnel, logs, metrics, query strategy and Windows/Linux interface settings cannot be overridden by user JSON.

A saved configuration is not proof of remote connectivity or startup permission. Missing required local Geodata is an error, not a download trigger at VPN startup. See [verification]({{< relref "/docs/troubleshooting" >}}) and [dependencies]({{< relref "/docs/configuration/geodata" >}}).

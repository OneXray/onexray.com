---
title: Subscriptions
weight: 3
---

Subscriptions manage remote outbound node sources.

# Supported Content

Subscriptions only import outbound nodes. OneXray reads supported Xray share links, Clash.Meta YAML, or Xray JSON through the bundled libXray API and stores the resulting items as `CoreConfigType.outbound`.

Subscriptions do not import Raw Json, Xray Profile, GeoData, DNS, routing, inbounds, policy, stats, metrics, or logs.

# List Behavior

The Subscriptions page shows subscription sources. A subscription row can be refreshed, pinged, shared as its HTTPS URL, edited, deleted, or cleaned.

Clicking a subscription opens the outbound node list for that subscription. That page is for inspection and management only: clicking a node there does not select it as the active Home node.

# Restore Behavior

Backups store subscription records and URLs, not subscription node rows. During restore, OneXray recreates the subscription records and refreshes the URLs to download nodes again.

Related pages:

- [Add and Import]({{< relref path="../home/add/index.md" lang="en" >}})
- [Share]({{< relref path="../share/index.md" lang="en" >}})
- [Backup and Restore]({{< relref path="../setting/backup/index.md" lang="en" >}})

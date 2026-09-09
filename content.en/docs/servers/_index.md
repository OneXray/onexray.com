---
title: "Servers"
description: "Manage servers by subscription or detected location, inspect latency and protocol labels, and apply groups to your connection."
weight: 40
lastmod: 2026-09-09
---

Servers has two tabs: **By subscription** first and selected by default, then **By location**. Both open the same kind of server-list page.

## Groups

Subscriptions are ordered by ID. Manual additions appear first when local nodes exist; the empty manual group is hidden.

Location groups come from individual nodes' detected exit regions, not their names or the physical location of your device. New nodes may have no location until tests finish.

Apply a group to select the number of eligible entry servers required by your current route. Selecting one server fixes the connection to that server. The currently running nodes are highlighted.

## Node rows

Rows show the name, latency state, and protocol labels such as VLESS | XHTTP | TLS. Node lists update after imports and tests and are ordered by latency.

| Label | Measured delay |
| --- | --- |
| Fast | Up to and including 500 ms |
| Slow | Above 500 ms, up to and including 1000 ms |
| Available | Above 1000 ms |

Untested, failed, and timed-out nodes have separate states. A latency result measures the configured test request; it is not a bandwidth guarantee.

## Actions

Servers and subscriptions can be edited, shared, or deleted. Node editing uses JSON. Subscription editing uses the same name, URL, and age fields as adding a subscription.

Group testing can be cancelled after the current batch. Requests, including individual-node tests, are queued in order. Testing does not disable the node's other menu actions.

[Add servers]({{< relref "/docs/servers/import" >}}) · [Subscriptions]({{< relref "/docs/servers/subscriptions" >}}) · [Latency tests]({{< relref "/docs/advanced/latency" >}})

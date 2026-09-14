---
title: "Latency tests"
description: "Set a test URL and timeout; understand queued tests, cancellation, and server-location detection."
weight: 70
lastmod: 2026-09-12
---

Open Advanced > Xray > latency-test settings.

Choose a timeout from 3–8 seconds and a test URL: Cloudflare, Google, or a custom HTTP/HTTPS address. The default is 5 seconds with Cloudflare.

The test measures a request through a node, not an ICMP ping or a throughput benchmark. Location detection makes a separate request through that node; its result is the node's exit region.

## Queue behavior

Automatic imports, subscription/location tests, and individual-node requests share one queue. Later requests wait, including repeated tests of a single node. Different subscriptions are not tested simultaneously; nodes in the current batch can be measured together.

The batch button on a subscription or location switches to Cancel. Cancellation skips pending work and stops after the current batch finishes; it does not interrupt unrelated requests.

New nodes are queued for testing after import. Finishing import does not wait for test results. Initial setup has no server-import or latency-test step.

No concurrent-count setting or automatic-test switch is exposed. A fast result means low delay to the chosen test URL, not guaranteed bandwidth or access to every website.

[Latency labels]({{< relref "/docs/servers" >}})

When VPN is connected, a probe can traverse the current VPN path and not represent the node's independent latency. To measure the actual node path, disconnect VPN before testing. OneXray does not currently guarantee probe bypass while connected.

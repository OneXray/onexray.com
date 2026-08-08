---
title: Auto Update
weight: 4
---

Auto Update refreshes subscriptions and GeoData after app initialization. It is separate from the manual app-version check.

# Subscriptions

| Option | Meaning |
| --- | --- |
| Enable | Refresh outdated subscriptions automatically. |
| Interval | `1 day`, `3 days`, or `1 week`. |
| Auto Ping | Ping outbound nodes after a scheduled refresh. |

Refreshing replaces a subscription's node rows transactionally and updates its timestamp/count. A running VPN keeps its existing Final Config until it is restarted.

Age-encrypted subscriptions reuse their saved key pair during automatic refresh. Only the public recipient is sent in `X-Age-Public-Key`; decryption stays local.

# GeoData

System `geosite`/`geoip` and custom GeoData use the same interval choices. Custom entries are refreshed individually when outdated.

Only one download/update operation runs at a time, and the global downloading state is always cleared when an operation finishes or fails.

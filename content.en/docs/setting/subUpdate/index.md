---
title: Subscription Update
weight: 4
---

Subscription Update controls automatic data refresh after the Home page has started. It does not run during early app initialization.

# Subscription Refresh

| Setting | Meaning |
| --- | --- |
| Enable | Refresh outdated subscriptions automatically. |
| Interval | `1 day`, `3 days`, or `1 week`. |
| Auto Ping | Ping nodes in a refreshed subscription after updating it. |

Refresh keeps the old running config until the user starts VPN again. Updating a subscription replaces the subscription's stored nodes and updates its timestamp and count.

# GeoData Refresh

| Setting | Meaning |
| --- | --- |
| Enable GeoData | Refresh system and custom GeoData automatically. |
| GeoData interval | `1 day`, `3 days`, or `1 week`. |

System GeoData refreshes `geosite` and `geoip` together. Custom GeoData rows are refreshed one by one when their timestamp is older than the selected interval.

# Execution Rules

The automatic update service:

1. Runs only when no other download/update task is already active.
2. Reads the saved Subscription Update settings.
3. Refreshes outdated subscriptions if subscription update is enabled.
4. Refreshes outdated GeoData if GeoData update is enabled.
5. Uses the app's global downloading state while it is working.

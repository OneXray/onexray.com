---
title: "Data updates"
description: "Configure global subscription and GeoData update schedules, independent of App version updates."
weight: 60
lastmod: 2026-09-12
---

Open Advanced > Xray > Data updates. This is not part of Settings.

Subscriptions and GeoData each have their own automatic-update switch and interval:

- 1 day
- 3 days
- 1 week

Subscription settings apply to all subscriptions; individual sources do not have a separate auto-update toggle. Default GeoSite/GeoIP are one update unit. Custom data sources are checked independently.

## When checks happen

The app checks due updates after startup, on returning to the foreground, periodically while running, and after connecting. **Subscription auto-updates do not require VPN; GeoData auto-updates run only while VPN is connected.**

Disconnected checks skip GeoData. A successful connection schedules a check after about 3 seconds; disconnecting cancels that delay and prevents further data sources from starting. VPN startup itself does not download or update GeoData; missing required local files are reported explicitly.

Manual updates and configuration-import dependency downloads are independent of this connected-only automatic-update rule.

These are app-managed due checks, not a promise of an exact-time background task while the app is closed. The next check can perform an overdue update.

## Results

A subscription is replaced only if valid nodes are returned. Errors leave old data in place; successful imports report the imported count and enter the test queue. Active nodes are not silently switched.

GeoData is validated before publication. Failure retains old files without changing VPN state or triggering a reconnect. Updating the default pair does not mean every custom source succeeded; inspect each source's result.

App version checks are separate. New-version information is available through Settings > About OneXray.

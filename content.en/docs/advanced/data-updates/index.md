---
title: "Data updates"
description: "Configure global subscription and GeoData update schedules, independent of App version updates."
weight: 60
lastmod: 2026-09-09
---

Open Advanced > Xray > Data updates. This is not part of Settings.

Subscriptions and GeoData each have their own automatic-update switch and interval:

- 1 day
- 3 days
- 1 week

Subscription settings apply to all subscriptions; individual sources do not have a separate auto-update toggle. Default GeoSite/GeoIP are one update unit. Custom data sources are checked independently.

## When checks happen

The app checks due updates after startup, on returning to the foreground, periodically while it runs, and after a real connection transition. A VPN connection is not required.

These are app-managed due checks, not a promise of an exact-time background task while the app is closed. The next check can perform an overdue update.

## Results

A subscription is replaced only if valid nodes are returned. Errors leave old data in place; successful imports report the imported count and enter the test queue. Active nodes are not silently switched.

GeoData is validated before publication. Updating the default pair does not mean every custom source succeeded; inspect each source's result.

App version checks are separate. New-version information is available through Settings > About OneXray.

---
title: "Privacy policy"
description: "How OneXray processes local configurations, optional logs, installed-app lists, and network requests without an analytics backend."
weight: 80
lastmod: 2026-09-09
---

**Effective date: May 1, 2025**

**Last updated: September 9, 2026**

OneXray is a client for servers and configurations chosen by you. This policy explains local processing and the difference between app telemetry and the network requests needed for the client to work.

## 1. No app-data collection by the developer

OneXray requires no account and includes no advertising, analytics, tracking, telemetry, or crash-reporting service. We do not operate an app-data collection backend or collect your VPN traffic, browsing history, configurations, subscriptions, credentials, installed-app list, or connection logs through the app.

## 2. Data processed on your device

The app stores configuration, subscription URLs, optional age keys, routing data, and preferences locally. It also processes VPN status, current-connection traffic counters, and the generated runtime configuration. Historical/device-wide traffic totals are not stored.

Optional Xray access/error logs remain local. Logs may contain network addresses and other sensitive information. The macOS System Extension edition does not expose file-log recording/viewing.

Android reads installed-app names, package names, and icons for per-app VPN selection. Selected apps are stored locally. Windows/Linux read adapter information for outbound-interface selection. QR scanning processes the camera image to read the code; the scan is not uploaded to us.

## 3. Necessary network requests

The absence of analytics does not mean the app makes no network requests.

- VPN and DNS traffic goes to the servers and resolvers selected by the active configuration. Managed normal-mode DNS uses Google DNS.
- Subscription and routing-data updates connect to configured sources, including default GeoData release hosts.
- Latency tests contact the selected test URL. Region/exit detection uses a network-based lookup service, currently Cloudflare; it does not require GPS permission.
- App update checks contact GitHub. Opening documentation, stores, community links, or support pages contacts those services.
- Automatic updates and node tests may run after import or while the app is running, according to the relevant settings and workflow.

Those services necessarily receive connection information such as the source IP and request details, and apply their own privacy policies. We cannot control third-party handling. A subscription server receives the configured age public key when used; the private key is kept local. The download User-Agent can identify OneXray and its version/platform.

## 4. Sharing and external copies

The app does not automatically upload configurations or logs to us. If you export, copy, or share them, the selected destination may receive credentials, server addresses, or access tokens. Review content before sharing. age subscription links omit existing keys.

The app does not provide backup/restore. The operating system and any external copies you create are outside that app feature boundary.

## 5. Retention, deletion, and support

You can manage individual items or clear app data in Settings. Clearing first stops VPN and removes managed user data; exported files outside the app are not deleted by that operation. OS uninstall and backup behavior is controlled by the platform.

Because we do not collect app usage data, we have no app-telemetry record to retrieve or delete for you. If you contact us by email or a third-party platform, we use the information you voluntarily provide to respond to your request; the service also processes it under its policies.

## 6. Children

OneXray does not knowingly collect personal information from anyone, including children. It is not directed at children below the applicable minimum age.

## 7. Changes

We may update this policy when app behavior or requirements change. The current policy is hosted on this HTTPS page and linked from the app; the revision date appears above.

## 8. Contact

[yuan@yuandev.net](mailto:yuan@yuandev.net)

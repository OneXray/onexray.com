---
title: Share
weight: 5
---

The App allows you to share the following configurations.

1. All "Xray Setting".
2. All "Outbound".
3. All "Raw Config".
4. All "Subscription".
5. All "Rule Set".

# General Protocol

Xray-core outbounds use the [VMessAEAD / VLESS share link standard](https://github.com/XTLS/Xray-core/discussions/716) to maintain compatibility with other apps.

Subscriptions use the https link format to maintain compatibility with other apps.

# OneXray URL Scheme

OneXray private sharing protocol is mainly used for backup and restore. Different versions will try to maintain compatibility, but it is recommended that you always use the latest version to generate sharing links. If you are a VPN service provider, you can refer to [Develop]({{< relref path="../develop/index.md" lang="en">}}) to provide one-click jump for your customers.

OneXray private sharing protocol supports you to share the following configurations.

1. All "Xray Setting".
2. All "Outbound".
3. All "Raw Config".
4. All "Subscription".
5. All "Rule Set".

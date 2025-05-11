---
title: Rule Set
weight: 3
---

The app has two built-in rule sets, which are [geosite.dat](https://github.com/v2fly/domain-list-community) and [geoip.dat](https://github.com/v2fly/geoip) from the [v2fly](https://github.com/v2fly) community.

# Add

When you need to use a third-party rule set, you can add it here.
Since the App needs to parse the rule set once, you need to determine whether the newly added rule set is `domain` rules or `ip` rules.
The name of the rule set cannot be repeated with the existing rule set, otherwise it cannot be added. The rule set supports importing through the toolbar. You can also share your rule set.

Below are some third-party rule sets.

[V2Ray Routing rules file enhanced version](https://github.com/Loyalsoldier/v2ray-rules-dat)

[Iran Hosted Domains](https://github.com/bootmortis/iran-hosted-domains)

[Iran-v2ray-rules](https://github.com/Chocolate4U/Iran-v2ray-rules)

[russia-v2ray-rules-dat](https://github.com/runetfreedom/russia-v2ray-rules-dat)

# Limitation of Use

When you use rule sets on an iOS or iPadOS device, it is not recommended to use enhanced data. When there are too many rules, the VPN may fail to start because it exceeds the memory limit.

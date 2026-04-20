---
title: Xray Setting
weight: 1
---

The page structure set in this section is exactly the same as the Xray Json configuration structure. You can refer to the official documentation for more information.

[Config Reference](https://xtls.github.io/en/config/)

# How DNS works

## Note

The DNS queries involved in this section only support regular queries, that is, queries through port 53. Other queries such as `DNS over HTTPS` and `DNS over QUIC` will be treated as normal traffic.

When `address` in your outbound configuration is in the form of a domain name, queries for this domain name will not go through the DNS you specified in "Xray Setting". For details, please refer to [Tun Setting]({{< relref path="../../../setting/tun/index.md" lang="en">}}).

## Query Process

When the system's DNS query traffic reaches Xray-core, the routing component will forward the query traffic to the DNS outbound (i.e., dnsOut).
Among them, A and AAAA record queries will be performed by the DNS component, and other queries (such as TXT records) will be forwarded to other outbounds, depending on your DNS outbound configuration.

## Related Configuration

### DNS

Operation path: Edit DNS.

### DNS Outbound

Operation path: Edit Outbounds ➡️ DNS .

Note: When the `tag` specified by `dialerProxy` is not found in all outbounds, it will be automatically corrected to `direct` .

### DNS related rules

Operation path: Edit Routing ➡️ dnsQuery and dnsOut .

Note: When the `outboundTag` in `dnsQuery` is not found in all outbounds, it will be automatically corrected to `direct`.

## Avoid DNS leaks

When you don't want the local ISP to know which websites you visit, you can avoid DNS Leak by setting the following.

Note: When `address` is in the form of a domain name in your outbound configuration, queries for the domain name will inevitably be sent to the local ISP.

1. Edit Outbounds ➡️ DNS, and change `dialerProxy` to `proxy` or other custom outbound (if any).

2. Edit Routing ➡️ dnsQuery, and change `outboundTag` to `proxy` or other custom outbound (if any).

## Diversion Example

Sometimes you may need to use different DNS to resolve different domain names. Since Xray-core's DNS only supports one `tag`, we need to use some tricks to achieve this requirement.

1. Edit DNS.
2. Click the "Add" button in the servers configuration.
3. Click the server you just added to enter the "DNS Name Server" page.
4. Change `address` to `tcp+local://{yourDnsServer}` format, such as `tcp+local://223.5.5.5`.
5. Add a rule set in `domains`, such as `geosite:CN`.
6. Click the "Save" button to return to the "DNS" page.
7. Turn on the `disableFallbackIfMatch` switch.
8. Click the "Save" button.

# Routing

The app includes two default rules, which you cannot delete or reorder.

## Rules "Traps"

When you write rules, you need to pay attention to the overlapping relationship between the conditions in a single rule.
For example, there is a rule where `domain` contains `geosite:CN` and `ip` contains `geoip:CN`.
Then when a connection matches this rule, it will be considered to have hit the rule if and only if its domain name hits `geosite:CN` and its IP hits `geoip:CN`.

## inboundTag

Generally, there are three inbounds, namely `tunIn`, `pingIn`, and `dnsQuery`.

When you specify `tag` for the DNS server, there will be more inbounds.

In Tun mode, there is only one inbound, namely `tunIn`.

## outboundTag

The app reserves the following `outboundTag`, which you cannot use as a custom outbound `tag`.

1. proxy
2. direct
3. block
4. dnsOut
5. metrics

When you enter the "Rule" page, the App automatically calculates the currently available `tags`. You cannot select a `tag` that does not exist.

## balancerTag

When you enter the "Rule" page, the App automatically calculates the currently available `balancer`. You cannot select a `balancer` that does not exist.

## ruleTag

The app reserves the following `ruleTag`, which you cannot use as a custom outbound `ruleTag`.

1. dnsQuery
2. dnsOut

# Port Description

In some settings, you can set `port`, such as "Edit Inbounds" and "Edit Metrics". When `port` is 0, it means use a random port.

# Sharing

When you share your Xray settings, it is recommended that you also share the ruleset data used to avoid import failures. Please refer to [Sharing]({{< relref path="../../../share/index.md" lang="en">}}).

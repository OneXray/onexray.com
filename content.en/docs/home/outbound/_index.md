---
title: Outbound
weight: 2
---

The field structure in this page is basically the same as the Xray Json configuration structure. Please refer to the official documentation for more information.

[Outbound Proxies](https://xtls.github.io/en/config/outbound.html)

## XHTTP

`extra` is displayed by default. If you do not modify the default value, the field will not appear in the final Xray configuration file.

## Fragment

When Fragment is turned on, the App will generate a `freedom` outbound, whose `tag` is **outbound tag + Fragment**.
If the current outbound `tag` is `proxy`, the Fragment outbound `tag` is `proxyFragment`.

## interface

This configuration item is only applicable to Linux and Windows systems.

You can specify a network card for outbound traffic. If not specified, the network card configured in [Tun Setting]({{< relref path="../../setting/tun/index.md" lang="en">}}) will be used.
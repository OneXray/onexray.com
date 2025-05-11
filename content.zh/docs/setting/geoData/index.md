---
title: 规则集
weight: 3
---

App 内置两个规则集，它们是来自 [v2fly](https://github.com/v2fly) 社区的 [geosite.dat](https://github.com/v2fly/domain-list-community) 和 [geoip.dat](https://github.com/v2fly/geoip) 。

# 添加

当您需要使用第三方规则集时，您可以在这里进行添加。
由于 App 需要对规则集进行一次解析，您需要确定新增的规则集是 `domain` （域名）规则还是 `ip` 规则。
规则集的名字不可与现有规则集重复，否则无法添加。规则集支持通过“添加”按钮进行导入。您也可以分享您的规则集。

下面是一些第三方规则集。

[V2Ray 路由规则文件加强版](https://github.com/Loyalsoldier/v2ray-rules-dat)

[Iran Hosted Domains](https://github.com/bootmortis/iran-hosted-domains)

[Iran-v2ray-rules](https://github.com/Chocolate4U/Iran-v2ray-rules)

[russia-v2ray-rules-dat](https://github.com/runetfreedom/russia-v2ray-rules-dat)

# 使用限制

当您在 iOS 或 iPadOS 设备上使用规则集时，不建议使用增强版数据。当规则过多时，VPN 可能因为超出内存限制而无法启动。

---
title: Xray 设置
weight: 1
---

本部分设置的页面结构与 Xray Json 配置结构完全一致。可参考官方文档学习。

[配置指南](https://xtls.github.io/config/)

[使用指南](https://xtls.github.io/document/)

# DNS 工作原理

## 注意事项

本部分涉及到的 DNS 查询仅支持常规查询，即通过 53 端口进行的查询。其他查询如 `DNS over HTTPS`，`DNS over QUIC` 将被当作普通流量处理。

当您的节点配置中，`address` 为域名形式时，该域名的查询不会通过您在“Xray 设置”中指定的 DNS。具体可参考 [Tun 设置]({{< relref path="../../../setting/tun/index.md" lang="zh">}})。

## 查询流程

当系统的 DNS 查询流量到达 Xray-core 时，路由组件会将查询流量转发至 DNS 出站（即 dnsOut）。
其中，A 和 AAAA 记录查询将由 DNS 组件执行，其他查询（如 TXT record）将被转发至其他出站，具体取决于您的 DNS 出站配置。

## 相关配置

### DNS

操作路径： 编辑 DNS 。

### DNS 出站

操作路径： 编辑 Outbounds ➡️ DNS 。

注意：当 `dialerProxy` 指定的 `tag` 未在所有出站中找到时，它将被自动修正为 `direct` 。

### DNS 相关路由

操作路径： 编辑 Routing ➡️ dnsQuery 和 dnsOut 。

注意：当 `dnsQuery` 中的 `outboundTag` 未在所有出站中找到时，它将被自动修正为 `direct` 。

## 避免泄漏

当您不想让当地 ISP 知道您访问那些网站时，您可以通过以下设置来避免 DNS Leak。

注意：当您的节点配置中，`address` 为域名形式时，该域名的查询将不可避免地被发送给当地 ISP。

1. 编辑 Outbounds ➡️ DNS，将 `dialerProxy` 修改为 `proxy` 或其他自定义出站（若有）。
2. 编辑 Routing ➡️ dnsQuery，将 `outboundTag` 修改为 `proxy` 或其他自定义出站（若有）。

## 分流示例

有时您可能需要使用不同的 DNS 来解析不同的域名。由于 Xray-core 的 DNS 仅支持一个 `tag` ，我们需要通过一些取巧的方法来实现这种需求。

1. 编辑 DNS。
2. 点击 servers 配置中的“添加”按钮。
3. 点击刚才添加的 server，进入“DNS 域名服务器”页面。
4. 将 `address` 修改为 `tcp+local://{yourDnsServer}` 形式，如 `tcp+local://223.5.5.5`。
5. 在 `domains` 中添加规则集，如 `geosite:CN`。
6. 点击“保存”按钮，回到“DNS”页面。
7. 打开 `disableFallbackIfMatch` 开关。
8. 点击“保存”按钮。

# 路由

App 包含两条默认规则，您无法删除它们，也无法调整它们的顺序。

## 规则“陷阱”

当您编写规则时，您需要注意单个规则中的各个条件之间是叠加关系。
比如有这样一条规则，`domain` 中包含 `geosite:CN`，`ip` 中包含 `geoip:CN`。
那么当某条连接匹配至该规则时，当且仅当它的域名命中 `geosite:CN`，且 IP 命中 `geoip:CN` 时，它才算命中该规则。

## inboundTag

一般情况下，入站有三个，分别为 `tunIn`，`pingIn`，`dnsQuery`。

当您为 DNS server 指定 `tag` 时，入站将会更多。

Tun 模式下，实际入站只有一个，即 `tunIn`。

## outboundTag

App 保留以下 `outboundTag`，您不可将其作为自定义出站的 `tag` 。

1. proxy
2. direct
3. block
4. dnsOut

当您进入“规则”页面时，App 会自动计算当前可用的 `tag`。您无法选择一个不存在的 `tag`。

## ruleTag

App 保留以下 `ruleTag`，您不可将其作为自定义规则的 `ruleTag` 。

1. dnsQuery
2. dnsOut

# 端口说明

在某些设置中，你可以设置 `port`，如“编辑 Inbounds”和“编辑 Metrics”。当 `port` 为 0 时，它意味着使用随机端口。

# 分享

当您分享您的 Xray 设置时，建议您同时分享用到的规则集数据，以避免导入失败。请参考[分享]({{< relref path="../../../share/index.md" lang="zh">}})。

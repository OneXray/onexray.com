---
title: "场景配置方案"
description: "完整示例覆盖地区分流、公司 DNS、多条代理路径和有明确版本要求的开发功能。"
weight: -30
ai_order: 90
lastmod: 2026-09-14
---

按目标选择方案，不按 JSON 长度选择。网页代码块和下载链接使用同一份文件。[清单](/examples/manifest.json)标明替换要求、依赖和开发版本限制。

## 中国大陆与服务直连，GitHub 经过 VPN

使用[自定义路由完整示例]({{< relref "/docs/configuration/custom-routing" >}})；不需要文件时使用对应智能路由开关即可。

要求：两个合格已有节点、默认 Geosite 和 GeoIP。顺序为广告 → GitHub 代理 → 合并域名直连 → 合并 IP 直连。GitHub 必须在 Microsoft 之前；域名和 IP 分成两条，否则会把“或”的意图改成“且”。

按自定义路由导入，选择配置和足够节点的分组。检查生成规则，再验证代理、直连和阻断目标。未命中目标走第一节点，不自动在全部节点间均衡。

## 公司域名和私有网络

先询问实际域名、网段、直接可达的 DNS。下列地址是场景占位资料，不代表用户局域网。

{{% json-example "custom-office.json" %}}

纯域名规则同时用于直连 DNS，独立 IP 规则覆盖已直接使用地址的连接。其他流量保持默认代理。文件需要一个已有节点。

通常不用改隧道 DNS。Apple 若需让某网段完全绕开隧道，需另外关闭接管全部流量并配置排除网段；排除本身不会修改 DNS。明确用户想要“Xray 内直连”还是“系统绕过 Xray”。

## 一个服务器，普通路由

取得真实参数后使用[节点模板]({{< relref "/docs/configuration/outbound" >}})，在服务器中导入，保留智能路由。节点文件不加入 App 生成的 TUN 或 metrics。

## 完整 DNS 或多接入链式代理

使用 [Raw 示例]({{< relref "/docs/configuration/raw-json" >}})。基础模板包含 DNS 拦截和代理解析路径，多接入模板展示最终出口副本和 balancer。

这些不是可用订阅，必须替换凭据。生成最终配置前确认是否接受直连 fallback 和未命中流量的默认行为。

## 移动端阻断 QUIC：开发版本

仅用于确认支持 protocol/localOS 的构建，使用[扩展示例]({{< relref "/docs/configuration/custom-routing" >}})。两个条件为 AND：嗅探到 QUIC，且 Xray 运行在 iOS/Android；不表示某个应用。嗅探不保证识别全部流量，阻断 QUIC 也不保证所有应用自动回退 TCP。

## FakeDNS：开发版本

仅用于包含已说明 FakeDNS 集成的构建。使用[自定义示例]({{< relref "/docs/configuration/custom-routing" >}})，保留真实 DNS，并阅读[缓存和系统路由限制]({{< relref "/docs/configuration/dns" >}})。内核接受根部 fakedns 不代表 App 已具备完整集成。

## 仅需 UI 的场景

“只让几个 Android App 使用 VPN”“回家 Wi-Fi 断开 VPN”“选择 Ethernet 网卡”使用[隧道指南]({{< relref "/docs/tunnel-guide" >}})。为 Xray 之外的平台设置生成路由 JSON 是错误输出。

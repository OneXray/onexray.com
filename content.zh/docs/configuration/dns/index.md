---
title: "DNS 与 FakeDNS"
description: "区分路由本地 DNS、Raw DNS 和系统隧道 DNS，避免解析路径与预期不符。"
weight: 40
ai_order: 70
lastmod: 2026-09-14
---

## 三层设置

| 设置 | 用途 | 修改位置 |
| --- | --- | --- |
| 智能/自定义本地 DNS | 解析符合直连条件的域名 | 路由编辑器；自定义使用 app-dns-direct |
| Raw DNS | 用户完整的 DNS 与解析流量路由 | Raw 的 dns、相关 outbounds 和 routing |
| 隧道 DNS | 平台隧道声明/使用的地址 | 高级 → VPN 隧道；域名仅用于 Apple DoT |

修改隧道 DNS 不会替换路由内的解析器。内网域名无法解析时先检查路由 DNS，不要直接改全部隧道字段。

## 普通模式

代理 DNS 固定为 8.8.8.8。智能/自定义另有直连 DNS，默认也是 8.8.8.8。即使地址相同，两者仍有独立 tag 和出站路径。

直连解析器的 domains 仅从**纯域名直连规则**提取。域名同时带目标 IP、端口、网络、协议或系统条件时，不把该规则加入 DNS 域名列表；直连解析器不是通用 fallback。

公司内网名称应单独建立域名直连规则，并使用直接可达的公司 DNS；需要时另建 IP 规则。仅配置 192.168.0.0/16 不会告诉 DNS 如何解析 printer.corp.example.com。

智能路由关闭本地 DNS 开关时保留地址，但停用域名映射。“所有流量经过 VPN”则只生成代理 DNS，没有直连 DNS。它不是补了一条无条件代理规则的自定义路由。

## 地址与可达性

使用内核支持的地址字符串，如 IP、tcp://192.168.50.53:5353 或提供商的 HTTPS DNS URL。自定义格式仅保存 tag 和 address，不拆成额外属性。

直连 DNS 必须在不经过所选代理的情况下可达。只能通过指定代理访问的解析器需要明确的 Raw DNS/路由设计。域名形式的加密 DNS 还可能需要引导解析，不能通过虚构 hosts 或跳过证书验证掩盖问题。

scheme 以 +local 结尾的 DNS URL 绕过 Xray 路由，不受所需出口网卡策略约束，Windows/Linux 运行时拒绝。应选择正常经过路由的解析地址，不悄悄改写用户的 DNS 传输。

## IPv6

App 关闭 IPv6 时调整托管隧道参数，DNS 使用 UseIPv4；打开时使用 UseIP。Windows MSIX 保持自身隧道处理。不会添加 IPv6 阻断规则，也不删除全部用户 IPv6 路径。Raw 的根部和对象形式 server 的查询策略由 App 管理，但 DNS 地址仍由用户配置。

## FakeDNS：仅开发构建

先核对[版本兼容]({{< relref "/docs/configuration/compatibility" >}})，本节不属于 26.9.2 基线。

智能/自定义的 FakeDNS 默认关闭。自定义通过额外的 `{"tag":"app-dns-fake","address":"fakedns"}` 启用，同时保留 app-dns-direct。不能写根部 fakeDns: true 或根部 fakedns。

App 生成 198.19.0.0/16 和 fc00:1::/64 两个池，每池 32768 项，并为托管入站增加 FakeDNS 还原。直连域名仍优先使用真实直连 DNS，其他符合条件的 A/AAAA 查询可返回虚拟 IP；连接路由仍可能直连、代理或阻断。IPIfNonMatch 所需的真实 DNS 路径仍保留。

开发中的 Raw 实现检测 fakedns server 或根部池，为 tunIn 开启还原，保留用户自己的 DNS 和池。不应期待旧版本具备这项集成。

虚拟 IP 必须被系统送入隧道，不能被排除路由绕开。映射只在当前 Core 存活；重启后浏览器/系统缓存的虚拟 IP 可能失效，需重新查询 DNS。App 不承诺无缝恢复缓存，也不保证拦截应用自带的全部 DoH/DoT。

参考：[Xray DNS](https://xtls.github.io/config/dns.html)，与 OneXray 的导入和字段归属共同阅读。

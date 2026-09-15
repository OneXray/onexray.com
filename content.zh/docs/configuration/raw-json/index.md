---
title: "Raw JSON"
description: "生成完整用户配置，并避免与 OneXray 接管的运行字段冲突。"
weight: 30
ai_order: 60
lastmod: 2026-09-15
---

入口：连接 → 专家模式 → Raw JSON → 导入或编辑。根部填写 name，文件内包含全部实际代理节点。普通模式的节点选择、智能路由和自定义路由不会合并进来。

完整是指“供 OneXray 使用的完整配置”，不要求它直接作为命令行配置运行；平台入站由 App 添加。

## 运行时字段归属

| 配置 | 负责方与生成原则 |
| --- | --- |
| 实际节点、顺序与链路依赖 | 用户，不能使用空接入槽 |
| routing、balancers、DNS server、用户 FakeDNS 池 | 用户，不能假定智能路由会自动添加 |
| inbounds 中的 tunIn | 缺失时由 App 添加；已有时仅合并平台接管的 settings |
| 其他入站 | 用户，但必须满足平台/端口限制，不额外创建 TUN |
| log、metrics、流量计数 | App，省略生成路径、监听器和统计策略 |
| DNS 查询策略 | App 的 IPv6 设置决定，不承诺用户冲突值生效 |
| 资源/证书路径与 TUN 文件描述符 | App 运行环境 |
| Windows/Linux 出口网卡 | App 中选择的网卡，Raw 不能覆盖 |

保存原文与运行副本不同。托管区域之外保留用户字段。运行配置中的本机端口、路径、生成字段不能原样当作跨设备模板发布。

### 保留已有的 tunIn

已有 `tunIn` 保留数组位置、其他入站字段和用户的 `sniffing`，包括关闭或未填写 sniffing。对于 TUN 入站，App 仅接管 `settings` 中的 `name`、`mtu`、`gateway`、`dns`、`autoSystemRoutingTable`、`autoOutboundsInterface`：按平台覆盖，Apple/Android 删除不适用的后四项，其他用户设置原样保留。无需 SOCKS 适配的平台要求 `protocol: "tun"`。

Windows MSIX 和 iOS 模拟器会明确适配为 SOCKS，按需替换协议、监听地址、端口和 SOCKS settings，保留无关字段。这不意味着整体重建所有入站。仅当整个 `tunIn` 不存在时才生成带默认 sniffing 的入站。完整 Raw 不受高级自定义模板字段白名单限制。

## VLESS 与完整 DNS 示例

模板：替换地址、UUID、TLS 参数和端口。不依赖 Geodata。DNS 拦截和转发由这份文件明确配置，不能只改根部 DNS 地址却忽略路由。

{{% json-example "raw-vless-tls.json" %}}

第一个 outbound 是默认代理路径。来自 tunIn 的 53 端口流量交给 user-dns，A/AAAA 由内置 DNS 处理，DNS 发起的连接走代理。非 A/AAAA 转发通过 DNS outbound 的 dialerProxy。私有目标 IP 直连。规则引用 App 生成的 tunIn，但输入不定义它。

不能添加 53 端口规则却没有 DNS outbound，也不能把解析器再次导入自己的 DNS 拦截规则。浏览器自带的 443 端口 DoH 不等同于普通 DNS。

## 多接入与最终出口

链路方向为：设备 → 接入 → 最终出口 → 目标。每份最终出口副本的 streamSettings.sockopt.dialerProxy 指向对应接入，而不是反过来。

模板需要两个真实接入和一个最终出口。两份出口副本使用同一出口凭据，不同 tag 和依赖。

{{% json-example "raw-chain.json" %}}

balancer 的 selector 填完整出口 tag。这里显式匹配的 example.net 和 DNS 查询使用负载均衡；未命中流量走第一条完整链，非 A/AAAA DNS 转发也走第一出口。fallbackTag: direct 允许直连回退，不是断网保护。示例不承诺所有未命中连接都均衡。

## 校验与依赖

保存时用独立副本进行 libXray 实例构造/关闭，不启动实例；删除或缩减 App 管理资源，保留用户协议、路由、DNS 依赖。成功不表示端口绑定、权限或连通性已经验证。

自定义 DAT 先通过“路由数据”安装，或使用 App 的 Raw 分享流程携带独立 Geodata App Link。根部 geodata.assets 是 Custom 导入规范，不负责普通 Raw 文件的依赖下载。参见[依赖说明]({{< relref "/docs/configuration/geodata" >}})。不嵌入本机绝对路径，不依赖 VPN 启动时下载；其他文件和模块依赖也需明确提供。

长尾字段参考[对应版本的 Xray 文档](https://xtls.github.io/config/)，但不能覆盖 App 的字段归属。Raw 声明 FakeDNS server 或池时，新生成的 `tunIn` 默认启用还原；已有入站的 sniffing 不会改写，需要自行配置还原。详见 [FakeDNS 行为与限制]({{< relref "/docs/configuration/dns" >}})。

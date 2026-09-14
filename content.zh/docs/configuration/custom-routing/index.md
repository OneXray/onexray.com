---
title: "自定义路由 JSON"
description: "使用空接入槽、有序规则、固定动作、本地 DNS 和明确的 Geodata 依赖。"
weight: 20
ai_order: 50
lastmod: 2026-09-14
---

入口：连接 → 流量方式 → 自定义路由 → 导入，不是普通服务器导入。导入后选择该路由，再在连接页选择已有节点。

## 文件结构

| 字段 | 规范 |
| --- | --- |
| `name` | 非空、唯一的显示名称，最多 32 个字符 |
| `outbounds` | 必填，1–3 个空对象，数量表示接入节点数 |
| `routing.domainStrategy` | 填写 `IPIfNonMatch`，App 会规范化此值 |
| `routing.rules` | 有序规则；空列表使用默认出站行为 |
| `dns` | 可选，仅允许下述带固定 tag 的本地 DNS 及可选 FakeDNS server |
| `geodata.assets` | 可选，导入专用依赖，每项仅有 file 和 HTTPS url |

不允许其他根字段。不定义真实节点、direct/block/dnsOut 出站、balancers、inbounds、日志、统计、observatory、根部 FakeDNS 池或 UI 标记。

## 条件与动作

支持的条件为 domain 字符串数组、ip 字符串数组、port（如 `"443"`、`"8000-8080"`、`"80,443"`）、network（`"tcp"`、`"udp"`、`"tcp,udp"`），以及 protocol、localOS 字符串数组。规则名称写入 ruleTag；编辑器中的协议和系统条件位于“更多匹配条件”。

每条规则恰好选择一个动作：

| 目标 | JSON |
| --- | --- |
| VPN | `"balancerTag": "proxy"` |
| 直连 | `"outboundTag": "direct"` |
| 阻断 | `"outboundTag": "block"` |

不能写 outboundTag: proxy。不能写 type、enabled、sourceIP、sourcePort、attrs、inboundTag 或进程条件；不支持字段会直接拒绝。

不同条件类型为 AND；同一条件中的普通列表值为候选项。域名或 IP 任一满足的意图应拆成两条规则。IP 反选列表遵循 Core 语义，不能直接套用普通列表的 OR 说明。

域名形式：full:host.example.com 精确域名、domain:example.com 域名及子域名、geosite:CN 实际默认分类、ext:other.dat:category 实际自定义分类。裸字符串是关键词，不是精确域名；不要悄悄扩大为子串或正则匹配。

IP 可为地址、CIDR、geoip:CN 或 ext:other.dat:category。[分类必须真实存在]({{< relref "/docs/configuration/geodata" >}})。

## 顺序、默认行为

规则依次匹配。IPIfNonMatch 仅在域名首轮未命中时解析 IP 再匹配。不要在末尾补无条件代理规则，这可能阻止 IP 第二轮。

App 始终生成 proxy round-robin balancer，单节点也一样，fallback 为 direct。**未命中流量使用第一个 outbound，不经过 balancer。** 需要负载均衡的目标应显式匹配 proxy。直连回退不是失败时断网的保证。

真实节点与系统出站由 App 生成；自定义文件仅引用上述三个动作。

## 本地 DNS

包含 dns 时，必须有且仅有一条 `{"tag":"app-dns-direct","address":"8.8.8.8"}`。只改其 address，不改 tag；启用 FakeDNS 时另加下述 app-dns-fake server。不额外添加 domains、queryStrategy、skipFallback、port 等字段；非默认端口写在内核支持的地址字符串中，例如 tcp://192.168.50.53:5353。

只有纯域名直连规则参与本地 DNS 域名列表。域名同时带 IP、端口、网络、协议或系统条件时，该规则不贡献 DNS 域名。IP 直连规则本身不能解决内网域名解析。代理 DNS 固定为 8.8.8.8。

## 完整示例

包含广告阻断、GitHub 代理，以及合并后的 Apple/Microsoft/Bing/中国大陆/私有域名和 IP 直连。需要两份默认 DAT 和两个可用接入节点，没有待填凭据。

{{% json-example "custom-cn.json" %}}

## 协议与操作系统条件

protocol 支持 http、tls、quic、bittorrent；localOS 支持 ios、android、darwin、windows、linux，均为数组。protocol 是嗅探的应用流量协议，不是 VLESS/VMess；localOS 是运行 Xray 的系统，不是远端系统或 Android 应用名。

{{% json-example "custom-protocol.json" %}}

## FakeDNS

FakeDNS 默认关闭，通过额外的带 tag 的 DNS server 保存，不能写根部布尔开关。必须同时保留 direct server，不导出生成的池和嗅探设置。

{{% json-example "custom-fakedns.json" %}}

[版本条件]({{< relref "/docs/configuration/compatibility" >}}) · [DNS 与 FakeDNS 限制]({{< relref "/docs/configuration/dns" >}}) · [依赖导入]({{< relref "/docs/configuration/geodata" >}})

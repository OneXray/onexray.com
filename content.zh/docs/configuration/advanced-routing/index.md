---
title: "高级路由 JSON"
description: "复用 App 节点，自行编写 DNS、嗅探、额外入站和完整规则顺序。"
weight: 25
ai_order: 55
lastmod: 2026-09-15
---

入口：**连接 → 流量方式 → 新建自定义路由 → 高级 JSON**。导入文件或直接编辑，填写名称并保存，再在连接页选择该路由和已有节点、订阅或位置。它是自定义路由模板，**不是首页专家模式的完整 Raw**，不包含实际代理节点，也不需要这些节点的凭据。

常规和高级共用三份自定义路由的上限，名称唯一且为 1–32 个字符。已有配置不能切换类型，避免表单丢弃 JSON 字段；需要另一种类型时新建配置。Raw 的数量限制独立。

## 接入槽和固定标签

`outbounds` 以 1–3 个连续空对象开头，后面才放辅助出站，不得交错。自动、订阅或位置选择需要对应数量的合格、不同节点；固定选择单个节点时，整个槽区域替换为这一个节点。更换节点不修改模板。

运行顺序：所选节点最前，随后保留辅助出站的原顺序，最后生成 `direct` 和 `block`。规则未命中时走**第一个 outbound**，不自动进入负载均衡。App 不添加兜底规则；自行添加无条件规则可能阻止 `IPIfNonMatch` 的第二轮 IP 匹配。

| 标签 | 约定 |
| --- | --- |
| `proxy` | App 生成 roundRobin balancer，selector 为完整节点 tag，fallbackTag 为 direct，并补齐 Observatory。只用 `balancerTag` 引用，不用于 outboundTag 或 dialerProxy；direct 回退不属于失败即阻断方案。 |
| `direct`、`block` | App 生成，只引用，不在模板中定义。 |
| `tunIn` | 平台入站，可在规则中引用。模板只提供 tag 和 sniffing。 |
| `dnsOut` | 需要时由模板显式定义 DNS outbound；App 不自动补齐。 |
| `app-entry-*`、`app-exit-*` | 内部节点标识，不得定义或引用。 |
| 其他标签 | 用户入站、DNS 查询和辅助出站；DNS 起名不自动赋予代理或直连行为。 |

高级路由不增加最终出口，也不向 App 节点任意注入补丁。`dialerProxy` 只能引用实际 outbound，不能指向 balancer。需要自行维护真实节点及完整链式配置时使用 Raw。

## 接受的 JSON

根部支持 `name`、`outbounds`、`inbounds`、`dns`、`routing`、`fakedns` 和交换用的 `geodata.assets`。名称与依赖元数据单独存储，不保留在模板运行 JSON 中。不增加 mode、enabled 或节点 ID 等自定义字段。

| 部分 | 字段与边界 |
| --- | --- |
| routing | domainStrategy、按顺序排列的 rules；策略和 ruleTag 保留用户值。 |
| 规则 | ruleTag、domain、ip、port、network、protocol、localOS、inboundTag、localIP、localPort、balancerTag、outboundTag；选择一个动作。 |
| 托管 tunIn | 仅 tag、sniffing，不填写 protocol/listen/port/settings。 |
| 额外入站 | tag、protocol、listen、port、settings、sniffing。协议为 socks、http 或 tunnel，支持多个独立实例。 |
| SOCKS settings | auth、users/accounts、udp；保留全部 user/pass 账户。 |
| HTTP settings | users/accounts；不支持 allowTransparent。 |
| Tunnel settings | rewriteAddress、rewritePort、allowedNetwork；这是端口转发，不是另一个系统 TUN。 |
| sniffing | enabled、routeOnly、destOverride、metadataOnly、domainsExcluded、ipsExcluded，各入站独立。 |
| 辅助出站 | tag、protocol、settings、streamSettings.sockopt.dialerProxy；协议为 freedom、blackhole、dns，settings 使用绑定内核的语法，不保存远程代理节点。 |
| DNS | 内核支持的 hosts、servers、clientIp、tag、缓存/回退/并行查询选项等，见下文。 |
| FakeDNS | 标准 fakedns 池的 ipPool/poolSize，以及完整 DNS 与嗅探链路；省略池时遵循内核默认值。 |

不接受 `process`、来源 IP/端口（`sourceIP`、`source`、`sourcePort`）、HTTP 属性 `attrs`、路由 `user`、HTTP `allowTransparent`。字段值的有效性以 libXray 为准，App 只检查模板边界和归属，不另写域名/IP 语法校验。完整 Raw 不受此模板字段清单限制。

## DNS 由模板负责

App **不**插入 proxy/direct DNS server、不根据直连规则生成 DNS domains、不插入 53/853 规则，也不重排用户规则。必须在可见 JSON 中写出 DNS 查询的完整路径，以及被引用的 DNS outbound；非 A/AAAA 的处理也要明确。

DNS 根部可使用 `hosts`、`servers`、`clientIp`、`tag`、`disableCache`、`serveStale`、`serveExpiredTTL`、`disableFallback`、`disableFallbackIfMatch`、`enableParallelQuery`、`useSystemHosts`。服务器可写地址字符串或对象；对象可用 address、port、clientIp、domains、expectedIPs、unexpectedIPs、skipFallback、tag、timeoutMs、缓存/过期配置和 finalQuery，遵循绑定内核语法。

根部和 server 的 `queryStrategy` 属于 App，模板必须省略，误填会报错。运行时按全局 IPv6 开关使用 UseIP/UseIPv4，不改 DNS 地址。`+local` DNS 传输绕过 Xray 路由，不能遵守 Windows/Linux 所需的出口网卡选择，这些平台会拒绝；仅设置 DNS tag 不能改变该行为。参见 [DNS 指南]({{< relref "/docs/configuration/dns" >}})。

日志、stats、metrics、policy、环境与资源路径、Observatory、balancers、出口网卡均由 App 接管，不接受为模板字段。相关配置在**高级 → VPN 隧道 / Xray** 中修改。

## 嗅探与完整 Raw 的区别

高级模板显式提供 `tunIn.sniffing` 时按整对象保留，未写子项遵循内核默认值；没有提供整个对象时使用 App 默认嗅探，包括 FakeDNS 检测。仅写 routeOnly 不等于开启嗅探；不会暗中打开显式关闭的嗅探。

**完整 Raw** 中，已有 tunIn 保留数组位置、嗅探和非托管 settings，App 只合并必要平台参数；未写 sniffing 时仍不补。整条入站不存在才生成默认值。六个覆盖字段及 SOCKS 平台适配详见 [Raw JSON]({{< relref "/docs/configuration/raw-json" >}})。

## 完整示例

所有示例复用 App 节点。两个自动槽需要两个合格节点，也可以固定选择单个节点。示例显式丢弃隧道 DNS 的非 A/AAAA 查询；需要这些查询时应主动调整 DNS outbound 规则。示例不承诺防泄漏或失败即阻断。

### 本机 SOCKS 与 TUN routeOnly

替换额外 SOCKS 的密码；这是入站账户，不是远程节点凭据。客户端连接 `127.0.0.1:12080`，SOCKS 流量显式使用 proxy；未匹配的系统流量使用第一个接入节点。将 listen 改为非回环地址会向对应网络开放代理，应检查认证和防火墙。移动端后台行为可能限制额外监听；首页流量只统计 tunIn，不含这些入站。

{{% json-example "advanced-socks.json" %}}

### 中国大陆直连与独立 DNS

需要默认 geosite.dat:CN、geoip.dat:CN。直连 DNS 1.1.1.1 必须在不经过所选代理时可达，必要时替换。DNS 查询规则位于目标规则之前，不添加兜底规则，因此 IPIfNonMatch 可以进入第二轮 IP 匹配。

{{% json-example "advanced-split-dns.json" %}}

### 显式 FakeDNS

同时提供 DNS、两个池和 `destOverride: fakedns`。系统必须把虚拟 IP 送入隧道，不要排除这些网段。重连后缓存的 Fake IP 可能失效；模板保留真实 DNS 供需要真实查询的路径使用。参见 [FakeDNS 限制]({{< relref "/docs/configuration/dns" >}})。

{{% json-example "advanced-fakedns.json" %}}

## 导入、分享与验证

- 裸 JSON 的类型来自所选编辑器。使用高级 JSON 导入，不根据某个 DNS 字段猜类型，也不交给常规表单。
- App Link 使用 `/config/add?type=custom-advanced&data=<base64>#<name>`；常规仍为 custom。带类型的链接也可通过现有 App 链接入口导入。
- geodata.assets 仅含 file/url，省略默认文件，文件名冲突拒绝导入。导入时下载并暂存，保存时提交并移除交换字段；直接粘贴 manifest 不会下载，请使用**导入**。分享依据路由、DNS、嗅探中的语义引用重建依赖。见 [Geodata]({{< relref "/docs/configuration/geodata" >}})。
- 保存时用 libXray TestXray 校验副本：空槽替换为本地 freedom，补齐固定 balancer/direct/block，用无平台副作用的入站承载用户 TUN 嗅探。只构造并关闭，不 Start、不测速、不启动 VPN。
- 选择路由后，再验证 VPN 启动、目标网站、DNS 路径、额外监听和 FakeDNS。构造成功不代表权限、端口绑定或连通性通过；Windows/Linux 和 Apple 的平台行为需在对应系统验收。

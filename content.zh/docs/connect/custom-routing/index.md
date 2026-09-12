---
title: "自定义路由"
description: "创建最多三份命名路由，使用四类条件、GeoData 自动补全和独立分享，不与具体节点绑定。"
weight: 20
lastmod: 2026-09-12
---

自定义路由只管理流量规则，不绑定具体服务器。节点来源仍在连接页选择。

## 创建路由

在流量方式弹窗中选择自定义路由并添加。填写唯一名称，为自动或分组选择设置 1–3 个接入节点。最多保存三份自定义路由。

每条规则包含名称、动作（VPN、直连、拦截）和以下四类条件：

| 条件 | 示例 |
| --- | --- |
| 网站与域名 | domain:example.com、geosite:cn |
| IP 地址或网段 | 192.168.0.0/16、geoip:private |
| 端口 | 端口或支持的端口范围 |
| 网络 | TCP、UDP |

建议一条规则只填写一种条件。如果填写多类条件，**每类都满足才会匹配**；同类的多个值互为备选。域名和 IP 使用独立输入行，并根据本机已安装的路由数据提供自动补全。

规则按顺序匹配；从列表行删除。不提供启用／停用开关或“更多条件”。

## 本地 DNS

每份自定义路由独立保存“本地 DNS 地址”，默认 `8.8.8.8`。直连规则中的域名使用它解析，代理 DNS 仍固定为 `8.8.8.8`。域名匹配从直连规则自动生成，不依据 IP、端口或网络条件选择 DNS；只有 IP 直连规则并不足以配置内网域名解析。

分享使用标准 `dns.servers`，通过固定 `tag: app-dns-direct` 标记这一服务器，只保存 `address`。不依赖数组位置，也不导出运行时生成的域名列表、回退或查询策略。没有 DNS 字段的旧路由继续使用默认地址；需要任意 DNS 结构时使用 Raw JSON。

## 保存与分享

使用固定底部操作栏保存整份路由。编辑规则只修改草稿；修改正在使用的路由时需要重新连接。

完整路由的分享和导入沿用 Raw JSON 的交互。下面是包含两个空接入槽的最小示例：

```json
{
  "name": "Local network direct",
  "outbounds": [{}, {}],
  "dns": {
    "servers": [{"tag": "app-dns-direct", "address": "8.8.8.8"}]
  },
  "routing": {
    "domainStrategy": "IPIfNonMatch",
    "rules": [
      {
        "ruleTag": "Private addresses",
        "ip": ["geoip:private"],
        "outboundTag": "direct"
      },
      {
        "ruleTag": "Example through VPN",
        "domain": ["domain:example.com"],
        "balancerTag": "proxy"
      }
    ]
  }
}
```

存储和导出仅包含空接入槽。不要添加 direct 或 block 出站对象：OneXray 在校验和运行时生成它们，规则内的动作引用仍保留。

domainStrategy 固定为 IPIfNonMatch，规则名称使用 ruleTag，并省略 type。编辑器不支持的字段或完整出站定义请使用 [Raw JSON]({{< relref "/docs/connect/raw-json" >}})。

## 自定义路由数据

导出可以携带 geodata.assets，声明自定义文件名与 HTTPS 下载地址；默认 geosite.dat、geoip.dat 不包含在其中。导入会下载依赖，文件名冲突时拒绝，不覆盖已有的其他文件。

[分享格式]({{< relref "/docs/sharing" >}}) · [路由数据]({{< relref "/docs/advanced/geodata" >}})

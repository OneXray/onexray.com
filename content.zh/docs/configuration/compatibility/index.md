---
title: "版本与兼容性"
description: "OneXray 的导入格式、路由条件、FakeDNS 与配置要求。"
weight: 1
ai_order: 20
lastmod: 2026-09-14
---

OneXray 支持节点、自定义路由和 Raw JSON 导入。三种类型各有字段与使用要求，应根据需求选择对应入口。

| 能力 | 说明 |
| --- | --- |
| 节点、自定义路由、Raw 导入 | 支持 |
| 自定义域名、目标 IP、端口、网络条件 | 支持 |
| 使用 `app-dns-direct` 保存本地 DNS | 支持 |
| 自定义 `protocol`、`localOS` | 支持 |
| 智能/自定义 FakeDNS 与 `app-dns-fake` | 支持，默认关闭 |
| Raw 的 App 托管入站自动还原 FakeDNS | Raw 声明 FakeDNS server 或池时启用 |
| Microsoft 直连开启时优先代理 GitHub | 支持，排在直连规则之前 |

旧版本可能不支持本文的全部字段。选项缺失或拒绝受支持字段时，先更新 App；不能通过悄悄删除条件“兼容”用户需求。必须使用旧版本时，应说明限制并确认替代方案；Raw 也不能自动补齐缺失的原生集成。

## 内容依据

- 本文核对的 App 实现：[提交 `eed1da1`](https://github.com/OneXray/OneXray/tree/eed1da12c7ef1d4cbae759110f708317152bd62b)。
- App 的获取方式见[安装指南]({{< relref "/docs/install" >}})。
- 本次文档示例校验使用 libXray `c145d94071088cebd445d7b0f4b1bea35732011e`、Xray-core `v1.260327.1-0.20260908222543-52a412d9e2f5`。
- [示例清单](/examples/manifest.json)记录每份文件的导入类型、依赖和替换要求。

上游当前文档可能比已安装内核更新。App 导入以 OneXray 的结构和托管边界为准，协议字段由配套 libXray 判定。不要混用其他客户端或旧 VMessQrCode 的格式。

## 数量和资料要求

自定义路由最多保存三份，名称唯一且为 1–32 个字符，每份包含 1–3 个空接入槽。新增 Raw 最多三份；旧库超出三份的记录保留可用，隐藏添加入口。

普通模式需要已有真实节点。自动/分组选择必须有足够的合格、不同节点；固定单个节点时使用该节点。Raw 必须包含自己的真实出站，不借用普通模式当前节点。

节点和 Raw 示例使用保留的示例域名与虚构 ID。必须替换为服务端提供的真实值；它们不是免费服务器。

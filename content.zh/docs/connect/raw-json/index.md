---
title: "Raw JSON"
description: "Raw JSON — 导入与分享"
weight: 30
lastmod: 2026-09-14
---

在连接页打开专家模式，Raw JSON 替代普通连接选择，添加/编辑打开 JSON 编辑器。使用完整配置导入，不是普通服务器导入。

## 编辑与应用

每份配置需名称。首次安装为空，新增最多三份；旧数据超过三份仍显示、可编辑，隐藏添加入口。分享前检查凭据和依赖。

Raw 不合并智能/自定义路由，也不借用当前节点。保存校验独立副本，不把原文改写为平台运行配置。有效改动影响当前配置时需要重连。

## 生成正确文件

[Raw JSON 规范]({{< relref "/docs/configuration/raw-json" >}})提供完整模板、字段归属、DNS 组合和链路示例。App 管理的隧道、日志、统计、查询策略及 Windows/Linux 网卡不能被用户 JSON 覆盖。

可保存不代表服务器可用或具备启动权限。必要本地 Geodata 缺失时明确报错，不在启动 VPN 时下载兜底。参见[验证]({{< relref "/docs/troubleshooting" >}})和[依赖]({{< relref "/docs/configuration/geodata" >}})。

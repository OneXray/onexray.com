---
title: "添加服务器"
description: "通过链接、订阅、节点 JSON、文件和二维码导入 OneXray，普通节点不再二次确认。"
weight: 10
lastmod: 2026-09-09
---

入口：服务器 → 添加服务器；首次初始化也可以直接选择导入方式。

| 方式 | 行为 |
| --- | --- |
| 读取剪贴板 | 展示粘贴的文本，提交后导入 |
| 添加订阅 | 名称、HTTPS URL、可选 age 设置 |
| 导入文件 | 直接打开系统文件选择器 |
| 手动添加 | 打开 JSON 编辑器，不使用协议字段表单 |
| 扫描二维码 | 仅 iOS / Android 打开扫码页面 |

支持兼容的协议分享链接和 Xray JSON 节点。文本文件与二维码图片可以通过文件入口导入。

## 导入范围

普通服务器导入只提取 outbounds，不应用源文件中的 routing、DNS 或其他完整配置设置。请通过[自定义路由]({{< relref "/docs/connect/custom-routing" >}})或 [Raw JSON]({{< relref "/docs/connect/raw-json" >}})导入完整配置。

批量订阅每行一个 HTTPS URL：

```text
https://example.com/sub-one#Personal
https://example.com/sub-two#Work
```

fragment 用作初始名称，不包含在保存的请求 URL 中。这些是格式示例，不是可用订阅。

## 完成与失败

普通节点在提交文本、选择文件或完成扫码后直接解析并保存，不再增加节点预览确认。成功后汇报导入数量；没有有效节点则报错且不写入。

导入后会进入统一测速队列，但不等待测速才能完成导入或从初始化进入首页。完整 Raw/自定义路由及路由数据依赖仍有自己的预览确认流程。

节点有效性以 libXray 为准。能导入某类节点，不代表另一客户端完整配置的全部字段都受支持。

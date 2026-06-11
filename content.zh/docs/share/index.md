---
title: 分享
weight: 2
---

OneXray 可将配置分享为二维码、文本链接或系统分享目标。

支持分享的对象：

| 类型 | 分享格式 |
| --- | --- |
| 节点 | 尽可能使用标准 Xray 分享链接；App 原生数据使用 OneXray URL Scheme。 |
| Xray Setting | 携带 Base64 配置数据的 OneXray URL Scheme。 |
| Raw Config | 携带 Base64 Raw JSON 的 OneXray URL Scheme。 |
| 订阅 | OneXray 订阅链接包装。 |
| GeoData | OneXray GeoData 链接。 |

# 通用协议

节点会尽可能通过 libXray 使用通用 Xray 分享链接格式。

订阅也可以直接分享为普通 `https://` URL。

# OneXray URL Scheme

OneXray URL Scheme 是 App 间导入、备份、恢复、CLI 导入和 AI 自动化使用的原生格式。

主要路径：

```text
onexray://onexray.com/config/add?type=setting&data=<base64>#<name>
onexray://onexray.com/config/add?type=outbound&data=<base64>#<name>
onexray://onexray.com/config/add?type=raw&data=<base64>#<name>
onexray://onexray.com/sub/add?url=<url>#<name>
onexray://onexray.com/dat/add?type=domain&url=<url>#<name>
onexray://onexray.com/dat/add?type=ip&url=<url>#<name>
```

当分享引用了自定义 GeoData 的 Xray Setting 时，OneXray 会在配置链接之前包含所需 GeoData 链接。

字段语义见 [开发]({{< relref path="../develop/index.md" lang="zh" >}})。

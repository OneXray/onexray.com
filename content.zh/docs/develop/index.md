---
title: 开发
weight: 4
---

# OneXray URL Scheme

OneXray 私有分享协议，支持一键打开 App 并导入配置。

## Xray 设置

```
onexray://onexray.com/config/add?core=xray&type=setting&data=yourBase64Data#name
```

`data` 为 XrayJson 经过 base64 编码之后的文本，建议您对其进行 `encodeURIComponent` 转义处理。

`name` 为配置名称，建议您对其进行 `encodeURIComponent` 转义处理。

注意：当您希望分享路由配置时，请同时分享关联的规则集数据。下面这种导入方式是支持的。

通过 OneXray 生成的分享链接将自动包含规则集数据。

```
onexray://onexray.com/dat/add?type=domain&url=yourDownloadLink#name
onexray://onexray.com/dat/add?type=ip&url=yourDownloadLink#name
onexray://onexray.com/config/add?core=xray&type=setting&data=yourBase64Data#name
```

## 节点

虽然 App 支持这种分享方式，但建议您仍然使用 [通用协议]({{< relref path="../share/index.md" lang="zh">}}) 以避免重复开发。

```
onexray://onexray.com/config/add?core=xray&type=outbound&data=yourBase64Data#name
```

`data` 为 XrayJson 经过 base64 编码之后的文本，建议您对其进行 `encodeURIComponent` 转义处理。

`name` 为节点名称，建议您对其进行 `encodeURIComponent` 转义处理。

## 完整配置

```
onexray://onexray.com/config/add?core=xray&type=full&data=yourBase64Data#name
```

`data` 为 XrayJson 经过 base64 编码之后的文本，建议您对其进行 `encodeURIComponent` 转义处理。

`name` 为配置名称，建议您对其进行 `encodeURIComponent` 转义处理。

## 原始配置

```
onexray://onexray.com/config/add?core=xray&type=raw&data=yourBase64Data#name
```

`data` 为 XrayJson 经过 base64 编码之后的文本，建议您对其进行 `encodeURIComponent` 转义处理。

`name` 为配置名称，建议您对其进行 `encodeURIComponent` 转义处理。

## 订阅

```
onexray://onexray.com/sub/add?url=yourDownloadLink#name
```

`url` 为订阅链接，建议您对其进行 `encodeURIComponent` 转义处理。

`name` 为订阅名称，建议您对其进行 `encodeURIComponent` 转义处理。

## 规则集

```
onexray://onexray.com/dat/add?type=domain&url=yourDownloadLink#name
```
`type` 为规则集类型，分别为 `domain` （域名）或 `ip` 。

`url` 为规则集下载链接，建议您对其进行 `encodeURIComponent` 转义处理。

`name` 为规则集名称，建议您对其进行 `encodeURIComponent` 转义处理。

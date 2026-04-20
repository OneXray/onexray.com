---
title: 原始配置
weight: 4
---

请注意：本页面功能需要您熟练掌握 Xray-core 。请在阅读完相关文档后使用。

[Xray-core 配置指南](https://xtls.github.io/config/)

建议您直接复制一份 App 生成的 “Xray 配置文件” 进行修改。

您按照如下操作路径找到“Xray 配置文件”：

设置 ➡️ 日志 ➡️ Xray 配置文件。

## 入站

您必须编写一个入站，该入站必须满足以下条件。

1. `listen` 必须为 `127.0.0.1`。其他地址将导致流量无法被正确处理。
2. `protocol` 必须为 `tun`。不支持其他协议。
3. `tag` 必须为 `tunIn`。App 将使用 `protocol` 和 `tag` 来判断是否存在符合条件的入站。
4. `sniffing` 建议开启，否则分流功能有可能无法正常工作。

注意：tunIn 入站不会被校验，请自行保证配置的正确性。

建议您直接使用下面的模版。

```json
{
    "inbounds": [
        {
            "listen": "127.0.0.1",
            "protocol": "tun",
            "tag": "tunIn",
            "sniffing": {
                "enabled": true,
                "destOverride": [
                    "http",
                    "tls",
                    "quic"
                ]
            }
        },
        {
            "listen": "127.0.0.1",
            "port": "11024",
            "protocol": "http",
            "tag": "pingIn"
        }
    ]
}
```

## 日志

`log` 中的 `access` 和 `error` 字段无法自定义。它们将在生成 Xray-core 配置文件时被重写为一个固定路径。

## 路由

下面两条路由规则用于保证 DNS 正常工作。请设置为路由规则的前两条。

```json
{
    "routing": {
        "rules": [
            {
                "domainMatcher": "hybrid",
                "inboundTag": [
                    "dnsQuery"
                ],
                "outboundTag": "proxy",
                "ruleTag": "dnsQuery"
            },
            {
                "domainMatcher": "hybrid",
                "inboundTag": [
                    "tunIn"
                ],
                "port": "53",
                "outboundTag": "dnsOut",
                "ruleTag": "dnsOut"
            },
            {
                "inboundTag": [
                    "tunIn"
                ],
                "port": "853",
                "outboundTag": "proxy",
                "ruleTag": "dnsDoT"
            },
            {
                "inboundTag": [
                    "pingIn"
                ],
                "outboundTag": "proxy",
                "ruleTag": "ping"
            }
        ]
    }
}
```

## 扩展字段

```json
{
    "name": "RawXrayConfig",
    "type": "raw"
}
```

`name` ，配置的名称，用于在列表中显示。

`type`，配置的类型，这里固定为 `raw`。注意，`type` 可省略，即使配置错误也没关系，没有任何影响。

---
title: 分享
weight: 2
---

OneXray 同时支持通用格式和专有的 `onexray://` URL Scheme。

| 类型 | 分享格式 |
| --- | --- |
| Outbound | libXray 支持的标准 Xray 分享文本/二维码，或 OneXray Link。 |
| 订阅 | HTTPS URL 或 OneXray Link。 |
| Full Config | OneXray Link 或 JSON 文本/文件。 |
| Raw Json | OneXray Link 或 JSON 文本/文件。 |
| Xray 配置 | OneXray Link 或 JSON 文本/文件。 |
| GeoData | OneXray Link 或备份。 |

# OneXray URL Scheme

OneXray Link 用于保留标准 Xray 链接无法表达的 OneXray 配置类型：

```text
onexray://onexray.com/config/add?type=outbound|profile|full|raw&data=<percent-encoded-base64-json>#Name
onexray://onexray.com/sub/add?url=<percent-encoded-https-url>[&age=x25519|hybrid]#Name
onexray://onexray.com/dat/add?type=domain|ip&url=<percent-encoded-https-url>#Name
```

只接受以上类型，不支持旧版 `type=setting`、备份归档或其他命令。

Age 加密订阅链接只携带密钥类型，不会传递分享方的密钥对。接收端会生成新的本地密钥对，在首次请求订阅时仅发送公钥，并且只在导入成功后保存密钥对。

分享的配置引用 OneXray 中已有的自定义 GeoData 时，匹配的 GeoData 链接会排在配置链接之前，以便先完成导入。

# 平台注册

Android、iOS 和已安装的 macOS App 会直接注册 `onexray://`。Windows EXE/winget 与 Linux DEB 包也会注册；Windows/Linux ZIP 包不会注册。

Mac App Store 版本与 OneXraySE 注册相同 Scheme。如果同时安装，macOS 可能选择其中任意一个打开链接。

# 导入判定

1. 去除首尾空白后以 `onexray://` 开头时，逐行解析有效的 OneXray Link。
2. 以 `https://` 开头时，按每行一个 HTTPS 订阅处理。
3. 否则由 libXray 将完整内容解析为 Outbound 分享文本。

订阅 URL fragment 用作名称，保存前会被删除。文本文件支持 `txt`、`json`、`yaml`、`yml`；二维码图片支持 `png`、`jpg`、`jpeg`。

通用 HTTPS/分享文本导入只创建订阅和 Outbound。Full Config、Raw Json、Xray 配置和 GeoData 需要对应的 OneXray Link 或专用导入流程。

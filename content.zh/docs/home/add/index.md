---
title: 添加与导入
weight: 1
---

Home 页添加菜单可用于创建本地 Outbound 节点、添加订阅、扫描二维码、选择文件、选择图片或读取剪贴板文本。

# 手动输入

手动输入会打开 Outbound 编辑器。需要直接在 OneXray 中创建本地节点时使用它。

Outbound 编辑器写出单个 Outbound 节点。运行时 OneXray 会把当前节点分配为保留的 `proxy` tag。

# 订阅链接

订阅输入会创建订阅行并立即下载。订阅名称会优先读取 URL fragment。空名称会变成 `anonymous`。

示例：

```text
https://example.com/sub.txt#MySubscription
```

订阅只导入 Outbound 节点。

# 支持的导入文本

OneXray 会按第一个可识别格式分类导入文本。

| 输入 | 行为 |
| --- | --- |
| `https://...` | 按订阅 URL 解析。 |
| Xray 分享链接 | 通过 libXray 解析并导入为 Outbound 节点。 |
| 多行分享文本 | libXray 支持时可一次导入多个 Outbound 节点。 |
| Clash.Meta YAML | 内置 core API 支持时通过 libXray 解析。 |
| Xray JSON | 内置 core API 支持时通过 libXray 解析，但只导入 Outbound 节点。 |

通用导入流程不会创建 Raw Json、Xray Setting 或 GeoData 记录。

## 扫描二维码

二维码扫描页面读取相机二维码，适合较短的节点链接和 HTTPS 订阅 URL。

长链接会降低二维码识别稳定性。长内容建议使用文本或文件导入。

## 选择图片

图片导入支持常见二维码图片文件，例如 `png`、`jpg`、`jpeg`。

## 选择文件

文件导入支持：

| 扩展名 | 处理方式 |
| --- | --- |
| `png`、`jpg`、`jpeg` | 从图片解码二维码。 |
| `txt`、`json`、`yaml` | 以文本读取并导入。 |

## 读取剪贴板

剪贴板导入会读取纯文本，并交给同一套导入流程。

# AI 和 CLI 导入

自动化工具应优先使用桌面端 CLI：

```shell
onexray import --file /path/to/import.txt
onexray import --text 'vless://...'
cat import.txt | onexray import --file -
```

CLI 会把导入请求发送到本地 Automation API，因此 App 必须保持运行。

CLI 导入支持上文列出的文本格式。`--file -` 从 stdin 读取文本。二维码图片从 App UI 导入。

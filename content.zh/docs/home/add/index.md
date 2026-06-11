---
title: 添加和导入
weight: 1
---

主页的添加菜单可用于创建本地节点、添加订阅、扫描二维码、选择文件、选择图片或读取剪贴板文本。

# 输入

## 手动输入

手动输入会打开出站节点编辑器，适合直接在 OneXray 中创建本地节点。

节点编辑器保存的是一个独立 outbound。运行时，OneXray 会把当前启动的节点写为保留 tag：`proxy`。

## 订阅链接

订阅输入会创建订阅并立即下载。订阅名称优先读取 URL fragment；名称为空时使用 `anonymous`。

示例：

```text
https://example.com/sub.txt#MySubscription
```

# 支持的导入文本

OneXray 会按第一个可识别格式处理导入文本。

| 输入 | 行为 |
| --- | --- |
| `onexray://onexray.com/...` | 按 OneXray URL Scheme 解析，可导入订阅、配置和规则集。 |
| `https://...` | 按订阅 URL 解析。 |
| Xray 分享链接 | 通过 libXray 解析并导入为节点。 |
| 订阅文本 | 可一次导入多条分享链接。 |
| Clash.Meta YAML | 在内置 core API 支持时由 libXray 解析。 |
| Xray JSON | 在内置 core API 支持时由 libXray 解析。 |

OneXray URL Scheme 的精确定义见 [开发]({{< relref path="../../develop/index.md" lang="zh" >}})。

## 扫描二维码

二维码扫描页读取相机中的二维码，适合短节点链接和 OneXray 链接。

较长链接会降低二维码识别稳定性。XHTTP 或完整配置这类长内容建议使用文本、文件或 URL Scheme。

## 选择图片

图片导入支持常见二维码图片文件，例如 `png`、`jpg`、`jpeg`。

## 选择文件

文件导入支持：

| 扩展名 | 处理方式 |
| --- | --- |
| `png`、`jpg`、`jpeg` | 从图片中解码二维码。 |
| `txt`、`json`、`yaml` | 按文本读取并导入。 |

## 读取剪贴板

剪贴板导入读取纯文本，并走同一套导入流程。

# AI 和 CLI 导入

自动化工具优先使用桌面端 CLI：

```shell
onexray import --file /path/to/import.txt
onexray import --text 'vless://...'
cat import.txt | onexray import --file -
```

CLI 会把导入请求发送给本地 Automation API，因此 App 必须处于运行状态。

CLI 导入支持上文列出的同一组文本格式：OneXray URL Scheme、HTTPS 订阅 URL、Xray 分享链接、多行分享文本、Clash.Meta YAML 和 Xray JSON。`--file -` 从 stdin 读取文本。二维码图片从 App UI 导入。

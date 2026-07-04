---
title: 添加与导入
weight: 1
---

Home 页添加菜单可用于创建本地节点、添加订阅、扫描二维码、选择文件、选择图片或读取剪贴板文本。

# 手动输入

手动输入会打开二级菜单。选择 `Outbound` 可创建结构化本地 outbound 节点；选择 `Full Config` 可创建带自定义 outbounds 和 routing 的结构化本地节点；选择 `Raw Json` 可创建本地完整 Xray JSON 配置。

Outbound 编辑器写出单个 Outbound 节点，Full Config 编辑器写出结构化节点级配置，Raw Json 编辑器写出完整 JSON 配置。三者都会显示在 Home 的 `Local` 分组下。

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

通用导入流程不会创建 Full Config、Raw Json、Xray 配置或 GeoData 记录。

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
| `txt`、`json`、`yaml`、`yml` | 以文本读取并导入。 |

## 读取剪贴板

剪贴板导入会读取纯文本，并交给同一套导入流程。

# 导入范围

导入属于 App UI 流程。请从添加菜单使用剪贴板、文件、图片或二维码扫描导入。

订阅和分享文本只会创建 Outbound 节点。Full Config 可通过 `手动输入 > Full Config` 创建；Raw Json 可通过 `手动输入 > Raw Json` 创建；Xray 配置和 GeoData 从各自页面管理。

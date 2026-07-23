---
title: 添加与导入
weight: 1
---

Home 的添加菜单可用于创建本地节点、添加订阅链接、扫描二维码、选择图片或文件，以及读取剪贴板。

# 手动输入

`手动输入` 子菜单包含：

| 项目 | 结果 |
| --- | --- |
| Outbound | 创建单个结构化本地出站节点。 |
| Full Config | 创建包含 outbounds、routing 和 DNS 的结构化本地节点。 |
| Raw Json | 创建高级本地 Xray JSON 配置。 |

三种类型都会显示在 Home 的 `Local` 分组。

# HTTPS 订阅链接

去除首尾空白后以 `https://` 开头的文本会被视为订阅输入。批量导入要求每行一个 HTTPS 链接。

```text
https://example.com/first#第一个
https://example.com/second#第二个
```

URL fragment 会被解码为初始订阅名称，并在保存 URL 前移除。名称为空时使用 `anonymous`，无效行会被跳过。下载接收超时为 60 秒。

若要导入分享链接，第一段非空白内容不能以 `https://` 开头。

# 其他文本格式

其他文本由 libXray 解析，并且只导入 Outbound：

- Xray 分享链接和多行分享文本
- libXray 支持的 Clash / Mihomo YAML
- libXray 支持的 Xray JSON

通用导入不会创建 Full Config、Raw Json、Xray 配置或 GeoData。解析出的 Outbound 不执行手动保存时使用的 Xray 配置测试。

# 二维码、图片、文件和剪贴板

| 入口 | 支持内容 |
| --- | --- |
| 扫描二维码 | 相机读取的二维码内容。 |
| 选择图片 | `png`、`jpg`、`jpeg`。 |
| 选择文件 | `txt`、`json`、`yaml`、`yml` 或上述图片格式。 |
| 读取剪贴板 | 使用相同判定顺序处理的纯文本。 |

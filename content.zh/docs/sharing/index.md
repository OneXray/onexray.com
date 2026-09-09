---
title: "导入与分享格式"
description: "区分标准分享链接、OneXray URL、完整 JSON 与 GeoData 依赖，避免误导入或分享 age 私钥。"
weight: 70
lastmod: 2026-09-09
---

## 选择格式

| 对象 | 格式 |
| --- | --- |
| 节点 | 支持的协议分享链接、节点 JSON、OneXray 链接 |
| 订阅 | HTTPS URL 或 OneXray 链接 |
| 自定义路由 | 完整路由 JSON 或 OneXray 链接 |
| Raw JSON | 完整配置 JSON 或 OneXray 链接 |
| 自定义 GeoData | 文件名、类型与 HTTPS 来源链接 |

协议分享链接无法表达全部 Xray 出站字段。需要保留这些字段时，使用完整节点 JSON 或 OneXray 格式。

普通服务器导入只提取节点；完整配置使用自定义路由或 Raw JSON 流程。不提供 App 备份归档导入。

## OneXray 链接

```text
onexray://onexray.com/config/add?type=outbound|raw|custom&data=<percent-encoded-base64-json>#Name
onexray://onexray.com/sub/add?url=<percent-encoded-https-url>&age=x25519|hybrid#Name
onexray://onexray.com/dat/add?type=domain|ip&url=<percent-encoded-https-url>#Name
```

有多个备选值时只选其中一个；明文订阅省略 age。fragment 用作显示名称。不支持退休的 profile/full/setting 配置类型。

age 链接只描述算法，接收设备生成新密钥，不共享现有公钥或私钥。

## 路由依赖

完整分享配置可以声明自定义数据：

```json
{
  "geodata": {
    "assets": [
      {"file": "other.dat", "url": "https://example.com/other.dat"}
    ]
  }
}
```

这里只是依赖片段，不是可直接运行的完整配置；使用时替换为真实来源。

省略默认 geoip.dat、geosite.dat。自定义路由只导出空接入槽，不导出 direct/block 出站定义。导入会校验依赖、拒绝重名，并在存储前删除只供导入的 geodata 字段。

## 打开链接

已安装的移动端和 macOS App、Windows EXE/MSIX、Linux DEB 注册 onexray://。Windows/Linux ZIP 不自动注册，可改用剪贴板或文件导入。Mac 同时安装多个版本时由系统选择处理程序。

分享可能暴露凭据和 URL 令牌，请先检查。完整配置与依赖保留确认流程，普通节点导入则没有第二次预览。

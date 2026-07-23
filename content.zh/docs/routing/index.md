---
title: 路由
weight: 6
---

# Home 路由模式

Home 选择器决定最终流量策略：

| 模式 | 行为 |
| --- | --- |
| 规则 | 使用当前 Xray 配置或 Full Config 的 routing rules。 |
| 全局 | 所有流量使用 `proxy`；移除运行时 DNS/routing，只保留代理依赖链。 |
| 直连 | 所有流量使用 `direct`；不使用选中节点。 |

连接中切换模式会重启 Core。

# 增强路由模板

高级模板维护在 [OneXray/Routing](https://github.com/OneXray/Routing)。

| 地区 | 模板 | 自定义 GeoData |
| --- | --- | --- |
| 中国 | [cn.json](https://github.com/OneXray/Routing/raw/refs/heads/main/cn.json) | `EnhancedGeoSite`、`EnhancedGeoIP` |
| 伊朗 | [ir.json](https://github.com/OneXray/Routing/raw/refs/heads/main/ir.json) | `IranGeoSite` |
| 俄罗斯 | [ru.json](https://github.com/OneXray/Routing/raw/refs/heads/main/ru.json) | `RussiaGeoSite`、`RussiaGeoIP` |

1. 在 `Core > GeoData` 添加模板所需文件。
2. 从 `Core > 导入增强路由` 打开模板仓库。
3. 创建或编辑 Xray 配置，通过 Raw Edit 粘贴模板。
4. 保存并选中该配置。

模板只提供配置级 DNS 与 routing；节点和所有运行时字段仍由 OneXray 写入。

---
title: Routing
weight: 6
---

OneXray 路由模板以 Xray 配置 JSON 文件维护在 [OneXray/Routing](https://github.com/OneXray/Routing) 仓库中。

| 区域 | 模板 | 自定义 GeoData 依赖 |
| --- | --- | --- |
| 中国大陆 | [cn.json](https://github.com/OneXray/Routing/raw/refs/heads/main/cn.json) | `EnhancedGeoSite`、`EnhancedGeoIP` |
| 伊朗 | [ir.json](https://github.com/OneXray/Routing/raw/refs/heads/main/ir.json) | `IranGeoSite` |
| 俄罗斯 | [ru.json](https://github.com/OneXray/Routing/raw/refs/heads/main/ru.json) | `RussiaGeoSite`、`RussiaGeoIP` |

# 使用方式

1. 在 OneXray 中打开 `Core > GeoData`。
2. 按上表名称添加所需的自定义 GeoData。
3. 打开对应 JSON 模板链接，复制或下载 JSON。
4. 在 OneXray 中打开 `Core > Xray 配置 > Add > Raw Edit`。
5. 粘贴模板 JSON，保存后选择该 Xray 配置。

模板只包含 `name`、`dns` 和 `routing`。它们不包含 `inbounds`、`outbounds`、`log`、`policy`、`stats`、`metrics` 等 App 运行时字段。当前选中的节点仍由 OneXray 在 VPN 启动时注入为运行时 `proxy` 出站。

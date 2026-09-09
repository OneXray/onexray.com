---
title: "路由数据"
description: "成组更新默认 GeoSite/GeoIP，通过明确文件名与 HTTPS 地址管理自定义 GeoData。"
weight: 50
lastmod: 2026-09-09
---

入口：高级 → Xray → 路由数据。GeoData 提供域名和 IP 分类，供路由匹配及编辑器补全使用。

## 默认路由数据

默认区域包含：

- geosite.dat：[domain-list-community](https://github.com/v2fly/domain-list-community) 的域名分类。
- geoip.dat：[geoip](https://github.com/v2fly/geoip) 的 IP 分类。

标题行的“更新”会**同时更新两个文件**，不能分别更新，也不能删除。

## 自定义路由数据

添加时填写名称／文件名、域名或 IP 类型，以及 HTTPS 下载地址。名称决定规则引用的文件，例如 ext:other.dat:cn。

每个来源可查看详情、更新和删除。不提供本地文件导入；App 在下载校验成功后才发布数据。

文件统一保存在一个平铺目录，不支持嵌套子目录或冲突文件名。使用期间不要手动移动文件。

## 分类与路由

域名／IP 输入根据已安装的数据提供补全；直连地区同样依赖实际默认分类，只有国家名称不代表存在对应的 GeoSite 或 GeoIP 项。

删除自定义数据可能导致引用它的路由无效，应先删除或修改这些引用。

分享的 Custom/Raw 可用文件名与 URL 声明依赖。导入遇到重名会拒绝，不覆盖已有来源。[分享格式]({{< relref "/docs/sharing" >}})。

更新的数据供后续启动使用，不热替换正在运行的内核规则。周期设置见[数据更新]({{< relref "/docs/advanced/data-updates" >}})。

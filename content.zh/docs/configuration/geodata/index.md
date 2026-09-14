---
title: "Geodata 依赖"
description: "使用真实 DAT 分类和明确的文件依赖，不凭地区或服务名称猜测规则。"
weight: 50
ai_order: 80
lastmod: 2026-09-14
---

Geosite 匹配域名，GeoIP 匹配 IP 网段，两者不是可互换的国家数据库。

## 默认文件

geosite.dat 来自 [domain-list-community](https://github.com/v2fly/domain-list-community/releases/latest/download/dlc.dat)，geoip.dat 来自 [v2fly/geoip](https://github.com/v2fly/geoip/releases/latest/download/geoip.dat)。入口：高级 → Xray → 路由数据。默认更新必须成对进行。

本指南智能路由等价示例使用的分类：

| 目标 | 域名条件 | IP 条件 |
| --- | --- | --- |
| 私有/本地 | geosite:PRIVATE | geoip:PRIVATE |
| 中国大陆 | geosite:CN | geoip:CN |
| Apple | geosite:APPLE | 示例不要求对应分类 |
| Microsoft | geosite:MICROSOFT、geosite:BING | 示例不要求对应分类 |
| GitHub 例外 | geosite:GITHUB | 示例不要求对应分类 |
| 广告 | geosite:CATEGORY-ADS-ALL | 示例不要求对应分类 |

不要生成 geosite:WINDOWS 或 geosite:OFFICE；示例实际使用 Microsoft 和 Bing 分类。

地区不能按“国家代码就是同名 Geosite”推断。例如俄罗斯域名映射为 CATEGORY-RU，而 IP 使用 RU。[地区映射快照](/examples/regions.json)记录 App 的映射，不保证未来或每个已安装 DAT 都有相同分类。许多地区只有 IP 条件。

最终以设备安装文件的分类列表/自动补全为准。不知道文件名或分类时询问用户，不根据名字猜测，也不编造下载 URL。

## 自定义依赖

域名或 IP 规则使用 ext:filename.dat:category，DAT 类型必须对应。文件只平铺，使用安全的 .dat 文件名，不含父目录或子目录。

完整自定义路由文件可附带以下**片段**；它不是可独立导入的配置：

```json
{
  "geodata": {
    "assets": [
      {
        "file": "company-domains.dat",
        "url": "https://rules.example.com/company-domains.dat"
      }
    ]
  }
}
```

该 URL 是占位符，必须取得真实 HTTPS 文件和分类。每项仅有 file、url。省略默认 geosite.dat、geoip.dat，不把它们重新声明成自定义文件。

自定义路由导入会下载声明的依赖，每个声明都必须被规则引用。文件名冲突时拒绝导入，不覆盖现有文件。存储前移除导入专用 geodata，分享时依据已安装的自定义数据重建依赖。

Raw 不同：普通 Raw JSON 文件不会根据根部 geodata.assets 下载依赖。需先在“路由数据”安装自定义文件，或使用 App 的 Raw 分享流程，将独立 /dat/add App Link 与 Raw 配置链接一同导入。Raw 导出保留原文，运行时删除根部 geodata。不能通过添加这个字段承诺自动下载 Raw 依赖。参见[分享格式]({{< relref "/docs/sharing" >}})。

## 更新与失败

自动 Geodata 更新仅在 VPN 已连接时执行；断开时的启动、回前台和定时检查不下载。失败保留旧文件，不改变 VPN 状态、不触发重连。

手动更新和导入依赖下载独立。校验/启动需要的文件必须已经存在，缺失时明确报错，不通过尚未启动的 VPN 下载兜底。不要承诺上游分类在未来版本中永远不变。

[管理路由数据]({{< relref "/docs/advanced/geodata" >}}) · [排错]({{< relref "/docs/troubleshooting" >}})

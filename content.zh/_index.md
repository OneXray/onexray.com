---
title: OneXray
layout: hextra-home
description: "OneXray 是支持 iOS、macOS、Android、Windows 和 Linux 的开源 Xray-core 客户端。导入自己的服务器，使用智能路由、自定义规则或完整 Raw JSON。"
images:
  - /images/screenshots/connect-macos.png
lastmod: 2026-09-11
---

{{< hextra/hero-container
image="/images/screenshots/connect-macos.png"
imageTitle="OneXray · macOS · Connect"
imageWidth="2560"
imageHeight="1600"
imageClass="product-hero-image"
imageStyle="width: min(100%, 44rem);"
style="align-items: center; padding: 4rem 0 2rem;"
>}}
{{< hextra/hero-badge link="https://github.com/OneXray/OneXray" >}}
<div class="hx:w-2 hx:h-2 hx:rounded-full hx:bg-primary-400"></div>
<span>免费开源 · 无广告 · 无分析</span>
{{< /hextra/hero-badge >}}

<div class="hx:mt-6 hx:mb-6">
{{< hextra/hero-headline >}}你的服务器，<br />你的规则。{{< /hextra/hero-headline >}}
</div>

<div class="hx:mb-8">
{{< hextra/hero-subtitle >}}从智能路由轻松开始。选择自己的服务器，编写自定义规则，或使用完整 Raw JSON，在手机、平板和桌面延续相同的体验。{{< /hextra/hero-subtitle >}}
</div>

<div class="product-actions">
{{< hextra/hero-button text="下载 OneXray" link="#download" >}}
{{< hextra/hero-button text="首次连接" link="docs/getting-started/" >}}
</div>
{{< /hextra/hero-container >}}

<div class="product-section-gap"></div>

{{< hextra/hero-section heading="h2" >}}轻松开始，也能深入配置。{{< /hextra/hero-section >}}
<div class="hx:mb-8">
{{< hextra/hero-subtitle >}}连接前不必先理解另一套配置模板。选择服务器，再决定哪些流量经过它们。{{< /hextra/hero-subtitle >}}
</div>

{{< hextra/feature-grid cols="3" >}}
{{< hextra/feature-card title="智能路由" subtitle="局域网、直连地区和常用服务按需直连；可选广告拦截，支持 1–3 个接入节点和链式连接的最终出口。" icon="globe" link="docs/connect/smart-routing/" >}}
{{< hextra/feature-card title="自定义规则" subtitle="通过域名、IP、端口、网络编写规则，使用 GeoData 补全，分享不绑定具体节点的路由。" icon="adjustments" link="docs/connect/custom-routing/" >}}
{{< hextra/feature-card title="完整 Raw JSON" subtitle="专家模式提供完整配置编辑器，平台隧道和相关运行设置仍由 OneXray 统一管理。" icon="code" link="docs/connect/raw-json/" >}}
{{< hextra/feature-card title="清晰的服务器管理" subtitle="按订阅或位置浏览，比较延迟与协议，编辑、分享和删除；HTTPS 订阅支持可选 age 加密。" icon="collection" link="docs/servers/" >}}
{{< hextra/feature-card title="适合当前平台" subtitle="Apple Wi-Fi 规则、Android 按应用分流、Windows/Linux 网卡选择，手机与桌面共享清晰导航。" icon="desktop-computer" link="docs/advanced/" >}}
{{< hextra/feature-card title="实用的本地工具" subtitle="查看本次连接流量、检测节点、更新路由数据、检查实际生成的配置及受支持版本的本地日志。" icon="document-search" link="docs/advanced/" >}}
{{< /hextra/feature-grid >}}

<div class="product-section-gap"></div>

{{< hextra/hero-section heading="h2" >}}一套体验，适配不同设备。{{< /hextra/hero-section >}}
<div class="hx:mb-8">
{{< hextra/hero-subtitle >}}真实运行界面：连接、服务器、智能路由与自定义路由。{{< /hextra/hero-subtitle >}}
</div>

{{< cards cols="2" >}}
{{< card image="/images/screenshots/connect-ios.png" alt="iPhone · 连接" title="iPhone · 连接" subtitle="选择服务器，查看本次连接的速率与流量。" imageStyle="height: 28rem; object-fit: contain; padding: 1rem;" >}}
{{< card image="/images/screenshots/servers-android.png" alt="Android · 服务器" title="Android · 服务器" subtitle="管理订阅和节点位置，查看延迟与协议。" imageStyle="height: 28rem; object-fit: contain; padding: 1rem;" >}}
{{< card image="/images/screenshots/smart-routing-macos.png" alt="Mac · 智能路由" title="Mac · 智能路由" subtitle="通过清晰的直连选项配置，并预览实际规则。" imageStyle="aspect-ratio: 16 / 10; object-fit: contain;" >}}
{{< card image="/images/screenshots/custom-routing-windows.png" alt="Windows · 自定义路由" title="Windows · 自定义路由" subtitle="管理有序规则、接入数量和独立导入分享。" imageStyle="aspect-ratio: 16 / 10; object-fit: contain;" >}}
{{< /cards >}}

<div class="product-section-gap product-section-anchor" id="download"></div>

{{< hextra/hero-section heading="h2" >}}选择你的设备。{{< /hextra/hero-section >}}
<div class="hx:mb-8">
{{< hextra/hero-subtitle >}}OneXray 仅提供客户端，不提供 VPN 服务、服务器或订阅。请从可信来源准备兼容配置。{{< /hextra/hero-subtitle >}}
</div>

{{< cards cols="2" >}}
{{< card link="https://apps.apple.com/us/app/onexray/id6745748773" title="iPhone、iPad 和 Mac" subtitle="从 App Store 下载，独立安装方式见文档。" icon="download" >}}
{{< card link="https://play.google.com/store/apps/details?id=net.yuandev.onexray" title="Android" subtitle="通过 Google Play 安装到手机和平板。" icon="download" >}}
{{< card link="https://apps.microsoft.com/detail/9NJ0MVHW215D" title="Windows" subtitle="Microsoft Store。winget 和 ZIP 安装方式请参阅指南。" icon="download" >}}
{{< card link="docs/install/" title="Linux 与独立安装包" subtitle="查看 DEB、ZIP、APK、IPA 和 OneXraySE 安装说明。" icon="download" >}}
{{< /cards >}}

<div class="product-section-gap"></div>

{{< hextra/hero-section heading="h2" >}}无账号，无广告，无分析。{{< /hextra/hero-section >}}
<div class="hx:mb-8">
{{< hextra/hero-subtitle >}}配置保留在设备上，由你决定是否分享。服务器、DNS、订阅更新和连接测试会发出相应功能所需的网络请求。{{< /hextra/hero-subtitle >}}
</div>

[阅读隐私政策](docs/privacy/)

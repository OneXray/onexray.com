---
title: OneXray
layout: hextra-home
description: 注重隐私的跨平台 Xray-core 客户端，用于管理您自己的节点、订阅和配置，支持 iOS、macOS、Android、Windows 和 Linux。
images:
- /images/screenshots/desktop-windows.png
---

{{< hextra/hero-container
image="/images/screenshots/mobile-overview.png"
imageTitle="Android 手机上的 OneXray"
imageWidth="676"
imageHeight="310"
imageClass="product-hero-image"
imageStyle="width: min(100%, 44rem);"
style="align-items: center; padding: 4rem 0 2rem;"
>}}
{{< hextra/hero-badge link="https://github.com/OneXray/OneXray" >}}
  <div class="hx:w-2 hx:h-2 hx:rounded-full hx:bg-primary-400"></div>
  <span>免费开源 · 无广告 · 无追踪</span>
{{< /hextra/hero-badge >}}

<div class="hx:mt-6 hx:mb-6">
{{< hextra/hero-headline >}}
  你的网络，<br />你的规则。
{{< /hextra/hero-headline >}}
</div>

<div class="hx:mb-8">
{{< hextra/hero-subtitle >}}
  一款注重隐私的跨平台 Xray-core 客户端。添加您自己的节点和订阅，然后连接并控制流量的路由方式。
{{< /hextra/hero-subtitle >}}
</div>

{{< hextra/hero-button text="下载 OneXray" link="#download" >}}
{{< hextra/hero-button text="查看文档" link="docs/" style="margin-left: .5rem;" >}}
{{< /hextra/hero-container >}}

<div class="product-section-gap"></div>

{{< hextra/hero-section heading="h2" >}}
隐私优先，自由配置。
{{< /hextra/hero-section >}}

<div class="hx:mb-8">
{{< hextra/hero-subtitle >}}
OneXray 仅提供客户端，不出售 VPN 服务，也不提供代理服务器。每个服务器、订阅源和路由规则均由您选择。
{{< /hextra/hero-subtitle >}}
</div>

{{< hextra/feature-grid cols="3" >}}
{{< hextra/feature-card
  title="隐私设计"
  subtitle="无需账号，不含广告、分析、追踪、遥测或崩溃上报。配置保留在您的设备上。"
  icon="finger-print"
  link="docs/privacy/"
>}}
{{< hextra/feature-card
  title="按需配置"
  subtitle="可从简易配置开始，组合可复用的 Xray 配置和完整配置，也可用 Raw JSON 编辑高级字段。"
  icon="collection"
  link="docs/home/outbound/xrayProfile/"
>}}
{{< hextra/feature-card
  title="全平台一致"
  subtitle="在 iPhone、iPad、Mac、Android、Windows 和 Linux 上使用一致而清晰的操作方式。"
  icon="globe"
  link="docs/install/"
>}}
{{< /hextra/feature-grid >}}

<div class="product-section-gap"></div>

{{< hextra/hero-section heading="h2" >}}
一套界面，适配每块屏幕。
{{< /hextra/hero-section >}}

<div class="hx:mb-8">
{{< hextra/hero-subtitle >}}
无需直接编辑原始 JSON，即可连接节点、管理订阅、构建结构化路由并检查最终配置。
{{< /hextra/hero-subtitle >}}
</div>

{{< cards cols="2" >}}
{{< card
  image="/images/screenshots/desktop-macos.png"
  alt="macOS 上的 OneXray 产品界面"
  title="为 macOS 而生"
  subtitle="响应式桌面界面集中管理连接、配置、路由和订阅。"
  imageStyle="aspect-ratio: 16 / 10; object-fit: cover; object-position: top;"
>}}
{{< card
  image="/images/screenshots/desktop-windows.png"
  alt="Windows 上的 OneXray 产品界面"
  title="原生 Windows 体验"
  subtitle="提供桌面布局、系统托盘控制、TUN 支持以及原生 x64 和 Arm64 安装包。"
  imageStyle="aspect-ratio: 16 / 10; object-fit: cover; object-position: top;"
>}}
{{< /cards >}}

<div class="product-section-gap product-section-anchor" id="download"></div>

{{< hextra/hero-section heading="h2" >}}
下载 OneXray
{{< /hextra/hero-section >}}

<div class="hx:mb-8">
{{< hextra/hero-subtitle >}}
可选择官方商店，或按安装文档下载独立安装包。使用前需要准备兼容的服务器配置或订阅。
{{< /hextra/hero-subtitle >}}
</div>

{{< cards cols="2" >}}
{{< card link="https://apps.apple.com/us/app/onexray/id6745748773" title="iPhone、iPad 和 Mac" subtitle="从 App Store 下载。" icon="download" >}}
{{< card link="https://play.google.com/store/apps/details?id=net.yuandev.onexray" title="Android" subtitle="从 Google Play 下载。" icon="download" >}}
{{< card link="docs/install/" title="Windows" subtitle="使用 winget 安装，或下载原生 x64 和 Arm64 安装包。" icon="download" >}}
{{< card link="docs/install/" title="Linux 与独立安装包" subtitle="从 GitHub Releases 下载 DEB、ZIP、APK、IPA 和 macOS 安装包。" icon="terminal" >}}
{{< /cards >}}

---
title: OneXray
layout: hextra-home
description: Private, cross-platform Xray-core client for your own nodes, subscriptions, and configurations. Available for iOS, macOS, Android, Windows, and Linux.
images:
- /images/screenshots/desktop-windows.png
---

{{< hextra/hero-container
image="/images/screenshots/mobile-overview.png"
imageTitle="OneXray on Android phones"
imageWidth="676"
imageHeight="310"
imageClass="product-hero-image"
imageStyle="width: min(100%, 44rem);"
style="align-items: center; padding: 4rem 0 2rem;"
>}}
{{< hextra/hero-badge link="https://github.com/OneXray/OneXray" >}}
  <div class="hx:w-2 hx:h-2 hx:rounded-full hx:bg-primary-400"></div>
  <span>Free and open source · No ads · No tracking</span>
{{< /hextra/hero-badge >}}

<div class="hx:mt-6 hx:mb-6">
{{< hextra/hero-headline >}}
  Your network.<br />Your rules.
{{< /hextra/hero-headline >}}
</div>

<div class="hx:mb-8">
{{< hextra/hero-subtitle >}}
  A private, cross-platform client for Xray-core. Bring your own nodes and subscriptions, then connect and control how your traffic is routed.
{{< /hextra/hero-subtitle >}}
</div>

{{< hextra/hero-button text="Download OneXray" link="#download" >}}
{{< hextra/hero-button text="Read the documentation" link="docs/" style="margin-left: .5rem;" >}}
{{< /hextra/hero-container >}}

<div class="product-section-gap"></div>

{{< hextra/hero-section heading="h2" >}}
Private by design. Flexible by choice.
{{< /hextra/hero-section >}}

<div class="hx:mb-8">
{{< hextra/hero-subtitle >}}
OneXray is a client only. It does not sell VPN access or provide proxy servers—you choose every server, subscription, and route.
{{< /hextra/hero-subtitle >}}
</div>

{{< hextra/feature-grid cols="3" >}}
{{< hextra/feature-card
  title="Privacy by design"
  subtitle="No account, advertising, analytics, tracking, telemetry, or crash reporting. Your configurations stay on your device."
  icon="finger-print"
  link="docs/privacy/"
>}}
{{< hextra/feature-card
  title="Configure your way"
  subtitle="Start with Simple Profile, compose reusable Xray Profiles and Full Configs, or use Raw JSON for advanced fields."
  icon="collection"
  link="docs/home/outbound/xrayProfile/"
>}}
{{< hextra/feature-card
  title="Runs everywhere"
  subtitle="Use the same clear workflow across iPhone, iPad, Mac, Android, Windows, and Linux."
  icon="globe"
  link="docs/install/"
>}}
{{< /hextra/feature-grid >}}

<div class="product-section-gap"></div>

{{< hextra/hero-section heading="h2" >}}
One interface, every screen.
{{< /hextra/hero-section >}}

<div class="hx:mb-8">
{{< hextra/hero-subtitle >}}
Connect, manage subscriptions, build structured routes, and inspect your configuration without editing raw JSON.
{{< /hextra/hero-subtitle >}}
</div>

{{< cards cols="2" >}}
{{< card
  image="/images/screenshots/desktop-macos.png"
  alt="OneXray product overview on macOS"
  title="Made for macOS"
  subtitle="A responsive desktop interface for connections, profiles, routes, and subscriptions."
  imageStyle="aspect-ratio: 16 / 10; object-fit: cover; object-position: top;"
>}}
{{< card
  image="/images/screenshots/desktop-windows.png"
  alt="OneXray product overview on Windows"
  title="Native Windows experience"
  subtitle="Desktop layouts, system tray controls, TUN support, and native x64 and Arm64 packages."
  imageStyle="aspect-ratio: 16 / 10; object-fit: cover; object-position: top;"
>}}
{{< /cards >}}

<div class="product-section-gap product-section-anchor" id="download"></div>

{{< hextra/hero-section heading="h2" >}}
Download OneXray
{{< /hextra/hero-section >}}

<div class="hx:mb-8">
{{< hextra/hero-subtitle >}}
Choose an official store or follow the installation guide for direct packages. A compatible server configuration or subscription is required.
{{< /hextra/hero-subtitle >}}
</div>

{{< cards cols="2" >}}
{{< card link="https://apps.apple.com/us/app/onexray/id6745748773" title="iPhone, iPad, and Mac" subtitle="Download from the App Store." icon="download" >}}
{{< card link="https://play.google.com/store/apps/details?id=net.yuandev.onexray" title="Android" subtitle="Download from Google Play." icon="download" >}}
{{< card link="docs/install/" title="Windows" subtitle="Install with winget or download native x64 and Arm64 packages." icon="download" >}}
{{< card link="docs/install/" title="Linux and direct downloads" subtitle="Download DEB, ZIP, APK, IPA, and macOS packages from GitHub Releases." icon="terminal" >}}
{{< /cards >}}

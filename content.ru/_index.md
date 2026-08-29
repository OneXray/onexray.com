---
title: OneXray
layout: hextra-home
description: Приватный кроссплатформенный клиент Xray-core для ваших узлов, подписок и конфигураций. Доступен для iOS, macOS, Android, Windows и Linux.
images:
- /images/screenshots/desktop-windows.png
---

{{< hextra/hero-container
image="/images/screenshots/mobile-overview.png"
imageTitle="OneXray на телефонах Android"
imageWidth="676"
imageHeight="310"
imageClass="product-hero-image"
imageStyle="width: min(100%, 44rem);"
style="align-items: center; padding: 4rem 0 2rem;"
>}}
{{< hextra/hero-badge link="https://github.com/OneXray/OneXray" >}}
  <div class="hx:w-2 hx:h-2 hx:rounded-full hx:bg-primary-400"></div>
  <span>Бесплатно и с открытым кодом · Без рекламы и отслеживания</span>
{{< /hextra/hero-badge >}}

<div class="hx:mt-6 hx:mb-6">
{{< hextra/hero-headline >}}
  Ваша сеть.<br />Ваши правила.
{{< /hextra/hero-headline >}}
</div>

<div class="hx:mb-8">
{{< hextra/hero-subtitle >}}
  Приватный кроссплатформенный клиент Xray-core. Добавьте собственные узлы и подписки, подключайтесь и управляйте маршрутизацией трафика.
{{< /hextra/hero-subtitle >}}
</div>

{{< hextra/hero-button text="Скачать OneXray" link="#download" >}}
{{< hextra/hero-button text="Документация" link="docs/" style="margin-left: .5rem;" >}}
{{< /hextra/hero-container >}}

<div class="product-section-gap"></div>

{{< hextra/hero-section heading="h2" >}}
Конфиденциальность по умолчанию. Гибкость по вашему выбору.
{{< /hextra/hero-section >}}

<div class="hx:mb-8">
{{< hextra/hero-subtitle >}}
OneXray — только клиент. Он не продаёт VPN-доступ и не предоставляет прокси-серверы: каждый сервер, источник подписки и маршрут выбираете вы.
{{< /hextra/hero-subtitle >}}
</div>

{{< hextra/feature-grid cols="3" >}}
{{< hextra/feature-card
  title="Конфиденциальность"
  subtitle="Без учётной записи, рекламы, аналитики, отслеживания, телеметрии и отчётов о сбоях. Конфигурации остаются на устройстве."
  icon="finger-print"
  link="docs/privacy/"
>}}
{{< hextra/feature-card
  title="Гибкая настройка"
  subtitle="Начните с Simple Profile, создавайте Xray Profiles и Full Configs или используйте Raw JSON для расширенных параметров."
  icon="collection"
  link="docs/home/outbound/xrayProfile/"
>}}
{{< hextra/feature-card
  title="Все основные платформы"
  subtitle="Единый понятный процесс на iPhone, iPad, Mac, Android, Windows и Linux."
  icon="globe"
  link="docs/install/"
>}}
{{< /hextra/feature-grid >}}

<div class="product-section-gap"></div>

{{< hextra/hero-section heading="h2" >}}
Один интерфейс на любом экране.
{{< /hextra/hero-section >}}

<div class="hx:mb-8">
{{< hextra/hero-subtitle >}}
Подключайтесь, управляйте подписками, создавайте структурированные маршруты и проверяйте конфигурацию без ручного редактирования JSON.
{{< /hextra/hero-subtitle >}}
</div>

{{< cards cols="2" >}}
{{< card
  image="/images/screenshots/desktop-macos.png"
  alt="Интерфейс OneXray в macOS"
  title="Создано для macOS"
  subtitle="Адаптивный интерфейс для подключений, профилей, маршрутов и подписок."
  imageStyle="aspect-ratio: 16 / 10; object-fit: cover; object-position: top;"
>}}
{{< card
  image="/images/screenshots/desktop-windows.png"
  alt="Интерфейс OneXray в Windows"
  title="Нативная работа в Windows"
  subtitle="Компоновка для рабочего стола, управление из системного трея, TUN и пакеты для x64 и Arm64."
  imageStyle="aspect-ratio: 16 / 10; object-fit: cover; object-position: top;"
>}}
{{< /cards >}}

<div class="product-section-gap product-section-anchor" id="download"></div>

{{< hextra/hero-section heading="h2" >}}
Скачать OneXray
{{< /hextra/hero-section >}}

<div class="hx:mb-8">
{{< hextra/hero-subtitle >}}
Выберите официальный магазин или установите отдельный пакет по инструкции. Требуется совместимая конфигурация сервера или подписка.
{{< /hextra/hero-subtitle >}}
</div>

{{< cards cols="2" >}}
{{< card link="https://apps.apple.com/us/app/onexray/id6745748773" title="iPhone, iPad и Mac" subtitle="Загрузить из App Store." icon="download" >}}
{{< card link="https://play.google.com/store/apps/details?id=net.yuandev.onexray" title="Android" subtitle="Загрузить из Google Play." icon="download" >}}
{{< card link="docs/install/" title="Windows" subtitle="Установите через winget или скачайте нативные пакеты x64 и Arm64." icon="download" >}}
{{< card link="docs/install/" title="Linux и прямые загрузки" subtitle="Пакеты DEB, ZIP, APK, IPA и macOS доступны в GitHub Releases." icon="terminal" >}}
{{< /cards >}}

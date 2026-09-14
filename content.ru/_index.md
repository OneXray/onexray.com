---
title: OneXray
layout: hextra-home
description: "OneXray — открытый клиент Xray-core для iOS, macOS, Android, Windows и Linux. Ваши серверы, умная маршрутизация, собственные правила и Raw JSON."
images:
  - /images/screenshots/connect-macos.png
lastmod: 2026-09-14
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
<span>Открытый код · Без рекламы · Без аналитики</span>
{{< /hextra/hero-badge >}}

<div class="hx:mt-6 hx:mb-6">
{{< hextra/hero-headline >}}Ваши серверы.<br />Ваши правила.{{< /hextra/hero-headline >}}
</div>

<div class="hx:mb-8">
{{< hextra/hero-subtitle >}}Начните с умной маршрутизации. Выбирайте серверы, создавайте правила или используйте полный Raw JSON — на телефоне, планшете и компьютере.{{< /hextra/hero-subtitle >}}
</div>

<div class="product-actions">
{{< hextra/hero-button text="Скачать OneXray" link="#download" >}}
{{< hextra/hero-button text="Настройка с ИИ" link="docs/ai/" >}}
</div>
{{< /hextra/hero-container >}}

## Опишите задачу. Импортируйте результат.

Для обычного подключения достаточно Smart Routing. Для своей схемы передайте выбранному помощнику полное руководство: он сможет подготовить JSON сервера, собственный маршрут или Raw и объяснить отдельные настройки VPN Tunnel.

[Запрос для ИИ](docs/ai/) · [Полное руководство](llms-full.txt) · [Рецепты](docs/recipes/)

Помощник работает вне OneXray. Сайт не получает конфигурации; передавайте секреты только доверенному сервису.


[Новое в 26.9.2: локальный DNS, HWID подписки и системные быстрые действия →](docs/upgrading/)

<div class="product-section-gap"></div>

{{< hextra/hero-section heading="h2" >}}Просто начать. Можно настроить глубже.{{< /hextra/hero-section >}}
<div class="hx:mb-8">
{{< hextra/hero-subtitle >}}Не нужно разбираться в отдельной системе профилей перед подключением. Выберите серверы и решите, какой трафик пойдёт через них.{{< /hextra/hero-subtitle >}}
</div>

{{< hextra/feature-grid cols="3" >}}
{{< hextra/feature-card title="Умная маршрутизация" subtitle="Прямые регионы и сервисы со своим локальным DNS. Необязательная блокировка рекламы, 1–3 входных узла и конечный выход для цепочек." icon="globe" link="docs/connect/smart-routing/" >}}
{{< hextra/feature-card title="Собственные правила" subtitle="Домены, IP, порты и сеть с подсказками GeoData. Обменивайтесь маршрутами без привязки к конкретным серверам." icon="adjustments" link="docs/connect/custom-routing/" >}}
{{< hextra/feature-card title="Полный Raw JSON" subtitle="Экспертный режим с редактором полной конфигурации. Платформенный туннель и связанные параметры управляются OneXray." icon="code" link="docs/connect/raw-json/" >}}
{{< hextra/feature-card title="Порядок в серверах" subtitle="Группы по подписке и местоположению, задержка и протоколы. HTTPS-подписки поддерживают необязательное шифрование age и отдельный HWID." icon="collection" link="docs/servers/" >}}
{{< hextra/feature-card title="Возможности платформ" subtitle="Исключения сетей Apple, приложения Android и интерфейсы Windows/Linux. Запуск и переключение через мобильные действия или трей." icon="desktop-computer" link="docs/shortcuts/" >}}
{{< hextra/feature-card title="Локальные инструменты" subtitle="Трафик текущего подключения, тесты узлов, обновления GeoData, фактическая конфигурация и доступные локальные журналы." icon="document-search" link="docs/advanced/" >}}
{{< /hextra/feature-grid >}}

<div class="product-section-gap"></div>

{{< hextra/hero-section heading="h2" >}}Единый подход на разных устройствах.{{< /hextra/hero-section >}}
<div class="hx:mb-8">
{{< hextra/hero-subtitle >}}Реальные экраны: подключение, серверы, умная и собственная маршрутизация.{{< /hextra/hero-subtitle >}}
</div>

{{< cards cols="2" >}}
{{< card image="/images/screenshots/connect-ios.png" alt="iPhone · Подключение" title="iPhone · Подключение" subtitle="Выбор серверов, скорости и трафик текущего сеанса." imageStyle="height: 28rem; object-fit: contain; padding: 1rem;" >}}
{{< card image="/images/screenshots/servers-android.png" alt="Android · Серверы" title="Android · Серверы" subtitle="Подписки, местоположения, задержки и протоколы." imageStyle="height: 28rem; object-fit: contain; padding: 1rem;" >}}
{{< card image="/images/screenshots/smart-routing-macos.png" alt="Mac · Умная маршрутизация" title="Mac · Умная маршрутизация" subtitle="Прямые сервисы и предпросмотр создаваемых правил." imageStyle="aspect-ratio: 16 / 10; object-fit: contain;" >}}
{{< card image="/images/screenshots/custom-routing-windows.png" alt="Windows · Собственные правила" title="Windows · Собственные правила" subtitle="Порядок правил, число входных узлов, импорт и обмен." imageStyle="aspect-ratio: 16 / 10; object-fit: contain;" >}}
{{< /cards >}}

<div class="product-section-gap product-section-anchor" id="download"></div>

{{< hextra/hero-section heading="h2" >}}Выберите своё устройство.{{< /hextra/hero-section >}}
<div class="hx:mb-8">
{{< hextra/hero-subtitle >}}OneXray — только клиент. Он не предоставляет VPN-доступ, серверы или подписки. Подготовьте совместимую конфигурацию из доверенного источника.{{< /hextra/hero-subtitle >}}
</div>

{{< cards cols="2" >}}
{{< card link="https://apps.apple.com/us/app/onexray/id6745748773" title="iPhone, iPad и Mac" subtitle="App Store. Другие способы установки описаны в руководстве." icon="download" >}}
{{< card link="https://play.google.com/store/apps/details?id=net.yuandev.onexray" title="Android" subtitle="Google Play для телефонов и планшетов." icon="download" >}}
{{< card link="https://apps.microsoft.com/detail/9NJ0MVHW215D" title="Windows" subtitle="Microsoft Store. Установка через winget и ZIP описана в руководстве." icon="download" >}}
{{< card link="docs/install/" title="Linux и отдельные пакеты" subtitle="Установка DEB, ZIP, APK, IPA и OneXraySE." icon="download" >}}
{{< /cards >}}

<div class="product-section-gap"></div>

{{< hextra/hero-section heading="h2" >}}Без аккаунта. Без рекламы. Без аналитики.{{< /hextra/hero-section >}}
<div class="hx:mb-8">
{{< hextra/hero-subtitle >}}Конфигурация остаётся на устройстве, пока вы сами ею не поделитесь. Серверы, DNS, обновления и тесты выполняют необходимые для своих функций сетевые запросы.{{< /hextra/hero-subtitle >}}
</div>

[Политика конфиденциальности](docs/privacy/)

---
title: Routing
weight: 6
---

Routing templates для OneXray поддерживаются как Xray Setting JSON files в репозитории [OneXray/Routing](https://github.com/OneXray/Routing).

| Регион | Template | Custom GeoData dependencies |
| --- | --- | --- |
| China | [cn.json](https://github.com/OneXray/Routing/raw/refs/heads/main/cn.json) | `EnhancedGeoSite`, `EnhancedGeoIP` |
| Iran | [ir.json](https://github.com/OneXray/Routing/raw/refs/heads/main/ir.json) | `IranGeoSite` |
| Russia | [ru.json](https://github.com/OneXray/Routing/raw/refs/heads/main/ru.json) | `RussiaGeoSite`, `RussiaGeoIP` |

# Как использовать

1. Откройте `Core > GeoData` в OneXray.
2. Добавьте нужные custom GeoData entries с точными именами из таблицы выше.
3. Откройте соответствующую ссылку JSON template и скопируйте или скачайте JSON.
4. В OneXray откройте `Core > Xray Settings > Add > Raw Edit`.
5. Вставьте template JSON, сохраните его и выберите этот Xray Setting.

Templates содержат `name`, `dns` и `routing`. Они не содержат runtime fields приложения: `inbounds`, `outbounds`, `log`, `policy`, `stats` или `metrics`. Выбранный outbound node по-прежнему добавляется OneXray при запуске VPN как runtime `proxy` outbound.

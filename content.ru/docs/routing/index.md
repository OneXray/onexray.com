---
title: Routing
weight: 6
---

# Режимы Home

| Режим | Поведение |
| --- | --- |
| Rule | Использует routing rules выбранного Xray Profile или Full Config. |
| Global | Весь трафик через `proxy`; DNS/routing удаляются, остается proxy dependency chain. |
| Direct | Весь трафик через `direct`; выбранный узел не используется. |

Смена режима во время подключения перезапускает Core.

# Расширенные шаблоны

Шаблоны находятся в [OneXray/Routing](https://github.com/OneXray/Routing).

| Регион | Шаблон | Custom GeoData |
| --- | --- | --- |
| Китай | [cn.json](https://github.com/OneXray/Routing/raw/refs/heads/main/cn.json) | `EnhancedGeoSite`, `EnhancedGeoIP` |
| Иран | [ir.json](https://github.com/OneXray/Routing/raw/refs/heads/main/ir.json) | `IranGeoSite` |
| Россия | [ru.json](https://github.com/OneXray/Routing/raw/refs/heads/main/ru.json) | `RussiaGeoSite`, `RussiaGeoIP` |

1. Добавьте нужные файлы в `Core > GeoData`.
2. Откройте репозиторий через `Core > Import Enhanced Routing`.
3. Создайте или отредактируйте Xray Profile и вставьте шаблон через Raw Edit.
4. Сохраните и выберите профиль.

Шаблоны предоставляют DNS и routing уровня профиля. Узел и runtime fields записывает OneXray.

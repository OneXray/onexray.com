---
title: Home
weight: 2
---

Home — основной экран состояния подключения и управления узлами.

Во время работы показывается фактически запущенный узел, а после остановки — выбранный. Xray Profile, трафик и местоположение являются отдельными интерактивными областями.

# Режимы маршрутизации

| Режим | Поведение Final Config |
| --- | --- |
| Rule | Использует выбранный узел и сохраняет DNS/routing выбранного Xray Profile. |
| Global | Отправляет весь трафик через выбранный узел; удаляет DNS и routing, оставляя `proxy` и необходимую цепочку зависимостей `dialerProxy`. |
| Direct | Отправляет весь трафик через `direct`; узел не требуется, DNS/routing удаляются, остается только `direct`. |

Смена режима при активном подключении перезапускает Core.

# Типы конфигураций

| Тип | Назначение | Расположение |
| --- | --- | --- |
| Outbound | Один proxy outbound: VLESS, VMess, Trojan, Shadowsocks, SOCKS, HTTP или Hysteria2. | Local или группа подписки. |
| Full Config | Структурированная локальная конфигурация со своими outbounds, routing и DNS. | Группа Home `Local`. |
| Raw Json | Расширенный Xray JSON, редактируемый как текст. | Группа Home `Local`. |
| Xray Profile | Обязательная runtime-основа для inbounds, DNS, routing, системных outbounds, logs, metrics и FakeDNS. | Core > Xray Profiles. |
| Simple Profile | Встроенный резервный Xray Profile. | Core > Xray Profiles. |

# Список узлов

Локальные Outbound, Full Config и Raw Json находятся в группе `Local`. Группы подписок содержат только Outbound. Поиск фильтрует общий список; доступные действия карточки зависят от типа.

Связанные страницы:

- [Добавление и импорт]({{< relref path="add/index.md" lang="ru" >}})
- [Outbound Nodes]({{< relref path="outbound/_index.md" lang="ru" >}})
- [Xray Profile]({{< relref path="outbound/xrayProfile/index.md" lang="ru" >}})
- [Raw Json]({{< relref path="rawConfig/index.md" lang="ru" >}})
- [Запуск и остановка]({{< relref path="start/index.md" lang="ru" >}})

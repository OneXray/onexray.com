---
title: Главная
weight: 2
---

Главная страница — основной рабочий экран. Здесь находятся списки узлов, записи Xray Setting, Raw Config, подписки, кнопки запуска и остановки, поиск, импорт и индикация состояния.

Изменения конфигурации применяются при следующем запуске VPN. Если VPN уже запущен, измените конфигурацию, остановите VPN и запустите его снова.

# Типы конфигураций

| Тип | Назначение | Для кого |
| --- | --- | --- |
| Outbound | Один Xray outbound-узел: VLESS, VMess, Trojan, Shadowsocks, SOCKS, HTTP, Hysteria2. | Большинство пользователей и подписки. |
| Xray Setting | Структурированная Xray-конфигурация, которую генерируют страницы OneXray. | Пользователи с собственным DNS, routing, FakeDNS, chain proxy, logs или дополнительными outbounds. |
| Raw Config | Полный Xray JSON, импортируемый и редактируемый как текст. | Опытные пользователи Xray-core. |
| Simple | Встроенный writer Xray Setting, управляемый страницей Simple Setting. | Пользователи, которым нужна рабочая DNS и routing-конфигурация по умолчанию. |

# Рекомендуемый поток

1. Добавьте outbound-узел или подписку.
2. Оставьте Xray Setting узла как `Simple`.
3. Меняйте Simple Setting только для direct region, FakeDNS, chain proxy, DNS query strategy или log level.
4. Запустите VPN с главной страницы.

# Состояние и тесты

При запуске VPN OneXray записывает Xray config file в runtime-директорию приложения и запускает сетевой туннель платформы. После запуска приложение может проверить задержку и IP узла. Настройки Ping общие для ручного ping, subscription auto-ping и проверок после запуска.

# Разделы

- [Добавление и импорт]({{< relref path="add/index.md" lang="ru" >}})
- [Outbound-узлы]({{< relref path="outbound/_index.md" lang="ru" >}})
- [Xray Setting]({{< relref path="outbound/xraySetting/index.md" lang="ru" >}})
- [Raw Config]({{< relref path="rawConfig/index.md" lang="ru" >}})
- [Запуск и остановка]({{< relref path="start/index.md" lang="ru" >}})

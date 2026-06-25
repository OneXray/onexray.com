---
title: Запуск и остановка
weight: 5
---

Используйте нижнюю кнопку на главной странице для запуска и остановки VPN.

# Запуск

При запуске outbound-узла OneXray:

1. Загружает выбранный узел.
2. Загружает выбранный Xray Setting или записывает встроенный Simple setting.
3. Применяет chain proxy, если он настроен.
4. Применяет platform runtime fixes: interface binding, ping port, macOS System Extension log handling.
5. Записывает Xray JSON runtime config.
6. Запускает VPN tunnel платформы.
7. Проверяет latency и node IP information, если доступно.

# Остановка

Остановка VPN закрывает tunnel платформы и очищает running state в приложении.

# Проверка запуска

Запуск может завершиться ошибкой:

| Случай | Значение |
| --- | --- |
| Invalid outbound | Выбранный узел нельзя преобразовать в корректный Xray outbound. |
| Missing chain proxy | Simple Setting указывает на удаленный chain proxy node. |
| Invalid chain proxy | Выбранная chain proxy row не является outbound или не разбирается. |
| Same chain proxy and outbound | Chain proxy id совпадает с exit node id. |
| Invalid Raw Json | Raw JSON не проходит проверку OneXray или тест Xray-core. |

Для машинного управления desktop builds предоставляют `onexray vpn start` и `onexray vpn stop`. См. [Develop]({{< relref path="../../develop/index.md" lang="ru" >}}).

---
title: Запуск и остановка
weight: 5
---

Используйте нижнюю кнопку на главной странице для запуска и остановки текущего runtime mode.

OneXray поддерживает два runtime modes:

| Mode | Behavior |
| --- | --- |
| TUN | Запускает platform VPN/TUN integration и направляет трафик через Xray-core. |
| Proxy | Запускает Xray внутри процесса приложения и открывает локальные SOCKS/HTTP proxy ports без изменения system proxy, routes, DNS или system VPN state. |

# Запуск

При запуске outbound-узла OneXray:

1. Загружает выбранный узел.
2. Загружает выбранный Xray Profile. Если сохраненный выбор недействителен, OneXray возвращается к встроенному Simple Profile.
3. Применяет chain proxy, если он настроен.
4. Применяет runtime fixes: mode-specific inbounds, ping port, metrics, interface binding и macOS System Extension log handling.
5. Записывает Xray JSON runtime config.
6. В TUN mode запускает VPN tunnel платформы; в Proxy mode запускает локальный Xray.
7. Проверяет latency и node IP information, если доступно.

# Остановка

Остановка закрывает активный runtime и очищает running state в приложении.

Proxy mode не настраивает операционную систему автоматически и не отображается как system VPN connection. Используйте SOCKS или HTTP address из Xray Profiles при ручной настройке browser, terminal или system proxy.

# Проверка запуска

Запуск может завершиться ошибкой:

| Случай | Значение |
| --- | --- |
| Invalid outbound | Выбранный узел нельзя преобразовать в корректный Xray outbound. |
| Missing chain proxy | Simple Profile указывает на удаленный chain proxy node. |
| Invalid chain proxy | Выбранная chain proxy row не является outbound или не разбирается. |
| Same chain proxy and outbound | Chain proxy id совпадает с exit node id. |
| Invalid Raw Json | Raw JSON не проходит проверку OneXray или тест Xray-core. |

---
title: Запуск и остановка
weight: 5
---

Используйте нижнюю кнопку на главной странице для запуска и остановки текущего runtime mode.

OneXray поддерживает два runtime modes:

| Mode | Behavior |
| --- | --- |
| TUN | Запускает platform VPN/TUN integration и направляет трафик через Xray-core. |
| Proxy | Запускает локальный Xray и открывает SOCKS/HTTP proxy ports без изменения system proxy, routes, DNS или system VPN state. |

# Запуск

При запуске outbound-узла OneXray:

1. Загружает выбранный узел.
2. Загружает выбранный Xray Profile. Если сохраненный выбор недействителен, OneXray возвращается к встроенному Simple Profile.
3. Собирает Final Config из выбранного узла и выбранного Xray Profile.
4. Применяет Final Outbound, если он настроен.
5. Применяет runtime fixes: mode-specific inbounds, ping port, metrics, interface binding, env paths и macOS System Extension log handling.
6. Записывает Final Config в runtime `xray.json`.
7. В TUN mode запускает VPN tunnel платформы; в Proxy mode запускает локальный Xray.
8. Проверяет latency и node IP information, если доступно.

TUN и Proxy mode меняют runtime inbounds в Final Config и способ запуска core. Они не отменяют требование, что один Xray Profile должен быть выбран.

# Остановка

Остановка закрывает активный runtime и очищает running state в приложении.

Proxy mode не настраивает операционную систему автоматически и не отображается как system VPN connection. Используйте SOCKS или HTTP address из Xray Profiles при ручной настройке browser, terminal или system proxy.

# Проверка запуска

Запуск может завершиться ошибкой:

| Случай | Значение |
| --- | --- |
| Invalid outbound | Выбранный узел нельзя преобразовать в корректный Xray outbound. |
| Missing Final Outbound | Simple Profile указывает на удаленный Final Outbound node. |
| Invalid Final Outbound | Выбранная Final Outbound row не является outbound или не разбирается. |
| Same Final Outbound and current node | Final Outbound id совпадает с current Home node id. |
| Invalid Raw Json | Raw JSON не проходит проверку OneXray или тест Xray-core. |

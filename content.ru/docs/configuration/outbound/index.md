---
title: "JSON узла outbound"
description: "Импортируемый документ сервера с протоколом, транспортом, TLS и REALITY."
weight: 10
ai_order: 40
lastmod: 2026-09-14
---

Корень — объект с массивом outbounds, не отдельный outbound. Одиночный JSON-редактор принимает ровно один узел; импорт файла/текста может извлечь несколько.

Путь: Серверы → Добавить → ручной JSON или файл. Корневые routing/DNS/inbounds обычным импортом серверов не устанавливаются.

## Получите настоящие параметры

| Область | Данные |
| --- | --- |
| Основное | tag, протокол, адрес, числовой порт |
| VLESS/VMess | UUID, требуемые encryption/security и flow |
| Trojan/Shadowsocks/SOCKS | Пароль, метод шифрования или логин/пароль |
| Транспорт | network, path, Host, serviceName и необходимые параметры |
| TLS | Включение, имя сертификата, при необходимости ALPN/fingerprint |
| REALITY | serverName, fingerprint, публичный ключ/password, shortId, требуемый flow |

Не выводите параметры из названия или страны сервера. Не добавляйте allowInsecure, обход сертификата или Vision flow для сокрытия ошибки.

## VLESS с TLS

Шаблон: замените server.example.com, порт и UUID. Подтвердите RAW/TCP + TLS. Имя сертификата может отличаться от адреса сервера.

{{% json-example "outbound-vless-tls.json" %}}

XHTTP требует network: xhttp и xhttpSettings поставщика (host, path, mode, необходимые extra); WebSocket — network: ws и wsSettings (host, path); gRPC — grpcSettings.serviceName. Это альтернативы, а не произвольно совмещаемые параметры.

## VLESS с REALITY

Публичный ключ оставлен незаполненным намеренно. Замените его и остальные параметры. Здесь realitySettings.password — публичный ключ сервера, не приватный. Flow добавляется только по требованию сервера.

{{% json-example "outbound-vless-reality.json" %}}

## VMess с WebSocket и TLS

Замените адрес, UUID, путь и параметры транспорта. Это Xray outbound, не удалённый формат VMessQrCode `vmess://Base64(JSON)`.

{{% json-example "outbound-vmess-ws.json" %}}

## Другие протоколы

Оболочка сохраняет полные настройки, приложение не перестраивает узлы фиксированной формой.

- Trojan: settings.servers с address, port, password; транспорт/TLS в streamSettings.
- Shadowsocks: servers с address, port, method, password; точные требования к шифру и ключу берите у поставщика.
- SOCKS: servers с address, port и необязательным `users: [{"user":"…","pass":"…"}]`. Сам SOCKS не шифрует трафик.
- Другие протоколы допустимы только при поддержке JSON встроенным Core; отсутствие share URI не означает отсутствие native JSON.

Справочник: [VLESS](https://xtls.github.io/config/outbounds/vless.html), [VMess](https://xtls.github.io/config/outbounds/vmess.html), [Trojan](https://xtls.github.io/config/outbounds/trojan.html), [Shadowsocks](https://xtls.github.io/config/outbounds/shadowsocks.html), [SOCKS](https://xtls.github.io/config/outbounds/socks.html). Сначала проверьте [версию]({{< relref "/docs/configuration/compatibility" >}}).

## Имена, зависимости и обмен

Название записывается в tag, не в старый name и не в sendThrough. Обычный режим назначает runtime tags: имя другого импортированного узла не является устойчивой ссылкой.

Не добавляйте межузловые dialerProxy/proxySettings.tag в отдельный серверный шаблон. Для конечного выхода используйте Smart Routing, для полностью заданной цепочки — Raw.

JSON сохраняет больше полей, чем стандартная ссылка. VMessAEAD/VLESS, SS, SOCKS и Trojan поддерживаются; VMessQrCode — нет. Предпочитайте полный JSON с точным путём импорта.

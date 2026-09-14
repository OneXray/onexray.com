---
title: "JSON собственного маршрута"
description: "Пустые слоты, упорядоченные правила, фиксированные действия, Local DNS и зависимости Geodata."
weight: 20
ai_order: 50
lastmod: 2026-09-14
---

Импорт: Подключение → режим трафика → собственный маршрут, не обычный импорт серверов. Выберите профиль и уже имеющиеся узлы.

## Структура

| Поле | Контракт |
| --- | --- |
| name | Непустое уникальное имя, до 32 символов |
| outbounds | Обязательно 1–3 пустых объекта; количество задаёт число входных узлов |
| routing.domainStrategy | IPIfNonMatch; приложение нормализует значение |
| routing.rules | Упорядоченные правила; пустой список оставляет поведение по умолчанию |
| dns | Необязательно; фиксированный tagged Local DNS и необязательный сервер FakeDNS ниже |
| geodata.assets | Зависимости импорта, только file и HTTPS url |

Другие корневые поля не поддерживаются. Не определяйте реальные узлы, direct/block/dnsOut outbound, balancers, inbounds, журналы, метрики, observatory, корневые пулы FakeDNS или UI-флаги.

## Условия и действия

Поддерживаемые условия: domain и ip — массивы строк; port, например `"443"`, `"8000-8080"`, `"80,443"`; network — tcp, udp или tcp,udp; protocol и localOS — массивы строк. Имя правила — ruleTag. В редакторе протоколы и ОС находятся в разделе дополнительных условий.

Выберите ровно одно действие:

| Действие | JSON |
| --- | --- |
| VPN | `"balancerTag": "proxy"` |
| Напрямую | `"outboundTag": "direct"` |
| Блокировать | `"outboundTag": "block"` |

Не используйте outboundTag: proxy, type, enabled, sourceIP, sourcePort, attrs, inboundTag или условия процесса. Неподдерживаемые поля отклоняются.

Разные типы условий — AND. Обычные значения одного списка — альтернативы. Для «домен ИЛИ IP» создавайте разные правила. Отрицательные IP-списки следуют семантике Core; к ним нельзя безусловно применять простое объяснение OR.

Домены: full:host.example.com — точное имя; domain:example.com — домен и поддомены; geosite:CN — проверенная стандартная категория; ext:other.dat:category — собственная. Строка без префикса — ключевое слово, не точное имя. Не расширяйте намерение пользователя до подстроки/регулярного выражения.

IP: адрес, CIDR, geoip:CN или ext:other.dat:category. [Категория должна существовать]({{< relref "/docs/configuration/geodata" >}}).

## Порядок и fallback

Первое подходящее правило определяет действие. IPIfNonMatch разрешает домен и выполняет IP-aware проход только после неудачного первого. Безусловное конечное правило proxy может предотвратить второй проход.

Приложение создаёт round-robin balancer proxy даже для одного узла, fallback — direct. **Непопавший под правила трафик использует первый outbound, не balancer.** Для балансировки назначения нужны явные proxy-правила. Прямой fallback не является защитой fail-closed.

Настоящие узлы и системные outbounds генерируются приложением; в Custom нужны только три поддерживаемых ссылки действия.

## Local DNS

При наличии dns включите ровно один `{"tag":"app-dns-direct","address":"8.8.8.8"}`. Меняйте его address, не tag. Для FakeDNS добавьте сервер app-dns-fake, описанный ниже. Не добавляйте domains, queryStrategy, skipFallback или отдельный port. Порт включается в поддерживаемую строку адреса, например tcp://192.168.50.53:5353.

В DNS domains попадают только чистые прямые доменные правила. Дополнительные IP/port/network/protocol/localOS исключают вклад этого правила в список. IP-only правило не разрешает внутренние имена. Proxy DNS остаётся 8.8.8.8.

## Полный пример

Реклама блокируется; GitHub идёт через VPN раньше Microsoft; Apple/Microsoft/Bing/Китай/частные назначения объединены в отдельные доменное и IP-правила. Нужны оба стандартных DAT и два подходящих узла. Секретов и незаполненных параметров нет.

{{% json-example "custom-cn.json" %}}

## Протоколы и операционные системы

protocol: http, tls, quic, bittorrent; localOS: ios, android, darwin, windows, linux. Оба — массивы. Protocol означает распознанный протокол приложения, не VLESS/VMess. localOS — система, где работает Core, не удалённый сервер и не пакет Android.

{{% json-example "custom-protocol.json" %}}

## FakeDNS

FakeDNS по умолчанию выключен и сохраняется дополнительным tagged DNS server. Сохраните direct server; не экспортируйте пулы или sniffing и не добавляйте корневой boolean.

{{% json-example "custom-fakedns.json" %}}

[Версия]({{< relref "/docs/configuration/compatibility" >}}) · [DNS/FakeDNS]({{< relref "/docs/configuration/dns" >}}) · [Зависимости]({{< relref "/docs/configuration/geodata" >}})

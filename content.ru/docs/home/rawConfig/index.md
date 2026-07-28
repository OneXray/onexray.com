---
title: Raw Json
weight: 4
---

Raw Json — расширенный локальный тип конфигурации для полей, не представленных в структурированном UI.

Лучше всего начать с файла:

```text
Core > Logs > Xray Config
```

# Хранение и проверка

Raw Json должен быть корректным JSON с непустым полем `name`.

Перед validation, Real Ping и save OneXray удаляет все пользовательские `inbounds` и оставляет только управляемый приложением `pingIn`. Ручное сохранение затем запускает встроенный Xray config test.

Обычный import не создает Raw Json. Используйте `Home > Add > Manual Input > Raw Json`.

# Final Config

В режиме Rule Raw Json остается основным телом конфигурации, но его inbounds заменяются на `tunIn`, дополнительные inbounds выбранного Xray Profile и новый `pingIn`.

Также применяются:

| Область | Runtime-поведение |
| --- | --- |
| DNS strategy | `queryStrategy` DNS и DNS Server переписывается из настройки TUN IPv6. |
| TUN route | Windows/Linux gateway, DNS, routes и outbound interface. |
| Logs | Пути access/error; в macOS System Extension журналы отключаются. |
| Metrics | Добавление или удаление policy/stats/metrics. |
| Environment | Пути asset и cert, которыми управляет приложение. |

Global удаляет `dns` и `routing`, оставляя `proxy` и полную цепочку зависимостей `dialerProxy`.

Direct не использует тело Raw Json: direct-only Final Config создается из выбранного Xray Profile.

# Ping

Не управляйте `pingIn` вручную. OneXray переписывает inbound и routing rule с текущим случайным портом и authentication.

# Sharing

Raw Json можно экспортировать как текст или `.json`. Обычный импорт не создает из такого файла запись Raw Json.

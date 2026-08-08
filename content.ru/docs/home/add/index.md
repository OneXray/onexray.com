---
title: Добавление и импорт
weight: 1
---

Меню добавления на Home создает локальные узлы, добавляет подписки, сканирует QR-коды, выбирает изображения/файлы и читает буфер обмена.

# Manual Input

| Пункт | Результат |
| --- | --- |
| Outbound | Один структурированный локальный outbound. |
| Full Config | Локальная конфигурация с outbounds, routing и DNS. |
| Raw Json | Расширенная локальная Xray JSON конфигурация. |

Все типы появляются в группе Home `Local`.

# OneXray Links

Текст, который после trim начинается с `onexray://`, разбирается как одна или несколько OneXray Links. Поддерживается импорт:

- Outbound, Xray Profile, Full Config или Raw Json;
- HTTPS-подписок с необязательным X25519/Hybrid age;
- Domain/IP GeoData.

Age-ссылка не передает ключи отправителя. OneXray создает новую пару на устройстве получателя и сохраняет ее только после успешной первой загрузки. Перед shared config могут идти ссылки на требуемые custom GeoData.

# HTTPS-подписки

Текст, который после trim начинается с `https://`, считается вводом подписок. Пакетный импорт принимает одну HTTPS-ссылку на строку.

```text
https://example.com/first#First
https://example.com/second#Second
```

Fragment URL декодируется как начальное имя и удаляется перед сохранением URL. Пустое имя заменяется на `anonymous`, некорректные строки пропускаются. Таймаут приема данных — 60 секунд.

Для импорта обычных share links первая непустая часть текста не должна начинаться с `onexray://` или `https://`.

# Другие форматы

Остальной текст разбирается libXray и создает только Outbound:

- Xray share links и многострочный share text
- поддерживаемый Clash / Mihomo YAML
- поддерживаемый Xray JSON

Обычный импорт не создает Full Config, Raw Json, Xray Profile или GeoData и не выполняет ручной Xray config test для импортированных Outbound.

# QR, изображение, файл и буфер обмена

| Вход | Поддержка |
| --- | --- |
| Scan QR Code | QR-код с камеры. |
| Pick Image | `png`, `jpg`, `jpeg`. |
| Pick File | `txt`, `json`, `yaml`, `yml` и указанные изображения. |
| Read Pasteboard | Обычный текст с тем же порядком распознавания. |

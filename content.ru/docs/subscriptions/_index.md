---
title: Subscriptions
weight: 3
---

Subscriptions — удаленные источники outbound-узлов.

# Поддерживаемые данные

OneXray через libXray разбирает поддерживаемые Xray share links, Clash / Mihomo YAML и Xray JSON и сохраняет только валидные Outbound.

Подписки не создают Full Config, Raw Json, Xray Profile, GeoData, DNS, routing, inbound, log, policy, stats или metrics.

# Добавление и пакетный импорт

Отдельная страница добавляет один HTTPS URL. Обычный import текста/файла/буфера может добавить несколько подписок, если trimmed text начинается с `https://` и содержит одну ссылку на строку.

Fragment становится именем, но удаляется из сохраненного URL:

```text
https://example.com/sub#Work
```

Сохраняется URL `https://example.com/sub`, имя — `Work`. Receive timeout — 60 секунд.

# Список

Подписку можно открыть, обновить, проверить, поделиться, изменить, очистить или удалить. Страница узлов использует Home list/search, но клик по карточке не меняет активный Home node.

Пакетный импорт не запускает auto-ping queue, чтобы большие наборы не блокировали desktop. Один импорт и обычный refresh могут запустить ping.

# Backup Restore

Backup хранит источники подписок, а не скачанные узлы. После восстановления узлы загружаются снова.

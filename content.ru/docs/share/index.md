---
title: Share
weight: 2
---

OneXray использует стандартные форматы вместо частного app-link формата.

| Тип | Формат |
| --- | --- |
| Outbound | Стандартный Xray share text и QR, поддерживаемые libXray. |
| Subscription | HTTPS URL. |
| Raw Json | JSON text или `.json`. |
| Xray Profile | JSON text или `.json`. |
| GeoData | Используйте Backup. |

# Import

1. Если trimmed text начинается с `https://`, каждая валидная HTTPS-строка импортируется как подписка.
2. Иначе libXray разбирает полный текст как outbound share content.

Fragment URL используется как имя и удаляется перед сохранением. Текстовые файлы: `txt`, `json`, `yaml`, `yml`; QR images: `png`, `jpg`, `jpeg`.

Обычный import создает только subscriptions и Outbound. Экспорт Raw Json/Xray Profile предназначен для ручного редактирования или backup.

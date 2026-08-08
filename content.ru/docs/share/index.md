---
title: Share
weight: 2
---

OneXray поддерживает совместимые форматы и собственную схему URL `onexray://`.

| Тип | Формат |
| --- | --- |
| Outbound | Стандартный Xray share text/QR от libXray или OneXray Link. |
| Subscription | HTTPS URL или OneXray Link. |
| Full Config | OneXray Link или JSON text/file. |
| Raw Json | OneXray Link или JSON text/file. |
| Xray Profile | OneXray Link или JSON text/file. |
| GeoData | OneXray Link или Backup. |

# OneXray URL Scheme

OneXray Links сохраняют типы конфигурации, которые нельзя выразить стандартными Xray links:

```text
onexray://onexray.com/config/add?type=outbound|profile|full|raw&data=<percent-encoded-base64-json>#Name
onexray://onexray.com/sub/add?url=<percent-encoded-https-url>[&age=x25519|hybrid]#Name
onexray://onexray.com/dat/add?type=domain|ip&url=<percent-encoded-https-url>#Name
```

Поддерживаются только указанные типы. Старый `type=setting`, backup archives и другие команды не принимаются.

Ссылка age-подписки передает только тип ключа, но не пару ключей отправителя. Получатель создает новую локальную пару, отправляет открытый ключ при первом запросе и сохраняет пару только после успешного импорта.

Если shared config ссылается на custom GeoData в OneXray, соответствующие GeoData links помещаются перед config link и импортируются первыми.

# Регистрация на платформах

Android, iOS и установленные macOS apps регистрируют `onexray://` напрямую. В Windows схему регистрируют EXE/winget, в Linux — DEB. ZIP-пакеты Windows/Linux ее не регистрируют.

Mac App Store build и OneXraySE используют одну схему, поэтому при одновременной установке macOS может открыть любое из приложений.

# Import

1. Если trimmed text начинается с `onexray://`, OneXray разбирает каждую валидную OneXray Link.
2. Если он начинается с `https://`, каждая валидная HTTPS-строка импортируется как подписка.
3. Иначе libXray разбирает полный текст как outbound share content.

Fragment URL используется как имя и удаляется перед сохранением. Текстовые файлы: `txt`, `json`, `yaml`, `yml`; QR images: `png`, `jpg`, `jpeg`.

Обычный HTTPS/share-text import создает только subscriptions и Outbound. Для Full Config, Raw Json, Xray Profile и GeoData требуется соответствующая OneXray Link или отдельный import flow.

---
title: Добавление и импорт
weight: 1
---

Меню добавления на главной странице позволяет создать локальный узел, добавить подписку, сканировать QR-код, выбрать файл, выбрать изображение или прочитать текст из буфера обмена.

# Ввод

## Ручной ввод

Ручной ввод открывает редактор outbound. Используйте его, если хотите создать локальный узел прямо в OneXray.

Редактор сохраняет один outbound-узел. Во время запуска OneXray назначает активному узлу зарезервированный runtime tag `proxy`.

## Ссылка подписки

Ввод подписки создает запись подписки и сразу загружает ее. Имя подписки берется из URL fragment, если он есть. Пустое имя становится `anonymous`.

Пример:

```text
https://example.com/sub.txt#MySubscription
```

# Поддерживаемый импортируемый текст

OneXray классифицирует текст по первому распознанному формату.

| Ввод | Поведение |
| --- | --- |
| `onexray://onexray.com/...` | OneXray URL Scheme. Может импортировать подписки, конфиги и rule sets. |
| `https://...` | Subscription URL. |
| Xray share links | Разбираются через libXray и импортируются как outbound-узлы. |
| Subscription text | Можно импортировать несколько share links сразу. |
| Clash.Meta YAML | Разбирается через libXray, если поддерживается встроенным core API. |
| Xray JSON | Разбирается через libXray, если поддерживается встроенным core API. |

Точный OneXray URL Scheme описан на странице [Develop]({{< relref path="../../develop/index.md" lang="ru" >}}).

## Scan QRCode

Страница QR-сканирования читает QR-коды с камеры. Она предназначена для коротких ссылок узлов и OneXray-ссылок.

Длинные ссылки могут хуже распознаваться. Для длинных XHTTP или полных setting payload используйте текст, файл или URL Scheme.

## Pick Image

Импорт изображения поддерживает QR-файлы `png`, `jpg`, `jpeg`.

## Pick File

Импорт файлов поддерживает:

| Расширение | Обработка |
| --- | --- |
| `png`, `jpg`, `jpeg` | Декодировать QR-код из изображения. |
| `txt`, `json`, `yaml` | Прочитать файл как текст и импортировать. |

## Read Clipboard

Импорт из буфера обмена читает plain text и использует тот же pipeline импорта.

# Импорт для ИИ и CLI

Автоматизациям следует использовать настольный CLI:

```shell
onexray import --file /path/to/import.txt
onexray import --text 'vless://...'
cat import.txt | onexray import --file -
```

Приложение должно быть запущено, потому что CLI отправляет запрос в локальный Automation API.

CLI import поддерживает те же текстовые форматы: OneXray URL Scheme, HTTPS subscription URL, Xray share links, multi-line share text, Clash.Meta YAML и Xray JSON. `--file -` читает text из stdin. QR images импортируются из UI приложения.

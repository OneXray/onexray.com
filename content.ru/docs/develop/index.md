---
title: Develop
weight: 4
---

Эта страница описывает интерфейсы для automation tools, AI agents, launchers и integrations.

# Порядок определения импорта

Когда OneXray получает текст из UI import, URL Scheme, CLI или Automation API, используется порядок:

1. Текст, начинающийся с `onexray://onexray.com`, разбирается как OneXray URL Scheme.
2. Текст, начинающийся с `https://`, разбирается как subscription URL.
3. Остальной текст разбирается через libXray как Xray share content.

# OneXray URL Scheme

Base:

```text
onexray://onexray.com
```

## Config

```text
onexray://onexray.com/config/add?type=setting&data=<base64>#<name>
onexray://onexray.com/config/add?type=outbound&data=<base64>#<name>
onexray://onexray.com/config/add?type=raw&data=<base64>#<name>
```

| Query или fragment | Значение |
| --- | --- |
| `type` | `setting`, `outbound` или `raw`. |
| `data` | Base64-encoded UTF-8 config text. |
| Fragment | Display name. Пустое имя становится `anonymous`. |

Значение query `data` нужно URL-encode после Base64 encoding.

### Структура Config `data`

`data` используется только в `/config/add`. Это не raw JSON, помещенный прямо в URL.

Порядок построения:

1. Создайте JSON payload для выбранного `type` как UTF-8 text.
2. Закодируйте UTF-8 bytes стандартным Base64.
3. Percent-encode Base64 string как query value.

Используйте стандартный Base64. Не используйте Base64URL.

Payload для каждого `type`:

| `type` | Plain text перед Base64 | Import behavior |
| --- | --- | --- |
| `outbound` | Xray JSON object с массивом `outbounds`. | OneXray читает только первый outbound и импортирует его как local node. |
| `setting` | Полный Xray Setting JSON object. | OneXray импортирует его как structured Xray Setting. |
| `raw` | Полный Raw Config JSON text. | OneXray сохраняет его как Raw Config после validation. |

Структура `outbound` payload:

```json
{
  "outbounds": [
    {
      "name": "My Node",
      "protocol": "vless",
      "tag": "proxy",
      "settings": {},
      "streamSettings": {}
    }
  ]
}
```

Для `outbound` сохраненное имя читается из первого outbound item. OneXray проверяет `name`, затем `sendThrough`, затем `tag`, затем `protocol`.

Структура `setting` payload:

```json
{
  "name": "My Setting",
  "log": {},
  "dns": {},
  "fakeDns": [],
  "routing": {},
  "inbounds": [],
  "outbounds": []
}
```

Для `setting` сохраненное имя читается из top-level `name`.

Структура `raw` payload:

```json
{
  "name": "My Raw Config",
  "inbounds": [
    {
      "tag": "tunIn",
      "protocol": "tun"
    }
  ],
  "outbounds": []
}
```

Для `raw` URL fragment используется как display name в database. JSON все равно должен иметь собственный top-level `name`, потому что Raw Config validation требует его.

Пример построения:

```text
jsonText = compact-or-pretty-json
data = percentEncode(base64Encode(utf8Encode(jsonText)))
url = onexray://onexray.com/config/add?type=setting&data=<data>#My%20Setting
```

## Subscription

```text
onexray://onexray.com/sub/add?url=<url>#<name>
```

| Query или fragment | Значение |
| --- | --- |
| `url` | Subscription download URL. |
| Fragment | Subscription name. Пустое имя становится `anonymous`. |

## GeoData

```text
onexray://onexray.com/dat/add?type=domain&url=<url>#<name>
onexray://onexray.com/dat/add?type=ip&url=<url>#<name>
```

| Query или fragment | Значение |
| --- | --- |
| `type` | `domain` или `ip`. |
| `url` | `.dat` download URL. |
| Fragment | GeoData name. Пустое имя становится `anonymous`. |

Поддерживается многострочный OneXray share text. Каждая строка разбирается отдельно.

# Desktop CLI

CLI `onexray` доступен в desktop packages. Он подключается к запущенному приложению через локальный Automation API. Приложение должно быть открыто.

```text
Usage: onexray [options] <command>
```

Global options:

| Option | Значение |
| --- | --- |
| `--json` | Печатает machine-readable JSON envelope. |
| `--api <url>` | Переопределяет local Automation API base URL. |
| `--token <token>` | Переопределяет token. |
| `--session <path>` | Переопределяет Automation session file path. |
| `-v`, `--version` | Печатает CLI version. |
| `-h`, `--help` | Печатает help. |

Commands:

```shell
onexray health
onexray status
onexray import --file /path/to/import.txt
onexray import --text 'vless://...'
cat import.txt | onexray import --file -
onexray debug session
onexray vpn start
onexray vpn start --id 123
onexray vpn stop
```

## Форматы импорта CLI

`onexray import` принимает один import text из `--text`, `--file` или standard input через `--file -`. CLI не разбирает содержимое сам; он отправляет текст в запущенное приложение через `POST /v1/import`.

Поддерживаемые текстовые форматы CLI:

| Format | Example | Result |
| --- | --- | --- |
| OneXray URL Scheme | `onexray://onexray.com/config/add?...` | Импортирует configs, subscriptions или GeoData. |
| HTTPS subscription URL | `https://example.com/sub.txt#Name` | Добавляет и загружает subscription. |
| Xray share link | `vless://...`, `vmess://...`, `trojan://...`, `ss://...`, а также SOCKS или Hysteria share text, если его принимает bundled libXray. | Импортирует outbound nodes. OneXray local outbound models поддерживают `vless`, `vmess`, `shadowsocks`, `trojan`, `socks` и `hysteria`. |
| Multi-line Xray share text | Одна share link на строку. | Импортирует несколько outbound nodes. |
| Clash.Meta YAML | YAML text в `--text`, text file или stdin. | Импортирует outbound nodes, если это поддерживает bundled libXray API. |
| Xray JSON | JSON text в `--text`, text file или stdin. | Импортирует outbound nodes, если это поддерживает bundled libXray API. |
| Multi-line OneXray share text | Одна ссылка `onexray://onexray.com/...` на строку. | Импортирует каждый OneXray share item отдельно. |

`--file` предназначен для text files. QR image import относится к UI приложения, а не к file format CLI.

# Automation API

Automation API доступен только на desktop. Он слушает `127.0.0.1` на случайном порту и требует bearer token.

Приложение записывает `automation-session.json`:

```json
{
  "apiVersion": "v1",
  "host": "127.0.0.1",
  "port": 57706,
  "token": "...",
  "pid": 12345,
  "appVersion": "26.6.1",
  "createdAt": "2026-06-11T12:00:00.000"
}
```

Candidate session paths:

| Platform | Paths |
| --- | --- |
| macOS | `~/Library/Group Containers/2CKAULFA9J.net.yuandev.onexray/run/automation-session.json`, `~/Library/Group Containers/group.net.yuandev.onexray.se/run/automation-session.json`, `~/Library/Application Support/OneXray/run/automation-session.json` |
| Windows | `%APPDATA%\\OneXray\\run\\automation-session.json` |
| Linux | `$XDG_RUNTIME_DIR/onexray/automation-session.json`, `$XDG_CONFIG_HOME/onexray/run/automation-session.json`, `~/.config/onexray/run/automation-session.json`, `~/.local/share/onexray/run/automation-session.json` |

Все requests должны содержать:

```http
Authorization: Bearer <token>
```

## Response Envelope

Success:

```json
{
  "ok": true,
  "data": {}
}
```

Error:

```json
{
  "ok": false,
  "code": "invalid_request",
  "message": "Request body must be a JSON object."
}
```

## Endpoints

### `GET /v1/health`

Возвращает app version, build number, platform и process id.

### `GET /v1/status`

Возвращает app version, VPN running state, running config id/name, start timestamp, duration и selected Xray Setting id.

### `POST /v1/import`

Request:

```json
{
  "text": "vless://..."
}
```

Response data examples:

```json
{
  "imported": 1,
  "configImported": 1,
  "source": "xrayShare"
}
```

```json
{
  "imported": 1,
  "configImported": 0,
  "subscriptionImported": true,
  "source": "httpsSubscription"
}
```

`source` может быть `oneXrayShare`, `httpsSubscription` или `xrayShare`.

### `POST /v1/vpn/start`

Request:

```json
{
  "configId": 123
}
```

`configId` необязателен. Если он отсутствует, OneXray запускает default или last selected config.

### `POST /v1/vpn/stop`

Request body может быть пустым JSON object:

```json
{
}
```

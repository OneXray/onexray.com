---
title: Develop
weight: 4
---

Эта страница описывает интерфейсы для automation tools, AI agents, launchers и integrations.

# Порядок определения import text

Когда OneXray получает import text из UI, desktop CLI или Automation API, используется такой порядок:

1. Текст, начинающийся с `https://`, обрабатывается как subscription URL.
2. Остальной текст разбирается libXray как Outbound share content.

Import pipeline больше не обрабатывает legacy private import text, GeoData import payloads, Raw Json records или Xray Setting records.

# Поддерживаемый import text

| Format | Result |
| --- | --- |
| HTTPS subscription URL | Добавляет subscription row, обновляет URL и импортирует Outbound nodes. |
| Standard Xray share link | Импортирует Outbound nodes через libXray. |
| Multi-line Xray share text | Импортирует несколько Outbound nodes, если libXray может прочитать content. |
| Clash.Meta YAML | Импортирует Outbound nodes, если это поддерживает bundled libXray API. |
| Xray JSON | Импортирует Outbound nodes, если это поддерживает bundled libXray API. |

Subscriptions поддерживают только Outbound. Они не создают Raw Json, Xray Setting, GeoData, DNS, routing, inbounds, policy, stats, metrics или logs.

Raw Json и Xray Setting по-прежнему можно экспортировать как JSON text или JSON files со своих страниц, но generic import pipeline не принимает их как app-native records.

# Desktop CLI

CLI `onexray` доступен в desktop packages. Он подключается к запущенному приложению через local Automation API. Приложение должно быть открыто.

```text
Usage: onexray [options] <command>
```

Global options:

| Option | Meaning |
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

`onexray import` принимает один text value из `--text`, `--file` или standard input через `--file -`. CLI не разбирает content сам; он отправляет text в запущенное приложение через `POST /v1/import`.

`--file` предназначен для text files. QR image import выполняется в UI приложения.

# Automation API

Automation API доступен только на desktop. Он bind к `127.0.0.1` на случайном порту и требует bearer token.

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

Все requests должны включать:

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

Current import sources: `httpsSubscription` и `xrayShare`.

### `POST /v1/vpn/start`

Request:

```json
{
  "configId": 123
}
```

`configId` optional. Если он не указан, OneXray запускает default или last selected config.

### `POST /v1/vpn/stop`

Request body может быть empty JSON object:

```json
{
}
```

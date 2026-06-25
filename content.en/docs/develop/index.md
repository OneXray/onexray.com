---
title: Develop
weight: 4
---

This page documents interfaces intended for automation tools, AI agents, launchers, and integrations.

# Import Decision Order

When OneXray receives import text from the UI, desktop CLI, or Automation API, it uses this order:

1. Text starting with `https://` is treated as a subscription URL.
2. Other text is parsed as outbound share content by libXray.

The import pipeline no longer handles legacy private import text, GeoData import payloads, Raw Json records, or Xray Setting records.

# Supported Import Text

| Format | Result |
| --- | --- |
| HTTPS subscription URL | Adds a subscription row, refreshes the URL, and imports outbound nodes. |
| Standard Xray share link | Imports outbound nodes through libXray. |
| Multi-line Xray share text | Imports multiple outbound nodes when libXray can parse them. |
| Clash.Meta YAML | Imports outbound nodes when supported by the bundled libXray API. |
| Xray JSON | Imports outbound nodes when supported by the bundled libXray API. |

Subscriptions are outbound-only. They do not create Raw Json, Xray Setting, GeoData, DNS, routing, inbounds, policy, stats, metrics, or logs.

Raw Json and Xray Setting can still be exported as JSON text or JSON files from their own pages, but they are not accepted by the generic import pipeline as app-native records.

# Desktop CLI

The `onexray` CLI is available in desktop packages. It connects to the running app through the local Automation API. The app must be open.

```text
Usage: onexray [options] <command>
```

Global options:

| Option | Meaning |
| --- | --- |
| `--json` | Print machine-readable JSON envelope. |
| `--api <url>` | Override local Automation API base URL. |
| `--token <token>` | Override token. |
| `--session <path>` | Override Automation session file path. |
| `-v`, `--version` | Print CLI version. |
| `-h`, `--help` | Print help. |

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

`onexray import` accepts one text value from `--text`, `--file`, or standard input through `--file -`. The CLI sends the text to the running app through `POST /v1/import`; it does not parse the content itself.

`--file` is for text files. QR image import is an app UI feature.

# Automation API

The Automation API is desktop-only. It binds to `127.0.0.1` on a random port and requires a bearer token.

The app writes an `automation-session.json` file containing:

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

All requests must include:

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

Returns app version, build number, platform, and process id.

### `GET /v1/status`

Returns app version, VPN running state, running config id/name, start timestamp, duration, and selected Xray Setting id.

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

Current import sources are `httpsSubscription` and `xrayShare`.

### `POST /v1/vpn/start`

Request:

```json
{
  "configId": 123
}
```

`configId` is optional. If omitted, OneXray starts the default or last selected config.

### `POST /v1/vpn/stop`

Request body can be an empty JSON object:

```json
{
}
```

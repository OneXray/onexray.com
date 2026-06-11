---
title: Develop
weight: 4
---

This page documents interfaces intended for automation tools, AI agents, launchers, and integrations.

# Import Decision Order

When OneXray receives text from UI import, URL Scheme, CLI, or Automation API, it uses this order:

1. Text starting with `onexray://onexray.com` is parsed as OneXray URL Scheme.
2. Text starting with `https://` is parsed as a subscription URL.
3. Other text is parsed as Xray share content by libXray.

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

| Query or fragment | Meaning |
| --- | --- |
| `type` | `setting`, `outbound`, or `raw`. |
| `data` | Base64-encoded UTF-8 config text. |
| Fragment | Display name. Empty names become `anonymous`. |

The `data` query value should be URL-encoded after Base64 encoding.

### Config `data` Payload

`data` exists only on `/config/add`. It is not raw JSON in the URL.

Build it in this order:

1. Create the type-specific JSON payload as UTF-8 text.
2. Encode the UTF-8 bytes with standard Base64.
3. Percent-encode the Base64 string as a query value.

Use standard Base64. Do not use Base64URL.

Type-specific payloads:

| `type` | Plain text before Base64 | Import behavior |
| --- | --- | --- |
| `outbound` | Xray JSON object with an `outbounds` array. | OneXray reads only the first outbound item and imports it as a local node. |
| `setting` | Full Xray Setting JSON object. | OneXray imports it as a structured Xray Setting. |
| `raw` | Full Raw Config JSON text. | OneXray stores it as Raw Config after validation. |

`outbound` payload shape:

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

For `outbound`, the saved name is read from the first outbound item. OneXray checks `name`, then `sendThrough`, then `tag`, then `protocol`.

`setting` payload shape:

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

For `setting`, the saved name is read from the top-level `name` field.

`raw` payload shape:

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

For `raw`, the URL fragment is used as the database display name. The JSON still needs its own top-level `name` because Raw Config validation requires it.

Example construction:

```text
jsonText = compact-or-pretty-json
data = percentEncode(base64Encode(utf8Encode(jsonText)))
url = onexray://onexray.com/config/add?type=setting&data=<data>#My%20Setting
```

## Subscription

```text
onexray://onexray.com/sub/add?url=<url>#<name>
```

| Query or fragment | Meaning |
| --- | --- |
| `url` | Subscription download URL. |
| Fragment | Subscription name. Empty names become `anonymous`. |

## GeoData

```text
onexray://onexray.com/dat/add?type=domain&url=<url>#<name>
onexray://onexray.com/dat/add?type=ip&url=<url>#<name>
```

| Query or fragment | Meaning |
| --- | --- |
| `type` | `domain` or `ip`. |
| `url` | `.dat` download URL. |
| Fragment | GeoData name. Empty names become `anonymous`. |

Multi-line OneXray share text is supported. Each line is parsed independently.

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

## CLI Import Formats

`onexray import` accepts one import text value from `--text`, `--file`, or standard input through `--file -`. The CLI does not parse the content itself; it sends the text to the running app through `POST /v1/import`.

Supported CLI import text formats:

| Format | Example | Result |
| --- | --- | --- |
| OneXray URL Scheme | `onexray://onexray.com/config/add?...` | Imports configs, subscriptions, or GeoData. |
| HTTPS subscription URL | `https://example.com/sub.txt#Name` | Adds and downloads a subscription. |
| Xray share link | `vless://...`, `vmess://...`, `trojan://...`, `ss://...`, SOCKS or Hysteria share text accepted by bundled libXray. | Imports outbound nodes. OneXray local outbound models support `vless`, `vmess`, `shadowsocks`, `trojan`, `socks`, and `hysteria`. |
| Multi-line Xray share text | One share link per line. | Imports multiple outbound nodes. |
| Clash.Meta YAML | YAML text in `--text`, a text file, or stdin. | Imports outbound nodes when supported by the bundled libXray API. |
| Xray JSON | JSON text in `--text`, a text file, or stdin. | Imports outbound nodes when supported by the bundled libXray API. |
| Multi-line OneXray share text | One `onexray://onexray.com/...` link per line. | Imports each OneXray share item independently. |

`--file` is for text files. QR image import is an app UI feature, not a CLI file format.

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

`source` can be `oneXrayShare`, `httpsSubscription`, or `xrayShare`.

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

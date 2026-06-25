---
title: 开发
weight: 4
---

本页面向自动化工具、AI Agent、启动器和集成工具。

# 导入判断顺序

当 OneXray 从 UI、桌面端 CLI 或 Automation API 收到导入文本时，按以下顺序判断：

1. 以 `https://` 开头的文本按订阅 URL 处理。
2. 其他文本交给 libXray 按 Outbound 分享内容解析。

当前导入流程不再处理旧私有导入文本、GeoData 导入 payload、Raw Json 记录或 Xray Setting 记录。

# 支持的导入文本

| 格式 | 结果 |
| --- | --- |
| HTTPS 订阅 URL | 添加订阅行，刷新 URL，并导入 Outbound 节点。 |
| 标准 Xray 分享链接 | 通过 libXray 导入 Outbound 节点。 |
| 多行 Xray 分享文本 | libXray 支持时导入多个 Outbound 节点。 |
| Clash.Meta YAML | 内置 libXray API 支持时导入 Outbound 节点。 |
| Xray JSON | 内置 libXray API 支持时导入 Outbound 节点。 |

订阅只支持 Outbound。订阅不会创建 Raw Json、Xray Setting、GeoData、DNS、routing、inbounds、policy、stats、metrics 或 logs。

Raw Json 和 Xray Setting 仍然可以从各自页面导出为 JSON 文本或 JSON 文件，但不会通过通用导入流程作为 App 内部记录导入。

# 桌面端 CLI

桌面端包提供 `onexray` CLI。CLI 通过本地 Automation API 连接正在运行的 App，因此 App 必须保持打开。

```text
Usage: onexray [options] <command>
```

全局选项：

| 选项 | 含义 |
| --- | --- |
| `--json` | 输出机器可读 JSON envelope。 |
| `--api <url>` | 覆盖本地 Automation API base URL。 |
| `--token <token>` | 覆盖 token。 |
| `--session <path>` | 覆盖 Automation session 文件路径。 |
| `-v`, `--version` | 输出 CLI 版本。 |
| `-h`, `--help` | 输出帮助。 |

命令：

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

`onexray import` 从 `--text`、`--file` 或 `--file -` 标准输入接收一份文本。CLI 不解析内容本身，而是通过 `POST /v1/import` 发送给正在运行的 App。

`--file` 用于文本文件。二维码图片导入属于 App UI 功能。

# Automation API

Automation API 仅支持桌面端。它绑定到 `127.0.0.1` 的随机端口，并要求 bearer token。

App 会写入 `automation-session.json`：

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

候选 session 路径：

| 平台 | 路径 |
| --- | --- |
| macOS | `~/Library/Group Containers/2CKAULFA9J.net.yuandev.onexray/run/automation-session.json`、`~/Library/Group Containers/group.net.yuandev.onexray.se/run/automation-session.json`、`~/Library/Application Support/OneXray/run/automation-session.json` |
| Windows | `%APPDATA%\\OneXray\\run\\automation-session.json` |
| Linux | `$XDG_RUNTIME_DIR/onexray/automation-session.json`、`$XDG_CONFIG_HOME/onexray/run/automation-session.json`、`~/.config/onexray/run/automation-session.json`、`~/.local/share/onexray/run/automation-session.json` |

所有请求都必须包含：

```http
Authorization: Bearer <token>
```

## Response Envelope

成功：

```json
{
  "ok": true,
  "data": {}
}
```

失败：

```json
{
  "ok": false,
  "code": "invalid_request",
  "message": "Request body must be a JSON object."
}
```

## Endpoints

### `GET /v1/health`

返回 App version、build number、platform 和 process id。

### `GET /v1/status`

返回 App version、VPN 运行状态、运行中的 config id/name、启动时间、运行时长和当前 Xray Setting id。

### `POST /v1/import`

请求：

```json
{
  "text": "vless://..."
}
```

响应示例：

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

当前导入来源为 `httpsSubscription` 和 `xrayShare`。

### `POST /v1/vpn/start`

请求：

```json
{
  "configId": 123
}
```

`configId` 可省略。省略时 OneXray 启动默认或上次选择的配置。

### `POST /v1/vpn/stop`

请求体可以是空 JSON object：

```json
{
}
```

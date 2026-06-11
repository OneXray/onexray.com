---
title: 开发
weight: 4
---

本页记录面向自动化工具、AI Agent、启动器和集成方的接口。

# 导入判断顺序

当 OneXray 从 UI 导入、URL Scheme、CLI 或 Automation API 收到文本时，按以下顺序判断：

1. 以 `onexray://onexray.com` 开头的文本按 OneXray URL Scheme 解析。
2. 以 `https://` 开头的文本按订阅 URL 解析。
3. 其他文本交给 libXray 按 Xray 分享内容解析。

# OneXray URL Scheme

基础地址：

```text
onexray://onexray.com
```

## Config

```text
onexray://onexray.com/config/add?type=setting&data=<base64>#<name>
onexray://onexray.com/config/add?type=outbound&data=<base64>#<name>
onexray://onexray.com/config/add?type=raw&data=<base64>#<name>
```

| Query 或 fragment | 含义 |
| --- | --- |
| `type` | `setting`、`outbound` 或 `raw`。 |
| `data` | Base64 编码的 UTF-8 配置文本。 |
| Fragment | 显示名称。名称为空时使用 `anonymous`。 |

`data` 应先 Base64，再进行 URL 编码。

### Config `data` 组织方式

`data` 只存在于 `/config/add`。它不是直接放在 URL 里的原始 JSON。

生成顺序：

1. 按 `type` 生成对应的 JSON 文本。
2. 将 JSON 文本按 UTF-8 转为 bytes。
3. 使用标准 Base64 编码 bytes。
4. 将 Base64 字符串作为 query value 进行百分号编码。

这里使用标准 Base64，不使用 Base64URL。

不同 `type` 的明文内容：

| `type` | Base64 前的明文 | 导入行为 |
| --- | --- | --- |
| `outbound` | 包含 `outbounds` 数组的 Xray JSON object。 | OneXray 只读取第一个 outbound，并导入为本地节点。 |
| `setting` | 完整的 Xray Setting JSON object。 | OneXray 导入为结构化 Xray Setting。 |
| `raw` | 完整 Raw Config JSON 文本。 | 校验通过后保存为 Raw Config。 |

`outbound` payload 结构：

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

`outbound` 的保存名称从第一个 outbound 中读取，顺序是 `name`、`sendThrough`、`tag`、`protocol`。

`setting` payload 结构：

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

`setting` 的保存名称从顶层 `name` 字段读取。

`raw` payload 结构：

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

`raw` 的数据库显示名称使用 URL fragment。JSON 内仍然需要顶层 `name`，因为 Raw Config 校验会检查它。

构造示例：

```text
jsonText = compact-or-pretty-json
data = percentEncode(base64Encode(utf8Encode(jsonText)))
url = onexray://onexray.com/config/add?type=setting&data=<data>#My%20Setting
```

## Subscription

```text
onexray://onexray.com/sub/add?url=<url>#<name>
```

| Query 或 fragment | 含义 |
| --- | --- |
| `url` | 订阅下载地址。 |
| Fragment | 订阅名称。名称为空时使用 `anonymous`。 |

## GeoData

```text
onexray://onexray.com/dat/add?type=domain&url=<url>#<name>
onexray://onexray.com/dat/add?type=ip&url=<url>#<name>
```

| Query 或 fragment | 含义 |
| --- | --- |
| `type` | `domain` 或 `ip`。 |
| `url` | `.dat` 下载地址。 |
| Fragment | GeoData 名称。名称为空时使用 `anonymous`。 |

支持多行 OneXray 分享文本，每一行会独立解析。

# 桌面端 CLI

桌面端包内包含 `onexray` CLI。它通过本地 Automation API 连接正在运行的 App。使用前必须打开 App。

```text
Usage: onexray [options] <command>
```

全局参数：

| 参数 | 含义 |
| --- | --- |
| `--json` | 输出机器可读 JSON envelope。 |
| `--api <url>` | 覆盖本地 Automation API base URL。 |
| `--token <token>` | 覆盖 token。 |
| `--session <path>` | 覆盖 Automation session 文件路径。 |
| `-v`、`--version` | 输出 CLI 版本。 |
| `-h`、`--help` | 输出帮助。 |

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

## CLI 支持的导入格式

`onexray import` 通过 `--text`、`--file` 或 `--file -` 标准输入接收一段导入文本。CLI 不自行解析内容，而是把文本发送给正在运行的 App，由 `POST /v1/import` 处理。

CLI 支持的文本格式：

| 格式 | 示例 | 结果 |
| --- | --- | --- |
| OneXray URL Scheme | `onexray://onexray.com/config/add?...` | 导入配置、订阅或 GeoData。 |
| HTTPS 订阅 URL | `https://example.com/sub.txt#Name` | 添加并下载订阅。 |
| Xray 分享链接 | `vless://...`、`vmess://...`、`trojan://...`、`ss://...`，以及内置 libXray 可识别的 SOCKS 或 Hysteria 分享文本。 | 导入为节点。OneXray 本地 outbound model 支持 `vless`、`vmess`、`shadowsocks`、`trojan`、`socks`、`hysteria`。 |
| 多行 Xray 分享文本 | 每行一条分享链接。 | 一次导入多个节点。 |
| Clash.Meta YAML | 通过 `--text`、文本文件或 stdin 传入 YAML 文本。 | 在内置 libXray API 支持时导入为节点。 |
| Xray JSON | 通过 `--text`、文本文件或 stdin 传入 JSON 文本。 | 在内置 libXray API 支持时导入为节点。 |
| 多行 OneXray 分享文本 | 每行一条 `onexray://onexray.com/...` 链接。 | 逐行导入 OneXray 分享内容。 |

`--file` 用于文本文件。二维码图片导入属于 App UI 功能，不属于 CLI 文件格式。

# Automation API

Automation API 仅适用于桌面端。它绑定到 `127.0.0.1` 的随机端口，并要求 bearer token。

App 会写出 `automation-session.json`：

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

## 响应 Envelope

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

返回 App 版本、build number、平台和进程 id。

### `GET /v1/status`

返回 App 版本、VPN 运行状态、运行中的配置 id/name、启动时间、运行时长和当前 Xray Setting id。

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

`source` 可为 `oneXrayShare`、`httpsSubscription` 或 `xrayShare`。

### `POST /v1/vpn/start`

请求：

```json
{
  "configId": 123
}
```

`configId` 可省略。省略时，OneXray 启动默认或上次选中的配置。

### `POST /v1/vpn/stop`

请求体可为空 JSON object：

```json
{
}
```

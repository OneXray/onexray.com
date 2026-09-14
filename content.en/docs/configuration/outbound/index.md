---
title: "Outbound JSON"
description: "Generate an importable server document while preserving protocol, transport, TLS and REALITY settings."
weight: 10
ai_order: 40
lastmod: 2026-09-14
---

A node file is an object containing an `outbounds` array. Manual single-node editing requires exactly one element. Normal file/text import can extract multiple nodes. Use Servers → Add server → Manual JSON, or Import file.

The root is not a bare outbound object. Routing, DNS and inbounds in an ordinary server import are not installed as a full configuration.

## Collect the server's actual parameters

| Area | Required information |
| --- | --- |
| Identity | Display `tag`, protocol, server address and numeric port |
| VLESS / VMess | Actual user UUID; provider's encryption/security and flow where applicable |
| Trojan / Shadowsocks / SOCKS | Password, encryption method or username/password as required by that protocol |
| Transport | Provider's network, path, Host, service name and other transport parameters |
| TLS | Whether enabled, certificate server name and optional provider-required ALPN/fingerprint |
| REALITY | Server name, fingerprint, public key/password, short ID and required flow |

Do not infer these values from a server's display name or country. Do not add `allowInsecure`, TLS bypasses or a Vision flow merely to make an error disappear. Match the server configuration.

## VLESS over TLS

Template: replace `server.example.com`, port and dummy UUID; confirm that the server uses RAW/TCP with TLS. The TLS server name can differ from the address: copy the provider's value.

{{% json-example "outbound-vless-tls.json" %}}

For XHTTP, replace the transport with the provider's `network: "xhttp"` and `xhttpSettings` (`host`, `path`, `mode`, and any required `extra`). For WebSocket use `network: "ws"` and `wsSettings` (`host`, `path`). These are alternatives, not settings to combine indiscriminately. For gRPC use the provider's `grpcSettings.serviceName`.

## VLESS over REALITY

Template: the public key placeholder is deliberately unresolved. Replace it and every provider-specific value before saving. `realitySettings.password` here carries the server's public key, not its private key. Add user `flow` only when required.

{{% json-example "outbound-vless-reality.json" %}}

## VMess over WebSocket and TLS

Template: replace the host, UUID, path and transport details. This is a normal Xray outbound, **not** the retired `vmess://Base64(JSON)` VMessQrCode format.

{{% json-example "outbound-vmess-ws.json" %}}

## Other proxy protocols

The same envelope preserves complete protocol settings; OneXray does not rebuild nodes from a fixed form.

- Trojan: `settings.servers` contains `address`, `port`, `password`; transport/TLS belongs in `streamSettings`.
- Shadowsocks: `settings.servers` contains `address`, `port`, `method`, `password`; copy the provider's exact cipher/key requirements.
- SOCKS: `settings.servers` contains `address`, `port`, and optional `users: [{"user":"…","pass":"…"}]`. SOCKS itself is not encrypted; do not describe it as TLS.
- Additional Core protocols should be used only when the bundled Core supports their exact JSON. Lack of a standard share URI does not imply lack of native JSON support.

Protocol references: [VLESS](https://xtls.github.io/config/outbounds/vless.html), [VMess](https://xtls.github.io/config/outbounds/vmess.html), [Trojan](https://xtls.github.io/config/outbounds/trojan.html), [Shadowsocks](https://xtls.github.io/config/outbounds/shadowsocks.html), [SOCKS](https://xtls.github.io/config/outbounds/socks.html). Check the [version boundary]({{< relref "/docs/configuration/compatibility" >}}) before using newer fields.

## Naming, dependencies and sharing

Use `tag` for the node name. Do not generate the old `name` alias or abuse `sendThrough`. Normal mode assigns runtime tags, so another imported node's display tag is not a stable cross-node reference. For a final exit use Smart Routing's final-exit selection; for fully specified chains use Raw JSON.

Do not put cross-node `dialerProxy` or `proxySettings.tag` references in an independent node template. Keep dependencies together in Raw JSON instead.

JSON preserves more information than standard share links. VMessAEAD/VLESS links, Shadowsocks, SOCKS and Trojan remain supported; legacy VMessQrCode is not. For AI generation, prefer the full JSON document and the [correct import path]({{< relref "/docs/configuration" >}}).

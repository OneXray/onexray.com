---
title: Outbound-узлы
weight: 2
---

Outbound-узел — переиспользуемый профиль Xray outbound. Он хранит протокол proxy, адрес сервера, transport, TLS или REALITY, mux и socket options.

# Runtime Tag

При запуске узла OneXray назначает выбранному узлу зарезервированный runtime tag:

```text
proxy
```

Routing rules в Xray Profile должны использовать `proxy` для активного выходного узла.

# Семейства outbound

Редактор следует концепциям Xray-core outbound и показывает поля в зависимости от протокола и transport.

| Область | Примеры |
| --- | --- |
| Protocol | VLESS, VMess, Trojan, Shadowsocks, SOCKS, HTTP, Hysteria2. |
| Transport | raw, TCP header, WebSocket, HTTPUpgrade, XHTTP, gRPC, KCP, Hysteria. |
| Security | TLS, REALITY, ECH-поля, fingerprints, ALPN, pinned certificates. |
| Mux | mux enablement, concurrency, XUDP behavior. |
| Socket options | TCP Fast Open, MPTCP, network interface, dialer proxy. |

# Chain Proxy

Если настроен chain proxy, активный outbound все равно записывается как `proxy`, но его `dialerProxy` устанавливается в:

```text
chainProxy
```

Один и тот же узел нельзя использовать одновременно как активный outbound и chain proxy. OneXray отклоняет такой запуск.

# Fragment

Страница Xray Profile содержит системный outbound `fragment`. Используйте routing rules для отправки выбранного трафика в `fragment`, если нужно поведение freedom fragmentation.

# Network Interface

Socket option `interface` имеет смысл только на Linux и Windows. Если поле пустое, startup fixer может применить интерфейс из TUN settings.

# Связанные страницы

- [Xray Profile]({{< relref path="xrayProfile/index.md" lang="ru" >}})
- [TUN Settings]({{< relref path="../../setting/tun/index.md" lang="ru" >}})
- [AI Reference]({{< relref path="../../reference/index.md" lang="ru" >}})

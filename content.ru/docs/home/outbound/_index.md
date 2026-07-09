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

# Final Outbound

Без Final Outbound активный Home node записывается как:

```text
proxy
```

Если Final Outbound настроен, Final Outbound записывается как `proxy`. Активный Home node записывается как:

```text
chainProxy
```

Затем OneXray устанавливает `proxy.dialerProxy` в `chainProxy`, поэтому Home node работает как dialer relay, а Final Outbound является финальным выходом. Один и тот же узел нельзя использовать одновременно как активный Home node и Final Outbound. OneXray отклоняет такой запуск.

# Fragment

Страница Xray Profile содержит системный outbound `fragment`. Используйте routing rules для отправки выбранного трафика в `fragment`, если нужно поведение freedom fragmentation.

# Network Interface

Socket option `interface` имеет смысл только на Linux и Windows. Если поле пустое, startup fixer может применить интерфейс из TUN settings.

# Связанные страницы

- [Xray Profile]({{< relref path="xrayProfile/index.md" lang="ru" >}})
- [TUN Settings]({{< relref path="../../setting/tun/index.md" lang="ru" >}})
- [AI Reference]({{< relref path="../../reference/index.md" lang="ru" >}})

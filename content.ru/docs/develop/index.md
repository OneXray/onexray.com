---
title: Develop
weight: 4
---

Эта страница описывает import behavior и runtime data semantics для advanced users и integrations.

# Порядок определения import text

Когда OneXray получает import text из UI приложения, используется такой порядок:

1. Текст, начинающийся с `https://`, обрабатывается как subscription URL.
2. Остальной текст разбирается libXray как Outbound share content.

Import pipeline больше не обрабатывает legacy private import text, GeoData import payloads, Full Config records, Raw Json records или Xray Profile records.

# Поддерживаемый import text

| Format | Result |
| --- | --- |
| HTTPS subscription URL | Добавляет subscription row, обновляет URL и импортирует Outbound nodes. |
| Standard Xray share link | Импортирует Outbound nodes через libXray. |
| Multi-line Xray share text | Импортирует несколько Outbound nodes, если libXray может прочитать content. |
| Clash.Meta YAML | Импортирует Outbound nodes, если это поддерживает bundled libXray API. |
| Xray JSON | Импортирует Outbound nodes, если это поддерживает bundled libXray API. |

Subscriptions поддерживают только Outbound. Они не создают Full Config, Raw Json, Xray Profile, GeoData, DNS, routing, inbounds, policy, stats, metrics или logs.

Raw Json и Xray Profile по-прежнему можно экспортировать как JSON text или JSON files со своих страниц, но generic import pipeline не принимает их как app-native records.

# Desktop Integration

Desktop packages содержат только приложение. Start, stop, import, export, backup и restore выполняются через UI OneXray.

OneXray не предоставляет стабильный local machine-control interface. External tools должны рассматривать описанные JSON как data formats, а не как runtime control contract.

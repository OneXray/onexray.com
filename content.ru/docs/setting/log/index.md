---
title: Log
weight: 5
---

Страница Log показывает diagnostic files.

| Item | Значение |
| --- | --- |
| App log | Application log OneXray. |
| Xray access log | Xray-core access log, если включен. |
| Xray error log | Xray-core error log, если включен. |
| Xray config file | Финальный generated JSON, который читает Xray-core. |

# Xray Logs

Xray logs управляются выбранным Xray Profile или Simple Profile.

Для структурированного Xray Profile:

```text
Xray Profile > Edit Log
```

Для Simple Profile:

```text
Simple Profile > Log > Enable Log
```

На macOS с включенным System Extension mode OneXray принудительно отключает Xray logs в runtime configs.

# Generated Config

Generated Xray config file — главный диагностический артефакт. Он показывает точный JSON, который Xray-core читает после runtime fixes OneXray.

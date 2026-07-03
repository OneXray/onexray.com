---
title: Log
weight: 5
---

The Log page exposes diagnostic files.

| Item | Meaning |
| --- | --- |
| App log | OneXray application log. |
| Xray access log | Xray-core access log when enabled. |
| Xray error log | Xray-core error log when enabled. |
| Xray config file | The final generated JSON used by Xray-core. |

# Xray Logs

Xray logs are controlled by the selected Xray Profile or Simple Profile.

For structured Xray Profile:

```text
Xray Profile > Edit Log
```

For Simple Profile:

```text
Simple Profile > Log > Enable Log
```

On macOS with System Extension mode enabled, OneXray forces Xray logs off for runtime configs.

# Generated Config

The generated Xray config file is the best troubleshooting artifact. It shows the exact JSON that Xray-core reads after OneXray applies runtime fixes.

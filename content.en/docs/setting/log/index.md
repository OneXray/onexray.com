---
title: Logs
weight: 5
---

Logs are a section of the Core page rather than a separate root page.

| Item | Behavior |
| --- | --- |
| Access Log | Opens the Xray access log when available. |
| Error Log | Opens Xray diagnostics and runtime errors. |
| Xray Config | Opens the generated Final Config used by Xray-core. |

The access/error viewer initially reads only the most recent 1 MiB, polls for appended content, and follows the bottom until you scroll upward. Use the follow control to return to live output. This keeps very large log files responsive.

The config viewer uses selectable monospaced text, so JSON can be selected and copied directly. Access/error files retain their share/save menu where the platform supports it.

Xray log level is controlled by the selected Xray Profile. macOS System Extension mode disables Xray file logs at runtime, so access/error entries are hidden in that mode.

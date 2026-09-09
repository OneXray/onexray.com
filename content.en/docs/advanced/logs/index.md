---
title: "Logs and generated configuration"
description: "View separate Xray access/error logs and the actual generated configuration; understand local-only logging and OneXraySE limits."
weight: 80
lastmod: 2026-09-09
---

Open Advanced > Xray.

## Local logs

Access and error logs are separate viewers controlled by **one recording switch**. DNS-query logging defaults to on within the log policy; it does not enable logging when the main switch is off.

- Access log: connection access entries produced by Xray.
- Error log: Xray runtime messages at the selected log level.

The viewers support local viewing and export where available. They do not provide pause or delete actions. Logs follow Xray-core's behavior; do not assume addresses or credentials have been redacted.

**macOS OneXraySE hides the entire log section.** It does not offer native file-log reading. Mac App Store and the other supported editions retain local log controls.

## Generated configuration

The read-only configuration page shows the latest actual Xray configuration, not just the source node or Raw document. This is useful for checking managed tunnel, DNS, routing, and outbound fields.

You can inspect or copy it, but changes belong in Smart/Custom settings or the Raw JSON editor. There is no “copy diagnostic summary” action.

Changing active log/runtime settings requires saving and reconnecting. Raw JSON cannot replace the app's logging policy.

Configurations and logs may contain sensitive endpoints or credentials. Review them before exporting or posting an issue.

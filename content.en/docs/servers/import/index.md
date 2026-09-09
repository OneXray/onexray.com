---
title: "Add servers"
description: "Import links, subscriptions, node JSON, YAML, files, and QR codes into OneXray without a second node confirmation."
weight: 10
lastmod: 2026-09-09
---

Open Servers > Add servers, or choose an import action during initial setup.

| Action | Behavior |
| --- | --- |
| Read clipboard | Open the pasted text for submission |
| Add subscription | Enter a name, HTTPS URL, and optional age settings |
| Import file | Open the system file picker directly |
| Manual add | Open a JSON editor, not protocol-specific form fields |
| Scan QR code | Open the scanner on iOS/Android only |

Supported input includes compatible protocol share links, Xray JSON nodes, and supported Clash/Mihomo YAML nodes. Text files and QR images can use the file-import path.

## Import scope

A normal server import extracts outbounds only. It does not apply the source document's routing, DNS, or other complete-configuration settings. Use [Custom Routing]({{< relref "/docs/connect/custom-routing" >}}) or [Raw JSON]({{< relref "/docs/connect/raw-json" >}}) for those workflows.

For batch subscriptions, use one HTTPS URL per line:

```text
https://example.com/sub-one#Personal
https://example.com/sub-two#Work
```

The fragment supplies the initial display name and is not part of the saved request URL. These are format examples, not working subscriptions.

## Completion and errors

Ordinary nodes are parsed and saved after submission, file selection, or scanning. There is no extra node-preview confirmation. The app reports the number imported; if no valid nodes are found, it saves nothing and reports an error.

New nodes enter the shared test queue after import. Tests do not block finishing import or entering Connect from setup. Complete Raw/Custom configurations and routing-data dependencies keep their own preview/confirmation step.

Node validity follows libXray. Imported protocol support does not imply that every setting from another client's full configuration is supported.

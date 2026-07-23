---
title: Routing
weight: 6
---

# Home Routing Modes

The Home selector controls the final traffic policy:

| Mode | Behavior |
| --- | --- |
| Rule | Uses the selected Xray Profile or Full Config routing rules. |
| Global | Sends all traffic through `proxy`; removes runtime DNS/routing and keeps only the proxy dependency chain. |
| Direct | Sends all traffic through `direct`; the selected node is not used. |

Changing the mode while connected restarts the Core.

# Enhanced Routing Templates

Advanced templates are maintained in [OneXray/Routing](https://github.com/OneXray/Routing).

| Region | Template | Custom GeoData |
| --- | --- | --- |
| China | [cn.json](https://github.com/OneXray/Routing/raw/refs/heads/main/cn.json) | `EnhancedGeoSite`, `EnhancedGeoIP` |
| Iran | [ir.json](https://github.com/OneXray/Routing/raw/refs/heads/main/ir.json) | `IranGeoSite` |
| Russia | [ru.json](https://github.com/OneXray/Routing/raw/refs/heads/main/ru.json) | `RussiaGeoSite`, `RussiaGeoIP` |

1. Add the required files under `Core > GeoData`.
2. Open the template from `Core > Import Enhanced Routing`.
3. Create or edit an Xray Profile and use Raw Edit to paste the template.
4. Save and select that profile.

The templates provide profile-level DNS and routing. OneXray still supplies the selected node and all runtime-owned fields.

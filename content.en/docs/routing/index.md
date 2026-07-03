---
title: Routing
weight: 6
---

OneXray routing templates are maintained as Xray Profile JSON files in the [OneXray/Routing](https://github.com/OneXray/Routing) repository.

| Region | Template | Custom GeoData dependencies |
| --- | --- | --- |
| China | [cn.json](https://github.com/OneXray/Routing/raw/refs/heads/main/cn.json) | `EnhancedGeoSite`, `EnhancedGeoIP` |
| Iran | [ir.json](https://github.com/OneXray/Routing/raw/refs/heads/main/ir.json) | `IranGeoSite` |
| Russia | [ru.json](https://github.com/OneXray/Routing/raw/refs/heads/main/ru.json) | `RussiaGeoSite`, `RussiaGeoIP` |

# How to Use

1. Open `Core > GeoData` in OneXray.
2. Add the required custom GeoData entries with the exact names shown above.
3. Open the matching JSON template link and copy or download the JSON.
4. In OneXray, open `Core > Xray Profiles > Add > Raw Edit`.
5. Paste the template JSON, save it, then select that Xray Profile.

The templates contain `name`, `dns`, and `routing`. They do not contain app runtime fields such as `inbounds`, `outbounds`, `log`, `policy`, `stats`, or `metrics`. The selected outbound node is still injected by OneXray at VPN startup as the runtime `proxy` outbound.

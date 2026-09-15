---
title: "Geodata dependencies"
description: "Use real DAT categories and explicit custom asset dependencies instead of guessing region or service names."
weight: 50
ai_order: 80
lastmod: 2026-09-15
---

Geosite matches domains; GeoIP matches IP ranges. They are not interchangeable country databases.

## Default files

OneXray uses `geosite.dat` from [domain-list-community](https://github.com/v2fly/domain-list-community/releases/latest/download/dlc.dat) and `geoip.dat` from [v2fly/geoip](https://github.com/v2fly/geoip/releases/latest/download/geoip.dat). They are managed together under Advanced → Xray → Routing data. Default updates replace the pair together.

Common categories used by the documented Smart-equivalent recipe:

| Purpose | Domain condition | IP condition |
| --- | --- | --- |
| Private/local destinations | `geosite:PRIVATE` | `geoip:PRIVATE` |
| Mainland China | `geosite:CN` | `geoip:CN` |
| Apple | `geosite:APPLE` | No equivalent required by this recipe |
| Microsoft services | `geosite:MICROSOFT`, `geosite:BING` | No equivalent required |
| GitHub exception | `geosite:GITHUB` | No equivalent required |
| Ads | `geosite:CATEGORY-ADS-ALL` | No equivalent required |

Do not invent `geosite:WINDOWS` or `geosite:OFFICE`; those labels are not the categories used by this recipe. Microsoft/Bing are the actual service groups.

Region selection is not “country code → identical Geosite category”. For example, the App maps Russian domains to `CATEGORY-RU`, while IPs use `RU`. The [region mapping snapshot](/examples/regions.json) records the App's mapping, not a promise that every installed DAT release contains every category. Many regions have IP rules only.

Use the installed file's category list/autocomplete as the final authority. Unknown custom filenames or categories must be requested from the user. Do not infer a category from a filename or fabricate a download URL.

## Custom dependencies

Use `ext:filename.dat:category` in domain or IP rules, selecting the matching DAT type. File names are flat, safe `.dat` names: no parent paths or nested directories.

An imported Custom Routing document can carry this **fragment** in addition to its other required fields; it is not a standalone import file:

```json
{
  "geodata": {
    "assets": [
      {
        "file": "company-domains.dat",
        "url": "https://rules.example.com/company-domains.dat"
      }
    ]
  }
}
```

The URL is a placeholder, not a usable dependency. Ask for the actual HTTPS file and category. Each entry has only `file` and `url`. Omit default `geosite.dat` and `geoip.dat`; do not redefine them as custom assets.

Custom import downloads the declared dependencies. Every declared asset must be referenced in a supported semantic field. Besides routing rules, Advanced Custom scans DNS hosts keys, server domains/expected or unexpected IPs, inbound sniffing exclusions and DNS-outbound rule domains. Arbitrary strings such as passwords are not dependencies. Filename conflicts are rejected, not silently overwritten. Custom stores routing JSON without import-only `geodata`; sharing reconstructs dependencies from the installed custom files.

Raw is different: a plain Raw JSON file does not use root `geodata.assets` to download dependencies. Install its custom files first through Routing data, or use OneXray's Raw sharing flow, which supplies separate `/dat/add` App Links alongside the Raw configuration link. Raw export retains the source text, and runtime removes root `geodata`. Do not promise a self-contained Raw dependency download by adding that field. See [sharing formats]({{< relref "/docs/sharing" >}}).

## Updates and failure behavior

Automatic Geodata updates run only while VPN is connected. Startup, foreground and scheduled checks while disconnected do not fetch them. Update failure preserves the old files and does not disconnect or reconnect VPN.

Manual updates and explicit import dependency downloads are separate. Required files must already exist for configuration validation/startup; a missing file is an error, not a trigger to download through a not-yet-running VPN. Do not promise atomic category stability across future upstream releases.

[Manage routing data]({{< relref "/docs/advanced/geodata" >}}) · [Troubleshooting]({{< relref "/docs/troubleshooting" >}})

---
title: "Routing data"
description: "Manage default GeoSite/GeoIP together and add custom HTTPS GeoData sources with explicit file names."
weight: 50
lastmod: 2026-09-09
---

Open Advanced > Xray > Routing data. GeoData supplies the domain and IP categories used in routing and editor suggestions.

## Default routing data

The default section contains:

- geosite.dat — domain categories from [domain-list-community](https://github.com/v2fly/domain-list-community).
- geoip.dat — IP categories from [geoip](https://github.com/v2fly/geoip).

Use the section's Update button to update **both files together**. They cannot be updated separately or deleted.

## Custom routing data

Add a source with a name/file name, a domain or IP type, and an HTTPS download URL. The name identifies the saved file used by rules such as ext:other.dat:cn.

Each source can be inspected, updated, or deleted. There is no local file-import action. The app downloads and validates the data before making it available.

Files live in one flat managed directory. Subdirectories and conflicting file names are not supported. Do not manually move files while the app is using them.

## Categories and routes

Domain/IP rule inputs suggest categories from installed data. Direct-region choices also depend on actual default categories; a country name alone does not create a valid GeoSite or GeoIP entry.

Deleting a custom source can make routes that reference it invalid. Remove or update those references before using the route again.

A shared Custom/Raw configuration can declare custom dependencies by file name and URL. Import rejects a name conflict instead of overwriting an existing source. [Sharing format]({{< relref "/docs/sharing" >}}).

Data updates apply to later starts; they do not hot-replace the rules loaded by an active core. Configure schedules in [Data updates]({{< relref "/docs/advanced/data-updates" >}}).

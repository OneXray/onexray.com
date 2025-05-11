---
title: Develop
weight: 4
---

# OneXray URL Scheme

OneXray private sharing protocol supports one-click opening of the app and importing of configurations.

## Xray Setting

```
onexray://onexray.com/config/add?core=xray&type=setting&data=yourBase64Data#name
```

`data` is the text encoded by XrayJson with base64. It is recommended that you escape it with `encodeURIComponent`.

`name` is the configuration name. It is recommended that you escape it with `encodeURIComponent`.

Note: When you want to share the routing configuration, please also share the associated rule set data. The following import method is supported.

Share links generated via OneXray will automatically include the ruleset data.

```
onexray://onexray.com/dat/add?type=domain&url=yourDownloadLink#name
onexray://onexray.com/dat/add?type=ip&url=yourDownloadLink#name
onexray://onexray.com/config/add?core=xray&type=setting&data=yourBase64Data#name
```

## Outbound

Although the app supports this sharing method, it is recommended that you still use the [common protocol]({{< relref path="../share/index.md" lang="en">}}) to avoid duplicate development.

```
onexray://onexray.com/config/add?core=xray&type=outbound&data=yourBase64Data#name
```

`data` is the text encoded by XrayJson with base64. It is recommended that you escape it with `encodeURIComponent`.

`name` is the outbound name. It is recommended that you escape it with `encodeURIComponent`.

## Full Config

The "Full Config" supports only Xray-core.

```
onexray://onexray.com/config/add?core=xray&type=full&data=yourBase64Data#name
```

`data` is the text encoded by XrayJson with base64. It is recommended that you escape it with `encodeURIComponent`.

`name` is the configuration name. It is recommended that you escape it with `encodeURIComponent`.

## Raw Config

```
onexray://onexray.com/config/add?core=xray&type=raw&data=yourBase64Data#name
```

`data` is the text encoded by XrayJson with base64. It is recommended that you escape it with `encodeURIComponent`.

`name` is the configuration name. It is recommended that you escape it with `encodeURIComponent`.

## Subscription

```
onexray://onexray.com/sub/add?url=yourDownloadLink#name
```

`url` is the subscription link, and it is recommended that you use `encodeURIComponent` to escape it.

`name` is the subscription name, and it is recommended that you use `encodeURIComponent` to escape it.

## Rule Set

```
onexray://onexray.com/dat/add?type=domain&url=yourDownloadLink#name
```
`type` is the rule set type, which can be `domain` or `ip`.

`url` is the rule set download link, and it is recommended that you use `encodeURIComponent` to escape it.

`name` is the rule set name, and it is recommended that you use `encodeURIComponent` to escape it.

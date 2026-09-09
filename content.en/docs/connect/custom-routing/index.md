---
title: "Custom Routing"
description: "Build up to three named custom routes with ordered rules, GeoData completion, and independent import and sharing."
weight: 20
lastmod: 2026-09-09
---

Custom Routing controls traffic rules without binding them to particular servers. Server selection stays on Connect.

## Create a route

Choose Custom Routing in the traffic-method dialog and add a route. Give it a unique name and select 1–3 entry servers for automatic/group selection. Up to three custom routes can be stored.

Each rule has a name, an action (VPN, direct, or block), and up to four condition types:

| Condition | Examples |
| --- | --- |
| Websites and domains | domain:example.com, geosite:cn |
| IP addresses or ranges | 192.168.0.0/16, geoip:private |
| Port | A port or supported port range |
| Network | TCP, UDP |

Prefer one condition type per rule. If you fill several types, **every type must match**. Multiple values within one type are alternatives. Domain and IP values use separate input rows and offer completion from the routing data installed on your device.

Rules are evaluated in order. Delete rules from their list rows. There is no enable/disable switch or “more conditions” panel.

## Save and share

The fixed bottom action bar saves the route. Editing a rule changes the draft; save the whole route to apply it. Changes to the active route require reconnecting.

Routes can be shared and imported through the same complete-configuration flow as Raw JSON. The following minimal example has two empty entry slots:

```json
{
  "name": "Local network direct",
  "outbounds": [{}, {}],
  "routing": {
    "domainStrategy": "IPIfNonMatch",
    "rules": [
      {
        "ruleTag": "Private addresses",
        "ip": ["geoip:private"],
        "outboundTag": "direct"
      },
      {
        "ruleTag": "Example through VPN",
        "domain": ["domain:example.com"],
        "balancerTag": "proxy"
      }
    ]
  }
}
```

Store/export only empty entry slots. Do not add direct or block outbound objects: OneXray generates them for validation and runtime. The action references inside rules remain.

The routing strategy is fixed to IPIfNonMatch. Rules use ruleTag for their names and omit type. Unsupported fields or complete outbound definitions belong in [Raw JSON]({{< relref "/docs/connect/raw-json" >}}), not this editor.

## Custom routing data

Export can include geodata.assets entries with a file name and HTTPS download URL for custom data. Default geosite.dat and geoip.dat are omitted. Import downloads the dependencies and rejects file-name conflicts; it does not overwrite an unrelated existing file.

[Sharing format]({{< relref "/docs/sharing" >}}) · [Routing data]({{< relref "/docs/advanced/geodata" >}})

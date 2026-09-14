---
title: "Custom Routing"
description: "Custom Routing — Import and sharing"
weight: 20
lastmod: 2026-09-14
---

Open Connect → traffic method → Custom Routing. Create a named route or import a complete route file. Server selection stays on Connect.

## Edit and apply

Give the route a unique name and choose 1–3 entry servers for automatic/group selection. Up to three profiles can be stored. A fixed individual server remains a single entry.

Add or edit rules, then save the whole route with the fixed bottom action bar. Editing a rule only changes the draft. Delete rules from their list rows; there is no enable/disable switch. Effective changes to an active route require reconnecting.

Prefer one condition type per rule. Several types are AND; multiple ordinary values within a type are alternatives. Domain and IP inputs offer completion from installed Geodata.

## Generate or import JSON

Read the [Custom Routing contract]({{< relref "/docs/configuration/custom-routing" >}}) for accepted fields, empty entry slots, fixed actions, Local DNS and complete downloads. Import and sharing use the complete-configuration workflow, not ordinary Servers import.

Do not define actual nodes or system direct/block outbounds in a Custom file. Unknown fields are rejected. The [compatibility table]({{< relref "/docs/configuration/compatibility" >}}) distinguishes the four baseline conditions from development-only protocol/OS conditions and FakeDNS.

Local DNS is independent of Tunnel DNS. Only pure direct-domain rules contribute to its domain list; see [DNS behavior]({{< relref "/docs/configuration/dns" >}}). Custom Geodata imports need real files and categories, with no filename conflicts.

---
title: "Validate and troubleshoot"
description: "Separate JSON syntax, import compatibility, Core construction, platform startup and real connectivity."
weight: -10
ai_order: 110
lastmod: 2026-09-15
---

## Verification ladder

1. **Syntax:** strict JSON parses, the root is an object, no unresolved replacements remain.
2. **Import contract:** correct entry and envelope; Custom slots/actions/fields, name and capacity meet the App's rules.
3. **Dependencies:** required DAT files/categories exist; custom dependency names/URLs are real and conflict-free.
4. **App save validation:** use the actual editor/import path. libXray constructs and closes an instance using the App's validation projection.
5. **Runtime:** start VPN only with user authorization and required platform permissions/interface. Save success is not startup success.
6. **Behavior:** test the requested proxied/direct/blocked destinations and DNS behavior. Report what was actually tested.

Do not run a Custom file containing empty slots directly as a standalone Xray configuration. The App supplies validation outbounds and later chooses actual nodes for runtime. Validation is not a remote-server availability test.

## Errors and next steps

| Symptom | Check / response |
| --- | --- |
| JSON rejected immediately | Get the complete error, verify strict JSON, root type and the selected import entry |
| Unsupported Custom field | Remove it only if it is unnecessary; otherwise choose a supported mode/version without dropping the user's requirement |
| Empty or invalid outbounds | Custom starts with 1–3 empty objects; Advanced may append auxiliaries; node/Raw needs actual proxy objects |
| DNS rejected in ordinary Custom | Use the fixed tag/address form: one app-dns-direct server and, for FakeDNS, one app-dns-fake server with address fakedns |
| Internal names fail | Smart/ordinary Custom: pure direct-domain rule, Local DNS and direct reachability. Advanced/Raw: inspect the user DNS and query-routing chain; TUN DNS alone is usually insufficient |
| Missing Geodata/category | Inspect installed files/autocomplete; correct the category or explicitly import/download the real dependency |
| Default Geodata update fails | Old files are retained; do not treat this message alone as the VPN startup error |
| Saves but does not connect | Capture actual startup error; inspect credentials, ports, permission, selected interface and platform constraints |
| A direct IP rule never runs | An earlier domain/catch-all rule may prevent the IPIfNonMatch second pass |
| Unexpected unbalanced traffic | Unmatched traffic uses first outbound; only explicit balancer rules use the pool |
| Wrong latency while connected | The probe can traverse the current VPN; measure with VPN off for the actual node path |
| FakeDNS breaks after restart | Cached fake IPs can outlive their mappings; query DNS again/restart the affected application and check system bypass routes |

## Safe reporting

Ask for the full relevant error rather than “failed”. Request the minimum redacted configuration and explain which fields must stay visible for diagnosis. UUIDs, passwords, tokens, private keys and subscription URLs can be sensitive; do not ask the user to post them publicly.

Never report “verified working” after only reading source or running a syntax check. A template with dummy credentials is not a usable service.

## Documentation acceptance cases

When updating this site, test an assistant using only the full guide and a request. Useful cases: VLESS import, corporate DNS, China direct/GitHub proxy, wrong Custom fields, protocol/OS matching, FakeDNS, older-version compatibility, two-entry chain, missing credentials, Android selected apps, Apple Wi-Fi disconnect, Windows interface choice, missing DAT category, and save-success/start-failure diagnosis.

The expected result must include the import type or UI-only decision, complete configuration when possible, missing-information questions when needed, and honest validation limits. This list is an evaluation rubric, not a claim that an independent model evaluation has already run.

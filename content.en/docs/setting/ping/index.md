---
title: Ping
weight: 2
---

Ping settings control node latency tests and the connectivity probe shown on
Home.

| Field | Meaning |
| --- | --- |
| Timeout | Maximum wait time for a single test. |
| URL | Selects the Cloudflare or Google test endpoint. |
| Resolved URL | Shows the actual endpoint and can be clicked to copy it. |
| Auto Ping New Configs | Automatically tests newly imported nodes. |

Manual and automatic node tests use the timeout and selected endpoint. OneXray
submits node tests internally in fixed batches of up to five; there is no
user-configurable concurrency setting. The post-start Home connectivity probe
also uses the selected endpoint.

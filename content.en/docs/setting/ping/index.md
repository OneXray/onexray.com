---
title: Ping
weight: 2
---

Ping settings control node latency tests and the connectivity probe shown on
Home.

| Field | Meaning |
| --- | --- |
| Timeout | Maximum wait time for a single test. |
| Concurrency | Maximum number of node tests run at the same time. |
| URL | Selects the Cloudflare or Google test endpoint. |
| Resolved URL | Shows the actual endpoint and can be clicked to copy it. |
| Auto Ping New Configs | Automatically tests newly imported nodes. |

Manual node tests and automatic tests use the timeout, concurrency, and selected
endpoint. The post-start Home connectivity probe also uses the selected
endpoint.

---
title: "Configure with AI"
description: "Turn a requirement into an importable OneXray configuration and the necessary platform settings."
weight: -50
ai_order: 10
lastmod: 2026-09-14
---

Describe the result you want. An AI assistant can use this guide to choose a configuration type, ask for missing information, and produce a JSON file you can import. OneXray has no built-in AI service: you choose the assistant, and the website does not receive your configuration.

{{% ai-links %}}

## Start with the smallest solution

| Goal | Recommended result |
| --- | --- |
| Connect an existing server | An outbound document; keep Smart Routing |
| Change which traffic is direct, blocked or proxied | Custom Routing; reuse servers already in the App |
| Own DNS, multiple proxy paths or features outside the ordinary editor | Raw JSON |
| Select Android apps, Apple Wi-Fi behavior, excluded networks or an interface | VPN Tunnel instructions, possibly alongside routing JSON |

Do not generate a full Raw configuration when a Smart Routing option is sufficient. Do not put Tunnel settings in a made-up JSON section.

## Give the assistant this prompt

Fill in the brackets, then copy the prompt. The code-block copy button copies only the prompt.

{{% ai-prompt %}}

If the assistant cannot fetch a long file, download the [full guide](/llms-full.txt) and attach its text, or give it the individual Markdown chapters. A link alone does not prove it read the contents.

## Information the assistant needs

- App version and platform; on Windows, EXE/ZIP or MSIX; on macOS, App Store or OneXraySE.
- Desired destinations and actions, in priority order. Explain whether “local” means a country, a private network or a DNS resolver.
- Whether servers are already imported. For an outbound or Raw configuration, provide the server's actual protocol, address, port, credentials, transport and TLS/REALITY parameters.
- Required local DNS address, domains and reachable subnets; custom Geodata filename, category and HTTPS download URL when applicable.

Provide only necessary secrets to an assistant you trust. Redacted credentials are enough for discussion but cannot produce a working server connection. Neither examples nor OneXray supply a VPN service.

## Expected answer

The assistant should return: chosen mode and compatibility; complete JSON if needed; exact import entry; remaining Tunnel settings; expected behavior; and checks still required. Ask it to stop and request missing data rather than guess a key, category, network interface or SSID.

Start with [compatibility]({{< relref "/docs/configuration/compatibility" >}}) and the [configuration contracts]({{< relref "/docs/configuration" >}}). Imports do not prove connectivity.

---
title: "Configuration recipes"
description: "Complete examples for regional routing, corporate DNS, multiple proxy paths, protocol matching and FakeDNS."
weight: -30
ai_order: 90
lastmod: 2026-09-14
---

Choose a recipe by its goal, not by its size. All JSON downloads and website code blocks use the same files. The [manifest](/examples/manifest.json) identifies import types, templates, required replacements and dependencies.

## China direct, selected services direct, GitHub through VPN

Use [Custom Routing's complete example]({{< relref "/docs/configuration/custom-routing" >}}), or the corresponding Smart Routing controls if editable JSON is unnecessary.

Requires: two eligible existing nodes for this file, default Geosite and GeoIP. Rule order is ads → GitHub proxy → combined direct domains → combined direct IPs. GitHub must precede Microsoft direct rules. Only direct domain/IP rules are grouped; domain and IP remain separate rules to avoid turning OR intent into AND.

Import as Custom, select it on Connect and choose a group with enough nodes. Check the generated rules and a known GitHub, direct and blocked destination. An unmatched destination uses the first entry, not automatically every entry in the balancer.

## Corporate names and private network

Ask for the actual office domain, subnet and a DNS resolver reachable directly. The values below are scenario placeholders; do not assume this subnet is the user's LAN.

{{% json-example "custom-office.json" %}}

The pure domain rule feeds the direct DNS server; the separate IP rule covers connections already using an address. Other traffic keeps the normal proxy default. This file asks for one existing node.

Usually no Tunnel DNS change is needed. If an Apple system route must bypass VPN completely, configure it separately with Capture all traffic off. Excluded routes do not configure DNS for you. Ask whether the service should be processed by Xray as direct or bypass Xray at the system layer.

## One server, normal routing

Use the [outbound templates]({{< relref "/docs/configuration/outbound" >}}) after receiving real server parameters. Import into Servers, then retain Smart Routing. Do not export the App's generated TUN/metrics into a server file.

## Full DNS control or chain composition

Use [Raw JSON examples]({{< relref "/docs/configuration/raw-json" >}}). The basic example has its own DNS interception and proxy resolver path. The two-entry example demonstrates two copies of a final exit and a balancer.

These are credential templates, not working subscriptions. Confirm the intended direct fallback and unmatched-traffic behavior before generating a final configuration.

## Block QUIC on mobile

Use Custom `protocol` and `localOS` with the [complete example]({{< relref "/docs/configuration/custom-routing" >}}). The two conditions are AND: sniffed QUIC **and** Xray running on iOS/Android. It does not identify a specific app. Protocol sniffing is not guaranteed for all traffic; blocking QUIC does not guarantee every app will fall back to TCP.

## FakeDNS

Enable FakeDNS in Smart Routing, or import the [Custom FakeDNS example]({{< relref "/docs/configuration/custom-routing" >}}). The App generates the pools and inbound recovery while retaining real proxy/direct DNS support. Read the [cache and system-route limitations]({{< relref "/docs/configuration/dns" >}}); Custom files must not include a root `fakedns` field.

## A UI-only solution

For “only these Android apps”, “disconnect on my home Wi-Fi”, or “select the Ethernet adapter”, use the [VPN Tunnel guide]({{< relref "/docs/tunnel-guide" >}}). Generating routing JSON for a setting outside Xray is the wrong output.

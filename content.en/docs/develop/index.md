---
title: "Development"
description: "Find the current OneXray App setup, architecture contracts, build scripts, and contribution entry points."
weight: 100
lastmod: 2026-09-09
---

OneXray is a Flutter application with Xray-core provided through libXray and platform VPN integrations. The website is a separate static Hugo/Hextra project.

## Start from the repository

- [Local development setup](https://github.com/OneXray/OneXray/blob/main/readme/FIRST_RUN.md): dependencies, native libraries, routing data, generation, and a Debug run.
- [App contracts](https://github.com/OneXray/OneXray/blob/main/docs/README.md): navigation, startup, data, routing, and sharing.
- [Build scripts](https://github.com/OneXray/OneXray/blob/main/build_scripts/README.md): packaging and release boundaries.
- [Windows builds](https://github.com/OneXray/OneXray/blob/main/docs/windows-build.md): EXE/ZIP and MSIX.

Use the matching dependency revisions for your App checkout. Native libraries require a cold app restart after replacement; hot reload does not load new native code.

## Runtime boundaries

Normal connections use server selections, Smart/Custom rules, and App-managed platform settings. Raw JSON has a separate compilation path. libXray is the authority for Xray configuration validation; building a valid configuration is not proof of network connectivity.

The iOS Simulator uses a Swift-only local SOCKS adaptation and is not a real VPN test. Do not document that adaptation as a public proxy mode.

Run Flutter/Dart generation, analysis, and tests serially. Keep experimental fixtures in references and avoid using a developer's real configuration for destructive tests.

## Contribute

[Report an issue](https://github.com/OneXray/OneXray/issues) with platform, edition, App/Xray-core versions, and reproduction steps. Do not post private credentials.

[App source](https://github.com/OneXray/OneXray) · [Website source](https://github.com/OneXray/onexray.com) · [Telegram](https://t.me/OneXrayApp)

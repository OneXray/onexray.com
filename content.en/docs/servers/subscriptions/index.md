---
title: "Subscriptions and age"
description: "Add and refresh HTTPS subscriptions, understand protected nodes, and configure optional age encryption."
weight: 20
lastmod: 2026-09-09
---

A subscription is a remote source of server configurations. It is not an in-app purchase or a VPN service supplied by OneXray.

## Add, edit, and update

Enter a name and HTTPS URL. Initial import and Check for updates use the same logic: download, parse with libXray, and save only when at least one valid node is returned. There is no second node confirmation.

If the request fails or returns no valid nodes, existing data is retained. Success reports the number imported, not “new”, “changed”, or “failed” node counts.

Editing changes the source name, URL, and age settings without refreshing its nodes. Use Check for updates to fetch the edited source.

Nodes protected by the current connection, fixed selection, final-exit selection, or favorites are retained during replacement. They are not counted as newly imported. Background updates do not switch an active VPN to newly downloaded nodes.

[Automatic updates]({{< relref "/docs/advanced/data-updates" >}}) apply globally to subscriptions; there is no per-subscription auto-update switch.

## age encryption

Only enable age if the source supports it. You can enter an existing public/private key pair or generate:

- X25519
- Hybrid ML-KEM-768 + X25519

Both key fields must be filled together or left empty. Generating replacements asks for confirmation.

The app sends the public key in the X-Age-Public-Key request header and decrypts the response locally using the private key. The pair is reused for later updates. Decrypted subscription text is limited to 16 MiB.

age protects the response payload; it does not replace HTTPS or make an untrusted source trustworthy. Failed decryption never replaces valid existing nodes with an empty list.

## Sharing

An age subscription link includes the algorithm, not your existing keys. The receiving device generates its own pair; the source must support responding to its new public key.

URLs can contain access tokens. Check the content before sharing. [Sharing formats]({{< relref "/docs/sharing" >}}).

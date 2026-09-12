---
title: "Subscriptions, HWID, and age"
description: "Add HTTPS subscriptions, configure optional HWID and age encryption, and understand identifier and sharing boundaries."
weight: 20
lastmod: 2026-09-12
---

A subscription is a remote source of server configurations. It is not an in-app purchase or a VPN service supplied by OneXray.

## Add, edit, and update

Enter a name and HTTPS URL. Initial import and Check for updates use the same logic: download, parse with libXray, and save only when at least one valid node is returned. There is no second node confirmation.

If the request fails or returns no valid nodes, existing data is retained. Success reports the number imported, not “new”, “changed”, or “failed” node counts.

Editing changes the name, URL, HWID sending preference, and age settings without refreshing nodes or replacing an existing HWID. Use Check for updates to fetch the edited source. Subscription content must use compatible VLESS / v2rayN share formats, not another client's complete configuration.

Nodes protected by the current connection, fixed selection, final-exit selection, or favorites are retained during replacement. They are not counted as newly imported. Background updates do not switch an active VPN to newly downloaded nodes.

[Automatic updates]({{< relref "/docs/advanced/data-updates" >}}) apply globally to subscriptions; there is no per-subscription auto-update switch.

## Optional device identifier (HWID)

Send device identifier (HWID) is off by default; enable it only if your provider requires it. The app creates an independent random identifier for each subscription and sends it in the `x-hwid` request header. It does not read hardware serial numbers, advertising IDs, or system device identifiers. HWID applies to that subscription's download, not the VPN configuration.

Once created, the identifier stays the same across toggles, renaming, URL edits, restarts, and upgrades. Changing the URL scheme, host, or port turns sending off; explicitly enabling it again sends the original identifier. Deleting and recreating a subscription or clearing data creates a new identifier and may use another provider device slot.

Same-origin HTTPS redirects retain HWID; cross-origin redirects remove it, even if a later redirect returns to the original origin. To send to a new origin, configure its URL directly and explicitly enable the switch. Provider verification, device-limit, and registration failures show a specific cause without replacing old nodes with empty content or placeholder nodes.

Turning the switch off or deleting the local subscription does not remove the provider's device record; manage that with the provider. HWID can be combined with age, and shared links omit both the identifier and its switch.

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

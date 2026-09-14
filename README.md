# OneXray documentation

AI-first configuration documentation and a product website built with Hugo Extended and Hextra. English, Simplified Chinese and Russian share the same page structure. The site is entirely static: no AI backend, configuration upload service or additional npm build is required.

## Content and generated interfaces

- `content.en/`, `content.zh/`, `content.ru/`: translated product and documentation pages.
- `docs/ai/`: choose an import type, gather prerequisites and copy a language-specific assistant prompt.
- `docs/configuration/`: version boundaries and the authoritative outbound, Custom Routing, Raw JSON, DNS and Geodata contracts.
- `docs/recipes/`: complete goal-oriented examples, not isolated configuration fragments.
- `docs/tunnel-guide/`: platform decisions and UI steps, separate from importable JSON.
- `docs/troubleshooting/`: validation layers, failure diagnosis and a documentation acceptance rubric.
- Existing installation, connection, server, platform, settings and sharing guides remain available. Keep the App's HTTPS privacy-policy endpoint valid.
- `static/examples/`: downloadable JSON files, compatibility manifest and a snapshot of the App's region mapping. They contain no working server credentials.
- `assets/ai/`: localized copyable prompts.

Each language publishes an AI index (`/llms.txt`), a complete configuration guide (`/llms-full.txt`) and Markdown alternatives (`/docs/.../index.md`). Chinese and Russian add `/zh/` and `/ru/` respectively. HTML heads advertise the Markdown alternative and AI index.

Copyable prompts and machine-readable documentation always use `https://onexray.com`, including during local previews. Their public URLs are centralized in `layouts/_partials/ai/public-url.html`; ordinary preview navigation can remain local.

The full guide collects chapters with a positive `ai_order`, in that order. HTML, page Markdown and the full guide render the same source chapters. The `json-example` shortcode reads the actual downloadable JSON, so examples are not maintained in multiple places. Use the `%` shortcode form so it expands before Markdown rendering. Do not edit generated files.

## Sources and compatibility

The published baseline is App `v26.9.2` (`4bc391330f200c95fceff2aab64012ce98849c43`). Newer routing conditions and FakeDNS are explicitly marked as development-only; source code or a local build is not evidence of store availability. `static/examples/manifest.json` records reviewed commits and per-example prerequisites. Update it and all three compatibility pages when adopting another release.

Authority order: App import/compiler/platform implementation, bundled libXray/Xray-core, then the current upstream documentation. Essential OneXray-specific contracts must remain on this site; readers should not need to inspect the App source to generate supported configurations.

Keep these boundaries explicit:

- Server import extracts outbounds; Custom and Raw use separate import entries.
- Custom stores empty entry slots and a limited routing/DNS model. Runtime-only system outbounds are not exported.
- Custom `geodata.assets` declares import dependencies. Raw JSON does not use that field to download files; install its data beforehand or use separate Geodata links included by App sharing.
- Raw does not override App-managed Tunnel, logging, metrics, DNS query policy or applicable interface settings.
- TUN DNS, route Local DNS and proxy DNS have distinct responsibilities.
- Region mappings are an App snapshot, not a guarantee that arbitrary or future DAT files contain the same categories.
- A syntactically valid/importable template is not a tested connection. Required credentials must come from the user's provider.

Preserve actual platform differences, the absence of analytics/backup features, and Wintun attribution in the credits pages. Do not publish store-review credentials, subscription tokens, runtime files or local preview addresses.

## Preview

Install Hugo Extended (minimum in `hugo.toml`) and Go. Hextra is pinned in `go.mod` / `go.sum`.

```shell
hugo server --bind 127.0.0.1 --port 1313 --disableFastRender --renderToMemory
```

English `/`, Chinese `/zh/`, Russian `/ru/`. Bind only to loopback for local development.

## Build and checks

The documentation checker requires Node.js and only its built-in modules.

```shell
hugo --gc --minify --destination references/ai-first-production --panicOnWarning
node tools/check-docs.mjs references/ai-first-production
git diff --check
```

The checker verifies JSON syntax, documented example shapes, matching language paths, generated Markdown/full guides, embedded/downloaded example parity and local links. It is not a replacement for App/libXray validation and does not test external services.

For configuration changes, also pass examples through the actual App import/save projection and bundled libXray `TestXray`. Replace credential placeholders only in isolated test fixtures. Keep demonstration harnesses, dependencies and evidence under ignored `references/`, not in production App code. Respect the App repository's serial Flutter/Dart execution rule. `TestXray` constructs an instance but does not start a VPN or prove server availability; report those checks separately.

Inspect the actual site for navigation, language switching, search, prompt/code copying, download links and mobile layout. The troubleshooting page lists assistant-only acceptance scenarios; the list is not proof that a model evaluation ran.

For deployment, run `hugo --gc --minify` and publish the complete `public/` directory. Do not leave deleted pages in the deployment output. No old-URL redirects are required. The existing static hosting workflow is unchanged.

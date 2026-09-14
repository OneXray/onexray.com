# {{ .Title }}

Source: {{ partial "ai/public-url.html" .RelPermalink }}
Description: {{ .Description }}

{{ .RenderShortcodes | replaceRE `\]\((/[^)]+)\)` (printf "](%s$1)" (partial "ai/public-url.html" "")) | safeHTML }}

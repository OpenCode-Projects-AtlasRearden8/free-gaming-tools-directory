# Freebie Directory — free companion tools for gamers

A curated directory of **free companion tools for gamers**: save managers,
achievements and backlog tools, controller mappers, screenshot organizers,
and wiki note-takers.

Every entry includes:

- **What it checks** — a plain-English, concrete line on what the tool actually handles
- **Platform** — where it runs
- **Offline-first flag** — works with no internet, partly, or not at all
- **One-line verdict** — in Dylan's plain voice: warm, direct, never condescending

It's 100% static: plain HTML + CSS + vanilla JavaScript, no frameworks, no build
step, no tracking, no analytics, no cookies. Everything runs in your browser.

## Quick start

No dependencies. Just open it:

```sh
# Option A: open the file directly
open index.html            # macOS
start index.html           # Windows
xdg-open index.html        # Linux

# Option B: serve it locally (recommended)
python3 -m http.server 8765
# then visit http://localhost:8765
```

## What's in here

| Path | What it is |
| --- | --- |
| `index.html` | The directory itself (searchable, filterable by category and offline flag) |
| `docs/curation-policy.html` | What gets in, what stays out, and why |
| `docs/tool-review-checklist.html` | The checklist each tool passes before being listed |
| `js/data.js` | The entries as plain data — edit here to add tools |
| `css/styles.css` | Styles (one file, no framework) |

## Related projects (deliberately separate)

- **free-open-source-games-directory** — free & open-source *games themselves*, not the tools around them
- **FFXIV trackers** — game-specific tracker tools for Final Fantasy XIV players

## Curation

The short version: free for the full job, respectable source, no dirty tricks,
verdict in plain voice, no paid placements or affiliate links ever. Full rules in
[docs/curation-policy.html](docs/curation-policy.html).

## License

MIT — see [LICENSE](LICENSE).

Copyright (c) 2026 Asdale Dynamics, LLC. Curated and maintained by
Asdale Dynamics, LLC as part of Dylan Asdale's plain-English AI guides and
practical tools (dylanasdale.github.io).

# STATUS — Freebie Directory (free companion tools for gamers)

Built 2026-11-06 by Asdale Dynamics, LLC.

## What was built

A fully static HTML directory of **23 curated free companion tools for gamers**
in five categories: save managers (3), achievement & backlog tools (5),
controller mappers (5), screenshot organizers (5), wiki note-takers (5).

Every entry carries the four required fields:

- **What it checks** — one concrete plain-English line per tool
- **Platform** — in plain words
- **Offline-first flag** — `Offline-first` (17 tools), `Partly offline`, or `Needs internet`
- **One-line verdict** — in Dylan's plain voice (warm, direct, catches stated, never condescending)

Site features: live text search, category chips with counts, an "Offline-first
only" toggle, and bag-of-words role badges. No frameworks, no build step, no
tracking, no analytics, no cookies, no external requests (zero network calls
from the page itself).

Also includes `docs/`:

- `docs/curation-policy.html` — scope, inclusion rules, the four entry fields, voice rules, honesty rules, safety/privacy
- `docs/tool-review-checklist.html` — the pre-inclusion and re-review checklist plus removal policy

Deliberately separate from: `free-open-source-games-directory` (games themselves,
not tools) and FFXIV trackers (game-specific) — both noted in the site footer
and README.

## How to run

No dependencies, no build step:

```sh
# Preferred: serve locally
python3 -m http.server 8765
# then open http://localhost:8765

# Or just open the file directly
xdg-open index.html    # (open/start on macOS/Windows)
```

Verification (all self-contained):

```sh
node tools/verify.js     # data + doc + license + secret-free checks
node --check js/data.js && node --check js/app.js   # syntax
```

## Verification results

- `node tools/verify.js` — **PASS (39/39 checks)**: entry data integrity (23 entries, all required fields, https-only official URLs, no duplicates, all five categories populated), file wiring (stylesheets/scripts/docs cross-links), MIT LICENSE with the exact line `Copyright (c) 2026 Asdale Dynamics, LLC`, README credit to Asdale Dynamics, LLC, no secrets/API keys, no analytics/tracking strings.
- `node --check` on both JS files — clean.
- HTTP smoke test — all six routes (`/`, css, both js files, both docs pages) returned **200** from a local `http.server`.
- DOM smoke test (js + data + render logic executed end-to-end) — **SMOKE PASS**: 23 cards rendered across 5 category sections, 6 filter chips, every card HTML contains the exact required structure (title link, What it checks, Platform, Dylan-says verdict, offline badge), and the offline-only filter produced exactly the 17 offline-first entries.

## Known gaps

- **Link freshness**: tool URLs are official-site/repository links checked at curation time; there is no automated periodic link checker. Re-review is manual per `docs/tool-review-checklist.html`.
- **Single reviewer**: verdicts are one voice (Dylan's); a small second-opinion pass could reduce bias.
- **No RSS/changelog**: entries can change without a visible public diff trail beyond git history.
- **No screenshots per tool**: textual verdicts only for now; images would need hosting decisions.
- **Verification depth**: cookies/CSP aren't hardened via headers (static host applies its own); `tools/verify.js` covers content, not server config.
- Some tools labeled `partial` offline (e.g. Playnite, Rclone) depend on optional setup choices we couldn't verify exhaustively.

# rishabhsingh.design

Rebuild of Rishabh Singh's UX portfolio. Static HTML, CSS, and vanilla JS, no
build step. "Sand bands" direction: sand paper canvas, one forest accent,
oversized display type, scroll-driven motion, short copy, five large rounded
project bands, one dark section.

## Preview

```
cd /Users/rriss/prtfl
python3 -m http.server 4411
```

Then open http://127.0.0.1:4411. Use a port you have not used before when you
are iterating on CSS; browsers cache per origin and will serve stale styles.
Opening `index.html` with `file://` mostly works, but a server keeps fonts and
relative paths behaving like production.

## Deploy

Any static host works. Push the folder to GitHub and point GitHub Pages,
Netlify, or Vercel at the repo root. Nothing to compile.

## Structure

| Path | What it is |
|---|---|
| `index.html` | Home page. Hero, credential ticker, five project bands, contact. |
| `assets/css/tokens.css` | Design tokens. Change a color or size here, nowhere else. |
| `assets/css/base.css` | Reset, type primitives, layout helpers, motion primitives. |
| `assets/css/components.css` | Progress bar, nav, aurora, hero, marquee, project band, stats, contact. |
| `assets/js/site.js` | Word split, scroll reveals, stat count-up, progress bar, pointer effects. Optional by design. |
| `work/` | The five case studies plus `_TEMPLATE.html`. |
| `assets/img/<project>/` | Real screen exports, one folder per case study, WebP. |
| `assets/img/placeholder-*.svg` | Stand-in artwork, forest only. No live page uses these now; the archived home pages do. |
| `assets/css/palettes/`, `preview.html` | Leftovers from the palette bake-off. Sand and forest won and is baked into `tokens.css`; these are safe to delete. |
| `iterations/01-spectrum/` | Archived home page, dark, one color pair per project. Reference only. |
| `iterations/02-cobalt/` | Archived home page, dark, one blue accent. Reference only. |
| `iterations/03-ember/` | Archived home page, warm paper, brick accent. Reference only. |
| `iterations/05-drafting-table/` | Archived home page, sand and forest, drafting grid and threaded work column. Reference only. |
| `iterations/06-case-hero-candidates/` | The case hero explorations. "A split" won. |
| `iterations/07-case-body-candidates/` | The case body explorations. "Ledger" won. |
| `iterations/08-`…`11-*-source-assets/` | Unmodified screen originals per project, with a README recording what became what and how. Read one of these before touching that project's images. |
| `DESIGN-SYSTEM.md` | **The rules.** Read before editing anything. |

## Adding a project

Copy an existing `<article class="project reveal-pop">` block in `index.html` and
change the index, tag, year, title, summary, two stats, and image. Do not set a
color on it. Every band draws on the site accent, which is the whole point of the
current direction: one scheme, instantly readable.

Copy budgets (summary two sentences, two stats, short labels) are in
`DESIGN-SYSTEM.md` section 3.

## Iterations

`index.html` plus `assets/` at the repo root is always the current design.
Earlier directions are snapshotted whole under `iterations/<n>-<name>/` so they
can be reopened for comparison. Nothing in the live site links to them.

## Working with an agent on this site

Point the agent at `DESIGN-SYSTEM.md` first. It covers the token system, the
single-accent rule, the component inventory, the motion hooks, the voice rules
and copy budgets (no em dashes, plain first person, never publish a modeled
number as a result), and the accessibility requirements.

Source content for case studies lives outside this repo at
`/Users/rriss/Doppel/cortex/Staging/portfolio-master-handoff.md`, which also lists
what must never be published. Nothing in this repo duplicates that list.

`CLAUDE.md` is the entry point an agent loads automatically. It points at both
files and carries the handful of traps that are easy to walk into.

## Status

Palette is settled: **sand and forest**, baked into `tokens.css` with the artwork,
favicon, and `theme-color` recolored to match. Layout, copy, and motion are on
iteration 4, the band direction. A fifth iteration that replaced the bands with a
drafting grid and a threaded work column was built, reviewed, and set aside; it is
archived under `iterations/05-drafting-table/`. The contact footer keeps that
iteration's oversized email and phone treatment.

The case study template and all five case studies are built: `work/_TEMPLATE.html`,
`work/pay-bill.html`, `work/basket-building.html`, `work/card-dashboard.html`,
`work/transactions.html`, `work/keybank.html`. `about.html` is written too, built out
of the case study skeleton rather than the home page hero, so every page the nav links
to now exists.
Every case hero matches the home page hero on type scale and height.

Real screen assets are in place on all five: Pay Bill (`assets/img/pay-bill/`,
14 WebP), Card Dashboard, Transactions (`assets/img/transactions/`, 16 WebP),
KeyBank (`assets/img/keybank/`, 13 WebP), and Bundle Swap
(`assets/img/basket-building/`, 8 WebP). No live page references a
`placeholder-*.svg` any more. The SVGs stay on disk because the archived home
pages under `iterations/01` through `06` still point at them.

Open items, including the `og:image` and the unresolved Bundle
Swap date, are in `DESIGN-SYSTEM.md` section 11.

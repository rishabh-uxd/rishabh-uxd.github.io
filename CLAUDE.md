# Rishabh Singh's portfolio

Static HTML, CSS, vanilla JS. No build step, no npm, no framework. Every page is a
standalone `.html` linking three stylesheets in this order: `tokens.css`,
`base.css`, `components.css`. This **is** a git repository, on `main`, though it had
no remote as of September 2026, so nothing is backed up off this machine until one is
added. Commit often, and still archive anything you remove under
`iterations/<n>-<name>/` instead of deleting it: the iterations are reference material
a reader is meant to open, which is a different job from history.

## Read these first, in this order

1. **`DESIGN-SYSTEM.md`** is the rules, all 12 sections. It is long because the
   reasoning is in it: read the section you are about to touch, not just the value.
   Section 3 is voice and copy budgets, section 9 is the accessibility floor,
   section 12 is case study pages and ends with the 10 rules for adding one.
2. **`/Users/rriss/Doppel/cortex/Staging/portfolio-master-handoff.md`** is the only
   source for case study content. It opens with the voice rules, then a **NEVER
   publish** list, then the canonical figures, then an **interview-only** list at
   the end. Do not write a number onto a page that is not on the canonical list.
   Nothing in this repo duplicates that list, so if you skip this file you will
   publish something that must not ship.
3. **`README.md`** for how to preview and deploy.

## Building another case study page

All five are written, the home page bands link to all five, and all five carry
real screen assets. `about.html` is written too, so every page on the site exists.
It is built out of the case study skeleton rather than the home page hero, with four
deliberate departures from it; read "The about page" at the end of
`DESIGN-SYSTEM.md` section 12 before editing it, and
`iterations/42-about-page/README.md` for why its hero portrait is capped instead of
filling its column. **Three of its five sections are the legacy
rishabhsingh.design/about page's own copy, near enough verbatim**, so the section 3
voice rules do not describe them: the greeting, the exclamation mark, "I excel at" and
the quoted "whys" are his words and stay. `iterations/43-about-legacy-copy/README.md`
says what was changed on the way over and what was removed.

If you do add one, copy `work/_TEMPLATE.html`, follow the 10 rules at the end of
`DESIGN-SYSTEM.md` section 12, then point the previous case study's `.next-case` at
the new page and the new page's at the one after it, so the cycle stays closed.
Every existing page is a worked example. Pick by the shape of the screens you
have: Pay Bill for two phones in `.shots--pair`, Basket Building for the
`.case-hero__device` phone hero and for a section 05 led by a prototype with only
the stills the prototype cannot show, KeyBank for wide desktop screens one up with a
`.chrome-frame` hero, Card Dashboard for three phones on one line in
`.shots--trio`.
For a section 05 split into named sets with `.shots-head`, no live page is an
example any more: Basket Building was the only one and it was removed in
`iterations/20-basket-building-prototype-only/`, which still has the markup. Same
for `.shots--solo`, the one-portrait-phone modifier, whose only user was Card
Dashboard before it went to `--trio`: the markup is in
`iterations/33-three-phones-one-line/`.

Real screen assets: Pay Bill (`assets/img/pay-bill/`, 14 WebP), Card Dashboard,
Transactions (`assets/img/transactions/`, 16 WebP), KeyBank
(`assets/img/keybank/`, 13 WebP), Basket Building (`assets/img/basket-building/`, 10 WebP,
four of them with no live user since iteration 20 emptied that page's section 05).
No live page references a `placeholder-*.svg`. Before you touch any of these
images, read the matching `iterations/08-` through `11-*-source-assets/README.md`:
each one records where the originals came from, what became what, and the crop and
encode steps, including the two that are easy to get wrong (crop a phone to its
bezel, not to the capture clip, and zero RGB under transparent pixels or lossy
WebP bleeds colour into the corners). For the basket-building phones the encoder
of record is now `iterations/14-basket-building-hero-phone/reproc.py`, not
iteration 11's `proc.py`: a screenshot of a rounded phone frame has no alpha, so
the corners have to be punched in, and its README says how. The one exception is
`basket-building/home-card.webp`, whose encoder of record is
`iterations/22-home-card-phone-geometry/reproc.py`: it carries iteration 14's alpha
work but lays the three phones out on Card Dashboard's geometry (445 wide, 44 gap,
88 pad) so the two home page thumbnails match. The Basket Building **hero** is a
third exception, `bundle-carousel.webp`, encoded by
`iterations/60-bundle-carousel-hero/proc.py`: it comes from a Figma frame export
rather than a browser capture, so its bezel is a squircle and iteration 14's
punched-in circle is wrong for it. That script reads the corner alpha off the
image instead, and its README proves why a circle cannot fit.

## The traps, learned the hard way

- **A `ch` is not a character. Characters x 0.73 = ch.** `ch` is the advance of
  "0" (.6em in Inter) but the average running character is .437em, so 1ch is about
  1.37 characters. Every measure on this site was once set as though 1ch were one
  character and the pages ran 84 to 103 characters a line while passing a
  `ch`-based audit. Verify a measure by counting characters in the rendered line.
  The full note is at the top of the measures in `tokens.css`.
- **Never hard-code a color, size, or spacing value.** Add or reuse a token in
  `tokens.css`. No `<style>` blocks on site pages. Never set `--accent` anywhere.
- **`.reveal` elements sit at opacity 0 until scrolled into view, and below-fold
  images report `naturalWidth === 0`.** Any automated check must scroll the whole
  page first or it reports false failures, and scrolling alone is not enough. Set
  every `img.loading = 'eager'` and wait for all of them to report `complete`, or
  lazy WebP still measures as broken. Then wait about 2500ms at the bottom, or
  footer reveals get sampled mid-transition and look stuck; the tell that one is
  transitioning rather than broken is that it already carries `is-in`. Two
  corollaries: `element.screenshot()` on a tall section renders its lazy images as
  empty boxes, so scroll to the offset and take a viewport shot instead; and
  injecting `* { animation: none !important }` kills the `data-split` hero reveal,
  so the h1 captures invisible. Both are capture artifacts, not page bugs.
- **Verify in a browser, on a port you have not used before.** Browsers cache CSS
  per origin and will happily serve you the old stylesheet while you conclude your
  change did nothing. Local Playwright scripts work; the Playwright MCP screenshot
  tool times out. Chromium is at
  `~/Library/Caches/ms-playwright/chromium-1234/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`.
  Local Python is 3.9, PIL is available, numpy and scipy are not.
- **Check that a visual change is visible at the size it will be viewed.** A change
  where every measurement moved but nothing looked different has happened here.

## How the user works

- Do not present option menus. They have said "I don't understand the options" and
  have rejected `AskUserQuestion`. Explain plainly, make the call, do the work,
  then report what you decided and why.
- They are an Accessibility Bar Raiser. Section 9 is not negotiable, and they will
  notice a contrast or heading-order mistake before anything else.
- Standing decisions: use the available width, keep reading comfortable, put
  numbers in body copy and never overlaid on an image, and prefer the quieter
  document-like treatment when in doubt.

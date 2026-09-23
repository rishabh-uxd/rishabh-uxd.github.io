# Portfolio design system

The rules any agent (or human) must follow when adding to this site. Read this
before touching CSS or adding a page.

Direction: **sand bands.** Sand paper canvas, **one forest accent**, oversized
tight display type, real scroll motion, short copy, work presented as five large
rounded bands, and exactly one dark section for contrast. Think an Apple product
page, not a document.

Iterations of the home page are archived under `iterations/`. `01-spectrum/` gave
each project its own color pair and was replaced because five color pairs read as
no scheme at all. `02-cobalt/` fixed that with one blue on a near-black canvas.
`03-ember/` moved to a light warm canvas with a brick accent. `05-drafting-table/`
kept this palette but rebuilt the layout around a visible drafting grid, a sticky
work index, and a scroll-threaded panel column; it was tried and set aside in
favor of the bands. The current direction is iteration 4: sand and forest bands.

## 1. Stack and constraints

- Plain HTML, CSS, and a small amount of vanilla JS. **No build step, no framework, no npm.**
- Every page is a standalone `.html` file that links the same three stylesheets.
- JS is progressive enhancement only. Every page must be fully readable with JS off.
- No inline `<style>` blocks. One-off layout nudges may use a `style="..."` attribute
  with token values (`style="margin-top: var(--s-4)"`), nothing more. Never set
  `--accent` inline (section 4).
- Never hard-code a color, font size, or spacing value. Add or reuse a token.

Preview locally, on a port you have not used before in this session (browsers
cache aggressively and will happily serve you stale CSS):

```
cd /Users/rriss/prtfl
python3 -m http.server 4411
# open http://127.0.0.1:4411
```

## 2. Files

```
index.html                     home page
about.html                     about page. Built on the case study skeleton, not the home page hero. See section 12, "The about page".
work/_TEMPLATE.html            the case study template. Copy it, never edit a case study from scratch. See section 12.
work/basket-building.html      case study 01
work/card-dashboard.html       case study 02
work/pay-bill.html             case study 03
work/transactions.html         case study 04
work/keybank.html              case study 05
assets/css/tokens.css          all design tokens, single source of truth
assets/css/base.css            reset, type primitives, layout helpers, motion primitives
assets/css/components.css      every reusable block
assets/js/site.js              word split, reveals, count-up, progress bar, pointer effects
assets/img/                    images; placeholder-*.svg are stand-ins, now unused by any live page
assets/img/placeholder-shot.svg  the neutral "SCREEN TO BE ADDED" panel, for a .shot slot with no export yet
assets/img/<case-slug>/        real screen exports for one case study, WebP. See section 7, "Screen exports".
assets/css/palettes/*.css      the palette bake-off. Token overrides only. Sand is adopted; these are now dead weight.
preview.html                   dev harness to compare palettes. Not part of the site. Dead weight.
iterations/01-spectrum/        archived home page, dark, one color pair per project. Reference only.
iterations/02-cobalt/          archived home page, dark, one blue accent. Reference only.
iterations/03-ember/           archived home page, warm paper, brick accent. Reference only.
iterations/05-drafting-table/  archived home page, sand and forest, drafting grid and threaded work column. Reference only.
iterations/06-case-hero-candidates/  the four case study hero treatments. A (.case-hero--split) was adopted; the other three are archived CSS. Reference only.
iterations/07-case-body-candidates/  the four case study body treatments. A (Ledger, no modifier class) was adopted; the other three are archived CSS. Also records the reading measure change. Reference only.
iterations/08-pay-bill-source-assets/  unmodified Pay Bill screen originals pulled from the old portfolio, plus the mapping of source file to published asset. Reference only.
iterations/09-transactions-source-assets/  the same, for Transactions. Reference only.
iterations/10-keybank-source-assets/  the same, for KeyBank. Its README also records why DO.png was left unconverted. Reference only.
iterations/11-bundle-swap-source-assets/  the same, for Basket Building, but captured from the user's local interview prototype rather than downloaded. Its README carries the capture recipe (the prototype hides its own document until slide 6 is forced active) and the list of unpublishable sections skipped. Named for Bundle Swap because that is what the page was called when it was written. Reference only.
iterations/12-basket-building-rename/  the case study page as it read while it was titled "Amazon Bundle Swap", kept because renaming it to basket-building.html rewrote the framing. Reference only.
iterations/13-prototype-cx-proposals/  the hand-built one-treatment demo the current prototype replaced. Its README is the record of how prototypes/basket-building/ was extracted from the interview deck: what was left out and why, the internal names renamed, and how the embed's height ends up right. Read it before regenerating that prototype. Its verify-fit.py, verify-fallback.py and tabheights.py are the three sweeps: the first two check the embed at 20 widths x 5 treatments, the third checks that all four Build your own bundle tabs are the same height, which the other two cannot see because they only measure the tab a panel opens on. byob-asins/ and bundle-thumbnails/ hold the Figma-sourced images the deck did not have, each with its own README.
iterations/14-basket-building-hero-phone/  why the Basket Building hero stopped cropping its phone, and the re-encode that gave the five captured phones the transparent bezel corners a screenshot cannot have. reproc.py is the encoder and is what you edit if those five ever need rebuilding; before/ is the eight assets it replaced. Read it before touching assets/img/basket-building/. It also records the widening that followed: --page-max 62vw/1520px to 78vw/1800px, --case-hero-phone-h 52vh to 64vh, the panelled phone cap 21rem to 24rem, with the 13-viewport measurement and the fold cost. Read it before changing --page-max.
iterations/15-case-hero-tightening/  why the two hero columns sit close together: the gap that became a hole when --page-max opened, the 1.9fr media track a height-sized phone needs, the .case-meta rail moving into the text column, and the hero lean that had never rendered. Three CSS traps with the measurements that caught them: :has() donates specificity, a spanning grid item stretches the rows it spans, display: contents blockifies what it promotes. Reference only, and read it before changing .case-hero--split's grid. Worked on Basket Building alone; iteration 16 is the rollout.
iterations/16-hero-composition-rollout/  the same composition applied to the other four case study heroes, which is what makes the five read as one layout: the in-column rail everywhere, the three remaining panelled phones switched to --bare, and why KeyBank keeps .chrome-frame and the 1.22fr track. Carries the A/B that justified it, rail position in-column against the old full-width band on all five pages at four widths, and the one cost accepted at the time (KeyBank's rail below an 800px fold because its deck ran five to six lines), which iteration 17 then removed along with the deck.
iterations/17-heroes-without-decks/  why no case study hero has a deck or a caption any more: the deck was the third telling of a sentence the home band and section 01 both carry, and the caption was describing a screen section 05 captions properly. Records the three preconditions for removing them (the deck's numbers must already be in the body, the figure becomes a div, the hero image must be shipped work), the Pay Bill hero image swap that the third one forced, and the hero heights before and after. Read it before adding a deck back.
iterations/18-outcome-band-width/  why .stat-band is capped at --measure-case so its edges line up with the paragraph above it, with the before and after widths that show why spanning the full column looked wrong (1208px of band under 694px of prose at 2560). Also why two callouts is a fine band and Basket Building's is now two: the band closes the outcomes section, so a research input does not belong in it. Also the account of the one time the handoff's NEVER list was overtaken by events: the 11% swap rate and +0.11 units per purchase were held off the page for a turn, then published once the user confirmed they had been measured, which leaves handoff lines 29 and 210 to correct.
iterations/19-prototype-strategy-labels/  the basket building prototype's two strategy option labels and its h1, and why the h1 is now dynamic rather than the fixed string that was asked for: it names a strategy, so it has to follow the dropdown or it reads "strategy 1" over strategy 2's screens. Also the trap that cost two verification runs, which is that section 05's iframe is loading="lazy" with a real src far below the fold, so a script has to force it eager and scroll it into view before the frame exists to query.
iterations/20-basket-building-prototype-only/  the seven stills removed from below the basket building prototype, with their alt text and captions, and why five of them were the same screens the prototype already reaches by working its two selects. Read it before adding a .shots run back to that page, and read it if you need the worked example for .shots-head, because that page was the only one and no live page has it now. (It is no longer the only .shots--trio reference: Card Dashboard's Experience section is a live one.) Also notes the one real cost (the two Groundwork boards are not in the prototype) and the .case-note that still says the results are not in.
iterations/21-byob-search-screens/  the paragraph saying experiment strategy 2 is being built now, and the two Build Your Own Bundle desktop screens under it, pulled from the live rishabhsingh.design page. proc.py beside the README is the encoder of record: 2416px wide because that is exactly 2x the 1208px column at 2560, and do not read 1080 as the column width, that is the prototype's control row. Also why these two are the exception to iteration 20's no-stills rule (the prototype is mobile only), and why they take a plain .shot__frame rather than --device.
iterations/22-home-card-phone-geometry/  card 01's home page thumbnail rebuilt on card 02's phone geometry, 445 wide with 44px gaps and 88px padding, because .project__media renders every card at the same box so a size mismatch can only be inside the composite. reproc.py beside the README is the encoder of record for basket-building/home-card.webp only, and it inherits every alpha and bezel step from iteration 14. Also records why the height is allowed to differ (the two phone mocks are different aspect ratios and width is the dimension that makes the edges line up).
iterations/23-project-card-green-ring/  the home page project cards given a 2px --accent border on all four sides, replacing a 1px --stroke hairline plus a --grad-accent bar across the top only. removed.css has the three old rules. Records why the ring is flat --accent rather than the gradient (border-image does not follow border-radius, and the mask-composite alternative needs a -webkit- fallback for two stops that are both dark green) and why hover deepened to --accent-2 instead of brightening. **Superseded on the resting state by iteration 58**, which moved the green to hover and put a --stroke hairline back at rest; the border-image and mask-composite reasoning here still holds, and so does the 2px width.
iterations/24-card-dashboard-goals-trim/  the second paragraph and the whole four item .case-list removed from Card Dashboard section 02, leaving the goal and its measure alone. removed.html has both, correctly indented, and records that the block was rewritten twice the same day before it was cut: restore the "None of the four things below was in scope" version and never the "Four things were in scope" one, which the user has already corrected. Also why nothing is lost (section 03 already lists the ingress/placement and accessibility annotations work).
iterations/25-card-dashboard-team-role/  Card Dashboard section 03 replaced with the user's own team roster and a prose responsibilities sentence, retiring the UX working group paragraph and its five item .case-list. removed.html has both plus the old hero .case-meta Team value, which had to change in the same edit or the page stated the team two ways. Records why the rail keeps the short form, why 4&nbsp;Engineers carries a non-breaking space, and the two claims that came out of the copy and where each still lives on the page.
iterations/26-card-dashboard-servicing-linked-only/  a one sentence factual correction in Card Dashboard section 04: servicing kept the top of the page for linked customers only, because on-Amazon servicing is gated on account linking, not "in both cases". No markup change. Also flags the framework figcaption's "hold fixed placement in both", which makes a similar claim about the header, quick action pills and balance and was left alone because it describes what is drawn on that board.
iterations/27-card-dashboard-chase-linking/  Card Dashboard section 04 second paragraph: the unserved segment would not link their Chase account, not their "bank account", and they managed the card at Chase's app/website. Adds the gating rule that linking the Amazon and Chase accounts was required for on-Amazon servicing, which is what makes "most of the page was dead weight" follow rather than assert. Records why "bank account" was wrong here and right on Pay Bill, where it survives nine times.
iterations/60-bundle-carousel-hero/  the Basket Building hero image replaced with the current Figma frame, node `2373:29042` of `H3gOVBp2rmrTas26UAY195`, asked for as *"In improving basket building hero, show this phone frame/image"*. `bundle-carousel.webp` at 940x1937 retires `treatment-single.webp` at 840x1787, which had no other user on any live page; the wrapper, the `--bare` treatment and the no-caption decision are untouched. **Same composition, later screen, and the difference is the subject of the page**: one bundle card becomes a scrollable row of them, and the card gains **three ticked reasons the bundle fits** under a "Summarized from product information" line with the Alexa+ mark. Those reasons are what the AI Builder work is for, so the hero had been showing an earlier screen than the page describes. **The alpha is iteration 14's problem by a different route and iteration 14's fix does not work.** A Figma frame export has no alpha, so the four corners came back opaque white, which on `--bg` is the four white nicks the user flagged three times; but this bezel is **not a circular-cornered rectangle**, it is a continuous-curvature squircle. The proof is two readings that no circle can satisfy at once: the first non-white pixel down the left edge is at x=161 when y=0 and at x=0 when y=170, and a circle of radius R centred at (R,R) requires R=161 and R=170 respectively. So `proc.py` **reads the mask off the image instead of drawing it on**: the body is convex and the background is exactly white, so per row it is everything between the leftmost and rightmost non-white pixel, which is exact whatever the curve is; and each boundary pixel's own value gives its coverage, `a = (255-v)/(255-b)` with `b` from three pixels further in, so it gets alpha `a` and RGB `b`. That second step is why **there is no pale hairline to chase**: iteration 14 had to paint the discarded wedge `#1A1A1A` so LANCZOS would not drag white back along the curve, and here every partial pixel is already bezel-coloured with its whiteness moved into the alpha channel. Transparent pixels still get RGB zeroed, for iteration 11's reason. `TRIM = 1` drops the outermost ring because the node is 571.139 tall, so at scale 4 the last row is 56% covered and arrived `(158,158,156)`, a pale line along the bottom of a dark phone that the row-wise read does not model. **940 wide, not the 840 the other four phones use**, because this is the only one sized off `--case-hero-phone-h`, `clamp(26rem, 64vh, 60rem)`: at the 60rem ceiling the phone is asked for 960 CSS px of height, 1920 device px at DPR 2, which at this aspect is 932 wide, so 840 would have upscaled on a large monitor. Measured ratio of natural width to rendered width times DPR: 2.33 at 390, 1.63 at 744, 1.68 at 1024, 1.89 at 1280, 1.54 at 1512, 1.40 at 1920 and **1.05 at 2560**, the row that settles it. 138 KB against the old 101 KB, which is what that last row costs. Two things left open and recorded there: **`home-card.webp` still shows the old three treatments**, iteration 22 having baked it from iteration 14's crops, so the home page thumbnail and this hero now show different generations of the same screen; and the ticked reasons **name the Sonos app while the bundle is an LG soundbar**, which is in the Figma frame rather than the encode and is legible from 1512 up.
iterations/59-hero-rails-carry-impact/  the `.case-meta` rail's fourth cell changed from Org / Platform / Recognition to **Impact, carrying a number**, on all five case studies, asked for as *"update all project heroes to ensure that the last piece of information talks about the impact of the project instead of org, platform and recognition"* and clarified as *"I meant the showing impact metrics and numbers"*. Pay Bill goes from Amazon Inventor Award, 2023 to **23% fewer late fees, 21% less attrition**; Card Dashboard from the platform to **monthly visits 3.3M to 7.7M, up 2.3x**; KeyBank from g2o to **55 minutes to under 5, and 4 follow-on contracts**; Transactions from the platform to **10% fewer 1 and 2 star ratings, app rating up to 4.1**; Basket Building from the org to **11% Bundle Swap rate, units per purchase up 0.11**. All canonical, nothing new written. **All three old labels answered a question nobody asked**: Org and Platform said where the work happened, Recognition said it was liked, and none said it worked, so the one block a recruiter is certain to read held no result and the first number arrived four sections down. Each cell deliberately repeats a stat band figure, the rail being above the fold and the band not. **Pay Bill was the clearest case**: an award told a reviewer the work was liked before telling them it worked, which is the wrong order on a page whose job is to earn an interview. **Before deleting a metadata cell, grep the page for its content**, which is now rule 11 in section 12: the award survives in section 03 and on the home page, "shopping app" appears twice in each of two pages, and the Basket Building org four times, **but "g2o" existed NOWHERE on `keybank.html` except that cell**, so dropping it would have made agency work for a client read as in house work for a bank; it is folded into Team. Removing Basket Building's cell also retired the rail's only `&nbsp;` orphan fix. **The wrap took three passes and the third is the trap.** Measured at DPR 2 across 390 to 2560, three of five cells stranded a bare figure or word on line two (`contracts`, `4.1`, `to 4.1`, `0.11`), and a number alone on a line reads as a typo. `&nbsp;` fixed Transactions and Basket Building but **not KeyBank, where the break was inside the hyphen of "follow-on" rather than at a space**; `&nbsp;` does nothing about a hyphen, so the phrase needs `.nowrap`, and then the conjunction had to move inside the span because line one was ending on "and". Final: four cells at every viewport, never more than two lines, no tail under three words, longest value 52 characters. **11% and +0.11 remain publishable**: they are on the handoff's NEVER publish list as hypothetical modeling and the list is stale, the user having confirmed on 20 September 2026 that both are measured, and the hero cell now carries that note as well as the stat band, because the stale list has now twice nearly caused their removal. Without that, this page had no publishable impact figure and would have needed a different fourth cell from the other four. Also: `work/_TEMPLATE.html`'s fourth cell is hard-coded to Impact with the canonical constraint and the wrap check on it, and the section 12 skeleton names all four cells.
iterations/58-project-ring-on-hover/  the home page project cards' green ring moved off the resting state and onto hover, plus the Transactions card's year corrected to 2022, asked for together: *"I want the green border to only illuminate once I hover over the project thumbnail. And update Transactions year in the thumbnail to 2022"*. `.project` goes from `2px solid var(--accent)` to `2px solid var(--stroke)`, and `--accent` moves to `.project:hover, .project:focus-within`. **Five saturated green rectangles down a page whose whole intent is quiet were the loudest thing on it**, and iteration 23 had painted itself into a corner where hover could only deepen, never illuminate. Three decisions inside it. **The width stays 2px in both states and only `border-color` moves**, because border width is part of the box, so the 1px-to-2px version of this would shift every line inside the card by a pixel on hover; the measured card box is 1170.09 x 535.5 in all three states, which is the check. **Transparent at rest was rejected** even though it is the literal reading of the ask: the cards sit on `--bg` with a `--bg-raised` fill only a few percent lighter, so with no edge a card loses its boundary and `--shadow-sm` alone will not give it one. `--stroke` also remaps correctly in the dark scope, where a hard-coded colour would not. **`:focus-within` is required, not garnish**: the card's whole face is a click target through `.project__link::after`, so a keyboard user on the title is doing what a mouse user hovering is doing, and scoped to `:hover` alone the green would be a mouse-only affordance. `.project__link:focus-visible::after` still draws the actual 2.4.7 indicator on top. Note the other two hover behaviours, the title underline and the media `scale(1.03)`, are **still hover-only**, which is the same gap one layer down and wants its own pass. Hover lands on `--accent` rather than `--accent-2` because the move is now a brightening; `--accent-2` is still live on `.practice-card:hover .practice-card__title`. No contrast obligation either way, since the ring carries nothing the link text and focus outline do not. **The year change leaves two cards reading 2022** (Pay Bill and Transactions), which is not a sorting bug, the home page years running 2022, 2025, 2026, 2022, 2019 by strength rather than chronology; and **it now disagrees with `work/transactions.html`**, whose Timeline is "October 2023, September 2024, September 2025". 2022 is the year the screens in the thumbnail are dated. Flagged, not reconciled.
iterations/57-built-for-the-team/  the Practice band renamed **"Built for the team"** and its standfirst made to reach the divider above it, asked for together: *"The text width should match the divider widht on top. Also, come up with a better name than "Practice" ... documents I have written and tools I have built to uplevel the entire team"*. **The name** goes on the band h2, the nav label on all nine pages, and `practice.html`'s `<title>` and hero label; **`id="practice"` and the `#practice` fragment deliberately do not move**, because they are the target of the nav link on nine pages and of any URL already shared, and the file is still `practice.html`, so renaming them buys nothing a reader can see. "Practice" was a designer's word for a body of work, so a recruiter read these four as more work samples, which is the one thing they are not; "Built for the team" names the audience instead of the artifact. Rejected: "Internal tools" (two of the four are documents), "Team enablement" (HR register, and section 3 rules out the abstract noun), "Documents and tools" (makes the artifact the subject). Nav overflow with the longest label in the pill was measured on `scrollWidth` vs `clientWidth` at both `.nav__inner` and `.nav__links`, not eyeballed. **The width defect was real and was in shipped code**: `--measure-lead-wide: 84ch` was calibrated where the container ran 1170 to 1390, and `--page-max` puts it at about 1690 on a 32 inch monitor, so 84ch's 1210 stopped a third short of the rule. **A measure can never do this job** (it is a fixed box, so it matches at one viewport and falls short at every wider one) and widening it is not available, because span and size are one dial and a compliant 80 character line is about 920px at any viewport for any copy. **The settled treatment, after six passes and three rejected shipments, is ONE column with NO MEASURE AT ALL**, flush with the divider above it and the card grid below it, asked for a third time as *"I need that text column just as wide as the divider."* **It is not a special exemption: it is the third member of the uncapped set, with `figcaption` and `.case-note`, and it qualifies on section 9's own line-count argument** rather than in spite of it, at two lines a paragraph from 1280 up, the same property that makes a 237 character caption safe. So it is on a copy budget, and the budget is **one line at the widest width**: the copy was then streamlined to a single sentence of 148 characters on the user's instruction, *"Streamline this and just one small paragraph"*, against a line capacity of about 161. **The full measured ladder**, edges verified equal to the section head's at every width, with the line breaks because the shape of the tail matters as much as the worst line: 42 characters at 390 `[42, 40, 38, 25]`, 64 at 600 `[64, 62, 20]`, 79 at 744 and 860 `[79, 68]`, 83 at 1024 `[83, 64]`, 102 at 1280 through 1512 `[102, 45]`, 108 at 1728 `[108, 39]`, 122 at 1920 `[122, 25]`, 135 at 2200 `[135, 12]`, and 148 at 2560 and 3840 as **one line**. Inside 80 to about 950px of viewport, and never more than two lines above 600. **`text-wrap: pretty` is load-bearing**: without it 2200 broke as 142 + 5 and gave a five character word its own full width line, the one way an uncapped paragraph reads as broken rather than long. **`--t-lead-wide` is now the only lever on line length and it runs backwards**: the column is fixed, so raising the size shortens the line, 24px holding about 161 characters of capacity, 32px about 121, 36px about 107, and 36px is the ceiling because it is `--t-display-3`, the h2 above it. **80 characters at full width needs 48px, a third larger than its own heading**, which is the arithmetic that made the two asks mutually exclusive. It also inverts the copy relationship: with a measure, more words added lines; with none, more words lengthen the worst line toward 161. **Six passes**, and the CSS is the least of what they teach. `column-width: 33rem` spans correctly and **introduced a new 1.4.8 failure of 83 characters at 1024** in a single column, because `column-width` is a minimum not a count; `28rem` moved the failure rather than removing it, since the gap is inside the flip arithmetic (`(container - gaps) / n`); that same rule gave **three columns above 2100, numerically fine and wrong on the page**, reading as three fragments and breaking "documentation a" / "designer can learn from" across a boundary. Then **`column-count: 2` shipped and was rejected at once**, *"Why is this text breaking into two columns?"*, because **CSS columns flow ONE paragraph across the break**, so the sentence continued at the top of the second column and the reader had to travel back up to finish it. **Two whole paragraphs, one per column, shipped next and was rejected too**, *"These are still in 2 columns? I want them in one."* That is the finding: the objection was to columns, not only to the interruption, and **a deck in two columns reads as a newspaper whatever is in them**. Do not reach for CSS columns on running prose a reader is meant to read straight through, neither `column-count` nor a two column grid; they are right for a list or a set of short independent items. The deeper lesson is about verification: **every rejected pass passed its audit, and passing is what let two of them ship.** Measuring proves a line is not too long; it cannot tell you a reader does not want their standfirst in columns. One more trap worth the line: **a `ch` measure belongs on the element carrying the font size it describes.** `max-width: var(--measure-case-wide)` on the wrapper resolved 58ch against the inherited 18px and came out 622px, setting 55 characters instead of 77; on the paragraphs it resolves against `--t-lead-wide`'s 24px and comes out 835px. Nothing errored. **`--measure-lead-wide` is deleted**, and the interesting thing about it is that 84ch was the worst of both: over the character ceiling at 101 characters a line at 1280, *and* still visibly short of the rule at about 72% of the container. That is why the defect and the violation had the same cause and one change removed both. A compliant 58ch version shipped in between and was rejected, because stopping at 49% of the divider was the thing originally reported. **The copy was rewritten four times and the layout drove every rewrite**, which is the clearest thing in this iteration: 137 characters as one paragraph, then 270 to stop `column-count` setting one line per column, then two matched paragraphs of 205 and 207 for the two-column grid, then **one sentence of 148** once the column went uncapped, *"Streamline this and just one small paragraph"*. **The columns imposed a length floor and the uncapped column imposes a ceiling instead**, so the copy was never free: it is budgeted at one line at the widest width now. What was dropped along the way, and is worth knowing was deliberate: the pairing the 2x2 grid already draws (the documentation and the tool, then the agent and the playbook), "mine included", and the explicit "the case studies are work I shipped to customers" contrast, which the surviving sentence carries as "rather than for customers". The rewrite also dropped "the playbook the agent came out of", the last provenance claim of its kind in home page copy.
iterations/56-practice-hero-standfirst/  the `practice.html` hero standfirst removed, leaving the back link, the label and the h1 alone, plus section 04 renamed **"An AI Builder Playbook"** and its first line regained "designing and". `removed.html` has the paragraph verbatim. A smaller hero than any other page carries, and right here: the page is an index of capability rather than a sixth case study, and its four numbered sections each introduce themselves in their first sentence, so the standfirst was summarising what a reader was about to be told. It also closes an older complaint, that a `.prose` paragraph at `--measure-prose` inside a full-width hero hugged the left half of its column while the h1 ran wide. **Title case on that h2, against this page's own pattern** of sentence case ("Raising the accessibility bar"): the user typed it that way, so the playbook is being named like a thing with a title rather than described, the same reason section 02 is "Design Insight (AI tool)"; `index.html`'s matching card title moved with it so the artifact is not named two ways. The consequence to know: that paragraph was the last place on `practice.html` saying the playbook was where the agent came from, and iteration 57 later took the same claim out of the home page standfirst, leaving it only in a comment near `index.html:320`.
iterations/55-design-insight-impact-pill/  a new component, `.stat-pill`, carrying the week an accessibility approval takes in `practice.html` section 02, asked for as "the impact pill of reducing accessibility approvals down to avg 1 week from 3.5". **It shipped for exactly one commit and the user removed it**, *"Actually, remove that impact pill for now"*, so the CSS is live and no page uses it; everything below is why it is built the way it is, for when it comes back. **A pill because a band cannot do one figure.** `.stat-band` is `repeat(2, minmax(0, 1fr))`, so a single stat in it leaves half the panel empty, which is why iteration 53 left this section with no figure element at all and the number only in the prose. `inline-flex` on a baseline shrink wraps the pill to its own words instead, measured 522px of an 837px column at 1512 and 523 of 976 at 1920, so there is no empty half to explain and no `--measure-case` cap needed. Surface language is copied from `.stat-band` deliberately, a `--stroke` hairline over `--bg-raised` with the 9% accent radial, so section 01's band and section 02's pill read as two sizes of one idea; the numeral reuses `.stat__value` exactly, so the same figure looks the same here and on the home page Practice card. **Repeating a number already in the prose is deliberate, not an oversight**: section 01 has 7 and 0 in both its paragraph and its band, and only the paragraph can carry the caveat that earns the figure ("Accessibility is the part I can put a number on, because I was the one approving it"), so the paragraph keeps the number in context and the pill carries it for someone scanning. "on average" is in the unit because the ask said "avg"; the rest matches the home card's unit verbatim so the card and the section do not word one figure two ways. **No `data-count`**, for two reasons: counting up to 1 animates almost nothing, the same reason section 01's zero goes without it, and the 3.5 inside the unit is a baseline rather than a target and must not animate at all. Two things at 390, both worth keeping: the pill goes `display: flex`, full width, and squares off to `--r-xl`, because a 999px radius on a two-line box draws a lozenge with the text pressed into its waist; and **the numeral wraps onto its own line**, which is `flex-wrap: wrap` doing the right thing by accident, leaving the pill shaped like `.stat` with the value above the label, which is the better shape at that width. Contrast was **measured off a DPR 2 screenshot rather than computed from the tokens**, because the accent radial sits under the text and the token pair alone overstates it: numeral 8.74:1, unit 8.45:1, and unit over the darkest point of the wash 7.53:1, all three AAA. `--text-dim` not `--text-faint`, since the unit sets at `--t-small`'s 15px, which is body size, and `--text-faint` is only safe at 13px labels.
iterations/54-design-insight-screens/  the first real screen assets on `practice.html`, the Design Insight input form and results page, from Figma frame 2412:27731. **The resolution rule, and the bug that found it**: both figures render 835 CSS pixels wide at 1512, which is 1670 device pixels on a 2x display and more on a large monitor where the case column passes 1300, so the first pass's 1187px crop upscaled 1.4x and the user caught it, "Why is the image so pixelated?". They ship at 2374 and 2400. The reason it got through is the part to keep: **local Playwright screenshots run at DPR 1 and are structurally blind to this class of bug**, since at DPR 1 an 835px box wants 835 pixels and 1187 is plenty, so nothing failed. `audit-2x.py` in that folder is the fix and is reusable on any page, printing `naturalWidth / (cssWidth x DPR)` and flagging anything under 1.0. **Rendered height is `width x (source_h / source_w)`, so widening a crop makes a figure shorter**, which is counter-intuitive and load-bearing: the input form's crop is deliberately wider than the form, buying 224px of height, 1061 instead of 1285, and it is also more faithful, because the form really is a narrow column centred in a wide viewport. The header strip stays dropped for two reasons, the logo duplicating the hero title 50px below it and, at this framing, the logo and PREVIEW chip falling outside the crop so only an empty white band would be left. **The two figures deliberately do not match**, 835x1061 against 835x459, after three passes: a size-matched crop shipped and the user then asked for "the entire user interface" back, which reverses the sizing ask. Do not reach for a CSS height cap to close the gap, because 459 tall renders the form 317 wide, worse than the 320 that forced the first crop. Also records a **confidentiality judgment I got wrong**: the results screen was held back because the design in its left pane is labelled FUTURE CONCEPT and shows a device comparison with prices, and the user overruled it with "That is a dummy design I am not sharing anything thats confidential". A label on a canvas is a label, not evidence of provenance; only the user knows where a design came from, so ask rather than conclude. The node was later re-exported on request and one thing had changed, a contrast fix: the inactive Usability Heuristics tab went from a pale blue grey to the same `#6B7280` as Task Analysis, **1.98:1 to 4.55:1**, failing WCAG 1.4.3 AA before and passing after. A pixel diff bounded the change to that label's own box, so the alt text and caption still held.
iterations/53-practice-page-draft/  the Practice band on `index.html` and the `practice.html` page it leads to, four cards reading name, subtext, figure, call to action in that order on the user's instruction, "the impact number should be after the name of the project not before". Holds the draft the shipped page came out of, and **the markup for three figures cut on the way to production is still in that draft**, so a real capture is a paste: a `.shots--pair` of the two Design Insight states, since filled by iteration 54, and a one-up of the agent's terminal, still open. That terminal one-up is deliberately **not** in a `.chrome-frame`, because browser chrome around a terminal would be a lie, the same argument as the transactions phone hero. Four cards must not read as case studies six through nine, so `.practice-card` differs from `.project` on four counts, a 1px `--stroke` hairline instead of a 2px `--accent` ring, `--r-lg` instead of `--r-2xl`, no shadow until hover, and no media panel at all; the grid drops to one column at 860px, which is not a breakpoint token but where two columns stop holding the longest card title on one line. Also cut: a one-item `.stat-band`, because it is a two column grid and one stat leaves half the panel empty, which is the gap iteration 55 later filled with `.stat-pill`. **The one non-compliant measure the site ever had shipped here**, and iteration 57 has since removed it: `--measure-lead-wide: 84ch` put 101 characters a line at 1280 and 114 at 1920, over WCAG 1.4.8's 80, after three passes and three reaffirmations of the same ask. The load-bearing fact, now in `components.css` on `.practice-lead`: **span and type size are one dial**, so at `--t-lead`'s 24px cap a compliant 80-character line is about 920px wide at any viewport for any copy, and a column wider than 920px cannot be filled by compliant body text. This iteration's conclusion was that the fix is more words. It is not: the paragraph now has **no measure at all** and takes the full container, joining `figcaption` and `.case-note` as the third uncapped block on the site, held by a two-line copy budget rather than by CSS. Columns were tried on the way there, twice, and rejected twice. Read iteration 57 before going near that paragraph.
iterations/52-shots-group-lead-spans/  the lead-in paragraph above Basket Building's two desktop screens now spans them, at the user's report that "the text should span the entire width of the image below it". Two new tokens, one new rule, no HTML changed. The defect was measurable: `.case-section__body .prose` caps at `--measure-case`, 55ch, which resolves to **694px at every viewport above about 1000px** because `ch` tracks a font size that was fixed, while the one-up `.shots` below spans the body column, so the paragraph reached 71% of its image at 1920 and 58% at 2560 and read as clipped. **The obvious fix is not available**: `max-width: none` puts about 96 characters on a line at 1512 and 138 at 2560, against WCAG 1.4.8's 80, which `components.css:815` already records as the reason prose does not span the column. So the size goes up with the width and the line length stays put, which is the trade `--measure-case` is itself built on, running in the opposite direction: that note fixed a line that ran long, this one widens a column on purpose and pays for it with type. `--measure-case-wide: 58ch` and `--t-body-lead: clamp(var(--t-body-case), 2vw, 1.375rem)`. **A `ch` measure is the load-bearing choice and a pixel max-width could not do this job**: `ch` is a proportion of the font size, so 58ch is 79 characters whether the type is 20px or 24px, and the type can therefore grow to fill the column without the line length moving. 58 is the largest value inside the 80 ceiling. **Both halves are required**: the wide measure alone runs to 96 characters, the larger size alone just sets the same 75 characters bigger and still stops short. Measured span 100% at 390 and 744, 92% at 1280, 96% at 1512, 83% at 1920 and 67% at 2560, longest line 37 to 79 characters, **never over 80, which is where it was before the change too**. **The cap was set three times, downward each time, and that is the lesson.** The first draft capped at 1.75rem, 28px, which spans 100% up to 1920 and 85% at 2560, and the user asked "why is that text so big? compared to the rest of the page"; it went to 24px and the user reported it as "still bigger than the regular content on the page"; it is now 22px. The answer is that **span and size are locked together and cannot be traded**: 58ch *is* the 80 character line, so the size at which the block fills the column is exactly the size at which the line reaches the ceiling, and filling W pixels needs about W/35 pixels of type. There is no setting that spans wide and stays small, so the cap is the only real decision here and it is a decision about how much span to buy. Measured at five caps, span and longest line: 20px gives 84/79 at 1280, 88/79 at 1512, 75/79 at 1920, 61/79 at 2560; **22px gives 92, 96, 83, 67**; 24px gives 100, 100, 90, 73; 26px gives 100, 100, 98, 79; 28px gives 100, 100, 100, 85. **22px is 2px over body copy, at the edge of what a reader notices**, and it still lands within about 30px of the image at 1512, which on a ragged right edge is not legible as a paragraph that stopped short the way the original 141px was. 24px, 26px and 28px buy the rest of the span and were each rejected on report, because width on a monitor size most readers do not have is not worth type that reads as a heading. **20px, exact parity with body copy, is the one row that cannot also span**: it falls about 100px short at 1512 and a quarter short at 2560, close to the defect this iteration was opened to fix, which is the floor under the whole trade. So "too big" was the right complaint about the wrong quantity: the size is not decoration to dial back on its own, it is how much span is being bought, which is why it took three passes. Two deliberate refusals. Leading was NOT tightened, though the enlarged type at `--lh-relaxed` looks loosely stacked and the first draft of the rule dropped it a step: **WCAG 1.4.8 also asks for line spacing of at least 1.5 within a paragraph**, the same success criterion as the character cap, so `--lh-snug` at 1.16 and `--lh-normal` at 1.45 both fail and 1.6 is the only compliant token on the scale. And the size caps at 22px, so the paragraph stops spanning on a wide monitor, 83% at 1920 and 67% at 2560 against 71% and 58% before: chasing the rest means chasing the size, a full span at 2560 needs 34.7px, within a pixel of `--t-display-3` at that viewport, and body copy the size of the h2 above it reads as a heading. Scoped to `.shots-group`, whose only user is this paragraph; verified at 1512 that every other `.prose` on all five case studies is still 694px at 20px and only Basket Building reports a wide one, 805px at 22px. This is the third rule in that neighbourhood to conclude that **wide media drags the text attached to it wider** (see `.shot figcaption` at `components.css:1121`, itself generalized from `.shots-group`) and the first to pay for it with type size rather than by relaxing the ceiling.
iterations/51-basket-building-strategy-credit/  the "There was no brief to work from" paragraph in Basket Building section 04 rewritten so the two UX strategies have an author, at the user's report that it read as weird and gave him no credit for proposing them. Three sentences, no markup change, no new facts, no numbers. **The two complaints were one grammatical defect: every actor in the paragraph was a document.** "the first deliverable was a UX strategy" had nobody producing it, "**It** proposed two experiments" had the strategy proposing itself, and "Each carried its own treatments" had the treatments arriving pre-attached; three sentences, three inanimate subjects, and the person who did the work appearing nowhere. The fix adds no praise, it restores the subject: "I wrote two UX strategies before designing any screens" and "I gave each one its own treatments". This was simultaneously a **standing voice violation**, since the handoff forbids making an artifact the subject of the sentence, which is the useful part: the rule exists to stop prose going airless and the place it was broken is the place the user found unreadable. **When a paragraph reads as weird for no obvious reason, count its subjects.** Also swaps "two experiments" for the user's own "two UX strategies", which is a real distinction rather than a synonym: what he delivered was strategy, what the org funded was experiments, and only one ever ran. "experiment" still appears below in the `.case-list` and the read-out, where something was actually run, so the difference now reads as deliberate instead of as the page calling one pair of things experiments in prose and concepts in a list. Deliberately not added: any superlative, since "There was no brief to work from" already carries it at the front of the sentence and saying it twice weakens it. Records one measurement trap: **count characters on the rendered lines, not in the source**, because a first pass reported a 91-character longest line that was really about 78 plus a newline and twelve spaces of indentation.
iterations/50-transactions-p2-screens/  the September 2025 release gets its two screens in Transactions section 05, a new `.shots--pair` of the scrolled list and the Amazon transaction detail, which closes the gap iteration 48 recorded: the hero's Timeline rail named three releases and the section showed two. Nothing removed. **The Figma MCP needs an edit seat, and the seat is per plan.** The file first linked, Portfolio `zJYEOABYKoSwN9PsrWWzZb`, returned "Looks like you don't have edit access to this file" from `get_metadata`, `get_screenshot` and `get_design_context` alike; `whoami` shows `View` on "Rishabh's Starter team" and `Full` on "Amazon (Consolidated)", so personal-team files are unreadable and no token is configured as a fallback. The assets came from the second file instead, AI Builder --- Bundles `H3gOVBp2rmrTas26UAY195`, frame 2392:47303. **`iterations/50-transactions-p2-screens/proc.py` is the encoder of record; do not re-export these by hand.** It fixes two defects, and the first is the one to remember: **a Figma frame export is fully opaque and carries the frame's own #F5F5F5 fill in the corners outside the phone silhouette**, so published as-is it shows four pale nicks on the case study's tinted panel, iteration 14's defect from a new direction. The fix is iteration 14's with the silhouette *measured rather than drawn*, because **an iOS device-frame corner is a squircle, not a circle**: the wedge is 252px deep at the top edge and 115px at y=50, where a circle of r=252 predicts 101. So the background is found by flood fill from the four corners on exact colour, dilated 2px, and painted with the nearest frame pixel along the same row before the alpha goes on, both phones masking to the same 67,363 px. Exporting a narrower node does not help; `3-border-dark` comes back just as opaque. Second defect: the iPhone component bakes six antenna ticks into the frame, whose coordinates were read out of the `0-antenna` layer rather than hunted, then cross-checked against an independent edge scan. **All six were repainted along the wrong axis on the first run**, because the axis came from the rect's aspect ratio and these rects are 6.87 x 4.91 node units, near enough square that `PAD` alone flips the comparison; the axis now comes from which edge of the node the rect touches, with an assertion that it touches exactly one. The lesson generalizes: do not infer an axis from the aspect ratio of something almost square. Placement **departs from the ask**, which said "at the end of the experience section": the pair sits after the P1 pair and before the accessibility pair, because the annotation sheet and the same annotation under VoiceOver are the section's closing argument and release screens after them read as an appendix; the section comment now states that the pairs run P0, P1, P2. The two captions give **no rate as a number**, because no caption anywhere on the site contains a `%` or the word "percent" and because these earn rates are not on the handoff's canonical list; the rates are in the alt text, where a screen reader user has nothing else. Also identifies the long-unused `rewards-earned.webp` as the before-state for the rewards-clarity change.
iterations/49-transactions-caption-dates/  the two dated figcaption leads in Transactions section 05, "The list, October 2023" and "The list, September 2024", become "The list, first release" and "The list, second release". Two strings, nothing else changed. **Deleting the dates and stopping was not an option**: both captions would then have read "The list." and a one-up `.shots` caption exists to say which screen this is, so two identical labels would have been worse than a stale date. "first release" and "second release" are **the page's own idiom, not an invention** — `transactions.html:395` already read "Detail, second release", so there was a house style to defer to and the substitution needed no asking. Beyond having been asked, this is right because the rail now names three releases and section 05 shows two: dated captions invite a reader to line them up and find September 2025 missing, numbered ones only say which of the two screens in front of them came first. The gap from iteration 48 is unchanged and still needs assets. **Seven dates elsewhere in the page's visible text were left**, enumerated in the README with why each is load-bearing: the meta rail, the pull quote's February 2021 attribution, "Until 2023" and "in 2020" in section 01, the two dates in section 04's prose, the stat band's September 2025 and the footer's © 2026. The two source comments `<!-- P0, October 2023. -->` and `<!-- P1, September 2024. -->` were kept on purpose: they are maintainer notes rather than visible text, and they are now the only record of which release each screen set is.
iterations/48-transactions-vision-100-and-bare-frame/  two changes asked for together. Transactions section 04's fourth stat goes from "90% / Of the UX vision shipped by September 2024" to "100% / Of the UX vision shipped by September 2025" at the user's direction, and the prose above it keeps the 90% on purpose, because the first release landing 90% against Chase's API limits is the story the paragraph is telling and the stat band reports the end state. **100% and September 2025 are not on the handoff's canonical numbers list** and are published on the user's instruction, like the 4.07/4.33 pair, the 11% swap rate and Card Dashboard's $158; they need adding to that list. The hero meta rail was left alone in the first pass and then updated in the next message once the user confirmed a third release; it now reads "October 2023, September 2024, September 2025". The obvious edit, appending to the old "Released October 2023, then September 2024", came to 61 characters and **wrapped to two lines at both 1512 and 390**, making Timeline the only two-line cell in the four-cell grid, so it was cut to three bare dates to match the other four pages. **A meta rail value is a label, not a sentence, and the `dd` is only about 350px wide at every viewport; check a new one fits one line.** Also notes the gap this leaves: section 05 has screens for the October 2023 and September 2024 releases but none for September 2025, and no source assets for it exist in the repo. Second change: **`.shot__frame--bare` added as a second selector on the `.shot__frame--device` rule**, no new declarations, for a flat artifact whose corners and shadow are already in its alpha channel. `evidence-reviews.webp` is RGBA with alpha 0 at all four corners and alpha 1 mid-edge, so `.shot__frame` was drawing a second radius, stroke, tint and shadow around an image that had its own, which is the same doubled-curve smudge already documented for phone exports. This retires an open item: that file was on the "three remaining baked-shadow assets" list needing a re-encode, and **that was the wrong diagnosis**, the shadow is the asset's intended treatment and the frame was the defect. Named `--bare` rather than reusing `--device` because a reviews page should not carry a class named for a phone bezel. Same precondition as `--device` and it is in the CSS comment: check the corners are transparent first, since with no frame there is no `overflow: hidden` clipping a radius.
iterations/47-transactions-evidence-in-background/  `evidence-reviews.webp` moved from the top of Transactions section 05 to the end of section 01, at the user's request, so the reviews screenshot sits under the paragraph whose "almost half of 1 and 2 star reviews" claim it is the evidence for. Nothing deleted; one `.shots` block relocated on the same page and two comments rewritten. The ask cited Pay Bill as the precedent and **Pay Bill's background section has no image and never has**; the page with the treatment is Card Dashboard, which got it the day before in iteration 26's neighbourhood. Records the check that established that (extracting `#background` from all five case studies plus the template and listing every figure and img inside), and the rule it suggests: **when an ask cites a precedent, verify the precedent exists on the page named before copying anything.** Also records why the new position is better and not merely requested, since section 05 is titled Experience and a reviews page is not part of the experience, which is why that block needed an explaining comment there and needs none here. Notes the layout fact that a `.shots` block directly inside `.case-section__body` spans the full media column and so overhangs the `.prose` above it on purpose, 837px against 694px at 1512. Two pre-existing faults the move makes more visible: the asset carries a roughly 24px baked-in shadow, and at 390 it renders 345px from an 1800px source so the review titles are illegible.
iterations/46-about-copy-trim/  three copy cuts on the about page at the user's direction, one in Accessibility and two in AI and design ops, plus one verbose sentence rewritten because it "sounds verbose" and read as AI-written. All three deleted sentences turned out to be the same move: a summary of the sentence before them, an aphorism placed after evidence to tell the reader what the evidence meant. Section 3 bans editorializing before evidence; this is the after-evidence version of it, and the test the README proposes is that **a sentence which can be deleted with the paragraph still saying everything it said was doing rhetoric rather than work**. Records the four separate reasons the verbose sentence shrank from 37 words to 25 (a metaphor and its own explanation stated twice, "handoff hygiene" being a phrase nobody says out loud, four items being one too many for an unpunctuated `X and Y and Z` list, and a concrete "the team used to do by hand" replacing an abstraction about reclaimed hours), and why removing the "every page here is hand written" paragraph costs nothing: the claim was always weaker than the artifact, which a recruiter can read in view-source. Also corrects iteration 42's structure list, which still says six sections; the page has had five since 43 removed Where I've worked.
iterations/45-home-project-order/  the five home page `.project` bands reordered to Pay Bill, Card Dashboard, Basket Building, Transactions, KeyBank, at the user's direction. A straight swap of 01 and 03; 02, 04 and 05 did not move. Each band moved whole and only `.project__index` and its marker comment were renumbered, verified by diffing the sorted set of every link, stat, tag, year and image path in the section before and after. The `.next-case` chain through the five case studies was rewritten in the same pass, because it was already an exact mirror of the home page order and leaving it would have sent a reader following "Next case study" round a different sequence from the one the home page shows; both the href and the visible title were updated on all five and checked against each other. **If the home page order changes again, change the chain in the same commit**, since nothing enforces the mirroring. Records why Pay Bill is the strongest opener (the only Inventor Award, and two against-goal outcomes rather than a sized gap), and that the years now run 2022, 2025, 2026, 2024, 2019 on purpose because the order is by strength rather than by date. The side-to-side alternation is `:nth-child` in components.css so it re-alternated on its own; no CSS changed.
iterations/44-about-accessibility-claim/  the second and last paragraph of the about page's Accessibility section removed at the user's direction, "for now", so the section stops at what he does rather than turning outward to assert that the case studies treat accessibility as a constraint and that this site was checked against the same bar. Both assertions were true and the README records that, since nothing on the page now says so, along with the reason the section is stronger without them: a page cannot verify itself for a reader. removed.html has the paragraph verbatim at its original indentation and about.html keeps a comment at the spot. No measurement moved, because the page's longest line was never in that paragraph.
iterations/43-about-legacy-copy/  the about page's biography replaced with the legacy rishabhsingh.design/about page's own copy, near enough verbatim, because the version iteration 42 wrote in this site's voice read as over the top. Accessibility and AI and design ops were left exactly as they were, by instruction. Getting here, How I work and Away from work are now one legacy paragraph each, the hero deck is the front half of the legacy opening paragraph split at its natural seam, and Where I've worked is gone, roster and Inventor Award and all, because the legacy page has no such section; `about-verbose.html` holds the whole previous page so the roster is one paste from coming back. Records the two mechanical changes made on the way over (the en dash in "(2015-2017)" and the degree name hyphenated to match the hero rail), the three things the legacy copy does that section 3 forbids and which are deliberately kept, and the one sentence worth cutting but kept because it is his: "Let's connect" now lands third in a row of three closings. Also records how the copy was recovered after WebFetch paraphrased it and mod_security blocked a browser-agent fetch: plain `curl` of `/about` with no user agent returns the page, and `/wp-json/wp/v2/pages/8` returns empty because the site is built with the Semplice page builder.
iterations/42-about-page/  `about.html`, the last unbuilt page on the site and a 404 linked from the nav of all six others until now. Records where the content came from (the legacy rishabhsingh.design/about page for the biography, the handoff's identity-facts block for the AI work and the employer roster) and the two content boundaries held: the enablement pivot origin story is interview-only so the tools are named but not their history, and the design agent's speedup is described qualitatively because the figure is not on the canonical numbers list. Holds the reasoning for the four deliberate departures from the case study skeleton it is built on, in particular why the hero portrait is capped at 20rem and given the bare phone's 1.9fr/1fr track rather than filling its column: the only headshot asset is 512px square, so a filled 1fr track renders it at 1:1 and makes it the one soft image on the site. Also holds the counting-script bug that made the page look like a 1.4.8 failure at 93 characters when it was at 76, and the lesson: calibrate a counting script against a page whose count is already known before trusting it on a new one.
iterations/41-project-summary-card-width/  the home page card summary was the only thing in a project card that did not fill the card's body column, 65px short at 1512 and 296 at 2560, and the @media override meant to fix that for the stacked card was running the line to 86 characters at 640 and 91 at 900, past 1.4.8's 80. Replaced two competing caps and `--measure-short` with one ceiling, `--measure-card: 48ch`. Holds the before and after widths and longest lines at seven viewports, the 10px-step calibration showing the ceiling is 510 to 519px, and the trap worth reading before adding any measure: do NOT apply the CHARACTERS x 0.73 rule to a maximum-line target, because that factor was counted on typical lines and gives 58ch and 96 characters here. Also that a `ch` measure is only calibrated for the element it was counted on, that Pay Bill's summary now sits at exactly 80 so every copy edit to a `.project__summary` must be re-counted, and why the residual shortfall at 1920 and 2560 is the accessibility floor rather than timidity.
iterations/40-experience-section-name-site-wide/  section 05 is called "Experience" on all five case studies and in the template, not "Screens", closing the inconsistency iteration 32 opened. Three strings per page (the banner comment, `aria-labelledby`, and the `id` plus the heading text), and the record of why the `id` had to move with the visible text rather than being left behind. Also holds the two things a substitution would have missed: the one piece of published body copy that named the section, in Transactions section 04, and five comments across four files. Records the section 12 table row and the section 8 reveal-observer warning that both named it, the proof that the longer word is still 1 line in the narrow sticky aside at all five widths (the 256px aside at 1280 is the tight case), and why "Screens" was narrower than the section's own contents on three of five pages.
iterations/39-pay-bill-wireframes-first-person/  "Early wireframes did double duty" rewritten as "I worked the payment experience out in wireframes early, before there were requirements to design against", because the wireframes were the subject of all four clauses and the designer was in none of them. The user's diagnosis was that it discounts the thinking and the effort. Records what "before there were requirements to design against" earns, why no claim about the two companies having to agree was added back (iteration 38 had just removed it), why invented specifics about the wireframes were rejected, and the general rule it produced, now a section 3 bullet: never make an artifact the subject of the sentence.
iterations/38-team-role-second-sentence-removed/  section 03 lost its second sentence on the two pages that had one: Pay Bill's "Because two companies had to agree on every screen..." and Transactions' paraphrase of the same claim. All five case studies are now roster sentence, colon, .case-list, which three already were. Records why the Transactions variant was read as in scope, that nothing factual was lost because both pages still carry the Amazon-and-Chase fact as a .case-list bullet, the before and after line counts (Pay Bill went 7 rendered lines to 3 at 390), and the template placeholder "{{WHO WAS ON THE TEAM, AND WHAT MADE THE ROLE UNUSUAL}}" that was the actual source of the pattern and would have put it back on the next page. Also flags "Software Developer Manager" on Card Dashboard.
iterations/37-pay-bill-team-numbers/  Pay Bill's team became a Product Manager, me, and 15 engineers, from an SDM plus six. Two changes, not one: the count more than doubled and the Software Development Manager left the roster entirely, so SDM now appears nowhere on the site. removed.html holds both replaced values, because the page states its team twice (hero rail and section 03) and iteration 25 is the record of what happens when only one is changed. Notes why the numeral replaced "six", why the rail carries 15&nbsp;engineers, why the Role field was left as "UX lead, end to end", and that the handoff outside this repo may now be stale on this.
iterations/36-home-card-tags-credit-card-servicing/  the home page cards for Pay Bill and Transactions said "Fintech" while the pages they link to open on a "Credit card servicing" badge, as does the Card Dashboard card. Two words in index.html, recorded in the README since there is no file to archive. Notes that "Fintech" is now used nowhere on the site, and the one cost: .project__meta has no flex-wrap, so at 390 the longer pill wraps its text over two lines and the row grows 31px to 43, which is what the Card Dashboard card has always done there.
iterations/35-case-note-full-width/  the closing `.case-note` text lost its `--measure-case` cap, so the two sentences fill the dashed panel instead of stopping at 694px inside an 837 or 1208px box. Holds the removed declaration with its original comment, the measured line counts and longest lines on all five case studies at five widths (2 lines and 104 characters at 1512, 1 line and 155 at 2560, nothing moved at 390 or 640), the 1.4.8 argument that makes it the same trade as iteration 29's caption rule, the copy budget it depends on (the note must stay two sentences), and the reason the cap looked like a bug rather than a measure.
iterations/34-wide-asset-baked-shadows/  the muddy rim and the chewed corners. All three of Card Dashboard's wide exports had a drop shadow and a small corner radius baked into the file, so `.shot__frame`'s 1px stroke and 28px clip were a second edge over the artwork's own. reproc.py is the encoder of record for all three: it crops to the tight opaque bbox (4px and 8px rims removed, asymmetric because a shadow has a y offset), fills the corner arcs from the nearest opaque pixel so the frame's radius is the only rounding, and saves RGB rather than RGBA. Records the before and after edge profiles, why the phone exports must keep their alpha while these must lose it, why there is no resize back to 1800, that the input was already lossy because no original capture for these exists in the repo, that iteration 31's "the frame's bigger arc swallows the corners" reasoning was specific to that file, and the three assets on other pages with the same defect left unfixed.
iterations/33-three-phones-one-line/  the Me tab, the wallet page and the dashboard moved onto one line in `.shots--trio`, in journey order, replacing iteration 32's solo dashboard and paired ingresses. Holds that markup, which is now the only worked example of `.shots--solo`. Records the cost (263px phones at 1512 instead of 396, checked by looking rather than measuring: balances, rewards figures and button labels stay legible, body copy inside a screenshot would not), the proof they are on one line (same `top`, left offsets 0/287/574 in the asked-for order), why `--solo` was kept unused on the `--trio` precedent, and the warning not to reorder the row in CSS, since the visual order and the source order carry the same argument.
iterations/32-experience-section-order/  Card Dashboard's section 05 renamed from "Screens" to "Experience" and reordered so the experience leads, then how it is reached, then the thinking behind it. Holds the derivation of `.shots--solo` and the `--shots-gap` token that makes it possible, the measurements proving a solo phone matches a `--pair` cell at five widths, why the hero export is deliberately repeated as the section's first figure (the Pay Bill precedent), the caption written for it because the user supplied none, and the naming inconsistency it opened, which `iterations/40-experience-section-name-site-wide/` closed the same day by renaming the other four case studies and the template to match.
iterations/31-ingress-board-to-background/  the 6-step ingress filmstrip moved from the top of Card Dashboard section 05 to the end of section 01, where the paragraph it is evidence for lives, and was re-encoded from a new source the user supplied. reproc.py is the encoder of record: it crops the screenshot's soft dark glow off (found by scanning for the first opaque near-white pixel, not by assuming an inset) and deliberately leaves the board's own ~60px corners alone, because `.shot__frame`'s larger `--r-xl` arc swallows them. Also why the old asset was worse (the heading "6-step ingress to outdated ECM" was baked into it as pixels), and the note that at 390 the board is 110px tall and nothing inside the seven phones is legible.
iterations/30-device-frame-removed/  `.shot__frame--device` stopped drawing a frame: no tinted platform, no stroke, no shadow, no radius, no padding, so a phone export sits directly on the page and is about 12% wider. Holds the one removed declaration with its original comment, why the padding could not stay once the frame went, the check that all 22 phone exports have alpha 0 at every corner and what a violation would look like, the measurements at 390/1280/1512/2560, why the 2px caption-to-`<img>` delta on non-device shots is `.shot__frame`'s border and not a break of iteration 29's rule, and the note that `.shot__frame`'s accent tint is now invisible everywhere.
iterations/29-caption-width-site-wide/  the caption width rule went site-wide: .shot figcaption, .case-hero__cap and .proto-block > figcaption lost their max-width, and the .shots-group override that used to do this for Basket Building alone was deleted. Holds the four removed declarations with their original comments, the before and after measurements (64 of 135 captions were short, now 0), what did not move (every caption at 390 and every two-up cell at 1512), the copy budget the rule forces and the five captions currently over it, and why a direction given once about one figure should have been read as a direction about the pattern.
iterations/28-card-dashboard-ops-dsi-stat/  Card Dashboard section 04 third stat: 28% of contacts became $158 OPS DSI per account linked, at the user's firm direction. Holds the removed 28% stat ready to restore, the note that the handoff calls $158 "the stake, not the outcome; analysis never run" and lists it under NEVER publish and interview-only, the reason a $ prefix animates correctly through countUp, and the two 28% body-copy occurrences that were deliberately left on the site.
prototypes/<slug>/index.html   self-contained HTML prototypes, embedded in a case study by .proto-embed[data-src]. One per project, at most. Exempt from the no-<style> rule. If generated, the generator sits beside it (build-from-source.py) and is what you edit.
```

Load order in `<head>` is always: `tokens.css` → `base.css` → `components.css`.

## 3. Voice (applies to all copy on the site)

These come from the portfolio content handoff and are not stylistic suggestions.

- **Never use em dashes.** Use periods, commas, or parentheses. This includes titles:
  write "Improving Basket Building", not "Improving Basket Building — AI Builder".
- Plain, sequential, first person. "After X, I did Y."
- **Never make an artifact the subject of the sentence.** Not "early wireframes did
  double duty", "the prototype showed", "the research revealed". Write "I worked the
  payment experience out in wireframes", "I prototyped it and watched participants
  try it". This is the specific way the first person rule gets broken without using
  any of the constructions banned below, which is why it needs its own line: it
  sounds modest and reads as absence, and it hands the credit for the thinking to
  the deliverable. The user's own words for it, on 2026-09-20: "It discounts me
  having to think and create wireframes and put effort into it." Full reasoning and
  the fix in `iterations/39-pay-bill-wireframes-first-person/`.
- No rhetorical fragments, no antithesis constructions, no punchy parallel sentences.
- No editorializing before evidence. State the fact, let the reader conclude.
- Contractions are fine. Slightly conversational is fine.
- Never publish an unmeasured or modeled number as an outcome.
- A page is a trailer, not the meal. Short sections, one hook per page.
- **Hyphenate a compound modifier, and only when it is one.** "high-fidelity mock
  ups" and "end-to-end user flows", because the pair modifies the noun after it.
  Not "Both states, high fidelity", where the phrase stands on its own after a
  comma and modifies nothing. All five case studies said "High fidelity mock ups"
  until 2026-09-20 and four of them were corrected in one pass, along with an alt
  text reading "Four high fidelity phone screens"; the one figcaption that was
  already right was left alone. A new page inherits the phrase from whichever page
  it was copied from, so this is worth a look when adding one.
- **"mock ups", two words**, on all five pages. Not "mockups" and not "mock-ups".
  Not defensible as grammar, just consistent, and it is the form the user writes.
- **A caption is two sentences: a bold label, then one sentence on what to notice.**
  This is a hard budget, not a preference, because a caption is now exactly as wide
  as the image above it (section 11, the caption width rule) and a one-up screen is
  about 160 characters a line at 1512 and 230 at 2560. Two sentences wrap to one or
  two lines, which is the whole reason the width rule is safe. Four sentences is two
  very long lines and is the only way it reads badly. Five captions are over budget
  today and section 11 names them; the fix is always to trim the caption, never to
  narrow it.

Length budgets on the home page, so the work and not the copy carries the page:

| Slot | Budget |
|---|---|
| Hero lead | one sentence |
| Project summary | two sentences, 45 words at the very most |
| Stats per project | two, never three |
| Stat label | under 6 words |
| Contact lead | two short sentences |

## 4. Color

Two layers: a fixed sand paper surface set, and **one accent**. Color is an
identity here, not a variable. Every section, panel, stat, and glow on the site
draws on the same forest family, which is what makes the scheme readable.

### Surfaces and text

| Role | Token | Value |
|---|---|---|
| Page background | `--bg` | `#EDE4D6` |
| Card, panel | `--bg-raised` | `#FBF7F0` |
| Nested panel, hover | `--bg-raised-2` | `#E4D9C7` |
| Glass fill | `--bg-glass` / `--bg-glass-strong` | `#FBF7F0` at 66% / 88% |
| Primary text | `--text` | `#191409` (13.9:1) |
| Secondary text | `--text-dim` | `#514834` (7.0:1) |
| Tertiary, labels | `--text-faint` | `#5E5540` (5.3:1) |
| Hairline | `--stroke` / `--stroke-strong` | ink 12% / 24% |

Nothing on the page is pure grey and nothing is pure black. Both the paper and
the ink are warm, which is what keeps a light palette from reading as a document.

### The dark beat

Put `class="on-dark"` on a `<section>` or `<footer>` and every token above flips
to the warm near-black set (`--bg-dark` `#14110C`, `--bg-dark-raised` `#1F1A13`,
text `#EDE4D6`). On the home page this is the contact footer and nothing else.

**`.on-dark` does not lighten `--accent` or `--accent-2`.** A button is its own
surface: its label is still white, so lightening the fill breaks the label. Only
the two gradient-*text* tokens lift, because they sit directly on ink. The fill
instead gains a visible edge (`.on-dark .btn--primary` borders in
`--accent-lift`), which is what carries the 3:1 control boundary.

**Use it at most once per page.** Two dark bands turn the contrast beat into a
stripe pattern and the light direction stops reading.

### The accent. One hue, four steps.

| Token | Value | Contrast | Use |
|---|---|---|---|
| `--forest` | `#146A47` | 6.7:1 under white text | the accent |
| `--forest-deep` | `#0E4E34` | deepest | second stop of every fill gradient |
| `--forest-lift` | `#2E8C62` | 3.3:1 on `--bg` | last stop of display gradient text |
| `--forest-bright` | `#6CCBA0` | 1.9:1, decorative only | aurora blobs, rings, small glyphs |

Components never reference those four directly. They use the semantic layer:

`--accent` · `--accent-2` · `--accent-lift` · `--accent-3` · `--accent-ink`
(`#FFFFFF`, text on an accent fill) · `--grad-accent` (fills) ·
`--grad-accent-soft` (tints) · `--grad-text` (display gradient text) ·
`--grad-accent-text` (small gradient text) · `--glow`

Why fills and gradient text are different tokens: a fill carries `--accent-ink`
on top, so `--accent` has to stay dark enough for 4.5:1 with white. Gradient text
sits on the page, so its stops are judged against `--bg` instead. One token
cannot satisfy both, and collapsing them is how the footer button label ended up
at 3.2:1 before this was split out.

### Swapping the palette

Sand and forest was picked out of a six-palette bake-off and is now folded into
`tokens.css` for real: the artwork, the favicon, and `<meta name="theme-color">`
are all recolored, so nothing depends on the preview harness any more. The
leftovers (`assets/css/palettes/` and `preview.html`) are safe to delete.

If a future palette needs comparing, the harness pattern still works: a palette
file is a pure token override (surfaces, text, strokes, shadow tint, the four
accent steps) and may never contain a component rule; `preview.html` loads
`index.html` in an iframe and swaps that one stylesheet, so every option is
judged on identical layout, copy, and motion.

Any new palette must clear these, verified by `/tmp/contrast.py`:

| Check | Floor |
|---|---|
| `--text`, `--text-dim`, `--text-faint` on `--bg` | 4.5:1 |
| `--accent-ink` on `--accent` and on `--accent-2` | 4.5:1 |
| `--accent` and `--accent-2` as small text on `--bg` | 4.5:1 |
| `--accent-lift` on `--bg` (display gradient text) | 3:1 |
| `--accent` on `--bg` (control boundary) | 3:1 |
| Both `--grad-accent-text` stops on `--bg-dark` | 4.5:1 |
| `--accent-lift` on `--bg-dark` (the dark button's border) | 3:1 |

**Rules:**

1. **Do not add a second hue.** No per-project accent, no per-section accent.
   A new project page inherits the site accent and sets nothing.
2. `--positive #0B7B3C` is the only non-accent color on the site. It is reserved
   for a genuinely positive signal inside artwork (a savings figure, an "after"
   bar), never for decoration or for a section's identity.
3. Depth comes from the four steps of the one hue plus opacity, not from more
   colors. The aurora blobs are forest and forest-bright.
4. Accent surfaces stay quiet: `color-mix()` at 7 to 12% over a raised surface.
   The accent goes full strength only on the primary button, the project index
   chip, the nav dot, the band's top hairline, the contact underlines, and the
   stat numbers.
5. **Every stop of `--grad-text` must clear 3:1 on the page background**, because
   gradient text is real content at display size. `--forest-bright` is 1.9:1 and
   must never appear in `--grad-text` on the light palette. It is allowed inside
   `.on-dark`, where it sits on ink.

If a future direction needs a different color, change `--forest`, `--forest-deep`,
`--forest-lift`, and `--forest-bright` in `tokens.css`, plus the two gradient-text
steps in the `.on-dark` block, then recolor `assets/img/*.svg` and `theme-color`.
Nothing else should need to change.

`--text-faint` is for labels at 13px and above only, never for body copy.
Gradient text is decorative emphasis on top of an already-passing color, never
the only way a word is legible.

Elevation is warm too. `--shadow-sm` / `--shadow-md` / `--shadow-lg` are all
tinted `rgba(60, 46, 28, …)`. Never introduce a grey or black drop shadow; on
paper it reads as dirt.

## 5. Typography

Two families, loaded from Google Fonts in each page's `<head>`:

- **Inter** (`--font-sans`): everything, weights 400 / 500 / 600 / 700 / 800.
- **JetBrains Mono** (`--font-mono`): labels, indices, years, only via `.label`.

Classes, not raw font sizes:

| Class | Use |
|---|---|
| `.mega` | The hero statement. One per site, not per page. |
| `.display-1` | Page titles and the contact statement. |
| `.display-2` | Project and case study section titles. |
| `.display-3` | Subheads, section headers. |
| `.lead` | Intro paragraph under a display heading. |
| `.label` | Mono uppercase eyebrow, category, index, year. `.label--accent` gradient-fills it. |
| body default | 17px Inter, line height 1.6. |
| `.small`, `.micro` | 15px, 13px. Captions and footnotes. |
| `.grad-text` | Gradient-clipped emphasis span inside a display heading. |

Rules:
- Display type is tightly tracked (`--track-mega` -0.045em, `--track-display` -0.03em). That tracking is the signature; do not loosen it.
- **Leading tightens as type grows, but never below 1.0.** Tracking is the
  signature, leading is not the place to be clever. Inter's ascent is `.969em`,
  its descent `.242em` and its cap height `.727em`, so a descender reaches
  `.242em` below its baseline while the next line's capitals start at
  `(line-height - .727)em` below it. `--lh-mega` was `.94`, which put the capitals
  `.213em` down against a descender at `.242em`: the lines overlapped by `.029em`,
  and the `p` of "complex" sat inside the `L` of "Lately". It is now `1.05`, which
  leaves `.081em` of air, about 8px at the 96px hero size, and still reads as tight
  display leading. Display type wants 1.0 to 1.2; body copy is at `--lh-relaxed`
  1.6. `--lh-tight`, which drives `.display-1`, sits at the same `1.05` for the same
  reason: at `1.04` it was not colliding, but `.071em` of air against the hero's
  `.081em` read as two different heroes. One floor for all display type.
- `.grad-text` is the emphasis device, once per heading, at most twice per page.
- Prose blocks get `.prose` or `max-width: var(--measure)` (54ch, about 74
  characters).
- Inside a case study, prose instead takes `--measure-case` (55ch) at
  `--t-body-case` (20px) and `--lh-relaxed`, which is 694px holding 75
  characters. A case study is the only long-form reading on the site, so it is the
  only place that overrides both. Do not raise `--measure` itself; the home page
  depends on it. See section 12.
- **A `ch` is not a character. Multiply by 0.73.** `ch` is the advance of `0`,
  and in Inter `0` is `.6em` while the average character in running English text
  is `.437em`, so a `ch` is about 1.37 characters. Every measure here was first
  set as though `1ch` were one character, and the pages ran 84 to 103 characters a
  line while a `ch`-based audit reported them as passing. The conversion does not
  depend on font size, because both sides scale with the em: **characters x 0.73 =
  ch**, so 75 characters is 55ch, 70 is 51ch, 66 is 48ch. Size a new measure that
  way and verify it by counting the characters in a rendered line, never by
  dividing widths and never in `ch` alone.
- **A column can be fixed from either end.** Characters a line is column width
  divided by character advance, so an overlong line can be fixed by narrowing the
  column or by raising the type size. On a case study, raise the type: narrowing
  would give back the width the page is supposed to use. `--t-body-case` went 18px
  to 20px for exactly this reason, and the prose column stayed the same width
  while the line dropped from 86 characters to 75.
- Numbers use `.num` (tabular figures) so stats align.
- All type scales fluidly with `clamp()`. Do not add media-query font sizes.

## 6. Layout and spacing

- `.container` wraps content on every page. `--page-max` is
  `clamp(1280px, 78vw, 1800px)`: 1280px is the laptop composition and it holds
  until about 1641px, where the column opens and then stops at 1800px. It was
  `62vw / 1520px` until September 2026, and that first pass was too timid: 62vw
  does not overtake the 1280px floor until a 2065px viewport, so a 1728 or 1920
  monitor, which is what most external displays actually run at, composed in
  exactly the laptop's 1280px with a third of the screen dead. 78vw moves the
  crossover down to 1641px. The 1800px stop is what keeps a 4K panel from becoming
  a poster; it is not a readability limit, because every paragraph is capped in
  `ch`.
- **Large monitors and ultrawides.** Nothing in the design may follow `vw` alone.
  A 21:9 or 32:9 panel is 3440 to 5120px wide, so a column that tracks the
  viewport puts 200 characters on a line against the 45 to 75 comfortable range
  and WCAG 1.4.8's 80 cap. A hard centered ceiling is the right answer; the only
  mistake is freezing that ceiling at laptop width, which turns a 32 inch display
  into a 1280px ribbon with 1280px of dead sand on each side. Growing the ceiling
  is safe here because every reading measure is in `ch` (`--measure`,
  `--measure-card`, `--measure-case`, `.hero__lead`, `.case-hero__deck`;
  captions, `.case-note` and the home page's `.practice-lead` are the three exceptions
  and have no measure at all), so a wider
  container widens the
  composition and the grid tracks and never lengthens a paragraph: a line is the
  same length at a 1280px, 1498px and 1800px container, because the cap is in `ch`.
  **The three uncapped blocks are the exception to that sentence too**, and they are the
  reason it is worth saying out loud: their lines do lengthen with the container, so for
  them the ceiling is a copy budget instead. `.practice-lead` is the newest and the only
  one of the three that is running prose rather than a caption or a note.
  **Correction, measured 2026-09-20.** The claim that used to sit here, that the
  longest line anywhere is 80 characters, was wrong, and it was wrong in an
  instructive way. It generalised from a caption measurement. `figcaption` at 56ch
  really does count 77 at 1512, and `.case-note` at `--measure-case` counts 81. But
  `.prose p` in a case section, at the same `--measure-case`, counts **86 on
  `work/pay-bill.html` and 90 on `work/card-dashboard.html`**, and the home page
  counts 84. So `--measure-case: 55ch` does not hold a paragraph to 80.

  The reason is the 0.73 conversion itself. `characters x 0.73 = ch` converts an
  *average* line: 55ch is 75 characters of average-advance text. A maximum line is
  not an average line. Justification is ragged-right, so the browser fits whatever
  fits, and a line that happens to be mostly narrow glyphs (`i`, `l`, `t`, `r`, `f`,
  spaces) runs 15 to 20 percent past the average before it breaks. The 0.73 rule is
  correct for sizing a measure and useless for predicting the worst line. To hold a
  *maximum* of 80 the measure has to come down to about **49ch**, from 55ch and the
  ratio 80/90.

  That narrowing is not made here. It would reflow every paragraph on all five case
  studies, it costs about 11% of the reading column on pages whose standing
  direction is to use the available width, and it is the user's call, not a
  correction to fold into a copy edit. What is recorded is the true number, so that
  nobody re-derives an 80 from a `ch` value again. WCAG 1.4.8 is AAA and
  user-resizable text already satisfies the underlying need at any measure.

  **Captions, the closing `.case-note` and the home page's `.practice-lead` are outside
  all of this, on purpose. See
  the caption width rule below.** Every `figcaption` under an image is uncapped, so a
  caption's line length is set by the image, not by a measure, and it runs well past
  80. The `.case-note` text is uncapped for the same reason, added 2026-09-20: it is
  short enough that a long line costs nothing, and a capped text inside an uncapped
  dashed panel read as a broken box. All three are the user's standing direction and
  none is a defect to fix. What holds them safe is a copy budget, not CSS: a
  caption is two sentences and the note is two sentences. Break that and the
  exception stops being an exception.

  **`.practice-lead` joined them 2026-09-22, and it is the one to understand, because it
  is the only running prose in the set and it was asked for three times.** The
  standfirst that opens "Built for the team" on `index.html` has no `max-width`, so it
  runs flush with the section head's divider above it and the card grid below it, which
  is what was asked for: *"I need that text column just as wide as the divider."* It
  is one sentence of 148 characters. It measures 148 on one line at 2560, 102 at 1280,
  and is inside 80 up to about 950px of viewport. **It qualifies on the line-count
  argument, not in spite of it**: one line at 2560 and two everywhere narrower, never
  more than two except at 390 and 600 where the line is 42 and 64 characters and the
  ceiling is not in play. It is the shortest block in the uncapped set and the safest of
  the three. **So its budget is one line at the widest width.** A line holds about 161
  characters at a 1690px container against the copy's 148, so a second sentence breaks
  it, and unlike a capped paragraph longer copy here lengthens the line rather than
  adding lines to a short one. Trim it, never narrow it.

  `text-wrap: pretty` is on that rule and is load-bearing, not polish. Without it 2200
  broke as 142 + 5, giving a five character word a full width line of its own, which is
  the one way an uncapped paragraph reads as broken rather than merely long; it comes
  back as 135 + 12. **The widow window is intrinsic to any uncapped column**, because
  capacity varies continuously with the viewport while the copy length is fixed, so every
  length produces a thin tail at some width. `pretty` keeps that tail to two words. Check
  1900 to 2400 after any rewrite here, and consider the same property for the other two
  uncapped blocks.

  **The size token is the only lever left, and it runs backwards.** The column is fixed
  at the container, so characters on the line = container / (advance x size), which
  means raising `--t-lead-wide` *shortens* the line: 24px is about 161 characters of
  capacity, 32px about 121, 36px about 107. 36px is the hard ceiling, because that is
  `--t-display-3`, the size of the h2 the paragraph sits under. **80 characters at full
  width would need 48px type, a third larger than its own heading**, which is the
  arithmetic that made "match the divider" and "stay under 80" mutually exclusive.
  Six treatments and three rejected shipments are tabulated on `.practice-lead` in
  `components.css`, including a fully compliant 58ch one that was rejected because
  stopping at 49% of the divider was the defect originally reported. Do not add a measure
  back without reading them.
- **Where the extra width goes on a case study.** Not the prose, which is pinned
  at `--measure-case`. `.case-section__grid`'s first track is
  `clamp(16rem, 18vw, 26rem)`, so the rail takes the growth until it hits 26rem at
  about a 2160px viewport; past that the remainder falls to the right of the prose
  as white space. That is the trade for keeping a paragraph under 80 characters,
  and it is not wasted: `.shots` grids and the prototype embed span the full body
  column, so on a large monitor the screens are what get bigger. The stat band is
  not on that list. It is a reading block, so it takes the reading width.
- `.section` supplies vertical rhythm (`--section-y`, 4.5rem to 10rem fluid).
- `.band` is a full-bleed rounded section that carries its own background, the
  way a product page stacks chapters.
- Spacing uses `--s-1` to `--s-10` (4px to 144px). No arbitrary px values.
- Radii are generous: `--r-sm` 6, `--r-md` 12, `--r-lg` 20, `--r-xl` 28 (media),
  `--r-2xl` 40 (cards and bands), `--r-full` pills.
- `html` carries `scroll-padding-top: 6rem` so in-page anchors land clear of the
  floating nav pill. Raise it if the nav ever gets taller.

Breakpoints are in `rem` and only where a layout actually breaks:
`46rem` (nav collapses to one link), `62rem` (project bands stack, media first).

## 7. Components

Current inventory in `components.css`, in file order:

`.progress` (+ `__fill`) · `.btn` (`--primary`, `--lg`) / `.arrow` · `.nav`
(+ `.is-stuck` glass, `__inner`, `__brand`, `__dot`, `__links`, `__link`) ·
`.aurora` (+ `__blob--1/2/3`) · `.hero` (+ `__inner`, `__eyebrow`, `__portrait`,
`__wave`, `__title`, `__lead`, `__cue`, `__cue-line`) · `.marquee`
(+ `__track`, `__item`) · `.section-head` (+ `__title`) · `.projects` / `.project`
(+ `__grid`, `__body`, `__meta`, `__index`, `__tag`, `__year`, `__title`, `__link`,
`__summary`, `__stats`, `__cta`, `__media`, `__chip`) · `.stat` (+ `__value`,
`__label`) · `.cta` (+ `__inner`, `__title`, `__contact`, `__line` (`--email`,
`--phone`), `__actions`, `__base`) · `.link-underline`

Case study blocks, at the bottom of the file: `.case-hero` (+ `__inner`, `__cat`,
`__title`, `__grid`, `__media`) with the one adopted modifier
`.case-hero--split` · `.chrome-frame` (+ `__bar`, `__dot`, `__url`, `__body`) ·
`.case-hero__device` (+ `--bare`) ·
`.case-hero__deck` and `.case-hero__cap`, both still defined and both now unused
by every page, kept for the reasons in section 12 ·
`.case-back` (+ `__glyph`) · `.case-meta` ·
`.case-section` (+ `__grid`, `__aside`, `__num`, `__title`, `__body`) ·
`.pull-quote` · `.case-list` · `.stat-band` ·
`.stat-pill` (+ `__value`, `__unit`), the one-figure alternative to `.stat-band`,
currently used by no page ·
`.shots` (+ `--pair`, `--trio`, and `--solo`, which sizes ONE portrait phone to
exactly the width one `--pair` cell gets, `calc((100% - var(--shots-gap)) / 2)`,
centred, so a lone phone and a pair of phones in the same section render at the
same scale; one-up below 40rem) / `.shot` (+ `__frame`, and `__frame--device`,
which draws no frame at all: it resets everything `__frame` draws, so a phone
sits on the page on its own bezel, see section 7) ·
`.shots-head` (+ `__name`, `--first`) · `.shots-group` · `.case-note` ·
`.next-case` (+ `__link`, `__title`, `__glyph`)

**How tall the home hero is.** `min-height: min(100svh, max(56rem, 64svh))`. A
`100svh` hero is a phone and laptop convention: on a 2010px tall viewport it is an
almost empty canvas with three lines of type in it, and it pushes every piece of
proof below the fold, which is the most expensive place to waste. Capping it means
the skills ticker peeks in, which uses the attention above the fold and signals
that the page continues. The cap has to be a proportion though. A flat `56rem`
reads as deliberate at 1330px tall (67% of the viewport) and as a broken page at
2010px tall (45%), so `56rem` is the floor and `64svh` takes over above about
1400px. `100svh` still wins on short viewports, where the floor would overshoot.
Do not chase the viewport past that, and do not make this a `vh` value: `svh`
keeps the mobile toolbar from cropping the hero.

**Why the decks override `--t-lead`.** `.hero__lead` and `.case-hero__deck` are the
only two places that do. The deck under the hero statement is the one line asked to hold the
headline's width, and it cannot: the `h1` fills the column at 22 characters a line
only because it is set at 96px, so running the deck edge to edge at 24px would put
100 characters on a line. The type grows instead of the measure. At `--t-deck` and
55ch the deck is 904px wide and still holds 75 characters, where 24px at 52ch was
749px, which takes it from 64% of the headline's width to 79% at laptop size. If a
block has to look wider, reach for the size before the measure. The size itself is
`--t-deck`, shared with `.case-hero__deck`; see below.

**The case hero deck takes the same step, and the column pays for it.** The home
page hero fix was carried onto the case study heroes. Two parts. The leading:
`--lh-tight` went from 1.04 to 1.05 so `.display-1` clears its own ink by the same
.081em as `--lh-mega`, and the two heroes stop leading differently at a glance. And
the deck size, which is the part you can actually see: `--t-deck` is now a shared
token, used by both `.hero__lead` and `.case-hero__deck`, so the deck under a
display headline is 20px to 28px in both places instead of 24px on one and 28px on
the other. A 24px paragraph under a 68px headline reads as a caption.

Raising the size costs characters per line, and the split hero's text column could
not absorb it: at the old `1fr / 1.15fr` the text got 516px, and 28px type in 516px
is 40 characters, under the comfortable floor. So the ratio moved to
`1.22fr / 1fr`. The text column is now 610px at 1512 and 721px at 2560, the deck
runs 44 to 56 counted characters, and the media gives up about 18% of its width.
That is the trade, made deliberately: a portrait phone frame and a browser frame
both survive it, and a hero whose deck is unreadable is worse than a hero whose
screenshot is smaller. The caps are `50ch` split, `42ch` unsplit and `40ch` stacked,
all sized from counted characters, all of them guards rather than the binding
constraint at desktop widths. Stacked was `28ch`, about 38 characters, which had
made the hero deck the narrowest reading column on the site.

One warning from doing this twice: the first attempt changed only the leading and
the column, both by small amounts, and the result was invisible on the page even
though every measurement had moved. If a change is meant to be seen, check that it
is visible at the size it will be viewed, not only that the numbers improved.

**A case hero is the same size as the home hero, by both measures.** Two heroes that
sit one click apart should not be two different scales, and they were.

The headline. `.case-hero__title` carries `.mega` in the markup, not `.display-1`,
so a case study title runs 44px to 96px on exactly the token the home page `h1`
uses, at `--w-black`, instead of the 68px `--t-display-1` cap. A 96px home headline
against a 68px project headline is a 41% gap and reads as two sites.
`--t-display-1` still drives section statements, which belong a step below a page
title. If you add a case study, do not switch this class back.

The height. `.case-hero` borrows `.hero`'s `min-height: min(100svh, max(56rem,
64svh))` plus flex centering. Before, the case hero was pure padding and content, so
it stopped growing once the type capped: 97% of the viewport at 1512x900 but only
41% at 3840x2160, while the home hero held 64% at both. Agreeing on a laptop and
disagreeing by half a screen on a large monitor is the worst version of this. Both
now sit at 64% at 2560 and at 3840.

| at 2560x1440 | before | now |
|---|---|---|
| Home `h1` / case `h1` | 96px / 68px | 96px / 96px |
| Case hero, share of viewport | 62% | 64% (same as home) |
| Case hero at 3840x2160 | 41% | 64% (same as home) |

**Which hero frame.** `.chrome-frame` for a web surface, because the fake address
bar can carry the real URL. KeyBank is the only page that uses it, and it should
stay that way for as long as it is the only landscape desktop screen in the set.
`.case-hero__device--bare` for an app, because browser chrome around a phone
screen is a lie, and because a whole phone is the composition all four phone
heroes now share. Whichever you pick, the hero image must be shipped work: there is
no hero caption on any page any more, so there is nothing underneath it to carry a
caveat. A concept belongs in section 05, captioned. See the no-deck passage below.

**`.case-hero__device--bare`: the phone is whole, and it is sized by height.**
This is the treatment on all four phone heroes. It switches off the background,
border, shadow, radius, overflow and aspect ratio, and sizes the phone by
**height** (`--case-hero-phone-h`) rather than width. Height, because a portrait
phone is 2.13 times as tall as it is wide, so a column-width phone came out 553px
tall and pushed the hero past a 16 inch viewport. `--case-hero-phone-h` is
`clamp(26rem, 64vh, 60rem)`: the phone stays in proportion to the screen it is
read on, the floor stops it collapsing on a short laptop, the cap stops a tall
window turning it into a poster. Below `62rem` it goes back to width, because a
stacked hero on a short landscape phone would otherwise size the image off a 400px
viewport height. Elevation is `--drop-shadow-lg`, a `filter`, not a `box-shadow`:
a box shadow traces the element box and would draw the square corners the asset
does not have. That only works because every hero phone asset has genuinely
transparent corners, all four checked pixel by pixel; if you add a fifth, check
its corner pixels are `(0, 0, 0, 0)` before you trust the silhouette.

**The panelled `.case-hero__device` is the fallback, and no page uses it.** It
crops by aspect ratio (`3/2`, squarer at `40rem` and below) with the phone at
`min(52%, 24rem)` of its width, so the phone bleeds off the bottom at roughly the
size it gets in section 05 rather than shrinking to fit the column. The `24rem` is
only a guard and has to stay above whatever 52% can reach, which at a 1800px
container is 373px; when it was `21rem` the guard took over first and the phone sat
marooned in a widening platform on a large monitor. Keep the rule: it is still the
right answer for a screen that has to be shown larger than a whole phone would
allow, where the crop itself is the argument. Reach for it deliberately, not by
forgetting `--bare`, and if you do, pick the crop by what has to stay readable.

It was `52vh` first, chosen as the largest value that kept the `.case-meta` rail
above the fold everywhere the panelled version fitted. That produced a 231px phone
on a 16 inch MacBook Pro and 264px on a 1920 monitor, and the user rejected it as
too small. `64vh` takes the trade in the other direction, deliberately: 284px and
325px at those two widths, 433px at 2560. That cost the rail its place above the
fold, and moving the rail into the text column bought it back without shrinking the
phone, so the trade no longer has to be made. See the rail passage below.

**The two columns belong to one composition, so they sit close.** The gap is
`clamp(var(--s-5), 2.2vw, var(--s-7))`: 24px stacked, 33px at 1512, 48px at 2560.
It was `clamp(var(--s-6), 4vw, var(--s-9))`, which was 96px at 2560 and fine while
the container stopped at 1520px. Once `--page-max` opened to 1800px that gutter
was wider than the air inside either column and read as a hole with a headline on
one side and a phone on the other. A gutter should be smaller than the elements it
separates; when it is larger, the eye stops reading across it.

**A bare phone gets a narrower media track than a wide screen does.** KeyBank's
landscape screen fills its column, so the default `minmax(0, 1.22fr) minmax(0, 1fr)`
is honest there and it keeps it. A `--bare`
phone is sized by height, so it does not grow with its track: at `1fr` it came out
433px inside a 717px track at 2560, which is 142px of dead air on each side, and
the phone read as drifting away from the headline rather than sitting beside it.
`.case-hero--split .case-hero__grid:has(.case-hero__device--bare)` moves the ratio
to `1.9fr / 1fr`, which sizes the track to the phone plus a hairline of air at
every width (53px each side at 1512, 66px at 2560), and hands the surplus to the
text column: 1074px at 2560 against 875px before. **Repeat that `:has()` selector
inside the `62rem` block when you undo the two columns.** `:has()` donates its
argument's specificity, so `.case-hero__grid:has(...)` outranks a bare
`.case-hero__grid { grid-template-columns: 1fr }` in a media query and the hero
stays two columns on a phone. The first version of this shipped a 51px-wide phone
at 320px for exactly that reason.

There is no hero lean. `.case-hero--split .case-hero__media` used to carry
`rotate(-1.4deg)` and straighten on hover, and it never once rendered: the element
also carries `.reveal-pop`, and `.js-motion .reveal-pop.is-in { transform: none }`
is three classes against that rule's two, so the lean was overwritten the moment
the hero scrolled into view. It was deleted rather than given the specificity to
win, because a tilted phone is not the treatment this site uses anywhere else. The
hover is `scale(1.01)`. If you find yourself adding a transform to an element that
also reveals, check what the reveal class does to `transform` first.

**No case study hero has a deck or a hero caption.** It is eyebrow, headline, rail,
and the screen. Basket Building dropped both first, in September 2026; the user then
asked for the same on the other four. The reasoning is the same on every page and
worth keeping, because it is the reason not to put a deck back: **the home page band
already says it, and section 01 then says it properly at length.** A reader who
clicked a band has just read that sentence, so a deck was the third telling before
they had learned anything new. The hero caption went for the same reason, that the
screen it described is the same screen section 05 shows and captions properly. The
hero's job is to name the project and show it.

The grid is `align-items: center`, so a text column of eyebrow, headline and rail
centres against the image without any help. Three consequences, all of which have to
hold before you remove a deck or a caption from a new page:

- **The numbers the deck was carrying have to already live in the body**, next to
  the work that produced them, or the page quietly loses them. Check the stat band
  first. All four decks removed here were repeating a stat callout: 23% against a
  20% goal, 3.3M to 7.7M, 1 and 2 star down 10%, under 5 minutes against a goal
  of 15.
- **A `<figure>` with no `<figcaption>` promises a caption it does not have**, so
  the hero media becomes a `<div>`. The class hooks are all class-based and the
  reset only zeroes a margin a `div` does not have, so nothing moves. The same
  applies anywhere else: `.proto-block` is a `<figure>` and its `.proto-flag`
  label is a `<figcaption>` for exactly this reason.
- **The hero image has to be shipped work, because nothing is left to caveat it.**
  This is the one that bites. Pay Bill's hero was the slider concept, which was cut
  before launch and never shipped, and the caption underneath was the only thing
  saying so; removing it would have left the page claiming an unshipped design as
  the product. The hero now shows the shipped Select amount screen, and the slider
  keeps its own captioned frame in section 05 beside it, which is where a
  shipped-against-concept comparison belonged anyway. If the best-looking screen on
  a page is a concept, that is where it goes, not in the hero.

**The `.case-meta` rail lives inside the hero's text column, on all five pages.**
It started on Basket Building, which has no deck: an eyebrow, one headline and
nothing else made that column a small island in a tall empty field with a
full-height phone off to the right, and the rail underneath both columns was 250px
further down. Moving it up into the column gave it the mass it was missing, filled
the width the headline does not use, and brought Role / Team / Timeline back above
the fold, which the taller `64vh` phone had pushed past it. The user then asked for
that composition on every case study, correctly: five heroes one click apart should
read as one layout, and the reason the rail belongs next to the title was never
specific to a page with no deck. A rail is credits, and credits belong with the
title, not in a band at the bottom of the frame.

It measured better on all five. Where the top of the rail sits, in the column
against the old full-width band:

| page | 1280x800 | 1512x945 | 1920x1080 | 2560x1440 |
|---|---|---|---|---|
| Pay Bill | 702 vs 926 | 757 vs 1019 | 792 vs 1087 | 858 vs 1317 |
| Card Dashboard | 701 vs 907 | 750 vs 1000 | 764 vs 1068 | 879 vs 1298 |
| Transactions | 710 vs 907 | 769 vs 1000 | 786 vs 1068 | 898 vs 1298 |
| KeyBank | 882 vs 902 | 946 vs 966 | 803 vs 901 | 773 vs 1005 |
| Basket Building | 568 vs 820 | 617 vs 913 | 644 vs 999 | 772 vs 1230 |

Four pages that put the rail below an 800px fold now clear it, and nothing
regressed. KeyBank gains the least because its deck runs five to six lines, so its
text column, not its media, sets the hero's height: 1069px at 1280x800 and 1132px
at 1512x945, which leaves the rail below the fold there either way. That is a
consequence of a long deck and not of this layout, and shortening that deck is the
fix if it ever matters enough.

The switch is keyed off where the `<dl>` is in the markup, so moving it is the
whole change and there is no flag to keep in sync. The full-width rule above it in
`components.css` now survives only as the fallback for a hero written without it.
`.case-hero--split .case-hero__grid .case-meta` restyles it as a 2x2 block with a
hairline above each cell, `column-gap: var(--s-6)`, one column below `40rem`. Two
columns and not `auto-fit`, because `auto-fit` gives three across at a mid width
and leaves one cell alone on a second row, and because 2x2 is the shape that fills
the vertical space the headline leaves. Each cell carries its own top hairline
rather than the container carrying one rule with dividers between cells, because a
rule drawn across a wrapping grid only lines up on the first row.

Two things about that arrangement were paid for:

- **The rail is a child of the text column, not a third grid item in row two.**
  The row-two version was tried first. The phone then has to span both rows, a
  spanning item distributes its height across the rows it covers, so both auto rows
  grew and the headline and the rail ended up shoved to opposite ends of a 922px
  phone with 260px of nothing between them. `align-content: center` cannot fix
  that, because the rows really did grow. A title and its credits are one block;
  keep them in one box.
- **Stacked, the rail has to follow the phone, and `display: contents` is how.**
  Source order in the column is title then credits then screen, which on a phone
  would open the page on a table of metadata. The `62rem` block dissolves the
  wrapper with `display: contents`, promoting the eyebrow, the headline and the
  rail to grid items, then puts the rail last with `order: 1`. Two knock-ons to
  keep: the title's own `margin-top` now stacks on the grid's row gap and doubles
  the space under the eyebrow, so it is zeroed there; and a grid item is
  blockified, so `.case-hero__cat`'s `inline-flex` stops shrink wrapping and the
  pill runs the full column (347px around two words at 390px) until it is given
  `justify-self: start`. Check both if you use this trick anywhere else.

The prototype slot, used in section 05 of a case study that has one:
`.proto-block` · `.proto-flag` (+ `__pip`) · `.proto-embed` (+ `--pending`,
`--wide`, `.is-live`, `__cover`, `__play`, `__label`, `__sub`) · `.proto-open`

The home page marquee has one variant, `.marquee--skills`, used for the skills
ticker under the hero.

### Screen exports

Real screens live in `assets/img/<case-slug>/`, one folder per case study, as
WebP. Pay Bill is the worked example; copy its conventions.

- **Phone screens go in `.shots--pair`, never in the one-up `.shots`.** A portrait
  phone at the full case column renders about 1700px tall. Two up it is ~410px
  wide, which is also why the export is **840px wide**: exactly 2x, nothing
  wasted. Only wide or landscape assets belong in the one-up slot.
- **A set of three phones goes in `.shots--trio`, not `.shots--pair`.** The case
  body column is about 756px at 1920 and 856px at 1440, so `--pair`'s 19rem
  minimum fits exactly two and strands the third alone in a half-empty row, which
  breaks the side-by-side comparison the set exists to make. `--trio` is a fixed
  three-column track that goes straight to one up at 40rem, never through two.
  The phones land around 203px at 1920 and 236px at 1440, small enough that the
  caption has to carry the detail and the image only has to carry the difference.
  A `--trio` row next to a `--pair` row renders at visibly different phone sizes.
  That is intended where the pair is denser and needs the room, but it does need a
  `.shots-head` between them so the size change reads as a new set and not as an
  accident. **Card Dashboard's Experience section is the live example**: the Me
  tab, the wallet page and the dashboard on one line, in journey order, so the row
  reads as the path. The phones land 276px at 1280, 263px at 1512 and 387px at
  2560, which is legible for a balance, a rewards figure and a button label but
  not for body copy inside a screenshot. Basket Building used to be the example
  and is now the prototype alone; that markup is still in
  `iterations/20-basket-building-prototype-only/removed-shots.html`.
- **ONE phone on its own goes in `.shots--solo`, not in `.shots` and not in
  `.shots--pair`.** The one-up slot renders an 846x1744 export 1724px tall.
  `.shots--pair` looks like it would work and does not: it is
  `repeat(auto-fit, minmax(min(100%, 19rem), 1fr))`, auto-fit collapses the empty
  track, and the lone child stretches to the whole column. `--solo` sizes its one
  track to exactly what a `--pair` cell gets,
  `calc((100% - var(--shots-gap)) / 2)`, which is why `--shots-gap` is a token in
  `tokens.css` rather than a literal in `.shots`: the solo phone has to subtract
  the same gap the pair does or the two drift. Measured identical to a `--pair`
  cell at every width: 347 @390, 582 @640, 419 @1280, 396 @1512, 580 @2560. It is
  **centred**, because a 396px phone against the left edge of an 837px column
  reads as a `.shots--pair` whose second image failed to load; `.proto-block`
  centres a lone device for the same reason. **No live page uses `--solo`.** Card
  Dashboard's Experience section was the one user for a few hours on 2026-09-20 and
  then went to `--trio`, because the same three phones were wanted on one line. It
  is kept for the same reason `--trio` was kept when Basket Building stopped using
  it: the next case study with one portrait screen to show alone needs it, and the
  derivation is the expensive part. The markup that used it is in
  `iterations/33-three-phones-one-line/removed-solo-and-pair.html`.
- **More than one run of screens in a section needs `.shots-head` on each run.**
  It is an `<h3>` under the section's `<h2>`: a hairline, a mono `.label` for the
  set's status ("Experiment 01 · Live"), and a `.shots-head__name` for what the set
  is. Add `--first` to the run that opens the section, which drops the rule and the
  extra air because the `<h2>` already introduced it. Without these, five phones and
  two boards down one column read as one undifferentiated pile; a caption cannot do
  the job because a caption describes its own figure, not the group. Keep them
  quiet. They must not outrank the section title, so no display type. This too has
  no live example left, for the same reason `--trio` does not.
- **Where there is a prototype, a still has to show something the prototype
  cannot.** Basket Building is the worked case. Its prototype carries all five
  mobile treatments, so the five phone stills that used to sit under it were the
  same screens twice and came out. What stayed, and what was later added, are the
  two Build Your Own Bundle **desktop** screens, which the prototype does not
  contain at all. The test is not "is this a nice screen", it is "can the reviewer
  reach this by operating the prototype". If they can, the still is redundant. See
  `iterations/20-basket-building-prototype-only` for the removal and
  `iterations/21-byob-search-screens` for the exception.
- **A paragraph plus the screens it introduces goes in `.shots-group`.** Not a bare
  `.prose` followed by a bare `.shots`. Reset gives a `<p>` no margin, so a
  paragraph placed after `.proto-block` or `.stat-band` sits flush against that
  panel's border and reads as the panel overflowing, while the `.shots` it
  introduces opens at `--s-6` below it: more air inside the group than above it,
  which is backwards and stops the two reading as one thing. `.shots-group` sets
  `--s-8` above and `--s-5` between, the same pair `.shots-head` uses to open a new
  set. No hairline, because it lands directly under a panel edge. Worked example:
  Basket Building section 05.
- **Crop the export to the device silhouette, not to the element's bounding
  box.** A capture clip taken straight from `getBoundingClientRect()` lands on a
  fractional pixel, so it picks up one or two pixels of whatever was behind the
  mock down the left and top edges. Against the sand page that survives as a
  pale hairline along two sides of the phone, which is the same class of defect as
  the "weird corners". Find the tight bounding box of the dark bezel in the source
  capture and crop to that. Test: no pixel in the outermost row or column of the
  export should be lighter than ~120 mean luminance.
- **Wide artwork must not carry its own edge, and must not carry its own corner
  radius. `.shot__frame` is the edge.** A capture exported with a drop shadow,
  glow or rounded corners baked in puts a second edge underneath the real one.
  The shadow is the worse half: its RGB is dark grey, so over `--bg` (#EDE4D6) it
  composites to a desaturated olive band, a muddy rim rather than a shadow. The
  radius is the subtler half: an asset rounded to 8 CSS px inside a frame that
  clips at `--r-xl` (28px) puts two different curves at one corner, and where the
  artwork has real content near its edge, a header bar or a hard dark edge, the
  frame's wider arc visibly chews it. Crop to the tight bounding box of fully
  opaque pixels, found by scanning and not by assuming an inset, then fill what
  transparency is left, which is only the corner arcs, from the nearest opaque
  pixel on the row. **Save wide artwork as RGB, with no alpha channel at all.**
  There is nothing for one to describe once the artwork is a rectangle, and a
  stray 251-to-254 alpha from WebP's own quantisation is what turns into a haze
  the next time the file is rescaled. This has now been the defect three times in
  one week, on device frames, the ingress board and the three wide Card Dashboard
  exports. `iterations/34-wide-asset-baked-shadows/reproc.py` is the encoder;
  point it at any new offender. **The RGB rule stops at wide artwork**, for the
  reason in the bullet after next.
- **But first decide which edge is the real one, because re-encoding is only one of
  the two fixes.** The rule above assumes the frame should win and the asset should
  give up its own edge. The other way round is sometimes better: keep the asset's
  own corners and shadow and take the frame away with `.shot__frame--bare`. Which
  one is right depends on what the asset's edge *is*. A shadow that is dark grey
  RGB painted onto opaque pixels is a defect, because it composites to a muddy
  olive band over `--bg` and cannot be made to look like a shadow; re-encode it. A
  shadow carried properly in an alpha channel, with fully transparent corners and a
  soft alpha ramp at the edges, is a finished treatment that composites correctly
  over any background, and the frame around it is the thing that is wrong; use
  `--bare`. **Check the alpha before choosing.** Open the file and read the four
  corner pixels and a mid-edge pixel: alpha 0 at the corners and a low non-zero
  alpha mid-edge means the asset owns its edge and wants `--bare`. **The mid-edge
  pixel is the one that decides it, not the corners.** All four wide assets on the
  site have transparent or near-transparent corners, so corners alone would call all
  four candidates; three of them are opaque to the top edge (alpha 255 mid-top) and
  are rectangles with the arcs cut away, which is what the plain `.shot__frame` is
  for. Only `transactions/evidence-reviews.webp` has a soft alpha ramp all the way
  round. It sat on the re-encode list for a day before anyone read its alpha channel,
  which is how this bullet came to exist. See
  `iterations/48-transactions-vision-100-and-bare-frame/`.
- **A device export's transparent corners are load bearing, not cosmetic.** Since
  2026-09-20 `.shot__frame--device` draws nothing at all, so the page's own `--bg`
  shows through wherever the WebP is transparent. An export whose corners are
  opaque will show four notches sticking out past its own rounded bezel, in
  whatever colour was behind it when it was captured. Check alpha 0 at all four
  corners before publishing one; all 22 live phone exports pass. Never bake a
  background colour into an export.
- **A screenshot of a phone has no alpha, so give it some.** Downloaded device
  mocks arrive with transparent corners; a Playwright capture of a rounded phone
  frame does not, and inside each of the bezel's four corners it keeps a wedge of
  whatever the page behind it was. On a near-white page that is four white nicks
  on the phone, which is the "weird corners" defect arriving by a second route:
  the five Basket Building phones shipped with it in September 2026 and it took a
  third report to find. Punch a rounded rectangle of the bezel's own radius into
  a new alpha channel. Two things to get right, both written up in
  `iterations/14-basket-building-hero-phone/reproc.py`. Get the radius from the
  source CSS times the device scale factor, then **verify it against the image**
  rather than trusting it: walk down the first rows of the crop for the first
  pixel under 120 luminance and check the numbers against the circle. And paint
  the discarded wedge the bezel's own colour before applying the alpha, because
  LANCZOS mixes RGB across an alpha edge and a near-white wedge bleeds a pale
  hairline back along the curve that lossy WebP then keeps. Zero RGB under
  alpha 0 afterwards as always. Test: composite the corner over `--bg` at 3x
  nearest-neighbour and look at it.
- **A device shot needs `.shot__frame--device` on the frame, and the modifier now
  means "draw no frame".** It resets padding, border, radius, background and shadow
  to nothing, so the phone's own bezel is the frame and the phone sits directly on
  the page. Changed on 2026-09-20 at the user's request, because the tinted panel
  read as a dark container behind the phone rather than as a surface it rested on;
  `iterations/30-device-frame-removed/` has the measurements. Until then the
  modifier added `padding: clamp(var(--s-4), 6%, var(--s-7))`, to keep the frame's
  `--r-xl` corner and 1px stroke off the phone bezel's own corner radius, because
  two nearly concentric arcs that close together read as a smudged corner. Do not
  re-add the padding to solve that problem: with no frame drawn there is no second
  radius to collide with. Flat wide assets (annotation sheets, desktop screens)
  keep the plain `.shot__frame` and still get its border, radius and tint, **unless
  the asset carries its own edge in alpha**, in which case use `.shot__frame--bare`,
  which shares every declaration with `--device` and exists only so that a flat
  artifact is not labelled a device. Added 2026-09-21; `evidence-reviews.webp` on
  Transactions is the one live user. The precondition is the same as `--device`'s and
  it is the whole reason either is safe: transparent corners, checked in the file,
  because with no frame there is no `overflow: hidden` clipping a radius and an
  opaque rectangle just loses its framing.
- **Check the device frame's edge for antenna lines.** Figma's iPhone components
  bake six light grey antenna separators into the titanium band. They vanish on a
  white artboard and show as pale ticks near each corner against the sand page
  behind a device shot. Repaint them out before converting, interpolating the band
  colour along
  the edge so the gradient and the antialiased silhouette survive. Test: no
  opaque pixel within 20px of the silhouette should exceed ~110 luminance.
- Wide assets export at 1600px. WebP quality 90 for UI, 82 for photographs.
  This took the Pay Bill set from 5.4MB to 1.0MB.
- A home page card is `aspect-ratio: 4/3` with `object-fit: cover`, so a portrait
  phone cannot go in one directly. Composite to 1600x1200 on a transparent canvas
  instead (`assets/img/pay-bill/home-card.webp` is two phones side by side). Show
  the whole device: a phone cropped by the card edge reads as a rendering error at
  thumbnail size, where there is no caption to explain a deliberate bleed. Height
  is the binding constraint, so two 1:2 phones land around 536x1104 with roughly
  48px of top and bottom clearance and much wider side margins. That asymmetry is
  unavoidable on a 4:3 canvas; the tint fills the sides.
- Set `width`/`height` to the real pixel size of the export, not the old
  placeholder's, or the reserved space is wrong and the page shifts on load.
- Keep the source originals in `iterations/<n>-<slug>-source-assets/` with a
  table mapping source file to published asset. This repo has no version control.

### The hero eyebrow, as a thermometer

`.hero__eyebrow` is the glass pill and `.hero__portrait` is the bulb at its left
end. The bulb is deliberately taller than the pill so the photo stays big enough
to read as a face, and it is absolutely positioned rather than laid out inline,
because a flex child that tall would stretch the pill to match it. Its size is the
one knob: `--bulb` on `.hero__eyebrow`, currently `6rem`. The pill's left padding
is derived from it (`calc(var(--bulb) + var(--s-4))`), so changing `--bulb` keeps
the text clear of the photo with no other edits. The ring is a `conic-gradient`
in the accent family, drawn as a 3px `padding` box behind the image.

### The contact lines

The email address and phone number are the point of the contact footer, so they are
not buttons. `.cta__contact` stacks two `.cta__line` links at display size:
`--email` at `--t-display-2`, `--phone` one step down at `--t-display-3`. Each
carries a 2px gradient underline that thickens to 6px on hover. Résumé and LinkedIn
stay as secondary `.btn`s underneath, because they lead off the page and the two
ways to actually reach a person should outrank them.

That underline uses `--grad-accent-text`, not `--grad-accent`. The footer is the
dark beat, and the fill gradient is dark green on near-black, which is effectively
invisible. Same reason `.link-underline` uses it.

Naming is BEM-ish: `.block`, `.block__element`, `.block--variant`. Add new
components at the bottom of `components.css` with a comment header. Do not
restyle an existing component for a one-off; add a variant.

## 8. Motion

Motion is part of the design here, not decoration, but every piece of it is
opt-in per element and every piece of it turns off under `prefers-reduced-motion`.

Durations: `--dur-fast` 140ms, `--dur-base` 300ms, `--dur-slow` 700ms,
`--dur-xslow` 1200ms. Easings: `--ease-out` (workhorse), `--ease-spring`
(playful overshoot, buttons and arrows), `--ease-in-out` (ambient loops).

| Hook | Effect | Driven by |
|---|---|---|
| `class="reveal"` | 28px rise plus fade on scroll in | `site.js` IntersectionObserver |
| `class="reveal-pop"` | 40px rise plus 0.965 scale, for media and cards | same |
| `class="reveal-stagger"` | children cascade, 80ms apart | `site.js` sets `--i` per child |
| `data-split` on a heading | word-by-word rise from a clipped mask | `site.js` wraps words, sets `--wi` |
| `data-count` on `.stat__value` | number counts up once, 60% visible | `site.js`, 1.1s ease-out |
| `class="parallax-slow"` | scroll-linked drift where `animation-timeline: view()` is supported | CSS only |
| `.aurora` | drifting blurred color blobs, plus pointer parallax on fine pointers | CSS + `site.js` |
| `.marquee` | infinite credential ticker, pauses on hover | CSS only |
| `.progress__fill` | page-read bar across the top, `scaleX` | `site.js` on scroll |
| `.nav.is-stuck` | nav pill gains glass and shadow past 16px of scroll | `site.js` toggles the class |
| `.project__media` tilt | ≤5deg pointer tilt on fine pointers | `site.js` |

Hard rules:
- `site.js` adds `.js-motion` to `<html>` **before** any reveal CSS applies. Never
  write a rule that hides content without the `.js-motion` prefix, or the page
  disappears when JS fails.
- Every scroll-driven value needs a static fallback. Never let a scroll effect be
  the only thing that makes content visible or reachable.
- `data-count` animates only the first number in the string and always restores
  the authored text at the end, so a bad animation can never publish a wrong number.
- Pointer tilt and pointer parallax are gated on `(hover: hover) and (pointer: fine)`.
- Keep tilt angles at or below 5deg. Text must never visibly skew.
- **`.word` needs `--word-bleed`, and the slide has to clear it.** The mask for
  `data-split` is `overflow: hidden` on `.word`, which makes the clip box exactly
  one line-height tall. Display type is set tighter than its own ink (`.94` on
  `.mega`), so about `.135em` of descender falls outside that box and `p`, `y`,
  `g`, `q`, `j` get sheared flat. `--word-bleed` pads the clip box out past the
  ink and an equal negative margin takes the growth back out of layout, so the
  margin box is still one line-height and nothing moves: verified identical `h1`
  top and height, split versus unsplit, at 1440, 1024, 768, and 390. If you raise
  `--word-bleed`, raise `.word > span`'s `translateY` start with it, or the top of
  each word peeks above its line before the slide begins. `overflow: hidden` also
  costs the inline-block its real baseline (CSS 2.1 substitutes the bottom margin
  edge), which is why `.word` is aligned with `vertical-align: bottom`; do not
  switch it back to `baseline`.
- **The reveal observer's `threshold` must stay `0`.** A ratio threshold is
  mathematically unsatisfiable for any element taller than
  `viewportHeight / threshold`, and it fails silently: the element simply never
  gets `.is-in` and sits at opacity 0 forever. It shipped once at `0.12`, which
  meant any `.reveal` over about 7,160px went invisible at a 860px viewport, and
  that is ordinary for a case study's section 05 (Transactions' is 7,254px). The
  whole Experience section of that page was blank and the page still passed a
  broken-image and heading audit. The `-12%` bottom `rootMargin` is the only gate
  needed; it already delays the trigger to 88% of the viewport. If you ever add a
  threshold back, cap it so `viewportHeight / threshold` exceeds the tallest
  `.reveal` on the longest page.
- The `prefers-reduced-motion` block at the end of `base.css` is the backstop.
  Any new effect gets a line in it.

## 9. Accessibility (non-negotiable, this is a portfolio for an Accessibility Bar Raiser)

- One `<h1>` per page. Headings descend in order, no skipped levels.
- Every image needs a real `alt` describing what a reviewer would see, or `alt=""`
  if purely decorative. Placeholder SVGs carry `role="img"` and an `aria-label`.
- Interactive text is a real `<a>` or `<button>`. A band's link text is the project
  title; the whole band is made clickable with the stretched `.project__link::after`,
  never with a click handler on a `<div>`.
- Focus is visible everywhere (`:focus-visible`, 2px `--accent` outline, 4px offset).
  The stretched band link draws its focus ring on its `::after`. Never remove an
  outline without replacing it.
- **Any state that a mouse reaches on `:hover` a keyboard must reach too.** If a
  `:hover` rule changes a container because something inside it is the target, pair
  it with `:focus-within`; if it changes the target itself, pair it with `:focus-visible`.
  `.project`'s green ring is the worked example, and the reason is that the card's
  whole face is a click target, so hovering it and tabbing to its title are the same
  act and should look the same. This is separate from the focus indicator above and
  does not replace it. Two rules still fail this and are known: `.project:hover
  .project__title a`'s underline and `.project:hover .project__media img`'s scale.
- Skip link first in `<body>`.
- The contact email and phone are real `mailto:` and `tel:` links at display size.
  Size is not a substitute for them being links; keep both.
- The marquee is `aria-hidden` because it repeats itself; the same credentials are
  present once in a `.visually-hidden` list for screen readers.
- Decorative glyphs (arrows, the wave, the scroll cue, aurora blobs, the progress
  bar) get `aria-hidden="true"`.
- Touch targets at least 44px tall for buttons and nav links on small screens.

## 10. Images

- `.project__media` is a fixed 4:3 well with `--r-xl` corners and `object-fit: cover`.
  Export at 1600x1200 or larger, 2x preferred. The existing placeholders are
  1600x1100 and crop fine.
- Always set `width`, `height`, `loading="lazy"`, `decoding="async"` on band images.
- Screenshots go in `assets/img/`, named `<slug>-<what-it-is>.png`.
- `placeholder-*.svg` files are stand-ins drawn in the forest family only, on an
  `#E6DCC9` canvas that is deliberately a step deeper than `--bg-raised` so the
  media well separates. Replacing them is a straight `src` swap.
- Real screenshots of dark-on-light product UI sit naturally on this canvas. Give
  a screenshot with a white background a `--stroke` border so its edge is visible
  against `--bg-raised`.
- Recoloring artwork after a palette change is a per-hex substitution across
  `assets/img/*.svg`. The current set uses `#191409` ink, `#146A47`, `#0E4E34`,
  `#6CCBA0`, `#FFFFFF`, `#E6DCC9` canvas, `#7A6E55` captions, and `#0B7B3C` for a
  genuinely positive signal. The favicon square is `#14110C`.

## 11. Things that are still TODO on the home page

Marked with `<!-- TODO -->` in `index.html`:

1. ~~Résumé URL.~~ Done: the Google Doc, in the nav and the contact footer of every
   page. The doc itself must be shared "Anyone with the link, Viewer" or the link
   is a login wall. ~~LinkedIn URL is still open.~~ Done, September 2026, supplied by
   the user: `https://www.linkedin.com/in/rishabh-singh-34b13a82/`, on all eight files,
   the seven live pages and `work/_TEMPLATE.html`. The `<!-- TODO -->` comment above
   each button is gone with it, so nothing in the footer is a placeholder any more.
   A link check will report **999** for it, which is LinkedIn refusing non-browser
   clients, not a broken URL; verify it in a browser instead.
2. ~~Real headshot.~~ Done: `assets/img/headshot.jpg`, 512x512, cropped tight on
   the face. It renders as the 6rem thermometer bulb on the hero eyebrow pill
   (see section 7), so any replacement must be a square crop, at least 400x400,
   with the face centered and no important detail in the corners.
3. ~~Real case study screenshots replacing `placeholder-*.svg`.~~ Done, September
   2026. **No live page references a `placeholder-*.svg` any more.** Basket Building was
   the last one: `assets/img/basket-building/` now holds eight WebP captured from the
   user's own interview prototype at `/Users/rriss/BundleSwap/prototype.html`, and
   they cover the home band, the case hero, and all of section 05. Every
   `placeholder-*.svg` is now unreferenced by a live page and could go, but the
   archived home pages under `iterations/01` through `06` still point at them, so
   moving them breaks those snapshots. See
   `iterations/11-bundle-swap-source-assets/README.md` for the capture recipe,
   which is unusual: that prototype boots in a presentation mode that hides the
   document, so the five design panels are only reachable with `#pres-6` forced
   active.
4. An `og:image` export at 1200x630.
5. ~~`work/*.html` case study pages.~~ Done: all five are built
   (`basket-building.html`, `card-dashboard.html`, `pay-bill.html`,
   `transactions.html`, `keybank.html`), and every band link on the home page
   resolves. The `.next-case` chain follows the home page band order and closes the
   loop: Basket Building to Card Dashboard to Pay Bill to Transactions to KeyBank to
   Basket Building.

   Two converted Transactions assets are deliberately unused on the page:
   `assets/img/transactions/rewards-earned.webp` and the archived `TL-S-1.png` (a
   different statement month). The first is the old **Rewards earned** bottom sheet,
   which broke 2,078 points into "1% back on all purchases" plus "Additional earn on
   1%"; iteration 50 identified it as the before-state for the rewards-clarity change
   the third release screens show, and it stays unused because the after reads on its
   own. Sixteen of the eighteen files in that folder are on the page; the other two
   are that sheet and the home band composite.
6. ~~`about.html`. The M.S. HCI degree belongs there; it is nowhere on the site yet.~~
   Built in September 2026. The degree is in the hero's `.case-meta` rail and in the
   Getting here section. See "The about page" at the end of this section,
   `iterations/42-about-page/` for how it was built, and
   `iterations/43-about-legacy-copy/` for the copy rewrite that followed, which
   replaced three of its five sections with the legacy page's own words and removed
   the employer roster. Two things on it are still open: the 2014 and 2015 to 2017
   degree dates are the legacy page's and nobody has checked them against a
   transcript, and `assets/img/headshot.jpg` is the only portrait asset, 512px square,
   which is what caps the hero photo at 20rem. There is nothing larger: see item 3 of
   `iterations/42-about-page/README.md` before searching for a bigger file again.
7. ~~Content conflict: the AI Builder date.~~ Resolved by the user in September 2026:
   the project was initiated in **April 2026**. The `.case-meta` rail reads "April 2026
   to now" and section 02 says "initiated in April 2026". The résumé still says July
   2025 and the handoff notes still say 2026 generally, so both should be corrected to
   match rather than the page being changed back.
8. Housekeeping, once the palette is confirmed settled: delete `preview.html` and
   `assets/css/palettes/`.
9. ~~Two decisions on `work/basket-building.html`.~~ Resolved by the user in September
   2026. The work is **launched**: the page says Bundle Swap launched with its three
   treatments, the footnote says the first experiment is live with results not in yet,
   and the home band chip reads "Live experiment" rather than "In build". The handoff's
   OPEN ITEM on launched-versus-pre-launch can be closed. The page has no hero deck and
   no hero caption as of September 2026; the home band summary carries the positioning
   instead. This is no longer specific to Basket Building: the user asked for it on all
   five heroes days later, so no case study has either. See section 12, and
   `iterations/17-heroes-without-decks/`.

   One number on that page is **not** on the handoff's canonical list: **64%** of
   customers look for complementary items themselves. The user supplied it directly
   with the September 2026 content rewrite, sourced from the 11 Basket Building
   studies. It lives in section 03 prose, where the research is described. It was
   also a stat callout until `iterations/18-outcome-band-width` took it out of the
   outcomes band as an input rather than an outcome. Add it to the canonical list
   in the handoff so it stays consistent.

   **Two more numbers on that page are published against the handoff's NEVER list,
   and the list is the thing that is wrong.** The section 04 band carries an
   **11% Bundle Swap rate** and **+0.11 units per purchase on treated purchases**.
   Handoff line 29 calls both hypothetical modeling and line 210 files them as
   interview-only. The user confirmed on 20 September 2026 that Bundle Swap has read
   out and both are measured, and directed them onto the page. Correct handoff lines
   29 and 210 and add both to the canonical list; they are also now fair game for
   the résumé, which line 29 forbade. **Do not remove them from the page on the
   strength of the stale list**, which is why the page comment says this too.
   `iterations/18-outcome-band-width` has the full account, including why `+0.11`
   carries no percent sign.

   The org goal metric is now **numbered**, at the user's explicit direction in
   September 2026: "I want to include the number 4.07 to 4.33 here. That is important
   and the only goal worth emphasizing." Section 02 reads "The org is measured on units
   per purchase, and the goal was to move it from 4.07 to 4.33."

   This knowingly overrides the handoff, which puts the org goal figure on its
   NEVER-publish list (UPPu 4.10 to 4.31, trending 4.07 Yellow). It was left unnumbered
   until then for that reason. The user owns that content and made the call directly, so
   the page follows the user and not the handoff. Do not silently revert it. Two things
   to do with it: update the handoff's NEVER-publish list so the two documents stop
   disagreeing, and note that the page's pair (4.07 to 4.33) is the user's own phrasing
   and does not match the handoff's pair (4.10 to 4.31), so one of the two is out of
   date and only the user can say which.
10. Two content conflicts on `work/card-dashboard.html`. Both were once resolved in
    favour of the handoff; **both were resolved the other way by the user on
    2026-09-20**, and the handoff is the document now out of date.
    - **Team.** The live page at rishabhsingh.design says "Product Manager, UX
      Designer (me), Software Developer Manager, 4 Engineers". The handoff's
      approved-final copy says a UX working group: a UX Manager, me, and later two
      more designers, partnering with Product and Engineering. **Settled: the user
      supplied the live page's roster as the copy for section 03**, so the page now
      uses that and the hero meta rail was updated to match. See
      `iterations/25-card-dashboard-team-role/`.
    - **The third outcome.** The live page publishes "$158 OPS DSI per account
      linked". That figure is on the handoff's NEVER-publish list *and* its
      interview-only list, explicitly because it is not attributable to this redesign
      and no analysis has been run: line 209 calls it "the stake, not the outcome".
      **Settled the other way: the user directed it onto the page, firmly, replacing
      28% of contacts traced to discoverability in the outcomes `.stat-band`.** The
      concern was stated once and the direction stands. It now sits between two
      measured results in the same stat treatment. See
      `iterations/28-card-dashboard-ops-dsi-stat/`, which holds the 28% stat ready to
      restore if it ever has to come off.

    Also: `dynamic-layout-framework.webp` has legible annotation panels that name
    internal research ("ECM 2.0 & C3 UX research") and quote participant findings.
    It is already public on the live site, so it ships here, but it is the one asset
    on the page with internal names baked into the pixels.
11. One name missing on `work/pay-bill.html`. The Pay Bill slider was cut, won the
    Amazon Inventor Award, and its implementation plus a modified version of the
    design later shipped in a different project. Two places say that, and both
    say "another project" because nobody has said which one: the second paragraph
    of section 04 and the section 05 slider figcaption. Do not guess the project.
    It is not in the handoff. There used to be a third, the hero caption, which
    went when the hero captions did; that is also why the hero image is now the
    shipped Select amount screen rather than the slider.
12. `work/keybank.html` notes, for whoever edits it next:
    - The live page spells the client "Keybank". Every page here spells it
      **KeyBank**, which is the company's own capitalisation and what the home band
      already used. Body copy quotes the live page otherwise close to verbatim, with
      the handoff's one mandated correction applied ("cretaing" to "creating").
    - It is the one case study whose hero uses `.chrome-frame` rather than
      `.case-hero__device`. The device frame is built for a portrait phone
      (`aspect-ratio: 3/2` with the image at 52% width) and would render a landscape
      desktop screen unreadably small. The `__url` pill reads "KeyBank account
      opening", not a URL: the in-branch tool has no public address and inventing one
      would be a fabrication.
    - The hero and section 05 both show `confirmation.webp`. That is deliberate and
      both captions say so, because it is the only screen that carries the outcome.
    - "Under 5 min" in the `.stat-band` is the one callout with no `data-count`, per
      rule 6 in section 12: the count-up animates the first number in a string, so a
      wordy value reads as a glitch.
    - Role in `.case-meta` is "UX Designer, account opening end to end". The live page
      says "UX Designer (me)" inside the team line; the meta rail splits role from
      team, so the role cell states scope instead of repeating the team.

## 12. Case study pages

Every file in `work/` is a copy of `work/_TEMPLATE.html` with the copy and images
swapped. The structure is the deliverable: it is what makes five case studies read
as one publication rather than five microsites.

### The skeleton, in order

```
.case-hero--split back link, category pill, h1, then the .case-meta dl, all
                  in the text column. The rail is Role / Team / Timeline / Impact,
                  and Impact carries a number: see rule 11. No deck. | the one hero image beside it,
                  in .case-hero__device--bare for a phone (four pages) or
                  .chrome-frame for a web surface (KeyBank). No caption, so it
                  is a div, and the screen must be shipped work.
.case-section 01  Background          real pull quote, then prose
.case-section 02  Project goals       prose, then a .case-list of scope items
.case-section 03  Team and role       the roster, then the colon, then a .case-list of
                                      responsibilities. One sentence of prose, not two: no
                                      sentence about what made the role unusual or what the
                                      job was really about. See iteration 38.
.case-section 04  Design and outcomes prose, then the .stat-band
.case-section 05  Experience          optional .proto-block, then one or more
                                      .shots runs (.shots-head above each if
                                      there is more than one), then .case-note.
                                      Prose may sit between the prototype and a
                                      .shots run, as it does on Basket Building,
                                      where it says what the screens below are.
                                      Where there is a prototype, keep only the
                                      stills it cannot show.
.next-case        one link to the next case study
footer.cta.on-dark  the shared contact footer, copied verbatim from index.html
```

### Why the section layout is what it is

This body treatment is called Ledger and it carries no modifier class, because it
is the default. Three alternatives (a banded chapter header, a timeline spine, and
a full-bleed spotlight) were built and rejected; `iterations/07-case-body-candidates/`
has the archived CSS and the reasons.

`.case-section__grid` is `minmax(0, clamp(16rem, 18vw, 26rem)) minmax(0, 1fr)`: a left column holding
the index number and the section title, and the reading column on the right. The left column is `position: sticky; top: 7rem`, so while you read a long
section the title stays beside you and the page tells you where you are without a
table of contents. Below `62rem` the grid collapses to one column and the aside
goes `static`, because a sticky heading in a single column just eats the viewport.

`.case-section__body` is deliberately NOT clamped to a measure. The reading blocks
inside it clamp themselves (`.prose`, `.pull-quote`, `.case-list` and `.stat-band`
all carry `max-width: var(--measure-case)`), which leaves images and
`.proto-block` free to use the full column. Clamping the body instead collapsed
`.shots--pair` to one shot per row.

That self-clamping has one consequence worth knowing before you widen anything:
the column width does not affect the text. Early on the column was 909px and the
prose was 622px, a 32% empty right side that read as a missing column rather than
a margin. The fix was not a longer line, it was bigger type at a slightly wider
measure plus a wider rail, so the dead space shrank while the line got *shorter*:

| | first pass | now |
|---|---|---|
| Body type | 17px / 1.45 | 20px / 1.6 |
| Measure | 58ch, 622px | 55ch, 694px |
| Characters per line, typical | 84 | 75 |
| Characters per line, longest (2026-09-20) | | 86 pay-bill, 90 card-dashboard |
| Rail | 13rem | `clamp(16rem, 18vw, 26rem)` |
| Empty right side at 1512 | 32% | 17% |

The middle step of that table was 18px at 62ch, which looked right and measured
86 characters. It is the clearest case for counting instead of trusting `ch`: the
column was already the right width, only the type was too small for it.

The second row was added when the longest lines were actually measured rather than
derived. The 75 in the `now` column is a typical line and it is real, but it is not
the worst one, and the row it sat in used to be labelled "counted", which made 55ch
look like it enforced 75. Read section 9's correction before you quote either
number: holding a *maximum* of 80 needs about 49ch, and that narrowing has not been
made.

Every piece of *prose* in a case study is measure capped. The paragraphs on
`work/pay-bill.html` run to 86 characters.

`.case-note` is not prose and is **not capped.** It is a boxed aside at
`--t-small`, and the dashed box spans the full body column so it reads as a bar
closing the section. Its text was capped at `--measure-case` for a while, which
counted 81 characters and looked like a bug: the panel is 837px at 1512 and 1208 at
2560, the text stopped at 694, and the box carried an empty right third with the two
sentences wrapped into three short lines inside it. Uncapped the text fills the
panel, 757px at 1512 and 1065 at 2560, and the note runs 2 lines then 1. Do not put
the cap back; see `iterations/35-case-note-full-width/` and the caption width rule
below, which is the same trade for the same reason.

### The caption width rule

**A caption is exactly as wide as the image above it.** No `max-width` on
`.shot figcaption`, on `.case-hero__cap`, or on `.proto-block > figcaption`, so the
caption fills the same figure box the image fills and the two share a right edge.
This is the user's standing direction, given on 2026-09-20 and applied across the
board. The reason is plain: a caption that stops half way across the screen it
describes reads as a misalignment, as something broken rather than as a caption
belonging to that image.

It began scoped. Basket Building's `.shots-group` got it first, because a 56ch
caption under an 835px capture stopped less than half way across; that override is
now deleted, since the base rule covers it and nothing on that page moved when it
went.

What it replaced: both figcaption kinds were capped at 56ch, about 77 characters,
sized so that a caption obeyed the 80 limit. Counted longest caption on
`work/pay-bill.html` under that cap was 79 at every width from 768 to 5120, 77 when
re-measured on 2026-09-20. That is the number that section 9's wrong site-wide 80
generalised from.

**What it costs, measured on 2026-09-20 at 390, 1512 and 2560.** Caption width now
equals media width to the pixel in all 45 `.shot figcaption` on the five case
studies, at all three widths, 135 measurements with no mismatch. Nothing moved at 390: the body column is 347px, which
is narrower than the old 56ch cap, so every caption there was already matching. In
a `.shots--pair` or `--trio` cell nothing moved at 1512 either, for the same reason;
the cell is 396px. What moved is one-up `.shots` at 1512 and up, and `--pair` at
2560:

| Context | Caption width | Longest line |
|---|---|---|
| Any caption @ 390 | 347px, unchanged | 54 to 73 |
| `.shots--pair` cell @ 1512 | 396px, unchanged | 58 to 68 |
| `.shots--pair` cell @ 2560 | 459 → 580px | 86 to 99 |
| One-up `.shots` @ 1512 | 459 → 837px | 131 to 158 |
| One-up `.shots` @ 2560 | 459 → 1208px | 145 to 237 |

So a wide caption is a long line, and 237 characters is far past the 45-to-75
comfortable range and WCAG 1.4.8's 80. What makes it survivable rather than reckless
is line *count*, not line length: the cap exists because a reader loses the left edge
returning to it across many lines, and a two-sentence caption wraps to one or two
lines, where there is almost nothing to lose. 1.4.8 is AAA, and it is satisfied by
user-resizable text at any measure.

**Which turns the rule into a copy budget.** The longest caption on each page, by
character count and sentence count:

| Page | Longest caption | Sentences |
|---|---|---|
| `work/pay-bill.html` | 288, "The slider concept." | 4 |
| `work/keybank.html` | 248, "Branch information." | 3 |
| `work/transactions.html` | 239, "Accessibility annotations." | 3 |
| `work/basket-building.html` | 218, "The offer, before anything is in the cart." | 2 |
| `work/card-dashboard.html` | 171, "The dynamic layout framework." | 3 |

Two sentences is the budget in section 3, and the captions above it are the ones to
trim if any of this reads badly. **Trim the caption, do not narrow it and do not
shrink the image.** Narrowing it puts back the misalignment the rule exists to
remove.

`.stat-band` is a fixed two-column grid, not `auto-fit`. Even at the widened
column, four callouts at a sane minimum width come to a few pixels more than the
column, so `auto-fit` drops to three and orphans the fourth on its own row.
Two by two stays balanced at two, three, or four callouts. It drops to one column
under `30rem`.

It is capped at `--measure-case`, so **both of its edges line up with the
paragraph directly above it.** It used to span the full body column, which is
1208px against 694px of prose at 2560: a wide panel hanging off the right of a
narrow paragraph, with its second column of callouts starting past where the text
ended. It read as an unrelated element floating under the section rather than the
close of it. Do not widen it back. The things that span the column are the ones
that gain from pixels, `.shots` and `.proto-block`.

**One callout is not a band, it is a `.stat-pill`.** Because the grid is fixed at
two columns, a single stat in a `.stat-band` leaves half the panel empty, which is
the same void the home page band was rebuilt to avoid. `.stat-pill` is the answer:
`inline-flex` on a baseline so it shrink wraps to its own words, `--r-full`, and
the same `--stroke` hairline over `--bg-raised` with the 9% accent wash the band
carries, so a section with one figure and a section with two read as siblings. It
takes no `--measure-case` cap, because it is already only as wide as its content:
measured 522px of an 837px column at 1512, 523 of 976 at 1920.

Two things it does that the band does not. At `30rem` it goes `display: flex`,
full width, and squares off to `--r-xl`, because a 999px radius on a two-line box
draws a lozenge with the text pressed into its waist. And **the numeral wraps onto
its own line there**, which is `flex-wrap: wrap` doing the right thing by accident:
at 390 it ends up shaped like `.stat`, value above label.

**It currently has no live use.** It shipped in `practice.html` section 02 for one
commit, carrying the week an accessibility approval takes, and the user removed it
again: *"Actually, remove that impact pill for now."* The CSS stays, because "for
now" is not "never", and because the gap it fills is real and will come back: both
section 02 and section 03 have the one-figure shape, and the alternative is the
empty half a `.stat-band` leaves. Iteration 55 has the markup and the measurements.

If you do bring it back, **repeating a number that is already in the prose is
deliberate**, not an oversight to clean up: section 01 has 7 and 0 in both its
paragraph and its band. The paragraph carries the number with the caveat that earns
it, the pill carries it for someone scanning.

**Two callouts is a fine band.** Four is not a target, and the strongest band on
the site is the shortest. The band belongs to section 04, so a callout has to be a
*result*, not an input and not a process note. A research finding that set up the
work is section 01 or 03 material and is already in those paragraphs, so promoting
it into the outcomes band is the band taking credit for an input. Basket Building
ran `64%`, `4 in 10`, `Week 1`, `1 playbook` and now runs two measured outcomes;
see `iterations/18-outcome-band-width`.

**Whatever the band claims has to be in the prose too**, in the paragraph directly
above it, per the standing rule that numbers live in body copy. A band is a
restatement, never the only place a figure appears. The check is to delete the band
mentally and ask whether the section still reports its own outcome.

### The prototype slot

Section 05 can open with a `.proto-block`: a phone-framed `<iframe>` that runs a
self-contained HTML prototype from `prototypes/<slug>/index.html`, including one
built with AI. It is the one thing on a case study a reviewer can operate, so it
goes before the stills.

Default to loading it on arrival: a real `src` plus `loading="lazy"`, which keeps
it off the critical path, runs it with JS off, and spares the reviewer a click to
reach the one interactive thing on the page. `site.js` section 8b still supports
the other shape, the real URL parked in `data-src` and set only when a cover
button is pressed, for a prototype heavy enough that arriving in it unannounced
would be worse than asking. The iframe needs a real `title` either way. Only
Improving Basket Building has one today; the other case studies delete the whole
`<figure>`. Do not ship `.proto-embed--pending` on a live page, an empty player
reads worse than no player.

Give it **two selects, not a row of tabs**, when there is more than one thing to
choose. Five tabs wrapped to a different shape at nearly every width, which drove
the iframe's height around and read as five unrelated things; a category and then
a variant within it is usually what the choice actually is, and two selects are
one height at every width. Each needs a visible `<label>`, a `44px` min-height,
and a border that clears 3:1 against its own background under WCAG 1.4.11
(`#D5D9D9` on white is 1.4:1 and fails, `#888C8C` is 3.55:1). Swapping the panel
is silent, so announce it in a visually hidden `role="status"`, never with
`aria-live` on the panel itself, which would read a whole screen of content out
on every change. Drop `role="tabpanel"` and `tabindex="0"` from the panels with
the tabs: without a tablist they are a lie and an extra stop for a keyboard user.

There are two shapes, and the choice is about what the prototype draws for itself:

- **`.proto-embed`** is the default. A 22rem, 9/17, black-bezelled frame, for an
  iframe whose content *is* a phone screen and nothing else.
- **`.proto-embed--wide`** is for a prototype that draws its own device frame or
  needs width for controls. Full column and **no surface of its own at all**: no
  bezel, no border, no fill, because a card around a phone inside `.proto-block`'s
  own panel is three nested boxes. The prototype sets `html, body { background:
  transparent }` so the block's panel runs under it; an iframe paints its own
  document's background, so both sides have to agree. The dormant cover, if the
  prototype uses one, is the one thing that keeps an edge, or a tall empty region
  with a play button in it reads as a broken image.

  Its height is **measured, not declared**. Section 8a of `site.js` reads the live
  prototype's own document height and sets it inline, refitting in both directions
  whenever the prototype swaps what it shows or a resize reflows it. Shrinking is
  safe only because the prototype's controls sit at the *top* of the frame, so a
  refit moves its bottom edge and the caption below, never the control the visitor
  just used. `--proto-h` plus `--proto-h-1` … `--proto-h-5`, tiered by `@container`
  on `.proto-block`, are only the fallback: what a visitor sees while
  the iframe is still loading, with JS off, or over `file://`, where Chrome makes
  the iframe an opaque origin and the measure is not allowed. They must stay worst cases, so read
  the note above them in `tokens.css` and re-measure at every width if the
  prototype's own copy changes. Two reasons a simpler rule will not do: the content
  height is not monotonic in the embed width, and the embed width is not monotonic
  in the viewport's.

  Tier one token per `zoom` step of the prototype's own device frame, and key the
  `@container` thresholds to those same breakpoints rather than to round numbers. An
  `inline-size` container is measured on its **content box**, so the width a
  `@container` query sees is the embed's width, which is the iframe's viewport width,
  which is exactly what the prototype's own media queries key on: the two can mirror
  each other one for one. A tier whose ceiling sits *above* a zoom step hands a
  zoomed-up frame a height measured for a smaller one and the iframe scrolls inside
  itself, so subtract a couple of px from each threshold, never add.

  A prototype that scales a fixed width device frame must do it with `zoom`, not
  `transform: scale`, or its layout box stays full size: enlarged it overflows
  sideways, shrunk it leaves a hole under itself. Scale in **both** directions. A
  393px phone at 1x in an 862px embed uses barely half the width it was given, which
  is the same "use the space" note the rest of the site follows, so zoom it up as
  well as down. The cap is set by asset density, not taste: raster assets encoded at
  *N*x their 1x boxes deliver only *N* / zoom device pixels at the largest zoom, so
  keep that quotient at 2x or better and record the coupling in both build scripts.

A file under `prototypes/` is a self-contained artifact, not a site page, so it is
the one place exempt from the no-`<style>` and token rules. If it is generated from
a source deck, commit the generator beside it and say so in the file's head
comment, or the next agent will hand-edit 200KB of output and lose it.

A prototype extracted from a deck inherits the deck's shortcuts, and six kinds are
worth looking for before it ships. **Text truncated by `overflow: hidden` inside a
fixed-height card cuts at an arbitrary pixel**, usually through the middle of a line
of letters. `-webkit-line-clamp: <n>` is the fix: it snaps the box to a whole number
of lines and adds an ellipsis. It needs `display: -webkit-box` and
`-webkit-box-orient: vertical`, the `-webkit-` prefix specifically, and a flex
sibling of `flex: 0 1 auto` rather than `flex: 1`, or the box is stretched back to
full height and the clamp buys nothing. And **a deck reuses one image for several
items** to save the author time. On a screen whose whole argument is that the
customer is choosing between those items, identical thumbnails read as a bug. Give
each one its own asset, put non-deck sources in a `SRC_OVERRIDE`-style table in the
asset script rather than in the source tree, and archive the original under
`iterations/` with the recipe. And **a box that once had a background keeps its
padding after the background goes**, which indents one block of a card while its
neighbours stay flush and is invisible in the markup because there is nothing left to
see. Check every block of a card against one left and one right edge. While you are
there, align an icon to a line of text by making its box **exactly one line box**
(`height` = the line-height, viewBox unchanged, so `preserveAspectRatio` centres the
glyph for you) rather than nudging it with a `margin-top`, which only ever lands by
coincidence and drifts the moment the line-height changes.

The fourth is the costliest: **a control that only restyles itself**. A deck's tabs,
toggles and pickers routinely move a `.selected` class and nothing else, because the
author was going to talk over the slide. If the thing the treatment exists to
demonstrate is what that control changes, the prototype is silently failing to
demonstrate its own argument, and it looks finished while doing it. Make the control do
the work, and expect three consequences.

First, **a control that changes content needs ARIA that a decorative one did not**. Four
unlabelled buttons that restyle themselves are fine; four that swap six products are a
tablist, which means `role="tablist"` / `tab` / `tabpanel`, `aria-selected`,
`aria-controls` and `aria-labelledby`, roving `tabindex` (0 on the selected tab, -1 on
the rest) and Arrow / Home / End keys. A panel needs no `tabindex` of its own if it
already holds focusable controls. Give the ring room to clear whatever border the
selected state grows, or arrowing along a row looks like nothing is happening. And where
repeating the same six cards left six identically named "Add to cart" buttons in one
panel, name them per product.

Second, **`[hidden]` will not hide a panel whose author CSS sets `display`**. The UA
sheet's `[hidden] { display: none }` loses to any author declaration no matter how weak
the selector, so a `display: flex` row needs an explicit `[hidden] { display: none }` of
its own or every panel stacks up at once.

Third, **state the control used to be able to ignore now needs a decision**. A running
total written against "every card in this region" was correct while only one set of cards
existed; once the control swaps the set, it counts hidden cards too. Whether that is a bug
or the feature depends entirely on the offer's own rules, so read them before writing
code. A discount for two items *for one mission* means changing the control must clear the
selection. A discount for any two items means it must not, and then the counter can
legitimately read 2/2 while nothing on screen is ticked, which needs a total that is
visible from every tab so the number is never unexplained. Getting this backwards is
cheap to do and invisible in testing, because both versions look correct as long as you
only ever exercise one tab.

The fifth is a picture rather than a control: **a screenshot of chrome cannot hold state**.
A deck will paste in an image of a tab bar, a nav rail or a status bar, and that image is a
photograph of one moment, badge and selected state included. If anything the prototype
demonstrates should change that chrome, the image has to become markup, and the badge
painted into it is the tell. Measure the replacement off the file it replaces rather than
eyeballing it, because a device frame's height usually feeds a fallback height ladder
somewhere: read the source's dimensions and its rendered box to get the scale factor, take
the colours from a histogram, check whether evenly spaced cells reproduce the measured
centres closely enough to use flex, and land on the same total height so nothing downstream
moves. Then let only the parts that do something be controls. Four glyphs with
`aria-hidden="true"` beat four buttons that go nowhere, and a live count wants
`role="status"` with a visually hidden noun beside it, since the glyph it annotates is
hidden and the noun is therefore the whole accessible name. Make the noun agree with the
number.

Counters that live in that chrome bring three traps. **Scope every read and write to the
panel**, via `closest()`, when several treatments sit in the DOM at once, or a reviewer
sees the cart they built in a different scenario. **A reset that restores one subtree's
`innerHTML` cannot reach a counter outside it**, so zero it by hand; moving the counter
inside the restored subtree instead is worse, because the restore would set it to whatever
it said at page load, which is right only by luck. And **check whether the handler you are
incrementing from can fire twice for one thing**: a deck's swap handlers often re-point a
trigger's `onclick` back at itself, so write a floor (`Math.max(1, current)`) rather than a
`+1` where the underlying object is being replaced rather than added to. Patch inherited
deck JS through a helper that raises unless the string it expects appears exactly N times;
a silent no-op ships a dead counter and a clean build log.

The sixth is the fourth's twin at the end of the flow: **a commit that only relabels its
own button**. A deck's submit turns green and says "Added", because the author was about
to change slides. Nothing tells the customer what is now in their cart, and the state
behind the button is still the state of choosing. If the prototype has an outcome worth
demonstrating, build it, and take the loading and confirmation idiom the deck already
uses somewhere else rather than inventing a second one: a reviewer clicking through two
strategies in one sitting reads two spinners as two systems. Reuse the summary markup for
the confirmation's figures too, so its type and spacing cannot drift from the panel it
replaces, and recompute every number from the same attributes the live summary reads.
A reference screenshot's figures belong to whatever selection was on screen that day; if
yours happen to match it, that is a good sign, not the goal. Same for its repeated
placeholder imagery: clone the `src` of what the customer actually chose out of the live
DOM, never name an asset in a JS string, because a build's `src` rewriting and its asset
collection usually run on markup only and a hard-coded path will work right up until one
of them changes.

Four things break when a commit replaces its own container. **The element that was clicked
is detached**, so read the panel, the header and the selection *before* the swap and write
the counter against what you captured; a `closest()` afterwards walks up to nothing and
fails silently. **Focus falls to the top of the document**, so give the new block
`tabindex="-1"`, focus it with `{ preventScroll: true }`, and lead it with a visually
hidden line naming the outcome, rather than leaving the first thumbnail's product name to
stand for what happened. Do not also give it `aria-live`: inside a block about to be
focused, a live region announces on insertion and then again on arrival. **Handlers written
for a world where the old controls survive become unreachable**, and deleting them is part
of the change; code that contradicts the model is worse than no code. And **the scroller
keeps its position while the content shrinks**: a submit at the bottom of a panel taller
than the frame means the panel's top is far above the visible area when it is pressed, so a
short confirmation renders off-screen and the customer watches an empty box resolve into
whatever is below. Scroll it back yourself, by walking `offsetTop` up to the scroller
rather than differencing `getBoundingClientRect()` against `scrollTop`, since rects are
zoom-scaled and `scrollTop` is not, and do it again after anything you un-hide above the
new content. That last fault will not appear in any assertion you would think to write.
It appears in a screenshot.

Two asset notes that go with this. Boxes in the asset script may be **derived** from the
CSS instead of measured, when the constraint is a simple `max-width` / `max-height` with
`object-fit: contain`: for a source of aspect `a`, the box is
`(min(maxW, maxH * a), min(maxH, maxW / a))`, rounded up. That is one line of arithmetic
instead of one measurement per image and it survives a reorder, but it is an exception,
so say so in the script where the docstring promises measured numbers. And **removing a
use can make a box too small**, not just too large: an image constrained by two
different call sites is encoded for the larger, so deleting the larger one leaves the box
under-sized for whatever is left. Re-measure every remaining use, with every panel and
sheet open, after any change that removes one.

### Rules for a new case study

1. Copy `work/_TEMPLATE.html`. Do not change the section order, the heading
   levels, or the class names.
2. Background opens with a **real** quote from a customer or a research
   participant. Never invent one. If there is no real quote, delete the `<figure>`.
3. Exactly one `<h1>`, the case title. Every section title is an `<h2>`. The only
   `<h3>` allowed is `.shots-head`, naming one run of screens inside section 05.
4. No em dashes anywhere, including the `<title>`. See section 3.
5. Never publish a modeled, projected, or unmeasured number as an outcome. Only
   figures from the content handoff's canonical list.
6. Two to four stat callouts. `data-count` only on a plain figure ("23%", "2.3M");
   a wordy callout ("Week 1", "1 playbook") stays static, because the count-up
   animates the first number in the string and reads as a glitch otherwise.
7. Every image needs real alt text. A placeholder keeps "Screen to be added:" at
   the front of its alt, so a missing export shows up in an accessibility audit
   instead of hiding behind a plausible description.
8. Two footnote variants, both in the template. Use the pre-launch one only for
   work that has not shipped.
9. Set `--accent` nowhere. A case study inherits the site accent.
10. No `<style>` block and no new stylesheet. If a case study needs something the
    components above do not cover, add a component here first.
11. **The `.case-meta` rail is Role, Team, Timeline, Impact, and Impact carries a
    number.** The fourth cell used to be flexible (Org, Platform, Recognition) and
    all three variants described where the work happened or how it was received
    rather than what it did, so the hero had no result in it and a reviewer met the
    first one four sections down. Canonical figures only, the same constraint as
    rule 5, and if a project has no measured outcome yet do not reach for a framing
    that implies one. Check the wrap at 744 and 1024, where the cell is narrowest
    and a bare figure lands alone on the second line; bind the tail with `&nbsp;` or
    `.nowrap`, never with a width. Before dropping the old fourth cell, check its
    content survives in the body copy: on KeyBank "g2o" appeared nowhere else on the
    page and had to move up into Team. See iteration 59.
12. **A caption is as wide as the image above it, and two sentences long.** The
    width is automatic, so the only thing to get right is the length: a bold label
    and one sentence. Never add a `max-width`, an inline width, or a wrapper to
    narrow a caption. See the caption width rule in section 11 and the caption
    budget in section 3.

After copying: point the previous case study's `.next-case` at the new page, and
confirm the matching band on `index.html` links to it.

### The about page

`about.html` is not a case study and it is not the home page, but it is built out of
the case study skeleton rather than out of the home page hero, because it is the
same kind of object: a document with a reading column and a sticky rail of section
titles. Reusing that skeleton is also what kept the page from needing a stylesheet
of its own. It added exactly three rules to `components.css` and no tokens.

What it does the same as a case study: `.case-hero--split`, the `.case-meta` rail
inside the hero's text column, `.case-section` + `.case-section__grid` with a sticky
`.case-section__aside`, `.prose` at `--measure-case`, `.case-list` for the tool
roster, and the shared nav, `.progress`, skip link and `.cta` footer copied verbatim.

**Its copy is the legacy rishabhsingh.design/about page's own copy, near enough
verbatim, in three of its five sections.** A first version rewrote that biography in
this site's voice and added an employer roster, an award and a paragraph about the
case studies; it read as over the top and was replaced. The two sections that are not
from the legacy page are Accessibility and AI and design ops, which are original and
which were deliberately left untouched in the rewrite. Full before and after in
`iterations/43-about-legacy-copy/`. The practical consequence for anyone editing this
page: **the voice rules in section 3 do not describe three of its five sections.**
"Hello! I'm Rishabh", "I excel at", "my favorite aspect", the exclamation mark at the
end of Away from work, the straight quotes around "whys" are all his own words off the
old site and are meant to be there. Do not quietly edit them into the house voice. The
one thing that was changed on the way over is the en dash in "(2015-2017)", which
became "(2015 to 2017)" because no en or em dash appears anywhere on this site.

What it does differently, and why:

- **No `.case-section__num`.** On a case study the numbers mark a narrative running
  in one direction, from background to outcome, so 01 through 05 mean something. On
  the about page the order is a reading order and nothing more, and numbering it
  would promise an argument the page is not making. The sticky aside carries the
  title alone. `.case-section__title`'s own `margin-top: var(--s-3)` is harmless
  without a number above it and helps it sit optically level with the first line of
  body copy.
- **No `.case-back` rail.** "All work" belongs above a case study. The exit is a
  relabelled `.next-case` at the foot of the page, pointing at `index.html#work`
  with the label "Selected work" and its `aria-label` set to match, because a page
  that ends on a paragraph about sneakers still needs a door.
- **`.about-portrait` in the hero media slot.** The one hero media on the site that
  is a photograph rather than a screen. It borrows `.shot__frame` for the frame,
  because `.chrome-frame` would claim the image is a running application and
  `.case-hero__device` is sized for a phone bezel. It is capped at 20rem rather
  than filling its track: `assets/img/headshot.jpg` is 512px square and it is the
  only portrait asset there is, so a 509px 1fr track would render it at 1:1 and
  make it the one soft image on the site. With the cap it renders at 1.6x, in the
  same range as the 1600px screen captures in their ~840px column. The grid ratio
  shifts to 1.9fr/1fr, the same track the bare phone hero takes, so the capped
  photo is not marooned in the middle of a wide column. Raise the cap and the ratio
  together if a larger headshot is ever exported.
- **No inline links in the prose.** `.link-underline` sits at
  `background-size: 0% 2px` until hover and takes `--text` for its color, so inside
  a paragraph it is indistinguishable from the text around it. That is a 1.4.1
  failure waiting to happen, and its two existing uses are standalone links, not
  inline ones. The page names Pay Bill and the case studies in plain text instead.

Line lengths counted at 390, 640, 900, 1280, 1512 and 2560: prose tops out at 76
characters, the `.case-list` items at 74, the hero deck at 60, `.case-meta` values
at 51. All inside 1.4.8's 80. Headings run h1 then five h2 then the footer's h2, no
skips, and all five `aria-labelledby` references resolve.

The third new rule is `.case-section__body .case-list + .prose`, which gives a
paragraph that resumes after a list somewhere to sit: `.prose p + p` only reaches
siblings inside one `.prose`, and a `.case-list` breaks the chain. The about page does
this once, in AI and design ops, and so did `work/basket-building.html`, twice, which
had been carrying
`style="margin-top: var(--s-6)"` inline at both of its list-to-prose joins. A value
repeated inline on two elements is a component rule that has not been written yet, so
writing it let both inline styles be deleted. The rule takes the same `--s-6`, which
is one step larger than `.case-list`'s own lead-in, because resuming prose after a
list is a bigger break than introducing one.

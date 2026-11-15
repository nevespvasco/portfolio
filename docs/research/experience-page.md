# Experience page: research and three concepts

Research for issue #21, "Research and pick a more distinctive, scannable Experience page".
Scope: how strong portfolios and data-viz/product sites present career history, what the
accessibility guidance says, and three concepts built on the real data in
`shared/experience.ts`. Nothing here is implemented yet.

## 1. What we are working with

The page today (`app/pages/experience.vue`) is a single column: an `<ol>` of `<article>`s with a
left border, company `h2`, title, `<time>` range, paragraphs or bullets, and the stack tags for
OFFX. Then Education and the contact CTA. It is correct and accessible, but every role weighs the
same, so a 2-month internship takes as much room as 2.5 years at Siemens, and nothing shows *how
long* anything lasted or that two roles ran in parallel.

The data, on one axis (months counted from May 2017; the whole career spans about 115 months):

| Role | Dates | Months (LinkedIn-style, inclusive) | Body |
|---|---|---|---|
| OFFX, Frontend Software Engineer | Mar 2025 – present | 21 and counting | 2 paragraphs + 8 stack tags |
| Siemens, Software Developer | Oct 2022 – Mar 2025 | 30 | 3 long bullets, real metrics |
| NOS SGPS, Frontend Developer | Jan 2022 – Oct 2022 | 10 | 3 short bullets |
| Wonderstaff, Frontend Engineer | May 2022 – Jul 2022 | 3, fully inside NOS | 3 short bullets |
| Sinmetro, Full Stack Developer | Feb 2021 – Jan 2022 | 12 | 4 bullets, one metric |
| NBCLINIC, Full Stack Developer | Sep 2020 – Oct 2020 | 2 | 2 bullets |
| Mediaweb Global, Web Developer | Feb 2019 – Jun 2019 | 5 | 4 bullets |
| Pombalsys, Web Developer | May 2017 – Jul 2017 | 3 | 2 bullets |
| Education: Politécnico de Leiria (TeSP) | 2017 – 2019 | ~24 | — |
| Education: ISTEC (BE) | Oct 2021 – Aug 2024 | 35, alongside 3 jobs | — |

Things that shape every design decision:

- **Very uneven durations.** Four of eight roles are 2–5 months; one is 30. At the 46rem content
  width one month is about 6.4px; on a 375px phone (343px track) it is about 3px. A 2-month role
  is a 6–13px sliver.
- **One true overlap** (Wonderstaff inside NOS) and three hand-off months where one role ends and
  the next starts in the same month (Jan 2022, Oct 2022, Mar 2025). With inclusive month maths
  those hand-offs draw as fake one-month overlaps; see "Date maths" below.
- **Visible gaps** if time is drawn to scale: Jul 2017 – Feb 2019 (covered by the TeSP), Jun 2019 –
  Sep 2020 (15 months) and Oct 2020 – Feb 2021. Any proportional chart shows these. That is an
  owner decision, not a technical one.
- **Stack only on OFFX.** Older roles name technologies in their bullets (Ruby on Rails, Adobe XD,
  OutSystems, Bulma, Vue.js, Laravel, Docker, React Native, React, SAP UI5 → Vue 3), but there is no
  structured `stack` field for them.
- **Metrics only on some roles.** Siemens (~1,800 users, 12 screens / 30+ components, 13-person
  team, 6+ months saved) and Sinmetro (~15%) have numbers; OFFX's "1,000+ counterparties" describes
  the company, not the work. The others have none.
- **Content policy.** The data file says only what is public on LinkedIn goes on the site, so no
  invented highlights, era names or achievements.

## 2. Patterns seen in the wild

| Pattern | Real examples | Fit for this content |
|---|---|---|
| **Dates column + list + tags** (reverse-chronological, one row per role, dates in a narrow left column, tech tags under each) | [brittanychiang.com](https://brittanychiang.com/) (current v5); shadcn "Experience 1" block ([shadcnblocks](https://www.shadcnblocks.com/block/experience1)) | Good baseline, very scannable. Not distinctive on its own, and it still gives short roles equal weight. |
| **Vertical tabs** (company list on the left, one panel at a time) | Brittany Chiang v4 ([source](https://github.com/bchiang7/v4), `src/components/sections/jobs.js`): proper `tablist`/`tab`/`tabpanel`, roving tabindex, arrow keys; on phones the tabs become a horizontally scrolling row | Widely copied, compact. But it hides 7 of 8 roles, breaks find-in-page and skimming, and the sideways tab strip on phones is easy to miss. Poor fit for a page whose job is scanning. |
| **Grouped roles + connector rail** (one company header, roles beneath, vertical line) | LinkedIn position grouping ([help](https://www.linkedin.com/help/linkedin/answer/94894)) | The rail idea is useful; grouping itself does not apply (no repeat employers). |
| **Explicit gap/overlap rows in text** | shadcn.io "Timeline work experience" block ([link](https://www.shadcn.io/blocks/timeline-work-experience)): each role shows its length in months, and dashed rows between roles state gaps and overlaps in words | Very relevant: solves the Wonderstaff overlap honestly and in text, which is also what screen readers need. |
| **Gantt / range bars** (one bar per role on a shared time axis) | Month-cell career grid on a personal site by D. J. Petersen (one coloured cell per month per company; the post is no longer online, it turned up in search); D3 [Resume Viewer](https://www.richardadleta.com/posts/resume-viewer-intro) (zoom/pan timeline over JSON Resume, skills with their own time ranges); [Flourish Gantt template](https://flourish.studio/2021/09/09/gantt-chart-template/); [Datawrapper range plot](https://www.datawrapper.de/docs/how-to-create-a-range-plot) | The only pattern that shows duration and overlap at a glance. Risks: slivers for short roles, exposed gaps, poor phone fit if horizontal, and a chart is not accessible by default. Best used as a small, decorative-plus-text overview, not as the only representation. |
| **Expandable cards / accordions** | Common in component galleries (e.g. a 21st.dev experience component where each employer expands to reveal details and skill tags) | Fixes uneven bullet length by collapsing everything to a uniform summary row. Costs: hidden text, find-in-page (see §3), an extra click. Good for older roles, bad for the current one. |
| **Now vs then** | The `/now` page convention ([nownownow.com/about](https://nownownow.com/about), [sive.rs/now2](https://sive.rs/now2)) | Strong fit: the current role is long, richer (paragraphs + stack) and what a recruiter reads first. Giving it a featured block and compressing the past matches the data. |
| **Stack evolution over time** | Stack Overflow Developer Story (2016–2022, revived 2026: [blog](https://stackoverflow.blog/2026/09/10/re-introducing-developer-story/)); the Resume Viewer's per-job skills | Appealing, but the data does not support it yet: only OFFX has `stack`. Would need a `stack` field added per role, taken only from tech already named in the LinkedIn bullets. Optional extra, not a core concept. |
| **Per-role highlight metric** | 21st.dev "Portfolio Experience" component lists impact metrics per role ([link](https://21st.dev/@uilayout.contact/components/portfolio-experience.md)) | Uneven: 2 of 8 roles have real numbers. Forcing a metric everywhere would mean inventing. Use an optional `highlight` field, shown only where it exists. |
| **Sticky year markers / scroll-driven reveals** | Sticky left column with scrolling content is a common one-page layout (Colorlib's [developer portfolio roundup](https://colorlib.com/wp/developer-portfolios/)); CSS scroll-driven animations ([WebKit guide](https://webkit.org/blog/17101/a-guide-to-scroll-driven-animations-with-just-css/)) | Sticky years help on a long page; this page is not very long. Scroll reveals add polish but no information, and can hide content (see §3). Use sparingly, as progressive enhancement. |

General guidance repeated across sources: vertical layouts on phones, horizontal only on wide
screens ([daisyUI timeline](https://daisyui.com/components/timeline/),
[Flourish mobile note](https://helpcenter.flourish.studio/hc/en-us/articles/8761591366031-How-to-adjust-your-horizontal-timeline-for-mobile));
keep a plain text version of the dates next to any graphic; and pair each role with a concrete
result where one exists ([Elegant Themes](https://www.elegantthemes.com/blog/wordpress/web-developer-portfolio)).

## 3. Accessibility and platform notes

**Timeline semantics.** Keep the `<ol>` of roles: order and count are announced for free
([Nebula timeline](https://nebula.kaluza.com/components/timeline/),
[HTMHell on lists](https://www.htmhell.dev/adventcalendar/2023/17)). Hide the rail, dots and bars
from assistive tech (`aria-hidden="true"`) and put durations in real text; keep `<time datetime>`.
Note that Safari/VoiceOver drops list semantics when `list-style: none` is set; adding
`role="list"` to the `<ol>` restores it (the page already relies on unstyled lists).

**Charts.** Data tables or real text remain the most recommended screen reader equivalent for
charts ([MIT Vis group](https://vis.mit.edu/pubs/rich-screen-reader-vis-experiences)). The W3C
complex-images tutorial suggests a short label plus a long description that is visible to everyone,
ideally as a `<figure>`/`<figcaption>` or adjacent content
([W3C WAI](https://www.w3.org/WAI/tutorials/images/complex/)). For a career chart the long
description *is* the role list below it, so the chart can be `aria-hidden` or, better, a list of
links whose names carry the dates. Don't reach for `role="grid"` (the Gantt vendors do, e.g.
[Syncfusion](https://ej2.syncfusion.com/vue/documentation/gantt/accessibility)); that pattern is
for editable, spreadsheet-like widgets ([Roselli on tables](https://adrianroselli.com/2017/11/hey-its-still-ok-to-use-tables.html)).
Sarah Fossheim's tutorials are a good reference if the chart ever becomes interactive
([dev.to series](https://dev.to/fossheim/an-introduction-to-accessible-data-visualizations-with-d3-js-3aih)).

**Target size.** WCAG 2.2 SC 2.5.8 wants 24×24px targets unless an equivalent control exists
elsewhere. Bars for 2–3 month roles are 6–19px wide, so either they are not links, or the role list
provides the equivalent link (the exception), or the hit area is padded.

**Disclosures.** Native `<details>/<summary>` is fine for simple show/hide, but:
headings inside `<summary>` are exposed inconsistently (JAWS, Safari with `role=button`); removing
the marker can lose the expanded/collapsed state in Firefox + VoiceOver; links inside `<summary>`
lose their semantics ([Scott O'Hara, 2022](https://www.scottohara.me/blog/2022/09/12/details-summary.html),
[Adrian Roselli](https://adrianroselli.com/2020/05/disclosure-widgets.html)). So put the
heading *outside* the summary or use the APG pattern: an `h3` wrapping a `<button aria-expanded>`
with the panel right after it ([W3C APG disclosure](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/)).
Find-in-page: Chromium auto-opens closed `<details>` on a match; Firefox added
`hidden="until-found"` in 139 ([MDN release notes](https://developer.mozilla.org/docs/Mozilla/Firefox/Releases/139));
Safari support is partial at best ([caniuse](https://caniuse.com/mdn-html_global_attributes_hidden_until-found)).
Exclusive accordions (`<details name>`) work everywhere current (Chrome 120, Firefox 130,
Safari 17.2; [Chrome docs](https://developer.chrome.com/docs/css-ui/exclusive-accordion)) but
"only one open" is a bad idea for comparison reading; don't use it here.

**Animating open/close.** `::details-content` is supported in Chrome, Firefox 143 and Safari 18.4
([Chrome blog](https://developer.chrome.com/blog/styling-details)), but height animation needs
`interpolate-size`, which is still Chromium-only and not Baseline
([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/interpolate-size)). Gate it in
`@supports`; elsewhere it opens instantly, which is fine.

**Motion.** Scroll-driven animations (`animation-timeline: view()/scroll()`) became Baseline Newly
available in October 2026: Chrome 115, Safari 26, Firefox 159
([web.dev](https://web.dev/blog/web-platform-10-2026)). Visitors on Safari < 26 or Firefox < 159
get no animation, so the static state must be the complete one. Reduced motion: WCAG 2.3.3 (AAA)
covers interaction-triggered motion and `prefers-reduced-motion` is the sufficient technique
([W3C C39](https://w3c.github.io/wcag/techniques/css/C39)). The known trap is reveal effects that
start at `opacity: 0` and never reach the visible state when the animation is removed
([write-up](https://dev.to/lawebe/how-an-accessibility-saas-broke-its-own-landing-and-how-we-fixed-it-5802)).
`main.scss` already shortens durations globally under reduced motion; for scroll-linked
animations set `animation: none` explicitly instead of relying on that rule, because a short
time-based duration is not a reliable way to switch off an animation driven by scroll progress.

**Sticky.** Any ancestor with `overflow: hidden/auto` breaks `position: sticky`; prefer
`overflow: clip`. iOS Safari still has open sticky jitter reports (WebKit
[301616](https://bugs.webkit.org/show_bug.cgi?id=301616),
[231953](https://bugs.webkit.org/show_bug.cgi?id=231953)). `UiPageContainer` has no overflow rule,
so sticky would work today; test on a real iPhone.

**Date maths.** The page is statically generated, so "present" and the OFFX duration are frozen at
build time. Computing them on the client instead risks a hydration mismatch at month boundaries.
Simplest: compute at build and redeploy often, or render the live duration only after mount.
Pick one convention: LinkedIn counts months inclusively (Jan–Oct = 10 months); matching it keeps
numbers identical to the profile. For bar geometry, draw `[start, end)` so hand-off months do
not look like overlaps.

## 4. Three concepts

All three keep the existing data shape, add only small helpers to `shared/experience.ts`
(month index, duration text, an optional `highlight?: string`), use no new dependencies, and keep
the role list as real HTML text so the existing axe checks at 375px and 1280px keep passing.

### Concept A: Range-bar ledger

**Description.** The list stays the backbone but every row becomes a dense ledger line: dates and
duration in a tabular left column, company and title, and under them a thin full-width track
spanning May 2017 → now with that role's span lit in accent green. Reading down the page, the
bars form a Gantt chart without ever being a separate chart: you see at a glance that Siemens is
long, Wonderstaff sits inside NOS, and the early roles are short. OFFX's bar runs to the right
edge with a soft fade to mean "ongoing". Details sit in a disclosure under each row; OFFX is open
by default, the rest collapsed, with a single "Expand all" toggle. A thin year scale (2017 … 2026)
sits above the first row and repeats as a muted axis at the bottom.

- **Desktop.** Grid `8rem 1fr`: left `Oct 2022 – Mar 2025` with `2 yr 6 mo` below in muted tabular
  figures; right company (h2), title, optional one-line highlight (Siemens: the ~1,800-user
  migration; Sinmetro: ~15%). The 6px track spans both columns underneath. Rows ~88px collapsed,
  so all eight fit in roughly one and a half screens.
- **Phone.** Single column: dates line, company, title, then the track at full width (343px, 3px
  per month, minimum bar width 8px). The year scale shows only 2017 / 2021 / 2026.
- **Keyboard / screen readers.** `<ol role="list">` of `<article>`s; heading outside the toggle:
  `h2` company, then a `<button aria-expanded aria-controls>` "Details" (or an `h2 > button` per
  APG). Tracks are `aria-hidden`; the duration is in the text. Overlap in text: Wonderstaff's meta
  line reads "alongside NOS SGPS". Expand-all is a plain button whose label flips.
- **Reduced motion.** Bars can grow from the left on first view (scroll-driven `view()` timeline,
  `@supports`-gated); under reduced motion and in unsupported browsers they are simply drawn.
- **Short roles and the overlap.** Minimum bar width (2 months on desktop, 8px on phone) and the
  text duration ("2 mo") keep short roles readable without inflating them; collapsed rows give
  every role the same small height, so short roles stop looking padded. Wonderstaff's bar visibly
  sits within NOS's span on its own row, which is the clearest possible way to show the overlap.
- **Cost.** Low to medium, about a day. `--start` and `--span` custom properties per row
  (`left: calc(var(--start) / var(--total) * 100%)`), one helper for month index and duration, a
  `ref` per row for the disclosure (or native `<details>` with the heading outside it).
- **Risks.** Gaps become visible to scale (15 months in 2019–20), so the owner has to be fine with
  that. Collapsed details hide text from find-in-page in Safari unless `<details>` is used (then
  Chromium and Firefox reveal on match). Bars sit almost touching at hand-off months; the `[start,
  end)` rule handles it. Nothing Safari- or Firefox-specific beyond the optional animation.

### Concept B: Career map + cards

**Description.** A compact Gantt "career map" figure opens the page: a year axis 2017–2026, a Work
lane, a second lane only where Wonderstaff overlaps NOS, and an Education lane showing the TeSP
and the ISTEC degree running alongside Sinmetro, NOS and Siemens (a fact the current page hides).
Wide bars are labelled inside (OFFX, Siemens, Sinmetro, NOS); narrow ones are labelled on hover
or focus. Each bar links to its card below. The cards are the full role list, unchanged in
content, styled as compact cards with a duration chip.

- **Desktop.** The figure sits in the wide container (68rem), about 160px tall, with
  `grid-template-columns: repeat(115, 1fr)` and each bar placed with `grid-column`. Under it, a
  `figcaption` sentence ("Eight roles since 2017, the current one at OFFX since March 2025; studies
  ran alongside work in 2017–19 and 2021–24"). Cards in a single column below.
- **Phone.** A horizontal map at 3px per month cannot carry labels, so it becomes a non-interactive
  overview strip (bars only, years every two years, `aria-hidden`) above the cards. A vertical
  map does not line up with cards of varying height.
- **Keyboard / screen readers.** The map is an `<ol>` of links ("Siemens, Software Developer, Oct
  2022 to Mar 2025, 2 years 6 months") in the same newest-first order as the cards, so Tab order
  matches reading order; focus moves to the card heading (`tabindex="-1"`). The links double as an
  in-page table of contents. On phones the strip is hidden from AT.
- **Reduced motion.** Bars may sweep in once; disabled under reduced motion. Hover labels appear
  without transitions there.
- **Short roles and the overlap.** Bars under ~40px get no inner label; their names come from the
  focus/hover label and the cards. Hit area padded to 24px high and at least 24px wide by an
  invisible pseudo-element, or rely on the SC 2.5.8 equivalent-link exception. The overlap gets a
  lane of its own, which also needs a "lane" legend.
- **Cost.** Medium, about 2–3 days: lane assignment helper (greedy: place a role in the first lane
  it does not collide with), structured dates for education (the `period` strings would need
  `start`/`end` fields), label-fit logic, hover/focus labels, phone strip.
- **Risks.** The map is the most distinctive element but also the most fragile: hover labels are
  awkward on touch; 115-column grids are fine in all engines but sub-pixel rounding can make
  2-month bars render at different widths in Safari and Firefox; gaps are prominent, at the top of
  the page; and two representations of the same data double the maintenance.

### Concept C: Now, then the years

**Description.** Split the page in two. **Now** is a featured panel for OFFX: title, "since Mar
2025 · 1 yr 9 mo", both paragraphs, the stack tags, accent border. **Before** is a compact
history grouped under sticky year markers in a left rail (2025, 2022, 2021, 2020, 2019, 2017; only
years in which a role started). Each past role is a one-line summary (company, title, months, and
the optional highlight) that expands to its bullets. A thin rail line fills as you scroll through
"Before" where scroll-driven animations are supported.

- **Desktop.** "Now" spans the full content width. "Before" uses a `5rem 1fr` grid; year labels are
  `position: sticky; top: header height` inside their group, so the current year stays in view
  while its roles scroll past. 2022 holds three roles (Siemens, Wonderstaff, NOS).
- **Phone.** The rail collapses: year markers become sticky inline headers above each group
  (full-width, small caps, solid background so text does not show through). "Now" stacks normally.
- **Keyboard / screen readers.** "Now" and "Before" are `h2` sections; years are `h3`; roles are
  `h4` + disclosure button, inside an `<ol>` per year. Sticky positioning does not change reading
  order. The rail fill is `aria-hidden`.
- **Reduced motion.** No rail fill, no sticky "snap" transitions; the rail is drawn complete.
  Scroll-driven parts behind `@supports (animation-timeline: view())` and
  `@media (prefers-reduced-motion: no-preference)`.
- **Short roles and the overlap.** Collapsed one-liners make 2-month roles naturally small. The
  overlap is stated in the 2022 group: Wonderstaff's line reads "May–Jul 2022, alongside NOS SGPS",
  and it is listed between Siemens and NOS by start date. No proportional drawing, so the gaps are
  not exposed (only implied by missing years 2018, 2023–24).
- **Cost.** Low to medium, about a day: grouping helper by start year, featured panel, sticky CSS,
  disclosures, optional rail animation.
- **Risks.** Sticky year headers on iOS Safari have open jitter bugs and break silently if anyone
  later adds `overflow: hidden` to an ancestor. Grouping by start year hides that Siemens spans
  2022–2025 unless the summary line repeats the end date. It is the least "data-viz" of the three:
  it reads well but does not show duration at a glance.

## 5. Comparison and recommendation

| | A: Range-bar ledger | B: Career map + cards | C: Now, then the years |
|---|---|---|---|
| Duration at a glance | Yes, every row | Yes, best overview | No (text only) |
| Overlap shown | Visually + in text | Own lane + text | Text only |
| Short roles | Min width + compact rows | Slivers, needs labels | Compact one-liners |
| Current role emphasis | Open by default | Normal card | Featured block |
| Phone quality | Good | Map degrades to strip | Good |
| Screen reader story | Simple: list + text | Good, but two lists | Simple: headings + lists |
| Cost | ~1 day | ~2–3 days | ~1 day |
| Safari/iOS/Firefox risk | Low | Medium (sub-pixel, hover) | Medium (sticky on iOS) |

**Recommendation: Concept A, borrowing C's "Now" emphasis.** The range-bar ledger is the only
option that shows duration and the overlap on every screen size while keeping a single, plain
semantic list, and it is cheap. To make it distinctive rather than just tidy, give OFFX the
featured treatment from C (larger row, open by default, stack tags, "ongoing" bar fading to the
edge). Keep B's career map as a later option if the owner wants a hero visual; it needs structured
education dates first.

Open questions for the owner:

1. Are the to-scale gaps (2019–20 especially) acceptable on the page?
2. Should education appear on the time axis (it explains the first gap and shows study alongside
   work), or stay a separate section?
3. Add an optional `highlight` per role (Siemens, Sinmetro only) and/or a `stack` per role taken
   from technologies already named in the LinkedIn bullets?
4. Inclusive (LinkedIn) month counting for the durations shown in text?

## Sources

Examples and patterns
- Brittany Chiang, current site: https://brittanychiang.com/
- Brittany Chiang v4 source (tabbed jobs section): https://github.com/bchiang7/v4
- shadcnblocks "Experience 1": https://www.shadcnblocks.com/block/experience1
- shadcn.io "Timeline work experience" (gap/overlap rows): https://www.shadcn.io/blocks/timeline-work-experience
- 21st.dev "Portfolio Experience": https://21st.dev/@uilayout.contact/components/portfolio-experience.md
- 21st.dev "Impact Experience": https://21st.dev/@uilayout.contact/components/impact-experience.md
- LinkedIn position grouping: https://www.linkedin.com/help/linkedin/answer/94894
- Richard Adleta, Resume Viewer: https://www.richardadleta.com/posts/resume-viewer-intro
- Month-cell career grid (D. J. Petersen; now offline, page returned 404): https://astro-thedjpetersen-com.pages.dev/thoughts/animated-timeline
- Flourish Gantt template: https://flourish.studio/2021/09/09/gantt-chart-template/
- Datawrapper range plots: https://www.datawrapper.de/docs/how-to-create-a-range-plot
- Stack Overflow, Developer Story revived: https://stackoverflow.blog/2026/09/10/re-introducing-developer-story/
- /now pages: https://nownownow.com/about and https://sive.rs/now2
- Colorlib developer portfolios roundup: https://colorlib.com/wp/developer-portfolios/
- Elegant Themes, web developer portfolio advice: https://www.elegantthemes.com/blog/wordpress/web-developer-portfolio
- daisyUI timeline (vertical on mobile, horizontal on large screens): https://daisyui.com/components/timeline/
- Flourish, horizontal timelines on mobile: https://helpcenter.flourish.studio/hc/en-us/articles/8761591366031-How-to-adjust-your-horizontal-timeline-for-mobile

Accessibility
- Nebula timeline component (ol/li semantics): https://nebula.kaluza.com/components/timeline/
- HTMHell, semantic lists: https://www.htmhell.dev/adventcalendar/2023/17
- W3C APG disclosure pattern: https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/
- Scott O'Hara, details and summary (2022): https://www.scottohara.me/blog/2022/09/12/details-summary.html
- Adrian Roselli, disclosure widgets: https://adrianroselli.com/2020/05/disclosure-widgets.html
- Adrian Roselli, tables vs grid: https://adrianroselli.com/2017/11/hey-its-still-ok-to-use-tables.html
- W3C WAI, complex images: https://www.w3.org/WAI/tutorials/images/complex/
- MIT Visualization Group, rich screen reader experiences: https://vis.mit.edu/pubs/rich-screen-reader-vis-experiences
- Sarah Fossheim, accessible data viz with D3: https://dev.to/fossheim/an-introduction-to-accessible-data-visualizations-with-d3-js-3aih
- Syncfusion Vue Gantt accessibility (grid roles, for contrast): https://ej2.syncfusion.com/vue/documentation/gantt/accessibility
- W3C technique C39, prefers-reduced-motion: https://w3c.github.io/wcag/techniques/css/C39
- W3C Understanding SC 2.3.3: https://w3c.github.io/wcag/understanding/animation-from-interactions.html
- Reduced-motion reveal bug write-up: https://dev.to/lawebe/how-an-accessibility-saas-broke-its-own-landing-and-how-we-fixed-it-5802

Platform support
- web.dev, New to the web platform in October 2026 (scroll-driven animations Baseline): https://web.dev/blog/web-platform-10-2026
- WebKit, scroll-driven animations guide: https://webkit.org/blog/17101/a-guide-to-scroll-driven-animations-with-just-css/
- Chrome, styling details (`::details-content`): https://developer.chrome.com/blog/styling-details
- MDN, `interpolate-size`: https://developer.mozilla.org/en-US/docs/Web/CSS/interpolate-size
- Chrome, exclusive accordion: https://developer.chrome.com/docs/css-ui/exclusive-accordion
- MDN, Firefox 139 release notes (`hidden="until-found"`): https://developer.mozilla.org/docs/Mozilla/Firefox/Releases/139
- caniuse, `hidden="until-found"`: https://caniuse.com/mdn-html_global_attributes_hidden_until-found
- WebKit bug 301616 (iOS sticky shift): https://bugs.webkit.org/show_bug.cgi?id=301616
- WebKit bug 231953 (sticky in scroll containers on iOS): https://bugs.webkit.org/show_bug.cgi?id=231953

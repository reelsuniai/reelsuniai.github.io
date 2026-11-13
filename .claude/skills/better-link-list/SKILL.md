---
name: better-link-list
description: Build a self-hosted, single-file link-in-bio page — a Linktree replacement the user owns outright, with their own branding, no subscription, no third-party script. Use this whenever someone wants a links page, a bio link, a "link in bio", a landing page for their social profiles, a Linktree/Beacons/Stan.store alternative, or a single page collecting their links together; also use it when they want to restyle, add links to, or add widgets to a page built this way. Runs a short interview first, matches a visual style from reference images the user supplies, then helps them host it.
---

# Link-in-bio page

Build one HTML file that holds a person's links, styled to look like *them* rather
than like a template. No build step, no framework, no npm, no external requests.
They own the file and can host it anywhere.

The whole thing is driven by a single `CONFIG` object at the top of the file. That
constraint is the point: the person you hand this to is usually not a developer, and
they need to be able to change every link, label and colour by editing one object
without touching rendering code.

## Start with the interview — then stop

Ask these three things and **wait for the reply before writing any code**. Building
before you know what they want wastes their time and yours, and a links page is
almost entirely a design problem.

1. **Their links** — raw, one per line, in display order. Offer the convention:
   `https://example.com/shop → Shop the Collection` to override the button label.
2. **Visual references** — screenshots or descriptions of the look they want. Say
   explicitly that the reference does *not* have to be another links page: a poster,
   an album cover, an app screen, a book jacket all work, and often work better. If
   they'd rather describe than show, prompt for the axes that matter: light or dark,
   sharp or soft corners, dense or airy, loud or restrained, any colours they're
   committed to.
3. **Header info** — display name or handle, a profile photo, and an optional
   one-line bio.

If they leave one out, ask once, then proceed with a sensible default and tell them
what you defaulted to. Don't stall the build on a missing bio.

Mention at this point that they can also ask for embedded media and small widgets —
most people don't know that's on the table. See `references/customizing.md`.

## Then state the design direction before building

Write 3–4 sentences naming the actual decisions you're taking from their references:
type treatment, spacing, button shape, shadow style, colour relationships, contrast
level. Then build — you don't need to wait for approval, but this gives them a cheap
place to redirect you before you've written 600 lines.

Pull *specific* decisions, not vibes. "Warm dark glass" is a vibe. "Cream buttons
with a hard zero-blur offset shadow in a darker shade of the background" is a
decision you can implement and they can veto.

The trap to avoid: defaulting to a centered column of rounded grey pills. That is
what every links page already looks like. If their reference is a riso print, the
page should look printed. If it's a Swiss poster, it should be typographic and
gridded. Restyle the template rather than recolouring it.

## Build

Start from `assets/template.html`. It is a working page with the architecture
already right — CONFIG, renderer, accessibility, meta tags, theming, motion. Copy it
to the user's chosen location and restyle it to their references.

Read `references/customizing.md` before styling. It covers the effect techniques
(metaball shapes, hard offset shadows, paper grain, glass, sprite animation,
tickers, device tilt), how to embed media, and how to add widgets — with the
gotchas that cost real debugging time.

Non-negotiables, because they're what makes the file worth owning:

- **One file.** All CSS and JS inline. Images inlined as data URIs.
- **Everything reads from CONFIG.** If they have to edit a template literal to
  change a label, you've failed the brief.
- **Theme through CSS custom properties**, at minimum `--bg`, `--fg`, `--btn-bg`,
  `--btn-fg`, `--btn-radius`, `--font-display`, `--font-body`.
- **Mobile first.** Design at 375px. Tap targets 44px minimum.
- **Real `<a>` elements**, semantic HTML, visible focus states, alt text.
- **Include**: inline SVG favicon as a data URI, Open Graph and Twitter card meta,
  a page title, `prefers-color-scheme` support, lazy-loaded avatar.
- **Outbound links**: `target="_blank"`, `rel="noopener noreferrer"`, and append
  `?utm_source=bio` so clicks show up in each destination's own analytics.
- **No localStorage, no cookies, no tracking scripts** — nothing that would need a
  consent banner.
- **Under 100KB** excluding the avatar. Images are what blow this; see the
  compression notes in `references/customizing.md`.
- **System font stack** unless the references genuinely demand otherwise. You cannot
  load a web font without an external request, so period or display looks have to
  come from the serif/sans stacks already on the machine plus letterspacing and
  scale. Say so rather than silently missing the reference.

## Verify before you claim it works

Open the file and look at it at 375px. Then check the things that are invisible in a
screenshot:

- Every href resolves with `utm_source` appended, and existing query strings survive
  (a `?` already in the URL means you append with `&`).
- Tap targets measure ≥44px.
- No console errors, and no horizontal scroll.
- Light and dark both render.

State what you verified. If something is untestable in your environment — device
tilt has no sensor, a gyroscope needs HTTPS — say that plainly instead of implying
you checked it.

## Iterate

Expect several rounds. Show the result, take the correction, apply it. Two habits
matter here:

**Diagnose before tuning.** When something looks wrong, find out why before nudging
numbers. Several of the fixes in `references/customizing.md` exist because a value
looked like a taste problem and was actually a broken mechanism — an animation the
browser refused to interpolate, an event listener catching bubbled events from a
child, a filter clipping its own output.

**Version before big pivots.** When they say "make another version", copy the
current file to `v1-index.html`, `v2-index.html` and keep working in `index.html`.
Confirm the copies are byte-identical. People change their minds and having the
earlier direction intact is worth the twenty seconds.

## Finish by getting it online

A file on their desktop isn't a link in bio. Once they approve the design, ask what
they already have — a website, a domain, a host — and recommend the path that fits.
Most people already have a site, and the right answer is usually a page on it rather
than a new service. Read `references/hosting.md` for the options and the tradeoffs,
including how to give it a clean URL and what to do about the social preview image.

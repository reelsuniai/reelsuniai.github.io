# Better Link List

Build your own link-in-bio page — a Linktree replacement you actually own.

One HTML file. Your branding, not a template's. No subscription, no account, no
third-party scripts, no cookie banner. Host it anywhere, including as a page on a
website you already have.

---

## Install it

**Easiest:** drag `Better Link List.skill` into a Claude conversation. A **Save
skill** button appears on the file card — click it and it installs into your profile.

**Or:** if you've got this as a folder, point Claude at it and say *"Read SKILL.md in
this folder and follow it."* Works exactly the same.

---

## Then use it

Start a conversation and say:

> Help me build a link in bio page

It asks three things and waits:

1. **Your links** — pasted raw, one per line, in the order you want them. Add
   `→ Custom Button Text` after a link if you want the label to differ.
2. **A visual reference** — a screenshot of any look you like. It does *not* have to
   be another links page. A poster, an album cover, an app screen, a book cover all
   work, and honestly work better. No screenshot? Just describe it.
3. **Your header** — your name or handle, a profile photo, and a one-line bio.

Then it tells you the design direction it's taking in a few lines — so you can
redirect it before it writes anything — builds the page, and iterates with you until
you're happy. At the end it helps you get it online.

---

## What's in this folder

| | |
|---|---|
| `SKILL.md` | The instructions Claude follows. |
| `example.html` | A finished page — double-click it to see what you get. |
| `assets/template.html` | The starting point Claude builds from. |
| `references/` | Style techniques, embeds and widgets, hosting guidance. |

---

## Things you can ask for that aren't obvious

Most people ask for a links page and stop there. You can also ask for:

- **A specific look**, by sending a reference image. This is the single biggest
  lever. "Make it look like this record sleeve" gets you somewhere real.
- **Embedded media** — a YouTube video with its thumbnail, a Spotify album, a
  SoundCloud track, a Bandcamp release, a Vimeo film, an Apple Music playlist, a
  Twitch channel, a Substack signup, a Calendly booker, a Google Map, a Typeform.
- **A featured link** that visually outranks the rest, for whatever you most want
  clicked.
- **Live widgets** — local times across cities, a weather strip, a countdown to a
  launch or a tour date.
- **Motion** — cards that drift, a character or sprite that crosses the screen, a
  background that reacts to how the phone is tilted.
- **Several versions**, kept side by side, so you can compare directions rather than
  losing the last one.

---

## Editing it afterwards

Open the file in any text editor. Everything you'd want to change — links, labels,
colours, fonts, your name, your photo — lives in one `CONFIG` block at the very top,
clearly marked. Nothing below it needs touching.

Change a link, save, re-upload the file. That's the whole workflow.

---

## Hosting

The skill walks you through this at the end, and asks what you already have first.
The short version:

- **Already have a website?** Usually the best answer is a page on it —
  `yoursite.com/links`. Costs nothing and reuses a domain people already trust.
- **On Squarespace, Wix or Shopify?** Host the file free elsewhere and point a
  subdomain at it — `links.yoursite.com` — rather than fighting the platform.
- **Have nothing yet?** Drag the folder onto **app.netlify.com/drop**. It's live in
  seconds, free, and needs no account to start.

---

## How the click tracking works

Every outbound link gets `?utm_source=bio` added automatically. That means clicks
show up in the destination's own analytics — your shop dashboard, YouTube Studio,
your newsletter platform — with no tracker on the page and nothing to disclose to
visitors.

---

## What it won't do

It builds a static page. There's no click dashboard, no A/B testing, no email
capture built in, and no CMS. If you need those, a hosted product is a better fit.
What you get instead is a file you own outright that will still work in ten years.

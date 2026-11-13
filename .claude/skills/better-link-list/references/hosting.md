# Getting it online

A file on someone's desktop isn't a link in bio. This step is where the project
actually pays off, so don't treat it as an afterthought.

## Ask first, recommend second

Open with: **"What do you already have — a website, a domain, a host?"**

Most people already have a website, and the right answer is almost always *a page on
the site they already own* rather than signing up for something new. It costs
nothing, it reuses a domain their audience already trusts, and there's no extra
account to maintain. Only reach for a new host if they genuinely have nothing.

Follow up with: do they want it at a **path** (`theirsite.com/links`) or a
**subdomain** (`links.theirsite.com`)? A path is simpler and needs no DNS. A
subdomain is easier to say out loud and can be hosted somewhere completely separate
from the main site, which matters if the main site is on a locked-down platform.

---

## They already have a website

### Static site or a repo they deploy (Netlify, Vercel, Cloudflare Pages, GitHub Pages, S3)

The easy case. Drop the file into the published directory and it's live.

- Put it at `links/index.html` rather than `links.html` — that gives the clean URL
  `theirsite.com/links` with no extension.
- Commit, push, done. It's one static file with no build step, so nothing in their
  pipeline needs to change.

### WordPress

Three options, roughly in order of how well they hold up:

1. **Upload the file directly.** Put `index.html` in a `links/` folder at the web
   root via SFTP or the host's file manager. Lives at `/links/`, completely bypasses
   WordPress, and no plugin or theme update can break it. This is the one to
   recommend.
2. **A page template.** Add a custom page template to the theme and paste the markup
   in. Survives as long as the theme does; a theme update or switch loses it.
3. **A "custom HTML" block inside a page.** Easiest, worst result — the theme's own
   CSS, header, and footer will fight the page's styling.

Don't upload it to the Media Library. Most hosts serve those files with headers that
either force a download or block the HTML from rendering.

### Squarespace, Wix, Webflow, Shopify

These platforms limit raw HTML to varying degrees, and a full-page takeover usually
isn't possible on the cheaper plans. Two workable routes:

- **A subdomain pointed elsewhere.** Host the file free on Cloudflare Pages, Netlify
  or GitHub Pages, then add a CNAME record so `links.theirsite.com` resolves there.
  The main site stays untouched. This is usually the best answer for these
  platforms.
- **Code injection / an embed block**, where the plan allows it. Workable, but the
  platform's own wrapper markup and CSS will be around your page and you'll spend
  time fighting it.

Shopify specifically: a custom `page.links.liquid` template in the theme works, and
`theirsite.com/pages/links` is a reasonable URL.

### Carrd, Framer, Notion, etc.

If the whole site is on a page builder, don't fight it — use the subdomain route
above.

---

## They have nothing yet

Ranked by how little there is to learn:

1. **Netlify Drop** (`app.netlify.com/drop`) — drag the folder onto the page, it's
   live in seconds on a `*.netlify.app` URL. No account needed to start, no CLI, no
   git. Best possible first step for a non-technical person. A custom domain can be
   attached later.
2. **Cloudflare Pages** — same idea, generous free tier, excellent performance, easy
   custom domains.
3. **GitHub Pages** — free and durable, and good if they might want version history,
   but it means learning repositories. Push `index.html` to a repo, enable Pages in
   settings, optionally add a `CNAME` file for a custom domain.

All three give free HTTPS, which matters — see the checklist below.

If they don't own a domain and want one, any registrar is fine; the page will work
on the free subdomain until they decide.

---

## After it's live — the checklist

Walk through these with them. The first two are the ones everybody forgets, and
they're the ones people notice.

- [ ] **Fill in `og:url` and `og:image`** in CONFIG *and* the static `<meta>` tags.
      Both need absolute `https://` URLs — relative paths do not work for link
      previews. Until these are set, sharing the link produces a bare, image-less
      preview.
- [ ] **Make an OG image.** 1200×630, with the name legible at thumbnail size. A
      screenshot of the page itself works well. Host it next to the page and point
      `og:image` at it.
- [ ] **Test the preview** by pasting the URL into a DM to themselves, or with
      opengraph.xyz. Platforms cache aggressively — if it looks wrong after a fix,
      the cache is usually why, and Facebook's Sharing Debugger and LinkedIn's Post
      Inspector both have a re-scrape button.
- [ ] **Confirm HTTPS.** Required for any device-motion features, and expected by
      every social platform.
- [ ] **Open it on an actual phone**, not just a narrow browser window. Check the
      tap targets and that nothing overflows sideways.
- [ ] **Check the links go where they should**, with the `utm_source` intact.
- [ ] **Put the URL in their bios** — Instagram, TikTok, YouTube, X, email signature.
- [ ] **Show them how to edit it.** Open the file, point at the CONFIG block, and
      explain that links, labels and colours all live in that one object and nothing
      below it needs touching. Then explain how to re-upload — for most of the hosts
      above that's replacing one file.

## Where to check the clicks

Because every outbound link carries `?utm_source=bio`, traffic shows up in the
*destination's* own analytics — their Shopify dashboard, YouTube Studio, their
newsletter platform — with no tracker on the page itself and nothing to disclose.
Tell them where to look, because the value of that decision isn't obvious until
someone points at the report.

If they later want counts for the page itself, a privacy-preserving, cookieless
analytics service is the option that doesn't reintroduce a consent banner. Mention
it only if they ask — the default should stay clean.

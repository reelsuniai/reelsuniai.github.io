# Customising the page

Read this before styling. It covers how to turn a reference image into decisions,
the effect techniques worth knowing, how to put media and widgets on the page, and
the bugs that cost real debugging time when building pages like this.

## Contents

1. [Working from a reference image](#1-working-from-a-reference-image)
2. [Suggesting options to the user](#2-suggesting-options-to-the-user)
3. [Effect cookbook](#3-effect-cookbook)
4. [Embedding media](#4-embedding-media)
5. [Small widgets](#5-small-widgets)
6. [Images and the size budget](#6-images-and-the-size-budget)
7. [Gotchas that will cost you an hour](#7-gotchas-that-will-cost-you-an-hour)

---

## 1. Working from a reference image

The reference is usually not a links page. That's good — a poster, a record sleeve,
a game UI, a vintage advert all carry a stronger design language than another
Linktree does. Your job is to extract the language, not to copy the artefact.

Look for these specifically, because they're what actually transfers:

- **Palette**, including how many colours and how they're weighted. Most good
  references use one dominant field, one paper/neutral, one ink, and one or two
  accents used sparingly. Copy the *proportions*, not just the hex values.
- **Edge treatment.** Hard outline? No outline? How thick relative to the shape?
- **Shadow.** This is the single most identity-carrying detail. A zero-blur offset
  shadow reads as screenprint. A large soft shadow reads as modern app. No shadow
  at all reads as Swiss/editorial.
- **Corner geometry.** Sharp, uniformly rounded, pill, or irregular.
- **Type.** Serif or sans, tight or letterspaced, uppercase or mixed, and the size
  jump between the name and everything else.
- **Texture.** Grain, halftone, paper, noise. If the reference is a print and you
  render it clean, it will look like a flat vector imitation of a print. Grain is
  often the single change that makes it read correctly.
- **Density.** How much empty space, and where.

Then say those decisions out loud to the user before building. Naming them is what
lets them redirect you cheaply.

**Colour-sample properly.** If they give you a logo or image and you want its exact
colour, don't eyeball it from the rendered view. Resize to a tiny image and read the
pixels, or crop a flat region and inspect it:

```bash
sips -s format png -Z 20 logo.jpg --out /tmp/s.png   # then read pixel values
```

---

## 2. Suggesting options to the user

Most people don't know what's possible, so they ask for a links page and stop there.
Offer a short menu once the basics are agreed — concrete, not abstract:

- **A style reference.** "Send me a screenshot of any look you like — an album
  cover, a poster, an app screen. It doesn't have to be a links page."
- **Embedded media.** A YouTube video with its thumbnail, a Spotify album, a
  SoundCloud track, a Bandcamp release, a Vimeo film, an Apple Music playlist, a
  Twitch channel, a Substack signup, a Calendly booker, a Google Map, a Typeform.
- **A featured link** that visually outranks the others, for whatever they most
  want clicked.
- **Small live widgets** — local times across cities, a weather strip, a countdown
  to a launch or tour date, a "currently reading/listening" line.
- **Motion** — cards that drift, a mascot or sprite that crosses the screen, a
  background that reacts to how the phone is tilted.
- **A dark-mode variant**, or a deliberate refusal of one.

Then build only what they pick. A page with every one of these on it is worse than a
page with two.

---

## 3. Effect cookbook

### Hard offset shadow (screenprint / sticker)

Zero blur is what makes it read as print rather than as a drop shadow.

```css
box-shadow: 6px 8px 0 var(--ink);
```

If the shape is irregular — pseudo-element lobes, a cut-out silhouette —
`box-shadow` won't work, because it traces the rectangular border box and will cut
straight across your bumps. Use a filter instead, which traces the composite alpha
of the element *and its children*:

```css
filter: drop-shadow(6px 8px 0 var(--ink));
```

### Organic shapes (clouds, blobs, liquid)

Build the shape from a body plus circular lobes thrown by `box-shadow` with negative
spread — one pseudo-element becomes many bumps, each with its own size:

```css
.shape::before {
  content: ""; position: absolute; left: 30px; top: -6px;
  width: 42px; height: 42px; border-radius: 50%; background: var(--cloud);
  box-shadow:  72px -6px 0 4px var(--cloud),      /* bigger  */
              146px  0   0 1px var(--cloud);      /* smaller */
}
```

Overlapping circles still *look* like overlapping circles, because you can see every
intersection. To fuse them with the concave fillets that make a shape read as
organic, blur then hard-threshold the alpha channel with an inline SVG filter:

```html
<svg width="0" height="0" style="position:absolute">
  <filter id="goo" x="-35%" y="-120%" width="190%" height="360%"
          color-interpolation-filters="sRGB">
    <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="soft"/>
    <feColorMatrix in="soft" type="matrix"
      values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9"/>
  </filter>
</svg>
```

Three things about this that are easy to get wrong:

- **The filter region must be declared generously.** It defaults to roughly the
  bounding box, so lobes poking above the element and the drop-shadow below it get
  clipped off. Set `x/y/width/height` on the filter to cover the real extent.
- **Apply it to a shape layer, not the element with text in it.** A filter applies
  to the whole subtree, so gooing the button smears the label along with the lobes.
  Put the silhouette in an absolutely-positioned child at `z-index: -1` and leave
  the content unfiltered.
- **Chain the shadow after it**: `filter: url(#goo) drop-shadow(...)`. The shadow
  then traces the *fused* shape.

To add an even outline around that fused silhouette — which no border can follow —
dilate it, flood the dilated copy with ink, and put the original back on top:

```html
<feMorphology in="goo" operator="dilate" radius="4" result="fat"/>
<feFlood id="ink" result="colour"/>            <!-- flood-color set from CSS -->
<feComposite in="colour" in2="fat" operator="in" result="stroke"/>
<feMerge><feMergeNode in="stroke"/><feMergeNode in="goo"/></feMerge>
```

Set the colour from CSS so it follows the theme: `#ink { flood-color: var(--ink); }`

### Paper grain

The thing that makes a print look printed. Generate it inline — no image needed —
and lay it over everything including the type, as ink on paper would be:

```css
body::after {
  content: ""; position: fixed; inset: 0; z-index: 9; pointer-events: none;
  opacity: .16;
  mix-blend-mode: multiply;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.62' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E");
}
```

### Glass

```css
.card {
  background: linear-gradient(180deg, rgba(255,255,255,.14), rgba(255,255,255,.06));
  border: 1px solid rgba(255,255,255,.14);
  -webkit-backdrop-filter: blur(26px) saturate(180%);
  backdrop-filter: blur(26px) saturate(180%);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.3), 0 14px 40px rgba(0,0,0,.5);
}
```

Glass only reads as glass if there's something behind it worth refracting. Pair it
with a moving or gradient background, and give each card a soft coloured halo
underneath (a blurred pseudo-element at `z-index: -1`) so light appears to pool
under it.

### Drifting background blobs

Large circles on two depth planes, drifting on different clocks. Size them in
**`vmin`, not `vmax`** — on a phone `vmax` is the *height*, and every blob will
swallow the screen.

If you want them to fuse, the blur-plus-contrast trick works, but note that
`contrast()` bleaches colour on a light background: it pushes pale values toward
white. Make the filter theme-aware — high contrast on dark, low on light — or the
same code that looks rich in dark mode will look washed out in light.

### Sprite animation

Two frames, cross-cut by a square wave. `steps(1)` keeps the swap instant instead of
cross-fading:

```css
.sprite__f { position: absolute; inset: 0;
             animation: flicker .26s steps(1, end) infinite; }
.sprite__f--b { animation-delay: -.13s; }      /* half a cycle out of phase */
@keyframes flicker { 0%, 100% { opacity: 1 } 50% { opacity: 0 } }
```

For something crossing the screen, bake the *wait* into the keyframes — reach the
far edge partway through and hold — so one infinite animation gives you crossings
with gaps between them:

```css
@keyframes fly {
  0%   { transform: translateX(-100px); }   /* just off the left edge */
  55%  { transform: translateX(132vw); }
  100% { transform: translateX(132vw); }    /* the pause */
}
```

Start at `-100px` rather than `-30vw` if you want it visible shortly after load, and
put it in a `position: fixed; overflow: hidden` lane so it can't register as
document width while it's off-screen.

### Ticker / marquee

Duplicate the content, travel exactly `-50%`, and it lands on an identical frame:

```css
.ticker { width: 128px; overflow: hidden;
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 14%, #000 86%, transparent);
                  mask-image: linear-gradient(90deg, transparent, #000 14%, #000 86%, transparent); }
.ticker__track { display: flex; width: max-content;
                 animation: ticker 18s linear infinite; }
@keyframes ticker { from { transform: translateX(0) } to { transform: translateX(-50%) } }
```

Mask the edges or entries pop in and out at the border. Under
`prefers-reduced-motion`, let the panel size to its content and show the row static
rather than freezing it mid-scroll with half a word visible.

### Device tilt / parallax

Bind **both** the gyroscope and the pointer rather than picking one from a media
query — a phone never fires mouse `pointermove`, a desktop never fires a usable
`deviceorientation`, so each is ignored where it doesn't apply, and you avoid the
class of bug where the branch chosen at load doesn't match reality.

```js
const MAX = 34, EASE = 0.075, BETA_REST = 45;   // how you actually hold a phone
function loop() {                                // ease toward the target;
  cur += (target - cur) * EASE;                  // raw sensor values are jittery
  root.style.setProperty("--tilt-x", cur.toFixed(2) + "px");
  requestAnimationFrame(loop);
}
```

Two constraints worth telling the user about up front:

- **iOS gates the gyroscope behind a user gesture** — you must call
  `DeviceOrientationEvent.requestPermission()` from a tap, so the page needs a small
  "enable motion" control that appears only on devices that require it.
- **It needs a secure context.** Tilt will not work from a `file://` link or plain
  HTTP, only over HTTPS.

Park the animation loop on `visibilitychange` so it isn't running against a tab
nobody is looking at.

### Drifting cards

Give each card its own amplitude, period, and a **negative** delay so they're
already out of phase on the first frame instead of bobbing in unison. Trace a slow
ellipse rather than a straight bob — a little sway and roll is the difference
between "buoyant" and "throbbing". Keep the vertical amplitude under half the stack
gap so neighbours never collide.

Put the drift on the wrapping `<li>`, not the card. The card's own `transform` is
already carrying the intro, the hover lift and the press, and a second animation on
the same property replaces rather than adds.

---

## 4. Embedding media

There are two genuinely different approaches and the difference matters:

### A. Thumbnail that links out — default, keeps the page self-contained

Inline the artwork as a data URI and link to the destination. No third-party code,
no cookies, no consent banner, and the page still works offline. This is what the
`type: "video"` tile in the template does.

For YouTube, both pieces are fetchable without an API key:

```bash
# title and channel
curl -s "https://www.youtube.com/oembed?url=https%3A//www.youtube.com/watch%3Fv%3DID&format=json"
# thumbnail (hqdefault is 480×360 with letterbox bars; crop to 16:9)
curl -s -o t.jpg "https://i.ytimg.com/vi/ID/hqdefault.jpg"
sips -c 270 480 t.jpg                                  # centre-crop to 16:9
sips -s format jpeg -s formatOptions 40 -Z 400 t.jpg --out final.jpg
```

Vimeo has an equivalent: `https://vimeo.com/api/oembed.json?url=…`

### B. A real embed — an iframe with a working player

Use this when the point is to *play* the thing on the page. Be straight with the
user about the tradeoff: it pulls in third-party code, it usually sets cookies, it
slows the page, and it breaks the "no external requests" property. That's often a
fine trade for a music page. It is not a fine trade if they wanted a page with no
consent-banner obligations.

If they choose embeds, prefer privacy-preserving variants where they exist
(`youtube-nocookie.com`), always set `loading="lazy"`, give the iframe a `title`,
and wrap it in an aspect-ratio box so it doesn't jump the layout:

```css
.embed { position: relative; aspect-ratio: 16 / 9; }
.embed iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }
```

Common embed sources and their shapes:

| Service | Embed URL pattern | Aspect |
|---|---|---|
| YouTube | `youtube-nocookie.com/embed/ID` | 16:9 |
| Vimeo | `player.vimeo.com/video/ID` | 16:9 |
| Spotify | `open.spotify.com/embed/track\|album\|playlist/ID` | fixed height 152/352 |
| SoundCloud | `w.soundcloud.com/player/?url=…` | fixed height 166 |
| Bandcamp | `bandcamp.com/EmbeddedPlayer/album=ID/` | fixed, square-ish |
| Apple Music | `embed.music.apple.com/…` | fixed height 175/450 |
| Twitch | `player.twitch.tv/?channel=NAME&parent=YOURDOMAIN` | 16:9 |
| Calendly | `calendly.com/USER/EVENT` | tall, ~700px |
| Substack | `SUB.substack.com/embed` | ~320×150 |
| Typeform | `form.typeform.com/to/ID` | tall |
| Google Maps | Maps → Share → Embed a map | 4:3 |

Twitch requires the `parent` parameter to match the hosting domain, so it can't be
tested from `file://` — flag that rather than letting them discover it after
deploying.

---

## 5. Small widgets

### Local times across cities

`Intl` does the timezone maths natively, so there is nothing to fetch and no
library. Build each formatter once up front — a bad zone name throws, and you don't
want that firing on every tick:

```js
const fmt = new Intl.DateTimeFormat(undefined, {
  timeZone: "America/Los_Angeles", hour: "numeric", minute: "2-digit"
});
```

Passing `undefined` as the locale means formatting follows the *viewer's* locale, so
a UK visitor sees 24-hour and a US visitor sees am/pm. That's usually what you want.

### Weather

Open-Meteo needs no key and no account and sends `Access-Control-Allow-Origin: *`,
so it works straight from the browser:

```
https://api.open-meteo.com/v1/forecast?latitude=LAT&longitude=LON
  &daily=weather_code,temperature_2m_max,temperature_2m_min
  &timezone=auto&forecast_days=5
```

Hard-code the coordinates in CONFIG rather than asking for the visitor's location —
the page is about the *owner's* city, and geolocation would need a permission
prompt. Handle failure by saying so, not by showing stale numbers: a forecast that
lies is worse than no forecast. Note in your summary that this is the one thing on
the page touching the network.

The response codes are WMO codes; group them (0 clear, 1–2 partly cloudy, 3
overcast, 45/48 fog, 51–57 drizzle, 61–67 rain, 71–77 snow, 80–82 showers, 95+
thunderstorm) rather than mapping all of them.

### Countdown

`setInterval` at 1s, and compute from a fixed ISO timestamp with an explicit
timezone offset so it means the same thing everywhere.

---

## 6. Images and the size budget

Base64 inflates by ~33%, so a 30KB image costs 40KB of file. Budget accordingly and
size images to their rendered size, not their source size.

```bash
sips -Z 276 in.jpg --out out.jpg                       # longest edge to 276px
sips -c 270 480 in.jpg                                 # centre-crop to 16:9
sips -s format jpeg -s formatOptions 40 in.jpg --out out.jpg   # quality 0–100
```

`sips` has no WebP output on many macOS builds and there's often no `pngquant` or
PIL available. For flat-colour PNG art (sprites, logos, illustrations) you can get a
2–3× reduction with a small re-encoder: posterise the colour to a coarse grid, then
pick the best of the five PNG row filters per scanline before deflating. Flat art
loses nothing visible and the entropy drop is large — this took two sprite frames
from 15KB each to 5.5KB each on a real build.

Check the split when you're near the limit:

```bash
python3 -c "
import re,sys
s=open('index.html',encoding='utf-8').read()
imgs=re.findall(r'data:image/[a-z]+;base64,[A-Za-z0-9+/=]+',s)
print('total',len(s.encode()),'images',sum(map(len,imgs)),'code',len(s.encode())-sum(map(len,imgs)))"
```

---

## 7. Gotchas that will cost you an hour

Each of these looked like a styling problem and was actually a broken mechanism.
When something looks wrong, check the mechanism before you start nudging numbers.

**A `filter` list containing `url()` cannot be interpolated.** If you animate
`filter` and the chain includes an SVG filter reference, the browser gives up and
animates it *discretely* — it snaps at the midpoint instead of easing, which reads
as a flicker. Animate `opacity` or `transform` on a separate layer instead.

**`animationiteration` bubbles.** If a child element has its own looping animation,
its iteration events arrive at the parent's listener. A "reroute on each crossing"
handler on a container with an animated sprite inside will fire several times a
second. Filter on `e.target` and `e.animationName`.

**Changing `animation-duration` does not rewind the animation.** The browser re-maps
already-elapsed time against the new duration, which can drop the element anywhere
in its cycle. If you need a new duration, restart the animation
(`animation: none` → force reflow → restore) at a moment when progress is zero.

**SVG filters clip to their region.** The default is roughly the bounding box, so
anything protruding — lobes, shadows, glows — is cut off. Declare `x`, `y`, `width`,
`height` on the `<filter>` generously.

**Equal specificity means source order decides.** `.thing--modifier` and `.thing`
are both one class. If your modifier rule sits above the base rule, the base wins.
This bites most often when a modifier is defined in a "components" section and the
base is redefined later in a "motion" section.

**`new Date("2026-08-07")` parses as UTC midnight**, which renders as the previous
day anywhere west of Greenwich. Split the string and build a local date instead.

**A `position: fixed` element extending past the viewport** can make
`documentElement.scrollWidth` exceed `clientWidth` even with `body { overflow-x:
hidden }`. Before chasing it, check whether a horizontal scrollbar actually exists —
try setting `scrollLeft` and see if it moves. A `clientWidth`/`innerWidth` gap is
usually just the *vertical* scrollbar gutter, and fixed elements correctly size to
the containing block including it.

**`vmax` on a phone is the height.** A blob sized `50vmax` is half the screen's
*long* edge. Use `vmin` for anything meant to be a fraction of the visible width.

**Lobes and outlines need gutter.** If shapes protrude past their box, the page
padding has to clear protrusion + outline + shadow, or they get sliced at the screen
edge. Same for the vertical stack gap.

**When you edit by string replacement, anchor on something unique.** Comment banners
get reused between the CONFIG block and the CSS block, and a `s.index()` on a
repeated heading will match the wrong one and delete everything in between. Anchor
on a string you know appears once, or cut by explicit index and verify.

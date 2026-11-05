# STYLE BIBLE: "explainer-cartoon" Shorts style (from 3 references)

Measured from `ref1.mov`, `ref2.mov` and `ref3.mov` (all 720×1280). Every pixel value below is given at **720×1280** with the
**1080×1920** value (×1.5) in brackets. Percentages are of frame width (W) or frame height (H).
Sources: `sheets/*_sheet_0.25s.jpg` (4 fps contact sheets), `analysis/strip_*.jpg` (30 fps strips),
`analysis/*_audio.json` (beats, onsets, band energy, word timings), `../review/compare_*.jpg`.

We copy the **style only**: no words, script, character, logos, watermark (`@ADILET.FNDR`) or channel name from the references.

---

## 1. Format

| | ref1 | ref2 | ref3 | Our target |
|---|---|---|---|---|
| Resolution | 720×1280 | 720×1280 | 720×1280 | **1080×1920** |
| fps | 30 | 30 (VFR avg 30.03) | 30 (VFR avg 30.02) | **30 CFR** |
| Length | 14.36 s | 15.42 s | 13.79 s | **13–16 s** (ends 0.1–0.3 s after the last word) |
| Video | HEVC, ~16 Mb/s | same | same | H.264 high, CRF 16 |
| Audio | AAC 44.1 kHz stereo, 114 kb/s | same | same | AAC 48 kHz stereo, 192 kb/s |
| Loudness | −14.2 LUFS, LRA 0.7, peak −4.0 dBFS | −14.2 LUFS, LRA 1.6, peak −3.3 | −13.9 LUFS, LRA 2.3, peak −3.5 | **−14 LUFS, true peak ≤ −1.5 dBFS** |
| Hard cuts (scene > 0.3) | **0** | **0** | **0** | **0**: everything is one continuous canvas |

**Safe margins:** left text margin **x = 89 px = 12.4 % W** [134 px]; right margin mirrored at x = 631 px (87.6 % W) [946].
Top label at y = 94 px (7.3 % H) [141]. Nothing important below y = 1180 (92 % H) except the presenter.

**Screen zones** (fixed in every frame):

| Zone | y range (720×1280) | % H | Content |
|---|---|---|---|
| Chapter label | 85–105 | 6.6–8.2 % | `// 0N · topic` left, counter right |
| Caption block | 175–330 | 13.7–25.8 % | 1–3 lines, left-aligned |
| Stage | 340–860 | 26.5–67 % | cards, UI windows, objects, numbers |
| Presenter | 880–1280 | 69–100 % (x > 55 % W) | cartoon presenter, bottom-right, cropped at the bottom edge |

---

## 2. Background

| Property | Value |
|---|---|
| Base colour | **#F2F0EE** (sampled range #EEECEA–#F5F3F1) |
| Texture | fine **dot grid / paper grain**: ±4 luminance (236–248 on 0–255), about a 4 px [6 px] pitch, static (does not move) |
| Gradient | none (flat), **no vignette** |
| Alternate world | **cork board** (ref3 0–4.7 s): #805A35 / #745231, darker #20130B in the pin shadows, with pinned photos, sticky notes and red string. Used for the "hook / investigation" beat only. |
| Full-black moment | only inside the halftone wipe (section 8) |
| Motion | the background never moves; all motion is in the elements |

---

## 3. Typography

| Role | Closest Google Font | Size, 720 [1080] | % H | Weight | Colour | Notes |
|---|---|---|---|---|---|---|
| Caption body | **Schibsted Grotesk** (alt: Familjen Grotesk) | cap height 38 px → font size about **53 px [80]** | 4.1 % | 500–600 | **#111010** (sampled #100F12–#13110F) | geometric grotesk with a straight-tail "y"; tracking −1 %; no stroke, no shadow |
| Caption accent word | **Instrument Serif Italic** | about **58 px [87]** (1.1× body) | 4.5 % | 400 italic | **#DF4D31** (range #D66057–#E0402F) | 1–2 accent words per sentence (the key noun or verb) |
| Line height | | 62 px [93] | 4.8 % | | | 1.17 × font size |
| Chapter label | **JetBrains Mono** | about 15 px [22] | 1.2 % | 500 | **#8B8987** | text like `// 02 · five steps`, lowercase; right-side counter in CAPS, e.g. `AI SUBS 4` with the number in red |
| Stamp / headline | **Anton** (alt: Bebas Neue) | 40–120 px [60–180] | 3–9 % | 400 (condensed) | #111 for the line, **#D2232A**-ish red for the key word | UPPERCASE; the key word is about 2.2× the line height |
| UI text inside mocks | Inter | 11–20 px [16–30] | | 500–700 | per mock | real-app look |

**Alignment:** captions are always **left-aligned at x = 12.4 % W**. Maximum line width is about 470 px (65 % W) [705]. That's at most **3–4 words per
line** (about 22 characters) and **at most 3 lines**.

---

## 4. Caption system: a sentence that builds word by word, then clears

| Rule | Measured value |
|---|---|
| Words on screen | the **current sentence/phrase only**, building up word by word (1 → 10 words), wrapping onto up to 3 lines |
| Ghost preview | the **next word appears early as a ghost**: grey **#C9C6C3** (accent words light pink **#F2B4A8**), blur about 3 px, opacity 0.35. It shows **100–250 ms before** that word is spoken (ref2 2.75 s: "easy" ghosted while "so" is still being said) |
| Activation | ghost → solid over **3 frames (100 ms)**, ease-out; blur 3 px → 0. Solid by word onset + 30 ms (ref1 "subscription" strip: 0.000 ghost, 0.067 nearly solid, 0.100 solid) |
| Movement | **none**: no pop, no scale, no slide on caption words |
| Clearing | at each sentence or clause end, the whole block is **cut instantly** (1 frame) and the next phrase starts with a single word (ref1 1.75 s "until"; ref2 2.5 s "It's") |
| Active-word highlight | none: words simply stay solid after activation. Emphasis comes only from the red italic serif. |
| Sync tolerance | activation lands within ±1 frame of the forced-alignment onset |
| Punctuation | kept as spoken ("steps.", "browser.", "everything:") |

---

## 5. Text animations (all of them)

| # | Animation | Where | Frames (30 fps) | Easing | Values |
|---|---|---|---|---|---|
| T1 | Word ghost → solid | every caption word | ghost appears 3–7 f before onset; 3 f to solid | ease-out (cubic) | opacity 0.35 → 1, blur 3 → 0 px, colour grey → ink |
| T2 | Block clear | sentence end | 1 f | cut | everything at once |
| T3 | Stamp word-type | condensed headlines ("NOBODY SHOWS YOU") | 1 word per voice word; each word ghosts in grey for 2 f, then solid | step | no scale |
| T4 | Stamp slam (key word) | "HOW?" (ref3 4.48 s) | 2 f in, 2 f settle | back-out | scale 1.30 → 0.97 → 1.00; opacity 0.4 (pink) → 1; plus 6–8 red **radiating dashes** (4 px wide, 18–30 px long) at 3–5 px from the edge, flickering for 6 f; small shake ±3 px for 4 f |
| T5 | Big number badge pop | chapter start ("1", "2", "3") | 6 f | back-out, overshoot 6 % | scale 0.6 → 1.06 → 1.0, rotate −8° → 0°; thin red ring (2 px, about 150 px radius) expands and fades over 12 f |
| T6 | Counter text | "4 subs", "$10/mo", "2,396,809 views" | continuous | linear | numbers tick up (views counter climbs ~10/frame); `x subs` steps on the spoken word |
| T7 | Typewriter in UI | chat input ("make a reel about…"), URL bar | about 1 character per frame (30 cps), synced to speech | linear | text cursor blinks at 2 Hz |

---

## 6. Visual elements (the stage)

| Element | Shape and size, 720 [1080] | Style | Enter | Leave |
|---|---|---|---|---|
| **Light card** | 521×229 px [782×344] at x 89, radius **14 px** [21] | #FFFFFF fill, 1 px #E2DFDC border, **halftone-dot shadow** (dots 2 px, offset 8 px down-right) | slides up 40 px + fades in over **6 f**, slight motion blur; often **stacks** over the previous card (old card scales to 0.96, blurs and fades in 6 f) | fade + scale 0.96 over 6 f, or replaced by the next card stacking |
| **Dark UI window** | about 560×392 px [840×588], radius **12 px** [18] | #1C1B1F body, #2A2930 title bar 22 px with three grey dots, inner rows #2B2A2F; green check rows; red "missing" pill #E0362C | rises 30 px + fades over 6–8 f, subtle 1.00 → 1.02 push over the scene | morphs into the next state in place (same window, new content) |
| **Step badge** | 58 px square [87], radius 12 [18] | #141414 fill, white numeral (Anton/Inter Black), 5 progress dots underneath (red = done, grey = to do) | pop (T5) | stays top-right of the stage for the whole chapter |
| **Device mock** | phone 240×480 [360×720]; laptop 470×300 [705×450] | realistic render (bezel, Dock, wallpaper), halftone shadow | slides up + fades over 8 f | halftone wipe or crossfade |
| **Red marker ellipse** | about 210×380 px around the subject | **#E5352B**, 4 px [6], hand-drawn (open ends overlap about 20°) | **draws over 5–6 f (0.17–0.2 s)**, ease-in-out | stays 1–1.5 s, then fades over 4 f |
| **Red X / strike** | two 10 px [15] strokes | #E5352B, round caps; plus a round red badge with a white × (44 px) | strokes draw 4 f each | stays |
| **Red highlight box** | a 2 px [3] red rectangle around a UI row, radius 6 | #E5352B, often with a 10 % red fill | 3 f | moves to the next item on each spoken word |
| **Pills / chips** | height 24 px [36], fully round | red #E0362C with white text ("missing", "1 line", "Setup complete ✓") | pop (scale 0.7 → 1.05 → 1) in 5 f | fade |
| **Cursor** | macOS arrow, 22 px [33] | black with white outline, **motion trail** (3 ghost copies) | glides in 8–10 f, ease-in-out; click = 2 f scale 0.9 plus a ring | |
| **Illustrations** | flat black silhouettes with a red flag (mountain → steps chart) | #111, red #D2232A flags, white snow | morph between states in about 8 f | |
| **Presenter** | about 320×400 px [480×600] visible, bottom-right, cropped by the frame edge; halftone-dot shadow behind | 3D-cartoon person (theirs is a bearded man in a beanie: **we must use our own original presenter**) | always on screen; changes pose every **0.5–1.0 s** (point up, open palms, shrug, thumbs up), each pose change about 4 f | rides through the halftone wipe |
| **Watermark** | IG glyph 24 px + handle, right side at y ≈ 26 % H | 30–60 % opacity | moves to sit next to the current card | **ours: @shortsuni** |

**Corner radius family:** 12–14 px [18–21] for cards/windows, 6 px [9] for inner rows, fully round for pills.
**Shadow rule:** a halftone dot shadow, never a soft blur.

---

## 7. Camera and motion

| Property | Value |
|---|---|
| Camera moves | **no global camera**: no pans and no zooms of the whole frame. Elements move; the frame stays still. |
| Element push | the active stage element scales slowly, **1.00 → 1.03 over 1.5–2 s** |
| Shake | only on stamp slams: ±3 px, 4 f |
| Parallax | none (cork board photos drift ±4 px) |
| Something new on screen | **every 0.4–0.6 s** (each spoken key word changes the stage: a new chip, highlight, counter step or card) |
| Average "shot" (main stage element) | ref1: 8 shots / 14.4 s = **1.8 s**; ref2: 9 / 15.4 = **1.7 s**; ref3: 8 / 13.8 = **1.7 s** |
| Presenter | idle sway ±2 px at 1 Hz, plus a pose switch every 0.5–1.0 s |

---

## 8. Transitions

| Type | Duration | Where | Details |
|---|---|---|---|
| **Halftone dot wipe** | **0.75 s** (22 f): grow 4–5 f, black hold 3 f, reveal 8–10 f | once per video, at the first "step" chapter (ref2 4.80–5.25 s, ref3 8.95–9.40 s) | black dots on a 24 px [36] grid; the radius grows from 0 to full coverage starting at one corner/side; the new scene is revealed **radially from the centre** as the dots shrink; the step badge pops (T5) during the reveal |
| **Card stack / morph** | 6 f | most changes | the next card slides in over the old one; the old one shrinks to 0.96, blurs 4 px and fades |
| **In-place morph** | 6–8 f | the same UI window changing state | content crossfades and the window stays put |
| **Fly-in from the side** | 8 f | a new object (envelope, phone) | slides 120 px with motion blur and ease-out |
| **World swap** | 4 f crossfade | cork board → paper (ref3 4.7 s) | |
| Never used | — | | hard cuts, glitch, spin, 3D flips, whip pans |

---

## 9. Pacing timelines (second → screen → words → sound)

Words are summarised (not copied) as content beats. Sound = an onset not on a word (likely an SFX) from `analysis/*_audio.json`.

### ref1 (14.4 s, 8 shots)
| t (s) | On screen | Spoken beat | Sound |
|---|---|---|---|
| 0.0–0.6 | stop-hand icon slams over a "subscribe" card | hook: don't pay for another tool | voice from frame 0 |
| 0.6–2.6 | stacked card "your subscriptions: 4" with dark tiles; "4 subs already" + red italic 4 | "until you've seen this" | 1.23, 1.65, 1.81 pops (tiles appear) |
| 2.7–3.5 | empty browser window, URL types itself | names the product | 2.55 whoosh, 3.46 click |
| 3.5–4.9 | product site in the window, title circled in red | "by …" | 3.76 |
| 5.0–6.8 | grid of 6 model tiles pops in tile by tile | every model, one place | 5.53 |
| 6.8–8.0 | price line zoomed in, red "$10/mo" pill drops | price | 6.99, 7.11 |
| 8.3–12.8 | app UI; red box steps through the menu rows; names circled | feature 1 | 9.71, 9.85, 10.98, 11.63, 11.77, 12.45 |
| 12.9–14.4 | routing diagram: node splits to 3 options, one highlighted | why it works | 14.33 |

### ref2 (15.4 s, 9 shots)
| t (s) | On screen | Spoken beat | Sound |
|---|---|---|---|
| 0.0–1.1 | phone showing a reel + view counter ticking; fan of 3 phones | hook: "how to make videos like this" | voice from frame 0 |
| 1.1–1.6 | red marker ellipse draws around the phone | tool name | 1.11 marker swish |
| 1.7–2.5 | phone drops into a dark app window | | 1.97, 2.21 |
| 2.5–3.3 | black mountain + "HARD" flag | "it's so easy" | 2.90, 3.16, 3.30 |
| 3.3–4.6 | mountain morphs flat → 5-step bar chart, figure climbs, "EASY" flag | "only five steps" | 4.04, 4.39 |
| 4.8–5.25 | **halftone wipe** → badge "1" pops with red ring | "One." | 4.60 riser |
| 5.5–7.4 | folder flies in, cursor drags it into the app window | step 1 | 7.29 |
| 7.5–10.8 | badge "2"; checklist ticks; "Add your voice key" dialog; "Setup complete" pill | step 2 | 8.87, 9.96, 10.40, 10.59 |
| 10.9–15.4 | badge "3"; "1 line" pill; the prompt types itself in the input bar | step 3 | 12.84, 13.33, 14.72 |

### ref3 (13.8 s, 8 shots)
| t (s) | On screen | Spoken beat | Sound |
|---|---|---|---|
| 0.0–2.5 | **cork board** with pinned screenshots; magnifier moves; "AI?" sticky note | hook: everyone is doing X | voice from frame 0; 0.72, 1.28 |
| 2.5–3.0 | evidence tag with the tool name pinned | | |
| 3.0–4.7 | torn note drops; "NOBODY SHOWS YOU" types; **"HOW?" slams red** | the problem | 4.48 slam |
| 4.7–6.0 | world swaps to paper; sealed envelope with "HOW?", question marks | "I'll show you everything" | 6.04 burst |
| 6.0–7.5 | envelope bursts; 6 step cards fan out; "6 STEPS" stamp | the roadmap | 7.80 |
| 7.5–8.9 | phone with a sample reel; "LIKE THIS ONE" stamp, corners bracketed red | proof | 8.31 |
| 8.95–9.4 | **halftone wipe** → badge "1" | "First" | 9.29, 9.43 |
| 9.5–13.8 | app icon card; browser crossed out with a red X; laptop with the app; next badge "2" | step 1 details | 10.43, 11.63, 12.93, 13.14 |

---

## 10. Audio

| Property | Value |
|---|---|
| Voice | one male narrator, close-mic, dry (no audible reverb), energetic; **starts at 0.00 s**; **3.1–3.3 words/s (185–200 wpm)**; pauses between clauses 0.15–0.45 s (median 0.3 s) |
| Voice level | speech RMS −17 to −17.6 dBFS; integrated −14 LUFS for the whole mix |
| Music | **ref2 and ref3: no music bed** (the word gaps fall to −43/−44 dBFS, which is the noise floor). **ref1: a quiet bed** about 5 dB under the voice (gap RMS −21.8 dBFS vs speech −16.9). Beat trackers report 136/103/112 BPM, but those come from speech rhythm, not music. **Rule: voice + SFX; at most a very soft lo-fi/minimal bed at −22 dB under the voice.** |
| SFX palette | short, soft, UI-like: **pop/click** (card or tile appears, 40–80 ms), **swish** (marker draw, fly-in, 150–250 ms), **riser + thump** into the halftone wipe (riser 0.3 s → impact on the black hold), **stamp hit** (low thump + paper slap) on slams, **typing ticks** in the typewriter, **ding/chime** on "complete" pills |
| SFX timing | every SFX lands **on the visual event's first frame** (±1 f), and 12–17 SFX per 14 s (**about 1 per second**). SFX sit at about −8 dB under the voice and are never louder than speech. |

---

## 11. Hook structure (first 1.5 s)

| | Visual | Words |
|---|---|---|
| Frame 0 | **already full**: caption word 1 is solid at 0.00 s, and the stage holds a bold object (stop-hand sign / phone with a climbing view counter / cork board); the presenter is on screen | the voice starts at 0.00, no intro |
| 0–1.5 s | at least **2 visual changes** (ref1: stop slam → card stack; ref2: phones fan → red marker ellipse; ref3: magnifier pans → "AI?" note) | the first sentence is a **contrarian or curiosity claim** ("don't…", "how to… like this", "everyone's… but") ending in an open loop |
| Rule | the payoff object (the result, the number, the proof) is visible in the **first second** | |

---

## 12. What we will NOT copy (brand swap)

| Reference | Ours |
|---|---|
| bearded-beanie cartoon presenter | **our own original presenter** (decision needed, see the review notes) |
| `@ADILET.FNDR` watermark + IG glyph | `@shortsuni` + IG glyph |
| their accent red #DF4D31 | **@shortsuni red** (we'll lock the exact hex with you; the default is #E5352B, which sits in the same family) |
| their words, products, McDonald's/ChatLLM content | your script and your real screenshot `assets/ballblitz_analytics_card.png` (unaltered) |
| their voice, music, SFX files | local TTS voice; SFX synthesised locally |

---

## 13. Addendum: ref4 (66.6 s, 720×1280, 30 fps, −13.9 LUFS, peak 0.0 dBFS, 0 hard cuts)

**Density is the style.** A new illustrated object or state lands **every 0.5–1.0 s** (78 distinct stage states in 61 s of speech, which works out to **one every 0.78 s**). Each object is a small, detailed illustration with a story: a ring light labelled "face cam", a profile mock with a red ring on the follower count, a growth chart with a "YOU ARE HERE" pin, a crowd of about 200 tiny figures, a tear-off calendar, an hourglass of slots, stamped words ("VIRAL", "NEVER SHOWN", "WIDE OPEN", "HUGE REACH", "FIRST COME", "SLOP", "PASS", "MADE THIS WAY"), file folders, waveforms, chain links, a film strip with weak moments marked.

**Script structure (by second):**

| s | Beat | Device |
|---|---|---|
| 0–1.3 | **Contrarian hook**: "you don't need X to get Y" | the X object gets crossed out, then "VIRAL" stamp |
| 2–6.5 | **Personal proof** with hard numbers (followers, weeks) | a real-looking profile; marker ring on the number; "NEVER SHOWN" stamp |
| 7–21 | **Window / urgency**: early-market analogy, few creators now, it fills fast | chart + "YOU ARE HERE", crowd + "WIDE OPEN", fill bar "8/10", calendar "3 months later" |
| 22–24 | **Enemy**: everyone else's output is bad | grid of samey cards + "SLOP" stamp |
| 24–42 | **Mechanism**, listed fast (4–6 items) | each item is a labelled card stacking up; counters roll ("191 FILES") |
| 43–51 | **Ease**: drop it in, one line, it does everything | app window, typed one-liner, checklist ticking |
| 51–57 | **Autonomy + "no X, no Y, no Z"** | three cards crossed out one by one |
| 57–59 | **Proof wall**: every video was made this way | dense wall of thumbnails + stamp |
| 60–61 | **CTA keyword**: "comment WORD and I'll send you the link" | comment box types the word → red pill → "SENT" stamp → DM card |
| 61–66.6 | outro: dimmed frame + IG glyph | (4–5 s hold; not needed for Shorts) |

**Mascot:** in frame 100 % of the time, bottom-right, cropped at the bottom edge. It changes pose on almost every phrase (**about every 0.6 s**): point up, open palms, both hands out, shrug, hand on chin, facepalm, thumbs up, hands on head. Its mouth is animated with the voice, and it gets a halftone shadow. It occasionally reacts to the stage (looks at it, flinches).

**Halftone wipes:** at 7.0, 22.0, 29.0, 43.0 and 60.0 s, i.e. at **every chapter change, about every 10–14 s** (not only once).

**Audio:** voice + SFX, very close to ref2 and ref3. The peak hits 0.0 dBFS, which is the uploader's mastering, not a target.

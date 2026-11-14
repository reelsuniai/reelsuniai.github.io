// ───────────────────────── timeline: "Why vibe-coded apps get sued" ─────────────────────────
// The app goes on trial. Every risk is an EXHIBIT (A-D) on an evidence board; the last one (D, the database) stays sealed until
// its section. Sections: hook (built in a weekend, sued by Monday) → loop (the evidence board: 4 exhibits, D sealed) → A
// accessibility → B privacy → C trackers → D database → verdict (gavel: to the law, it's yours) → CTA.
// Cut points are sentence starts (word indices from build/word_index.txt), never hard-coded seconds.

SCENE_FILES = [
  'scenes/law_kit.js',
  'scenes/law_more.js',
  'scenes/hook.js',
  'scenes/board.js',
  'scenes/exA.js',
  'scenes/exB.js',
  'scenes/exC.js',
  'scenes/exD.js',
  'scenes/verdict.js',
  'scenes/cta.js',
];

const KEYWORD = String((REEL.cta && REEL.cta.keyword) || 'REEL').toUpperCase();
const cutAt = (i, fb) => (WORDS[i] ? WORDS[i].s : fb) - 0.1; // a cut lands 0.1 s before the sentence's first word
const CUT_BOARD = cutAt(16, frac(0.08)); // "There are four ways..."
const CUT_A = cutAt(30, frac(0.17)); // "The first is accessibility."
const CUT_B = cutAt(60, frac(0.35)); // "The second is privacy."
const CUT_C = cutAt(90, frac(0.52)); // "The third is trackers."
const CUT_D = cutAt(117, frac(0.69)); // "And the last one is your database."
const CUT_V = cutAt(144, frac(0.85)); // "Your users don't care..."
const CUT_CTA = (() => {
  // "Comment LAWSUIT ..."
  const i = Math.max(commentIndex(CUT_V + 0.5), wordIndex(KEYWORD, CUT_V + 0.5));
  const s = i >= 0 ? sentenceAt(WORDS[i].s) : lastSentence();
  return Math.max(CUT_V + 1.5, s.s - 0.1);
})();

TIMELINE = () => [
  ['hook', 0],
  ['board', CUT_BOARD],
  ['exA', CUT_A],
  ['exB', CUT_B],
  ['exC', CUT_C],
  ['exD', CUT_D],
  ['verdict', CUT_V],
  ['cta', CUT_CTA],
];

PHRASES = null; // automatic phrasing; emphasis words come from reel.json captions.emphasize
READOUT = null; // every scene sets its own (CASE FILE / EXHIBIT n of 4)

// transitions: whoosh into every hard cut, a halftone dot wipe into the first exhibit and into the big one (D)
for (const t of [CUT_BOARD, CUT_B, CUT_C, CUT_V, CUT_CTA]) cue(t - 0.1, 'whoosh', -6);
for (const t of [CUT_A, CUT_D]) cue(t - 0.12, 'whoosh', -3);
wipe(CUT_A, 1);
wipe(CUT_D, 0, '#FF3B1F');

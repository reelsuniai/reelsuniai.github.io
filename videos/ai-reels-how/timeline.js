// "Everybody makes AI reels, nobody tells you how": a sealed black box spits out AI reels → its walls fall → a 4-station pipeline
// (script, voice, visuals, review) → station 1 runs.
SCENE_FILES = ['scenes/rk_kit.js', 'scenes/hook.js', 'scenes/pipe.js', 'scenes/step1.js', 'scenes/rest.js', 'scenes/cta.js'];
const KEYWORD = String((REEL.cta && REEL.cta.keyword) || 'REEL').toUpperCase();
const cutAt = (i, fb) => (WORDS[i] ? WORDS[i].s : fb) - 0.1;
const CUT_PIPE = cutAt(14, frac(0.12));     // "It's not one magic app..."
const CUT_S1 = cutAt(28, frac(0.22));       // "Step one is the script..."
const CUT_REST = cutAt(48, frac(0.4));      // "Step two is the voice..."
const CUT_CTA = (() => {
  const i = Math.max(commentIndex(CUT_REST + 0.5), wordIndex(KEYWORD, CUT_REST + 0.5));
  const s = i >= 0 ? sentenceAt(WORDS[i].s) : lastSentence();
  return Math.max(CUT_REST + 1.5, s.s - 0.1);
})();
// the pipeline geometry is shared by the pipe and step scenes (station 1 carries over the cut)
const RK_ST = [0, 1, 2, 3].map(k => [190 + k * 233, 980]);
const RK_LABELS = ['SCRIPT', 'VOICE', 'VISUALS', 'REVIEW'];
TIMELINE = () => [['hook', 0], ['pipe', CUT_PIPE], ['step1', CUT_S1], ['rest', CUT_REST], ['cta', CUT_CTA]];
PHRASES = null;
READOUT = null;
for (const t of [CUT_PIPE, CUT_REST, CUT_CTA]) cue(t - 0.1, 'whoosh', -6);
cue(CUT_S1 - 0.1, 'whoosh', -4);

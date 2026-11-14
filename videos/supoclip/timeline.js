// SupoClip reel: one long podcast strip → snipped into a week of vertical clips → run it on your own computer → the name.
SCENE_FILES = ['scenes/sc_kit.js', 'scenes/hook.js', 'scenes/comp.js', 'scenes/name.js', 'scenes/rest.js', 'scenes/cta.js'];
const KEYWORD = String((REEL.cta && REEL.cta.keyword) || 'REEL').toUpperCase();
const cutAt = (i, fb) => (WORDS[i] ? WORDS[i].s : fb) - 0.1;
const CUT_COMP = cutAt(16, frac(0.12));       // "And you can run it on your own computer..."
const CUT_NAME = cutAt(32, frac(0.21));       // "It's called SupoClip..."
const CUT_REST = sentenceAfter(CUT_NAME + 2.4) - 0.1;
const CUT_CTA = (() => {
  const i = Math.max(commentIndex(CUT_REST + 0.5), wordIndex(KEYWORD, CUT_REST + 0.5));
  const s = i >= 0 ? sentenceAt(WORDS[i].s) : lastSentence();
  return Math.max(CUT_REST + 1.5, s.s - 0.1);
})();
TIMELINE = () => [['hook', 0], ['comp', CUT_COMP], ['name', CUT_NAME], ['rest', CUT_REST], ['cta', CUT_CTA]];
PHRASES = null;
READOUT = null;
for (const t of [CUT_COMP, CUT_REST, CUT_CTA]) cue(t - 0.1, 'whoosh', -6);
cue(CUT_NAME - 0.12, 'whoosh', -3);
wipe(CUT_NAME, 1);

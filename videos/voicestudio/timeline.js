// @reelsuniai timeline · 3 scenes (hook / middle / cta), 14-19 s. Loaded after build/words.json, before the scenes.
// Cue everything on words: wi(index) (see build/word_index.txt), wordIndex('word'), tplBeats(t0,t1,n). Never hard-code seconds.
// Optional 4th scene: add 'scenes/proof.js' to SCENE_FILES, a cut (e.g. const CUT_PROOF = wi(N) - 0.06) and a TIMELINE row.
// Assets by filename from THIS video's assets/ folder (missing files are fine: scenes draw a fallback).
ASSETS.push(['logo', 'assets/logo.png'], ['paid', 'assets/paid.png'], ['screen', 'assets/screen.jpg'], ['shot1', 'assets/shot1.jpg'], ['shot2', 'assets/shot2.jpg'], ['shot3', 'assets/shot3.jpg']);
SCENE_FILES = ['scenes/life.js', 'scenes/hook.js', 'scenes/studio.js', 'scenes/dub.js', 'scenes/cta.js'];

const KEYWORD = String((REEL.cta && REEL.cta.keyword) || 'REEL').toUpperCase();
const HOOK = REEL.hook || {};   // reel.json "hook": { "paid": "PaidApp", "pill": "OPEN SOURCE", "stamp": "FREE" }
// cut 1: first sentence after ~18% of the voice (or set by hand: wi(N) - 0.06); cut 2: the "Comment KEYWORD" sentence
const CUT_MIDDLE = wi(24) - 0.1, CUT_DUB = wi(47) - 0.1;   // hook | studio (It's called VoiceStudio…) | dub (But here's the crazy part…)
const CUT_CTA = (() => {
  const i = Math.max(commentIndex(CUT_MIDDLE + 0.5), wordIndex(KEYWORD, CUT_MIDDLE + 0.5));
  const s = i >= 0 ? sentenceAt(WORDS[i].s) : lastSentence();
  return Math.max(CUT_MIDDLE + 1.5, s.s - 0.1);
})();
// up to n stressed word indices in [t0,t1) (numbers first, then longest content words), >= gap s apart, in time order
function tplBeats(t0, t1, n, gap = 0.4) {
  const c = [];
  for (let i = 0; i < WORDS.length; i++) {
    const w = WORDS[i]; if (!w.w || w.s < t0 || w.s >= t1 || isStopWord(w.w)) continue;
    const k = norm(w.w).replace(/'/g, ''); if (k.length < 3 && !/\d/.test(k)) continue;
    c.push({ i, t: w.s, sc: (/\d/.test(k) ? 100 : 0) + k.length + (/[,.;:?!]$/.test(w.w) ? 1.5 : 0) });
  }
  c.sort((a, b) => b.sc - a.sc || a.t - b.t);
  const out = []; for (const q of c) { if (out.length >= n) break; if (out.every(o => Math.abs(o.t - q.t) >= gap)) out.push(q); }
  return out.sort((a, b) => a.t - b.t);
}
const tplWord = (i, max = 12) => { const s = cleanWord(i).toUpperCase(); return s.length <= max ? s : ''; };

TIMELINE = () => [['hook', 0], ['studio', CUT_MIDDLE], ['dub', CUT_DUB], ['cta', CUT_CTA]];
PHRASES = null;      // auto phrasing; or [[first, last, [emphasised idx]], ...] — one red serif-italic word per phrase
READOUT = null;
for (const t of [CUT_MIDDLE, CUT_DUB, CUT_CTA]) cue(t - 0.12, 'whoosh', -4);

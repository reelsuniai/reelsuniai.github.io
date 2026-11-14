// ═════════════ 03 · STEP 1 [CUT_S1 → CUT_REST] "Step one is the script. An AI writes a hook, a curiosity loop and a payoff in about
//   a hundred and forty words." ═════════════
// Beats: (the pipeline carries over) step → the belt jolts · one → station 1 lights up red, the others dim and shrink back ·
//   script → a big script document rises out of station 1 · AI → a sparkle cursor lands on it and starts typing · hook → the HOOK line
//   types and its tag slaps on · curiosity loop → the LOOP line types, a loop arrow draws from it down to the bottom · payoff → the
//   PAYOFF line types, the arrow lands on it · hundred and forty → the word counter rolls up to 140 (kick).
// Keeps moving: caret, stations idling, belt, sparkle cursor bobbing, counter breathing.
(() => {
  const S0 = CUT_S1, S1 = CUT_REST;
  const W_ = (w, fb, from = S0) => wordAt(w, from, 1, fb);
  const T_ONE = W_('1', S0 + 0.3), T_SCRIPT = W_('script', S0 + 0.9), T_AI = W_('ai', S0 + 1.6, T_SCRIPT);
  const T_HOOK = W_('hook', S0 + 2.3), T_CUR = W_('curiosity', S0 + 2.9), T_LOOP = W_('loop', S0 + 3.3), T_PAY = W_('payoff', S0 + 4.0);
  const T_140 = W_('140', S0 + 4.7, T_PAY);
  const DOC = { x: 120, y: 560, w: 620, h: 560 };
  const LINES = [['HOOK', 'Everybody\'s posting AI reels…', T_HOOK], ['LOOP', '…by the end you\'ll see it all', T_CUR], ['PAYOFF', 'Step four is the review.', T_PAY]];
  kick(T_ONE + 0.03, 0.5, 0.5); kick(T_140 + 0.05, 0.8, 0.7);
  cue(T_ONE, 'thud', -3); cue(T_SCRIPT, 'swoosh', -4); cue(T_AI, 'pop', -5); cue(T_HOOK, 'type', -7); cue(T_CUR, 'type', -8);
  cue(T_PAY, 'type', -8); cue(T_140, 'ding', -3);

  const lit = t => t >= T_ONE;
  // the pipeline row, carried over: station 1 lights and grows, the others shrink back toward the bottom
  function s1Row(T, K, t) {
    const back = E.inOutCubic(P(t, T_SCRIPT - 0.1, 0.4));
    rkBelt(T, K, 80, 1000, lerp(RK_ST[0][1] + 130, 1330, back), t, 1);
    RK_ST.forEach(([x, y], k) => {
      const yy = lerp(y, 1240, back), s = k === 0 ? lerp(1, 0.7, back) * (1 + ring(t - T_ONE, 5, 9) * 0.08) : lerp(1, 0.6, back);
      const xx = lerp(x, 130 + k * 145, back);
      X([T, K], xx, yy + Math.sin(t * 2 + k) * 4, s, 0, () => rkStation(T, K, k + 1, RK_LABELS[k], k === 0 && lit(t), t, rkIconDoc));
    });
  }
  // the script document: rises on "script", lines type on their words with a slapped tag each, a loop arrow from LOOP to PAYOFF
  function s1Doc(T, K, t) {
    const a = clamp(pop(t - T_SCRIPT, 2.2, 0.6), 0, 1.12);
    if (a <= 0) return;
    X([T, K], DOC.x + DOC.w / 2, DOC.y + DOC.h / 2 + (1 - clamp(a)) * 900 + Math.sin(t * 1.5) * 4, 1, -1.5, () => {
      const x0 = -DOC.w / 2, y0 = -DOC.h / 2;
      uiCard(T, K, x0, y0, DOC.w, DOC.h, { r: 28, border: C.ink, lw: 4 });
      rkMono(K, '// script.txt', x0 + 30, y0 + 46, { size: 22, color: C.ink });
      LINES.forEach(([tag, str, t0], k) => {
        const y = y0 + 130 + k * 140;
        const ts = rkSlap(t - t0, 2);
        if (ts > 0) X([K], x0 + 90, y, ts, -4, () => {
          fillRR(K, -62, -24, 124, 48, 24, k === 1 ? C.red : C.ink);
          text(K, tag, 0, 9, { font: F.mono, weight: 700, size: 22, color: '#FFFFFF', align: 'center' });
        });
        const s = typedStr(str, t, t0 + 0.05, 34);
        text(K, s, x0 + 30, y + 70, { font: F.grot, weight: 500, size: 32, color: C.ink, align: 'left' });
        const last = LINES.filter(l => t >= l[2]).length - 1;
        if (k === last && s.length < str.length) caretAt(K, x0 + 34 + measure(K, s, { font: F.grot, weight: 500, size: 32 }), y + 44, 38, t, C.red);
        if (t < t0) skeleton(K, x0 + 30, y + 52, [DOC.w * 0.7], { h: 14 });
      });
      // the loop arrow: opens at LOOP, lands on PAYOFF
      if (t >= T_LOOP) arrow(K, x0 + DOC.w - 70, y0 + 230, x0 + DOC.w - 70, y0 + 400, E.outCubic(clamp((t - T_LOOP) / (T_PAY - T_LOOP + 0.2))), { bend: 80 });
    });
  }
  // the sparkle cursor (the AI) that hops to whichever line is typing
  function s1Cursor(T, K, t) {
    const a = clamp(pop(t - T_AI, 2.6, 0.5), 0, 1.15);
    if (a <= 0) return;
    const k = Math.max(0, LINES.filter(l => t >= l[2]).length - 1), y = DOC.y + 130 + k * 140 + 60;
    const x = DOC.x + DOC.w - 40, yy = springTo(t, [[-1e9, DOC.y + 190], ...LINES.map((l, i) => [l[2], DOC.y + 130 + i * 140 + 60])], 2.4, 0.5);
    X([T, K], x + Math.sin(t * 3) * 6, yy, a, t * 60, () => {
      circle(T, 4, 8, 40, C.k30);
      circle(K, 0, 0, 40, C.red, C.ink, 4);
      text(K, '✦', 0, 16, { font: F.grot, weight: 700, size: 44, color: '#FFFFFF', align: 'center' });
    });
    rkMono(K, 'AI', x - 12, yy - 54 + 0 * y, { size: 20, color: C.red });
  }
  // the word counter: rolls up with the typing, lands on 140 with a slap
  function s1Counter(T, K, t) {
    if (t < T_HOOK) return;
    const v = t < T_140 ? Math.min(120, (t - T_HOOK) * 30) : lerp(Math.min(120, (T_140 - T_HOOK) * 30), 140, E.outCubic(clamp((t - T_140) / 0.4)));
    X([T, K], 860, 700 + Math.sin(t * 2) * 4, 1 + (t >= T_140 ? ring(t - T_140, 4, 9) * 0.15 : 0), 4, () => {
      uiCard(T, K, -130, -80, 260, 160, { r: 24, border: t >= T_140 ? C.red : C.ink, lw: 4 });
      rkMono(K, 'words', -104, -36, { size: 20 });
      text(K, String(Math.round(v)), 0, 50, { font: F.grot, weight: 700, size: 84, color: t >= T_140 ? C.red : C.ink, align: 'center' });
    });
  }
  const FOCUS = [[S0 + 0.05, RK_ST[0][0], RK_ST[0][1]], [T_SCRIPT, DOC.x + 300, DOC.y + 120], [T_HOOK, DOC.x + 200, DOC.y + 190],
    [T_CUR, DOC.x + 200, DOC.y + 330], [T_PAY, DOC.x + 200, DOC.y + 470], [T_140, 860, 700]];
  const MOODS = [['lean', T_ONE, T_ONE + 0.5], ['celebrate', T_140 + 0.05, Math.min(T_140 + 0.8, S1 - 0.2)]];

  SC.step1 = {
    label: '// 03 — step 1: the script',
    readout: t => ({ k: 'STEP', v: '1 / 4', hot: lit(t) }),
    cam: t => {
      const rel = 1 - E.inOutCubic(clamp((t - S1 + 0.3) / 0.3)), f = focusTrack(t, FOCUS) || [540, 900];
      return { x: (540 - f[0]) * 0.05 * rel, y: (900 - f[1]) * 0.04 * rel, z: 1 + (0.03 * E.outCubic(P(t, S0, 0.5)) + 0.006 * (t - S0)) * rel };
    },
    draw(T, K, t) {
      s1Row(T, K, t);
      moodFx(T, K, t, MOODS);
      s1Doc(T, K, t);
      s1Counter(T, K, t);
      s1Cursor(T, K, t);
    },
    guy: t => act(t, mood(t, MOODS, { focus: t => focusTrack(t, FOCUS) })),
  };
})();

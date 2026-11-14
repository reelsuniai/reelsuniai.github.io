// ═════════════ 01 · HOOK [0 → CUT_PIPE] "Everybody's posting AI reels right now, but nobody shows you how they're actually made." ═════
// Beats: frame 0 three phones playing AI reels fan in, hearts floating · posting → more reels deal in behind (a feed wall) ·
//   AI / reels → AI badges pop, likes counter-free hearts stream · nobody → the feed is shoved aside and a sealed BLACK BOX slams
//   centre (kick), "HOW?" · shows / how → reels pop out of its chute one after another · actually / made → a padlock + chain wraps
//   the box, presenter shrugs.
// Keeps moving: every reel plays (faces talk, captions fill), hearts rise, box vents blink, chute spits reels.
(() => {
  const S0 = 0, S1 = CUT_PIPE;
  const T_POST = wordAt('posting', 0, 1, 0.54), T_AI = wordAt('ai', 0, 1, 0.83), T_REELS = wordAt('reels', 0, 1, 1.13);
  const T_NOBODY = wordAt('nobody', 0, 1, 2.31), T_HOW = wordAt('how', 0, 1, 3.11), T_MADE = Math.min(wordAt('made', 0, 1, 3.74), S1 - 0.35);
  const BOX = { x: 470, y: 900, w: 560, h: 400 };
  const FRONT = [[300, 880, -9], [540, 840, 0], [780, 880, 9]];
  const BACK = [[180, 650], [400, 620], [680, 620], [900, 650], [140, 1140], [940, 1100]];
  const SPIT = [0, 1, 2, 3].map(k => T_HOW - 0.05 + k * 0.22);
  kick(T_NOBODY + 0.03, 1.1, 1);
  cue(0.05, 'swoosh', -4); cue(T_POST, 'pop', -5); cue(T_NOBODY, 'impact', -1); cue(T_HOW, 'pop', -4); cue(T_MADE, 'click', -3);

  const shove = t => E.inOutCubic(P(t, T_NOBODY - 0.08, 0.3));
  // the front three reels: fan in at frame 0, shoved off to the sides on "nobody"
  function hkFront(T, K, t) {
    FRONT.forEach(([x, y, r], k) => {
      const a = clamp(pop(t - 0.02 - k * 0.07, 2.4, 0.55), 0, 1.15), sh = shove(t), dir = k === 1 ? 0 : k === 0 ? -1 : 1;
      if (a <= 0) return;
      const xx = x + dir * sh * 420 + (k === 1 ? 0 : 0), yy = y + (k === 1 ? sh * 1100 : sh * 120) + Math.sin(t * 2 + k) * 5;
      X([T, K], xx, yy + (1 - clamp(a)) * 900, a * (k === 1 ? 1.05 : 0.92), r + dir * sh * 18, () => rkReel(T, K, 240, t, k, { badge: t >= T_AI }));
    });
  }
  // the feed wall behind: six smaller reels deal in on "posting"
  function hkBack(T, K, t) {
    BACK.forEach(([x, y], k) => {
      const a = clamp(pop(t - T_POST - k * 0.05, 2.8, 0.5), 0, 1.15), sh = shove(t);
      if (a <= 0) return;
      const fall = sh > 0 ? gravityFall(t, T_NOBODY + k * 0.02, (x < 540 ? -1 : 1) * 500, -300, (k % 2 ? 1 : -1) * 200, 5600) : { dx: 0, dy: 0, r: 0 };
      if (fall.dy > 1500) return;
      X([T, K], x + fall.dx, y + fall.dy + Math.sin(t * 1.7 + k) * 4, a * 0.62, (k % 2 ? 6 : -6) + fall.r, () => rkReel(T, K, 200, t, k + 3, { badge: t >= T_AI }));
    });
  }
  // hearts rising off the feed until the box slams
  function hkHearts(K, t) {
    if (t < T_REELS || t > T_NOBODY + 0.4) return;
    for (let k = 0; k < 8; k++) {
      const t0 = T_REELS + k * 0.14, d = t - t0;
      if (d < 0 || d > 1) continue;
      K.save();
      K.globalAlpha *= 1 - d;
      X([K], 200 + ((k * 137) % 700) + Math.sin(d * 6 + k) * 20, 1100 - d * 420, 1 + d * 0.3, 0, () => rkHeart(K, 46));
      K.restore();
    }
  }
  // the black box slams on "nobody"; reels spit from its chute on "how"; chained on "made"
  function hkBox(T, K, t) {
    const dt = t - T_NOBODY;
    if (dt < -0.18) return;
    const fall = dt < 0 ? Math.pow(-dt / 0.18, 2) * 1000 : 0, sq = dt > 0 ? ring(dt, 4, 9) * 0.08 : 0, hum = Math.sin(t * 30) * 1.5 * (dt > 0.4 ? 1 : 0);
    SPIT.forEach((s0, k) => {
      const d = t - s0;
      if (d < 0) return;
      const u = clamp(d / 0.5), x = lerp(BOX.x + BOX.w / 2 + 40, 860 - (k % 2) * 40, E.outCubic(u)), y = lerp(BOX.y, 600 + k * 150, u) - Math.sin(u * Math.PI) * 120;
      X([T, K], x, y, lerp(0.2, 0.5, u), (1 - u) * 180 + (k % 2 ? 8 : -8), () => rkReel(T, K, 200, t, k + 1));
    });
    X([T, K], BOX.x + hum, BOX.y - fall, 1 + sq, -1, () => {
      for (const c of [T, K]) { c.save(); c.translate(0, BOX.h / 2); c.scale(1 + sq, 1 - sq); c.translate(0, -BOX.h / 2); }
      rkBox(T, K, BOX.w, BOX.h, t);
      if (t >= T_MADE) {
        const p = E.outCubic(clamp((t - T_MADE) / 0.2));
        K.save();
        K.lineWidth = 14;
        K.strokeStyle = '#B7AFA0';
        K.setLineDash([22, 10]);
        K.beginPath();
        K.moveTo(-BOX.w / 2 - 20, -BOX.h / 2 + 40);
        K.lineTo(lerp(-BOX.w / 2 - 20, BOX.w / 2 + 20, p), lerp(-BOX.h / 2 + 40, BOX.h / 2 - 40, p));
        K.stroke();
        K.restore();
        X([K], 0, BOX.h / 2 - 10, rkSlap(t - T_MADE - 0.1, 2), Math.sin(t * 5) * 5, () => {
          K.save();
          K.lineWidth = 10;
          K.strokeStyle = C.ink;
          K.beginPath();
          K.arc(0, -24, 24, Math.PI, 0);
          K.stroke();
          K.restore();
          fillRR(K, -36, -24, 72, 62, 12, C.red);
          strokeRR(K, -36, -24, 72, 62, 12, C.ink, 4);
        });
      }
      for (const c of [T, K]) c.restore();
    });
    if (dt >= 0) impact(T, K, BOX.x, BOX.y, dt, 1.3, 3);
  }
  const FOCUS = [[0, 540, 840], [T_POST, 540, 650], [T_NOBODY, BOX.x, BOX.y - 60], [T_HOW, 820, 700], [T_MADE, BOX.x, BOX.y + 160]];
  const MOODS = [['wave', 0.05, T_POST + 0.3], ['shock', T_NOBODY, T_NOBODY + 0.5], ['shrug', T_MADE - 0.1, S1 - 0.2]];

  SC.hook = {
    label: '// 01 — everybody makes AI reels',
    readout: t => ({ k: 'HOW', v: t >= T_NOBODY ? '???' : '—', hot: t >= T_NOBODY }),
    cam: t => {
      const rel = 1 - E.inOutCubic(clamp((t - S1 + 0.3) / 0.3)), f = focusTrack(t, FOCUS) || [540, 900];
      return { x: (540 - f[0]) * 0.06 * rel, y: (900 - f[1]) * 0.04 * rel, z: 1 + (0.04 * E.outCubic(P(t, 0, 0.6)) + 0.01 * t) * rel };
    },
    draw(T, K, t) {
      moodFx(T, K, t, MOODS);
      hkBack(T, K, t);
      hkFront(T, K, t);
      hkHearts(K, t);
      hkBox(T, K, t);
    },
    guy: t => act(t, mood(t, MOODS, { focus: t => focusTrack(t, FOCUS) })),
  };
})();

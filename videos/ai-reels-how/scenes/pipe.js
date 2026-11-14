// ═════════════ 02 · PIPE [CUT_PIPE → CUT_S1] "It's not one magic app, and by the end you'll see the whole pipeline." ═════════════
// Beats: (the chained box carries over) not / one → a single "magic app" icon pops beside it with a wand and sparkles · magic → the
//   wand waves, sparkles burst · app → a big red X slashes through the app icon and it drops away (kick) · end → the box's chain
//   snaps · whole → the box's walls FALL away · pipeline → four dashed stations unfold along a conveyor belt, a reel rides the belt.
// Keeps moving: sparkles, belt rollers, the riding reel, stations' dashes marching, question marks bobbing.
(() => {
  const S0 = CUT_PIPE, S1 = CUT_S1;
  const W_ = (w, fb, from = S0) => wordAt(w, from, 1, fb);
  const T_ONE = W_('one', S0 + 0.35), T_MAGIC = W_('magic', S0 + 0.6), T_APP = W_('app', S0 + 0.9), T_END = W_('end', S0 + 1.8);
  const T_WHOLE = W_('whole', S0 + 2.6), T_PIPE = Math.min(W_('pipeline', S0 + 2.9), S1 - 0.4);
  const BOX = { x: 470, y: 900 }, APP = { x: 820, y: 640 };
  kick(T_APP + 0.03, 0.8, 0.8); kick(T_PIPE + 0.03, 0.7, 0.6);
  cue(T_ONE, 'pop', -4); cue(T_MAGIC, 'shimmer', -6); cue(T_APP, 'thud', -2); cue(T_END, 'click', -4); cue(T_WHOLE, 'swoosh', -3); cue(T_PIPE, 'pop', -3);

  // the magic app: an app icon with a wand; X'd on "app", then falls
  function ppApp(T, K, t) {
    const a = clamp(pop(t - T_ONE, 2.6, 0.5), 0, 1.15);
    if (a <= 0) return;
    const f = t >= T_APP + 0.35 ? gravityFall(t, T_APP + 0.35, 200, -300, 300, 5200) : { dx: 0, dy: 0, r: 0 };
    if (f.dy > 1400) return;
    X([T, K], APP.x + f.dx, APP.y + f.dy + Math.sin(t * 2.2) * 5, a, f.r + Math.sin(t * 1.6) * 2, () => {
      fillRR(T, -90 + 10, -90 + 14, 180, 180, 44, C.k45);
      fillRR(K, -90, -90, 180, 180, 44, '#7B4FD8');
      strokeRR(K, -90, -90, 180, 180, 44, C.ink, 5);
      text(K, '✦', 0, 34, { font: F.grot, weight: 700, size: 110, color: '#FFFFFF', align: 'center' });
      rkMono(K, '1 magic app', 0, 128, { size: 24, color: C.ink, align: 'center' });
      if (t >= T_APP) cross(K, 0, 0, 220, clamp((t - T_APP) / 0.15), C.red, 18);
    });
    // wand waving on "magic"
    const wave = Math.sin((t - T_MAGIC) * 14) * 20 * win(t, T_MAGIC - 0.05, T_APP, 0.05, 0.1);
    if (t < T_APP + 0.35) X([T, K], APP.x - 150 + f.dx, APP.y + 120, a, -40 + wave, () => {
      line(K, 0, 0, 0, -150, C.ink, 12);
      line(K, 0, -110, 0, -150, '#FFFFFF', 8);
      text(K, '★', 0, -160, { font: F.grot, weight: 700, size: 56, color: '#F5C26B', align: 'center' });
    });
    if (t >= T_MAGIC && t < T_APP + 0.3) for (let k = 0; k < 6; k++) {
      const ph = ((t - T_MAGIC) * 1.5 + k / 6) % 1;
      K.save();
      K.globalAlpha *= 1 - ph;
      text(K, '✦', APP.x - 150 + Math.cos(k) * 120 * ph, APP.y - 60 - ph * 120, { font: F.grot, weight: 700, size: 36, color: '#F5C26B', align: 'center' });
      K.restore();
    }
  }
  // the box carried over: chain snaps on "end", walls drop on "whole"
  function ppBox(T, K, t) {
    const open = E.inCubic(clamp((t - T_WHOLE) / 0.45));
    if (open >= 1) return;
    X([T, K], BOX.x, BOX.y, 1, -1, () => {
      rkBox(T, K, 560, 400, t, { open });
      if (t < T_END) {
        K.save();
        K.lineWidth = 14;
        K.strokeStyle = '#B7AFA0';
        K.setLineDash([22, 10]);
        K.beginPath();
        K.moveTo(-300, -160);
        K.lineTo(300, 160);
        K.stroke();
        K.restore();
      } else if (t < T_END + 0.6) {
        const d = t - T_END;
        for (const sd of [-1, 1]) X([K], sd * 150, sd * 80 + d * d * 1800, 1, sd * d * 200, () => line(K, -140, -75, 140, 75, '#B7AFA0', 14));
      }
    });
  }
  // the pipeline: four stations deal in on "pipeline", a belt runs under them, a reel rides it
  function ppPipeline(T, K, t) {
    const bp = clamp((t - T_WHOLE - 0.2) / 0.5);
    rkBelt(T, K, 80, 1000, RK_ST[0][1] + 130, t, bp);
    RK_ST.forEach(([x, y], k) => {
      const a = clamp(pop(t - T_PIPE - k * 0.08, 2.8, 0.5), 0, 1.15);
      if (a <= 0) return;
      X([T, K], x, y + Math.sin(t * 2 + k) * 4, a * 0.98, 0, () => rkStation(T, K, k + 1, RK_LABELS[k], false, t));
    });
    if (t >= T_PIPE + 0.3) {
      const u = ((t - T_PIPE - 0.3) * 0.35) % 1;
      X([T, K], lerp(60, 1020, u), RK_ST[0][1] + 70, 0.32, 0, () => rkReel(T, K, 200, t, 2));
    }
  }
  const FOCUS = [[S0 + 0.05, BOX.x, BOX.y], [T_ONE, APP.x, APP.y], [T_END, BOX.x, BOX.y - 100], [T_PIPE, RK_ST[0][0], RK_ST[0][1]]];
  const MOODS = [['no', T_APP, T_APP + 0.6], ['lean', T_PIPE, S1 - 0.2]];

  SC.pipe = {
    label: '// 02 — not one magic app',
    readout: t => ({ k: 'STEPS', v: t >= T_PIPE ? '4' : t >= T_ONE ? '1?' : '—', hot: t >= T_PIPE }),
    cam: t => {
      const rel = 1 - E.inOutCubic(clamp((t - S1 + 0.3) / 0.3)), f = focusTrack(t, FOCUS) || [540, 900];
      return { x: (540 - f[0]) * 0.06 * rel, y: (900 - f[1]) * 0.04 * rel, z: 1 + (0.03 * E.outCubic(P(t, S0, 0.5)) + 0.008 * (t - S0)) * rel };
    },
    draw(T, K, t) {
      moodFx(T, K, t, MOODS);
      ppPipeline(T, K, t);
      ppBox(T, K, t);
      ppApp(T, K, t);
    },
    guy: t => act(t, mood(t, MOODS, { focus: t => focusTrack(t, FOCUS) })),
  };
})();

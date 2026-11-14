// ═════════════ 01 · HOOK [0 → CUT_COMP] "Someone just open-sourced a tool that turns one long podcast into a week of short clips." ═════
// Beats: frame 0 a repo card slams in, padlock closed · open-sourced → the padlock springs OPEN, "PUBLIC" pill flips red ·
//   tool → scissors fly in and snap at the air · long → the repo card steps up-left, a LONG podcast film strip slides in across the
//   frame (timecode 02:14:37) · podcast → the hosts on it talk, waveform pumping · week → seven day slots MON..SUN deal in along the
//   bottom · short / clips → the scissors run along the strip, SNIP SNIP SNIP, and seven vertical clips drop into the seven days (kick).
// Keeps moving: waveform, sprockets scrolling, scissors hovering and opening, clips bobbing, star sparkle.
(() => {
  const S0 = 0, S1 = CUT_COMP;
  const T_OPEN = wordAt('open', 0, 1, 0.45), T_TOOL = wordAt('tool', 0, 1, 1.22), T_LONG = wordAt('long', 0, 1, 2.19);
  const T_POD = wordAt('podcast', 0, 1, 2.52), T_WEEK = wordAt('week', 0, 1, 3.55), T_SHORT = wordAt('short', 0, 1, 3.95);
  const T_CLIPS = Math.min(wordAt('clips', 0, 1, 4.17), S1 - 0.3);
  const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const SLOT = k => [150 + k * 130, 1040];
  const T_CUT = DAYS.map((_, k) => T_SHORT - 0.05 + k * Math.min(0.09, (T_CLIPS + 0.25 - T_SHORT) / 7));
  const STRIP_Y = 790;
  kick(T_CLIPS + 0.05, 0.9, 0.8);
  cue(0.05, 'thud', -3); cue(T_OPEN, 'click', -2); cue(T_TOOL, 'swoosh', -5); cue(T_LONG, 'swoosh', -4); cue(T_WEEK, 'pop', -4);
  cue(T_SHORT, 'click', -3); cue(T_CLIPS, 'impact', -2);

  const repoG = t => {
    const m = E.inOutCubic(P(t, T_LONG - 0.1, 0.4));
    return { x: lerp(540, 330, m), y: lerp(820, 560, m), s: lerp(1, 0.62, m) };
  };
  // repo card: GitHub-style header, a padlock that springs open, a PUBLIC pill, a star
  function hkRepo(T, K, t) {
    const land = 0.12, fall = t < land ? Math.pow((land - t) / 0.25, 2) * 700 : 0, sq = t >= land ? ring(t - land, 4, 9) * 0.07 : 0;
    const g = repoG(t);
    X([T, K], g.x, g.y - fall, g.s * (1 + sq), -2 + Math.sin(t * 1.4) * 0.8, () => {
      uiCard(T, K, -330, -120, 660, 240, { r: 30, border: C.ink, lw: 4 });
      circle(K, -255, -40, 34, C.ink);
      text(K, '{ }', -255, -30, { font: F.mono, weight: 700, size: 30, color: '#FFFFFF', align: 'center' });
      text(K, 'ai-video-clipper', -200, -26, { font: F.grot, weight: 700, size: 44, color: C.ink, align: 'left', ls: -1 });
      scMono(K, 'repository · AGPL-3.0', -200, 14, { size: 22 });
      const open = t >= T_OPEN, u = E.outBack(clamp((t - T_OPEN) / 0.2));
      X([K], -255, 70, 1 + ring(t - T_OPEN, 5, 9) * 0.2, 0, () => {
        K.save();
        K.lineWidth = 8;
        K.strokeStyle = C.ink;
        K.beginPath();
        K.arc(open ? 14 * u : 0, -14 - 16 * u, 16, Math.PI, 0);
        K.stroke();
        K.restore();
        fillRR(K, -22, -14, 44, 36, 8, open ? C.red : C.ink);
      });
      const pill = open ? 'PUBLIC · OPEN SOURCE' : 'PRIVATE';
      X([K], 40, 70, open ? scSlap(t - T_OPEN, 1.5) : 1, 0, () => {
        const w = measure(K, pill, { font: F.mono, weight: 700, size: 24 }) + 40;
        fillRR(K, -w / 2 + 40, -24, w, 48, 24, open ? C.red : '#E6E3DC');
        text(K, pill, 40, 9, { font: F.mono, weight: 700, size: 24, color: open ? '#FFFFFF' : '#8a8780', align: 'center' });
      });
    });
  }
  // the scissors: fly in on "tool", hover above the strip, then run along it cutting at each T_CUT
  function hkScissors(T, K, t) {
    const a = clamp(pop(t - T_TOOL, 2.4, 0.55), 0, 1.15);
    if (a <= 0) return;
    let k = -1;
    T_CUT.forEach((c, i) => { if (t >= c - 0.06) k = i; });
    const hx = k < 0 ? 780 : SLOT(k)[0] + 70, hy = k < 0 ? STRIP_Y - 190 : STRIP_Y;
    const x = lerp(1300, hx, clamp(a)) + Math.sin(t * 2.5) * 6 * (k < 0 ? 1 : 0), y = hy + Math.cos(t * 2.1) * 8 * (k < 0 ? 1 : 0);
    const snip = k >= 0 ? 1 - clamp((t - T_CUT[k] + 0.06) / 0.08) : 0.5 + 0.5 * Math.sin(t * 9);
    X([T, K], x, y, 0.9, k < 0 ? -30 : -90, () => scScissors(T, K, Math.max(0, snip), 1));
  }
  // the long strip slides in on "long" (wider than the frame); once cut, it is gone where the clips came from
  function hkStrip(T, K, t) {
    const a = clamp(pop(t - T_LONG + 0.05, 2.0, 0.65), 0, 1.1);
    if (a <= 0) return;
    const cut = T_CUT.filter(c => t >= c).length;
    const x0 = lerp(1100, 40, a) + cut * 130, w = 1400;
    if (x0 > 1060) return;
    scStrip(T, K, x0, STRIP_Y, w, t, { label: '// podcast ep. 112', time: '02:14:37', hot: px => t >= T_POD && t < T_POD + 0.6 && px < x0 + 400 });
    for (let i = 0; i < 3; i++) X([K], x0 + 120 + i * 240, STRIP_Y, 1, 0, () => { circle(K, 0, 0, 44, '#2A3550'); scHost(K, 70, i, 0.5 + 0.5 * Math.sin(t * 13 + i)); });
  }
  // the week: seven day slots; a clip drops into each one at its cut
  function hkWeek(T, K, t) {
    DAYS.forEach((d, k) => {
      const [x, y] = SLOT(k), a = clamp(pop(t - T_WEEK - k * 0.04, 3, 0.5), 0, 1.15);
      if (a <= 0) return;
      X([K], x, y, a, 0, () => {
        K.save();
        K.setLineDash([10, 8]);
        strokeRR(K, -56, -100, 112, 200, 16, '#B9B5AC', 3);
        K.restore();
        scMono(K, d, 0, 140, { size: 22, color: C.ink, align: 'center' });
      });
      const dt = t - T_CUT[k];
      if (dt < 0) return;
      const u = clamp(dt / 0.22), cx = lerp(SLOT(k)[0] + 70, x, u), cy = lerp(STRIP_Y, y, E.inCubic(u)) - Math.sin(u * Math.PI) * 120;
      const sq = u >= 1 ? ring(dt - 0.22, 5, 9) * 0.1 : 0, newest = k === T_CUT.filter(c => t >= c).length - 1;
      X([T, K], cx, cy + Math.sin(t * 2.4 + k) * 3 * u, 1 + sq, (1 - u) * (k % 2 ? 30 : -30), () => scClip(T, K, 108, t, k, { hot: newest }));
    });
  }
  const FOCUS = [[0, 540, 820], [T_TOOL, 780, STRIP_Y - 190], [T_LONG, 500, STRIP_Y], [T_WEEK, 540, 1040], [T_SHORT, t => SLOT(Math.max(0, T_CUT.filter(c => t >= c).length - 1))[0], 1040]];
  const MOODS = [['wave', 0.05, T_OPEN + 0.4], ['lean', T_LONG, T_LONG + 0.5], ['celebrate', T_CLIPS + 0.05, S1 - 0.2]];

  SC.hook = {
    label: '// 01 — someone just open-sourced',
    readout: t => ({ k: 'CLIPS', v: `${T_CUT.filter(c => t >= c).length}/7`, hot: t >= T_SHORT }),
    cam: t => {
      const rel = 1 - E.inOutCubic(clamp((t - S1 + 0.3) / 0.3)), f = focusTrack(t, FOCUS) || [540, 900];
      return { x: (540 - f[0]) * 0.06 * rel, y: (900 - f[1]) * 0.04 * rel, z: 1 + (0.04 * E.outCubic(P(t, 0, 0.6)) + 0.01 * t) * rel };
    },
    draw(T, K, t) {
      moodFx(T, K, t, MOODS);
      hkRepo(T, K, t);
      hkStrip(T, K, t);
      hkWeek(T, K, t);
      hkScissors(T, K, t);
      for (const c of T_CUT) if (t >= c && t < c + 0.3) burst(K, SLOT(T_CUT.indexOf(c))[0] + 70, STRIP_Y, t - c, { n: 8, r0: 30, r1: 80, color: C.red, lw: 5, dur: 0.22 });
    },
    guy: t => act(t, mood(t, MOODS, { focus: t => focusTrack(t, FOCUS) })),
  };
})();

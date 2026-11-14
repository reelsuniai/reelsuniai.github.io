// ═════════════ 03 · NAME [CUT_NAME → CUT_REST] "It's called SupoClip. You paste a YouTube link or a Twitch VOD, or upload a file." ═════
// Beats: (radial dot wipe) called → the scissors fly in and open · Supo → "Supo" slams in letter by letter · Clip → the scissors SNAP
//   and "Clip" drops in red beside it (kick), confetti of film scraps · paste → an input bar rises and the cursor pastes · YouTube →
//   a YouTube link types in with a red play chip · Twitch → a Twitch VOD chip deals in under it · upload → a file chip drops in.
// Keeps moving: wordmark breathing, scissors idle snip, caret, chips bobbing.
(() => {
  const S0 = CUT_NAME, S1 = CUT_REST;
  const W_ = (w, fb, from = S0) => wordAt(w, from, 1, fb);
  const T_CALL = W_('called', S0 + 0.25), T_SUPO = W_('supo', S0 + 0.4), T_CLIP = wiE(wordIndex('supo', S0)) || T_SUPO + 0.5;
  const T_PASTE = W_('paste', S0 + 1.5), T_YT = W_('youtube', S0 + 1.9), T_TW = W_('twitch', S0 + 2.8), T_UP = W_('upload', S0 + 3.4);
  const BAR = { x: 100, y: 930, w: 880 };
  kick(T_CLIP + 0.03, 1, 0.9);
  cue(T_CALL, 'swoosh', -5); cue(T_SUPO, 'pop', -4); cue(T_CLIP, 'stamp', -1); cue(T_PASTE, 'click', -4); cue(T_YT, 'type', -7);
  cue(T_TW, 'pop', -5); cue(T_UP, 'pop', -5);

  // the wordmark: "Supo" letter by letter, "Clip" in red when the scissors snap
  function nmMark(T, K, t) {
    const f = { font: F.grot, weight: 700, size: 168, ls: -6 }, y = 700 + Math.sin(t * 1.6) * 4;
    const wS = measure(K, 'Supo', f), wC = measure(K, 'Clip', f), x0 = 540 - (wS + wC) / 2;
    'Supo'.split('').forEach((ch, i) => {
      const s = scSlap(t - T_SUPO - i * 0.06, 2);
      if (s <= 0) return;
      const xx = x0 + measure(K, 'Supo'.slice(0, i), f);
      X([T, K], xx, y, s, 0, () => text(K, ch, 0, 0, Object.assign({ color: C.ink, align: 'left' }, f)));
    });
    const dc = t - T_CLIP;
    if (dc >= -0.15) {
      const drop = dc < 0 ? Math.pow(-dc / 0.15, 2) * 500 : 0, sq = dc > 0 ? ring(dc, 5, 9) * 0.08 : 0;
      X([T, K], x0 + wS + 6, y - drop, 1 + sq, dc > 0 ? Math.sin(t * 2) * 1.5 : -8, () => text(K, 'Clip', 0, 0, Object.assign({ color: C.red, align: 'left' }, f)));
    }
    if (dc >= 0) for (let k = 0; k < 10; k++) {
      const g = gravityFall(t, T_CLIP, (hash(k) - 0.5) * 900, -600 - hash(k * 3) * 400, (hash(k * 7) - 0.5) * 600, 3200);
      if (g.dy > 900) continue;
      X([K], 540 + g.dx, y - 60 + g.dy, 1, g.r, () => fillRR(K, -22, -12, 44, 24, 4, k % 2 ? '#15161A' : C.red));
    }
    scMono(K, 'open-source AI clipper', 540, y + 70, { size: 26, color: C.ink, align: 'center' });
  }
  // scissors that hover above the wordmark and snap on "Clip"
  function nmScissors(T, K, t) {
    const a = clamp(pop(t - T_CALL, 2.4, 0.55), 0, 1.15);
    if (a <= 0) return;
    const snap = t >= T_CLIP - 0.05 ? 1 - clamp((t - T_CLIP + 0.05) / 0.07) : 0.6 + 0.4 * Math.sin(t * 8);
    X([T, K], lerp(1300, 820, clamp(a)), 470 + Math.sin(t * 2) * 6, 0.85, 20, () => scScissors(T, K, Math.max(0, snap)));
  }
  // the input bar + source chips
  function nmInput(T, K, t) {
    const a = clamp(pop(t - T_PASTE + 0.1, 2.3, 0.6), 0, 1.15);
    if (a <= 0) return;
    X([T, K], BAR.x + BAR.w / 2, BAR.y + (1 - clamp(a)) * 700, 1, 0, () => {
      uiCard(T, K, -BAR.w / 2, -55, BAR.w, 110, { r: 55, border: C.ink, lw: 4 });
      const s = typedStr('youtube.com/watch?v=pod112', t, T_YT - 0.05, 40);
      fillRR(K, -BAR.w / 2 + 22, -32, 64, 64, 18, t >= T_YT ? C.red : '#E6E3DC');
      K.beginPath();
      K.moveTo(-BAR.w / 2 + 46, -14);
      K.lineTo(-BAR.w / 2 + 68, 0);
      K.lineTo(-BAR.w / 2 + 46, 14);
      K.closePath();
      K.fillStyle = '#FFFFFF';
      K.fill();
      text(K, s || 'paste a link…', -BAR.w / 2 + 108, 12, { font: F.mono, weight: 700, size: 30, color: s ? C.ink : '#B9B5AC', align: 'left' });
      caretAt(K, -BAR.w / 2 + 112 + measure(K, s, { font: F.mono, weight: 700, size: 30 }), -20, 40, t, C.red);
      fillRR(K, BAR.w / 2 - 170, -36, 150, 72, 36, C.ink);
      text(K, 'Clip it', BAR.w / 2 - 95, 11, { font: F.grot, weight: 700, size: 30, color: '#FFFFFF', align: 'center' });
    });
    [[T_TW, 'twitch.tv/videos/…', '#7B4FD8'], [T_UP, 'episode-112.mp4', C.ink]].forEach(([t0, lab, col], k) => {
      const c = clamp(pop(t - t0, 2.8, 0.5), 0, 1.15);
      if (c <= 0) return;
      X([T, K], BAR.x + 200 + k * 420, BAR.y + 150 + Math.sin(t * 2.4 + k) * 4, c, k ? 3 : -3, () => {
        const f = { font: F.mono, weight: 700, size: 24 }, w = measure(K, lab, f) + 70;
        fillRR(T, -w / 2 + 8, -28 + 10, w, 56, 28, C.k30);
        fillRR(K, -w / 2, -28, w, 56, 28, '#FFFFFF');
        strokeRR(K, -w / 2, -28, w, 56, 28, C.ink, 3);
        circle(K, -w / 2 + 28, 0, 12, col);
        text(K, lab, -w / 2 + 50, 9, Object.assign({ color: C.ink, align: 'left' }, f));
      });
    });
  }
  const FOCUS = [[S0 + 0.05, 540, 680], [T_PASTE, 400, BAR.y], [T_TW, BAR.x + 200, BAR.y + 150], [T_UP, BAR.x + 620, BAR.y + 150]];
  const MOODS = [['lean', T_SUPO, T_CLIP + 0.2], ['celebrate', T_CLIP + 0.05, T_CLIP + 0.8]];

  SC.name = {
    label: '// 03 — meet SupoClip',
    readout: t => ({ k: 'SOURCE', v: t >= T_UP ? 'FILE' : t >= T_TW ? 'TWITCH' : t >= T_YT ? 'YOUTUBE' : '—', hot: t >= T_YT }),
    cam: t => {
      const rel = 1 - E.inOutCubic(clamp((t - S1 + 0.3) / 0.3)), f = focusTrack(t, FOCUS) || [540, 900];
      return { x: (540 - f[0]) * 0.05 * rel, y: (900 - f[1]) * 0.04 * rel, z: 1 + (0.03 * E.outCubic(P(t, S0, 0.5)) + 0.008 * (t - S0)) * rel };
    },
    draw(T, K, t) {
      moodFx(T, K, t, MOODS);
      nmScissors(T, K, t);
      nmMark(T, K, t);
      nmInput(T, K, t);
    },
    guy: t => act(t, mood(t, MOODS, { focus: t => focusTrack(t, FOCUS) })),
  };
})();

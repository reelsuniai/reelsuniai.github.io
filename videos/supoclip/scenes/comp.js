// ═════════════ 02 · YOUR COMPUTER [CUT_COMP → CUT_NAME] "And you can run it on your own computer, I'll show you how at the end." ═════
// Beats: (the week of clips shrinks into the laptop screen) run → a laptop drops, its screen boots the clipper (strip in, clips out) ·
//   own → a "localhost" URL pill stamps on the screen · computer → a "YOUR MACHINE" sticker slaps on the lid (kick) · show / how → a
//   terminal slides in from the right with the setup command BLURRED behind a padlock · end → a video scrubber appears and its
//   playhead jumps to the end marker "unlocks here". Dot wipe to the name.
// Keeps moving: clips flowing out of the strip on screen, terminal caret, padlock wobble, scrubber marker pulse.
(() => {
  const S0 = CUT_COMP, S1 = CUT_NAME;
  const W_ = (w, fb, from = S0) => wordAt(w, from, 1, fb);
  const T_RUN = W_('run', S0 + 0.5), T_OWN = W_('own', S0 + 0.95), T_COMP = W_('computer', S0 + 1.2);
  const T_SHOW = W_('show', S0 + 2.0), T_HOW = W_('how', S0 + 2.3), T_END = Math.min(W_('end', S0 + 2.6), S1 - 0.4);
  const LAP = { x: 380, y: 900, w: 560, h: 350 }, TERM = { x: 640, y: 640, w: 360, h: 220 }, SCRUB = { x: 110, y: 1230, w: 520 };
  kick(T_COMP + 0.03, 0.7, 0.7);
  cue(T_RUN - 0.05, 'thud', -3); cue(T_OWN, 'stamp', -4); cue(T_COMP, 'pop', -3); cue(T_SHOW, 'swoosh', -5); cue(T_END, 'click', -3);

  // laptop with the clipper running on screen: strip scrolling left, clips popping out on the right
  function cpLaptop(T, K, t) {
    const dt = t - S0, fall = dt < 0.2 ? Math.pow(1 - dt / 0.2, 2) * 800 : 0, sq = dt >= 0.2 ? ring(dt - 0.2, 4, 9) * 0.07 : 0;
    X([T, K], LAP.x, LAP.y - fall + Math.sin(t * 1.5) * 4, 1 + sq, -1.5, () => {
      const w = LAP.w, h = LAP.h;
      fillRR(T, -w / 2 - 20, h / 2 + 12, w + 60, 46, 20, C.k45);
      K.beginPath();
      K.moveTo(-w / 2 - 10, h / 2 - 4);
      K.lineTo(w / 2 + 10, h / 2 - 4);
      K.lineTo(w / 2 + 50, h / 2 + 34);
      K.lineTo(-w / 2 - 50, h / 2 + 34);
      K.closePath();
      K.fillStyle = '#D8D4CB';
      K.fill();
      K.lineWidth = 4;
      K.strokeStyle = C.ink;
      K.stroke();
      fillRR(T, -w / 2 + 12, -h / 2 + 18, w, h, 22, C.k45);
      fillRR(K, -w / 2, -h / 2, w, h, 22, '#2A2B30');
      strokeRR(K, -w / 2, -h / 2, w, h, 22, C.ink, 4);
      const sx = -w / 2 + 18, sy = -h / 2 + 18, sw = w - 36, sh = h - 36;
      fillRR(K, sx, sy, sw, sh, 12, '#F6F5F1');
      K.save();
      K.beginPath();
      K.rect(sx, sy, sw, sh);
      K.clip();
      // url bar
      fillRR(K, sx + 14, sy + 12, sw - 28, 40, 20, '#FFFFFF');
      const url = t >= T_OWN ? 'localhost:3107' : 'loading…';
      text(K, url, sx + 34, sy + 40, { font: F.mono, weight: 700, size: 20, color: t >= T_OWN ? C.red : '#8a8780', align: 'left' });
      // strip in, clips out
      scStrip(null, K, sx + 14 - ((t * 40) % 40), sy + 150, 260, t, { h: 110 });
      for (let k = 0; k < 4; k++) {
        const ph = (t * 0.9 + k / 4) % 1;
        X([K], sx + 320 + ph * 160, sy + 170 - Math.sin(ph * Math.PI) * 60, 0.55, 0, () => scClip(null, K, 80, t, k, {}));
      }
      K.restore();
      if (t >= T_OWN) {
        const s = scSlap(t - T_OWN, 2);
        X([K], sx + sw - 90, sy + 32, s, 0, () => { circle(K, 0, 0, 14, C.red); });
      }
    });
    if (t >= T_COMP) X([T, K], LAP.x + 170, LAP.y + 110, scSlap(t - T_COMP, 2.2), 8 + Math.sin(t * 2) * 2, () => {
      const f = { font: F.mono, weight: 700, size: 26 }, w = measure(K, 'YOUR MACHINE', f) + 44;
      fillRR(T, -w / 2 + 8, -26 + 10, w, 52, 26, C.k45);
      fillRR(K, -w / 2, -26, w, 52, 26, C.red);
      strokeRR(K, -w / 2, -26, w, 52, 26, C.ink, 3);
      text(K, 'YOUR MACHINE', 0, 9, Object.assign({ color: '#FFFFFF', align: 'center' }, f));
    });
  }
  // terminal with the setup command blurred behind a padlock (unlocked at the end of the reel)
  function cpTerm(T, K, t) {
    const a = clamp(pop(t - T_SHOW + 0.05, 2.3, 0.6), 0, 1.12);
    if (a <= 0) return;
    X([T, K], TERM.x + TERM.w / 2 + (1 - clamp(a)) * 700, TERM.y + TERM.h / 2 + Math.sin(t * 1.8) * 4, 1, 2, () => {
      const x0 = -TERM.w / 2, y0 = -TERM.h / 2;
      fillRR(T, x0 + 10, y0 + 16, TERM.w, TERM.h, 22, C.k45);
      fillRR(K, x0, y0, TERM.w, TERM.h, 22, '#15161A');
      [0, 1, 2].forEach(i => circle(K, x0 + 28 + i * 22, y0 + 26, 7, i ? '#45464D' : C.red));
      scMono(K, 'setup', x0 + 100, y0 + 33, { size: 18, color: '#8F8F8F' });
      K.save();
      K.filter = 'blur(7px)';
      text(K, '$ git clone …', x0 + 24, y0 + 90, { font: F.mono, weight: 700, size: 26, color: '#7EE0B5', align: 'left' });
      text(K, '$ ███ ██████ ██ ██', x0 + 24, y0 + 136, { font: F.mono, weight: 700, size: 26, color: '#F6F5F1', align: 'left' });
      K.restore();
      const wob = Math.sin(t * 5) * 4;
      X([K], 0, y0 + 120, scSlap(t - T_HOW, 1.8), wob, () => {
        K.save();
        K.lineWidth = 9;
        K.strokeStyle = '#FFFFFF';
        K.beginPath();
        K.arc(0, -22, 20, Math.PI, 0);
        K.stroke();
        K.restore();
        fillRR(K, -30, -22, 60, 50, 10, C.red);
        strokeRR(K, -30, -22, 60, 50, 10, '#FFFFFF', 3);
      });
    });
  }
  // the scrubber: appears on "show", playhead jumps to the end marker on "end"
  function cpScrub(T, K, t) {
    const a = clamp(pop(t - T_SHOW - 0.1, 2.6, 0.55), 0, 1.15);
    if (a <= 0) return;
    const p = t < T_END ? 0.12 + 0.04 * (t - T_SHOW) : lerp(0.2, 0.96, E.outExpo(clamp((t - T_END) / 0.25)));
    X([T, K], SCRUB.x + SCRUB.w / 2, SCRUB.y, a, 0, () => {
      fillRR(T, -SCRUB.w / 2 + 8, -26 + 10, SCRUB.w, 52, 26, C.k30);
      fillRR(K, -SCRUB.w / 2, -26, SCRUB.w, 52, 26, '#FFFFFF');
      strokeRR(K, -SCRUB.w / 2, -26, SCRUB.w, 52, 26, C.ink, 3);
      const x0 = -SCRUB.w / 2 + 30, x1 = SCRUB.w / 2 - 30;
      fillRR(K, x0, -5, x1 - x0, 10, 5, '#E6E3DC');
      fillRR(K, x0, -5, (x1 - x0) * p, 10, 5, C.red);
      const mk = x0 + (x1 - x0) * 0.96;
      circle(K, mk, 0, 12 * (1 + 0.15 * Math.sin(t * 8)), null, C.red, 4);
      circle(K, x0 + (x1 - x0) * p, 0, 14, C.ink);
      scMono(K, 'setup unlocks here ↓', mk, -40, { size: 20, color: C.red, align: 'right' });
    });
  }
  const FOCUS = [[S0 + 0.05, LAP.x, LAP.y - 40], [T_OWN, LAP.x + 120, LAP.y - 140], [T_COMP, LAP.x + 170, LAP.y + 110], [T_SHOW, TERM.x + 180, TERM.y + 110], [T_END, SCRUB.x + 480, SCRUB.y]];
  const MOODS = [['lean', T_OWN, T_COMP + 0.3], ['shh', T_SHOW, T_END - 0.05], ['thumbs', T_END, S1 - 0.3]];

  SC.comp = {
    label: '// 02 — on your own computer',
    readout: t => ({ k: 'RUNS ON', v: t >= T_COMP ? 'YOURS' : '…', hot: t >= T_COMP }),
    cam: t => {
      const rel = 1 - E.inOutCubic(clamp((t - S1 + 0.35) / 0.3)), f = focusTrack(t, FOCUS) || [540, 900];
      return { x: (540 - f[0]) * 0.06 * rel, y: (900 - f[1]) * 0.04 * rel, z: 1 + (0.03 * E.outCubic(P(t, S0, 0.5)) + 0.01 * (t - S0)) * rel };
    },
    draw(T, K, t) {
      moodFx(T, K, t, MOODS);
      cpLaptop(T, K, t);
      cpTerm(T, K, t);
      cpScrub(T, K, t);
    },
    guy: t => act(t, mood(t, MOODS, { focus: t => focusTrack(t, FOCUS) })),
  };
})();

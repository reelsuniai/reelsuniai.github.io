// ═════════════ 07 · VERDICT  [CUT_V → CUT_CTA] "Your users don't care that AI wrote the code. To the law, it's yours." ═════════════
// Beats: (hard cut, the gavel is already raised at left, the sound block waits) users → a jury bench rises along the top and five
//   user avatars pop in one by one · don't care → each gets a shrug bubble ("so?", "meh", "who cares") · AI → a code window at right
//   streams code · wrote → a WRITTEN BY AI ✦ badge slaps onto it · code → the code lines flash · law → the GAVEL slams onto the
//   block (shock ring, bursts, the one big kick) and the AI badge is knocked off and tumbles away · it's → a nameplate swings up
//   from below · yours → it lands on the code window: DEFENDANT: YOU (accent), the presenter points at the viewer.
// Keeps moving: avatars bobbing, bubbles floating, code stream, gavel trembling while raised, block ringing, nameplate sway.
(() => {
  const S0 = CUT_V,
    S1 = CUT_CTA;
  const W_ = (w, fb, from = S0) => wordAt(w, from, 1, fb);
  const T_USERS = W_('users', S0 + 0.2),
    T_DONT = W_('don', S0 + 0.45, T_USERS),
    T_CARE = W_('care', S0 + 0.75, T_DONT);
  const T_AI = W_('ai', S0 + 1.1, T_CARE),
    T_WROTE = W_('wrote', S0 + 1.35),
    T_CODE = W_('code', S0 + 1.7, T_WROTE);
  const T_LAW = W_('law', S0 + 2.5, T_CODE),
    T_ITS = W_('it', S0 + 2.95, T_LAW),
    T_YOURS = Math.min(W_('yours', S0 + 3.2, T_ITS), S1 - 0.35);
  const BENCH = { x: 90, y: 560, w: 900, h: 230 },
    CODE = { x: 560, y: 830, w: 430, h: 300 },
    PIV = [40, 1150],
    BLOCK = [390, 1240];
  const JURY = [0, 1, 2, 3, 4].map((k) => ({ x: BENCH.x + 110 + k * 170, t: T_USERS + k * 0.07 }));
  const SAY = ['so?', 'meh', 'who cares', 'ok', 'it works'];
  kick(T_LAW + 0.04, 1.3, 1.3);
  cue(T_USERS, 'pop', -4);
  cue(T_CARE, 'pop', -6);
  cue(T_AI, 'swoosh', -6);
  cue(T_WROTE, 'stamp', -4);
  cue(T_LAW, 'impact', 0);
  cue(T_LAW + 0.02, 'boom', -2);
  cue(T_YOURS, 'thud', -2);

  // gavel angle: raised and trembling, a small anticipation lift, SLAM on "law", rebound, settle
  function vdAng(t) {
    const up = -48 - 6 * E.outCubic(P(t, T_LAW - 0.3, 0.2)),
      tremble = Math.sin(t * 40) * 0.8 * (t < T_LAW - 0.1 ? 1 : 0);
    if (t < T_LAW - 0.1) return up + tremble;
    if (t < T_LAW) return lerp(up, 0, E.inQuart((t - T_LAW + 0.1) / 0.1));
    return -10 * Math.abs(Math.sin((t - T_LAW) * 11)) * Math.exp(-(t - T_LAW) * 6);
  }
  // one juror: shoulders + head + hair, a blink and a little head tilt; arms up in a shrug on "care"
  function vdJuror(T, K, k, t) {
    const R = rng(91 + k * 17),
      skin = ['#F1C9A5', '#A9714B', '#EBC2A0', '#7A4E31', '#D9A47C'][k],
      shirt = ['#4A5260', '#B7AFA0', '#2F3A4A', '#8E8676', '#5D6B5A'][k];
    const hair = ['#2B211B', '#111111', '#8A5A2B', '#111111', '#C9A86A'][k],
      tilt = Math.sin(t * 1.7 + k * 2) * 5,
      blink = (t * 0.7 + k * 0.37) % 1 < 0.06;
    K.beginPath();
    K.ellipse(0, 74, 66, 44, 0, Math.PI, 0);
    K.closePath();
    K.fillStyle = shirt;
    K.fill();
    K.lineWidth = 4;
    K.strokeStyle = C.ink;
    K.stroke();
    X([K], 0, 0, 1, tilt, () => {
      circle(K, 0, 0, 40, skin, C.ink, 4);
      K.beginPath();
      K.arc(0, -4, 41, Math.PI * 1.05, Math.PI * 1.95);
      K.lineTo(28, -18 - R() * 8);
      K.lineTo(-30, -16);
      K.closePath();
      K.fillStyle = hair;
      K.fill();
      K.lineWidth = 3;
      K.stroke();
      if (blink) {
        line(K, -14, 4, -6, 4, C.ink, 3);
        line(K, 6, 4, 14, 4, C.ink, 3);
      } else {
        circle(K, -10, 4, 4, C.ink);
        circle(K, 10, 4, 4, C.ink);
      }
      const meh = t >= T_DONT;
      line(K, -10, 20, 10, meh ? 20 : 22, C.ink, 3);
    });
  }
  // spotlight cone from above onto the nameplate when it lands on "yours"
  function vdSpot(T, K, t) {
    if (t < T_YOURS) return;
    const a = clamp((t - T_YOURS) / 0.12), cx = CODE.x + CODE.w / 2 - 10, cy = CODE.y + CODE.h - 10;
    K.save();
    K.globalAlpha *= 0.18 * a;
    K.fillStyle = '#FFE3A0';
    K.beginPath();
    K.moveTo(cx - 40, 300);
    K.lineTo(cx + 40, 300);
    K.lineTo(cx + 260, cy + 60);
    K.lineTo(cx - 260, cy + 60);
    K.closePath();
    K.fill();
    K.restore();
    glow(T, cx, cy, 300, 120, 0.3 * a);
  }
  // the jury bench: a wooden rail with a front panel; avatars sit behind it
  function vdBench(T, K, t) {
    const a = clamp(pop(t - S0 - 0.05, 2.2, 0.6), 0, 1.15);
    const y = BENCH.y + (1 - clamp(a)) * -700;
    JURY.forEach((j, k) => {
      const p = clamp(pop(t - j.t, 3, 0.45), 0, 1.2),
        bob = Math.sin(t * 2.6 + k * 1.3) * 4,
        shrug =
          t >= T_CARE ? Math.abs(Math.sin((t - T_CARE) * 6 + k)) * 6 * Math.exp(-(t - T_CARE) * 1.5) : 0;
      if (p > 0)
        X([T, K], j.x, y + 70 + bob - shrug + (1 - clamp(p)) * 60, p, Math.sin(t * 1.4 + k) * 3, () =>
          vdJuror(T, K, k, t),
        );
      const bp = clamp(pop(t - T_DONT - k * 0.08, 3, 0.5), 0, 1.15);
      if (bp > 0)
        X([T, K], j.x + 40, y - 30 + Math.sin(t * 2 + k) * 5, bp, k % 2 ? 6 : -6, () => {
          const w = lkSticker(T, K, SAY[k], {
            size: 24,
            fill: k === 2 ? C.red : '#FFFFFF',
            color: k === 2 ? '#FFFFFF' : C.ink,
          });
        });
    });
    fillRR(T, BENCH.x + 12, y + 132, BENCH.w, 110, 20, C.k45);
    fillRR(K, BENCH.x, y + 116, BENCH.w, 110, 20, '#A86A33');
    strokeRR(K, BENCH.x, y + 116, BENCH.w, 110, 20, C.ink, 4);
    fillRR(K, BENCH.x - 10, y + 104, BENCH.w + 20, 26, 12, '#8B5A2B');
    strokeRR(K, BENCH.x - 10, y + 104, BENCH.w + 20, 26, 12, C.ink, 4);
    for (let k = 0; k < 4; k++)
      strokeRR(K, BENCH.x + 30 + k * 220, y + 146, 180, 60, 12, 'rgba(17,17,17,0.35)', 3);
    lkMono(K, 'THE USERS', BENCH.x + 40, y + 190, { size: 22, color: '#FFE9D2' });
  }
  // the code window: streams code, the AI badge slaps on "wrote" and gets knocked off on "law"; the nameplate lands on "yours"
  function vdCode(T, K, t) {
    const a = clamp(pop(t - T_AI + 0.1, 2.4, 0.55), 0, 1.15);
    if (a <= 0) return;
    const hit = ring(t - T_LAW, 6, 8) * 10;
    X(
      [T, K],
      CODE.x + CODE.w / 2 + hit,
      CODE.y + CODE.h / 2 + Math.sin(t * 1.6) * 4,
      a,
      2 + Math.sin(t * 1.2) * 0.6,
      () => {
        const x0 = -CODE.w / 2,
          y0 = -CODE.h / 2;
        fillRR(T, x0 + 12, y0 + 18, CODE.w, CODE.h, 24, C.k45);
        fillRR(K, x0, y0, CODE.w, CODE.h, 24, LK.dark);
        strokeRR(K, x0, y0, CODE.w, CODE.h, 24, C.ink, 4);
        [0, 1, 2].forEach((i) => circle(K, x0 + 30 + i * 24, y0 + 28, 7, i ? '#45464D' : C.red));
        lkMono(K, 'app.tsx', x0 + 110, y0 + 36, { size: 20, color: '#8F8F8F' });
        lkCode(K, x0 + 6, y0 + 56, CODE.w - 12, CODE.h - 70, t, 7, 9, { lh: 32 });
        if (t >= T_CODE && t < T_CODE + 0.5) {
          K.save();
          K.globalAlpha *= 0.3 * (1 - (t - T_CODE) / 0.5);
          K.fillStyle = '#FFFFFF';
          K.fillRect(x0, y0, CODE.w, CODE.h);
          K.restore();
        }
      },
    );
    // WRITTEN BY AI badge (slaps on, then knocked off by the slam)
    const bs = lkSlap(t - T_WROTE, 2);
    if (bs > 0) {
      const f = t >= T_LAW ? gravityFall(t, T_LAW + 0.02, 520, -900, 600, 5200) : { dx: 0, dy: 0, r: 0 };
      if (f.dy < 1500)
        X([T, K], CODE.x + CODE.w / 2 + f.dx, CODE.y + CODE.h - 20 + f.dy, bs, -6 + f.r, () =>
          lkSticker(T, K, 'WRITTEN BY AI ✦', { size: 30, fill: '#FFFFFF' }),
        );
    }
    // DEFENDANT nameplate: swings up on "it's", lands on "yours"
    if (t >= T_ITS - 0.05) {
      const u = clamp(pop(t - T_ITS + 0.05, 2.4, 0.5), 0, 1.15),
        land = t >= T_YOURS,
        sq = land ? ring(t - T_YOURS, 5, 9) * 0.08 : 0;
      const y = lerp(1700, CODE.y + CODE.h - 10, clamp(u)) + (land ? 0 : Math.sin((t - T_ITS) * 10) * 6),
        r = land ? -4 + Math.sin(t * 2) * 1 : -14 * (1 - clamp(u));
      X([T, K], CODE.x + CODE.w / 2 - 10, y, 1 + sq, r, () => {
        fillRR(T, -210 + 12, -54 + 16, 420, 108, 18, C.k60);
        fillRR(K, -210, -54, 420, 108, 18, land ? C.red : '#A86A33');
        strokeRR(K, -210, -54, 420, 108, 18, C.ink, 5);
        lkMono(K, 'DEFENDANT', 0, -16, { size: 22, color: land ? '#FFE3DC' : '#FFE9D2', align: 'center' });
        text(K, 'YOU', 0, 40, {
          font: F.anton,
          weight: 400,
          size: 60,
          color: '#FFFFFF',
          align: 'center',
          ls: 4,
        });
      });
      if (land) impact(T, K, CODE.x + CODE.w / 2 - 10, CODE.y + CODE.h - 10, t - T_YOURS - 0.03, 1, 2);
    }
  }
  // courtroom backdrop: two classical pillars and a pediment that rise behind the bench (quiet, warm greys, no accent)
  function vdPillar(T, K, x, y, h) {
    fillRR(K, x - 46, y - 18, 92, 24, 6, '#E6E3DC');
    strokeRR(K, x - 46, y - 18, 92, 24, 6, '#B9B5AC', 3);
    fillRR(K, x - 34, y, 68, h, 4, '#F3F1EC');
    strokeRR(K, x - 34, y, 68, h, 4, '#B9B5AC', 3);
    for (let k = -1; k <= 1; k++) line(K, x + k * 16, y + 10, x + k * 16, y + h - 10, '#DAD7CF', 3);
    fillRR(K, x - 46, y + h - 6, 92, 24, 6, '#E6E3DC');
    strokeRR(K, x - 46, y + h - 6, 92, 24, 6, '#B9B5AC', 3);
  }
  function vdBackdrop(T, K, t) {
    const a = E.outCubic(clamp((t - S0) / 0.4));
    const y = lerp(380, 300, a);
    K.save();
    K.globalAlpha *= a;
    K.beginPath();
    K.moveTo(BENCH.x + 60, y + 40);
    K.lineTo(BENCH.x + BENCH.w / 2, y - 30);
    K.lineTo(BENCH.x + BENCH.w - 60, y + 40);
    K.closePath();
    K.fillStyle = '#F3F1EC';
    K.fill();
    K.lineWidth = 3;
    K.strokeStyle = '#B9B5AC';
    K.stroke();
    vdPillar(T, K, BENCH.x + 110, y + 70, 200);
    vdPillar(T, K, BENCH.x + BENCH.w - 110, y + 70, 200);
    K.restore();
  }
  // "ORDER!" speech burst that pops off the block on the slam
  function vdOrder(T, K, t) {
    const s = lkSlap(t - T_LAW - 0.04, 2.2);
    if (s <= 0 || t > T_ITS + 0.1) return;
    X([T, K], BLOCK[0] + 40, BLOCK[1] - 230, s, -8, () => {
      K.beginPath();
      for (let k = 0; k < 18; k++) {
        const a = (k / 18) * TAU,
          r = k % 2 ? 70 : 104;
        K.lineTo(Math.cos(a) * r * 1.5, Math.sin(a) * r * 0.8);
      }
      K.closePath();
      K.fillStyle = '#FFFFFF';
      K.fill();
      K.lineWidth = 4;
      K.strokeStyle = C.ink;
      K.stroke();
      text(K, 'ORDER!', 0, 18, { font: F.anton, weight: 400, size: 56, color: C.red, align: 'center' });
    });
  }
  const FOCUS = [
    [S0 + 0.05, 300, 1000],
    [T_USERS, 540, 650],
    [T_AI, CODE.x + 200, CODE.y + 120],
    [T_LAW - 0.2, BLOCK[0], BLOCK[1] - 60],
    [T_ITS, CODE.x + 200, CODE.y + CODE.h - 20],
  ];
  const MOODS = [
    ['shrug', T_DONT, T_CARE + 0.45],
    ['lean', T_WROTE, T_WROTE + 0.4],
    ['shock', T_LAW, T_LAW + 0.4],
  ];

  SC.verdict = {
    label: '// 07 — the verdict',
    readout: (t) => ({
      k: 'VERDICT',
      v: t >= T_YOURS ? 'YOURS' : t >= T_LAW ? 'LIABLE' : '…',
      hot: t >= T_LAW,
    }),
    cam: (t) => {
      const rel = 1 - E.inOutCubic(clamp((t - S1 + 0.25) / 0.25));
      const f = focusTrack(t, FOCUS) || [540, 900];
      return {
        x: (540 - f[0]) * 0.06 * rel,
        y: (900 - f[1]) * 0.04 * rel,
        z:
          1 +
          (0.03 * E.outCubic(P(t, S0, 0.5)) + 0.01 * (t - S0) + 0.04 * win(t, T_LAW, S1, 0.1, 0.25)) * rel,
      };
    },
    draw(T, K, t) {
      moodFx(T, K, t, MOODS);
      if (t >= T_LAW) glow(T, BLOCK[0], BLOCK[1] - 40, 320, 160, 0.45 * Math.exp(-(t - T_LAW) * 2.5) + 0.12);
      vdBackdrop(T, K, t);
      vdBench(T, K, t);
      vdSpot(T, K, t);
      vdCode(T, K, t);
      lkBlock(T, K, BLOCK[0], BLOCK[1], ring(t - T_LAW, 6, 8));
      X([T, K], PIV[0], PIV[1], 1, 0, () => lkGavel(T, K, vdAng(t), 1));
      vdOrder(T, K, t);
      if (t >= T_LAW) {
        shock(K, BLOCK[0], BLOCK[1] - 20, t - T_LAW, { r: 260, color: C.red, lw: 7, dur: 0.45 });
        burst(K, BLOCK[0], BLOCK[1] - 30, t - T_LAW, {
          n: 14,
          r0: 120,
          r1: 230,
          color: C.ink,
          lw: 6,
          dur: 0.35,
        });
        puff(T, BLOCK[0] - 120, BLOCK[1], t - T_LAW, 1, -1);
        puff(T, BLOCK[0] + 120, BLOCK[1], t - T_LAW, 1, 1);
      }
    },
    guy: (t) => act(t, mood(t, MOODS, { focus: (t) => focusTrack(t, FOCUS) })),
  };
})();

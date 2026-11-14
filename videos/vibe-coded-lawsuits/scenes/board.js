// ═════════════ 02 · BOARD  [CUT_BOARD → CUT_A] "There are four ways it usually happens, and the last one catches almost everyone." ═════
// Beats: four → the evidence board drops in (4 dashed slots under 4 pins, counter 0/4 → a big "4" sticker) · ways / usually /
//   happens → exhibit tags A, B, C swing onto their pins (counter rolls 1/4, 2/4, 3/4) · last → the 4th tag drops SEALED in red
//   with a "?" and a padlock (the loop) · one → it rattles · catches → red evidence yarn shoots from D down into a wall of app
//   tiles that cascades in below the board · almost everyone → the tiles flip red one after another, ONE stays white ("almost").
//   The presenter points at each new tag, leans in on "last", facepalms on "everyone". Radial dot wipe into exhibit A.
// Keeps moving: tags swinging, padlock wobble, yarn sagging, tiles breathing, counter pulse, the sealed tag's glow.
(() => {
  const S0 = CUT_BOARD,
    S1 = CUT_A;
  const T_FOUR = wordAt('four', S0, 1, S0 + 0.3),
    T_WAYS = wordAt('ways', S0, 1, S0 + 0.6);
  const T_USU = wordAt('usually', S0, 1, S0 + 1.0),
    T_HAP = wordAt('happens', S0, 1, S0 + 1.3);
  const T_LAST = wordAt('last', S0, 1, S0 + 2.1),
    T_ONE = wordAt('one', T_LAST, 1, T_LAST + 0.25);
  const T_CATCH = wordAt('catches', S0, 1, S0 + 2.6),
    T_ALL = Math.min(wordAt('everyone', S0, 1, S0 + 3.2), S1 - 0.75);
  const T_TAG = [T_WAYS, T_USU, T_HAP, T_LAST];
  const BD = { x: 80, y: 530, w: 920, h: 520 };
  const PINS = [0, 1, 2, 3].map((k) => [BD.x + 135 + k * 216, BD.y + 70]);
  // the wall of apps: 2 full rows + a short 3rd row left of the presenter
  const TILES = [];
  for (let r = 0; r < 3; r++)
    for (let c = 0; c < (r < 2 ? 9 : 5); c++)
      TILES.push({ x: 130 + c * 100, y: 1125 + r * 96, k: TILES.length });
  const SAFE = 12; // the one app that does not get caught ("almost")
  const T_WALL = TILES.map((o) => T_CATCH + 0.12 + o.k * 0.012);
  const near = (o) => Math.hypot(o.x - PINS[3][0], o.y - PINS[3][1]);
  const order = TILES.slice()
    .sort((a, b) => near(a) - near(b))
    .map((o) => o.k);
  const T_RED = TILES.map((o) => T_ALL - 0.15 + order.indexOf(o.k) * 0.022);
  for (let k = 0; k < 3; k++) cue(T_TAG[k], 'swoosh', -7);
  cue(T_FOUR, 'thud', -2);
  cue(T_LAST, 'stamp', -3);
  cue(T_CATCH + 0.05, 'riser', -8);
  cue(T_ALL, 'impact', -3);
  kick(T_LAST + 0.03, 0.6, 0.5);
  kick(T_ALL + 0.05, 0.9, 0.9);

  // the board: a pinboard card (corkish warm fill printed as dots), header with the case name and an n/4 counter
  function bdBoard(T, K, t) {
    const dt = t - S0 + 0.02,
      fall = dt < 0.2 ? Math.pow(Math.max(0, 0.2 - dt) / 0.2, 2) * 900 : 0;
    const sq = dt > 0.2 ? ring(dt - 0.2, 4, 9) * 0.06 : 0;
    if (dt < 0) return;
    X([T, K], BD.x + BD.w / 2, BD.y + BD.h / 2 - fall, 1, Math.sin(t * 1.2) * 0.3, () => {
      for (const c of [T, K]) {
        c.save();
        c.translate(0, BD.h / 2);
        c.scale(1 + sq, 1 - sq);
        c.translate(0, -BD.h / 2);
      }
      const x0 = -BD.w / 2,
        y0 = -BD.h / 2;
      fillRR(T, x0 + 14, y0 + 24, BD.w, BD.h, 30, C.k45);
      fillRR(K, x0, y0, BD.w, BD.h, 30, '#EADBC0');
      strokeRR(K, x0, y0, BD.w, BD.h, 30, C.ink, 5);
      K.save();
      rr(K, x0 + 18, y0 + 18, BD.w - 36, BD.h - 36, 18);
      K.clip();
      dotPattern(K, 'rgba(120,84,40,0.22)', 2.2);
      K.fillRect(x0, y0, BD.w, BD.h);
      K.restore();
      strokeRR(K, x0 + 18, y0 + 18, BD.w - 36, BD.h - 36, 18, 'rgba(17,17,17,0.25)', 2);
      lkMono(K, '// CASE FILE: your-app.com', x0 + 40, y0 + BD.h - 34, { size: 22, color: '#6E6248' });
      const n = T_TAG.filter((x) => t >= x).length;
      X([K], -x0 - 60, y0 + BD.h - 40, 1 + ring(lkSince(t, T_TAG), 4, 9) * 0.3, 0, () =>
        text(K, `${n}/4`, 0, 0, {
          font: F.mono,
          weight: 700,
          size: 34,
          color: n ? C.red : C.ink,
          align: 'right',
        }),
      );
      for (const c of [T, K]) c.restore();
    });
  }
  // docket ribbon: a paper strip with the case number, pinned at an angle on the board's top-left corner
  function bdDocket(T, K, t) {
    const s = lkSlap(t - S0 - 0.32, 1.6);
    if (s <= 0) return;
    X([T, K], BD.x + 150, BD.y - 12, s, -5 + Math.sin(t * 1.5) * 1, () => {
      fillRR(T, -128, -20, 270, 52, 8, C.k30);
      fillRR(K, -135, -28, 270, 52, 8, '#FFFFFF');
      strokeRR(K, -135, -28, 270, 52, 8, C.ink, 3);
      lkMono(K, 'DOCKET 24-0117', 0, 6, { size: 22, color: C.ink, align: 'center' });
    });
  }
  // empty slot outline under each pin until its tag arrives
  function bdSlot(K, k, t) {
    if (t < T_FOUR + 0.1 || t >= T_TAG[k]) return;
    const [px, py] = PINS[k],
      a = clamp(pop(t - T_FOUR - 0.1 - k * 0.06, 3, 0.5), 0, 1.2);
    X([K], px, py + 40 + 131, a, 0, () => {
      K.save();
      K.setLineDash([14, 10]);
      K.lineDashOffset = -t * 20;
      strokeRR(K, -98, -131, 196, 262, 18, '#A8957A', 3);
      K.restore();
      text(K, 'ABCD'[k], 0, 30, {
        font: F.anton,
        weight: 400,
        size: 90,
        color: 'rgba(110,98,72,0.35)',
        align: 'center',
      });
    });
  }
  // a tag swinging onto its pin (drops from above on its word, then swings); D is sealed + hot + padlocked
  function bdTag(T, K, k, t) {
    const t0 = T_TAG[k],
      dt = t - t0;
    if (dt < -0.18) return;
    const [px, py] = PINS[k],
      drop = dt < 0 ? Math.pow(-dt / 0.18, 2) * 500 : 0;
    const rattle =
      k === 3
        ? ring(t - T_ONE, 7, 6) * 10 + Math.sin(t * 30) * 1.5 * win(t, T_CATCH, T_ALL + 0.4, 0.1, 0.2)
        : 0;
    const sw = lkSwing(t, t0, k === 3 ? 10 : 22, k) + rattle;
    X([T, K], px, py - drop, 1, 0, () => {
      if (k === 3 && t > t0) glow(T, 0, 170, 160, 200, 0.35 + 0.1 * Math.sin(t * 7));
      lkTag(T, K, sw, {
        letter: 'ABCD'[k],
        hot: k === 3,
        sealed: k === 3,
        label: k === 3 ? 'SEALED' : 'EXHIBIT',
        w: 196,
        h: 262,
        str: 40,
      });
    });
    lkPin(T, K, px, py, 1);
    if (k === 3 && dt > 0) {
      // padlock hanging on the sealed tag
      const ls = lkSlap(t - T_ONE, 2),
        a = (sw + Math.sin(t * 4) * 6) * D2R;
      if (ls > 0)
        X(
          [T, K],
          px + Math.sin(sw * D2R) * 285 + 62,
          py + Math.cos(sw * D2R) * 285 + 14,
          ls,
          (a / D2R) * 0.6,
          () => bdLock(T, K),
        );
    }
  }
  function bdLock(T, K) {
    K.save();
    K.lineWidth = 9;
    K.strokeStyle = C.ink;
    K.beginPath();
    K.arc(0, -16, 22, Math.PI, 0);
    K.stroke();
    K.restore();
    fillRR(T, -30 + 6, -16 + 8, 60, 50, 10, C.k45);
    fillRR(K, -30, -16, 60, 50, 10, '#F5C26B');
    strokeRR(K, -30, -16, 60, 50, 10, C.ink, 4);
    circle(K, 0, 4, 7, C.ink);
    line(K, 0, 6, 0, 22, C.ink, 5);
  }
  // one app tile: a rounded icon with a seeded glyph; flips red when caught (scaleX squash through 0)
  function bdTile(T, K, o, t) {
    const a = clamp(pop(t - T_WALL[o.k], 3, 0.5), 0, 1.25);
    if (a <= 0) return;
    const safe = o.k === SAFE,
      fl = safe ? 0 : P(t, T_RED[o.k], 0.18),
      sx = Math.abs(Math.cos(fl * Math.PI)),
      red = fl > 0.5;
    const R = rng(o.k * 31 + 7),
      bob = Math.sin(t * 2.4 + o.k) * 3;
    X([T, K], o.x, o.y + bob, a * (safe && t > T_ALL + 0.3 ? 1 + 0.04 * Math.sin(t * 6) : 1), 0, () => {
      fillRR(T, -36 + 5, -36 + 7, 72, 72, 18, C.k30);
      K.save();
      K.scale(Math.max(0.05, sx), 1);
      fillRR(K, -36, -36, 72, 72, 18, red ? C.red : '#FFFFFF');
      strokeRR(
        K,
        -36,
        -36,
        72,
        72,
        18,
        safe && t > T_ALL ? C.ink : red ? C.redD : C.ink,
        safe && t > T_ALL ? 5 : 3,
      );
      const g = Math.floor(R() * 4),
        col = red ? '#FFFFFF' : ['#2F3A4A', '#8E8676', C.ink, '#5D6B5A'][Math.floor(R() * 4)];
      if (g === 0) circle(K, 0, 0, 16, col);
      else if (g === 1) fillRR(K, -16, -16, 32, 32, 6, col);
      else if (g === 2) {
        K.beginPath();
        K.moveTo(0, -18);
        K.lineTo(18, 14);
        K.lineTo(-18, 14);
        K.closePath();
        K.fillStyle = col;
        K.fill();
      } else text(K, '✦', 0, 14, { font: F.grot, weight: 700, size: 40, color: col, align: 'center' });
      K.restore();
      if (red && t - T_RED[o.k] < 0.5)
        shock(K, 0, 0, t - T_RED[o.k] - 0.1, { r: 60, color: C.red, lw: 4, dur: 0.3 });
    });
  }
  // the big "4" sticker: slaps onto the board's top-left on "four", then breathes
  function bdFour(T, K, t) {
    const s = lkSlap(t - T_FOUR - 0.05, 2.2);
    if (s <= 0) return;
    X([T, K], BD.x + BD.w - 20, BD.y + 10 + Math.sin(t * 2) * 4, s, 10 + Math.sin(t * 1.7) * 2, () => {
      circle(T, 10, 14, 64, C.k45);
      circle(K, 0, 0, 64, C.red, C.ink, 5);
      text(K, '4', 0, 34, { font: F.anton, weight: 400, size: 96, color: '#FFFFFF', align: 'center' });
      lkMono(K, 'WAYS', 0, 56, { size: 16, color: '#FFE3DC', align: 'center' });
    });
  }
  const yarnTo = TILES[order[Math.floor(order.length * 0.45)]];
  const FOCUS = [
    [S0 + 0.05, 540, 760],
    ...T_TAG.map((x, k) => [x + 0.02, PINS[k][0], PINS[k][1] + 180]),
    [T_CATCH + 0.1, 520, 1160],
    [T_ALL, 420, 1150],
  ];
  const MOODS = [
    ['lean', T_LAST, T_LAST + 0.5],
    ['facepalm', T_ALL + 0.05, S1 - 0.3],
  ];

  SC.board = {
    label: '// 02 — the case file',
    readout: (t) => ({ k: 'EXHIBITS', v: `${T_TAG.filter((x) => t >= x).length} / 4`, hot: t >= T_LAST }),
    cam: (t) => {
      const rel = 1 - E.inOutCubic(clamp((t - S1 + 0.35) / 0.3));
      const f = focusTrack(t, FOCUS) || [540, 900];
      return {
        x: (540 - f[0]) * 0.07 * rel,
        y: (900 - f[1]) * 0.04 * rel,
        z: 1 + (0.03 * E.outCubic(P(t, S0, 0.6)) + 0.008 * (t - S0)) * rel,
      };
    },
    draw(T, K, t) {
      moodFx(T, K, t, MOODS);
      bdBoard(T, K, t);
      for (let k = 0; k < 4; k++) bdSlot(K, k, t);
      bdFour(T, K, t);
      bdDocket(T, K, t);
      const yp = P(t, T_CATCH, 0.3);
      for (const o of TILES) bdTile(T, K, o, t);
      if (yp > 0) {
        const sw = lkSwing(t, T_LAST, 10, 3);
        lkYarn(
          K,
          [PINS[3][0] + Math.sin(sw * D2R) * 220, PINS[3][1] + 230],
          [yarnTo.x, yarnTo.y - 30],
          E.outCubic(yp),
          40,
          t,
        );
        lkPin(T, K, yarnTo.x, yarnTo.y - 30, 0.8);
      }
      for (let k = 0; k < 4; k++) bdTag(T, K, k, t);
      if (t >= T_ALL - 0.15) {
        lkMono(K, 'caught', 100, 1395, { size: 26, color: C.red });
        text(
          K,
          `${TILES.filter((o) => o.k !== SAFE && t >= T_RED[o.k] + 0.09).length}/${TILES.length}`,
          215,
          1397,
          { font: F.mono, weight: 700, size: 30, color: C.red, align: 'left' },
        );
      }
    },
    guy: (t) => act(t, mood(t, MOODS, { focus: (t) => focusTrack(t, FOCUS) })),
  };
})();

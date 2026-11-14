// ═════════════ 06 · EXHIBIT D  [CUT_D → CUT_V] the database (the sealed one) ═════════════
// "And the last one is your database. AI will happily ship your app with no access rules, so anyone with the link can read every
//  user's data."
// Beats: (accent dot wipe in) last → the SEALED tag from the board drops onto its pin · one → the wax seal pops, the tag flips to D ·
//   database → a database drum slams centre-right (discs stack, LEDs on) · AI → an AI deploy card pops at left · happily → its
//   sparkle spins faster · ship → Deploy pressed, the bar fills, LIVE · no → the vault door on the drum swings OPEN · access → an
//   empty dashed padlock slot pulses · rules → the "access rules" toggle snaps OFF (red) · anyone → strangers walk in from the left,
//   the deploy card drops away · link → a link chip flies across and plugs into the open door · read / every / user's → user rows
//   fountain out of the door in arcs and pile up at left, a READABLE BY: ANYONE counter slams · data → EXHIBIT D stamp (kick).
// Keeps moving: tag swing, drum LEDs + idle bob, door creak sway, strangers walking/bobbing, rows tumbling, toggle glow.
(() => {
  const S0 = CUT_D,
    S1 = CUT_V;
  const W_ = (w, fb, from = S0) => wordAt(w, from, 1, fb);
  const T_LAST = W_('last', S0 + 0.25),
    T_ONE = W_('one', S0 + 0.5, T_LAST),
    T_DB = W_('database', S0 + 1.0);
  const T_AI = W_('ai', S0 + 2.0, T_DB),
    T_HAP = W_('happily', S0 + 2.4),
    T_SHIP = W_('ship', S0 + 2.9),
    T_NO = W_('no', S0 + 3.6, T_SHIP);
  const T_ACC = W_('access', S0 + 3.8),
    T_RULE = W_('rules', S0 + 4.1),
    T_ANY = W_('anyone', S0 + 4.8),
    T_LINK = W_('link', S0 + 5.5);
  const T_READ = W_('read', S0 + 5.9, T_LINK),
    T_EVERY = W_('every', S0 + 6.0, T_READ),
    T_DATA = Math.min(W_('data', S0 + 6.9, T_EVERY), S1 - 0.45);
  const TAG = [200, 565],
    DB = { x: 690, y: 1000, w: 380 },
    DOOR = { x: 690, y: 1040, r: 112 },
    SHIP = { x: 270, y: 990 },
    RULES = { x: 840, y: 640 };
  const ROWS_T = [0, 1, 2, 3, 4, 5, 6, 7, 8].map((k) => T_READ + 0.05 + k * 0.11);
  const STR = [0, 1, 2].map((k) => T_ANY + k * 0.16);
  kick(T_DB + 0.03, 0.8, 0.8);
  kick(T_NO + 0.05, 0.5, 0.5);
  kick(T_DATA + 0.03, 1.1, 1.1);
  cue(T_LAST, 'thud', -4);
  cue(T_ONE, 'pop', -2);
  cue(T_DB, 'impact', -2);
  cue(T_AI, 'pop', -5);
  cue(T_SHIP, 'click', -3);
  cue(T_SHIP + 0.4, 'ding', -6);
  cue(T_NO, 'swoosh', -3);
  cue(T_RULE, 'click', -3);
  cue(T_LINK, 'thud', -4);
  cue(T_READ, 'riser', -8);
  cue(T_DATA, 'stamp', 0);

  const doorOpen = (t) =>
    clamp(
      springTo(
        t,
        [
          [-1e9, 0],
          [T_NO, 1],
        ],
        1.6,
        0.35,
      ),
      0,
      1.12,
    );
  // the tag: arrives sealed (the board's D), the seal pops on "one" and it flips to D
  function dbTag(T, K, t) {
    if (t < T_LAST - 0.15) return;
    const d = Math.max(0, T_LAST - t) / 0.15,
      fl = E.inOutCubic(P(t, T_ONE, 0.24)),
      sx = Math.abs(Math.cos(fl * Math.PI));
    X([T, K], TAG[0], TAG[1] - d * d * 400, 1, 0, () => {
      for (const c of [T, K]) {
        c.save();
        c.scale(Math.max(0.05, sx), 1);
      }
      lkTag(
        T,
        K,
        lkSwing(t, T_LAST, 16, 4) + ring(t - T_ONE, 6, 7) * 8,
        fl < 0.5
          ? { sealed: true, hot: true, label: 'SEALED', w: 170, h: 220, str: 34 }
          : { letter: 'D', hot: true, w: 170, h: 220, str: 34 },
      );
      for (const c of [T, K]) c.restore();
    });
    lkPin(T, K, TAG[0], TAG[1] - d * d * 400);
    if (t >= T_ONE) {
      burst(K, TAG[0], TAG[1] + 160, t - T_ONE, { n: 10, r0: 80, r1: 140, color: C.red, lw: 5, dur: 0.3 });
      confetti(K, TAG[0], TAG[1] + 140, t - T_ONE, { n: 14, seed: 4, spread: 160, dur: 0.8 });
    }
  }
  // database drum: 4 discs, side shading on T, LEDs; the vault door on its front swings open on "no"
  function dbDrum(T, K, t) {
    const dt = t - T_DB;
    if (dt < -0.2) return;
    const fall = dt < 0 ? Math.pow(-dt / 0.2, 2) * 900 : 0,
      sq = dt > 0 ? ring(dt, 4, 9) * 0.08 : 0,
      bob = Math.sin(t * 1.5) * 4;
    const W = DB.w,
      RY = 40,
      DH = 70,
      GAP = 14;
    X([T, K], DB.x, DB.y - fall + bob, 1, 0, () => {
      for (const c of [T, K]) {
        c.save();
        c.translate(0, 200);
        c.scale(1 + sq, 1 - sq);
        c.translate(0, -200);
      }
      for (let k = 0; k < 4; k++) {
        const yT = 150 - RY - DH - k * (DH + GAP);
        const side = new Path2D();
        side.moveTo(-W / 2, yT);
        side.lineTo(-W / 2, yT + DH);
        side.ellipse(0, yT + DH, W / 2, RY, 0, Math.PI, 0, true);
        side.lineTo(W / 2, yT);
        side.ellipse(0, yT, W / 2, RY, 0, 0, Math.PI, false);
        side.closePath();
        const gr = T.createLinearGradient(-W / 2, 0, W / 2, 0);
        gr.addColorStop(0, 'rgba(0,0,0,0.18)');
        gr.addColorStop(0.3, 'rgba(0,0,0,0.03)');
        gr.addColorStop(1, 'rgba(0,0,0,0.6)');
        T.fillStyle = gr;
        T.fill(side);
        K.save();
        K.globalCompositeOperation = 'destination-out';
        K.fill(side);
        K.restore();
        K.save();
        K.lineWidth = 4;
        K.strokeStyle = C.ink;
        K.lineJoin = 'round';
        K.beginPath();
        K.moveTo(-W / 2, yT);
        K.lineTo(-W / 2, yT + DH);
        K.ellipse(0, yT + DH, W / 2, RY, 0, Math.PI, 0, true);
        K.lineTo(W / 2, yT);
        K.stroke();
        K.beginPath();
        K.ellipse(0, yT, W / 2, RY, 0, 0, TAU);
        K.fillStyle = '#FFFFFF';
        K.fill();
        K.stroke();
        K.restore();
        for (let j = 0; j < 3; j++)
          circle(
            K,
            W / 2 - 90 + j * 24,
            yT + DH * 0.55 + 10,
            6,
            Math.floor(t * 5 + j + k * 2) % 3 === 0 ? C.red : '#D9D5CC',
          );
      }
      lkMono(K, '// users table', -W / 2, 205, { size: 22, color: C.ink });
      for (const c of [T, K]) c.restore();
    });
  }
  // alarm beacon on the drum's lid: off until the door opens, then it spins and throws red light
  function dbAlarm(T, K, t) {
    if (t < T_DB + 0.2) return;
    const on = t >= T_NO,
      x = DB.x,
      y = DB.y - 270 + Math.sin(t * 1.5) * 4;
    if (on) {
      const a = t * 7;
      K.save();
      K.globalAlpha *= 0.35;
      K.fillStyle = C.red;
      K.beginPath();
      K.moveTo(x, y - 30);
      K.arc(x, y - 30, 220, a - 0.3, a + 0.3);
      K.closePath();
      K.fill();
      K.restore();
      glow(T, x, y - 30, 120, 90, 0.4 + 0.2 * Math.sin(t * 14));
    }
    fillRR(K, x - 46, y - 10, 92, 24, 8, C.ink);
    K.beginPath();
    K.arc(x, y - 10, 36, Math.PI, 0);
    K.closePath();
    K.fillStyle = on ? (Math.sin(t * 14) > 0 ? C.red : C.redD) : '#D9D5CC';
    K.fill();
    K.lineWidth = 4;
    K.strokeStyle = C.ink;
    K.stroke();
  }
  // the vault door (scene coords): a round steel door hinged on its left edge; open 0..1 squashes it sideways to reveal the dark hole
  function dbDoor(T, K, t) {
    if (t < T_DB) return;
    const o = doorOpen(t),
      bob = Math.sin(t * 1.5) * 4,
      cx = DOOR.x,
      cy = DOOR.y + bob,
      r = DOOR.r;
    circle(K, cx, cy, r, '#0B0B0D', C.ink, 5); // the hole
    if (o > 0.05) {
      K.save();
      K.beginPath();
      K.arc(cx, cy, r - 6, 0, TAU);
      K.clip();
      for (let k = 0; k < 4; k++)
        fillRR(K, cx - 70, cy - 60 + k * 32, 140 - k * 18, 16, 8, k % 2 ? '#3A3B42' : '#55565E');
      K.restore();
    }
    const hx = cx - r,
      sx = Math.cos(o * Math.PI * 0.62) * (1 + Math.sin(t * 2.2) * 0.02 * o);
    K.save();
    K.translate(hx, cy);
    K.scale(sx, 1);
    T.save();
    T.translate(hx + 8, cy + 10);
    T.scale(Math.abs(sx), 1);
    circle(T, r, 0, r, C.k30);
    T.restore();
    circle(K, r, 0, r, sx > 0 ? '#C9CDD3' : '#8E949C', C.ink, 5);
    circle(K, r, 0, r * 0.72, null, '#8E949C', 4);
    for (let k = 0; k < 3; k++) {
      const a = (k / 3) * TAU + t * 0.4 * (1 - o);
      line(K, r, 0, r + Math.cos(a) * r * 0.5, Math.sin(a) * r * 0.5, C.ink, 9);
    }
    circle(K, r, 0, 16, C.ink);
    K.restore();
    fillRR(K, hx - 14, cy - 50, 22, 100, 8, '#55565E');
    strokeRR(K, hx - 14, cy - 50, 22, 100, 8, C.ink, 3); // hinge
    // empty padlock slot above the door, pulsing on "access"
    if (t >= T_ACC - 0.05) {
      const p = 1 + 0.08 * Math.sin((t - T_ACC) * 10);
      X([K], cx + r + 40, cy - r - 10, p * lkSlap(t - T_ACC, 1.6), 0, () => {
        K.save();
        K.setLineDash([8, 7]);
        K.lineWidth = 4;
        K.strokeStyle = C.red;
        K.beginPath();
        K.arc(0, -18, 20, Math.PI, 0);
        K.stroke();
        strokeRR(K, -28, -18, 56, 46, 10, C.red, 4);
        K.restore();
        text(K, '?', 0, 18, { font: F.grot, weight: 700, size: 30, color: C.red, align: 'center' });
      });
    }
  }
  // AI deploy card: pops on "AI", sparkle spins faster on "happily", Deploy pressed on "ship" → bar fills → LIVE; drops away on "anyone"
  function dbShip(T, K, t) {
    const a = clamp(pop(t - T_AI, 2.6, 0.5), 0, 1.15);
    if (a <= 0) return;
    const f = t >= T_ANY ? gravityFall(t, T_ANY, -200, -300, -160, 5200) : { dx: 0, dy: 0, r: 0 };
    if (f.dy > 1400) return;
    const press = win(t, T_SHIP - 0.03, T_SHIP + 0.12, 0.03, 0.1),
      bar = E.outCubic(P(t, T_SHIP + 0.05, 0.4)),
      live = t >= T_SHIP + 0.45;
    X([T, K], SHIP.x + f.dx, SHIP.y + f.dy + Math.sin(t * 2) * 4, a, -3 + f.r + Math.sin(t * 1.5) * 1, () => {
      uiCard(T, K, -175, -120, 350, 240, { r: 26, border: C.ink, lw: 4 });
      const spin = t < T_HAP ? t * 80 : T_HAP * 80 + (t - T_HAP) * 600;
      X([K], -120, -62, 1, spin, () =>
        text(K, '✦', 0, 20, { font: F.grot, weight: 700, size: 66, color: C.red, align: 'center' }),
      );
      lkBold(K, 'AI agent', -70, -54, { size: 38 });
      lkMono(K, 'happy to help!', -70, -20, { size: 20 });
      X([K], 0, 40, 1 - 0.08 * press, 0, () => {
        fillRR(K, -140, -34, 280, 68, 20, live ? C.red : C.ink);
        text(K, live ? '● LIVE' : 'Deploy', 0, 12, {
          font: F.grot,
          weight: 700,
          size: 32,
          color: '#FFFFFF',
          align: 'center',
        });
      });
      fillRR(K, -140, 88, 280, 14, 7, LK.warm2);
      if (bar > 0) fillRR(K, -140, 88, 280 * bar, 14, 7, C.red);
    });
    if (t >= T_SHIP) ripple(K, SHIP.x, SHIP.y + 40, t - T_SHIP, C.red);
  }
  // access rules card: a toggle that snaps OFF on "rules"
  function dbRules(T, K, t) {
    const a = clamp(pop(t - T_NO - 0.1, 2.6, 0.5), 0, 1.15);
    if (a <= 0) return;
    const off = t >= T_RULE,
      k = off ? E.outBack(clamp((t - T_RULE) / 0.18)) : 0;
    X([T, K], RULES.x, RULES.y + Math.sin(t * 2.1) * 4, a, 3, () => {
      uiCard(T, K, -150, -70, 300, 140, { r: 24, border: off ? C.red : C.ink, lw: 4 });
      lkMono(K, 'access rules', -124, -26, { size: 22, color: C.ink });
      fillRR(K, -124, 0, 112, 50, 25, off ? C.red : C.ink);
      circle(K, lerp(-49, -99, k), 25, 20, '#FFFFFF');
      text(K, off ? 'OFF' : 'ON', 40, 38, {
        font: F.anton,
        weight: 400,
        size: 46,
        color: off ? C.red : C.ink,
        align: 'left',
      });
      if (off) glow(T, 0, 0, 200, 110, 0.3 + 0.1 * Math.sin(t * 8));
    });
  }
  // strangers: three hooded figures walk in from the left along the floor and stop near the door, bobbing as they step
  function dbStrangers(T, K, t) {
    STR.forEach((s0, k) => {
      const dt = t - s0;
      if (dt < 0) return;
      const u = E.outCubic(clamp(dt / 0.9)),
        x = lerp(-120, 150 + k * 130, u),
        step = u < 1 ? Math.abs(Math.sin(dt * 12)) * 12 : Math.sin(t * 2 + k) * 2;
      const y = 1300 - step;
      X([T, K], x, y, 1, u < 1 ? Math.sin(dt * 12) * 4 : 0, () => {
        K.beginPath();
        K.ellipse(0, 40, 48, 24, 0, 0, TAU);
        T.beginPath();
        T.ellipse(6, 54, 46, 12, 0, 0, TAU);
        T.fillStyle = C.k30;
        T.fill();
        fillRR(K, -46, -20, 92, 80, 30, '#2A2B30');
        strokeRR(K, -46, -20, 92, 80, 30, C.ink, 4);
        circle(K, 0, -48, 40, '#2A2B30', C.ink, 4); // hood
        circle(K, 0, -42, 26, '#0B0B0D');
        circle(K, -9, -44, 4, '#FFFFFF');
        circle(K, 9, -44, 4, '#FFFFFF'); // eyes in the dark
        dbLoot(T, K, 0, 0, k, t);
        if (t >= T_EVERY + k * 0.1) {
          const g = Math.sin((t - T_EVERY) * 8 + k) * 3;
          circle(K, -9 + g, -44, 2, C.red);
          circle(K, 9 + g, -44, 2, C.red);
        }
      });
    });
    if (t >= T_ANY) lkMono(K, '// anyone', 70, 1400, { size: 24, color: C.red });
  }
  // a stranger's phone: held up in front of the hood, screen lights red with a row of someone's data
  function dbLoot(T, K, x, y, k, t) {
    const a = clamp(pop(t - T_READ - 0.2 - k * 0.12, 2.6, 0.5), 0, 1.15);
    if (a <= 0) return;
    X([T, K], x + 34, y - 6 + Math.sin(t * 3 + k) * 3, a, 12 - k * 6, () => {
      fillRR(K, -22, -36, 44, 72, 8, C.ink);
      fillRR(K, -17, -30, 34, 58, 5, C.red);
      for (let j = 0; j < 3; j++) fillRR(K, -12, -22 + j * 16, 24 - j * 5, 6, 3, '#FFFFFF');
    });
  }
  // link chip: flies from the left on "link" and plugs into the open door
  function dbLink(T, K, t) {
    const dt = t - T_LINK + 0.25;
    if (dt < 0) return;
    const u = clamp(dt / 0.3),
      x = lerp(-200, DOOR.x - 60, E.inOutCubic(u)),
      y = lerp(760, DOOR.y - 20, E.inOutCubic(u)) - Math.sin(u * Math.PI) * 120;
    const s = u >= 1 ? 1 + ring(dt - 0.3, 5, 9) * 0.08 : 1;
    X([T, K], x, y, s * (u >= 1 ? 0.85 : 1), (1 - u) * -30, () =>
      lkSticker(T, K, 'my-app.com/api/users', { size: 26, fill: '#FFFFFF', stroke: C.ink }),
    );
    if (u >= 1 && dt < 0.7)
      shock(K, DOOR.x - 60, DOOR.y - 20, dt - 0.3, { r: 90, color: C.red, lw: 5, dur: 0.35 });
  }
  // user rows fountain out of the door in arcs and land in a messy pile at left (newest row accent)
  function dbRows(T, K, t) {
    ROWS_T.forEach((t0, k) => {
      const dt = t - t0;
      if (dt < 0) return;
      const u = clamp(dt / 0.5),
        land = [80 + (k % 2) * 34, 890 + k * 40],
        src = [DOOR.x, DOOR.y];
      const x = lerp(src[0], land[0], E.outCubic(u)),
        y = lerp(src[1], land[1], u) - Math.sin(u * Math.PI) * (260 + k * 12);
      const r = u < 1 ? (1 - u) * 300 * (k % 2 ? 1 : -1) : ((k * 53) % 14) - 7 + Math.sin(t * 2 + k) * 1.2;
      X([T, K], x, y, lerp(0.3, 1, E.outCubic(u)), r, () => {
        fillRR(T, 8, 10, 400, 74, 16, C.k30);
        lkUserRow(K, 0, 0, 400, k, { hot: k === ROWS_T.filter((q) => t >= q).length - 1 });
      });
    });
    if (t >= T_EVERY)
      X([T, K], 505, 735, lkSlap(t - T_EVERY, 2) * (1 + 0.03 * Math.sin(t * 6)), -4, () => {
        fillRR(T, -180, -38, 380, 84, 42, C.k45);
        fillRR(K, -190, -46, 380, 84, 42, C.red);
        strokeRR(K, -190, -46, 380, 84, 42, C.ink, 4);
        text(K, 'READABLE BY: ANYONE', 0, 10, {
          font: F.mono,
          weight: 700,
          size: 28,
          color: '#FFFFFF',
          align: 'center',
        });
      });
  }
  const FOCUS = [
    [S0 + 0.05, TAG[0], TAG[1] + 160],
    [T_DB, DB.x, DB.y - 80],
    [T_AI, SHIP.x, SHIP.y],
    [T_NO, DOOR.x, DOOR.y],
    [T_RULE, RULES.x, RULES.y],
    [T_ANY, 260, 1260],
    [T_LINK, DOOR.x - 60, DOOR.y - 20],
    [T_READ + 0.2, 300, 900],
    [T_DATA, 420, 1000],
  ];
  const MOODS = [
    ['lean', T_DB, T_DB + 0.5],
    ['shock', T_NO + 0.05, T_NO + 0.6],
    ['panic', T_EVERY, T_DATA - 0.05],
    ['facepalm', T_DATA + 0.05, S1 - 0.2],
  ];

  SC.exD = {
    label: '// 06 — exhibit D: your database',
    readout: lkReadout('D', T_LAST),
    cam: (t) => {
      const rel = 1 - E.inOutCubic(clamp((t - S1 + 0.3) / 0.3));
      const f = focusTrack(t, FOCUS) || [540, 900];
      return {
        x: (540 - f[0]) * 0.06 * rel,
        y: (900 - f[1]) * 0.04 * rel,
        z: 1 + (0.03 * E.outCubic(P(t, S0, 0.6)) + 0.007 * (t - S0)) * rel,
      };
    },
    draw(T, K, t) {
      moodFx(T, K, t, MOODS);
      if (t >= T_EVERY) glow(T, DOOR.x, DOOR.y, 260, 240, 0.35 + 0.1 * Math.sin(t * 9));
      dbRules(T, K, t);
      dbDrum(T, K, t);
      dbDoor(T, K, t);
      dbAlarm(T, K, t);
      dbShip(T, K, t);
      dbTag(T, K, t);
      dbStrangers(T, K, t);
      dbLink(T, K, t);
      dbRows(T, K, t);
      if (t >= T_DATA) {
        stamp(K, T, 'EXHIBIT D', 500, 1060, t - T_DATA, { size: 108, rot: -7, sub: 'EVERY USER EXPOSED' });
        impact(T, K, 500, 1060, t - T_DATA - 0.06, 1.3, 8);
      }
    },
    guy: (t) => act(t, mood(t, MOODS, { focus: (t) => focusTrack(t, FOCUS) })),
  };
})();

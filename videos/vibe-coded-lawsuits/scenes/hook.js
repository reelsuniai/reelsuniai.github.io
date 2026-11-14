// ═════════════ 01 · HOOK  [0 → CUT_BOARD] "You can vibe code an app in a weekend and get sued for it by Monday." ═════════════
// Beats: frame 0 the laptop is already falling in, code streaming, the weekend calendar strip hangs on top (SAT lit) ·
//   vibe/code → the prompt types on the laptop ("build me an app"), code speeds up · app → a phone springs OUT of the laptop screen
//   on an arc to the right, LAUNCHED pill · weekend → calendar SAT→SUN, user avatars pop onto the phone one by one ·
//   sued → a SUMMONS envelope slams onto the phone (impact, crack, kick), the presenter jerks back in shock ·
//   Monday → the MON tile flips over red with "9:00" and rings, red glow, panic. Docked by the cut.
// Keeps moving: code stream, typing caret, avatars bobbing, envelope wobble, calendar tiles swaying, glow pulse.
(() => {
  const S0 = 0,
    S1 = CUT_BOARD;
  const T_VIBE = wordAt('vibe', 0, 1, 0.28),
    T_APP = wordAt('app', 0, 1, 0.94),
    T_WKND = wordAt('weekend', 0, 1, 1.29);
  const T_SUED = wordAt('sued', 0, 1, 2.09),
    T_MON = Math.min(wordAt('monday', 0, 1, 2.89), S1 - 0.45);
  const LAP = { x: 330, y: 1010, w: 540, h: 340 },
    PH = { x: 775, y: 1020, w: 300 },
    CAL = { y: 610 };
  const USERS = [0, 1, 2, 3, 4].map((k) => T_WKND + 0.12 + k * 0.13);
  kick(T_SUED + 0.03, 1.1, 1.1);
  cue(T_SUED, 'impact', 0);
  cue(T_SUED + 0.02, 'thud', -2);
  cue(T_APP, 'pop', -4);
  cue(T_MON, 'ding', -3);
  cue(T_VIBE, 'type', -8);

  // laptop: lid with a dark screen (code + prompt bar), keyboard deck in perspective
  function hkLaptop(T, K, t) {
    const land = 0.12,
      fall = t < land ? Math.pow((land - t) / 0.25, 2) * 600 : 0,
      sq = t >= land ? ring(t - land, 4, 9) * 0.08 : 0;
    const shake = ring(t - T_SUED, 6, 9) * 6;
    X([T, K], LAP.x + shake, LAP.y - fall, 1, -2 + Math.sin(t * 1.6) * 0.6, () => {
      for (const c of [T, K]) {
        c.save();
        c.translate(0, LAP.h / 2);
        c.scale(1 + sq, 1 - sq);
        c.translate(0, -LAP.h / 2);
      }
      const w = LAP.w,
        h = LAP.h;
      // deck
      fillRR(T, -w / 2 - 30, h / 2 + 10, w + 80, 50, 20, C.k45);
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
      fillRR(K, -60, h / 2 + 8, 120, 14, 7, '#BDB8AE');
      // lid
      fillRR(T, -w / 2 + 12, -h / 2 + 18, w, h, 22, C.k45);
      fillRR(K, -w / 2, -h / 2, w, h, 22, '#2A2B30');
      strokeRR(K, -w / 2, -h / 2, w, h, 22, C.ink, 4);
      const sx = -w / 2 + 18,
        sy = -h / 2 + 18,
        sw = w - 36,
        sh = h - 36;
      fillRR(K, sx, sy, sw, sh, 12, LK.dark);
      const spd = 5 + 14 * clamp((t - T_VIBE) / 0.8) * (t < T_SUED ? 1 : 0.15);
      lkCode(K, sx, sy + 70, sw, sh - 70, t, spd, 5);
      // prompt bar types "build me an app"
      fillRR(K, sx + 14, sy + 14, sw - 28, 46, 12, '#26272D');
      strokeRR(K, sx + 14, sy + 14, sw - 28, 46, 12, t >= T_APP ? C.red : '#3A3B42', 2);
      const typed = typedStr('build me an app ✦', t, T_VIBE - 0.05, 22);
      text(K, typed, sx + 32, sy + 46, {
        font: F.mono,
        weight: 700,
        size: 22,
        color: '#F6F5F1',
        align: 'left',
      });
      if (t < T_APP)
        caretAt(
          K,
          sx + 34 + measure(K, typed, { font: F.mono, weight: 700, size: 22 }),
          sy + 22,
          28,
          t,
          '#FF7A5C',
        );
      lkMono(K, '// weekend build', -w / 2 + 6, -h / 2 - 16, { size: 22 });
      for (const c of [T, K]) c.restore();
    });
  }
  // where the phone is: flies out of the laptop screen on an arc, lands right
  function hkPhonePos(t) {
    const u = clamp(pop(t - T_APP, 2.3, 0.55), 0, 1.15);
    const x = lerp(LAP.x + 40, PH.x, u),
      y = lerp(LAP.y - 40, PH.y, u) - Math.sin(clamp(u) * Math.PI) * 220;
    const hit = t >= T_SUED ? ring(t - T_SUED, 5, 8) * 22 : 0;
    return {
      x: x + Math.sin(t * 1.4) * 4,
      y: y + hit + Math.cos(t * 1.8) * 5,
      s: lerp(0.25, 1, clamp(u)),
      r: (1 - clamp(u)) * -40 + Math.sin(t * 1.3) * 1.2,
    };
  }
  // launch trail: dotted arc + speed puffs behind the phone during its flight
  function hkTrail(T, K, t) {
    const d = t - T_APP;
    if (d < 0 || d > 0.7) return;
    K.save();
    K.globalAlpha *= 1 - d / 0.7;
    for (let k = 1; k <= 8; k++) {
      const g = hkPhonePos(Math.max(T_APP, t - k * 0.035));
      circle(K, g.x, g.y, 10 - k, C.red);
    }
    K.restore();
    puff(T, LAP.x + 40, LAP.y - 60, d, 0.8, 1);
  }
  // the launched app on the phone: header, hero tile, LAUNCHED pill, users popping in; cracks once sued
  function hkPhone(T, K, t) {
    if (t < T_APP - 0.02) return;
    const g = hkPhonePos(t);
    X([T, K], g.x, g.y, g.s, g.r, () => {
      phone(T, K, 0, 0, PH.w, (K, x, y, w, h) => {
        const top = phoneHeader(K, x, y, w, 'my-app');
        fillRR(K, x + 20, top + 10, w - 40, 170, 18, '#FFE6DF');
        text(K, '✦', x + w / 2, top + 120, {
          font: F.grot,
          weight: 700,
          size: 90,
          color: C.red,
          align: 'center',
        });
        const lp = lkSlap(t - T_APP - 0.25, 1.6);
        if (lp > 0)
          X([K], x + w / 2, top + 220, lp, -4, () => {
            fillRR(K, -100, -26, 200, 52, 26, C.red);
            text(K, 'LAUNCHED', 0, 9, {
              font: F.mono,
              weight: 700,
              size: 24,
              color: '#FFFFFF',
              align: 'center',
            });
          });
        lkMono(K, 'users', x + 22, top + 290, { size: 20 });
        USERS.forEach((u, k) => {
          const a = clamp(pop(t - u, 3, 0.5), 0, 1.2);
          if (a > 0)
            X([K], x + 48 + k * 50, top + 335 + Math.sin(t * 3 + k) * 3, a, 0, () =>
              lkAvatar(K, 0, 0, 22, k + 2),
            );
        });
        skeleton(K, x + 22, top + 390, [w - 60, w - 110, w - 90], { gap: 26, h: 14 });
        if (t >= T_SUED) {
          const c = clamp((t - T_SUED) / 0.12);
          K.save();
          K.globalAlpha *= 0.25 * c;
          K.fillStyle = C.ink;
          K.fillRect(x, y, w, h);
          K.restore();
          lkCrack(K, x + w * 0.55, y + h * 0.42, 11, c, '#FFFFFF', 4);
        }
      });
    });
  }
  // "+1" floaters that rise off the phone as each user joins (weekend momentum)
  function hkPlusOnes(K, t) {
    if (t < T_APP) return;
    const g = hkPhonePos(t);
    USERS.forEach((u, k) => {
      const d = t - u;
      if (d < 0 || d > 0.8) return;
      K.save();
      K.globalAlpha *= 1 - d / 0.8;
      text(K, '+1', g.x + 110 + (k % 2) * 30, g.y - 60 - d * 160, {
        font: F.grot,
        weight: 700,
        size: 40,
        color: C.red,
        align: 'center',
      });
      K.restore();
    });
  }
  // the summons: falls from above, slams onto the phone at a tilt, then wobbles; a red wax seal
  function hkSummons(T, K, t) {
    const dt = t - T_SUED;
    if (dt < -0.16) return;
    const g = hkPhonePos(Math.max(t, T_SUED));
    const fall = dt < 0 ? Math.pow(-dt / 0.16, 2) * 900 : 0,
      s = dt < 0 ? 1.25 : 1 + ring(dt, 5, 9) * 0.06;
    X([T, K], g.x - 30, g.y + 40 - fall, s, -9 + (dt > 0 ? Math.sin(t * 2) * 1.5 : -12), () => {
      lkEnvelope(T, K, 440, 290, { label: 'COURT', title: 'CASE NO. 24-0117', sealRot: 8, lines: true });
      text(K, 'SUMMONS', -190, -60, {
        font: F.anton,
        weight: 400,
        size: 78,
        color: C.ink,
        align: 'left',
        ls: 2,
      });
    });
    if (dt >= 0) impact(T, K, g.x - 30, g.y + 40, dt, 1.3, 4);
  }
  // calendar strip: three hanging tiles; the lit day moves SAT → SUN on "weekend", MON flips red on "Monday"
  function hkTile(T, K, x, label, t, k) {
    const lit = k === 0 ? t < T_WKND : k === 1 ? t >= T_WKND && t < T_MON : t >= T_MON;
    const flip = k === 2 ? E.inOutCubic(P(t, T_MON - 0.08, 0.22)) : 0,
      sy = Math.abs(Math.cos(flip * Math.PI));
    const sw = lkSwing(t, k === 2 ? T_MON : 0.05 + k * 0.08, k === 2 ? 14 : 8, k);
    const red = k === 2 && flip > 0.5;
    X([T, K], x, CAL.y - 70, 1, sw, () => {
      line(K, 0, -30, 0, 0, C.ink, 3);
      lkPin(T, K, 0, -34, 0.7);
      for (const c of [T, K]) {
        c.save();
        c.translate(0, 80);
        c.scale(1, Math.max(0.04, sy));
        c.translate(0, -80);
      }
      fillRR(T, -95 + 8, 12, 190, 150, 20, C.k30);
      fillRR(K, -95, 0, 190, 150, 20, red ? C.red : lit ? '#FFFFFF' : LK.warm);
      strokeRR(K, -95, 0, 190, 150, 20, red || lit ? C.ink : '#CFCBC2', 4);
      fillRR(K, -95, 0, 190, 38, 20, red ? C.redD : lit ? C.ink : '#CFCBC2');
      fillRR(K, -95, 22, 190, 18, 0, red ? C.redD : lit ? C.ink : '#CFCBC2');
      text(K, label, 0, 112, {
        font: F.grot,
        weight: 700,
        size: 58,
        color: red ? '#FFFFFF' : lit ? C.ink : '#B9B5AC',
        align: 'center',
        ls: -1,
      });
      if (red) lkMono(K, '9:00 AM', 0, 140, { size: 20, color: '#FFE3DC', align: 'center' });
      for (const c of [T, K]) c.restore();
    });
  }
  // weekend desk: a mug and an energy can (it tips over on "sued"), a timer card rolling the hours spent building
  function hkDesk(T, K, t) {
    const a = clamp(pop(t - 0.2, 2.6, 0.5), 0, 1.15);
    if (a <= 0) return;
    X([T, K], 130, 1395, a * 0.72, Math.sin(t * 1.3) * 1.5, () => lkMug(T, K, t, { label: 'v1' }));
    const tip = t >= T_SUED ? E.outBack(clamp((t - T_SUED - 0.05) / 0.3)) : 0;
    X([T, K], 245 + tip * 30, 1395, a * 0.72, tip * 88, () => lkCan(T, K, t, 0));
    const hours = 48 * E.inOutCubic(clamp(t / (T_WKND + 0.6)));
    const ta = clamp(pop(t - 0.35, 2.4, 0.55), 0, 1.15);
    if (ta > 0)
      X([T, K], 470, 1330 + Math.sin(t * 2) * 3, ta * 0.92, -2 + ring(t - T_SUED, 6, 8) * 6, () =>
        lkTimerCard(T, K, t, hours, t >= T_SUED),
      );
  }
  const FOCUS = [
    [0, LAP.x, LAP.y - 40],
    [T_APP + 0.1, PH.x, PH.y - 60],
    [T_SUED, PH.x - 40, PH.y + 30],
    [T_MON, 760, CAL.y + 10],
  ];
  const MOODS = [
    ['wave', 0.05, T_APP - 0.1],
    ['shock', T_SUED, T_SUED + 0.55],
    ['panic', T_MON, S1 - 0.22],
  ];
  const camX = (t) =>
      springTo(
        t,
        [
          [-1e9, 30],
          [T_APP, -30],
          [T_SUED, -20],
          [T_MON, -10],
        ],
        1.6,
        0.6,
      ),
    camY = (t) =>
      springTo(
        t,
        [
          [-1e9, 0],
          [T_MON, 30],
        ],
        1.6,
        0.6,
      );

  SC.hook = {
    label: '// 01 — the weekend app',
    readout: (t) => ({ k: 'CASE', v: t >= T_SUED ? 'OPEN' : '—', hot: t >= T_SUED }),
    cam: (t) => {
      const rel = 1 - E.inOutCubic(clamp((t - S1 + 0.3) / 0.3));
      return {
        x: camX(t) * rel,
        y: camY(t) * rel,
        z: 1 + (0.04 * E.outCubic(P(t, 0, 0.6)) + 0.012 * t) * rel,
      };
    },
    draw(T, K, t) {
      moodFx(T, K, t, MOODS);
      if (t >= T_MON)
        glow(T, 760, CAL.y + 10, 260, 140, (0.5 + 0.15 * Math.sin(t * 18)) * clamp((t - T_MON) / 0.15));
      ['SAT', 'SUN', 'MON'].forEach((d, k) => hkTile(T, K, 300 + k * 230, d, t, k));
      hkDesk(T, K, t);
      hkLaptop(T, K, t);
      hkTrail(T, K, t);
      hkPhone(T, K, t);
      hkPlusOnes(K, t);
      hkSummons(T, K, t);
      if (t >= T_MON)
        burst(K, 760, CAL.y + 10, t - T_MON, { n: 12, r0: 120, r1: 190, color: C.red, lw: 6, dur: 0.35 });
    },
    guy: (t) => act(t, mood(t, MOODS, { focus: (t) => focusTrack(t, FOCUS) })),
  };
})();

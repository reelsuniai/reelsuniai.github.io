// ═════════════ 03 · EXHIBIT A  [CUT_A → CUT_B] accessibility ═════════════
// "The first is accessibility. If a blind user's screen reader can't get through your signup, that's what law firms scan for, and
//  AI builders skip the labels by default."
// Beats: first → EXHIBIT A tag swings onto its pin (top right) · accessibility → the signup phone rises, an access badge slaps on ·
//   blind → the screen curtain falls (phone goes dark), a focus ring appears · user's / screen / reader → the ring hops field to
//   field, a speech bubble types what the reader announces ("Edit text." "Button." "Image.") · can't → the ring hits the Sign up
//   button, bounces off (red X, shake) · through → bounces again · signup → the button glows red + "unlabeled" sticker ·
//   that's → curtain lifts · law firms → a scanner lens slides in from the left · scan → its beam sweeps down the phone, a red flag
//   pops at every field, issue counter rolls · AI builders → an AI builder card pops at right, typing · skip → three label stickers
//   shoot out of it toward the fields and fall short, tumbling away · labels → they fall out of frame · default → EXHIBIT A stamp.
// Keeps moving: tag swing, ring pulse, bubble caret, lens bob + glint, flags fluttering, AI dots, stickers tumbling.
(() => {
  const S0 = CUT_A,
    S1 = CUT_B;
  const W_ = (w, fb, from = S0) => wordAt(w, from, 1, fb);
  const T_FIRST = W_('first', S0 + 0.2),
    T_ACC = W_('accessibility', S0 + 0.7),
    T_BLIND = W_('blind', S0 + 2.0);
  const T_USER = W_('user', S0 + 2.25),
    T_SCR = W_('screen', S0 + 2.7),
    T_READ = W_('reader', S0 + 2.95);
  const T_CANT = W_('can', S0 + 3.2, T_READ),
    T_THRU = W_('through', S0 + 3.7),
    T_SIGN = W_('sign', S0 + 4.0, T_THRU);
  const T_THATS = W_('that', S0 + 4.6, T_SIGN),
    T_LAW = W_('law', S0 + 5.0),
    T_SCAN = W_('scan', S0 + 5.4);
  const T_AI = W_('ai', S0 + 6.4, T_SCAN),
    T_SKIP = W_('skip', S0 + 6.9),
    T_LAB = W_('labels', S0 + 7.4);
  const T_DEF = Math.min(W_('default', S0 + 7.9), S1 - 0.5);
  const PHN = { x: 405, y: 975, w: 430 },
    TAG = [880, 570],
    BUB = { x: 668, y: 860, w: 345 };
  const FIELDS = [
    { k: 'email', t: T_USER },
    { k: 'password', t: T_SCR },
    { k: 'image', t: T_READ },
    { k: 'button', t: T_CANT },
  ];
  const SAYS = [
    ['"Edit text."', T_USER],
    ['"Edit text."', T_SCR],
    ['"Image."', T_READ],
    ['"Button."', T_CANT],
    ['"Button."', T_THRU],
  ];
  const BEAM = [T_SCAN, T_SCAN + 0.85];
  kick(T_CANT + 0.03, 0.6, 0.7);
  kick(T_DEF + 0.03, 1, 1);
  cue(T_FIRST, 'swoosh', -6);
  cue(T_ACC, 'pop', -3);
  cue(T_BLIND, 'thud', -5);
  cue(T_CANT, 'thud', -2);
  cue(T_THRU, 'click', -4);
  cue(T_LAW, 'swoosh', -5);
  cue(T_SCAN, 'riser', -7);
  cue(T_AI, 'pop', -4);
  cue(T_SKIP, 'swoosh', -5);
  cue(T_DEF, 'stamp', 0);

  // the phone's screen rect for time t (rises on "accessibility", shakes when the ring bounces)
  const phY = (t) =>
    PHN.y + (1 - clamp(pop(t - S0 - 0.12, 2.0, 0.62), 0, 1.2)) * 1100 + Math.sin(t * 1.5) * 4;
  const phX = (t) => PHN.x + (ring(t - T_CANT, 7, 8) + ring(t - T_THRU, 7, 8)) * 10;
  const phH = (PHN.w * 16) / 9 + PHN.w * 0.06,
    bz = PHN.w * 0.035;
  const scr = (t) => ({
    x: phX(t) - PHN.w / 2 + bz,
    y: phY(t) - phH / 2 + bz,
    w: PHN.w - 2 * bz,
    h: phH - 2 * bz,
  });
  // field rects in scene space (from the screen rect): email, password, image, button
  function axRects(t) {
    const s = scr(t),
      x = s.x + 26,
      w = s.w - 52,
      top = s.y + 0.19 * s.h;
    return [
      { x, y: top + 70, w, h: 64 },
      { x, y: top + 170, w, h: 64 },
      { x: s.x + s.w / 2 - 70, y: top + 262, w: 140, h: 110 },
      { x, y: top + 410, w, h: 72 },
    ];
  }
  const curtain = (t) => win(t, T_BLIND - 0.05, T_THATS + 0.1, 0.25, 0.3);
  // the signup form (drawn inside the phone screen, scene coords)
  function axForm(K, x, y, w, h, t) {
    const top = phoneHeader(K, x, y, w, 'Create account'),
      R = axRects(t);
    lkMono(K, 'sign up in 10 seconds', x + w / 2, top + 44, { size: 18, align: 'center' });
    R.slice(0, 2).forEach((r, i) => {
      fillRR(K, r.x, r.y, r.w, r.h, 14, '#FFFFFF');
      strokeRR(K, r.x, r.y, r.w, r.h, 14, '#CFCBC2', 3);
      text(K, i ? '••••••••' : 'you@email.com', r.x + 20, r.y + 41, {
        font: F.grot,
        weight: 500,
        size: 24,
        color: '#B9B5AC',
        align: 'left',
      });
    });
    const im = R[2];
    fillRR(K, im.x, im.y, im.w, im.h, 16, '#FFE6DF');
    text(K, '✦', im.x + im.w / 2, im.y + 74, {
      font: F.grot,
      weight: 700,
      size: 60,
      color: C.red,
      align: 'center',
    });
    const b = R[3],
      hot = t >= T_SIGN,
      pulse = hot ? 0.5 + 0.5 * Math.sin((t - T_SIGN) * 14) : 0;
    fillRR(K, b.x, b.y, b.w, b.h, 36, hot ? (pulse > 0.5 ? C.red : C.redD) : C.ink);
    text(K, '→', b.x + b.w / 2, b.y + 50, {
      font: F.grot,
      weight: 700,
      size: 40,
      color: '#FFFFFF',
      align: 'center',
    }); // icon-only button, no label
    skeleton(K, x + 60, b.y + 120, [w - 120, w - 180], { gap: 26, h: 12 });
    const c = curtain(t); // screen curtain: what a blind user's screen reader "sees"
    if (c > 0) {
      K.save();
      K.globalAlpha *= 0.9 * c;
      K.fillStyle = '#0B0B0D';
      K.fillRect(x, y, w, h);
      K.restore();
      if (c > 0.6)
        lkMono(K, 'SCREEN READER ON', x + w / 2, y + h - 40, { size: 18, color: '#8F8F8F', align: 'center' });
    }
  }
  // the focus ring: hops to each field on its word, then bounces off the button on "can't" / "through"
  function axRing(K, t) {
    if (t < T_USER - 0.05 || t > T_THATS + 0.2) return;
    const R = axRects(t);
    let i = 0;
    FIELDS.forEach((f, k) => {
      if (t >= f.t) i = k;
    });
    const prev = R[Math.max(0, i - 1)],
      cur = R[i],
      u = E.outBack(clamp((t - FIELDS[i].t) / 0.18));
    const lerpR = (a, b, q) => ({
      x: lerp(a.x, b.x, q),
      y: lerp(a.y, b.y, q),
      w: lerp(a.w, b.w, q),
      h: lerp(a.h, b.h, q),
    });
    let r = i ? lerpR(prev, cur, u) : cur;
    const bounce =
      Math.max(0, Math.sin(clamp((t - T_CANT) / 0.3) * Math.PI)) * (t < T_CANT + 0.3 ? 1 : 0) +
      Math.max(0, Math.sin(clamp((t - T_THRU) / 0.3) * Math.PI)) * (t >= T_THRU && t < T_THRU + 0.3 ? 1 : 0);
    r = { x: r.x, y: r.y - bounce * 90, w: r.w, h: r.h };
    const pul = 1 + 0.04 * Math.sin(t * 10),
      hot = t >= T_CANT;
    K.save();
    K.translate(r.x + r.w / 2, r.y + r.h / 2);
    K.scale(pul, pul);
    strokeRR(K, -r.w / 2 - 10, -r.h / 2 - 10, r.w + 20, r.h + 20, 22, hot ? C.red : '#7EE0B5', 7);
    K.restore();
    if (t >= T_CANT) {
      const b = R[3],
        p = clamp((t - T_CANT) / 0.15);
      cross(K, b.x + b.w + 6, b.y - 10, 44, p, C.red, 9);
    }
  }
  // the speech bubble of the screen reader: types the last two announcements, caret blinking
  function axBubble(T, K, t) {
    const a = clamp(pop(t - T_USER + 0.05, 2.6, 0.55), 0, 1.15) * (1 - E.inBack(clamp((t - T_LAW) / 0.25)));
    if (a <= 0.01) return;
    const said = SAYS.filter((s) => t >= s[1]).slice(-3);
    X([T, K], BUB.x + BUB.w / 2, BUB.y + 110 + Math.sin(t * 2.2) * 4, a, -2, () => {
      fillRR(T, -BUB.w / 2 + 10, -110 + 14, BUB.w, 220, 28, C.k45);
      fillRR(K, -BUB.w / 2, -110, BUB.w, 220, 28, LK.dark);
      K.beginPath();
      K.moveTo(-BUB.w / 2, 30);
      K.lineTo(-BUB.w / 2 - 34, 64);
      K.lineTo(-BUB.w / 2 + 6, 70);
      K.closePath();
      K.fillStyle = LK.dark;
      K.fill();
      lkMono(K, '// screen reader says', -BUB.w / 2 + 24, -72, { size: 20, color: '#8F8F8F' });
      said.forEach((s, k) => {
        const last = k === said.length - 1,
          str = last ? typedStr(s[0], t, s[1], 30) : s[0];
        text(K, str, -BUB.w / 2 + 24, -22 + k * 52, {
          font: F.mono,
          weight: 700,
          size: 32,
          color: last ? (s[0] === '"Button."' ? '#FF7A5C' : '#F6F5F1') : '#6B6B70',
          align: 'left',
        });
      });
      if (t >= T_SIGN)
        X([K], 70, 118, lkSlap(t - T_SIGN, 2), -8, () =>
          lkSticker(null, K, 'no label', { fill: C.red, color: '#FFFFFF', stroke: C.ink }),
        );
    });
  }
  // sound waves: three arcs pulse out of the bubble's right edge while the reader is speaking
  function axWaves(K, t) {
    if (t < T_USER || t > T_LAW) return;
    const cx = BUB.x + BUB.w + 6,
      cy = BUB.y + 60;
    for (let k = 0; k < 3; k++) {
      const ph = (t * 1.8 + k / 3) % 1;
      K.save();
      K.globalAlpha *= 1 - ph;
      K.lineWidth = 5;
      K.strokeStyle = C.ink;
      K.beginPath();
      K.arc(cx - 30, cy, 20 + ph * 40, -0.7, 0.7);
      K.stroke();
      K.restore();
    }
  }
  // the scanner: a big lens on a handle slides in from the left on "law firms"; on "scan" it sweeps down the phone with a beam
  function axLens(T, K, t) {
    if (t < T_LAW - 0.02) return;
    const inP = clamp(pop(t - T_LAW, 2.2, 0.6), 0, 1.1),
      s = scr(t);
    const sweep = E.inOutCubic(P(t, BEAM[0], BEAM[1] - BEAM[0])),
      back = E.inOutCubic(P(t, T_AI - 0.1, 0.4));
    const lx = lerp(-260, s.x + s.w + 40, inP) - back * 1100,
      ly = lerp(s.y + 120, s.y + s.h - 120, sweep) + back * 80;
    if (back >= 1) return;
    if (t >= BEAM[0] && t < BEAM[1] + 0.15) {
      // beam across the phone at the lens height
      const a = 1 - clamp((t - BEAM[1]) / 0.15);
      K.save();
      K.globalAlpha *= 0.85 * a;
      K.fillStyle = 'rgba(255,59,31,0.18)';
      K.fillRect(s.x - 10, ly - 40, s.w + 20, 80);
      line(K, s.x - 10, ly, s.x + s.w + 10, ly, C.red, 5);
      K.restore();
    }
    X([T, K], lx, ly, 1, -28 + Math.sin(t * 2.6) * 3, () => {
      fillRR(T, 70, 40, 190, 42, 21, C.k45);
      fillRR(K, 60, -21, 200, 42, 21, C.ink);
      circle(T, 12, 16, 84, C.k45);
      circle(K, 0, 0, 84, 'rgba(255,255,255,0.35)', C.ink, 14);
      circle(K, 0, 0, 70, null, '#FFFFFF', 3);
      K.save();
      K.globalAlpha *= 0.7;
      K.strokeStyle = '#FFFFFF';
      K.lineWidth = 7;
      K.lineCap = 'round';
      K.beginPath();
      K.arc(0, 0, 54, -2.4 + Math.sin(t * 3) * 0.2, -1.6 + Math.sin(t * 3) * 0.2);
      K.stroke();
      K.restore();
    });
    lkMono(K, '// automated scan', lx - 40, ly + 120, { size: 22, color: C.ink });
  }
  // red flags at each field once the beam has passed it; an issue counter rolls
  function axFlags(T, K, t) {
    const R = axRects(t),
      s = scr(t);
    let n = 0;
    R.forEach((r, k) => {
      const tp = BEAM[0] + (BEAM[1] - BEAM[0]) * clamp((r.y + r.h / 2 - s.y - 120) / (s.h - 240));
      if (t < tp) return;
      n++;
      lkFlag(K, r.x + r.w - 10, r.y + 10, clamp((t - tp) / 0.2), t, k);
      if (t - tp < 0.4)
        burst(K, r.x + r.w - 10, r.y, t - tp, { n: 8, r0: 20, r1: 50, color: C.red, lw: 4, dur: 0.25 });
    });
    if (t >= BEAM[0])
      X([T, K], 150, 1360, 1 + ring(t - BEAM[0], 3, 8) * 0.1, 0, () => {
        fillRR(T, -98, -34, 210, 76, 38, C.k45);
        fillRR(K, -105, -42, 210, 76, 38, '#FFFFFF');
        strokeRR(K, -105, -42, 210, 76, 38, C.red, 4);
        text(K, `${n} issue${n === 1 ? '' : 's'}`, 0, 10, {
          font: F.mono,
          weight: 700,
          size: 30,
          color: C.red,
          align: 'center',
        });
      });
  }
  // AI builder card: pops at right on "AI builders", sparkle spins, typing dots; on "skip" it fires label stickers that fall short
  function axAI(T, K, t) {
    const a = clamp(pop(t - T_AI, 2.6, 0.5), 0, 1.2);
    if (a <= 0) return;
    const cx = 835,
      cy = 930 + Math.sin(t * 2) * 5,
      recoil = ring(t - T_SKIP, 6, 8) * 14;
    X([T, K], cx + recoil, cy, a, 4 + Math.sin(t * 1.6) * 1.5, () => {
      uiCard(T, K, -150, -95, 300, 190, { r: 26, border: C.ink, lw: 4 });
      X([K], -95, -30, 1, t * 90, () =>
        text(K, '✦', 0, 18, { font: F.grot, weight: 700, size: 64, color: C.red, align: 'center' }),
      );
      lkBold(K, 'AI builder', -50, -18, { size: 36 });
      lkMono(K, 'shipping fast…', -50, 18, { size: 20 });
      typingDots(K, -40, 58, t);
      fillRR(K, 30, 46, 96, 26, 13, LK.warm2);
      fillRR(K, 30, 46, 96 * ((t * 0.9) % 1), 26, 13, C.red);
    });
  }
  const LABELS = ['label="Email"', 'label="Password"', 'label="Sign up"'];
  function axLabels(T, K, t) {
    if (t < T_SKIP - 0.02) return;
    const R = axRects(t);
    LABELS.forEach((lab, k) => {
      const t0 = T_SKIP + k * 0.09,
        dt = t - t0;
      if (dt < 0) return;
      const tgt = R[k === 2 ? 3 : k],
        sx = 760,
        sy = 930;
      const fly = clamp(dt / 0.32),
        ex = lerp(sx, tgt.x + tgt.w + 40, E.outCubic(fly)),
        ey = lerp(sy, tgt.y + tgt.h / 2, E.outCubic(fly)) - Math.sin(fly * Math.PI) * 120;
      const f =
        dt > 0.32
          ? gravityFall(t, t0 + 0.32, -120 - k * 60, -180, 220 + k * 90, 4200)
          : { dx: 0, dy: 0, r: 0 };
      if (f.dy > 1500) return;
      X([T, K], ex + f.dx, ey + f.dy, 1, f.r + (1 - fly) * -20, () =>
        lkSticker(T, K, lab, { size: 26, fill: '#FFF7D6' }),
      );
      if (dt > 0.32 && dt < 0.6) puff(T, ex, ey, dt - 0.32, 0.6, -1);
    });
  }
  // the Tab key a screen reader user presses to move between fields: pressed on every hop, red once stuck, drops away for the scan
  const TABS = [T_USER, T_SCR, T_READ, T_CANT, T_THRU];
  function axTab(T, K, t) {
    const a = clamp(pop(t - T_BLIND, 2.6, 0.5), 0, 1.15);
    if (a <= 0) return;
    const f = t >= T_LAW ? gravityFall(t, T_LAW, -150, -200, -120, 5000) : { dx: 0, dy: 0, r: 0 };
    if (f.dy > 900) return;
    let pr = 0;
    for (const x of TABS) pr = Math.max(pr, win(t, x - 0.02, x + 0.12, 0.03, 0.12));
    X([T, K], 190 + f.dx, 1345 + f.dy, a * 0.9, -4 + f.r + Math.sin(t * 1.7) * 1, () =>
      lkKeycap(T, K, 'tab', pr, { hot: t >= T_CANT }),
    );
    if (t < T_LAW)
      lkMono(K, `presses: ${TABS.filter((x) => t >= x).length}`, 110 + f.dx, 1250 + f.dy, {
        size: 20,
        color: t >= T_CANT ? C.red : LK.grey,
      });
  }
  const FOCUS = [
    [S0 + 0.05, TAG[0], TAG[1] + 160],
    [T_ACC + 0.05, PHN.x, PHN.y - 100],
    [T_USER, (t) => axRects(t)[0].x + 150, (t) => axRects(t)[0].y],
    [T_READ, BUB.x + 120, BUB.y + 100],
    [T_CANT, (t) => axRects(t)[3].x + 160, (t) => axRects(t)[3].y],
    [T_LAW, 260, 900],
    [T_SCAN, PHN.x, PHN.y],
    [T_AI, 835, 930],
    [T_SKIP + 0.2, PHN.x + 80, PHN.y + 120],
    [T_DEF, PHN.x, PHN.y],
  ];
  const MOODS = [
    ['lean', T_BLIND, T_BLIND + 0.6],
    ['shock', T_CANT, T_CANT + 0.5],
    ['thinking', T_LAW - 0.1, T_SCAN - 0.05, { bubble: [880, 1060] }],
    ['facepalm', T_SKIP + 0.1, T_DEF - 0.05],
    ['no', T_DEF, S1 - 0.15],
  ];

  SC.exA = {
    label: '// 03 — exhibit A: accessibility',
    readout: lkReadout('A', T_FIRST),
    cam: (t) => {
      const rel = 1 - E.inOutCubic(clamp((t - S1 + 0.3) / 0.3));
      const f = focusTrack(t, FOCUS) || [540, 900];
      return {
        x: (540 - f[0]) * 0.06 * rel,
        y: (900 - f[1]) * 0.04 * rel,
        z: 1 + (0.03 * E.outCubic(P(t, S0, 0.6)) + 0.006 * (t - S0) + 0.03 * curtain(t)) * rel,
      };
    },
    draw(T, K, t) {
      moodFx(T, K, t, MOODS);
      // exhibit tag on its pin, top right
      if (t >= T_FIRST - 0.15) {
        const d = Math.max(0, T_FIRST - t) / 0.15;
        X([T, K], TAG[0], TAG[1] - d * d * 400, 1, 0, () =>
          lkTag(T, K, lkSwing(t, T_FIRST, 22, 1), {
            letter: 'A',
            w: 160,
            h: 210,
            str: 34,
            hot: t < T_ACC + 0.6,
          }),
        );
        lkPin(T, K, TAG[0], TAG[1] - d * d * 400);
      }
      // access badge sticker
      const bs = lkSlap(t - T_ACC - 0.2, 2);
      phone(T, K, phX(t), phY(t), PHN.w, (K, x, y, w, h) => axForm(K, x, y, w, h, t));
      if (bs > 0)
        X([T, K], scr(t).x - 10, scr(t).y + 60, bs, -12 + Math.sin(t * 2) * 2, () => {
          circle(T, 8, 10, 56, C.k45);
          circle(K, 0, 0, 56, '#2F5BD8', C.ink, 4);
          circle(K, 0, -24, 9, '#FFFFFF');
          line(K, -28, -8, 28, -8, '#FFFFFF', 7);
          line(K, 0, -8, 0, 14, '#FFFFFF', 7);
          line(K, 0, 14, -16, 36, '#FFFFFF', 7);
          line(K, 0, 14, 16, 36, '#FFFFFF', 7);
        });
      axTab(T, K, t);
      axRing(K, t);
      axBubble(T, K, t);
      axWaves(K, t);
      axFlags(T, K, t);
      axLens(T, K, t);
      axAI(T, K, t);
      axLabels(T, K, t);
      if (t >= T_DEF) {
        stamp(K, T, 'EXHIBIT A', PHN.x + 40, PHN.y + 40, t - T_DEF, {
          size: 104,
          rot: -9,
          sub: 'MISSING LABELS',
        });
        impact(T, K, PHN.x + 40, PHN.y + 40, t - T_DEF - 0.08, 1, 3);
      }
    },
    guy: (t) => act(t, mood(t, MOODS, { focus: (t) => focusTrack(t, FOCUS) })),
  };
})();

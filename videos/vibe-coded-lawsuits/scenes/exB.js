// ═════════════ 04 · EXHIBIT B  [CUT_B → CUT_C] privacy ═════════════
// "The second is privacy. The moment you collect an email, you need a privacy policy that matches what your app actually does,
//  and most vibe coded apps don't have one."
// Beats: second → EXHIBIT B tag swings onto its pin (top left) · privacy → a waitlist card slams in (top right) · collect → the
//   email types into it · email → Join is pressed, an envelope arcs down into a glass data jar (bottom left); more envelopes keep
//   dropping in (the jar fills, counter rolls) · privacy policy → a policy ledger slides in from the right, the waitlist card steps
//   up and shrinks · matches → two columns POLICY SAYS / APP DOES, row 1 "email" ✓ = ✓ · actually → the app column grows red rows
//   (location, device ID, contacts), each with ≠ and an empty policy cell · does → mismatch counter slams · most vibe coded apps →
//   the ledger flips over to the app's /privacy page · don't have one → 404 slams + EXHIBIT B stamp (kick).
// Keeps moving: tag swing, caret, envelopes dropping + jar bob, ≠ marks pulsing, 404 jitter, presenter acting per phrase.
(() => {
  const S0 = CUT_B,
    S1 = CUT_C;
  const W_ = (w, fb, from = S0) => wordAt(w, from, 1, fb);
  const T_SEC = W_('second', S0 + 0.15),
    T_PRIV = W_('privacy', S0 + 0.7),
    T_COLL = W_('collect', S0 + 2.0),
    T_MAIL = W_('email', S0 + 2.45);
  const T_POL = W_('policy', S0 + 3.7),
    T_MATCH = W_('matches', S0 + 4.3),
    T_ACT = W_('actually', S0 + 5.1),
    T_DOES = W_('does', S0 + 5.6, T_ACT);
  const T_MOST = W_('most', S0 + 6.4, T_DOES),
    T_DONT = W_('don', S0 + 7.3, T_MOST),
    T_ONE = Math.min(W_('one', S0 + 7.8, T_DONT), S1 - 0.45);
  const TAG = [205, 570],
    WL = { x: 420, y: 585, w: 570, h: 190 },
    JAR = { x: 230, y: 1180 },
    LG = { x: 395, y: 820, w: 610, h: 470 };
  const ROWS = [
    ['email', 'email', T_MATCH, true],
    ['—', 'location', T_ACT, false],
    ['—', 'device ID', T_ACT + 0.22, false],
    ['—', 'contacts', T_DOES + 0.05, false],
  ];
  const DROPS = [T_MAIL + 0.05];
  for (let k = 1; k < 9; k++) DROPS.push(T_MAIL + 0.45 + k * 0.42);
  const T_FLIP = T_MOST - 0.05;
  kick(T_ACT + 0.03, 0.5, 0.5);
  kick(T_ONE + 0.03, 1, 1);
  cue(T_SEC, 'swoosh', -6);
  cue(T_PRIV, 'thud', -3);
  cue(T_COLL, 'type', -7);
  cue(T_MAIL, 'click', -2);
  cue(T_MAIL + 0.35, 'pop', -5);
  cue(T_POL - 0.1, 'swoosh', -5);
  cue(T_MATCH, 'tick', -4);
  cue(T_ACT, 'thud', -4);
  cue(T_FLIP, 'swoosh', -5);
  cue(T_DONT, 'thud', -3);
  cue(T_ONE, 'stamp', 0);
  kick(T_DONT + 0.03, 0.5, 0.5);

  const wlIn = (t) => clamp(pop(t - S0 - 0.12, 2.4, 0.55), 0, 1.15);
  const wlGeom = (t) => {
    const m = E.inOutCubic(P(t, T_POL - 0.15, 0.45));
    return { x: lerp(WL.x, 470, m), y: lerp(WL.y, 560, m), s: lerp(1, 0.78, m) };
  };
  // waitlist card: header, email field typing on "collect", Join button pressed on "email"
  function pvWaitlist(T, K, t) {
    const a = wlIn(t);
    if (a <= 0) return;
    const g = wlGeom(t),
      press = win(t, T_MAIL - 0.03, T_MAIL + 0.12, 0.03, 0.1);
    X(
      [T, K],
      g.x + (WL.w / 2) * g.s,
      g.y + (WL.h / 2) * g.s + (1 - clamp(a)) * -500,
      g.s * lerp(0.7, 1, clamp(a)),
      Math.sin(t * 1.4) * 0.6,
      () => {
        const x0 = -WL.w / 2,
          y0 = -WL.h / 2;
        uiCard(T, K, x0, y0, WL.w, WL.h, { r: 26, border: C.ink, lw: 4 });
        lkMono(K, '// join the waitlist', x0 + 28, y0 + 42, { size: 22 });
        liveDot(K, -x0 - 40, y0 + 34, 7, t);
        fillRR(K, x0 + 26, y0 + 70, WL.w - 230, 86, 16, '#FFFFFF');
        strokeRR(K, x0 + 26, y0 + 70, WL.w - 230, 86, 16, t >= T_COLL ? C.ink : '#CFCBC2', 3);
        const typed = typedStr('maya@gmail.com', t, T_COLL - 0.05, 30);
        text(K, typed || 'your email', x0 + 48, y0 + 126, {
          font: F.grot,
          weight: 500,
          size: 34,
          color: typed ? C.ink : '#B9B5AC',
          align: 'left',
        });
        if (t < T_MAIL && t > T_COLL - 0.1)
          caretAt(
            K,
            x0 + 52 + measure(K, typed, { font: F.grot, weight: 500, size: 34 }),
            y0 + 92,
            44,
            t,
            C.red,
          );
        X([K], -x0 - 100, y0 + 113, 1 - 0.08 * press, 0, () => {
          fillRR(K, -82, -43, 164, 86, 18, t >= T_MAIL ? C.red : C.ink);
          text(K, 'Join', 0, 12, { font: F.grot, weight: 700, size: 36, color: '#FFFFFF', align: 'center' });
        });
      },
    );
    if (t >= T_MAIL) ripple(K, g.x + (WL.w - 100) * g.s, g.y + (WL.h / 2 + 18) * g.s, t - T_MAIL, C.red);
  }
  // one envelope flying from the waitlist card to the jar (arc), then resting inside it at slot k
  const jarSlot = (k) => [
    JAR.x - 66 + (k % 3) * 66 + (Math.floor(k / 3) % 2) * 30,
    JAR.y + 100 - Math.floor(k / 3) * 42,
  ];
  function pvEnvelope(T, K, t, k) {
    const t0 = DROPS[k],
      dt = t - t0;
    if (dt < 0) return;
    const g = wlGeom(t0),
      src = [g.x + (WL.w - 100) * g.s, g.y + 110 * g.s],
      dst = jarSlot(k),
      u = clamp(dt / 0.42);
    const x = lerp(src[0], dst[0], E.inOutCubic(u)),
      y = lerp(src[1], dst[1], E.inCubic(u)) - Math.sin(u * Math.PI) * 180;
    const sq = u >= 1 ? ring(dt - 0.42, 5, 9) * 0.1 : 0,
      r = u < 1 ? (1 - u) * 260 * (k % 2 ? 1 : -1) : ((k * 37) % 30) - 15 + Math.sin(t * 2 + k) * 2;
    X([T, K], x, y, (u < 1 ? lerp(1.1, 0.62, u) : 0.62) * (1 + sq), r, () => {
      fillRR(K, -50, -32, 100, 64, 8, k === 0 ? C.red : '#FFFFFF');
      strokeRR(K, -50, -32, 100, 64, 8, C.ink, 4);
      K.beginPath();
      K.moveTo(-50, -32);
      K.lineTo(0, 6);
      K.lineTo(50, -32);
      K.lineWidth = 4;
      K.strokeStyle = k === 0 ? '#FFFFFF' : C.ink;
      K.stroke();
    });
  }
  // the glass jar: lid, glass outline with a streak, a "collected" label with a rolling count
  function pvJar(T, K, t, back) {
    const a = clamp(pop(t - T_MAIL + 0.25, 2.4, 0.55), 0, 1.15);
    if (a <= 0) return;
    const bob = Math.sin(t * 1.8) * 4;
    X([T, K], JAR.x, JAR.y + bob, a * 1.12, Math.sin(t * 1.3) * 1, () => {
      if (back) {
        fillRR(T, -128, -126, 270, 300, 50, C.k30);
        fillRR(K, -135, -140, 270, 300, 50, 'rgba(255,255,255,0.55)');
        return;
      }
      strokeRR(K, -135, -140, 270, 300, 50, C.ink, 5);
      fillRR(K, -110, -178, 220, 46, 12, '#8E8676');
      strokeRR(K, -110, -178, 220, 46, 12, C.ink, 4);
      K.save();
      K.globalAlpha *= 0.6;
      line(K, -105, -100, -105, 110, '#FFFFFF', 10);
      K.restore();
      const n = DROPS.filter((d) => t >= d + 0.42).length;
      X(
        [K],
        0,
        200,
        1 +
          ring(
            lkSince(
              t,
              DROPS.map((d) => d + 0.42),
            ),
            4,
            9,
          ) *
            0.12,
        0,
        () => {
          fillRR(K, -120, -30, 240, 60, 30, '#FFFFFF');
          strokeRR(K, -120, -30, 240, 60, 30, C.ink, 3);
          text(K, `${n} emails`, 0, 11, {
            font: F.mono,
            weight: 700,
            size: 28,
            color: C.ink,
            align: 'center',
          });
        },
      );
    });
  }
  // a little tag dangling from the jar's lid on a string: what the user was (not) told
  function pvJarTag(T, K, t) {
    if (t < T_MAIL + 0.6) return;
    const sw = lkSwing(t, T_MAIL + 0.6, 24, 6);
    X([T, K], JAR.x + 120, JAR.y - 180, 1, sw, () => {
      line(K, 0, 0, 0, 60, C.ink, 3);
      fillRR(T, -70 + 6, 60 + 8, 140, 48, 10, C.k30);
      fillRR(K, -70, 60, 140, 48, 10, LK.manila);
      strokeRR(K, -70, 60, 140, 48, 10, C.ink, 3);
      lkMono(K, 'told: nothing', 0, 92, { size: 18, color: C.ink, align: 'center' });
    });
  }
  // the ledger: POLICY SAYS / APP DOES. Slides in on "policy", rows on their words, flips into the 404 page on "most"
  const lgFlip = (t) => E.inOutCubic(P(t, T_FLIP, 0.36));
  function pvLedger(T, K, t) {
    const inP = clamp(pop(t - T_POL + 0.15, 2.2, 0.6), 0, 1.15);
    if (inP <= 0) return;
    const fl = lgFlip(t),
      sx = Math.abs(Math.cos(fl * Math.PI)),
      back = fl > 0.5;
    const x = LG.x + (1 - inP) * 900,
      y = LG.y + Math.sin(t * 1.6) * 4;
    X(
      [T, K],
      x + LG.w / 2,
      y + LG.h / 2,
      1 + (back ? ring(t - T_ONE, 4, 8) * 0.04 : 0),
      Math.sin(t * 1.1) * 0.5,
      () => {
        for (const c of [T, K]) {
          c.save();
          c.scale(Math.max(0.03, sx), 1);
        }
        if (!back) pvLedgerFront(T, K, t);
        else pv404(T, K, t);
        for (const c of [T, K]) c.restore();
      },
    );
  }
  function pvLedgerFront(T, K, t) {
    const x0 = -LG.w / 2,
      y0 = -LG.h / 2,
      mid = 0;
    uiCard(T, K, x0, y0, LG.w, LG.h, { r: 28, border: C.ink, lw: 4 });
    lkBold(K, 'Privacy Policy', x0 + 30, y0 + 62, { size: 44 });
    lkMono(K, 'v0.1 · last updated: never', x0 + 32, y0 + 96, { size: 20 });
    const hp = clamp(pop(t - T_MATCH + 0.05, 3, 0.55), 0, 1.1);
    if (hp > 0) {
      X([K], 0, y0 + 145, hp, 0, () => {
        lkMono(K, 'POLICY SAYS', -LG.w / 4, 0, { size: 22, color: C.ink, align: 'center' });
        lkMono(K, 'APP DOES', LG.w / 4, 0, { size: 22, color: C.red, align: 'center' });
      });
      line(K, mid, y0 + 125, mid, y0 + LG.h - 24, HAIR, 3);
    } else
      skeleton(K, x0 + 32, y0 + 150, [LG.w - 80, LG.w - 140, LG.w - 110, LG.w - 200], { gap: 40, h: 14 });
    ROWS.forEach((rw, k) => {
      const a = clamp(pop(t - rw[2], 3, 0.5), 0, 1.15);
      if (a <= 0) return;
      const ry = y0 + 215 + k * 66,
        ok = rw[3];
      X([K], 0, ry, 1, 0, () => {
        K.save();
        K.translate(LG.w / 4, 0);
        K.scale(a, a);
        fillRR(K, -130, -27, 260, 54, 27, ok ? '#F3F1EC' : '#FFF0EC');
        strokeRR(K, -130, -27, 260, 54, 27, ok ? HAIR : C.red, 3);
        const icon = [lkIconMail, lkIconPin, lkIconDevice, lkIconContacts][k];
        X([K], -98, 0, 1 + (ok ? 0 : 0.08 * Math.sin(t * 7 + k)), 0, () =>
          icon(K, 34, ok ? '#FFFFFF' : C.red),
        );
        text(K, rw[1], 18, 11, {
          font: F.mono,
          weight: 700,
          size: 28,
          color: ok ? C.ink : C.red,
          align: 'center',
        });
        K.restore();
        text(K, rw[0], -LG.w / 4, 11, {
          font: F.mono,
          weight: 700,
          size: 30,
          color: ok ? C.ink : '#C9C5BC',
          align: 'center',
        });
        const pul = ok ? 1 : 1 + 0.12 * Math.sin(t * 9 + k);
        X([K], 0, 0, a * pul, 0, () => {
          circle(K, 0, 0, 22, ok ? C.ink : C.red);
          text(K, ok ? '=' : '≠', 0, 10, {
            font: F.grot,
            weight: 700,
            size: 30,
            color: '#FFFFFF',
            align: 'center',
          });
        });
      });
    });
    if (t >= T_DOES + 0.15)
      X([K], LG.w / 2 - 40, y0 + 50, lkSlap(t - T_DOES - 0.15, 2), 8, () =>
        lkSticker(null, K, '3 mismatches', { fill: C.red, color: '#FFFFFF', size: 22 }),
      );
  }
  // the back of the ledger: the app's /privacy URL → 404
  function pv404(T, K, t) {
    const x0 = -LG.w / 2,
      y0 = -LG.h / 2;
    uiCard(T, K, x0, y0, LG.w, LG.h, { r: 28, border: C.ink, lw: 4 });
    fillRR(K, x0 + 22, y0 + 22, LG.w - 44, 52, 26, '#F1EFEA');
    text(K, 'my-app.com/privacy', x0 + 50, y0 + 57, {
      font: F.grot,
      weight: 500,
      size: 24,
      color: '#6b6861',
      align: 'left',
    });
    const s = lkSlap(t - T_DONT, 2.4),
      jit = t > T_DONT ? noise1(t * 30) * 3 : 0;
    if (t < T_DONT) {
      spinner(K, 0, 40, 34, t);
      lkMono(K, 'loading…', 0, 120, { size: 22, align: 'center' });
    } else
      X([K], jit, -70, s, -3, () => {
        text(K, '404', 0, 40, { font: F.anton, weight: 400, size: 190, color: C.red, align: 'center' });
        lkMono(K, 'privacy policy not found', 0, 92, { size: 24, color: C.ink, align: 'center' });
      });
  }
  const FOCUS = [
    [S0 + 0.05, TAG[0], TAG[1] + 160],
    [T_PRIV, WL.x + 250, WL.y + 100],
    [T_MAIL + 0.1, JAR.x, JAR.y],
    [T_POL, LG.x + 200, LG.y + 120],
    [T_MATCH, LG.x + 300, LG.y + 210],
    [T_ACT, LG.x + 440, LG.y + 300],
    [T_FLIP, LG.x + 290, LG.y + 220],
  ];
  const MOODS = [
    ['lean', T_MATCH, T_MATCH + 0.6],
    ['shock', T_ACT + 0.05, T_ACT + 0.6],
    ['shrug', T_DONT, T_ONE + 0.25],
    ['no', T_ONE + 0.3, S1 - 0.15],
  ];

  SC.exB = {
    label: '// 04 — exhibit B: privacy',
    readout: lkReadout('B', T_SEC),
    cam: (t) => {
      const rel = 1 - E.inOutCubic(clamp((t - S1 + 0.3) / 0.3));
      const f = focusTrack(t, FOCUS) || [540, 900];
      return {
        x: (540 - f[0]) * 0.06 * rel,
        y: (900 - f[1]) * 0.04 * rel,
        z: 1 + (0.03 * E.outCubic(P(t, S0, 0.6)) + 0.006 * (t - S0)) * rel,
      };
    },
    draw(T, K, t) {
      moodFx(T, K, t, MOODS);
      if (t >= T_SEC - 0.15) {
        const d = Math.max(0, T_SEC - t) / 0.15;
        X([T, K], TAG[0], TAG[1] - d * d * 400, 1, 0, () =>
          lkTag(T, K, lkSwing(t, T_SEC, 22, 2), {
            letter: 'B',
            w: 160,
            h: 210,
            str: 34,
            hot: t < T_PRIV + 0.6,
          }),
        );
        lkPin(T, K, TAG[0], TAG[1] - d * d * 400);
      }
      pvJar(T, K, t, true);
      for (let k = 0; k < DROPS.length; k++) pvEnvelope(T, K, t, k);
      pvJar(T, K, t, false);
      pvJarTag(T, K, t);
      pvWaitlist(T, K, t);
      pvLedger(T, K, t);
      if (t >= T_ONE) {
        stamp(K, T, 'EXHIBIT B', LG.x + 300, LG.y + LG.h - 60, t - T_ONE, {
          size: 84,
          rot: 6,
          sub: 'NO PRIVACY POLICY',
        });
        impact(T, K, LG.x + 300, LG.y + LG.h - 60, t - T_ONE - 0.06, 1.1, 5);
      }
    },
    guy: (t) => act(t, mood(t, MOODS, { focus: (t) => focusTrack(t, FOCUS) })),
  };
})();

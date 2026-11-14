// ═════════════ 05 · EXHIBIT C  [CUT_C → CUT_D] trackers ═════════════
// "The third is trackers. Drop in an analytics pixel or a chat widget without asking, and you could be recording visitors in ways
//  the law doesn't allow."
// Beats: third → EXHIBIT C tag swings in (top right); the landing page is already rising · trackers → a 3rd-party server rack rises
//   at right, lights blinking · drop → a tracker pixel bug DROPS into the page header (squash, dust) · analytics → its eye opens red ·
//   pixel → a dashed beam shoots from the bug to the rack, data packets start flowing · chat / widget → a chat widget pops bottom
//   right of the page and types "Hi! Need help?" · without → a dashed cookie banner ghost appears where consent should be ·
//   asking → it gets a big red X · recording → REC pill blinks on the page, a visitor's cursor wanders leaving a red replay trail ·
//   visitors → visitor heads slide in with REC dots and their packets fly to the rack · law / doesn't allow → EXHIBIT C stamp (kick).
//   Accent dot wipe into the database.
// Keeps moving: packets flowing, rack LEDs, bug legs skittering + eye looking around, typing dots, cursor + trail, REC blink.
(() => {
  const S0 = CUT_C,
    S1 = CUT_D;
  const W_ = (w, fb, from = S0) => wordAt(w, from, 1, fb);
  const T_THIRD = W_('third', S0 + 0.25),
    T_TRK = W_('trackers', S0 + 0.8),
    T_DROP = W_('drop', S0 + 1.8),
    T_ANA = W_('analytics', S0 + 2.2);
  const T_PIX = W_('pixel', S0 + 2.55),
    T_CHAT = W_('chat', S0 + 3.3),
    T_WITH = W_('without', S0 + 3.7),
    T_ASK = W_('asking', S0 + 4.0);
  const T_REC = W_('recording', S0 + 5.0),
    T_VIS = W_('visitors', S0 + 5.4),
    T_LAW = W_('law', S0 + 6.4),
    T_NOT = Math.min(W_('doesn', S0 + 6.6, T_LAW), S1 - 0.6);
  const TAG = [880, 570],
    BR = { x: 80, y: 600, w: 650, h: 690 },
    RACK = { x: 870, y: 1010 };
  const BUG = [BR.x + 470, BR.y + 160];
  const VIS = [0, 1, 2, 3].map((k) => T_VIS + k * 0.12);
  kick(T_DROP + 0.25, 0.5, 0.5);
  kick(T_NOT + 0.03, 1, 1);
  cue(T_THIRD, 'swoosh', -6);
  cue(T_TRK, 'swoosh', -5);
  cue(T_DROP + 0.22, 'thud', -2);
  cue(T_PIX, 'click', -4);
  cue(T_CHAT, 'pop', -3);
  cue(T_ASK, 'thud', -4);
  cue(T_REC, 'ding', -6);
  cue(T_NOT, 'stamp', 0);

  const brIn = (t) => clamp(pop(t - S0 - 0.1, 2.0, 0.62), 0, 1.15);
  const brY = (t) => BR.y + (1 - brIn(t)) * 1100 + Math.sin(t * 1.4) * 3;
  // the landing page in a browser: hero headline skeleton, CTA, feature rows; consent banner slot at the bottom
  function tkPage(T, K, t) {
    if (brIn(t) <= 0) return;
    browser(
      T,
      K,
      BR.x,
      brY(t),
      BR.w,
      BR.h,
      (K, x, y, w, h) => {
        lkBold(K, 'Ship faster ✦', x + 36, y + 80, { size: 52 });
        skeleton(K, x + 36, y + 120, [w - 200, w - 280], { gap: 30, h: 16 });
        fillRR(K, x + 36, y + 200, 200, 64, 32, C.ink);
        text(K, 'Get started', x + 136, y + 241, {
          font: F.grot,
          weight: 700,
          size: 26,
          color: '#FFFFFF',
          align: 'center',
        });
        for (let k = 0; k < 3; k++) {
          fillRR(K, x + 36 + k * 190, y + 300, 170, 140, 18, LK.warm);
          circle(K, x + 80 + k * 190, y + 340, 18, ['#CFCBC2', '#DAD7CF', '#E6E3DC'][k]);
          skeleton(K, x + 60 + k * 190, y + 390, [110, 80], { gap: 22, h: 10 });
        }
        // the consent banner that should be here: a dashed ghost on "without", crossed on "asking"
        if (t >= T_WITH) {
          const by = y + h - 120,
            a = clamp((t - T_WITH) / 0.2);
          K.save();
          K.globalAlpha *= a;
          K.setLineDash([12, 9]);
          K.lineDashOffset = -t * 24;
          strokeRR(K, x + 20, by, w - 40, 96, 18, '#A8A49B', 3);
          K.restore();
          K.save();
          K.globalAlpha *= a * 0.7;
          text(K, 'We use cookies.', x + 46, by + 58, {
            font: F.grot,
            weight: 500,
            size: 26,
            color: '#A8A49B',
            align: 'left',
          });
          strokeRR(K, x + w - 290, by + 26, 120, 46, 23, '#A8A49B', 3);
          strokeRR(K, x + w - 160, by + 26, 120, 46, 23, '#A8A49B', 3);
          text(K, 'Accept', x + w - 230, by + 57, {
            font: F.grot,
            weight: 500,
            size: 20,
            color: '#A8A49B',
            align: 'center',
          });
          text(K, 'Decline', x + w - 100, by + 57, {
            font: F.grot,
            weight: 500,
            size: 20,
            color: '#A8A49B',
            align: 'center',
          });
          K.restore();
          if (t >= T_ASK) cross(K, x + w / 2, by + 48, 120, clamp((t - T_ASK) / 0.18), C.red, 12);
        }
      },
      { url: 'my-app.com', tab: 'my-app' },
    );
  }
  // consent status chip next to the URL: "consent: —" turns red "consent: none" on "asking"
  function tkConsentChip(T, K, t) {
    if (brIn(t) <= 0.5 || t < T_TRK) return;
    const none = t >= T_ASK,
      y = brY(t) + 68;
    X([K], BR.x + BR.w - 150, y, none ? 1 + ring(t - T_ASK, 5, 9) * 0.15 : 1, 0, () => {
      fillRR(K, -100, -18, 200, 36, 18, none ? C.red : '#F3F1EC');
      text(K, none ? 'consent: none' : 'consent: ?', 0, 7, {
        font: F.mono,
        weight: 700,
        size: 18,
        color: none ? '#FFFFFF' : LK.grey,
        align: 'center',
      });
    });
  }
  // REC pill on the browser chrome + visitor cursor wandering with a red replay trail
  function tkRecord(T, K, t) {
    if (t < T_REC - 0.02) return;
    const y = brY(t),
      blink = Math.floor((t - T_REC) * 2.5) % 2 === 0;
    X([T, K], BR.x + BR.w - 90, y + 28, lkSlap(t - T_REC, 1.8), 0, () => {
      fillRR(K, -62, -20, 124, 40, 20, C.ink);
      circle(K, -36, 0, 9, blink ? C.red : '#552018');
      text(K, 'REC', 10, 9, { font: F.mono, weight: 700, size: 22, color: '#FFFFFF', align: 'center' });
    });
    const path = (u) => [
      BR.x + 330 + Math.sin(u * 2.1) * 200 + Math.sin(u * 5.3) * 40,
      y + 420 + Math.cos(u * 1.7) * 150 + Math.sin(u * 4.1) * 30,
    ];
    K.save();
    K.strokeStyle = C.red;
    K.lineWidth = 5;
    K.lineCap = 'round';
    K.setLineDash([3, 11]);
    K.beginPath();
    const u0 = Math.max(T_REC, t - 1.6);
    for (let u = u0; u <= t; u += 0.02) {
      const p = path(u - T_REC);
      if (u === u0) K.moveTo(p[0], p[1]);
      else K.lineTo(p[0], p[1]);
    }
    K.stroke();
    K.restore();
    const p = path(t - T_REC);
    cursor(K, p[0], p[1], 1.1, 0);
  }
  // the 3rd-party server rack at right: rises on "trackers", LEDs blink faster as data arrives
  function tkRack(T, K, t) {
    const a = clamp(pop(t - T_TRK, 2.2, 0.6), 0, 1.15);
    if (a <= 0) return;
    const busy = t >= T_PIX,
      hit = ring(lkSince(t, [T_PIX + 0.25, ...VIS.map((v) => v + 0.5)]), 5, 8) * 0.05;
    X([T, K], RACK.x, RACK.y + (1 - clamp(a)) * 700 + Math.sin(t * 1.7) * 4, 1 + hit, 0, () => {
      fillRR(T, -98, -150, 210, 310, 22, C.k45);
      fillRR(K, -105, -164, 210, 310, 22, '#2A2B30');
      strokeRR(K, -105, -164, 210, 310, 22, C.ink, 4);
      for (let k = 0; k < 4; k++) {
        const yy = -140 + k * 70;
        fillRR(K, -86, yy, 172, 54, 10, LK.dark);
        for (let j = 0; j < 3; j++)
          circle(
            K,
            -60 + j * 24,
            yy + 27,
            6,
            busy && Math.floor(t * (6 + k * 2) + j * 1.7) % 3 === 0 ? C.red : '#45464D',
          );
        fillRR(K, 10, yy + 21, 60, 12, 6, '#45464D');
      }
      lkMono(K, '3rd party', 0, 186, { size: 24, color: C.ink, align: 'center' });
    });
  }
  // packets: from the bug (and later each visitor) along a dashed arc into the rack
  function tkBeam(K, t, from, t0, n = 3, speed = 1.3) {
    if (t < t0) return;
    const to = [RACK.x - 100, RACK.y - 60],
      c = [(from[0] + to[0]) / 2, Math.min(from[1], to[1]) - 140];
    const bz = (u) => {
      const q = 1 - u;
      return [
        q * q * from[0] + 2 * q * u * c[0] + u * u * to[0],
        q * q * from[1] + 2 * q * u * c[1] + u * u * to[1],
      ];
    };
    const draw = clamp((t - t0) / 0.25);
    K.save();
    K.setLineDash([10, 10]);
    K.lineDashOffset = -t * 60;
    K.strokeStyle = 'rgba(255,59,31,0.7)';
    K.lineWidth = 4;
    K.beginPath();
    for (let i = 0; i <= 30 * draw; i++) {
      const p = bz(i / 30);
      i ? K.lineTo(p[0], p[1]) : K.moveTo(p[0], p[1]);
    }
    K.stroke();
    K.restore();
    if (draw < 1) return;
    for (let k = 0; k < n; k++) {
      const u = ((t - t0) * speed + k / n) % 1,
        p = bz(u);
      fillRR(K, p[0] - 13, p[1] - 9, 26, 18, 4, C.red);
    }
  }
  // what the packets carry: chips that ride the pixel beam ("clicks", "scrolls", "typing", "IP")
  function tkCargo(K, t) {
    if (t < T_PIX + 0.25) return;
    const from = [BUG[0] + 30, BUG[1] + brY(t) - BR.y - 30],
      to = [RACK.x - 100, RACK.y - 60];
    const c = [(from[0] + to[0]) / 2, Math.min(from[1], to[1]) - 140],
      words = ['clicks', 'scrolls', 'typing', 'IP'];
    words.forEach((w, k) => {
      const u = ((t - T_PIX) * 0.55 + k / words.length) % 1,
        q = 1 - u;
      const x = q * q * from[0] + 2 * q * u * c[0] + u * u * to[0],
        y = q * q * from[1] + 2 * q * u * c[1] + u * u * to[1];
      K.save();
      K.globalAlpha *= Math.min(1, u * 6, (1 - u) * 6);
      X([K], x, y - 34, 1, 0, () => lkSticker(null, K, w, { size: 18, fill: '#FFFFFF' }));
      K.restore();
    });
  }
  // the pixel bug: drops into the page header, squashes, then skitters in place, eye looking around
  function tkBug(T, K, t) {
    const dt = t - T_DROP;
    if (dt < 0) return;
    const fall = dt < 0.22 ? Math.pow(1 - dt / 0.22, 2) * 700 : 0,
      sq = dt >= 0.22 ? ring(dt - 0.22, 5, 9) * 0.14 : 0;
    const by = brY(t) - BR.y;
    X([T, K], BUG[0] + Math.sin(t * 1.3) * 6, BUG[1] + by - fall, 1, Math.sin(t * 6) * 3, () => {
      for (const c of [T, K]) {
        c.save();
        c.scale(1 + sq, 1 - sq);
      }
      circle(T, 6, 14, 52, C.k30);
      lkBug(K, 74, t, { hot: t >= T_ANA });
      for (const c of [T, K]) c.restore();
    });
    if (dt >= 0.22 && dt < 0.7) {
      puff(T, BUG[0] - 50, BUG[1] + by + 40, dt - 0.22, 0.6, -1);
      puff(T, BUG[0] + 50, BUG[1] + by + 40, dt - 0.22, 0.6, 1);
    }
    if (t >= T_ANA)
      X([T, K], BUG[0] + 40, BUG[1] + by - 90, lkSlap(t - T_ANA, 2), -6, () =>
        lkSticker(T, K, 'analytics pixel', { size: 22, fill: '#FFFFFF' }),
      );
  }
  // chat widget: launcher + panel bottom right of the page, typing then the greeting
  function tkChat(T, K, t) {
    const a = clamp(pop(t - T_CHAT, 2.6, 0.5), 0, 1.15);
    if (a <= 0) return;
    const y = brY(t),
      cx = BR.x + BR.w - 70,
      cy = y + BR.h - 200;
    X([T, K], cx, cy, a, 0, () => {
      circle(T, 6, 10, 44, C.k45);
      circle(K, 0, 0, 44, C.red, C.ink, 4);
      fillRR(K, -18, -14, 36, 26, 8, '#FFFFFF');
      K.beginPath();
      K.moveTo(-6, 12);
      K.lineTo(-12, 22);
      K.lineTo(4, 12);
      K.closePath();
      K.fillStyle = '#FFFFFF';
      K.fill();
      const pa = clamp(pop(t - T_CHAT - 0.12, 2.4, 0.55), 0, 1.1);
      if (pa > 0)
        X([T, K], -150, -150, pa, 0, () => {
          uiCard(T, K, -140, -70, 280, 120, { r: 22, border: C.ink, lw: 3 });
          lkMono(K, 'support bot', -118, -36, { size: 18 });
          if (t < T_CHAT + 0.55) typingDots(K, -100, 10, t);
          else
            text(K, typedStr('Hi! Need help?', t, T_CHAT + 0.55, 24), -118, 18, {
              font: F.grot,
              weight: 700,
              size: 28,
              color: C.ink,
              align: 'left',
            });
        });
    });
    if (t >= T_CHAT + 0.3) tkBeam(K, t, [cx - 20, cy - 60], T_CHAT + 0.3, 2, 1.1);
  }
  // visitor heads: slide into a row above the page with REC dots; each one's packets fly to the rack
  function tkVisitors(T, K, t) {
    VIS.forEach((v, k) => {
      const a = clamp(pop(t - v, 2.6, 0.5), 0, 1.15);
      if (a <= 0) return;
      const x = BR.x + 90 + k * 120,
        y = brY(t) + BR.h + 70 + Math.sin(t * 2.4 + k) * 4;
      X([K], x, y, a, 0, () => lkAvatar(K, 0, 0, 44, k + 5, { rec: Math.floor(t * 2.5 + k) % 2 === 0 }));
    });
    lkMono(K, t >= T_VIS ? '// visitors: recorded' : '', BR.x + 40, brY(t) + BR.h + 150, {
      size: 22,
      color: C.red,
    });
  }
  // the cookie that never asked: pops beside the ghost banner on "without", crumbles on "asking"
  function tkCookie(T, K, t) {
    const a = clamp(pop(t - T_WITH - 0.05, 2.8, 0.5), 0, 1.15);
    if (a <= 0) return;
    const cr = E.inCubic(clamp((t - T_ASK - 0.05) / 0.7));
    if (cr >= 1) return;
    X([T, K], BR.x + 70, brY(t) + BR.h - 150 + Math.sin(t * 3) * 3, a, t * 20, () =>
      lkCookie(T, K, 46, t, cr, 7),
    );
  }
  // session replay: a scrubber slides over the feature tiles once "recording" starts
  function tkReplay(T, K, t) {
    const a = clamp(pop(t - T_REC - 0.1, 2.4, 0.55), 0, 1.15);
    if (a <= 0) return;
    const x = BR.x + 30 + (1 - clamp(a)) * -700;
    lkScrubber(T, K, x, brY(t) + 92 + 296, BR.w - 60, t, T_REC);
  }
  const FOCUS = [
    [S0 + 0.05, TAG[0], TAG[1] + 160],
    [T_TRK, RACK.x, RACK.y - 60],
    [T_DROP, BUG[0], BUG[1] + 40],
    [T_PIX + 0.1, 760, 820],
    [T_CHAT, BR.x + BR.w - 180, BR.y + BR.h - 330],
    [T_WITH, BR.x + 330, BR.y + BR.h - 70],
    [T_REC, BR.x + 330, BR.y + 420],
    [T_VIS, BR.x + 280, BR.y + BR.h + 70],
    [T_NOT, BR.x + 330, BR.y + 340],
  ];
  const MOODS = [
    ['lean', T_DROP, T_DROP + 0.5],
    ['shh', T_WITH, T_ASK + 0.5],
    ['shock', T_REC, T_REC + 0.55],
    ['no', T_NOT, S1 - 0.3],
  ];

  SC.exC = {
    label: '// 05 — exhibit C: trackers',
    readout: lkReadout('C', T_THIRD),
    cam: (t) => {
      const rel = 1 - E.inOutCubic(clamp((t - S1 + 0.4) / 0.3));
      const f = focusTrack(t, FOCUS) || [540, 900];
      return {
        x: (540 - f[0]) * 0.06 * rel,
        y: (900 - f[1]) * 0.04 * rel,
        z: 1 + (0.03 * E.outCubic(P(t, S0, 0.6)) + 0.006 * (t - S0)) * rel,
      };
    },
    draw(T, K, t) {
      moodFx(T, K, t, MOODS);
      if (t >= T_THIRD - 0.15) {
        const d = Math.max(0, T_THIRD - t) / 0.15;
        X([T, K], TAG[0], TAG[1] - d * d * 400, 1, 0, () =>
          lkTag(T, K, lkSwing(t, T_THIRD, 22, 3), {
            letter: 'C',
            w: 160,
            h: 210,
            str: 34,
            hot: t < T_TRK + 0.6,
          }),
        );
        lkPin(T, K, TAG[0], TAG[1] - d * d * 400);
      }
      tkRack(T, K, t);
      tkPage(T, K, t);
      tkReplay(T, K, t);
      tkConsentChip(T, K, t);
      tkRecord(T, K, t);
      tkCookie(T, K, t);
      tkBeam(K, t, [BUG[0] + 30, BUG[1] + brY(t) - BR.y - 30], T_PIX, 3, 1.4);
      tkCargo(K, t);
      tkBug(T, K, t);
      tkChat(T, K, t);
      tkVisitors(T, K, t);
      for (const v of VIS)
        tkBeam(K, t, [BR.x + 90 + VIS.indexOf(v) * 120, brY(t) + BR.h + 30], v + 0.25, 1, 1.2);
      if (t >= T_NOT) {
        stamp(K, T, 'EXHIBIT C', BR.x + 330, BR.y + 380, t - T_NOT, {
          size: 100,
          rot: -8,
          sub: 'NO CONSENT',
        });
        impact(T, K, BR.x + 330, BR.y + 380, t - T_NOT - 0.06, 1.1, 6);
      }
    },
    guy: (t) => act(t, mood(t, MOODS, { focus: (t) => focusTrack(t, FOCUS) })),
  };
})();

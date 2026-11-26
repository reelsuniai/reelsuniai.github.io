// ═════ HOOK [0 → CUT_MIDDLE] "You've been paying ElevenLabs just to get an AI voice. A solo dev made it free, and 36,000 people starred it on GitHub." ═════
//  f0 You've     → ElevenLabs card already landed (impact dashes), credits meter draining, "/mo" tag swinging
//  paying       → credit card SWIPES up into the card, CHARGED pill pops
//  ElevenLabs   → EL card slams 1.12→1 + push-in
//  just         → receipt starts PRINTING out of the EL card
//  get          → coins eject from the credit card and arc into the EL card
//  AI           → AI VOICE card pops (waveform)        voice → waveform spikes red, "$/mo" price tag swings onto it, meter hits OUT
//  solo         → dev card FLIES IN from the left        dev → SOLO DEV pill ejects
//  made         → red X draws on the EL card (2 f early), </> chip ejects from the dev card
//  free         → EL card + receipt + credit card ROLL off; voice card slides to centre, tag glitches $/mo → $0, FREE stamp + ink ring
//  and          → voice + dev cards recompose into corners, GitHub card FLIES IN from the right
//  36,000       → star counter accelerates, slams ×1.5 + 12 red ticks
//  people       → avatar row cascades in (2 f apart)     starred → star fills gold + sparkles, button flips to "Starred"
//  GitHub       → ON GITHUB pill ejects + push
(() => {
  const S0 = 0, S1 = CUT_MIDDLE;
  const tPay = wi(2), tEL = wi(3), tJust = wi(5), tGet = wi(7), tAI = wi(9), tVoice = wi(10), tSolo = wi(12), tDev = wi(13), tMade = wi(14), tFree = wi(16),
    tAnd = wi(17), tNum = wi(18), tPeople = wi(20), tStar = wi(21), tGH = wi(23), tNumEnd = Math.min(tNum + 0.62, tPeople - 0.05);
  cue(0, 'impact', -6); cue(tPay, 'swoosh', -8); cue(tPay + acF(3), 'pop', -9); cue(tJust, 'type', -8); cue(tGet, 'coin', -6); cue(tAI, 'pop', -7); cue(tVoice, 'tick', -6);
  cue(tSolo - 0.1, 'whoosh', -6); cue(tDev, 'pop', -8); cue(tMade - acF(2), 'tick', -5); cue(tFree, 'stamp', -2); cue(tAnd - 0.1, 'whoosh', -6);
  cue(tNum, 'riser', -10); cue(tNumEnd, 'impact', -4); cue(tPeople, 'pop', -9); cue(tStar, 'ding', -6); cue(tGH, 'pop', -7);
  const DRIFT = ocb_drift([S0, tPay, tJust, tAI, tSolo, tFree, tAnd, tNumEnd, tStar, S1 + 0.4], 2.3);
  const EL = { x: 500, y: 560 }, CC = { x: 800, y: 900 }, VC = { x: 770, y: 1170 }, DV = { x: 270, y: 1160 }, GH = { x: 540, y: 790 };
  const fmt = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // ── ElevenLabs card ──
  function elCard(K, t) {
    const w = 560, h = 300, v = clamp(1 - t / (tVoice + 0.25));
    ocb_depth(K, -w / 2, -h / 2, w, h, 26, 1); fillRR(K, -w / 2, -h / 2, w, h, 26, '#FFFFFF');
    fillRR(K, -w / 2 + 40, -h / 2 + 46, 12, 62, 4, AC_INK); fillRR(K, -w / 2 + 62, -h / 2 + 46, 12, 62, 4, AC_INK);
    ac_tx(K, 'ElevenLabs', -w / 2 + 92, -h / 2 + 100, 58, AC_INK, 800, 'left');
    ac_tx(K, 'Creator plan · billed monthly', -w / 2 + 40, -h / 2 + 148, 20, AC_GREY, 600, 'left', F.mono);
    const bw = w - 80, by = h / 2 - 76; ac_tx(K, 'CREDITS', -bw / 2, by - 12, 18, AC_GREY, 800, 'left', F.mono);
    fillRR(K, -bw / 2, by, bw, 28, 14, '#ECE8E4'); if (v > 0.01) fillRR(K, -bw / 2, by, Math.max(28, bw * v), 28, 14, v < 0.25 ? C.red : '#F2B632');
    const out = v < 0.02, blink = out && Math.floor(t * 8) % 2 === 0;
    ac_tx(K, out ? 'OUT OF CREDITS' : Math.round(v * 100) + '% left', bw / 2, by - 12, 18, out ? (blink ? C.red : '#B22') : AC_GREY, 800, 'right', F.mono);
    fillRR(K, -bw / 2 - 2, h / 2 - 32, 150, 6, 3, '#111'); // card slot
    ocb_boil(K, -w / 2, -h / 2, w, h, 26, '#111', 5, t, 1); ocb_bevel(K, -w / 2, -h / 2, w, h, 26); ocb_gloss(K, -w / 2, -h / 2, w, h, 26, t, { a: 0.1 });
    X([K], w / 2 - 34, -h / 2 + 14, 1, 18 + Math.sin(t * 2.4) * 9, () => { line(K, 0, 0, 0, 24, '#8A6A3A', 3); X([K], 0, 50, 1, 0, () => {
      fillRR(K, -46, -24, 92, 48, 9, '#FFF4D6'); strokeRR(K, -46, -24, 92, 48, 9, '#111', 3); ac_tx(K, '$/mo', 0, 11, 26, AC_INK, 800, 'center', F.anton); }); });
  }
  function el(T, K, t, d) {
    const r = rollOff(t, tFree, { dir: 1, v: 2900 }); if (r.gone) return; const I = ocb_idle(t, 1);
    const bump = t >= tEL ? 1 + 0.12 * Math.max(0, 1 - (t - tEL) / acF(3)) : 1, shiv = t > tMade && t < tFree ? Math.sin(t * 90) * 4 : 0;
    if (t < 0.12) tickBurst(K, EL.x + d.x * 0.2, EL.y + d.y * 0.2, t, 0, { r0: 330, n: 12, frames: 4 });
    X([K], EL.x + I.dx + r.dx + shiv + d.x * 0.2, EL.y + I.dy + d.y * 0.2, bump * I.s, -2.5 + I.rot + r.rot * 0.15, () => { K.save(); ocb_skew(K, t, 1, 0.6); elCard(K, t); K.restore(); });
    if (!r.on) drawOnX(T, K, EL.x + d.x * 0.2, EL.y + d.y * 0.2, t, tMade - acF(2), { len: 360, w: 40 });
  }
  // ── receipt printing out of the card slot ──
  const RLINES = [[tJust, 'RECEIPT #0419', AC_GREY], [tGet, '1 × AI voice', AC_INK], [tAI, 'credits ×1,000', AC_INK], [tVoice, 'TOTAL   $/mo', C.red]];
  function receipt(K, t, d) {
    if (t < tJust) return; const r = rollOff(t, tFree + acF(2), { dir: -1, v: 2600 }); if (r.gone) return;
    const L = 70 + 300 * E.outCubic(clamp((t - tJust) / 0.9)), I = ocb_idle(t, 4, 0.5), w = 300;
    X([K], EL.x - 120 + r.dx + I.dx + d.x * 0.2, EL.y + 122 + d.y * 0.2, 1, Math.sin(t * 2) * 1.2 + r.rot * 0.15, () => {
      ocb_shadow(K, -w / 2, 0, w, L, 4, 8, 10); fillRR(K, -w / 2, 0, w, L, 4, '#FFFDF7');
      K.fillStyle = '#FFFDF7'; K.beginPath(); for (let k = 0; k <= 13; k++) K.lineTo(-w / 2 + k * w / 13, L + (k % 2 ? 10 : 0)); K.lineTo(w / 2, L - 2); K.lineTo(-w / 2, L - 2); K.fill();
      K.save(); rr(K, -w / 2, 0, w, L + 10, 0); K.clip();
      RLINES.forEach(([tl, s, c], k) => { if (t < tl) return; const p = popScale(t, tl, { frames: 3 }); X([K], 0, 52 + k * 64, p, 0, () => ac_tx(K, s, 0, 0, k === 3 ? 26 : 22, c, 800, 'center', F.mono)); if (k < 3) line(K, -w / 2 + 20, 72 + k * 64, w / 2 - 20, 72 + k * 64, '#DDD6CC', 2); });
      K.restore(); strokeRR(K, -w / 2, 0, w, L, 4, '#111', 3);
    });
  }
  // ── credit card swiping + coins draining ──
  function card(K, t, d) {
    const r = rollOff(t, tFree + acF(1), { dir: 1, v: 2800 }); if (r.gone) return; const I = ocb_idle(t, 5);
    const sw = t >= tPay - acF(2) ? Math.sin(Math.PI * clamp((t - tPay + acF(2)) / 0.32)) : 0;
    X([K], CC.x + I.dx + r.dx - 70 * sw + d.x * 0.25, CC.y + I.dy - 110 * sw + d.y * 0.25, I.s, 9 + I.rot - 12 * sw + r.rot * 0.2, () => {
      const w = 300, h = 188; ocb_depth(K, -w / 2, -h / 2, w, h, 20, 0.8); fillRR(K, -w / 2, -h / 2, w, h, 20, vGrad(K, -h / 2, h / 2, ['#2B2F3A', '#14161C']));
      fillRR(K, -w / 2 + 28, -h / 2 + 50, 54, 40, 8, '#E3B95C'); line(K, -w / 2 + 28, -h / 2 + 70, -w / 2 + 82, -h / 2 + 70, '#9C7A30', 2);
      ac_tx(K, '••••  ••••  4242', -w / 2 + 28, h / 2 - 34, 24, '#E8E6E1', 700, 'left', F.mono);
      circle(K, w / 2 - 58, h / 2 - 42, 20, '#EB5A2E'); circle(K, w / 2 - 34, h / 2 - 42, 20, 'rgba(247,169,40,0.9)');
      strokeRR(K, -w / 2, -h / 2, w, h, 20, '#111', 5); ocb_gloss(K, -w / 2, -h / 2, w, h, 20, t, { a: 0.14, ph: 0.3 });
    });
    const p = popScale(t, tPay + acF(3)); if (p > 0 && !r.on) X([K], CC.x + 40 + d.x * 0.3, CC.y - 130 + d.y * 0.3, p, -6 + I.rot, () => vs_pill(K, 'CHARGED', 220, C.red, '#FFFFFF', 30));
    for (let k = 0; k < 4; k++) { const tc = tGet + k * acF(2), q = clamp((t - tc) / 0.38); if (q <= 0 || q >= 1 || r.on) continue;
      const x = lerp(CC.x - 40, EL.x + 160, q) + d.x * 0.25, y = lerp(CC.y - 40, EL.y + 110, q) - Math.sin(q * Math.PI) * 180 + d.y * 0.25;
      X([K], x, y, 1 - 0.3 * q, q * 540 + k * 40, () => { circle(K, 0, 0, 30, '#F2B632'); K.strokeStyle = '#111'; K.lineWidth = 4; K.beginPath(); K.arc(0, 0, 30, 0, TAU); K.stroke(); ac_tx(K, '$', 0, 12, 34, '#8A6410', 900, 'center', F.anton); }); }
  }
  // ── AI VOICE card (chapter hero): pops on AI, price tag on voice, slides to centre + FREE on free, shrinks to a corner on "and" ──
  function voiceCard(T, K, t, d) {
    if (t < tAI) return; const I = ocb_idle(t, 6), p = popScale(t, tAI, { frames: 4 });
    const m = E.outBack(clamp((t - tFree) / acF(6))), sh = E.inOutCubic(clamp((t - tAnd + 0.06) / acF(6)));
    const x = lerp(lerp(VC.x, 540, m), 190, sh), y = lerp(lerp(VC.y, 860, m), 470, sh), s = lerp(lerp(1, 1.45, m), 0.62, sh);
    const spike = t >= tVoice && t < tVoice + 0.35, w = 340, h = 200;
    X([K], x + I.dx + d.x * 0.15, y + I.dy + d.y * 0.15, p * s * I.s, -3 + I.rot, () => {
      ocb_depth(K, -w / 2, -h / 2, w, h, 24, 0.9); fillRR(K, -w / 2, -h / 2, w, h, 24, '#FFFFFF');
      vs_wave(K, -w / 2 + 26, 14, w - 52, spike ? 140 : 100, t, 3, spike ? C.red : VS_PINK, clamp((t - tAI) / 0.3));
      fillRR(K, -w / 2 + 18, -h / 2 - 22, 160, 44, 22, AC_INK); ac_tx(K, 'AI VOICE', -w / 2 + 98, -h / 2 + 9, 24, '#FFFFFF', 800, 'center', F.anton);
      strokeRR(K, -w / 2, -h / 2, w, h, 24, '#111', 5); ocb_bevel(K, -w / 2, -h / 2, w, h, 24); ocb_gloss(K, -w / 2, -h / 2, w, h, 24, t, { a: 0.12, ph: 0.6 });
      if (t >= tVoice - acF(1)) { const sw = Math.sin(t * 3 + 1) * 10 * (1 - clamp((t - tFree) / 0.4)) + 4; const tp = slamScale(t, tVoice - acF(1));
        X([K], w / 2 - 40, -h / 2 + 10, tp, 22 + sw, () => { line(K, 0, 0, 0, 30, '#8A6A3A', 3); X([K], 0, 62, 1, 0, () => {
          glitchSwap(K, t, tFree + acF(1), () => { fillRR(K, -58, -30, 116, 60, 10, '#FFF4D6'); strokeRR(K, -58, -30, 116, 60, 10, '#111', 3); ac_tx(K, '$/mo', 0, 13, 32, AC_INK, 800, 'center', F.anton); },
            () => { fillRR(K, -58, -30, 116, 60, 10, C.red); strokeRR(K, -58, -30, 116, 60, 10, '#111', 3); ac_tx(K, '$0', 0, 14, 38, '#FFFFFF', 800, 'center', F.anton); }, { x: -58, y: -30, w: 116, h: 60 }); }); }); }
      const st = stampKeys(t, tFree); if (st.on) X([K], 0, 128, st.s * 0.62, -8, () => { K.save(); K.globalAlpha *= st.a; ocb_stamp(K, 'FREE', 300, 116, 88, { t }); K.restore(); });
    });
    if (t >= tFree && t < tAnd) { inkRing(K, 540 + d.x * 0.15, 960 + d.y * 0.15, t, tFree + acF(2), { r0: 150, r1: 300 }); ocb_sparkles(K, 540, 900, t, tFree + acF(3), { rx: 300, ry: 220, n: 7 }); }
  }
  // ── solo dev card ──
  function devCard(K, t, d) {
    const f = flyInCard(t, tSolo + acF(1), 'L', DV); if (!f.on) return; const I = ocb_idle(t, 7);
    const sh = E.inOutCubic(clamp((t - tAnd + 0.03) / acF(6))), x = lerp(f.x, 890, sh), y = lerp(f.y, 470, sh), s = lerp(f.s, 0.62, sh);
    X([K], x + (f.landed ? I.dx : 0) + d.x * 0.2, y + (f.landed ? I.dy : 0) + d.y * 0.2, s * I.s, f.rot + 3 + I.rot, () => {
      const w = 290, h = 250; ocb_depth(K, -w / 2, -h / 2, w, h, 24, 0.9); fillRR(K, -w / 2, -h / 2, w, h, 24, '#FFFFFF');
      circle(K, 0, -10, 78, '#F3EEE8'); K.save(); K.beginPath(); K.arc(0, -10, 78, 0, TAU); K.clip();
      fillRR(K, -70, 18, 140, 110, 50, '#3A3F4B'); circle(K, 0, -24, 34, '#E9B990'); K.fillStyle = '#2A1E18'; K.beginPath(); K.arc(0, -34, 36, Math.PI, 0); K.fill();
      K.strokeStyle = '#111'; K.lineWidth = 7; K.beginPath(); K.arc(0, -24, 44, Math.PI * 1.05, -0.05); K.stroke(); fillRR(K, -50, -36, 16, 30, 6, C.red); fillRR(K, 34, -36, 16, 30, 6, C.red);
      K.restore(); K.strokeStyle = '#111'; K.lineWidth = 4; K.beginPath(); K.arc(0, -10, 78, 0, TAU); K.stroke();
      ac_tx(K, '1 DEV', 0, h / 2 - 24, 30, AC_INK, 400, 'center', F.anton);
      strokeRR(K, -w / 2, -h / 2, w, h, 24, '#111', 5); ocb_bevel(K, -w / 2, -h / 2, w, h, 24); ocb_gloss(K, -w / 2, -h / 2, w, h, 24, t, { a: 0.12, ph: 0.9 });
      const e = ejectFrom(t, tDev, 60); if (e.on && sh < 0.5) X([K], 40, -h / 2 - 34 + e.dy, e.s, 5, () => vs_pill(K, 'SOLO DEV', 230, C.red, '#FFFFFF', 30));
      const c = ejectFrom(t, tMade, -50); if (c.on && sh < 0.5) X([K], w / 2 + 10, 40 + c.dy, c.s, -8, () => { fillRR(K, -50, -32, 100, 64, 14, AC_INK); strokeRR(K, -50, -32, 100, 64, 14, '#111', 4); ac_tx(K, '</>', 0, 12, 32, '#7FD88F', 800, 'center', F.mono); });
    });
  }
  // ── GitHub card: star counter, avatars, Starred ──
  function ghCard(T, K, t, d) {
    const f = flyInCard(t, tAnd + acF(2), 'R', GH); if (!f.on) return; const I = ocb_idle(t, 8, 0.7), w = 780, h = 380;
    const q = clamp((t - tNum) / (tNumEnd - tNum)), n = t < tNum ? 0 : Math.round(36000 * q * q * q / 10) * 10, done = t >= tNumEnd, starred = t >= tStar;
    const sl = done ? 1 + 0.5 * Math.max(0, 1 - (t - tNumEnd) / acF(3)) : 1;
    X([K], (f.landed ? GH.x + I.dx : f.x) + d.x * 0.15, (f.landed ? GH.y + I.dy : f.y) + d.y * 0.15, f.s * I.s, f.rot + I.rot * 0.6, () => {
      K.save(); ocb_skew(K, t, 8, 0.5); ocb_depth(K, -w / 2, -h / 2, w, h, 26, 1.1); fillRR(K, -w / 2, -h / 2, w, h, 26, '#0D1117');
      circle(K, -w / 2 + 70, -h / 2 + 68, 34, '#FFFFFF'); circle(K, -w / 2 + 70, -h / 2 + 64, 18, '#0D1117'); fillRR(K, -w / 2 + 58, -h / 2 + 74, 24, 22, 6, '#0D1117');
      ac_tx(K, 'solo-dev / voicestudio', -w / 2 + 124, -h / 2 + 78, 30, '#E6EDF3', 700, 'left', F.mono);
      fillRR(K, w / 2 - 118, -h / 2 + 50, 90, 38, 19, '#0D1117'); strokeRR(K, w / 2 - 118, -h / 2 + 50, 90, 38, 19, '#3D444D', 2); ac_tx(K, 'Public', w / 2 - 73, -h / 2 + 76, 20, '#9198A1', 700, 'center', F.mono);
      ac_tx(K, 'The open-source, fully-local', -w / 2 + 50, -h / 2 + 148, 30, '#C9D1D9', 600, 'left');
      ac_tx(K, 'ElevenLabs alternative', -w / 2 + 50, -h / 2 + 190, 30, '#C9D1D9', 600, 'left');
      const by = h / 2 - 110, bw = 230; fillRR(K, -w / 2 + 50, by, bw, 74, 14, starred ? '#2A2410' : '#21262D'); strokeRR(K, -w / 2 + 50, by, bw, 74, 14, '#3D444D', 2);
      const sp = starred ? popScale(t, tStar, { frames: 4 }) : 1; X([K], -w / 2 + 98, by + 37, sp * 1.2, starred ? 0 : -10, () => ghStar(K, starred));
      ac_tx(K, starred ? 'Starred' : 'Star', -w / 2 + 136, by + 48, 32, '#E6EDF3', 700, 'left');
      const cx = -w / 2 + 50 + bw + 20, cw = w - 120 - bw - 20; fillRR(K, cx, by, cw, 74, 14, '#FFFFFF'); strokeRR(K, cx, by, cw, 74, 14, '#111', 4);
      X([K], cx + cw / 2, by + 37, sl, 0, () => ac_tx(K, fmt(n) + (done ? '+' : ''), 0, 22, 62, done ? C.red : AC_INK, 400, 'center', F.anton));
      ocb_boil(K, -w / 2, -h / 2, w, h, 26, '#111', 6, t, 8); ocb_bevel(K, -w / 2, -h / 2, w, h, 26, true); ocb_gloss(K, -w / 2, -h / 2, w, h, 26, t, { a: 0.08 }); K.restore();
    });
    if (done) { tickBurst(K, GH.x + 175 + d.x * 0.15, GH.y + 117 + d.y * 0.15, t, tNumEnd, { r0: 240, n: 12, frames: 4, col: C.red }); halftoneGlow(K, GH.x + 175, GH.y + 117, 260, 110, 0.35 * (1 - clamp((t - tNumEnd) / 0.6))); }
    if (starred) ocb_sparkles(K, GH.x - 290 + d.x * 0.15, GH.y + 117 + d.y * 0.15, t, tStar, { rx: 110, ry: 80, n: 6 });
  }
  function ghStar(K, on) { K.beginPath(); for (let k = 0; k < 10; k++) { const r = k % 2 ? 9 : 22, a = -Math.PI / 2 + k * Math.PI / 5; K.lineTo(Math.cos(a) * r, Math.sin(a) * r); } K.closePath(); K.fillStyle = on ? '#F2B632' : 'rgba(0,0,0,0)'; K.fill(); K.strokeStyle = on ? '#111' : '#9198A1'; K.lineWidth = 3; K.stroke(); }
  const AV = ['#D08B6A', '#7FA0C8', '#9AB884', '#C88AB2', '#E0B060', '#6FB0A8', '#B07FC8', '#E08A7A'];
  function people(K, t, d) {
    AV.forEach((c, k) => { const tp = tPeople + k * acF(2); if (t < tp) return; const p = popScale(t, tp, { frames: 4 }), I = ocb_idle(t, 20 + k, 0.8), x = 200 + k * 68 + d.x * 0.25, y = 1070 + (k % 2) * 16 + d.y * 0.25;
      X([K], x + I.dx, y + I.dy, p * I.s, I.rot * 3, () => { circle(K, 0, 0, 38, c); circle(K, 0, -8, 14, '#F4E2D2'); K.fillStyle = '#F4E2D2'; K.beginPath(); K.arc(0, 22, 22, Math.PI, 0); K.fill(); K.strokeStyle = '#111'; K.lineWidth = 4; K.beginPath(); K.arc(0, 0, 38, 0, TAU); K.stroke();
        if (t >= tStar + k * acF(1)) X([K], 26, -26, popScale(t, tStar + k * acF(1), { frames: 3 }) * 0.7, 0, () => ghStar(K, true)); }); });
    const e = ejectFrom(t, tGH, -60); if (e.on) X([K], 740 + d.x * 0.3, 1200 + e.dy + d.y * 0.3, e.s, -4, () => vs_pill(K, 'ON GITHUB', 280, AC_INK, '#FFFFFF', 32));
  }
  const MOODS = [['pointUp', S0, tJust, { side: 'L' }], ['no', tJust, tSolo - 0.07], ['mouth', tSolo - 0.07, tFree - 0.07], ['celebrate', tFree - 0.07, tNum], ['thumbs', tNum, tGH - 0.07], ['nod', tGH - 0.07, S1 + 1]];
  const look = (t) => t < tAI ? [EL.x, EL.y] : t < tSolo ? [VC.x, VC.y] : t < tFree ? [DV.x, DV.y] : t < tAnd ? [540, 860] : [GH.x, GH.y];
  crScene('hook', { S0, S1, label: '// 01 · elevenlabs', moods: MOODS, lean: false, ambient: false, rate: 0.006, look }, (T, K, t) => {
    const d = DRIFT(t);
    ocb_stage(T, K, t, d, { push: [[tEL, 0.04], [tFree, 0.06], [tNumEnd, 0.05], [tGH, 0.03]], jolts: [0, tFree, tNumEnd], focus: [540, 800] }, () => {
      ac_zoom(T, K, () => { receipt(K, t, d); el(T, K, t, d); card(K, t, d); devCard(K, t, d); ghCard(T, K, t, d); people(K, t, d); voiceCard(T, K, t, d); }, 1.2);
    });
  });
})();

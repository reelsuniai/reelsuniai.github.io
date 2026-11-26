// ═════ DUB [CUT_DUB → CUT_CTA] "But here's the crazy part. It dubs your videos into 646 languages, and nothing ever leaves your computer." ═════
//  But          → red halftone wash floods out from the centre      here's → presenter shock, wash pulses
//  crazy        → "!?" starburst SLAMS 1.5→1 + jolt                    part → burst spins, sparkles
//  dubs         → video card FLIES IN from the left (EN badge), wash retracts
//  videos       → play-head scrubs, subtitle "Hey everyone!"          into → EN badge glitch-swaps to ES, subtitle → "¡Hola a todos!"
//  646          → counter accelerates 0 → 646, slams ×1.5 + 12 red ticks      languages → language chips orbit out (2 f cascade)
//  and          → cloud with an upload arrow pops top-right           nothing → red X draws on the cloud (2 f early)
//  ever         → padlock slams onto the video card, shackle snaps shut       leaves → cloud ROLLS off
//  computer     → 100% LOCAL stamp + ink ring
(() => {
  const S0 = CUT_DUB, S1 = CUT_CTA;
  const tBut = wi(47), tHeres = wi(48), tCrazy = wi(50), tPart = wi(51), tDubs = wi(53), tVid = wi(55), tInto = wi(56), tNum = wi(57), tLang = wi(58),
    tAnd = wi(59), tNoth = wi(60), tEver = wi(61), tLeave = wi(62), tComp = wi(64), tNumEnd = tNum + 0.55;
  cue(tBut, 'riser', -12); cue(tCrazy, 'impact', -3); cue(tPart, 'pop', -8); cue(tDubs - 0.1, 'whoosh', -6); cue(tInto, 'tick', -6);
  cue(tNum, 'riser', -10); cue(tNumEnd, 'impact', -4); cue(tLang, 'pop', -8); cue(tAnd, 'pop', -9); cue(tNoth - acF(2), 'tick', -5); cue(tEver, 'click', -4); cue(tLeave, 'whoosh', -8); cue(tComp, 'stamp', -2);
  const DRIFT = ocb_drift([S0, tCrazy, tDubs, tInto, tNumEnd, tLang, tNoth, tComp, S1 + 0.4], 6.7);
  const VID = { x: 520, y: 640 }, CNT = { x: 540, y: 1080 }, CL = { x: 860, y: 430 };
  const LANGS = ['Español', 'Français', '日本語', 'हिन्दी', 'Deutsch', 'Português', '中文', 'العربية'];
  function wash(K, t) {
    const on = clamp((t - tBut) / 0.3) * (1 - clamp((t - tDubs + 0.05) / 0.25)); if (on <= 0) return;
    const R = 1300 * E.outCubic(on) * (1 + 0.02 * Math.sin(t * 10)); K.save(); K.beginPath(); K.arc(540, 820, R, 0, TAU); K.clip();
    K.fillStyle = '#FFE9E4'; K.fillRect(-200, -200, 1480, 2400); K.fillStyle = C.red;
    for (let y = -100; y < 2000; y += 34) for (let x = -100; x < 1200; x += 34) { const r = 4 + 10 * clamp(1 - Math.hypot(x - 540, y - 820) / 1100) * (0.85 + 0.15 * Math.sin(t * 6 + x * 0.01)); K.beginPath(); K.arc(x + ((y / 34) % 2) * 17, y, r, 0, TAU); K.fill(); }
    K.restore();
  }
  function burst(K, t, d) {
    if (t < tCrazy - acF(1) || t >= tDubs + 0.1) return; const s = slamScale(t, tCrazy - acF(1)), spin = t >= tPart ? (t - tPart) * 40 : 0, ex = E.inCubic(clamp((t - tDubs + 0.1) / 0.2));
    X([K], 540 + d.x * 0.3, 800 + d.y * 0.3, s * (1 - ex) * (1 + 0.03 * Math.sin(t * 14)), -8 + spin, () => {
      ocb_shadow(K, -10, -10, 20, 20, 10, 0, 0);
      K.beginPath(); for (let k = 0; k < 24; k++) { const r = k % 2 ? 190 : 290, a = k * Math.PI / 12; K.lineTo(Math.cos(a) * r, Math.sin(a) * r); } K.closePath();
      K.fillStyle = '#FFFFFF'; K.fill(); K.strokeStyle = '#111'; K.lineWidth = 8; K.stroke();
      ac_tx(K, '!?', 0, 70, 200, C.red, 400, 'center', F.anton);
    });
    if (t >= tPart) ocb_sparkles(K, 540, 800, t, tPart, { rx: 340, ry: 300, n: 8 });
  }
  function video(K, t, d) {
    const f = flyInCard(t, tDubs + acF(2), 'L', VID); if (!f.on) return; const I = ocb_idle(t, 61, 0.7), w = 740, h = 430, es = t >= tInto;
    X([K], (f.landed ? VID.x + I.dx : f.x) + d.x * 0.15, (f.landed ? VID.y + I.dy : f.y) + d.y * 0.15, f.s * I.s, f.rot - 1.5 + I.rot, () => {
      K.save(); ocb_skew(K, t, 61, 0.5); ocb_depth(K, -w / 2, -h / 2, w, h, 24, 1.1);
      K.save(); rr(K, -w / 2, -h / 2, w, h, 24); K.clip(); K.fillStyle = vGrad(K, -h / 2, h / 2, ['#6FA7C8', '#2F4E68']); K.fillRect(-w / 2, -h / 2, w, h);
      fillRR(K, -w / 2, h / 2 - 120, w, 120, 0, '#24384A'); circle(K, 40, -10, 70, '#E9B990'); K.fillStyle = '#2A1E18'; K.beginPath(); K.arc(40, -30, 74, Math.PI, 0); K.fill();
      fillRR(K, -40, 60, 160, 160, 60, '#B5462E'); const mo = t >= tDubs && Math.floor(t * 10) % 2 ? 14 : 4; fillRR(K, 22, 20, 36, mo, 4, '#5A2A1E');
      // subtitle
      const sub = es ? '¡Hola a todos!' : 'Hey everyone!'; if (t >= tVid) { fillRR(K, -170, h / 2 - 104, 340, 52, 10, 'rgba(0,0,0,0.65)'); ac_tx(K, sub, 0, h / 2 - 68, 32, '#FFFFFF', 700); }
      // timeline + play-head
      const u = t < tVid ? 0 : ((t - tVid) * 0.28) % 1; fillRR(K, -w / 2 + 30, h / 2 - 32, w - 60, 10, 5, 'rgba(255,255,255,0.35)'); fillRR(K, -w / 2 + 30, h / 2 - 32, (w - 60) * u, 10, 5, C.red); circle(K, -w / 2 + 30 + (w - 60) * u, h / 2 - 27, 12, '#FFFFFF');
      K.restore();
      X([K], -w / 2 + 80, -h / 2 + 50, 1, -4, () => glitchSwap(K, t, tInto - acF(1), () => { fillRR(K, -56, -30, 112, 60, 12, AC_INK); ac_tx(K, 'EN', 0, 14, 40, '#FFFFFF', 400, 'center', F.anton); },
        () => { fillRR(K, -56, -30, 112, 60, 12, C.red); ac_tx(K, 'ES', 0, 14, 40, '#FFFFFF', 400, 'center', F.anton); }, { x: -56, y: -30, w: 112, h: 60 }));
      if (t < tVid) { circle(K, 0, -20, 56, 'rgba(255,255,255,0.9)'); K.fillStyle = AC_INK; K.beginPath(); K.moveTo(-16, -48); K.lineTo(30, -20); K.lineTo(-16, 8); K.fill(); }
      strokeRR(K, -w / 2, -h / 2, w, h, 24, '#111', 6); ocb_bevel(K, -w / 2, -h / 2, w, h, 24, true); ocb_gloss(K, -w / 2, -h / 2, w, h, 24, t, { a: 0.1 }); K.restore();
      // padlock
      const pl = stampKeys(t, tEver - acF(1)); if (pl.on) X([K], w / 2 - 50, h / 2 - 30, pl.s * 0.9, 8, () => { const sh = E.outBack(clamp((t - tEver - acF(2)) / acF(4)));
        K.strokeStyle = '#111'; K.lineWidth = 18; K.beginPath(); K.arc(0, -40 + 22 * (1 - sh), 44, Math.PI, 0); K.stroke(); K.strokeStyle = '#C9CED6'; K.lineWidth = 9; K.stroke();
        ocb_depth(K, -66, -40, 132, 110, 18, 0.6); fillRR(K, -66, -40, 132, 110, 18, '#F2B632'); strokeRR(K, -66, -40, 132, 110, 18, '#111', 5); circle(K, 0, 6, 14, '#111'); fillRR(K, -5, 6, 10, 34, 4, '#111'); });
    });
  }
  function counter(T, K, t, d) {
    if (t < tNum - 0.05) return; const q = clamp((t - tNum) / (tNumEnd - tNum)), n = Math.round(646 * q * q * q), done = q >= 1, I = ocb_idle(t, 62);
    const s = done ? 1 + 0.5 * Math.max(0, 1 - (t - tNumEnd) / acF(3)) : 0.85 + 0.15 * q;
    if (done) { halftoneGlow(K, CNT.x, CNT.y, 300, 130, 0.5 * (1 - clamp((t - tNumEnd) / 0.8))); inkRing(K, CNT.x, CNT.y, t, tNumEnd, { r0: 180, r1: 330 }); tickBurst(K, CNT.x, CNT.y, t, tNumEnd, { r0: 250, n: 12, frames: 4, col: C.red }); }
    X([K], CNT.x + I.dx + d.x * 0.2, CNT.y + I.dy + d.y * 0.2, s * I.s, -3 + I.rot, () => {
      ocb_depth(K, -230, -95, 460, 190, 30, 1); fillRR(K, -230, -95, 460, 190, 30, '#FFFFFF'); ac_tx(K, String(n), 0, 52, 150, done ? C.red : AC_INK, 400, 'center', F.anton);
      strokeRR(K, -230, -95, 460, 190, 30, '#111', 6); ocb_bevel(K, -230, -95, 460, 190, 30); ocb_gloss(K, -230, -95, 460, 190, 30, t, { a: 0.16 });
      const lp = popScale(t, tLang - acF(2)); if (lp > 0) X([K], 0, 120, lp, 2, () => vs_pill(K, 'LANGUAGES', 300, AC_INK, '#FFFFFF', 32));
    });
  }
  function chips(K, t, d) {
    LANGS.forEach((l, k) => { const tt = tLang + k * acF(2); if (t < tt) return; const p = popScale(t, tt, { frames: 4 }), I = ocb_idle(t, 63 + k);
      const x = (k % 2 ? 905 : 175) + Math.sin(t * 0.8 + k) * 6, y = 930 + Math.floor(k / 2) * 84 + (k % 2 ? 20 : 0);
      if (x > 800 && y > 1300) return; const w = 50 + [...l].length * (/[a-z]/i.test(l) ? 17 : 30);
      X([K], x + I.dx + d.x * 0.1, y + I.dy + d.y * 0.1, p * I.s, (k - 3.5) * 3 + I.rot, () => { ocb_depth(K, -w / 2, -28, w, 56, 28, 0.5); fillRR(K, -w / 2, -28, w, 56, 28, k === 0 ? C.red : '#FFFFFF'); strokeRR(K, -w / 2, -28, w, 56, 28, '#111', 4); ac_tx(K, l, 0, 10, 26, k === 0 ? '#FFFFFF' : AC_INK, 800); }); });
  }
  function cloud(T, K, t, d) {
    if (t < tAnd) return; const r = rollOff(t, tLeave, { dir: 1, v: 2400 }); if (r.gone) return; const p = popScale(t, tAnd), I = ocb_idle(t, 71), x = CL.x + r.dx + d.x * 0.3, y = CL.y + d.y * 0.3;
    X([K], x + I.dx, y + I.dy, p * I.s, I.rot + r.rot * 0.2 + (t > tNoth && !r.on ? Math.sin(t * 80) * 2 : 0), () => {
      ocb_shadow(K, -110, -30, 220, 100, 50, 10, 12); K.fillStyle = '#FFFFFF'; K.strokeStyle = '#111'; K.lineWidth = 5;
      K.beginPath(); K.arc(-60, 20, 50, Math.PI * 0.5, Math.PI * 1.5); K.arc(-10, -30, 64, Math.PI, Math.PI * 1.85); K.arc(60, 10, 54, Math.PI * 1.4, Math.PI * 0.5); K.closePath(); K.fill(); K.stroke();
      const ay = -((t * 1.6) % 1) * 30; K.strokeStyle = '#2F6FD0'; K.lineWidth = 9; K.beginPath(); K.moveTo(0, 50 + ay); K.lineTo(0, -6 + ay); K.moveTo(-22, 16 + ay); K.lineTo(0, -8 + ay); K.lineTo(22, 16 + ay); K.stroke();
      ac_tx(K, 'UPLOAD', 0, 92, 22, AC_GREY, 800, 'center', F.mono);
    });
    if (!r.on) drawOnX(T, K, x, y, t, tNoth - acF(2), { len: 260, w: 36 });
  }
  function local(T, K, t, d) {
    const st = stampKeys(t, tComp - acF(1)); if (!st.on) return; const x = 540 + d.x * 0.25, y = 870 + d.y * 0.25;
    if (st.landed) inkRing(K, x, y, t, tComp + acF(2), { r0: 160, r1: 300 });
    X([K], x, y + st.dy, st.s, -6, () => { K.save(); K.globalAlpha *= st.a; ocb_stamp(K, '100% LOCAL', 440, 120, 76, { t, col: '#3BB273' }); K.restore(); });
  }
  const MOODS = [['mouth', S0, tDubs - 0.07], ['pointUp', tDubs - 0.07, tNum - 0.07, { side: 'L' }], ['celebrate', tNum - 0.07, tAnd - 0.07], ['no', tAnd - 0.07, tComp - 0.07], ['thumbs', tComp - 0.07, S1 + 1]];
  const look = (t) => t < tDubs ? [540, 800] : t < tNum ? [VID.x, VID.y] : t < tAnd ? [CNT.x, CNT.y] : t < tComp ? [CL.x, CL.y] : [540, 870];
  crScene('dub', { S0, S1, label: '// 03 · 646 languages', moods: MOODS, lean: false, ambient: false, rate: 0.006, look }, (T, K, t) => {
    const d = DRIFT(t);
    ocb_stage(T, K, t, d, { push: [[tCrazy, 0.07], [tNumEnd, 0.05], [tEver, 0.03], [tComp, 0.05]], jolts: [tCrazy, tNumEnd, tComp], focus: [540, 820] }, () => {
      wash(K, t); ac_zoom(T, K, () => { burst(K, t, d); video(K, t, d); chips(K, t, d); counter(T, K, t, d); cloud(T, K, t, d); local(T, K, t, d); }, 1.1);
    });
  });
})();

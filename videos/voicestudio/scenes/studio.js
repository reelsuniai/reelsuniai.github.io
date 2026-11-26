// ═════ STUDIO [CUT_MIDDLE → CUT_DUB] "It's called VoiceStudio. Type anything, and it reads it back in a realistic AI voice, even on a ten-year-old laptop." ═════
//  called       → VoiceStudio app window FLIES IN from below (persistent hero)
//  VoiceStudio  → logo tile STAMPS on the window corner + ink ring, OPEN SOURCE pill ejects
//  Type         → keyboard slides up, keys press in sequence, text types into the script box
//  anything     → use-case chips eject from the script box (podcast · ads · YouTube · audiobook)
//  reads        → Synthesize button presses + ripple          back → waveform GROWS across the window, speaker arcs pulse
//  realistic    → naturalness meter fills to 98 % + green check     AI voice → AI VOICE pill slams, waveform flashes
//  even         → window shrinks INTO an old laptop rising from below (recompose)
//  ten-year-old → "2015" calendar sticker slams on the lid, cobwebs draw in       laptop → laptop lands (thud, dust), RUNS ON CPU pill
(() => {
  const S0 = CUT_MIDDLE, S1 = CUT_DUB;
  const tCalled = wi(25), tVS = wi(26), tType = wi(28), tAny = wi(29), tReads = wi(32), tBack = wi(34), tReal = wi(37), tAI = wi(38), tVoice = wi(39),
    tEven = wi(40), tTen = wi(43), tLap = wi(46);
  cue(tCalled - 0.1, 'whoosh', -6); cue(tVS, 'stamp', -2); cue(tVS + 0.25, 'pop', -9); cue(tAny, 'pop', -8); cue(tReads, 'click', -5); cue(tBack, 'swoosh', -8);
  cue(tReal, 'tick', -7); cue(tAI, 'pop', -6); cue(tEven, 'whoosh', -7); cue(tTen, 'stamp', -5); cue(tLap, 'thud', -3);
  for (let k = 0; k < 8; k++) cue(tType + k * acF(3), 'type', -12);
  const DRIFT = ocb_drift([S0, tCalled, tVS, tType, tReads, tReal, tEven, tLap, S1 + 0.4], 4.1);
  const WIN = { x: 540, y: 720 }, MSG = 'Welcome back to the channel!';
  const USES = ['podcast', 'ads', 'YouTube', 'audiobook'];
  // the VoiceStudio window content (w × h, centred), used standalone and inside the laptop screen
  function winBody(K, t, w, h) {
    fillRR(K, -w / 2, -h / 2, w, h, 0, VS_DARK);
    fillRR(K, -w / 2, -h / 2, w, 64, 0, '#271C2C'); ['#FF5F57', '#FEBC2E', '#28C840'].forEach((c, k) => circle(K, -w / 2 + 32 + k * 28, -h / 2 + 32, 9, c));
    ac_tx(K, 'VoiceStudio', 0, -h / 2 + 42, 26, '#F3E9F0', 700, 'center', F.mono);
    // script box
    const bx = -w / 2 + 36, by = -h / 2 + 96, bw = w - 72, bh = 150; fillRR(K, bx, by, bw, bh, 14, '#2A2030'); strokeRR(K, bx, by, bw, bh, 14, t >= tType && t < tReads ? VS_PINK : '#3E3044', 3);
    ac_tx(K, 'SCRIPT', bx + 20, by + 34, 18, '#9C8AA0', 800, 'left', F.mono);
    const nc = t < tType ? 0 : Math.min(MSG.length, Math.floor((t - tType) / acF(1.1))), s = MSG.slice(0, nc);
    ac_tx(K, s, bx + 20, by + 92, 36, '#FFFFFF', 600, 'left');
    if (Math.floor(t * 3) % 2 === 0 && t < tReads) { K.save(); K.font = '600 36px ' + F.grot; const cw = K.measureText(s).width; K.restore(); fillRR(K, bx + 24 + cw, by + 60, 4, 42, 2, VS_PINK); }
    // synthesize button
    const pr = t >= tReads - acF(2) && t < tReads + acF(3) ? 0.9 : 1, gx = bx + bw - 150, gy = by + bh + 30;
    X([K], gx, gy + 32, pr, 0, () => { fillRR(K, -150, -32, 300, 64, 32, t >= tReads ? VS_PINK : '#C2557F'); ac_tx(K, '▶  Synthesize', 0, 11, 28, '#FFFFFF', 800); });
    if (t >= tReads) { const rq = clamp((t - tReads) / 0.4); if (rq < 1) { K.strokeStyle = 'rgba(242,123,166,' + (1 - rq) + ')'; K.lineWidth = 5; K.beginPath(); K.ellipse(gx, gy + 32, 150 + 60 * rq, 32 + 30 * rq, 0, 0, TAU); K.stroke(); } }
    ac_tx(K, 'Voice: Narrator · EN', bx, gy + 44, 22, '#9C8AA0', 700, 'left', F.mono);
    // output waveform
    const wy = gy + 130, flash = t >= tVoice && t < tVoice + 0.3; fillRR(K, bx, wy - 60, bw, 120, 14, '#2A2030');
    if (t >= tBack - acF(2)) vs_wave(K, bx + 20, wy, bw - 40, flash ? 110 : 84, t, 7, flash ? '#FFFFFF' : VS_PINK, clamp((t - tBack + acF(2)) / 0.5));
    else ac_tx(K, 'output will appear here', 0, wy + 8, 22, '#6E5E72', 600, 'center', F.mono);
  }
  function win(T, K, t, d) {
    const f = flyInCard(t, tCalled + acF(2), 'B', WIN); if (!f.on || t >= tEven + acF(3)) return; const I = ocb_idle(t, 41, 0.6), w = 820, h = 560;
    const sh = E.inOutCubic(clamp((t - tEven) / acF(3))), s = lerp(1, 0.8, sh);
    X([K], (f.landed ? WIN.x + I.dx : f.x) + d.x * 0.15, (f.landed ? WIN.y + I.dy : f.y) + d.y * 0.15 + 40 * sh, f.s * s * I.s, f.rot + 1.2 + I.rot, () => {
      K.save(); ocb_skew(K, t, 41, 0.5); ocb_depth(K, -w / 2, -h / 2, w, h, 26, 1.2);
      K.save(); rr(K, -w / 2, -h / 2, w, h, 26); K.clip(); winBody(K, t, w, h); K.restore();
      ocb_boil(K, -w / 2, -h / 2, w, h, 26, '#111', 6, t, 41); ocb_bevel(K, -w / 2, -h / 2, w, h, 26, true); ocb_gloss(K, -w / 2, -h / 2, w, h, 26, t, { a: 0.08 }); K.restore();
    });
  }
  function logo(K, sz, t) {
    ocb_depth(K, -sz / 2, -sz / 2, sz, sz, sz * 0.24, 0.8); fillRR(K, -sz / 2, -sz / 2, sz, sz, sz * 0.24, vGrad(K, -sz / 2, sz / 2, ['#3A2240', VS_DARK]));
    for (let k = 0; k < 5; k++) { const hh = sz * [0.22, 0.46, 0.62, 0.4, 0.2][k] * (1 + 0.12 * Math.sin(t * 6 + k)); fillRR(K, -sz * 0.3 + k * sz * 0.14, -hh / 2, sz * 0.08, hh, sz * 0.04, k % 2 ? VS_ORANGE : VS_PINK); }
    strokeRR(K, -sz / 2, -sz / 2, sz, sz, sz * 0.24, '#111', 5); ocb_bevel(K, -sz / 2, -sz / 2, sz, sz, sz * 0.24, true); ocb_gloss(K, -sz / 2, -sz / 2, sz, sz, sz * 0.24, t, { a: 0.18, speed: 0.5 });
  }
  function brand(T, K, t, d) {
    if (t < tVS - acF(1) || t >= tEven) return; const st = stampKeys(t, tVS - acF(1)), I = ocb_idle(t, 42), x = 190 + d.x * 0.25, y = 430 + d.y * 0.25;
    if (st.landed) inkRing(K, x, y, t, tVS + acF(2), { r0: 90, r1: 200 });
    X([K], x + I.dx, y + I.dy + st.dy, st.s * I.s, -8 + I.rot, () => { K.save(); K.globalAlpha *= st.a; logo(K, 170, t); K.restore(); });
    const e = ejectFrom(t, tVS + 0.25, -60); if (e.on) X([K], 840 + d.x * 0.3, 420 + e.dy + d.y * 0.3, e.s, 5 + I.rot, () => vs_pill(K, 'OPEN SOURCE', 300, AC_INK, '#FFFFFF', 30));
  }
  function keyboard(K, t, d) {
    if (t < tType - 0.2 || t >= tReads + 0.4) return; const up = E.outBack(clamp((t - tType + 0.2) / 0.22)) - E.inCubic(clamp((t - tReads - 0.1) / 0.3)), I = ocb_idle(t, 43, 0.5);
    X([K], 470 + d.x * 0.3, 1130 + 500 * (1 - up) + I.dy + d.y * 0.3, I.s, -2 + I.rot, () => {
      const w = 640, h = 210; ocb_depth(K, -w / 2, -h / 2, w, h, 22, 0.8); fillRR(K, -w / 2, -h / 2, w, h, 22, '#D9D3CC');
      for (let r = 0; r < 3; r++) for (let c = 0; c < 10; c++) { const k = r * 10 + c, hit = t >= tType && Math.floor((t - tType) / acF(1.1)) % 30 === (k * 7) % 30 && t < tAny + 0.6;
        fillRR(K, -w / 2 + 22 + c * 60 + r * 14, -h / 2 + 20 + r * 60 + (hit ? 4 : 0), 52, 50, 9, hit ? VS_PINK : '#FFFFFF'); strokeRR(K, -w / 2 + 22 + c * 60 + r * 14, -h / 2 + 20 + r * 60 + (hit ? 4 : 0), 52, 50, 9, '#111', 2.5); }
      strokeRR(K, -w / 2, -h / 2, w, h, 22, '#111', 5);
    });
  }
  function chips(K, t, d) {
    if (t >= tEven) return; USES.forEach((u, k) => { const tc = tAny + k * acF(2), e = ejectFrom(t, tc, 50); if (!e.on) return; const I = ocb_idle(t, 44 + k);
      const x = [170, 410, 660, 880][k], y = [1010, 1060, 1030, 990][k] - 50 * clamp((t - tReads) / 0.3), w = 40 + u.length * 20;
      X([K], x + I.dx + d.x * 0.3, y + e.dy + I.dy + d.y * 0.3, e.s * I.s, (k - 1.5) * 5 + I.rot, () => { ocb_depth(K, -w / 2, -28, w, 56, 28, 0.5); fillRR(K, -w / 2, -28, w, 56, 28, k === 1 ? C.red : '#FFFFFF'); strokeRR(K, -w / 2, -28, w, 56, 28, '#111', 4); ac_tx(K, u, 0, 10, 28, k === 1 ? '#FFFFFF' : AC_INK, 800); }); });
  }
  function speaker(K, t, d) {
    if (t < tBack || t >= tEven) return; const p = popScale(t, tBack), x = 930 + d.x * 0.3, y = 640 + d.y * 0.3;
    X([K], x, y, p, -6, () => { fillRR(K, -40, -26, 30, 52, 6, AC_INK); K.fillStyle = AC_INK; K.beginPath(); K.moveTo(-14, -26); K.lineTo(16, -50); K.lineTo(16, 50); K.lineTo(-14, 26); K.fill();
      for (let k = 0; k < 3; k++) { const a = 0.4 + 0.6 * Math.max(0, Math.sin(t * 9 - k)); K.strokeStyle = 'rgba(255,59,31,' + a + ')'; K.lineWidth = 6; K.beginPath(); K.arc(16, 0, 24 + k * 18, -0.8, 0.8); K.stroke(); } });
  }
  function meter(K, t, d) {
    const f = flyInCard(t, tReal, 'L', { x: 300, y: 1140 }); if (!f.on || t >= tEven) return; const I = ocb_idle(t, 48), v = 0.98 * E.outCubic(clamp((t - tReal) / 0.35)), w = 380, h = 150;
    X([K], (f.landed ? 300 + I.dx : f.x) + d.x * 0.25, (f.landed ? 1140 + I.dy : f.y) + d.y * 0.25, f.s * I.s, f.rot - 3 + I.rot, () => {
      ocb_depth(K, -w / 2, -h / 2, w, h, 22, 0.8); fillRR(K, -w / 2, -h / 2, w, h, 22, '#FFFFFF'); ac_tx(K, 'NATURALNESS', -w / 2 + 26, -h / 2 + 42, 22, AC_GREY, 800, 'left', F.mono);
      fillRR(K, -w / 2 + 26, 0, w - 52, 30, 15, '#ECE8E4'); fillRR(K, -w / 2 + 26, 0, Math.max(30, (w - 52) * v), 30, 15, '#3BB273');
      ac_tx(K, Math.round(v * 100) + '%', w / 2 - 26, -h / 2 + 44, 30, AC_INK, 400, 'right', F.anton); strokeRR(K, -w / 2, -h / 2, w, h, 22, '#111', 5); ocb_gloss(K, -w / 2, -h / 2, w, h, 22, t, { a: 0.12 });
      const c = popScale(t, tReal + 0.35); if (c > 0) X([K], w / 2 - 10, h / 2 - 10, c, 0, () => { circle(K, 0, 0, 30, '#3BB273'); K.strokeStyle = '#FFF'; K.lineWidth = 7; K.beginPath(); K.moveTo(-13, 0); K.lineTo(-3, 11); K.lineTo(14, -10); K.stroke(); K.strokeStyle = '#111'; K.lineWidth = 4; K.beginPath(); K.arc(0, 0, 30, 0, TAU); K.stroke(); });
    });
    const s = slamScale(t, tAI); if (s > 0) X([K], 760 + d.x * 0.3, 1150 + d.y * 0.3, s, 4, () => vs_pill(K, 'AI VOICE', 250, VS_PINK, '#FFFFFF', 32));
    if (t >= tVoice) tickBurst(K, 760, 1150, t, tVoice, { r0: 160, n: 10, frames: 4 });
  }
  // ── the old laptop: rises on "even", window content now on its screen; 2015 sticker + cobwebs on "ten-year-old", lands on "laptop" ──
  function laptop(T, K, t, d) {
    if (t < tEven) return; const q = clamp((t - tEven) / (tLap - tEven)), land = t >= tLap, I = ocb_idle(t, 49, 0.6);
    const y = 760 + 700 * Math.pow(1 - q, 2.2), s = land ? 1 + 0.06 * Math.max(0, 1 - (t - tLap) / 0.15) : 1;
    X([K], 540 + d.x * 0.15, y + (land ? I.dy : 0) + d.y * 0.15, s * (land ? I.s : 1), (land ? I.rot * 0.5 : -4 * (1 - q)), () => {
      K.save(); ocb_skew(K, t, 49, 0.4);
      vs_laptop(K, t, 49, (w, h) => { X([K], 0, 0, Math.min(w / 820, h / 560), 0, () => winBody(K, t, 820, 560)); if (land) { const pq = clamp((t - tLap - 0.1) / 0.7); fillRR(K, -w / 2 + 30, h / 2 - 34, (w - 60), 14, 7, '#3E3044'); fillRR(K, -w / 2 + 30, h / 2 - 34, (w - 60) * pq, 14, 7, '#3BB273'); } }, { w: 760 });
      // grime + cobwebs
      const W = 760, H = W * 0.62, cq = E.outCubic(clamp((t - tTen) / 0.3));
      if (cq > 0) for (const [cx, cy, sx, sy] of [[-W / 2, -H / 2, 1, 1], [W / 2, -H / 2, -1, 1]]) { K.strokeStyle = 'rgba(240,240,240,0.85)'; K.lineWidth = 2.5;
        for (let k = 0; k < 4; k++) { K.beginPath(); K.moveTo(cx, cy); K.lineTo(cx + sx * 130 * cq * Math.cos(k * 0.45), cy + sy * 130 * cq * Math.sin(k * 0.45)); K.stroke(); }
        for (let r = 1; r <= 3; r++) { K.beginPath(); for (let k = 0; k < 4; k++) K.lineTo(cx + sx * r * 38 * cq * Math.cos(k * 0.45), cy + sy * r * 38 * cq * Math.sin(k * 0.45)); K.stroke(); } }
      K.restore();
    });
    const st = stampKeys(t, tTen - acF(1)); if (st.on) X([K], 830 + d.x * 0.25, 500 + st.dy + d.y * 0.25, st.s, 10, () => { K.save(); K.globalAlpha *= st.a;
      ocb_depth(K, -80, -90, 160, 180, 16, 0.6); fillRR(K, -80, -90, 160, 180, 16, '#FFFFFF'); fillRR(K, -80, -90, 160, 54, 16, C.red); K.fillStyle = C.red; K.fillRect(-80, -60, 160, 24);
      ac_tx(K, 'JAN', 0, -52, 30, '#FFFFFF', 400, 'center', F.anton); ac_tx(K, '2015', 0, 50, 64, AC_INK, 400, 'center', F.anton); strokeRR(K, -80, -90, 160, 180, 16, '#111', 5); K.restore(); });
    if (land) { tickBurst(K, 540, 1000, t, tLap, { r0: 440, n: 14, frames: 4 });
      for (let k = 0; k < 6; k++) { const dq = clamp((t - tLap) / 0.6); if (dq >= 1) break; circle(K, 540 + (k - 2.5) * 140 + (k - 2.5) * 60 * dq, 1010 - 50 * dq, 26 * (1 - dq) + 6, 'rgba(160,150,140,' + 0.5 * (1 - dq) + ')'); }
      const p = popScale(t, tLap + acF(3)); if (p > 0) X([K], 300 + d.x * 0.3, 1160 + d.y * 0.3, p, -5, () => vs_pill(K, 'RUNS ON CPU', 300, '#3BB273', '#FFFFFF', 32)); }
  }
  const MOODS = [['pointUp', S0, tType - 0.07, { side: 'L' }], ['nod', tType - 0.07, tReal - 0.07], ['thumbs', tReal - 0.07, tEven - 0.07], ['mouth', tEven - 0.07, tLap - 0.07], ['celebrate', tLap - 0.07, S1 + 1]];
  const look = (t) => t < tEven ? [WIN.x, WIN.y] : [540, 900];
  crScene('studio', { S0, S1, label: '// 02 · voicestudio', moods: MOODS, lean: false, ambient: false, rate: 0.006, look }, (T, K, t) => {
    const d = DRIFT(t);
    ocb_stage(T, K, t, d, { push: [[tVS, 0.05], [tBack, 0.03], [tTen, 0.04], [tLap, 0.06]], jolts: [tVS, tLap], focus: [540, 780] }, () => {
      ac_zoom(T, K, () => { keyboard(K, t, d); win(T, K, t, d); laptop(T, K, t, d); brand(T, K, t, d); chips(K, t, d); speaker(K, t, d); meter(K, t, d); }, 1.14);
    });
  });
})();

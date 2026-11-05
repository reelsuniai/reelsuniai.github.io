/* reel2 scene library — dense, illustrated stage objects (ref4 rule: a new object/state every 0.5-1.0 s).
 * Registered into the engine through window.REGISTER_SCENES. All art is drawn in code. Stage zone: y 560-1360, mascot owns x>560,y>1380.
 */
window.REGISTER_SCENES = function (G) {
  const { SC, w, we, pr, E, lerp, clamp, rnd, T, tw, pill, popK, marker, strike, xBadge, cursor, stamp, lightCard, darkWin, dotShadow, rr, RED, INK, GREY, F1, IMG, SANS, SERIF, MONO, STAMP, UI, stageXf, pitch } = G;
  const pop = (t, t0, d = 6 * F1) => (t < t0 ? 0 : clamp(E.outBack(pr(t, t0, t0 + d), 1.8), 0, 1.2));
  function sprung(ctx, t, t0, x, y, fn, d = 6 * F1) {       // pop-in around (x,y) with back-out overshoot
    const k = pop(t, t0, d); if (k <= 0) return;
    ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.globalAlpha = clamp(k * 1.4); fn(ctx); ctx.restore();
  }
  function tagCard(ctx, s, x, y, rot = 0, bg = '#FFFFFF', fg = INK) {   // small white label tag with a pin
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
    const ww = tw(ctx, s, 26, 800, UI) + 40; dotShadow(ctx, -ww / 2, -24, ww, 48, 8, 6, 7, 2);
    ctx.fillStyle = bg; rr(ctx, -ww / 2, -24, ww, 48, 8); ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.stroke();
    T(ctx, s, 0, 1, 26, 800, fg, UI, 'center'); ctx.fillStyle = RED; ctx.beginPath(); ctx.arc(0, -24, 7, 0, 7); ctx.fill(); ctx.restore();
  }
  function bigX(ctx, cx, cy, r, t, t0) {
    ctx.save(); ctx.strokeStyle = RED; ctx.lineWidth = 22; ctx.lineCap = 'round';
    const a = E.outC(pr(t, t0, t0 + 4 * F1)), b = E.outC(pr(t, t0 + 3 * F1, t0 + 7 * F1));
    if (a > 0) { ctx.beginPath(); ctx.moveTo(cx - r, cy - r); ctx.lineTo(cx - r + 2 * r * a, cy - r + 2 * r * a); ctx.stroke(); }
    if (b > 0) { ctx.beginPath(); ctx.moveTo(cx + r, cy - r); ctx.lineTo(cx + r - 2 * r * b, cy - r + 2 * r * b); ctx.stroke(); }
    ctx.restore();
  }
  function faceIcon(ctx, x, y, r) {       // generic person/face glyph
    ctx.fillStyle = '#F4C7A6'; ctx.strokeStyle = INK; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(x, y - r * 0.25, r * 0.42, 0, 7); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(x, y + r * 0.62, r * 0.7, r * 0.42, 0, Math.PI, 0); ctx.fill(); ctx.stroke();
    ctx.fillStyle = INK; [-1, 1].forEach((s) => { ctx.beginPath(); ctx.arc(x + s * r * 0.15, y - r * 0.3, r * 0.05, 0, 7); ctx.fill(); });
  }
  function shortCard(ctx, x, y, ww, hh, views, col, k = 0.4, extra) {   // a vertical Short thumbnail with a views pill
    dotShadow(ctx, x, y, ww, hh, 22, 10, 8, 2.2);
    ctx.fillStyle = '#0D0D10'; rr(ctx, x, y, ww, hh, 22); ctx.fill();
    ctx.save(); rr(ctx, x + 8, y + 8, ww - 16, hh - 16, 16); ctx.clip(); pitch(ctx, x + 8, y + 8, ww - 16, hh - 16, k); if (extra) extra(ctx); ctx.restore();
    if (views) { const pw = tw(ctx, views, 22, 800, UI) + 54; ctx.fillStyle = 'rgba(0,0,0,0.72)'; rr(ctx, x + 18, y + hh - 62, pw, 40, 20); ctx.fill();
      ctx.fillStyle = col || '#FFF'; ctx.beginPath(); ctx.moveTo(x + 34, y + hh - 52); ctx.lineTo(x + 50, y + hh - 42); ctx.lineTo(x + 34, y + hh - 32); ctx.fill();
      T(ctx, views, x + 58, y + hh - 41, 22, 800, col || '#FFF', UI); }
  }

  // ---------------------------------------------------------------- 1. face-cam rig crossed out -> a flopped Short
  SC.facecam = (ctx, t, s) => {
    stageXf(ctx, t, 0, 420, 950);
    const flop = t >= w(s.flopAt) - 0.12;
    if (!flop) {
      // tripod + ring light + phone with a face on it (frame 0 is already full)
      const cx = 380, cy = 880;
      ctx.strokeStyle = INK; ctx.lineWidth = 9; ctx.lineCap = 'round';
      [[-120, 470], [0, 480], [120, 470]].forEach(([dx, dy]) => { ctx.beginPath(); ctx.moveTo(cx, cy + 150); ctx.lineTo(cx + dx, cy + dy); ctx.stroke(); });
      ctx.beginPath(); ctx.moveTo(cx, cy + 150); ctx.lineTo(cx, cy + 40); ctx.stroke();
      ctx.save(); ctx.shadowColor = 'rgba(255,220,140,0.9)'; ctx.shadowBlur = 40 + 10 * Math.sin(t * 8); ctx.strokeStyle = '#FFF2CC'; ctx.lineWidth = 34; ctx.beginPath(); ctx.arc(cx, cy, 175, 0, 7); ctx.stroke(); ctx.restore();
      ctx.strokeStyle = INK; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(cx, cy, 193, 0, 7); ctx.stroke(); ctx.beginPath(); ctx.arc(cx, cy, 157, 0, 7); ctx.stroke();
      for (let i = 0; i < 24; i++) { const a = (i / 24) * Math.PI * 2; ctx.fillStyle = '#FFFFFF'; ctx.beginPath(); ctx.arc(cx + Math.cos(a) * 175, cy + Math.sin(a) * 175, 6, 0, 7); ctx.fill(); }
      ctx.fillStyle = '#0D0D10'; rr(ctx, cx - 70, cy - 125, 140, 250, 22); ctx.fill();
      ctx.fillStyle = '#DCE7F2'; rr(ctx, cx - 60, cy - 113, 120, 226, 16); ctx.fill(); faceIcon(ctx, cx, cy - 5, 70);
      ctx.fillStyle = RED; ctx.beginPath(); ctx.arc(cx + 40, cy - 92, 7 + (Math.floor(t * 3) % 2) * 2, 0, 7); ctx.fill();
      tagCard(ctx, 'FACE CAM', cx + 10, cy - 225, -0.08);
      // the problem chips on the right
      sprung(ctx, t, 0.0, 760, 760, (c) => pill(c, 'retakes: 14', -110, 0, 28, '#141414', '#FFF'));
      sprung(ctx, t, 0.25, 780, 860, (c) => pill(c, 'lighting ✗', -100, 0, 28, '#141414', '#FFF'));
      sprung(ctx, t, 0.45, 760, 960, (c) => pill(c, 'camera shy', -100, 0, 28, '#141414', '#FFF'));
      marker(ctx, cx, cy - 5, 120, 150, t, w(s.markAt), 0.5);
      if (t >= w(s.xAt)) bigX(ctx, cx, cy, 200, t, w(s.xAt));
      if (t >= w(s.xAt) + 4 * F1) stamp(ctx, '', 'NOT THE PROBLEM', 150, 1250, t, w(s.xAt) + 4 * F1, w(s.xAt) + 4 * F1, 1, 96);
    } else {
      // the flop: a Short whose views stall, fan of 2 more behind
      const k = E.outC(pr(t, w(s.flopAt) - 0.12, w(s.flopAt) + 0.1));
      ctx.save(); ctx.translate(0, 60 * (1 - k)); ctx.globalAlpha = k;
      ctx.save(); ctx.translate(250, 940); ctx.rotate(-0.12); shortCard(ctx, -130, -240, 260, 460, '41 views', '#FF8A8A', 0.2); ctx.restore();
      ctx.save(); ctx.translate(690, 940); ctx.rotate(0.12); shortCard(ctx, -130, -240, 260, 460, '58 views', '#FF8A8A', 0.6); ctx.restore();
      const n = Math.round(lerp(312, 37, E.outC(pr(t, w(s.flopAt), w(s.flopAt) + 0.4))));
      shortCard(ctx, 330, 650, 300, 540, n + ' views', '#FF5A5A', 0.4);
      // down arrow
      ctx.strokeStyle = RED; ctx.lineWidth = 14; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(700, 640); ctx.lineTo(760, 780); ctx.lineTo(820, 760); ctx.lineTo(880, 900); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(850, 890); ctx.lineTo(882, 905); ctx.lineTo(892, 870); ctx.stroke();
      ctx.restore();
      stamp(ctx, '', 'FLOP.', 150, 1290, t, w(s.stampAt), w(s.stampAt), 1, 150);
    }
  };

  // ---------------------------------------------------------------- 2. proof: the REAL Studio screenshot (unaltered), circled, + NO FACE stamp
  const SHOTW = 918 - 48, SHOTH = Math.round(1190 * (870 / 1630));
  SC.proof = (ctx, t, s) => {
    const t0 = w(s.at) - 0.2;
    const z = 1 + 0.05 * pr(t, t0, t0 + 5.0), cy = 935;
    ctx.save(); ctx.translate(540, cy); ctx.scale(z, z);
    const cw = 918, ch = SHOTH + 48;
    dotShadow(ctx, -cw / 2, -ch / 2, cw, ch, 36, 14);
    ctx.fillStyle = '#121212'; rr(ctx, -cw / 2, -ch / 2, cw, ch, 36); ctx.fill();
    ctx.save(); rr(ctx, -SHOTW / 2, -SHOTH / 2, SHOTW, SHOTH, 18); ctx.clip(); ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high'; ctx.filter = 'none';
    ctx.drawImage(IMG.shot, -SHOTW / 2, -SHOTH / 2, SHOTW, SHOTH); ctx.restore();
    // marker around "Views 9.2M" (box measured on the 1630x1190 file: centre 408,700; 430x178)
    const k = SHOTW / 1630; marker(ctx, -SHOTW / 2 + 408 * k, -SHOTH / 2 + 700 * k, 430 * k, 178 * k, t, w(s.markAt), 99);
    ctx.restore();
    T(ctx, 'My channel · last 28 days · YouTube Studio', 540, cy + ch / 2 * z + 44, 30, 600, GREY, SANS, 'center');
    // 28-day tear-off calendar chip (outside the screenshot)
    sprung(ctx, t, w(s.calAt), 880, 610, (c) => { dotShadow(c, -70, -70, 140, 150, 16, 8, 7, 2); c.fillStyle = '#FFF'; rr(c, -70, -70, 140, 150, 16); c.fill(); c.strokeStyle = INK; c.lineWidth = 4; c.stroke();
      c.fillStyle = RED; rr(c, -70, -70, 140, 40, [16, 16, 0, 0]); c.fill(); T(c, 'DAYS', 0, -50, 22, 800, '#FFF', UI, 'center'); T(c, '28', 0, 22, 72, 400, INK, STAMP, 'center'); });
    stamp(ctx, s.stampLine, s.stampWord, 150, 1440, t, w(s.stampAt), w(s.stampKey), 80, 130);
  };

  // ---------------------------------------------------------------- 3. the first second: stopwatch + retention crash
  SC.second = (ctx, t, s) => {
    stageXf(ctx, t, w(s.at));
    const cx = 330, cy = 900, r = 210;
    ctx.fillStyle = INK; rr(ctx, cx - 40, cy - r - 70, 80, 50, 10); ctx.fill(); rr(ctx, cx - 16, cy - r - 30, 32, 34, 6); ctx.fill();
    dotShadow(ctx, cx - r, cy - r, 2 * r, 2 * r, r, 14);
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.fillStyle = '#FFF'; ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 12; ctx.stroke();
    for (let i = 0; i < 60; i++) { const a = (i / 60) * Math.PI * 2 - Math.PI / 2, l = i % 5 ? 14 : 30; ctx.strokeStyle = i < 6 ? RED : INK; ctx.lineWidth = i % 5 ? 3 : 6; ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * (r - 18), cy + Math.sin(a) * (r - 18)); ctx.lineTo(cx + Math.cos(a) * (r - 18 - l), cy + Math.sin(a) * (r - 18 - l)); ctx.stroke(); }
    // red wedge = the first second
    const sw = E.outC(pr(t, w(s.at), w(s.wedgeAt) + 0.2));
    ctx.fillStyle = 'rgba(225,10,15,0.22)'; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, r - 20, -Math.PI / 2, -Math.PI / 2 + sw * (Math.PI * 2 / 60) * 6); ctx.closePath(); ctx.fill();
    const ha = -Math.PI / 2 + sw * (Math.PI * 2 / 60) * 6; ctx.strokeStyle = RED; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(ha) * (r - 40), cy + Math.sin(ha) * (r - 40)); ctx.stroke();
    ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(cx, cy, 14, 0, 7); ctx.fill();
    T(ctx, '0:01', cx, cy + 90, 64, 400, RED, STAMP, 'center');
    // retention card on the right drops on "first"
    sprung(ctx, t, w(s.graphAt), 790, 830, (c) => { lightCard(c, -200, -170, 400, 340, 20); T(c, '// retention', -170, -130, 20, 500, GREY, MONO);
      c.strokeStyle = INK; c.lineWidth = 6; c.beginPath(); c.moveTo(-160, -90); c.lineTo(-120, -70); c.lineTo(-90, 60); c.lineTo(160, 90); c.stroke();
      c.fillStyle = RED; c.beginPath(); c.arc(-90, 60, 10, 0, 7); c.fill(); T(c, '0:01', -90, 120, 22, 700, RED, MONO, 'center'); });
    marker(ctx, 700, 870, 70, 110, t, w(s.markAt), 2);
    sprung(ctx, t, w(s.markAt) + 0.1, 780, 1120, (c) => pill(c, 'most swipe here', -140, 0, 28, RED, '#FFF'));
  };

  // ---------------------------------------------------------------- 4. Claude writes 10 hooks -> you pick one
  const HK = ['Watch his left foot.', 'Nobody saw this.', 'The ref froze.', 'Zero space.', 'This is illegal.', 'Wait for it.', 'He missed. Then…', 'Three seconds.', 'Read the keeper.', 'Luckiest pass?'];
  SC.hooks10 = (ctx, t, s) => {
    stageXf(ctx, t, w(s.at));
    const x = 70, y = 590, ww = 940, hh = 760; darkWin(ctx, x, y, ww, hh, 'Claude');
    const pr1 = 'Write 10 hooks under 8 words', n = Math.round(pr1.length * pr(t, w(s.at), we(s.typeTo)));
    ctx.fillStyle = '#2B2A2F'; rr(ctx, x + 30, y + 80, ww - 60, 76, 18); ctx.fill(); T(ctx, pr1.slice(0, n), x + 60, y + 118, 32, 500, '#F2F0F6', UI);
    const picked = t >= w(s.pickAt);
    HK.forEach((h, i) => {
      const t0 = w(s.gridAt) + i * 0.05; if (t < t0) return;
      const col = i % 2, row = Math.floor(i / 2), cx = x + 50 + col * 430, cy = y + 190 + row * 108, best = i === s.best;
      const lift = best && picked ? E.outBack(pr(t, w(s.pickAt), w(s.pickAt) + 6 * F1), 2) : 0;
      ctx.save(); ctx.globalAlpha = (picked && !best ? 0.35 : 1) * clamp(pr(t, t0, t0 + 3 * F1)); ctx.translate(cx + 200, cy + 45); ctx.scale(1 + 0.12 * lift, 1 + 0.12 * lift); ctx.translate(-(cx + 200), -(cy + 45));
      ctx.fillStyle = best && picked ? '#FFFFFF' : '#2B2A2F'; rr(ctx, cx, cy, 400, 90, 14); ctx.fill();
      if (best && picked) { ctx.strokeStyle = RED; ctx.lineWidth = 5; rr(ctx, cx, cy, 400, 90, 14); ctx.stroke(); }
      T(ctx, String(i + 1).padStart(2, '0'), cx + 22, cy + 45, 22, 700, best && picked ? RED : '#77757E', MONO);
      T(ctx, h, cx + 70, cy + 45, 28, 600, best && picked ? INK : '#F2F0F6', UI);
      ctx.restore();
    });
    if (picked) { const bx = x + 50 + (s.best % 2) * 430, by = y + 190 + Math.floor(s.best / 2) * 108; sprung(ctx, t, w(s.pickAt) + 2 * F1, bx + 360, by - 6, (c) => pill(c, 'PICKED', -60, 0, 22, RED, '#FFF')); }
    const c0 = w(s.pickAt) - 0.32, cp = E.inOutC(pr(t, c0, c0 + 9 * F1));
    if (t > c0 - 0.1) { const bx = x + 50 + (s.best % 2) * 430 + 300, by = y + 190 + Math.floor(s.best / 2) * 108 + 50; cursor(ctx, lerp(x + ww + 20, bx, cp), lerp(y + hh + 40, by, cp), (t >= w(s.pickAt) && t < w(s.pickAt) + 2 * F1 ? 0.9 : 1) * 1.6); }
    sprung(ctx, t, w(s.countAt), 870, 560, (c) => pill(c, '10 hooks', -80, 0, 26, '#141414', '#FFF'));
  };

  // ---------------------------------------------------------------- 5. scissors cut every line that doesn't raise the stakes
  const LN = ['Watch his left foot.', 'So, quick backstory first.', 'Two defenders. Zero space.', 'Anyway, this was Tuesday.', 'Big shout out to my editor.', "He doesn't shoot. He passes.", 'Goal. The crowd loses it.'];
  SC.scissors = (ctx, t, s) => {
    stageXf(ctx, t, w(s.at));
    const x = 110, y = 600, ww = 860, hh = 640; lightCard(ctx, x, y, ww, hh);
    T(ctx, '// my_script.md', x + 40, y + 50, 22, 500, GREY, MONO);
    const cutAt = s.cuts.map((ci, j) => [ci, w(s.cutWords[j])]);
    const left = LN.length - cutAt.filter(([, tt]) => t >= tt).length;
    pill(ctx, `${left} lines`, x + ww - 170, y + 50, 22, left < LN.length ? RED : '#141414', '#FFF');
    LN.forEach((ln, i) => {
      const yy = y + 120 + i * 74, c = cutAt.find(([ci]) => ci === i), ct = c ? c[1] : 1e9, f = pr(t, ct + 0.2, ct + 0.4);
      ctx.save(); if (t >= ct) { ctx.globalAlpha = 1 - 0.6 * f; ctx.translate(30 * f, 0); }
      T(ctx, ln, x + 50, yy, 34, 600, t >= ct ? '#9A9792' : INK, SANS); ctx.restore();
      if (c) strike(ctx, x + 44, yy + 2, x + 60 + tw(ctx, ln, 34, 600), t, ct);
    });
    // scissors travel down the card between cuts
    if (t >= w(s.cutWords[0]) - 0.25 && t < we(s.cutWords[s.cutWords.length - 1]) + 0.4) {
      let sy = y + 120 + s.cuts[0] * 74; cutAt.forEach(([ci, tt]) => { if (t >= tt - 0.2) sy = lerp(sy, y + 120 + ci * 74, E.inOutC(pr(t, tt - 0.2, tt))); });
      const open = 0.08 + Math.abs(Math.sin(t * 14)) * 0.3, sx = x + ww - 150;
      ctx.save(); ctx.translate(sx, sy); ctx.scale(1.5, 1.5); ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.lineJoin = 'round';
      [open, -open].forEach((a) => {           // blade (points left) + ring handle (right), pivot at 0,0
        ctx.save(); ctx.rotate(a);
        ctx.beginPath(); ctx.moveTo(8, -7); ctx.lineTo(-95, -2); ctx.quadraticCurveTo(-100, 0, -95, 3); ctx.lineTo(8, 7); ctx.closePath(); ctx.fillStyle = '#D9DDE4'; ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(-90, 0); ctx.lineTo(0, 0); ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = 2; ctx.stroke(); ctx.strokeStyle = INK; ctx.lineWidth = 4;
        ctx.beginPath(); ctx.moveTo(6, 0); ctx.lineTo(30, a > 0 ? 14 : -14); ctx.stroke();
        ctx.beginPath(); ctx.ellipse(48, a > 0 ? 22 : -22, 22, 15, 0, 0, 7); ctx.fillStyle = RED; ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.ellipse(48, a > 0 ? 22 : -22, 11, 7, 0, 0, 7); ctx.fillStyle = '#FFFFFF'; ctx.fill(); ctx.stroke();
        ctx.restore();
      });
      ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(0, 0, 5, 0, 7); ctx.fill();
      ctx.restore();
    }
    stamp(ctx, s.stampLine, s.stampWord, 150, 1300, t, w(s.stampAt), w(s.stampKey), 72, 150);
  };

  // ---------------------------------------------------------------- 6. still wide open: a crowd with a gap that starts filling
  SC.crowd = (ctx, t, s) => {
    stageXf(ctx, t, w(s.at));
    const x0 = 80, y0 = 620, cols = 16, rows = 9, gx = 58, gy = 66;
    const gap = (c, r) => c >= 9 && c <= 13 && r >= 2 && r <= 6;
    const fill = pr(t, w(s.fillAt), we(s.fillTo) + 0.2);
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const X = x0 + c * gx + (r % 2) * 18, Y = y0 + r * gy, inGap = gap(c, r);
      const appear = (r * cols + c) / (rows * cols) * 0.6;
      if (t < w(s.at) - 0.2 + appear * 0.5) continue;
      if (inGap && rnd(c * 17 + r * 31) > fill * 1.15) continue;
      const faceless = rnd(c * 7 + r * 13) > 0.86 || (inGap && fill > 0);
      ctx.fillStyle = faceless ? RED : '#9C9893';
      ctx.beginPath(); ctx.arc(X, Y, 13, 0, 7); ctx.fill(); ctx.beginPath(); ctx.ellipse(X, Y + 30, 20, 14, 0, Math.PI, 0); ctx.fill();
    }
    T(ctx, 'faceless creators', x0, y0 - 40, 24, 600, RED, SANS); T(ctx, 'everyone else', x0 + 330, y0 - 40, 24, 600, '#77736E', SANS);
    if (t >= w(s.openAt) && fill <= 0.05) marker(ctx, x0 + 11 * gx + 9, y0 + 4 * gy + 10, 175, 190, t, w(s.openAt), 9);
    stamp(ctx, '', s.stampWord, 520, 900, t, w(s.stampKey), w(s.stampKey), 1, 110);
    // spots-left meter fills as the gap fills
    if (t >= w(s.fillAt) - 0.1) {
      const left = Math.max(1, Math.round(lerp(10, 2, fill)));
      lightCard(ctx, 110, 1240, 470, 110, 18); T(ctx, 'SPOTS LEFT', 140, 1295, 26, 800, INK, UI);
      for (let i = 0; i < 10; i++) { ctx.fillStyle = i < 10 - left ? RED : '#E4E1DD'; rr(ctx, 340 + i * 22, 1278, 16, 34, 4); ctx.fill(); }
    }
  };

  // ---------------------------------------------------------------- 7. CTA: comment HOOK -> SENT -> DM with the prompts
  SC.comment = (ctx, t, s) => {
    stageXf(ctx, t, w(s.at));
    const x = 110, y = 620, ww = 860;
    lightCard(ctx, x, y, ww, 150, 24);
    ctx.fillStyle = '#E9E6E2'; ctx.beginPath(); ctx.arc(x + 70, y + 75, 34, 0, 7); ctx.fill(); faceIcon(ctx, x + 70, y + 78, 40);
    const kw = 'HOOK', n = Math.round(kw.length * pr(t, w(s.typeAt), we(s.typeAt)));
    T(ctx, n ? kw.slice(0, n) : 'Add a comment…', x + 130, y + 75, 40, n ? 800 : 500, n ? INK : '#A9A6A2', UI);
    if (n < kw.length && Math.floor(t * 4) % 2 === 0) { ctx.fillStyle = INK; ctx.fillRect(x + 134 + tw(ctx, kw.slice(0, n), 40, 800, UI), y + 50, 4, 50); }
    const sent = t >= w(s.sendAt);
    ctx.fillStyle = sent ? RED : '#C9C6C2'; ctx.beginPath(); ctx.arc(x + ww - 70, y + 75, 36, 0, 7); ctx.fill();
    ctx.fillStyle = '#FFF'; ctx.beginPath(); ctx.moveTo(x + ww - 88, y + 60); ctx.lineTo(x + ww - 48, y + 75); ctx.lineTo(x + ww - 88, y + 90); ctx.lineTo(x + ww - 80, y + 75); ctx.fill();
    // big red keyword pill (the comment posts)
    sprung(ctx, t, we(s.typeAt) + 0.02, 540, 920, (c) => { 
      c.fillStyle = RED; rr(c, -260, -80, 520, 160, 80); c.fill(); dotShadow(c, -260, -80, 520, 160, 80, 10, 8, 2.2); c.fillStyle = RED; rr(c, -260, -80, 520, 160, 80); c.fill();
      T(c, 'HOOK', -30, 4, 110, 400, '#FFF', STAMP, 'center'); c.strokeStyle = '#FFF'; c.lineWidth = 12; c.lineCap = 'round'; c.beginPath(); c.moveTo(130, 2); c.lineTo(160, 32); c.lineTo(205, -30); c.stroke(); });
    // paper plane flies out on "send"
    if (t >= w(s.sendAt) && t < w(s.sendAt) + 0.6) { const p = E.inOutC(pr(t, w(s.sendAt), w(s.sendAt) + 0.6)); ctx.save(); ctx.translate(lerp(700, 1000, p), lerp(900, 560, p)); ctx.rotate(-0.5);
      ctx.fillStyle = '#FFF'; ctx.strokeStyle = INK; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(-50, 20); ctx.lineTo(55, -25); ctx.lineTo(-20, 40); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore(); }
    if (t >= w(s.sendAt)) stamp(ctx, '', 'SENT', 690, 1030, t, w(s.sendAt) + 0.05, w(s.sendAt) + 0.05, 1, 90);
    // DM card with the prompts
    sprung(ctx, t, w(s.dmAt), 340, 1220, (c) => { lightCard(c, -230, -95, 460, 190, 22); c.save(); c.imageSmoothingEnabled = true; c.drawImage(IMG.logo, -205, -70, 64, 64); c.restore();
      T(c, G.R.brand.handle, -125, -40, 30, 700, INK, SANS); T(c, 'sent you a message', -125, -6, 22, 500, GREY, SANS);
      c.fillStyle = '#F1EEEA'; rr(c, -205, 22, 410, 54, 14); c.fill(); c.fillStyle = RED; rr(c, -195, 32, 34, 34, 6); c.fill(); T(c, 'my_hook_prompts.txt', -148, 49, 24, 600, INK, UI); });
  };
};

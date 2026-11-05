/* reel5 — his choreography, frame by frame: clean paper, ONE hero object that transforms into the next,
 * every spoken keyword triggers a visible action on its exact word (type / click / circle / stamp / tick).
 * Shot 1 (0 -> "Then"): phone -> Claude Code window -> three crossed-out cards fly back into it -> zoom to the input,
 *   typed prompt -> build checklist (script, voice, scenes) -> back out to the phone: "THIS ONE".
 * Shot 2 (after the halftone wipe): motion check -> free tools -> comment CTA with flipping letter tiles.
 */
window.REGISTER_SCENES = function (G) {
  const { SC, w, we, pr, E, lerp, clamp, rnd, T, tw, pill, marker, strike, cursor, stamp, lightCard, dotShadow, rr, RED, INK, GREY, F1, IMG, SANS, MONO, STAMP, UI } = G;
  const at = (i) => w(i), en = (i) => we(i);
  const ease = (t, a, d, f = E.outC) => f(pr(t, a, a + d));
  const back = (t, a, d = 7 * F1, s = 1.9) => (t < a ? 0 : E.outBack(pr(t, a, a + d), s));
  const L = (a, b, k) => a + (b - a) * k;
  const SHC = {};
  function sh(img) { if (SHC[img.src]) return SHC[img.src]; const c = document.createElement('canvas'); c.width = img.width; c.height = img.height; const x = c.getContext('2d'); x.drawImage(img, 0, 0); x.globalCompositeOperation = 'source-in';
    const tl = document.createElement('canvas'); tl.width = tl.height = 8; const q = tl.getContext('2d'); q.fillStyle = 'rgba(20,16,16,0.55)'; q.beginPath(); q.arc(4, 4, 2.2, 0, 7); q.fill(); x.fillStyle = x.createPattern(tl, 'repeat'); x.fillRect(0, 0, c.width, c.height); return (SHC[img.src] = c); }
  function img(ctx, key, cx, cy, h, rot = 0, a = 1) { const im = IMG[key]; if (!im || a <= 0) return; const ww = (im.width / im.height) * h; ctx.save(); ctx.globalAlpha *= a; ctx.translate(cx, cy); ctx.rotate(rot); ctx.imageSmoothingEnabled = true; ctx.drawImage(sh(im), -ww / 2 + 10, -h / 2 + 9, ww, h); ctx.drawImage(im, -ww / 2, -h / 2, ww, h); ctx.restore(); }

  // ---------------------------------------------------------------- realistic app window (his dark UI), drawn at any centre/scale
  function appWin(ctx, cx, cy, s, t, o = {}) {
    const ww = 640, hh = 420;
    ctx.save(); ctx.translate(cx, cy); ctx.scale(s, s); ctx.translate(-ww / 2, -hh / 2);
    dotShadow(ctx, 0, 0, ww, hh, 16, 12, 7, 2);
    ctx.fillStyle = '#1D1C21'; rr(ctx, 0, 0, ww, hh, 16); ctx.fill(); ctx.strokeStyle = '#34323B'; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = '#26252B'; rr(ctx, 0, 0, ww, 40, [16, 16, 0, 0]); ctx.fill();
    ['#FF5F57', '#FEBC2E', '#28C840'].forEach((c, i) => { ctx.fillStyle = c; ctx.beginPath(); ctx.arc(22 + i * 20, 20, 6, 0, 7); ctx.fill(); });
    T(ctx, 'Claude Code', 92, 21, 17, 600, '#D8D6DE', UI); T(ctx, '⌄', 196, 18, 15, 600, '#8C8A94', UI);
    T(ctx, 'ai-video', ww - 22, 21, 15, 500, '#8C8A94', MONO, 'right');
    T(ctx, 'Started on this computer · ~/ai-video', 24, 62, 14, 500, '#7D7B85', UI);
    if (o.view === 'build') {
      T(ctx, '✳  Building your reel', 24, 104, 20, 700, '#ECEAF2', UI);
      o.rows.forEach(([lab, sub, t0, t1], i) => { const y = 150 + i * 72, on = t >= t0, done = t >= t1;
        ctx.fillStyle = done ? 'rgba(225,10,15,0.10)' : on ? '#27262D' : 'transparent'; rr(ctx, 18, y - 28, ww - 36, 56, 10); ctx.fill();
        if (done) { ctx.fillStyle = RED; ctx.beginPath(); ctx.arc(46, y, 14, 0, 7); ctx.fill(); ctx.strokeStyle = '#FFF'; ctx.lineWidth = 3.5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(39, y); ctx.lineTo(44, y + 5); ctx.lineTo(53, y - 5); ctx.stroke(); }
        else if (on) { ctx.strokeStyle = RED; ctx.lineWidth = 3.5; ctx.beginPath(); ctx.arc(46, y, 12, t * 9, t * 9 + 4.2); ctx.stroke(); }
        else { ctx.strokeStyle = '#4A4952'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(46, y, 12, 0, 7); ctx.stroke(); }
        T(ctx, lab, 76, y - 8, 20, 700, on ? '#F2F0F6' : '#6E6C76', UI); T(ctx, sub, 76, y + 14, 14, 500, '#8C8A94', UI);
        if (on && !done) T(ctx, Math.round(100 * pr(t, t0, t1)) + '%', ww - 36, y, 16, 700, RED, MONO, 'right'); else if (done) T(ctx, 'done', ww - 36, y, 16, 600, '#8C8A94', MONO, 'right'); });
    } else {
      // empty state: sparkle + question
      const sp = 1 + 0.08 * Math.sin(t * 5); ctx.save(); ctx.translate(ww / 2, 150); ctx.scale(sp, sp); ctx.strokeStyle = '#E8754F'; ctx.lineWidth = 4; ctx.lineCap = 'round';
      for (let k = 0; k < 6; k++) { const a = (k / 6) * Math.PI * 2 + t * 0.6; ctx.beginPath(); ctx.moveTo(Math.cos(a) * 5, Math.sin(a) * 5); ctx.lineTo(Math.cos(a) * 18, Math.sin(a) * 18); ctx.stroke(); } ctx.restore();
      T(ctx, 'What should we build?', ww / 2, 200, 22, 600, '#D8D6DE', UI, 'center');
    }
    // input bar
    const glow = o.glow || 0, iy = hh - 96;
    if (glow > 0) { ctx.save(); ctx.shadowColor = `rgba(225,10,15,${0.8 * glow})`; ctx.shadowBlur = 24 * glow; ctx.strokeStyle = RED; ctx.lineWidth = 3; rr(ctx, 18, iy, ww - 36, 58, 14); ctx.stroke(); ctx.restore(); }
    ctx.fillStyle = '#2A2930'; rr(ctx, 18, iy, ww - 36, 58, 14); ctx.fill(); if (glow > 0) { ctx.strokeStyle = RED; ctx.lineWidth = 3 * glow; rr(ctx, 18, iy, ww - 36, 58, 14); ctx.stroke(); }
    T(ctx, '+', 40, iy + 29, 22, 500, '#8C8A94', UI);
    const txt = o.text || '';
    T(ctx, txt || 'Reply to Claude…  ↵ to send', 64, iy + 30, 18, 500, txt ? '#F2F0F6' : '#6E6C76', txt ? MONO : UI);
    if (o.caret && Math.floor(t * 4) % 2 === 0) { ctx.fillStyle = RED; ctx.fillRect(66 + tw(ctx, txt, 18, 500, MONO), iy + 17, 3, 26); }
    const sent = o.sent || 0; ctx.fillStyle = sent > 0 ? RED : '#4A4952'; ctx.beginPath(); ctx.arc(ww - 46, iy + 29, 16 * (1 + 0.25 * Math.sin(Math.PI * clamp(sent))), 0, 7); ctx.fill();
    ctx.strokeStyle = '#FFF'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(ww - 46, iy + 37); ctx.lineTo(ww - 46, iy + 21); ctx.moveTo(ww - 53, iy + 28); ctx.lineTo(ww - 46, iy + 21); ctx.lineTo(ww - 39, iy + 28); ctx.stroke();
    T(ctx, 'Auto', 24, hh - 18, 13, 500, '#7D7B85', UI); T(ctx, 'Opus 5.5  Medium', ww - 24, hh - 18, 13, 500, '#7D7B85', UI, 'right');
    ctx.restore();
    return { inputX: cx + (64 - ww / 2) * s, inputY: cy + (iy + 29 - hh / 2) * s, sendX: cx + (ww / 2 - 46) * s };
  }
  // a phone showing a tiny version of this reel (paper, caption bars, an object, the mascot photo)
  function phone(ctx, cx, cy, s, t, a = 1) {
    if (a <= 0 || s <= 0.01) return;
    const ww = 380, hh = 720; ctx.save(); ctx.globalAlpha *= a; ctx.translate(cx, cy); ctx.scale(s, s); ctx.translate(-ww / 2, -hh / 2);
    dotShadow(ctx, 0, 0, ww, hh, 50, 12, 7, 2); ctx.fillStyle = '#0D0D10'; rr(ctx, 0, 0, ww, hh, 50); ctx.fill();
    ctx.save(); rr(ctx, 14, 14, ww - 28, hh - 28, 38); ctx.clip(); ctx.fillStyle = '#F2F0EE'; ctx.fillRect(0, 0, ww, hh);
    const k = Math.floor(t * 2.2) % 3, keys = ['o_camera', 'o_magnifier', 'o_piggy'];
    ctx.fillStyle = INK; rr(ctx, 40, 70, 220, 18, 5); ctx.fill(); ctx.fillStyle = RED; rr(ctx, 40, 98, 130 + 40 * Math.sin(t * 3), 18, 5); ctx.fill();
    const o = IMG[keys[k]]; if (o) { const h = 230, w2 = (o.width / o.height) * h; ctx.drawImage(o, ww / 2 - w2 / 2, 200 + Math.sin(t * 4) * 8, w2, h); }
    const m = IMG.m_wave1; if (m) { const h = 260, w2 = (m.width / m.height) * h; ctx.drawImage(m, ww - w2 + 10, hh - h - 14, w2, h); }
    ctx.fillStyle = 'rgba(255,255,255,0.4)'; ctx.fillRect(14, hh - 26, ww - 28, 5); ctx.fillStyle = RED; ctx.fillRect(14, hh - 26, (ww - 28) * ((t / 18) % 1), 5);
    ctx.restore(); ctx.fillStyle = '#0D0D10'; rr(ctx, ww / 2 - 50, 24, 100, 26, 13); ctx.fill(); ctx.restore();
  }
  function bigX(ctx, cx, cy, r, t, t0) { if (t < t0) return; ctx.save(); ctx.strokeStyle = RED; ctx.lineWidth = 16; ctx.lineCap = 'round'; const a = E.outC(pr(t, t0, t0 + 4 * F1)), b = E.outC(pr(t, t0 + 3 * F1, t0 + 7 * F1));
    ctx.beginPath(); ctx.moveTo(cx - r, cy - r); ctx.lineTo(cx - r + 2 * r * a, cy - r + 2 * r * a); ctx.stroke(); if (b > 0) { ctx.beginPath(); ctx.moveTo(cx + r, cy - r); ctx.lineTo(cx + r - 2 * r * b, cy - r + 2 * r * b); ctx.stroke(); } ctx.restore(); }
  function slamText(ctx, s, x, y, size, t, t0, col = RED, rot = -0.05, align = 'center') {   // T4 slam: 1.3 -> 0.97 -> 1, pink -> red, dashes, debris
    if (t < t0) return; const p = pr(t, t0, t0 + 4 * F1), k = p < 0.5 ? L(1.35, 0.97, p / 0.5) : L(0.97, 1, (p - 0.5) / 0.5);
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k); T(ctx, s, 0, 0, size, 400, p < 0.5 ? '#F3A6A6' : col, STAMP, align); ctx.restore();
    if (t < t0 + 6 * F1 && Math.floor(t * 30) % 2 === 0) { ctx.strokeStyle = RED; ctx.lineWidth = 5; ctx.lineCap = 'round'; const wd = tw(ctx, s, size, 400, STAMP) * (align === 'center' ? 0.5 : 1);
      for (let q = 0; q < 8; q++) { const a = (q / 8) * Math.PI * 2 + 0.4, r0 = wd * 0.6 + 14, r1 = r0 + 26; ctx.beginPath(); ctx.moveTo(x + Math.cos(a) * r0, y + Math.sin(a) * r0 * 0.5); ctx.lineTo(x + Math.cos(a) * r1, y + Math.sin(a) * r1 * 0.5); ctx.stroke(); } }
    if (window.FX) FX.debris(ctx, t, t0, x, y, 12, Math.round(t0 * 7));
  }
  function arrowTag(ctx, s, x, y, t, t0) {    // his "↑ TYPE THIS": arrow + condensed label, letters ghost-then-solid
    if (t < t0) return; const k = back(t, t0, 6 * F1, 2.2);
    ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.strokeStyle = RED; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, 46); ctx.lineTo(0, -6); ctx.moveTo(-14, 8); ctx.lineTo(0, -8); ctx.lineTo(14, 8); ctx.stroke();
    const n = Math.min(s.length, Math.floor((t - t0) / F1) + 1); T(ctx, s.slice(0, n), 26, 26, 58, 400, INK, STAMP); ctx.restore();
  }
  function bracket(ctx, x0, y0, x1, y1, k) {  // red corner brackets ("THIS ONE")
    if (k <= 0) return; const l = 50 * k, g = 14 * (1 - k); ctx.save(); ctx.strokeStyle = RED; ctx.lineWidth = 7; ctx.lineCap = 'round';
    [[x0 - g, y0 - g, 1, 1], [x1 + g, y0 - g, -1, 1], [x0 - g, y1 + g, 1, -1], [x1 + g, y1 + g, -1, -1]].forEach(([x, y, sx, sy]) => { ctx.beginPath(); ctx.moveTo(x + sx * l, y); ctx.lineTo(x, y); ctx.lineTo(x, y + sy * l); ctx.stroke(); }); ctx.restore();
  }
  function cardTile(ctx, kind, label, cx, cy, s, t) {   // small white card with an object + label
    ctx.save(); ctx.translate(cx, cy); ctx.scale(s, s); dotShadow(ctx, -105, -120, 210, 240, 18, 8, 7, 2); ctx.fillStyle = '#FFF'; rr(ctx, -105, -120, 210, 240, 18); ctx.fill(); ctx.strokeStyle = '#E2DFDC'; ctx.lineWidth = 2; ctx.stroke();
    if (kind === 'timeline') { ctx.fillStyle = '#1D1C21'; rr(ctx, -80, -95, 160, 120, 10); ctx.fill(); ['#E10A0F', '#3B7BFF', '#F8A800'].forEach((c, j) => { ctx.fillStyle = c; rr(ctx, -66 + j * 16, -78 + j * 32, 100 - j * 14, 20, 4); ctx.fill(); }); ctx.fillStyle = '#FFF'; ctx.fillRect(4, -92, 3, 112); }
    else img(ctx, kind, 0, -36, 150, Math.sin(t * 3 + cx) * 0.05);
    T(ctx, label, 0, 82, 30, 400, INK, STAMP, 'center'); ctx.restore();
  }

  // ================================================================ SHOT 1
  SC.shot1 = (ctx, t, S) => {
    const wMade = at(6), wNo = at(8), wType = at(14), wBuild = at(18), wWatch = at(29);
    // --- phone (hero at frame 0) -> shrinks aside when Claude Code arrives -> fades into the window on "No"
    let pS = 1, pX = 540, pY = 900, pA = 1;
    const k1 = ease(t, wMade - 0.1, 8 * F1, E.inOutC); pS = L(1, 0.5, k1); pX = L(540, 250, k1); pY = L(900, 1010, k1);
    const k2 = ease(t, wNo - 0.15, 6 * F1, E.inC); pS *= L(1, 0.2, k2); pX = L(pX, 560, k2); pY = L(pY, 860, k2); pA = 1 - k2;
    // phone returns on "you're watching"
    const k9 = ease(t, wWatch - 0.12, 8 * F1, E.outBack); if (t >= wWatch - 0.12) { pS = L(0.3, 0.95, k9); pX = 560; pY = L(980, 900, clamp(k9)); pA = clamp(k9 * 2); }
    // --- the app window
    const wIn = back(t, wMade - 0.05, 8 * F1, 1.6);
    let aX = L(1250, 720, clamp(wIn)), aY = 860, aS = 0.82 * Math.max(0.01, wIn);
    const kC = ease(t, wNo - 0.15, 8 * F1, E.inOutC); aX = L(aX, 540, kC); aY = L(aY, 1060, kC); aS = L(aS, 0.92, kC);
    const kZ = ease(t, wType - 0.25, 9 * F1, E.inOutC); aY = L(aY, 980, kZ); aS = L(aS, 1.38, kZ);                 // zoom to the input
    const kB = ease(t, wBuild + 0.05, 9 * F1, E.inOutC); aS = L(aS, 1.25, kB); aY = L(aY, 900, kB);                 // build view
    const kO = ease(t, wWatch - 0.15, 8 * F1, E.inOutC); aX = L(aX, 540, kO); aS = L(aS, 0.0, kO); aY = L(aY, 860, kO); // collapses into the phone
    // three cards pop OUT of the window on each "No", get crossed on the noun, then fly back INTO it
    const cards = [['o_camera', 'CAMERA', 8, 9], ['timeline', 'EDITOR', 10, 11], ['o_palette', 'ANIMATOR', 12, 13]];
    const back2 = ease(t, at(14) - 0.35, 7 * F1, E.inC);
    if (t >= wNo - 0.1 && back2 < 1) cards.forEach(([k, lab, wiNo, wiX], i) => {
      const t0 = at(wiNo) - 0.08, p = back(t, t0, 7 * F1, 1.8); if (p <= 0) return;
      const cx = L(aX, 210 + i * 330, clamp(p)), cy = L(aY, 640, clamp(p)), s = clamp(p, 0, 1.2) * (1 - back2) + 0.001;
      const fx = L(cx, aX, back2), fy = L(cy, aY, back2);
      cardTile(ctx, k, lab, fx, fy + Math.sin(t * 3 + i) * 4, s, t);
      if (back2 <= 0) { bigX(ctx, fx, fy - 30, 78, t, at(wiX)); if (t >= at(wiX) && t < at(wiX) + 3 * F1) { ctx.save(); ctx.translate((rnd(Math.floor(t * 30)) - 0.5) * 8, 0); ctx.restore(); } }
    });
    if (back2 < 1) slamText(ctx, 'NONE OF IT.', 540, 860, 96, t, en(13) + 0.05);
    phone(ctx, pX, pY, pS, t, pA);
    // window draw
    if (aS > 0.02) {
      const typing = t >= at(15), txt = 'make a reel about how this reel was made', n = typing ? Math.round(txt.length * pr(t, at(15), en(17) - 0.05)) : 0;
      const view = t >= wBuild + 0.05 ? 'build' : 'empty';
      const rows = [['Script', 'hook · proof · steps · cta', at(19), en(21)], ['Voice', 'am_michael · 18 s', at(22), en(24)], ['Scenes', '7 scenes · animated', at(26), en(28)]];
      const geo = appWin(ctx, aX, aY, aS, t, { view, rows, text: view === 'build' ? '' : txt.slice(0, n), caret: typing && view !== 'build', glow: view === 'build' ? 0 : ease(t, wType - 0.05, 5 * F1), sent: pr(t, at(18), at(18) + 6 * F1) });
      // cursor glides to the input and clicks on "typed"
      const c0 = at(14) - 0.15, cp = E.inOutC(pr(t, c0, c0 + 9 * F1));
      if (t > c0 && t < at(18) + 0.3) { const tx = geo.inputX + 30, ty = geo.inputY + 6, X = L(940, tx, cp), Y = L(1500, ty, cp);
        const trail = cp > 0 && cp < 1 ? [1, 2, 3].map((q) => { const qq = E.inOutC(pr(t - q * F1, c0, c0 + 9 * F1)); return [L(940, tx, qq), L(1500, ty, qq)]; }) : null;
        cursor(ctx, X, Y, (t >= at(15) && t < at(15) + 2 * F1 ? 0.88 : 1) * 1.5, trail);
        if (t >= at(15) && t < at(15) + 0.3) { const rp = pr(t, at(15), at(15) + 0.3); ctx.strokeStyle = RED; ctx.globalAlpha = 1 - rp; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(tx, ty, L(10, 60, rp), 0, 7); ctx.stroke(); ctx.globalAlpha = 1; } }
      if (view !== 'build' && t >= at(15)) arrowTag(ctx, 'TYPE THIS', geo.inputX - 10, geo.inputY + 120, t, at(15) + 0.05);
      if (view !== 'build' && t >= at(16)) { const k = back(t, at(16), 6 * F1, 2.4); ctx.save(); ctx.translate(860, geo.inputY - 120); ctx.rotate(-0.08); ctx.scale(k, k); ctx.fillStyle = RED; rr(ctx, -110, -46, 220, 92, 46); ctx.fill(); T(ctx, '1 LINE', 0, 4, 62, 400, '#FFF', STAMP, 'center'); ctx.restore(); }
      // step badge morph (his: tiny -> huge slam -> into the window corner)
      if (view === 'build') { const bt = wBuild + 0.05, p = pr(t, bt, bt + 3 * F1), q = ease(t, bt + 3 * F1, 7 * F1, E.inOutC);
        const bx = L(540, aX + 320 * aS - 10, q), by = L(860, aY - 210 * aS + 10, q), bs = L(L(0.4, 2.6, E.outBack(p, 2)), 0.9, q), rot = L(-0.35, 0, q);
        G.badge(ctx, 3, bx, by, t, bt, bs * (aS > 0.3 ? 1 : 0)); void rot; }
    }
    // side chips flying out of the build rows (script card, waveform, film strip)
    if (t >= en(21) && kO < 1) { const k = back(t, en(21), 7 * F1); ctx.save(); ctx.translate(L(540, 230, clamp(k)), L(900, 1290 + 20 * Math.sin(t * 2), clamp(k))); ctx.rotate(-0.08); ctx.scale(k * (1 - kO), k * (1 - kO)); lightCard(ctx, -120, -80, 240, 160, 14);
      ['HOOK', 'PROOF', 'CTA'].forEach((h, i) => { ctx.fillStyle = RED; rr(ctx, -100, -60 + i * 46, 70, 22, 5); ctx.fill(); T(ctx, h, -65, -48 + i * 46, 13, 800, '#FFF', UI, 'center'); ctx.fillStyle = '#D9D6D2'; rr(ctx, -20, -54 + i * 46, 110, 10, 4); ctx.fill(); }); ctx.restore(); }
    if (t >= en(24) && kO < 1) { const k = back(t, en(24), 7 * F1); ctx.save(); ctx.translate(L(540, 640, clamp(k)), L(900, 1300 + 20 * Math.cos(t * 2), clamp(k))); ctx.rotate(0.07); ctx.scale(k * (1 - kO), k * (1 - kO)); lightCard(ctx, -130, -70, 260, 140, 14);
      for (let i = 0; i < 26; i++) { const a2 = (0.3 + 0.7 * Math.abs(Math.sin(i * 1.3 + t * 8))) * 80; ctx.fillStyle = i < 26 * ((t * 0.7) % 1) ? RED : '#C9C6C2'; rr(ctx, -110 + i * 8.5, -a2 / 2, 5, a2, 2); ctx.fill(); } ctx.restore(); }
    if (t >= at(26) && kO < 1) { const k = ease(t, at(26), 10 * F1); ctx.save(); ctx.translate(0, L(1800, 1500, k)); ctx.globalAlpha = 1 - kO;
      ctx.fillStyle = '#111'; ctx.fillRect(0, -80, 1080, 160); for (let i = 0; i < 18; i++) { ctx.fillStyle = '#F2F0EE'; ctx.fillRect(((i * 64 - t * 220) % 1150 + 1150) % 1150 - 40, -72, 26, 14); ctx.fillRect(((i * 64 - t * 220) % 1150 + 1150) % 1150 - 40, 58, 26, 14); }
      const keys = ['o_camera', 'o_palette', 'o_magnifier', 'o_piggy', 'o_trophy', 'o_gift', 'o_mic', 'o_filmreel']; keys.forEach((kk, i) => { const x0 = ((i * 160 - t * 220) % 1280 + 1280) % 1280 - 100; ctx.fillStyle = '#F2F0EE'; ctx.fillRect(x0, -50, 140, 100); img(ctx, kk, x0 + 70, 0, 84); });
      ctx.restore(); }
    // THIS ONE: red brackets around the returned phone
    if (t >= wWatch) { const k = ease(t, at(30) - 0.05, 6 * F1, E.outBack); bracket(ctx, 560 - 190 * 0.95, 900 - 360 * 0.95, 560 + 190 * 0.95, 900 + 360 * 0.95, k); slamText(ctx, 'THIS ONE.', 300, 1340, 110, t, at(30)); }
    // the opening marker around the phone on "reel"
    if (t < wMade) marker(ctx, 540, 900, 250, 420, t, at(2), 9);
    if (t >= at(4) && t < wMade + 0.4) { const k = back(t, at(4), 6 * F1, 2.2); ctx.save(); ctx.translate(860, 560); ctx.rotate(0.06); ctx.scale(k * (1 - ease(t, wMade + 0.1, 6 * F1)), k * (1 - ease(t, wMade + 0.1, 6 * F1))); pill(ctx, 'MADE BY', -90, 0, 30, INK, '#FFF'); ctx.restore(); }
  };

  // ================================================================ SHOT 2
  SC.shot2 = (ctx, t, S) => {
    const wFix = at(38), wPass = at(41), wTool = at(42), wFree = at(48), wCom = at(49);
    // --- MOTION CHECK card: graph + film strip, playhead scans, FLAT -> FIXED -> PASS
    const out = ease(t, wTool - 0.15, 8 * F1, E.inOutC);
    if (out < 1) {
      ctx.save(); ctx.translate(540, 900); const s = L(1, 0.4, out); ctx.scale(s, s); ctx.translate(-540 + L(0, -700, out), -900 + L(0, -600, out)); ctx.globalAlpha = 1 - out;
      lightCard(ctx, 90, 600, 900, 560, 20); T(ctx, 'MOTION CHECK', 130, 652, 56, 400, INK, STAMP);
      const fixed = t >= wFix; pill(ctx, fixed ? 'fixed ✓' : 'scanning…', 790, 652, 22, fixed ? RED : '#141414', '#FFF');
      const gx = 130, gy = 720, gw = 820, gh = 230, bad = [[0.3, 0.42], [0.64, 0.76]], fk = ease(t, wFix, 8 * F1, E.outBack);
      ctx.strokeStyle = '#ECE9E5'; ctx.lineWidth = 2; for (let i = 0; i <= 4; i++) { ctx.beginPath(); ctx.moveTo(gx, gy + (gh * i) / 4); ctx.lineTo(gx + gw, gy + (gh * i) / 4); ctx.stroke(); }
      ctx.strokeStyle = INK; ctx.lineWidth = 5; ctx.beginPath();
      for (let k = 0; k <= 200; k++) { const u = k / 200, ib = bad.some(([a, b]) => u > a && u < b); const v = 0.5 + 0.4 * Math.sin(u * 46) * (ib ? L(0.1, 1, fk) : 1) * (0.55 + 0.45 * rnd(k)); const X = gx + u * gw, Y = gy + gh * (1 - v); k ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); } ctx.stroke();
      const ph = ease(t, at(31), en(36) - at(31), (k) => k); ctx.fillStyle = RED; ctx.fillRect(gx + ph * gw - 2, gy - 16, 4, gh + 150);
      ctx.beginPath(); ctx.moveTo(gx + ph * gw - 12, gy - 24); ctx.lineTo(gx + ph * gw + 12, gy - 24); ctx.lineTo(gx + ph * gw, gy - 8); ctx.fill();
      for (let i = 0; i < 8; i++) { const fx = gx + i * 103; ctx.fillStyle = '#111'; rr(ctx, fx, gy + gh + 24, 96, 100, 8); ctx.fill(); img(ctx, ['o_camera', 'o_palette', 'o_magnifier', 'o_piggy', 'o_trophy', 'o_gift', 'o_mic', 'o_filmreel'][i], fx + 48, gy + gh + 74, 70); }
      if (t >= at(35)) bad.forEach(([a, b], i) => { const p = back(t, at(35) + i * 0.1, 5 * F1, 2); if (p <= 0) return; ctx.save(); ctx.strokeStyle = fixed ? '#22A33A' : RED; ctx.lineWidth = 5; ctx.setLineDash([14, 8]); rr(ctx, gx + a * gw, gy - 8, (b - a) * gw, gh + 140, 10); ctx.stroke(); ctx.setLineDash([]);
        ctx.translate(gx + (a + b) / 2 * gw, gy - 30); ctx.scale(p, p); pill(ctx, fixed ? 'FIXED' : 'FLAT', -50, 0, 24, fixed ? '#22A33A' : RED, '#FFF'); ctx.restore(); });
      if (t >= wPass) { const p = pr(t, wPass, wPass + 4 * F1), k = p < 0.5 ? L(1.5, 0.95, p / 0.5) : L(0.95, 1, (p - 0.5) / 0.5); ctx.save(); ctx.translate(540, 850); ctx.rotate(-0.13); ctx.scale(k, k); ctx.strokeStyle = RED; ctx.lineWidth = 12; rr(ctx, -190, -78, 380, 156, 16); ctx.stroke(); T(ctx, 'PASS', 0, 6, 128, 400, RED, STAMP, 'center'); ctx.restore(); if (window.FX) FX.debris(ctx, t, wPass, 540, 850, 16, 41); }
      ctx.restore();
    }
    // --- the tools: three tiles; each price tag flips to FREE on its word; "$0" slam on "free"
    const outT = ease(t, wCom - 0.15, 7 * F1, E.inOutC);
    if (t >= wTool - 0.15 && outT < 1) {
      ctx.save(); ctx.globalAlpha = 1 - outT; ctx.translate(0, -300 * outT);
      [['o_mic', 'VOICE', 42], ['o_palette', '3D IMAGES', 44], ['o_filmreel', 'RENDER', 46]].forEach(([k, lab, wi], i) => {
        const p = back(t, at(wi) - 0.1, 7 * F1, 1.8); if (p <= 0) return; const cx = 210 + i * 330, cy = 820;
        ctx.save(); ctx.translate(cx, cy); ctx.scale(p, p); dotShadow(ctx, -140, -170, 280, 340, 20, 10, 7, 2); ctx.fillStyle = '#FFF'; rr(ctx, -140, -170, 280, 340, 20); ctx.fill(); ctx.strokeStyle = '#E2DFDC'; ctx.lineWidth = 2; ctx.stroke();
        img(ctx, k, 0, -50, 180, Math.sin(t * 3 + i) * 0.06); T(ctx, lab, 0, 80, 34, 400, INK, STAMP, 'center');
        const flip = ease(t, at(wi) + 0.18, 6 * F1, E.inOutC), sx = Math.abs(Math.cos(flip * Math.PI)); ctx.save(); ctx.translate(0, 135); ctx.scale(Math.max(0.05, sx), 1);
        const isFree = flip >= 0.5; ctx.fillStyle = isFree ? RED : '#141414'; rr(ctx, -80, -24, 160, 48, 24); ctx.fill(); T(ctx, isFree ? 'FREE' : 'PAID?', 0, 1, 26, 800, '#FFF', UI, 'center'); ctx.restore();
        ctx.restore(); });
      if (t >= wFree) { const p = pr(t, wFree, wFree + 4 * F1), k = p < 0.5 ? L(1.5, 0.95, p / 0.5) : L(0.95, 1, (p - 0.5) / 0.5); ctx.save(); ctx.translate(540, 1200); ctx.scale(k, k); T(ctx, '$0', 0, 0, 210, 400, RED, STAMP, 'center'); ctx.restore();
        const rp = pr(t, wFree, wFree + 0.4); if (rp < 1) { ctx.strokeStyle = RED; ctx.globalAlpha = 1 - rp; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(540, 1200, L(80, 420, E.outC(rp)), 0, 7); ctx.stroke(); ctx.globalAlpha = 1; } if (window.FX) FX.debris(ctx, t, wFree, 540, 1200, 18, 48, '#FFC928'); }
      ctx.restore();
    }
    // --- CTA: dark comment bar; letter tiles R E E L flip in (2 f apart), bar turns red, check burst; SENT; DM card
    if (t >= wCom - 0.15) {
      const k = back(t, wCom - 0.15, 7 * F1, 1.5), y = L(1400, 720, clamp(k));
      const red = t >= en(50); ctx.save(); ctx.translate(540, y); dotShadow(ctx, -440, -64, 880, 128, 64, 10, 7, 2);
      ctx.fillStyle = red ? RED : '#1D1C21'; rr(ctx, -440, -64, 880, 128, 64); ctx.fill();
      ctx.fillStyle = red ? '#FFF' : RED; ctx.beginPath(); ctx.arc(-370, 0, 30, 0, 7); ctx.fill(); ctx.fillStyle = red ? RED : '#1D1C21'; ctx.beginPath(); ctx.arc(-370, 0, 14, 0, 7); ctx.fill();
      const lt = at(50) - 0.05, letters = 'REEL'.split('');
      if (t < lt) T(ctx, 'Add a comment…', -310, 2, 34, 500, '#8C8A94', UI);
      letters.forEach((ch, i) => { const t0 = lt + i * 2 * F1, p = pr(t, t0, t0 + 6 * F1); if (p <= 0) return; const flip = Math.cos((1 - E.outBack(p, 1.6)) * Math.PI * 0.5), x = -300 + i * 92;
        ctx.save(); ctx.translate(x, 0); ctx.rotate((1 - p) * 0.6); ctx.scale(1, Math.max(0.05, flip)); ctx.fillStyle = '#FFF'; rr(ctx, -38, -44, 76, 88, 10); ctx.fill(); T(ctx, ch, 0, 4, 66, 400, RED, STAMP, 'center'); ctx.restore(); });
      const cp = back(t, en(50) + 0.05, 7 * F1, 2.4); if (cp > 0) { ctx.save(); ctx.translate(370, 0); ctx.scale(cp, cp); ctx.fillStyle = '#FFF'; ctx.beginPath(); ctx.arc(0, 0, 38, 0, 7); ctx.fill(); ctx.strokeStyle = RED; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-15, 0); ctx.lineTo(-4, 12); ctx.lineTo(17, -12); ctx.stroke(); ctx.restore(); }
      ctx.restore();
      if (red && window.FX) FX.debris(ctx, t, en(50) + 0.05, 910, y, 14, 50);
      if (t >= at(53)) { slamText(ctx, 'SENT', 780, 900, 110, t, at(53) + 0.03, RED, -0.12);
        const pp = E.inOutC(pr(t, at(53), at(53) + 0.5)); if (pp < 1) { ctx.save(); ctx.translate(L(900, 1100, pp), L(720, 480, pp)); ctx.rotate(-0.5); ctx.fillStyle = '#FFF'; ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-40, 16); ctx.lineTo(44, -20); ctx.lineTo(-16, 32); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore(); } }
      // DM card (phone-style inbox row) slides up on "setup"
      const dk = back(t, at(56) - 0.1, 7 * F1, 1.6); if (dk > 0) { ctx.save(); ctx.translate(400, L(1500, 1090, clamp(dk))); ctx.scale(clamp(dk, 0, 1.1), clamp(dk, 0, 1.1)); lightCard(ctx, -300, -100, 600, 200, 24);
        ctx.save(); ctx.imageSmoothingEnabled = true; ctx.drawImage(IMG.logo, -270, -70, 76, 76); ctx.restore(); T(ctx, G.R.brand.handle, -176, -42, 34, 700, INK, SANS); T(ctx, 'sent you the setup · now', -176, -4, 22, 500, GREY, SANS);
        ctx.fillStyle = '#F1EEEA'; rr(ctx, -270, 30, 540, 50, 12); ctx.fill(); ctx.fillStyle = RED; rr(ctx, -260, 39, 32, 32, 6); ctx.fill(); T(ctx, 'reel_setup.zip', -214, 55, 24, 600, INK, MONO); ctx.restore(); }
    }
  };
};

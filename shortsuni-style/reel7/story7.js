/* reel6 — first 5 s, choreographed beat-for-beat against ref7 0.0-5.0 s (our words, our objects).
 * Clean paper only. One hero at a time. Every keyword triggers its action on the word onset.
 */
window.REGISTER_SCENES = function (G) {
  const { SC, w, we, pr, E, clamp, rnd, T, tw, marker, dotShadow, rr, RED, INK, GREY, F1, IMG, UI, STAMP, MONO } = G;
  const L = (a, b, k) => a + (b - a) * k;
  const back = (t, a, d = 6 * F1, s = 1.8) => (t < a ? 0 : E.outBack(pr(t, a, a + d), s));
  const SHC = {};
  function sh(img) { if (SHC[img.src]) return SHC[img.src]; const c = document.createElement('canvas'); c.width = img.width; c.height = img.height; const x = c.getContext('2d'); x.drawImage(img, 0, 0); x.globalCompositeOperation = 'source-in';
    const tl = document.createElement('canvas'); tl.width = tl.height = 8; const q = tl.getContext('2d'); q.fillStyle = 'rgba(20,16,16,0.55)'; q.beginPath(); q.arc(4, 4, 2.2, 0, 7); q.fill(); x.fillStyle = x.createPattern(tl, 'repeat'); x.fillRect(0, 0, c.width, c.height); return (SHC[img.src] = c); }
  function img(ctx, key, cx, cy, h, rot = 0) { if (window.VEC && VEC.draw(ctx, key, cx, cy, h, rot)) return; const im = IMG[key]; if (!im) return; const ww = (im.width / im.height) * h; ctx.save(); ctx.translate(cx, cy); ctx.rotate(rot); ctx.imageSmoothingEnabled = true; ctx.drawImage(im, -ww / 2, -h / 2, ww, h); ctx.restore(); }

  // ---------------------------------------------------------------- phone with a reel playing (content swaps every ~0.27 s like his)
  const FRAMES = [['o_piggy', 'SAVE IT'], ['o_camera', 'NO CAMERA'], ['o_trophy', 'VIRAL.'], ['o_magnifier', 'LOOK'], ['o_filmreel', 'EVERY SCENE'], ['o_gift', 'FREE']];
  function reelScreen(ctx, x, y, ww, hh, t, seed = 0, plain = false) {
    ctx.fillStyle = '#F7F5F2'; ctx.fillRect(x, y, ww, hh);
    if (plain) { ctx.strokeStyle = '#C9C6C2'; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(x + ww / 2, y + hh * 0.42, ww * 0.18, 0, 7); ctx.stroke(); ctx.fillStyle = '#D9D6D2'; for (let i = 0; i < 4; i++) { rr(ctx, x + ww * 0.15, y + hh * 0.65 + i * 30, ww * (0.7 - i * 0.1), 12, 5); ctx.fill(); } return; }
    const k = (Math.floor(t / 0.27) + seed) % FRAMES.length, [key, word] = FRAMES[k];
    T(ctx, 'Why your Shorts', x + 22, y + 52, 26, 800, INK, UI); T(ctx, 'get 0 views.', x + 22, y + 84, 26, 800, RED, UI);
    img(ctx, key, x + ww / 2, y + hh * 0.48, hh * 0.36, Math.sin(t * 6) * 0.06);
    T(ctx, word, x + ww / 2, y + hh * 0.75, 40, 400, RED, STAMP, 'center');
    if (IMG.logo) { const h = hh * 0.13; ctx.drawImage(IMG.logo, x + ww - h - 16, y + hh - h - 26, h, h); }
    ctx.fillStyle = 'rgba(0,0,0,0.12)'; ctx.fillRect(x, y + hh - 10, ww, 5); ctx.fillStyle = RED; ctx.fillRect(x, y + hh - 10, ww * ((t * 0.4 + seed * 0.3) % 1), 5);
  }
  function phone(ctx, cx, cy, s, rot, t, o = {}) {
    if (s <= 0.01) return; const ww = 360, hh = 700;
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(rot); ctx.scale(s, s); ctx.translate(-ww / 2, -hh / 2);
    dotShadow(ctx, 0, 0, ww, hh, 50, 12, 7, 2); ctx.fillStyle = '#0D0D10'; rr(ctx, 0, 0, ww, hh, 50); ctx.fill(); ctx.strokeStyle = '#3A3A42'; ctx.lineWidth = 3; ctx.stroke();
    ctx.save(); rr(ctx, 14, 14, ww - 28, hh - 28, 38); ctx.clip(); reelScreen(ctx, 14, 14, ww - 28, hh - 28, t, o.seed || 0, o.plain); ctx.restore();
    ctx.fillStyle = '#0D0D10'; rr(ctx, ww / 2 - 52, 26, 104, 28, 14); ctx.fill();
    ctx.restore();
  }
  function heart(ctx, x, y, s, a) { ctx.save(); ctx.globalAlpha = a; ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#FF4D6D'; ctx.beginPath(); ctx.moveTo(0, 9); ctx.bezierCurveTo(-14, -1, -6, -12, 0, -4); ctx.bezierCurveTo(6, -12, 14, -1, 0, 9); ctx.fill(); ctx.restore(); }
  function viewsPill(ctx, x, y, t, k) {   // his ticking counter; ours shows the real 9.2M with a pulsing play icon
    if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
    dotShadow(ctx, -10, -40, 250, 80, 16, 6, 6, 1.8); ctx.fillStyle = '#FFF'; rr(ctx, -10, -40, 250, 80, 16); ctx.fill(); ctx.strokeStyle = '#E2DFDC'; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(26, 0, 22, 0, 7); ctx.fill(); ctx.fillStyle = '#FFF'; ctx.beginPath(); ctx.moveTo(19, -11); ctx.lineTo(35, 0); ctx.lineTo(19, 11); ctx.fill();
    T(ctx, '9.2M', 60, -6, 40, 800, INK, UI); T(ctx, 'views · 28 days', 62, 24, 15, 600, GREY, UI);
    ctx.fillStyle = RED; ctx.beginPath(); ctx.arc(232, -34, 6 + Math.abs(Math.sin(t * 6)) * 2, 0, 7); ctx.fill();
    ctx.restore();
    for (let i = 0; i < 7; i++) { const p = ((t * 0.9 + i / 7) % 1); heart(ctx, x + 210 + Math.sin(i * 2 + t * 3) * 24, y - 50 - p * 130, 1.4 + rnd(i) * 0.8, (1 - p) * k); }
  }
  function appWin(ctx, cx, cy, s, t, txt) {
    const ww = 700, hh = 430; ctx.save(); ctx.translate(cx, cy); ctx.scale(s, s); ctx.translate(-ww / 2, -hh / 2);
    dotShadow(ctx, 0, 0, ww, hh, 18, 12, 7, 2); ctx.fillStyle = '#1D1C21'; rr(ctx, 0, 0, ww, hh, 18); ctx.fill();
    ctx.fillStyle = '#26252B'; rr(ctx, 0, 0, ww, 44, [18, 18, 0, 0]); ctx.fill(); ['#FF5F57', '#FEBC2E', '#28C840'].forEach((c, i) => { ctx.fillStyle = c; ctx.beginPath(); ctx.arc(24 + i * 22, 22, 7, 0, 7); ctx.fill(); });
    T(ctx, 'Claude Code', 100, 23, 18, 600, '#D8D6DE', UI); T(ctx, 'ai-video', ww - 24, 23, 16, 500, '#8C8A94', MONO, 'right');
    ctx.fillStyle = '#2A2930'; rr(ctx, 22, hh - 100, ww - 44, 62, 14); ctx.fill(); T(ctx, txt, 46, hh - 68, 19, 500, '#F2F0F6', MONO);
    T(ctx, 'Auto', 26, hh - 18, 14, 500, '#7D7B85', UI); T(ctx, 'Opus 5.5', ww - 26, hh - 18, 14, 500, '#7D7B85', UI, 'right');
    ctx.restore();
  }

  // ================================================================ beat 1: "Here's how to make reels like this with Claude Code."
  SC.hook = (ctx, t) => {
    const fan = E.outBack(pr(t, w(4) - 0.05, w(4) + 7 * F1), 1.6), fold = E.inC(pr(t, w(6) - 0.05, w(6) + 5 * F1)), f = clamp(fan) * (1 - fold);
    const drop = E.inOutC(pr(t, w(8) + 0.05, we(9) + 0.12));            // phone shrinks and drops into the window
    const winIn = E.outBack(pr(t, w(8) - 0.12, w(8) + 8 * F1), 1.4);
    const pz = 1 + 0.04 * pr(t, 0, w(8));                                   // slow push like his
    ctx.save(); ctx.translate(540, 980); ctx.scale(pz, pz); ctx.translate(-540, -980);
    const drawWin = () => {
    if (winIn > 0) { const wy = L(1900, 1180, clamp(winIn)); appWin(ctx, 540, wy, 1.38, t, 'make a reel about faceless Shorts|'.slice(0, Math.max(0, Math.round(34 * pr(t, w(8), we(9) + 0.3)))));
      if (drop > 0.3) { const pk = pr(t, w(8) + 0.25, we(9) + 0.4); ctx.save(); ctx.translate(540, wy - 60); ctx.scale(1, 0.28); for (let r = 0; r < 4; r++) { ctx.strokeStyle = `rgba(225,10,15,${(0.7 - r * 0.15) * (1 - pk * 0.4)})`; ctx.lineWidth = 10; ctx.beginPath(); ctx.arc(0, 0, 140 + r * 34 + Math.sin(t * 9 + r) * 8, 0, 7); ctx.stroke(); } ctx.restore(); } }
    };
    if (drop < 0.5) drawWin();
    // side phones fan out on "reels", fold on "this"
    if (f > 0.01) { phone(ctx, L(540, 270, f), 950, 0.98, L(0, -0.2, f), t, { seed: 2, plain: true }); phone(ctx, L(540, 810, f), 950, 0.98, L(0, 0.2, f), t, { seed: 4, plain: true }); }
    // hero phone
    const ps = L(1.12, 0.82, drop), py = L(930, 830, drop);
    phone(ctx, 540, py, ps, Math.sin(t * 2.2) * 0.02, t);
    if (drop >= 0.5) { ctx.save(); ctx.globalAlpha = 1; drawWin(); ctx.restore(); }
    viewsPill(ctx, L(700, 690, drop), L(620, 660, drop), t, E.outBack(pr(t, 0, 6 * F1), 1.6));
    ctx.restore();
    // marker ellipse on "this" (draws in 6 f)
    if (t < w(8) + 0.1) marker(ctx, 540, 930, 250, 440, t, w(6) - 0.02, 0.5);
  };

  // ================================================================ beat 2: "It looks hard. It's only five steps!"
  function mountainPts(k) {      // k 0 = mountain, 1 = flat ground (vertices lerp, like his morph)
    const P = [[40, 1180], [200, 1010], [270, 1050], [400, 850], [470, 900], [600, 640], [670, 700], [790, 500], [860, 570], [980, 1180]];
    return P.map(([x, y]) => [x, L(y, 1180, k)]);
  }
  SC.steps = (ctx, t) => {
    const t0 = w(10) - 0.1, flat = E.inOutC(pr(t, w(13) - 0.04, w(13) + 7 * F1)), split = pr(t, w(15) - 0.02, w(15) + 4 * F1), rise = pr(t, w(16) - 0.05, we(16) + 0.15);
    const z = 1 + 0.05 * pr(t, t0, t0 + 2.2); ctx.save(); ctx.translate(0, 110); ctx.translate(540, 1100); ctx.scale(z, z); ctx.translate(-540, -1100);
    // falling streaks on entry (his 2.5 s)
    const st = pr(t, t0, t0 + 0.35); if (st < 1) { ctx.strokeStyle = `rgba(17,16,16,${0.6 * (1 - st)})`; ctx.lineWidth = 5; for (let i = 0; i < 6; i++) { const x = 300 + i * 80, y = L(560, 860, st); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + 90); ctx.stroke(); } }
    // faint outline of the old mountain after it collapses
    if (flat > 0) { ctx.save(); ctx.globalAlpha = 0.18 * flat; ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.setLineDash([6, 8]); ctx.beginPath(); mountainPts(0).forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.stroke(); ctx.restore(); }
    // ground line
    ctx.fillStyle = INK; ctx.fillRect(30, 1180, 960, 10);
    if (split <= 0) {
      const P = mountainPts(flat); ctx.fillStyle = INK; ctx.beginPath(); ctx.moveTo(40, 1186); P.forEach(([x, y]) => ctx.lineTo(x, y)); ctx.lineTo(980, 1186); ctx.closePath(); ctx.fill();
      if (flat < 0.6) { ctx.fillStyle = '#FFFFFF'; ctx.beginPath(); ctx.moveTo(790 - 70, L(500, 1180, flat) + 90); ctx.lineTo(790, L(500, 1180, flat)); ctx.lineTo(790 + 56, L(500, 1180, flat) + 78); ctx.lineTo(760, L(500, 1180, flat) + 62); ctx.closePath(); ctx.fill(); }
      // cloud drifting
      ctx.fillStyle = '#FFF'; ctx.strokeStyle = INK; ctx.lineWidth = 4; const cx0 = 470 + Math.sin(t * 0.9) * 30; [[0, 0, 40], [44, -12, 50], [92, 0, 38]].forEach(([dx, dy, r]) => { ctx.beginPath(); ctx.arc(cx0 + dx, 640 + dy, r, 0, 7); ctx.fill(); ctx.stroke(); });
    } else {
      // five blocks: split, then rise one after another (wave) into a staircase
      for (let i = 0; i < 5; i++) { const bx = 70 + i * 180, bw = 160, gp = clamp(rise * 1.6 - i * 0.15), bh = L(34, 90 + i * 110, E.outBack(gp, 1.5)) * clamp(split * 1.2);
        ctx.fillStyle = INK; rr(ctx, bx, 1180 - bh, bw, bh + 4, 8); ctx.fill(); T(ctx, String(i + 1), bx + bw / 2, 1180 - bh + Math.min(40, bh * 0.45), Math.min(64, 20 + bh * 0.4), 400, '#FFF', STAMP, 'center'); }
    }
    // flag: HARD on the peak -> EASY (red) on the ground / top step
    const fl = flat < 0.5 ? 'HARD' : 'EASY';
    let fx = 790, fy = L(500, 1180, flat);
    if (split > 0) { const top = L(34, 90 + 4 * 110, E.outBack(clamp(rise * 1.6 - 0.6), 1.5)); fx = 70 + 4 * 180 + 120; fy = 1180 - top; }
    else if (flat >= 0.5) { fx = 830; fy = 1180; }
    const fk = fl === 'HARD' ? E.outBack(pr(t, w(12), w(12) + 6 * F1), 2.2) : E.outBack(pr(t, w(13) + 0.1, w(13) + 0.1 + 6 * F1), 2.2);
    ctx.save(); ctx.translate(fx, fy); ctx.scale(Math.max(0.01, fk), Math.max(0.01, fk)); ctx.fillStyle = INK; ctx.fillRect(-3, -150, 6, 150);
    const wave = Math.sin(t * 9) * 6; ctx.fillStyle = fl === 'EASY' ? RED : '#FFF'; ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(3, -150); ctx.quadraticCurveTo(60, -150 + wave, 120, -142); ctx.lineTo(120, -96); ctx.quadraticCurveTo(60, -104 - wave, 3, -100); ctx.closePath(); ctx.fill(); ctx.stroke();
    T(ctx, fl, 62, -122, 36, 400, fl === 'EASY' ? '#FFF' : INK, STAMP, 'center'); ctx.restore();
    // the little climber: walks at the base, jumps on the collapse, climbs step by step
    let hx = 150, hy = 1180, jump = 0;
    if (t > w(13) - 0.05 && split <= 0) jump = Math.sin(Math.PI * pr(t, w(13) - 0.05, w(13) + 0.45)) * 180;
    if (split > 0) { const step = Math.min(4, Math.floor(rise * 5.2)); const sp2 = rise * 5.2 - step; const bx = 70 + step * 180 + 80, top = L(34, 90 + step * 110, E.outBack(clamp(rise * 1.6 - step * 0.15), 1.5)) * clamp(split * 1.2);
      hx = bx; hy = 1180 - top - Math.sin(Math.PI * clamp(sp2 * 1.4)) * 60; }
    ctx.save(); ctx.translate(hx, hy - jump); ctx.rotate(jump > 0 ? (pr(t, w(13) - 0.05, w(13) + 0.45)) * Math.PI * 2 : 0);
    ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(0, -78, 17, 0, 7); ctx.fill(); ctx.fillStyle = RED; ctx.fillRect(-15, -96, 30, 9);
    ctx.strokeStyle = INK; ctx.lineWidth = 9; ctx.lineCap = 'round'; const sw = Math.sin(t * 14) * 10; ctx.beginPath(); ctx.moveTo(0, -60); ctx.lineTo(0, -26); ctx.moveTo(0, -26); ctx.lineTo(-10 - sw * 0.5, 0); ctx.moveTo(0, -26); ctx.lineTo(10 + sw * 0.5, 0); ctx.moveTo(0, -52); ctx.lineTo(-20, -36 + sw); ctx.moveTo(0, -52); ctx.lineTo(20, -36 - sw); ctx.stroke(); ctx.restore();
    // confetti at the top when he reaches the flag
    const ct = we(16) + 0.1; if (t > ct && t < ct + 0.8) { const d = t - ct; for (let i = 0; i < 18; i++) { const a = rnd(i) * Math.PI * 2, v = 300 + rnd(i * 3) * 500; ctx.save(); ctx.globalAlpha = 1 - d / 0.8; ctx.translate(fx + 60 + Math.cos(a) * v * d, fy - 150 + Math.sin(a) * v * d * 0.6 + 900 * d * d); ctx.rotate(d * 10 * (rnd(i) - 0.5)); ctx.fillStyle = i % 3 ? RED : INK; ctx.fillRect(-7, -3, 14, 6); ctx.restore(); } }
    ctx.restore();
  };

  // ================================================================ shared pieces for steps 1-5
  const { pill, cursor, stamp, lightCard, strike, SANS } = G;
  const pop = (t, a, d = 6 * F1) => (t < a ? 0 : clamp(E.outBack(pr(t, a, a + d), 1.9), 0, 1.25));
  function bigBadge(ctx, n, t, t0, dock) {        // his step badge: slams big in the centre, then docks onto the window corner
    if (t < t0) return; const p = pr(t, t0, t0 + 3 * F1), q = E.inOutC(pr(t, t0 + 0.32, t0 + 0.32 + 7 * F1));
    const s = L(L(0.5, 2.5, E.outBack(p, 2)), 0.95, q), x = L(540, dock[0], q), y = L(900, dock[1], q);
    G.badge(ctx, n, x, y, t, t0, s);
  }
  function darkWin(ctx, cx, cy, s, title, body, t) {
    const ww = 760, hh = 520; ctx.save(); ctx.translate(cx, cy); ctx.scale(s, s); ctx.translate(-ww / 2, -hh / 2);
    dotShadow(ctx, 0, 0, ww, hh, 18, 12, 7, 2); ctx.fillStyle = '#1D1C21'; rr(ctx, 0, 0, ww, hh, 18); ctx.fill(); ctx.strokeStyle = '#34323B'; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = '#26252B'; rr(ctx, 0, 0, ww, 46, [18, 18, 0, 0]); ctx.fill(); ['#FF5F57', '#FEBC2E', '#28C840'].forEach((c, i) => { ctx.fillStyle = c; ctx.beginPath(); ctx.arc(24 + i * 22, 23, 7, 0, 7); ctx.fill(); });
    T(ctx, title, 100, 24, 18, 600, '#D8D6DE', UI); T(ctx, '~/shortsuni-skill', ww - 24, 24, 15, 500, '#8C8A94', MONO, 'right');
    body(ctx, ww, hh); ctx.restore();
    return { x: cx - ww / 2 * s, y: cy - hh / 2 * s, w: ww * s, h: hh * s };
  }
  function inputBar(ctx, ww, hh, txt, t, glow = 0, caret = false) {
    const iy = hh - 104; if (glow > 0) { ctx.save(); ctx.shadowColor = `rgba(225,10,15,${0.8 * glow})`; ctx.shadowBlur = 26 * glow; ctx.strokeStyle = RED; ctx.lineWidth = 3; rr(ctx, 22, iy, ww - 44, 62, 14); ctx.stroke(); ctx.restore(); }
    ctx.fillStyle = '#2A2930'; rr(ctx, 22, iy, ww - 44, 62, 14); ctx.fill(); if (glow > 0) { ctx.strokeStyle = RED; ctx.lineWidth = 3; rr(ctx, 22, iy, ww - 44, 62, 14); ctx.stroke(); }
    T(ctx, '+', 44, iy + 31, 24, 500, '#8C8A94', UI); T(ctx, txt || 'Reply to Claude…', 70, iy + 32, 20, 500, txt ? '#F2F0F6' : '#6E6C76', txt ? MONO : UI);
    if (caret && Math.floor(t * 4) % 2 === 0) { ctx.fillStyle = RED; ctx.fillRect(72 + tw(ctx, txt, 20, 500, MONO), iy + 17, 3, 28); }
    ctx.fillStyle = '#4A4952'; ctx.beginPath(); ctx.arc(ww - 50, iy + 31, 17, 0, 7); ctx.fill();
    T(ctx, 'Auto', 26, hh - 18, 14, 500, '#7D7B85', UI); T(ctx, 'Opus 5.5', ww - 26, hh - 18, 14, 500, '#7D7B85', UI, 'right');
    return iy;
  }
  function checkRow(ctx, x, y, lab, sub, t, t0, t1, ww) {
    const on = t >= t0, done = t >= t1;
    ctx.fillStyle = done ? 'rgba(225,10,15,0.12)' : on ? '#27262D' : 'transparent'; rr(ctx, x, y - 30, ww, 60, 10); ctx.fill();
    if (done) { const k = pop(t, t1, 5 * F1); ctx.save(); ctx.translate(x + 30, y); ctx.scale(k, k); ctx.fillStyle = RED; ctx.beginPath(); ctx.arc(0, 0, 15, 0, 7); ctx.fill(); ctx.strokeStyle = '#FFF'; ctx.lineWidth = 3.5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-7, 0); ctx.lineTo(-2, 5); ctx.lineTo(7, -5); ctx.stroke(); ctx.restore(); }
    else if (on) { ctx.strokeStyle = RED; ctx.lineWidth = 3.5; ctx.beginPath(); ctx.arc(x + 30, y, 13, t * 9, t * 9 + 4.2); ctx.stroke(); }
    else { ctx.strokeStyle = '#4A4952'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(x + 30, y, 13, 0, 7); ctx.stroke(); }
    T(ctx, lab, x + 62, y - 8, 22, 700, on ? '#F2F0F6' : '#6E6C76', UI); if (sub) T(ctx, sub, x + 62, y + 15, 15, 500, '#8C8A94', UI);
    if (on && !done) T(ctx, Math.round(100 * pr(t, t0, t1)) + '%', x + ww - 14, y, 17, 700, RED, MONO, 'right'); else if (done) T(ctx, 'ok', x + ww - 14, y, 17, 600, '#8C8A94', MONO, 'right');
  }
  function slamWord(ctx, s, x, y, size, t, t0, col = RED, rot = -0.06) {
    if (t < t0) return; const p = pr(t, t0, t0 + 4 * F1), k = p < 0.5 ? L(1.35, 0.97, p / 0.5) : L(0.97, 1, (p - 0.5) / 0.5);
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k); T(ctx, s, 0, 0, size, 400, p < 0.5 ? '#F3A6A6' : col, STAMP, 'center'); ctx.restore();
    if (t < t0 + 6 * F1 && Math.floor(t * 30) % 2 === 0) { ctx.strokeStyle = RED; ctx.lineWidth = 5; ctx.lineCap = 'round'; const wd = tw(ctx, s, size, 400, STAMP) / 2; for (let q = 0; q < 8; q++) { const a = (q / 8) * Math.PI * 2 + 0.4, r0 = wd + 14, r1 = r0 + 24; ctx.beginPath(); ctx.moveTo(x + Math.cos(a) * r0, y + Math.sin(a) * r0 * 0.5); ctx.lineTo(x + Math.cos(a) * r1, y + Math.sin(a) * r1 * 0.5); ctx.stroke(); } }
  }
  function vecObj(ctx, key, cx, cy, h, rot, k) {       // folder + price tag drawn in code (the local model's versions were unusable)
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(rot); ctx.scale(k * h / 300, k * h / 300);
    if (key === 'o_folder') { dotShadow(ctx, -170, -110, 340, 250, 20, 10, 7, 2); ctx.fillStyle = '#3E8EF0'; rr(ctx, -170, -130, 140, 50, 14); ctx.fill(); rr(ctx, -170, -110, 340, 250, 18); ctx.fill();
      ctx.fillStyle = '#FFFFFF'; rr(ctx, -140, -96, 280, 90, 8); ctx.fill(); ctx.fillStyle = '#E8E6E2'; rr(ctx, -130, -110, 260, 60, 6); ctx.fill();
      const g = ctx.createLinearGradient(0, -60, 0, 140); g.addColorStop(0, '#7DB9FF'); g.addColorStop(1, '#4F9CF5'); ctx.fillStyle = g; rr(ctx, -170, -60, 340, 200, 18); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,0.35)'; rr(ctx, -150, -48, 300, 8, 4); ctx.fill(); }
    else { dotShadow(ctx, -110, -90, 220, 180, 18, 8, 7, 2); ctx.fillStyle = RED; ctx.beginPath(); ctx.moveTo(-110, -60); ctx.lineTo(-60, -110); ctx.lineTo(110, -110); ctx.lineTo(110, 110); ctx.lineTo(-60, 110); ctx.lineTo(-110, 60); ctx.closePath(); ctx.fill();
      ctx.fillStyle = '#F2F0EE'; ctx.beginPath(); ctx.arc(-62, 0, 16, 0, 7); ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(-62, 0); ctx.quadraticCurveTo(-140, -60, -150, -140); ctx.stroke(); }
    ctx.restore();
  }
  function shadowImg(ctx, key, cx, cy, h, rot = 0, k = 1) { if (window.VEC && VEC.has(key)) { if (k > 0) { ctx.save(); ctx.translate(cx, cy); ctx.scale(k, k); VEC.draw(ctx, key, 0, 0, h, rot); ctx.restore(); } return; } const im = IMG[key]; if (!im || k <= 0) return; const ww = (im.width / im.height) * h; ctx.save(); ctx.translate(cx, cy); ctx.rotate(rot); ctx.scale(k, k); ctx.imageSmoothingEnabled = true; ctx.drawImage(sh(im), -ww / 2 + 10, -h / 2 + 9, ww, h); ctx.drawImage(im, -ww / 2, -h / 2, ww, h); ctx.restore(); }
  const push = (t, t0, d = 2.5) => { const z = 1 + 0.04 * pr(t, t0, t0 + d); return z; };
  function withPush(ctx, t, t0, fn) { const z = push(t, t0); ctx.save(); ctx.translate(540, 980); ctx.scale(z, z); ctx.translate(-540, -980); fn(); ctx.restore(); }

  // ---- STEP 1 "One. Drop my skill folder into Claude Code."  (his 5.0-7.4: badge 1 -> folder dragged by cursor into a New-session window)
  SC.one = (ctx, t) => withPush(ctx, t, w(17), () => {
    const winK = E.outBack(pr(t, w(21) - 0.1, w(21) + 8 * F1), 1.4), drag = E.inOutC(pr(t, w(19), w(23) + 0.1)), land = t >= w(23) + 0.1;
    if (winK > 0) darkWin(ctx, 540, L(1900, 1080, clamp(winK)), 1.18, 'New session', (c, ww, hh) => {
      if (!land) { c.save(); c.strokeStyle = RED; c.lineWidth = 3; c.setLineDash([14, 10]); c.lineDashOffset = -t * 40; rr(c, 60, 80, ww - 120, hh - 210, 18); c.stroke(); c.restore(); T(c, 'Drop a folder to add a skill', ww / 2, hh / 2 - 40, 22, 600, '#8C8A94', UI, 'center'); }
      else { T(c, '✳  Skill loaded', 40, 100, 24, 700, '#ECEAF2', UI); T(c, 'shortsuni-skill · ready', 40, 136, 17, 500, '#8C8A94', MONO);
        ['SKILL.md', 'scenes/', 'voice/', 'captions/'].forEach((f, i) => { const k = pop(t, w(24) + i * 0.06, 5 * F1); if (k <= 0) return; c.save(); c.globalAlpha = clamp(k); c.fillStyle = '#26252B'; rr(c, 40 + (i % 2) * 340, 170 + Math.floor(i / 2) * 70, 320, 56, 10); c.fill(); T(c, '□  ' + f, 60 + (i % 2) * 340, 198 + Math.floor(i / 2) * 70, 18, 500, '#D8D6DE', MONO); c.restore(); }); }
      inputBar(c, ww, hh, '', t);
    }, t);
    // the folder: bobs in the middle, then the cursor drags it down into the window
    const fx = L(540, 540, drag), fy = L(820, 1080, drag), fs = land ? 0 : L(1, 0.55, drag);
    if (fs > 0) { shadowImg(ctx, 'o_folder', fx, fy + Math.sin(t * 3) * 6, 330 * fs, Math.sin(t * 2) * 0.04); if (drag < 0.2) { ctx.save(); ctx.translate(fx, fy + 200 * fs); T(ctx, 'shortsuni-skill', 0, 0, 30, 700, INK, SANS, 'center'); ctx.restore(); } }
    if (t >= w(18) - 0.25 && !land) { const c0 = w(18) - 0.25, cp = E.inOutC(pr(t, c0, w(18) + 0.05)), X = drag > 0 ? fx + 40 : L(980, fx + 40, cp), Y = drag > 0 ? fy + 30 : L(1500, fy + 30, cp); cursor(ctx, X, Y, (t >= w(18) && t < w(18) + 3 * F1 ? 0.88 : 1) * 1.6); }
    if (land) { const rp = pr(t, w(23) + 0.1, w(23) + 0.5); if (rp < 1) { ctx.strokeStyle = RED; ctx.globalAlpha = 1 - rp; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(540, 1060, L(60, 380, E.outC(rp)), 0, 7); ctx.stroke(); ctx.globalAlpha = 1; } }
  });

  // ---- STEP 2 "Two. Ask it to check your setup. It installs what's missing." (his 7.4-10.8: badge 2 -> setup checklist -> 'Setup complete')
  SC.two = (ctx, t) => withPush(ctx, t, w(25), () => {
    const box = darkWin(ctx, 540, 1040, 1.18, 'Claude Code', (c, ww, hh) => {
      const typed = 'check my setup'.slice(0, Math.round(14 * pr(t, w(26), we(31) - 0.1)));
      if (t < w(31)) inputBar(c, ww, hh, typed, t, pr(t, w(26) - 0.1, w(26)), true);
      else { T(c, '✳  Checking your setup', 40, 86, 22, 700, '#ECEAF2', UI);
        const rows = [['Node.js', 'v22', w(31), w(31) + 0.25], ['ffmpeg', 'video tools', w(31) + 0.1, w(32)], ['Python', 'voice engine', w(32), w(33) + 0.15], ['Voice model', 'not found', w(33), we(35)]];
        rows.forEach(([a, b, t0, t1], i) => checkRow(c, 30, 140 + i * 72, a, i === 3 && t < t1 ? (t >= w(33) ? 'installing…' : b) : b, t, t0, t1, ww - 60));
        if (t >= w(34) && t < we(35)) { const k = pop(t, w(34), 5 * F1); c.save(); c.translate(ww - 160, 140 + 3 * 72); c.scale(k, k); pill(c, 'missing', -50, 0, 18, RED, '#FFF'); c.restore(); }
        inputBar(c, ww, hh, '', t); }
    }, t);
    bigBadge(ctx, 2, t, w(25) - 0.05, [box.x + box.w - 20, box.y + 10]);
    if (t >= we(35) + 0.05) { const k = pop(t, we(35) + 0.05, 7 * F1); ctx.save(); ctx.translate(540, 1420); ctx.rotate(-0.04); ctx.scale(k, k); pill(ctx, '✓  Setup complete', -190, 0, 34, RED, '#FFF'); ctx.restore(); }
    if (t >= w(26) - 0.3 && t < w(31)) { const c0 = w(26) - 0.3, cp = E.inOutC(pr(t, c0, c0 + 9 * F1)); cursor(ctx, L(980, 380, cp), L(1500, 1310, cp), (t >= w(26) && t < w(26) + 2 * F1 ? 0.88 : 1) * 1.6); }
  });

  // ---- STEP 3 "Three. Type one line, like: why does airport water cost $8?"  (his 10.8-17.4: 1 LINE pill, typed prompt, objects appear in the window)
  SC.three = (ctx, t) => withPush(ctx, t, w(36), () => {
    const P = 'why does airport water cost $8?', n = Math.round(P.length * pr(t, w(41), we(46) - 0.05));
    const box = darkWin(ctx, 540, 1040, 1.18, 'Claude Code', (c, ww, hh) => {
      if (t < w(43)) { const sp = 1 + 0.08 * Math.sin(t * 5); c.save(); c.translate(ww / 2, 170); c.scale(sp, sp); c.strokeStyle = '#E8754F'; c.lineWidth = 4; c.lineCap = 'round'; for (let k = 0; k < 6; k++) { const a = (k / 6) * Math.PI * 2 + t * 0.6; c.beginPath(); c.moveTo(Math.cos(a) * 5, Math.sin(a) * 5); c.lineTo(Math.cos(a) * 18, Math.sin(a) * 18); c.stroke(); } c.restore(); T(c, 'What should we make?', ww / 2, 220, 24, 600, '#D8D6DE', UI, 'center'); }
      // the idea builds itself inside the window as it is typed (his building / scale / burger)
      const kP = pop(t, w(43) - 0.05, 7 * F1), kB = pop(t, w(44) - 0.05, 7 * F1), kT = pop(t, w(46) - 0.05, 7 * F1);
      if (kP > 0) shadowImg(c, 'o_plane', L(ww + 200, 190, clamp(kP)), 190 + Math.sin(t * 3) * 8, 170, -0.08, 1);
      if (kB > 0) shadowImg(c, 'o_bottle', ww / 2 + 40, L(-100, 200, clamp(kB)) + Math.sin(t * 4) * 5, 220, 0.05, 1);
      if (kT > 0) { shadowImg(c, 'o_pricetag', ww - 170, 190, 190, Math.sin(t * 5) * 0.2, kT); T(c, '$8', ww - 160, 196, 56, 400, '#FFF', STAMP, 'center'); }
      inputBar(c, ww, hh, P.slice(0, n), t, pr(t, w(37) - 0.1, w(37) + 3 * F1), t < we(46) + 0.3);
    }, t);
    bigBadge(ctx, 3, t, w(36) - 0.05, [box.x + box.w - 20, box.y + 10]);
    if (t >= w(38)) { const k = pop(t, w(38), 6 * F1); ctx.save(); ctx.translate(820, box.y + box.h - 250); ctx.rotate(-0.08); ctx.scale(k, k); ctx.fillStyle = RED; rr(ctx, -110, -46, 220, 92, 46); ctx.fill(); T(ctx, '1 LINE', 0, 4, 62, 400, '#FFF', STAMP, 'center'); ctx.restore(); }
    if (t >= w(37)) { const k = pop(t, w(37), 6 * F1); ctx.save(); ctx.translate(200, box.y + box.h + 50); ctx.scale(k, k); ctx.strokeStyle = RED; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, 40); ctx.lineTo(0, -8); ctx.moveTo(-14, 6); ctx.lineTo(0, -10); ctx.lineTo(14, 6); ctx.stroke(); T(ctx, 'TYPE THIS', 26, 20, 56, 400, INK, STAMP); ctx.restore(); }
  });

  // ---- STEP 4 "Four. Hit enter and walk away." (his 17.4-19: badge 4, red ENTER key pressed)
  SC.four = (ctx, t) => withPush(ctx, t, w(47), () => {
    const sent = t >= w(49) + 0.05;
    const box = darkWin(ctx, 540, 980, 1.12, 'Claude Code', (c, ww, hh) => {
      if (!sent) { shadowImg(c, 'o_plane', 190, 190, 170, -0.08); shadowImg(c, 'o_bottle', ww / 2 + 40, 200, 220, 0.05); shadowImg(c, 'o_pricetag', ww - 170, 190, 190, Math.sin(t * 5) * 0.2); T(c, '$8', ww - 160, 196, 56, 400, '#FFF', STAMP, 'center'); inputBar(c, ww, hh, 'why does airport water cost $8?', t, 1, true); }
      else { T(c, '✳  Working on it…', 40, 96, 24, 700, '#ECEAF2', UI); const p = pr(t, w(49) + 0.05, we(52) + 0.4); c.fillStyle = '#2A2930'; rr(c, 40, 140, ww - 80, 18, 9); c.fill(); c.fillStyle = RED; rr(c, 40, 140, (ww - 80) * p, 18, 9); c.fill();
        T(c, Math.round(p * 100) + '%', ww - 40, 190, 20, 700, RED, MONO, 'right'); const LOG = ['read SKILL.md', 'plan 7 scenes', 'write script', 'pick voice', 'gen objects']; LOG.forEach((l, i) => { if (t >= w(50) + i * 0.12) T(c, '✓ ' + l, 40, 240 + i * 34, 17, 500, '#6FCF7F', MONO); }); inputBar(c, ww, hh, '', t); }
    }, t);
    bigBadge(ctx, 4, t, w(47) - 0.05, [box.x + box.w - 20, box.y + 10]);
    // the ENTER key
    const down = t >= w(49) - 0.04 && t < w(49) + 0.12, k = pop(t, w(48) - 0.1, 6 * F1), out = pr(t, w(51), w(51) + 0.2);
    if (k > 0 && out < 1) { ctx.save(); ctx.translate(430, box.y + box.h + 130); ctx.rotate(-0.08); ctx.scale(k * (1 - out), k * (1 - out)); ctx.fillStyle = '#8A0708'; rr(ctx, -150, -60 + 10, 300, 120, 20); ctx.fill(); ctx.fillStyle = RED; rr(ctx, -150, -60 + (down ? 10 : 0), 300, 110, 20); ctx.fill(); T(ctx, 'ENTER ↵', 0, (down ? 6 : -4), 52, 400, '#FFF', STAMP, 'center'); ctx.restore(); }
    if (t >= w(51)) { const k2 = pop(t, w(51), 7 * F1); ctx.save(); ctx.translate(300, box.y + box.h + 120); ctx.scale(k2, k2); ctx.strokeStyle = INK; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(0, 0, 58, 0, 7); ctx.stroke(); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(t * 8) * 40, Math.sin(t * 8) * 40); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(t * 0.7) * 26, Math.sin(t * 0.7) * 26); ctx.stroke(); T(ctx, 'WALK AWAY', 90, 0, 48, 400, INK, STAMP); ctx.restore(); }
  });

  // ---- "It writes the script, voices it, animates each scene and times the captions." (his 19-23.5: phone + Claude-is-building checklist)
  SC.build = (ctx, t) => withPush(ctx, t, w(53), () => {
    // phone (left): its screen builds up stage by stage
    const ww = 380, hh = 740, px = 90, py = 600; dotShadow(ctx, px, py, ww, hh, 50, 12, 7, 2); ctx.fillStyle = '#0D0D10'; rr(ctx, px, py, ww, hh, 50); ctx.fill();
    ctx.save(); rr(ctx, px + 14, py + 14, ww - 28, hh - 28, 38); ctx.clip(); ctx.fillStyle = '#F7F5F2'; ctx.fillRect(px, py, ww, hh);
    const sx = px + 14, sy = py + 14, sw = ww - 28;
    if (t >= w(54)) { const n = Math.round(30 * pr(t, w(54), we(56))); T(ctx, 'Why airport water'.slice(0, n), sx + 24, sy + 70, 28, 800, INK, UI); T(ctx, 'costs $8.'.slice(0, Math.max(0, n - 17)), sx + 24, sy + 104, 28, 800, RED, UI); }
    if (t >= w(57)) { for (let i = 0; i < 30; i++) { const a2 = (0.25 + 0.75 * Math.abs(Math.sin(i * 1.3 + t * 9))) * 70; ctx.fillStyle = i / 30 < pr(t, w(57), we(58) + 0.5) ? RED : '#C9C6C2'; rr(ctx, sx + 24 + i * 10.5, sy + 620 - a2 / 2, 6, a2, 3); ctx.fill(); } }
    if (t >= w(59)) { const kk = pop(t, w(59), 7 * F1); shadowImg(ctx, 'o_plane', sx + sw / 2 + Math.sin(t * 2) * 30, sy + 260, 150 * kk); shadowImg(ctx, 'o_bottle', sx + sw / 2 - 60, sy + 420, 170 * pop(t, w(61), 7 * F1), 0.06); shadowImg(ctx, 'o_pricetag', sx + sw / 2 + 80, sy + 430, 140 * pop(t, w(61) + 0.12, 7 * F1), Math.sin(t * 5) * 0.2); }
    if (t >= w(63)) { const words = ['AIRPORT', 'WATER', '$8']; words.forEach((wd, i) => { const k = pop(t, w(63) + i * 0.14, 5 * F1); if (k <= 0) return; ctx.save(); ctx.translate(sx + 70 + i * 110, sy + 530); ctx.scale(k, k); ctx.fillStyle = i === 2 ? RED : INK; rr(ctx, -50, -22, 100, 44, 10); ctx.fill(); T(ctx, wd, 0, 2, 22, 800, '#FFF', UI, 'center'); ctx.restore(); }); }
    ctx.restore(); ctx.fillStyle = '#0D0D10'; rr(ctx, px + ww / 2 - 52, py + 26, 104, 28, 14); ctx.fill();
    // checklist panel (right)
    const bx = 500, by = 640, bw = 520; dotShadow(ctx, bx, by, bw, 560, 18, 12, 7, 2); ctx.fillStyle = '#1D1C21'; rr(ctx, bx, by, bw, 560, 18); ctx.fill(); T(ctx, '✳  Claude is building', bx + 30, by + 46, 22, 700, '#ECEAF2', UI);
    [['Script', 'hook · 3 beats', 54, 56], ['Voice', 'am_fenrir · 32 s', 57, 58], ['Scenes', '7 animated', 59, 61], ['Captions', 'word-timed', 63, 65]].forEach(([a, b, i0, i1], i) => checkRow(ctx, bx + 20, by + 120 + i * 100, a, b, t, w(i0) - 0.05, we(i1), bw - 40));
    const p = pr(t, w(53), we(65)); ctx.fillStyle = '#2A2930'; rr(ctx, bx + 30, by + 520, bw - 60, 12, 6); ctx.fill(); ctx.fillStyle = RED; rr(ctx, bx + 30, by + 520, (bw - 60) * p, 12, 6); ctx.fill();
    if (t >= w(57) && t < w(59)) { const rp = (t * 2) % 1; ctx.strokeStyle = RED; ctx.globalAlpha = 1 - rp; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(px + ww / 2, py + 634, L(20, 90, rp), 0, 7); ctx.stroke(); ctx.globalAlpha = 1; }
  });

  // ---- "Then it scores its own cut and fixes the weak spots." (his 23.5-26: motion graph + score card 4.7 -> 8.7, WEAK -> FIXED -> PASS)
  SC.score = (ctx, t) => withPush(ctx, t, w(66), () => {
    lightCard(ctx, 90, 620, 900, 640, 22); T(ctx, '// self-check · my_reel.mp4', 130, 670, 22, 500, GREY, MONO);
    const fix = E.outBack(pr(t, w(73), w(73) + 8 * F1), 1.6), score = t < w(68) ? 0 : t < w(73) ? L(0, 4.7, E.outC(pr(t, w(68), w(68) + 0.4))) : L(4.7, 8.7, E.outC(pr(t, w(73), we(76))));
    if (t >= w(68)) { T(ctx, score.toFixed(1), 150, 790, 120, 400, t >= w(76) ? RED : INK, STAMP); T(ctx, '/10', 150 + tw(ctx, score.toFixed(1), 120, 400, STAMP) + 10, 820, 40, 400, GREY, STAMP); pill(ctx, t >= w(73) ? 'fixing…' : 'scoring…', 760, 760, 22, t >= w(76) ? RED : '#141414', '#FFF'); }
    const weak = [[0.28, 0.4], [0.62, 0.72]], gx = 130, gy = 900, gw = 820, gh = 280;
    for (let i = 0; i < 40; i++) { const u = i / 40, isW = weak.some(([a, b]) => u >= a && u < b), base = 0.45 + 0.45 * Math.abs(Math.sin(i * 1.7)), v = isW ? L(0.12, base, fix) : base;
      const hgt = gh * v * clamp(pr(t, w(66) - 0.1 + i * 0.008, w(66) + 0.2 + i * 0.008)); ctx.fillStyle = isW && t >= w(71) - 0.05 ? (fix > 0.5 ? '#22A33A' : RED) : INK; rr(ctx, gx + i * 20.5, gy + gh - hgt, 14, hgt, 4); ctx.fill(); }
    if (t >= w(71) - 0.05) weak.forEach(([a, b], i) => { const k = pop(t, w(71) - 0.05 + i * 0.1, 5 * F1); ctx.save(); ctx.strokeStyle = fix > 0.5 ? '#22A33A' : RED; ctx.lineWidth = 5; ctx.setLineDash([14, 8]); rr(ctx, gx + a * gw - 8, gy - 10, (b - a) * gw + 10, gh + 20, 10); ctx.stroke(); ctx.setLineDash([]); ctx.translate(gx + (a + b) / 2 * gw, gy - 34); ctx.scale(k, k); pill(ctx, fix > 0.5 ? 'FIXED' : 'WEAK', -48, 0, 22, fix > 0.5 ? '#22A33A' : RED, '#FFF'); ctx.restore(); });
    const mp = E.inOutC(pr(t, w(69), w(72))); if (t >= w(69) && t < w(76)) shadowImg(ctx, 'o_magnifier', L(gx + 80, gx + gw - 80, mp), gy + 120 + Math.sin(t * 6) * 18, 260, -0.3);
    if (t >= w(76) + 0.05) { const p2 = pr(t, w(76) + 0.05, w(76) + 0.05 + 4 * F1), k = p2 < 0.5 ? L(1.5, 0.95, p2 / 0.5) : L(0.95, 1, (p2 - 0.5) / 0.5); ctx.save(); ctx.translate(700, 1040); ctx.rotate(-0.13); ctx.scale(k, k); ctx.strokeStyle = RED; ctx.lineWidth = 12; rr(ctx, -180, -76, 360, 152, 16); ctx.stroke(); T(ctx, 'PASS', 0, 6, 124, 400, RED, STAMP, 'center'); ctx.restore(); }
  });

  // ---- STEP 5 "Five. Post it, then make another one tomorrow." (his 26.3-29: badge 5 in a phone, finger taps Share, phones stack + tear-off calendar)
  SC.five = (ctx, t) => withPush(ctx, t, w(77), () => {
    const posted = t >= w(78) + 0.12, next = t >= w(81) - 0.1;
    const ph = (x, y, s, rot, fn) => { const ww = 380, hh = 740; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.translate(-ww / 2, -hh / 2); dotShadow(ctx, 0, 0, ww, hh, 50, 12, 7, 2); ctx.fillStyle = '#0D0D10'; rr(ctx, 0, 0, ww, hh, 50); ctx.fill(); ctx.save(); rr(ctx, 14, 14, ww - 28, hh - 28, 38); ctx.clip(); ctx.fillStyle = '#F7F5F2'; ctx.fillRect(0, 0, ww, hh); fn(ww, hh); ctx.restore(); ctx.restore(); };
    const sh2 = E.inOutC(pr(t, w(81) - 0.1, w(81) + 8 * F1));
    if (next) ph(L(540, 330, sh2), 980, L(1, 0.7, sh2), L(0, -0.14, sh2), (ww, hh) => { T(ctx, 'Why airport water', 30, 80, 28, 800, INK, UI); T(ctx, 'costs $8.', 30, 114, 28, 800, RED, UI); shadowImg(ctx, 'o_bottle', ww / 2, hh / 2, 260); T(ctx, '▶ posted', 30, hh - 60, 22, 700, RED, UI); });
    if (!next || sh2 < 1) ph(540, 980, next ? L(1, 0.7, 0) : 1, 0, (ww, hh) => {
      T(ctx, 'New Short', ww / 2, 70, 26, 800, INK, UI, 'center'); ctx.fillStyle = '#E9E6E2'; rr(ctx, 30, 110, ww - 60, 380, 16); ctx.fill(); shadowImg(ctx, 'o_bottle', ww / 2, 300, 260);
      T(ctx, 'Why airport water costs $8.', 34, 530, 20, 700, INK, UI); const bk = posted ? 1 : 0; ctx.fillStyle = bk ? '#22A33A' : RED; rr(ctx, 30, hh - 130, ww - 60, 76, 38); ctx.fill(); T(ctx, posted ? 'Posted ✓' : 'Post', ww / 2, hh - 92, 30, 800, '#FFF', UI, 'center'); });
    bigBadge(ctx, 5, t, w(77) - 0.05, [770, 620]);
    if (t >= w(78) - 0.3 && t < w(80)) { const cp = E.inOutC(pr(t, w(78) - 0.3, w(78) - 0.02)); cursor(ctx, L(980, 560, cp), L(1700, 1260, cp), (t >= w(78) && t < w(78) + 3 * F1 ? 0.85 : 1) * 1.7); }
    if (t >= w(78) + 0.12) slamWord(ctx, 'POSTED.', 540, 1460, 110, t, w(78) + 0.12);
    // tear-off calendar on "tomorrow"
    if (t >= w(83) - 0.1) { const k = pop(t, w(83) - 0.1, 6 * F1), tear = pr(t, w(84), w(84) + 0.3); ctx.save(); ctx.translate(800, 960); ctx.scale(k, k); dotShadow(ctx, -130, -150, 260, 300, 20, 10, 7, 2); ctx.fillStyle = '#FFF'; rr(ctx, -130, -150, 260, 300, 20); ctx.fill(); ctx.fillStyle = RED; rr(ctx, -130, -150, 260, 70, [20, 20, 0, 0]); ctx.fill(); T(ctx, 'TOMORROW', 0, -114, 26, 800, '#FFF', UI, 'center');
      T(ctx, tear >= 1 ? '2' : '1', 0, 30, 150, 400, INK, STAMP, 'center'); if (tear > 0 && tear < 1) { ctx.save(); ctx.translate(0, -80); ctx.rotate(tear * 1.2); ctx.globalAlpha = 1 - tear; ctx.fillStyle = '#FFF'; ctx.fillRect(-130, 0, 260, 230); T(ctx, '1', 0, 110, 150, 400, INK, STAMP, 'center'); ctx.restore(); } ctx.restore(); }
  });

  // ---- PROOF "That's how my channel hit 9.2M views in 28 days, without filming a thing." (his 29.5-35: profile + counter + calendar, camera crossed out)
  const SW = 870, SH = Math.round(1190 * (870 / 1630));
  SC.proof = (ctx, t) => {
    const camOn = t >= w(95) - 0.1, z = 1 + 0.05 * pr(t, w(85), w(85) + 3.5);
    if (!camOn || t < w(95) + 0.05) {
      const out = E.inC(pr(t, w(95) - 0.1, w(95) + 0.05));
      ctx.save(); ctx.translate(540, 930); ctx.scale(z * (1 - out * 0.4), z * (1 - out * 0.4)); ctx.globalAlpha = 1 - out;
      const cw = SW + 48, ch = SH + 48; dotShadow(ctx, -cw / 2, -ch / 2, cw, ch, 32, 14); ctx.fillStyle = '#121212'; rr(ctx, -cw / 2, -ch / 2, cw, ch, 32); ctx.fill();
      ctx.save(); rr(ctx, -SW / 2, -SH / 2, SW, SH, 16); ctx.clip(); ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high'; ctx.filter = 'none'; ctx.drawImage(IMG.shot, -SW / 2, -SH / 2, SW, SH); ctx.restore();
      const k = SW / 1630; marker(ctx, -SW / 2 + 408 * k, -SH / 2 + 700 * k, 430 * k, 178 * k, t, w(90), 99);
      T(ctx, 'My channel · last 28 days · YouTube Studio', 0, ch / 2 + 40, 28, 600, GREY, SANS, 'center');
      ctx.restore();
      // 28-day calendar grid ticks off on "28 days"
      if (t >= w(93) - 0.05) { const k2 = pop(t, w(93) - 0.05, 6 * F1); ctx.save(); ctx.translate(320, 1440); ctx.scale(k2, k2); lightCard(ctx, -190, -110, 380, 220, 18); T(ctx, '28 DAYS', -160, -76, 30, 400, INK, STAMP);
        for (let d = 0; d < 28; d++) { const on = d < Math.round(28 * pr(t, w(93), we(94) + 0.3)); ctx.fillStyle = on ? RED : '#E4E1DD'; rr(ctx, -160 + (d % 7) * 46, -40 + Math.floor(d / 7) * 34, 38, 26, 5); ctx.fill(); } ctx.restore(); }
      ctx.globalAlpha = 1;
    }
    if (camOn) { const k = pop(t, w(95) - 0.05, 7 * F1); shadowImg(ctx, 'o_camera', 540, 960, 520, 0, k);
      if (t >= w(96)) { ctx.save(); ctx.strokeStyle = RED; ctx.lineWidth = 26; ctx.lineCap = 'round'; const a = E.outC(pr(t, w(96), w(96) + 4 * F1)), b = E.outC(pr(t, w(96) + 3 * F1, w(96) + 7 * F1)); ctx.beginPath(); ctx.moveTo(300, 720); ctx.lineTo(L(300, 780, a), L(720, 1200, a)); ctx.stroke(); if (b > 0) { ctx.beginPath(); ctx.moveTo(780, 720); ctx.lineTo(L(780, 300, b), L(720, 1200, b)); ctx.stroke(); } ctx.restore(); }
      if (t >= w(98) - 0.05) { const k2 = pop(t, w(98) - 0.05, 6 * F1); ctx.save(); ctx.translate(540, 1370); ctx.rotate(-0.05); ctx.scale(k2, k2); lightCard(ctx, -230, -60, 460, 120, 18); T(ctx, '0', -170, 4, 90, 400, RED, STAMP, 'center'); T(ctx, 'hours filmed', 30, 4, 40, 400, INK, STAMP, 'center'); ctx.restore(); } }
  };

  // ---- CTA "Comment SYSTEM and I'll send it to you." (his 36-38: comment box types the word, red pill, DM delivered)
  SC.cta = (ctx, t) => {
    const k0 = E.outBack(pr(t, w(99) - 0.2, w(99) + 6 * F1), 1.5), y = L(1500, 760, clamp(k0)), red = t >= we(100) + 0.02;
    ctx.save(); ctx.translate(540, y); dotShadow(ctx, -440, -64, 880, 128, 64, 10, 7, 2); ctx.fillStyle = red ? RED : '#1D1C21'; rr(ctx, -440, -64, 880, 128, 64); ctx.fill();
    ctx.fillStyle = red ? '#FFF' : RED; ctx.beginPath(); ctx.arc(-370, 0, 30, 0, 7); ctx.fill(); ctx.fillStyle = red ? RED : '#1D1C21'; ctx.beginPath(); ctx.arc(-370, 0, 14, 0, 7); ctx.fill();
    const L6 = 'SYSTEM'.split(''), lt = w(100) - 0.05; if (t < lt) T(ctx, 'Add a comment…', -310, 2, 34, 500, '#8C8A94', UI);
    L6.forEach((c, i) => { const t0 = lt + i * 2 * F1, p = pr(t, t0, t0 + 6 * F1); if (p <= 0) return; const fl = Math.cos((1 - E.outBack(p, 1.6)) * Math.PI * 0.5); ctx.save(); ctx.translate(-290 + i * 80, 0); ctx.rotate((1 - p) * 0.6); ctx.scale(1, Math.max(0.05, fl)); ctx.fillStyle = '#FFF'; rr(ctx, -34, -42, 68, 84, 10); ctx.fill(); T(ctx, c, 0, 4, 60, 400, RED, STAMP, 'center'); ctx.restore(); });
    const cp = pop(t, we(100) + 0.05, 7 * F1); if (cp > 0) { ctx.save(); ctx.translate(370, 0); ctx.scale(cp, cp); ctx.fillStyle = '#FFF'; ctx.beginPath(); ctx.arc(0, 0, 38, 0, 7); ctx.fill(); ctx.strokeStyle = RED; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-15, 0); ctx.lineTo(-4, 12); ctx.lineTo(17, -12); ctx.stroke(); ctx.restore(); }
    ctx.restore();
    // comments list sliding up under the bar (his 36 s)
    if (t >= w(101)) { const k = E.outC(pr(t, w(101), w(101) + 8 * F1)); ctx.save(); ctx.globalAlpha = k; ctx.translate(0, L(80, 0, k)); dotShadow(ctx, 110, 860, 600, 330, 22, 10, 7, 2); ctx.fillStyle = '#1D1C21'; rr(ctx, 110, 860, 600, 330, 22); ctx.fill(); T(ctx, 'Comments', 410, 900, 22, 700, '#ECEAF2', UI, 'center');
      ['SYSTEM \u{1F525}', 'SYSTEM', 'system pls', 'SYSTEM!!'].forEach((c, i) => { if (t < w(101) + i * 0.12) return; ctx.fillStyle = ['#7B4DFF', '#3B7BFF', '#22A33A', '#F8A800'][i]; ctx.beginPath(); ctx.arc(160, 960 + i * 58, 18, 0, 7); ctx.fill(); T(ctx, c, 196, 960 + i * 58, 22, 600, '#F2F0F6', UI); }); ctx.restore(); }
    if (t >= w(103)) { slamWord(ctx, 'SENT', 820, 940, 110, t, w(103) + 0.03, RED, -0.12); const pp = E.inOutC(pr(t, w(103), w(103) + 0.5)); if (pp < 1) { ctx.save(); ctx.translate(L(900, 1100, pp), L(760, 520, pp)); ctx.rotate(-0.5); ctx.fillStyle = '#FFF'; ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-40, 16); ctx.lineTo(44, -20); ctx.lineTo(-16, 32); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore(); } }
    const dk = pop(t, w(105) - 0.1, 7 * F1); if (dk > 0) { ctx.save(); ctx.translate(430, L(1600, 1320, clamp(dk))); ctx.scale(clamp(dk, 0, 1.1), clamp(dk, 0, 1.1)); lightCard(ctx, -300, -100, 600, 200, 24);
      ctx.save(); ctx.imageSmoothingEnabled = true; ctx.drawImage(IMG.logo, -270, -70, 76, 76); ctx.restore(); T(ctx, G.R.brand.handle, -176, -42, 34, 700, INK, SANS); T(ctx, 'sent you the system · now', -176, -4, 22, 500, GREY, SANS);
      ctx.fillStyle = '#F1EEEA'; rr(ctx, -270, 30, 540, 50, 12); ctx.fill(); ctx.fillStyle = RED; rr(ctx, -260, 39, 32, 32, 6); ctx.fill(); T(ctx, 'shortsuni_system.zip', -214, 55, 24, 600, INK, MONO); ctx.restore(); }
  };

  // ======================================================================= reel7: commentary Shorts, 5 steps
  function clipFrame(ctx, x, y, ww, hh, t, seed = 0, dim = 0) {         // a football clip still (flat style)
    ctx.save(); rr(ctx, x, y, ww, hh, 14); ctx.clip();
    ctx.fillStyle = '#2FA046'; ctx.fillRect(x, y, ww, hh); for (let i = 0; i < 6; i++) { ctx.fillStyle = i % 2 ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)'; ctx.fillRect(x, y + i * hh / 6, ww, hh / 6); }
    ctx.strokeStyle = 'rgba(255,255,255,0.8)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x, y + hh * 0.38); ctx.lineTo(x + ww, y + hh * 0.38); ctx.stroke(); ctx.beginPath(); ctx.ellipse(x + ww / 2, y + hh * 0.38, ww * 0.2, hh * 0.08, 0, 0, 7); ctx.stroke();
    [[0.3, 0.6, RED], [0.55, 0.52, '#FFF'], [0.7, 0.68, '#FFF'], [0.42, 0.75, RED]].forEach(([px, py, c], i) => { const X = x + (px + Math.sin(t * 3 + i + seed) * 0.03) * ww, Y = y + py * hh, s = hh / 20;
      ctx.fillStyle = c; ctx.strokeStyle = INK; ctx.lineWidth = 3; rr(ctx, X - s * 0.8, Y - s, s * 1.6, s * 2.2, s * 0.5); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#F2C29A'; ctx.beginPath(); ctx.arc(X, Y - s * 1.5, s * 0.55, 0, 7); ctx.fill(); ctx.stroke(); });
    ctx.fillStyle = '#FFF'; ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x + (0.35 + 0.35 * ((t * 0.5 + seed * 0.3) % 1)) * ww, y + hh * 0.62, hh / 40, 0, 7); ctx.fill(); ctx.stroke();
    if (dim > 0) { ctx.fillStyle = `rgba(242,240,238,${dim})`; ctx.fillRect(x, y, ww, hh); }
    ctx.restore(); ctx.strokeStyle = INK; ctx.lineWidth = 6; rr(ctx, x, y, ww, hh, 14); ctx.stroke();
  }
  function phoneShell(ctx, cx, cy, s, rot, fn) { const ww = 380, hh = 740; ctx.save(); ctx.translate(cx, cy); ctx.rotate(rot); ctx.scale(s, s); ctx.translate(-ww / 2, -hh / 2); dotShadow(ctx, 0, 0, ww, hh, 50, 12, 7, 2); ctx.fillStyle = '#0D0D10'; rr(ctx, 0, 0, ww, hh, 50); ctx.fill();
    ctx.save(); rr(ctx, 14, 14, ww - 28, hh - 28, 38); ctx.clip(); ctx.fillStyle = '#F7F5F2'; ctx.fillRect(0, 0, ww, hh); fn(ww, hh); ctx.restore(); ctx.fillStyle = '#0D0D10'; rr(ctx, ww / 2 - 52, 26, 104, 28, 14); ctx.fill(); ctx.restore(); }
  function commentaryShort(ctx, ww, hh, t, caption = 'Watch his left foot.', seed = 0) {   // a commentary Short: clip on top, creator caption, retention bar
    clipFrame(ctx, 24, 90, ww - 48, 330, t, seed); T(ctx, caption, ww / 2, 470, 26, 800, INK, UI, 'center');
    ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(60, hh - 120, 26, 0, 7); ctx.fill(); if (IMG.logo) ctx.drawImage(IMG.logo, 36, hh - 144, 48, 48); T(ctx, '@shortsuni', 98, hh - 120, 22, 700, INK, UI);
    ctx.fillStyle = 'rgba(0,0,0,0.12)'; ctx.fillRect(14, hh - 40, ww - 28, 6); ctx.fillStyle = RED; ctx.fillRect(14, hh - 40, (ww - 28) * ((t * 0.35 + seed * 0.2) % 1), 6);
  }
  // hook: a commentary Short with the 9.2M pill; phones fan out; retention line holds to the end
  SC.k_hook = (ctx, t) => {
    const fan = E.outBack(pr(t, w(4) - 0.05, w(4) + 7 * F1), 1.6), fold = E.inC(pr(t, w(7) - 0.05, w(7) + 5 * F1)), f = clamp(fan) * (1 - fold);
    const pz = 1 + 0.04 * pr(t, 0, 3); ctx.save(); ctx.translate(540, 980); ctx.scale(pz, pz); ctx.translate(-540, -980);
    if (f > 0.01) { phoneShell(ctx, L(540, 270, f), 960, 0.95, L(0, -0.2, f), (ww, hh) => commentaryShort(ctx, ww, hh, t, 'The keeper froze.', 2)); phoneShell(ctx, L(540, 810, f), 960, 0.95, L(0, 0.2, f), (ww, hh) => commentaryShort(ctx, ww, hh, t, 'Wait for it…', 4)); }
    phoneShell(ctx, 540, 930, 1.1, Math.sin(t * 2.2) * 0.02, (ww, hh) => commentaryShort(ctx, ww, hh, t));
    viewsPill(ctx, 700, 640, t, E.outBack(pr(t, 0, 6 * F1), 1.6));
    // retention meter next to the phone: stays at 100 % to the end
    if (t >= w(7) - 0.1) { const k = pop(t, w(7) - 0.1, 6 * F1), p = pr(t, w(7), we(10)); ctx.save(); ctx.translate(180, 1240); ctx.scale(k, k); lightCard(ctx, -130, -60, 260, 120, 18); T(ctx, 'WATCHED', -100, -20, 26, 400, INK, STAMP); ctx.fillStyle = '#E4E1DD'; rr(ctx, -100, 12, 200, 22, 11); ctx.fill(); ctx.fillStyle = RED; rr(ctx, -100, 12, 200 * p, 22, 11); ctx.fill(); T(ctx, Math.round(100 * p) + '%', 100, -20, 26, 800, RED, UI, 'right'); ctx.restore(); }
    ctx.restore();
    if (t >= w(10) - 0.05) marker(ctx, 540, 930, 260, 450, t, w(10) - 0.05, 0.6);
  };
  // the problem: retention crashes at 0:02, viewers walk away; "fix it" -> line bounces back; "five steps" -> staircase
  SC.k_lose = (ctx, t) => withPush(ctx, t, w(11), () => {
    const crash = E.inOutC(pr(t, w(16) - 0.1, we(17))), fix = E.outBack(pr(t, w(18), w(18) + 8 * F1), 1.4), stair = pr(t, w(21) - 0.05, we(22) + 0.2);
    if (stair <= 0) {
      lightCard(ctx, 90, 640, 900, 560, 22); T(ctx, '// audience retention', 130, 690, 22, 500, GREY, MONO);
      const gx = 150, gy = 740, gw = 780, gh = 360; ctx.strokeStyle = '#ECE9E5'; ctx.lineWidth = 2; for (let i = 0; i <= 4; i++) { ctx.beginPath(); ctx.moveTo(gx, gy + gh * i / 4); ctx.lineTo(gx + gw, gy + gh * i / 4); ctx.stroke(); }
      ctx.lineWidth = 9; ctx.lineJoin = 'round'; ctx.strokeStyle = fix > 0.5 ? '#22A33A' : INK; ctx.beginPath();
      for (let k = 0; k <= 80; k++) { const u = k / 80, bad = u < 0.12 ? 1 - u * 0.5 : L(0.94, 0.18, clamp((u - 0.12) / 0.06)) - (u - 0.18) * 0.1, good = 1 - u * 0.25, v = L(L(1 - u * 0.05, bad, crash), good, clamp(fix)); const X = gx + u * gw * clamp(pr(t, w(11) - 0.1, w(11) + 0.6) * 1.2), Y = gy + gh * (1 - v); k ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); } ctx.stroke();
      T(ctx, '0:00', gx, gy + gh + 30, 20, 600, GREY, MONO, 'center'); T(ctx, '0:02', gx + gw * 0.15, gy + gh + 30, 20, 700, RED, MONO, 'center'); T(ctx, '0:30', gx + gw, gy + gh + 30, 20, 600, GREY, MONO, 'center');
      if (crash > 0.5 && fix < 0.5) { marker(ctx, gx + gw * 0.16, gy + gh * 0.5, 90, 220, t, w(16), 9); const k = pop(t, w(16) + 0.1, 5 * F1); ctx.save(); ctx.translate(gx + gw * 0.4, gy + 110); ctx.scale(k, k); pill(ctx, '72% swiped', -80, 0, 26, RED, '#FFF'); ctx.restore(); }
      if (fix > 0.3) { const k = pop(t, w(18) + 0.1, 6 * F1); ctx.save(); ctx.translate(gx + gw * 0.7, gy + 80); ctx.scale(k, k); pill(ctx, 'FIXED ✓', -70, 0, 26, '#22A33A', '#FFF'); ctx.restore(); }
      // viewers walking off on "lose viewers"
      for (let i = 0; i < 7; i++) { const t0 = w(13) + i * 0.08; if (t < t0) continue; const d = t - t0, x = 220 + i * 90 + d * 520, y = 1360 + Math.abs(Math.sin(d * 14 + i)) * -10; if (x > 1100) continue; ctx.save(); ctx.translate(x, y); ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(0, -60, 15, 0, 7); ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 8; ctx.lineCap = 'round'; const sw = Math.sin(d * 16 + i) * 10; ctx.beginPath(); ctx.moveTo(0, -45); ctx.lineTo(0, -14); ctx.lineTo(-8 - sw, 8); ctx.moveTo(0, -14); ctx.lineTo(8 + sw, 8); ctx.stroke(); ctx.restore(); }
      if (t >= w(16) - 0.05) { const k = pop(t, w(16) - 0.05, 6 * F1); ctx.save(); ctx.translate(840, 600); ctx.scale(k, k); ctx.strokeStyle = INK; ctx.fillStyle = '#FFF'; ctx.lineWidth = 9; ctx.beginPath(); ctx.arc(0, 0, 70, 0, 7); ctx.fill(); ctx.stroke(); ctx.fillStyle = 'rgba(225,10,15,0.25)'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, 60, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * pr(t, w(16), we(17)) * 0.2); ctx.fill(); T(ctx, '0:02', 0, 100, 40, 400, RED, STAMP, 'center'); ctx.restore(); }
    } else {
      for (let i = 0; i < 5; i++) { const bx = 70 + i * 180, gp = clamp(stair * 1.6 - i * 0.15), bh = L(34, 90 + i * 120, E.outBack(gp, 1.5)); ctx.fillStyle = INK; rr(ctx, bx, 1300 - bh, 160, bh + 4, 8); ctx.fill(); T(ctx, String(i + 1), bx + 80, 1300 - bh + Math.min(44, bh * 0.45), Math.min(68, 20 + bh * 0.4), 400, '#FFF', STAMP, 'center'); }
      ctx.fillStyle = INK; ctx.fillRect(30, 1300, 960, 10); slamWord(ctx, '5 STEPS', 330, 760, 120, t, we(22) - 0.1);
    }
  });
  // STEP 1: pick a clip that opens with a question
  SC.k_one = (ctx, t) => withPush(ctx, t, w(23), () => {
    const pick = t >= w(31) - 0.05, caps = ['Nice goal.', 'How did nobody see this?', 'Highlights pt. 4'];
    [0, 1, 2].forEach((i) => { const k = pop(t, w(24) - 0.1 + i * 0.1, 7 * F1); if (k <= 0) return; const x = 90 + i * 310, y = 700, win = i === 1 && pick;
      ctx.save(); ctx.translate(x + 140, y + 250); ctx.scale(k * (win ? L(1, 1.12, E.outBack(pr(t, w(31) - 0.05, w(31) + 6 * F1), 2)) : 1), k * (win ? L(1, 1.12, E.outBack(pr(t, w(31) - 0.05, w(31) + 6 * F1), 2)) : 1)); ctx.translate(-(x + 140), -(y + 250));
      lightCard(ctx, x, y, 280, 500, 20); clipFrame(ctx, x + 16, y + 16, 248, 330, t, i, pick && !win ? 0.6 : 0); T(ctx, caps[i], x + 140, y + 390, i === 1 ? 20 : 22, 700, pick && !win ? '#B9B5AF' : INK, UI, 'center');
      if (i === 1 && t >= w(31) - 0.2) { const q = pop(t, w(31) - 0.2, 6 * F1); ctx.save(); ctx.translate(x + 220, y + 40); ctx.scale(q, q); ctx.fillStyle = RED; ctx.beginPath(); ctx.arc(0, 0, 46, 0, 7); ctx.fill(); T(ctx, '?', 0, 4, 66, 400, '#FFF', STAMP, 'center'); ctx.restore(); }
      if (win) { ctx.strokeStyle = RED; ctx.lineWidth = 8; rr(ctx, x - 6, y - 6, 292, 512, 24); ctx.stroke(); }
      if (pick && !win) { ctx.strokeStyle = RED; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x + 40, y + 100); ctx.lineTo(x + 240, y + 300); ctx.moveTo(x + 240, y + 100); ctx.lineTo(x + 40, y + 300); ctx.stroke(); }
      ctx.restore(); });
    const c0 = w(26), cp = E.inOutC(pr(t, c0, w(31) - 0.05)); if (t >= c0 - 0.2) cursor(ctx, L(160, 600, cp) + Math.sin(cp * 9) * 120 * (1 - cp), L(1500, 1100, cp), (t >= w(31) && t < w(31) + 3 * F1 ? 0.85 : 1) * 1.6);
    if (pick) slamWord(ctx, 'PICK THIS', 540, 1390, 100, t, w(31) + 0.1);
  });
  // STEP 2: payoff first, under 8 words
  SC.k_two = (ctx, t) => withPush(ctx, t, w(32), () => {
    const H = 'He scored from his own half.', n = Math.round(H.length * pr(t, w(35), we(40)));
    phoneShell(ctx, 360, 960, 1.05, 0, (ww, hh) => { clipFrame(ctx, 24, 90, ww - 48, 330, t, 1); T(ctx, H.slice(0, 15), 30, 480, 30, 800, INK, UI); T(ctx, H.slice(15, n), 30, 520, 30, 800, RED, UI); if (n < H.length && Math.floor(t * 4) % 2 === 0) { ctx.fillStyle = RED; ctx.fillRect(34 + tw(ctx, n > 15 ? H.slice(15, n) : H.slice(0, n), 30, 800, UI), n > 15 ? 500 : 460, 4, 40); } });
    bigBadge(ctx, 2, t, w(32) - 0.05, [560, 590]);
    const words = H.slice(0, n).split(' ').filter(Boolean).length; if (t >= w(38) - 0.1) { const k = pop(t, w(38) - 0.1, 6 * F1); ctx.save(); ctx.translate(820, 900); ctx.scale(k, k); lightCard(ctx, -150, -110, 300, 220, 20); T(ctx, String(words), 0, -20, 120, 400, words <= 8 ? RED : INK, STAMP, 'center'); T(ctx, 'WORDS  ≤ 8', 0, 70, 30, 400, INK, STAMP, 'center'); ctx.restore(); }
    if (t >= w(35)) slamWord(ctx, 'PAYOFF FIRST', 540, 1420, 96, t, w(36) - 0.02);
  });
  // STEP 3: cut every pause
  SC.k_three = (ctx, t) => withPush(ctx, t, w(41), () => {
    const box = darkWin(ctx, 540, 1000, 1.18, 'Editor · commentary_v1', (c, ww, hh) => {
      const close = E.inOutC(pr(t, w(45), we(46) + 0.2)), gaps = [[0.18, 0.08], [0.43, 0.1], [0.7, 0.07]];
      let x = 40; const span = ww - 80; T(c, 'VOICE', 40, 92, 18, 700, '#8C8A94', MONO);
      for (let i = 0; i < 4; i++) { const segW = span * [0.18, 0.17, 0.2, 0.18][i] * L(1, 1.25, close); for (let b = 0; b < segW / 9; b++) { const a2 = (0.3 + 0.7 * Math.abs(Math.sin((i * 30 + b) * 1.3 + t * 7))) * 120; c.fillStyle = '#F2F0F6'; c.fillRect(x + b * 9, 200 - a2 / 2, 5, a2); } x += segW;
        if (i < 3) { const gw = span * gaps[i][1] * (1 - close); if (gw > 2) { c.fillStyle = 'rgba(225,10,15,0.25)'; c.fillRect(x, 120, gw, 160); if (t >= w(44) - 0.05) { c.strokeStyle = RED; c.lineWidth = 3; c.setLineDash([8, 6]); c.strokeRect(x, 120, gw, 160); c.setLineDash([]); T(c, 'pause', x + gw / 2, 300, 15, 700, RED, MONO, 'center'); } } x += gw; } }
      const len = L(41, 28, close); T(c, '0:' + String(Math.round(len)).padStart(2, '0'), ww - 40, 92, 26, 700, close > 0.5 ? '#6FCF7F' : '#F2F0F6', MONO, 'right');
      // clip track under
      for (let i = 0; i < 6; i++) { c.save(); clipFrame(c, 40 + i * ((ww - 80) / 6), 330, (ww - 80) / 6 - 8, 80, t, i); c.restore(); }
    }, t);
    bigBadge(ctx, 3, t, w(41) - 0.05, [box.x + box.w - 20, box.y + 10]);
    if (t >= w(42)) { const k = pop(t, w(42), 6 * F1); ctx.save(); ctx.translate(230, box.y + box.h + 100); ctx.rotate(-0.2 + Math.sin(t * 14) * 0.15); ctx.scale(k * 1.3, k * 1.3); ctx.strokeStyle = INK; ctx.lineWidth = 5; [0.25, -0.25].forEach((a) => { ctx.save(); ctx.rotate(a); ctx.fillStyle = '#D9DDE4'; ctx.beginPath(); ctx.moveTo(8, -7); ctx.lineTo(-90, -2); ctx.lineTo(-90, 3); ctx.lineTo(8, 7); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.ellipse(46, a > 0 ? 22 : -22, 22, 15, 0, 0, 7); ctx.fillStyle = RED; ctx.fill(); ctx.stroke(); ctx.restore(); }); ctx.restore(); }
    if (t >= w(50) - 0.05) slamWord(ctx, 'NO DEAD AIR', 620, box.y + box.h + 110, 90, t, w(50) - 0.05);
  });
  // STEP 4: don't narrate, react every 3 seconds
  SC.k_four = (ctx, t) => withPush(ctx, t, w(51), () => {
    clipFrame(ctx, 110, 640, 860, 480, t, 3); bigBadge(ctx, 4, t, w(51) - 0.05, [950, 650]);
    if (t >= w(53) - 0.05 && t < w(56)) { const k = pop(t, w(53) - 0.05, 6 * F1); ctx.save(); ctx.translate(540, 1240); ctx.scale(k, k); lightCard(ctx, -330, -50, 660, 100, 20); T(ctx, '"Here we see the player run…"', 0, 2, 30, 600, GREY, UI, 'center'); ctx.restore(); if (t >= w(54)) { const a = E.outC(pr(t, w(54), w(54) + 4 * F1)); ctx.strokeStyle = RED; ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(220, 1240); ctx.lineTo(L(220, 860, a), 1240); ctx.stroke(); } }
    // timeline with 3-second ticks; reaction bubbles pop on the ticks
    const ty = 1260; if (t >= w(56) - 0.1) { ctx.fillStyle = INK; rr(ctx, 110, ty, 860, 14, 7); ctx.fill(); const ph = pr(t, w(56), we(61) + 0.3); ctx.fillStyle = RED; rr(ctx, 110, ty, 860 * ph, 14, 7); ctx.fill();
      ['0:03', '0:06', '0:09'].forEach((s2, i) => { const x = 110 + 860 * (i + 1) / 4; ctx.fillStyle = INK; ctx.fillRect(x - 3, ty - 20, 6, 54); T(ctx, s2, x, ty + 56, 22, 700, INK, MONO, 'center'); }); }
    [['WAIT.', 56], ['NO WAY.', 59], ['LOOK AT HIM!', 60]].forEach(([s2, wi], i) => { const k = pop(t, w(wi), 6 * F1); if (k <= 0) return; const x = 110 + 860 * (i + 1) / 4, y = 760 + (i % 2) * 120;
      ctx.save(); ctx.translate(x, y); ctx.rotate((i - 1) * 0.08); ctx.scale(k, k); const bw = tw(ctx, s2, 44, 400, STAMP) + 50; ctx.fillStyle = '#FFF'; ctx.strokeStyle = INK; ctx.lineWidth = 6; rr(ctx, -bw / 2, -40, bw, 80, 20); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-14, 38); ctx.lineTo(0, 70); ctx.lineTo(14, 38); ctx.fill(); T(ctx, s2, 0, 4, 44, 400, i === 2 ? RED : INK, STAMP, 'center'); ctx.restore(); });
    if (t >= w(56)) slamWord(ctx, 'REACT', 540, 1440, 110, t, w(56));
  });
  // STEP 5: end on a line that loops back to the start
  SC.k_five = (ctx, t) => withPush(ctx, t, w(62), () => {
    const loop = E.inOutC(pr(t, w(68) - 0.05, we(69) + 0.2)), start = t >= w(72);
    phoneShell(ctx, 540, 980, 1.05, 0, (ww, hh) => commentaryShort(ctx, ww, hh, t, start ? 'Watch his left foot.' : '…so watch his left foot.', 0));
    bigBadge(ctx, 5, t, w(62) - 0.05, [760, 620]);
    if (loop > 0) { ctx.save(); ctx.strokeStyle = RED; ctx.lineWidth = 12; ctx.lineCap = 'round'; const a0 = Math.PI * 0.35, a1 = a0 + Math.PI * 1.8 * loop; ctx.beginPath(); ctx.ellipse(540, 980, 330, 470, 0, a0, a1); ctx.stroke(); const ex = 540 + Math.cos(a1) * 330, ey = 980 + Math.sin(a1) * 470; ctx.translate(ex, ey); ctx.rotate(a1 + Math.PI / 2); ctx.fillStyle = RED; ctx.beginPath(); ctx.moveTo(0, -26); ctx.lineTo(24, 14); ctx.lineTo(-24, 14); ctx.closePath(); ctx.fill(); ctx.restore(); }
    if (t >= w(68)) { const n = 1 + Math.floor(pr(t, w(68), we(72) + 0.4) * 3); const k = pop(t, w(68), 5 * F1); ctx.save(); ctx.translate(880, 1290); ctx.scale(k, k); pill(ctx, 'replays ×' + n, -110, 0, 30, INK, '#FFF'); ctx.restore(); }
    if (start) slamWord(ctx, 'LOOP IT', 360, 1460, 110, t, w(72));
  });
  // proof + CTA with reel7's word indices
  SC.k_proof = (ctx, t) => { const z = 1 + 0.05 * pr(t, w(73), w(73) + 3.5);
    ctx.save(); ctx.translate(540, 930); ctx.scale(z, z); const cw = SW + 48, ch = SH + 48; dotShadow(ctx, -cw / 2, -ch / 2, cw, ch, 32, 14); ctx.fillStyle = '#121212'; rr(ctx, -cw / 2, -ch / 2, cw, ch, 32); ctx.fill();
    ctx.save(); rr(ctx, -SW / 2, -SH / 2, SW, SH, 16); ctx.clip(); ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high'; ctx.filter = 'none'; ctx.drawImage(IMG.shot, -SW / 2, -SH / 2, SW, SH); ctx.restore();
    const k = SW / 1630; marker(ctx, -SW / 2 + 408 * k, -SH / 2 + 700 * k, 430 * k, 178 * k, t, w(78), 99); T(ctx, 'My channel · last 28 days · YouTube Studio', 0, ch / 2 + 40, 28, 600, GREY, SANS, 'center'); ctx.restore();
    if (t >= w(81) - 0.05) { const k2 = pop(t, w(81) - 0.05, 6 * F1); ctx.save(); ctx.translate(320, 1440); ctx.scale(k2, k2); lightCard(ctx, -190, -110, 380, 220, 18); T(ctx, '28 DAYS', -160, -76, 30, 400, INK, STAMP);
      for (let d = 0; d < 28; d++) { const on = d < Math.round(28 * pr(t, w(81), we(82) + 0.4)); ctx.fillStyle = on ? RED : '#E4E1DD'; rr(ctx, -160 + (d % 7) * 46, -40 + Math.floor(d / 7) * 34, 38, 26, 5); ctx.fill(); } ctx.restore(); } };
  SC.k_cta = (ctx, t) => {
    const k0 = E.outBack(pr(t, w(83) - 0.2, w(83) + 6 * F1), 1.5), y = L(1500, 760, clamp(k0)), red = t >= we(84) + 0.02;
    ctx.save(); ctx.translate(540, y); dotShadow(ctx, -440, -64, 880, 128, 64, 10, 7, 2); ctx.fillStyle = red ? RED : '#1D1C21'; rr(ctx, -440, -64, 880, 128, 64); ctx.fill();
    ctx.fillStyle = red ? '#FFF' : RED; ctx.beginPath(); ctx.arc(-370, 0, 30, 0, 7); ctx.fill(); ctx.fillStyle = red ? RED : '#1D1C21'; ctx.beginPath(); ctx.arc(-370, 0, 14, 0, 7); ctx.fill();
    const lt = w(84) - 0.05; if (t < lt) T(ctx, 'Add a comment…', -310, 2, 34, 500, '#8C8A94', UI);
    'HOOK'.split('').forEach((c, i) => { const t0 = lt + i * 2 * F1, p = pr(t, t0, t0 + 6 * F1); if (p <= 0) return; const fl = Math.cos((1 - E.outBack(p, 1.6)) * Math.PI * 0.5); ctx.save(); ctx.translate(-280 + i * 90, 0); ctx.rotate((1 - p) * 0.6); ctx.scale(1, Math.max(0.05, fl)); ctx.fillStyle = '#FFF'; rr(ctx, -38, -44, 76, 88, 10); ctx.fill(); T(ctx, c, 0, 4, 66, 400, RED, STAMP, 'center'); ctx.restore(); });
    const cp = pop(t, we(84) + 0.05, 7 * F1); if (cp > 0) { ctx.save(); ctx.translate(370, 0); ctx.scale(cp, cp); ctx.fillStyle = '#FFF'; ctx.beginPath(); ctx.arc(0, 0, 38, 0, 7); ctx.fill(); ctx.strokeStyle = RED; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-15, 0); ctx.lineTo(-4, 12); ctx.lineTo(17, -12); ctx.stroke(); ctx.restore(); }
    ctx.restore();
    if (t >= w(85)) { const k = E.outC(pr(t, w(85), w(85) + 8 * F1)); ctx.save(); ctx.globalAlpha = k; ctx.translate(0, L(80, 0, k)); dotShadow(ctx, 110, 860, 600, 330, 22, 10, 7, 2); ctx.fillStyle = '#1D1C21'; rr(ctx, 110, 860, 600, 330, 22); ctx.fill(); T(ctx, 'Comments', 410, 900, 22, 700, '#ECEAF2', UI, 'center');
      ['HOOK \u{1F525}', 'HOOK', 'hook pls', 'HOOK!!'].forEach((c, i) => { if (t < w(85) + i * 0.12) return; ctx.fillStyle = ['#7B4DFF', '#3B7BFF', '#22A33A', '#F8A800'][i]; ctx.beginPath(); ctx.arc(160, 960 + i * 58, 18, 0, 7); ctx.fill(); T(ctx, c, 196, 960 + i * 58, 22, 600, '#F2F0F6', UI); }); ctx.restore(); }
    if (t >= w(87)) { slamWord(ctx, 'SENT', 820, 940, 110, t, w(87) + 0.03, RED, -0.12); const pp = E.inOutC(pr(t, w(87), w(87) + 0.5)); if (pp < 1) { ctx.save(); ctx.translate(L(900, 1100, pp), L(760, 520, pp)); ctx.rotate(-0.5); ctx.fillStyle = '#FFF'; ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-40, 16); ctx.lineTo(44, -20); ctx.lineTo(-16, 32); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore(); } }
    const dk = pop(t, w(89) - 0.1, 7 * F1); if (dk > 0) { ctx.save(); ctx.translate(430, L(1600, 1320, clamp(dk))); ctx.scale(clamp(dk, 0, 1.1), clamp(dk, 0, 1.1)); lightCard(ctx, -300, -100, 600, 200, 24);
      ctx.save(); ctx.imageSmoothingEnabled = true; ctx.drawImage(IMG.logo, -270, -70, 76, 76); ctx.restore(); T(ctx, G.R.brand.handle, -176, -42, 34, 700, INK, SANS); T(ctx, 'sent you the checklist · now', -176, -4, 22, 500, GREY, SANS);
      ctx.fillStyle = '#F1EEEA'; rr(ctx, -270, 30, 540, 50, 12); ctx.fill(); ctx.fillStyle = RED; rr(ctx, -260, 39, 32, 32, 6); ctx.fill(); T(ctx, 'hook_checklist.pdf', -214, 55, 24, 600, INK, MONO); ctx.restore(); }
  };
};

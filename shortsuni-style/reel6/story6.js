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
  function img(ctx, key, cx, cy, h, rot = 0) { const im = IMG[key]; if (!im) return; const ww = (im.width / im.height) * h; ctx.save(); ctx.translate(cx, cy); ctx.rotate(rot); ctx.imageSmoothingEnabled = true; ctx.drawImage(im, -ww / 2, -h / 2, ww, h); ctx.restore(); }

  // ---------------------------------------------------------------- phone with a reel playing (content swaps every ~0.27 s like his)
  const FRAMES = [['o_piggy', 'SAVE IT'], ['o_camera', 'NO CAMERA'], ['o_trophy', 'VIRAL.'], ['o_magnifier', 'LOOK'], ['o_filmreel', 'EVERY SCENE'], ['o_gift', 'FREE']];
  function reelScreen(ctx, x, y, ww, hh, t, seed = 0, plain = false) {
    ctx.fillStyle = '#F7F5F2'; ctx.fillRect(x, y, ww, hh);
    if (plain) { ctx.strokeStyle = '#C9C6C2'; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(x + ww / 2, y + hh * 0.42, ww * 0.18, 0, 7); ctx.stroke(); ctx.fillStyle = '#D9D6D2'; for (let i = 0; i < 4; i++) { rr(ctx, x + ww * 0.15, y + hh * 0.65 + i * 30, ww * (0.7 - i * 0.1), 12, 5); ctx.fill(); } return; }
    const k = (Math.floor(t / 0.27) + seed) % FRAMES.length, [key, word] = FRAMES[k];
    T(ctx, 'Why your Shorts', x + 22, y + 52, 26, 800, INK, UI); T(ctx, 'get 0 views.', x + 22, y + 84, 26, 800, RED, UI);
    img(ctx, key, x + ww / 2, y + hh * 0.48, hh * 0.36, Math.sin(t * 6) * 0.06);
    T(ctx, word, x + ww / 2, y + hh * 0.75, 40, 400, RED, STAMP, 'center');
    const m = IMG.m_wave1; if (m) { const h = hh * 0.22, w2 = (m.width / m.height) * h; ctx.drawImage(m, x + ww - w2 - 6, y + hh - h - 18, w2, h); }
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
    // wipe into the first step badge (test tail only)
    const W0 = we(16) + 0.25; if (t >= W0) { const g = pr(t, W0, W0 + 5 * F1), hold = t >= W0 + 5 * F1 && t < W0 + 8 * F1, rv = pr(t, W0 + 8 * F1, W0 + 18 * F1);
      ctx.fillStyle = '#0A0A0A'; const P = 36;
      if (hold) ctx.fillRect(0, 0, 1080, 1920);
      else for (let y = 0; y <= 1956; y += P) for (let x = 0; x <= 1116; x += P) { const d = Math.hypot(x - 540, y - 980) / 1120; const r = (rv > 0 ? clamp(1 - (rv * 1.8 - d * 0.8)) : clamp(g * 1.9 - (Math.hypot(1080 - x, y) / 2200) * 0.9)) * 27; if (r > 0.4) { ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); } }
      if (rv > 0) G.badge(ctx, 1, 540, 980, t, W0 + 8 * F1, 1.9); }
  };
};

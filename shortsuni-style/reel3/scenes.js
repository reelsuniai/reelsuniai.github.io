/* reel3 scenes: "This entire reel was made by Claude Code." Generated 3D object renders (assets/cut/o_*.png)
 * dropped onto the paper stage with spring physics, plus code-built UI. Stage y 560-1360; mascot owns the bottom-right. */
window.REGISTER_SCENES = function (G) {
  const { SC, w, we, pr, E, lerp, clamp, rnd, T, tw, pill, marker, strike, cursor, stamp, lightCard, darkWin, dotShadow, rr, RED, INK, GREY, F1, IMG, SANS, MONO, STAMP, UI, stageXf } = G;
  const SHC = {};
  function shadowOf(img) {
    if (SHC[img.src]) return SHC[img.src];
    const c = document.createElement('canvas'); c.width = img.width; c.height = img.height; const x = c.getContext('2d'); x.drawImage(img, 0, 0); x.globalCompositeOperation = 'source-in';
    const tl = document.createElement('canvas'); tl.width = tl.height = 8; const q = tl.getContext('2d'); q.fillStyle = 'rgba(20,16,16,0.55)'; q.beginPath(); q.arc(4, 4, 2.2, 0, 7); q.fill();
    x.fillStyle = x.createPattern(tl, 'repeat'); x.fillRect(0, 0, c.width, c.height); return (SHC[img.src] = c);
  }
  // a generated object: spring drop-in (from 140 px above, back-out overshoot, 7 f), idle float, optional rotation
  function obj(ctx, key, cx, cy, h, t, t0, o = {}) {
    const img = IMG[key]; if (!img || t < t0) return;
    const p = pr(t, t0, t0 + 7 * F1), k = E.outBack(p, 2.2);
    const ww = (img.width / img.height) * h, fl = Math.sin((t + cx * 0.01) * 2.4) * 6 * (o.float ?? 1);
    ctx.save(); ctx.translate(cx, cy + lerp(-140, 0, Math.min(1, k)) + fl); ctx.rotate((o.rot || 0) + (1 - p) * 0.25); ctx.scale(lerp(0.6, 1, Math.min(1.1, k)), lerp(0.6, 1, Math.min(1.1, k)));
    if (o.squash && t >= o.squash && t < o.squash + 4 * F1) ctx.scale(1.08, 0.9);
    ctx.globalAlpha = clamp(p * 3); ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(shadowOf(img), -ww / 2 + 14, -h / 2 + 12, ww, h); ctx.drawImage(img, -ww / 2, -h / 2, ww, h);
    ctx.restore();
  }
  const pop = (t, t0, d = 6 * F1) => (t < t0 ? 0 : clamp(E.outBack(pr(t, t0, t0 + d), 1.8), 0, 1.2));
  function sprung(ctx, t, t0, x, y, fn) { const k = pop(t, t0); if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.globalAlpha = clamp(k * 1.4); fn(ctx); ctx.restore(); }
  function bigX(ctx, cx, cy, r, t, t0) {
    ctx.save(); ctx.strokeStyle = RED; ctx.lineWidth = 20; ctx.lineCap = 'round';
    const a = E.outC(pr(t, t0, t0 + 4 * F1)), b = E.outC(pr(t, t0 + 3 * F1, t0 + 7 * F1));
    if (a > 0) { ctx.beginPath(); ctx.moveTo(cx - r, cy - r); ctx.lineTo(cx - r + 2 * r * a, cy - r + 2 * r * a); ctx.stroke(); }
    if (b > 0) { ctx.beginPath(); ctx.moveTo(cx + r, cy - r); ctx.lineTo(cx + r - 2 * r * b, cy - r + 2 * r * b); ctx.stroke(); }
    ctx.restore();
  }
  function phoneFrame(ctx, x, y, ww, hh) { dotShadow(ctx, x, y, ww, hh, 48, 14); ctx.fillStyle = '#0D0D10'; rr(ctx, x, y, ww, hh, 48); ctx.fill(); ctx.fillStyle = '#0D0D10'; rr(ctx, x + ww / 2 - 46, y + 16, 92, 24, 12); ctx.fill(); return [x + 14, y + 14, ww - 28, hh - 28]; }
  function miniReel(ctx, sx, sy, sw, sh, t, key) {      // a tiny version of a reel frame: paper bg + caption bars + an object + the mascot
    ctx.fillStyle = '#F2F0EE'; ctx.fillRect(sx, sy, sw, sh);
    ctx.fillStyle = INK; rr(ctx, sx + 20, sy + 40, sw * 0.6, 14, 4); ctx.fill(); ctx.fillStyle = RED; rr(ctx, sx + 20, sy + 64, sw * 0.35, 14, 4); ctx.fill();
    const o = IMG[key]; if (o) { const h = sh * 0.32, ww = (o.width / o.height) * h; ctx.drawImage(o, sx + sw / 2 - ww / 2, sy + sh * 0.25, ww, h); }
    const m = IMG[G.R.mascot.poses[0][1]]; if (m) { const h = sh * 0.38, ww = (m.width / m.height) * h; ctx.drawImage(m, sx + sw - ww * 0.9, sy + sh - h, ww, h); }
  }

  // 1. "This entire reel was made by Claude Code." — this reel, inside a phone; clapper snaps; terminal chip
  SC.made = (ctx, t, s) => {
    stageXf(ctx, t, 0, 540, 950);
    const [sx, sy, sw, sh] = phoneFrame(ctx, 330, 600, 380, 700);
    ctx.save(); rr(ctx, sx, sy, sw, sh, 36); ctx.clip(); miniReel(ctx, sx, sy, sw, sh, t, 'o_filmreel'); ctx.restore();
    T(ctx, 'this reel', 520, 570, 26, 600, GREY, MONO, 'center');
    obj(ctx, 'o_filmreel', 200, 820, 260, t, 0.0);
    obj(ctx, 'o_clapper', 860, 760, 250, t, w(s.clapAt), { squash: w(s.clapAt) + 0.25 });
    if (t >= w(s.chipAt)) sprung(ctx, t, w(s.chipAt), 820, 1110, (c) => { dotShadow(c, -190, -50, 380, 100, 18, 8, 7, 2); c.fillStyle = '#1C1B1F'; rr(c, -190, -50, 380, 100, 18); c.fill();
      T(c, '>_', -150, 0, 34, 700, RED, MONO); T(c, 'Claude Code', -90, 0, 38, 700, '#FFF', UI); });
    marker(ctx, 520, 950, 220, 380, t, w(s.markAt), 9);
    stamp(ctx, 'MADE BY', 'CLAUDE.', 150, 1260, t, w(s.stampAt), w(s.stampKey), 70, 120);
  };

  // 2. "No camera. No editor. No animator." — three objects on a wooden shelf, crossed out one by one
  SC.nos = (ctx, t, s) => {
    stageXf(ctx, t, w(s.at));
    ctx.fillStyle = '#B07A45'; rr(ctx, 70, 1050, 940, 34, 8); ctx.fill(); ctx.fillStyle = '#8A5A2E'; ctx.fillRect(70, 1084, 940, 16);
    ctx.fillStyle = '#8A5A2E'; ctx.fillRect(140, 1100, 26, 140); ctx.fillRect(914, 1100, 26, 140);
    const items = [['o_camera', 'CAMERA'], ['o_scissors', 'EDITOR'], ['o_palette', 'ANIMATOR']];
    items.forEach(([k, label], i) => {
      const cx = 220 + i * 320, t0 = w(s.at) - 0.2 + i * 0.12, xt = w(s.xs[i]);
      obj(ctx, k, cx, 900, 280, t, t0, { float: 0 });
      sprung(ctx, t, t0 + 0.1, cx, 1160 + 40, (c) => { c.fillStyle = INK; rr(c, -110, -30, 220, 60, 8); c.fill(); T(c, label, 0, 2, 34, 400, '#FFF', STAMP, 'center'); });
      if (t >= xt) bigX(ctx, cx, 900, 120, t, xt);
    });
    if (t >= we(s.xs[2]) + 0.05) { const p = E.outBack(pr(t, we(s.xs[2]) + 0.05, we(s.xs[2]) + 0.3), 2);
      ctx.save(); ctx.translate(540, 670); ctx.rotate(-0.06); ctx.scale(p, p); ctx.fillStyle = RED; rr(ctx, -280, -60, 560, 120, 14); ctx.fill(); T(ctx, 'NONE OF IT.', 0, 4, 84, 400, '#FFF', STAMP, 'center'); ctx.restore(); }
  };

  // 3. "I typed one sentence." — the terminal types the one-liner; keyboard bounces on every keystroke
  const ONE = 'make a reel about how this reel was made';
  SC.typed = (ctx, t, s) => {
    stageXf(ctx, t, w(s.at));
    darkWin(ctx, 70, 600, 940, 420, 'Claude Code');
    T(ctx, '✳  What should we build?', 540, 740, 34, 600, '#CFCDD6', UI, 'center');
    ctx.fillStyle = '#2B2A2F'; rr(ctx, 110, 860, 860, 110, 22); ctx.fill();
    const n = Math.round(ONE.length * pr(t, w(s.typeFrom), we(s.typeTo) - 0.05)), shown = ONE.slice(0, n);
    T(ctx, '> ' + shown, 140, 915, 32, 600, '#F2F0F6', MONO); if (n < ONE.length && Math.floor(t * 4) % 2 === 0) { ctx.fillStyle = RED; ctx.fillRect(150 + tw(ctx, '> ' + shown, 32, 600, MONO), 893, 16, 44); }
    obj(ctx, 'o_keyboard', 380, 1180, 220, t, w(s.at) - 0.1, { squash: Math.floor(t * 12) / 12, float: 0.3 });
    if (t >= w(s.countAt)) { const words = Math.min(9, Math.round(9 * pr(t, w(s.typeFrom), we(s.typeTo)))); T(ctx, String(words), 820, 1150, 120, 400, RED, STAMP, 'center'); T(ctx, 'WORDS', 820, 1240, 34, 400, INK, STAMP, 'center'); }
    stamp(ctx, '', '1 SENTENCE', 150, 1340, t, w(s.stampKey), w(s.stampKey), 1, 96);
  };

  // 4. "It wrote the script, recorded the voice, and animated every scene you're watching." — phone + build checklist
  SC.build = (ctx, t, s) => {
    stageXf(ctx, t, w(s.at));
    const [sx, sy, sw, sh] = phoneFrame(ctx, 90, 600, 380, 720);
    ctx.save(); rr(ctx, sx, sy, sw, sh, 36); ctx.clip(); ctx.fillStyle = '#F7F5F2'; ctx.fillRect(sx, sy, sw, sh);
    const stage = t >= w(s.scenesAt) ? 2 : t >= w(s.voiceAt) ? 1 : 0;
    if (stage === 0) { ['HOOK', 'PROOF', 'STEPS', 'CTA'].forEach((h, i) => { const tt = w(s.at) + i * 0.15; if (t < tt) return; ctx.fillStyle = RED; rr(ctx, sx + 24, sy + 70 + i * 120, 90, 30, 6); ctx.fill(); T(ctx, h, sx + 69, sy + 86 + i * 120, 18, 800, '#FFF', UI, 'center');
      ctx.fillStyle = '#C9C6C2'; rr(ctx, sx + 24, sy + 112 + i * 120, sw - 60, 14, 5); ctx.fill(); rr(ctx, sx + 24, sy + 134 + i * 120, sw - 120, 14, 5); ctx.fill(); }); }
    if (stage === 1) { for (let i = 0; i < 40; i++) { const a = Math.abs(Math.sin(i * 1.7 + t * 9)) * (0.3 + 0.7 * rnd(i)) * 160; ctx.fillStyle = i / 40 < pr(t, w(s.voiceAt), we(s.voiceAt) + 0.4) ? RED : '#C9C6C2'; rr(ctx, sx + 20 + i * 8.5, sy + sh / 2 - a / 2, 5, a, 2); ctx.fill(); } }
    if (stage === 2) { const keys = ['o_clapper', 'o_camera', 'o_mic', 'o_palette', 'o_magnifier', 'o_piggy']; const k = keys[Math.floor((t - w(s.scenesAt)) * 6) % keys.length]; miniReel(ctx, sx, sy, sw, sh, t, k); }
    ctx.restore();
    // checklist (dark panel)
    darkWin(ctx, 520, 620, 470, 430, 'Building your reel');
    [['Script', s.scriptAt], ['Voice', s.voiceAt], ['Scenes', s.scenesAt]].forEach(([lab, wi], i) => {
      const yy = 730 + i * 100, done = t >= we(wi), on = t >= w(wi) - 0.15;
      ctx.fillStyle = done ? RED : on ? '#4A4952' : '#2B2A2F'; ctx.beginPath(); ctx.arc(570, yy, 22, 0, 7); ctx.fill();
      if (done) { ctx.strokeStyle = '#FFF'; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(560, yy); ctx.lineTo(568, yy + 8); ctx.lineTo(582, yy - 8); ctx.stroke(); }
      T(ctx, lab, 610, yy, 36, 700, on ? '#F2F0F6' : '#77757E', UI);
      if (on && !done) T(ctx, 'working…', 960, yy, 22, 500, RED, MONO, 'right');
    });
    obj(ctx, 'o_mic', 800, 1180, 230, t, w(s.voiceAt), {});
    obj(ctx, 'o_brush', 640, 1190, 200, t, w(s.scenesAt), { rot: -0.4 });
    if (t >= w(s.countAt)) sprung(ctx, t, w(s.countAt), 880, 580, (c) => pill(c, 'SCENES 8/8', -110, 0, 26, RED, '#FFF'));
  };

  // 5. "Then it watched its own video and fixed the slow parts." — motion check: magnifier scans, SLOW -> FIXED, PASS
  SC.check = (ctx, t, s) => {
    stageXf(ctx, t, w(s.at));
    lightCard(ctx, 90, 610, 900, 520, 22); T(ctx, 'MOTION CHECK', 130, 665, 52, 400, INK, STAMP);
    const fixed = t >= w(s.fixAt);
    pill(ctx, fixed ? 'fixed ✓' : 'scanning…', 800, 665, 24, fixed ? RED : '#141414', '#FFF');
    const gx = 130, gy = 760, gw = 820, gh = 280, bad = [[0.28, 0.4], [0.62, 0.74]];
    ctx.strokeStyle = '#E8E5E1'; ctx.lineWidth = 2; for (let i = 0; i <= 4; i++) { ctx.beginPath(); ctx.moveTo(gx, gy + (gh * i) / 4); ctx.lineTo(gx + gw, gy + (gh * i) / 4); ctx.stroke(); }
    const fk = pr(t, w(s.fixAt), w(s.fixAt) + 0.3);
    ctx.strokeStyle = INK; ctx.lineWidth = 6; ctx.beginPath();
    for (let k = 0; k <= 160; k++) { const u = k / 160, inBad = bad.some(([a, b]) => u > a && u < b);
      const v = 0.5 + 0.38 * Math.sin(u * 40) * (inBad ? lerp(0.12, 1, fk) : 1) * (0.6 + 0.4 * rnd(k)); const X = gx + u * gw, Y = gy + gh * (1 - v); k ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); } ctx.stroke();
    if (t >= w(s.slowAt) - 0.05 || fixed) bad.forEach(([a, b], i) => { const p = pr(t, w(s.slowAt) - 0.05 + i * 0.1, w(s.slowAt) + 0.1 + i * 0.1); if (p <= 0 && !fixed) return;
      ctx.save(); ctx.globalAlpha = 0.9; ctx.strokeStyle = fixed ? '#2DB82D' : RED; ctx.lineWidth = 5; ctx.setLineDash([12, 8]); rr(ctx, gx + a * gw, gy - 10, (b - a) * gw, gh + 20, 10); ctx.stroke(); ctx.setLineDash([]);
      pill(ctx, fixed ? 'FIXED' : 'SLOW', gx + a * gw + 10, gy - 34, 22, fixed ? '#2DB82D' : RED, '#FFF'); ctx.restore(); });
    // magnifier scans left -> right while "watched its own video"
    const sp = E.inOutC(pr(t, w(s.at) - 0.1, w(s.scanTo)));
    obj(ctx, 'o_magnifier', lerp(gx + 60, gx + gw - 60, sp), 930 + Math.sin(t * 6) * 20, 260, t, w(s.at) - 0.15, { rot: -0.3, float: 0 });
    if (t >= w(s.passAt)) { const p = E.outBack(pr(t, w(s.passAt), w(s.passAt) + 0.2), 2.4); ctx.save(); ctx.translate(540, 900); ctx.rotate(-0.12); ctx.scale(p * 1.0, p * 1.0);
      ctx.strokeStyle = RED; ctx.lineWidth = 12; rr(ctx, -200, -80, 400, 160, 16); ctx.stroke(); T(ctx, 'PASS', 0, 6, 130, 400, RED, STAMP, 'center'); ctx.restore(); }
  };

  // 6. "Every other tool it used was free." — piggy bank, FREE chips, $0 slam with a coin burst
  SC.free = (ctx, t, s) => {
    stageXf(ctx, t, w(s.at));
    obj(ctx, 'o_piggy', 330, 940, 420, t, w(s.at) - 0.15, {});
    [['voice', s.c1], ['3D images', s.c2], ['animation + render', s.c3]].forEach(([lab, wi], i) => sprung(ctx, t, w(wi), 780, 720 + i * 110, (c) => {
      dotShadow(c, -220, -40, 440, 80, 40, 6, 7, 2); c.fillStyle = '#FFF'; rr(c, -220, -40, 440, 80, 40); c.fill(); c.strokeStyle = INK; c.lineWidth = 3; c.stroke();
      T(c, lab, -190, 0, 30, 700, INK, UI); c.fillStyle = RED; rr(c, 90, -26, 110, 52, 26); c.fill(); T(c, 'FREE', 145, 1, 26, 800, '#FFF', UI, 'center'); }));
    if (t >= w(s.zeroAt)) { const p = pr(t, w(s.zeroAt), w(s.zeroAt) + 4 * F1), k = p < 0.5 ? lerp(1.4, 0.96, p / 0.5) : lerp(0.96, 1, (p - 0.5) / 0.5);
      ctx.save(); ctx.translate(780, 1150); ctx.scale(k, k); T(ctx, '$0', 0, 0, 190, 400, RED, STAMP, 'center'); ctx.restore();
      for (let i = 0; i < 14; i++) { const dt = t - w(s.zeroAt), a = (i / 14) * Math.PI * 2, r = 80 + dt * 900; if (dt < 0.5) { ctx.globalAlpha = 1 - dt * 2; ctx.fillStyle = '#FFC928'; ctx.beginPath(); ctx.arc(780 + Math.cos(a) * r, 1150 + Math.sin(a) * r * 0.6, 12, 0, 7); ctx.fill(); ctx.globalAlpha = 1; } } }
  };

  // 7. "Comment REEL and I'll send you the setup." — comment types REEL -> red pill -> SENT -> DM with a gift
  SC.cta = (ctx, t, s) => {
    stageXf(ctx, t, w(s.at));
    lightCard(ctx, 90, 610, 900, 140, 24);
    const kw = 'REEL', n = Math.round(kw.length * pr(t, w(s.typeAt), we(s.typeAt)));
    T(ctx, n ? kw.slice(0, n) : 'Add a comment…', 140, 680, 42, n ? 800 : 500, n ? INK : '#A9A6A2', UI);
    const sent = t >= w(s.sendAt); ctx.fillStyle = sent ? RED : '#C9C6C2'; ctx.beginPath(); ctx.arc(920, 680, 36, 0, 7); ctx.fill();
    ctx.fillStyle = '#FFF'; ctx.beginPath(); ctx.moveTo(902, 665); ctx.lineTo(942, 680); ctx.lineTo(902, 695); ctx.lineTo(910, 680); ctx.fill();
    sprung(ctx, t, we(s.typeAt) + 0.02, 450, 900, (c) => { dotShadow(c, -250, -80, 500, 160, 80, 10, 8, 2.2); c.fillStyle = RED; rr(c, -250, -80, 500, 160, 80); c.fill();
      T(c, 'REEL', -30, 4, 112, 400, '#FFF', STAMP, 'center'); c.strokeStyle = '#FFF'; c.lineWidth = 12; c.lineCap = 'round'; c.beginPath(); c.moveTo(120, 2); c.lineTo(150, 32); c.lineTo(195, -30); c.stroke(); });
    if (sent) stamp(ctx, '', 'SENT', 640, 1040, t, w(s.sendAt) + 0.05, w(s.sendAt) + 0.05, 1, 96);
    sprung(ctx, t, w(s.dmAt) - 0.1, 330, 1210, (c) => { lightCard(c, -240, -90, 480, 180, 22); c.save(); c.imageSmoothingEnabled = true; c.drawImage(IMG.logo, -215, -66, 62, 62); c.restore();
      T(c, G.R.brand.handle, -135, -36, 30, 700, INK, SANS); T(c, 'sent you the setup', -135, -2, 22, 500, GREY, SANS); c.fillStyle = '#F1EEEA'; rr(c, -215, 24, 330, 50, 12); c.fill(); T(c, 'reel_setup.zip', -195, 49, 24, 600, INK, MONO); });
    obj(ctx, 'o_gift', 700, 1200, 230, t, w(s.dmAt), {});
  };
};

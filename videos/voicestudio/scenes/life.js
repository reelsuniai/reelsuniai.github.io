// LIFE KIT (@reelsuniai): idle, depth, bevel, gloss, boil, skew, sparkles, stage drift (ocb_*) + card/screenshot/device helpers (ac_*, vs_*).
// API summary lives in guides/reelsuniai_style.md. Load first in SCENE_FILES.
// life kit copied from the OpenCode reel (ocb_*)
// shadow layers (ocb_depth), a bevel (ocb_bevel), glass gloss sweeps (ocb_gloss), a drift-following skew (ocb_skew); chrome sits
// at 0.5× parallax, heroes at 1.2×.
// Shared with b2 (global, prefixed ocb_): the life kit below, ocb_shadow, ocb_term (the persistent terminal hero), ocb_stamp.
var OCB_TM = { x: 540, y: 880, w: 860, h: 600 };
// ── life kit ──
function ocb_idle(t, i, a) {   // float ±3 px, rot ±0.9°, breath 1 ± 0.012, 0.6-1.2 Hz with a phase per prop
  a = a ?? 1; const w = TAU * (0.6 + hash(i * 3.3 + 0.7) * 0.6), ph = hash(i * 7.1 + 0.3) * TAU;
  return { dx: Math.cos(t * w * 0.7 + ph) * 1.6 * a, dy: Math.sin(t * w + ph) * 3 * a, rot: Math.sin(t * w * 0.8 + ph + 1) * 0.9 * a, s: 1 + Math.sin(t * w * 1.1 + ph + 2) * 0.012 * a };
}
function ocb_shadow(K, x, y, w, h, r, dx, dy) { fillRR(K, x + (dx ?? 12), y + (dy ?? 15), w, h, r, dotPattern(K, '#272324', 1.7)); }
function ocb_depth(K, x, y, w, h, r, lift) {   // a soft far shadow (lighter, finer dots) + the hard halftone contact shadow
  lift = lift ?? 1; fillRR(K, x + 26 * lift, y + 34 * lift, w + 4, h + 4, r, dotPattern(K, '#9A9491', 1.2)); ocb_shadow(K, x, y, w, h, r, 12 * lift, 15 * lift);
}
function ocb_bevel(K, x, y, w, h, r, dark) {   // 1-2 px light top edge, 2-3 px darker bottom edge
  K.save(); rr(K, x, y, w, h, r); K.clip();
  line(K, x + r * 0.6, y + 3, x + w - r * 0.6, y + 3, dark ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.95)', 2);
  line(K, x + r * 0.6, y + h - 3, x + w - r * 0.6, y + h - 3, dark ? 'rgba(0,0,0,0.55)' : 'rgba(60,50,45,0.16)', 4); K.restore();
}
function ocb_gloss(K, x, y, w, h, r, t, o) {   // a slow diagonal gloss sweep across glass / glossy cards
  o = o || {}; const p = ((t * (o.speed ?? 0.35) + (o.ph ?? 0)) % 1.5) - 0.25, gx = x + w * p, sk = h * 0.45;
  K.save(); rr(K, x, y, w, h, r); K.clip(); K.fillStyle = 'rgba(255,255,255,' + (o.a ?? 0.1) + ')';
  K.beginPath(); K.moveTo(gx, y); K.lineTo(gx + w * 0.12, y); K.lineTo(gx + w * 0.12 - sk, y + h); K.lineTo(gx - sk, y + h); K.closePath(); K.fill();
  K.fillStyle = 'rgba(255,255,255,' + (o.a ?? 0.1) * 0.6 + ')'; K.fillRect(x, y, w, Math.min(10, h * 0.06)); K.restore();
}
function ocb_boil(K, x, y, w, h, r, col, lw, t, i) {   // the hand-drawn "boiling" outline: 1-2 px jitter re-seeded at 12 fps
  const f = Math.floor(t * 12), j = (k) => (hash(f * 1.31 + (i ?? 0) * 7.7 + k) - 0.5) * 2.4;
  strokeRR(K, x + j(1), y + j(2), w + j(3), h + j(4), r, col, lw);
}
function ocb_skew(K, t, i, amt) { const k = Math.sin(t * 1.25 + (i ?? 0)) * 0.042 * (amt ?? 1); K.transform(1, k * 0.25, k, 1, 0, 0); }   // ±2.4° 3D-ish lean
function ocb_sparkles(K, x, y, t, t0, o) {   // twinkling 4-point sparkles round a payoff, looping forever after t0
  o = o || {}; if (t < t0) return; const n = o.n ?? 7, rx = o.rx ?? 200, ry = o.ry ?? 100;
  for (let i = 0; i < n; i++) {
    const per = 0.55 + hash(i * 2.1) * 0.4, ph = ((t - t0) / per + hash(i * 5.7)) % 1, s = Math.sin(ph * Math.PI) * (o.size ?? 18) * clamp((t - t0) / 0.12);
    if (s < 1) continue; const a = hash(i * 9.3) * TAU, px = x + Math.cos(a) * rx * (0.75 + 0.3 * hash(i)), py = y + Math.sin(a) * ry * (0.75 + 0.3 * hash(i * 3));
    K.save(); K.translate(px, py); K.rotate(ph * 1.2); K.fillStyle = o.col || '#F2B632'; K.strokeStyle = '#111111'; K.lineWidth = 2.5;
    K.beginPath(); for (let k = 0; k < 8; k++) { const rr_ = k % 2 ? s * 0.28 : s, aa = k * Math.PI / 4; K.lineTo(Math.cos(aa) * rr_, Math.sin(aa) * rr_); } K.closePath(); K.fill(); K.stroke(); K.restore();
  }
}
// stage drift: Catmull-Rom through keys placed on the scene's beats; ~speed px/s, zoom ±zr/s bouncing in [1, 1.055]; each beat turns
function ocb_drift(beats, seed, o) {
  o = o || {}; const sp = o.speed ?? 42, zr = o.zr ?? 0.018, P = [{ x: 0, y: 0, z: 1 }]; let ang = seed, z = 1, zd = 1;
  for (let i = 1; i < beats.length; i++) {
    const dt = beats[i] - beats[i - 1], p = P[i - 1]; ang += 1.9 + hash(i * 3.7 + seed) * 1.3;
    let nx = p.x + Math.cos(ang) * sp * dt, ny = p.y + Math.sin(ang) * sp * dt * 0.8;
    if (Math.abs(nx) > 60) nx = p.x - Math.cos(ang) * sp * dt; if (Math.abs(ny) > 46) ny = p.y - Math.sin(ang) * sp * dt * 0.8;
    z += zd * zr * dt; if (z > 1.055 || z < 1.0) { zd = -zd; z += 2 * zd * zr * dt; } P.push({ x: nx, y: ny, z });
  }
  const cr = (a, b, c, d, u) => 0.5 * (2 * b + (c - a) * u + (2 * a - 5 * b + 4 * c - d) * u * u + (3 * b - a - 3 * c + d) * u * u * u);
  return (t) => {
    let i = 0; while (i < beats.length - 2 && t > beats[i + 1]) i++;
    const u = clamp((t - beats[i]) / (beats[i + 1] - beats[i])), q = (k) => P[Math.max(0, Math.min(P.length - 1, k))], f = (key, uu) => cr(q(i - 1)[key], q(i)[key], q(i + 1)[key], q(i + 2)[key], uu);
    return { x: f('x', u), y: f('y', u), z: f('z', u), vx: (f('x', Math.min(1, u + 0.02)) - f('x', Math.max(0, u - 0.02))) / (0.04 * (beats[i + 1] - beats[i])) };
  };
}
// apply the drift + fast push-ins (3-4 f in, slow release) + 2 f jolts to the STAGE only (the presenter and captions stay put)
function ocb_stage(T, K, t, d, o, fn) {
  o = o || {}; let z = d.z, jx = 0, jy = 0; const fx = o.focus || [540, 900];
  for (const [tp, amt] of o.push || []) { const e = t - tp; if (e < 0 || e > 1.4) continue; z *= 1 + amt * (e < 0.12 ? E.outCubic(e / 0.12) : 1 - E.inOutSine(clamp((e - 0.45) / 0.9))); }
  for (const tj of o.jolts || []) { const e = (t - tj) * 30; if (e >= 0 && e < 2) { jx += (e < 1 ? 5 : -4); jy += (e < 1 ? -4 : 3); } }
  for (const c of [T, K]) { c.save(); c.translate(fx[0] + d.x + jx, fx[1] + d.y + jy); c.scale(z, z); c.translate(-fx[0], -fx[1]); }
  try { fn(); } finally { K.restore(); T.restore(); }
}
// the OpenCode terminal: dark TUI window, title bar, screen(sx, sy, sw, sh) callback, footer with the agent pill (build · tab)
function ocb_term(K, w, h, t, screen, o) {
  o = o || {}; const x0 = -w / 2, y0 = -h / 2, SY0 = y0 + 62, SH = h - 62 - 58;
  ocb_depth(K, x0, y0, w, h, 26, 1.2);
  fillRR(K, x0, y0, w, h, 26, '#141517'); strokeRR(K, x0 + 5, y0 + 5, w - 10, h - 10, 22, '#2E3035', 2.5);
  K.save(); rr(K, x0, y0, w, 62, 26); K.clip(); K.fillStyle = vGrad(K, y0, y0 + 62, ['#2A2B30', '#1C1D21']); K.fillRect(x0, y0, w, 62); K.restore(); line(K, x0, SY0, x0 + w, SY0, '#2C2E33', 2);
  ['#FF5F57', '#FEBC2E', '#28C840'].forEach((c, i) => { circle(K, x0 + 34 + i * 30, y0 + 31, 9, c); circle(K, x0 + 31 + i * 30, y0 + 28, 3, 'rgba(255,255,255,0.45)'); });
  text(K, o.title || 'opencode — ~/my-app', 0, y0 + 39, { font: F.mono, weight: 500, size: 20, color: '#8C8F96' });
  K.save(); K.beginPath(); K.rect(x0 + 4, SY0, w - 8, SH); K.clip(); screen(x0 + 26, SY0 + 18, w - 52, SH - 30); K.restore();
  const fy = y0 + h - 30; line(K, x0, fy - 28, x0 + w, fy - 28, '#2C2E33', 2);
  fillRR(K, x0 + 24, fy - 17, 92, 32, 8, o.agentCol || '#F2A65A'); text(K, o.agent || 'build', x0 + 70, fy + 6, { font: F.mono, weight: 700, size: 19, color: '#141517' });
  text(K, 'tab  switch agent', x0 + 134, fy + 6, { font: F.mono, weight: 500, size: 18, color: '#6E7178', align: 'left' });
  circle(K, x0 + w - 150, fy - 1, 6, 0.5 + 0.5 * Math.sin(t * 7) > 0.35 ? '#7FD88F' : '#2F5A37');   // live LED
  text(K, o.right || '~/my-app', x0 + w - 26, fy + 6, { font: F.mono, weight: 500, size: 18, color: '#6E7178', align: 'right' });
  ocb_gloss(K, x0, y0, w, h, 26, t, { a: 0.06, speed: 0.3 }); ocb_bevel(K, x0, y0, w, h, 26, true); ocb_boil(K, x0, y0, w, h, 26, '#111111', 5, t, 3);
}
// distressed rubber stamp (filled red, white double rule), drawn centred, with a gloss band
function ocb_stamp(K, str, w, h, size, o) {
  o = o || {}; const col = o.col || C.red;
  fillRR(K, -w / 2 - 7, -h / 2 - 7, w + 14, h + 14, 18, '#FFFFFF'); fillRR(K, -w / 2, -h / 2, w, h, 14, col);
  strokeRR(K, -w / 2 + 11, -h / 2 + 11, w - 22, h - 22, 9, '#FFFFFF', 4); strokeRR(K, -w / 2 - 7, -h / 2 - 7, w + 14, h + 14, 18, '#111111', 4);
  text(K, str, 0, size * 0.36, { font: F.anton, weight: 400, size, color: '#FFFFFF', ls: o.ls ?? 4 });
  K.save(); K.fillStyle = 'rgba(120,10,0,0.35)'; for (let i = 0; i < 46; i++) K.fillRect((hash(i * 3.7 + w) - 0.5) * w * 0.92, (hash(i * 9.1 + h) - 0.5) * h * 0.86, 2 + hash(i) * 4, 2 + hash(i * 2) * 3); K.restore();
  if (o.t != null) ocb_gloss(K, -w / 2, -h / 2, w, h, 14, o.t, { a: 0.16, speed: 0.5, ph: 0.4 });
}

const AC_INK = '#1A1A1A', AC_GREY = '#8A8582';
const acF = (n) => n / 30;
function ac_tx(K, s, x, y, size, col, w, al, f) { text(K, s, x, y, { font: f || F.grot, weight: w ?? 700, size, color: col || AC_INK, align: al || 'center' }); }
// a real ArtCraft icon (from the user's screenshot) with depth, bevel, gloss
function ac_icon(K, key, sz, t, i, o) {
  o = o || {}; const h = sz / 2;
  ocb_depth(K, -h, -h, sz, sz, sz * 0.22, o.lift ?? 0.8);
  K.save(); rr(K, -h, -h, sz, sz, sz * 0.22); K.clip(); const im = IMG[key]; if (im && im.naturalWidth) K.drawImage(im, -h, -h, sz, sz); else fillRR(K, -h, -h, sz, sz, 0, '#444'); K.restore();
  strokeRR(K, -h, -h, sz, sz, sz * 0.22, '#111111', 4); ocb_bevel(K, -h, -h, sz, sz, sz * 0.22); ocb_gloss(K, -h, -h, sz, sz, sz * 0.22, t, { a: 0.16, speed: 0.45, ph: i * 0.27 });
}
// the stage is drawn 1.35× larger round (540, 820) so heroes fill the frame like his
function ac_zoom(T, K, fn, z) { z = z || 1.35; for (const c of [T, K]) { c.save(); c.translate(540, 820); c.scale(z, z); c.translate(-540, -820); } try { fn(); } finally { K.restore(); T.restore(); } }
// an app window (white chrome, traffic lights, title) with content fn(x0, y0, w, h)
function ac_window(K, w, h, t, title, i, fn) {
  ocb_depth(K, -w / 2, -h / 2, w, h, 22, 1); fillRR(K, -w / 2, -h / 2, w, h, 22, '#FFFFFF'); fillRR(K, -w / 2, -h / 2, w, 56, 22, '#F1EEEA'); K.fillStyle = '#F1EEEA'; K.fillRect(-w / 2, -h / 2 + 30, w, 26);
  ['#FF5F57', '#FEBC2E', '#28C840'].forEach((c, k) => circle(K, -w / 2 + 30 + k * 26, -h / 2 + 28, 8, c));
  ac_tx(K, title, 0, -h / 2 + 37, 22, '#5A5653', 700, 'center', F.mono);
  K.save(); rr(K, -w / 2, -h / 2 + 56, w, h - 56, 0); K.clip(); fn(-w / 2, -h / 2 + 56, w, h - 56); K.restore();
  ocb_boil(K, -w / 2, -h / 2, w, h, 22, '#111111', 5, t, i); ocb_bevel(K, -w / 2, -h / 2, w, h, 22);
}
// ── VoiceStudio helpers ──
const VS_PINK = '#F27BA6', VS_ORANGE = '#F5A26A', VS_DARK = '#1C1420';
// a real screenshot crop as a dark-framed card with depth, bevel, gloss, boil. h derived from the image aspect when omitted.
function vs_shot(K, key, w, t, i, o) {
  o = o || {}; const im = IMG[key], h = o.h || (im && im.naturalWidth ? w * im.naturalHeight / im.naturalWidth : w * 0.6), r = o.r ?? 22;
  ocb_depth(K, -w / 2, -h / 2, w, h, r, o.lift ?? 1);
  K.save(); rr(K, -w / 2, -h / 2, w, h, r); K.clip(); fillRR(K, -w / 2, -h / 2, w, h, 0, '#0E0E12'); if (im && im.naturalWidth) K.drawImage(im, -w / 2, -h / 2, w, h); if (o.fn) o.fn(w, h); K.restore();
  strokeRR(K, -w / 2, -h / 2, w, h, r, '#111111', 6); ocb_bevel(K, -w / 2, -h / 2, w, h, r, true); ocb_boil(K, -w / 2, -h / 2, w, h, r, '#111111', 4, t, i); ocb_gloss(K, -w / 2, -h / 2, w, h, r, t, { a: 0.12, speed: 0.35, ph: i * 0.4 });
  return h;
}
// the ElevenLabs card (real wordmark the user supplied) with a draining credits meter and a "/mo" tag
function vs_elCard(K, t, i, drain, o) {
  o = o || {}; const w = 460, h = 300;
  ocb_depth(K, -w / 2, -h / 2, w, h, 26, 1); fillRR(K, -w / 2, -h / 2, w, h, 26, '#FFFFFF');
  const im = IMG.el_logo; if (im && im.naturalWidth) { const s = 0.62; K.drawImage(im, -im.naturalWidth * s / 2, -h / 2 - 34, im.naturalWidth * s, im.naturalHeight * s); }
  const bw = w - 70, by = h / 2 - 78; ac_tx(K, 'CREDITS', -bw / 2, by - 12, 18, AC_GREY, 800, 'left', F.mono);
  fillRR(K, -bw / 2, by, bw, 26, 13, '#ECE8E4'); const v = clamp(1 - drain); if (v > 0.01) fillRR(K, -bw / 2, by, Math.max(26, bw * v), 26, 13, v < 0.25 ? C.red : '#F2B632');
  ac_tx(K, v < 0.02 ? 'OUT OF CREDITS' : Math.round(v * 100) + '% left', bw / 2, by - 12, 18, v < 0.25 ? C.red : AC_GREY, 800, 'right', F.mono);
  ocb_boil(K, -w / 2, -h / 2, w, h, 26, '#111', 5, t, i); ocb_bevel(K, -w / 2, -h / 2, w, h, 26); ocb_gloss(K, -w / 2, -h / 2, w, h, 26, t, { a: 0.1, ph: i });
  // "/mo" tag swinging off the corner
  const sw = Math.sin(t * 2.2 + i) * 8; X([K], w / 2 - 30, -h / 2 + 14, 1, 18 + sw, () => { line(K, 0, 0, 0, 24, '#8A6A3A', 3); X([K], 0, 50, 1, 0, () => { fillRR(K, -44, -24, 88, 48, 9, o.zero ? C.red : '#FFF4D6'); strokeRR(K, -44, -24, 88, 48, 9, '#111', 3); ac_tx(K, o.zero ? '$0' : '$/mo', 0, 11, 26, o.zero ? '#FFF' : AC_INK, 800, 'center', F.anton); }); });
  return { w, h };
}
// a drawn laptop; screen content fn(w, h) is clipped to the screen
function vs_laptop(K, t, i, fn, o) {
  o = o || {}; const W = o.w || 640, H = W * 0.62, sw = W - 40, sh = H - 40;
  ocb_depth(K, -W / 2, -H / 2, W, H, 24, 1); fillRR(K, -W / 2, -H / 2, W, H, 24, '#2A2626');
  K.save(); rr(K, -sw / 2, -sh / 2, sw, sh, 10); K.clip(); fillRR(K, -sw / 2, -sh / 2, sw, sh, 0, '#0E0E12'); fn(sw, sh); K.restore();
  fillRR(K, -W / 2 - 60, H / 2 - 4, W + 120, 34, 14, '#BDB7B1'); fillRR(K, -70, H / 2 - 4, 140, 12, 6, '#9C968F'); strokeRR(K, -W / 2 - 60, H / 2 - 4, W + 120, 34, 14, '#111', 4);
  ocb_boil(K, -W / 2, -H / 2, W, H, 24, '#111', 5, t, i); ocb_gloss(K, -sw / 2, -sh / 2, sw, sh, 10, t, { a: 0.1, ph: i });
}
function vs_drawImg(K, key, w, h) { const im = IMG[key]; if (im && im.naturalWidth) { const s = Math.max(w / im.naturalWidth, h / im.naturalHeight); K.drawImage(im, -im.naturalWidth * s / 2, -im.naturalHeight * s / 2, im.naturalWidth * s, im.naturalHeight * s); } }
// animated waveform bars
function vs_wave(K, x, y, w, h, t, seed, col, grow) {
  const n = 28, bw = w / n; for (let k = 0; k < n; k++) { const g = clamp((grow ?? 1) * n - k); if (g <= 0) continue;
    const a = 0.25 + 0.75 * Math.abs(Math.sin(k * 0.9 + seed) * Math.sin(t * 7 + k * 0.6 + seed)); fillRR(K, x + k * bw + bw * 0.2, y - h * a * g / 2, bw * 0.6, Math.max(4, h * a * g), bw * 0.3, col); }
}
function vs_pill(K, s, w, bg, fg, size) { const h = 64; ocb_depth(K, -w / 2, -h / 2, w, h, h / 2, 0.6); fillRR(K, -w / 2, -h / 2, w, h, h / 2, bg); strokeRR(K, -w / 2, -h / 2, w, h, h / 2, '#111', 4); ac_tx(K, s, 0, (size || 30) * 0.36, size || 30, fg, 800, 'center', F.anton); }

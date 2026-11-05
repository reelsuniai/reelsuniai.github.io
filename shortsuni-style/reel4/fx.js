/* fx.js — the "his level" motion layer (measured gap: his frames change 8.6-10 % per frame, ours 3.6-4.5 %).
 * camera: constant handheld drift + zoom kicks on accent words (1.00 -> 1.065 in 3 f, spring back ~10 f)
 * env: a layered environment behind every scene (pegboard / cork / spotlight / desk / grid), animated, cached
 * particles: drifting paper bits + dust in every frame; debris(): bursts for stamps and landings
 */
(function () {
  const W = 1080, H = 1920, F1 = 1 / 30;
  const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
  const rnd = (n) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
  const C = {};
  const cv = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; };
  function kickAmt(t, times) {             // sum of recent kicks: fast in (3 f), damped spring out
    let k = 0;
    for (const t0 of times) { const d = t - t0; if (d < 0 || d > 0.6) continue; k += d < 3 * F1 ? d / (3 * F1) : Math.exp(-(d - 3 * F1) / 0.11) * Math.cos((d - 3 * F1) * 22) ; }
    return k;
  }
  // ---------------------------------------------------------------- environments (cached base + live layer)
  function pegboard() {
    const c = cv(W, 1460), x = c.getContext('2d');
    const g = x.createLinearGradient(0, 0, 0, 1460); g.addColorStop(0, 'rgba(222,196,160,0)'); g.addColorStop(0.12, '#E2C9A4'); g.addColorStop(1, '#D3B68C'); x.fillStyle = g; x.fillRect(0, 0, W, 1460);
    for (let y = 60; y < 1460; y += 54) for (let i = 30 + ((y / 54) % 2) * 27; i < W; i += 54) { x.fillStyle = 'rgba(90,60,30,0.55)'; x.beginPath(); x.arc(i, y, 6, 0, 7); x.fill(); x.fillStyle = 'rgba(255,255,255,0.25)'; x.beginPath(); x.arc(i + 1.5, y + 2, 5, 0, 7); x.fill(); }
    // hanging tools silhouettes
    x.fillStyle = 'rgba(60,40,25,0.28)';
    [[120, 160, 'w'], [950, 200, 'h'], [80, 820, 'r'], [990, 760, 'w']].forEach(([px, py, k]) => { x.save(); x.translate(px, py); if (k === 'w') { x.fillRect(-8, 0, 16, 150); x.beginPath(); x.arc(0, 0, 30, 0, 7); x.fill(); } if (k === 'h') { x.fillRect(-7, 0, 14, 160); x.fillRect(-40, -10, 80, 30); } if (k === 'r') { x.fillRect(-60, 0, 120, 14); for (let i = 0; i < 6; i++) x.fillRect(-55 + i * 22, 14, 6, 40); } x.restore(); });
    return c;
  }
  function cork() {
    const c = cv(W, 1460), x = c.getContext('2d');
    const g = x.createLinearGradient(0, 0, 0, 1460); g.addColorStop(0, 'rgba(160,112,66,0)'); g.addColorStop(0.1, '#A97A48'); g.addColorStop(1, '#8E6236'); x.fillStyle = g; x.fillRect(0, 0, W, 1460);
    for (let i = 0; i < 9000; i++) { x.fillStyle = rnd(i) > 0.5 ? 'rgba(70,40,15,0.22)' : 'rgba(240,200,150,0.18)'; x.fillRect(rnd(i * 3.1) * W, 60 + rnd(i * 7.7) * 1040, 2 + rnd(i) * 3, 2); }
    // pinned papers + polaroids
    [[110, 170, -0.12, 170, 210], [920, 140, 0.1, 190, 150], [70, 760, 0.08, 160, 200], [960, 800, -0.09, 170, 220], [520, 1010, 0.04, 200, 90]].forEach(([px, py, r, w, h], i) => {
      x.save(); x.translate(px, py); x.rotate(r); x.fillStyle = 'rgba(0,0,0,0.25)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h); x.fillStyle = i % 2 ? '#FFF7D6' : '#FFFFFF'; x.fillRect(-w / 2, -h / 2, w, h);
      x.fillStyle = 'rgba(0,0,0,0.18)'; for (let l = 0; l < 5; l++) x.fillRect(-w / 2 + 16, -h / 2 + 22 + l * 22, w * (0.5 + rnd(i * 9 + l) * 0.4), 6);
      x.fillStyle = '#E10A0F'; x.beginPath(); x.arc(0, -h / 2 + 8, 9, 0, 7); x.fill(); x.restore(); });
    x.strokeStyle = 'rgba(225,10,15,0.7)'; x.lineWidth = 3; x.beginPath(); x.moveTo(110, 170 - 97); x.quadraticCurveTo(500, 260, 920, 140 - 67); x.stroke(); x.beginPath(); x.moveTo(70, 760 - 92); x.quadraticCurveTo(540, 900, 960, 800 - 102); x.stroke();
    return c;
  }
  function desk() {
    const c = cv(W, 1460), x = c.getContext('2d');
    // wall with sticky notes, wooden desk top at the bottom
    [[130, 150, -0.1, '#FFE16B'], [930, 120, 0.12, '#FFB3B3'], [980, 420, -0.06, '#BDE7FF'], [100, 520, 0.08, '#C9F2B5']].forEach(([px, py, r, col], i) => { x.save(); x.translate(px, py); x.rotate(r); x.fillStyle = 'rgba(0,0,0,0.12)'; x.fillRect(-62, -58, 130, 130); x.fillStyle = col; x.fillRect(-70, -66, 130, 130);
      x.strokeStyle = 'rgba(0,0,0,0.35)'; x.lineWidth = 4; for (let l = 0; l < 3; l++) { x.beginPath(); x.moveTo(-52, -36 + l * 30); x.lineTo(-52 + 60 + rnd(i + l) * 30, -36 + l * 30); x.stroke(); } x.restore(); });
    const g = x.createLinearGradient(0, 860, 0, 1460); g.addColorStop(0, '#C08A55'); g.addColorStop(1, '#8E5C30'); x.fillStyle = g; x.fillRect(0, 860, W, 240);
    x.fillStyle = 'rgba(0,0,0,0.08)'; for (let i = 0; i < 18; i++) x.fillRect(0, 870 + i * 13, W, 2);
    x.fillStyle = '#7A4D25'; x.fillRect(0, 860, W, 10);
    return c;
  }
  function grid() {
    const c = cv(W, 1460), x = c.getContext('2d');
    x.strokeStyle = 'rgba(225,10,15,0.10)'; x.lineWidth = 2;
    for (let i = 0; i < W; i += 60) { x.beginPath(); x.moveTo(i, 40); x.lineTo(i, 1460); x.stroke(); }
    for (let j = 40; j < 1460; j += 60) { x.beginPath(); x.moveTo(0, j); x.lineTo(W, j); x.stroke(); }
    // blueprint corner marks + measure ticks
    x.strokeStyle = 'rgba(17,16,16,0.25)'; x.lineWidth = 3; [[60, 80], [1020, 80], [60, 1060], [1020, 1060]].forEach(([a, b]) => { x.beginPath(); x.moveTo(a - 24, b); x.lineTo(a + 24, b); x.moveTo(a, b - 24); x.lineTo(a, b + 24); x.stroke(); });
    return c;
  }
  const ENV = { pegboard, cork, desk, grid };
  function env(ctx, t, name) {
    if (!name) return;
    if (name === 'spotlight') {      // dark stage with two swaying light cones (live, not cached)
      const g = ctx.createLinearGradient(0, 480, 0, H); g.addColorStop(0, 'rgba(20,18,26,0)'); g.addColorStop(0.08, '#1A1822'); g.addColorStop(1, '#0E0D14'); ctx.fillStyle = g; ctx.fillRect(0, 480, W, H - 480);
      [[300, 0.9], [780, 1.3]].forEach(([cx, sp], i) => { const a = Math.sin(t * sp + i) * 0.12; ctx.save(); ctx.translate(cx, 470); ctx.rotate(a);
        const lg = ctx.createLinearGradient(0, 0, 0, 1460); lg.addColorStop(0, 'rgba(255,240,210,0.45)'); lg.addColorStop(1, 'rgba(255,240,210,0)'); ctx.fillStyle = lg; ctx.beginPath(); ctx.moveTo(-30, 0); ctx.lineTo(30, 0); ctx.lineTo(320, 1460); ctx.lineTo(-320, 1460); ctx.fill(); ctx.restore(); });
      ctx.fillStyle = 'rgba(255,240,210,0.12)'; ctx.beginPath(); ctx.ellipse(540, 1420, 460, 70, 0, 0, 7); ctx.fill();
      return;
    }
    if (!C[name]) C[name] = ENV[name]();
    const dx = Math.sin(t * 0.6) * 10, dy = Math.cos(t * 0.5) * 6;          // slow parallax drift
    ctx.drawImage(C[name], -12 + dx, 470 + dy, W + 24, 1460);
  }
  // ---------------------------------------------------------------- particles (always on) + debris bursts
  function particles(ctx, t, dark) {
    for (let i = 0; i < 46; i++) {
      const sp = 20 + rnd(i * 3) * 50, x = ((rnd(i) * W + Math.sin(t * 0.7 + i) * 40) % W + W) % W, y = 520 + ((rnd(i * 7) * 1300 - t * sp) % 1300 + 1300) % 1300;
      const s = 3 + rnd(i * 11) * 7, r = t * (1 + rnd(i)) + i;
      ctx.save(); ctx.translate(x, y); ctx.rotate(r); ctx.globalAlpha = 0.35 + 0.3 * rnd(i * 5);
      ctx.fillStyle = i % 7 === 0 ? '#E10A0F' : dark ? 'rgba(255,245,230,0.7)' : 'rgba(60,50,45,0.45)'; ctx.fillRect(-s / 2, -s / 4, s, s / 2); ctx.restore();
    }
  }
  function debris(ctx, t, t0, cx, cy, n = 16, seed = 1, col = '#111010') {
    const d = t - t0; if (d < 0 || d > 0.7) return;
    for (let i = 0; i < n; i++) {
      const a = rnd(seed * 31 + i) * Math.PI * 2, v = 500 + rnd(seed * 7 + i) * 900, x = cx + Math.cos(a) * v * d, y = cy + Math.sin(a) * v * d * 0.7 + 1400 * d * d, s = 6 + rnd(i * 3 + seed) * 12;
      ctx.save(); ctx.globalAlpha = clamp(1 - d / 0.7); ctx.translate(x, y); ctx.rotate(d * 12 * (rnd(i) - 0.5)); ctx.fillStyle = i % 3 ? col : '#E10A0F'; ctx.fillRect(-s / 2, -s / 3, s, s / 1.5); ctx.restore();
    }
  }
  window.FX = {
    camera(ctx, t, kicks) {
      const k = kickAmt(t, kicks), z = 1 + 0.065 * k;
      const dx = Math.sin(t * 1.7) * 5 + Math.sin(t * 3.1) * 2, dy = Math.cos(t * 1.3) * 4, r = Math.sin(t * 0.9) * 0.004;
      ctx.translate(540 + dx, 980 + dy); ctx.rotate(r); ctx.scale(z, z); ctx.translate(-540, -980);
    },
    env, particles, debris,
  };
})();

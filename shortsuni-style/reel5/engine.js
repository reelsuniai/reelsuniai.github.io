/* shortsuni style engine — reproduces references/STYLE_BIBLE.md at 1080x1920 / 30 fps.
 * Data in: window.REEL (reel.json) + window.WORDS (forced-aligned narration). Output: FILM.render(ctx, t), pure function of t.
 * Every number below cites the bible section it comes from (values are the 720 measurements x1.5).
 */
(function () {
  const W = 1080, H = 1920, FPS = 30, F1 = 1 / FPS;
  const R = window.REEL, WD = window.WORDS;
  const RED = R.brand.red, INK = '#111010', BG = '#F2F0EE', GREY = '#8B8987';
  const w = (i) => WD[i].s, we = (i) => WD[i].e;
  const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
  const lerp = (a, b, k) => a + (b - a) * k;
  const pr = (t, a, b) => clamp((t - a) / (b - a));
  const E = {
    outC: (k) => 1 - Math.pow(1 - k, 3), inOutC: (k) => (k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2),
    outBack: (k, s = 1.70158) => 1 + (s + 1) * Math.pow(k - 1, 3) + s * Math.pow(k - 1, 2), inC: (k) => k * k * k,
  };
  const rnd = (n) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
  const mixHex = (a, b, k) => { const p = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)); const A = p(a), B = p(b); return '#' + A.map((v, i) => Math.round(lerp(v, B[i], k)).toString(16).padStart(2, '0')).join(''); };
  const DUR = we(WD.length - 1) + (R.tail ?? 0.2);
  const F = (window.FILM = { DUR, W, H });
  const IMG = {};
  const SANS = '"Schibsted Grotesk"', SERIF = '"Instrument Serif"', MONO = '"JetBrains Mono"', STAMP = 'Anton', UI = 'Inter';
  const font = (ctx, f) => { ctx.font = f; };
  const rr = (ctx, x, y, ww, hh, r) => { ctx.beginPath(); ctx.roundRect(x, y, ww, hh, r); };

  // ======================================================== §2 background: flat #F2F0EE + static ±4 grain on a 6 px dot pitch
  let BGC = null;
  function bg(ctx) {
    if (!BGC) {
      BGC = document.createElement('canvas'); BGC.width = W; BGC.height = H; const x = BGC.getContext('2d');
      x.fillStyle = BG; x.fillRect(0, 0, W, H);
      const img = x.getImageData(0, 0, W, H), d = img.data;
      for (let y = 0; y < H; y++) for (let xx = 0; xx < W; xx++) {
        const i = (y * W + xx) * 4, dot = (xx % 6 < 2 && y % 6 < 2) ? -5 : 0, n = Math.round((rnd(xx * 7.1 + y * 13.3) - 0.5) * 8) + dot;
        d[i] += n; d[i + 1] += n; d[i + 2] += n;
      }
      x.putImageData(img, 0, 0);
    }
    ctx.drawImage(BGC, 0, 0);
  }
  // §6 shadow rule: halftone dots, never blur. Draws a dot field shaped like a rounded rect, offset down-right.
  const PAT = {};
  function dotPat(ctx, pitch, dr, col) {      // one cached tile per (pitch, radius, colour) -> CanvasPattern
    const key = pitch + '|' + dr + '|' + col;
    if (!PAT[key]) { const c = document.createElement('canvas'); c.width = c.height = pitch; const x = c.getContext('2d'); x.fillStyle = col; x.beginPath(); x.arc(pitch / 2, pitch / 2, dr, 0, 7); x.fill(); PAT[key] = c; }
    return ctx.createPattern(PAT[key], 'repeat');
  }
  function dotShadow(ctx, x, y, ww, hh, r, off = 12, pitch = 9, dr = 2.6, col = 'rgba(20,16,16,0.55)') {
    ctx.save(); ctx.fillStyle = dotPat(ctx, pitch, dr, col); rr(ctx, x + off, y + off, ww, hh, r); ctx.fill(); ctx.restore();
  }
  function lightCard(ctx, x, y, ww, hh, r = 21) {   // §6 light card
    dotShadow(ctx, x, y, ww, hh, r);
    ctx.fillStyle = '#FFFFFF'; rr(ctx, x, y, ww, hh, r); ctx.fill();
    ctx.strokeStyle = '#E2DFDC'; ctx.lineWidth = 1.5; rr(ctx, x, y, ww, hh, r); ctx.stroke();
  }
  function darkWin(ctx, x, y, ww, hh, title) {      // §6 dark UI window: #1C1B1F, 33 px title bar, three grey dots, r 18
    dotShadow(ctx, x, y, ww, hh, 18);
    ctx.fillStyle = '#1C1B1F'; rr(ctx, x, y, ww, hh, 18); ctx.fill();
    ctx.fillStyle = '#2A2930'; rr(ctx, x, y, ww, 52, [18, 18, 0, 0]); ctx.fill();
    for (let i = 0; i < 3; i++) { ctx.fillStyle = '#4A4952'; ctx.beginPath(); ctx.arc(x + 30 + i * 24, y + 26, 7, 0, 7); ctx.fill(); }
    T(ctx, title, x + 110, y + 27, 24, 600, '#CFCDD6', UI);
  }
  function T(ctx, s, x, y, size, wt = 600, col = INK, fam = SANS, align = 'left', italic = false) {
    ctx.save(); font(ctx, `${italic ? 'italic ' : ''}${wt} ${size}px ${fam}`); ctx.fillStyle = col; ctx.textAlign = align; ctx.textBaseline = 'middle'; ctx.fillText(s, x, y); ctx.restore();
  }
  const tw = (ctx, s, size, wt = 600, fam = SANS) => { ctx.save(); font(ctx, `${wt} ${size}px ${fam}`); const m = ctx.measureText(s).width; ctx.restore(); return m; };
  function pill(ctx, s, x, y, size, bgc = RED, fg = '#FFFFFF', k = 1) {   // §6 pill: height 36, fully round, pop 0.7->1.05->1 in 5 f
    if (k <= 0) return 0;
    const ww = tw(ctx, s, size, 700, UI) + size * 1.4, hh = size * 1.75;
    ctx.save(); ctx.translate(x + ww / 2, y); ctx.scale(k, k);
    ctx.fillStyle = bgc; rr(ctx, -ww / 2, -hh / 2, ww, hh, hh / 2); ctx.fill();
    T(ctx, s, 0, 1, size, 700, fg, UI, 'center'); ctx.restore();
    return ww;
  }
  const popK = (t, t0, d = 5 * F1) => { if (t < t0) return 0; const p = pr(t, t0, t0 + d); return p < 0.6 ? lerp(0.7, 1.05, p / 0.6) : lerp(1.05, 1, (p - 0.6) / 0.4); };
  // §6 red marker ellipse: 6 px, hand-drawn, ends overlap ~20°, draws in 6 f ease-in-out
  function marker(ctx, cx, cy, rx, ry, t, t0, hold = 1.4) {
    const p = E.inOutC(pr(t, t0, t0 + 6 * F1)); if (p <= 0) return;
    const fade = 1 - pr(t, t0 + hold, t0 + hold + 4 * F1); if (fade <= 0) return;
    ctx.save(); ctx.globalAlpha = fade; ctx.strokeStyle = RED; ctx.lineCap = 'round'; ctx.lineWidth = 6;
    ctx.beginPath(); const a0 = -2.2, span = Math.PI * 2 + 0.35, N = 60;
    for (let k = 0; k <= N * p; k++) { const u = k / N, a = a0 + u * span, wob = 1 + 0.03 * Math.sin(3 * a + 1), sp = 1.03 - 0.06 * u; const X = cx + Math.cos(a) * rx * wob * sp, Y = cy + Math.sin(a) * ry * wob * sp; k ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); }
    ctx.stroke(); ctx.restore();
  }
  function strike(ctx, x0, y, x1, t, t0) {     // §6 red strike, draws in 4 f
    const p = E.outC(pr(t, t0, t0 + 4 * F1)); if (p <= 0) return;
    ctx.save(); ctx.strokeStyle = RED; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(lerp(x0, x1, p), y + (x1 - x0) * 0.01 * p); ctx.stroke(); ctx.restore();
  }
  function xBadge(ctx, x, y, t, t0) {         // §6 round red badge with white x (44 px@720 -> 66)
    const k = popK(t, t0); if (!k) return;
    ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.fillStyle = RED; ctx.beginPath(); ctx.arc(0, 0, 33, 0, 7); ctx.fill();
    ctx.strokeStyle = '#FFF'; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-11, -11); ctx.lineTo(11, 11); ctx.moveTo(11, -11); ctx.lineTo(-11, 11); ctx.stroke(); ctx.restore();
  }
  function cursor(ctx, x, y, k = 1, trail = null) { // §6 macOS arrow, 33 px, white outline, 3-ghost trail
    const draw = (X, Y, a) => { ctx.save(); ctx.globalAlpha = a; ctx.translate(X, Y); ctx.scale(k, k); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, 30); ctx.lineTo(8, 23); ctx.lineTo(13, 34); ctx.lineTo(18, 32); ctx.lineTo(13, 21); ctx.lineTo(23, 21); ctx.closePath(); ctx.fillStyle = '#111'; ctx.strokeStyle = '#FFF'; ctx.lineWidth = 2.5; ctx.fill(); ctx.stroke(); ctx.restore(); };
    if (trail) trail.forEach(([X, Y], i) => draw(X, Y, 0.12 + i * 0.08));
    draw(x, y, 1);
  }
  // §5 T5 step badge: 87 px, r 18, #141414, white numeral, 5 dots; pop 6 f back-out 6 %, rot -8 -> 0, red ring 12 f
  function badge(ctx, n, cx, cy, t, t0, scale = 1, total = 5) {
    const p = pr(t, t0, t0 + 6 * F1); if (t < t0) return;
    const k = (p < 0.7 ? lerp(0.6, 1.06, E.outC(p / 0.7)) : lerp(1.06, 1, (p - 0.7) / 0.3)) * scale, rot = lerp(-8, 0, E.outC(p)) * Math.PI / 180;
    const rp = pr(t, t0, t0 + 12 * F1);
    if (rp < 1) { ctx.save(); ctx.globalAlpha = 1 - rp; ctx.strokeStyle = RED; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(cx, cy, lerp(60, 225, E.outC(rp)) * scale, 0, 7); ctx.stroke(); ctx.restore(); }
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(rot); ctx.scale(k, k);
    dotShadow(ctx, -44, -44, 88, 88, 18, 7, 7, 2);
    ctx.fillStyle = '#141414'; rr(ctx, -44, -44, 88, 88, 18); ctx.fill();
    T(ctx, String(n), 0, -6, 62, 400, '#FFFFFF', STAMP, 'center');
    for (let i = 0; i < total; i++) { ctx.fillStyle = i < n ? RED : '#55545A'; ctx.beginPath(); ctx.arc(-24 + i * 12, 30, 3.5, 0, 7); ctx.fill(); }
    ctx.restore();
  }
  // §5 T4 stamp: Anton line (each word ghost 2 f then solid) + key word slam 1.30 -> 0.97 -> 1.00 in 4 f, red dashes, shake ±4.5 px
  function stamp(ctx, line, key, x, y, t, tLine, tKey, sizeLine = 72, sizeKey = 160) {
    if (t < tLine) return;
    const sh = t >= tKey && t < tKey + 4 * F1 ? [(rnd(Math.floor(t * 30)) - 0.5) * 9, (rnd(Math.floor(t * 30) + 3) - 0.5) * 9] : [0, 0];
    ctx.save(); ctx.translate(sh[0], sh[1]);
    const words = line.split(' '); let xx = x;
    words.forEach((wd, i) => {
      const t0 = tLine + i * 0.12; if (t < t0) return;
      T(ctx, wd, xx, y, sizeLine, 400, t < t0 + 2 * F1 ? '#C9C6C3' : INK, STAMP);
      xx += tw(ctx, wd + ' ', sizeLine, 400, STAMP);
    });
    if (t >= tKey) {
      const p = pr(t, tKey, tKey + 4 * F1), s = p < 0.5 ? lerp(1.3, 0.97, p / 0.5) : lerp(0.97, 1, (p - 0.5) / 0.5);
      const kw = tw(ctx, key, sizeKey, 400, STAMP), ky = y + sizeLine * 0.5 + sizeKey * 0.55;
      ctx.save(); ctx.translate(x + kw / 2, ky); ctx.scale(s, s);
      T(ctx, key, 0, 0, sizeKey, 400, p < 0.5 ? mixHex(RED, '#FFFFFF', 0.5) : RED, STAMP, 'center'); ctx.restore();
      if (window.FX) FX.debris(ctx, t, tKey, x + kw / 2, ky, 18, Math.round(tKey * 10));
      if (t < tKey + 6 * F1 && Math.floor(t * 30) % 2 === 0) {
        ctx.strokeStyle = RED; ctx.lineWidth = 6; ctx.lineCap = 'round';
        for (let k = 0; k < 8; k++) { const a = (k / 8) * Math.PI * 2 + 0.3, r0 = kw * 0.55 + 10, r1 = r0 + 30 + rnd(k) * 15; ctx.beginPath(); ctx.moveTo(x + kw / 2 + Math.cos(a) * r0, ky + Math.sin(a) * r0 * 0.6); ctx.lineTo(x + kw / 2 + Math.cos(a) * r1, ky + Math.sin(a) * r1 * 0.6); ctx.stroke(); }
      }
    }
    ctx.restore();
  }

  // ======================================================== §4 caption system
  const ACC = new Set(R.accents || []);
  let SENT = null;
  function sentences() {
    if (SENT) return SENT;
    SENT = []; let cur = [];
    WD.forEach((x, i) => { cur.push(i); if ((/[.!?]$/.test(x.t) && !x.t.startsWith('@')) || (/[,;:]$/.test(x.t) && cur.length >= 6)) { SENT.push(cur); cur = []; } });
    if (cur.length) SENT.push(cur);
    return SENT;
  }
  const BODY = 80, ACCS = 87, LH = 93, CX = 134, CY = 328, MAXW = 705;   // §3: 53 px@720, accent 1.1x, line 62@720, x 12.4 %, cap-top 14.1 %
  const GHOST = '#C9C6C3', GHOSTR = mixHex(RED, BG, 0.62);
  function captions(ctx, t) {
    const S = sentences();
    const startOf = (s) => w(s[0]) - 0.2;
    let si = -1; for (let k = 0; k < S.length; k++) if (t >= startOf(S[k]) - 1e-6) si = k;
    if (si < 0) si = 0;
    const s = S[si];
    // layout (all words of the sentence, so lines never reflow)
    const lay = []; let x = CX, line = 0;
    s.forEach((i) => {
      const acc = ACC.has(i), txt = WD[i].t.replace(/^"|"$/g, ''), f = acc ? `italic 400 ${ACCS}px ${SERIF}` : `600 ${BODY}px ${SANS}`;
      ctx.font = f; const ww = ctx.measureText(txt).width, sp = ctx.measureText(' ').width * (acc ? 0.9 : 1);
      if (x > CX && x + ww > CX + MAXW) { x = CX; line++; }
      lay.push({ i, acc, txt, f, x, line }); x += ww + (acc ? 20 : sp);
    });
    lay.forEach((L) => {
      const on = w(L.i), g0 = on - 0.2, a0 = on - 2 * F1, a1 = on + F1;
      if (t < g0 && L.i !== 0) return;
      const k = L.i === 0 ? 1 : E.outC(pr(t, a0, a1));
      ctx.save(); ctx.font = L.f; ctx.textBaseline = 'alphabetic';
      ctx.fillStyle = L.acc ? mixHex(GHOSTR, RED, k) : mixHex(GHOST, INK, k);
      const blur = 4.5 * (1 - k); if (blur > 0.2) ctx.filter = `blur(${blur.toFixed(1)}px)`;
      ctx.globalAlpha = lerp(0.55, 1, k);
      ctx.fillText(L.txt, L.x, CY + L.line * LH + (L.acc ? 4 : 0));
      ctx.restore();
    });
  }

  // ======================================================== §1 chapter label row + watermark
  function labels(ctx, t) {
    let L = R.labels[0]; R.labels.forEach((l) => { if (t >= (l.at ? w(l.at) - 0.2 : 0)) L = l; });
    T(ctx, L.left, CX, 141, 22, 500, GREY, MONO);
    ctx.save(); font(ctx, `700 22px ${MONO}`); const nw = ctx.measureText(L.num).width; ctx.restore();
    T(ctx, L.num, 946, 141, 22, 700, RED, MONO, 'right');
    T(ctx, L.right + ' ', 946 - nw, 141, 22, 500, GREY, MONO, 'right');
    // watermark: IG glyph + handle, right side (§6), 45 % opacity
    ctx.save(); ctx.globalAlpha = 0.45; ctx.strokeStyle = '#7A7774'; ctx.lineWidth = 3; rr(ctx, 910, 372, 36, 36, 10); ctx.stroke();
    ctx.beginPath(); ctx.arc(928, 390, 8, 0, 7); ctx.stroke(); ctx.fillStyle = '#7A7774'; ctx.beginPath(); ctx.arc(939, 380, 2.5, 0, 7); ctx.fill(); ctx.restore();
    ctx.save(); ctx.globalAlpha = 0.45; T(ctx, R.brand.handle, 946, 428, 20, 700, '#7A7774', SANS, 'right'); ctx.restore();
  }

  // ======================================================== presenter slot -> the @shortsuni logo (§6: always on screen, pose every 0.5-1 s)
  function presenter(ctx, t) {
    if (R.mascot && window.MASCOT) {
      const poses = R.mascot.poses.map(([wi, name]) => [wi === 0 ? -0.01 : w(wi) - 0.06, name]);
      const speaking = (tt) => { for (const x of WD) if (tt >= x.s - 0.02 && tt <= x.e) return 0.35 + 0.6 * Math.abs(Math.sin((tt - x.s) * Math.PI * 2 * 5.5)); return 0; };
      const ENVA = window.ENV || [], energy = (tt) => { const f = tt * 30, i = Math.floor(f), a = ENVA[i] || 0, b = ENVA[i + 1] || 0; return a + (b - a) * (f - i); };
      const nod = (tt) => { let n = 0; for (let j = 0; j < WD.length; j++) { const d = tt - WD[j].s; if (d >= 0 && d < 0.5) n += (j % 2 ? 3.2 : -2.4) * Math.sin(Math.min(1, d / 0.08) * Math.PI / 2) * Math.exp(-d / 0.16); } return n; };
      MASCOT.draw(ctx, t, { x: R.mascot.x || 830, y: R.mascot.y || 1630, scale: R.mascot.scale || 0.62, poses, speaking, energy, nod, logo: IMG.logo });
      return;
    }
    const cx = 838, cy = 1668, D = 400;
    const beat = Math.floor(t / 0.75), ph = (t / 0.75) % 1;
    const poses = [[0, 1], [-6, 1.02], [5, 1], [-3, 1.03], [7, 0.99]];
    const [ra, sa] = poses[beat % poses.length], [rb, sb] = poses[(beat + 1) % poses.length];
    const k = E.inOutC(clamp((ph - 0.85) / 0.15));     // pose switch in the last ~4 f of each 0.75 s
    const rot = lerp(ra, rb, k) * Math.PI / 180, s = lerp(sa, sb, k), bob = Math.sin(t * Math.PI * 2) * 3;
    ctx.save(); ctx.translate(cx, cy + bob); ctx.rotate(rot); ctx.scale(s, s);
    if (!IMG.pres) {        // logo + circular halftone shadow, rendered once
      const c = document.createElement('canvas'); c.width = c.height = D + 60; const x = c.getContext('2d');
      x.fillStyle = dotPat(x, 9, 2.6, 'rgba(20,16,16,0.5)'); x.beginPath(); x.arc(D / 2 + 16 + 10, D / 2 + 18 + 10, D / 2, 0, 7); x.fill();
      x.imageSmoothingEnabled = true; x.imageSmoothingQuality = 'high'; x.drawImage(IMG.logo, 10, 10, D, D); IMG.pres = c;
    }
    ctx.imageSmoothingEnabled = true; ctx.drawImage(IMG.pres, -D / 2 - 10, -D / 2 - 10);
    ctx.restore();
  }

  // ======================================================== scenes (the stage, y 540-1400; §6 elements, §7 slow push 1.00->1.03)
  const SC = {};
  const push = (t, t0) => 1 + 0.03 * pr(t, t0, t0 + 2.0);
  function stageXf(ctx, t, t0, cx = 540, cy = 980) { const z = push(t, t0); ctx.translate(cx, cy); ctx.scale(z, z); ctx.translate(-cx, -cy); }

  SC.retention = (ctx, t, sc) => {
    stageXf(ctx, t, 0);
    const x = 134, y = 610, ww = 812, hh = 520; lightCard(ctx, x, y, ww, hh);
    T(ctx, '// audience retention', x + 40, y + 52, 24, 500, GREY, MONO);
    pill(ctx, 'LIVE', x + ww - 130, y + 52, 20, '#141414', '#FFF');
    const gx = x + 60, gy = y + 110, gw = ww - 120, gh = 300;
    ctx.strokeStyle = '#E8E5E1'; ctx.lineWidth = 2; for (let i = 0; i <= 4; i++) { ctx.beginPath(); ctx.moveTo(gx, gy + (gh * i) / 4); ctx.lineTo(gx + gw, gy + (gh * i) / 4); ctx.stroke(); }
    ['100%', '50%', '0%'].forEach((s, i) => T(ctx, s, gx - 10, gy + (gh * i) / 2, 18, 500, GREY, MONO, 'right'));
    ['0:00', '0:01', '0:15'].forEach((s, i) => T(ctx, s, gx + [0, 0.1, 1][i] * gw, gy + gh + 30, 18, 500, GREY, MONO, 'center'));
    // the curve: 100 % -> crash at 0:01 -> flat (drawn over 0.05-0.9 s)
    const pts = []; for (let k = 0; k <= 60; k++) { const u = k / 60, v = u < 0.04 ? 1 - u * 2 : u < 0.12 ? lerp(0.92, 0.3, (u - 0.04) / 0.08) : 0.3 - (u - 0.12) * 0.12; pts.push([gx + u * gw, gy + (1 - v) * gh]); }
    const n = Math.floor(pts.length * lerp(0.4, 1, E.outC(pr(t, 0, 0.8))));
    ctx.strokeStyle = INK; ctx.lineWidth = 6; ctx.lineJoin = 'round'; ctx.beginPath(); pts.slice(0, Math.max(1, n)).forEach(([X, Y], k) => (k ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y))); ctx.stroke();
    if (n > 1) { const [X, Y] = pts[n - 1]; ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(X, Y, 9, 0, 7); ctx.fill(); }
    marker(ctx, gx + 0.08 * gw, gy + gh * 0.4, 70, 190, t, w(sc.marker), 9);
    const pk = popK(t, w(sc.pill)); if (pk) pill(ctx, sc.pillText, gx + 0.08 * gw + 60, gy + gh * 0.55, 26, RED, '#FFF', pk);
  };

  SC.chat = (ctx, t, sc) => {
    stageXf(ctx, t, w(sc.at));
    const x = 110, y = 620, ww = 860, hh = 600; darkWin(ctx, x, y, ww, hh, 'Claude');
    T(ctx, 'What should we fix today?', x + ww / 2, y + 250, 40, 600, '#E9E7EE', UI, 'center');
    // input bar with typewriter (§5 T7: ~1 char / frame synced to speech)
    const ix = x + 40, iy = y + hh - 150, iw = ww - 80; ctx.fillStyle = '#2B2A2F'; rr(ctx, ix, iy, iw, 100, 20); ctx.fill();
    const s = sc.prompt, n = Math.round(s.length * pr(t, w(sc.typeFrom), we(sc.typeTo) - 0.1)), shown = s.slice(0, n);
    T(ctx, shown || 'Reply to Claude…', ix + 30, iy + 50, 32, 500, shown ? '#F2F0F6' : '#77757E', UI);
    if (Math.floor(t * 4) % 2 === 0 && n < s.length) { ctx.fillStyle = '#F2F0F6'; ctx.fillRect(ix + 32 + tw(ctx, shown, 32, 500, UI), iy + 30, 3, 40); }
    const sent = t >= w(sc.send) + 0.15;
    ctx.fillStyle = sent ? RED : '#4A4952'; ctx.beginPath(); ctx.arc(ix + iw - 50, iy + 50, 28, 0, 7); ctx.fill();
    ctx.fillStyle = '#FFF'; ctx.beginPath(); ctx.moveTo(ix + iw - 50, iy + 36); ctx.lineTo(ix + iw - 38, iy + 54); ctx.lineTo(ix + iw - 62, iy + 54); ctx.fill();
    // cursor glides to send (8-10 f ease-in-out), click = 2 f scale 0.9 + ring
    const c0 = w(sc.send) - 0.33, cp = E.inOutC(pr(t, c0, c0 + 9 * F1));
    if (t >= c0 - 0.2) {
      const X = lerp(x + ww + 40, ix + iw - 52, cp), Y = lerp(y + hh + 120, iy + 52, cp);
      const trail = cp > 0 && cp < 1 ? [1, 2, 3].map((k) => { const q = E.inOutC(pr(t - k * F1, c0, c0 + 9 * F1)); return [lerp(x + ww + 40, ix + iw - 52, q), lerp(y + hh + 120, iy + 52, q)]; }) : null;
      const click = t >= w(sc.send) && t < w(sc.send) + 2 * F1 ? 0.9 : 1;
      cursor(ctx, X, Y, click * 1.5, trail);
      if (t >= w(sc.send)) { const rp = pr(t, w(sc.send), w(sc.send) + 8 * F1); if (rp < 1) { ctx.strokeStyle = RED; ctx.globalAlpha = 1 - rp; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(ix + iw - 50, iy + 50, lerp(30, 90, rp), 0, 7); ctx.stroke(); ctx.globalAlpha = 1; } }
    }
  };

  SC.hooks = (ctx, t, sc) => {
    stageXf(ctx, t, w(sc.at));
    const x = 110, y = 620, ww = 860, hh = 760; darkWin(ctx, x, y, ww, hh, 'Claude');
    // user bubble, typed
    const s = sc.prompt, n = Math.round(s.length * pr(t, w(sc.promptFrom), we(sc.promptTo)));
    const bw = tw(ctx, s, 32, 500, UI) + 56; ctx.fillStyle = '#3A3940'; rr(ctx, x + ww - 40 - bw, y + 90, bw, 76, 22); ctx.fill();
    T(ctx, s.slice(0, n), x + ww - 40 - bw + 28, y + 128, 32, 500, '#F2F0F6', UI);
    // list, then the red highlight box steps row to row on each spoken word, landing on the best one
    const rows = sc.hooks, r0 = y + 230;
    rows.forEach((h, i) => {
      const t0 = w(sc.listAt) + i * 0.06; if (t < t0) return;
      const a = pr(t, t0, t0 + 3 * F1), yy = r0 + i * 82;
      ctx.save(); ctx.globalAlpha = a; T(ctx, String(i + 1) + '.', x + 50, yy, 30, 700, '#77757E', UI); T(ctx, h, x + 100, yy, 34, 600, '#F2F0F6', UI); ctx.restore();
    });
    let hi = -1; sc.steps.forEach((wi, k) => { if (t >= w(wi)) hi = k === sc.steps.length - 1 ? sc.best : k; });
    if (hi >= 0) {
      const yy = r0 + hi * 82; ctx.fillStyle = 'rgba(225,10,15,0.12)'; rr(ctx, x + 30, yy - 36, ww - 60, 72, 9); ctx.fill();
      ctx.strokeStyle = RED; ctx.lineWidth = 3; rr(ctx, x + 30, yy - 36, ww - 60, 72, 9); ctx.stroke();
      if (hi === sc.best) { const pk = popK(t, w(sc.steps[sc.steps.length - 1]) + 0.1); if (pk) pill(ctx, 'best', x + ww - 160, yy, 24, RED, '#FFF', pk); }
    }
  };

  SC.cut = (ctx, t, sc) => {
    stageXf(ctx, t, w(sc.at));
    const x = 134, y = 620, ww = 812, hh = 600; lightCard(ctx, x, y, ww, hh);
    T(ctx, '// script.md', x + 40, y + 52, 24, 500, GREY, MONO);
    const k = sc.cut.filter((ci, j) => t >= w(sc.strikes[j])).length;
    pill(ctx, `${sc.lines.length - k} lines`, x + ww - 170, y + 52, 22, '#141414', '#FFF');
    sc.lines.forEach((ln, i) => {
      const yy = y + 130 + i * 76, j = sc.cut.indexOf(i), cutT = j >= 0 ? w(sc.strikes[j]) : 1e9;
      const fadeK = pr(t, cutT + 0.25, cutT + 0.45);
      T(ctx, ln, x + 50, yy, 34, 600, t >= cutT ? mixHex(INK, '#BDBAB6', 0.6 + 0.4 * fadeK) : INK, SANS);
      if (j >= 0) { strike(ctx, x + 44, yy + 2, x + 56 + tw(ctx, ln, 34, 600), t, cutT); xBadge(ctx, x + ww - 60, yy, t, cutT + 2 * F1); }
    });
    stamp(ctx, sc.stampLine, sc.stampWord, 134, 1290, t, w(sc.stampAt), w(sc.stampKey));
  };

  function pitch(ctx, x, y, ww, hh, k) {        // simple clip frame for the phone (football)
    ctx.save(); rr(ctx, x, y, ww, hh, 0); ctx.clip();
    const g = ctx.createLinearGradient(0, y, 0, y + hh); g.addColorStop(0, '#1F7A33'); g.addColorStop(1, '#2FA046'); ctx.fillStyle = g; ctx.fillRect(x, y, ww, hh);
    for (let i = 0; i < 8; i++) { ctx.fillStyle = i % 2 ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'; ctx.fillRect(x, y + (i * hh) / 8, ww, hh / 8); }
    ctx.strokeStyle = 'rgba(255,255,255,0.7)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y + hh * 0.35); ctx.lineTo(x + ww, y + hh * 0.35); ctx.stroke();
    [[0.3, 0.62, '#E10A0F'], [0.6, 0.55, '#FFFFFF'], [0.72, 0.7, '#FFFFFF']].forEach(([px, py, c], i) => { const X = x + (px + Math.sin(k * 5 + i) * 0.03) * ww, Y = y + py * hh, s = hh / 24; ctx.fillStyle = c; rr(ctx, X - s, Y - 1.4 * s, 2 * s, 2.8 * s, s * 0.6); ctx.fill(); ctx.fillStyle = '#F2C29A'; ctx.beginPath(); ctx.arc(X, Y - 2.1 * s, 0.65 * s, 0, 7); ctx.fill(); });
    ctx.fillStyle = '#FFF'; ctx.beginPath(); ctx.arc(x + (0.3 + 0.45 * k) * ww, y + (0.68 - 0.3 * Math.sin(Math.PI * k)) * hh, 8, 0, 7); ctx.fill();
    ctx.restore();
  }
  function phone(ctx, x, y, ww, hh) {
    dotShadow(ctx, x, y, ww, hh, 54, 14);
    ctx.fillStyle = '#0D0D10'; rr(ctx, x, y, ww, hh, 54); ctx.fill();
    return [x + 14, y + 14, ww - 28, hh - 28];
  }
  SC.beats = (ctx, t, sc) => {
    stageXf(ctx, t, w(sc.at));
    const [sx, sy, sw, sh] = phone(ctx, 170, 600, 390, 760);
    ctx.save(); rr(ctx, sx, sy, sw, sh, 42); ctx.clip(); pitch(ctx, sx, sy, sw, sh, pr(t, w(sc.at), we(WD.length - 1)));
    // on-screen text per beat, Anton, stamped in on its word (inside the phone)
    let cur = null; sc.beats.forEach(([wi, s]) => { if (t >= w(wi)) cur = [wi, s]; });
    if (cur) { const p = pr(t, w(cur[0]), w(cur[0]) + 4 * F1), k = p < 0.5 ? lerp(1.3, 0.97, p / 0.5) : lerp(0.97, 1, (p - 0.5) / 0.5);
      ctx.save(); ctx.translate(sx + sw / 2, sy + 150); ctx.scale(k, k); const fs = cur[1].length > 14 ? 40 : 56;
      ctx.font = `400 ${fs}px ${STAMP}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineWidth = 10; ctx.strokeStyle = '#111'; ctx.strokeText(cur[1], 0, 0); ctx.fillStyle = '#FFF'; ctx.fillText(cur[1], 0, 0); ctx.restore(); }
    ctx.fillStyle = 'rgba(255,255,255,0.35)'; ctx.fillRect(sx, sy + sh - 10, sw, 5); ctx.fillStyle = RED; ctx.fillRect(sx, sy + sh - 10, sw * pr(t, w(sc.at), we(WD.length - 1)), 5);
    ctx.restore();
    ctx.fillStyle = '#0D0D10'; rr(ctx, 170 + 195 - 50, 616, 100, 26, 13); ctx.fill();
    // beat chips on the right: "beat n · text ✓"
    sc.beats.forEach(([wi], i) => { const k = popK(t, w(wi) + 2 * F1); if (!k) return; const yy = 760 + i * 120; pill(ctx, `beat ${i + 1} · text ✓`, 620, yy, 30, i === sc.beats.length - 1 || t < (sc.beats[i + 1] ? w(sc.beats[i + 1][0]) : 1e9) ? RED : '#141414', '#FFF', k); });
  };

  SC.post = (ctx, t, sc) => {
    stageXf(ctx, t, w(sc.at));
    const x = 134, y = 620, ww = 812, hh = 560; lightCard(ctx, x, y, ww, hh);
    const pk = popK(t, w(sc.posted) + 0.05); if (pk) pill(ctx, 'Posted ✓', x + 40, y + 70, 30, RED, '#FFF', pk);
    T(ctx, '// next up', x + ww - 40, y + 70, 24, 500, GREY, MONO, 'right');
    // upload row (fills the card until the brand row arrives)
    const ua = 1 - pr(t, w(sc.follow) - 0.25, w(sc.follow) - 0.1);
    if (ua > 0) {
      ctx.save(); ctx.globalAlpha = ua;
      ctx.save(); rr(ctx, x + 40, y + 130, 200, 356, 18); ctx.clip(); pitch(ctx, x + 40, y + 130, 200, 356, 0.4); ctx.restore();
      T(ctx, 'Watch his left foot.', x + 280, y + 200, 40, 700, INK, SANS);
      T(ctx, 'Shorts · 0:14 · public', x + 282, y + 255, 26, 500, GREY, SANS);
      const up = E.inOutC(pr(t, w(sc.at) - 0.2, w(sc.posted) + 0.05));
      ctx.fillStyle = '#E8E5E1'; rr(ctx, x + 280, y + 320, 470, 16, 8); ctx.fill(); ctx.fillStyle = RED; rr(ctx, x + 280, y + 320, 470 * up, 16, 8); ctx.fill();
      T(ctx, up < 1 ? 'Uploading… ' + Math.round(up * 100) + '%' : 'Live on Shorts', x + 282, y + 372, 26, 600, up < 1 ? GREY : RED, SANS);
      ctx.restore();
    }
    // brand row: logo + handle + follow button
    const lk = E.outBack(pr(t, w(sc.follow) - 0.15, w(sc.follow) + 0.1), 1.6);
    if (lk > 0) {
      ctx.save(); ctx.translate(x + 150, y + 290); ctx.scale(lk, lk); ctx.imageSmoothingEnabled = true; ctx.drawImage(IMG.logo, -95, -95, 190, 190); ctx.restore();
      T(ctx, R.brand.handle, x + 280, y + 260, 60, 700, INK, SANS);
      T(ctx, 'Shorts coaching for beginners', x + 282, y + 325, 28, 500, GREY, SANS);
      const followed = t >= w(sc.click) + 2 * F1;
      pill(ctx, followed ? 'Following ✓' : 'Follow', x + 280, y + 420, 34, followed ? '#141414' : RED, '#FFF', 1);
      const c0 = w(sc.click) - 0.3, cp = E.inOutC(pr(t, c0, c0 + 9 * F1));
      if (t > c0 - 0.1) cursor(ctx, lerp(x + ww + 30, x + 360, cp), lerp(y + hh + 80, y + 425, cp), (t >= w(sc.click) && t < w(sc.click) + 2 * F1 ? 0.9 : 1) * 1.5);
    }
    stamp(ctx, '', sc.stampText, 134, 1250, t, w(sc.stamp) - 0.01, w(sc.stamp), 1, 170);
  };

  window.ENG = { SC, R, WD, W, H, F1, RED, INK, BG, GREY, w, we, clamp, lerp, pr, E, rnd, mixHex, IMG, SANS, SERIF, MONO, STAMP, UI,
    rr, T, tw, pill, popK, marker, strike, xBadge, cursor, badge, stamp, lightCard, darkWin, dotShadow, pitch, phone, stageXf };
  if (window.REGISTER_SCENES) window.REGISTER_SCENES(window.ENG);
  // ======================================================== §8 halftone wipe: grow 5 f (from the top-right) > hold 3 f > reveal 10 f from the centre
  function wipeAt(t) { let best = null; R.scenes.forEach((x) => { if (x.enter === 'wipe') { const a = w(x.at) - 0.2; if (t >= a - 0.17 && t < a + 0.45) best = a; } }); return best; }
  function dots(ctx, radiusFn) {
    ctx.fillStyle = '#0A0A0A';
    const P = 36, RM = 27;
    for (let y = 0; y <= H + P; y += P) for (let x = 0; x <= W + P; x += P) { const r = radiusFn(x, y) * RM; if (r > 0.4) { ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); } }
  }

  // ======================================================== timeline
  const START = R.scenes.map((s) => (s.at === 0 ? 0 : w(s.at) - 0.2));
  function sceneIdx(t) { let k = 0; START.forEach((s, i) => { if (t >= s) k = i; }); return k; }
  function drawScene(ctx, i, t) { ctx.save(); SC[R.scenes[i].type](ctx, t, R.scenes[i]); ctx.restore(); }
  function badges(ctx, t) {   // the step badge sits top-right of the stage for its chapter (§6); the wipe chapter pops it centre first
    let cur = null; R.scenes.forEach((s, i) => { if (s.badge && t >= START[i]) cur = [s, i]; });
    if (!cur) return;
    const [s, i] = cur, t0 = START[i] + (s.enter === 'wipe' ? 0.33 : 0.05);
    if (s.enter === 'wipe' && t < t0 + 0.45) { badge(ctx, s.badge, 540, 980, t, t0, 1.9); return; }
    if (s.enter === 'wipe') { const p = E.inOutC(pr(t, t0 + 0.45, t0 + 0.45 + 8 * F1)); badge(ctx, s.badge, lerp(540, 926, p), lerp(980, 600, p), t, t0 - 1, lerp(1.9, 1, p)); return; }
    badge(ctx, s.badge, 926, 600, t, t0);
  }

  F.render = (ctx, t) => {
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.filter = 'none';
    bg(ctx);
    const i = sceneIdx(t), t0 = START[i], wa = wipeAt(t);
    const inWipe = wa != null && t >= wa - 0.17 && t < wa + 0.45;
    // card stack (§8): previous scene shrinks to 0.96, blurs, fades over 6 f while the new one rises 60 px and fades in
    const KICKS = (R.kicks || R.accents || []).map((k) => w(k));
    const full = (c, j, tt) => { if (window.FX && R.fx !== false) { FX.env(c, tt, R.scenes[j].env); FX.particles(c, tt, R.scenes[j].env === 'spotlight'); } drawScene(c, j, tt); };
    ctx.save(); if (window.FX && R.fx !== false) FX.camera(ctx, t, KICKS);
    const st = pr(t, t0, t0 + (R.transition === 'whip' ? 7 : 6) * F1), stacking = i > 0 && st < 1 && R.scenes[i].enter !== 'wipe';
    if (stacking && R.transition === 'whip') {      // whip pan: old scene flies left, new one arrives from the right, with motion-blur ghosts
      const e = E.inOutC(st), blur = Math.sin(Math.PI * e);
      [[i - 1, -W * e], [i, W * (1 - e)]].forEach(([j, dx]) => { for (let g = 3; g >= 0; g--) { ctx.save(); ctx.globalAlpha = g ? 0.18 * blur : 1; ctx.translate(dx + g * 70 * blur, 0); full(ctx, j, t); ctx.restore(); } });
    } else if (stacking) {
      ctx.save(); ctx.globalAlpha = 1 - st; ctx.translate(540, 980); ctx.scale(lerp(1, 0.96, st), lerp(1, 0.96, st)); ctx.translate(-540, -980); full(ctx, i - 1, t); ctx.restore();
      ctx.save(); ctx.globalAlpha = E.outC(st); ctx.translate(0, 60 * (1 - E.outC(st))); full(ctx, i, t); ctx.restore();
    } else if (R.scenes[i].enter === 'wipe') {   // §8: badge reveals alone on the empty stage, UI rises in once the badge docks
      const k = R.scenes[i].badge ? E.outC(pr(t, t0 + 0.85, t0 + 0.85 + 6 * F1)) : 1;
      if (k > 0) { ctx.save(); ctx.globalAlpha = k; ctx.translate(0, 60 * (1 - k)); full(ctx, i, t); ctx.restore(); }
    } else full(ctx, i, t);
    badges(ctx, t);
    ctx.restore();
    presenter(ctx, t);
    labels(ctx, t);
    captions(ctx, t);
    if (inWipe) {
      const g0 = wa - 0.17, g1 = g0 + 5 * F1, h1 = g1 + 3 * F1, r1 = h1 + 10 * F1;
      if (t < g1) { const p = pr(t, g0, g1); dots(ctx, (x, y) => clamp(p * 1.9 - Math.hypot(W - x, y) / Math.hypot(W, H) * 0.9)); }
      else if (t < h1) { ctx.fillStyle = '#0A0A0A'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#4A4A4A'; const P = 36; for (let y = 0; y <= H + P; y += P) for (let x = 0; x <= W + P; x += P) { const r = 6 + 6 * Math.sin(t * 50 + x * 0.04 + y * 0.025); if (r > 0.5) { ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); } } }
      else if (t < r1) { const p = pr(t, h1, r1); dots(ctx, (x, y) => clamp(1 - (p * 1.8 - Math.hypot(x - 540, y - 980) / Math.hypot(540, 980) * 0.8))); badges(ctx, t); }
    }
  };

  F.load = async () => {
    await document.fonts.ready;
    await Promise.all([`600 80px ${SANS}`, `500 22px ${SANS}`, `700 22px ${SANS}`, `italic 400 87px ${SERIF}`, `500 22px ${MONO}`, `700 22px ${MONO}`, `400 80px ${STAMP}`, `500 30px ${UI}`, `600 30px ${UI}`, `700 30px ${UI}`].map((f) => document.fonts.load(f, 'Aa1@')));
    await Promise.all(Object.entries(R.images || {}).map(([k, src]) => new Promise((res) => { const i = new Image(); i.onload = () => { IMG[k] = i; res(); }; i.onerror = () => res(); i.src = src; })));
    if (R.shot) IMG.shot = await new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = R.shot; });
    IMG.logo = await new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = R.brand.logo; });
  };
})();

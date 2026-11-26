// ═════ CTA [CUT_CTA → end] "Comment KEYWORD and I'll send you the link." — the @reelsuniai comment-sheet CTA (keyword types in as a red chip,
// posts, KEYWORD stamps big, comments flood in, paper plane unfolds into a DM with the link card). Uses reel.json brand / tagline and assets/logo.png.
(() => {
  const S0 = CUT_CTA, S1 = DUR_END(), F1 = 1 / 30;
  const iC = Math.max(0, wordIndex(KEYWORD, S0 - 0.3) - 1), wiC = (k) => wi(Math.min(WORDS.length - 1, iC + k));
  const tComment = wiC(0), tCode = wiC(1), tAnd = wiC(2), tSend = wiC(4), tLink = wi(WORDS.length - 1);
  const tType = tCode + 0.01, tPost = tAnd + 0.01, tFly = tPost + F1, tIn = tPost + 5 * F1, tStamp = tCode + 0.27;
  const tPlane = tSend - 0.07, tFold = tPlane + 0.26, tOpen = tFold + 4 * F1, tLinkSlam = tLink + 0.05, tTap = tLink + 0.42;
  const BRAND = (REEL.brand || REEL.name || KW), TAGLINE = (REEL.tagline || 'free · open source');
  const INK = '#1A1A1A', RED = C.red, GREY = '#8a8780', BLUE = '#2F6FD0', KW = KEYWORD;
  // ── sheet geometry ──
  const SX = 80, SY = 640, SW = 920, SH = 650, LY = SY + 92, RH = 96, CY = SY + SH - 96, LIST_B = CY - 10;
  const CHIP = (n) => 30 + n * 31;
  // comments: [time in, handle, avatar colour, extra text after the chip | null = plain text comment]
  const OLD = [[-9, 'sam.ships', '#7C8FA8', 'is it really free?', true], [-8, 'jk.codes', '#C98C6C', 'pls'], [-7, 'mira.builds', '#8FB08A', 'need this', true], [-6, 'dev_ana', '#B58AC8', '']];
  const FLOOD = ['tess.dev', 'noah_builds', 'ravi.codes', 'lena.ai', 'omar.ships', 'kai_dev', 'zoe.tech', 'leo.makes', 'ivy.codes', 'max_hacks', 'ana.dev', 'tom.ai'];
  const EXTRA = ['', '!!', 'pls', '', 'please', '', 'yes', 'thanks', '', '', 'pls', ''];
  const COLS = ['#D08B6A', '#7FA0C8', '#9AB884', '#C88AB2', '#E0B060', '#6FB0A8'];
  const ROWS = [...OLD.map((r) => ({ t: r[0], h: r[1], c: r[2], x: r[3], plain: !!r[4] })), { t: tIn, h: 'you', c: '#1F2024', x: '', you: true },
    ...FLOOD.map((h, k) => ({ t: tStamp + 0.12 + 0.62 * Math.pow(k / (FLOOD.length - 1), 0.8), h, c: COLS[k % COLS.length], x: EXTRA[k] }))].sort((a, b) => b.t - a.t);
  for (let k = 0; k < KW.length; k++) cue(tType + k * 2 * F1, 'type', -10);
  cue(tPost, 'click', -6); cue(tStamp, 'stamp', 0); cue(tStamp + 0.2, 'pop', -9); cue(tPlane, 'whoosh', -6); cue(tFold, 'swoosh', -8); cue(tLinkSlam, 'ding', -3); cue(tTap, 'click', -8); cue(tLink + 0.14, 'pop', -6);
  // ── LIFE: stage drift (never the presenter) ~26-30 px/s + 1.8 %/s zoom, direction flips on post and on the plane; push-ins on the
  //    stamp / DM / link; 2-f jolts on slams; parallax: sheet 1×, DM 1.2×, stamp 1.25×, sticker 1.3× ──
  const SEG = [[S0, 40, -16, tPost], [tPost, -46, -18, tPlane], [tPlane, 42, 16, S1]];
  const PUSH = [[tStamp, 0.05], [tOpen, 0.04], [tLinkSlam, 0.03]], JOLT = [tStamp, tPost, tLinkSlam];
  function cta_drift(t) {
    let g = SEG[0]; for (const q of SEG) if (t >= q[0]) g = q;
    const d = t - g[0], m = d - (g[3] - g[0]) / 2; let z = 1 + 0.022 * (t - S0);
    for (const [tp, a] of PUSH) { const q = t - tp; if (q > 0) z += a * E.outCubic(clamp(q / (4 * F1))) * (1 - E.inOutSine(clamp((q - 0.45) / 0.7))); }
    let jx = 0; for (const tj of JOLT) { const f = (t - tj) * 30; if (f >= 0 && f < 2) jx += f < 1 ? 5 : -4; }
    return { x: g[1] * m + Math.sin(t * 1.3) * 6 + jx, y: g[2] * m + Math.cos(t * 1.1) * 5, z };
  }
  function cta_stage(T, K, t, k, fn) { const d = cta_drift(t), z = 1 + (d.z - 1) * k; for (const c of [T, K]) { c.save(); c.translate(540 + d.x * k, 860 + d.y * k); c.scale(z, z); c.translate(-540, -860); } fn(); T.restore(); K.restore(); }
  function cta_gloss(K, w, h, t, seed, a = 0.5) {
    const gx = ((t * 0.42 + hash(seed * 5.3)) % 1) * (w + 300) - 150; if (gx < -80 || gx > w + 80) return;
    K.save(); K.fillStyle = `rgba(255,255,255,${a})`; K.beginPath(); K.moveTo(gx, 0); K.lineTo(gx + 34, 0); K.lineTo(gx - 18, h); K.lineTo(gx - 52, h); K.closePath(); K.fill(); K.restore();
  }
  function cta_boil(K, x, y, w, h, r, t, seed, col = INK) { const b = (hash(Math.floor(t * 10) + seed) - 0.5) * 1.8; strokeRR(K, x + b, y - b * 0.6, w, h, r, col, 4.6 + Math.abs(b) * 0.5); }
  function cta_softShadow(T, x, y, w, h, r) { T.save(); T.shadowColor = 'rgba(0,0,0,0.45)'; T.shadowBlur = 34; T.shadowOffsetX = 8; T.shadowOffsetY = 22; fillRR(T, x, y, w, h, r, '#FFFFFF'); T.restore(); }

  // ── small drawn parts ──
  function cta_avatar(K, x, y, r, col, you) {
    circle(K, x, y, r, col); if (!you) return;
    K.save(); K.beginPath(); K.arc(x, y, r, 0, TAU); K.clip(); circle(K, x, y + r * 0.15, r * 0.62, '#F0C8A6');
    K.fillStyle = '#151515'; K.beginPath(); K.ellipse(x, y - r * 0.32, r * 0.7, r * 0.42, 0, Math.PI, 0); K.fill(); K.fillRect(x - r * 0.1, y - r * 0.36, r * 0.95, r * 0.18);
    K.strokeStyle = '#111'; K.lineWidth = 2; K.beginPath(); K.arc(x - r * 0.24, y + r * 0.12, r * 0.17, 0, TAU); K.moveTo(x + r * 0.41, y + r * 0.12); K.arc(x + r * 0.24, y + r * 0.12, r * 0.17, 0, TAU); K.stroke(); K.restore();
  }
  function cta_chip(K, x, y, n, s, letterT, t) {             // the red keyword chip, letters pop in (or all shown when letterT is null)
    const w = CHIP(n) * s, h = 50 * s; fillRR(K, x, y - h / 2, w, h, h / 2, RED);
    for (let k = 0; k < n; k++) { const p = letterT == null ? 1 : popScale(t, letterT + k * 2 * F1, { from: 0.3, frames: 3 });
      if (p > 0) X([K], x + (22 + k * 31 + 13) * s, y, p * s, 0, () => text(K, KW[k], 0, 13, { font: F.anton, weight: 400, size: 36, color: '#FFFFFF' })); }
    return w;
  }
  function cta_heart(K, x, y, s, on) {
    X([K], x, y, s, 0, () => { K.beginPath(); K.moveTo(0, 9); K.bezierCurveTo(-18, -4, -10, -18, 0, -8); K.bezierCurveTo(10, -18, 18, -4, 0, 9); K.closePath();
      if (on) { K.fillStyle = RED; K.fill(); } else { K.strokeStyle = GREY; K.lineWidth = 2.5; K.stroke(); } });
  }
  function cta_row(K, r, y, t) {
    const fresh = r.t > S0, d = t - r.t, sl = fresh ? 1 - E.outCubic(clamp(d / (5 * F1))) : 0, sd = r.h.length * 1.3 + (r.t % 1) * 7;
    K.save(); K.translate(-60 * sl + Math.sin(t * TAU * 0.6 + sd) * 2.4, Math.sin(t * TAU * 0.85 + sd) * 3.2); K.globalAlpha = 1 - sl * 0.7;
    if (r.you) fillRR(K, SX + 14, y + 4, SW - 28, RH - 8, 16, 'rgba(255,59,31,0.08)');
    cta_avatar(K, SX + 64, y + RH / 2, 26, r.c, r.you);
    text(K, r.h, SX + 108, y + 38, { font: F.grot, weight: 700, size: 24, color: INK, align: 'left' });
    text(K, fresh ? 'now' : '2m', SX + 116 + measure(K, r.h, { font: F.grot, weight: 700, size: 24 }), y + 38, { font: F.grot, weight: 500, size: 20, color: GREY, align: 'left' });
    if (r.plain) text(K, r.x, SX + 108, y + 76, { font: F.grot, weight: 500, size: 26, color: '#3A3636', align: 'left' });
    else { const w = cta_chip(K, SX + 108, y + 66, KW.length, 0.72, null, t); if (r.x) text(K, r.x, SX + 120 + w, y + 76, { font: F.grot, weight: 500, size: 26, color: '#3A3636', align: 'left' }); }
    const hp = (fresh ? popScale(t, r.t + 0.12, { from: 0.3, frames: 4 }) : 1) * (1 + 0.1 * Math.max(0, Math.sin(t * TAU * 1.3 + sd))); cta_heart(K, SX + SW - 54, y + RH / 2 - 4, hp, fresh && !r.plain);
    K.restore();
  }
  // ── the comment sheet (persistent hero) ──
  function cta_sheet(T, K, t) {
    const L = crLife(t, 6, 0.5), sk = 0.03 * Math.sin(t * 0.9 + 1.2);   // ±2° skew follows the drift
    K.save(); T.save(); for (const c of [T, K]) { c.translate(540, 960 + L.dy); c.transform(1, 0, sk, 1, 0, 0); c.rotate(L.rot * 0.4 * D2R); c.translate(-540, -960); }
    cta_softShadow(T, SX, SY, SW, SH, 28);
    dotShadow(K, SX, SY, SW, SH, 28, 1); fillRR(K, SX, SY, SW, SH, 28, vGrad(K, SY, SY + SH, ['#FFFFFF', '#F5F3EF']));
    fillRR(K, SX + 24, SY + 3, SW - 48, 1.5, 1, '#FFFFFF');
    fillRR(K, SX + SW / 2 - 40, SY + 16, 80, 8, 4, '#D6D2CC');
    text(K, 'Comments', SX + SW / 2, SY + 66, { font: F.grot, weight: 700, size: 30, color: INK });
    fillRR(K, SX, SY + 86, SW, 2, 1, '#EEEAE5');
    K.save(); K.beginPath(); K.rect(SX, LY, SW, LIST_B - LY); K.clip();
    let y = LY; for (const r of ROWS) { if (t < r.t) continue; const e = r.t > S0 ? E.outCubic(clamp((t - r.t) / (5 * F1))) : 1; cta_row(K, r, y - RH * (1 - e), t); y += RH * e; if (y > LIST_B + RH) break; }
    K.restore();
    // "new comments" pill while the flood runs
    const np = popScale(t, tStamp + 0.25, { from: 0.3, frames: 4 }); if (np > 0 && t < tFold) X([K], SX + SW / 2, LY + 26, np, 0, () => { fillRR(K, -120, -22, 240, 44, 22, INK); text(K, '↑ new comments', 0, 8, { font: F.grot, weight: 700, size: 22, color: '#FFFFFF' }); });
    cta_composer(K, t);
    fillRR(K, SX + 24, SY + SH - 7, SW - 48, 3, 1.5, 'rgba(110,100,90,0.22)');
    K.save(); rr(K, SX, SY, SW, SH, 28); K.clip(); K.translate(SX, SY); cta_gloss(K, SW, SH, t * 0.8, 2, 0.35); K.restore();
    cta_boil(K, SX, SY, SW, SH, 28, t, 3);
    const dim = clamp((t - tFold) / 0.15); if (dim > 0) fillRR(K, SX, SY, SW, SH, 28, `rgba(26,26,26,${0.22 * dim})`);
    K.restore(); T.restore();
  }
  function cta_composer(K, t) {
    fillRR(K, SX, CY - 4, SW, 2, 1, '#EEEAE5'); cta_avatar(K, SX + 64, CY + 46, 28, '#1F2024', true);
    const focus = t >= tComment - 0.04 && t < tFly, ix = SX + 112, iw = SW - 250;
    fillRR(K, ix, CY + 14, iw, 64, 32, '#F4F2EF'); strokeRR(K, ix, CY + 14, iw, 64, 32, focus ? INK : '#DDD8D2', focus ? 3.5 : 2);
    const n = KW.split('').filter((_, k) => t >= tType + k * 2 * F1).length;
    if (t < tFly && n > 0) { const w = cta_chip(K, ix + 16, CY + 46, n, 1, tType, t); if (Math.floor(t * 6) % 2 === 0) fillRR(K, ix + 26 + w, CY + 28, 3, 36, 1, INK); }
    else { text(K, 'Add a comment…', ix + 28, CY + 55, { font: F.grot, weight: 500, size: 26, color: '#A9A39C', align: 'left' }); if (focus && Math.floor(t * 6) % 2 === 0) fillRR(K, ix + 22, CY + 28, 3, 36, 1, INK); }
    const ps = t >= tPost && t < tPost + 3 * F1 ? 0.86 : 1, act = n > 0 && t < tFly + 0.3;
    X([K], SX + SW - 70, CY + 46, ps, 0, () => text(K, 'Post', 0, 10, { font: F.grot, weight: 700, size: 28, color: act ? RED : '#B9B3AC' }));
  }
  // the posted chip flies from the composer up into the top row (4 f, near-linear, speed lines)
  function cta_flyChip(K, t) {
    const u = (t - tFly) / (4 * F1); if (u < 0 || u >= 1) return;
    const e = Math.pow(u, 1.15), x = lerp(SX + 128, SX + 108, e), y = lerp(CY + 46, LY + 66, e), s = lerp(1, 0.72, e) * (1 + 0.25 * Math.sin(Math.PI * u));
    speedLines(K, x + 60, y + 90, -Math.PI / 2, 90, 3, 'rgba(26,26,26,0.85)');
    cta_chip(K, x, y, 4, s, null, t);
  }
  // CODE stamp: 2.75 → 2.3 → 2.0 → 1 with a 1-frame cliff, ink ring, red dot glow; held to the end
  function cta_stamp(T, K, t) {
    const sk = stampKeys(t, tStamp, [2.75, 2.3, 2.0, 1], { travel: 43 });
    if (!sk.on) { if (t >= tType) letterDrop(K, KW, 500, 495 + 68 - 190 * 0.02, t, tType, { size: 190, align: 'center', color: '#B9B3AC', gap: 2, ls: 6 }); return; }
    const x = 500, y = 495, f = { font: F.anton, weight: 400, size: 190 }, w = measure(K, KW, f) + 150, h = 236;
    if (sk.landed) { halftoneGlow(K, x, y + 10, 360, 130, 0.55); inkRing(K, x, y + 20, t, tStamp + 3 * F1, { r0: 130, r1: 205 }); tickBurst(K, x, y, t, tStamp + 3 * F1, { n: 14, r0: 170, len: 30, lw: 5, sx: 1.5, sy: 0.75 }); }
    const L = crLife(t, 9, 0.6);
    K.save(); K.globalAlpha = sk.a;
    X([K], x, y + sk.dy + (sk.landed ? L.dy * 0.6 : 0), sk.s, -6 + (sk.landed ? L.rot * 0.5 : 0), () => {
      fillRR(K, -w / 2, -h / 2, w, h, 16, 'rgba(255,255,255,0.94)');
      strokeRR(K, -w / 2, -h / 2, w, h, 16, RED, 15); strokeRR(K, -w / 2 + 26, -h / 2 + 26, w - 52, h - 52, 9, RED, 6);
      text(K, KW, 0, 68, { ...f, color: RED, ls: 6 });
      K.fillStyle = '#FFFFFF'; for (let i = 0; i < 110; i++) K.fillRect((hash(i * 3.7) - 0.5) * w * 0.94, (hash(i * 9.1) - 0.5) * h * 0.9, 2 + hash(i) * 4, 2 + hash(i * 2) * 3);
      K.save(); rr(K, -w / 2, -h / 2, w, h, 16); K.clip(); K.translate(-w / 2, -h / 2); cta_gloss(K, w, h, t * 1.5, 4, 0.4); K.restore();
      text(K, 'COMMENT', -w / 2 + 34, -h / 2 - 14, { font: F.mono, weight: 700, size: 24, color: INK, align: 'left', ls: 4 });
    });
    K.restore();
  }
  // ── paper plane on an arc → unfolds into the DM card ──
  const P0 = [880, 1340], PC = [250, 760], P1 = [470, 1015], DM = { x: 490, y: 1010, w: 780, h: 300 };
  const bez = (q, a, c, b) => (1 - q) * (1 - q) * a + 2 * (1 - q) * q * c + q * q * b;
  function cta_plane(K, t) {
    const q = E.inOutCubic(clamp((t - tPlane) / (tFold - tPlane))); if (t < tPlane || t >= tFold) return;
    K.save(); K.setLineDash([10, 12]); K.strokeStyle = 'rgba(26,26,26,0.55)'; K.lineWidth = 4; K.beginPath();
    for (let k = 0; k <= 24; k++) { const qq = q * k / 24; K.lineTo(bez(qq, P0[0], PC[0], P1[0]), bez(qq, P0[1], PC[1], P1[1])); } K.stroke(); K.setLineDash([]); K.restore();
    const x = bez(q, P0[0], PC[0], P1[0]), y = bez(q, P0[1], PC[1], P1[1]), dx = 2 * (1 - q) * (PC[0] - P0[0]) + 2 * q * (P1[0] - PC[0]), dy = 2 * (1 - q) * (PC[1] - P0[1]) + 2 * q * (P1[1] - PC[1]);
    const ang = Math.atan2(dy, dx); speedLines(K, x - Math.cos(ang) * 120, y - Math.sin(ang) * 120, ang, 70, 3, 'rgba(26,26,26,0.8)');
    X([K], x, y, 1.3 + 0.3 * Math.sin(Math.PI * q), ang * 57.3, () => cta_planeArt(K));
  }
  function cta_planeArt(K) {
    K.lineJoin = 'round';
    K.fillStyle = '#FFFFFF'; K.strokeStyle = INK; K.lineWidth = 4;
    K.beginPath(); K.moveTo(70, 0); K.lineTo(-50, -44); K.lineTo(-24, 0); K.closePath(); K.fill(); K.stroke();
    K.fillStyle = '#E3DED7'; K.beginPath(); K.moveTo(70, 0); K.lineTo(-24, 0); K.lineTo(-50, 40); K.closePath(); K.fill(); K.stroke();
    K.fillStyle = '#CFC9C0'; K.beginPath(); K.moveTo(70, 0); K.lineTo(-24, 0); K.lineTo(-30, 14); K.closePath(); K.fill(); K.stroke();
  }
  // unfold: the plane's 4 outline points morph into the card's corners over 4 f
  function cta_unfold(T, K, t) {
    const u = E.outCubic(clamp((t - tFold) / (tOpen - tFold))); if (t < tFold || u >= 1) return;
    const plane = [[70, 0], [-50, -44], [-24, 0], [-50, 40]].map(([px, py]) => [P1[0] + px * 1.6, P1[1] + py * 1.6]);
    const card = [[DM.x + DM.w / 2, DM.y - DM.h / 2], [DM.x - DM.w / 2, DM.y - DM.h / 2], [DM.x - DM.w / 2, DM.y + DM.h / 2], [DM.x + DM.w / 2, DM.y + DM.h / 2]];
    K.save(); K.fillStyle = '#FFFFFF'; K.strokeStyle = INK; K.lineWidth = 5; K.lineJoin = 'round'; K.beginPath();
    plane.forEach((p, k) => K.lineTo(lerp(p[0], card[k][0], u), lerp(p[1], card[k][1], u))); K.closePath(); K.fill(); K.stroke();
    K.strokeStyle = 'rgba(26,26,26,0.3)'; K.lineWidth = 3; K.beginPath(); K.moveTo(lerp(plane[0][0], DM.x + DM.w / 2, u), lerp(plane[0][1], DM.y, u)); K.lineTo(lerp(plane[2][0], DM.x - DM.w / 2, u), lerp(plane[2][1], DM.y, u)); K.stroke();
    K.restore();
  }
  function cta_dm(T, K, t) {
    if (t < tOpen) return;
    const res = blankThenResolve(t, tOpen), L = crLife(t, 3, 0.5), x0 = -DM.w / 2, y0 = -DM.h / 2;
    X([T, K], DM.x, DM.y + L.dy, (1 + 0.03 * Math.exp(-(t - tOpen) * 18)) * L.s, L.rot * 0.6, () => {
      cta_softShadow(T, x0, y0, DM.w, DM.h, 24);
      dotShadow(K, x0, y0, DM.w, DM.h, 24, 1); fillRR(K, x0, y0, DM.w, DM.h, 24, vGrad(K, y0, y0 + DM.h, ['#FFFFFF', '#F3F1ED']));
      fillRR(K, x0 + 20, y0 + 3, DM.w - 40, 1.5, 1, '#FFFFFF'); fillRR(K, x0 + 20, y0 + DM.h - 6, DM.w - 40, 3, 1.5, 'rgba(110,100,90,0.22)');
      circle(K, x0 + 74, y0 + 30, 7, `rgba(60,170,90,${0.5 + 0.5 * Math.sin(t * 8)})`);
      fillRR(K, x0, y0 + DM.h / 2 - 1.5, DM.w, 3, 1, `rgba(26,26,26,${0.12 * (1 - res)})`);          // the fold crease fades out
      K.save(); K.globalAlpha = res;
      cta_avatar(K, x0 + 52, y0 + 50, 26, '#1F2024', true);
      text(K, 'new message', x0 + 92, y0 + 58, { font: F.grot, weight: 700, size: 26, color: INK, align: 'left' });
      text(K, 'now', x0 + DM.w - 30, y0 + 58, { font: F.grot, weight: 500, size: 22, color: GREY, align: 'right' });
      fillRR(K, x0 + 92, y0 + 82, 280, 56, 28, '#EFECE8'); text(K, "here's the link", x0 + 116, y0 + 119, { font: F.grot, weight: 600, size: 27, color: INK, align: 'left' });
      K.restore();
      const ls = slamScale(t, tLinkSlam, { from: 1.5, frames: 3 });
      if (ls > 0) X([K], 0, y0 + 222, ls, 0, () => {
        const w = DM.w - 60; fillRR(K, -w / 2, -58, w, 116, 18, '#F6F8FC'); strokeRR(K, -w / 2, -58, w, 116, 18, BLUE, 3.5);
        if (IMG.logo) K.drawImage(IMG.logo, -w / 2 + 24, -52, 40, 40);
        cta_linkIcon(K, -w / 2 + 44, 22);
        text(K, BRAND, -w / 2 + 80, 36, { font: F.grot, weight: 800, size: 44, color: BLUE, align: 'left' });
        const uw = measure(K, BRAND, { font: F.grot, weight: 800, size: 44 }) * E.outCubic(clamp((t - tLinkSlam - 2 * F1) / (4 * F1)));
        fillRR(K, -w / 2 + 80, 44, uw, 4, 2, BLUE);
        text(K, TAGLINE, w / 2 - 24, -16, { font: F.grot, weight: 500, size: 21, color: GREY, align: 'right' });
        K.save(); rr(K, -w / 2, -58, w, 116, 18); K.clip(); K.translate(-w / 2, -58); cta_gloss(K, w, 116, t * 1.6, 6, 0.55); K.restore();
        const tp = clamp((t - tTap) / 0.1); if (tp > 0) fillRR(K, -w / 2, -58, w, 116, 18, `rgba(47,111,208,${0.14 * (1 - clamp((t - tTap - 0.25) / 0.3))})`);
      });
    });
    cta_cursor(K, t);
  }
  // a die-cut THUMBS-UP sticker slams beside the DM (the presenter's thumb sits low in frame), wobbles, sparkles twinkle round it
  function cta_thumbArt(K) {
    const shape = () => { rr(K, -44, -8, 84, 74, 20); K.moveTo(-40, 6); rr(K, -42, -70, 32, 74, 16); rr(K, 38, -4, 28, 66, 7); };
    K.save(); K.lineJoin = 'round'; K.strokeStyle = '#FFFFFF'; K.lineWidth = 20; shape(); K.stroke(); K.restore();
    fillRR(K, 38, -4, 28, 66, 7, '#B5462E'); strokeRR(K, 38, -4, 28, 66, 7, INK, 4);
    fillRR(K, -44, -8, 84, 74, 20, vGrad(K, -8, 66, ['#F6D2B4', '#E6B48E'])); strokeRR(K, -44, -8, 84, 74, 20, INK, 4);
    fillRR(K, -42, -70, 32, 74, 16, vGrad(K, -70, 4, ['#F8D8BC', '#EBBE9A'])); strokeRR(K, -42, -70, 32, 74, 16, INK, 4);
    K.save(); K.strokeStyle = INK; K.lineWidth = 3.5; K.lineCap = 'round'; [12, 30, 48].forEach((y) => { K.beginPath(); K.moveTo(-6, y); K.lineTo(34, y); K.stroke(); }); K.restore();
    fillRR(K, -36, -62, 8, 22, 4, 'rgba(255,255,255,0.6)');
  }
  function cta_spark(K, x, y, s, col) { X([K], x, y, s, 45 * s, () => { K.fillStyle = col; K.beginPath(); for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4, r = k % 2 ? 5 : 18; K.lineTo(Math.cos(a) * r, Math.sin(a) * r); } K.closePath(); K.fill(); }); }
  function cta_thumbs(T, K, t) {
    const t0 = tLink + 0.14, s = slamScale(t, t0, { from: 1.7, frames: 3 }); if (s <= 0) return;
    const x = 850, y = 870, sw = pendulum(t - t0 - 0.1, 9, 1.4, 2.6) + Math.sin(t * TAU * 0.7) * 2, fl = Math.sin(t * TAU * 0.9) * 3;
    stickerShadow(K, x - 56, y - 58 + fl, 124, 128, 30, { dx: 12, dy: 15 });
    X([K], x, y + fl, s * (1 + Math.sin(t * TAU * 1.1) * 0.015), 12 + sw, () => cta_thumbArt(K));
    ringBurst(K, x, y, t, t0 + 3 * F1, { r0: 60, r1: 130, col: RED });
    [[-92, -70, 0], [86, -84, 1.3], [96, 52, 2.6], [-80, 70, 3.9]].forEach(([dx, dy, ph], k) => { const tw = Math.max(0, Math.sin(t * TAU * 1.6 + ph)); if (t > t0 + 0.05 + k * 2 * F1) cta_spark(K, x + dx, y + dy, 0.4 + 0.7 * tw, k % 2 ? RED : '#E8B84A'); });
  }
  function cta_linkIcon(K, x, y) {
    K.save(); K.strokeStyle = BLUE; K.lineWidth = 5; K.lineCap = 'round';
    X([K], x, y - 12, 1, -45, () => { rr(K, -20, -8, 22, 16, 8); K.stroke(); rr(K, -2, -8, 22, 16, 8); K.stroke(); }); K.restore();
  }
  function cta_cursor(K, t) {                                // a pointer glides in and taps the link
    const u = E.inOutCubic(clamp((t - tTap + 0.3) / 0.3)); if (u <= 0) return;
    const x = lerp(780, 380, u), y = lerp(1320, 1150, u), press = t > tTap && t < tTap + 0.12 ? 0.85 : 1;
    if (t > tTap) ringBurst(K, 380, 1140, t, tTap, { r0: 14, r1: 60, col: INK, lw: 3 });
    X([K], x, y, 1.3 * press, -12, () => { K.fillStyle = '#FFFFFF'; K.strokeStyle = INK; K.lineWidth = 3.5; K.lineJoin = 'round'; K.beginPath(); K.moveTo(0, 0); K.lineTo(0, 46); K.lineTo(12, 35); K.lineTo(22, 56); K.lineTo(30, 52); K.lineTo(20, 32); K.lineTo(36, 32); K.closePath(); K.fill(); K.stroke(); });
  }

  // ── presenter: index up at the stamp, nod on "I'll send", thumbs-up + wink on "link" ──
  const MOODS = [['pointUp', S0, tPlane - 0.04, { side: 'L' }], ['nod', tPlane - 0.04, tLink - 0.1], ['thumbs', tLink - 0.08, S1 + 1, { side: 'L' }]];
  const look = (t) => t < tPlane ? [500, 500] : t < tFold ? [470, 1000] : [490, 1010];
  const guyOpts = { focus: look, pose: 'point', gestures: false };
  SC.cta = { label: '// comment ' + KW.toLowerCase(),
    cam: (t) => crCam(t, S0, S1, { focus: [540, 820], maxPush: 0.01 }),
    draw(T, K, t) {
      CAP.color = null;
      cta_stage(T, K, t, 1, () => { cta_sheet(T, K, t); cta_flyChip(K, t); });
      cta_stage(T, K, t, 1.25, () => cta_stamp(T, K, t));
      cta_stage(T, K, t, 1.2, () => { cta_plane(K, t); cta_unfold(T, K, t); cta_dm(T, K, t); });
      cta_stage(T, K, t, 1.3, () => cta_thumbs(T, K, t));
    },
    guy: (t) => { const g = act(t, mood(t, MOODS, guyOpts)), up = E.outCubic(clamp((t - tLink + 0.08) / 0.2)); g.y -= 40 * up; g.bob = (g.bob || 0) + Math.sin(t * 3.1) * 4; g.headTilt = (g.headTilt || 0) + Math.sin(t * 1.9 + 0.5) * 2.5; return g; } };
})();

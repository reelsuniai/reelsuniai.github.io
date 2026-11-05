/* @shortsuni mascot — original character drawn in code (no image generation, nothing traced from the reference).
 * Young creator: dark hair, red hoodie with the S logo badge, red headphones around the neck.
 * MASCOT.draw(ctx, t, opts): poses switch with a 5-frame spring (overshoot), mouth follows the voice, blinks, halftone shadow.
 * Poses: idle, point, palms, shrug, present, chin, thumbs, facepalm, hype.
 */
(function () {
  const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
  const lerp = (a, b, k) => a + (b - a) * k;
  const outBack = (k, s = 1.6) => 1 + (s + 1) * Math.pow(k - 1, 3) + s * Math.pow(k - 1, 2);
  const INK = '#2A1A14', SKIN = '#F4C7A6', SKIN2 = '#E3A986', HAIR = '#2B1D16', RED = '#E10A0F', RED2 = '#A9070B', RED3 = '#7E0508';
  // arm = [elbowX, elbowY, handX, handY, handShape, handAngleDeg]; face = {brow, tilt, eyes}
  const DOWN_L = [-235, 250, -205, 440, 'fist', 90], DOWN_R = [235, 250, 205, 440, 'fist', 90];
  const POSES = {
    idle: { L: DOWN_L, R: DOWN_R, brow: 0, tilt: 0 },
    point: { L: [-300, -10, -300, -250, 'point', -90], R: DOWN_R, brow: 6, tilt: -4 },
    palms: { L: [-300, 160, -390, 60, 'palm', -125], R: [300, 160, 390, 60, 'palm', -55], brow: 4, tilt: 0 },
    shrug: { L: [-320, 70, -370, -95, 'palm', -115], R: [320, 70, 370, -95, 'palm', -65], brow: 10, tilt: 7 },
    present: { L: [-330, 10, -480, -170, 'palm', -150], R: DOWN_R, brow: 3, tilt: -6, gaze: [-7, -4] },
    chin: { L: DOWN_L, R: [230, 250, 70, -55, 'fist', -120], brow: -6, tilt: 5, gaze: [-5, -6] },
    thumbs: { L: [-290, 150, -335, 0, 'thumb', -90], R: DOWN_R, brow: 5, tilt: -3 },
    facepalm: { L: DOWN_L, R: [210, 130, 45, -175, 'palm', -95], brow: -8, tilt: 6, eyes: 'closed' },
    hype: { L: [-320, -30, -345, -235, 'fist', -90], R: [320, -30, 345, -235, 'fist', -90], brow: 10, tilt: 0, mouth: 0.8 },
  };
  function lerpPose(A, B, k) {
    const arm = (a, b) => [lerp(a[0], b[0], k), lerp(a[1], b[1], k), lerp(a[2], b[2], k), lerp(a[3], b[3], k), k < 0.5 ? a[4] : b[4], lerp(a[5], b[5], k)];
    return { L: arm(A.L, B.L), R: arm(A.R, B.R), brow: lerp(A.brow, B.brow, k), tilt: lerp(A.tilt, B.tilt, k), gaze: [lerp((A.gaze || [0, 0])[0], (B.gaze || [0, 0])[0], k), lerp((A.gaze || [0, 0])[1], (B.gaze || [0, 0])[1], k)], eyes: k < 0.5 ? A.eyes : B.eyes, mouth: lerp(A.mouth || 0, B.mouth || 0, k) };
  }
  function blob(ctx, fill, lw = 7) { ctx.fillStyle = fill; ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = lw; ctx.lineJoin = 'round'; ctx.stroke(); }
  function hand(ctx, x, y, shape, ang) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(((ang + 90) * Math.PI) / 180);
    const cap = (x0, y0, len, r, a) => { ctx.save(); ctx.translate(x0, y0); ctx.rotate(a); ctx.beginPath(); ctx.roundRect(-r, -len, 2 * r, len + r, r); blob(ctx, SKIN, 6); ctx.restore(); };
    if (shape === 'palm') { [-0.42, -0.14, 0.14, 0.4].forEach((a, i) => cap(Math.sin(a) * 26, -18, 44 - Math.abs(i - 1.5) * 5, 11, a)); cap(-30, 6, 30, 11, -1.15); }
    if (shape === 'point') { cap(4, -20, 58, 11, 0); }
    if (shape === 'thumb') { cap(-4, -22, 40, 12, -0.15); }
    ctx.beginPath(); ctx.ellipse(0, 4, 36, 32, 0, 0, 7); blob(ctx, SKIN, 6);
    if (shape === 'fist' || shape === 'point' || shape === 'thumb') { ctx.strokeStyle = SKIN2; ctx.lineWidth = 4; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(14, -10 + i * 12); ctx.lineTo(30, -8 + i * 12); ctx.stroke(); } }
    ctx.restore();
  }
  function arm(ctx, sx, sy, a) {
    const [ex, ey, hx, hy, shape, ang] = a;
    ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    const path = () => { ctx.beginPath(); ctx.moveTo(sx, sy); ctx.quadraticCurveTo(ex, ey, hx, hy); };
    path(); ctx.strokeStyle = INK; ctx.lineWidth = 86; ctx.stroke();
    path(); ctx.strokeStyle = RED; ctx.lineWidth = 72; ctx.stroke();
    path(); ctx.strokeStyle = 'rgba(0,0,0,0.12)'; ctx.lineWidth = 22; ctx.translate(10, 8); ctx.stroke(); ctx.translate(-10, -8);
    // white cuff
    const dx = hx - ex, dy = hy - ey, L = Math.hypot(dx, dy) || 1, cx = hx - (dx / L) * 34, cy = hy - (dy / L) * 34;
    ctx.beginPath(); ctx.arc(cx, cy, 40, 0, 7); blob(ctx, '#F4F1EE', 6);
    ctx.restore();
    hand(ctx, hx, hy, shape, ang);
  }
  function torso(ctx, logo) {
    ctx.beginPath(); ctx.moveTo(-120, 0); ctx.bezierCurveTo(-60, -12, 60, -12, 120, 0); ctx.bezierCurveTo(200, 10, 236, 50, 240, 120); ctx.lineTo(262, 560); ctx.lineTo(-262, 560); ctx.lineTo(-240, 120); ctx.bezierCurveTo(-236, 50, -200, 10, -120, 0); ctx.closePath();
    const g = ctx.createLinearGradient(-250, 0, 250, 0); g.addColorStop(0, RED2); g.addColorStop(0.45, RED); g.addColorStop(1, RED2); blob(ctx, g, 8);
    // hood collar
    ctx.beginPath(); ctx.ellipse(0, 18, 128, 46, 0, 0, 7); blob(ctx, RED3, 7);
    // drawstrings
    ctx.strokeStyle = '#F4F1EE'; ctx.lineWidth = 9; ctx.lineCap = 'round';
    [[-34, 40, -40, 150], [34, 40, 42, 160]].forEach(([a, b, c, d]) => { ctx.beginPath(); ctx.moveTo(a, b); ctx.quadraticCurveTo(a - 4, (b + d) / 2, c, d); ctx.stroke(); });
    // logo badge on the chest
    ctx.beginPath(); ctx.arc(110, 190, 52, 0, 7); blob(ctx, '#FFFFFF', 6);
    if (logo) { ctx.save(); ctx.imageSmoothingEnabled = true; ctx.beginPath(); ctx.arc(110, 190, 46, 0, 7); ctx.clip(); ctx.drawImage(logo, 64, 144, 92, 92); ctx.restore(); }
    // kangaroo pocket seam
    ctx.strokeStyle = RED3; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-150, 380); ctx.quadraticCurveTo(0, 340, 150, 380); ctx.stroke();
  }
  function head(ctx, P, mouth, blink) {
    ctx.save(); ctx.translate(0, -175); ctx.rotate((P.tilt * Math.PI) / 180);
    // neck
    ctx.beginPath(); ctx.roundRect(-46, 70, 92, 110, 20); blob(ctx, SKIN2, 7);
    // ears
    [-1, 1].forEach((s) => { ctx.beginPath(); ctx.ellipse(s * 122, 10, 24, 34, 0, 0, 7); blob(ctx, SKIN, 6); });
    // face
    ctx.beginPath(); ctx.moveTo(-118, -40); ctx.bezierCurveTo(-125, 80, -70, 150, 0, 152); ctx.bezierCurveTo(70, 150, 125, 80, 118, -40); ctx.bezierCurveTo(110, -150, -110, -150, -118, -40); ctx.closePath();
    const g = ctx.createRadialGradient(-30, -20, 20, 0, 20, 170); g.addColorStop(0, '#F9D6BD'); g.addColorStop(1, SKIN2); blob(ctx, g, 8);
    // hair
    ctx.beginPath(); ctx.moveTo(-124, -20); ctx.bezierCurveTo(-150, -150, -40, -205, 30, -190); ctx.bezierCurveTo(120, -180, 150, -110, 124, -20);
    ctx.lineTo(108, -60); ctx.lineTo(84, -82); ctx.lineTo(60, -70); ctx.lineTo(30, -96); ctx.lineTo(0, -78); ctx.lineTo(-30, -100); ctx.lineTo(-62, -76); ctx.lineTo(-92, -88); ctx.lineTo(-110, -55); ctx.closePath(); blob(ctx, HAIR, 8);
    ctx.strokeStyle = '#4A352A'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(-40, -160); ctx.quadraticCurveTo(10, -175, 60, -150); ctx.stroke();
    // eyes
    const ey = -5, gx = (P.gaze || [0, 0])[0], gy = (P.gaze || [0, 0])[1], closed = blink || P.eyes === 'closed';
    [-1, 1].forEach((s) => {
      if (closed) { ctx.strokeStyle = INK; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(s * 50 - 22, ey + 4); ctx.quadraticCurveTo(s * 50, ey + 14, s * 50 + 22, ey + 4); ctx.stroke(); return; }
      ctx.beginPath(); ctx.ellipse(s * 50, ey, 25, 30, 0, 0, 7); blob(ctx, '#FFFFFF', 6);
      ctx.fillStyle = '#3A2418'; ctx.beginPath(); ctx.arc(s * 50 + gx, ey + 3 + gy, 14, 0, 7); ctx.fill();
      ctx.fillStyle = '#FFFFFF'; ctx.beginPath(); ctx.arc(s * 50 + gx + 5, ey - 3 + gy, 5, 0, 7); ctx.fill();
    });
    // brows
    ctx.strokeStyle = HAIR; ctx.lineWidth = 12; ctx.lineCap = 'round';
    [-1, 1].forEach((s) => { ctx.beginPath(); ctx.moveTo(s * 28, ey - 44 - P.brow * 0.4); ctx.lineTo(s * 74, ey - 48 - P.brow * (s > 0 ? 1 : 1) + (P.brow < 0 ? -P.brow * 0.9 : 0)); ctx.stroke(); });
    // nose + cheeks
    ctx.strokeStyle = SKIN2; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-4, 30); ctx.quadraticCurveTo(10, 50, -6, 58); ctx.stroke();
    ctx.fillStyle = 'rgba(240,120,110,0.28)'; [-1, 1].forEach((s) => { ctx.beginPath(); ctx.ellipse(s * 74, 52, 20, 12, 0, 0, 7); ctx.fill(); });
    // mouth
    const m = clamp(Math.max(mouth, P.mouth || 0));
    if (m < 0.08) { ctx.strokeStyle = INK; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(-30, 92); ctx.quadraticCurveTo(0, 112, 30, 92); ctx.stroke(); }
    else { const h = 10 + 34 * m; ctx.beginPath(); ctx.moveTo(-34, 88); ctx.quadraticCurveTo(0, 88 + h * 1.6, 34, 88); ctx.quadraticCurveTo(0, 80, -34, 88); blob(ctx, '#6E1A1A', 6); ctx.fillStyle = '#E86A6A'; ctx.beginPath(); ctx.ellipse(0, 88 + h * 0.75, 16, h * 0.28, 0, 0, 7); ctx.fill(); }
    ctx.restore();
  }
  function headphones(ctx) {
    ctx.strokeStyle = INK; ctx.lineWidth = 22; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-88, -50); ctx.quadraticCurveTo(0, 20, 88, -50); ctx.stroke();
    ctx.strokeStyle = '#2E2E33'; ctx.lineWidth = 13; ctx.beginPath(); ctx.moveTo(-88, -50); ctx.quadraticCurveTo(0, 20, 88, -50); ctx.stroke();
    [-1, 1].forEach((s) => { ctx.beginPath(); ctx.ellipse(s * 92, -46, 26, 34, s * 0.5, 0, 7); blob(ctx, RED, 6); ctx.beginPath(); ctx.ellipse(s * 92, -46, 13, 19, s * 0.5, 0, 7); ctx.fillStyle = RED3; ctx.fill(); });
  }
  let CV = null, SH = null, PAT = null;
  function drawChar(x, P, mouth, blink, logo) {
    x.save(); x.translate(650, 640);
    const inFront = (a) => a[3] < 120 && a[2] > -150 && a[2] < 150;   // hand near the face: draw that arm over the head
    const back = [], front = [];
    [['L', -170], ['R', 170]].forEach(([k, sx]) => (inFront(P[k]) ? front : back).push([sx, P[k]]));
    torso(x, logo);
    back.forEach(([sx, a]) => arm(x, sx, 40, a));
    head(x, P, mouth, blink);
    headphones(x);
    front.forEach(([sx, a]) => arm(x, sx, 40, a));
    x.restore();
  }
  window.MASCOT = {
    draw(ctx, t, o) {   // o: {x, y, scale, poses:[[t0, name]], speaking(t)->0..1, logo}
      if (!CV) { CV = document.createElement('canvas'); CV.width = 1300; CV.height = 1250; SH = document.createElement('canvas'); SH.width = 1300; SH.height = 1250;
        const tile = document.createElement('canvas'); tile.width = tile.height = 10; const tx = tile.getContext('2d'); tx.fillStyle = 'rgba(20,16,16,0.55)'; tx.beginPath(); tx.arc(5, 5, 2.8, 0, 7); tx.fill(); PAT = tile; }
      let cur = ['idle', -1], prev = ['idle', -1];
      for (const [t0, name] of o.poses) if (t >= t0) { prev = cur; cur = [name, t0]; }
      const k = clamp((t - cur[1]) / (8 / 30));
      const P = cur[1] < 0 ? lerpPose(POSES[cur[0]] || POSES.idle, POSES[cur[0]] || POSES.idle, 1) : lerpPose(POSES[prev[0]] || POSES.idle, POSES[cur[0]] || POSES.idle, outBack(k, 1.25));
      // continuous life: talking hands, head nods on words, sway (never a still frame)
      const e = o.energy ? o.energy(t) : 0;
      ['L', 'R'].forEach((side, si) => { const a = P[side].slice(), up = a[3] < 300, ph = si * 1.9;
        const g = (up ? 1.5 : 0.5) * (0.45 + e);
        a[2] += Math.sin(t * 6.3 + ph) * 16 * g; a[3] += Math.cos(t * 5.1 + ph) * 13 * g; a[0] += Math.sin(t * 4.7 + ph) * 9 * g; a[1] += Math.cos(t * 4.2 + ph) * 9 * g; a[5] += Math.sin(t * 7.1 + ph) * 10 * g;
        P[side] = a; });
      P.tilt = (P.tilt || 0) + (o.nod ? o.nod(t) : 0) + Math.sin(t * 1.6) * 2;
      P.gaze = [(P.gaze || [0, 0])[0] + Math.sin(t * 0.8) * 2, (P.gaze || [0, 0])[1]];
      const blink = ((t + 1.4) % 3.1) < 0.09 || ((t + 0.3) % 4.7) < 0.07;
      const x = CV.getContext('2d'); x.setTransform(1, 0, 0, 1, 0, 0); x.clearRect(0, 0, 1300, 1250);
      drawChar(x, P, e, blink, o.logo);
      // halftone shadow: the silhouette filled with dots, offset down-right (bible §6)
      const s = SH.getContext('2d'); s.setTransform(1, 0, 0, 1, 0, 0); s.globalCompositeOperation = 'source-over'; s.clearRect(0, 0, 1300, 1250); s.drawImage(CV, 0, 0);
      s.globalCompositeOperation = 'source-in'; s.fillStyle = s.createPattern(PAT, 'repeat'); s.fillRect(0, 0, 1300, 1250);
      const bob = Math.sin(t * Math.PI * 2 * 0.9) * 5 - e * 6;
      ctx.save(); ctx.translate(o.x, o.y + bob); ctx.scale(o.scale, o.scale);
      ctx.drawImage(SH, -650 + 18, -640 + 14); ctx.drawImage(CV, -650, -640);
      ctx.restore();
    },
    POSES: Object.keys(POSES),
  };
})();

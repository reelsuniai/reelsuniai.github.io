// ═════════════ more props for the case (loaded after law_kit.js; every helper prefixed lk) ═════════════
// Desk clutter for the weekend build, a keyboard Tab keycap (how a screen reader user moves), data icons for the privacy ledger,
// a cookie that crumbles, a session-replay scrubber, and the pre-launch checklist card for the CTA.

// ── coffee mug with steam (local, bottom-centre at 0,0) ──
function lkMug(T, K, t, o = {}) {
  const col = o.col || '#FFFFFF';
  // contact shadow
  K.save();
  T.beginPath();
  T.ellipse(8, 6, 70, 14, 0, 0, TAU);
  T.fillStyle = C.k30;
  T.fill();
  K.restore();
  // handle
  K.save();
  K.lineWidth = 14;
  K.strokeStyle = C.ink;
  K.beginPath();
  K.arc(58, -62, 30, -Math.PI / 2, Math.PI / 2);
  K.stroke();
  K.lineWidth = 6;
  K.strokeStyle = col;
  K.stroke();
  K.restore();
  // body
  fillRR(K, -60, -130, 120, 130, 18, col);
  strokeRR(K, -60, -130, 120, 130, 18, C.ink, 4);
  fillRR(K, -60, -96, 120, 26, 0, C.red);
  K.beginPath();
  K.ellipse(0, -130, 60, 12, 0, 0, TAU);
  K.fillStyle = '#5E3A1A';
  K.fill();
  K.lineWidth = 4;
  K.strokeStyle = C.ink;
  K.stroke();
  if (o.label) lkMono(K, o.label, 0, -40, { size: 18, color: C.ink, align: 'center' });
  steam(K, 0, -150, t, { n: 3, h: 90, a: 0.55, col: '#8a8780', gap: 26, lw: 5 });
}

// ── energy can (local, bottom-centre at 0,0); crushed 0..1 squashes it ──
function lkCan(T, K, t, crushed = 0) {
  const h = lerp(150, 90, crushed),
    w = lerp(64, 78, crushed);
  T.beginPath();
  T.ellipse(6, 4, 46, 10, 0, 0, TAU);
  T.fillStyle = C.k30;
  T.fill();
  fillRR(K, -w / 2, -h, w, h, 12, '#2F3A4A');
  strokeRR(K, -w / 2, -h, w, h, 12, C.ink, 4);
  fillRR(K, -w / 2, -h * 0.66, w, h * 0.3, 0, C.red);
  text(K, '⚡', 0, -h * 0.45, { font: F.grot, weight: 700, size: 30, color: '#FFFFFF', align: 'center' });
  K.beginPath();
  K.ellipse(0, -h, w / 2, 8, 0, 0, TAU);
  K.fillStyle = '#B7AFA0';
  K.fill();
  K.stroke();
}

// ── a weekend timer card: counts the hours spent building; hot when it rolls past 48 ──
function lkTimerCard(T, K, t, hours, hot) {
  uiCard(T, K, -150, -60, 300, 120, { r: 22, border: hot ? C.red : C.ink, lw: 4 });
  lkMono(K, '// time spent', -126, -22, { size: 18 });
  const h = Math.floor(hours),
    m = Math.floor((hours - h) * 60);
  const str = String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0') + ' h';
  text(K, str, -126, 38, { font: F.mono, weight: 700, size: 44, color: hot ? C.red : C.ink, align: 'left' });
  liveDot(K, 120, -30, 7, t);
}

// ── keyboard keycap (local centre): label, pressed 0..1 pushes it down; o.hot paints it accent ──
function lkKeycap(T, K, label, pressed, o = {}) {
  const w = o.w || 170,
    h = o.h || 110,
    d = 22 * (1 - pressed);
  fillRR(T, -w / 2 + 10, -h / 2 + 22, w, h, 22, C.k45);
  fillRR(K, -w / 2, -h / 2 + 18, w, h, 22, '#BDB8AE');
  strokeRR(K, -w / 2, -h / 2 + 18, w, h, 22, C.ink, 4);
  const top = -h / 2 + 18 - d;
  fillRR(K, -w / 2, top, w, h, 22, o.hot ? C.red : '#FFFFFF');
  strokeRR(K, -w / 2, top, w, h, 22, C.ink, 4);
  text(K, label, -w / 2 + 26, top + h / 2 + 14, {
    font: F.grot,
    weight: 700,
    size: 38,
    color: o.hot ? '#FFFFFF' : C.ink,
    align: 'left',
  });
  // the tab arrow glyph
  const ax = w / 2 - 50,
    ay = top + h / 2;
  line(K, ax - 24, ay, ax + 10, ay, o.hot ? '#FFFFFF' : C.ink, 5);
  line(K, ax + 10, ay, ax - 2, ay - 12, o.hot ? '#FFFFFF' : C.ink, 5);
  line(K, ax + 10, ay, ax - 2, ay + 12, o.hot ? '#FFFFFF' : C.ink, 5);
  line(K, ax + 16, ay - 16, ax + 16, ay + 16, o.hot ? '#FFFFFF' : C.ink, 5);
}

// ── data icons for the privacy ledger (local centre, ~s px) ──
function lkIconPin(K, s, col) {
  K.save();
  K.beginPath();
  K.moveTo(0, s * 0.5);
  K.bezierCurveTo(-s * 0.55, -s * 0.05, -s * 0.4, -s * 0.5, 0, -s * 0.5);
  K.bezierCurveTo(s * 0.4, -s * 0.5, s * 0.55, -s * 0.05, 0, s * 0.5);
  K.closePath();
  K.fillStyle = col;
  K.fill();
  K.lineWidth = 3;
  K.strokeStyle = C.ink;
  K.stroke();
  circle(K, 0, -s * 0.18, s * 0.14, '#FFFFFF');
  K.restore();
}
function lkIconDevice(K, s, col) {
  fillRR(K, -s * 0.3, -s * 0.5, s * 0.6, s, s * 0.12, col);
  strokeRR(K, -s * 0.3, -s * 0.5, s * 0.6, s, s * 0.12, C.ink, 3);
  fillRR(K, -s * 0.22, -s * 0.38, s * 0.44, s * 0.66, 4, '#FFFFFF');
  circle(K, 0, s * 0.4, s * 0.05, '#FFFFFF');
}
function lkIconContacts(K, s, col) {
  fillRR(K, -s * 0.42, -s * 0.5, s * 0.84, s, s * 0.1, col);
  strokeRR(K, -s * 0.42, -s * 0.5, s * 0.84, s, s * 0.1, C.ink, 3);
  circle(K, 0, -s * 0.12, s * 0.17, '#FFFFFF');
  K.beginPath();
  K.ellipse(0, s * 0.28, s * 0.28, s * 0.16, 0, Math.PI, 0);
  K.fillStyle = '#FFFFFF';
  K.fill();
}
function lkIconMail(K, s, col) {
  fillRR(K, -s * 0.48, -s * 0.32, s * 0.96, s * 0.64, 6, col);
  strokeRR(K, -s * 0.48, -s * 0.32, s * 0.96, s * 0.64, 6, C.ink, 3);
  K.beginPath();
  K.moveTo(-s * 0.48, -s * 0.32);
  K.lineTo(0, s * 0.06);
  K.lineTo(s * 0.48, -s * 0.32);
  K.lineWidth = 3;
  K.strokeStyle = C.ink;
  K.stroke();
}

// ── cookie (local centre, radius r) with chips; crumble 0..1 breaks it into falling pieces ──
function lkCookie(T, K, r, t, crumble = 0, seed = 5) {
  const R = rng(seed);
  if (crumble <= 0) {
    circle(T, 6, 10, r, C.k30);
    K.save();
    K.beginPath();
    for (let k = 0; k <= 20; k++) {
      const a = (k / 20) * TAU,
        rr2 = r * (0.92 + 0.08 * Math.sin(k * 2.7));
      K.lineTo(Math.cos(a) * rr2, Math.sin(a) * rr2);
    }
    K.closePath();
    K.fillStyle = '#D9A45B';
    K.fill();
    K.lineWidth = 4;
    K.strokeStyle = C.ink;
    K.stroke();
    K.restore();
    for (let k = 0; k < 7; k++) {
      const a = R() * TAU,
        d = R() * r * 0.65;
      circle(K, Math.cos(a) * d, Math.sin(a) * d, r * 0.1, '#5E3A1A');
    }
    return;
  }
  // crumbled: wedges fly apart and fall
  for (let k = 0; k < 6; k++) {
    const a0 = (k / 6) * TAU,
      a1 = ((k + 1) / 6) * TAU,
      am = (a0 + a1) / 2;
    const fx = Math.cos(am) * 160 * crumble,
      fy = Math.sin(am) * 60 * crumble + 900 * crumble * crumble;
    K.save();
    K.translate(fx, fy);
    K.rotate(crumble * (k % 2 ? 2 : -2));
    K.beginPath();
    K.moveTo(0, 0);
    K.arc(0, 0, r, a0, a1);
    K.closePath();
    K.fillStyle = '#D9A45B';
    K.fill();
    K.lineWidth = 4;
    K.strokeStyle = C.ink;
    K.stroke();
    K.restore();
  }
}

// ── session-replay scrubber (x, y = top-left, w): a film strip of frames with a running playhead, "replaying visitor #n" ──
function lkScrubber(T, K, x, y, w, t, t0) {
  const h = 110;
  uiCard(T, K, x, y, w, h, { r: 20, border: C.ink, lw: 3 });
  lkMono(K, '// session replay', x + 20, y + 32, { size: 18, color: C.ink });
  const n = 7,
    fw = (w - 40) / n;
  for (let k = 0; k < n; k++) {
    const fx = x + 20 + k * fw;
    fillRR(K, fx + 3, y + 46, fw - 6, 46, 6, k % 2 ? '#E6E3DC' : '#F3F1EC');
    skeleton(K, fx + 10, y + 60, [fw - 26, fw - 40], { gap: 14, h: 6 });
  }
  const p = ((t - t0) * 0.35) % 1,
    px = x + 20 + p * (w - 40);
  line(K, px, y + 40, px, y + 98, C.red, 5);
  circle(K, px, y + 40, 8, C.red);
  const sec = Math.floor((t - t0) * 7) % 60;
  lkMono(K, '00:' + String(sec).padStart(2, '0'), x + w - 20, y + 32, {
    size: 18,
    color: C.red,
    align: 'right',
  });
}

// ── pre-launch checklist card (local top-left at 0,0, width w): rows tick on their times ──
function lkChecklist(T, K, w, t, rows) {
  const rh = 62,
    h = 86 + rows.length * rh;
  uiCard(T, K, 0, 0, w, h, { r: 26, border: C.ink, lw: 4 });
  lkMono(K, '// pre-launch checklist', 26, 40, { size: 20, color: C.ink });
  const done = rows.filter((r) => t >= r.t).length;
  text(K, `${done}/${rows.length}`, w - 26, 42, {
    font: F.mono,
    weight: 700,
    size: 24,
    color: done ? C.red : C.ink,
    align: 'right',
  });
  rows.forEach((r, k) => {
    const y = 70 + k * rh,
      on = t >= r.t,
      p = clamp((t - r.t) / 0.18);
    const pop2 = on ? 1 + ring(t - r.t, 5, 9) * 0.15 : 1;
    X([K], 44, y + rh / 2, pop2, 0, () => {
      if (on) fillRR(K, -18, -18, 36, 36, 10, C.red);
      else strokeRR(K, -18, -18, 36, 36, 10, '#CFCBC2', 3);
      check(K, 0, 1, 22, p, '#FFFFFF', 5);
    });
    text(K, r.tag, 80, y + rh / 2 + 9, {
      font: F.anton,
      weight: 400,
      size: 30,
      color: on ? C.red : '#B9B5AC',
      align: 'left',
    });
    text(K, r.txt, 112, y + rh / 2 + 10, {
      font: F.grot,
      weight: 500,
      size: 28,
      color: on ? C.ink : '#8a8780',
      align: 'left',
    });
  });
  return h;
}

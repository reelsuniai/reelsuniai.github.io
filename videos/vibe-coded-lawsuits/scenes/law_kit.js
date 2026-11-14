// ═════════════ shared props for "why vibe-coded apps get sued" (loaded first; every helper is prefixed lk) ═════════════
// The reel's world: a court case against your app. Exhibit tags, a sealed evidence envelope, push pins, red yarn, masked user
// records, faceless avatars, a tracker pixel bug, a gavel, cracked glass, streaming code. Every function is a pure function of
// its arguments (and t), draws shadows on T and ink on K, and works in local coordinates unless it says otherwise.

const LK = {
  manila: '#F2DFB4',
  manilaD: '#D9C08C',
  grey: '#8a8780',
  warm: '#F3F1EC',
  warm2: '#E6E3DC',
  dark: '#15161A',
};
const lkMono = (K, s, x, y, o = {}) =>
  text(K, s, x, y, Object.assign({ font: F.mono, weight: 700, size: 22, color: LK.grey, align: 'left' }, o));
const lkBold = (K, s, x, y, o = {}) =>
  text(
    K,
    s,
    x,
    y,
    Object.assign({ font: F.grot, weight: 700, size: 44, color: C.ink, align: 'left', ls: -1 }, o),
  );
// decaying swing in degrees for something that was hung / hit at t0, plus a small idle sway forever after
const lkSwing = (t, t0, amp = 18, seed = 0) =>
  t < t0
    ? 0
    : pendulum(t - t0, amp, 1.25, 2.2) + Math.sin(t * 1.9 + seed) * 1.6 * clamp((t - t0 - 0.6) / 0.6);
// a slap-in scale (big → 1 with a ring) for stickers and stamps that land on a word
const lkSlap = (dt, from = 1.8) =>
  dt <= 0 ? 0 : dt < 0.12 ? lerp(from, 1, E.inQuart(dt / 0.12)) : 1 + ring(dt - 0.12, 5, 10) * 0.06;
// time since the latest of several events (for "the newest" accents)
const lkSince = (t, times) => {
  let b = -1e9;
  for (const x of times) if (x <= t && x > b) b = x;
  return t - b;
};

// ── push pin (scene/local coords): red head, highlight, tiny shadow ──
function lkPin(T, K, x, y, s = 1, col = C.red) {
  circle(T, x + 5 * s, y + 7 * s, 15 * s, C.k30);
  circle(K, x, y, 15 * s, col, C.ink, 3);
  circle(K, x - 5 * s, y - 5 * s, 4.5 * s, 'rgba(255,255,255,0.75)');
}

// ── exhibit tag: hangs from a pin at (0,0) on a short string, swing angle `sw` (deg). o: letter, hot, label, sealed, w, h ──
function lkTag(T, K, sw, o = {}) {
  const w = o.w || 190,
    h = o.h || 240,
    L = o.str ?? 46;
  X([T, K], 0, 0, 1, sw, () => {
    line(K, 0, 0, 0, L, C.ink, 3);
    const y0 = L;
    // tag body: a manila card with clipped top corners
    const path = (c) => {
      c.beginPath();
      c.moveTo(-w / 2 + 34, y0);
      c.lineTo(w / 2 - 34, y0);
      c.lineTo(w / 2, y0 + 34);
      c.lineTo(w / 2, y0 + h);
      c.lineTo(-w / 2, y0 + h);
      c.lineTo(-w / 2, y0 + 34);
      c.closePath();
    };
    T.save();
    T.translate(10, 16);
    path(T);
    T.fillStyle = C.k45;
    T.fill();
    T.restore();
    path(K);
    K.fillStyle = o.hot ? C.red : LK.manila;
    K.fill();
    K.lineWidth = 4;
    K.strokeStyle = C.ink;
    K.stroke();
    circle(K, 0, y0 + 26, 9, '#FFFFFF', C.ink, 3); // the eyelet
    lkMono(K, o.label || 'EXHIBIT', 0, y0 + 74, {
      size: 22,
      color: o.hot ? '#FFE3DC' : '#6E6248',
      align: 'center',
    });
    if (o.sealed) {
      text(K, '?', 0, y0 + h - 44, {
        font: F.serif,
        italic: true,
        weight: 400,
        size: 150,
        color: o.hot ? '#FFFFFF' : C.red,
        align: 'center',
      });
    } else {
      text(K, o.letter || 'A', 0, y0 + h - 40, {
        font: F.anton,
        weight: 400,
        size: 132,
        color: o.hot ? '#FFFFFF' : C.ink,
        align: 'center',
      });
    }
    line(K, -w / 2 + 24, y0 + 92, w / 2 - 24, y0 + 92, o.hot ? 'rgba(255,255,255,0.5)' : LK.manilaD, 3);
  });
}

// ── sealed evidence envelope (local, centred): kraft body, flap, red wax seal with a label; open 0..1 tears the flap up ──
function lkEnvelope(T, K, w, h, o = {}) {
  const open = clamp(o.open || 0),
    lab = o.label || 'SEALED';
  fillRR(T, -w / 2 + 14, -h / 2 + 22, w, h, 18, C.k45);
  fillRR(K, -w / 2, -h / 2, w, h, 18, o.fill || '#E9D7AE');
  strokeRR(K, -w / 2, -h / 2, w, h, 18, C.ink, 4);
  // diagonal fold lines
  K.save();
  K.strokeStyle = 'rgba(17,17,17,0.25)';
  K.lineWidth = 3;
  K.beginPath();
  K.moveTo(-w / 2 + 10, h / 2 - 10);
  K.lineTo(0, 10);
  K.lineTo(w / 2 - 10, h / 2 - 10);
  K.stroke();
  K.restore();
  // flap (rotates up around the top edge when opening)
  const fy = -h / 2,
    fh = h * 0.55 * Math.cos(open * Math.PI);
  K.beginPath();
  K.moveTo(-w / 2, fy);
  K.lineTo(0, fy + fh);
  K.lineTo(w / 2, fy);
  K.closePath();
  K.fillStyle = open > 0.5 ? '#D6C08F' : '#F1E2BE';
  K.fill();
  K.lineWidth = 4;
  K.strokeStyle = C.ink;
  K.stroke();
  if (o.lines)
    for (let i = 0; i < 3; i++)
      fillRR(
        K,
        -w / 2 + 40,
        h / 2 - 120 + i * 30,
        (w - 80) * [0.7, 0.5, 0.6][i],
        12,
        6,
        'rgba(17,17,17,0.18)',
      );
  if (open < 0.35) {
    // wax seal on the flap tip
    const sx = 0,
      sy = fy + fh - 6,
      r = Math.min(w, h) * 0.16;
    X([K], sx, sy, 1 - open * 2, o.sealRot || 0, () => {
      K.beginPath();
      for (let k = 0; k < 14; k++) {
        const a = (k / 14) * TAU,
          rr2 = r * (k % 2 ? 0.9 : 1.04);
        K.lineTo(Math.cos(a) * rr2, Math.sin(a) * rr2);
      }
      K.closePath();
      K.fillStyle = C.red;
      K.fill();
      K.lineWidth = 3;
      K.strokeStyle = C.redD;
      K.stroke();
      circle(K, 0, 0, r * 0.68, null, 'rgba(255,255,255,0.55)', 2.5);
      text(K, lab, 0, r * 0.14, {
        font: F.mono,
        weight: 700,
        size: Math.max(14, r * 0.34),
        color: '#FFFFFF',
        align: 'center',
      });
    });
  }
  if (o.title) lkMono(K, o.title, -w / 2 + 28, h / 2 - 28, { size: 22, color: '#6E6248' });
}

// ── red yarn between two scene points, sagging like a string; p 0..1 draws it from a to b ──
function lkYarn(K, a, b, p, sag = 60, t = 0) {
  if (p <= 0) return;
  const mid = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2 + sag + Math.sin(t * 2.4) * 6];
  K.save();
  K.strokeStyle = C.red;
  K.lineWidth = 5;
  K.lineCap = 'round';
  K.beginPath();
  K.moveTo(a[0], a[1]);
  const N = 24;
  for (let i = 1; i <= Math.ceil(N * p); i++) {
    const u = Math.min(i / N, p),
      q = 1 - u;
    K.lineTo(
      q * q * a[0] + 2 * q * u * mid[0] + u * u * b[0],
      q * q * a[1] + 2 * q * u * mid[1] + u * u * b[1],
    );
  }
  K.stroke();
  K.restore();
}

// ── faceless avatar (head + shoulders) in a circle; seed picks the shirt tone; o.ring draws an accent ring ──
function lkAvatar(K, x, y, r, seed = 0, o = {}) {
  const R = rng(17 + seed * 13),
    shirts = ['#4A5260', '#B7AFA0', '#2F3A4A', '#8E8676', '#5D6B5A'],
    skins = ['#F1C9A5', '#D9A47C', '#A9714B', '#7A4E31', '#EBC2A0'];
  circle(K, x, y, r, o.fill || '#FFFFFF', o.ring || C.ink, o.ring ? 5 : 3);
  K.save();
  K.beginPath();
  K.arc(x, y, r - 2, 0, TAU);
  K.clip();
  const sh = shirts[Math.floor(R() * shirts.length)],
    sk = skins[Math.floor(R() * skins.length)];
  K.beginPath();
  K.ellipse(x, y + r * 0.95, r * 0.75, r * 0.55, 0, 0, TAU);
  K.fillStyle = sh;
  K.fill();
  circle(K, x, y - r * 0.12, r * 0.36, sk);
  K.restore();
  if (o.rec) {
    circle(K, x + r * 0.72, y - r * 0.72, r * 0.26, C.red, '#FFFFFF', 3);
  }
}

// ── masked user record row (local x,y = top-left): avatar, name bar, masked email, a tiny card number ──
function lkUserRow(K, x, y, w, i, o = {}) {
  const h = o.h || 74,
    hot = o.hot;
  fillRR(K, x, y, w, h, 16, hot ? '#FFF0EC' : '#FFFFFF');
  strokeRR(K, x, y, w, h, 16, hot ? C.red : HAIR, 3);
  lkAvatar(K, x + 40, y + h / 2, 24, i);
  const names = [
    'maya_k',
    'j.ortiz',
    'sam.lee',
    'aditi.r',
    'tom_b',
    'lena.v',
    'chris.p',
    'noor.a',
    'ben.w',
    'yuki.t',
  ];
  lkMono(K, names[i % names.length], x + 80, y + 32, { size: 24, color: C.ink, weight: 700 });
  lkMono(K, '•••••@' + ['gmail', 'proton', 'outlook', 'icloud'][i % 4] + '.com', x + 80, y + 60, {
    size: 20,
    color: LK.grey,
    weight: 500,
  });
  if (w > 420)
    lkMono(K, '•••• ' + String(1000 + ((i * 7919) % 9000)).slice(0, 4), x + w - 24, y + 46, {
      size: 22,
      color: hot ? C.red : LK.grey,
      align: 'right',
    });
}

// ── little red flag on a pole (planted at x,y); p = raise 0..1, flutter with t ──
function lkFlag(K, x, y, p, t, seed = 0) {
  if (p <= 0) return;
  const hgt = 70 * clamp(p * 1.2),
    fl = Math.sin(t * 9 + seed) * 6;
  line(K, x, y, x, y - hgt, C.ink, 4);
  if (p > 0.5) {
    K.beginPath();
    K.moveTo(x, y - hgt);
    K.quadraticCurveTo(x + 24, y - hgt - 8 + fl, x + 46, y - hgt + 4 + fl * 0.5);
    K.lineTo(x + 46, y - hgt + 30);
    K.quadraticCurveTo(x + 22, y - hgt + 20 - fl * 0.6, x, y - hgt + 30);
    K.closePath();
    K.fillStyle = C.red;
    K.fill();
    K.lineWidth = 3;
    K.strokeStyle = C.ink;
    K.stroke();
  }
  circle(K, x, y, 6, C.ink);
}

// ── cracked glass from an impact point (local), p grows the cracks ──
function lkCrack(K, x, y, seed, p, col = 'rgba(255,255,255,0.9)', lw = 4) {
  if (p <= 0) return;
  const R = rng(seed);
  K.save();
  K.strokeStyle = col;
  K.lineWidth = lw;
  K.lineCap = 'round';
  K.lineJoin = 'round';
  for (let k = 0; k < 7; k++) {
    let a = (k / 7) * TAU + R() * 0.6,
      px = x,
      py = y;
    K.beginPath();
    K.moveTo(px, py);
    for (let j = 0; j < 4; j++) {
      a += (R() - 0.5) * 0.8;
      const l = (26 + R() * 40) * p;
      px += Math.cos(a) * l;
      py += Math.sin(a) * l;
      K.lineTo(px, py);
    }
    K.stroke();
  }
  K.beginPath();
  K.arc(x, y, 18 * p, 0, TAU);
  K.stroke();
  K.restore();
}

// ── streaming code inside a dark rect (x, y, w, h); lines scroll up with speed spd (lines/s) ──
function lkCode(K, x, y, w, h, t, spd = 6, seed = 3, o = {}) {
  const lh = o.lh || 30,
    cols = ['#FF7A5C', '#9FB4FF', '#E6E3DC', '#7EE0B5', '#F5C26B'];
  K.save();
  K.beginPath();
  K.rect(x, y, w, h);
  K.clip();
  const off = t * spd,
    first = Math.floor(off);
  for (let k = 0; k < Math.ceil(h / lh) + 2; k++) {
    const n = first + k,
      R = rng(seed * 101 + n),
      yy = y + h - (k + 1 - (off - first)) * lh + lh; // newest at the bottom
    let xx = x + 18 + Math.floor(R() * 3) * 22;
    const segs = 1 + Math.floor(R() * 3);
    for (let s = 0; s < segs; s++) {
      const sw = 30 + R() * 110;
      if (xx + sw > x + w - 12) break;
      fillRR(K, xx, yy - 10, sw, 12, 6, cols[Math.floor(R() * cols.length)]);
      xx += sw + 12;
    }
  }
  K.restore();
}

// ── tracker pixel bug (local, centred, ~s px): a 1x1-pixel square with an eye and little legs that skitter ──
function lkBug(K, s, t, o = {}) {
  const leg = Math.sin(t * 22) * 6;
  K.save();
  K.lineWidth = 4;
  K.strokeStyle = C.ink;
  K.lineCap = 'round';
  for (const sx of [-1, 1])
    for (let k = 0; k < 3; k++) {
      const yy = -s * 0.25 + k * s * 0.25,
        ph = (k % 2 ? 1 : -1) * leg * sx;
      K.beginPath();
      K.moveTo(sx * s * 0.45, yy);
      K.lineTo(sx * s * 0.75, yy + ph * 0.5 - 6);
      K.lineTo(sx * s * 0.9, yy + ph + 6);
      K.stroke();
    }
  K.restore();
  fillRR(K, -s / 2, -s / 2, s, s, 8, o.hot ? C.red : C.ink);
  circle(K, 0, -s * 0.05, s * 0.24, '#FFFFFF');
  const lx = Math.sin(t * 3.1) * s * 0.08,
    ly = Math.cos(t * 2.3) * s * 0.05;
  circle(K, lx, -s * 0.05 + ly, s * 0.12, o.hot ? C.ink : C.red);
  line(K, -s * 0.15, -s / 2, -s * 0.3, -s * 0.8, C.ink, 4);
  line(K, s * 0.15, -s / 2, s * 0.3, -s * 0.8, C.ink, 4);
  circle(K, -s * 0.3, -s * 0.8, 6, C.red);
  circle(K, s * 0.3, -s * 0.8, 6, C.red);
}

// ── gavel (local): handle from the pivot (0,0) out along +x, head at the end; ang deg rotates it ──
function lkGavel(T, K, ang, s = 1) {
  X([T, K], 0, 0, s, ang, () => {
    fillRR(T, 10, 4, 330, 34, 17, C.k45);
    fillRR(K, 0, -16, 330, 32, 16, '#8B5A2B');
    strokeRR(K, 0, -16, 330, 32, 16, C.ink, 4);
    fillRR(K, 30, -10, 80, 8, 4, 'rgba(255,255,255,0.25)');
    // head
    fillRR(T, 300, -70, 120, 170, 22, C.k45);
    fillRR(K, 290, -86, 120, 172, 22, '#A86A33');
    strokeRR(K, 290, -86, 120, 172, 22, C.ink, 4);
    for (const yy of [-58, 58]) {
      fillRR(K, 284, yy - 12, 132, 24, 10, '#5E3A1A');
      strokeRR(K, 284, yy - 12, 132, 24, 10, C.ink, 3);
    }
    fillRR(K, 306, -36, 18, 72, 9, 'rgba(255,255,255,0.22)');
  });
}

// ── sound block (the gavel's base), centred at x,y; hit = ring amount ──
function lkBlock(T, K, x, y, hit = 0) {
  const sq = hit * 0.12;
  X([T, K], x, y, 1, 0, () => {
    for (const c of [T, K]) {
      c.save();
      c.scale(1 + sq, 1 - sq);
    }
    K.beginPath();
    K.ellipse(0, 26, 150, 34, 0, 0, TAU);
    T.beginPath();
    T.ellipse(12, 44, 150, 34, 0, 0, TAU);
    T.fillStyle = C.k45;
    T.fill();
    K.fillStyle = '#5E3A1A';
    K.fill();
    K.lineWidth = 4;
    K.strokeStyle = C.ink;
    K.stroke();
    K.beginPath();
    K.ellipse(0, 0, 150, 34, 0, 0, TAU);
    K.fillStyle = '#A86A33';
    K.fill();
    K.stroke();
    K.beginPath();
    K.ellipse(0, 0, 100, 20, 0, 0, TAU);
    K.strokeStyle = 'rgba(17,17,17,0.35)';
    K.lineWidth = 3;
    K.stroke();
    for (const c of [T, K]) c.restore();
  });
}

// ── a small sticker label (rounded pill with a mono word) used for "Email", "unlabeled", "3rd party" ... ──
function lkSticker(T, K, str, o = {}) {
  const f = { font: F.mono, weight: 700, size: o.size || 24 },
    w = measure(K, str, f) + 34,
    h = (o.size || 24) + 22;
  if (T) fillRR(T, -w / 2 + 6, -h / 2 + 8, w, h, h / 2, C.k30);
  fillRR(K, -w / 2, -h / 2, w, h, h / 2, o.fill || '#FFFFFF');
  strokeRR(K, -w / 2, -h / 2, w, h, h / 2, o.stroke || C.ink, 3);
  text(K, str, 0, (o.size || 24) * 0.36, Object.assign({}, f, { color: o.color || C.ink, align: 'center' }));
  return w;
}

// ── readout for the top-right chrome: which exhibit we are on ──
const lkReadout = (letter, tHot) => (t) => ({ k: 'EXHIBIT', v: letter + ' / D', hot: t >= tHot });

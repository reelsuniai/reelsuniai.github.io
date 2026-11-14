// ═════════════ shared props for "everybody makes AI reels, nobody tells you how" (prefixed rk) ═════════════
// The world: a sealed BLACK BOX that spits out AI reels; opened, it is a four-station PIPELINE (script, voice, visuals, review).
const rkMono = (K, s, x, y, o = {}) =>
  text(K, s, x, y, Object.assign({ font: F.mono, weight: 700, size: 22, color: '#8a8780', align: 'left' }, o));
const rkSlap = (dt, from = 1.8) =>
  dt <= 0 ? 0 : dt < 0.12 ? lerp(from, 1, E.inQuart(dt / 0.12)) : 1 + ring(dt - 0.12, 5, 10) * 0.06;

// a mini AI reel on a phone (local centre, width w): a cartoon face, a caption bar that fills, a progress line, an AI badge
function rkReel(T, K, w, t, seed, o = {}) {
  const h = w * 16 / 9 + w * 0.06;
  if (T) fillRR(T, -w / 2 + 8, -h / 2 + 14, w, h, w * 0.13, C.k45);
  fillRR(K, -w / 2, -h / 2, w, h, w * 0.13, '#0C0D0E');
  const b = w * 0.04;
  K.save();
  rr(K, -w / 2 + b, -h / 2 + b, w - 2 * b, h - 2 * b, w * 0.1);
  K.clip();
  fillRR(K, -w / 2, -h / 2, w, h, 0, ['#F3E3D3', '#DDE6F3', '#E3F0E3', '#F3E0E6'][seed % 4]);
  // face
  const fx = Math.sin(t * 1.3 + seed) * w * 0.03, fy = -h * 0.08;
  circle(K, fx, fy, w * 0.22, ['#F1C9A5', '#A9714B', '#D9A47C', '#7A4E31'][seed % 4]);
  fillRR(K, fx - w * 0.24, fy - w * 0.26, w * 0.48, w * 0.14, w * 0.07, '#2B211B');
  circle(K, fx - w * 0.07, fy, w * 0.025, C.ink);
  circle(K, fx + w * 0.07, fy, w * 0.025, C.ink);
  fillRR(K, fx - w * 0.06, fy + w * 0.08, w * 0.12, w * (0.02 + 0.05 * (0.5 + 0.5 * Math.sin(t * 15 + seed))), w * 0.02, C.ink);
  K.beginPath();
  K.ellipse(fx, fy + w * 0.5, w * 0.36, w * 0.22, 0, Math.PI, 0);
  K.fillStyle = '#4A5260';
  K.fill();
  // caption
  fillRR(K, -w * 0.36, h * 0.16, w * 0.72, w * 0.13, w * 0.04, '#FFFFFF');
  fillRR(K, -w * 0.3, h * 0.16 + w * 0.045, w * 0.6 * ((t * 0.9 + seed * 0.27) % 1), w * 0.045, w * 0.02, C.red);
  K.restore();
  const p = (t * 0.25 + seed * 0.31) % 1;
  fillRR(K, -w / 2 + b * 2, h / 2 - b * 3, (w - b * 4) * p, b * 0.8, b * 0.4, '#FFFFFF');
  if (o.badge !== false) {
    fillRR(K, -w / 2 + b * 2, -h / 2 + b * 3, w * 0.34, w * 0.15, w * 0.075, C.red);
    text(K, 'AI', -w / 2 + b * 2 + w * 0.17, -h / 2 + b * 3 + w * 0.11, { font: F.mono, weight: 700, size: w * 0.1, color: '#FFFFFF', align: 'center' });
  }
}

// a floating heart (local centre, size s)
function rkHeart(K, s, col = C.red) {
  K.beginPath();
  K.moveTo(0, s * 0.35);
  K.bezierCurveTo(-s * 0.6, -s * 0.05, -s * 0.35, -s * 0.55, 0, -s * 0.2);
  K.bezierCurveTo(s * 0.35, -s * 0.55, s * 0.6, -s * 0.05, 0, s * 0.35);
  K.closePath();
  K.fillStyle = col;
  K.fill();
  K.lineWidth = 3;
  K.strokeStyle = C.ink;
  K.stroke();
}

// the sealed black box (local centre, w x h): matte box, a chute on the right, stencil "HOW?", rivets; o.open 0..1 drops the walls
function rkBox(T, K, w, h, t, o = {}) {
  const open = clamp(o.open || 0);
  if (open >= 1) return;
  X([T, K], 0, open * 900, 1, open * 30, () => {
    fillRR(T, -w / 2 + 16, -h / 2 + 24, w, h, 26, C.k60);
    fillRR(K, -w / 2, -h / 2, w, h, 26, '#15161A');
    strokeRR(K, -w / 2, -h / 2, w, h, 26, C.ink, 5);
    for (const [rx, ry] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) circle(K, rx * (w / 2 - 26), ry * (h / 2 - 26), 7, '#45464D');
    fillRR(K, w / 2 - 10, -40, 70, 80, 10, '#2A2B30');
    strokeRR(K, w / 2 - 10, -40, 70, 80, 10, C.ink, 4);
    text(K, 'HOW?', 0, -10, { font: F.anton, weight: 400, size: 120, color: '#F6F5F1', align: 'center', ls: 6 });
    rkMono(K, 'contents: unknown', 0, 50, { size: 24, color: '#8F8F8F', align: 'center' });
    // hum: small vents blinking
    for (let k = 0; k < 5; k++) fillRR(K, -w / 2 + 40 + k * 30, h / 2 - 50, 18, 8, 4, Math.floor(t * 6 + k) % 3 ? '#2A2B30' : C.red);
  });
}

// one pipeline station (local centre): numbered plate, an icon drawer, a label; state: 0 dashed/unknown, 1 lit
function rkStation(T, K, n, label, lit, t, icon) {
  const w = 190, h = 210;
  if (lit) {
    fillRR(T, -w / 2 + 10, -h / 2 + 14, w, h, 24, C.k45);
    fillRR(K, -w / 2, -h / 2, w, h, 24, '#FFFFFF');
    strokeRR(K, -w / 2, -h / 2, w, h, 24, C.ink, 4);
  } else {
    K.save();
    K.setLineDash([12, 9]);
    K.lineDashOffset = -t * 20;
    strokeRR(K, -w / 2, -h / 2, w, h, 24, '#B9B5AC', 3);
    K.restore();
  }
  circle(K, -w / 2 + 30, -h / 2 + 30, 20, lit ? C.red : '#E6E3DC');
  text(K, String(n), -w / 2 + 30, -h / 2 + 39, { font: F.mono, weight: 700, size: 24, color: lit ? '#FFFFFF' : '#B9B5AC', align: 'center' });
  if (lit && icon) icon(K, 0, -6, t);
  else text(K, '?', 0, 20, { font: F.serif, italic: true, weight: 400, size: 90, color: '#C9C5BC', align: 'center' });
  rkMono(K, lit ? label : '???', 0, h / 2 - 18, { size: 22, color: lit ? C.ink : '#B9B5AC', align: 'center' });
}

// conveyor belt between x0..x1 at y with rollers turning at speed
function rkBelt(T, K, x0, x1, y, t, p = 1) {
  const xe = lerp(x0, x1, clamp(p));
  if (xe <= x0 + 4) return;
  fillRR(T, x0 + 8, y + 10, xe - x0, 40, 20, C.k30);
  fillRR(K, x0, y, xe - x0, 40, 20, '#2A2B30');
  strokeRR(K, x0, y, xe - x0, 40, 20, C.ink, 3);
  K.save();
  rr(K, x0, y, xe - x0, 40, 20);
  K.clip();
  for (let x = x0 - 40 + ((t * 120) % 40); x < xe; x += 40) line(K, x, y + 6, x + 16, y + 34, '#45464D', 4);
  K.restore();
}

// icons for the stations
function rkIconDoc(K, x, y, t) {
  fillRR(K, x - 46, y - 56, 92, 112, 10, '#FFFFFF');
  strokeRR(K, x - 46, y - 56, 92, 112, 10, C.ink, 4);
  for (let k = 0; k < 4; k++) fillRR(K, x - 32, y - 36 + k * 22, 64 * (k === 3 ? (t * 0.8) % 1 : 1), 8, 4, k === 0 ? C.red : '#CFCBC2');
}
function rkIconWave(K, x, y, t) {
  for (let k = 0; k < 9; k++) {
    const hh = 14 + Math.abs(Math.sin(t * 6 + k * 0.9)) * 60;
    fillRR(K, x - 56 + k * 14, y - hh / 2, 9, hh, 4.5, k % 3 ? C.ink : C.red);
  }
}
function rkIconCode(K, x, y, t) {
  fillRR(K, x - 60, y - 46, 120, 92, 12, '#15161A');
  text(K, '</>', x, y + 14, { font: F.mono, weight: 700, size: 40, color: Math.floor(t * 3) % 2 ? C.red : '#F6F5F1', align: 'center' });
}
function rkIconEye(K, x, y, t) {
  K.beginPath();
  K.ellipse(x, y, 60, 34, 0, 0, TAU);
  K.fillStyle = '#FFFFFF';
  K.fill();
  K.lineWidth = 4;
  K.strokeStyle = C.ink;
  K.stroke();
  circle(K, x + Math.sin(t * 2) * 14, y, 18, C.red);
  circle(K, x + Math.sin(t * 2) * 14, y, 8, C.ink);
}

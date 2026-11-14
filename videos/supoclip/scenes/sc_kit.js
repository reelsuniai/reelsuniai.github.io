// ═════════════ shared props for the SupoClip reel (prefixed sc) ═════════════
// The world: ONE long podcast film strip, a pair of scissors, and the vertical clips it gets cut into.
const scMono = (K, s, x, y, o = {}) =>
  text(K, s, x, y, Object.assign({ font: F.mono, weight: 700, size: 22, color: '#8a8780', align: 'left' }, o));
const scSlap = (dt, from = 1.8) =>
  dt <= 0 ? 0 : dt < 0.12 ? lerp(from, 1, E.inQuart(dt / 0.12)) : 1 + ring(dt - 0.12, 5, 10) * 0.06;
const scSince = (t, times) => {
  let b = -1e9;
  for (const x of times) if (x <= t && x > b) b = x;
  return t - b;
};

// a podcast host silhouette (local centre): two mics, a head, headphones; talk 0..1 opens the mouth
function scHost(K, s, seed, talk = 0) {
  const skins = ['#F1C9A5', '#A9714B', '#D9A47C', '#7A4E31'], shirts = ['#2F3A4A', '#8E8676', '#4A5260', '#5D6B5A'];
  const sk = skins[seed % 4], sh = shirts[seed % 4];
  K.beginPath();
  K.ellipse(0, s * 0.62, s * 0.62, s * 0.4, 0, Math.PI, 0);
  K.closePath();
  K.fillStyle = sh;
  K.fill();
  circle(K, 0, 0, s * 0.32, sk);
  K.save();
  K.lineWidth = s * 0.07;
  K.strokeStyle = '#15161A';
  K.beginPath();
  K.arc(0, 0, s * 0.38, Math.PI * 1.1, Math.PI * 1.9);
  K.stroke();
  K.restore();
  fillRR(K, -s * 0.44, -s * 0.08, s * 0.12, s * 0.22, s * 0.05, '#15161A');
  fillRR(K, s * 0.32, -s * 0.08, s * 0.12, s * 0.22, s * 0.05, '#15161A');
  circle(K, -s * 0.11, -s * 0.03, s * 0.035, '#15161A');
  circle(K, s * 0.11, -s * 0.03, s * 0.035, '#15161A');
  fillRR(K, -s * 0.07, s * 0.12, s * 0.14, s * (0.03 + 0.07 * talk), s * 0.03, '#15161A');
}

// the long podcast strip (x, y = left-centre, w): dark film with sprocket holes, a live waveform, a timecode
function scStrip(T, K, x, y, w, t, o = {}) {
  const h = o.h || 170;
  if (T) fillRR(T, x + 12, y - h / 2 + 18, w, h, 18, C.k45);
  fillRR(K, x, y - h / 2, w, h, 18, '#15161A');
  for (let i = 0; i < w / 34; i++) {
    const sx = x + 14 + i * 34 - ((t * 60) % 34);
    if (sx < x + 6 || sx > x + w - 24) continue;
    fillRR(K, sx, y - h / 2 + 10, 18, 14, 4, '#3A3B42');
    fillRR(K, sx, y + h / 2 - 24, 18, 14, 4, '#3A3B42');
  }
  // waveform
  K.save();
  K.beginPath();
  K.rect(x + 8, y - h / 2 + 30, w - 16, h - 60);
  K.clip();
  for (let i = 0; i < (w - 20) / 9; i++) {
    const px = x + 12 + i * 9, n = noise1(i * 0.37 + t * 2.2) * 0.5 + 0.5, hh = 8 + n * (h - 80) * (0.4 + 0.6 * Math.abs(Math.sin(i * 0.13)));
    fillRR(K, px, y - hh / 2, 5, hh, 2.5, o.hot && o.hot(px) ? C.red : '#9FB4FF');
  }
  K.restore();
  if (o.label) scMono(K, o.label, x + 20, y - h / 2 - 16, { size: 22, color: C.ink });
  if (o.time) scMono(K, o.time, x + w - 20, y - h / 2 - 16, { size: 22, color: C.red, align: 'right' });
}

// a vertical short clip (local centre, w): a host in frame, a caption bar, a score chip; hot = accent border
function scClip(T, K, w, t, seed, o = {}) {
  const h = w * 16 / 9;
  if (T) fillRR(T, -w / 2 + 8, -h / 2 + 12, w, h, w * 0.12, C.k45);
  fillRR(K, -w / 2, -h / 2, w, h, w * 0.12, '#15161A');
  K.save();
  rr(K, -w / 2 + 5, -h / 2 + 5, w - 10, h - 10, w * 0.1);
  K.clip();
  fillRR(K, -w / 2, -h / 2, w, h, 0, ['#2A3550', '#3A2A2A', '#24382F', '#3A3424'][seed % 4]);
  scHost(K, w * 0.5, seed, 0.5 + 0.5 * Math.sin(t * 14 + seed));
  K.restore();
  fillRR(K, -w * 0.38, h * 0.2, w * 0.76, w * 0.16, w * 0.05, '#FFFFFF');
  fillRR(K, -w * 0.3, h * 0.2 + w * 0.05, w * 0.6 * (0.4 + 0.6 * ((t * 0.8 + seed * 0.3) % 1)), w * 0.06, w * 0.03, C.ink);
  strokeRR(K, -w / 2, -h / 2, w, h, w * 0.12, o.hot ? C.red : C.ink, o.hot ? 6 : 3);
  if (o.score) {
    fillRR(K, w / 2 - w * 0.5, -h / 2 + 10, w * 0.42, w * 0.2, w * 0.1, C.red);
    text(K, o.score, w / 2 - w * 0.29, -h / 2 + 10 + w * 0.14, { font: F.mono, weight: 700, size: w * 0.12, color: '#FFFFFF', align: 'center' });
  }
}

// scissors (local centre at the pivot), open 0..1, pointing right
function scScissors(T, K, open, s = 1) {
  X([T, K], 0, 0, s, 0, () => {
    for (const sd of [-1, 1]) {
      K.save();
      K.rotate(sd * open * 0.45);
      K.beginPath();
      K.moveTo(0, 0);
      K.lineTo(170, sd * 6);
      K.lineTo(0, sd * 22);
      K.closePath();
      K.fillStyle = '#E6E3DC';
      K.fill();
      K.lineWidth = 4;
      K.strokeStyle = C.ink;
      K.stroke();
      K.lineWidth = 14;
      K.strokeStyle = C.red;
      K.beginPath();
      K.ellipse(-60, sd * 34, 40, 26, 0, 0, TAU);
      K.stroke();
      K.lineWidth = 4;
      K.strokeStyle = C.ink;
      K.beginPath();
      K.ellipse(-60, sd * 34, 48, 34, 0, 0, TAU);
      K.stroke();
      K.restore();
    }
    circle(K, 0, 0, 10, C.ink);
  });
}

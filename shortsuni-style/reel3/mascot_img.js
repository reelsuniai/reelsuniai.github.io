/* Raster mascot player: 3D pose renders (assets/cut/m_*.png) switched on spoken words with a spring pop
 * (scale 0.9 -> 1.05 -> 1, tilt overshoot, 5 frames), idle bob, talk pulse, cached halftone dot shadow (bible §6). */
(function () {
  const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
  const lerp = (a, b, k) => a + (b - a) * k;
  const SHADOW = {};
  function shadowOf(img) {
    if (SHADOW[img.src]) return SHADOW[img.src];
    const c = document.createElement('canvas'); c.width = img.width; c.height = img.height; const x = c.getContext('2d');
    x.drawImage(img, 0, 0); x.globalCompositeOperation = 'source-in';
    const tile = document.createElement('canvas'); tile.width = tile.height = 8; const tx = tile.getContext('2d'); tx.fillStyle = 'rgba(20,16,16,0.6)'; tx.beginPath(); tx.arc(4, 4, 2.2, 0, 7); tx.fill();
    x.fillStyle = x.createPattern(tile, 'repeat'); x.fillRect(0, 0, c.width, c.height);
    return (SHADOW[img.src] = c);
  }
  window.MASCOT = {
    draw(ctx, t, o) {   // o: {x, y (bottom-centre), height, poses:[[t0, key]], speaking(t), imgs}
      let cur = [o.poses[0][1], -1];
      for (const [t0, k] of o.poses) if (t >= t0) cur = [k, t0];
      const img = o.imgs[cur[0]]; if (!img) return;
      const p = clamp((t - cur[1]) / (5 / 30));
      const s = p < 0.6 ? lerp(0.9, 1.05, p / 0.6) : lerp(1.05, 1, (p - 0.6) / 0.4);
      const rot = (1 - p) * (cur[0].length % 2 ? -0.06 : 0.06);
      const talk = o.speaking ? o.speaking(t) * 0.012 : 0;
      const bob = Math.sin(t * Math.PI * 2 * 0.8) * 5;
      const h = o.height, w = (img.width / img.height) * h;
      ctx.save(); ctx.translate(o.x, o.y + bob); ctx.rotate(rot); ctx.scale(s + talk, s - talk * 0.5);
      ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(shadowOf(img), -w / 2 + 16, -h + 12, w, h);
      ctx.drawImage(img, -w / 2, -h, w, h);
      ctx.restore();
    },
  };
})();

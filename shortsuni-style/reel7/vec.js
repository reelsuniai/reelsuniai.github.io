/* vec.js - one consistent flat-vector object set (bold ink outline, brand red / white / black, soft highlight).
 * VEC.draw(ctx, key, cx, cy, h, rot) draws the object centred, h px tall. Replaces every generated 3D image. */
(function () {
  const INK = '#141210', RED = '#E10A0F', R2 = '#A9070B', WHITE = '#FFFFFF', PAPER = '#F4F1EC', GREY = '#C9C5BF', BLUE = '#3E8EF0', BLUE2 = '#2F6FCB', GOLD = '#F6B81A', GOLD2 = '#C98A0C', PINK = '#F7A7B4';
  const LW = 10;
  const rr = (c, x, y, w, h, r) => { c.beginPath(); c.roundRect(x, y, w, h, r); };
  const fs = (c, fill) => { c.fillStyle = fill; c.fill(); c.lineWidth = LW; c.strokeStyle = INK; c.lineJoin = 'round'; c.lineCap = 'round'; c.stroke(); };
  const shine = (c, x, y, w, h) => { c.save(); c.globalAlpha = 0.55; c.fillStyle = WHITE; rr(c, x, y, w, h, Math.min(w, h) / 2); c.fill(); c.restore(); };
  const D = {
    o_plane(c) { c.beginPath(); c.moveTo(-60, -10); c.lineTo(40, -150); c.lineTo(90, -150); c.lineTo(40, -10); c.closePath(); fs(c, GREY);           // wing
      rr(c, -250, -40, 500, 90, 45); fs(c, WHITE); c.beginPath(); c.moveTo(-230, -30); c.lineTo(-270, -120); c.lineTo(-200, -120); c.lineTo(-150, -35); c.closePath(); fs(c, RED);
      c.beginPath(); c.moveTo(-60, 40); c.lineTo(10, 150); c.lineTo(60, 150); c.lineTo(40, 40); c.closePath(); fs(c, GREY);
      for (let i = 0; i < 6; i++) { c.fillStyle = INK; c.beginPath(); c.arc(-120 + i * 50, -2, 9, 0, 7); c.fill(); } c.fillStyle = '#7FC4FF'; rr(c, 170, -22, 44, 26, 10); c.fill(); c.lineWidth = 6; c.strokeStyle = INK; c.stroke(); shine(c, -180, -30, 300, 12); },
    o_bottle(c) { rr(c, -34, -230, 68, 46, 10); fs(c, BLUE); rr(c, -44, -190, 88, 40, 12); fs(c, '#CFE9FF');
      c.beginPath(); c.moveTo(-44, -150); c.quadraticCurveTo(-95, -120, -95, -60); c.lineTo(-95, 200); c.quadraticCurveTo(-95, 235, -60, 235); c.lineTo(60, 235); c.quadraticCurveTo(95, 235, 95, 200); c.lineTo(95, -60); c.quadraticCurveTo(95, -120, 44, -150); c.closePath(); fs(c, '#DDF0FF');
      c.save(); c.clip(); c.fillStyle = '#9FD3FF'; c.fillRect(-100, 40, 200, 200); c.restore(); rr(c, -95, -30, 190, 110, 6); fs(c, BLUE); c.fillStyle = WHITE; c.font = '900 44px Inter'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('H2O', 0, 26); shine(c, -70, -110, 18, 300); },
    o_pricetag(c) { c.beginPath(); c.moveTo(-170, -70); c.lineTo(-90, -150); c.lineTo(170, -150); c.lineTo(170, 150); c.lineTo(-90, 150); c.lineTo(-170, 70); c.closePath(); fs(c, RED);
      c.fillStyle = PAPER; c.beginPath(); c.arc(-95, 0, 24, 0, 7); c.fill(); c.lineWidth = 7; c.strokeStyle = INK; c.stroke(); c.beginPath(); c.moveTo(-95, 0); c.quadraticCurveTo(-190, -90, -200, -200); c.stroke(); shine(c, -60, -128, 200, 14); },
    o_folder(c) { rr(c, -220, -170, 180, 70, 18); fs(c, BLUE2); rr(c, -220, -140, 440, 300, 22); fs(c, BLUE2);
      rr(c, -180, -175, 360, 140, 10); fs(c, WHITE); rr(c, -160, -195, 320, 120, 10); fs(c, PAPER); rr(c, -220, -80, 440, 240, 22); fs(c, BLUE); shine(c, -190, -60, 380, 14); },
    o_camera(c) { [[-90, 140], [0, 150], [90, 140]].forEach(([dx]) => { c.beginPath(); c.moveTo(0, 90); c.lineTo(dx * 1.6, 300); c.lineWidth = 16; c.strokeStyle = INK; c.stroke(); });
      rr(c, -40, 60, 80, 50, 8); fs(c, '#3A3632'); rr(c, -200, -120, 330, 200, 24); fs(c, '#3A3632'); c.beginPath(); c.arc(-110, -170, 70, 0, 7); fs(c, '#4A4540'); c.beginPath(); c.arc(30, -170, 70, 0, 7); fs(c, '#4A4540');
      c.beginPath(); c.moveTo(130, -60); c.lineTo(230, -110); c.lineTo(230, 50); c.lineTo(130, 0); c.closePath(); fs(c, '#2A2724'); c.beginPath(); c.arc(-35, -20, 62, 0, 7); fs(c, '#1E1C1A'); c.beginPath(); c.arc(-35, -20, 30, 0, 7); fs(c, '#6E7CA8');
      c.fillStyle = RED; c.beginPath(); c.arc(90, -90, 12, 0, 7); c.fill(); shine(c, -170, -105, 120, 12); },
    o_magnifier(c) { c.save(); c.rotate(-0.6); rr(c, -26, 110, 52, 200, 20); fs(c, GOLD2); c.beginPath(); c.arc(0, -40, 150, 0, 7); fs(c, GOLD); c.beginPath(); c.arc(0, -40, 110, 0, 7); fs(c, '#DFF2FF'); c.save(); c.globalAlpha = 0.7; c.fillStyle = WHITE; c.beginPath(); c.ellipse(-40, -80, 26, 50, 0.6, 0, 7); c.fill(); c.restore(); c.restore(); },
    o_piggy(c) { c.beginPath(); c.ellipse(0, 20, 220, 170, 0, 0, 7); fs(c, PINK); c.beginPath(); c.moveTo(-120, -120); c.lineTo(-90, -200); c.lineTo(-40, -140); fs(c, PINK);
      [[-130, 170], [-50, 180], [60, 180], [140, 170]].forEach(([x, y]) => { rr(c, x - 26, y - 20, 52, 70, 14); fs(c, PINK); }); c.beginPath(); c.ellipse(205, 30, 52, 60, 0, 0, 7); fs(c, '#F58FA0');
      c.fillStyle = INK; c.beginPath(); c.arc(190, 20, 10, 0, 7); c.arc(220, 40, 10, 0, 7); c.fill(); c.beginPath(); c.arc(90, -40, 14, 0, 7); c.fill(); rr(c, -60, -160, 90, 18, 9); c.fill(); c.fillStyle = GOLD; c.beginPath(); c.ellipse(-15, -190, 46, 16, 0, 0, 7); c.fill(); c.lineWidth = 6; c.strokeStyle = INK; c.stroke(); shine(c, -150, -80, 120, 18); },
    o_trophy(c) { c.beginPath(); c.arc(-150, -110, 70, Math.PI * 0.5, Math.PI * 1.5); c.lineWidth = 28; c.strokeStyle = INK; c.stroke(); c.lineWidth = 14; c.strokeStyle = GOLD; c.stroke(); c.beginPath(); c.arc(150, -110, 70, -Math.PI * 0.5, Math.PI * 0.5); c.lineWidth = 28; c.strokeStyle = INK; c.stroke(); c.lineWidth = 14; c.strokeStyle = GOLD; c.stroke();
      c.beginPath(); c.moveTo(-160, -200); c.lineTo(160, -200); c.quadraticCurveTo(160, 40, 0, 60); c.quadraticCurveTo(-160, 40, -160, -200); c.closePath(); fs(c, GOLD); rr(c, -30, 50, 60, 90, 6); fs(c, GOLD2); rr(c, -130, 130, 260, 80, 14); fs(c, INK); rr(c, -90, 150, 180, 40, 8); fs(c, RED); shine(c, -120, -180, 30, 160); },
    o_filmreel(c) { c.beginPath(); c.arc(0, 0, 220, 0, 7); fs(c, RED); c.fillStyle = INK; c.beginPath(); c.arc(0, 0, 40, 0, 7); c.fill(); for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2; c.beginPath(); c.arc(Math.cos(a) * 130, Math.sin(a) * 130, 52, 0, 7); fs(c, PAPER); } shine(c, -120, -170, 140, 16); },
    o_gift(c) { rr(c, -180, -60, 360, 260, 14); fs(c, WHITE); rr(c, -200, -120, 400, 90, 14); fs(c, PAPER); rr(c, -36, -120, 72, 320, 4); fs(c, RED);
      c.beginPath(); c.ellipse(-70, -150, 70, 40, -0.4, 0, 7); fs(c, RED); c.beginPath(); c.ellipse(70, -150, 70, 40, 0.4, 0, 7); fs(c, RED); c.beginPath(); c.arc(0, -140, 30, 0, 7); fs(c, R2); },
    o_mic(c) { rr(c, -18, 120, 36, 160, 10); fs(c, '#6E6A64'); rr(c, -110, 270, 220, 36, 18); fs(c, INK); rr(c, -100, -230, 200, 330, 100); fs(c, '#B9B5AF'); c.save(); rr(c, -100, -230, 200, 330, 100); c.clip(); c.fillStyle = 'rgba(20,18,16,0.25)'; for (let y = -220; y < 100; y += 30) for (let x = -100; x < 100; x += 30) { c.beginPath(); c.arc(x + ((y / 30) % 2) * 15, y, 6, 0, 7); c.fill(); } c.restore(); rr(c, -100, -230, 200, 330, 100); c.lineWidth = LW; c.strokeStyle = INK; c.stroke(); shine(c, -70, -200, 22, 200); },
  };
  window.VEC = { has: (k) => !!D[k], draw(ctx, key, cx, cy, h, rot = 0, a = 1) { if (!D[key]) return false; ctx.save(); ctx.globalAlpha *= a; ctx.translate(cx, cy); ctx.rotate(rot); const s = h / 500; ctx.scale(s, s);
      // halftone shadow: draw silhouette offset in dots
      ctx.save(); ctx.translate(24, 22); const p = document.createElement('canvas'); p.width = p.height = 14; const q = p.getContext('2d'); q.fillStyle = 'rgba(20,16,16,0.5)'; q.beginPath(); q.arc(7, 7, 3.4, 0, 7); q.fill();
      ctx.restore(); D[key](ctx); ctx.restore(); return true; } };
})();

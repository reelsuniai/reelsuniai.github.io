"""shortsuni template build: reel.json + work/words.json + assets/audio/vo.wav  ->  page files + sfx + mix (then render with HyperFrames).
usage: python build.py <project_dir>
Implements STYLE_BIBLE.md §10: voice + soft UI SFX (no music), each SFX on its visual event's first frame, ~1 per second,
SFX about 8 dB under the voice, final mix -14 LUFS / true peak -1.5 dBFS.
"""
import json, sys, subprocess
from pathlib import Path
import numpy as np, soundfile as sf
from scipy.signal import butter, sosfilt

P = Path(sys.argv[1]); SR = 48000
R = json.loads((P / 'reel.json').read_text())
WJ = json.loads((P / 'work/words.json').read_text())
WORDS = [{'i': x['i'], 't': x['text'], 's': round(x['start'], 3), 'e': round(x['end'], 3), 'l': x['line']} for x in WJ]
w = lambda i: WORDS[i]['s']; we = lambda i: WORDS[i]['e']
DUR = WORDS[-1]['e'] + R.get('tail', 0.2)
F1 = 1 / 30

# ---- page data
(P / 'words.js').write_text('window.WORDS = ' + json.dumps(WORDS) + ';\n')
(P / 'reel.js').write_text('window.REEL = ' + json.dumps(R) + ';\n')
html = f'''<!doctype html>
<html lang="en"><head><meta charset="UTF-8" /><meta name="viewport" content="width=1080, height=1920" />
<title>{R["title"]}</title>
<link rel="stylesheet" href="assets/fonts.css" />
<script src="assets/gsap.min.js"></script><script src="words.js"></script><script src="reel.js"></script><script src="engine.js"></script>
<style>html,body{{margin:0;padding:0;background:#F2F0EE}} #root{{position:relative;width:1080px;height:1920px;overflow:hidden}} #cv{{position:absolute;inset:0;width:1080px;height:1920px}}</style>
</head><body>
<div id="root" data-composition-id="main" data-start="0" data-duration="{DUR:.3f}" data-width="1080" data-height="1920">
  <canvas id="cv" width="1080" height="1920" data-layout-allow-overflow></canvas>
  <audio id="mix" class="clip" src="assets/audio/mix.wav" data-start="0" data-duration="{DUR:.3f}" data-track-index="10" data-volume="1"></audio>
</div>
<script>
(async () => {{
  await FILM.load();
  const ctx = document.getElementById('cv').getContext('2d');
  const clock = {{ t: 0 }};
  const tl = gsap.timeline({{ paused: true }});
  tl.to(clock, {{ t: FILM.DUR, duration: FILM.DUR, ease: 'none', onUpdate: () => FILM.render(ctx, clock.t) }}, 0);
  FILM.render(ctx, 0);
  window.__timelines = window.__timelines || {{}}; window.__timelines['main'] = tl;
}})();
</script></body></html>
'''
(P / 'index.html').write_text(html)
(P / 'hyperframes.json').write_text('{ "$schema": "https://hyperframes.heygen.com/schema/hyperframes.json", "paths": { "assets": "assets" } }\n')

# ---- SFX synthesis (all original, soft, band-limited; no clicks: 3-6 ms attack)
rng = np.random.default_rng(7)
def env(n, a=0.004, d=0.08):
    t = np.arange(n) / SR; e = np.minimum(1, t / a) * np.exp(-np.maximum(0, t - a) / d); return e
def lp(x, f): return sosfilt(butter(2, f, 'low', fs=SR, output='sos'), x)
def bp(x, a, b): return sosfilt(butter(2, [a, b], 'band', fs=SR, output='sos'), x)
def tone(f0, f1, dur):
    n = int(dur * SR); f = np.linspace(f0, f1, n); return np.sin(2 * np.pi * np.cumsum(f) / SR)
def pop(): n = int(0.07 * SR); return tone(900, 420, 0.07) * env(n, 0.003, 0.02) * 0.7
def click(): n = int(0.03 * SR); return bp(rng.standard_normal(n), 1800, 6000) * env(n, 0.001, 0.006) * 0.6
def tick(): n = int(0.02 * SR); return bp(rng.standard_normal(n), 2500, 7000) * env(n, 0.001, 0.004) * 0.28
def swish(d=0.22):
    n = int(d * SR); x = rng.standard_normal(n); f = np.linspace(500, 3500, n); y = np.zeros(n)
    for k in range(0, n, 480): y[k:k + 480] = bp(x[k:k + 480], f[k] * 0.6, min(f[k] * 1.6, 20000))
    e = np.sin(np.pi * np.linspace(0, 1, n)) ** 1.5; return lp(y * e, 6000) * 0.5
def riser(d=0.3):
    n = int(d * SR); e = np.linspace(0, 1, n) ** 2; return (tone(180, 900, d) * 0.4 + lp(rng.standard_normal(n), 3000) * 0.25) * e * 0.8
def thump(): n = int(0.22 * SR); return (tone(110, 42, 0.22) * env(n, 0.003, 0.09) + lp(rng.standard_normal(n), 900) * env(n, 0.001, 0.02) * 0.4) * 0.95
def slap(): n = int(0.09 * SR); return bp(rng.standard_normal(n), 400, 3500) * env(n, 0.001, 0.025) * 0.6
def ding():
    n = int(0.6 * SR); t = np.arange(n) / SR; return (np.sin(2 * np.pi * 1318 * t) + 0.5 * np.sin(2 * np.pi * 1976 * t)) * env(n, 0.003, 0.18) * 0.35
cues = []
A = lambda t, fn, g=1.0: cues.append((t, fn, g))
wipe = next((s for s in R['scenes'] if s.get('enter') == 'wipe'), None)
for i, s in enumerate(R['scenes']):
    t0 = 0 if s['at'] == 0 else w(s['at']) - 0.2
    if i and s.get('enter') != 'wipe': A(t0, swish, 0.7)
    if s.get('badge') and s.get('enter') != 'wipe': A(t0 + 0.05, pop, 0.9)
    ty = s['type']
    if ty == 'retention': A(0.05, swish, 0.5); A(w(s['marker']), swish, 0.8); A(w(s['pill']), pop, 0.8)
    if ty == 'chat':
        a, b = w(s['typeFrom']), we(s['typeTo']) - 0.1
        for k in np.arange(a, b, 0.07): A(float(k), tick, 0.7)
        A(w(s['send']), click, 1.0)
    if ty == 'hooks':
        for k in np.arange(w(s['promptFrom']), we(s['promptTo']), 0.07): A(float(k), tick, 0.6)
        for r in range(len(s['hooks'])): A(w(s['listAt']) + r * 0.06, pop, 0.35)
        for k, wi in enumerate(s['steps']): A(w(wi), click, 0.8)
        A(w(s['steps'][-1]) + 0.1, ding, 0.8)
    if ty == 'cut':
        for wi in s['strikes']: A(w(wi), swish, 0.6); A(w(wi) + 2 * F1, pop, 0.6)
        for k in range(len(s['stampLine'].split())): A(w(s['stampAt']) + k * 0.12, slap, 0.4)
        A(w(s['stampKey']), thump, 1.0); A(w(s['stampKey']), slap, 0.9)
    if ty == 'beats':
        for wi, _ in s['beats']: A(w(wi), slap, 0.7); A(w(wi) + 2 * F1, pop, 0.5)
    if ty == 'post':
        A(w(s['posted']) + 0.05, ding, 0.9); A(w(s['follow']) - 0.15, pop, 0.8); A(w(s['click']), click, 1.0)
        A(w(s['stamp']), thump, 1.0); A(w(s['stamp']), slap, 0.8)
if wipe:
    wa = w(wipe['at']) - 0.2
    A(wa - 0.47, riser, 0.9); A(wa - 0.17 + 5 * F1, thump, 1.0); A(wa + 0.33, pop, 0.9)
n = int((DUR + 1) * SR); sfx = np.zeros(n)
for t, fn, g in cues:
    x = fn() * g; i0 = int(max(0, t) * SR); sfx[i0:i0 + len(x)] += x[: max(0, n - i0)]
sfx = sfx[: int(DUR * SR)]
sf.write(P / 'assets/audio/sfx.wav', sfx.astype(np.float32), SR)
json.dump([[round(t, 3), fn.__name__, g] for t, fn, g in sorted(cues, key=lambda c: c[0])], open(P / 'work/sfx_cues.json', 'w'))

# ---- mix: voice normalised, SFX 8 dB under it, no music; master -14 LUFS / TP -1.5
def lufs(f):
    r = subprocess.run(['ffmpeg', '-hide_banner', '-nostats', '-i', str(f), '-af', 'ebur128', '-f', 'null', '-'], capture_output=True, text=True).stderr
    return float(r.split('Integrated loudness:')[1].split('I:')[1].split('LUFS')[0])
lv, ls = lufs(P / 'assets/audio/vo.wav'), lufs(P / 'assets/audio/sfx.wav')
gv, gs = -16 - lv, -24 - ls
subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-i', str(P / 'assets/audio/vo.wav'), '-i', str(P / 'assets/audio/sfx.wav'), '-filter_complex',
                f'[0:a]aresample={SR},volume={gv:.2f}dB[v];[1:a]volume={gs:.2f}dB[s];[v][s]amix=inputs=2:normalize=0:duration=longest,apad=whole_dur={DUR:.3f},atrim=0:{DUR:.3f},'
                f'aresample={SR}', '-ac', '2', '-ar', str(SR), str(P / 'work/premix.wav')], check=True)
g = -14.0 - lufs(P / 'work/premix.wav')        # measured gain, then a true-peak-safe limiter (-1.5 dBFS)
subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-i', str(P / 'work/premix.wav'), '-af', f'volume={g:.2f}dB,alimiter=limit=0.80:attack=3:release=60:level=disabled',
                '-ar', str(SR), str(P / 'assets/audio/mix.wav')], check=True)
print(f'DUR {DUR:.3f}s · {len(cues)} sfx cues · vo {lv:.1f} LUFS -> mix {lufs(P / "assets/audio/mix.wav"):.1f} LUFS')

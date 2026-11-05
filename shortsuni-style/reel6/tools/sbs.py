"""Side-by-side compare at matched BEATS (not raw time): his ref7 frame | our frame. usage: sbs.py <our.mp4> <out.jpg>"""
import sys, subprocess
from PIL import Image, ImageDraw, ImageFont
OURS, OUT = sys.argv[1], sys.argv[2]
REF = '/home/user/claude-test./shortsuni-style/references/ref7.mp4'
F = ImageFont.truetype('/usr/share/fonts/opentype/inter/Inter-Bold.otf', 30)
import json as _j
BEATS = _j.load(open('work/beats.json')) if len(sys.argv) > 3 else [('phone + views', 0.3, 0.3), ('fan out', 0.85, 0.85), ('marker circle', 1.35, 1.33), ('into the window', 2.2, 2.25),
         ('mountain HARD', 2.75, 2.95), ('flattened, EASY', 3.35, 3.4), ('blocks split', 3.95, 3.66), ('staircase', 4.35, 4.1), ('badge 1', 4.95, 4.95)]
def grab(src, t, scale):
    raw = subprocess.run(['ffmpeg', '-loglevel', 'error', '-ss', str(t), '-i', src, '-frames:v', '1', '-vf', f'scale={scale}', '-f', 'image2pipe', '-vcodec', 'png', '-'], capture_output=True).stdout
    import io; return Image.open(io.BytesIO(raw)).convert('RGB')
cols = []
for name, th, to in BEATS:
    a, b = grab(REF, th, '360:640'), grab(OURS, to, '360:640')
    c = Image.new('RGB', (360, 1360), (24, 24, 28)); c.paste(a, (0, 40)); c.paste(b, (0, 720)); d = ImageDraw.Draw(c)
    d.text((8, 4), name, fill=(255, 230, 0), font=F); d.text((8, 684), 'ours', fill=(255, 255, 255), font=F); cols.append(c)
per = 11
for q in range(0, len(cols), per):
    part = cols[q:q + per]; g = Image.new('RGB', (360 * len(part), 1360)); [g.paste(c, (i * 360, 0)) for i, c in enumerate(part)]; g.save(OUT.replace('.jpg', f'_{q // per + 1}.jpg'), quality=85)
print(OUT)

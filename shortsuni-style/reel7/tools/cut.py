"""Cut generated renders out of their backdrop. objects -> rembg isnet-general-use; mascot (m_*) -> u2net_human_seg.
Crops to the alpha bbox and writes assets/cut/<name>.png, plus a magenta contact sheet. usage: cut.py <gen_dir> <cut_dir>"""
import sys
from pathlib import Path
from PIL import Image
from rembg import remove, new_session
G, C = Path(sys.argv[1]), Path(sys.argv[2]); C.mkdir(parents=True, exist_ok=True)
S = {'obj': new_session('isnet-general-use'), 'hum': new_session('u2net_human_seg')}
done = []
for f in sorted(G.glob('*.png')):
    if f.name.startswith(('_', 't_')): continue
    out = C / f.name
    im = Image.open(f).convert('RGB')
    cut = remove(im, session=S['hum' if f.name.startswith('m_') else 'obj'], post_process_mask=True)
    bb = cut.getchannel('A').point(lambda a: 255 if a > 20 else 0).getbbox()
    if bb: cut = cut.crop(bb)
    cut.save(out); done.append(out); print(f.name, cut.size, flush=True)
for prefix in ('m_', 'o_'):
    items = [p for p in done if p.name.startswith(prefix)]
    if not items: continue
    sheet = Image.new('RGB', (300 * min(5, len(items)), 330 * ((len(items) + 4) // 5)), (255, 0, 255))
    for k, p in enumerate(items):
        im = Image.open(p); im.thumbnail((280, 280)); bg = Image.new('RGBA', (300, 330), (255, 0, 255, 255)); bg.alpha_composite(im, ((300 - im.width) // 2, 10))
        sheet.paste(bg.convert('RGB'), ((k % 5) * 300, (k // 5) * 330))
    sheet.save(C / f'_sheet_{prefix[0]}.jpg', quality=88)

"""Local image generation (LCM-Dreamshaper v7, MIT; SD1.5 base, OpenRAIL-M) -> 3D object renders on white.
usage: gen.py <prompts.json> <outdir>   prompts.json = {"name": "prompt", ...}"""
import json, sys, time, torch
from pathlib import Path
from diffusers import DiffusionPipeline
torch.set_num_threads(4)
STYLE = ", cute 3d cartoon icon, pixar style, glossy, vibrant colors, high key lighting, bright pure white backdrop, product shot, centered, simple"
NEG = "text, letters, watermark, logo, frame, border, cropped, blurry, dark, dim, grey background, shadows, gloomy, photo, realistic, person, hands, messy"
pipe = DiffusionPipeline.from_pretrained('SimianLuo/LCM_Dreamshaper_v7', torch_dtype=torch.float32, safety_checker=None, requires_safety_checker=False)
pipe.set_progress_bar_config(disable=True)
P = json.load(open(sys.argv[1])); out = Path(sys.argv[2]); out.mkdir(parents=True, exist_ok=True)
for i, (name, prompt) in enumerate(P.items()):
    if (out / f'{name}.png').exists(): continue
    t = time.time()
    g = torch.Generator().manual_seed(int(P.get("_seed", 1000)) if False else 777 if name.startswith("m_") else 1000 + i)
    im = pipe(prompt=prompt + STYLE, negative_prompt=NEG, num_inference_steps=8, guidance_scale=8.0, width=512, height=512, generator=g).images[0]
    im.save(out / f'{name}.png'); print(name, f'{time.time() - t:.1f}s', flush=True)

"""Produce the Metapholio hero plate from Thiago's supplied photograph.

Requires Pillow + numpy, only at asset-authoring time. No model/generated face.
Run from project root: python scripts/create-hero-art.py
The mask follows image pixels, never a polygon approximation of the subject.
"""
from pathlib import Path
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageOps, ImageEnhance

root = Path(__file__).resolve().parents[1]
source = root / 'assets/source/thiago-hero.jpg'
out = root / 'public/images'
out.mkdir(parents=True, exist_ok=True)
photo = ImageOps.exif_transpose(Image.open(source)).convert('RGB')
rgb = np.asarray(photo).astype(np.float32)

# Only neutral, bright pixels connected to the outside belong to the backdrop.
# This preserves enclosed whites in the glasses, eyes and highlights.
neutral = ((rgb.min(axis=2) > 184) & (np.ptp(rgb, axis=2) < 25))
background = Image.fromarray((neutral * 255).astype('uint8')).copy()
w, h = background.size
for seed in [(0,0), (w-1,0), (0,h-1), (w-1,h-1)]:
    if background.getpixel(seed) == 255:
        ImageDraw.floodfill(background, seed, 128, thresh=0)
outside = np.asarray(background) == 128
if not .1 < outside.mean() < .9:
    raise ValueError('Backdrop segmentation failed; inspect source before exporting.')
mask = Image.fromarray(np.where(outside, 0, 255).astype('uint8'))
mask = mask.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(.6))

# Preserve photographic features; translate the actual tonal structure to inks.
sharp = photo.filter(ImageFilter.UnsharpMask(radius=1.4, percent=120, threshold=3))
gray = ImageEnhance.Contrast(ImageOps.grayscale(sharp)).enhance(1.12)
continuous = np.asarray(gray).astype(np.float32)
soft = np.asarray(gray.filter(ImageFilter.GaussianBlur(.7))).astype(np.float32)
# Restrained quantization provides print-shaped tone bands without erasing detail.
tone = np.clip(.62 * continuous + .38 * (np.round(soft / 24) * 24), 0, 255)
positions = [0, 42, 92, 139, 180, 219, 255]
inks = np.array([[9,24,28],[15,39,44],[30,78,81],[101,160,156],
                 [191,219,201],[244,243,233],[250,249,241]], dtype=float)
colored = np.stack([np.interp(tone, positions, inks[:,i]) for i in range(3)], axis=-1)

# A fine print screen in real midtones, not an invented noise backdrop.
y, x = np.indices(tone.shape)
spacing = 5.0
u = (x * .866 + y * .5) % spacing - spacing/2
v = (-x * .5 + y * .866) % spacing - spacing/2
midtones = np.clip(1 - np.abs(tone - 138)/90, 0, 1)
screen = (u*u + v*v < .82**2) * midtones * .21
colored *= 1 - screen[...,None]
plate = Image.fromarray(np.clip(colored,0,255).astype('uint8')).convert('RGBA')
plate.putalpha(mask)

# Narrow paper contour and offset magenta registration follow the SAME real mask.
pad = 32
size = (w + pad*2, h + pad*2)
canvas = Image.new('RGBA', size)
registration = Image.new('RGBA', (w,h), '#ff3461')
registration.putalpha(mask.filter(ImageFilter.MaxFilter(11)))
canvas.alpha_composite(registration, (pad-8,pad+9))
paper = Image.new('RGBA', (w,h), '#f4f3e9')
paper.putalpha(mask.filter(ImageFilter.MaxFilter(5)))
canvas.alpha_composite(paper, (pad,pad))
canvas.alpha_composite(plate, (pad,pad))
canvas.save(out / 'thiago-hero-art.webp', quality=91, method=6)

# Save diagnostic composites outside the shipping asset directory.
review = root / '.impeccable/review'
review.mkdir(parents=True, exist_ok=True)
for name, ground in [('light','#f4f3e9'),('dark','#101c20')]:
    proof = Image.new('RGBA', canvas.size, ground)
    proof.alpha_composite(canvas)
    proof.convert('RGB').resize((659,659)).save(review / f'hero-cutout-{name}.jpg', quality=90)
print(f'Generated {out / "thiago-hero-art.webp"}; genuine alpha matte, original features preserved.')

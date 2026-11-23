#!/usr/bin/env python3
"""Converte capturas de tela dos projetos (PNG 1440×900) em public/images/demos/<projeto>/NN.{webp,avif} e NN-720.*.

Uso: python3 scripts/create-demo-shots.py <projeto> <png> [<png> ...] [--mask x,y,w,h,#cor ...]
`--mask` pinta um retângulo antes de exportar (ex.: cobrir o logotipo da empresa parceira, que o roteiro
do portfólio pede para não exibir). Requer ffmpeg (libwebp) e avifenc.
"""
import os, subprocess, sys, tempfile

args = sys.argv[1:]
project, rest = args[0], args[1:]
masks = []
shots = []
i = 0
while i < len(rest):
    if rest[i] == '--mask':
        masks.append(rest[i + 1]); i += 2
    else:
        shots.append(rest[i]); i += 1

out = os.path.join(os.path.dirname(__file__), '..', 'public', 'images', 'demos', project)
os.makedirs(out, exist_ok=True)
draw = ','.join(f"drawbox=x={x}:y={y}:w={w}:h={h}:color={c}:t=fill"
                for x, y, w, h, c in (m.split(',') for m in masks)) or 'null'

for n, png in enumerate(shots, 1):
    name = f'{n:02d}'
    with tempfile.TemporaryDirectory() as tmp:
        for width, suffix in ((1440, ''), (720, '-720')):
            src = os.path.join(tmp, f'{name}{suffix}.png')
            subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-i', png, '-vf', f'{draw},scale={width}:-2:flags=lanczos', src], check=True)
            subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-i', src, '-c:v', 'libwebp', '-quality', '80',
                            os.path.join(out, f'{name}{suffix}.webp')], check=True)
            subprocess.run(['avifenc', '-q', '60', '-s', '6', '--jobs', 'all', src,
                            os.path.join(out, f'{name}{suffix}.avif')], check=True, stdout=subprocess.DEVNULL)
    print(f'{project}/{name} <- {os.path.basename(png)}')

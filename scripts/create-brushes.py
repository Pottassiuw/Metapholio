"""Gera as pinceladas (máscaras SVG) usadas na seleção e nos campos de cor. Sem dependências; semente fixa."""
import math, random
from pathlib import Path

def edge(r, x0, x1, y_of, n):
    return [(x0 + (x1 - x0) * i / n, y_of(x0 + (x1 - x0) * i / n) + r.uniform(-2.5, 2.5) + (r.uniform(-9, 3) if r.random() < .07 else 0)) for i in range(n + 1)]

def stroke(seed, w=1000, h=200):
    r = random.Random(seed)
    ph = [r.uniform(0, 6.3) for _ in range(4)]
    mid = lambda x: 100 + 9 * math.sin(x / w * 3.1 + ph[0])
    half = lambda x: (70 + 10 * math.sin(x / w * 5.3 + ph[1]) + 6 * math.sin(x / w * 13 + ph[2])) * (0.55 + 0.45 * min(1, (x + 10) / 70) ** .5)
    body_end = w * r.uniform(.62, .7)
    top = edge(r, -4, body_end, lambda x: mid(x) - half(x), 70)
    bot = edge(r, -4, body_end, lambda x: mid(x) + half(x), 70)
    # Início rasgado: a tinta pega o papel em dentes irregulares.
    start = [(r.uniform(-4, 10) + 10 * (1 - math.cos((y - mid(0)) / half(0) * 1.4)), y) for y in range(int(mid(0) + half(0)) - 6, int(mid(0) - half(0)), -9)]
    parts = ['M' + ' L'.join(f'{x:.1f} {y:.1f}' for x, y in top + bot[::-1] + start) + ' Z']
    # Cauda: a pincelada se abre em fios de cerda de larguras e comprimentos diferentes.
    y0, y1 = mid(body_end) - half(body_end), mid(body_end) + half(body_end)
    y, k = y0, 0
    while y < y1 - 4:
        t = r.uniform(12, 34); end = min(w - 2, body_end + r.uniform(.15, 1) * (w - body_end))
        a = edge(r, body_end - 140, end, lambda x, y=y: y + (x - body_end) * r.uniform(-.02, .02), 16)
        b = [(x, yy + t * max(.12, 1 - max(0, x - body_end) / (end - body_end + 1))) for x, yy in a]
        parts.append('M' + ' L'.join(f'{x:.1f} {yy:.1f}' for x, yy in a + b[::-1]) + ' Z')
        y += t + r.uniform(.5, 3.5); k += 1
    dots = ''.join(f'<circle cx="{r.uniform(-6, 40) if i % 3 == 0 else r.uniform(body_end, w)}" cy="{r.uniform(10, h - 10):.1f}" r="{r.uniform(1.2, 5):.1f}"/>' for i in range(9))
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" preserveAspectRatio="none"><path d="{" ".join(parts)}"/>{dots}</svg>\n'

out = Path('src/assets/brush'); out.mkdir(parents=True, exist_ok=True)
for i, seed in enumerate((7, 23, 41), 1):
    (out / f'brush-{i}.svg').write_text(stroke(seed))
print('ok', sorted(p.name for p in out.iterdir()))

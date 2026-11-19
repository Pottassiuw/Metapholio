"""Verify generated static routes, local links and assets (href, src, srcset). No dependencies."""
from pathlib import Path
from html.parser import HTMLParser
import os

root = Path(os.environ.get('BUILD_DIR', 'dist'))
base = os.environ.get('BASE_PATH', '/').rstrip('/')
errors = []
class Page(HTMLParser):
    def __init__(self, path):
        super().__init__(); self.path = path
    def handle_starttag(self, tag, attrs):
        for key, raw in attrs:
            if key not in ('href', 'src', 'srcset') or not raw:
                continue
            for value in ([c.strip().split(' ')[0] for c in raw.split(',')] if key == 'srcset' else [raw]):
                self.check(value)
    def check(self, value):
        if not value.startswith('/'):
            return
        if base and not value.startswith(base + '/'):
            errors.append(f'{self.path}: escapes deployment base: {value}')
            return
        relative = value[len(base):].split('#')[0].split('?')[0].lstrip('/')
        target = root / relative
        if target.is_dir(): target = target / 'index.html'
        if not target.is_file(): errors.append(f'{self.path}: missing {value}')
pages = list(root.rglob('*.html'))
for path in pages: Page(path).feed(path.read_text())
assert len(pages) == 21, f"Expected 21 routes, got {len(pages)}"
# Menu: sete entradas; apenas rotas internas têm uma entrada marcada como página atual.
import re
for path in pages:
    html = path.read_text()
    items = re.findall(r'class="menu-item[^"]*"[^>]*data-section="([a-z]+)"', html)
    if not items: continue
    if len(items) != 7 or 'interesses' not in items:
        errors.append(f'{path}: menu has {len(items)} entries {items}')
    expected_current = 0 if path == root / 'index.html' else 1
    if html.count('aria-current="page"') != expected_current:
        errors.append(f'{path}: expected {expected_current} current menu entries')
    if not expected_current and ('class="dial"' in html or 'class="edition"' in html or html.count('class="preview-seal"') != 1):
        errors.append(f'{path}: expected only the preview seal on the home page')
if errors: raise SystemExit('\n'.join(errors))
print(f'PASS: {len(pages)} static pages; local href/src targets exist; menus have 7 entries; base {base or "/"}.')

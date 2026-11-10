"""Verify generated static routes, local links and assets. No dependencies."""
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
        for key, value in attrs:
            if key not in ('href', 'src') or not value or not value.startswith('/'):
                continue
            if base and not value.startswith(base + '/'):
                errors.append(f'{self.path}: escapes deployment base: {value}')
                continue
            relative = value[len(base):].split('#')[0].split('?')[0].lstrip('/')
            target = root / relative
            if target.is_dir(): target = target / 'index.html'
            if not target.is_file(): errors.append(f'{self.path}: missing {value}')
pages = list(root.rglob('*.html'))
for path in pages: Page(path).feed(path.read_text())
assert len(pages) == 12, f'Expected 12 routes, got {len(pages)}'
if errors: raise SystemExit('\n'.join(errors))
print(f'PASS: {len(pages)} static pages; local href/src targets exist; base {base or "/"}.')

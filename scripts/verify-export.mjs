import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve, sep } from 'node:path';
import assert from 'node:assert/strict';
const root = resolve('out');
assert.ok(existsSync(join(root, 'build-info.json')), 'Run npm run build first.');
const { basePath } = JSON.parse(readFileSync(join(root, 'build-info.json'), 'utf8'));
const routes = ['', 'solutions', 'technology', 'projects', 'projects/pea-paro', 'about', 'contact',
  'solutions/embedded-systems', 'solutions/industrial-protocols', 'solutions/smart-grid-analytics'];
for (const route of routes) assert.ok(existsSync(join(root, route, 'index.html')), `Missing page: ${route || '/'}`);
for (const file of ['404.html', 'sitemap.xml', 'robots.txt', '.nojekyll', 'images/logo.png', 'images/pea-paro.webp'])
  assert.ok(existsSync(join(root, file)), `Missing file: ${file}`);
function* walk(dir) { for (const item of readdirSync(dir, { withFileTypes: true })) {
  const full = join(dir, item.name); if (item.isDirectory()) yield* walk(full); else yield full;
} }
let checked = 0;
for (const file of walk(root)) {
  if (!file.endsWith('.html')) continue;
  const html = readFileSync(file, 'utf8');
  // Inspect actual HTML tags; escaped strings in Next.js hydration scripts are not DOM attributes.
  const tags = html.match(/<(?:a|link|script|img)\b[^>]*>/g) ?? [];
  for (const tag of tags) {
    const refs = [...tag.matchAll(/\s(?:src|href)="([^"]+)"/g)].map((m) => m[1]);
    for (const ref of refs) {
      if (!ref.startsWith('/') || ref.startsWith('//')) continue;
      const path = decodeURIComponent(ref.split(/[?#]/)[0]);
      assert.ok(!basePath || path === basePath || path.startsWith(basePath + '/'), `Wrong basePath in ${file}: ${path}`);
      const stripped = basePath ? path.slice(basePath.length) : path;
      let local = resolve(root, '.' + (stripped || '/'));
      assert.ok(local === root || local.startsWith(root + sep), `Unsafe path: ${path}`);
      if (existsSync(local) && statSync(local).isDirectory()) local = join(local, 'index.html');
      assert.ok(existsSync(local), `Broken local link in ${file}: ${path}`);
      checked++;
    }
  }
}
const contact = readFileSync(join(root, 'contact/index.html'), 'utf8');
assert.ok(contact.includes('082-270-5941'), 'Contact number missing.');
assert.ok(contact.includes('tel:+66822705941'), 'Phone link missing.');
console.log(`PASS: ${routes.length} content routes, static metadata, phone and ${checked} local references.`);

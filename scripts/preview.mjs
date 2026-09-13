// Dependency-free preview of the exported files. This is NOT a Next.js server.
import { createServer } from 'node:http';
import { createReadStream, existsSync, readFileSync, statSync } from 'node:fs';
import { resolve, join, extname, sep } from 'node:path';
const root = resolve('out');
if (!existsSync(join(root, 'index.html'))) {
  console.error('Run npm run build before npm run preview.'); process.exit(1);
}
const info = JSON.parse(readFileSync(join(root, 'build-info.json'), 'utf8'));
const basePath = info.basePath || '';
const port = Number(process.env.PORT || 4173);
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('Invalid PORT');
const mime = { '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.css':'text/css; charset=utf-8',
  '.json':'application/json; charset=utf-8', '.txt':'text/plain; charset=utf-8', '.xml':'application/xml; charset=utf-8',
  '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.webp':'image/webp', '.svg':'image/svg+xml', '.ico':'image/x-icon',
  '.glb':'model/gltf-binary', '.gltf':'model/gltf+json', '.bin':'application/octet-stream', '.woff2':'font/woff2' };
function send(req, res, file, status = 200) {
  res.writeHead(status, { 'Content-Type': mime[extname(file)] || 'application/octet-stream',
    'Content-Length': statSync(file).size, 'Cache-Control': 'no-cache', 'X-Content-Type-Options': 'nosniff' });
  if (req.method === 'HEAD') return res.end();
  const stream = createReadStream(file); stream.on('error', () => res.destroy()); stream.pipe(res);
}
const server = createServer((req, res) => {
  if (!['GET', 'HEAD'].includes(req.method || '')) { res.writeHead(405, { Allow: 'GET, HEAD' }); return res.end(); }
  try {
    const url = new URL(req.url || '/', `http://127.0.0.1:${port}`);
    const pathname = decodeURIComponent(url.pathname);
    if (basePath && pathname === '/') { res.writeHead(302, { Location: `${basePath}/` }); return res.end(); }
    if (basePath && pathname !== basePath && !pathname.startsWith(basePath + '/')) return send(req, res, join(root, '404.html'), 404);
    const stripped = basePath ? pathname.slice(basePath.length) : pathname;
    let file = resolve(root, '.' + (stripped || '/'));
    if (file !== root && !file.startsWith(root + sep)) { res.writeHead(400); return res.end('Invalid path'); }
    if (existsSync(file) && statSync(file).isDirectory()) {
      if (!url.pathname.endsWith('/')) { res.writeHead(301, { Location: url.pathname + '/' + url.search }); return res.end(); }
      file = join(file, 'index.html');
    }
    if (!existsSync(file) || !statSync(file).isFile()) return send(req, res, join(root, '404.html'), 404);
    return send(req, res, file);
  } catch { res.writeHead(400); res.end('Invalid request'); }
});
server.on('error', (e) => { console.error(e.message); process.exitCode = 1; });
server.listen(port, '127.0.0.1', () => console.log(`Preview: http://localhost:${port}${basePath}/\nPress Ctrl+C to stop.`));

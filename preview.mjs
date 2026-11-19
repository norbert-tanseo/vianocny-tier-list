import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const root = join(process.cwd(), 'dist');
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json' };
const server = createServer(async (req, res) => {
  const safePath = normalize(req.url?.split('?')[0] || '/').replace(/^([.][.][/\\])+/, '');
  const file = join(root, safePath === '/' ? 'index.html' : safePath.replace(/^[/\\]/, ''));
  try { const body = await readFile(file); res.writeHead(200, { 'content-type': types[extname(file)] || 'application/octet-stream' }); res.end(body); }
  catch { res.writeHead(404); res.end('Not found'); }
});
server.listen(4173, '127.0.0.1', () => console.log('Preview at http://127.0.0.1:4173'));

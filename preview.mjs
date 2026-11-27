import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { watch } from 'node:fs';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { extname, join, normalize } from 'node:path';

const root = join(process.cwd(), 'dist');
const run = promisify(execFile);
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg' };
const liveClients = new Set();
let rebuildTimer;
let rebuilding = false;

function broadcastReload() {
  liveClients.forEach((client) => client.write('data: reload\n\n'));
}

function scheduleRebuild(filename) {
  clearTimeout(rebuildTimer);
  rebuildTimer = setTimeout(async () => {
    if (rebuilding) return;
    rebuilding = true;
    try {
      await run(process.execPath, ['build.mjs'], { cwd: process.cwd() });
      console.log(`Rebuilt after ${filename || 'source'} changed`);
      broadcastReload();
    } catch (error) {
      console.error(error.stderr || error.message);
    } finally {
      rebuilding = false;
    }
  }, 120);
}

const liveReloadScript = `<script>(function(){try{var source=new EventSource('/__live');source.onmessage=function(event){if(event.data==='reload')location.reload()}}catch(error){}}())</script>`;

const server = createServer(async (req, res) => {
  const requestPath = req.url?.split('?')[0] || '/';
  if (requestPath === '/__live') {
    res.writeHead(200, { 'content-type': 'text/event-stream', 'cache-control': 'no-cache', connection: 'keep-alive' });
    res.write(': connected\n\n');
    liveClients.add(res);
    req.on('close', () => liveClients.delete(res));
    return;
  }
  const requestedPath = requestPath;
  const safePath = normalize(requestedPath).replace(/^([.][.][/\\])+/, '');
  const relativePath = safePath === '/' || safePath === '\\' ? 'index.html' : safePath.replace(/^[/\\]/, '') === 'admin' ? 'admin.html' : safePath.replace(/^[/\\]/, '');
  const file = join(root, relativePath);
  try {
    const body = await readFile(file);
    const contentType = types[extname(file)] || 'application/octet-stream';
    const responseBody = extname(file) === '.html' ? body.toString().replace('</body>', `${liveReloadScript}</body>`) : body;
    res.writeHead(200, { 'content-type': contentType });
    res.end(responseBody);
  }
  catch { res.writeHead(404); res.end('Not found'); }
});

watch(join(process.cwd(), 'src'), { recursive: true }, (_event, filename) => scheduleRebuild(filename));
server.listen(4173, '127.0.0.1', () => console.log('Preview at http://127.0.0.1:4173 (watching src/)'));


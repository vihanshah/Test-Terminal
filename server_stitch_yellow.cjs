const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PUBLIC_DIR = path.join(__dirname, 'stitch_multipage_backup');

// Ensure index.html exists in stitch_multipage_backup
const dashboardPath = path.join(PUBLIC_DIR, 'dashboard.html');
const indexPath = path.join(PUBLIC_DIR, 'index.html');
if (fs.existsSync(dashboardPath) && !fs.existsSync(indexPath)) {
  fs.copyFileSync(dashboardPath, indexPath);
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURIComponent(req.url.split('?')[0]);
  if (reqPath === '/' || reqPath === '') {
    reqPath = '/index.html';
  }

  let filePath = path.join(PUBLIC_DIR, reqPath);

  // If path doesn't have an extension, try appending .html
  if (!path.extname(filePath) && fs.existsSync(filePath + '.html')) {
    filePath = filePath + '.html';
  }

  // Security check: ensure path is within PUBLIC_DIR
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Access-Control-Allow-Origin': '*'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

let DEFAULT_PORT = 3002;

function startServer(port) {
  server.listen(port, '0.0.0.0', () => {
    const url = `http://localhost:${port}`;
    console.log(`\n======================================================`);
    console.log(`  🦅 Stitch Yellow/Amber UI Terminal Live Server`);
    console.log(`  Localhost URL: ${url}`);
    console.log(`  Serving Folder: ${PUBLIC_DIR}`);
    console.log(`======================================================\n`);

    // Auto-launch browser
    const startCmd = process.platform === 'win32' ? `start ${url}` : process.platform === 'darwin' ? `open ${url}` : `xdg-open ${url}`;
    exec(startCmd, (err) => {
      if (err) {
        console.log(`Please open ${url} in your browser.`);
      } else {
        console.log(`Browser automatically launched at ${url}!`);
      }
    });
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} in use, trying port ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error('Server error:', err);
    }
  });
}

startServer(DEFAULT_PORT);

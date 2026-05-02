import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// @ts-ignore - Server bundle doesn't have type declarations
import server from '../dist/server/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function getOrigin(req: any) {
  const host = req.headers.host || 'localhost';
  const proto = req.headers['x-forwarded-proto'] || 'https';
  return `${proto}://${host}`;
}

function makeHeaders(headers: Record<string, string | string[] | undefined>) {
  const result = new Headers();

  for (const [key, value] of Object.entries(headers)) {
    if (!value) continue;
    if (Array.isArray(value)) {
      for (const item of value) {
        result.append(key, item);
      }
    } else {
      result.append(key, value);
    }
  }

  return result;
}

export default async function handler(req: any, res: any) {
  try {
    // Try to serve static assets from dist/client
    const filePath = path.join(__dirname, '..', 'dist', 'client', req.url);
    
    try {
      const stat = await fs.stat(filePath);
      if (stat.isFile()) {
        const content = await fs.readFile(filePath);
        const ext = path.extname(filePath);
        const mimeTypes: Record<string, string> = {
          '.js': 'application/javascript',
          '.css': 'text/css',
          '.html': 'text/html',
          '.json': 'application/json',
          '.png': 'image/png',
          '.jpg': 'image/jpeg',
          '.jpeg': 'image/jpeg',
          '.gif': 'image/gif',
          '.svg': 'image/svg+xml',
          '.woff': 'font/woff',
          '.woff2': 'font/woff2',
          '.ttf': 'font/ttf',
          '.eot': 'application/vnd.ms-fontobject',
        };
        
        res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
        res.setHeader('Cache-Control', ext === '.html' ? 'no-cache' : 'public, max-age=31536000');
        return res.end(content);
      }
    } catch (err: any) {
      if (err.code !== 'ENOENT') throw err;
    }
    
    // Fall through to SSR
    const origin = getOrigin(req);
    const request = new Request(origin + req.url, {
      method: req.method,
      headers: makeHeaders(req.headers),
      body: req.method === 'GET' || req.method === 'HEAD' ? undefined : req,
    });

    const response = await server.default.fetch(request);

    res.statusCode = response.status;
    response.headers.forEach((value: string, key: string) => {
      if (key.toLowerCase() === 'transfer-encoding') return;
      res.setHeader(key, value);
    });

    const body = await response.arrayBuffer();
    res.setHeader('content-length', Buffer.byteLength(Buffer.from(body)).toString());
    res.end(Buffer.from(body));
  } catch (error) {
    console.error('Render handler error:', error);
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
}

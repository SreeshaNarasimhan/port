import server from '../dist/server/index.js';

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
  const origin = getOrigin(req);
  const request = new Request(origin + req.url, {
    method: req.method,
    headers: makeHeaders(req.headers),
    body: req.method === 'GET' || req.method === 'HEAD' ? undefined : req,
  });

  const response = await server.default.fetch(request);

  res.statusCode = response.status;
  response.headers.forEach((value, key) => {
    if (key.toLowerCase() === 'transfer-encoding') return;
    res.setHeader(key, value);
  });

  const body = await response.arrayBuffer();
  res.setHeader('content-length', Buffer.byteLength(Buffer.from(body)).toString());
  res.end(Buffer.from(body));
}

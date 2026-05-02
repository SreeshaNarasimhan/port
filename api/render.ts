import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In Vercel, process.cwd() returns the project root
const projectRoot = process.cwd();

function getOrigin(req: any) {
  const host = req.headers.host || "localhost";
  const proto = req.headers["x-forwarded-proto"] || "https";
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

let serverModule: any = null;

async function loadServer() {
  if (serverModule) return serverModule;
  try {
    const serverPath = path.join(projectRoot, "dist", "server", "index.js");
    console.log("Loading server from:", serverPath);
    serverModule = await import(serverPath);
    console.log("Server module loaded successfully");
    return serverModule;
  } catch (err) {
    console.error("Failed to load server module:", err);
    return null;
  }
}

export default async function handler(req: any, res: any) {
  try {
    // Try to serve static assets from dist/client
    const assetPath = path.join(projectRoot, "dist", "client", req.url);

    try {
      const stat = await fs.stat(assetPath);
      if (stat.isFile()) {
        const content = await fs.readFile(assetPath);
        const ext = path.extname(assetPath);
        const mimeTypes: Record<string, string> = {
          ".js": "application/javascript",
          ".css": "text/css",
          ".html": "text/html",
          ".json": "application/json",
          ".png": "image/png",
          ".jpg": "image/jpeg",
          ".jpeg": "image/jpeg",
          ".gif": "image/gif",
          ".svg": "image/svg+xml",
          ".woff": "font/woff",
          ".woff2": "font/woff2",
          ".ttf": "font/ttf",
          ".eot": "application/vnd.ms-fontobject",
        };

        res.setHeader("Content-Type", mimeTypes[ext] || "application/octet-stream");
        res.setHeader("Cache-Control", ext === ".html" ? "no-cache" : "public, max-age=31536000");
        return res.end(content);
      }
    } catch (err: any) {
      if (err.code !== "ENOENT") {
        console.error("Error serving static file:", err);
      }
    }

    // Fall through to SSR
    console.log("Attempting SSR for:", req.url);
    const server = await loadServer();
    if (!server || !server.default) {
      console.error("Server module not available");
      res.statusCode = 500;
      return res.end("Server initialization failed");
    }

    const origin = getOrigin(req);
    const request = new Request(origin + req.url, {
      method: req.method,
      headers: makeHeaders(req.headers),
      body: req.method === "GET" || req.method === "HEAD" ? undefined : req,
    });

    console.log("Invoking server.default.fetch");
    const response = await server.default.fetch(request);

    res.statusCode = response.status;
    response.headers.forEach((value: string, key: string) => {
      if (key.toLowerCase() === "transfer-encoding") return;
      res.setHeader(key, value);
    });

    const body = await response.arrayBuffer();
    res.setHeader("content-length", Buffer.byteLength(Buffer.from(body)).toString());
    res.end(Buffer.from(body));
  } catch (error) {
    console.error("Render handler error:", error);
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
}

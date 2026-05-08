import http from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, normalize, resolve } from "node:path";
import {
  hasBlobStore,
  ownerCode as expectedOwnerCode,
  readProfile,
  saveUpload,
  writeProfile
} from "./lib/portfolio-storage.mjs";

const root = resolve(process.cwd());
const port = Number(process.env.PORT || 4173);
const host = process.env.HOST || "0.0.0.0";

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".pdf": "application/pdf"
};

async function readJsonBody(request) {
  let body = "";
  for await (const chunk of request) {
    body += chunk;
    if (body.length > 4_500_000) {
      throw new Error("Request body too large");
    }
  }
  return body ? JSON.parse(body) : {};
}

function sendJson(response, status, payload) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  response.end(JSON.stringify(payload));
}

async function handleProfileApi(request, response) {
  if (request.method === "GET") {
    try {
      const profile = await readProfile(root);
      sendJson(response, 200, { profile, permanent: hasBlobStore() || !process.env.VERCEL });
    } catch (error) {
      if (error.code === "ENOENT") {
        sendJson(response, 200, { profile: null });
        return;
      }
      sendJson(response, 500, { error: "Could not read profile" });
    }
    return;
  }

  if (request.method === "PUT") {
    if (request.headers["x-owner-code"] !== expectedOwnerCode()) {
      sendJson(response, 401, { error: "Invalid owner code" });
      return;
    }

    try {
      const body = await readJsonBody(request);
      if (!body || typeof body.profile !== "object" || Array.isArray(body.profile)) {
        sendJson(response, 400, { error: "Invalid profile payload" });
        return;
      }
      const result = await writeProfile(body.profile, root);
      sendJson(response, 200, { ok: true, storage: result.storage });
    } catch (error) {
      sendJson(response, 500, { error: error.message || "Could not save profile" });
    }
    return;
  }

  sendJson(response, 405, { error: "Method not allowed" });
}

async function handleUploadApi(request, response) {
  if (request.method !== "POST") {
    sendJson(response, 405, { error: "Method not allowed" });
    return;
  }

  if (request.headers["x-owner-code"] !== expectedOwnerCode()) {
    sendJson(response, 401, { error: "Invalid owner code" });
    return;
  }

  try {
    const body = await readJsonBody(request);
    const result = await saveUpload(body, root);
    sendJson(response, 200, { ok: true, ...result });
  } catch (error) {
    sendJson(response, 400, { error: error.message || "Could not upload file" });
  }
}

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url || "/", `http://${request.headers.host}`);
  if (url.pathname === "/api/profile") {
    await handleProfileApi(request, response);
    return;
  }
  if (url.pathname === "/api/upload") {
    await handleUploadApi(request, response);
    return;
  }

  const decodedPath = decodeURIComponent(url.pathname);
  const cleanPath = normalize(decodedPath).replace(/^[/\\]+/, "").replace(/^(\.\.[/\\])+/, "");
  const requested = resolve(join(root, cleanPath || "."));

  if (!requested.startsWith(root)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  let filePath = requested;
  if (!existsSync(filePath)) {
    response.writeHead(404);
    response.end("Not found");
    return;
  }

  if (statSync(filePath).isDirectory()) {
    filePath = join(filePath, "index.html");
  }

  const type = types[extname(filePath)] || "application/octet-stream";
  response.writeHead(200, { "Content-Type": type });
  createReadStream(filePath).pipe(response);
});

server.listen(port, host, () => {
  if (process.stdout.isTTY) {
    console.log(`Portfolio running at http://127.0.0.1:${port}`);
  }
});

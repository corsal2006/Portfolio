import http from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { extname, join, normalize, resolve } from "node:path";

const root = resolve(process.cwd());
const port = Number(process.env.PORT || 4173);
const host = process.env.HOST || "0.0.0.0";
const ownerCode = process.env.OWNER_CODE || "23";
const profilePath = join(root, "data", "profile.json");

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".webp": "image/webp"
};

async function readJsonBody(request) {
  let body = "";
  for await (const chunk of request) {
    body += chunk;
    if (body.length > 1_000_000) {
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
      const profile = JSON.parse(await readFile(profilePath, "utf8"));
      sendJson(response, 200, { profile });
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
    if (request.headers["x-owner-code"] !== ownerCode) {
      sendJson(response, 401, { error: "Invalid owner code" });
      return;
    }

    try {
      const body = await readJsonBody(request);
      if (!body || typeof body.profile !== "object" || Array.isArray(body.profile)) {
        sendJson(response, 400, { error: "Invalid profile payload" });
        return;
      }
      await mkdir(join(root, "data"), { recursive: true });
      await writeFile(profilePath, JSON.stringify(body.profile, null, 2), "utf8");
      sendJson(response, 200, { ok: true });
    } catch {
      sendJson(response, 500, { error: "Could not save profile" });
    }
    return;
  }

  sendJson(response, 405, { error: "Method not allowed" });
}

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url || "/", `http://${request.headers.host}`);
  if (url.pathname === "/api/profile") {
    await handleProfileApi(request, response);
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

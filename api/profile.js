import {
  hasBlobStore,
  ownerCode as expectedOwnerCode,
  readProfile,
  writeProfile
} from "../lib/portfolio-storage.mjs";

async function readJsonBody(request) {
  if (request.body) {
    if (typeof request.body === "string") return JSON.parse(request.body);
    if (Buffer.isBuffer(request.body)) return JSON.parse(request.body.toString("utf8"));
    return request.body;
  }

  let body = "";
  for await (const chunk of request) {
    body += chunk;
    if (body.length > 4_500_000) throw new Error("Request body too large");
  }
  return body ? JSON.parse(body) : {};
}

function sendJson(response, status, payload) {
  response.statusCode = status;
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.setHeader("Cache-Control", "no-store");
  response.end(JSON.stringify(payload));
}

export default async function handler(request, response) {
  if (request.method === "GET") {
    try {
      sendJson(response, 200, { profile: await readProfile(), permanent: hasBlobStore() || !process.env.VERCEL });
    } catch {
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

      const result = await writeProfile(body.profile);
      sendJson(response, 200, { ok: true, storage: result.storage });
    } catch (error) {
      sendJson(response, 500, { error: error.message || "Could not save profile" });
    }
    return;
  }

  sendJson(response, 405, { error: "Method not allowed" });
}

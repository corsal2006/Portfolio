import { ownerCode as expectedOwnerCode, saveUpload } from "../lib/portfolio-storage.mjs";

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
  if (request.method !== "POST") {
    sendJson(response, 405, { error: "Method not allowed" });
    return;
  }

  if (request.headers["x-owner-code"] !== expectedOwnerCode()) {
    sendJson(response, 401, { error: "Invalid owner code" });
    return;
  }

  try {
    const result = await saveUpload(await readJsonBody(request));
    sendJson(response, 200, { ok: true, ...result });
  } catch (error) {
    sendJson(response, 400, { error: error.message || "Could not upload file" });
  }
}

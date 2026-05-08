import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { basename, extname, join, resolve } from "node:path";
import { get, put } from "@vercel/blob";

const PROFILE_BLOB_PATH = process.env.PROFILE_BLOB_PATH || "portfolio/profile.json";
const UPLOAD_BLOB_PREFIX = process.env.UPLOAD_BLOB_PREFIX || "portfolio/uploads";
const MAX_UPLOAD_BYTES = 3_000_000;

const imageTypes = new Set(["image/png", "image/jpeg", "image/webp", "image/gif"]);
const pdfTypes = new Set(["application/pdf"]);
const typeByExtension = new Map([
  [".gif", "image/gif"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".pdf", "application/pdf"],
  [".png", "image/png"],
  [".webp", "image/webp"]
]);

export function hasBlobStore() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

export function ownerCode() {
  return process.env.OWNER_CODE || "23";
}

function profileFilePath(root) {
  return join(resolve(root), "data", "profile.json");
}

async function streamToText(stream) {
  return new Response(stream).text();
}

export async function readProfile(root = process.cwd()) {
  if (hasBlobStore()) {
    const stored = await get(PROFILE_BLOB_PATH, {
      access: "private",
      useCache: false
    });

    if (stored?.statusCode === 200 && stored.stream) {
      return JSON.parse(await streamToText(stored.stream));
    }
  }

  const path = profileFilePath(root);
  if (!existsSync(path)) return null;
  return JSON.parse(await readFile(path, "utf8"));
}

export async function writeProfile(profile, root = process.cwd()) {
  if (hasBlobStore()) {
    await put(PROFILE_BLOB_PATH, JSON.stringify(profile, null, 2), {
      access: "private",
      allowOverwrite: true,
      contentType: "application/json",
      cacheControlMaxAge: 60
    });
    return { storage: "blob" };
  }

  if (process.env.VERCEL) {
    throw new Error("BLOB_READ_WRITE_TOKEN is required for permanent saves on Vercel.");
  }

  const path = profileFilePath(root);
  await mkdir(join(resolve(root), "data"), { recursive: true });
  await writeFile(path, JSON.stringify(profile, null, 2), "utf8");
  return { storage: "file" };
}

function decodeUpload(dataUrl) {
  const match = String(dataUrl || "").match(/^data:([^;,]+)?(;base64)?,(.*)$/);
  if (!match) throw new Error("Invalid upload data.");

  const contentType = match[1] || "application/octet-stream";
  const payload = match[3] || "";
  const buffer = match[2] ? Buffer.from(payload, "base64") : Buffer.from(decodeURIComponent(payload));

  if (buffer.byteLength > MAX_UPLOAD_BYTES) {
    throw new Error("File is too large. Keep uploads under 3 MB.");
  }

  return { buffer, contentType };
}

function safeFileName(fileName, kind, contentType) {
  const fallbackExtension = contentType === "application/pdf" ? ".pdf" : ".png";
  const extension = extname(fileName || "").toLowerCase() || fallbackExtension;
  const name = basename(fileName || `${kind}${extension}`, extension)
    .replace(/[^a-z0-9_-]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);

  return `${name || kind}-${Date.now()}${extension}`;
}

function normalizeContentType(fileName, contentType) {
  const extension = extname(fileName || "").toLowerCase();
  return contentType || typeByExtension.get(extension) || "application/octet-stream";
}

function assertAllowedUpload(kind, fileName, contentType) {
  const normalized = normalizeContentType(fileName, contentType);
  const allowed = kind === "resume" ? pdfTypes : imageTypes;

  if (!allowed.has(normalized)) {
    throw new Error(kind === "resume" ? "Upload a PDF resume." : "Upload a PNG, JPG, WebP, or GIF image.");
  }

  return normalized;
}

export async function saveUpload({ kind, fileName, contentType, dataUrl }, root = process.cwd()) {
  const uploadKind = ["profile-photo", "project-image", "resume"].includes(kind) ? kind : "project-image";
  const normalizedType = assertAllowedUpload(uploadKind, fileName, contentType);
  const { buffer } = decodeUpload(dataUrl);
  const safeName = safeFileName(fileName, uploadKind, normalizedType);

  if (hasBlobStore()) {
    const blob = await put(`${UPLOAD_BLOB_PREFIX}/${uploadKind}/${safeName}`, buffer, {
      access: "public",
      addRandomSuffix: true,
      contentType: normalizedType
    });
    return { url: blob.url, storage: "blob" };
  }

  if (process.env.VERCEL) {
    throw new Error("BLOB_READ_WRITE_TOKEN is required for permanent uploads on Vercel.");
  }

  const uploadDir = join(resolve(root), "data", "uploads", uploadKind);
  await mkdir(uploadDir, { recursive: true });
  const diskPath = join(uploadDir, safeName);
  await writeFile(diskPath, buffer);

  return {
    url: `/data/uploads/${uploadKind}/${safeName}`,
    storage: "file"
  };
}

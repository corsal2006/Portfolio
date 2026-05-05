require("module").Module._initPaths();

const http = require("http");
const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");
const { PNG } = require("pngjs");

const root = process.cwd();
let memoryProfile = null;
const types = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".mjs": "text/javascript",
  ".json": "application/json"
};

const server = http.createServer((req, res) => {
  const url = new URL(req.url || "/", "http://127.0.0.1");

  if (url.pathname === "/api/profile") {
    if (req.method === "GET") {
      res.writeHead(200, { "Content-Type": "application/json", "Cache-Control": "no-store" });
      res.end(JSON.stringify({ profile: memoryProfile }));
      return;
    }

    if (req.method === "PUT") {
      if (req.headers["x-owner-code"] !== "23") {
        res.writeHead(401, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid owner code" }));
        return;
      }

      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });
      req.on("end", () => {
        memoryProfile = JSON.parse(body).profile;
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ ok: true }));
      });
      return;
    }
  }

  const cleanPath = path
    .normalize(decodeURIComponent(url.pathname))
    .replace(/^[/\\]+/, "")
    .replace(/^(\.\.[/\\])+/, "");
  let filePath = path.resolve(path.join(root, cleanPath || "."));

  if (!filePath.startsWith(root)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  if (!fs.existsSync(filePath)) {
    res.writeHead(404);
    res.end("Not found");
    return;
  }

  if (fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, "index.html");
  }

  res.writeHead(200, { "Content-Type": types[path.extname(filePath)] || "application/octet-stream" });
  fs.createReadStream(filePath).pipe(res);
});

function canvasStats(dataUrl) {
  const png = PNG.sync.read(Buffer.from(dataUrl.split(",")[1], "base64"));
  let nonTransparent = 0;
  let colored = 0;
  let samples = 0;

  for (let y = 0; y < png.height; y += 8) {
    for (let x = 0; x < png.width; x += 8) {
      const i = (png.width * y + x) << 2;
      const r = png.data[i];
      const g = png.data[i + 1];
      const b = png.data[i + 2];
      const a = png.data[i + 3];
      samples += 1;
      if (a > 8) nonTransparent += 1;
      if (a > 8 && r + g + b > 30) colored += 1;
    }
  }

  return { width: png.width, height: png.height, samples, nonTransparent, colored };
}

(async () => {
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const port = server.address().port;
  const url = `http://127.0.0.1:${port}/`;
  fs.mkdirSync(path.join(root, "screenshots"), { recursive: true });

  const executablePath =
    process.env.PLAYWRIGHT_CHROME_PATH ||
    (fs.existsSync("C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe")
      ? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
      : "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe");
  const browser = await chromium.launch({ headless: true, executablePath });
  const results = [];

  for (const spec of [
    { name: "desktop", width: 1440, height: 900 },
    { name: "mobile", width: 390, height: 844 }
  ]) {
    const context = await browser.newContext({
      viewport: { width: spec.width, height: spec.height },
      deviceScaleFactor: 1
    });
    const page = await context.newPage();
    const errors = [];

    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    page.on("pageerror", (err) => errors.push(err.message));

    await page.goto(url, { waitUntil: "networkidle" });
    await page.waitForTimeout(1400);
    await page.screenshot({ path: path.join(root, "screenshots", `${spec.name}.png`), fullPage: false });

    const canvasData = await page.evaluate(() => {
      const canvas = document.getElementById("neural-scene");
      const rect = canvas.getBoundingClientRect();
      return {
        rect: { width: rect.width, height: rect.height },
        url: canvas.toDataURL("image/png")
      };
    });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    const result = {
      ...spec,
      errors,
      canvasRect: canvasData.rect,
      canvas: canvasStats(canvasData.url),
      overflow
    };

    if (spec.name === "desktop") {
      await page.click("#edit-toggle");
      await page.fill("#owner-code", "23");
      await page.click("#unlock-form button[type=submit]");
      await page.waitForTimeout(250);
      result.unlocked = await page.locator("#editor-workspace").isVisible();
      await page.fill("#name", "Siddesh Naik API Test");
      await page.waitForTimeout(900);
      result.serverSaved = memoryProfile?.name === "Siddesh Naik API Test";
    }

    results.push(result);
    await context.close();
  }

  await browser.close();
  server.close();
  console.log(JSON.stringify(results, null, 2));
})().catch((error) => {
  server.close();
  console.error(error);
  process.exit(1);
});

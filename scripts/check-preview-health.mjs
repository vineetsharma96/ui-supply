import { chromium } from "playwright";
import fs from "node:fs/promises";
import { catalog } from "../src/catalog.js";

// Remote font loading must not turn a successfully rendered demo into a
// screenshot timeout. Captures intentionally exercise system font fallbacks.
process.env.PW_TEST_SCREENSHOT_NO_FONTS_READY = "1";

// Check the actual preview documents, not just whether a React wrapper exists.
// Screenshots are kept local for inspecting layout failures and contact sheets.
const base = process.env.PREVIEW_URL || "http://127.0.0.1:5173";
const phase = process.env.AUDIT_PHASE || "before";
const folder = `references/preview-health/${phase}`;
await fs.mkdir(folder, { recursive: true });
const retry = process.argv.includes("--retry");
const selected = retry
  ? (await Promise.all(catalog.map(async item => {
      const old = await fs.readFile(`${folder}/worker-${item.id}.json`, "utf8").then(JSON.parse).catch(() => null);
      return !old || old.status !== "rendered" || !old.mobile ? item : null;
    }))).filter(Boolean)
  : process.argv[2] ? catalog.filter((item) => new RegExp(process.argv[2]).test(item.id)) : catalog;
let browser;
const results = [];
let next = 0;
let batchEnd = 0;

async function measure(page) {
  return page.evaluate(() => {
    const root = document.querySelector(".ff-demo");
    if (!root) return { missing: true };
    const box = root.getBoundingClientRect();
    const images = [...document.images].filter((img) => {
      const b = img.getBoundingClientRect();
      return b.width > 10 && b.height > 10;
    });
    const controls = [...root.querySelectorAll("button,input,select,textarea")]
      .filter((node) => {
        const style = getComputedStyle(node);
        const r = node.getBoundingClientRect();
        return style.display !== "none" && style.visibility !== "hidden" &&
          Number(style.opacity) > 0 && r.width > 4 && r.height > 4 &&
          !node.closest("[aria-hidden=true]") &&
          (r.right < 0 || r.left > innerWidth || r.bottom < 0 || r.top > innerHeight);
      })
      .map((node) => (node.getAttribute("aria-label") || node.textContent || node.tagName).trim().slice(0, 70));
    return {
      missing: false,
      root: { width: Math.round(box.width), height: Math.round(box.height) },
      document: { width: document.documentElement.scrollWidth, height: document.documentElement.scrollHeight },
      viewport: { width: innerWidth, height: innerHeight },
      overflowX: document.documentElement.scrollWidth > innerWidth + 2,
      belowViewportControls: [...new Set(controls)].slice(0, 25),
      brokenImages: images.filter((img) => img.complete && !img.naturalWidth).map((img) => img.currentSrc || img.src),
      pendingImages: images.filter((img) => !img.complete).length,
      text: root.innerText.trim().slice(0, 180),
      canvas: root.querySelectorAll("canvas").length,
    };
  });
}

async function worker() {
  const context = await browser.newContext({ viewport: { width: 840, height: 460 } });
  // Remote font availability must not block capturing the UI. System fallbacks
  // are part of the catalog's supported layout, while media requests stay live.
  await context.route("https://fonts.googleapis.com/**", route => route.abort());
  await context.route("https://fonts.gstatic.com/**", route => route.abort());
  // Don't ask for camera/microphone access while reviewing unrelated previews.
  await context.addInitScript(() => {
    if (navigator.mediaDevices) navigator.mediaDevices.getUserMedia = () => Promise.reject(new DOMException("Preview audit does not enable capture", "NotAllowedError"));
  });
  let page = await context.newPage();
  let count = 0;
  while (next < batchEnd) {
    const item = selected[next++];
    const row = { id: item.id, imported: !!item.imported, errors: [], failedRequests: [] };
    if (count++ && count % 30 === 0) { await page.close(); page = await context.newPage(); }
    const error = (e) => row.errors.push(e.message);
    const failed = (request) => {
      if (!request.failure()?.errorText.includes("ERR_ABORTED")) row.failedRequests.push({ url: request.url(), error: request.failure()?.errorText });
    };
    page.on("pageerror", error);
    page.on("requestfailed", failed);
    try {
      await page.setViewportSize({ width: 840, height: 460 });
      await page.goto(`${base}/?preview=${item.id}&theme=dark`, { waitUntil: "domcontentloaded", timeout: 45000 });
      await page.locator(".ff-demo,.preview-error").first().waitFor({ timeout: 30000 });
      await page.waitForTimeout(1000);
      row.error = await page.locator(".preview-error").textContent({ timeout: 50 }).catch(() => null);
      row.desktop = await measure(page);
      await page.screenshot({ path: `${folder}/${item.id}-desktop.jpg`, type: "jpeg", quality: 65, animations: "disabled", timeout: 20000 });
      await page.setViewportSize({ width: 390, height: 460 });
      await page.evaluate(() => { document.documentElement.dataset.theme = "light"; document.documentElement.classList.remove("dark"); window.scrollTo(0, 0); });
      await page.waitForTimeout(300);
      row.mobile = await measure(page);
      await page.screenshot({ path: `${folder}/${item.id}-mobile.jpg`, type: "jpeg", quality: 65, animations: "disabled", timeout: 20000 });
      row.status = row.error || row.errors.length || row.desktop.missing ? "failed" : "rendered";
    } catch (e) { row.status = "failed"; row.error = e.message.slice(0, 600); }
    page.off("pageerror", error);
    page.off("requestfailed", failed);
    results.push(row);
    console.log(`${results.length}/${selected.length} ${row.status.toUpperCase()} ${item.id}${row.desktop?.overflowX || row.mobile?.overflowX ? " [overflow]" : ""}${row.error ? " " + row.error.slice(0, 160) : ""}`);
    // One writer: this synchronous-in-order snapshot cannot interleave writes.
    await fs.writeFile(`${folder}/worker-${row.id}.json`, JSON.stringify(row, null, 2));
  }
  await context.close();
}

while (next < selected.length) {
  // Restart Chrome periodically: 304 WebGL/media demos otherwise leave large
  // renderer caches on small-memory machines and cause misleading timeouts.
  batchEnd = Math.min(next + 24, selected.length);
  browser = await chromium.launch({ channel: "chrome", headless: true });
  try { await Promise.all([worker(), worker()]); } finally { await browser.close(); }
}
const saved = (await Promise.all(catalog.map(item => fs.readFile(`${folder}/worker-${item.id}.json`, "utf8").then(JSON.parse).catch(() => null)))).filter(Boolean);
await fs.writeFile(`${folder}/results.json`, JSON.stringify(saved, null, 2));
const issues = results.filter(row => row.status === "failed" || row.desktop?.overflowX || row.mobile?.overflowX || row.desktop?.brokenImages.length || row.mobile?.brokenImages.length);
console.log(JSON.stringify({ checked: results.length, failed: results.filter(x=>x.status==="failed").map(x=>({id:x.id,error:x.error,errors:x.errors})), flagged: issues.map(x=>x.id) }, null, 2));
if (issues.length) process.exitCode = 1;

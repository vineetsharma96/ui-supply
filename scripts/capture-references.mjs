// Public previews only: no login, paid source, or access-control workarounds.
import { chromium } from "playwright";
import fs from "node:fs/promises";
const index = JSON.parse(await fs.readFile("references/skiper-index.json", "utf8"));
const folder = "references/skiper-previews";
await fs.mkdir(folder, { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const pending = [...index.component_cards];
const results = [];
try {
  await Promise.all([0, 1].map(async () => {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1 });
    for (let item; (item = pending.shift());) {
      const id = item.url.split("/").pop();
      try {
        await fs.access(`${folder}/${id}.jpg`);
        results.push({ ...item, screenshot: `${folder}/${id}.jpg`, status: "captured" });
        continue;
      } catch {}
      try {
        await page.goto(item.url, { waitUntil: "domcontentloaded", timeout: 30000 });
        await page.waitForTimeout(1800);
        const text = await page.locator("body").innerText();
        const iframes = await page.locator("iframe").evaluateAll(nodes => nodes.map(n => n.src));
        await page.screenshot({ path: `${folder}/${id}.jpg`, type: "jpeg", quality: 78 });
        await fs.writeFile(`${folder}/${id}.txt`, text);
        results.push({ ...item, screenshot: `${folder}/${id}.jpg`, iframes, status: "captured" });
        console.log("CAPTURED", id, item.title);
      } catch (error) {
        results.push({ ...item, status: "failed", reason: error.message });
        console.log("FAILED", id, error.message.slice(0,100));
      }
      await fs.writeFile("references/skiper-capture-results.json", JSON.stringify(results, null, 2));
    }
    await page.close();
  }));
} finally { await browser.close(); }
await fs.writeFile("references/skiper-capture-results.json", JSON.stringify(results, null, 2));
console.log("Captured", results.filter(x => x.status === "captured").length, "of", index.component_cards.length);

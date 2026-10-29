import fs from "node:fs/promises";
import { chromium } from "playwright";
import { catalog } from "../src/catalog.js";
const phase = process.argv[2] || "before";
const device = process.argv[3] || "desktop";
const folder = `references/preview-health/${phase}`;
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1800 } });
  for (let offset = 0; offset < catalog.length; offset += 24) {
    const cards = await Promise.all(catalog.slice(offset, offset + 24).map(async (item) => {
      const data = await fs.readFile(`${folder}/${item.id}-${device}.jpg`).catch(() => null);
      return `<figure><figcaption>${item.index}. ${item.id}</figcaption>${data ? `<img src="data:image/jpeg;base64,${data.toString("base64")}"/>` : '<div class="missing">Capture pending</div>'}</figure>`;
    }));
    await page.setContent(`<style>*{box-sizing:border-box}body{margin:0;background:#3b4036;display:grid;grid-template-columns:repeat(3,1fr);gap:6px;color:white;font:14px Arial}figure{margin:0;background:#171b15}figcaption{padding:9px;height:36px}img{width:100%;height:260px;object-fit:contain;display:block}.missing{height:260px;padding:50px}</style>${cards.join("")}`);
    await page.screenshot({ path: `${folder}/sheet-${device === "mobile" ? "mobile-" : ""}${String(offset / 24 + 1).padStart(2, "0")}.jpg`, type: "jpeg", quality: 75, fullPage: true });
  }
} finally { await browser.close(); }

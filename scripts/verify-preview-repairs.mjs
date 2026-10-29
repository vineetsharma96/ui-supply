import { chromium } from "playwright";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
process.env.PW_TEST_SCREENSHOT_NO_FONTS_READY = "1";

const base = process.env.PREVIEW_URL || "http://127.0.0.1:5173";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const context = await browser.newContext({ viewport: { width: 390, height: 460 }, reducedMotion: "reduce" });
await context.route("https://fonts.googleapis.com/**", route => route.abort());
await context.route("https://fonts.gstatic.com/**", route => route.abort());
const page = await context.newPage();
const errors = [];
page.on("pageerror", error => errors.push(error.message));
const passed = [];
await fs.mkdir("references/preview-health/repairs", { recursive: true });
async function preview(id) {
  await page.goto(`${base}/?preview=${id}&theme=dark`, { waitUntil: "domcontentloaded" });
  await page.locator(".ff-demo").waitFor();
  await page.waitForTimeout(700);
  assert.equal(await page.locator("html").evaluate(el => el.classList.contains("dark")), true);
}
async function check(name, run) { await run(); passed.push(name); console.log("PASS", name); }
try {
  await preview("glass-dock");
  await check("Glass Dock has seven visible, sized icons", async () => {
    const icons = page.locator("button[aria-label] svg");
    assert.equal(await icons.count(), 7);
    for (const icon of await icons.all()) {
      const box = await icon.boundingBox();
      assert.ok(box.width >= 16 && box.width <= 30 && box.x >= 0 && box.x + box.width <= 390);
    }
    await page.getByRole("button", { name: "home", exact: true }).hover();
  });
  await preview("animated-rays");
  await check("Animated Rays has a valid gradient and running animation", async () => {
    assert.ok(await page.locator(".ff-demo").evaluate(root => [...root.querySelectorAll("*")].some(el => {
      const css = getComputedStyle(el);
      return css.backgroundImage.includes("gradient") && css.animationName.includes("aurora");
    })));
  });
  await preview("typing-keyboard");
  await check("Typing Keyboard fits the mobile preview", async () => {
    const box = await page.locator(".tk-main").boundingBox();
    assert.ok(box.x >= 0 && box.x + box.width <= 391, JSON.stringify(box));
  });
  await preview("text-hover-effect");
  await check("Text Hover Effect has a nonzero canvas", async () => {
    const svg = page.locator("svg").first();
    const box = await svg.boundingBox();
    assert.ok(box.width > 300 && box.height > 100);
    await svg.hover();
    assert.equal(await page.locator("linearGradient stop").count(), 5);
  });
  await preview("interactive-book");
  await check("Book opens, turns a page, and closes on mobile", async () => {
    await page.getByText("Click to Open", { exact: true }).click();
    await page.getByRole("button", { name: "Close book" }).waitFor();
    await page.waitForTimeout(1600);
    await page.keyboard.press("ArrowRight");
    await page.waitForTimeout(600);
    await page.screenshot({ path: "references/preview-health/repairs/book-open-mobile.jpg" });
    await page.keyboard.press("Escape");
    await page.getByText("Click to Open", { exact: true }).waitFor();
  });
  // A failed image host must not hide the content or call to action.
  await context.route("https://images.unsplash.com/**", route => route.abort());
  await preview("images-slider");
  await check("Image Slider content survives unavailable remote images", async () => {
    await page.getByRole("button", { name: /Join now/ }).waitFor({ state: "visible" });
    assert.ok(await page.getByText(/The hero section slideshow/).isVisible());
  });
  await preview("text-reveal-card");
  await check("Text Reveal Card keeps its description readable", async () => {
    const size = await page.getByText("This is a text reveal card.", { exact: false }).evaluate(el => parseFloat(getComputedStyle(el).fontSize));
    assert.ok(size >= 12 && size <= 18);
  });
  await preview("parallax-scroll");
  await check("Parallax Scroll follows its scroll container", async () => {
    const container = page.locator(".vendor-content > div");
    const image = page.locator(".vendor-content img").first();
    const before = await image.evaluate(el => getComputedStyle(el.parentElement).transform);
    await container.evaluate(el => { if (el.scrollHeight <= el.clientHeight) throw new Error("Gallery is not scrollable"); el.scrollTop = 240; });
    await page.waitForTimeout(400);
    assert.notEqual(await image.evaluate(el => getComputedStyle(el.parentElement).transform), before);
  });
  await preview("awwwards-nav");
  await check("Mobile navigation keeps every link inside the preview", async () => {
    for (const link of await page.locator("nav a:visible").all()) {
      const box = await link.boundingBox();
      assert.ok(box.x >= 0 && box.x + box.width <= 391, JSON.stringify(box));
    }
    await page.getByRole("button", { name: "Open menu", exact: true }).click();
    await page.getByRole("button", { name: "Close menu", exact: true }).waitFor();
  });
  await page.goto(`${base}/#candy-button`, { waitUntil: "domcontentloaded" });
  await check("Detail opens a standalone full preview", async () => {
    const link = page.getByRole("link", { name: "Open full preview", exact: true });
    await link.waitFor();
    assert.ok((await link.getAttribute("href")).includes("preview=candy-button"));
    assert.equal(await link.getAttribute("target"), "_blank");
  });
  assert.deepEqual(errors, []);
  await fs.writeFile("references/preview-health/repairs/results.json", JSON.stringify(passed, null, 2));
} finally { await browser.close(); }

import { chromium } from "playwright";
import fs from "node:fs/promises";
const records = JSON.parse(await fs.readFile("references/skiper-capture-results.json", "utf8")).filter(x=>x.status==="captured").sort((a,b)=>parseInt(a.url.match(/\d+$/)[0])-parseInt(b.url.match(/\d+$/)[0]));
const browser = await chromium.launch({ channel:"chrome", headless:true });
try {
  const page = await browser.newPage({viewport:{width:1536,height:1230}});
  for(let i=0;i<records.length;i+=9){
    const entries=await Promise.all(records.slice(i,i+9).map(async x=>`<figure><figcaption>${x.url.split('/').pop()}: ${x.title} (${x.free_or_pro})</figcaption><img src="data:image/jpeg;base64,${(await fs.readFile(x.screenshot)).toString('base64')}"/></figure>`));
    await page.setContent(`<style>body{margin:0;display:grid;grid-template-columns:repeat(3,1fr);gap:8px;background:#333;font:15px Arial;color:white}figure{margin:0}figcaption{padding:12px;height:35px}img{width:100%;display:block}</style>${entries.join('')}`);
    await page.screenshot({path:`references/skiper-previews/sheet-${String(i/9+1).padStart(2,'0')}.jpg`,fullPage:true,type:"jpeg",quality:86});
  }
} finally {await browser.close()}
console.log(records.length + ' references laid out for visual review.');

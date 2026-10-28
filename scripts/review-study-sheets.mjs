import fs from "node:fs/promises";
import {chromium} from "playwright";
import {catalog} from "../src/catalog.js";
const records=catalog.filter(x=>x.independent);
const browser=await chromium.launch({channel:"chrome"});
try {
  const page=await browser.newPage({viewport:{width:1536,height:1100}});
  for(let i=0;i<records.length;i+=9){
    const entries=await Promise.all(records.slice(i,i+9).map(async x=>`<figure><figcaption>${x.name}</figcaption><img src="data:image/jpeg;base64,${(await fs.readFile(`references/component-checks/${x.id}.jpg`)).toString("base64")}"/></figure>`));
    await page.setContent(`<style>body{margin:0;display:grid;grid-template-columns:repeat(3,1fr);gap:8px;background:#333;font:15px Arial;color:white}figure{margin:0}figcaption{padding:9px}img{width:100%;display:block}</style>${entries.join("")}`);
    await page.screenshot({path:`references/final-review/studies-${i/9+1}.jpg`,fullPage:true,type:"jpeg",quality:85});
  }
} finally {await browser.close()}

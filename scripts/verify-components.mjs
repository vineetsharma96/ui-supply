import { chromium } from "playwright";
import fs from "node:fs/promises";
import { catalog } from "../src/catalog.js";
const browser = await chromium.launch({channel:"chrome", headless:true});
const folder="references/component-checks";
await fs.mkdir(folder,{recursive:true});
const results=[];
const base=process.env.PREVIEW_URL || "http://127.0.0.1:5173";
const firstPass=JSON.parse(await fs.readFile("references/first-pass-checks.json","utf8").catch(()=>"[]"));
try {
  const page=await browser.newPage({viewport:{width:840,height:460}});
  page.setDefaultTimeout(5000);
  let errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  const selected = process.argv[2] === "--retry" ? catalog.filter(item=>item.independent||!firstPass.some(old=>old.id===item.id)||firstPass.some(old=>old.id===item.id&&(old.status!=="rendered"||old.brokenImages?.length))) : process.argv[2] ? catalog.filter(x=>new RegExp(process.argv[2]).test(x.id)) : catalog;
  for(const item of selected){
    errors=[];
    try {
      await page.goto(`${base}/?preview=${item.id}&theme=dark`,{waitUntil:'domcontentloaded',timeout:30000});
      await page.locator('.standalone-preview').waitFor({timeout:15000});
      await page.locator('.ff-demo,.preview-error').first().waitFor({timeout:20000});
      await page.waitForTimeout(850);
      const error=await page.locator('.preview-error').count()?await page.locator('.preview-error').textContent():null;
      const content=await page.locator('.ff-demo').count();
      const images=await page.locator('img').evaluateAll(nodes=>nodes.filter(n=>n.getBoundingClientRect().width>10).map(n=>({src:n.currentSrc||n.src,broken:n.complete&&n.naturalWidth===0})));
      let screenshotError;
      try { await page.screenshot({path:`${folder}/${item.id}.jpg`,type:'jpeg',quality:75,timeout:6000,animations:"disabled"}); } catch(e) { screenshotError=e.message.slice(0,180); }
      const status=error||errors.length||!content?'failed':'rendered';
      results.push({id:item.id,status,error,errors:[...errors],brokenImages:images.filter(x=>x.broken),screenshotError});
      console.log(status.toUpperCase(),item.id,error||errors.join('; '));
    } catch(e){results.push({id:item.id,status:'failed',error:e.message,errors:[...errors]});console.log('FAILED',item.id,e.message.slice(0,150))}
    await fs.writeFile('references/component-check-results.json',JSON.stringify(results,null,2));
  }
} finally {await browser.close()}
console.log('RESULT',results.filter(x=>x.status==='rendered').length+'/'+results.length);

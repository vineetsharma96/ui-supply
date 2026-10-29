import {chromium} from "playwright";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import {catalog} from "../src/catalog.js";
const base=process.env.PREVIEW_URL || "http://127.0.0.1:5173";
const browser=await chromium.launch({channel:"chrome",headless:true});
const results=[];
await fs.mkdir("references/final-review",{recursive:true});
try {
  const context=await browser.newContext({permissions:["clipboard-read","clipboard-write"],viewport:{width:1440,height:900}});
  const page=await context.newPage();
  const errors=[];page.on("pageerror",e=>errors.push(e.message));
  async function check(name,fn){await fn();results.push(name);console.log("PASS",name)}
  async function preview(id,width=840){await page.setViewportSize({width,height:500});await page.goto(`${base}/?preview=${id}&theme=dark`,{waitUntil:"domcontentloaded"});await page.locator('.ff-demo').waitFor({timeout:20000});}
  await page.goto(base,{waitUntil:"domcontentloaded"});
  await check("Blank home, dark default, no old hero",async()=>{assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');assert.equal(await page.locator('.blank-home').innerText(),'');assert.equal(await page.locator('h1,.component-card').count(),0)});
  await page.screenshot({path:"references/final-review/home-dark.jpg",type:"jpeg",quality:85});
  await check("Navigation opens the complete catalog",async()=>{await page.getByRole('navigation',{name:'Main navigation'}).getByRole('button',{name:'Components',exact:true}).click();await page.locator('.component-card').first().waitFor();assert.equal(await page.locator('.component-card').count(),catalog.length)});
  await page.screenshot({path:"references/final-review/catalog-desktop.jpg",type:"jpeg",quality:85,animations:"disabled",timeout:10000});
  await check("Search does not repeat existing components",async()=>{await page.getByRole('textbox',{name:'Search components'}).fill('ripple button');await page.waitForTimeout(100);assert.equal(await page.locator('.component-card').count(),1);await page.getByRole('textbox',{name:'Search components'}).fill('');assert.equal(new Set(catalog.map(x=>x.id)).size,catalog.length)});
  await check("Theme toggle updates preview frames and persists",async()=>{await page.getByRole('textbox',{name:'Search components'}).fill('candy');await page.locator('iframe.component-frame').first().waitFor();await page.getByRole('button',{name:'Switch to light theme'}).click();assert.equal(await page.locator('html').getAttribute('data-theme'),'light');const frame=page.locator('iframe.component-frame').first();assert.ok((await frame.getAttribute('src')).includes('theme=light'));await page.reload();assert.equal(await page.locator('html').getAttribute('data-theme'),'light');await page.getByRole('button',{name:'Switch to dark theme'}).click()});
  await page.goto(`${base}/#candy-button`,{waitUntil:'domcontentloaded'});
  await page.getByRole('tab',{name:'Code',exact:true}).click();
  await page.locator('.source-panel code').filter({hasText:'CandyButton'}).waitFor();
  await check("Copy contains the real adapted implementation",async()=>{await page.locator('.source-toolbar').getByRole('button',{name:'Copy code'}).click();await page.locator('.source-toolbar').getByText('Copied',{exact:true}).waitFor();assert.equal((await page.evaluate(()=>navigator.clipboard.readText())).replace(/\r\n/g,"\n").trimEnd(),(await page.locator('.source-panel code').innerText()).replace(/\r\n/g,"\n").trimEnd())});
  await check("Download includes source, license, and complete styles",async()=>{const pending=page.waitForEvent('download');await page.getByRole('button',{name:'Download source'}).click();const download=await pending;const text=await fs.readFile(await download.path(),'utf8');assert.ok(text.includes('MIT License'));assert.ok(text.includes('CandyButton'));assert.ok(text.includes('@theme'));assert.ok(!text.includes('@import "./magic-animations.css"'))});
  for(const width of [320,390,768,1440]){
    await page.setViewportSize({width,height:900});await page.goto(`${base}/#components`,{waitUntil:'domcontentloaded'});
    await check(`Catalog fits ${width}px`,async()=>assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true));
    if([390,768].includes(width))await page.screenshot({path:`references/final-review/catalog-${width}.jpg`,type:'jpeg',quality:85,animations:'disabled',timeout:10000});
    if(width===390){await page.getByRole('button',{name:'Toggle component navigation'}).click();assert.equal(await page.locator('.sidebar').getAttribute('class'),'sidebar is-open');await page.getByRole('navigation',{name:'Component categories'}).getByRole('button',{name:/Text & typography/}).click();assert.equal(await page.locator('.sidebar').getAttribute('class'),'sidebar')}
  }
  await preview('amount-input');await check('Amount input edits and exposes both treatments',async()=>{await page.getByRole('textbox',{name:'Amount',exact:true}).fill('12345678.90');await page.getByRole('button',{name:'Rolling',exact:true}).click();assert.equal(await page.getByRole('textbox',{name:'Amount',exact:true}).inputValue(),'12345678.90')});
  await preview('dynamic-island');await check('All dynamic island states open',async()=>{for(const name of ['idle','ring','timer','record','music','airdrop','airdrop Mini','low Battery','phone','findmy','screen Record'])await page.getByRole('button',{name,exact:true}).click()});
  await preview('knockout-bracket');await check('Bracket winners advance',async()=>{await page.getByRole('button',{name:/Atlas/}).first().click();assert.equal(await page.getByRole('button',{name:/Atlas/}).count(),2);await page.getByRole('button',{name:'Reset bracket'}).click()});
  await preview('country-dialog');await check('Country dialog searches, selects, and closes',async()=>{await page.getByRole('button',{name:'IN'}).click();await page.getByRole('textbox',{name:'Search countries'}).fill('Japan');await page.getByRole('button',{name:/JP Japan/}).click();assert.equal(await page.locator('dialog').evaluate(n=>n.open),false);assert.equal(await page.locator('.ffx-center .ffx-label').innerText(),'Japan')});
  await preview('inline-sign-in');await check('Inline sign in completes locally',async()=>{await page.locator('input[type=email]').fill('sample@example.com');await page.getByRole('button',{name:'Continue with email'}).click();await page.locator('input').fill('123456');await page.getByRole('button',{name:'Verify demo code'}).click();await page.getByText('You’re in.',{exact:true}).waitFor()});
  await preview('timeline-calendar');await check('Task calendar checks and adds tasks',async()=>{await page.locator('input[type=checkbox]').first().check();await page.getByRole('textbox',{name:'New task'}).fill('Check keyboard states');await page.getByRole('button',{name:'Add task'}).click();await page.getByText('Check keyboard states',{exact:true}).waitFor()});
  await preview('prompt-input');await check('All five prompt variants submit without an external service',async()=>{for(const variant of ['Toolbar','Pill','Compact','Voice','Command']){await page.getByRole('button',{name:variant,exact:true}).click();await page.getByRole('textbox',{name:'Message',exact:true}).fill('A sample message');await page.getByRole('button',{name:'Send message',exact:true}).click();assert.equal(await page.getByRole('textbox',{name:'Message',exact:true}).inputValue(),'')}});
  await preview('receive-button');await check('Receive panel opens, copies its demo identifier, and closes',async()=>{await page.getByRole('button',{name:'Receive',exact:true}).click();await page.getByRole('button',{name:'Copy demo identifier'}).click();assert.equal(await page.evaluate(()=>navigator.clipboard.readText()),'demo-wallet-preview');await page.waitForTimeout(800);await page.getByRole('button',{name:'Close receive preview'}).click()});
  await preview('gooey-menu');await check('Gooey actions open and select',async()=>{await page.getByRole('button',{name:'Open actions'}).click();await page.getByRole('button',{name:'New folder',exact:true}).click();await page.getByText('New folder selected',{exact:true}).waitFor()});
  await preview('expanding-tiles');await check('Tiles expand and collapse',async()=>{await page.getByRole('button',{name:/Ideas/}).click();assert.equal(await page.locator('.ffx-tiles .is-active').count(),1);await page.getByRole('button',{name:/Ideas/}).click();assert.equal(await page.locator('.ffx-tiles .is-active').count(),0)});
  await preview('adaptive-navigation');await check('All adaptive navigation treatments respond',async()=>{for(const variant of ['Mega menu','Product','Workspace']){await page.getByRole('button',{name:variant,exact:true}).click();assert.ok(await page.locator('.ffx-adaptive-nav nav').count())}});
  await preview('skiper99');await check('Animated icon grid and original minimal variant render',async()=>{await page.getByRole('button',{name:'Like',exact:true}).click();await page.getByRole('button',{name:'Minimal',exact:true}).click();assert.equal(await page.locator('.preview-error').count(),0)});
  for(const [id,names]of [['preloader-studies',['Sweep','Words','Stairs','Double stairs','Pixels','Blocks']],['scroll-image-studies',['Grid','Masonry','Curtain','Team']],['scroll-text-studies',['Rolling','Box reveal','Perspective']],['scroll-progress',['Bar','Rail','Steps','Ticks']],['video-player',['Compact','Portrait','Cinema']]]){
    await preview(id);await check(`${id} variants render`,async()=>{for(const name of names)await page.getByRole('button',{name,exact:true}).click();assert.equal(await page.locator('.preview-error').count(),0)});
  }
  await preview('draggable-snap-button');await check('Snap button supports keyboard movement',async()=>{const button=page.getByRole('button',{name:'Draggable settings'});const before=await button.boundingBox();await button.focus();await page.keyboard.press('ArrowLeft');await page.waitForTimeout(400);const after=await button.boundingBox();assert.ok(after.x<before.x)});
  assert.deepEqual(errors,[]);
  results.push('No browser runtime exceptions');
  await fs.writeFile('references/interaction-check-results.json',JSON.stringify(results,null,2));
  console.log(results.length+' interaction groups passed.');
} finally {await browser.close()}

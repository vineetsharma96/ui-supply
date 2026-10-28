import fs from 'node:fs/promises';
for (const [name, url] of [
  ['aceternity-index', 'https://ui.aceternity.com/registry/index.json'],
  ['magic-index', 'https://magicui.design/r/index.json'],
  ['magic-license', 'https://raw.githubusercontent.com/magicuidesign/magicui/main/LICENSE'],
  ['aceternity-license', 'https://ui.aceternity.com/licence'],
]) {
  const r = await fetch(url); const text = await r.text();
  await fs.writeFile('references/' + name + '.txt', text);
  console.log(name, r.status, text.slice(0,100));
  if (name.includes('index')) {
    try { const j=JSON.parse(text); console.log((j.items || j).map(x=>x.name).join(', ')); } catch {}
  }
}

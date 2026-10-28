// Import public component registries, keep each source credited, and skip existing components.
import fs from "node:fs/promises";
import path from "node:path";
import { build } from "esbuild";
import { catalog as originalCatalog } from "../src/catalog.js";

const root = process.cwd();
const cache = path.join(root, "references/import-cache");
const generated = path.join(root, "src/components");
const indexes = JSON.parse(await fs.readFile("references/source-indexes.json", "utf8"));
await fs.mkdir(cache, { recursive: true });
const memo = new Map();
async function fetchText(url) {
  const key = Buffer.from(url).toString("base64url");
  const file = path.join(cache, key);
  try { return await fs.readFile(file, "utf8"); } catch {}
  const response = await fetch(url, { signal: AbortSignal.timeout(25000) });
  if (!response.ok) throw new Error(`${response.status}: ${url}`);
  const text = await response.text();
  await fs.writeFile(file, text);
  return text;
}
async function readOrFetch(file,url) {
  try { return await fs.readFile(file,"utf8"); } catch { const text=await fetchText(url);await fs.writeFile(file,text);return text; }
}
const utils = 'import {clsx} from "clsx"; import {twMerge} from "tailwind-merge"; export function cn(...args){return twMerge(clsx(args))}';
const shims = {
  "next/image": 'import React from "react"; export default function Image({fill,priority,quality,unoptimized,loader,placeholder,blurDataURL,onLoadingComplete,...props}){return <img {...props} style={{...(fill?{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover"}:{}),...props.style}}/>}',
  "next/link": 'import React from "react"; export default function Link({prefetch,replace,scroll,legacyBehavior,passHref,...props}){return <a {...props}/>}',
  "next-themes": 'import {useState,useEffect} from "react"; export function useTheme(){const [theme,set]=useState(document.documentElement.dataset.theme||"dark"); useEffect(()=>{const o=new MutationObserver(()=>set(document.documentElement.dataset.theme||"dark"));o.observe(document.documentElement,{attributes:true,attributeFilter:["data-theme"]});return ()=>o.disconnect()},[]);return {theme,resolvedTheme:theme,setTheme:(t)=>{document.documentElement.dataset.theme=t;localStorage.setItem("ui-supply-theme",t)}}}',
  "next/dynamic": 'import {lazy} from "react"; export default function dynamic(load){return lazy(async()=>{const m=await load();return {default:m.default||m}})}',
  "@/fonts/calsans": 'export const calSans={className:"font-sans"}; export const calsans=calSans;',
};
function category(id) {
  if (/text|number|ticker|word|typing|glyph|ascii/.test(id)) return "Text & typography";
  if (/nav|dock|menu|search|tooltip|footer|sidebar|tabs|link/.test(id)) return "Navigation";
  if (/scroll|parallax|timeline|progress/.test(id)) return "Scroll effects";
  if (/card|bento|grid|collage|showcase|avatar|list|stack|gallery/.test(id)) return "Cards & layouts";
  if (/button|input|keyboard|player|upload|modal|dialog|carousel|book/.test(id)) return "Interactive";
  return "Special effects";
}
const aliases = {
  "number-ticker": "stats-counter",
  "animated-number": "stats-counter",
  "infinite-moving-cards": "marquee",
  "word-rotate": "flip-fade-text",
  "flip-words": "flip-fade-text",
  "text-animate": "stagger-text",
  "text-generate-effect": "stagger-text",
  "text-reveal": "horizontal-text-reveal",
  "line-hover-link": "css-link",
  "logo-slider": "marquee",
};
const existing = new Set(originalCatalog.filter(c => !c.imported).map(c => c.id));
const added = [];
const audit = [];
const packageNames = new Set();
const collectedTheme = {};
const collectedCss = {};
const source = process.argv[2] || "vengeance";
const sourceOrder = ["vengeance", "magic", "aceternity", "skiper"];
for (const previous of sourceOrder.slice(0, sourceOrder.indexOf(source))) {
  const text = await fs.readFile(`src/${previous}-additions.js`, "utf8").catch(() => "export default [];");
  for (const item of JSON.parse(text.replace(/^export default /, "").replace(/;\s*$/, ""))) existing.add(item.id);
}
let repoFiles = new Set();
let demoMap = {};
if (source === "vengeance") {
  const tree = JSON.parse(await readOrFetch("references/vengeance-tree.json", "https://api.github.com/repos/Ashutoshx7/VengeanceUI/git/trees/main?recursive=1"));
  repoFiles = new Set(tree.tree.map(x => x.path));
  const renderer = await readOrFetch("references/vengeance-demo-renderer.tsx", "https://raw.githubusercontent.com/Ashutoshx7/VengeanceUI/main/src/components/docs/demo-renderer.tsx");
  for (const m of renderer.matchAll(/"([\w-]+)": dynamic\(\(\) => import\("([^"]+)"\)\.then\(\(m\) => \(\{ default: m\.([\w]+) \}\)\)/g)) {
    demoMap[m[1]] = { path: m[2], exported: m[3] };
  }
}
const config = {
  vengeance: { name: "Vengeance UI", domain: "www.vengenceui.com", base: "https://www.vengenceui.com/r/", raw: "https://raw.githubusercontent.com/Ashutoshx7/VengeanceUI/main/", copyright: "Copyright (c) 2025-2026 Ashutoshx7" },
  magic: { name: "Magic UI", domain: "magicui.design", base: "https://magicui.design/r/", copyright: "Copyright (c) Magic UI" },
  aceternity: { name: "Aceternity UI", domain: "ui.aceternity.com", base: "https://ui.aceternity.com/registry/", copyright: "Copyright (c) 2023 Manu Arora" },
  skiper: { name: "Skiper UI", domain: "skiper-ui.com", base: "https://skiper-ui.com/r/", copyright: "Skiper UI / gxuri. Attribution required for free components" },
}[source];
const registryNames = source === "aceternity" ? {
  "3d-card-effect": "3d-card", "glowing-stars-effect": "glowing-stars", "shooting-stars-and-stars-background": "shooting-stars", "lamp-effect": "lamp", "grid-and-dot-backgrounds": "grid", "github-globe": "globe", "container-cover": "cover", "expandable-card": "expandable-card-on-click",
} : {};
const demoNames = source === "magic" ? {"bento-grid":"bento-demo", "pointer":"pointer-demo-1", "backlight":"backlight-image-demo"} : {};
const skiperIndex = source === "skiper" ? JSON.parse(await fs.readFile("references/skiper-index.json", "utf8")).component_cards : [];
const skiperAliases = {skiper4:"animated-theme-toggler",skiper6:"team-reveal-grid",skiper18:"image-trail",skiper19:"svg-follow-scroll",skiper26:"animated-theme-toggler",skiper37:"stats-counter",skiper40:"css-link",skiper41:"progressive-blur",skiper47:"perspective-carousel",skiper66:"svg-mask-effect",skiper69:"stats-counter",skiper72:"horizontal-text-reveal",skiper77:"apple-cards-carousel",skiper89:"scroll-progress",skiper101:"animated-tooltip"};
Object.assign(aliases, skiperAliases);
const urls = source === "skiper" ? skiperIndex.filter(x=>x.free_or_pro==="Free").map(x=>x.url) : indexes.find(x => x.source.includes(config.domain)).components;
for (const url of urls) {
  const id = url.split("/").pop();
  const record = { id, source: config.name, url, status: "pending" };
  const authored = source==="aceternity"?{"shooting-stars-and-stars-background":"shooting-stars","expandable-card":"expandable-card","loader":"loading-indicators","signup-form":"signup-form","typewriter-effect":"typing-animation","github-globe":"globe"}:source==="skiper"?{"skiper67":"video-player"}:{};
  if(authored[id]){record.status="duplicate";record.canonical=authored[id];audit.push(record);continue;}
  if(source==="aceternity"&&["feature-sections-free","hero-sections-free"].includes(id)){record.status="excluded-section-block";audit.push(record);continue;}
  if (existing.has(id) || existing.has(aliases[id])) {
    record.status = "duplicate"; record.canonical = existing.has(id) ? id : aliases[id]; audit.push(record); continue;
  }
  const virtualFiles = new Map();
  let primary;
  let apiPath;
  async function registry(name) {
    if (name === "cn" || name.endsWith("/cn.json")) return {};
    if (name === "calsans" || name.endsWith("/calsans.json")) return {};
    const url = name.startsWith("http") ? name : config.base + name.replace(/\.json$/, "") + ".json";
    let item;
    try { item = JSON.parse(await fetchText(url)); } catch (error) {
      if (!name.startsWith("http") && (source === "magic" || source === "skiper") && ["button","badge","separator","tooltip","card","input","label","scroll-area","calendar","carousel"].includes(name)) {
        return registry("https://ui.shadcn.com/r/styles/new-york-v4/" + name + ".json");
      }
      throw error;
    }
    Object.assign(collectedTheme, item.cssVars?.theme || {});
    Object.assign(collectedCss, item.css || {});
    for (const f of item.files || []) if (f.content) {
      const key = f.path.replace(/^\//, "").replace(/^src\//, "").replace(/^registry\/(?:magicui|example)\//, "components/ui/").replace(/^registry\/new-york-v4\/ui\//, "components/ui/");
      virtualFiles.set(key, f.content);
      virtualFiles.set(path.basename(key), f.content);
    }
    for (const dep of item.registryDependencies || []) {
      if (dep.startsWith("http") && !memo.has(dep)) { memo.set(dep, true); await registry(dep); }
    }
    return item;
  }
  try {
    if (source === "vengeance") {
      const demo = demoMap[id];
      if (!demo) throw new Error("No upstream preview mapping");
      primary = demo.path.slice(2) + ".tsx";
      const demoText = await fetchText(config.raw + "src/" + primary);
      virtualFiles.set(primary, demoText);
      apiPath=demoText.match(/from ["'](@\/components\/ui\/[^"']+)["']/)?.[1]?.slice(2);
      const entry = `import React from 'react'; import {${demo.exported} as Preview} from './${primary}'; export default function Component(){return <div className="ff-demo upstream-preview"><div className="vendor-content"><Preview /></div></div>}`;
      await bundle(entry);
    } else if (source === "skiper") {
      if (id === "skiper62") throw new Error("Animation hook only; not a UI component");
      const item = await registry(id);
      primary = [...virtualFiles.keys()].find(x=>x.endsWith(id+".tsx"));
      apiPath=primary;
      const code = virtualFiles.get(primary);
      const componentName = "Skiper" + id.slice(6);
      if (!code.includes(componentName)) throw new Error("No preview export " + componentName);
      await bundle(`import React from 'react'; import {${componentName} as Preview} from './${primary}'; export default function Component(){return <div className="ff-demo upstream-preview"><div className="vendor-content"><Preview /></div></div>}`);
    } else if (source === "aceternity" && ["cards-free","feature-sections-free","hero-sections-free"].includes(id)) {
      const names=id==="cards-free"?["cards-demo-1","cards-demo-2","cards-demo-3"]:id==="feature-sections-free"?["features-section-demo-1","features-section-demo-2","features-section-demo-3"]:["hero-section-demo-1"];
      const imports=[];const components=[];
      for(let n=0;n<names.length;n++) {
        const item=await registry(names[n]);
        const key=[...virtualFiles.keys()].find(x=>x.endsWith("/"+names[n]+".tsx"));
        const code=virtualFiles.get(key);
        const exported=/export default/.test(code)?"default":code.match(/export (?:function|const) (\w+)/)?.[1];
        imports.push(`import ${exported==="default"?`Preview${n}`:`{${exported} as Preview${n}}`} from './${key}';`);components.push(`Preview${n}`);
      }
      await bundle(`import React,{useState} from 'react';${imports.join("\n")}const previews=[${components.join(",")}];export default function Component(){const [selected,setSelected]=useState(0);const Preview=previews[selected];return <div className="ff-demo upstream-preview"><div className="vendor-example-picker">{previews.length>1&&previews.map((_,i)=><button key={i} aria-pressed={selected===i} onClick={()=>setSelected(i)}>Example {i+1}</button>)}</div><div className="vendor-content"><Preview/></div></div>}`);
    } else {
      const upstreamId = registryNames[id] || id;
      await registry(upstreamId);
      apiPath=[...virtualFiles.keys()].find(x=>x.endsWith("/"+upstreamId+".tsx"));
      const demoName = demoNames[id] || upstreamId + "-demo";
      const demo = await registry(demoName);
      primary = [...virtualFiles.keys()].find(x => x.includes(demoName) && x.includes("/"));
      if (!primary) throw new Error("Registry demo is missing");
      const text = virtualFiles.get(primary);
      let exported = "default";
      if (!/export default/.test(text)) exported = text.match(/export (?:function|const) (\w+)/)?.[1];
      if (!exported) throw new Error("No demo export");
      await bundle(`import React from 'react'; import ${exported === "default" ? "Preview" : `{${exported} as Preview}`} from './${primary}'; export default function Component(){return <div className="ff-demo upstream-preview"><div className="vendor-content"><Preview /></div></div>}`);
    }
    async function bundle(entry) {
      const result = await build({
        stdin: { contents: (apiPath?`export * from './${apiPath}';\n`:"")+entry, resolveDir: root, sourcefile: "entry.jsx", loader: "jsx" },
        bundle: true, write: false, format: "esm", jsx: "automatic", packages: "external", minify: false,
        logLevel: "silent",
        plugins: [{ name: "public-registry", setup(b) {
          b.onResolve({ filter: /.*/ }, async args => {
            let name = args.path;
            if (name === "framer-motion") return { path: "motion/react", external: true };
            if (name === "cn" || name === "@/lib/utils" || name === "@/lib/utils.ts" || name === "@/utils/cn") return { path: "utils", namespace: "registry" };
            if (shims[name]) return { path: name, namespace: "registry" };
            if (name.startsWith("@/") || name.startsWith(".")) {
              let key = name.startsWith("@/") ? name.slice(2) : path.posix.normalize(path.posix.join(args.importer ? path.posix.dirname(args.importer) : ".", name));
              if (virtualFiles.has(key)) return { path: key, namespace: "registry" };
              for (const ext of [".tsx", ".ts", ".jsx", ".js"]) {
                if (virtualFiles.has(key + ext)) return { path: key + ext, namespace: "registry" };
              }
              const base = path.posix.basename(key);
              if (virtualFiles.has(base + ".tsx")) return { path: base + ".tsx", namespace: "registry" };
              if (source === "vengeance") {
                for (const ext of ["", ".tsx", ".ts"]) if (repoFiles.has("src/" + key + ext)) {
                  key += ext; virtualFiles.set(key, await fetchText(config.raw + "src/" + key));
                  return { path: key, namespace: "registry" };
                }
              } else if (name.startsWith("@/")) {
                try { await registry(base); } catch (error) {
                  if (name.startsWith("@/components/ui/")) await registry("https://ui.shadcn.com/r/styles/new-york-v4/" + base + ".json");
                  else throw error;
                }
                const matched = [...virtualFiles.keys()].find(x => x.endsWith("/" + base + ".tsx"));
                if (matched) return { path: matched, namespace: "registry" };
              }
              return { errors: [{ text: "Unresolved internal file: " + name }] };
            }
            if (!/^(react(?:-dom)?(?:\/|$)|motion\/|clsx$|tailwind-merge$|lucide-react$)/.test(name)) packageNames.add(name);
            return { path: name, external: true };
          });
          b.onLoad({ filter: /.*/, namespace: "registry" }, args => {
            let contents = args.path === "utils" ? utils : shims[args.path] || virtualFiles.get(args.path);
            contents = contents.replace(/(["'`])(\/(?:images|assets|models|videos|audio|fonts|media|person-images)\/[^"'`]+)\1/g, (_, quote, asset) => quote + "https://" + config.domain + asset + quote)
              .replace(/(["'`])(\/(?!\/)[^"'`]+\.(?:png|jpg|jpeg|webp|avif|svg|gif|mp4|webm|mp3|glb|gltf))\1/g, (_,quote,asset)=>quote+"https://"+config.domain+asset+quote);
            return { contents, loader: "tsx" };
          });
        }}],
      });
      const license = source==="vengeance"||source==="magic" ? "/*\n"+(await fs.readFile(`licenses/${source}.txt`,"utf8"))+"\n*/\n" : "";
      const code = license+`// Adapted from ${url}\n// ${config.copyright}. See licenses/${source}.txt for usage terms.\n` + result.outputFiles[0].text;
      if(!["scroll-progress","skiper99","tweet-card","3d-globe"].includes(id)) await fs.writeFile(path.join(generated, id + ".jsx"), code);
    }
    record.status = "imported";
    const displayName = source === "skiper" ? skiperIndex.find(x=>x.url===url).title : ({"cards-free":"Card Studies","feature-sections-free":"Feature Sections","hero-sections-free":"Hero Section"})[id] || id.split("-").map(x => x[0].toUpperCase() + x.slice(1)).join(" ");
    added.push({ id, name: displayName, category: category(displayName.toLowerCase().replaceAll(" ","-")), source: config.name, url, description: "Public upstream component, adapted for React and Vite.", hint: "Interact with the original upstream example. Source includes the component and demo; install the listed package imports and Tailwind CSS when reusing it.", imported: true });
    existing.add(id);
    console.log("IMPORTED", id);
  } catch (error) {
    record.status = "needs-review"; record.reason = error.errors?.map(x => x.text).join("; ") || error.message;
    console.log("REVIEW", id, record.reason.slice(0,160));
  }
  audit.push(record);
  await fs.writeFile(`references/${source}-import-audit.json`, JSON.stringify({ added, audit, packages: [...packageNames] }, null, 2));
}
await fs.writeFile(`src/${source}-additions.js`, "export default " + JSON.stringify(added, null, 2) + ";\n");
function cssBlock(selector, rules) {
  return selector + " {\n" + Object.entries(rules).map(([key, value]) => typeof value === "object" ? cssBlock(key, value) : key + ": " + value + ";").join("\n") + "\n}\n";
}
const theme = Object.entries(collectedTheme).map(([key,value]) => `--${key}: ${value};`).join("\n");
if(source==="magic") await fs.writeFile(`src/${source}-animations.css`, (theme ? `@theme {\n${theme}\n}\n` : "") + Object.entries(collectedCss).map(([key,rules])=>cssBlock(key,rules)).join("\n"));
console.log(JSON.stringify({ source, imported: added.length, pending: audit.filter(x => x.status === "needs-review").length, packages: [...packageNames] }));

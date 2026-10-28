import fs from "node:fs/promises";
import { catalog } from "../src/catalog.js";
const indexes=JSON.parse(await fs.readFile("references/source-indexes.json","utf8"));
const skiper=JSON.parse(await fs.readFile("references/skiper-index.json","utf8"));
const byUrl=new Map();
for(const item of catalog)for(const url of [item.url,...(item.references||[])])byUrl.set(url,item);
const audit=[];
for(const index of indexes){
  const source=index.source.includes("vengence")?"vengeance":index.source.includes("magicui")?"magic":"aceternity";
  const imported=JSON.parse(await fs.readFile(`references/${source}-import-audit.json`,"utf8"));
  for(const url of index.components){
    const original=imported.audit.find(x=>x.url===url);const current=byUrl.get(url)||catalog.find(x=>x.id===original?.canonical);
    const excluded=source==="aceternity"&&["feature-sections-free","hero-sections-free"].some(slug=>url.endsWith("/"+slug));
    audit.push({source,url,status:excluded?"excluded-section-block":current?(current.url===url?current.independent?"independent":"implemented":"deduplicated"):"pending",component:excluded?undefined:current?.id,reason:excluded?"Section blocks are outside the requested individual-component scope":current?undefined:original?.reason});
  }
}
for(const item of skiper.component_cards){const current=byUrl.get(item.url);const hook=item.url.endsWith("/skiper62");audit.push({source:"skiper",url:item.url,name:item.title,access:item.free_or_pro,status:hook?"excluded-non-ui":current?(current.url===item.url?current.independent?"independent":"implemented":"deduplicated"):"pending",component:current?.id,screenshot:`references/skiper-previews/${item.url.split('/').pop()}.jpg`})}
const ids=catalog.map(x=>x.id);
if(new Set(ids).size!==ids.length)throw new Error("Duplicate catalog IDs");
for(const id of ids)await fs.access(`src/components/${id}.jsx`);
const summary=Object.fromEntries(["vengeance","magic","aceternity","skiper"].map(source=>{const rows=audit.filter(x=>x.source===source);return[source,{entries:rows.length,pending:rows.filter(x=>x.status==="pending").length,implemented:rows.filter(x=>["implemented","independent"].includes(x.status)).length,deduplicated:rows.filter(x=>x.status==="deduplicated").length,excluded:rows.filter(x=>x.status.startsWith("excluded")).length}]}));
await fs.writeFile("references/component-coverage.json",JSON.stringify({catalog:catalog.length,summary,entries:audit},null,2));
let markdown=`# Component coverage\n\n${catalog.length} unique catalog entries. The original 26 are retained. Related source previews resolve to existing components or configurable studies, rather than duplicate cards. Public registry adaptations retain their credits; independent studies use public preview screenshots, not premium source. These studies reproduce interaction patterns and are not pixel-identical or upstream API replacements.\n\n`;
markdown+="| Library | Source entries | Implementations / studies | References deduplicated | Non-UI excluded | Pending |\n| --- | ---: | ---: | ---: | ---: | ---: |\n";
for(const [name,s]of Object.entries(summary))markdown+=`| ${name} | ${s.entries} | ${s.implemented} | ${s.deduplicated} | ${s.excluded} | ${s.pending} |\n`;
markdown+="\nThe Skiper index reported 105 entries, but its extracted list contains 106 distinct URLs. Counts above use the actual list. Its animation-hook-only entry is excluded. Screenshots for every Skiper entry are saved under `references/skiper-previews/`.\n\nThe user confirmed individual UI components only. Full-site templates and section blocks (including the free feature/hero section groups) are excluded. Card collections with multiple free examples are combined as selectable studies. Mapping coverage is separate from runtime/interaction verification.\n\n| Source | Reference | Resolution | Local component |\n| --- | --- | --- | --- |\n";
for(const row of audit)markdown+=`| ${row.source} | [${row.name||row.url.split('/').pop()}](${row.url}) | ${row.status} | ${row.component||row.reason||"Animation utility, not a rendered UI component"} |\n`;
await fs.writeFile("references/component-coverage.md",markdown);
console.log(JSON.stringify({catalog:catalog.length,summary,pending:audit.filter(x=>x.status==="pending")},null,2));

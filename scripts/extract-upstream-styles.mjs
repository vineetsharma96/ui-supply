import fs from "node:fs/promises";
import postcss from "postcss";
const css = postcss.parse(await fs.readFile("references/vengeance-globals.css", "utf8"));
const animations=[];
const light=[];
const dark=[];
css.walkAtRules(rule=>{if(["keyframes","-webkit-keyframes","property","utility"].includes(rule.name))animations.push(rule.toString())});
css.walkRules(rule=>{
  if(rule.selector!==":root"&&rule.selector!==".dark")return;
  const target=rule.selector===":root"?light:dark;
  for(const node of rule.nodes||[]) if(node.type==="decl"&&node.prop.startsWith("--vng-"))target.push(node.toString());
});
await fs.writeFile("src/vengeance-animations.css",`.upstream-preview {${light.join(";\n")}}\n:root[data-theme=dark] .upstream-preview {${dark.join(";\n")}}\n${animations.join("\n")}`);
console.log("Retained",animations.length,"animation rules and",light.length+dark.length,"scoped component tokens.");

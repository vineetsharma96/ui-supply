import React, { useRef, useState } from "react";
import { ArrowUp, Plus, Mic, AudioLines, Globe, X } from "lucide-react";
import "./components.css";
export function PromptInput({ variant="Toolbar", onSubmit=()=>{}, placeholder="Ask anything…" }){
  const [value,setValue]=useState("");const [files,setFiles]=useState([]);const [voice,setVoice]=useState(false);const [sent,setSent]=useState(false);const [search,setSearch]=useState(false);const [style,setStyle]=useState("Standard");const input=useRef();
  const compact=["Pill","Compact","Voice"].includes(variant);
  return <form className={"ffx-prompt variant-"+variant.toLowerCase()} onSubmit={e=>{e.preventDefault();if(!value.trim()&&!files.length)return;onSubmit({text:value,files,search,style});setValue("");setFiles([]);setSent(true)}}>
    {!!files.length&&<div className="ffx-file-chips">{files.map((file,i)=><span key={i}>{file.name}<button type="button" aria-label={"Remove "+file.name} onClick={()=>setFiles(old=>old.filter((_,j)=>j!==i))}><X size={12}/></button></span>)}</div>}
    <div className="ffx-prompt-row">{compact&&<button type="button" aria-label="Attach files" onClick={()=>input.current.click()}><Plus size={17}/></button>}
      <textarea aria-label="Message" rows={compact?1:2} placeholder={placeholder} value={value} onChange={e=>{setValue(e.target.value);setSent(false)}} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey&&!e.nativeEvent.isComposing){e.preventDefault();e.currentTarget.form.requestSubmit()}}}/>
      {compact&&<button className="ffx-prompt-send" type="submit" disabled={!value.trim()&&!files.length} aria-label="Send message"><ArrowUp size={17}/></button>}
    </div>
    {!compact&&<div className="ffx-prompt-tools"><button type="button" aria-label="Attach files" onClick={()=>input.current.click()}><Plus size={17}/></button><button type="button" aria-label="Search mode" aria-pressed={search} onClick={()=>setSearch(!search)}><Globe size={16}/></button><select aria-label="Response style" value={style} onChange={e=>setStyle(e.target.value)}><option>Standard</option><option>Thoughtful</option><option>Creative</option></select><button className="ffx-prompt-send" type="submit" disabled={!value.trim()&&!files.length} aria-label="Send message"><ArrowUp size={16}/></button></div>}
    {variant==="Voice"&&<button type="button" className="ffx-voice" aria-label="Toggle voice preview" aria-pressed={voice} onClick={()=>setVoice(!voice)}>{voice?<AudioLines size={18}/>:<Mic size={18}/>}</button>}
    <input ref={input} type="file" multiple hidden onChange={e=>setFiles(old=>[...old,...Array.from(e.target.files)])}/>
    <span className="ffx-sr" aria-live="polite">{sent?"Message prepared. This is a local preview.":voice?"Voice animation preview enabled.":""}</span>
  </form>;
}
export default function PromptInputDemo(){const [variant,setVariant]=useState("Toolbar");return <div className="ff-demo ffx"><div className="ffx-center ffx-prompt-demo"><PromptInput variant={variant}/><div className="ffx-segments">{["Toolbar","Pill","Compact","Voice","Command"].map(v=><button key={v} aria-pressed={v===variant} onClick={()=>setVariant(v)}>{v}</button>)}</div></div></div>}

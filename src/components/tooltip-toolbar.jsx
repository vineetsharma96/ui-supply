import React, { useState } from "react";
import { Home, Folder, Bell, Settings, LayoutGrid, Moon, Download } from "lucide-react";
import "./components.css";
const tools=[["Home",Home],["Projects",Folder],["Notifications",Bell],["Layout",LayoutGrid],["Theme",Moon],["Downloads",Download],["Settings",Settings]];
export function TooltipToolbar({vertical=false,onSelect=()=>{}}){
  const [active,setActive]=useState("Home");
  return <nav aria-label="Quick tools" className={"ffx-tooltip-toolbar "+(vertical?"is-vertical":"")}>{tools.map(([label,Icon])=><button key={label} aria-label={label} aria-current={active===label?"page":undefined} onClick={()=>{setActive(label);onSelect(label)}}><Icon size={16}/><span role="tooltip">{label}</span></button>)}</nav>;
}
export default function ToolbarDemo(){const [vertical,setVertical]=useState(false);const [selection,setSelection]=useState("Home");return <div className="ff-demo ffx"><div className="ffx-center"><TooltipToolbar vertical={vertical} onSelect={setSelection}/><p className="ffx-label" aria-live="polite">{selection}</p><button className="ffx-button" onClick={()=>setVertical(!vertical)}>{vertical?"Horizontal":"Vertical"} layout</button></div></div>}

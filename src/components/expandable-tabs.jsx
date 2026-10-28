import React, { useState } from "react";
import { Home, Bell, Folder, Heart, Settings } from "lucide-react";
import "./components.css";
const tabs=[["Home",Home],["Alerts",Bell],["Projects",Folder],["Saved",Heart],["Settings",Settings]];
export default function ExpandableTabs(){const [active,setActive]=useState("Home");return <div className="ff-demo ffx"><div className="ffx-center"><nav className="ffx-expand-tabs" aria-label="Expandable tabs">{tabs.map(([name,Icon])=><button key={name} aria-label={name} aria-current={active===name?"page":undefined} onClick={()=>setActive(name)}><Icon size={18}/><span>{name}</span></button>)}</nav><p className="ffx-label" aria-live="polite">{active}</p></div></div>}

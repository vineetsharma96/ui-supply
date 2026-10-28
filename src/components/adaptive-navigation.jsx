import React, { useState } from "react";
import { ChevronDown, Search, Layers, ShoppingBag } from "lucide-react";
import "./components.css";
const links=["Explore","Create","Learn","Support"];
export default function AdaptiveNavigation(){
  const [variant,setVariant]=useState("Mega menu");const [active,setActive]=useState(null);const [tab,setTab]=useState("Overview");
  return <div className="ff-demo ffx ffx-nav-demo"><div className="ffx-segments">{["Mega menu","Product","Workspace"].map(v=><button key={v} aria-pressed={v===variant} onClick={()=>{setVariant(v);setActive(null)}}>{v}</button>)}</div>
    <div className="ffx-adaptive-nav">
      <nav aria-label="Example navigation"><button aria-label="UI Supply" onClick={()=>setActive(null)}><Layers size={19}/></button>
        {variant==="Workspace"?<><button onClick={()=>setActive(active?null:"workspace")}>Personal workspace <ChevronDown size={12}/></button><span className="ffx-nav-spacer"/><button onClick={()=>setActive(active?null:"projects")}>Component lab <ChevronDown size={12}/></button></>:variant==="Product"?<><strong>Supply Studio</strong><span className="ffx-nav-spacer"/>{["Overview","Features","Details"].map(x=><button key={x} aria-current={tab===x?"page":undefined} onClick={()=>setTab(x)}>{x}</button>)}</>:<>{links.map(x=><button key={x} aria-expanded={active===x} onMouseEnter={()=>setActive(x)} onClick={()=>setActive(active===x?null:x)}>{x}</button>)}<span className="ffx-nav-spacer"/><button aria-label="Open search" onClick={()=>setActive("Search")}><Search size={16}/></button></>}
      </nav>
      {variant==="Workspace"&&<div className="ffx-workspace-tabs" role="tablist" aria-label="Workspace tabs">{["Overview","Activity","Projects","Storage","Settings"].map(x=><button role="tab" aria-selected={tab===x} key={x} onClick={()=>setTab(x)}>{x}</button>)}</div>}
      {active&&<div className="ffx-mega-panel" onMouseLeave={()=>setActive(null)}><div><small>{active}</small><h3>{active==="Search"?"Find your next idea.":"Make room for better ideas."}</h3></div><div>{["Components","Collections","Recent work"].map(x=><button key={x} onClick={()=>{setTab(x);setActive(null)}}>{x} <span>↗</span></button>)}</div></div>}
      {variant==="Product"&&<div className="ffx-nav-product"><strong>{tab}</strong><button className="ffx-button" onClick={()=>setActive(active?null:"Details")}><ShoppingBag size={14}/>Explore</button></div>}
      {!active&&variant!=="Product"&&<div className="ffx-nav-canvas"><p>{tab}</p><div/><div/></div>}
    </div>
  </div>;
}

import React, { useEffect, useRef, useState } from "react";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import "./components.css";
const images=["photo-1500530855697-b586d89ba3ee","photo-1464822759023-fed622ff2c3b","photo-1470770841072-f978cf4d019e","photo-1519681393784-d120267933ba","photo-1441974231531-c6227db76b6e","photo-1501785888041-af3ef285b470"];
export default function InfiniteCanvas(){
  const root=useRef();const drag=useRef(null);const [offset,setOffset]=useState({x:0,y:0});const [scale,setScale]=useState(1);const [mode,setMode]=useState("Photos");
  useEffect(()=>{const node=root.current;const wheel=e=>{e.preventDefault();setOffset(old=>({x:old.x-e.deltaX,y:old.y-e.deltaY}))};node.addEventListener("wheel",wheel,{passive:false});return()=>node.removeEventListener("wheel",wheel)},[]);
  const symbols=["◉","✳","◈","⌘","✦","◌","⬡","✿"];
  return <div ref={root} className="ff-demo ffx ffx-infinite" onPointerDown={e=>{if(e.target.closest('button'))return;drag.current={x:e.clientX-offset.x,y:e.clientY-offset.y};e.currentTarget.setPointerCapture(e.pointerId)}} onPointerMove={e=>{if(drag.current)setOffset({x:e.clientX-drag.current.x,y:e.clientY-drag.current.y})}} onPointerUp={()=>drag.current=null} onPointerCancel={()=>drag.current=null}>
    <div className="ffx-infinite-grid" style={{transform:`translate(${offset.x%720-360}px,${offset.y%510-255}px) scale(${scale})`}}>{Array.from({length:120},(_,i)=><div key={i}>{mode==="Photos"?<img draggable="false" alt="Landscape study" src={`https://images.unsplash.com/${images[i%images.length]}?auto=format&fit=crop&w=240&q=75`}/>:<span style={{color:["#ff8b44","#749d5c","#8f7bbd","#da608c"][i%4]}}>{symbols[i%symbols.length]}</span>}</div>)}</div>
    <div className="ffx-canvas-tools"><button aria-label="Zoom out" onClick={()=>setScale(v=>Math.max(.6,v-.2))}><ZoomOut size={16}/></button><button aria-label="Zoom in" onClick={()=>setScale(v=>Math.min(1.8,v+.2))}><ZoomIn size={16}/></button><button aria-label="Reset canvas" onClick={()=>{setOffset({x:0,y:0});setScale(1)}}><RotateCcw size={15}/></button><button onClick={()=>setMode(mode==="Photos"?"Objects":"Photos")}>{mode}</button></div>
  </div>;
}

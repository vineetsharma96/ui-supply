import React, { useEffect, useState } from "react";
import "./components.css";
const variants=["Sweep","Words","Stairs","Double stairs","Pixels","Blocks"];
export default function PreloaderStudies({paused=false}){
  const [variant,setVariant]=useState("Stairs");const [progress,setProgress]=useState(0);const [replay,setReplay]=useState(0);
  useEffect(()=>{if(paused){setProgress(1);return}setProgress(0);let start=performance.now();const timer=setInterval(()=>{const p=Math.min(1,(performance.now()-start)/2200);setProgress(p);if(p===1)clearInterval(timer)},30);return()=>clearInterval(timer)},[variant,replay,paused]);
  return <div className="ff-demo ffx ffx-preload"><div className="ffx-preload-content"><h3>Ready for what’s next.</h3><p>A considered entrance.</p></div>
    <div className={"ffx-preload-overlay mode-"+variant.toLowerCase().replaceAll(" ","-")} style={{pointerEvents:progress===1?"none":"auto"}}>
      {variant==="Words"?<div className="ffx-word-loader" style={{opacity:progress>.9?0:1}}><span key={Math.floor(progress*5)}>{["Hello","Bonjour","Hola","नमस्ते","やあ"][Math.min(4,Math.floor(progress*5))]}</span></div>:variant==="Blocks"?<div className="ffx-block-loader" style={{opacity:progress===1?0:1}}><small>Loading</small><div>{Array.from({length:12},(_,i)=><i key={i} style={{opacity:i/12<progress?1:.12}}/>)}</div><span>{Math.round(progress*100)}%</span></div>:<div className="ffx-loader-slats">{Array.from({length:variant==="Pixels"?96:10},(_,i)=>{const p=Math.max(0,Math.min(1,(progress-.25-i%10*.025)*2.7));return <i key={i} style={variant==="Pixels"?{opacity:progress>(i*17%96)/110?0:1}:{transform:`translateY(${(variant==="Double stairs"&&i%2===0?1:-1)*p*110}%)`}}/>})}</div>}
    </div>
    <div className="ffx-preload-tools"><div className="ffx-segments">{variants.map(v=><button key={v} aria-pressed={variant===v} onClick={()=>setVariant(v)}>{v}</button>)}</div><button className="ffx-button" onClick={()=>setReplay(v=>v+1)}>Replay entrance</button></div>
  </div>;
}

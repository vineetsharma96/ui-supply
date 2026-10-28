import React, { useEffect, useState } from "react";
import { Phone, Bell, Mic, Music2, BatteryLow, Radio, ScreenShare, MapPin, Pause, Play } from "lucide-react";
import "./components.css";
const views = ["idle", "ring", "timer", "record", "music", "airdrop", "airdropMini", "lowBattery", "phone", "findmy", "screenRecord"];

// Independent implementation; no premium source was accessed.
export function DynamicIsland({ view = "idle", paused = false }) {
  const [active, setActive] = useState(true);
  const [seconds, setSeconds] = useState(60);
  useEffect(() => { setSeconds(60); setActive(true); }, [view]);
  useEffect(() => {
    if (view !== "timer" || !active || paused) return;
    const timer = setInterval(() => setSeconds(n => Math.max(0, n - 1)), 1000);
    return () => clearInterval(timer);
  }, [view, active, paused]);
  const Icon = {ring:Bell,record:Mic,music:Music2,airdrop:Radio,airdropMini:Radio,lowBattery:BatteryLow,phone:Phone,findmy:MapPin,screenRecord:ScreenShare}[view];
  return <div className={"ffx-island " + (view === "idle" ? "is-idle" : "")} aria-live="polite">
    {view !== "idle" && <>
      <div className={"ffx-island-symbol " + (view==="lowBattery" ? "is-low" : "")}>{Icon ? <Icon size={22}/> : <span>{seconds}s</span>}</div>
      <div className="ffx-island-copy"><strong>{({ring:active?"Ring":"Silent",timer:"Timer",record:active?"Recording":"Paused",music:"A little more time",airdrop:"AirDrop",airdropMini:"AirDrop",lowBattery:"Low battery",phone:active?"Incoming call":"Call ended",findmy:"Finding nearby",screenRecord:active?"Screen recording":"Recording paused"})[view]}</strong>
        <small>{view==="timer" ? `${seconds} seconds remaining` : view==="music" ? "UI Supply · Demo track" : view==="lowBattery" ? "20% remaining" : "Tap to interact"}</small></div>
      <button aria-label={active?"Pause activity":"Resume activity"} onClick={()=>setActive(!active)}>{active?<Pause size={16}/>:<Play size={16}/>}</button>
    </>}
    {["airdrop","findmy"].includes(view) && <div className="ffx-island-progress"/>}
  </div>;
}
export default function DynamicIslandDemo({paused=false}) {
  const [view,setView]=useState("music");
  return <div className="ff-demo ffx"><div className="ffx-center"><div className="ffx-island-stage"><DynamicIsland view={view} paused={paused}/></div>
    <div className="ffx-choice-grid">{views.map(v=><button key={v} aria-pressed={view===v} onClick={()=>setView(v)}>{v.replace(/([A-Z])/g," $1")}</button>)}</div>
  </div></div>;
}

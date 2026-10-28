import React, { useState } from "react";
import "./components.css";
const initialTeams=["Atlas","Orion","Nova","Comet","Luna","Sol","Vega","Aurora"];
export default function KnockoutBracket({ teams = initialTeams }) {
  const [winners,setWinners]=useState([Array(4).fill(null),Array(2).fill(null),[null]]);
  function pick(round,match,team){
    setWinners(old=>{const next=old.map(a=>[...a]);next[round][match]=team;for(let r=round+1;r<3;r++)next[r].fill(null);return next;});
  }
  return <div className="ff-demo ffx ffx-bracket-wrap"><div className="ffx-bracket">
    {["Quarter-finals","Semi-finals","Final"].map((title,round)=><section key={title}>
      <h3>{title}</h3><div className="ffx-bracket-round">{Array.from({length:4/2**round},(_,match)=>{
        const pair=round===0?teams.slice(match*2,match*2+2):winners[round-1].slice(match*2,match*2+2);
        return <div className="ffx-match" key={match}><small>{winners[round][match]?"Winner selected":"Choose a winner"}</small>{pair.map((team,i)=><button key={i} disabled={!team} aria-pressed={!!team&&winners[round][match]===team} onClick={()=>pick(round,match,team)}><span>{team||"To be decided"}</span><span>{team&&winners[round][match]===team?"✓":"—"}</span></button>)}</div>;
      })}</div>
    </section>)}
  </div><button className="ffx-button" onClick={()=>setWinners([Array(4).fill(null),Array(2).fill(null),[null]])}>Reset bracket</button></div>;
}

import React from "react";
import "./components.css";
export default function ShootingStars(){return <div className="ff-demo ffx ffx-stars"><div className="ffx-starfield" aria-hidden="true">{Array.from({length:80},(_,i)=><i key={i} style={{left:(i*37%100)+"%",top:(i*61%100)+"%",animationDelay:(i%7)*.4+"s",opacity:.2+(i%6)*.12}}/>)}{[0,1,2].map(i=><span key={i} style={{top:(20+i*25)+"%",animationDelay:i*2.5+"s"}}/>)}</div><h3>A little further out.</h3><p>There’s always something worth looking up for.</p></div>}

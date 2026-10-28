import React, { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import "./components.css";
export default function InlineSignIn(){
  const [step,setStep]=useState("email");const [email,setEmail]=useState("");const [code,setCode]=useState("");
  return <div className="ff-demo ffx"><div className="ffx-inline-auth">
    {step==="done"?<><Check size={35}/><h3>You’re in.</h3><p>This was a sign-in preview.</p><button className="ffx-button" onClick={()=>{setStep("email");setCode("")}}>Try again</button></>:<form onSubmit={e=>{e.preventDefault();setStep(step==="email"?"code":"done")}}>
      <label htmlFor="ffx-auth-input">{step==="email"?"Let’s get you started.":"Enter a six-digit code."}</label>
      <div className="ffx-inline-field"><input id="ffx-auth-input" key={step} autoComplete={step==="email"?"email":"one-time-code"} type={step==="email"?"email":"text"} inputMode={step==="code"?"numeric":undefined} pattern={step==="code"?"[0-9]{6}":undefined} maxLength={step==="code"?6:undefined} required value={step==="email"?email:code} onChange={e=>step==="email"?setEmail(e.target.value):setCode(e.target.value.replace(/\D/g,""))} placeholder={step==="email"?"you@example.com":"000000"}/><button type="submit" aria-label={step==="email"?"Continue with email":"Verify demo code"}><ArrowRight size={26}/></button></div>
      <p>{step==="email"?"A small interaction, from email to welcome.":`For this preview, enter any six digits. No email was sent to ${email}.`}</p>
      {step==="code"&&<button type="button" className="ffx-text-button" onClick={()=>setStep("email")}>Use another email</button>}
    </form>}
  </div></div>;
}

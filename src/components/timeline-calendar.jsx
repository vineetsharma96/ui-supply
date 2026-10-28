import React, { useState } from "react";
import "./components.css";
const initial=[
  ["Finish component documentation","Review the new interactions","Prepare the next release"],
  ["Explore the animation studies","Collect feedback from the team","Refine the mobile layouts"],
  ["Publish the changelog","Plan the next collection"],
];
export default function TimelineCalendar(){
  const [days,setDays]=useState(initial.map(tasks=>tasks.map(text=>({text,done:false}))));
  const [draft,setDraft]=useState("");
  return <div className="ff-demo ffx ffx-task-calendar">
    {days.map((tasks,day)=><section key={day}><h3>{["Today","Tomorrow","Later this week"][day]} <small>{tasks.filter(x=>x.done).length}/{tasks.length}</small></h3>
      {tasks.map((task,i)=><label key={i} className={task.done?"is-done":""}><input type="checkbox" checked={task.done} onChange={()=>setDays(old=>old.map((list,d)=>d===day?list.map((x,j)=>j===i?{...x,done:!x.done}:x):list))}/><span>{task.text}</span></label>)}
    </section>)}
    <form onSubmit={e=>{e.preventDefault();if(draft.trim()){setDays(old=>old.map((list,i)=>i===0?[...list,{text:draft.trim(),done:false}]:list));setDraft("")}}}>
      <input aria-label="New task" placeholder="Add a task for today…" value={draft} onChange={e=>setDraft(e.target.value)}/><button type="submit" aria-label="Add task">+</button>
    </form>
  </div>;
}

import React from "react";
import "./components.css";
const questions = [
  {
    question: "What makes a good component?",
    answer:
      "A clear purpose, considered interaction, and enough flexibility to make it your own.",
  },
  {
    question: "Can I customize the design?",
    answer:
      "Yes. Copy the JSX and CSS, then adjust the colors, content, spacing, and behavior for your project.",
  },
  {
    question: "What do I need to get started?",
    answer:
      "A React project and the included CSS. These local implementations do not need an animation library.",
  },
];
export default function FaqAccordion({ items = questions }) {
  return (
    <div className="ff-demo ff-faq">
      <span className="ff-kicker">A LITTLE CLARITY</span>
      <h3>Glad you asked.</h3>
      {items.map((item, i) => (
        <details key={i} name="ff-faq-group">
          <summary>
            {item.question}
            <span>+</span>
          </summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

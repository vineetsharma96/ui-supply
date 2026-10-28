// Adapted from https://ui.aceternity.com/components/sticky-scroll-reveal
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:components/ui/sticky-scroll-reveal.tsx
import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { motion } from "motion/react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/sticky-scroll-reveal.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var StickyScroll = ({
  content: content2,
  contentClassName
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    // uncomment line 22 and comment line 23 if you DONT want the overflow container and want to have it change on the entire page scroll
    // target: ref
    container: ref,
    offset: ["start start", "end start"]
  });
  const cardLength = content2.length;
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content2.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });
  const backgroundColors = [
    "#0f172a",
    // slate-900
    "#000000",
    // black
    "#171717"
    // neutral-900
  ];
  const linearGradients = [
    "linear-gradient(to bottom right, #06b6d4, #10b981)",
    // cyan-500 to emerald-500
    "linear-gradient(to bottom right, #ec4899, #6366f1)",
    // pink-500 to indigo-500
    "linear-gradient(to bottom right, #f97316, #eab308)"
    // orange-500 to yellow-500
  ];
  const [backgroundGradient, setBackgroundGradient] = useState(
    linearGradients[0]
  );
  useEffect(() => {
    setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
  }, [activeCard]);
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      animate: {
        backgroundColor: backgroundColors[activeCard % backgroundColors.length]
      },
      className: "relative flex h-[30rem] justify-center space-x-10 overflow-y-auto rounded-md p-10",
      ref,
      children: [
        /* @__PURE__ */ jsx("div", { className: "div relative flex items-start px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-2xl", children: [
          content2.map((item, index) => /* @__PURE__ */ jsxs("div", { className: "my-20", children: [
            /* @__PURE__ */ jsx(
              motion.h2,
              {
                initial: {
                  opacity: 0
                },
                animate: {
                  opacity: activeCard === index ? 1 : 0.3
                },
                className: "text-2xl font-bold text-slate-100",
                children: item.title
              }
            ),
            /* @__PURE__ */ jsx(
              motion.p,
              {
                initial: {
                  opacity: 0
                },
                animate: {
                  opacity: activeCard === index ? 1 : 0.3
                },
                className: "text-kg mt-10 max-w-sm text-slate-300",
                children: item.description
              }
            )
          ] }, item.title + index)),
          /* @__PURE__ */ jsx("div", { className: "h-40" })
        ] }) }),
        /* @__PURE__ */ jsx(
          "div",
          {
            style: { background: backgroundGradient },
            className: cn(
              "sticky top-10 hidden h-60 w-80 overflow-hidden rounded-md bg-white lg:block",
              contentClassName
            ),
            children: content2[activeCard].content ?? null
          }
        )
      ]
    }
  );
};

// entry.jsx
import React2 from "react";

// registry:components/sticky-scroll-reveal-demo.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var content = [
  {
    title: "Collaborative Editing",
    description: "Work together in real time with your team, clients, and stakeholders. Collaborate on documents, share ideas, and make decisions quickly. With our platform, you can streamline your workflow and increase productivity.",
    content: /* @__PURE__ */ jsx2("div", { className: "flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] text-white", children: "Collaborative Editing" })
  },
  {
    title: "Real time changes",
    description: "See changes as they happen. With our platform, you can track every modification in real time. No more confusion about the latest version of your project. Say goodbye to the chaos of version control and embrace the simplicity of real-time updates.",
    content: /* @__PURE__ */ jsx2("div", { className: "flex h-full w-full items-center justify-center text-white", children: /* @__PURE__ */ jsx2(
      "img",
      {
        src: "https://ui.aceternity.com/linear.webp",
        width: 300,
        height: 300,
        className: "h-full w-full object-cover",
        alt: "linear board demo"
      }
    ) })
  },
  {
    title: "Version control",
    description: "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
    content: /* @__PURE__ */ jsx2("div", { className: "flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] text-white", children: "Version control" })
  },
  {
    title: "Running out of content",
    description: "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
    content: /* @__PURE__ */ jsx2("div", { className: "flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] text-white", children: "Running out of content" })
  }
];
function StickyScrollRevealDemo() {
  return /* @__PURE__ */ jsx2("div", { className: "w-full py-4", children: /* @__PURE__ */ jsx2(StickyScroll, { content }) });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(StickyScrollRevealDemo, {}) }) });
}
export {
  StickyScroll,
  Component as default
};

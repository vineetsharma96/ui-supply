// Adapted from https://ui.aceternity.com/components/container-text-flip
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:components/ui/container-text-flip.tsx
import React, { useState, useEffect, useId } from "react";
import { motion } from "motion/react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/container-text-flip.tsx
import { jsx } from "react/jsx-runtime";
function ContainerTextFlip({
  words = ["better", "modern", "beautiful", "awesome"],
  interval = 3e3,
  className,
  textClassName,
  animationDuration = 700
}) {
  const id = useId();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [width, setWidth] = useState(100);
  const textRef = React.useRef(null);
  const updateWidthForWord = () => {
    if (textRef.current) {
      const textWidth = textRef.current.scrollWidth + 30;
      setWidth(textWidth);
    }
  };
  useEffect(() => {
    updateWidthForWord();
  }, [currentWordIndex]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, interval);
    return () => clearInterval(intervalId);
  }, [words, interval]);
  return /* @__PURE__ */ jsx(
    motion.p,
    {
      layout: true,
      layoutId: `words-here-${id}`,
      animate: { width },
      transition: { duration: animationDuration / 2e3 },
      className: cn(
        "relative inline-block rounded-lg pt-2 pb-3 text-center text-4xl font-bold text-black md:text-7xl dark:text-white",
        "[background:linear-gradient(to_bottom,#f3f4f6,#e5e7eb)]",
        "shadow-[inset_0_-1px_#d1d5db,inset_0_0_0_1px_#d1d5db,_0_4px_8px_#d1d5db]",
        "dark:[background:linear-gradient(to_bottom,#374151,#1f2937)]",
        "dark:shadow-[inset_0_-1px_#10171e,inset_0_0_0_1px_hsla(205,89%,46%,.24),_0_4px_8px_#00000052]",
        className
      ),
      children: /* @__PURE__ */ jsx(
        motion.div,
        {
          transition: {
            duration: animationDuration / 1e3,
            ease: "easeInOut"
          },
          className: cn("inline-block", textClassName),
          ref: textRef,
          layoutId: `word-div-${words[currentWordIndex]}-${id}`,
          children: /* @__PURE__ */ jsx(motion.div, { className: "inline-block", children: words[currentWordIndex].split("").map((letter, index) => /* @__PURE__ */ jsx(
            motion.span,
            {
              initial: {
                opacity: 0,
                filter: "blur(10px)"
              },
              animate: {
                opacity: 1,
                filter: "blur(0px)"
              },
              transition: {
                delay: index * 0.02
              },
              children: letter
            },
            index
          )) })
        }
      )
    },
    words[currentWordIndex]
  );
}

// entry.jsx
import React2 from "react";

// registry:components/container-text-flip-demo.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
function ContainerTextFlipDemo() {
  return /* @__PURE__ */ jsx2(
    ContainerTextFlip,
    {
      words: ["better", "modern", "Tyler Durden", "awesome"]
    }
  );
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(ContainerTextFlipDemo, {}) }) });
}
export {
  ContainerTextFlip,
  Component as default
};

/*
MIT License

Copyright (c) 2025-2026 Ashutoshx7

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/
// Adapted from https://www.vengenceui.com/components/cursor-card
// Copyright (c) 2025-2026 Ashutoshx7. See licenses/vengeance.txt for usage terms.
// registry:components/ui/cursor-card.tsx
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, useMotionValue, useSpring, AnimatePresence } from "motion/react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/cursor-card.tsx
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
function CursorCard({ children, image, description, href = "#", className }) {
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 300 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  useEffect(() => {
    setMounted(true);
  }, []);
  const handleMouseMove = (e) => {
    x.set(e.clientX - 120);
    y.set(e.clientY + 20);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "a",
      {
        href,
        className: cn(
          "relative inline-block font-bold text-neutral-900 dark:text-neutral-100 transition-colors",
          "hover:bg-orange-100 dark:hover:bg-orange-900/40 rounded px-1 -mx-1",
          className
        ),
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
        onMouseMove: handleMouseMove,
        children
      }
    ),
    mounted && typeof document !== "undefined" && createPortal(
      /* @__PURE__ */ jsx(AnimatePresence, { children: isHovered && /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.8 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 0.8 },
          transition: { duration: 0.15, ease: "easeOut" },
          style: {
            x: springX,
            y: springY
          },
          className: cn(
            "fixed top-0 left-0 pointer-events-none z-50 w-[240px]",
            "bg-white dark:bg-neutral-900 p-3 shadow-2xl rounded-xl border border-neutral-200 dark:border-neutral-800"
          ),
          children: [
            /* @__PURE__ */ jsx("img", { src: image, alt: "hover preview", className: "w-full h-auto rounded-md mb-3 object-cover" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-neutral-600 dark:text-neutral-400 m-0 leading-relaxed", children: description })
          ]
        }
      ) }),
      document.body
    )
  ] });
}

// entry.jsx
import React2 from "react";

// registry:components/docs/cursor-card-demo.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function CursorCardDemo() {
  return /* @__PURE__ */ jsx2("div", { className: "flex w-full h-[600px] flex-col items-center justify-center", children: /* @__PURE__ */ jsxs2("div", { className: "max-w-xl mx-auto p-8 leading-relaxed text-neutral-700 dark:text-neutral-300", children: [
    /* @__PURE__ */ jsx2("h1", { className: "text-4xl font-serif mb-6 text-neutral-900 dark:text-white", children: "Vincent van Gogh" }),
    /* @__PURE__ */ jsxs2("p", { children: [
      "Vincent van Gogh, in full Vincent Willem van Gogh, (born March 30, 1853,",
      " ",
      /* @__PURE__ */ jsx2(
        CursorCard,
        {
          image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/344846/500px-P1040705_copyGemeentehuis_Zundert.jpg",
          description: "Zundert is a municipality and town in the south of the Netherlands, in the province of North Brabant.",
          children: "Zundert, Netherlands"
        }
      ),
      " ",
      "\u2014 died July 29, 1890, Auvers-sur-Oise, near",
      " ",
      /* @__PURE__ */ jsx2(
        CursorCard,
        {
          image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/344846/eyfel-kulesi-paris.jpg",
          description: "Paris is the capital and most populous city of France.",
          children: "Paris, France"
        }
      ),
      "), Dutch painter, generally considered the greatest after",
      " ",
      /* @__PURE__ */ jsx2(
        CursorCard,
        {
          image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/344846/Rembrandt.jpg",
          description: "Rembrandt Harmenszoon van Rijn (July 15, 1606 \u2013 October 4, 1669) was a Dutch draughtsman, painter and printmaker.",
          children: "Rembrandt van Rijn"
        }
      ),
      ", and one of the greatest of the",
      " ",
      /* @__PURE__ */ jsx2(
        CursorCard,
        {
          image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/344846/Vincent-van-Gogh-The-Starry-Night-1889-2.jpg",
          description: "Post-Impressionism is an art movement that developed in the 1890s.",
          children: "Post-Impressionists."
        }
      ),
      " ",
      "The striking colour, emphatic brushwork, and contoured forms of his work powerfully influenced the current of",
      " ",
      /* @__PURE__ */ jsx2(
        CursorCard,
        {
          image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/344846/Screen%20Shot%202019-04-20%20at%2012.04.29.png",
          description: "Expressionism is a modernist movement, initially in poetry and painting, originating in Germany at the beginning of the 20th century.",
          children: "Expressionism"
        }
      ),
      " ",
      "in modern art. Van Gogh\u2019s art became astoundingly popular after his death, especially in the late 20th century, when his work sold for record-breaking sums at auctions around the world and was featured in blockbuster touring exhibitions."
    ] })
  ] }) });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(CursorCardDemo, {}) }) });
}
export {
  CursorCard,
  Component as default
};

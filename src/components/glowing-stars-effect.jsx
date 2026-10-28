// Adapted from https://ui.aceternity.com/components/glowing-stars-effect
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:components/ui/glowing-stars.tsx
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/glowing-stars.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var GlowingStarsBackgroundCard = ({
  className,
  children
}) => {
  const [mouseEnter, setMouseEnter] = useState(false);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      onMouseEnter: () => {
        setMouseEnter(true);
      },
      onMouseLeave: () => {
        setMouseEnter(false);
      },
      className: cn(
        "bg-[linear-gradient(110deg,#333_0.6%,#222)] p-4 max-w-md max-h-[20rem] h-full w-full rounded-xl border border-[#eaeaea] dark:border-neutral-600",
        className
      ),
      children: [
        /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center", children: /* @__PURE__ */ jsx(Illustration, { mouseEnter }) }),
        /* @__PURE__ */ jsx("div", { className: "px-2 pb-6", children })
      ]
    }
  );
};
var GlowingStarsDescription = ({
  className,
  children
}) => {
  return /* @__PURE__ */ jsx("p", { className: cn("text-base text-white max-w-[16rem]", className), children });
};
var GlowingStarsTitle = ({
  className,
  children
}) => {
  return /* @__PURE__ */ jsx("h2", { className: cn("font-bold text-2xl text-[#eaeaea]", className), children });
};
var Illustration = ({ mouseEnter }) => {
  const stars = 108;
  const columns = 18;
  const [glowingStars, setGlowingStars] = useState([]);
  const highlightedStars = useRef([]);
  useEffect(() => {
    const interval = setInterval(() => {
      highlightedStars.current = Array.from(
        { length: 5 },
        () => Math.floor(Math.random() * stars)
      );
      setGlowingStars([...highlightedStars.current]);
    }, 3e3);
    return () => clearInterval(interval);
  }, []);
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "h-48 p-1 w-full",
      style: {
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: `1px`
      },
      children: [...Array(stars)].map((_, starIdx) => {
        const isGlowing = glowingStars.includes(starIdx);
        const delay = starIdx % 10 * 0.1;
        const staticDelay = starIdx * 0.01;
        return /* @__PURE__ */ jsxs(
          "div",
          {
            className: "relative flex items-center justify-center",
            children: [
              /* @__PURE__ */ jsx(
                Star,
                {
                  isGlowing: mouseEnter ? true : isGlowing,
                  delay: mouseEnter ? staticDelay : delay
                }
              ),
              mouseEnter && /* @__PURE__ */ jsx(Glow, { delay: staticDelay }),
              /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: isGlowing && /* @__PURE__ */ jsx(Glow, { delay }) })
            ]
          },
          `matrix-col-${starIdx}}`
        );
      })
    }
  );
};
var Star = ({ isGlowing, delay }) => {
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: {
        scale: 1
      },
      animate: {
        scale: isGlowing ? [1, 1.2, 2.5, 2.2, 1.5] : 1,
        background: isGlowing ? "#fff" : "#666"
      },
      transition: {
        duration: 2,
        ease: "easeInOut",
        delay
      },
      className: cn("bg-[#666] h-[1px] w-[1px] rounded-full relative z-20")
    },
    delay
  );
};
var Glow = ({ delay }) => {
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: {
        opacity: 0
      },
      animate: {
        opacity: 1
      },
      transition: {
        duration: 2,
        ease: "easeInOut",
        delay
      },
      exit: {
        opacity: 0
      },
      className: "absolute  left-1/2 -translate-x-1/2 z-10 h-[4px] w-[4px] rounded-full bg-blue-500 blur-[1px] shadow-2xl shadow-blue-400"
    }
  );
};

// entry.jsx
import React2 from "react";

// registry:components/glowing-stars-demo.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function GlowingStarsBackgroundCardPreview() {
  return /* @__PURE__ */ jsx2("div", { className: "flex items-center justify-center py-20 antialiased", children: /* @__PURE__ */ jsxs2(GlowingStarsBackgroundCard, { children: [
    /* @__PURE__ */ jsx2(GlowingStarsTitle, { children: "Next.js 14" }),
    /* @__PURE__ */ jsxs2("div", { className: "flex items-end justify-between", children: [
      /* @__PURE__ */ jsx2(GlowingStarsDescription, { children: "The power of full-stack to the frontend. Read the release notes." }),
      /* @__PURE__ */ jsx2("div", { className: "flex h-8 w-8 items-center justify-center rounded-full bg-[hsla(0,0%,100%,.1)]", children: /* @__PURE__ */ jsx2(Icon, {}) })
    ] })
  ] }) });
}
var Icon = () => {
  return /* @__PURE__ */ jsx2(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: "1.5",
      stroke: "currentColor",
      className: "h-4 w-4 stroke-2 text-white",
      children: /* @__PURE__ */ jsx2(
        "path",
        {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          d: "M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
        }
      )
    }
  );
};

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(GlowingStarsBackgroundCardPreview, {}) }) });
}
export {
  GlowingStarsBackgroundCard,
  GlowingStarsDescription,
  GlowingStarsTitle,
  Illustration,
  Component as default
};

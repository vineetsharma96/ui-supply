// Adapted from https://ui.aceternity.com/components/comet-card
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:components/ui/comet-card.tsx
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate
} from "motion/react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/comet-card.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var CometCard = ({
  rotateDepth = 17.5,
  translateDepth = 20,
  className,
  children
}) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    [`-${rotateDepth}deg`, `${rotateDepth}deg`]
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    [`${rotateDepth}deg`, `-${rotateDepth}deg`]
  );
  const translateX = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    [`-${translateDepth}px`, `${translateDepth}px`]
  );
  const translateY = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    [`${translateDepth}px`, `-${translateDepth}px`]
  );
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], [0, 100]);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.9) 10%, rgba(255, 255, 255, 0.75) 20%, rgba(255, 255, 255, 0) 80%)`;
  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  return /* @__PURE__ */ jsx("div", { className: cn("perspective-distant transform-3d", className), children: /* @__PURE__ */ jsxs(
    motion.div,
    {
      ref,
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
      style: {
        rotateX,
        rotateY,
        translateX,
        translateY,
        boxShadow: "rgba(0, 0, 0, 0.01) 0px 520px 146px 0px, rgba(0, 0, 0, 0.04) 0px 333px 133px 0px, rgba(0, 0, 0, 0.26) 0px 83px 83px 0px, rgba(0, 0, 0, 0.29) 0px 21px 46px 0px"
      },
      initial: { scale: 1, z: 0 },
      whileHover: {
        scale: 1.05,
        z: 50,
        transition: { duration: 0.2 }
      },
      className: "relative rounded-2xl",
      children: [
        children,
        /* @__PURE__ */ jsx(
          motion.div,
          {
            className: "pointer-events-none absolute inset-0 z-50 h-full w-full rounded-[16px] mix-blend-overlay",
            style: {
              background: glareBackground,
              opacity: 0.6
            },
            transition: { duration: 0.2 }
          }
        )
      ]
    }
  ) });
};

// entry.jsx
import React2 from "react";

// registry:components/comet-card-demo.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function CometCardDemo() {
  return /* @__PURE__ */ jsx2(CometCard, { children: /* @__PURE__ */ jsxs2(
    "button",
    {
      type: "button",
      className: "my-10 flex w-80 cursor-pointer flex-col items-stretch rounded-[16px] border-0 bg-[#1F2121] p-2 saturate-0 md:my-20 md:p-4",
      "aria-label": "View invite F7RA",
      style: {
        transformStyle: "preserve-3d",
        transform: "none",
        opacity: 1
      },
      children: [
        /* @__PURE__ */ jsx2("div", { className: "mx-2 flex-1", children: /* @__PURE__ */ jsx2("div", { className: "relative mt-2 aspect-[3/4] w-full", children: /* @__PURE__ */ jsx2(
          "img",
          {
            loading: "lazy",
            className: "absolute inset-0 h-full w-full rounded-[16px] bg-[#000000] object-cover contrast-75",
            alt: "Invite background",
            src: "https://images.unsplash.com/photo-1505506874110-6a7a69069a08?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            style: {
              boxShadow: "rgba(0, 0, 0, 0.05) 0px 5px 6px 0px",
              opacity: 1
            }
          }
        ) }) }),
        /* @__PURE__ */ jsxs2("div", { className: "mt-2 flex flex-shrink-0 items-center justify-between p-4 font-mono text-white", children: [
          /* @__PURE__ */ jsx2("div", { className: "text-xs", children: "Comet Invitation" }),
          /* @__PURE__ */ jsx2("div", { className: "text-xs text-gray-300 opacity-50", children: "#F7RA" })
        ] })
      ]
    }
  ) });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(CometCardDemo, {}) }) });
}
export {
  CometCard,
  Component as default
};

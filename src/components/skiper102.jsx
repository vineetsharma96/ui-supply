// Adapted from https://skiper-ui.com/v1/skiper102
// Skiper UI / gxuri. Attribution required for free components. See licenses/skiper.txt for usage terms.
// registry:skiper102.tsx
import { useMotionValue } from "motion/react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:skiper102.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var Skiper102 = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [count, setCount] = useState(0);
  const [keyPressed, setKeyPressed] = useState("");
  useEffect(() => {
    const handleKeyDown = (e) => {
      setKeyPressed(e.key);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      onMouseMove: (e) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      },
      onClick: () => setCount((prev) => prev + 1),
      className: "flex size-full flex-col items-center justify-center",
      children: [
        /* @__PURE__ */ jsx("div", { className: "-mt-36 mb-36 grid content-start justify-items-center gap-6 text-center", children: /* @__PURE__ */ jsx("span", { className: "after:to-foreground relative max-w-[14ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-transparent after:content-['']", children: "Debug Pannel" }) }),
        /* @__PURE__ */ jsx(
          DebugPanel,
          {
            className: "",
            count,
            mouseX,
            mouseY,
            keyPressed
          }
        )
      ]
    }
  );
};
var DebugPanel = ({
  className,
  ...props
}) => {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "z-99 left-4 top-4 font-mono text-sm text-red-500",
        className
      ),
      children: [
        "{",
        Object.entries(props).map(([key, value]) => /* @__PURE__ */ jsxs("div", { className: "ml-4", children: [
          key,
          ":",
          " ",
          value && typeof value === "object" && "get" in value ? /* @__PURE__ */ jsx(motion.span, { children: value }) : typeof value === "boolean" ? value ? "true" : "false" : String(value),
          ";"
        ] }, key)),
        "}"
      ]
    }
  );
};

// entry.jsx
import React from "react";
import { jsx as jsx2 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx2("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx2("div", { className: "vendor-content", children: /* @__PURE__ */ jsx2(Skiper102, {}) }) });
}
export {
  DebugPanel,
  Skiper102,
  Component as default
};

// Adapted from https://ui.aceternity.com/components/text-hover-effect
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:components/ui/text-hover-effect.tsx
import { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var TextHoverEffect = ({
  text,
  duration
}) => {
  const svgRef = useRef(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });
  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = (cursor.x - svgRect.left) / svgRect.width * 100;
      const cyPercentage = (cursor.y - svgRect.top) / svgRect.height * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`
      });
    }
  }, [cursor]);
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      ref: svgRef,
      width: "100%",
      height: "100%",
      viewBox: "0 0 300 100",
      xmlns: "http://www.w3.org/2000/svg",
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      onMouseMove: (e) => setCursor({ x: e.clientX, y: e.clientY }),
      className: "select-none",
      children: [
        /* @__PURE__ */ jsxs("defs", { children: [
          /* @__PURE__ */ jsx(
            "linearGradient",
            {
              id: "textGradient",
              gradientUnits: "userSpaceOnUse",
              cx: "50%",
              cy: "50%",
              r: "25%",
              children: hovered && /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "#eab308" }),
                /* @__PURE__ */ jsx("stop", { offset: "25%", stopColor: "#ef4444" }),
                /* @__PURE__ */ jsx("stop", { offset: "50%", stopColor: "#3b82f6" }),
                /* @__PURE__ */ jsx("stop", { offset: "75%", stopColor: "#06b6d4" }),
                /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "#8b5cf6" })
              ] })
            }
          ),
          /* @__PURE__ */ jsxs(
            motion.radialGradient,
            {
              id: "revealMask",
              gradientUnits: "userSpaceOnUse",
              r: "20%",
              initial: { cx: "50%", cy: "50%" },
              animate: maskPosition,
              transition: { duration: duration ?? 0, ease: "easeOut" },
              children: [
                /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "white" }),
                /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "black" })
              ]
            }
          ),
          /* @__PURE__ */ jsx("mask", { id: "textMask", children: /* @__PURE__ */ jsx(
            "rect",
            {
              x: "0",
              y: "0",
              width: "100%",
              height: "100%",
              fill: "url(#revealMask)"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsx(
          "text",
          {
            x: "50%",
            y: "50%",
            textAnchor: "middle",
            dominantBaseline: "middle",
            strokeWidth: "0.3",
            className: "fill-transparent stroke-neutral-200 font-[helvetica] text-7xl font-bold dark:stroke-neutral-800",
            style: { opacity: hovered ? 0.7 : 0 },
            children: text
          }
        ),
        /* @__PURE__ */ jsx(
          motion.text,
          {
            x: "50%",
            y: "50%",
            textAnchor: "middle",
            dominantBaseline: "middle",
            strokeWidth: "0.3",
            className: "fill-transparent stroke-neutral-200 font-[helvetica] text-7xl font-bold dark:stroke-neutral-800",
            initial: { strokeDashoffset: 1e3, strokeDasharray: 1e3 },
            animate: {
              strokeDashoffset: 0,
              strokeDasharray: 1e3
            },
            transition: {
              duration: 4,
              ease: "easeInOut"
            },
            children: text
          }
        ),
        /* @__PURE__ */ jsx(
          "text",
          {
            x: "50%",
            y: "50%",
            textAnchor: "middle",
            dominantBaseline: "middle",
            stroke: "url(#textGradient)",
            strokeWidth: "0.3",
            mask: "url(#textMask)",
            className: "fill-transparent font-[helvetica] text-7xl font-bold",
            children: text
          }
        )
      ]
    }
  );
};

// entry.jsx
import React2 from "react";

// registry:components/text-hover-effect-demo.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
function TextHoverEffectDemo() {
  return /* @__PURE__ */ jsx2("div", { className: "h-[40rem] flex items-center justify-center", children: /* @__PURE__ */ jsx2(TextHoverEffect, { text: "ACET" }) });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(TextHoverEffectDemo, {}) }) });
}
export {
  TextHoverEffect,
  Component as default
};

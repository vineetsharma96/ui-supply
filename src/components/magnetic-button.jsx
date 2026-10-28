// Adapted from https://ui.aceternity.com/components/magnetic-button
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:components/ui/magnetic-button.tsx
import { useRef, useState } from "react";
import { motion } from "motion/react";
import { jsx } from "react/jsx-runtime";
var MagneticButton = ({
  children,
  strength = 0.8,
  maxDistance = 100
}) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const { clientX, clientY } = e;
    let x = (clientX - (left + width / 2)) * strength;
    let y = (clientY - (top + height / 2)) * strength;
    const distance = Math.hypot(x, y);
    if (distance > maxDistance) {
      const scale = maxDistance / distance;
      x *= scale;
      y *= scale;
    }
    setPosition({ x, y });
  };
  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };
  const hasMoved = position.x !== 0 || position.y !== 0;
  return /* @__PURE__ */ jsx(
    "div",
    {
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
      className: "cursor-pointer rounded-lg border border-dashed transition-colors duration-150 [--show-color:var(--color-blue-500)]",
      style: {
        borderColor: hasMoved ? "var(--show-color)" : "transparent",
        backgroundColor: hasMoved ? "color-mix(in srgb,var(--show-color) 20%, transparent)" : "transparent"
      },
      children: /* @__PURE__ */ jsx(
        motion.div,
        {
          ref,
          animate: { x: position.x, y: position.y },
          transition: { type: "spring", stiffness: 150, damping: 25, mass: 0.1 },
          children
        }
      )
    }
  );
};

// entry.jsx
import React2 from "react";

// registry:components/magnetic-button-demo.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
function MagneticButtonDemo() {
  const handleClick = () => {
    console.log("clicked");
  };
  return /* @__PURE__ */ jsx2("div", { className: "flex h-[40rem] w-full items-center justify-center", children: /* @__PURE__ */ jsx2(MagneticButton, { children: /* @__PURE__ */ jsx2(
    "button",
    {
      onClick: handleClick,
      className: "cursor-pointer rounded-lg bg-linear-to-b from-blue-500 to-blue-700 px-4 py-2 font-medium text-white ring-1 ring-white/20 ring-offset-1 ring-offset-blue-500 transition-transform duration-150 ring-inset active:scale-98",
      children: "Follow @mannupaaji"
    }
  ) }) });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(MagneticButtonDemo, {}) }) });
}
export {
  MagneticButton,
  Component as default
};

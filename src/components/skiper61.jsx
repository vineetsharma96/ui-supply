// Adapted from https://skiper-ui.com/v1/skiper61
// Skiper UI / gxuri. Attribution required for free components. See licenses/skiper.txt for usage terms.
// registry:skiper61.tsx
import { motion, useMotionValue, useSpring } from "motion/react";
import { jsx, jsxs } from "react/jsx-runtime";
var SPRING = {
  mass: 0.1,
  // avoid Controls inertia (how sluggish or responsive the object feels). Lower mass = snappier motion; higher mass = lethargic motion
  damping: 10,
  // its like the weight of the ball heavier the ball less it will bounce or harder the rubber band the more it will bounce
  stiffness: 131
  // like rubber Band the more you strech the more speed it goes back to the original position
};
var SimpleMouseFollow = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const opacity = useMotionValue(0);
  const handlePointerMove = (e) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - bounds.left);
    y.set(e.clientY - bounds.top);
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      onPointerMove: (e) => {
        handlePointerMove(e);
      },
      onPointerEnter: () => {
        opacity.set(1);
      },
      onPointerLeave: () => {
        opacity.set(0);
      },
      className: "rounded-4xl bg-background mt-20 size-[500px] cursor-none overflow-hidden",
      children: /* @__PURE__ */ jsx(
        motion.div,
        {
          style: {
            x,
            y,
            opacity
          },
          className: "rounded-4xl size-5 bg-[#ccc]"
        }
      )
    }
  );
};
var SpringMouseFollow = () => {
  const xSpring = useSpring(0, SPRING);
  const ySpring = useSpring(0, SPRING);
  const opacitySpring = useSpring(0, SPRING);
  const scaleSpring = useSpring(0, SPRING);
  return /* @__PURE__ */ jsx(
    "div",
    {
      onPointerMove: (e) => {
        const bounds = e.currentTarget.getBoundingClientRect();
        xSpring.set(e.clientX - bounds.left);
        ySpring.set(e.clientY - bounds.top);
      },
      onPointerEnter: () => {
        opacitySpring.set(1);
        scaleSpring.set(1);
      },
      onPointerLeave: () => {
        opacitySpring.set(0);
        scaleSpring.set(0);
      },
      className: "rounded-4xl bg-background mt-20 size-[500px] overflow-hidden",
      children: /* @__PURE__ */ jsx(
        motion.div,
        {
          style: {
            x: xSpring,
            y: ySpring,
            opacity: opacitySpring,
            scale: scaleSpring
          },
          className: "rounded-4xl size-10 bg-orange-500"
        }
      )
    }
  );
};
var Skiper61 = () => {
  return /* @__PURE__ */ jsxs("section", { className: "h-screen w-full snap-y snap-mandatory overflow-y-scroll", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex h-screen w-full snap-start flex-col items-center justify-center px-5", children: [
      /* @__PURE__ */ jsx("div", { className: "grid content-start justify-items-center gap-6 text-center", children: /* @__PURE__ */ jsx("span", { className: "after:to-foreground relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-transparent after:content-['']", children: "Mouse follow simple" }) }),
      /* @__PURE__ */ jsx(SimpleMouseFollow, {})
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex h-screen w-full snap-start flex-col items-center justify-center px-5", children: [
      /* @__PURE__ */ jsx("div", { className: "grid content-start justify-items-center gap-6 text-center", children: /* @__PURE__ */ jsx("span", { className: "after:to-foreground relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-transparent after:content-['']", children: "Mouse follow with Spring" }) }),
      /* @__PURE__ */ jsx(SpringMouseFollow, {})
    ] })
  ] });
};

// entry.jsx
import React from "react";
import { jsx as jsx2 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx2("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx2("div", { className: "vendor-content", children: /* @__PURE__ */ jsx2(Skiper61, {}) }) });
}
export {
  SimpleMouseFollow,
  Skiper61,
  SpringMouseFollow,
  Component as default
};

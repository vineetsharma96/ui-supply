// Adapted from https://ui.aceternity.com/components/background-beams-with-collision
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/background-beams-with-collision.tsx
import { motion, AnimatePresence } from "motion/react";
import React, { useRef, useState, useEffect } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var BackgroundBeamsWithCollision = ({
  children,
  className
}) => {
  const containerRef = useRef(null);
  const parentRef = useRef(null);
  const beams = [
    {
      initialX: 10,
      translateX: 10,
      duration: 7,
      repeatDelay: 3,
      delay: 2
    },
    {
      initialX: 600,
      translateX: 600,
      duration: 3,
      repeatDelay: 3,
      delay: 4
    },
    {
      initialX: 100,
      translateX: 100,
      duration: 7,
      repeatDelay: 7,
      className: "h-6"
    },
    {
      initialX: 400,
      translateX: 400,
      duration: 5,
      repeatDelay: 14,
      delay: 4
    },
    {
      initialX: 800,
      translateX: 800,
      duration: 11,
      repeatDelay: 2,
      className: "h-20"
    },
    {
      initialX: 1e3,
      translateX: 1e3,
      duration: 4,
      repeatDelay: 2,
      className: "h-12"
    },
    {
      initialX: 1200,
      translateX: 1200,
      duration: 6,
      repeatDelay: 4,
      delay: 2,
      className: "h-6"
    }
  ];
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: parentRef,
      className: cn(
        "h-96 md:h-[40rem] bg-gradient-to-b from-white to-neutral-100 dark:from-neutral-950 dark:to-neutral-800 relative flex items-center w-full justify-center overflow-hidden",
        // h-screen if you want bigger
        className
      ),
      children: [
        beams.map((beam) => /* @__PURE__ */ jsx(
          CollisionMechanism,
          {
            beamOptions: beam,
            containerRef,
            parentRef
          },
          beam.initialX + "beam-idx"
        )),
        children,
        /* @__PURE__ */ jsx(
          "div",
          {
            ref: containerRef,
            className: "absolute bottom-0 bg-neutral-100 w-full inset-x-0 pointer-events-none",
            style: {
              boxShadow: "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
            }
          }
        )
      ]
    }
  );
};
var CollisionMechanism = React.forwardRef(({ parentRef, containerRef, beamOptions = {} }, ref) => {
  const beamRef = useRef(null);
  const [collision, setCollision] = useState({
    detected: false,
    coordinates: null
  });
  const [beamKey, setBeamKey] = useState(0);
  const [cycleCollisionDetected, setCycleCollisionDetected] = useState(false);
  useEffect(() => {
    const checkCollision = () => {
      if (beamRef.current && containerRef.current && parentRef.current && !cycleCollisionDetected) {
        const beamRect = beamRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        const parentRect = parentRef.current.getBoundingClientRect();
        if (beamRect.bottom >= containerRect.top) {
          const relativeX = beamRect.left - parentRect.left + beamRect.width / 2;
          const relativeY = beamRect.bottom - parentRect.top;
          setCollision({
            detected: true,
            coordinates: {
              x: relativeX,
              y: relativeY
            }
          });
          setCycleCollisionDetected(true);
        }
      }
    };
    const animationInterval = setInterval(checkCollision, 50);
    return () => clearInterval(animationInterval);
  }, [cycleCollisionDetected, containerRef]);
  useEffect(() => {
    if (collision.detected && collision.coordinates) {
      setTimeout(() => {
        setCollision({ detected: false, coordinates: null });
        setCycleCollisionDetected(false);
      }, 2e3);
      setTimeout(() => {
        setBeamKey((prevKey) => prevKey + 1);
      }, 2e3);
    }
  }, [collision]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      motion.div,
      {
        ref: beamRef,
        animate: "animate",
        initial: {
          translateY: beamOptions.initialY || "-200px",
          translateX: beamOptions.initialX || "0px",
          rotate: beamOptions.rotate || 0
        },
        variants: {
          animate: {
            translateY: beamOptions.translateY || "1800px",
            translateX: beamOptions.translateX || "0px",
            rotate: beamOptions.rotate || 0
          }
        },
        transition: {
          duration: beamOptions.duration || 8,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          delay: beamOptions.delay || 0,
          repeatDelay: beamOptions.repeatDelay || 0
        },
        className: cn(
          "absolute left-0 top-20 m-auto h-14 w-px rounded-full bg-gradient-to-t from-indigo-500 via-purple-500 to-transparent",
          beamOptions.className
        )
      },
      beamKey
    ),
    /* @__PURE__ */ jsx(AnimatePresence, { children: collision.detected && collision.coordinates && /* @__PURE__ */ jsx(
      Explosion,
      {
        className: "",
        style: {
          left: `${collision.coordinates.x}px`,
          top: `${collision.coordinates.y}px`,
          transform: "translate(-50%, -50%)"
        }
      },
      `${collision.coordinates.x}-${collision.coordinates.y}`
    ) })
  ] });
});
CollisionMechanism.displayName = "CollisionMechanism";
var Explosion = ({ ...props }) => {
  const spans = Array.from({ length: 20 }, (_, index) => ({
    id: index,
    initialX: 0,
    initialY: 0,
    directionX: Math.floor(Math.random() * 80 - 40),
    directionY: Math.floor(Math.random() * -50 - 10)
  }));
  return /* @__PURE__ */ jsxs("div", { ...props, className: cn("absolute z-50 h-2 w-2", props.className), children: [
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 1.5, ease: "easeOut" },
        className: "absolute -inset-x-10 top-0 m-auto h-2 w-10 rounded-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm"
      }
    ),
    spans.map((span) => /* @__PURE__ */ jsx(
      motion.span,
      {
        initial: { x: span.initialX, y: span.initialY, opacity: 1 },
        animate: {
          x: span.directionX,
          y: span.directionY,
          opacity: 0
        },
        transition: { duration: Math.random() * 1.5 + 0.5, ease: "easeOut" },
        className: "absolute h-1 w-1 rounded-full bg-gradient-to-b from-indigo-500 to-purple-500"
      },
      span.id
    ))
  ] });
};

// entry.jsx
import React2 from "react";

// registry:components/background-beams-with-collision-demo.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function BackgroundBeamsWithCollisionDemo() {
  return /* @__PURE__ */ jsx2(BackgroundBeamsWithCollision, { children: /* @__PURE__ */ jsxs2("h2", { className: "text-2xl relative z-20 md:text-4xl lg:text-7xl font-bold text-center text-black dark:text-white font-sans tracking-tight", children: [
    "What's cooler than Beams?",
    " ",
    /* @__PURE__ */ jsxs2("div", { className: "relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]", children: [
      /* @__PURE__ */ jsx2("div", { className: "absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]", children: /* @__PURE__ */ jsx2("span", { className: "", children: "Exploding beams." }) }),
      /* @__PURE__ */ jsx2("div", { className: "relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4", children: /* @__PURE__ */ jsx2("span", { className: "", children: "Exploding beams." }) })
    ] })
  ] }) });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(BackgroundBeamsWithCollisionDemo, {}) }) });
}
export {
  BackgroundBeamsWithCollision,
  Component as default
};

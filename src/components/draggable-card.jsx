// Adapted from https://ui.aceternity.com/components/draggable-card
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/draggable-card.tsx
import { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
  useVelocity,
  useAnimationControls
} from "motion/react";
import { jsx, jsxs } from "react/jsx-runtime";
var DraggableCardBody = ({
  className,
  children
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cardRef = useRef(null);
  const controls = useAnimationControls();
  const [constraints, setConstraints] = useState({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  });
  const velocityX = useVelocity(mouseX);
  const velocityY = useVelocity(mouseY);
  const springConfig = {
    stiffness: 100,
    damping: 20,
    mass: 0.5
  };
  const rotateX = useSpring(
    useTransform(mouseY, [-300, 300], [25, -25]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-300, 300], [-25, 25]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(mouseX, [-300, 0, 300], [0.8, 1, 0.8]),
    springConfig
  );
  const glareOpacity = useSpring(
    useTransform(mouseX, [-300, 0, 300], [0.2, 0, 0.2]),
    springConfig
  );
  useEffect(() => {
    const updateConstraints = () => {
      if (typeof window !== "undefined") {
        setConstraints({
          top: -window.innerHeight / 2,
          left: -window.innerWidth / 2,
          right: window.innerWidth / 2,
          bottom: window.innerHeight / 2
        });
      }
    };
    updateConstraints();
    window.addEventListener("resize", updateConstraints);
    return () => {
      window.removeEventListener("resize", updateConstraints);
    };
  }, []);
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { width, height, left, top } = cardRef.current?.getBoundingClientRect() ?? {
      width: 0,
      height: 0,
      left: 0,
      top: 0
    };
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;
    mouseX.set(deltaX);
    mouseY.set(deltaY);
  };
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      ref: cardRef,
      drag: true,
      dragConstraints: constraints,
      onDragStart: () => {
        document.body.style.cursor = "grabbing";
      },
      onDragEnd: (event, info) => {
        document.body.style.cursor = "default";
        controls.start({
          rotateX: 0,
          rotateY: 0,
          transition: {
            type: "spring",
            ...springConfig
          }
        });
        const currentVelocityX = velocityX.get();
        const currentVelocityY = velocityY.get();
        const velocityMagnitude = Math.sqrt(
          currentVelocityX * currentVelocityX + currentVelocityY * currentVelocityY
        );
        const bounce = Math.min(0.8, velocityMagnitude / 1e3);
        animate(info.point.x, info.point.x + currentVelocityX * 0.3, {
          duration: 0.8,
          ease: [0.2, 0, 0, 1],
          bounce,
          type: "spring",
          stiffness: 50,
          damping: 15,
          mass: 0.8
        });
        animate(info.point.y, info.point.y + currentVelocityY * 0.3, {
          duration: 0.8,
          ease: [0.2, 0, 0, 1],
          bounce,
          type: "spring",
          stiffness: 50,
          damping: 15,
          mass: 0.8
        });
      },
      style: {
        rotateX,
        rotateY,
        opacity,
        willChange: "transform"
      },
      animate: controls,
      whileHover: { scale: 1.02 },
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
      className: cn(
        "relative min-h-96 w-80 overflow-hidden rounded-md bg-neutral-100 p-6 shadow-2xl transform-3d dark:bg-neutral-900",
        className
      ),
      children: [
        children,
        /* @__PURE__ */ jsx(
          motion.div,
          {
            style: {
              opacity: glareOpacity
            },
            className: "pointer-events-none absolute inset-0 bg-white select-none"
          }
        )
      ]
    }
  );
};
var DraggableCardContainer = ({
  className,
  children
}) => {
  return /* @__PURE__ */ jsx("div", { className: cn("[perspective:3000px]", className), children });
};

// entry.jsx
import React2 from "react";

// registry:components/draggable-card-demo.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function DraggableCardDemo() {
  return /* @__PURE__ */ jsx2(DraggableCardContainer, { className: "relative flex min-h-screen w-full flex-col items-center justify-center overflow-clip", children: /* @__PURE__ */ jsxs2(DraggableCardBody, { children: [
    /* @__PURE__ */ jsx2(
      "img",
      {
        src: "https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=3634&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Some mountains",
        className: "pointer-events-none relative z-10 h-80 w-full object-cover"
      }
    ),
    /* @__PURE__ */ jsx2("p", { className: "mt-4 text-center text-2xl font-bold text-neutral-700 dark:text-neutral-300", children: "Switzerland" })
  ] }) });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(DraggableCardDemo, {}) }) });
}
export {
  DraggableCardBody,
  DraggableCardContainer,
  Component as default
};

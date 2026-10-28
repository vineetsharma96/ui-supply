// Adapted from https://ui.aceternity.com/components/text-reveal-card
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:components/ui/text-reveal-card.tsx
import { useEffect, useRef, useState, memo } from "react";
import { motion } from "motion/react";
import { twMerge as twMerge2 } from "tailwind-merge";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/text-reveal-card.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var TextRevealCard = ({
  text,
  revealText,
  children,
  className
}) => {
  const [widthPercentage, setWidthPercentage] = useState(0);
  const cardRef = useRef(null);
  const [left, setLeft] = useState(0);
  const [localWidth, setLocalWidth] = useState(0);
  const [isMouseOver, setIsMouseOver] = useState(false);
  useEffect(() => {
    if (cardRef.current) {
      const { left: left2, width: localWidth2 } = cardRef.current.getBoundingClientRect();
      setLeft(left2);
      setLocalWidth(localWidth2);
    }
  }, []);
  function mouseMoveHandler(event) {
    event.preventDefault();
    const { clientX } = event;
    if (cardRef.current) {
      const relativeX = clientX - left;
      setWidthPercentage(relativeX / localWidth * 100);
    }
  }
  function mouseLeaveHandler() {
    setIsMouseOver(false);
    setWidthPercentage(0);
  }
  function mouseEnterHandler() {
    setIsMouseOver(true);
  }
  function touchMoveHandler(event) {
    event.preventDefault();
    const clientX = event.touches[0].clientX;
    if (cardRef.current) {
      const relativeX = clientX - left;
      setWidthPercentage(relativeX / localWidth * 100);
    }
  }
  const rotateDeg = (widthPercentage - 50) * 0.1;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      onMouseEnter: mouseEnterHandler,
      onMouseLeave: mouseLeaveHandler,
      onMouseMove: mouseMoveHandler,
      onTouchStart: mouseEnterHandler,
      onTouchEnd: mouseLeaveHandler,
      onTouchMove: touchMoveHandler,
      ref: cardRef,
      className: cn(
        "bg-[#1d1c20] border border-white/[0.08] w-[40rem] rounded-lg p-8 relative overflow-hidden",
        className
      ),
      children: [
        children,
        /* @__PURE__ */ jsxs("div", { className: "h-40  relative flex items-center overflow-hidden", children: [
          /* @__PURE__ */ jsx(
            motion.div,
            {
              style: {
                width: "100%"
              },
              animate: isMouseOver ? {
                opacity: widthPercentage > 0 ? 1 : 0,
                clipPath: `inset(0 ${100 - widthPercentage}% 0 0)`
              } : {
                clipPath: `inset(0 ${100 - widthPercentage}% 0 0)`
              },
              transition: isMouseOver ? { duration: 0 } : { duration: 0.4 },
              className: "absolute bg-[#1d1c20] z-20  will-change-transform",
              children: /* @__PURE__ */ jsx(
                "p",
                {
                  style: {
                    textShadow: "4px 4px 15px rgba(0,0,0,0.5)"
                  },
                  className: "text-base sm:text-[3rem] py-10 font-bold text-white bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-300",
                  children: revealText
                }
              )
            }
          ),
          /* @__PURE__ */ jsx(
            motion.div,
            {
              animate: {
                left: `${widthPercentage}%`,
                rotate: `${rotateDeg}deg`,
                opacity: widthPercentage > 0 ? 1 : 0
              },
              transition: isMouseOver ? { duration: 0 } : { duration: 0.4 },
              className: "h-40 w-[8px] bg-gradient-to-b from-transparent via-neutral-800 to-transparent absolute z-50 will-change-transform"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: " overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,white,transparent)]", children: [
            /* @__PURE__ */ jsx("p", { className: "text-base sm:text-[3rem] py-10 font-bold bg-clip-text text-transparent bg-[#323238]", children: text }),
            /* @__PURE__ */ jsx(MemoizedStars, {})
          ] })
        ] })
      ]
    }
  );
};
var TextRevealCardTitle = ({
  children,
  className
}) => {
  return /* @__PURE__ */ jsx("h2", { className: twMerge2("text-white text-lg mb-2", className), children });
};
var TextRevealCardDescription = ({
  children,
  className
}) => {
  return /* @__PURE__ */ jsx("p", { className: twMerge2("text-[#a9a9a9] text-sm", className), children });
};
var Stars = () => {
  const randomMove = () => Math.random() * 4 - 2;
  const randomOpacity = () => Math.random();
  const random = () => Math.random();
  return /* @__PURE__ */ jsx("div", { className: "absolute inset-0", children: [...Array(80)].map((_, i) => /* @__PURE__ */ jsx(
    motion.span,
    {
      animate: {
        top: `calc(${random() * 100}% + ${randomMove()}px)`,
        left: `calc(${random() * 100}% + ${randomMove()}px)`,
        opacity: randomOpacity(),
        scale: [1, 1.2, 0]
      },
      transition: {
        duration: random() * 10 + 20,
        repeat: Infinity,
        ease: "linear"
      },
      style: {
        position: "absolute",
        top: `${random() * 100}%`,
        left: `${random() * 100}%`,
        width: `2px`,
        height: `2px`,
        backgroundColor: "white",
        borderRadius: "50%",
        zIndex: 1
      },
      className: "inline-block"
    },
    `star-${i}`
  )) });
};
var MemoizedStars = memo(Stars);

// entry.jsx
import React2 from "react";

// registry:components/text-reveal-card-demo.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function TextRevealCardPreview() {
  return /* @__PURE__ */ jsx2("div", { className: "flex items-center justify-center bg-[#0E0E10] h-[40rem] rounded-2xl w-full", children: /* @__PURE__ */ jsxs2(
    TextRevealCard,
    {
      text: "You know the business",
      revealText: "I know the chemistry ",
      children: [
        /* @__PURE__ */ jsx2(TextRevealCardTitle, { children: "Sometimes, you just need to see it." }),
        /* @__PURE__ */ jsx2(TextRevealCardDescription, { children: "This is a text reveal card. Hover over the card to reveal the hidden text." })
      ]
    }
  ) });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(TextRevealCardPreview, {}) }) });
}
export {
  MemoizedStars,
  TextRevealCard,
  TextRevealCardDescription,
  TextRevealCardTitle,
  Component as default
};

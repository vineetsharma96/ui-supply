// Adapted from https://ui.aceternity.com/components/tooltip-card
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:components/ui/tooltip-card.tsx
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/tooltip-card.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var Tooltip = ({
  content,
  children,
  containerClassName
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [height, setHeight] = useState(0);
  const [position, setPosition] = useState({
    x: 0,
    y: 0
  });
  const contentRef = useRef(null);
  const containerRef = useRef(null);
  useEffect(() => {
    if (isVisible && contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [isVisible, content]);
  const calculatePosition = (mouseX, mouseY) => {
    if (!contentRef.current || !containerRef.current)
      return { x: mouseX + 12, y: mouseY + 12 };
    const tooltip = contentRef.current;
    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const tooltipWidth = 240;
    const tooltipHeight = tooltip.scrollHeight;
    const absoluteX = containerRect.left + mouseX;
    const absoluteY = containerRect.top + mouseY;
    let finalX = mouseX + 12;
    let finalY = mouseY + 12;
    if (absoluteX + 12 + tooltipWidth > viewportWidth) {
      finalX = mouseX - tooltipWidth - 12;
    }
    if (absoluteX + finalX < 0) {
      finalX = -containerRect.left + 12;
    }
    if (absoluteY + 12 + tooltipHeight > viewportHeight) {
      finalY = mouseY - tooltipHeight - 12;
    }
    if (absoluteY + finalY < 0) {
      finalY = -containerRect.top + 12;
    }
    return { x: finalX, y: finalY };
  };
  const updateMousePosition = (mouseX, mouseY) => {
    setMouse({ x: mouseX, y: mouseY });
    const newPosition = calculatePosition(mouseX, mouseY);
    setPosition(newPosition);
  };
  const handleMouseEnter = (e) => {
    setIsVisible(true);
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    updateMousePosition(mouseX, mouseY);
  };
  const handleMouseLeave = () => {
    setMouse({ x: 0, y: 0 });
    setPosition({ x: 0, y: 0 });
    setIsVisible(false);
  };
  const handleMouseMove = (e) => {
    if (!isVisible) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    updateMousePosition(mouseX, mouseY);
  };
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = touch.clientX - rect.left;
    const mouseY = touch.clientY - rect.top;
    updateMousePosition(mouseX, mouseY);
    setIsVisible(true);
  };
  const handleTouchEnd = () => {
    setTimeout(() => {
      setIsVisible(false);
      setMouse({ x: 0, y: 0 });
      setPosition({ x: 0, y: 0 });
    }, 2e3);
  };
  const handleClick = (e) => {
    if (window.matchMedia("(hover: none)").matches) {
      e.preventDefault();
      if (isVisible) {
        setIsVisible(false);
        setMouse({ x: 0, y: 0 });
        setPosition({ x: 0, y: 0 });
      } else {
        const rect = e.currentTarget.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        updateMousePosition(mouseX, mouseY);
        setIsVisible(true);
      }
    }
  };
  useEffect(() => {
    if (isVisible && contentRef.current) {
      const newPosition = calculatePosition(mouse.x, mouse.y);
      setPosition(newPosition);
    }
  }, [isVisible, height, mouse.x, mouse.y]);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: containerRef,
      className: cn("relative inline-block", containerClassName),
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onMouseMove: handleMouseMove,
      onTouchStart: handleTouchStart,
      onTouchEnd: handleTouchEnd,
      onClick: handleClick,
      children: [
        children,
        /* @__PURE__ */ jsx(AnimatePresence, { children: isVisible && /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { height: 0, opacity: 1 },
            animate: { height, opacity: 1 },
            exit: { height: 0, opacity: 0 },
            transition: {
              type: "spring",
              stiffness: 200,
              damping: 20
            },
            className: "pointer-events-none absolute z-50 min-w-[15rem] overflow-hidden rounded-md border border-transparent bg-white shadow-sm ring-1 shadow-black/5 ring-black/5 dark:bg-neutral-900 dark:shadow-white/10 dark:ring-white/5",
            style: {
              top: position.y,
              left: position.x
            },
            children: /* @__PURE__ */ jsx(
              "div",
              {
                ref: contentRef,
                className: "p-2 text-sm text-neutral-600 md:p-4 dark:text-neutral-400",
                children: content
              }
            )
          },
          String(isVisible)
        ) })
      ]
    }
  );
};

// entry.jsx
import React2 from "react";

// registry:components/tooltip-card-demo.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function TooltipCardDemo() {
  return /* @__PURE__ */ jsxs2("div", { className: "mx-auto max-w-2xl p-4 md:p-10", children: [
    /* @__PURE__ */ jsxs2("p", { className: "text-sm text-neutral-600 dark:text-neutral-400", children: [
      "There was a problem with the server. Once",
      " ",
      /* @__PURE__ */ jsx2(
        Tooltip,
        {
          containerClassName: "text-neutral-600 dark:text-neutral-400",
          content: "AWS markets itself as the \u201Cworld's most comprehensive and broadly adopted cloud platform\u201D offering over 200 fully featured services globally.",
          children: /* @__PURE__ */ jsx2("span", { className: "font-bold", children: "AWS" })
        }
      ),
      " ",
      "went down, we had to quickly migrate to a new provider. AWS in general is a great service, but sometimes it's not available."
    ] }),
    /* @__PURE__ */ jsxs2("p", { className: "mt-10 text-sm text-neutral-600 dark:text-neutral-400", children: [
      "The server was administered by",
      " ",
      /* @__PURE__ */ jsxs2(
        Tooltip,
        {
          containerClassName: "text-neutral-600 dark:text-neutral-400",
          content: /* @__PURE__ */ jsx2(TooltipCard, {}),
          children: [
            " ",
            /* @__PURE__ */ jsx2("span", { className: "cursor-pointer font-bold", children: "Tyler Durden." })
          ]
        }
      ),
      " ",
      "Tyler has been with us for a long time. He is a great asset to the team and sometimes tries to act in different ways which can be difficult to manage.",
      " "
    ] }),
    /* @__PURE__ */ jsxs2("p", { className: "mt-10 text-sm text-neutral-600 dark:text-neutral-400", children: [
      "That is when we approached Tyler for a cute little",
      " ",
      /* @__PURE__ */ jsxs2(
        Tooltip,
        {
          containerClassName: "text-neutral-600 dark:text-neutral-400",
          content: /* @__PURE__ */ jsx2(TestimonialCard, {}),
          children: [
            " ",
            /* @__PURE__ */ jsx2("span", { className: "cursor-pointer font-bold", children: "testimonial." })
          ]
        }
      ),
      " ",
      "Instead of a testimonial, he started yapping about project mayhem and how we should be using our skills to build a better future."
    ] })
  ] });
}
var TooltipCard = () => {
  return /* @__PURE__ */ jsxs2("div", { children: [
    /* @__PURE__ */ jsx2(
      "img",
      {
        src: "https://assets.aceternity.com/screenshots/tyler.webp",
        alt: "Tyler Durden",
        className: "aspect-square w-full rounded-sm"
      }
    ),
    /* @__PURE__ */ jsxs2("div", { className: "my-4 flex flex-col", children: [
      /* @__PURE__ */ jsx2("p", { className: "text-lg font-bold", children: "Tyler Durden" }),
      /* @__PURE__ */ jsx2("p", { className: "mt-1 text-xs text-neutral-600 dark:text-neutral-400", children: "Soap Developer from a Tier 3 college. Enthusiastic and exhibits entrepreneurial spirit." })
    ] })
  ] });
};
var TestimonialCard = () => {
  return /* @__PURE__ */ jsxs2("div", { className: "", children: [
    /* @__PURE__ */ jsx2("blockquote", { className: "mb-4 text-neutral-700 dark:text-neutral-300", children: "This product is absolutely, grade A horse shit." }),
    /* @__PURE__ */ jsxs2("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx2(
        "img",
        {
          src: "https://assets.aceternity.com/screenshots/tyler.webp",
          alt: "Tyler Durden",
          className: "size-6 rounded-full object-cover"
        }
      ),
      /* @__PURE__ */ jsxs2("div", { children: [
        /* @__PURE__ */ jsx2("p", { className: "text-xs font-semibold text-neutral-900 dark:text-neutral-100", children: "Tyler Durden" }),
        /* @__PURE__ */ jsx2("p", { className: "text-[10px] text-neutral-600 dark:text-neutral-400", children: "Senior Product Manager at FC" })
      ] })
    ] })
  ] });
};

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(TooltipCardDemo, {}) }) });
}
export {
  Tooltip,
  Component as default
};

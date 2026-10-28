/*
MIT License

Copyright (c) 2025-2026 Ashutoshx7

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/
// Adapted from https://www.vengenceui.com/components/social-flip-button
// Copyright (c) 2025-2026 Ashutoshx7. See licenses/vengeance.txt for usage terms.
// registry:components/ui/social-flip-button.tsx
import { motion, AnimatePresence } from "motion/react";
import React, { useState } from "react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/social-flip-button.tsx
import {
  FaGithub,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
  FaDiscord
} from "react-icons/fa";
import { jsx, jsxs } from "react/jsx-runtime";
var defaultItems = [
  { letter: "C", icon: /* @__PURE__ */ jsx(FaGithub, {}), label: "Github", href: "#" },
  { letter: "O", icon: /* @__PURE__ */ jsx(FaTwitter, {}), label: "Twitter", href: "#" },
  { letter: "N", icon: /* @__PURE__ */ jsx(FaLinkedin, {}), label: "LinkedIn", href: "#" },
  { letter: "T", icon: /* @__PURE__ */ jsx(FaInstagram, {}), label: "Instagram", href: "#" },
  { letter: "A", icon: /* @__PURE__ */ jsx(FaFacebook, {}), label: "Facebook", href: "#" },
  { letter: "C", icon: /* @__PURE__ */ jsx(FaEnvelope, {}), label: "Email", href: "#" },
  { letter: "T", icon: /* @__PURE__ */ jsx(FaDiscord, {}), label: "Discord", href: "#" }
];
var SocialFlipNode = ({
  item,
  index,
  isHovered,
  setTooltipIndex,
  tooltipIndex,
  itemClassName,
  frontClassName,
  backClassName
}) => {
  const Wrapper = item.href ? "a" : "div";
  const wrapperProps = item.href ? { href: item.href, target: "_blank", rel: "noopener noreferrer" } : { onClick: item.onClick };
  return /* @__PURE__ */ jsxs(
    Wrapper,
    {
      ...wrapperProps,
      className: cn("relative h-10 w-10 cursor-pointer", itemClassName),
      style: { perspective: "1000px" },
      onMouseEnter: () => setTooltipIndex(index),
      onMouseLeave: () => setTooltipIndex(null),
      children: [
        /* @__PURE__ */ jsx(AnimatePresence, { children: isHovered && tooltipIndex === index && /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 10, scale: 0.8, x: "-50%" },
            animate: { opacity: 1, y: -50, scale: 1, x: "-50%" },
            exit: { opacity: 0, y: 10, scale: 0.8, x: "-50%" },
            transition: { duration: 0.2, ease: "easeOut" },
            className: "absolute left-1/2 z-50 whitespace-nowrap rounded-lg bg-neutral-900 px-3 py-1.5 text-xs font-semibold text-white shadow-xl dark:bg-white dark:text-neutral-900",
            children: [
              item.label,
              /* @__PURE__ */ jsx("div", { className: "absolute -bottom-1 left-1/2 -translate-x-1/2 h-2 w-2 rotate-45 bg-neutral-900 dark:bg-white" })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            className: "relative h-full w-full",
            initial: false,
            animate: { rotateY: isHovered ? 180 : 0 },
            transition: {
              duration: 0.8,
              type: "spring",
              stiffness: 120,
              damping: 15,
              delay: index * 0.08
            },
            style: { transformStyle: "preserve-3d" },
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: cn(
                    "absolute inset-0 flex items-center justify-center rounded-lg bg-neutral-100 text-lg font-bold text-neutral-800 shadow-sm dark:bg-neutral-900 dark:text-neutral-200",
                    frontClassName
                  ),
                  style: { backfaceVisibility: "hidden" },
                  children: item.letter
                }
              ),
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: cn(
                    "absolute inset-0 flex items-center justify-center rounded-lg bg-black text-lg text-white dark:bg-white dark:text-black",
                    backClassName
                  ),
                  style: {
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)"
                  },
                  children: item.icon
                }
              )
            ]
          }
        )
      ]
    }
  );
};
function SocialFlipButton({
  items = defaultItems,
  className,
  itemClassName,
  frontClassName,
  backClassName
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [tooltipIndex, setTooltipIndex] = useState(null);
  const [isDark, setIsDark] = useState(false);
  React.useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);
  return /* @__PURE__ */ jsx("div", { className: cn("flex items-center justify-center gap-4 p-4", className), children: /* @__PURE__ */ jsxs(
    "div",
    {
      className: "group relative flex items-center justify-center gap-2 rounded-2xl glass-border bg-white p-4 shadow-sm dark:bg-black",
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => {
        setIsHovered(false);
        setTooltipIndex(null);
      },
      children: [
        /* @__PURE__ */ jsxs("div", { className: "absolute -inset-[1px] overflow-hidden rounded-2xl pointer-events-none", children: [
          /* @__PURE__ */ jsx(
            motion.div,
            {
              className: "absolute top-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-black/50 to-transparent dark:via-white/50",
              animate: { x: ["-100%", "100%"] },
              transition: {
                duration: 2.5,
                repeat: Infinity,
                ease: "linear"
              }
            }
          ),
          /* @__PURE__ */ jsx(
            motion.div,
            {
              className: "absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-black/50 to-transparent dark:via-white/50",
              animate: { x: ["100%", "-100%"] },
              transition: {
                duration: 2.5,
                repeat: Infinity,
                ease: "linear"
              }
            }
          )
        ] }),
        items.map((item, index) => /* @__PURE__ */ jsx(
          SocialFlipNode,
          {
            item,
            index,
            isHovered,
            setTooltipIndex,
            tooltipIndex,
            itemClassName,
            frontClassName,
            backClassName
          },
          index
        ))
      ]
    }
  ) });
}

// entry.jsx
import React2 from "react";

// registry:components/docs/social-flip-button.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
function SocialFlipButtonDemo() {
  return /* @__PURE__ */ jsx2("div", { className: "relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg md:shadow-xl", children: /* @__PURE__ */ jsx2(SocialFlipButton, {}) });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(SocialFlipButtonDemo, {}) }) });
}
export {
  Component as default
};

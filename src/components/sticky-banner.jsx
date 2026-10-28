// Adapted from https://ui.aceternity.com/components/sticky-banner
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:components/ui/sticky-banner.tsx
import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/sticky-banner.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var StickyBanner = ({
  className,
  children,
  hideOnScroll = false
}) => {
  const [open, setOpen] = useState(true);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    console.log(latest);
    if (hideOnScroll && latest > 40) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  });
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      className: cn(
        "sticky inset-x-0 top-0 z-40 flex min-h-14 w-full items-center justify-center bg-transparent px-4 py-1",
        className
      ),
      initial: {
        y: -100,
        opacity: 0
      },
      animate: {
        y: open ? 0 : -100,
        opacity: open ? 1 : 0
      },
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      },
      children: [
        children,
        /* @__PURE__ */ jsx(
          motion.button,
          {
            initial: {
              scale: 0
            },
            animate: {
              scale: 1
            },
            className: "absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer",
            onClick: () => setOpen(!open),
            children: /* @__PURE__ */ jsx(CloseIcon, { className: "h-5 w-5 text-white" })
          }
        )
      ]
    }
  );
};
var CloseIcon = (props) => {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      ...props,
      children: [
        /* @__PURE__ */ jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
        /* @__PURE__ */ jsx("path", { d: "M18 6l-12 12" }),
        /* @__PURE__ */ jsx("path", { d: "M6 6l12 12" })
      ]
    }
  );
};

// entry.jsx
import React2 from "react";

// registry:components/sticky-banner-demo.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function StickyBannerDemo() {
  return /* @__PURE__ */ jsxs2("div", { className: "relative flex h-[60vh] w-full flex-col overflow-y-auto", children: [
    /* @__PURE__ */ jsx2(StickyBanner, { className: "bg-gradient-to-b from-blue-500 to-blue-600", children: /* @__PURE__ */ jsxs2("p", { className: "mx-0 max-w-[90%] text-white drop-shadow-md", children: [
      "Announcing $10M seed funding from project mayhem ventures.",
      " ",
      /* @__PURE__ */ jsx2("a", { href: "#", className: "transition duration-200 hover:underline", children: "Read announcement" })
    ] }) }),
    /* @__PURE__ */ jsx2(DummyContent, {})
  ] });
}
var DummyContent = () => {
  return /* @__PURE__ */ jsxs2("div", { className: "relative mx-auto flex w-full max-w-7xl flex-col gap-10 py-8", children: [
    /* @__PURE__ */ jsx2("div", { className: "h-96 w-full animate-pulse rounded-lg bg-neutral-100 dark:bg-neutral-800" }),
    /* @__PURE__ */ jsx2("div", { className: "h-96 w-full animate-pulse rounded-lg bg-neutral-100 dark:bg-neutral-800" }),
    /* @__PURE__ */ jsx2("div", { className: "h-96 w-full animate-pulse rounded-lg bg-neutral-100 dark:bg-neutral-800" })
  ] });
};

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(StickyBannerDemo, {}) }) });
}
export {
  StickyBanner,
  Component as default
};

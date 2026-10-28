// Adapted from https://skiper-ui.com/v1/skiper65
// Skiper UI / gxuri. Attribution required for free components. See licenses/skiper.txt for usage terms.
// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:skiper65.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var Skiper65 = () => {
  return /* @__PURE__ */ jsxs("div", { className: "flex h-full w-full flex-col items-center justify-center", children: [
    /* @__PURE__ */ jsx("div", { className: "mb-40 grid content-start justify-items-center gap-6 text-center", children: /* @__PURE__ */ jsx("span", { className: "after:to-foreground relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-transparent after:content-['']", children: "minimal Breakpoint indicator" }) }),
    /* @__PURE__ */ jsx(BreakpointIndicator, {})
  ] });
};
var BreakpointIndicator = ({ className }) => {
  if (false) return null;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "bottom-1 left-1 z-50 flex size-6 items-center justify-center rounded-full bg-black p-2 font-mono text-xs text-white",
        className
      ),
      children: [
        /* @__PURE__ */ jsx("div", { className: "block sm:hidden", children: "xs" }),
        /* @__PURE__ */ jsx("div", { className: "hidden sm:block md:hidden", children: "sm" }),
        /* @__PURE__ */ jsx("div", { className: "hidden md:block lg:hidden", children: "md" }),
        /* @__PURE__ */ jsx("div", { className: "hidden lg:block xl:hidden", children: "lg" }),
        /* @__PURE__ */ jsx("div", { className: "hidden xl:block 2xl:hidden", children: "xl" }),
        /* @__PURE__ */ jsx("div", { className: "hidden 2xl:block", children: "2xl" })
      ]
    }
  );
};

// entry.jsx
import React from "react";
import { jsx as jsx2 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx2("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx2("div", { className: "vendor-content", children: /* @__PURE__ */ jsx2(Skiper65, {}) }) });
}
export {
  BreakpointIndicator,
  Skiper65,
  Component as default
};

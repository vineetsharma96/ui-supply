// Adapted from https://skiper-ui.com/v1/skiper87
// Skiper UI / gxuri. Attribution required for free components. See licenses/skiper.txt for usage terms.
// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/scroll-area.tsx
import { ScrollArea as ScrollAreaPrimitive } from "radix-ui";
import { jsx, jsxs } from "react/jsx-runtime";
function ScrollArea({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    ScrollAreaPrimitive.Root,
    {
      "data-slot": "scroll-area",
      className: cn("relative", className),
      ...props,
      children: [
        /* @__PURE__ */ jsx(
          ScrollAreaPrimitive.Viewport,
          {
            "data-slot": "scroll-area-viewport",
            className: "size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1",
            children
          }
        ),
        /* @__PURE__ */ jsx(ScrollBar, {}),
        /* @__PURE__ */ jsx(ScrollAreaPrimitive.Corner, {})
      ]
    }
  );
}
function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    ScrollAreaPrimitive.ScrollAreaScrollbar,
    {
      "data-slot": "scroll-area-scrollbar",
      orientation,
      className: cn(
        "flex touch-none p-px transition-colors select-none",
        orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent",
        orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(
        ScrollAreaPrimitive.ScrollAreaThumb,
        {
          "data-slot": "scroll-area-thumb",
          className: "relative flex-1 rounded-full bg-border"
        }
      )
    }
  );
}

// registry:skiper87.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var Skiper87 = () => {
  return /* @__PURE__ */ jsxs2("div", { className: "bg-muted flex h-full w-full flex-col items-center justify-center gap-10", children: [
    /* @__PURE__ */ jsx2("div", { className: "-mt-10 mb-20 grid content-start justify-items-center gap-6 text-center", children: /* @__PURE__ */ jsx2("span", { className: "after:to-foreground relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-transparent after:content-['']", children: "see the fade while scroll" }) }),
    /* @__PURE__ */ jsx2("div", { className: "rounded-xl border", children: /* @__PURE__ */ jsx2(ScrollArea, { className: "w-62 h-72 rounded-xl", children: /* @__PURE__ */ jsx2("div", { className: "space-y-1 p-1", children: Array.from({ length: 11 }).map((_, index) => /* @__PURE__ */ jsxs2(
      "div",
      {
        className: "text-foreground/30 hover:bg-foreground/10 bg-foreground/5 flex h-10 w-full items-center gap-2 rounded-lg px-4",
        children: [
          "00",
          index,
          " ",
          /* @__PURE__ */ jsx2("div", { className: "bg-foreground/10 h-px flex-1" })
        ]
      },
      index
    )) }) }) })
  ] });
};

// entry.jsx
import React from "react";
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(Skiper87, {}) }) });
}
export {
  Skiper87,
  Component as default
};

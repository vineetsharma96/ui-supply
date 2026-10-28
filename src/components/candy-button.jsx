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
// Adapted from https://www.vengenceui.com/components/candy-button
// Copyright (c) 2025-2026 Ashutoshx7. See licenses/vengeance.txt for usage terms.
// registry:components/ui/candy-button.tsx
import { Slot } from "@radix-ui/react-slot";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/candy-button.tsx
import { jsx } from "react/jsx-runtime";
function CandyButton({ asChild = false, tone = "blue", className, children = "Candy Button", ...props }) {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      className: cn(
        "relative inline-flex items-center justify-center gap-2 font-semibold text-base leading-[22px] tracking-[0.02em]",
        "px-9 py-3 rounded-xl cursor-pointer transition-all duration-200 ease-out",
        "border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-foreground",
        "active:scale-95 active:rotate-1",
        "after:absolute after:top-[1px] after:right-[10%] after:w-[60%] after:h-[1px]",
        "after:bg-gradient-to-r after:from-transparent after:via-white/50 after:to-transparent",
        "hover:brightness-110",
        tone === "blue" ? "border-[#54A1FD] bg-[radial-gradient(95%_60%_at_50%_75%,#005FD6_0%,#209BFF_100%)] text-white shadow-[0px_4px_48px_-12px_#1187FF,inset_0px_1px_8px_-4px_#FFFFFF]" : "border-zinc-300 bg-[radial-gradient(95%_85%_at_50%_75%,#e4e4e7_0%,#ffffff_100%)] text-zinc-950 shadow-[0_5px_22px_-12px_rgba(0,0,0,0.35),inset_0_1px_5px_-3px_#fff] dark:border-zinc-600 dark:bg-[radial-gradient(95%_85%_at_50%_75%,#18181b_0%,#3f3f46_100%)] dark:text-white dark:shadow-[0_5px_28px_-12px_rgba(255,255,255,0.24),inset_0_1px_6px_-3px_#fff]",
        className
      ),
      ...props,
      children
    }
  );
}

// entry.jsx
import React from "react";

// registry:components/docs/candy-button-demo.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
function CandyButtonDemo() {
  return /* @__PURE__ */ jsx2("div", { className: "flex w-full h-[400px] flex-col items-center justify-center", children: /* @__PURE__ */ jsx2(CandyButton, { children: "Candy Button" }) });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(CandyButtonDemo, {}) }) });
}
export {
  CandyButton,
  Component as default
};

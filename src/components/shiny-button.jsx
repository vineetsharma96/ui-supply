/*
MIT License

Copyright (c) Magic UI

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
// Adapted from https://magicui.design/docs/components/shiny-button
// Copyright (c) Magic UI. See licenses/magic.txt for usage terms.
// registry:components/ui/shiny-button.tsx
import React from "react";
import { motion } from "motion/react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/shiny-button.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var animationProps = {
  initial: { "--x": "100%", scale: 0.8 },
  animate: { "--x": "-100%", scale: 1 },
  whileTap: { scale: 0.95 },
  transition: {
    repeat: Infinity,
    repeatType: "loop",
    repeatDelay: 1,
    type: "spring",
    stiffness: 20,
    damping: 15,
    mass: 2,
    scale: {
      type: "spring",
      stiffness: 200,
      damping: 5,
      mass: 0.5
    }
  }
};
var ShinyButton = React.forwardRef(({ children, className, ...props }, ref) => {
  return /* @__PURE__ */ jsxs(
    motion.button,
    {
      ref,
      className: cn(
        "relative cursor-pointer rounded-lg border px-6 py-2 font-medium backdrop-blur-xl transition-shadow duration-300 ease-in-out hover:shadow dark:bg-[radial-gradient(circle_at_50%_0%,var(--primary)/10%_0%,transparent_60%)] dark:hover:shadow-[0_0_20px_var(--primary)/10%]",
        className
      ),
      ...animationProps,
      ...props,
      children: [
        /* @__PURE__ */ jsx(
          "span",
          {
            className: "relative block size-full text-sm tracking-wide text-[rgb(0,0,0,65%)] uppercase dark:font-light dark:text-[rgb(255,255,255,90%)]",
            style: {
              maskImage: "linear-gradient(-75deg,var(--primary) calc(var(--x) + 20%),transparent calc(var(--x) + 30%),var(--primary) calc(var(--x) + 100%))"
            },
            children
          }
        ),
        /* @__PURE__ */ jsx(
          "span",
          {
            style: {
              mask: "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box exclude,linear-gradient(rgb(0,0,0), rgb(0,0,0))",
              WebkitMask: "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box exclude,linear-gradient(rgb(0,0,0), rgb(0,0,0))",
              backgroundImage: "linear-gradient(-75deg,var(--primary)/10% calc(var(--x)+20%),var(--primary)/50% calc(var(--x)+25%),var(--primary)/10% calc(var(--x)+100%))"
            },
            className: "absolute inset-0 z-10 block rounded-[inherit] p-px"
          }
        )
      ]
    }
  );
});
ShinyButton.displayName = "ShinyButton";

// entry.jsx
import React3 from "react";

// registry:shiny-button.tsx
import React2 from "react";
import { motion as motion2 } from "motion/react";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var animationProps2 = {
  initial: { "--x": "100%", scale: 0.8 },
  animate: { "--x": "-100%", scale: 1 },
  whileTap: { scale: 0.95 },
  transition: {
    repeat: Infinity,
    repeatType: "loop",
    repeatDelay: 1,
    type: "spring",
    stiffness: 20,
    damping: 15,
    mass: 2,
    scale: {
      type: "spring",
      stiffness: 200,
      damping: 5,
      mass: 0.5
    }
  }
};
var ShinyButton2 = React2.forwardRef(({ children, className, ...props }, ref) => {
  return /* @__PURE__ */ jsxs2(
    motion2.button,
    {
      ref,
      className: cn(
        "relative cursor-pointer rounded-lg border px-6 py-2 font-medium backdrop-blur-xl transition-shadow duration-300 ease-in-out hover:shadow dark:bg-[radial-gradient(circle_at_50%_0%,var(--primary)/10%_0%,transparent_60%)] dark:hover:shadow-[0_0_20px_var(--primary)/10%]",
        className
      ),
      ...animationProps2,
      ...props,
      children: [
        /* @__PURE__ */ jsx2(
          "span",
          {
            className: "relative block size-full text-sm tracking-wide text-[rgb(0,0,0,65%)] uppercase dark:font-light dark:text-[rgb(255,255,255,90%)]",
            style: {
              maskImage: "linear-gradient(-75deg,var(--primary) calc(var(--x) + 20%),transparent calc(var(--x) + 30%),var(--primary) calc(var(--x) + 100%))"
            },
            children
          }
        ),
        /* @__PURE__ */ jsx2(
          "span",
          {
            style: {
              mask: "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box exclude,linear-gradient(rgb(0,0,0), rgb(0,0,0))",
              WebkitMask: "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box exclude,linear-gradient(rgb(0,0,0), rgb(0,0,0))",
              backgroundImage: "linear-gradient(-75deg,var(--primary)/10% calc(var(--x)+20%),var(--primary)/50% calc(var(--x)+25%),var(--primary)/10% calc(var(--x)+100%))"
            },
            className: "absolute inset-0 z-10 block rounded-[inherit] p-px"
          }
        )
      ]
    }
  );
});
ShinyButton2.displayName = "ShinyButton";

// registry:components/ui/shiny-button-demo.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
function ShinyButtonDemo() {
  return /* @__PURE__ */ jsx3(ShinyButton2, { children: "Shiny Button" });
}

// entry.jsx
import { jsx as jsx4 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx4("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx4("div", { className: "vendor-content", children: /* @__PURE__ */ jsx4(ShinyButtonDemo, {}) }) });
}
export {
  ShinyButton,
  Component as default
};

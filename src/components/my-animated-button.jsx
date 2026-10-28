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
// Adapted from https://www.vengenceui.com/components/my-animated-button
// Copyright (c) 2025-2026 Ashutoshx7. See licenses/vengeance.txt for usage terms.
// registry:components/ui/animated-button.tsx
import { motion } from "motion/react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/animated-button.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var AnimatedButton = ({
  children = "Browse Components",
  className = "",
  as = "button",
  ...rest
}) => {
  const Component2 = motion[as] || motion.button;
  return /* @__PURE__ */ jsxs(
    Component2,
    {
      ...rest,
      whileHover: { scale: 1.01 },
      whileTap: { scale: 0.97 },
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30,
        mass: 0.5
      },
      className: cn(
        "group inline-flex items-center justify-center px-6 py-2 rounded-md relative overflow-hidden bg-background border border-border",
        "text-foreground font-medium transition-colors duration-[var(--vng-transition-speed,150ms)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        "[--shine:rgba(0,0,0,.66)] dark:[--shine:rgba(255,255,255,.66)]",
        className
      ),
      children: [
        /* @__PURE__ */ jsx(
          motion.span,
          {
            className: "tracking-wide font-light flex items-center justify-center h-full w-full relative z-10",
            style: {
              WebkitMaskImage: "linear-gradient(-75deg, white calc(var(--mask-x) + 20%), transparent calc(var(--mask-x) + 30%), white calc(var(--mask-x) + 100%))",
              maskImage: "linear-gradient(-75deg, white calc(var(--mask-x) + 20%), transparent calc(var(--mask-x) + 30%), white calc(var(--mask-x) + 100%))"
            },
            initial: { ["--mask-x"]: "100%" },
            animate: { ["--mask-x"]: "-100%" },
            transition: {
              repeat: Infinity,
              duration: 1,
              ease: "linear",
              repeatDelay: 1
            },
            children
          }
        ),
        /* @__PURE__ */ jsx(
          motion.span,
          {
            className: "block absolute inset-0 rounded-md p-px",
            style: {
              background: "linear-gradient(-75deg, transparent 30%, var(--shine) 50%, transparent 70%)",
              backgroundSize: "200% 100%",
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "exclude",
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor"
            },
            initial: { backgroundPosition: "100% 0", opacity: 0 },
            animate: { backgroundPosition: ["100% 0", "0% 0"], opacity: [0, 1, 0] },
            transition: {
              duration: 1,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 1
            }
          }
        )
      ]
    }
  );
};
var animated_button_default = AnimatedButton;

// entry.jsx
import React from "react";

// registry:registry/my-animated-button.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
function MyAnimatedButtonDemo() {
  return /* @__PURE__ */ jsx2(animated_button_default, { children: "Initialize Vengeance" });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(MyAnimatedButtonDemo, {}) }) });
}
export {
  Component as default
};

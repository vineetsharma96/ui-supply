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
// Adapted from https://www.vengenceui.com/components/animated-rays
// Copyright (c) 2025-2026 Ashutoshx7. See licenses/vengeance.txt for usage terms.
// registry:components/ui/animated-rays.tsx
import { useEffect, useState } from "react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/animated-rays.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function AnimatedRays({
  className = "",
  children
}) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    const checkDark = () => document.documentElement.classList.contains("dark");
    setIsDark(checkDark());
    const observer = new MutationObserver(() => setIsDark(checkDark()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"]
    });
    return () => observer.disconnect();
  }, []);
  if (!mounted) return null;
  const stripes = `repeating-linear-gradient(
        100deg,
        var(--stripe-color) 0%,
        var(--stripe-color) 7%,
        transparent 10%,
        transparent 12%,
        var(--stripe-color) 16%
    )`;
  const rainbow = `repeating-linear-gradient(
        100deg,
        #60a5fa 10%,
        #e879f9 15%,
        #60a5fa 20%,
        #5eead4 25%,
        #60a5fa 30%
    )`;
  return /* @__PURE__ */ jsxs("section", { className: cn("relative w-full h-full overflow-hidden", className), style: { "--stripe-color": isDark ? "#000000" : "#ffffff" }, children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute inset-0",
        style: {
          backgroundImage: `${stripes}, ${rainbow}`,
          backgroundSize: "300%, 200%",
          backgroundPosition: "50% 50%, 50% 50%",
          filter: isDark ? "blur(10px) opacity(50%) saturate(200%)" : "blur(10px) invert(100%)",
          maskImage: "radial-gradient(ellipse at 100% 0%, black 40%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at 100% 0%, black 40%, transparent 70%)"
        },
        children: /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute inset-0 animate-aurora-bg",
            style: {
              backgroundImage: `${stripes}, ${rainbow}`,
              backgroundSize: "200%, 100%",
              backgroundAttachment: "fixed",
              mixBlendMode: "difference"
            }
          }
        )
      }
    ),
    children && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-10 flex flex-col items-center justify-center", children })
  ] });
}

// entry.jsx
import React from "react";

// registry:components/docs/animated-rays.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
function AnimatedRaysDemo() {
  return /* @__PURE__ */ jsx2("div", { className: "relative h-full w-full overflow-hidden", children: /* @__PURE__ */ jsx2(AnimatedRays, { className: "h-full" }) });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(AnimatedRaysDemo, {}) }) });
}
export {
  AnimatedRays,
  Component as default
};

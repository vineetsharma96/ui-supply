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
// Adapted from https://magicui.design/docs/components/line-shadow-text
// Copyright (c) Magic UI. See licenses/magic.txt for usage terms.
// registry:components/ui/line-shadow-text.tsx
import {
  motion
} from "motion/react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/line-shadow-text.tsx
import { jsx } from "react/jsx-runtime";
var motionElements = {
  article: motion.article,
  div: motion.div,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  h5: motion.h5,
  h6: motion.h6,
  li: motion.li,
  p: motion.p,
  section: motion.section,
  span: motion.span
};
function LineShadowText({
  children,
  shadowColor = "black",
  className,
  as: Component2 = "span",
  ...props
}) {
  const MotionComponent = motionElements[Component2];
  return /* @__PURE__ */ jsx(
    MotionComponent,
    {
      style: { "--shadow-color": shadowColor },
      className: cn(
        "relative z-0 inline-flex",
        "after:absolute after:top-[0.04em] after:left-[0.04em] after:content-[attr(data-text)]",
        "after:bg-[linear-gradient(45deg,transparent_45%,var(--shadow-color)_45%,var(--shadow-color)_55%,transparent_0)]",
        "after:-z-10 after:bg-size-[0.06em_0.06em] after:bg-clip-text after:text-transparent",
        "after:animate-line-shadow",
        className
      ),
      "data-text": children,
      ...props,
      children
    }
  );
}

// entry.jsx
import React from "react";

// registry:next-themes
import { useState, useEffect } from "react";
function useTheme() {
  const [theme, set] = useState(document.documentElement.dataset.theme || "dark");
  useEffect(() => {
    const o = new MutationObserver(() => set(document.documentElement.dataset.theme || "dark"));
    o.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => o.disconnect();
  }, []);
  return { theme, resolvedTheme: theme, setTheme: (t) => {
    document.documentElement.dataset.theme = t;
    localStorage.setItem("ui-supply-theme", t);
  } };
}

// registry:line-shadow-text.tsx
import {
  motion as motion2
} from "motion/react";
import { jsx as jsx2 } from "react/jsx-runtime";
var motionElements2 = {
  article: motion2.article,
  div: motion2.div,
  h1: motion2.h1,
  h2: motion2.h2,
  h3: motion2.h3,
  h4: motion2.h4,
  h5: motion2.h5,
  h6: motion2.h6,
  li: motion2.li,
  p: motion2.p,
  section: motion2.section,
  span: motion2.span
};
function LineShadowText2({
  children,
  shadowColor = "black",
  className,
  as: Component2 = "span",
  ...props
}) {
  const MotionComponent = motionElements2[Component2];
  return /* @__PURE__ */ jsx2(
    MotionComponent,
    {
      style: { "--shadow-color": shadowColor },
      className: cn(
        "relative z-0 inline-flex",
        "after:absolute after:top-[0.04em] after:left-[0.04em] after:content-[attr(data-text)]",
        "after:bg-[linear-gradient(45deg,transparent_45%,var(--shadow-color)_45%,var(--shadow-color)_55%,transparent_0)]",
        "after:-z-10 after:bg-size-[0.06em_0.06em] after:bg-clip-text after:text-transparent",
        "after:animate-line-shadow",
        className
      ),
      "data-text": children,
      ...props,
      children
    }
  );
}

// registry:components/ui/line-shadow-text-demo.tsx
import { jsx as jsx3, jsxs } from "react/jsx-runtime";
function LineShadowTextDemo() {
  const theme = useTheme();
  const shadowColor = theme.resolvedTheme === "dark" ? "white" : "black";
  return /* @__PURE__ */ jsxs("h1", { className: "text-5xl leading-none font-semibold tracking-tighter text-balance sm:text-6xl md:text-7xl lg:text-8xl", children: [
    "Ship",
    /* @__PURE__ */ jsx3(LineShadowText2, { className: "italic", shadowColor, children: "Fast" })
  ] });
}

// entry.jsx
import { jsx as jsx4 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx4("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx4("div", { className: "vendor-content", children: /* @__PURE__ */ jsx4(LineShadowTextDemo, {}) }) });
}
export {
  LineShadowText,
  Component as default
};

// Adapted from https://ui.aceternity.com/components/grid-and-dot-backgrounds
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:components/ui/grid.tsx
import { jsx, jsxs } from "react/jsx-runtime";

// entry.jsx
import React from "react";

// registry:components/grid-demo.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function GridBackgroundPreview() {
  return /* @__PURE__ */ jsxs2("div", { className: "h-[50rem] w-full bg-black bg-grid-white/[0.1] relative flex items-center justify-center", children: [
    /* @__PURE__ */ jsx2("div", { className: "absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" }),
    /* @__PURE__ */ jsx2("p", { className: "text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8", children: "Backgrounds" })
  ] });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(GridBackgroundPreview, {}) }) });
}
export {
  Component as default
};

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
// Adapted from https://magicui.design/docs/components/noise-texture
// Copyright (c) Magic UI. See licenses/magic.txt for usage terms.
// registry:components/ui/noise-texture.tsx
import { useId } from "react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/noise-texture.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var NoiseTexture = ({
  className,
  frequency = 0.4,
  octaves = 6,
  slope = 0.15,
  noiseOpacity = 0.6,
  ...props
}) => {
  const filterId = useId();
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      className: cn(
        "pointer-events-none absolute inset-0 z-0 size-full opacity-50 select-none dark:opacity-[0.75]",
        className
      ),
      xmlns: "http://www.w3.org/2000/svg",
      ...props,
      children: [
        /* @__PURE__ */ jsxs("filter", { id: filterId, children: [
          /* @__PURE__ */ jsx(
            "feTurbulence",
            {
              type: "fractalNoise",
              baseFrequency: frequency,
              numOctaves: octaves,
              stitchTiles: "stitch"
            }
          ),
          /* @__PURE__ */ jsx("feColorMatrix", { type: "saturate", values: "0" }),
          /* @__PURE__ */ jsxs("feComponentTransfer", { children: [
            /* @__PURE__ */ jsx("feFuncR", { type: "linear", slope }),
            /* @__PURE__ */ jsx("feFuncG", { type: "linear", slope }),
            /* @__PURE__ */ jsx("feFuncB", { type: "linear", slope })
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          "rect",
          {
            width: "100%",
            height: "100%",
            filter: `url(#${filterId})`,
            opacity: noiseOpacity
          }
        )
      ]
    }
  );
};

// entry.jsx
import React from "react";

// registry:noise-texture.tsx
import { useId as useId2 } from "react";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var NoiseTexture2 = ({
  className,
  frequency = 0.4,
  octaves = 6,
  slope = 0.15,
  noiseOpacity = 0.6,
  ...props
}) => {
  const filterId = useId2();
  return /* @__PURE__ */ jsxs2(
    "svg",
    {
      className: cn(
        "pointer-events-none absolute inset-0 z-0 size-full opacity-50 select-none dark:opacity-[0.75]",
        className
      ),
      xmlns: "http://www.w3.org/2000/svg",
      ...props,
      children: [
        /* @__PURE__ */ jsxs2("filter", { id: filterId, children: [
          /* @__PURE__ */ jsx2(
            "feTurbulence",
            {
              type: "fractalNoise",
              baseFrequency: frequency,
              numOctaves: octaves,
              stitchTiles: "stitch"
            }
          ),
          /* @__PURE__ */ jsx2("feColorMatrix", { type: "saturate", values: "0" }),
          /* @__PURE__ */ jsxs2("feComponentTransfer", { children: [
            /* @__PURE__ */ jsx2("feFuncR", { type: "linear", slope }),
            /* @__PURE__ */ jsx2("feFuncG", { type: "linear", slope }),
            /* @__PURE__ */ jsx2("feFuncB", { type: "linear", slope })
          ] })
        ] }),
        /* @__PURE__ */ jsx2(
          "rect",
          {
            width: "100%",
            height: "100%",
            filter: `url(#${filterId})`,
            opacity: noiseOpacity
          }
        )
      ]
    }
  );
};

// registry:components/ui/noise-texture-demo.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
function NoiseTextureDemo() {
  return /* @__PURE__ */ jsx3("div", { className: "relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-neutral-100/80 dark:bg-neutral-950", children: /* @__PURE__ */ jsx3(
    NoiseTexture2,
    {
      className: cn(
        "absolute inset-0",
        "mask-[radial-gradient(420px_circle_at_center,white,transparent)]"
      )
    }
  ) });
}

// entry.jsx
import { jsx as jsx4 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx4("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx4("div", { className: "vendor-content", children: /* @__PURE__ */ jsx4(NoiseTextureDemo, {}) }) });
}
export {
  NoiseTexture,
  Component as default
};

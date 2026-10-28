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
// Adapted from https://magicui.design/docs/components/android
// Copyright (c) Magic UI. See licenses/magic.txt for usage terms.
// registry:components/ui/android.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function Android({
  width = 433,
  height = 882,
  src,
  videoSrc,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      width,
      height,
      viewBox: `0 0 ${width} ${height}`,
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...props,
      children: [
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M376 153H378C379.105 153 380 153.895 380 155V249C380 250.105 379.105 251 378 251H376V153Z",
            className: "fill-[#E5E5E5] dark:fill-[#404040]"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M376 301H378C379.105 301 380 301.895 380 303V351C380 352.105 379.105 353 378 353H376V301Z",
            className: "fill-[#E5E5E5] dark:fill-[#404040]"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M0 42C0 18.8041 18.804 0 42 0H336C359.196 0 378 18.804 378 42V788C378 811.196 359.196 830 336 830H42C18.804 830 0 811.196 0 788V42Z",
            className: "fill-[#E5E5E5] dark:fill-[#404040]"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M2 43C2 22.0132 19.0132 5 40 5H338C358.987 5 376 22.0132 376 43V787C376 807.987 358.987 825 338 825H40C19.0132 825 2 807.987 2 787V43Z",
            className: "fill-white dark:fill-[#262626]"
          }
        ),
        /* @__PURE__ */ jsx("g", { clipPath: "url(#clip0_514_20855)", children: /* @__PURE__ */ jsx(
          "path",
          {
            d: "M9.25 48C9.25 29.3604 24.3604 14.25 43 14.25H335C353.64 14.25 368.75 29.3604 368.75 48V780C368.75 798.64 353.64 813.75 335 813.75H43C24.3604 813.75 9.25 798.64 9.25 780V48Z",
            className: "fill-[#E5E5E5] stroke-[#E5E5E5] stroke-[0.5] dark:fill-[#404040] dark:stroke-[#404040]"
          }
        ) }),
        /* @__PURE__ */ jsx(
          "circle",
          {
            cx: "189",
            cy: "28",
            r: "9",
            className: "fill-white dark:fill-[#262626]"
          }
        ),
        /* @__PURE__ */ jsx(
          "circle",
          {
            cx: "189",
            cy: "28",
            r: "4",
            className: "fill-[#E5E5E5] dark:fill-[#404040]"
          }
        ),
        src && /* @__PURE__ */ jsx(
          "image",
          {
            href: src,
            width: "360",
            height: "800",
            className: "size-full object-cover",
            preserveAspectRatio: "xMidYMid slice",
            clipPath: "url(#clip0_514_20855)"
          }
        ),
        videoSrc && /* @__PURE__ */ jsx(
          "foreignObject",
          {
            width: "380",
            height: "820",
            clipPath: "url(#clip0_514_20855)",
            preserveAspectRatio: "xMidYMid slice",
            children: /* @__PURE__ */ jsx(
              "video",
              {
                className: "size-full object-cover",
                src: videoSrc,
                autoPlay: true,
                loop: true,
                muted: true,
                playsInline: true
              }
            )
          }
        ),
        /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsx("clipPath", { id: "clip0_514_20855", children: /* @__PURE__ */ jsx(
          "rect",
          {
            width: "360",
            height: "800",
            rx: "33",
            ry: "25",
            className: "fill-white dark:fill-[#262626]",
            transform: "translate(9 14)"
          }
        ) }) })
      ]
    }
  );
}

// entry.jsx
import React from "react";

// registry:android.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function Android2({
  width = 433,
  height = 882,
  src,
  videoSrc,
  ...props
}) {
  return /* @__PURE__ */ jsxs2(
    "svg",
    {
      width,
      height,
      viewBox: `0 0 ${width} ${height}`,
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...props,
      children: [
        /* @__PURE__ */ jsx2(
          "path",
          {
            d: "M376 153H378C379.105 153 380 153.895 380 155V249C380 250.105 379.105 251 378 251H376V153Z",
            className: "fill-[#E5E5E5] dark:fill-[#404040]"
          }
        ),
        /* @__PURE__ */ jsx2(
          "path",
          {
            d: "M376 301H378C379.105 301 380 301.895 380 303V351C380 352.105 379.105 353 378 353H376V301Z",
            className: "fill-[#E5E5E5] dark:fill-[#404040]"
          }
        ),
        /* @__PURE__ */ jsx2(
          "path",
          {
            d: "M0 42C0 18.8041 18.804 0 42 0H336C359.196 0 378 18.804 378 42V788C378 811.196 359.196 830 336 830H42C18.804 830 0 811.196 0 788V42Z",
            className: "fill-[#E5E5E5] dark:fill-[#404040]"
          }
        ),
        /* @__PURE__ */ jsx2(
          "path",
          {
            d: "M2 43C2 22.0132 19.0132 5 40 5H338C358.987 5 376 22.0132 376 43V787C376 807.987 358.987 825 338 825H40C19.0132 825 2 807.987 2 787V43Z",
            className: "fill-white dark:fill-[#262626]"
          }
        ),
        /* @__PURE__ */ jsx2("g", { clipPath: "url(#clip0_514_20855)", children: /* @__PURE__ */ jsx2(
          "path",
          {
            d: "M9.25 48C9.25 29.3604 24.3604 14.25 43 14.25H335C353.64 14.25 368.75 29.3604 368.75 48V780C368.75 798.64 353.64 813.75 335 813.75H43C24.3604 813.75 9.25 798.64 9.25 780V48Z",
            className: "fill-[#E5E5E5] stroke-[#E5E5E5] stroke-[0.5] dark:fill-[#404040] dark:stroke-[#404040]"
          }
        ) }),
        /* @__PURE__ */ jsx2(
          "circle",
          {
            cx: "189",
            cy: "28",
            r: "9",
            className: "fill-white dark:fill-[#262626]"
          }
        ),
        /* @__PURE__ */ jsx2(
          "circle",
          {
            cx: "189",
            cy: "28",
            r: "4",
            className: "fill-[#E5E5E5] dark:fill-[#404040]"
          }
        ),
        src && /* @__PURE__ */ jsx2(
          "image",
          {
            href: src,
            width: "360",
            height: "800",
            className: "size-full object-cover",
            preserveAspectRatio: "xMidYMid slice",
            clipPath: "url(#clip0_514_20855)"
          }
        ),
        videoSrc && /* @__PURE__ */ jsx2(
          "foreignObject",
          {
            width: "380",
            height: "820",
            clipPath: "url(#clip0_514_20855)",
            preserveAspectRatio: "xMidYMid slice",
            children: /* @__PURE__ */ jsx2(
              "video",
              {
                className: "size-full object-cover",
                src: videoSrc,
                autoPlay: true,
                loop: true,
                muted: true,
                playsInline: true
              }
            )
          }
        ),
        /* @__PURE__ */ jsx2("defs", { children: /* @__PURE__ */ jsx2("clipPath", { id: "clip0_514_20855", children: /* @__PURE__ */ jsx2(
          "rect",
          {
            width: "360",
            height: "800",
            rx: "33",
            ry: "25",
            className: "fill-white dark:fill-[#262626]",
            transform: "translate(9 14)"
          }
        ) }) })
      ]
    }
  );
}

// registry:components/ui/android-demo.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
function AndroidDemo() {
  return /* @__PURE__ */ jsx3("div", { className: "relative", children: /* @__PURE__ */ jsx3(Android2, { className: "size-full" }) });
}

// entry.jsx
import { jsx as jsx4 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx4("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx4("div", { className: "vendor-content", children: /* @__PURE__ */ jsx4(AndroidDemo, {}) }) });
}
export {
  Android,
  Component as default
};

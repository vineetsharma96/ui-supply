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
// Adapted from https://magicui.design/docs/components/iphone
// Copyright (c) Magic UI. See licenses/magic.txt for usage terms.
// registry:components/ui/iphone.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var PHONE_WIDTH = 433;
var PHONE_HEIGHT = 882;
var SCREEN_X = 21.25;
var SCREEN_Y = 19.25;
var SCREEN_WIDTH = 389.5;
var SCREEN_HEIGHT = 843.5;
var SCREEN_RADIUS = 55.75;
var LEFT_PCT = SCREEN_X / PHONE_WIDTH * 100;
var TOP_PCT = SCREEN_Y / PHONE_HEIGHT * 100;
var WIDTH_PCT = SCREEN_WIDTH / PHONE_WIDTH * 100;
var HEIGHT_PCT = SCREEN_HEIGHT / PHONE_HEIGHT * 100;
var RADIUS_H = SCREEN_RADIUS / SCREEN_WIDTH * 100;
var RADIUS_V = SCREEN_RADIUS / SCREEN_HEIGHT * 100;
function Iphone({
  src,
  videoSrc,
  className,
  style,
  ...props
}) {
  const hasVideo = !!videoSrc;
  const hasMedia = hasVideo || !!src;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `relative inline-block w-full align-middle leading-none ${className}`,
      style: {
        aspectRatio: `${PHONE_WIDTH}/${PHONE_HEIGHT}`,
        ...style
      },
      ...props,
      children: [
        hasVideo && /* @__PURE__ */ jsx(
          "div",
          {
            className: "pointer-events-none absolute z-0 overflow-hidden",
            style: {
              left: `${LEFT_PCT}%`,
              top: `${TOP_PCT}%`,
              width: `${WIDTH_PCT}%`,
              height: `${HEIGHT_PCT}%`,
              borderRadius: `${RADIUS_H}% / ${RADIUS_V}%`
            },
            children: /* @__PURE__ */ jsx(
              "video",
              {
                className: "block size-full object-cover",
                src: videoSrc,
                autoPlay: true,
                loop: true,
                muted: true,
                playsInline: true,
                preload: "metadata"
              }
            )
          }
        ),
        !hasVideo && src && /* @__PURE__ */ jsx(
          "div",
          {
            className: "pointer-events-none absolute z-0 overflow-hidden",
            style: {
              left: `${LEFT_PCT}%`,
              top: `${TOP_PCT}%`,
              width: `${WIDTH_PCT}%`,
              height: `${HEIGHT_PCT}%`,
              borderRadius: `${RADIUS_H}% / ${RADIUS_V}%`
            },
            children: /* @__PURE__ */ jsx(
              "img",
              {
                src,
                alt: "",
                className: "block size-full object-cover object-top"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxs(
          "svg",
          {
            viewBox: `0 0 ${PHONE_WIDTH} ${PHONE_HEIGHT}`,
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            className: "absolute inset-0 size-full",
            style: { transform: "translateZ(0)" },
            children: [
              /* @__PURE__ */ jsxs("g", { mask: hasMedia ? "url(#screenPunch)" : void 0, children: [
                /* @__PURE__ */ jsx(
                  "path",
                  {
                    d: "M2 73C2 32.6832 34.6832 0 75 0H357C397.317 0 430 32.6832 430 73V809C430 849.317 397.317 882 357 882H75C34.6832 882 2 849.317 2 809V73Z",
                    className: "fill-[#E5E5E5] dark:fill-[#404040]"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "path",
                  {
                    d: "M0 171C0 170.448 0.447715 170 1 170H3V204H1C0.447715 204 0 203.552 0 203V171Z",
                    className: "fill-[#E5E5E5] dark:fill-[#404040]"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "path",
                  {
                    d: "M1 234C1 233.448 1.44772 233 2 233H3.5V300H2C1.44772 300 1 299.552 1 299V234Z",
                    className: "fill-[#E5E5E5] dark:fill-[#404040]"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "path",
                  {
                    d: "M1 319C1 318.448 1.44772 318 2 318H3.5V385H2C1.44772 385 1 384.552 1 384V319Z",
                    className: "fill-[#E5E5E5] dark:fill-[#404040]"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "path",
                  {
                    d: "M430 279H432C432.552 279 433 279.448 433 280V384C433 384.552 432.552 385 432 385H430V279Z",
                    className: "fill-[#E5E5E5] dark:fill-[#404040]"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "path",
                  {
                    d: "M6 74C6 35.3401 37.3401 4 76 4H356C394.66 4 426 35.3401 426 74V808C426 846.66 394.66 878 356 878H76C37.3401 878 6 846.66 6 808V74Z",
                    className: "fill-white dark:fill-[#262626]"
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(
                "path",
                {
                  opacity: "0.5",
                  d: "M174 5H258V5.5C258 6.60457 257.105 7.5 256 7.5H176C174.895 7.5 174 6.60457 174 5.5V5Z",
                  className: "fill-[#E5E5E5] dark:fill-[#404040]"
                }
              ),
              /* @__PURE__ */ jsx(
                "path",
                {
                  d: `M${SCREEN_X} 75C${SCREEN_X} 44.2101 46.2101 ${SCREEN_Y} 77 ${SCREEN_Y}H355C385.79 ${SCREEN_Y} 410.75 44.2101 410.75 75V807C410.75 837.79 385.79 862.75 355 862.75H77C46.2101 862.75 ${SCREEN_X} 837.79 ${SCREEN_X} 807V75Z`,
                  className: "fill-[#E5E5E5] stroke-[#E5E5E5] stroke-[0.5] dark:fill-[#404040] dark:stroke-[#404040]",
                  mask: hasMedia ? "url(#screenPunch)" : void 0
                }
              ),
              /* @__PURE__ */ jsx(
                "path",
                {
                  d: "M154 48.5C154 38.2827 162.283 30 172.5 30H259.5C269.717 30 278 38.2827 278 48.5C278 58.7173 269.717 67 259.5 67H172.5C162.283 67 154 58.7173 154 48.5Z",
                  className: "fill-[#F5F5F5] dark:fill-[#262626]"
                }
              ),
              /* @__PURE__ */ jsx(
                "path",
                {
                  d: "M249 48.5C249 42.701 253.701 38 259.5 38C265.299 38 270 42.701 270 48.5C270 54.299 265.299 59 259.5 59C253.701 59 249 54.299 249 48.5Z",
                  className: "fill-[#F5F5F5] dark:fill-[#262626]"
                }
              ),
              /* @__PURE__ */ jsx(
                "path",
                {
                  d: "M254 48.5C254 45.4624 256.462 43 259.5 43C262.538 43 265 45.4624 265 48.5C265 51.5376 262.538 54 259.5 54C256.462 54 254 51.5376 254 48.5Z",
                  className: "fill-[#E5E5E5] dark:fill-[#404040]"
                }
              ),
              /* @__PURE__ */ jsxs("defs", { children: [
                /* @__PURE__ */ jsxs("mask", { id: "screenPunch", maskUnits: "userSpaceOnUse", children: [
                  /* @__PURE__ */ jsx(
                    "rect",
                    {
                      x: "0",
                      y: "0",
                      width: PHONE_WIDTH,
                      height: PHONE_HEIGHT,
                      fill: "white"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "rect",
                    {
                      x: SCREEN_X,
                      y: SCREEN_Y,
                      width: SCREEN_WIDTH,
                      height: SCREEN_HEIGHT,
                      rx: SCREEN_RADIUS,
                      ry: SCREEN_RADIUS,
                      fill: "black"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx("clipPath", { id: "roundedCorners", children: /* @__PURE__ */ jsx(
                  "rect",
                  {
                    x: SCREEN_X,
                    y: SCREEN_Y,
                    width: SCREEN_WIDTH,
                    height: SCREEN_HEIGHT,
                    rx: SCREEN_RADIUS,
                    ry: SCREEN_RADIUS
                  }
                ) })
              ] })
            ]
          }
        )
      ]
    }
  );
}

// entry.jsx
import React from "react";

// registry:iphone.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var PHONE_WIDTH2 = 433;
var PHONE_HEIGHT2 = 882;
var SCREEN_X2 = 21.25;
var SCREEN_Y2 = 19.25;
var SCREEN_WIDTH2 = 389.5;
var SCREEN_HEIGHT2 = 843.5;
var SCREEN_RADIUS2 = 55.75;
var LEFT_PCT2 = SCREEN_X2 / PHONE_WIDTH2 * 100;
var TOP_PCT2 = SCREEN_Y2 / PHONE_HEIGHT2 * 100;
var WIDTH_PCT2 = SCREEN_WIDTH2 / PHONE_WIDTH2 * 100;
var HEIGHT_PCT2 = SCREEN_HEIGHT2 / PHONE_HEIGHT2 * 100;
var RADIUS_H2 = SCREEN_RADIUS2 / SCREEN_WIDTH2 * 100;
var RADIUS_V2 = SCREEN_RADIUS2 / SCREEN_HEIGHT2 * 100;
function Iphone2({
  src,
  videoSrc,
  className,
  style,
  ...props
}) {
  const hasVideo = !!videoSrc;
  const hasMedia = hasVideo || !!src;
  return /* @__PURE__ */ jsxs2(
    "div",
    {
      className: `relative inline-block w-full align-middle leading-none ${className}`,
      style: {
        aspectRatio: `${PHONE_WIDTH2}/${PHONE_HEIGHT2}`,
        ...style
      },
      ...props,
      children: [
        hasVideo && /* @__PURE__ */ jsx2(
          "div",
          {
            className: "pointer-events-none absolute z-0 overflow-hidden",
            style: {
              left: `${LEFT_PCT2}%`,
              top: `${TOP_PCT2}%`,
              width: `${WIDTH_PCT2}%`,
              height: `${HEIGHT_PCT2}%`,
              borderRadius: `${RADIUS_H2}% / ${RADIUS_V2}%`
            },
            children: /* @__PURE__ */ jsx2(
              "video",
              {
                className: "block size-full object-cover",
                src: videoSrc,
                autoPlay: true,
                loop: true,
                muted: true,
                playsInline: true,
                preload: "metadata"
              }
            )
          }
        ),
        !hasVideo && src && /* @__PURE__ */ jsx2(
          "div",
          {
            className: "pointer-events-none absolute z-0 overflow-hidden",
            style: {
              left: `${LEFT_PCT2}%`,
              top: `${TOP_PCT2}%`,
              width: `${WIDTH_PCT2}%`,
              height: `${HEIGHT_PCT2}%`,
              borderRadius: `${RADIUS_H2}% / ${RADIUS_V2}%`
            },
            children: /* @__PURE__ */ jsx2(
              "img",
              {
                src,
                alt: "",
                className: "block size-full object-cover object-top"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxs2(
          "svg",
          {
            viewBox: `0 0 ${PHONE_WIDTH2} ${PHONE_HEIGHT2}`,
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            className: "absolute inset-0 size-full",
            style: { transform: "translateZ(0)" },
            children: [
              /* @__PURE__ */ jsxs2("g", { mask: hasMedia ? "url(#screenPunch)" : void 0, children: [
                /* @__PURE__ */ jsx2(
                  "path",
                  {
                    d: "M2 73C2 32.6832 34.6832 0 75 0H357C397.317 0 430 32.6832 430 73V809C430 849.317 397.317 882 357 882H75C34.6832 882 2 849.317 2 809V73Z",
                    className: "fill-[#E5E5E5] dark:fill-[#404040]"
                  }
                ),
                /* @__PURE__ */ jsx2(
                  "path",
                  {
                    d: "M0 171C0 170.448 0.447715 170 1 170H3V204H1C0.447715 204 0 203.552 0 203V171Z",
                    className: "fill-[#E5E5E5] dark:fill-[#404040]"
                  }
                ),
                /* @__PURE__ */ jsx2(
                  "path",
                  {
                    d: "M1 234C1 233.448 1.44772 233 2 233H3.5V300H2C1.44772 300 1 299.552 1 299V234Z",
                    className: "fill-[#E5E5E5] dark:fill-[#404040]"
                  }
                ),
                /* @__PURE__ */ jsx2(
                  "path",
                  {
                    d: "M1 319C1 318.448 1.44772 318 2 318H3.5V385H2C1.44772 385 1 384.552 1 384V319Z",
                    className: "fill-[#E5E5E5] dark:fill-[#404040]"
                  }
                ),
                /* @__PURE__ */ jsx2(
                  "path",
                  {
                    d: "M430 279H432C432.552 279 433 279.448 433 280V384C433 384.552 432.552 385 432 385H430V279Z",
                    className: "fill-[#E5E5E5] dark:fill-[#404040]"
                  }
                ),
                /* @__PURE__ */ jsx2(
                  "path",
                  {
                    d: "M6 74C6 35.3401 37.3401 4 76 4H356C394.66 4 426 35.3401 426 74V808C426 846.66 394.66 878 356 878H76C37.3401 878 6 846.66 6 808V74Z",
                    className: "fill-white dark:fill-[#262626]"
                  }
                )
              ] }),
              /* @__PURE__ */ jsx2(
                "path",
                {
                  opacity: "0.5",
                  d: "M174 5H258V5.5C258 6.60457 257.105 7.5 256 7.5H176C174.895 7.5 174 6.60457 174 5.5V5Z",
                  className: "fill-[#E5E5E5] dark:fill-[#404040]"
                }
              ),
              /* @__PURE__ */ jsx2(
                "path",
                {
                  d: `M${SCREEN_X2} 75C${SCREEN_X2} 44.2101 46.2101 ${SCREEN_Y2} 77 ${SCREEN_Y2}H355C385.79 ${SCREEN_Y2} 410.75 44.2101 410.75 75V807C410.75 837.79 385.79 862.75 355 862.75H77C46.2101 862.75 ${SCREEN_X2} 837.79 ${SCREEN_X2} 807V75Z`,
                  className: "fill-[#E5E5E5] stroke-[#E5E5E5] stroke-[0.5] dark:fill-[#404040] dark:stroke-[#404040]",
                  mask: hasMedia ? "url(#screenPunch)" : void 0
                }
              ),
              /* @__PURE__ */ jsx2(
                "path",
                {
                  d: "M154 48.5C154 38.2827 162.283 30 172.5 30H259.5C269.717 30 278 38.2827 278 48.5C278 58.7173 269.717 67 259.5 67H172.5C162.283 67 154 58.7173 154 48.5Z",
                  className: "fill-[#F5F5F5] dark:fill-[#262626]"
                }
              ),
              /* @__PURE__ */ jsx2(
                "path",
                {
                  d: "M249 48.5C249 42.701 253.701 38 259.5 38C265.299 38 270 42.701 270 48.5C270 54.299 265.299 59 259.5 59C253.701 59 249 54.299 249 48.5Z",
                  className: "fill-[#F5F5F5] dark:fill-[#262626]"
                }
              ),
              /* @__PURE__ */ jsx2(
                "path",
                {
                  d: "M254 48.5C254 45.4624 256.462 43 259.5 43C262.538 43 265 45.4624 265 48.5C265 51.5376 262.538 54 259.5 54C256.462 54 254 51.5376 254 48.5Z",
                  className: "fill-[#E5E5E5] dark:fill-[#404040]"
                }
              ),
              /* @__PURE__ */ jsxs2("defs", { children: [
                /* @__PURE__ */ jsxs2("mask", { id: "screenPunch", maskUnits: "userSpaceOnUse", children: [
                  /* @__PURE__ */ jsx2(
                    "rect",
                    {
                      x: "0",
                      y: "0",
                      width: PHONE_WIDTH2,
                      height: PHONE_HEIGHT2,
                      fill: "white"
                    }
                  ),
                  /* @__PURE__ */ jsx2(
                    "rect",
                    {
                      x: SCREEN_X2,
                      y: SCREEN_Y2,
                      width: SCREEN_WIDTH2,
                      height: SCREEN_HEIGHT2,
                      rx: SCREEN_RADIUS2,
                      ry: SCREEN_RADIUS2,
                      fill: "black"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx2("clipPath", { id: "roundedCorners", children: /* @__PURE__ */ jsx2(
                  "rect",
                  {
                    x: SCREEN_X2,
                    y: SCREEN_Y2,
                    width: SCREEN_WIDTH2,
                    height: SCREEN_HEIGHT2,
                    rx: SCREEN_RADIUS2,
                    ry: SCREEN_RADIUS2
                  }
                ) })
              ] })
            ]
          }
        )
      ]
    }
  );
}

// registry:components/ui/iphone-demo.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Demo() {
  return /* @__PURE__ */ jsx3("div", { className: "w-[434px]", children: /* @__PURE__ */ jsx3(Iphone2, {}) });
}

// entry.jsx
import { jsx as jsx4 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx4("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx4("div", { className: "vendor-content", children: /* @__PURE__ */ jsx4(Demo, {}) }) });
}
export {
  Iphone,
  Component as default
};

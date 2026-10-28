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
// Adapted from https://www.vengenceui.com/components/why-us-bento
// Copyright (c) 2025-2026 Ashutoshx7. See licenses/vengeance.txt for usage terms.
// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/container.tsx
import { jsx } from "react/jsx-runtime";
function Container({
  children,
  className
}) {
  return /* @__PURE__ */ jsx("div", { className: cn("mx-auto max-w-7xl px-4 md:px-8 lg:px-16", className), children });
}
var container_default = Container;

// registry:components/ui/why-us-bento.tsx
import { motion } from "motion/react";

// registry:next/image
import { jsx as jsx2 } from "react/jsx-runtime";
function Image({ fill, priority, quality, unoptimized, loader, placeholder, blurDataURL, onLoadingComplete, ...props }) {
  return /* @__PURE__ */ jsx2("img", { ...props, style: { ...fill ? { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" } : {}, ...props.style } });
}

// registry:components/ui/why-us-bento.tsx
import {
  Headset,
  MapTrifold,
  Hammer,
  Globe,
  Rocket,
  CaretRight
} from "@phosphor-icons/react";

// registry:assets/svgs/isometric-box-01.tsx
import { jsx as jsx3, jsxs } from "react/jsx-runtime";
function IsometricBox01({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      viewBox: "0 0 221 141",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className,
      ...props,
      children: [
        /* @__PURE__ */ jsx3(
          "rect",
          {
            width: "79.6405",
            height: "119.248",
            transform: "matrix(0.866025 -0.5 0.866025 0.5 48 80.8203)",
            fill: "url(#paint1_linear_836_760)"
          }
        ),
        /* @__PURE__ */ jsx3(
          "path",
          {
            d: "M81.9999 90.3112L134.5 60.0003L177.64 84.9074L125.14 115.218L81.9999 90.3112Z",
            fill: "url(#paint2_linear_836_760)"
          }
        ),
        /* @__PURE__ */ jsx3(
          "path",
          {
            d: "M62.5002 89L18.0001 63.5C16.4118 62.5924 14.2057 61.5304 12.3281 59.5255C10.4153 57.483 10 54.5514 10 51.7532L10.0001 45.5L72.5 78.5H80L143 45V55C143 58.2 139.333 61 137.5 62L91.0002 89C78.6002 94.6 66.8335 91.3333 62.5002 89Z",
            fill: "url(#paint3_linear_836_760)",
            stroke: "#d4d4d8"
          }
        ),
        /* @__PURE__ */ jsx3(
          "path",
          {
            d: "M16.0215 35.5337L61.5462 9.25C69.9163 4.41754 83.4869 4.41752 91.857 9.25L136.89 35.25C145.26 40.0825 145.26 47.9175 136.89 52.75L91.3657 79.0337C82.9956 83.8661 69.4249 83.8661 61.0548 79.0337L16.0215 53.0337C7.65142 48.2012 7.65155 40.3662 16.0215 35.5337Z",
            fill: "white",
            stroke: "#d4d4d8"
          }
        ),
        /* @__PURE__ */ jsx3(
          "text",
          {
            x: "0",
            y: "0",
            dy: ".35em",
            fontSize: "56",
            fontWeight: "900",
            fill: "#f87171",
            textAnchor: "middle",
            transform: "translate(76.5, 43.5) scale(1, 0.57735) rotate(-45)",
            style: { fontFamily: "sans-serif", letterSpacing: "-0.02em", pointerEvents: "none" },
            children: "AI"
          }
        ),
        /* @__PURE__ */ jsxs("defs", { children: [
          /* @__PURE__ */ jsxs(
            "linearGradient",
            {
              id: "paint0_linear_836_760",
              x1: "21.9782",
              y1: "0",
              x2: "21.9782",
              y2: "70.0332",
              gradientUnits: "userSpaceOnUse",
              children: [
                /* @__PURE__ */ jsx3("stop", { stopColor: "black", stopOpacity: "0.08" }),
                /* @__PURE__ */ jsx3("stop", { offset: "1", stopColor: "black", stopOpacity: "0" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "linearGradient",
            {
              id: "paint1_linear_836_760",
              x1: "39.8202",
              y1: "0",
              x2: "39.8202",
              y2: "119.248",
              gradientUnits: "userSpaceOnUse",
              children: [
                /* @__PURE__ */ jsx3("stop", { stopColor: "black", stopOpacity: "0.08" }),
                /* @__PURE__ */ jsx3("stop", { offset: "1", stopColor: "black", stopOpacity: "0" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "linearGradient",
            {
              id: "paint2_linear_836_760",
              x1: "105.277",
              y1: "71.5335",
              x2: "126.847",
              y2: "108.894",
              gradientUnits: "userSpaceOnUse",
              children: [
                /* @__PURE__ */ jsx3("stop", { stopColor: "black", stopOpacity: "0.08" }),
                /* @__PURE__ */ jsx3("stop", { offset: "1", stopColor: "black", stopOpacity: "0" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "linearGradient",
            {
              id: "paint3_linear_836_760",
              x1: "10",
              y1: "52.5",
              x2: "143",
              y2: "54.5",
              gradientUnits: "userSpaceOnUse",
              children: [
                /* @__PURE__ */ jsx3("stop", { stopColor: "white" }),
                /* @__PURE__ */ jsx3("stop", { offset: "1", stopColor: "#e5e5e5" })
              ]
            }
          )
        ] })
      ]
    }
  );
}

// registry:assets/svgs/isometric-boxes-02.tsx
import React from "react";
import {
  Database,
  Browser,
  Cube,
  Brain,
  FileCode,
  HardDrive,
  DeviceMobile,
  Cloud
} from "@phosphor-icons/react";
import { jsx as jsx4, jsxs as jsxs2 } from "react/jsx-runtime";
function IsometricBoxes02({
  className,
  ...props
}) {
  const order = [3, 0, 6, 1, 7, 2, 4, 5];
  const boxes = [
    {
      id: "ai-ml",
      title: "AI / ML",
      Icon: Brain,
      x: 182.6,
      y: 27.5,
      lines: ["M141 31.5V123.5", "M183 41.5V124", "M224 31V129.5"],
      base: "M173.975 13.01C178.758 10.2486 186.512 10.2486 191.295 13.01L221.106 30.221L224.5 27.5C224.5 27.5 225 32 225 34.2649C225 36.5656 224.549 38.8112 221.606 40.51L191.295 58.01C186.512 60.7712 178.757 60.7713 173.975 58.01L143.664 40.51C140.45 38.6545 140.5 36.5 140.504 33.6614C140.505 32.5517 141 28 141 28L143.581 30.5598C143.609 30.5435 143.636 30.5262 143.664 30.51L173.975 13.01Z",
      face: "M144.093 22.75L174.404 5.25C178.948 2.62665 186.315 2.62665 190.859 5.25L221.17 22.75C225.713 25.3734 225.713 29.6266 221.17 32.25L190.859 49.75C186.315 52.3734 178.948 52.3734 174.404 49.75L144.093 32.25C139.549 29.6266 139.549 25.3734 144.093 22.75Z"
    },
    {
      id: "backend",
      title: "Backend",
      Icon: HardDrive,
      x: 137.6,
      y: 70.5,
      lines: ["M96 78V209", "M138 88V213", "M179 77L180 217"],
      base: "M128.975 56.01C133.758 53.2486 141.512 53.2486 146.295 56.01L176.106 73.221L179.5 70.5C179.5 70.5 180 75 180 77.2649C180 79.5656 179.549 81.8112 176.606 83.51L146.295 101.01C141.512 103.771 133.757 103.771 128.975 101.01L98.6641 83.51C95.4502 81.6545 95.5 79.5 95.5039 76.6614C95.5055 75.5517 96 71 96 71L98.5811 73.5598C98.6088 73.5435 98.6361 73.5262 98.6641 73.51L128.975 56.01Z",
      face: "M99.0933 65.75L129.404 48.25C133.948 45.6266 141.315 45.6266 145.859 48.25L176.17 65.75C180.713 68.3734 180.713 72.6266 176.17 75.25L145.859 92.75C141.315 95.3734 133.948 95.3734 129.404 92.75L99.0933 75.25C94.5495 72.6266 94.5495 68.3734 99.0933 65.75Z"
    },
    {
      id: "mobile",
      title: "Mobile",
      Icon: DeviceMobile,
      x: 227.6,
      y: 70.5,
      lines: ["M186 80V225", "M228 90V221", "M269 79L269.993 230"],
      base: "M218.975 56.01C223.758 53.2486 231.512 53.2486 236.295 56.01L266.106 73.221L269.5 70.5C269.5 70.5 270 75 270 77.2649C270 79.5656 269.549 81.8112 266.606 83.51L236.295 101.01C231.512 103.771 223.757 103.771 218.975 101.01L188.664 83.51C185.45 81.6545 185.5 79.5 185.504 76.6614C185.505 75.5517 186 71 186 71L188.581 73.5598C188.609 73.5435 188.636 73.5262 188.664 73.51L218.975 56.01Z",
      face: "M189.093 65.75L219.404 48.25C223.948 45.6266 231.315 45.6266 235.859 48.25L266.17 65.75C270.713 68.3734 270.713 72.6266 266.17 75.25L235.859 92.75C231.315 95.3734 223.948 95.3734 219.404 92.75L189.093 75.25C184.549 72.6266 184.549 68.3734 189.093 65.75Z"
    },
    {
      id: "web",
      title: "Web",
      Icon: Browser,
      x: 92.6,
      y: 113.5,
      lines: ["M51 113.5V205.5", "M93 123.5V206", "M134 113V211.5"],
      base: "M83.9746 99.01C88.7576 96.2486 96.512 96.2486 101.295 99.01L131.106 116.221L134.5 113.5C134.5 113.5 135 118 135 120.265C135 122.566 134.549 124.811 131.606 126.51L101.295 144.01C96.512 146.771 88.7574 146.771 83.9746 144.01L53.6641 126.51C50.4502 124.654 50.5 122.5 50.5039 119.661C50.5055 118.552 51 114 51 114L53.5811 116.56C53.6088 116.544 53.6361 116.526 53.6641 116.51L83.9746 99.01Z",
      face: "M54.0933 108.75L84.4042 91.25C88.9479 88.6266 96.3149 88.6266 100.859 91.25L131.17 108.75C135.713 111.373 135.713 115.627 131.17 118.25L100.859 135.75C96.3149 138.373 88.9479 138.373 84.4042 135.75L54.0933 118.25C49.5495 115.627 49.5495 111.373 54.0933 108.75Z"
    },
    {
      id: "core",
      title: "Core",
      Icon: Cube,
      x: 182.6,
      y: 113.5,
      lines: ["M141 120V212", "M183 130V212.5", "M224 119.5V218"],
      base: "M173.975 99.01C178.758 96.2486 186.512 96.2486 191.295 99.01L221.106 116.221L224.5 113.5C224.5 113.5 225 118 225 120.265C225 122.566 224.549 124.811 221.606 126.51L191.295 144.01C186.512 146.771 178.757 146.771 173.975 144.01L143.664 126.51C140.45 124.654 140.5 122.5 140.504 119.661C140.505 118.552 141 114 141 114L143.581 116.56C143.609 116.544 143.636 116.526 143.664 116.51L173.975 99.01Z",
      face: "M144.093 108.75L174.404 91.25C178.948 88.6266 186.315 88.6266 190.859 91.25L221.17 108.75C225.713 111.373 225.713 115.627 221.17 118.25L190.859 135.75C186.315 138.373 178.948 138.373 174.404 135.75L144.093 118.25C139.549 115.627 139.549 111.373 144.093 108.75Z"
    },
    {
      id: "contracts",
      title: "Contracts",
      Icon: FileCode,
      x: 272.6,
      y: 113.5,
      lines: ["M231 118.5V210.5", "M273 128.5V211", "M314 121L314 216"],
      base: "M263.975 99.01C268.758 96.2486 276.513 96.2486 281.295 99.01L311.106 116.221L314.5 113.5C314.5 113.5 315 118 315.001 120.265C315.001 122.566 314.549 124.811 311.607 126.51L281.295 144.01C276.513 146.771 268.758 146.771 263.975 144.01L233.665 126.51C230.451 124.654 230.5 122.5 230.504 119.661C230.506 118.552 231 114 231 114L233.582 116.56C233.609 116.544 233.637 116.526 233.665 116.51L263.975 99.01Z",
      face: "M234.093 108.75L264.404 91.25C268.948 88.6266 276.315 88.6266 280.859 91.25L311.17 108.75C315.713 111.373 315.713 115.627 311.17 118.25L280.859 135.75C276.315 138.373 268.948 138.373 264.404 135.75L234.093 118.25C229.549 115.627 229.549 111.373 234.093 108.75Z"
    },
    {
      id: "data",
      title: "Data",
      Icon: Database,
      x: 47.6,
      y: 156.5,
      lines: ["M6 157V207", "M48 165V215", "M89 165V215"],
      base: "M38.9746 142.01C43.7576 139.249 51.512 139.249 56.295 142.01L86.1055 159.221L89.4999 156.5C89.4999 156.5 89.9999 161 90 163.265C90.0002 165.566 89.5489 167.811 86.6065 169.51L56.295 187.01C51.512 189.771 43.7574 189.771 38.9746 187.01L8.6641 169.51C5.45019 167.654 5.5 165.5 5.50394 162.661C5.50548 161.552 6 157 6 157L8.58109 159.56C8.6088 159.544 8.63605 159.526 8.6641 159.51L38.9746 142.01Z",
      face: "M9.09327 151.75L39.4042 134.25C43.9479 131.627 51.3149 131.627 55.8586 134.25L86.1695 151.75C90.7133 154.373 90.7133 158.627 86.1695 161.25L55.8586 178.75C51.3149 181.373 43.9479 181.373 39.4042 178.75L9.09327 161.25C4.54949 158.627 4.54949 154.373 9.09327 151.75Z"
    },
    {
      id: "infra",
      title: "Infra",
      Icon: Cloud,
      x: 317.6,
      y: 156.5,
      lines: ["M276 167V217", "M318 168V218", "M359 166V216"],
      base: "M308.975 142.01C313.758 139.249 321.513 139.249 326.295 142.01L356.106 159.221L359.5 156.5C359.5 156.5 360 161 360.001 163.265C360.001 165.566 359.549 167.811 356.607 169.51L326.295 187.01C321.513 189.771 313.758 189.771 308.975 187.01L278.665 169.51C275.451 167.654 275.5 165.5 275.504 162.661C275.506 161.552 276 157 276 157L278.582 159.56C278.609 159.544 278.637 159.526 278.665 159.51L308.975 142.01Z",
      face: "M279.093 151.75L309.404 134.25C313.948 131.627 321.315 131.627 325.859 134.25L356.17 151.75C360.713 154.373 360.713 158.627 356.17 161.25L325.859 178.75C321.315 181.373 313.948 181.373 309.404 178.75L279.093 161.25C274.549 158.627 274.549 154.373 279.093 151.75Z"
    }
  ].map((box, i) => ({
    ...box,
    customDelay: order[i] * 0.25
  }));
  return /* @__PURE__ */ jsxs2(
    "svg",
    {
      viewBox: "0 0 366 198",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className,
      ...props,
      children: [
        /* @__PURE__ */ jsx4("style", { children: `
        .iso-base { fill: #D9D9D9; stroke: #D9D9D9; transition: fill 0.3s, stroke 0.3s; }
        .iso-stroke { stroke: #D9D9D9; transition: stroke 0.3s; }
        .iso-color { color: #d4d4d4; transition: color 0.3s; }

        .group:hover .iso-base {
          animation: isoPulseFillStroke 2s ease-in-out infinite;
        }
        .group:hover .iso-stroke {
          animation: isoPulseStroke 2s ease-in-out infinite;
        }
        .group:hover .iso-color {
          animation: isoPulseColor 2s ease-in-out infinite;
        }

        @keyframes isoPulseFillStroke {
          0%, 100% { fill: #D9D9D9; stroke: #D9D9D9; }
          12.5% { fill: #737373; stroke: #737373; }
        }
        @keyframes isoPulseStroke {
          0%, 100% { stroke: #D9D9D9; }
          12.5% { stroke: #737373; }
        }
        @keyframes isoPulseColor {
          0%, 100% { color: #d4d4d4; }
          12.5% { color: #737373; }
        }
      ` }),
        boxes.map((b) => /* @__PURE__ */ jsx4(
          "path",
          {
            d: b.base,
            className: "iso-base",
            style: { animationDelay: `${b.customDelay}s` }
          },
          `base-${b.id}`
        )),
        boxes.map((b) => /* @__PURE__ */ jsx4(React.Fragment, { children: b.lines.map((l, i) => /* @__PURE__ */ jsx4(
          "path",
          {
            d: l,
            strokeDasharray: "4 4",
            className: "iso-stroke",
            style: { animationDelay: `${b.customDelay}s` }
          },
          i
        )) }, `lines-${b.id}`)),
        boxes.map((b) => /* @__PURE__ */ jsx4(
          "path",
          {
            d: b.face,
            fill: "white",
            className: "iso-stroke",
            style: { animationDelay: `${b.customDelay}s` }
          },
          `face-${b.id}`
        )),
        boxes.map((b) => /* @__PURE__ */ jsxs2(
          "g",
          {
            transform: `translate(${b.x}, ${b.y}) scale(1, 0.57735) rotate(-45)`,
            className: "pointer-events-none iso-color",
            style: { animationDelay: `${b.customDelay}s` },
            children: [
              /* @__PURE__ */ jsx4("g", { transform: "translate(-10, -14)", children: /* @__PURE__ */ jsx4(b.Icon, { width: "20", height: "20", weight: "fill", color: "currentColor" }) }),
              /* @__PURE__ */ jsx4(
                "text",
                {
                  x: "0",
                  y: "14",
                  fontSize: "8",
                  fontWeight: "bold",
                  fill: "currentColor",
                  textAnchor: "middle",
                  children: b.title
                }
              )
            ]
          },
          `content-${b.id}`
        ))
      ]
    }
  );
}

// registry:components/ui/why-us-bento.tsx
import * as React2 from "react";
import { jsx as jsx5, jsxs as jsxs3 } from "react/jsx-runtime";
var DEFAULT_TEAM_AVATARS = [
  "https://www.vengenceui.com/avatars/aizen.jpg",
  "https://www.vengenceui.com/avatars/batmaaanji.jpg",
  "https://www.vengenceui.com/avatars/johan.jpg",
  "https://www.vengenceui.com/avatars/shinji.jpg",
  "https://www.vengenceui.com/avatars/andha-aizen.jpg",
  "https://www.vengenceui.com/avatars/pinky-aizen.jpg"
];
var PIPELINE_STEPS = [
  { id: "01", label: "CALL", Icon: Headset },
  { id: "02", label: "PLAN", Icon: MapTrifold },
  { id: "03", label: "BUILD", Icon: Hammer },
  { id: "04", label: "DEPLOY", Icon: Globe },
  { id: "05", label: "LAUNCH", Icon: Rocket }
];
function WhyUsBento({
  className,
  teamAvatars = DEFAULT_TEAM_AVATARS
}) {
  return /* @__PURE__ */ jsx5("section", { className: cn("py-2 sm:py-4 relative z-10 w-full", className), children: /* @__PURE__ */ jsx5(container_default, { className: "flex flex-col gap-3 sm:gap-4", children: /* @__PURE__ */ jsxs3("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-3.5 auto-rows-auto", children: [
    /* @__PURE__ */ jsxs3(
      motion.div,
      {
        initial: "initial",
        whileHover: "hover",
        className: "col-span-1 md:col-span-2 row-span-1 rounded-xl bg-white dark:bg-neutral-900 backdrop-blur-md p-5 sm:p-6 md:p-7 relative overflow-hidden group transition-colors duration-500 flex flex-col justify-center shadow-[0_0_0_2px_rgba(255,255,255,1),inset_0_0_0_1px_rgba(221,221,221,1)] dark:shadow-none dark:border dark:border-neutral-800 min-h-[150px] sm:min-h-[170px]",
        children: [
          /* @__PURE__ */ jsx5("div", { className: "absolute right-2 sm:right-4 md:-right-2 lg:right-4 top-1/2 -translate-y-1/2 w-36 sm:w-48 md:w-60 lg:w-72 z-20 hidden sm:block pointer-events-none", children: /* @__PURE__ */ jsx5(IsometricBox01, { className: "w-full h-auto" }) }),
          /* @__PURE__ */ jsxs3("div", { className: "relative z-30 w-full sm:w-3/5 md:w-3/5", children: [
            /* @__PURE__ */ jsxs3("h3", { className: "text-lg sm:text-xl md:text-2xl font-bold text-black dark:text-white mb-1.5 sm:mb-2 relative overflow-hidden flex flex-wrap", children: [
              /* @__PURE__ */ jsx5("span", { className: "flex", children: "AI & Automation".split("").map((l, i) => /* @__PURE__ */ jsx5(
                motion.span,
                {
                  className: "inline-block",
                  variants: {
                    initial: { y: 0 },
                    hover: { y: "-100%" }
                  },
                  transition: { duration: 0.3, delay: i * 0.02, ease: [0.33, 1, 0.68, 1] },
                  children: l === " " ? "\xA0" : l
                },
                i
              )) }),
              /* @__PURE__ */ jsx5("span", { className: "absolute inset-0 flex text-red-500 pointer-events-none", "aria-hidden": true, children: "AI & Automation".split("").map((l, i) => /* @__PURE__ */ jsx5(
                motion.span,
                {
                  className: "inline-block",
                  variants: {
                    initial: { y: "100%" },
                    hover: { y: 0 }
                  },
                  transition: { duration: 0.3, delay: i * 0.02, ease: [0.33, 1, 0.68, 1] },
                  children: l === " " ? "\xA0" : l
                },
                i
              )) })
            ] }),
            /* @__PURE__ */ jsx5("p", { className: "text-neutral-500 dark:text-neutral-400 text-xs sm:text-sm md:text-base leading-relaxed", children: "We build AI agents and automated workflows to handle data, pipelines, and repetitive tasks, freeing your team to focus on what matters." })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxs3("div", { className: "col-span-1 md:col-span-1 row-span-1 md:row-span-2 rounded-xl border-[1.5px] border-transparent bg-black p-5 sm:p-6 md:p-7 relative overflow-hidden group transition-all duration-500 flex flex-col justify-between text-white min-h-[310px] sm:min-h-[350px]", children: [
      /* @__PURE__ */ jsx5("div", { className: "relative z-10 w-full flex flex-col items-center justify-center min-h-[140px] sm:min-h-[160px] mb-3 sm:mb-4 translate-x-2", children: /* @__PURE__ */ jsxs3("div", { className: "relative w-full max-w-[170px] sm:max-w-[200px] aspect-4/3 group-hover:-translate-y-2 group-hover:scale-105 transition-all duration-300 ease-out", children: [
        /* @__PURE__ */ jsx5("div", { className: "absolute inset-0 bg-neutral-500 rounded-xl border border-neutral-600/50 transform -rotate-12 -translate-x-3 translate-y-3 shadow-xl transition-all duration-300 ease-out group-hover:rotate-[-20deg] group-hover:-translate-x-6 group-hover:translate-y-6" }),
        /* @__PURE__ */ jsx5("div", { className: "absolute inset-0 bg-neutral-400 rounded-xl border border-neutral-500/50 transform -rotate-9 -translate-x-2.5 translate-y-2.5 shadow-xl transition-all duration-300 ease-out group-hover:rotate-[-15deg] group-hover:-translate-x-5 group-hover:translate-y-5" }),
        /* @__PURE__ */ jsx5("div", { className: "absolute inset-0 bg-neutral-300 rounded-xl border border-neutral-400/50 transform -rotate-6 -translate-x-1.5 translate-y-1.5 shadow-xl transition-all duration-300 ease-out group-hover:rotate-[-10deg] group-hover:-translate-x-3 group-hover:translate-y-3" }),
        /* @__PURE__ */ jsx5("div", { className: "absolute inset-0 bg-neutral-200 rounded-xl border border-neutral-300/50 transform -rotate-3 -translate-x-1 translate-y-1 shadow-xl transition-all duration-300 ease-out group-hover:-rotate-5 group-hover:-translate-x-1.5 group-hover:translate-y-1.5" }),
        /* @__PURE__ */ jsxs3(
          "div",
          {
            className: "absolute inset-0 bg-neutral-50 rounded-xl p-3.5 sm:p-4 flex flex-col justify-between text-black shadow-2xl border border-white/50",
            style: {
              backgroundImage: "linear-gradient(to right, rgba(0,0,0,0.005) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.01) 1px, transparent 1px)",
              backgroundSize: "10px 10px"
            },
            children: [
              /* @__PURE__ */ jsxs3("div", { className: "flex gap-0.5", children: [
                /* @__PURE__ */ jsx5("div", { className: "w-2 h-3 bg-black rounded-sm" }),
                /* @__PURE__ */ jsx5("div", { className: "w-1 h-3 bg-black rounded-sm" }),
                /* @__PURE__ */ jsx5("div", { className: "w-2 h-3 bg-black/30 rounded-sm" })
              ] }),
              /* @__PURE__ */ jsxs3("div", { className: "font-mono text-[15px] sm:text-[18px] md:text-[20px] font-bold leading-[1.1] tracking-tight mt-auto mb-2", children: [
                "Idea.",
                /* @__PURE__ */ jsx5("br", {}),
                "Architecture.",
                /* @__PURE__ */ jsx5("br", {}),
                "Production."
              ] }),
              /* @__PURE__ */ jsxs3("div", { className: "font-mono text-[7px] sm:text-[8px] text-neutral-600 font-bold uppercase tracking-wider flex items-center gap-1", children: [
                /* @__PURE__ */ jsx5("span", { children: "> READY TO EXECUTE" }),
                /* @__PURE__ */ jsx5("span", { className: "animate-pulse", children: "_" })
              ] })
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxs3("div", { className: "relative z-10", children: [
        /* @__PURE__ */ jsx5("h3", { className: "text-lg sm:text-xl font-bold text-white mb-1.5", children: "From Idea to Production" }),
        /* @__PURE__ */ jsx5("p", { className: "text-neutral-400 text-xs sm:text-sm leading-relaxed", children: "Bring us your idea. We'll map, build, and deploy it end-to-end, then stay on to support you post-launch." })
      ] }),
      /* @__PURE__ */ jsx5("div", { className: "absolute -right-6 -bottom-12 text-[9rem] sm:text-[12rem] font-bold text-neutral-900/40 pointer-events-none group-hover:scale-105 transition-transform duration-700 leading-none select-none", children: "02" })
    ] }),
    /* @__PURE__ */ jsxs3(
      motion.div,
      {
        initial: "initial",
        whileHover: "hover",
        className: "col-span-1 md:col-span-1 row-span-1 rounded-xl shadow-[0_0_0_2px_rgba(255,255,255,1),inset_0_0_0_1px_rgba(221,221,221,1)] dark:shadow-none bg-white dark:bg-neutral-900 dark:border dark:border-neutral-800 p-5 sm:p-6 md:p-7 relative overflow-hidden group transition-colors duration-500 flex flex-col justify-between min-h-[150px] sm:min-h-[170px]",
        children: [
          /* @__PURE__ */ jsx5("div", { className: "flex items-center relative z-10 mb-3 h-8 sm:h-10", children: teamAvatars.map((src, i) => /* @__PURE__ */ jsx5(
            motion.div,
            {
              className: "relative w-7 h-7 sm:w-9 sm:h-9 rounded-full overflow-hidden ring-2 ring-white dark:ring-neutral-900 shadow-sm",
              style: {
                marginLeft: i === 0 ? 0 : "-9px",
                zIndex: teamAvatars.length - i
              },
              variants: {
                initial: { x: 0, y: 0, rotate: 0, scale: 1 },
                hover: {
                  x: i * 12,
                  y: i % 2 === 0 ? -4 : 4,
                  rotate: (i - 2) * 5,
                  scale: 1.1
                }
              },
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 20,
                bounce: 0
              },
              children: /* @__PURE__ */ jsx5(
                Image,
                {
                  src,
                  alt: "team member",
                  fill: true,
                  sizes: "36px",
                  className: "object-cover object-top"
                }
              )
            },
            i
          )) }),
          /* @__PURE__ */ jsxs3("div", { className: "relative z-10", children: [
            /* @__PURE__ */ jsx5("h3", { className: "text-lg sm:text-xl font-bold text-black dark:text-white mb-1.5", children: "Built by Experienced Engineers" }),
            /* @__PURE__ */ jsx5("p", { className: "text-neutral-500 dark:text-neutral-400 text-xs sm:text-sm leading-relaxed", children: "Work directly with senior engineers across AI, backend, and Solana from kickoff to launch. No rotating benches." })
          ] }),
          /* @__PURE__ */ jsx5("div", { className: "absolute -right-3 -bottom-8 text-[6rem] sm:text-[8rem] font-bold text-neutral-100/40 dark:text-neutral-800/40 pointer-events-none group-hover:scale-105 transition-transform duration-700 leading-none select-none", children: "03" })
        ]
      }
    ),
    /* @__PURE__ */ jsxs3(
      motion.div,
      {
        initial: "initial",
        whileHover: "hover",
        className: "col-span-1 md:col-span-1 row-span-1 rounded-xl shadow-[0_0_0_2px_rgba(255,255,255,1),inset_0_0_0_1px_rgba(221,221,221,1)] dark:shadow-none bg-white dark:bg-neutral-900 dark:border dark:border-neutral-800 p-5 sm:p-6 md:p-7 relative overflow-hidden group transition-colors duration-500 flex flex-col justify-between min-h-[150px] sm:min-h-[170px]",
        children: [
          /* @__PURE__ */ jsx5("div", { className: "relative z-10 w-full mb-3", children: /* @__PURE__ */ jsx5("div", { className: "flex items-start justify-between", children: PIPELINE_STEPS.map(({ id, label, Icon }, i) => /* @__PURE__ */ jsxs3(React2.Fragment, { children: [
            /* @__PURE__ */ jsxs3("div", { className: "flex flex-col items-center gap-0.5", children: [
              /* @__PURE__ */ jsxs3("div", { className: "relative", children: [
                /* @__PURE__ */ jsx5(Icon, { size: 18, weight: "fill", className: "text-black dark:text-white sm:w-5 sm:h-5" }),
                i === PIPELINE_STEPS.length - 1 && /* @__PURE__ */ jsx5("span", { className: "absolute -inset-1 rounded-full bg-black/10 dark:bg-white/20 animate-ping" })
              ] }),
              /* @__PURE__ */ jsx5("span", { className: "text-[6.5px] sm:text-[7.5px] text-neutral-800 dark:text-neutral-300 font-mono font-bold tracking-widest", children: label })
            ] }),
            i < PIPELINE_STEPS.length - 1 && /* @__PURE__ */ jsx5("div", { className: "mt-0.5 text-neutral-300 dark:text-neutral-600 group-hover:text-black dark:group-hover:text-white transition-colors duration-300", children: /* @__PURE__ */ jsx5(CaretRight, { size: 9, weight: "fill" }) })
          ] }, id)) }) }),
          /* @__PURE__ */ jsxs3("div", { className: "relative z-10", children: [
            /* @__PURE__ */ jsx5("h3", { className: "text-lg sm:text-xl font-bold text-black dark:text-white mb-1.5", children: "No Handoffs" }),
            /* @__PURE__ */ jsx5("p", { className: "text-neutral-500 dark:text-neutral-400 text-xs sm:text-sm leading-relaxed", children: "One team, start to finish. The engineers on your very first call are the exact ones shipping your product." })
          ] }),
          /* @__PURE__ */ jsx5("div", { className: "absolute -right-3 -bottom-8 text-[6rem] sm:text-[8rem] font-bold text-neutral-100/40 dark:text-neutral-800/40 pointer-events-none group-hover:scale-105 transition-transform duration-700 leading-none select-none", children: "04" })
        ]
      }
    ),
    /* @__PURE__ */ jsxs3(
      motion.div,
      {
        initial: "initial",
        whileHover: "hover",
        className: "col-span-1 md:col-span-3 row-span-1 md:row-span-1 min-h-[150px] sm:min-h-[170px] rounded-xl bg-white dark:bg-neutral-900 backdrop-blur-md p-5 sm:p-6 md:p-7 relative overflow-hidden group transition-colors duration-500 flex flex-col justify-center shadow-[0_0_0_2px_rgba(255,255,255,1),inset_0_0_0_1px_rgba(221,221,221,1)] dark:shadow-none dark:border dark:border-neutral-800",
        children: [
          /* @__PURE__ */ jsx5("div", { className: "absolute right-2 sm:right-4 md:right-8 lg:right-16 bottom-0 w-36 sm:w-56 md:w-72 lg:w-80 z-20 hidden sm:block pointer-events-none", children: /* @__PURE__ */ jsx5(IsometricBoxes02, { className: "w-full h-auto drop-shadow-xs" }) }),
          /* @__PURE__ */ jsxs3("div", { className: "relative z-30 w-full sm:w-3/5 md:w-3/5", children: [
            /* @__PURE__ */ jsx5("h3", { className: "text-lg sm:text-xl md:text-2xl font-bold text-black dark:text-white mb-1.5 sm:mb-2", children: "Deep Engineering" }),
            /* @__PURE__ */ jsx5("p", { className: "text-neutral-500 dark:text-neutral-400 text-xs sm:text-sm md:text-base leading-relaxed md:max-w-xl", children: "Web, mobile, backend, AI, and smart contracts. One cohesive team that goes deep on complex engineering." })
          ] }),
          /* @__PURE__ */ jsx5("div", { className: "absolute -right-6 -bottom-12 text-[8rem] sm:text-[11rem] font-bold text-neutral-100/40 dark:text-neutral-800/40 pointer-events-none group-hover:scale-105 transition-transform duration-700 leading-none select-none z-10", children: "05" })
        ]
      }
    )
  ] }) }) });
}

// entry.jsx
import React3 from "react";

// registry:components/docs/why-us-bento-demo.tsx
import { jsx as jsx6 } from "react/jsx-runtime";
function WhyUsBentoDemo() {
  return /* @__PURE__ */ jsx6("div", { className: "w-full max-w-full overflow-x-hidden bg-neutral-50 dark:bg-neutral-950 rounded-xl p-1 sm:p-2", children: /* @__PURE__ */ jsx6(WhyUsBento, { className: "py-0 sm:py-1" }) });
}

// entry.jsx
import { jsx as jsx7 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx7("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx7("div", { className: "vendor-content", children: /* @__PURE__ */ jsx7(WhyUsBentoDemo, {}) }) });
}
export {
  WhyUsBento,
  Component as default
};

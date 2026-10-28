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
// Adapted from https://magicui.design/docs/components/animated-circular-progress-bar
// Copyright (c) Magic UI. See licenses/magic.txt for usage terms.
// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/animated-circular-progress-bar.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function AnimatedCircularProgressBar({
  max = 100,
  min = 0,
  value = 0,
  gaugePrimaryColor,
  gaugeSecondaryColor,
  className
}) {
  const circumference = 2 * Math.PI * 45;
  const percentPx = circumference / 100;
  const currentPercent = Math.round((value - min) / (max - min) * 100);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn("relative size-40 text-2xl font-semibold", className),
      style: {
        "--circle-size": "100px",
        "--circumference": circumference,
        "--percent-to-px": `${percentPx}px`,
        "--gap-percent": "5",
        "--offset-factor": "0",
        "--transition-length": "1s",
        "--transition-step": "200ms",
        "--delay": "0s",
        "--percent-to-deg": "3.6deg",
        transform: "translateZ(0)"
      },
      children: [
        /* @__PURE__ */ jsxs(
          "svg",
          {
            fill: "none",
            className: "size-full",
            strokeWidth: "2",
            viewBox: "0 0 100 100",
            children: [
              currentPercent <= 90 && currentPercent >= 0 && /* @__PURE__ */ jsx(
                "circle",
                {
                  cx: "50",
                  cy: "50",
                  r: "45",
                  strokeWidth: "10",
                  strokeDashoffset: "0",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  className: "opacity-100",
                  style: {
                    stroke: gaugeSecondaryColor,
                    "--stroke-percent": 90 - currentPercent,
                    "--offset-factor-secondary": "calc(1 - var(--offset-factor))",
                    strokeDasharray: "calc(var(--stroke-percent) * var(--percent-to-px)) var(--circumference)",
                    transform: "rotate(calc(1turn - 90deg - (var(--gap-percent) * var(--percent-to-deg) * var(--offset-factor-secondary)))) scaleY(-1)",
                    transition: "all var(--transition-length) ease var(--delay)",
                    transformOrigin: "calc(var(--circle-size) / 2) calc(var(--circle-size) / 2)"
                  }
                }
              ),
              /* @__PURE__ */ jsx(
                "circle",
                {
                  cx: "50",
                  cy: "50",
                  r: "45",
                  strokeWidth: "10",
                  strokeDashoffset: "0",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  className: "opacity-100",
                  style: {
                    stroke: gaugePrimaryColor,
                    "--stroke-percent": currentPercent,
                    strokeDasharray: "calc(var(--stroke-percent) * var(--percent-to-px)) var(--circumference)",
                    transition: "var(--transition-length) ease var(--delay),stroke var(--transition-length) ease var(--delay)",
                    transitionProperty: "stroke-dasharray,transform",
                    transform: "rotate(calc(-90deg + var(--gap-percent) * var(--offset-factor) * var(--percent-to-deg)))",
                    transformOrigin: "calc(var(--circle-size) / 2) calc(var(--circle-size) / 2)"
                  }
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "span",
          {
            "data-current-value": currentPercent,
            className: "animate-in fade-in absolute inset-0 m-auto size-fit delay-(--delay) duration-(--transition-length) ease-linear",
            children: currentPercent
          }
        )
      ]
    }
  );
}

// entry.jsx
import React from "react";

// registry:components/ui/animated-circular-progress-bar-demo.tsx
import { useEffect, useState } from "react";

// registry:animated-circular-progress-bar.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function AnimatedCircularProgressBar2({
  max = 100,
  min = 0,
  value = 0,
  gaugePrimaryColor,
  gaugeSecondaryColor,
  className
}) {
  const circumference = 2 * Math.PI * 45;
  const percentPx = circumference / 100;
  const currentPercent = Math.round((value - min) / (max - min) * 100);
  return /* @__PURE__ */ jsxs2(
    "div",
    {
      className: cn("relative size-40 text-2xl font-semibold", className),
      style: {
        "--circle-size": "100px",
        "--circumference": circumference,
        "--percent-to-px": `${percentPx}px`,
        "--gap-percent": "5",
        "--offset-factor": "0",
        "--transition-length": "1s",
        "--transition-step": "200ms",
        "--delay": "0s",
        "--percent-to-deg": "3.6deg",
        transform: "translateZ(0)"
      },
      children: [
        /* @__PURE__ */ jsxs2(
          "svg",
          {
            fill: "none",
            className: "size-full",
            strokeWidth: "2",
            viewBox: "0 0 100 100",
            children: [
              currentPercent <= 90 && currentPercent >= 0 && /* @__PURE__ */ jsx2(
                "circle",
                {
                  cx: "50",
                  cy: "50",
                  r: "45",
                  strokeWidth: "10",
                  strokeDashoffset: "0",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  className: "opacity-100",
                  style: {
                    stroke: gaugeSecondaryColor,
                    "--stroke-percent": 90 - currentPercent,
                    "--offset-factor-secondary": "calc(1 - var(--offset-factor))",
                    strokeDasharray: "calc(var(--stroke-percent) * var(--percent-to-px)) var(--circumference)",
                    transform: "rotate(calc(1turn - 90deg - (var(--gap-percent) * var(--percent-to-deg) * var(--offset-factor-secondary)))) scaleY(-1)",
                    transition: "all var(--transition-length) ease var(--delay)",
                    transformOrigin: "calc(var(--circle-size) / 2) calc(var(--circle-size) / 2)"
                  }
                }
              ),
              /* @__PURE__ */ jsx2(
                "circle",
                {
                  cx: "50",
                  cy: "50",
                  r: "45",
                  strokeWidth: "10",
                  strokeDashoffset: "0",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  className: "opacity-100",
                  style: {
                    stroke: gaugePrimaryColor,
                    "--stroke-percent": currentPercent,
                    strokeDasharray: "calc(var(--stroke-percent) * var(--percent-to-px)) var(--circumference)",
                    transition: "var(--transition-length) ease var(--delay),stroke var(--transition-length) ease var(--delay)",
                    transitionProperty: "stroke-dasharray,transform",
                    transform: "rotate(calc(-90deg + var(--gap-percent) * var(--offset-factor) * var(--percent-to-deg)))",
                    transformOrigin: "calc(var(--circle-size) / 2) calc(var(--circle-size) / 2)"
                  }
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx2(
          "span",
          {
            "data-current-value": currentPercent,
            className: "animate-in fade-in absolute inset-0 m-auto size-fit delay-(--delay) duration-(--transition-length) ease-linear",
            children: currentPercent
          }
        )
      ]
    }
  );
}

// registry:components/ui/animated-circular-progress-bar-demo.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
function AnimatedCircularProgressBarDemo() {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const handleIncrement = (prev) => {
      if (prev === 100) {
        return 0;
      }
      return prev + 10;
    };
    setValue(handleIncrement);
    const interval = setInterval(() => setValue(handleIncrement), 2e3);
    return () => clearInterval(interval);
  }, []);
  return /* @__PURE__ */ jsx3(
    AnimatedCircularProgressBar2,
    {
      value,
      gaugePrimaryColor: "rgb(79 70 229)",
      gaugeSecondaryColor: "rgba(0, 0, 0, 0.1)"
    }
  );
}

// entry.jsx
import { jsx as jsx4 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx4("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx4("div", { className: "vendor-content", children: /* @__PURE__ */ jsx4(AnimatedCircularProgressBarDemo, {}) }) });
}
export {
  AnimatedCircularProgressBar,
  Component as default
};

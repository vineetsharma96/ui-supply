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
// Adapted from https://magicui.design/docs/components/pulsating-button
// Copyright (c) Magic UI. See licenses/magic.txt for usage terms.
// registry:components/ui/pulsating-button.tsx
import React, { useImperativeHandle, useLayoutEffect, useRef } from "react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/pulsating-button.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var PulsatingButton = React.forwardRef(
  ({
    className,
    children,
    pulseColor,
    duration = "1.5s",
    distance = "8px",
    variant = "pulse",
    ...props
  }, ref) => {
    const innerRef = useRef(null);
    useImperativeHandle(ref, () => innerRef.current);
    useLayoutEffect(() => {
      const button = innerRef.current;
      if (!button) return;
      if (pulseColor) {
        button.style.removeProperty("--bg");
        return;
      }
      let animationFrameId = 0;
      let currentBg = "";
      const updateBg = () => {
        animationFrameId = 0;
        const nextBg = getComputedStyle(button).backgroundColor;
        if (nextBg === currentBg) return;
        currentBg = nextBg;
        button.style.setProperty("--bg", nextBg);
      };
      const scheduleBgUpdate = () => {
        if (animationFrameId) return;
        animationFrameId = window.requestAnimationFrame(updateBg);
      };
      updateBg();
      const themeObserver = new MutationObserver(scheduleBgUpdate);
      themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"]
      });
      const buttonObserver = new MutationObserver(scheduleBgUpdate);
      buttonObserver.observe(button, {
        attributes: true
      });
      const syncEvents = [
        "blur",
        "focus",
        "pointerenter",
        "pointerleave"
      ];
      for (const eventName of syncEvents) {
        button.addEventListener(eventName, scheduleBgUpdate);
      }
      return () => {
        if (animationFrameId) {
          window.cancelAnimationFrame(animationFrameId);
        }
        themeObserver.disconnect();
        buttonObserver.disconnect();
        for (const eventName of syncEvents) {
          button.removeEventListener(eventName, scheduleBgUpdate);
        }
      };
    }, [pulseColor]);
    return /* @__PURE__ */ jsxs(
      "button",
      {
        ref: innerRef,
        className: cn(
          "bg-primary text-primary-foreground relative flex cursor-pointer items-center justify-center rounded-lg px-4 py-2 text-center",
          className
        ),
        style: {
          ...pulseColor && { "--pulse-color": pulseColor },
          "--duration": duration,
          "--distance": distance
        },
        ...props,
        children: [
          /* @__PURE__ */ jsx("span", { className: "relative z-10", children }),
          /* @__PURE__ */ jsx(
            "span",
            {
              "aria-hidden": "true",
              className: cn(
                "pointer-events-none absolute inset-0 rounded-[inherit] bg-inherit",
                variant === "pulse" ? "animate-pulse" : "animate-pulse-ripple"
              )
            }
          )
        ]
      }
    );
  }
);
PulsatingButton.displayName = "PulsatingButton";

// entry.jsx
import React3 from "react";

// registry:pulsating-button.tsx
import React2, { useImperativeHandle as useImperativeHandle2, useLayoutEffect as useLayoutEffect2, useRef as useRef2 } from "react";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var PulsatingButton2 = React2.forwardRef(
  ({
    className,
    children,
    pulseColor,
    duration = "1.5s",
    distance = "8px",
    variant = "pulse",
    ...props
  }, ref) => {
    const innerRef = useRef2(null);
    useImperativeHandle2(ref, () => innerRef.current);
    useLayoutEffect2(() => {
      const button = innerRef.current;
      if (!button) return;
      if (pulseColor) {
        button.style.removeProperty("--bg");
        return;
      }
      let animationFrameId = 0;
      let currentBg = "";
      const updateBg = () => {
        animationFrameId = 0;
        const nextBg = getComputedStyle(button).backgroundColor;
        if (nextBg === currentBg) return;
        currentBg = nextBg;
        button.style.setProperty("--bg", nextBg);
      };
      const scheduleBgUpdate = () => {
        if (animationFrameId) return;
        animationFrameId = window.requestAnimationFrame(updateBg);
      };
      updateBg();
      const themeObserver = new MutationObserver(scheduleBgUpdate);
      themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"]
      });
      const buttonObserver = new MutationObserver(scheduleBgUpdate);
      buttonObserver.observe(button, {
        attributes: true
      });
      const syncEvents = [
        "blur",
        "focus",
        "pointerenter",
        "pointerleave"
      ];
      for (const eventName of syncEvents) {
        button.addEventListener(eventName, scheduleBgUpdate);
      }
      return () => {
        if (animationFrameId) {
          window.cancelAnimationFrame(animationFrameId);
        }
        themeObserver.disconnect();
        buttonObserver.disconnect();
        for (const eventName of syncEvents) {
          button.removeEventListener(eventName, scheduleBgUpdate);
        }
      };
    }, [pulseColor]);
    return /* @__PURE__ */ jsxs2(
      "button",
      {
        ref: innerRef,
        className: cn(
          "bg-primary text-primary-foreground relative flex cursor-pointer items-center justify-center rounded-lg px-4 py-2 text-center",
          className
        ),
        style: {
          ...pulseColor && { "--pulse-color": pulseColor },
          "--duration": duration,
          "--distance": distance
        },
        ...props,
        children: [
          /* @__PURE__ */ jsx2("span", { className: "relative z-10", children }),
          /* @__PURE__ */ jsx2(
            "span",
            {
              "aria-hidden": "true",
              className: cn(
                "pointer-events-none absolute inset-0 rounded-[inherit] bg-inherit",
                variant === "pulse" ? "animate-pulse" : "animate-pulse-ripple"
              )
            }
          )
        ]
      }
    );
  }
);
PulsatingButton2.displayName = "PulsatingButton";

// registry:components/ui/pulsating-button-demo.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
function PulsatingButtonDemo() {
  return /* @__PURE__ */ jsx3(PulsatingButton2, { children: "Join Affiliate Program" });
}

// entry.jsx
import { jsx as jsx4 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx4("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx4("div", { className: "vendor-content", children: /* @__PURE__ */ jsx4(PulsatingButtonDemo, {}) }) });
}
export {
  PulsatingButton,
  Component as default
};

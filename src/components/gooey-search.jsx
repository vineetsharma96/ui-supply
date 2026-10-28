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
// Adapted from https://www.vengenceui.com/components/gooey-search
// Copyright (c) 2025-2026 Ashutoshx7. See licenses/vengeance.txt for usage terms.
// registry:components/ui/gooey-search.tsx
import { useState, useRef, useEffect, useMemo, useId } from "react";
import { AnimatePresence, motion } from "motion/react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/gooey-search.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function detectUnsupportedBrowser() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent.toLowerCase();
  const isSafari = ua.includes("safari") && !ua.includes("chrome") && !ua.includes("chromium") && !ua.includes("android") && !ua.includes("firefox");
  return isSafari || ua.includes("crios");
}
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}
var buttonMotionVariants = {
  step1: { x: 0, width: 100 },
  step2: { x: -30, width: 180 }
};
var iconMotionVariants = {
  hidden: { x: -50, opacity: 0 },
  visible: { x: 16, opacity: 1 }
};
var getResultVariants = (index, unsupported) => ({
  initial: { y: 0, scale: 0.3, filter: unsupported ? "none" : "blur(10px)" },
  animate: { y: (index + 1) * 50, scale: 1, filter: "blur(0px)" },
  exit: { y: unsupported ? 0 : -4, scale: 0.8 }
});
var getResultTransition = (index) => ({
  duration: 0.75,
  delay: index * 0.12,
  type: "spring",
  bounce: 0.35,
  filter: { ease: "easeInOut" }
});
function SearchSvgIcon({ isUnsupported }) {
  return /* @__PURE__ */ jsx(
    motion.svg,
    {
      initial: { opacity: 0, scale: 0.8, x: -4, filter: isUnsupported ? "none" : "blur(5px)" },
      animate: { opacity: 1, scale: 1, x: 0, filter: "blur(0px)" },
      exit: { opacity: 0, scale: 0.8, x: -4, filter: isUnsupported ? "none" : "blur(5px)" },
      transition: { delay: 0.1, duration: 1, type: "spring", bounce: 0.15 },
      width: "15",
      height: "15",
      viewBox: "0 0 15 15",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: /* @__PURE__ */ jsx(
        "path",
        {
          d: "M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z",
          fillRule: "evenodd",
          clipRule: "evenodd",
          fill: "currentColor"
        }
      )
    }
  );
}
function LoadingSvgIcon() {
  const lines = [
    [128, 32, 128, 64],
    [195.88, 60.12, 173.25, 82.75],
    [224, 128, 192, 128],
    [195.88, 195.88, 173.25, 173.25],
    [128, 224, 128, 192],
    [60.12, 195.88, 82.75, 173.25],
    [32, 128, 64, 128],
    [60.12, 60.12, 82.75, 82.75]
  ];
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      className: "gooey-search-loading",
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 256 256",
      "aria-label": "Loading",
      role: "status",
      style: { width: 20, height: 20 },
      children: [
        /* @__PURE__ */ jsx("rect", { width: "256", height: "256", fill: "none" }),
        lines.map(([x1, y1, x2, y2], i) => /* @__PURE__ */ jsx(
          "line",
          {
            x1,
            y1,
            x2,
            y2,
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: 16
          },
          i
        ))
      ]
    }
  );
}
function InfoSvgIcon({ index }) {
  return /* @__PURE__ */ jsx(
    motion.svg,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { delay: index * 0.12 + 0.3 },
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 15 15",
      fill: "none",
      "aria-hidden": "true",
      style: { width: 18, height: 18, position: "relative", top: 2, flexShrink: 0 },
      children: /* @__PURE__ */ jsx(
        "path",
        {
          d: "M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM8.24992 4.49999C8.24992 4.9142 7.91413 5.24999 7.49992 5.24999C7.08571 5.24999 6.74992 4.9142 6.74992 4.49999C6.74992 4.08577 7.08571 3.74999 7.49992 3.74999C7.91413 3.74999 8.24992 4.08577 8.24992 4.49999ZM6.00003 5.99999H6.50003H7.50003C7.77618 5.99999 8.00003 6.22384 8.00003 6.49999V9.99999H8.50003H9.00003V11H8.50003H7.50003H6.50003H6.00003V9.99999H6.50003H7.00003V6.99999H6.50003H6.00003V5.99999Z",
          fill: "currentColor",
          fillRule: "evenodd",
          clipRule: "evenodd"
        }
      )
    }
  );
}
function GooeySearch({
  items = [],
  onSearch,
  placeholder = "Type to search...",
  buttonLabel = "Search",
  onSelect,
  className,
  debounceMs = 500,
  maxResults = 5
}) {
  const uid = useId().replace(/:/g, "_");
  const filterId = `gooey-search-${uid}`;
  const inputRef = useRef(null);
  const [step, setStep] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isUnsupported = useMemo(() => detectUnsupportedBrowser(), []);
  const debouncedQuery = useDebounce(searchText, debounceMs);
  useEffect(() => {
    if (step === 2) inputRef.current?.focus();
  }, [step]);
  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      if (!debouncedQuery) {
        setResults([]);
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      try {
        let data;
        if (onSearch) {
          data = await onSearch(debouncedQuery);
        } else {
          await new Promise((r) => setTimeout(r, 300));
          data = items.filter(
            (item) => item.toLowerCase().includes(debouncedQuery.trim().toLowerCase())
          );
        }
        if (!cancelled) setResults(data.slice(0, maxResults));
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [debouncedQuery, items, onSearch, maxResults]);
  const btnPadding = isUnsupported ? "5px 10px" : "10px 20px";
  const resultPadding = isUnsupported ? "7.5px 10px" : "12.5px 20px";
  return /* @__PURE__ */ jsxs("div", { className: cn("relative inline-flex items-center justify-center", className), children: [
    /* @__PURE__ */ jsx("style", { children: `
        .gooey-search-loading {
          animation: gooeySearchSpin 0.5s linear infinite;
          transform-origin: center center;
        }
        @keyframes gooeySearchSpin { to { transform: rotate(180deg); } }
        .gooey-search-input::placeholder { color: var(--background); opacity: 0.55; }
      ` }),
    /* @__PURE__ */ jsx("svg", { "aria-hidden": "true", style: { position: "absolute", width: 0, height: 0, overflow: "hidden" }, children: /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("filter", { id: filterId, children: [
      /* @__PURE__ */ jsx("feGaussianBlur", { in: "SourceGraphic", stdDeviation: "5", result: "blur" }),
      /* @__PURE__ */ jsx(
        "feColorMatrix",
        {
          in: "blur",
          type: "matrix",
          values: "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -15",
          result: "goo"
        }
      ),
      /* @__PURE__ */ jsx("feComposite", { in: "SourceGraphic", in2: "goo", operator: "atop" })
    ] }) }) }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        style: {
          filter: isUnsupported ? "none" : `url(#${filterId})`,
          cursor: "pointer",
          maxWidth: "max-content",
          position: "relative"
        },
        children: [
          /* @__PURE__ */ jsx(AnimatePresence, { mode: "popLayout", children: /* @__PURE__ */ jsx(
            motion.div,
            {
              role: "listbox",
              "aria-label": "Search results",
              style: { position: "relative", zIndex: -1 },
              exit: { scale: 0, opacity: 0 },
              transition: { delay: isUnsupported ? 0.5 : 1.25, duration: 0.5 },
              children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "popLayout", children: results.map((item, index) => /* @__PURE__ */ jsx(
                motion.div,
                {
                  role: "option",
                  tabIndex: 0,
                  onClick: () => onSelect?.(item),
                  onKeyDown: (e) => e.key === "Enter" && onSelect?.(item),
                  whileHover: { scale: 1.02, transition: { duration: 0.2 } },
                  variants: getResultVariants(index, isUnsupported),
                  initial: "initial",
                  animate: "animate",
                  exit: "exit",
                  transition: getResultTransition(index),
                  style: {
                    backgroundColor: "var(--foreground)",
                    borderRadius: 40,
                    padding: resultPadding,
                    width: "100%",
                    color: "var(--background)",
                    position: "absolute",
                    left: isUnsupported ? 0 : -30,
                    fontSize: 14,
                    cursor: "pointer"
                  },
                  children: /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: 4 }, children: [
                    /* @__PURE__ */ jsx(InfoSvgIcon, { index }),
                    /* @__PURE__ */ jsx(
                      motion.span,
                      {
                        initial: { opacity: 0 },
                        animate: { opacity: 1 },
                        transition: { delay: index * 0.12 + 0.3 },
                        style: { position: "relative", top: -0.35 },
                        children: item
                      }
                    )
                  ] })
                },
                item
              )) })
            },
            "results-wrapper"
          ) }),
          /* @__PURE__ */ jsx(
            motion.div,
            {
              variants: buttonMotionVariants,
              initial: "step1",
              animate: step === 1 ? "step1" : "step2",
              transition: { duration: 0.75, type: "spring", bounce: 0.15 },
              onClick: () => step === 1 && setStep(2),
              whileHover: { scale: step === 2 ? 1 : 1.05 },
              whileTap: { scale: 0.95 },
              role: step === 1 ? "button" : void 0,
              "aria-label": step === 1 ? "Open search" : void 0,
              style: {
                backgroundColor: "var(--foreground)",
                color: "var(--background)",
                cursor: "pointer",
                letterSpacing: -0.5,
                outline: "none",
                border: "none",
                borderRadius: 9999,
                padding: btnPadding
              },
              children: step === 1 ? /* @__PURE__ */ jsx(
                "span",
                {
                  style: {
                    pointerEvents: "none",
                    textAlign: "center",
                    position: "relative",
                    left: 4,
                    color: "var(--background)",
                    opacity: 0.72,
                    fontSize: 14,
                    display: "block"
                  },
                  children: buttonLabel
                }
              ) : /* @__PURE__ */ jsx(
                "input",
                {
                  ref: inputRef,
                  type: "text",
                  className: "gooey-search-input",
                  placeholder,
                  "aria-label": "Search input",
                  onChange: (e) => setSearchText(e.target.value),
                  style: {
                    width: "100%",
                    backgroundColor: "transparent",
                    outline: "none",
                    border: "none",
                    color: "var(--background)",
                    fontSize: 14
                  }
                }
              )
            }
          ),
          /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: step === 2 && /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: "hidden",
              animate: "visible",
              exit: "hidden",
              variants: iconMotionVariants,
              transition: { delay: 0.1, duration: 0.85, type: "spring", bounce: 0.15 },
              style: {
                position: "absolute",
                backgroundColor: "var(--foreground)",
                width: isUnsupported ? 36 : 46,
                height: isUnsupported ? 36 : 46,
                right: -5,
                top: -1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 9999,
                color: "var(--background)"
              },
              children: isLoading ? /* @__PURE__ */ jsx(LoadingSvgIcon, {}) : /* @__PURE__ */ jsx(SearchSvgIcon, { isUnsupported })
            },
            "icon-bubble"
          ) })
        ]
      }
    )
  ] });
}

// entry.jsx
import React from "react";

// registry:components/docs/gooey-search-demo.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var DEMO_ITEMS = [
  "React",
  "Vue",
  "Svelte",
  "Next.js",
  "Gatsby",
  "Angular",
  "Solid",
  "Astro",
  "Remix",
  "Nuxt",
  "TypeScript",
  "Tailwind CSS"
];
function GooeySearchDemo() {
  return /* @__PURE__ */ jsx2("div", { className: "relative flex items-center justify-center w-full min-h-[16rem] py-16", children: /* @__PURE__ */ jsx2(
    GooeySearch,
    {
      items: DEMO_ITEMS,
      placeholder: "Search frameworks...",
      buttonLabel: "Search",
      maxResults: 4,
      onSelect: (item) => console.log("Selected:", item)
    }
  ) });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(GooeySearchDemo, {}) }) });
}
export {
  GooeySearch,
  Component as default
};

// Adapted from https://ui.aceternity.com/components/world-map
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:components/ui/world-map.tsx
import { useRef } from "react";
import { motion } from "motion/react";
import DottedMap from "dotted-map";

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

// registry:components/ui/world-map.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function WorldMap({
  dots = [],
  lineColor = "#0ea5e9"
}) {
  const svgRef = useRef(null);
  const map = new DottedMap({ height: 100, grid: "diagonal" });
  const { theme } = useTheme();
  const svgMap = map.getSVG({
    radius: 0.22,
    color: theme === "dark" ? "#FFFFFF40" : "#00000040",
    shape: "circle",
    backgroundColor: theme === "dark" ? "black" : "white"
  });
  const projectPoint = (lat, lng) => {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  };
  const createCurvedPath = (start, end) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };
  return /* @__PURE__ */ jsxs("div", { className: "w-full aspect-[2/1] dark:bg-black bg-white rounded-lg  relative font-sans", children: [
    /* @__PURE__ */ jsx(
      "img",
      {
        src: `data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`,
        className: "h-full w-full [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] pointer-events-none select-none",
        alt: "world map",
        height: "495",
        width: "1056",
        draggable: false
      }
    ),
    /* @__PURE__ */ jsxs(
      "svg",
      {
        ref: svgRef,
        viewBox: "0 0 800 400",
        className: "w-full h-full absolute inset-0 pointer-events-none select-none",
        children: [
          dots.map((dot, i) => {
            const startPoint = projectPoint(dot.start.lat, dot.start.lng);
            const endPoint = projectPoint(dot.end.lat, dot.end.lng);
            return /* @__PURE__ */ jsx("g", { children: /* @__PURE__ */ jsx(
              motion.path,
              {
                d: createCurvedPath(startPoint, endPoint),
                fill: "none",
                stroke: "url(#path-gradient)",
                strokeWidth: "1",
                initial: {
                  pathLength: 0
                },
                animate: {
                  pathLength: 1
                },
                transition: {
                  duration: 1,
                  delay: 0.5 * i,
                  ease: "easeOut"
                }
              },
              `start-upper-${i}`
            ) }, `path-group-${i}`);
          }),
          /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", { id: "path-gradient", x1: "0%", y1: "0%", x2: "100%", y2: "0%", children: [
            /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "white", stopOpacity: "0" }),
            /* @__PURE__ */ jsx("stop", { offset: "5%", stopColor: lineColor, stopOpacity: "1" }),
            /* @__PURE__ */ jsx("stop", { offset: "95%", stopColor: lineColor, stopOpacity: "1" }),
            /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "white", stopOpacity: "0" })
          ] }) }),
          dots.map((dot, i) => /* @__PURE__ */ jsxs("g", { children: [
            /* @__PURE__ */ jsxs("g", { children: [
              /* @__PURE__ */ jsx(
                "circle",
                {
                  cx: projectPoint(dot.start.lat, dot.start.lng).x,
                  cy: projectPoint(dot.start.lat, dot.start.lng).y,
                  r: "2",
                  fill: lineColor
                }
              ),
              /* @__PURE__ */ jsxs(
                "circle",
                {
                  cx: projectPoint(dot.start.lat, dot.start.lng).x,
                  cy: projectPoint(dot.start.lat, dot.start.lng).y,
                  r: "2",
                  fill: lineColor,
                  opacity: "0.5",
                  children: [
                    /* @__PURE__ */ jsx(
                      "animate",
                      {
                        attributeName: "r",
                        from: "2",
                        to: "8",
                        dur: "1.5s",
                        begin: "0s",
                        repeatCount: "indefinite"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "animate",
                      {
                        attributeName: "opacity",
                        from: "0.5",
                        to: "0",
                        dur: "1.5s",
                        begin: "0s",
                        repeatCount: "indefinite"
                      }
                    )
                  ]
                }
              )
            ] }, `start-${i}`),
            /* @__PURE__ */ jsxs("g", { children: [
              /* @__PURE__ */ jsx(
                "circle",
                {
                  cx: projectPoint(dot.end.lat, dot.end.lng).x,
                  cy: projectPoint(dot.end.lat, dot.end.lng).y,
                  r: "2",
                  fill: lineColor
                }
              ),
              /* @__PURE__ */ jsxs(
                "circle",
                {
                  cx: projectPoint(dot.end.lat, dot.end.lng).x,
                  cy: projectPoint(dot.end.lat, dot.end.lng).y,
                  r: "2",
                  fill: lineColor,
                  opacity: "0.5",
                  children: [
                    /* @__PURE__ */ jsx(
                      "animate",
                      {
                        attributeName: "r",
                        from: "2",
                        to: "8",
                        dur: "1.5s",
                        begin: "0s",
                        repeatCount: "indefinite"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "animate",
                      {
                        attributeName: "opacity",
                        from: "0.5",
                        to: "0",
                        dur: "1.5s",
                        begin: "0s",
                        repeatCount: "indefinite"
                      }
                    )
                  ]
                }
              )
            ] }, `end-${i}`)
          ] }, `points-group-${i}`))
        ]
      }
    )
  ] });
}

// entry.jsx
import React from "react";

// registry:components/world-map-demo.tsx
import { motion as motion2 } from "motion/react";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function WorldMapDemo() {
  return /* @__PURE__ */ jsxs2("div", { className: " py-40 dark:bg-black bg-white w-full", children: [
    /* @__PURE__ */ jsxs2("div", { className: "max-w-7xl mx-auto text-center", children: [
      /* @__PURE__ */ jsxs2("p", { className: "font-bold text-xl md:text-4xl dark:text-white text-black", children: [
        "Remote",
        " ",
        /* @__PURE__ */ jsx2("span", { className: "text-neutral-400", children: "Connectivity".split("").map((word, idx) => /* @__PURE__ */ jsx2(
          motion2.span,
          {
            className: "inline-block",
            initial: { x: -10, opacity: 0 },
            animate: { x: 0, opacity: 1 },
            transition: { duration: 0.5, delay: idx * 0.04 },
            children: word
          },
          idx
        )) })
      ] }),
      /* @__PURE__ */ jsx2("p", { className: "text-sm md:text-lg text-neutral-500 max-w-2xl mx-auto py-4", children: "Break free from traditional boundaries. Work from anywhere, at the comfort of your own studio apartment. Perfect for Nomads and Travellers." })
    ] }),
    /* @__PURE__ */ jsx2(
      WorldMap,
      {
        dots: [
          {
            start: {
              lat: 64.2008,
              lng: -149.4937
            },
            // Alaska (Fairbanks)
            end: {
              lat: 34.0522,
              lng: -118.2437
            }
            // Los Angeles
          },
          {
            start: { lat: 64.2008, lng: -149.4937 },
            // Alaska (Fairbanks)
            end: { lat: -15.7975, lng: -47.8919 }
            // Brazil (Brasília)
          },
          {
            start: { lat: -15.7975, lng: -47.8919 },
            // Brazil (Brasília)
            end: { lat: 38.7223, lng: -9.1393 }
            // Lisbon
          },
          {
            start: { lat: 51.5074, lng: -0.1278 },
            // London
            end: { lat: 28.6139, lng: 77.209 }
            // New Delhi
          },
          {
            start: { lat: 28.6139, lng: 77.209 },
            // New Delhi
            end: { lat: 43.1332, lng: 131.9113 }
            // Vladivostok
          },
          {
            start: { lat: 28.6139, lng: 77.209 },
            // New Delhi
            end: { lat: -1.2921, lng: 36.8219 }
            // Nairobi
          }
        ]
      }
    )
  ] });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(WorldMapDemo, {}) }) });
}
export {
  Component as default
};

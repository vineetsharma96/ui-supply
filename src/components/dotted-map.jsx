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
// Adapted from https://magicui.design/docs/components/dotted-map
// Copyright (c) Magic UI. See licenses/magic.txt for usage terms.
// registry:components/ui/dotted-map.tsx
import * as React from "react";
import { createMap } from "svg-dotted-map";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/dotted-map.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function DottedMap({
  width = 150,
  height = 75,
  mapSamples = 5e3,
  markers: markers2 = [],
  dotColor = "currentColor",
  markerColor = "#FF6900",
  dotRadius = 0.2,
  stagger = true,
  pulse = false,
  renderMarkerOverlay,
  className,
  style,
  ...svgProps
}) {
  const { points, addMarkers } = createMap({
    width,
    height,
    mapSamples
  });
  const processedMarkers = addMarkers(markers2);
  const { xStep, yToRowIndex } = React.useMemo(() => {
    const sorted = [...points].sort((a, b) => a.y - b.y || a.x - b.x);
    const rowMap = /* @__PURE__ */ new Map();
    let step = 0;
    let prevY = Number.NaN;
    let prevXInRow = Number.NaN;
    for (const p of sorted) {
      if (p.y !== prevY) {
        prevY = p.y;
        prevXInRow = Number.NaN;
        if (!rowMap.has(p.y)) rowMap.set(p.y, rowMap.size);
      }
      if (!Number.isNaN(prevXInRow)) {
        const delta = p.x - prevXInRow;
        if (delta > 0) step = step === 0 ? delta : Math.min(step, delta);
      }
      prevXInRow = p.x;
    }
    return { xStep: step || 1, yToRowIndex: rowMap };
  }, [points]);
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      viewBox: `0 0 ${width} ${height}`,
      className: cn("text-gray-500 dark:text-gray-500", className),
      style: { width: "100%", height: "100%", ...style },
      ...svgProps,
      children: [
        points.map((point, index) => {
          const rowIndex = yToRowIndex.get(point.y) ?? 0;
          const offsetX = stagger && rowIndex % 2 === 1 ? xStep / 2 : 0;
          return /* @__PURE__ */ jsx(
            "circle",
            {
              cx: point.x + offsetX,
              cy: point.y,
              r: dotRadius,
              fill: dotColor
            },
            `${point.x}-${point.y}-${index}`
          );
        }),
        processedMarkers.map((marker, index) => {
          const rowIndex = yToRowIndex.get(marker.y) ?? 0;
          const offsetX = stagger && rowIndex % 2 === 1 ? xStep / 2 : 0;
          const x = marker.x + offsetX;
          const y = marker.y;
          const r = marker.size ?? dotRadius;
          const shouldPulse = pulse ? marker.pulse !== false : marker.pulse === true;
          const pulseTo = r * 2.8;
          return /* @__PURE__ */ jsxs("g", { children: [
            /* @__PURE__ */ jsx("circle", { cx: x, cy: y, r, fill: markerColor }),
            shouldPulse ? /* @__PURE__ */ jsxs("g", { pointerEvents: "none", children: [
              /* @__PURE__ */ jsxs(
                "circle",
                {
                  cx: x,
                  cy: y,
                  r,
                  fill: "none",
                  stroke: markerColor,
                  strokeOpacity: 1,
                  strokeWidth: 0.35,
                  children: [
                    /* @__PURE__ */ jsx(
                      "animate",
                      {
                        attributeName: "r",
                        values: `${r};${pulseTo}`,
                        dur: "1.4s",
                        repeatCount: "indefinite"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "animate",
                      {
                        attributeName: "opacity",
                        values: "1;0",
                        dur: "1.4s",
                        repeatCount: "indefinite"
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                "circle",
                {
                  cx: x,
                  cy: y,
                  r,
                  fill: "none",
                  stroke: markerColor,
                  strokeOpacity: 0.9,
                  strokeWidth: 0.3,
                  children: [
                    /* @__PURE__ */ jsx(
                      "animate",
                      {
                        attributeName: "r",
                        values: `${r};${pulseTo}`,
                        dur: "1.4s",
                        begin: "0.7s",
                        repeatCount: "indefinite"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "animate",
                      {
                        attributeName: "opacity",
                        values: "0.9;0",
                        dur: "1.4s",
                        begin: "0.7s",
                        repeatCount: "indefinite"
                      }
                    )
                  ]
                }
              )
            ] }) : null,
            renderMarkerOverlay?.({
              marker: { ...marker, x, y },
              index,
              x,
              y,
              r
            })
          ] }, `${marker.x}-${marker.y}-${index}`);
        })
      ]
    }
  );
}

// entry.jsx
import React4 from "react";

// registry:components/ui/dotted-map-demo.tsx
import * as React3 from "react";

// registry:dotted-map.tsx
import * as React2 from "react";
import { createMap as createMap2 } from "svg-dotted-map";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function DottedMap2({
  width = 150,
  height = 75,
  mapSamples = 5e3,
  markers: markers2 = [],
  dotColor = "currentColor",
  markerColor = "#FF6900",
  dotRadius = 0.2,
  stagger = true,
  pulse = false,
  renderMarkerOverlay,
  className,
  style,
  ...svgProps
}) {
  const { points, addMarkers } = createMap2({
    width,
    height,
    mapSamples
  });
  const processedMarkers = addMarkers(markers2);
  const { xStep, yToRowIndex } = React2.useMemo(() => {
    const sorted = [...points].sort((a, b) => a.y - b.y || a.x - b.x);
    const rowMap = /* @__PURE__ */ new Map();
    let step = 0;
    let prevY = Number.NaN;
    let prevXInRow = Number.NaN;
    for (const p of sorted) {
      if (p.y !== prevY) {
        prevY = p.y;
        prevXInRow = Number.NaN;
        if (!rowMap.has(p.y)) rowMap.set(p.y, rowMap.size);
      }
      if (!Number.isNaN(prevXInRow)) {
        const delta = p.x - prevXInRow;
        if (delta > 0) step = step === 0 ? delta : Math.min(step, delta);
      }
      prevXInRow = p.x;
    }
    return { xStep: step || 1, yToRowIndex: rowMap };
  }, [points]);
  return /* @__PURE__ */ jsxs2(
    "svg",
    {
      viewBox: `0 0 ${width} ${height}`,
      className: cn("text-gray-500 dark:text-gray-500", className),
      style: { width: "100%", height: "100%", ...style },
      ...svgProps,
      children: [
        points.map((point, index) => {
          const rowIndex = yToRowIndex.get(point.y) ?? 0;
          const offsetX = stagger && rowIndex % 2 === 1 ? xStep / 2 : 0;
          return /* @__PURE__ */ jsx2(
            "circle",
            {
              cx: point.x + offsetX,
              cy: point.y,
              r: dotRadius,
              fill: dotColor
            },
            `${point.x}-${point.y}-${index}`
          );
        }),
        processedMarkers.map((marker, index) => {
          const rowIndex = yToRowIndex.get(marker.y) ?? 0;
          const offsetX = stagger && rowIndex % 2 === 1 ? xStep / 2 : 0;
          const x = marker.x + offsetX;
          const y = marker.y;
          const r = marker.size ?? dotRadius;
          const shouldPulse = pulse ? marker.pulse !== false : marker.pulse === true;
          const pulseTo = r * 2.8;
          return /* @__PURE__ */ jsxs2("g", { children: [
            /* @__PURE__ */ jsx2("circle", { cx: x, cy: y, r, fill: markerColor }),
            shouldPulse ? /* @__PURE__ */ jsxs2("g", { pointerEvents: "none", children: [
              /* @__PURE__ */ jsxs2(
                "circle",
                {
                  cx: x,
                  cy: y,
                  r,
                  fill: "none",
                  stroke: markerColor,
                  strokeOpacity: 1,
                  strokeWidth: 0.35,
                  children: [
                    /* @__PURE__ */ jsx2(
                      "animate",
                      {
                        attributeName: "r",
                        values: `${r};${pulseTo}`,
                        dur: "1.4s",
                        repeatCount: "indefinite"
                      }
                    ),
                    /* @__PURE__ */ jsx2(
                      "animate",
                      {
                        attributeName: "opacity",
                        values: "1;0",
                        dur: "1.4s",
                        repeatCount: "indefinite"
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxs2(
                "circle",
                {
                  cx: x,
                  cy: y,
                  r,
                  fill: "none",
                  stroke: markerColor,
                  strokeOpacity: 0.9,
                  strokeWidth: 0.3,
                  children: [
                    /* @__PURE__ */ jsx2(
                      "animate",
                      {
                        attributeName: "r",
                        values: `${r};${pulseTo}`,
                        dur: "1.4s",
                        begin: "0.7s",
                        repeatCount: "indefinite"
                      }
                    ),
                    /* @__PURE__ */ jsx2(
                      "animate",
                      {
                        attributeName: "opacity",
                        values: "0.9;0",
                        dur: "1.4s",
                        begin: "0.7s",
                        repeatCount: "indefinite"
                      }
                    )
                  ]
                }
              )
            ] }) : null,
            renderMarkerOverlay?.({
              marker: { ...marker, x, y },
              index,
              x,
              y,
              r
            })
          ] }, `${marker.x}-${marker.y}-${index}`);
        })
      ]
    }
  );
}

// registry:components/ui/dotted-map-demo.tsx
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
var markers = [
  {
    lat: 37.5665,
    lng: 126.978,
    size: 2.8,
    overlay: { countryCode: "kr", label: "Seoul" }
  },
  {
    lat: 40.7128,
    lng: -74.006,
    size: 2.8,
    overlay: { countryCode: "us", label: "NYC" }
  }
];
function Component() {
  const id = React3.useId();
  return /* @__PURE__ */ jsxs3("div", { className: "relative h-[500px] w-full overflow-hidden rounded-lg border", children: [
    /* @__PURE__ */ jsx3("div", { className: "to-background absolute inset-0 bg-radial from-transparent to-200%" }),
    /* @__PURE__ */ jsx3(
      DottedMap2,
      {
        markers,
        renderMarkerOverlay: ({ marker, x, y, r, index }) => {
          const { countryCode, label } = marker.overlay;
          const href = `https://flagcdn.com/w80/${countryCode}.webp`;
          const clipId = `${id}-flag-clip-${index}`.replace(/:/g, "-");
          const imgR = r * 0.75;
          const fontSize = r * 0.9;
          const pillH = r * 1.5;
          const pillW = label.length * (fontSize * 0.62) + r * 1.4;
          const pillX = x + r + r * 0.6;
          const pillY = y - pillH / 2;
          return /* @__PURE__ */ jsxs3("g", { style: { pointerEvents: "none" }, children: [
            /* @__PURE__ */ jsx3("clipPath", { id: clipId, children: /* @__PURE__ */ jsx3("circle", { cx: x, cy: y, r: imgR }) }),
            /* @__PURE__ */ jsx3(
              "image",
              {
                href,
                x: x - imgR,
                y: y - imgR,
                width: imgR * 2,
                height: imgR * 2,
                preserveAspectRatio: "xMidYMid slice",
                clipPath: `url(#${clipId})`
              }
            ),
            /* @__PURE__ */ jsx3(
              "rect",
              {
                x: pillX,
                y: pillY,
                width: pillW,
                height: pillH,
                rx: pillH / 2,
                fill: "rgba(0,0,0,0.55)"
              }
            ),
            /* @__PURE__ */ jsx3(
              "text",
              {
                x: pillX + r * 0.7,
                y: y + fontSize * 0.35,
                fontSize,
                fill: "white",
                children: label
              }
            )
          ] });
        }
      }
    )
  ] });
}

// entry.jsx
import { jsx as jsx4 } from "react/jsx-runtime";
function Component2() {
  return /* @__PURE__ */ jsx4("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx4("div", { className: "vendor-content", children: /* @__PURE__ */ jsx4(Component, {}) }) });
}
export {
  DottedMap,
  Component2 as default
};

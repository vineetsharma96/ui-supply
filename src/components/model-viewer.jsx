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
// Adapted from https://www.vengenceui.com/components/model-viewer
// Copyright (c) 2025-2026 Ashutoshx7. See licenses/vengeance.txt for usage terms.
// registry:components/ui/model-viewer.tsx
import { Suspense, useRef } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Center } from "@react-three/drei";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/model-viewer.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var STEP = Math.PI / 12;
function Model({ url }) {
  const { scene } = useGLTF(url);
  return /* @__PURE__ */ jsx(Center, { children: /* @__PURE__ */ jsx("primitive", { object: scene }) });
}
function ModelViewer({ modelUrl = "https://www.vengenceui.com/models/sample.glb", className }) {
  const controlsRef = useRef(null);
  function rotate(dTheta, dPhi) {
    const controls = controlsRef.current;
    if (!controls) return;
    const offset = controls.object.position.clone().sub(controls.target);
    const spherical = new THREE.Spherical().setFromVector3(offset);
    spherical.theta += dTheta;
    spherical.phi = THREE.MathUtils.clamp(spherical.phi + dPhi, 0.1, Math.PI - 0.1);
    offset.setFromSpherical(spherical);
    controls.object.position.copy(controls.target).add(offset);
    controls.update();
  }
  function handleKeyDown(e) {
    switch (e.key) {
      case "ArrowLeft":
        rotate(-STEP, 0);
        break;
      case "ArrowRight":
        rotate(STEP, 0);
        break;
      case "ArrowUp":
        rotate(0, -STEP);
        break;
      case "ArrowDown":
        rotate(0, STEP);
        break;
      default:
        return;
    }
    e.preventDefault();
  }
  return /* @__PURE__ */ jsx(
    "div",
    {
      tabIndex: 0,
      onKeyDown: handleKeyDown,
      "aria-label": "3D model viewer. Use arrow keys to rotate.",
      className: cn("h-[400px] w-full outline-none focus-visible:ring-2 focus-visible:ring-white/40", className),
      children: /* @__PURE__ */ jsxs(Canvas, { camera: { position: [3, 2, 5], fov: 45 }, children: [
        /* @__PURE__ */ jsx("ambientLight", { intensity: 1 }),
        /* @__PURE__ */ jsx("directionalLight", { position: [5, 5, 5] }),
        /* @__PURE__ */ jsx(Suspense, { fallback: null, children: /* @__PURE__ */ jsx(Model, { url: modelUrl }) }),
        /* @__PURE__ */ jsx(OrbitControls, { ref: controlsRef })
      ] })
    }
  );
}

// entry.jsx
import React from "react";

// registry:components/docs/model-viewer.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
function ModelViewerDemo() {
  return /* @__PURE__ */ jsx2("div", { className: "relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg", children: /* @__PURE__ */ jsx2(ModelViewer, { className: "h-full" }) });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(ModelViewerDemo, {}) }) });
}
export {
  ModelViewer,
  Component as default
};

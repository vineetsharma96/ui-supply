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
// Adapted from https://www.vengenceui.com/components/liquid-ocean
// Copyright (c) 2025-2026 Ashutoshx7. See licenses/vengeance.txt for usage terms.
// registry:components/ui/liquid-ocean.tsx
import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib.js";
import * as THREE from "three";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/liquid-ocean.tsx
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
if (typeof window !== "undefined") {
  RectAreaLightUniformsLib.init();
}
var DEFAULT_THEME = {
  background: 0,
  gridColor: 3355443,
  accentColor: 15730057
  // The original pinkish color
};
function OceanMesh({
  geoSize,
  geoFragments,
  waveAmplitude,
  waveSpeed,
  accentColor,
  showWireframe,
  opacity
}) {
  const meshRef = useRef(null);
  const wireRef = useRef(null);
  const { geometry, waves } = useMemo(() => {
    const geo = new THREE.PlaneGeometry(geoSize, geoSize, geoFragments, geoFragments);
    const positionAttribute = geo.getAttribute("position");
    const waveData = [];
    for (let i = 0; i < positionAttribute.count; i++) {
      waveData.push({
        x: positionAttribute.getX(i),
        y: positionAttribute.getY(i),
        z: positionAttribute.getZ(i),
        ang: Math.PI * 2,
        amp: Math.random() * waveAmplitude,
        speed: 0.03 + Math.random() * waveSpeed
      });
    }
    return { geometry: geo, waves: waveData };
  }, [geoSize, geoFragments, waveAmplitude, waveSpeed]);
  useFrame(() => {
    if (!meshRef.current) return;
    const positionAttribute = meshRef.current.geometry.getAttribute("position");
    for (let i = 0; i < positionAttribute.count; i++) {
      const wave = waves[i];
      positionAttribute.setX(i, wave.x + Math.cos(wave.ang) * wave.amp);
      positionAttribute.setY(i, wave.y + Math.sin(wave.ang / 2) * wave.amp);
      positionAttribute.setZ(i, wave.z + Math.cos(wave.ang / 3) * wave.amp);
      wave.ang += wave.speed;
    }
    positionAttribute.needsUpdate = true;
  });
  const wireframeMaterial = useMemo(
    () => new THREE.MeshPhysicalMaterial({
      color: accentColor,
      wireframe: true,
      transparent: false,
      opacity: 1
    }),
    [accentColor]
  );
  const surfaceMaterial = useMemo(
    () => new THREE.MeshPhysicalMaterial({
      color: accentColor,
      transparent: true,
      opacity,
      wireframe: false
    }),
    [accentColor, opacity]
  );
  return /* @__PURE__ */ jsxs("group", { rotation: [-90 * Math.PI / 180, 0, 0], children: [
    /* @__PURE__ */ jsx("mesh", { ref: meshRef, geometry, material: surfaceMaterial, receiveShadow: true }),
    showWireframe && /* @__PURE__ */ jsx("mesh", { ref: wireRef, geometry, material: wireframeMaterial })
  ] });
}
function Boat({ data, color }) {
  const meshRef = useRef(null);
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const time = clock.getElapsedTime() * 3;
    meshRef.current.rotation.z = Math.sin(time / data.vel) * data.amp * Math.PI / 180;
    meshRef.current.rotation.x = Math.cos(time) * data.vel * Math.PI / 180;
    meshRef.current.position.y = Math.sin(time / data.vel) * data.pos;
  });
  return /* @__PURE__ */ jsxs(
    "mesh",
    {
      ref: meshRef,
      position: data.position,
      rotation: [0, data.rotationY, 0],
      scale: data.scale,
      castShadow: true,
      children: [
        /* @__PURE__ */ jsx("boxGeometry", { args: [1, 1, 1] }),
        /* @__PURE__ */ jsx("meshStandardMaterial", { color })
      ]
    }
  );
}
function BoatGroup({ count, spreadRange, color }) {
  const boats = useMemo(() => {
    const items = [];
    for (let i = 0; i < count; i++) {
      const x = -Math.random() * spreadRange + Math.random() * spreadRange;
      const z = -Math.random() * spreadRange + Math.random() * spreadRange;
      const sX = Math.random();
      const sY = 0.5 + Math.random() * 2;
      items.push({
        position: [x, 0, z],
        scale: [sX, sY, sX],
        rotationY: Math.random() * 360 * Math.PI / 180,
        vel: 1 + Math.random() * 4,
        amp: 1 + Math.random() * 6,
        pos: Math.random() * 0.2
      });
    }
    return items;
  }, [count, spreadRange]);
  return /* @__PURE__ */ jsx("group", { children: boats.map((boat, i) => /* @__PURE__ */ jsx(Boat, { data: boat, color }, i)) });
}
function SceneContent({
  backgroundColor,
  gridColor,
  accentColor,
  rotationSpeed,
  showGrid,
  showBoats,
  boatCount,
  boatSpread,
  oceanSize,
  oceanFragments,
  waveAmplitude,
  waveSpeed,
  showWireframe,
  oceanOpacity
}) {
  const { scene, camera } = useThree();
  const rectLightRef = useRef(null);
  const groupRef = useRef(null);
  useEffect(() => {
    scene.fog = new THREE.Fog(backgroundColor, 5, 20);
    scene.background = new THREE.Color(backgroundColor);
  }, [scene, backgroundColor]);
  useFrame(() => {
    camera.lookAt(0, 0, 0);
    if (rectLightRef.current) {
      rectLightRef.current.lookAt(0, 0, 0);
    }
    if (groupRef.current) {
      groupRef.current.rotation.y += rotationSpeed;
    }
  });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("hemisphereLight", { args: [16765907, accentColor, 2] }),
    /* @__PURE__ */ jsx("pointLight", { args: [accentColor, 1], position: [-5, -20, -20] }),
    /* @__PURE__ */ jsx(
      "rectAreaLight",
      {
        ref: rectLightRef,
        args: [accentColor, 20, 3, 3],
        position: [2, 2, -20]
      }
    ),
    /* @__PURE__ */ jsx("pointLight", { args: [accentColor, 0.1], position: [0, 2, -2] }),
    /* @__PURE__ */ jsxs("group", { ref: groupRef, children: [
      showGrid && /* @__PURE__ */ jsx("gridHelper", { args: [20, 20], position: [0, -1, 0] }),
      showBoats && /* @__PURE__ */ jsx(BoatGroup, { count: boatCount, spreadRange: boatSpread, color: accentColor }),
      /* @__PURE__ */ jsx(
        OceanMesh,
        {
          geoSize: oceanSize,
          geoFragments: oceanFragments,
          waveAmplitude,
          waveSpeed,
          accentColor,
          showWireframe,
          opacity: oceanOpacity
        }
      )
    ] })
  ] });
}
function LiquidOcean({
  className,
  // Original colors - DO NOT CHANGE DEFAULTS
  backgroundColor = DEFAULT_THEME.background,
  gridColor = DEFAULT_THEME.gridColor,
  accentColor = DEFAULT_THEME.accentColor,
  // Original settings - DO NOT CHANGE DEFAULTS
  fov = 20,
  rotationSpeed = 1e-3,
  showGrid = true,
  showBoats = true,
  boatCount = 5,
  boatSpread = 5,
  oceanSize = 25,
  oceanFragments = 25,
  waveAmplitude = 0.2,
  waveSpeed = 0.05,
  showWireframe = true,
  oceanOpacity = 0.85,
  children
}) {
  const [isVisible, setIsVisible] = React.useState(false);
  const containerRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);
  return /* @__PURE__ */ jsxs("div", { ref: containerRef, className: cn("relative w-full h-full min-h-[400px] overflow-hidden bg-black cursor-crosshair", className), children: [
    /* @__PURE__ */ jsx(
      Canvas,
      {
        shadows: true,
        dpr: 1,
        frameloop: isVisible ? "always" : "never",
        camera: { position: [0, 2, 10], fov },
        gl: { antialias: false, alpha: false },
        style: { position: "absolute", inset: 0 },
        children: /* @__PURE__ */ jsx(
          SceneContent,
          {
            backgroundColor,
            gridColor,
            accentColor,
            rotationSpeed,
            showGrid,
            showBoats,
            boatCount,
            boatSpread,
            oceanSize,
            oceanFragments: isVisible ? oceanFragments : 5,
            waveAmplitude,
            waveSpeed,
            showWireframe,
            oceanOpacity
          }
        )
      }
    ),
    children && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 pointer-events-none select-none", children })
  ] });
}

// entry.jsx
import React2 from "react";

// registry:components/docs/liquid-ocean.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
function LiquidOceanDemo() {
  return /* @__PURE__ */ jsx2("div", { className: "relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg", children: /* @__PURE__ */ jsx2(LiquidOcean, {}) });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(LiquidOceanDemo, {}) }) });
}
export {
  LiquidOcean,
  Component as default
};

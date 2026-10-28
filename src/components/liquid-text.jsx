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
// Adapted from https://www.vengenceui.com/components/liquid-text
// Copyright (c) 2025-2026 Ashutoshx7. See licenses/vengeance.txt for usage terms.
// registry:components/ui/liquid-text.tsx
import { useEffect, useRef } from "react";
import * as THREE from "three";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/liquid-text.tsx
import { jsx } from "react/jsx-runtime";
var createTextTexture = (text, size, font, color) => {
  const canvas = document.createElement("canvas");
  canvas.width = 2048;
  canvas.height = 2048;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = `bold ${size}px ${font}`;
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
};
var vertexShader = `
    varying vec2 vUv;
    uniform vec3 uDisplacement;

    float easeInOutCubic(float x) {
        return x < 0.5 ? 4.0 * x * x * x : 1.0 - pow(-2.0 * x + 2.0, 3.0) / 2.0;
    }

    float map(float value, float min1, float max1, float min2, float max2) {
        return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
    }

    void main() {
        vUv = uv;
        vec3 displaced = position;
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        float dist = length(uDisplacement - worldPosition.rgb);
        float minDistance = 3.0;

        if (dist < minDistance) {
            float mapped = map(dist, 0.0, minDistance, 1.0, 0.0);
            displaced.z += easeInOutCubic(mapped);
        }

        gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
    }
`;
var fragmentShader = `
    varying vec2 vUv;
    uniform sampler2D uTexture;

    void main() {
        gl_FragColor = texture2D(uTexture, vUv);
    }
`;
function LiquidText({
  text = "Liquid Text",
  fontSize = 200,
  font = "Inter, sans-serif",
  color,
  lightColor = "#000000",
  darkColor = "#ffffff",
  className
}) {
  const containerRef = useRef(null);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const width = rect.width || 1;
    const height = rect.height || 1;
    if (height === 0) return;
    const scene = new THREE.Scene();
    scene.background = null;
    const cameraDistance = 8;
    const aspect = width / height;
    const camera = new THREE.OrthographicCamera(
      -cameraDistance * aspect,
      cameraDistance * aspect,
      cameraDistance,
      -cameraDistance,
      0.01,
      1e3
    );
    camera.position.set(0, -10, 5);
    camera.lookAt(0, 0, 0);
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      const fallback = document.createElement("div");
      fallback.className = "flex h-full w-full items-center justify-center text-5xl font-bold text-neutral-950 dark:text-white md:text-7xl";
      fallback.textContent = text;
      container.appendChild(fallback);
      return () => {
        fallback.remove();
      };
    }
    renderer.setClearColor(0, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height, false);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    container.appendChild(renderer.domElement);
    const geometry = new THREE.PlaneGeometry(15, 15, 100, 100);
    const getActiveColor = () => color || (document.documentElement.classList.contains("dark") ? darkColor : lightColor);
    let currentColor = getActiveColor();
    let textTexture = createTextTexture(text, fontSize, font, currentColor);
    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: textTexture },
        uDisplacement: { value: new THREE.Vector3(0, 0, 0) }
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide
    });
    const plane = new THREE.Mesh(geometry, shaderMaterial);
    plane.rotation.z = Math.PI / 4;
    scene.add(plane);
    const hitPlaneGeometry = new THREE.PlaneGeometry(500, 500);
    const hitPlaneMaterial = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 });
    const hitPlane = new THREE.Mesh(hitPlaneGeometry, hitPlaneMaterial);
    scene.add(hitPlane);
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const onPointerMove = (e) => {
      const bounds = container.getBoundingClientRect();
      pointer.x = (e.clientX - bounds.left) / bounds.width * 2 - 1;
      pointer.y = -((e.clientY - bounds.top) / bounds.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const [hit] = raycaster.intersectObject(hitPlane);
      if (hit) shaderMaterial.uniforms.uDisplacement.value.copy(hit.point);
    };
    container.addEventListener("pointermove", onPointerMove);
    const handleResize = () => {
      const r = container.getBoundingClientRect();
      if (r.height === 0) return;
      const a = r.width / r.height;
      camera.left = -cameraDistance * a;
      camera.right = cameraDistance * a;
      camera.updateProjectionMatrix();
      renderer.setSize(r.width, r.height, false);
    };
    window.addEventListener("resize", handleResize);
    let animationId = 0;
    const render = () => {
      animationId = requestAnimationFrame(render);
      renderer.render(scene, camera);
    };
    render();
    const observer = new MutationObserver(() => {
      const next = getActiveColor();
      if (next !== currentColor) {
        const tex = createTextTexture(text, fontSize, font, next);
        shaderMaterial.uniforms.uTexture.value = tex;
        textTexture.dispose();
        textTexture = tex;
        currentColor = next;
      }
    });
    if (!color) observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(animationId);
      observer.disconnect();
      if (renderer.domElement.parentNode === container) container.removeChild(renderer.domElement);
      renderer.renderLists.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      textTexture.dispose();
      geometry.dispose();
      hitPlaneGeometry.dispose();
      hitPlaneMaterial.dispose();
      shaderMaterial.dispose();
    };
  }, [text, fontSize, font, color, lightColor, darkColor]);
  return /* @__PURE__ */ jsx("div", { ref: containerRef, className: cn("relative w-full h-[600px]", className) });
}

// entry.jsx
import React from "react";

// registry:components/docs/liquid-text.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
function LiquidTextDemo() {
  return /* @__PURE__ */ jsx2("div", { className: "relative flex h-full w-full items-center justify-center overflow-hidden", children: /* @__PURE__ */ jsx2(LiquidText, { text: "Hover Me", fontSize: 220 }) });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(LiquidTextDemo, {}) }) });
}
export {
  LiquidText,
  Component as default
};

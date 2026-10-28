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
// Adapted from https://www.vengenceui.com/components/interactive-particles
// Copyright (c) 2025-2026 Ashutoshx7. See licenses/vengeance.txt for usage terms.
// registry:components/ui/interactive-particles.tsx
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/interactive-particles.tsx
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var SIMPLEX_2D = (
  /* glsl */
  `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m; m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
`
);
var VERT = (
  /* glsl */
  `
precision highp float;

attribute float pindex;
attribute vec3 position;
attribute vec3 offset;
attribute vec2 uv;
attribute float angle;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

uniform float uTime;
uniform float uRandom;
uniform float uDepth;
uniform float uSize;
uniform vec2 uTextureSize;
uniform sampler2D uTexture;
uniform sampler2D uTouch;

varying vec2 vPUv;
varying vec2 vUv;

${SIMPLEX_2D}

float random(float n) {
  return fract(sin(n) * 43758.5453123);
}

void main() {
  vUv = uv;

  vec2 puv = offset.xy / uTextureSize;
  vPUv = puv;

  vec4 colA = texture2D(uTexture, puv);
  float grey = colA.r * 0.21 + colA.g * 0.71 + colA.b * 0.07;

  vec3 displaced = offset;
  displaced.xy += vec2(random(pindex) - 0.5, random(offset.x + pindex) - 0.5) * uRandom;
  float rndz = (random(pindex) + snoise(vec2(pindex * 0.1, uTime * 0.1)));
  displaced.z += rndz * (random(pindex) * 2.0 * uDepth);
  displaced.xy -= uTextureSize * 0.5;

  float t = texture2D(uTouch, puv).r;
  displaced.z += t * 20.0 * rndz;
  displaced.x += cos(angle) * t * 20.0 * rndz;
  displaced.y += sin(angle) * t * 20.0 * rndz;

  float psize = (snoise(vec2(uTime, pindex) * 0.5) + 2.0);
  psize *= max(grey, 0.2);
  psize *= uSize;

  vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);
  mvPosition.xyz += position * psize;
  vec4 finalPosition = projectionMatrix * mvPosition;

  gl_Position = finalPosition;
}
`
);
var FRAG = (
  /* glsl */
  `
precision highp float;

uniform sampler2D uTexture;
uniform vec3 uColor;

varying vec2 vPUv;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  vec2 puv = vPUv;

  vec4 colA = texture2D(uTexture, puv);
  float grey = colA.r * 0.21 + colA.g * 0.71 + colA.b * 0.07;

  // Soft, feathered dot instead of a hard-edged circle.
  float radius = 0.5;
  float border = 0.45;
  float dist = radius - distance(uv, vec2(0.5));
  float t = smoothstep(0.0, border, dist);

  // Tint the greyscale value and let dimmer particles fade so tonal images
  // read as an airy field rather than a solid mass.
  vec3 rgb = vec3(grey) * uColor;
  float alpha = t * (0.35 + 0.65 * grey);

  gl_FragColor = vec4(rgb, alpha);
}
`
);
var TouchTexture = class {
  size = 64;
  maxAge = 120;
  radius;
  trail = [];
  canvas;
  ctx;
  texture;
  constructor(radius) {
    this.radius = radius;
    this.canvas = document.createElement("canvas");
    this.canvas.width = this.canvas.height = this.size;
    this.ctx = this.canvas.getContext("2d");
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.size, this.size);
    this.texture = new THREE.Texture(this.canvas);
  }
  easeOutSine(t, b, c, d) {
    return c * Math.sin(t / d * (Math.PI / 2)) + b;
  }
  addTouch(x, y) {
    let force = 0;
    const last = this.trail[this.trail.length - 1];
    if (last) {
      const dx = last.x - x;
      const dy = last.y - y;
      force = Math.min((dx * dx + dy * dy) * 1e4, 1);
    }
    this.trail.push({ x, y, age: 0, force });
  }
  update() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.size, this.size);
    for (let i = this.trail.length - 1; i >= 0; i--) {
      this.trail[i].age++;
      if (this.trail[i].age > this.maxAge) this.trail.splice(i, 1);
    }
    for (const point of this.trail) this.drawTouch(point);
    this.texture.needsUpdate = true;
  }
  drawTouch(point) {
    const pos = { x: point.x * this.size, y: (1 - point.y) * this.size };
    let intensity;
    if (point.age < this.maxAge * 0.3) {
      intensity = this.easeOutSine(point.age / (this.maxAge * 0.3), 0, 1, 1);
    } else {
      intensity = this.easeOutSine(1 - (point.age - this.maxAge * 0.3) / (this.maxAge * 0.7), 0, 1, 1);
    }
    intensity *= point.force;
    const radius = this.size * this.radius * intensity;
    const grd = this.ctx.createRadialGradient(pos.x, pos.y, radius * 0.25, pos.x, pos.y, radius);
    grd.addColorStop(0, "rgba(255, 255, 255, 0.2)");
    grd.addColorStop(1, "rgba(0, 0, 0, 0.0)");
    this.ctx.beginPath();
    this.ctx.fillStyle = grd;
    this.ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
    this.ctx.fill();
  }
};
function InteractiveParticles({
  src,
  allowUpload = true,
  uploadLabel = "Upload image",
  onUpload,
  maxDimension = 320,
  className,
  background = "#000000",
  color = "#ffffff",
  size = 1.2,
  randomness = 1.8,
  depth = 3,
  touchRadius = 0.15,
  threshold = 34
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const objectUrlRef = useRef(null);
  const [uploadedSrc, setUploadedSrc] = useState(null);
  const effectiveSrc = uploadedSrc ?? src ?? null;
  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    const url = URL.createObjectURL(file);
    objectUrlRef.current = url;
    setUploadedSrc(url);
    onUpload?.(file);
  };
  useEffect(() => {
    return () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    };
  }, []);
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas || !effectiveSrc) return;
    let disposed = false;
    const getSize = () => ({
      width: container.clientWidth || 1,
      height: container.clientHeight || 1
    });
    let view = getSize();
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, view.width / view.height, 1, 1e4);
    camera.position.z = 300;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(1);
    renderer.setSize(view.width, view.height);
    renderer.setClearColor(0, 0);
    let fovHeight = 2 * Math.tan(camera.fov * Math.PI / 180 / 2) * camera.position.z;
    const clock = new THREE.Clock(true);
    const container3D = new THREE.Object3D();
    scene.add(container3D);
    const raycaster = new THREE.Raycaster();
    const mouseNDC = new THREE.Vector2();
    let rect = canvas.getBoundingClientRect();
    let object3D = null;
    let hitArea = null;
    let touch = null;
    let uniforms = null;
    let imgWidth = 0;
    let imgHeight = 0;
    const onPointerMove = (e) => {
      if (!hitArea || !touch) return;
      mouseNDC.x = (e.clientX - rect.left) / rect.width * 2 - 1;
      mouseNDC.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouseNDC, camera);
      const hits = raycaster.intersectObject(hitArea);
      if (hits.length > 0 && hits[0].uv) touch.addTouch(hits[0].uv.x, hits[0].uv.y);
    };
    canvas.addEventListener("pointermove", onPointerMove);
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin("anonymous");
    loader.load(effectiveSrc, (texture) => {
      if (disposed) {
        texture.dispose();
        return;
      }
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      const image = texture.image;
      const longest = Math.max(image.width, image.height);
      const scaleDown = longest > maxDimension ? maxDimension / longest : 1;
      imgWidth = Math.max(1, Math.round(image.width * scaleDown));
      imgHeight = Math.max(1, Math.round(image.height * scaleDown));
      const numPoints = imgWidth * imgHeight;
      const readCanvas = document.createElement("canvas");
      readCanvas.width = imgWidth;
      readCanvas.height = imgHeight;
      const rctx = readCanvas.getContext("2d");
      rctx.scale(1, -1);
      rctx.drawImage(image, 0, 0, imgWidth, imgHeight * -1);
      const colors = Float32Array.from(rctx.getImageData(0, 0, imgWidth, imgHeight).data);
      let numVisible = 0;
      for (let i = 0; i < numPoints; i++) {
        if (colors[i * 4] > threshold) numVisible++;
      }
      uniforms = {
        uTime: { value: 0 },
        uRandom: { value: 1 },
        uDepth: { value: 2 },
        uSize: { value: 0 },
        uTextureSize: { value: new THREE.Vector2(imgWidth, imgHeight) },
        uTexture: { value: texture },
        uTouch: { value: null },
        uColor: { value: new THREE.Color(color) }
      };
      const material = new THREE.RawShaderMaterial({
        uniforms,
        vertexShader: VERT,
        fragmentShader: FRAG,
        depthTest: false,
        transparent: true
      });
      const geometry = new THREE.InstancedBufferGeometry();
      const positions = new THREE.BufferAttribute(new Float32Array(4 * 3), 3);
      positions.setXYZ(0, -0.5, 0.5, 0);
      positions.setXYZ(1, 0.5, 0.5, 0);
      positions.setXYZ(2, -0.5, -0.5, 0);
      positions.setXYZ(3, 0.5, -0.5, 0);
      geometry.setAttribute("position", positions);
      const uvs = new THREE.BufferAttribute(new Float32Array(4 * 2), 2);
      uvs.setXY(0, 0, 0);
      uvs.setXY(1, 1, 0);
      uvs.setXY(2, 0, 1);
      uvs.setXY(3, 1, 1);
      geometry.setAttribute("uv", uvs);
      geometry.setIndex(new THREE.BufferAttribute(new Uint16Array([0, 2, 1, 2, 3, 1]), 1));
      const indices = new Uint16Array(numVisible);
      const offsets = new Float32Array(numVisible * 3);
      const angles = new Float32Array(numVisible);
      for (let i = 0, j = 0; i < numPoints; i++) {
        if (colors[i * 4] <= threshold) continue;
        offsets[j * 3 + 0] = i % imgWidth;
        offsets[j * 3 + 1] = Math.floor(i / imgWidth);
        indices[j] = i;
        angles[j] = Math.random() * Math.PI;
        j++;
      }
      geometry.setAttribute("pindex", new THREE.InstancedBufferAttribute(indices, 1, false));
      geometry.setAttribute("offset", new THREE.InstancedBufferAttribute(offsets, 3, false));
      geometry.setAttribute("angle", new THREE.InstancedBufferAttribute(angles, 1, false));
      object3D = new THREE.Mesh(geometry, material);
      container3D.add(object3D);
      const hitGeo = new THREE.PlaneGeometry(imgWidth, imgHeight, 1, 1);
      const hitMat = new THREE.MeshBasicMaterial({ color: 16777215, wireframe: true, depthTest: false });
      hitMat.visible = false;
      hitArea = new THREE.Mesh(hitGeo, hitMat);
      container3D.add(hitArea);
      touch = new TouchTexture(touchRadius);
      uniforms.uTouch.value = touch.texture;
      applyScale();
      gsap.fromTo(uniforms.uSize, { value: 0.5 }, { value: size, duration: 1 });
      gsap.to(uniforms.uRandom, { value: randomness, duration: 1 });
      gsap.fromTo(uniforms.uDepth, { value: 40 }, { value: depth, duration: 1.5 });
    });
    const applyScale = () => {
      if (!object3D || !hitArea || !imgHeight) return;
      const scale = fovHeight / imgHeight;
      object3D.scale.set(scale, scale, 1);
      hitArea.scale.set(scale, scale, 1);
    };
    const applySize = () => {
      view = getSize();
      camera.aspect = view.width / view.height;
      camera.updateProjectionMatrix();
      fovHeight = 2 * Math.tan(camera.fov * Math.PI / 180 / 2) * camera.position.z;
      renderer.setSize(view.width, view.height);
      rect = canvas.getBoundingClientRect();
      applyScale();
    };
    const resizeObserver = new ResizeObserver(applySize);
    resizeObserver.observe(container);
    window.addEventListener("resize", applySize);
    let isInViewport = true;
    let lastRender = 0;
    const frameInterval = 1e3 / 30;
    const renderFrame = (timestamp) => {
      if (timestamp - lastRender < frameInterval) return;
      lastRender = timestamp;
      const delta = Math.min(clock.getDelta(), 0.05);
      if (touch) touch.update();
      if (uniforms) uniforms.uTime.value += delta;
      renderer.render(scene, camera);
    };
    const updateAnimationLoop = () => {
      renderer.setAnimationLoop(
        !disposed && isInViewport && !document.hidden ? renderFrame : null
      );
    };
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isInViewport = entry.isIntersecting;
        updateAnimationLoop();
      },
      { rootMargin: "160px" }
    );
    const onVisibilityChange = () => updateAnimationLoop();
    visibilityObserver.observe(container);
    document.addEventListener("visibilitychange", onVisibilityChange);
    updateAnimationLoop();
    return () => {
      disposed = true;
      renderer.setAnimationLoop(null);
      visibilityObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      canvas.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", applySize);
      resizeObserver.disconnect();
      if (uniforms) gsap.killTweensOf([uniforms.uSize, uniforms.uRandom, uniforms.uDepth]);
      if (object3D) {
        object3D.geometry.dispose();
        object3D.material.dispose();
      }
      if (hitArea) {
        hitArea.geometry.dispose();
        hitArea.material.dispose();
      }
      if (touch) touch.texture.dispose();
      renderer.dispose();
    };
  }, [effectiveSrc, color, size, randomness, depth, touchRadius, threshold, maxDimension]);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: containerRef,
      className: cn("relative h-full w-full overflow-hidden", className),
      style: { background },
      children: [
        /* @__PURE__ */ jsx("canvas", { ref: canvasRef, className: "block h-full w-full" }),
        allowUpload && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              ref: fileInputRef,
              type: "file",
              accept: "image/*",
              className: "hidden",
              onChange: (e) => {
                handleFile(e.target.files?.[0]);
                e.target.value = "";
              }
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: () => fileInputRef.current?.click(),
              className: "group absolute right-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-medium text-white/60 backdrop-blur-sm transition-all duration-200 hover:border-white/20 hover:bg-white/10 hover:text-white/90",
              children: [
                /* @__PURE__ */ jsxs("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: [
                  /* @__PURE__ */ jsx("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
                  /* @__PURE__ */ jsx("polyline", { points: "17 8 12 3 7 8" }),
                  /* @__PURE__ */ jsx("line", { x1: "12", y1: "3", x2: "12", y2: "15" })
                ] }),
                uploadLabel
              ]
            }
          )
        ] })
      ]
    }
  );
}

// entry.jsx
import React from "react";

// registry:components/docs/interactive-particles-demo.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function InteractiveParticlesDemo() {
  return /* @__PURE__ */ jsxs2("div", { className: "relative h-[520px] w-full overflow-hidden rounded-xl bg-black", children: [
    /* @__PURE__ */ jsx2(InteractiveParticles, { src: "https://www.vengenceui.com/interactive-particles/particles.png", background: "#000000", allowUpload: true }),
    /* @__PURE__ */ jsx2("p", { className: "pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-xs text-white/50", children: "Move your cursor across the particles \u2014 or upload your own image" })
  ] });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(InteractiveParticlesDemo, {}) }) });
}
export {
  InteractiveParticles,
  Component as default
};

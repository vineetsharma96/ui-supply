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
// Adapted from https://www.vengenceui.com/components/wave-grid-background
// Copyright (c) 2025-2026 Ashutoshx7. See licenses/vengeance.txt for usage terms.
// registry:components/ui/wave-grid-background.tsx
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/wave-grid-background.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var MAX_TRAIL = 128;
var VIGNETTE_RGB_SHIFT_SHADER = {
  uniforms: {
    tDiffuse: { value: null },
    shiftAmount: { value: 5e-3 },
    vignetteRadius: { value: 0.3 },
    vignetteSoftness: { value: 0.3 }
  },
  vertexShader: (
    /* glsl */
    `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `
  ),
  fragmentShader: (
    /* glsl */
    `
    uniform sampler2D tDiffuse;
    uniform float shiftAmount;
    uniform float vignetteRadius;
    uniform float vignetteSoftness;
    varying vec2 vUv;

    void main() {
      vec2 center = vec2(0.5);
      float dist = distance(vUv, center);
      float horzQuadrant = sign(vUv.x - center.x);
      float vertQuadrant = sign(vUv.y - center.y);

      float vignetteFactor = smoothstep(vignetteRadius, vignetteRadius + vignetteSoftness, dist);
      float currentShift = shiftAmount * vignetteFactor;

      float r = texture2D(tDiffuse, vUv + vec2(currentShift * horzQuadrant, currentShift * vertQuadrant)).r;
      float g = texture2D(tDiffuse, vUv).g;
      float b = texture2D(tDiffuse, vUv - vec2(currentShift * horzQuadrant, currentShift * vertQuadrant)).b;

      float darken = 1.0 - vignetteFactor * 0.5;
      gl_FragColor = vec4(vec3(r, g, b) * darken, 1.0);
    }
  `
  )
};
function overrideVertexShader(vertexShader) {
  return vertexShader.replace(
    "#include <common>",
    /* glsl */
    `#include <common>
      varying float vHeight;
      attribute vec2 aOffset;
      uniform sampler2D uTrailTexture;
      uniform int       uTrailCount;
      uniform float     uWaveSpeed;
      uniform float     uWaveFreq;
      uniform float     uWaveWidth;
      uniform float     uFadeTime;
      uniform float     uAmplitude;
      uniform float     uJitter;
      uniform float     uMaxHeight;

      vec2 hash2( vec2 p ) {
        p = vec2( dot( p, vec2( 127.1, 311.7 ) ), dot( p, vec2( 269.5, 183.3 ) ) );
        return fract( sin( p ) * 43758.5453123 ) - 0.5;
      }`
  ).replace(
    "#include <begin_vertex>",
    /* glsl */
    `#include <begin_vertex>

      vHeight = 0.0;

      if ( position.y > 0.0 ) {
        vec2 jitter  = hash2( aOffset ) * uJitter;
        vec2 worldXZ = aOffset + jitter;
        float waveHeight  = 0.0;
        float totalWeight = 0.0;

        for ( int i = 0; i < uTrailCount; i++ ) {
          vec4 td = texture2D( uTrailTexture, vec2( ( float(i) + 0.5 ) / 128.0, 0.5 ) );
          float dist      = length( worldXZ - td.rg );
          float wavefront = uWaveSpeed * td.b;
          float relDist   = dist - wavefront;

          float window = exp( -( relDist * relDist ) / ( uWaveWidth * uWaveWidth ) );
          float fade   = exp( -td.b / uFadeTime );
          float atten  = 1.0 / ( 1.0 + dist * 0.1 );
          float weight = fade * window * atten * td.a;

          waveHeight  += weight * cos( uWaveFreq * relDist );
          totalWeight += weight;
        }

        waveHeight /= max( totalWeight, 1.0 );

        float displacement = clamp( waveHeight * uAmplitude, -uMaxHeight, uMaxHeight );
        transformed.y += displacement;
        vHeight = displacement;
      }`
  );
}
function WaveGridBackground({
  children,
  className,
  gridSize = 40,
  colorBase = "#ffffff",
  colorHigh = "#0055ff",
  waveAmplitude = 0.4,
  waveSpeed = 6,
  waveFrequency = 1.2,
  waveWidth = 3,
  waveMaxHeight = 0.4,
  waveJitter = 0.2,
  autoAnimate = true,
  vignette = true
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const propsRef = useRef({
    colorBase,
    colorHigh,
    waveAmplitude,
    waveSpeed,
    waveFrequency,
    waveWidth,
    waveMaxHeight,
    waveJitter,
    autoAnimate
  });
  useEffect(() => {
    propsRef.current = {
      colorBase,
      colorHigh,
      waveAmplitude,
      waveSpeed,
      waveFrequency,
      waveWidth,
      waveMaxHeight,
      waveJitter,
      autoAnimate
    };
  });
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const cubeWidth = 0.8;
    const cubeHeight = 3;
    const gap = 0.01;
    const bounds = gridSize * (cubeWidth + gap);
    const getSize = () => ({
      width: container.clientWidth || 1,
      height: container.clientHeight || 1,
      pixelRatio: Math.min(window.devicePixelRatio, 2)
    });
    let size = getSize();
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(colorBase).multiplyScalar(0.5);
    const alphaRange = Math.PI * 0.03;
    const betaRange = Math.PI * 0.05;
    const mouse = new THREE.Vector2(0, 0);
    const lerpedMouse = new THREE.Vector2(0, 0);
    const camera = new THREE.PerspectiveCamera(40, size.width / size.height, 0.1, 500);
    let cameraRadius = 12;
    const fitCamera = () => {
      const verticalHalfFov = THREE.MathUtils.degToRad(camera.fov) / 2;
      const horizontalHalfFov = Math.atan(Math.tan(verticalHalfFov) * camera.aspect);
      const halfBounds = bounds / 2;
      cameraRadius = Math.min(
        halfBounds / Math.tan(verticalHalfFov),
        halfBounds / Math.tan(horizontalHalfFov)
      ) * 0.9 + cubeHeight * 0.5;
    };
    const positionCamera = (mx, my) => {
      const alpha = my * alphaRange;
      const beta = mx * betaRange;
      camera.position.set(
        -cameraRadius * Math.cos(alpha) * Math.sin(beta),
        cameraRadius * Math.cos(alpha) * Math.cos(beta),
        cameraRadius * Math.sin(alpha)
      );
      camera.up.set(0, 0, -1);
      camera.lookAt(0, 0, 0);
    };
    fitCamera();
    positionCamera(0, 0);
    scene.add(camera);
    const ambientLight = new THREE.AmbientLight("#ffffff", 0.5);
    scene.add(ambientLight);
    const keyLight = new THREE.DirectionalLight("#ffffff", 4);
    keyLight.position.set(-20, 10, 6);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.radius = 6;
    keyLight.shadow.camera.near = 0.1;
    keyLight.shadow.camera.far = 60;
    keyLight.shadow.camera.left = -22;
    keyLight.shadow.camera.right = 22;
    keyLight.shadow.camera.top = 22;
    keyLight.shadow.camera.bottom = -22;
    keyLight.shadow.bias = 1e-4;
    scene.add(keyLight);
    const fillLight = new THREE.DirectionalLight("#ffffff", 1);
    fillLight.position.set(10, 5, -3);
    scene.add(fillLight);
    const trailData = new Float32Array(MAX_TRAIL * 4);
    const trailTexture = new THREE.DataTexture(
      trailData,
      MAX_TRAIL,
      1,
      THREE.RGBAFormat,
      THREE.FloatType
    );
    trailTexture.needsUpdate = true;
    const trailUniforms = {
      uTrailTexture: { value: trailTexture },
      uTrailCount: { value: 0 },
      uFadeTime: { value: 2 },
      uWaveSpeed: { value: waveSpeed },
      uWaveFreq: { value: waveFrequency },
      uWaveWidth: { value: waveWidth },
      uAmplitude: { value: waveAmplitude },
      uJitter: { value: waveJitter },
      uMaxHeight: { value: waveMaxHeight }
    };
    const colorUniforms = {
      uColorBase: { value: new THREE.Color(colorBase) },
      uColorHigh: { value: new THREE.Color(colorHigh) }
    };
    const trail = [];
    let lastPoint = null;
    let timeSinceLastMove = 0;
    let randomPointTimer = 0;
    let placingRandom = true;
    const fadeTime = 2;
    const trailSpacing = 0.1;
    const rayPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(bounds, bounds),
      new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, visible: false })
    );
    rayPlane.rotation.x = -Math.PI / 2;
    rayPlane.updateMatrixWorld(true);
    const raycaster = new THREE.Raycaster();
    const pointerNDC = new THREE.Vector2();
    const onPointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      pointerNDC.set(
        (e.clientX - rect.left) / rect.width * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1
      );
      mouse.copy(pointerNDC);
      raycaster.setFromCamera(pointerNDC, camera);
      const hits = raycaster.intersectObject(rayPlane);
      if (hits.length === 0) return;
      const { x, z } = hits[0].point;
      let distDelta = 0;
      if (lastPoint) {
        const dx = x - lastPoint.x;
        const dz = z - lastPoint.z;
        distDelta = Math.sqrt(dx * dx + dz * dz);
        if (distDelta < trailSpacing) return;
      }
      if (trail.length >= MAX_TRAIL) trail.shift();
      trail.push({ x, z, age: 0, distDelta });
      lastPoint = { x, z };
      timeSinceLastMove = 0;
      placingRandom = false;
      randomPointTimer = 0;
    };
    canvas.addEventListener("pointermove", onPointerMove);
    const onPointerLeave = () => {
      mouse.set(0, 0);
      lastPoint = null;
    };
    canvas.addEventListener("pointerleave", onPointerLeave);
    const addRandomPoint = () => {
      const x = (Math.random() * 0.5 - 0.25) * bounds;
      const z = (Math.random() * 0.5 - 0.25) * bounds;
      const distDelta = 0.8 + Math.random() * 0.2;
      if (trail.length >= MAX_TRAIL) trail.shift();
      trail.push({ x, z, age: 0, distDelta });
    };
    const updateTrail = (delta) => {
      const expiry = fadeTime * 4;
      for (let i = trail.length - 1; i >= 0; i--) {
        trail[i].age += delta;
        if (trail[i].age > expiry) trail.splice(i, 1);
      }
      timeSinceLastMove += delta;
      if (timeSinceLastMove >= 3 && !placingRandom && propsRef.current.autoAnimate) {
        placingRandom = true;
        randomPointTimer = 0;
      }
      if (placingRandom && propsRef.current.autoAnimate) {
        randomPointTimer += delta;
        if (randomPointTimer >= 1.5) {
          addRandomPoint();
          randomPointTimer = 0;
        }
      }
      const count2 = Math.min(trail.length, MAX_TRAIL);
      if (count2 > 0 || trailUniforms.uTrailCount.value > 0) {
        for (let i = 0; i < count2; i++) {
          const ti = i * 4;
          trailData[ti] = trail[i].x;
          trailData[ti + 1] = trail[i].z;
          trailData[ti + 2] = trail[i].age;
          trailData[ti + 3] = trail[i].distDelta;
        }
        trailTexture.needsUpdate = true;
        trailUniforms.uTrailCount.value = count2;
      }
    };
    const count = gridSize * gridSize;
    const geometry = new THREE.BoxGeometry(cubeWidth, cubeHeight, cubeWidth);
    const offsetAttribute = new THREE.InstancedBufferAttribute(new Float32Array(count * 2), 2);
    geometry.setAttribute("aOffset", offsetAttribute);
    const material = new THREE.MeshPhongMaterial({ color: 16777215 });
    material.onBeforeCompile = (shader) => {
      Object.assign(shader.uniforms, trailUniforms, colorUniforms);
      shader.vertexShader = overrideVertexShader(shader.vertexShader);
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <common>",
        `#include <common>
          varying float vHeight;
          uniform vec3  uColorBase;
          uniform vec3  uColorHigh;
          uniform float uMaxHeight;`
      ).replace(
        "#include <color_fragment>",
        `#include <color_fragment>
          float t = clamp( vHeight / uMaxHeight, 0.0, 1.0 );
          diffuseColor.rgb = mix( uColorBase, uColorHigh, t );`
      );
    };
    const depthMaterial = new THREE.MeshDepthMaterial();
    depthMaterial.onBeforeCompile = (shader) => {
      Object.assign(shader.uniforms, trailUniforms);
      shader.vertexShader = overrideVertexShader(shader.vertexShader);
    };
    const instancedMesh = new THREE.InstancedMesh(geometry, material, count);
    instancedMesh.customDepthMaterial = depthMaterial;
    instancedMesh.castShadow = true;
    instancedMesh.receiveShadow = true;
    scene.add(instancedMesh);
    const dummy = new THREE.Object3D();
    const spacing = cubeWidth + gap;
    const offset = (gridSize - 1) * spacing / 2;
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const index = i * gridSize + j;
        const x = i * spacing - offset;
        const z = j * spacing - offset;
        dummy.position.set(x, 0, z);
        dummy.updateMatrix();
        instancedMesh.setMatrixAt(index, dummy.matrix);
        offsetAttribute.setXY(index, x, z);
      }
    }
    instancedMesh.instanceMatrix.needsUpdate = true;
    offsetAttribute.needsUpdate = true;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.95;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.setClearColor("#808080");
    renderer.setSize(size.width, size.height);
    renderer.setPixelRatio(size.pixelRatio);
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const vignettePass = new ShaderPass(VIGNETTE_RGB_SHIFT_SHADER);
    if (vignette) composer.addPass(vignettePass);
    composer.addPass(new OutputPass());
    composer.setSize(size.width, size.height);
    composer.setPixelRatio(size.pixelRatio);
    const applySize = () => {
      size = getSize();
      camera.aspect = size.width / size.height;
      camera.updateProjectionMatrix();
      fitCamera();
      positionCamera(lerpedMouse.x, lerpedMouse.y);
      renderer.setSize(size.width, size.height);
      renderer.setPixelRatio(size.pixelRatio);
      composer.setSize(size.width, size.height);
      composer.setPixelRatio(size.pixelRatio);
    };
    const resizeObserver = new ResizeObserver(applySize);
    resizeObserver.observe(container);
    window.addEventListener("resize", applySize);
    const clock = new THREE.Clock();
    renderer.setAnimationLoop(() => {
      const delta = clock.getDelta();
      const p = propsRef.current;
      trailUniforms.uWaveSpeed.value = p.waveSpeed;
      trailUniforms.uWaveFreq.value = p.waveFrequency;
      trailUniforms.uWaveWidth.value = p.waveWidth;
      trailUniforms.uAmplitude.value = p.waveAmplitude;
      trailUniforms.uJitter.value = p.waveJitter;
      trailUniforms.uMaxHeight.value = p.waveMaxHeight;
      colorUniforms.uColorBase.value.set(p.colorBase);
      colorUniforms.uColorHigh.value.set(p.colorHigh);
      scene.background = new THREE.Color(p.colorBase).multiplyScalar(0.5);
      updateTrail(delta);
      lerpedMouse.x += (mouse.x - lerpedMouse.x) * 0.04;
      lerpedMouse.y += (mouse.y - lerpedMouse.y) * 0.04;
      positionCamera(lerpedMouse.x, lerpedMouse.y);
      composer.render();
    });
    return () => {
      renderer.setAnimationLoop(null);
      window.removeEventListener("resize", applySize);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      resizeObserver.disconnect();
      geometry.dispose();
      material.dispose();
      depthMaterial.dispose();
      rayPlane.geometry.dispose();
      rayPlane.material.dispose();
      trailTexture.dispose();
      composer.dispose();
      renderer.dispose();
    };
  }, [gridSize, vignette]);
  return /* @__PURE__ */ jsxs("div", { ref: containerRef, className: cn("relative h-full w-full overflow-hidden", className), children: [
    /* @__PURE__ */ jsx("canvas", { ref: canvasRef, className: "block h-full w-full" }),
    children != null && /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0", children })
  ] });
}

// entry.jsx
import React from "react";

// registry:components/docs/wave-grid-background-demo.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function WaveGridBackgroundDemo() {
  return /* @__PURE__ */ jsx2("div", { className: "relative h-full min-h-[360px] w-full overflow-hidden rounded-xl", children: /* @__PURE__ */ jsx2(WaveGridBackground, { colorBase: "#ffffff", colorHigh: "#0055ff", children: /* @__PURE__ */ jsxs2("div", { className: "pointer-events-none flex h-full w-full flex-col items-center justify-center px-5 text-center", children: [
    /* @__PURE__ */ jsx2("h2", { className: "text-4xl font-bold tracking-tight text-neutral-950 sm:text-6xl", children: "Wave Grid" }),
    /* @__PURE__ */ jsx2("p", { className: "mt-3 max-w-md text-sm leading-6 text-neutral-700 sm:text-base", children: "Move your cursor across the grid to send ripples through the cubes." })
  ] }) }) });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(WaveGridBackgroundDemo, {}) }) });
}
export {
  WaveGridBackground,
  Component as default
};

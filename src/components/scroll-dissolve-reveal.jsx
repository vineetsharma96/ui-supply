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
// Adapted from https://www.vengenceui.com/components/scroll-dissolve-reveal
// Copyright (c) 2025-2026 Ashutoshx7. See licenses/vengeance.txt for usage terms.
// registry:components/ui/scroll-dissolve-reveal.tsx
import React, { useEffect, useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture, OrthographicCamera } from "@react-three/drei";
import * as THREE from "three";
import { useScroll } from "motion/react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/scroll-dissolve-reveal.tsx
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var coverVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
var coverFragmentShader = `
  uniform sampler2D uTexture;
  uniform vec2 uResolution;
  uniform vec2 uImageResolution;
  uniform float uDissolve;
  uniform vec2 uCenter;
  uniform float uTime;
  uniform float uGrayscale;
  uniform float uEdgeIntensity;
  uniform float uEdgeBrightness;
  varying vec2 vUv;

  mat3 sobelX = mat3(
    -1.0, 0.0, 1.0,
    -2.0, 0.0, 2.0,
    -1.0, 0.0, 1.0
  );

  mat3 sobelY = mat3(
    -1.0, -2.0, -1.0,
     0.0,  0.0,  0.0,
     1.0,  2.0,  1.0
  );

  float getLuminance(vec3 color) {
    return dot(color, vec3(0.299, 0.587, 0.114));
  }

  float sobel(sampler2D tex, vec2 uv, vec2 texelSize) {
    float gx = 0.0;
    float gy = 0.0;

    for (int i = -1; i <= 1; i++) {
      for (int j = -1; j <= 1; j++) {
        vec2 offset = vec2(float(i), float(j)) * texelSize;
        float lum = getLuminance(texture2D(tex, uv + offset).rgb);
        gx += lum * sobelX[i + 1][j + 1];
        gy += lum * sobelY[i + 1][j + 1];
      }
    }

    return sqrt(gx * gx + gy * gy);
  }

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;

    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(p * frequency);
      amplitude *= 0.5;
      frequency *= 2.0;
    }

    return value;
  }

  void main() {
    vec2 ratio = vec2(
      min((uResolution.x / uResolution.y) / (uImageResolution.x / uImageResolution.y), 1.0),
      min((uResolution.y / uResolution.x) / (uImageResolution.y / uImageResolution.x), 1.0)
    );

    vec2 uv = vec2(
      vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
      vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
    );

    vec4 texColor = texture2D(uTexture, uv);

    float gray = getLuminance(texColor.rgb);
    vec3 grayscaleColor = vec3(gray);
    texColor.rgb = mix(texColor.rgb, grayscaleColor, uGrayscale);

    vec2 centeredUv = vUv - uCenter;
    float aspect = uResolution.x / uResolution.y;
    centeredUv.x *= aspect;
    float dist = length(centeredUv);

    float angle = atan(centeredUv.y, centeredUv.x);

    float noiseScale = 6.0;
    vec2 pixelatedUv = floor(vUv * uResolution / noiseScale) * noiseScale / uResolution;
    float blockNoise = fbm(pixelatedUv * 100.0) * 0.15;

    float angularNoise = fbm(vec2(angle * 5.0, 0.0)) * 0.15;

    float totalNoise = blockNoise + angularNoise;
    float noisyDist = dist + totalNoise;

    float maxDist = length(vec2(aspect * 0.5, 0.5));
    float normalizedDist = noisyDist / maxDist;

    float dissolveThreshold = uDissolve * 1.5;

    vec2 texelSize = 1.0 / uResolution;
    float edge = sobel(uTexture, uv, texelSize);

    edge = pow(edge, 0.7) * 2.0;
    edge = clamp(edge, 0.0, 1.0);

    float dissolveMask = smoothstep(dissolveThreshold - 0.03, dissolveThreshold, normalizedDist);

    vec3 edgeColor = vec3(1.0, 1.0, 1.0);

    vec3 baseColor = mix(texColor.rgb, vec3(0.0), uGrayscale);
    vec3 finalColor = baseColor;

    float edgeGlowIntensity = uEdgeIntensity * 2.0;
    float edgeGlow = edge * edgeGlowIntensity * (1.0 + uGrayscale * 3.0);
    finalColor += edgeColor * edgeGlow * uEdgeBrightness;

    float edgeZoneWidth = 0.15 * (1.0 - uDissolve) + 0.02;
    float edgeZone = smoothstep(dissolveThreshold - edgeZoneWidth, dissolveThreshold - edgeZoneWidth + 0.04, normalizedDist) *
                     smoothstep(dissolveThreshold + 0.02, dissolveThreshold - 0.02, normalizedDist);
    float sparkle = hash(floor(vUv * uResolution / 4.0)) * edgeZone;

    float edgeBrightness = (1.0 - uDissolve) * uEdgeBrightness * (1.0 + uGrayscale * 2.0);
    finalColor += vec3(sparkle * 3.0 * edgeBrightness);

    float alpha = dissolveMask * texColor.a;

    gl_FragColor = vec4(finalColor, alpha);
  }
`;
var coverFragmentShaderReverse = `
  uniform sampler2D uTexture;
  uniform vec2 uResolution;
  uniform vec2 uImageResolution;
  uniform float uDissolve;
  uniform vec2 uCenter;
  uniform float uTime;
  uniform float uBrightness;
  uniform float uEdgeIntensity;
  uniform float uDarkness;
  uniform float uGrayscale;
  varying vec2 vUv;

  mat3 sobelX = mat3(
    -1.0, 0.0, 1.0,
    -2.0, 0.0, 2.0,
    -1.0, 0.0, 1.0
  );

  mat3 sobelY = mat3(
    -1.0, -2.0, -1.0,
     0.0,  0.0,  0.0,
     1.0,  2.0,  1.0
  );

  float getLuminance(vec3 color) {
    return dot(color, vec3(0.299, 0.587, 0.114));
  }

  float sobel(sampler2D tex, vec2 uv, vec2 texelSize) {
    float gx = 0.0;
    float gy = 0.0;

    for (int i = -1; i <= 1; i++) {
      for (int j = -1; j <= 1; j++) {
        vec2 offset = vec2(float(i), float(j)) * texelSize;
        float lum = getLuminance(texture2D(tex, uv + offset).rgb);
        gx += lum * sobelX[i + 1][j + 1];
        gy += lum * sobelY[i + 1][j + 1];
      }
    }

    return sqrt(gx * gx + gy * gy);
  }

  void main() {
    vec2 ratio = vec2(
      min((uResolution.x / uResolution.y) / (uImageResolution.x / uImageResolution.y), 1.0),
      min((uResolution.y / uResolution.x) / (uImageResolution.y / uImageResolution.x), 1.0)
    );

    vec2 uv = vec2(
      vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
      vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
    );

    vec4 texColor = texture2D(uTexture, uv);

    float gray = getLuminance(texColor.rgb);
    vec3 grayscaleColor = vec3(gray);
    texColor.rgb = mix(texColor.rgb, grayscaleColor, uGrayscale);

    vec2 texelSize = 1.0 / uResolution;
    float edge = sobel(uTexture, uv, texelSize);

    edge = pow(edge, 0.7) * 2.0;
    edge = clamp(edge, 0.0, 1.0);

    vec3 edgeColor = vec3(1.0, 1.0, 1.0);

    vec3 darkBase = vec3(0.0);
    vec3 baseColor = mix(texColor.rgb, darkBase, uDarkness);

    float edgeGlow = edge * uEdgeIntensity * 2.0;
    baseColor += edgeColor * edgeGlow;

    vec3 finalColor = clamp(baseColor, 0.0, 1.0);

    gl_FragColor = vec4(finalColor, texColor.a);
  }
`;
var Scene = ({ imageFront, imageBack, scrollYProgress }) => {
  const [texture1, texture2] = useTexture([imageFront, imageBack]);
  const material1Ref = useRef(null);
  const material2Ref = useRef(null);
  const { size } = useThree();
  const invalidate = useThree((state) => state.invalidate);
  useEffect(() => scrollYProgress.on("change", () => invalidate()), [invalidate, scrollYProgress]);
  const uniforms1 = useMemo(
    () => ({
      uTexture: { value: texture1 },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uImageResolution: {
        value: new THREE.Vector2(texture1.image.width, texture1.image.height)
      },
      uDissolve: { value: 0 },
      uCenter: { value: new THREE.Vector2(0.5, 0.5) },
      uTime: { value: 0 },
      uGrayscale: { value: 0 },
      uEdgeIntensity: { value: 0 },
      uEdgeBrightness: { value: 1 }
    }),
    [texture1, size]
  );
  const uniforms2 = useMemo(
    () => ({
      uTexture: { value: texture2 },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uImageResolution: {
        value: new THREE.Vector2(texture2.image.width, texture2.image.height)
      },
      uDissolve: { value: 0 },
      uCenter: { value: new THREE.Vector2(0.5, 0.5) },
      uTime: { value: 0 },
      uBrightness: { value: 0 },
      uEdgeIntensity: { value: 0.6 },
      uDarkness: { value: 1 },
      uGrayscale: { value: 1 }
    }),
    [texture2, size]
  );
  useFrame((state) => {
    const timeInSeconds = state.clock.getElapsedTime();
    const progress = scrollYProgress.get();
    if (material1Ref.current) {
      material1Ref.current.uniforms.uTime.value = timeInSeconds;
      material1Ref.current.uniforms.uResolution.value.set(
        size.width,
        size.height
      );
      material1Ref.current.uniforms.uDissolve.value = progress;
      const grayscaleProgress = Math.min(1, progress / 0.4);
      material1Ref.current.uniforms.uGrayscale.value = grayscaleProgress;
      material1Ref.current.uniforms.uEdgeIntensity.value = progress * 0.5;
      material1Ref.current.uniforms.uEdgeBrightness.value = 1 - progress;
    }
    if (material2Ref.current) {
      material2Ref.current.uniforms.uTime.value = timeInSeconds;
      material2Ref.current.uniforms.uResolution.value.set(
        size.width,
        size.height
      );
      const acceleratedProgress = Math.min(1, progress * 1.1);
      material2Ref.current.uniforms.uEdgeIntensity.value = 0.6 * (1 - acceleratedProgress);
      material2Ref.current.uniforms.uDarkness.value = 1 - acceleratedProgress;
      material2Ref.current.uniforms.uGrayscale.value = 1 - acceleratedProgress;
    }
  });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("mesh", { position: [0, 0, -0.1], children: [
      /* @__PURE__ */ jsx("planeGeometry", { args: [2, 2] }),
      /* @__PURE__ */ jsx(
        "shaderMaterial",
        {
          ref: material2Ref,
          vertexShader: coverVertexShader,
          fragmentShader: coverFragmentShaderReverse,
          uniforms: uniforms2,
          transparent: true
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("mesh", { position: [0, 0, 0], children: [
      /* @__PURE__ */ jsx("planeGeometry", { args: [2, 2] }),
      /* @__PURE__ */ jsx(
        "shaderMaterial",
        {
          ref: material1Ref,
          vertexShader: coverVertexShader,
          fragmentShader: coverFragmentShader,
          uniforms: uniforms1,
          transparent: true
        }
      )
    ] })
  ] });
};
function ScrollDissolveReveal({
  imageFront,
  imageBack,
  className,
  containerClassName,
  scrollContainerRef
}) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
    ...scrollContainerRef && { container: scrollContainerRef }
  });
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref: containerRef,
      className: cn("relative h-[300vh] w-full", containerClassName),
      children: /* @__PURE__ */ jsx("div", { className: cn("sticky top-0 h-screen w-full", className), children: /* @__PURE__ */ jsxs(Canvas, { dpr: 1, frameloop: "demand", gl: { antialias: false, alpha: false }, children: [
        /* @__PURE__ */ jsx(
          OrthographicCamera,
          {
            makeDefault: true,
            manual: true,
            left: -1,
            right: 1,
            top: 1,
            bottom: -1,
            near: 0.1,
            far: 10,
            position: [0, 0, 1]
          }
        ),
        /* @__PURE__ */ jsx(React.Suspense, { fallback: null, children: /* @__PURE__ */ jsx(
          Scene,
          {
            imageFront,
            imageBack,
            scrollYProgress
          }
        ) })
      ] }) })
    }
  );
}

// entry.jsx
import React3 from "react";

// registry:components/docs/scroll-dissolve-reveal-demo.tsx
import { useRef as useRef2 } from "react";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function ScrollDissolveRevealDemo() {
  const scrollRef = useRef2(null);
  return /* @__PURE__ */ jsxs2("div", { ref: scrollRef, className: "w-full h-full overflow-y-auto relative bg-zinc-950", children: [
    /* @__PURE__ */ jsxs2("div", { className: "h-full w-full flex items-center justify-center text-white flex-col gap-4", children: [
      /* @__PURE__ */ jsx2("h1", { className: "text-4xl font-bold tracking-tighter", children: "Scroll Down" }),
      /* @__PURE__ */ jsx2("p", { className: "text-zinc-500", children: "To see the dissolve reveal effect" })
    ] }),
    /* @__PURE__ */ jsx2(
      ScrollDissolveReveal,
      {
        scrollContainerRef: scrollRef,
        containerClassName: "h-[300%]",
        className: "h-1/3",
        imageFront: "https://images.unsplash.com/photo-1577081395884-e70fc91645ad?q=80&w=1134&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        imageBack: "https://images.unsplash.com/photo-1705167110557-a16203e0fe24?q=80&w=1274&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      }
    ),
    /* @__PURE__ */ jsxs2("div", { className: "h-full w-full flex items-center justify-center text-white flex-col gap-4", children: [
      /* @__PURE__ */ jsx2("h1", { className: "text-4xl font-bold tracking-tighter", children: "End of Effect" }),
      /* @__PURE__ */ jsx2("p", { className: "text-zinc-500", children: "Scroll up to reverse" })
    ] })
  ] });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(ScrollDissolveRevealDemo, {}) }) });
}
export {
  ScrollDissolveReveal,
  Component as default
};

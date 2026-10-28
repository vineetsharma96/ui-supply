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
// Adapted from https://www.vengenceui.com/components/ripple-displacement-slider
// Copyright (c) 2025-2026 Ashutoshx7. See licenses/vengeance.txt for usage terms.
// entry.jsx
import React2 from "react";

// registry:components/ui/ripple-displacement-slider.tsx
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/ripple-displacement-slider.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var DEFAULT_SLIDES = [
  {
    title: "Goku",
    description: "The Earth's greatest defender. Constantly pushing past his limits to achieve new heights like Ultra Instinct.",
    image: "https://www.vengenceui.com/goku.png"
  },
  {
    title: "Luffy",
    description: "Captain of the Straw Hat Pirates. The Sun God Nika who brings smiles and liberates the seas with Gear 5.",
    image: "https://www.vengenceui.com/luffy.png"
  },
  {
    title: "Naruto",
    description: "The Hero of the Hidden Leaf. Wielding the massive power of the Nine-Tails and Six Paths Sage Mode.",
    image: "https://www.vengenceui.com/naruto.png"
  },
  {
    title: "Ichigo",
    description: "The Substitute Soul Reaper. Combining Hollow, Quincy, and Soul Reaper powers for an unstoppable True Bankai.",
    image: "https://www.vengenceui.com/ichigo.png"
  },
  {
    title: "Zoro",
    description: "The King of Hell. Master of the Three Sword Style, cutting through anything with terrifying conqueror's haki.",
    image: "https://www.vengenceui.com/zoro.png"
  },
  {
    title: "Aizen",
    description: "The ultimate mastermind. Standing at the pinnacle of power with his terrifying spiritual pressure and illusions.",
    image: "https://www.vengenceui.com/aizen.png"
  },
  {
    title: "Vegeta",
    description: "The proud Prince of all Saiyans. Fueled by his rivalry with Goku and his unyielding royal pride.",
    image: "https://www.vengenceui.com/vegeta.png"
  },
  {
    title: "Gohan",
    description: "Possesses hidden potential that surpasses even his father. When pushed to the edge, the Beast awakens.",
    image: "https://www.vengenceui.com/gohan.png"
  },
  {
    title: "Broly",
    description: "A mutant Saiyan of pure, unstoppable rage. His legendary power grows continuously during combat.",
    image: "https://www.vengenceui.com/broly.png"
  },
  {
    title: "Frieza",
    description: "The tyrannical emperor of Universe 7. A ruthless conqueror who always returns with a new, terrifying form.",
    image: "https://www.vengenceui.com/frieza.png"
  }
];
var vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;
var fragmentShader = `
uniform sampler2D uTexCurrent;
uniform sampler2D uTexNext;
uniform float uProgress;
uniform vec2 uResolution;
uniform vec2 uImageRes;
uniform float uWaveFreq;
uniform float uWavePow;
uniform float uWaveWidth;
uniform float uFalloff;
uniform float uBoostStrength;
uniform float uCrossfadeWidth;
uniform float uMobile;

varying vec2 vUv;

vec2 getImageUv(vec2 uv, vec2 screenRes, vec2 imgRes, vec2 boxMin, vec2 boxMax) {
  vec2 boxUv = (uv - boxMin) / (boxMax - boxMin);
  vec2 boxSize = (boxMax - boxMin) * screenRes;
  float boxAspect = boxSize.x / boxSize.y;
  float imgAspect = imgRes.x / imgRes.y;
  vec2 scale = vec2(1.0);
  if (boxAspect > imgAspect) {
    scale.y = imgAspect / boxAspect;
  } else {
    scale.x = boxAspect / imgAspect;
  }
  return (boxUv - 0.5) * scale + 0.5;
}

bool isInsideBox(vec2 uv, vec2 boxMin, vec2 boxMax) {
  return uv.x >= boxMin.x && uv.x <= boxMax.x && uv.y >= boxMin.y && uv.y <= boxMax.y;
}

void main() {
  vec2 boxMin = mix(vec2(0.25, 0.175), vec2(0.0), uMobile);
  vec2 boxMax = mix(vec2(0.75, 0.825), vec2(1.0), uMobile);

  float aspectRatio = uResolution.y / uResolution.x;
  vec2 coord = vec2(vUv.x, vUv.y * aspectRatio);
  vec2 center = vec2(0.5, 0.5 * aspectRatio);

  float dist = distance(coord, center);
  float time = uProgress;

  vec2 displaced = coord;
  float brightness = 0.0;
  float blend = 0.0;

  if (time > 0.001) {
    float trailing = dist - time;
    if (trailing < uWaveWidth && trailing < 0.0) {
      float age = -trailing;
      float decay = exp(-age * uFalloff);
      float wave = sin(age * uWaveFreq) * decay;
      vec2 direction = normalize(coord - center);
      displaced += direction * wave * uWavePow;
      brightness = abs(wave) * uBoostStrength * decay;
    }
    blend = smoothstep(0.0, uCrossfadeWidth, -trailing);
  }

  vec2 finalUv = vec2(displaced.x, displaced.y / aspectRatio);
  vec2 imageUv = getImageUv(finalUv, uResolution, uImageRes, boxMin, boxMax);

  vec4 currentColor = texture2D(uTexCurrent, imageUv);
  vec4 nextColor = texture2D(uTexNext, imageUv);

  vec4 color = mix(currentColor, nextColor, blend);
  color.rgb += color.rgb * brightness;

  if (!isInsideBox(finalUv, boxMin, boxMax)) {
    color = vec4(0.0);
  }

  gl_FragColor = color;
}
`;
var rippleConfig = {
  waveFreq: 25,
  wavePow: 0.035,
  waveWidth: 0.5,
  falloff: 10,
  boostStrength: 0.5,
  crossfadeWidth: 0.05,
  duration: 1.2,
  endValue: 1,
  ease: "power2.inOut"
};
function RippleDisplacementSlider({
  className,
  slides = DEFAULT_SLIDES
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const contentRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [texturesLoaded, setTexturesLoaded] = useState(false);
  const materialRef = useRef(null);
  const texturesRef = useRef([]);
  const isTransitioning = useRef(false);
  const renderSplitTitle = (title) => {
    return title.split("").map((char, i) => /* @__PURE__ */ jsx("span", { className: "inline-block overflow-hidden relative", children: /* @__PURE__ */ jsx("span", { className: "char inline-block will-change-transform relative", children: char === " " ? "\xA0" : char }) }, i));
  };
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0.01, 10);
    camera.position.z = 1;
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0, 0);
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin("anonymous");
    const loadFirstTexture = new Promise((resolve) => {
      loader.load(
        slides[0].image,
        (texture) => {
          texture.minFilter = THREE.LinearFilter;
          texture.magFilter = THREE.LinearFilter;
          texture.wrapS = THREE.ClampToEdgeWrapping;
          texture.wrapT = THREE.ClampToEdgeWrapping;
          resolve(texture);
        },
        void 0,
        (err) => {
          console.error("Failed to load first texture", err);
          resolve(new THREE.Texture());
        }
      );
    });
    loadFirstTexture.then((firstTex) => {
      const allTextures = slides.map((slide, idx) => {
        if (idx === 0) return firstTex;
        const tex = loader.load(slide.image);
        tex.minFilter = THREE.LinearFilter;
        tex.magFilter = THREE.LinearFilter;
        tex.wrapS = THREE.ClampToEdgeWrapping;
        tex.wrapT = THREE.ClampToEdgeWrapping;
        return tex;
      });
      texturesRef.current = allTextures;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      const isMobile = width < 1e3;
      const imgWidth = firstTex.image?.width || 1920;
      const imgHeight = firstTex.image?.height || 1080;
      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTexCurrent: { value: allTextures[0] },
          uTexNext: { value: allTextures[1 % slides.length] },
          uProgress: { value: 0 },
          uResolution: { value: new THREE.Vector2(width, height) },
          uImageRes: { value: new THREE.Vector2(imgWidth, imgHeight) },
          uWaveFreq: { value: rippleConfig.waveFreq },
          uWavePow: { value: rippleConfig.wavePow },
          uWaveWidth: { value: rippleConfig.waveWidth },
          uFalloff: { value: rippleConfig.falloff },
          uBoostStrength: { value: rippleConfig.boostStrength },
          uCrossfadeWidth: { value: rippleConfig.crossfadeWidth },
          uMobile: { value: isMobile ? 1 : 0 }
        },
        transparent: true
      });
      materialRef.current = material;
      const geometry = new THREE.PlaneGeometry(1, 1);
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
      const resize = () => {
        if (!containerRef.current) return;
        const w = containerRef.current.clientWidth;
        const h = containerRef.current.clientHeight;
        renderer.setSize(w, h);
        material.uniforms.uResolution.value.set(w, h);
        material.uniforms.uMobile.value = w < 1e3 ? 1 : 0;
        const ratio = h / w;
        const cx = 0.5;
        const cy = 0.5 * ratio;
        const maxDist = Math.sqrt(cx * cx + cy * cy);
        rippleConfig.endValue = maxDist + rippleConfig.waveWidth;
        rippleConfig.duration = w <= 1e3 ? 0.9 : 1.2;
      };
      resize();
      window.addEventListener("resize", resize);
      gsap.ticker.add(() => {
        renderer.render(scene, camera);
      });
      setTexturesLoaded(true);
      const ctx = gsap.context(() => {
        const chars = document.querySelectorAll(".char");
        gsap.fromTo(
          chars,
          { y: "100%" },
          { y: "0%", duration: 0.8, stagger: 0.025, ease: "power2.out" }
        );
      }, contentRef);
      return () => {
        window.removeEventListener("resize", resize);
        gsap.ticker.remove(() => renderer.render(scene, camera));
        renderer.dispose();
        geometry.dispose();
        material.dispose();
        ctx.revert();
      };
    });
  }, [slides]);
  const handleNextSlide = () => {
    if (isTransitioning.current || !materialRef.current || !texturesRef.current.length) return;
    isTransitioning.current = true;
    const nextIndex = (currentIndex + 1) % slides.length;
    const chars = contentRef.current?.querySelectorAll(".char");
    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentIndex(nextIndex);
        setTimeout(() => {
          const newChars = contentRef.current?.querySelectorAll(".char");
          if (!newChars) return;
          gsap.set(newChars, { y: "100%" });
          gsap.to(newChars, {
            y: "0%",
            duration: 0.5,
            stagger: 0.015,
            ease: "power3.out"
          });
        }, 50);
      }
    });
    tl.to(chars || [], {
      y: "-100%",
      duration: 0.3,
      stagger: 0.01,
      ease: "power2.in"
    });
    const material = materialRef.current;
    material.uniforms.uTexNext.value = texturesRef.current[nextIndex];
    gsap.to(material.uniforms.uProgress, {
      value: rippleConfig.endValue,
      duration: rippleConfig.duration,
      ease: rippleConfig.ease,
      onComplete: () => {
        material.uniforms.uTexCurrent.value = texturesRef.current[nextIndex];
        material.uniforms.uProgress.value = 0;
        isTransitioning.current = false;
      }
    });
  };
  useEffect(() => {
    if (!texturesLoaded) return;
    const timer = setTimeout(() => {
      handleNextSlide();
    }, 5e3);
    return () => clearTimeout(timer);
  }, [currentIndex, texturesLoaded]);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: containerRef,
      className: cn("slider relative w-full h-full min-h-[600px] overflow-hidden bg-[#e0ddcf] dark:bg-black cursor-pointer", className),
      onClick: handleNextSlide,
      children: [
        /* @__PURE__ */ jsx("canvas", { ref: canvasRef, className: "block w-full h-full absolute inset-0 z-0" }),
        /* @__PURE__ */ jsx(
          "div",
          {
            ref: contentRef,
            className: "slide-content absolute inset-0 w-full h-full mix-blend-difference select-none pointer-events-none z-[2]",
            style: { opacity: texturesLoaded ? 1 : 0, transition: "opacity 0.5s ease" },
            children: /* @__PURE__ */ jsx("div", { className: "slide-title absolute top-1/2 left-12 -translate-y-1/2 w-max text-white max-[1000px]:top-1/2 max-[1000px]:left-1/2 max-[1000px]:-translate-x-1/2 max-[1000px]:-translate-y-1/2", children: /* @__PURE__ */ jsx("h1", { className: "text-[clamp(2rem,4vw,6rem)] font-medium tracking-[-0.02em] leading-tight", children: renderSplitTitle(slides[currentIndex].title) }) })
          }
        )
      ]
    }
  );
}
var ripple_displacement_slider_default = RippleDisplacementSlider;

// entry.jsx
import { jsx as jsx2 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx2("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx2("div", { className: "vendor-content", children: /* @__PURE__ */ jsx2(ripple_displacement_slider_default, {}) }) });
}
export {
  Component as default
};

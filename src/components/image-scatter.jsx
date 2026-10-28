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
// Adapted from https://www.vengenceui.com/components/image-scatter
// Copyright (c) 2025-2026 Ashutoshx7. See licenses/vengeance.txt for usage terms.
// registry:components/ui/image-scatter.tsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/image-scatter.tsx
import { jsx, jsxs } from "react/jsx-runtime";
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
function ImageScatter({
  data,
  cardWidth = 250,
  cardHeight = 300,
  animationDuration = 0.75,
  animationOverlap = 0.5,
  headingFadeDuration = 0.5,
  scroller,
  className,
  ...props
}) {
  const containerRef = useRef(null);
  const galleryRef = useRef(null);
  const headingRef = useRef(null);
  useEffect(() => {
    if (!containerRef.current || !galleryRef.current || !headingRef.current || data.length === 0) return;
    const gallery = galleryRef.current;
    const galleryHeading = headingRef.current;
    let viewport = {
      centerX: containerRef.current.clientWidth / 2,
      centerY: containerRef.current.clientHeight / 2,
      rangeMin: Math.min(containerRef.current.clientWidth, containerRef.current.clientHeight) * 0.35,
      rangeMax: Math.min(containerRef.current.clientWidth, containerRef.current.clientHeight) * 0.7
    };
    let state = {
      activeCards: [],
      currentSection: 0,
      isAnimating: false
    };
    function updateViewport() {
      if (!containerRef.current) return;
      viewport.centerX = containerRef.current.clientWidth / 2;
      viewport.centerY = containerRef.current.clientHeight / 2;
      viewport.rangeMin = Math.min(containerRef.current.clientWidth, containerRef.current.clientHeight) * 0.35;
      viewport.rangeMax = Math.min(containerRef.current.clientWidth, containerRef.current.clientHeight) * 0.7;
    }
    function getEdgePosition(centerX, centerY) {
      const containerWidth = containerRef.current?.clientWidth || window.innerWidth;
      const containerHeight = containerRef.current?.clientHeight || window.innerHeight;
      const distances = {
        left: centerX,
        right: containerWidth - centerX,
        top: centerY,
        bottom: containerHeight - centerY
      };
      const minDistance = Math.min(...Object.values(distances));
      const cardCenterOffsetX = cardWidth / 2;
      const cardCenterOffsetY = cardHeight / 2;
      const offsetVariation = () => (Math.random() - 0.5) * 400;
      if (minDistance === distances.left) {
        return {
          x: -cardWidth - 100 - Math.random() * 200,
          y: centerY - cardCenterOffsetY + offsetVariation()
        };
      }
      if (minDistance === distances.right) {
        return {
          x: containerWidth + 50 + Math.random() * 200,
          y: centerY - cardCenterOffsetY + offsetVariation()
        };
      }
      if (minDistance === distances.top) {
        return {
          x: centerX - cardCenterOffsetX + offsetVariation(),
          y: -cardHeight - 100 - Math.random() * 200
        };
      }
      return {
        x: centerX - cardCenterOffsetX + offsetVariation(),
        y: containerHeight + 50 + Math.random() * 200
      };
    }
    function createCards(sectionIndex) {
      const cards = [];
      const sectionData = data[sectionIndex];
      if (!sectionData || !sectionData.images.length) return cards;
      sectionData.images.forEach((src) => {
        const card = document.createElement("div");
        card.className = "absolute rounded-2xl border-8 border-white dark:border-neutral-800 shadow-xl overflow-hidden will-change-transform";
        card.style.width = `${cardWidth}px`;
        card.style.height = `${cardHeight}px`;
        const img = document.createElement("img");
        img.src = src;
        img.className = "w-full h-full object-cover rounded-lg pointer-events-none";
        card.appendChild(img);
        const angle = Math.random() * Math.PI * 2;
        const radius = viewport.rangeMin + Math.random() * (viewport.rangeMax - viewport.rangeMin);
        const centerX = viewport.centerX + Math.cos(angle) * radius;
        const centerY = viewport.centerY + Math.sin(angle) * radius;
        gsap.set(card, {
          left: centerX - cardWidth / 2,
          top: centerY - cardHeight / 2,
          rotation: Math.random() * 50 - 25
        });
        gallery.appendChild(card);
        cards.push({ element: card, centerX, centerY });
      });
      return cards;
    }
    function animateHeading(newText) {
      return gsap.timeline().to(galleryHeading, {
        opacity: 0,
        duration: headingFadeDuration,
        ease: "power2.inOut"
      }).call(() => {
        galleryHeading.textContent = newText;
      }).to(galleryHeading, {
        opacity: 1,
        duration: headingFadeDuration,
        ease: "power2.inOut"
      });
    }
    function animateCards(exitingCards, enteringCards) {
      const tl = gsap.timeline();
      exitingCards.forEach(({ element, centerX, centerY }) => {
        const targetEdge = getEdgePosition(centerX, centerY);
        tl.to(
          element,
          {
            left: targetEdge.x,
            top: targetEdge.y,
            rotation: Math.random() * 180 - 90,
            duration: animationDuration,
            ease: "power2.in",
            onComplete: () => element.remove()
          },
          0
        );
      });
      enteringCards.forEach(({ element, centerX, centerY }) => {
        const targetEdge = getEdgePosition(centerX, centerY);
        gsap.set(element, {
          left: targetEdge.x,
          top: targetEdge.y,
          rotation: Math.random() * 180 - 90
        });
        tl.to(
          element,
          {
            left: centerX - cardWidth / 2,
            top: centerY - cardHeight / 2,
            rotation: Math.random() * 50 - 25,
            duration: animationDuration,
            ease: "power2.out"
          },
          animationOverlap
        );
      });
      return tl;
    }
    function getSectionIndex(progress) {
      const totalSections = data.length;
      const sectionProgress = Math.min(progress * totalSections, totalSections - 0.01);
      return Math.floor(sectionProgress);
    }
    function reinitialize() {
      state.activeCards.forEach(({ element }) => element.remove());
      updateViewport();
      state.activeCards = createCards(state.currentSection);
    }
    state.activeCards = createCards(0);
    galleryHeading.textContent = data[0]?.heading || "";
    gsap.set(galleryHeading, { opacity: 1 });
    let intervalId;
    function nextSection() {
      if (state.isAnimating) return;
      const targetSection = (state.currentSection + 1) % data.length;
      state.isAnimating = true;
      const newCards = createCards(targetSection);
      Promise.all([
        animateCards(state.activeCards, newCards).then(),
        animateHeading(data[targetSection]?.heading || "").then()
      ]).then(() => {
        state.activeCards = newCards;
        state.currentSection = targetSection;
        state.isAnimating = false;
      });
    }
    intervalId = setInterval(nextSection, 3e3);
    const handleResize = () => {
      reinitialize();
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(intervalId);
      state.activeCards.forEach(({ element }) => element.remove());
    };
  }, [data, cardWidth, cardHeight, animationDuration, animationOverlap, headingFadeDuration]);
  return /* @__PURE__ */ jsxs(
    "section",
    {
      ref: containerRef,
      className: cn("relative w-full h-full flex justify-center items-center overflow-hidden bg-transparent", className),
      ...props,
      children: [
        /* @__PURE__ */ jsx("div", { ref: galleryRef, className: "absolute inset-0 pointer-events-none" }),
        /* @__PURE__ */ jsx(
          "h1",
          {
            ref: headingRef,
            className: "w-[90%] md:w-[45%] text-center text-4xl md:text-5xl lg:text-7xl font-serif font-medium leading-tight tracking-tight z-10 will-change-[opacity] text-neutral-900 dark:text-white"
          }
        )
      ]
    }
  );
}

// entry.jsx
import React2 from "react";

// registry:components/docs/image-scatter-demo.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
function ImageScatterDemo() {
  const mockData = [
    {
      heading: "Order is temporary while you're passing through",
      images: [
        "https://picsum.photos/seed/1/400/500",
        "https://picsum.photos/seed/2/400/500",
        "https://picsum.photos/seed/3/400/500",
        "https://picsum.photos/seed/4/400/500",
        "https://picsum.photos/seed/5/400/500",
        "https://picsum.photos/seed/6/400/500",
        "https://picsum.photos/seed/7/400/500",
        "https://picsum.photos/seed/8/400/500"
      ]
    },
    {
      heading: "Memories shuffle like cards in an endless deck",
      images: [
        "https://picsum.photos/seed/9/400/500",
        "https://picsum.photos/seed/10/400/500",
        "https://picsum.photos/seed/11/400/500",
        "https://picsum.photos/seed/12/400/500",
        "https://picsum.photos/seed/13/400/500",
        "https://picsum.photos/seed/14/400/500",
        "https://picsum.photos/seed/15/400/500",
        "https://picsum.photos/seed/16/400/500"
      ]
    },
    {
      heading: "Each moment scatters as another takes its place",
      images: [
        "https://picsum.photos/seed/17/400/500",
        "https://picsum.photos/seed/18/400/500",
        "https://picsum.photos/seed/19/400/500",
        "https://picsum.photos/seed/20/400/500",
        "https://picsum.photos/seed/21/400/500",
        "https://picsum.photos/seed/22/400/500",
        "https://picsum.photos/seed/23/400/500",
        "https://picsum.photos/seed/24/400/500"
      ]
    },
    {
      heading: "The fragments float before settling once more",
      images: [
        "https://picsum.photos/seed/25/400/500",
        "https://picsum.photos/seed/26/400/500",
        "https://picsum.photos/seed/27/400/500",
        "https://picsum.photos/seed/28/400/500",
        "https://picsum.photos/seed/29/400/500",
        "https://picsum.photos/seed/30/400/500",
        "https://picsum.photos/seed/31/400/500",
        "https://picsum.photos/seed/32/400/500"
      ]
    }
  ];
  return /* @__PURE__ */ jsx2("div", { className: "w-full h-full flex justify-center items-center", children: /* @__PURE__ */ jsx2(
    ImageScatter,
    {
      data: mockData,
      cardWidth: 200,
      cardHeight: 250
    }
  ) });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(ImageScatterDemo, {}) }) });
}
export {
  ImageScatter,
  Component as default
};

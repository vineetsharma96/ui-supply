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
// Adapted from https://www.vengenceui.com/components/magnetic-spotlight-marquee
// Copyright (c) 2025-2026 Ashutoshx7. See licenses/vengeance.txt for usage terms.
// registry:components/ui/magnetic-spotlight-marquee.tsx
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/magnetic-spotlight-marquee.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var config = {
  marqueeScrollSpeed: 180,
  // Increased for a faster, dynamic feel
  stripFollowEase: 0.05,
  stripEdgeInset: 175,
  contentRiseRate: 0.85,
  risenTopGap: 100,
  liftHeadStart: 125,
  wakeStrength: 2.5,
  wakeReach: 125,
  lineSettleEase: 0.09
};
var DEFAULT_IMAGES = [
  "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1541562232579-512a21360020?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1560972550-aba3456b5564?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?q=80&w=800&auto=format&fit=crop"
];
var DEFAULT_TITLE = ["VengeanceUI"];
var DEFAULT_SUBTITLE = ["BUILD FASTER", "SHIP BETTER"];
var DEFAULT_PARAGRAPHS = [
  [
    "Vengeance UI is a premium component library",
    "specializing in smooth animations, interactive",
    "interfaces, and modern design."
  ],
  [
    "We prioritize developer experience and aesthetics.",
    "Our components span across complex interactions,",
    "3D elements, and smooth animations built",
    "for React and modern frameworks. Our library is tailored",
    "to distinct challenges within modern web development."
  ]
];
function MagneticSpotlightMarquee({
  className,
  images = DEFAULT_IMAGES,
  title = DEFAULT_TITLE,
  subtitle = DEFAULT_SUBTITLE,
  paragraphs = DEFAULT_PARAGRAPHS,
  navEmail = "hello@vengeance.ui",
  navLinks = "Documentation, Components, GitHub",
  footerText = "We navigate in no-nonsense environments pushing the boundaries of web design. Whether you're a startup or a global leader, building a new identity or interactive platform, Vengeance UI is your partner in innovation. Our premium components ensure that every project feels magical, collaborative, and smooth."
}) {
  const containerRef = useRef(null);
  const marqueeStripRef = useRef(null);
  const marqueeTrackRef = useRef(null);
  const contentWrapperRef = useRef(null);
  const [clonedImages, setClonedImages] = useState(images);
  useEffect(() => {
    if (!marqueeTrackRef.current || !marqueeStripRef.current || !containerRef.current || !contentWrapperRef.current) return;
    const marqueeTrack = marqueeTrackRef.current;
    const isMobile = window.innerWidth < 768;
    const itemWidth = isMobile ? 140 : 180;
    const gap = 16;
    const oneSetWidth = images.length * (itemWidth + gap);
    const setsNeeded = Math.ceil(window.innerWidth / oneSetWidth) + 2;
    const newImages = [];
    for (let i = 0; i < setsNeeded; i++) {
      newImages.push(...images);
    }
    setClonedImages(newImages);
    const ctx = gsap.context(() => {
      setTimeout(() => {
        gsap.to(marqueeTrack, {
          x: `-${oneSetWidth}px`,
          duration: oneSetWidth / 600,
          // Hardcoded even faster speed (600)
          ease: "none",
          repeat: -1,
          modifiers: {
            x: (x) => `${gsap.utils.wrap(-oneSetWidth, 0, parseFloat(x))}px`
          }
        });
      }, 100);
    }, marqueeTrack);
    return () => ctx.revert();
  }, [images]);
  useEffect(() => {
    if (!containerRef.current || !marqueeStripRef.current || !contentWrapperRef.current) return;
    const spotlightSection = containerRef.current;
    const marqueeStrip = marqueeStripRef.current;
    let stripBaseTop = 0;
    let stripHeight = 0;
    let sectionHeight = 0;
    let stripRestCenterY = 0;
    let contentTopAtRest = 0;
    let stripTargetY = 0;
    let stripCurrentY = 0;
    let stripPrevY = 0;
    let hasPointerMoved = false;
    let targets = [];
    let rafId;
    const measureGeometry = () => {
      sectionHeight = spotlightSection.getBoundingClientRect().height;
      stripBaseTop = marqueeStrip.offsetTop;
      stripHeight = marqueeStrip.offsetHeight;
      stripRestCenterY = config.stripEdgeInset;
      const elements = Array.from(spotlightSection.querySelectorAll(".wake-target"));
      let blockTop = Infinity;
      targets = elements.map((el) => {
        let y = 0;
        let node = el;
        while (node && node !== spotlightSection) {
          y += node.offsetTop;
          node = node.offsetParent;
        }
        const restCenterY = y + el.offsetHeight / 2;
        blockTop = Math.min(blockTop, restCenterY - el.offsetHeight / 2);
        return {
          el,
          restCenterY,
          currentY: 0
        };
      });
      contentTopAtRest = isFinite(blockTop) ? blockTop : sectionHeight * 0.4;
      if (!hasPointerMoved) {
        const restY = config.stripEdgeInset - stripHeight / 2;
        stripTargetY = restY;
        stripCurrentY = restY;
        stripPrevY = restY;
        gsap.set(marqueeStrip, { y: stripCurrentY });
      }
    };
    setTimeout(measureGeometry, 100);
    window.addEventListener("resize", measureGeometry);
    const handlePointerMove = (e) => {
      hasPointerMoved = true;
      const rect = spotlightSection.getBoundingClientRect();
      const pointerY = e.clientY - rect.top;
      stripTargetY = pointerY - stripHeight / 2;
    };
    const handlePointerLeave = () => {
      hasPointerMoved = false;
      stripTargetY = config.stripEdgeInset - stripHeight / 2;
    };
    spotlightSection.addEventListener("mousemove", handlePointerMove);
    spotlightSection.addEventListener("mouseleave", handlePointerLeave);
    const render = () => {
      stripCurrentY += (stripTargetY - stripCurrentY) * config.stripFollowEase;
      gsap.set(marqueeStrip, { y: stripCurrentY });
      const stripCenterY = stripBaseTop + stripCurrentY + stripHeight / 2;
      const stripVelocityY = stripCurrentY - stripPrevY;
      stripPrevY = stripCurrentY;
      const descentBelowRest = Math.max(0, stripCenterY - stripRestCenterY);
      const maxRise = Math.max(0, contentTopAtRest - config.risenTopGap);
      const contentRise = -Math.min(
        descentBelowRest * config.contentRiseRate,
        maxRise
      );
      targets.forEach((line) => {
        const gapToStrip = line.restCenterY - stripCenterY;
        const reachedLine = stripCenterY + config.liftHeadStart >= line.restCenterY;
        const wakeInfluence = Math.exp(
          -(gapToStrip * gapToStrip) / (2 * config.wakeReach * config.wakeReach)
        );
        const wakeOffset = stripVelocityY * wakeInfluence * config.wakeStrength;
        const lineTarget = (reachedLine ? contentRise : 0) + wakeOffset;
        line.currentY += (lineTarget - line.currentY) * config.lineSettleEase;
        gsap.set(line.el, { y: line.currentY });
      });
      rafId = requestAnimationFrame(render);
    };
    rafId = requestAnimationFrame(render);
    return () => {
      window.removeEventListener("resize", measureGeometry);
      spotlightSection.removeEventListener("mousemove", handlePointerMove);
      spotlightSection.removeEventListener("mouseleave", handlePointerLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);
  return /* @__PURE__ */ jsxs(
    "section",
    {
      ref: containerRef,
      className: cn(
        "spotlight relative w-full h-[100vh] min-h-[800px] overflow-hidden bg-white dark:bg-[#0f0f0f] text-white font-sans",
        className
      ),
      style: { fontFamily: "'Instrument Sans', sans-serif" },
      children: [
        /* @__PURE__ */ jsxs("div", { className: "absolute top-0 left-0 w-full p-6 flex flex-col items-center justify-center z-50 text-[10px] md:text-xs font-medium tracking-wide opacity-90 mix-blend-difference pointer-events-none", children: [
          /* @__PURE__ */ jsx("div", { children: navEmail }),
          /* @__PURE__ */ jsx("div", { children: navLinks })
        ] }),
        /* @__PURE__ */ jsx(
          "div",
          {
            ref: marqueeStripRef,
            className: "spotlight-marquee absolute left-0 w-full z-20 h-[160px] md:h-[200px] pointer-events-none",
            style: { top: 0 },
            children: /* @__PURE__ */ jsx(
              "div",
              {
                ref: marqueeTrackRef,
                className: "spotlight-marquee-track flex gap-4 h-full items-center absolute top-0 left-0",
                children: clonedImages.map((img, idx) => /* @__PURE__ */ jsx("div", { className: "w-[140px] h-[140px] md:w-[180px] md:h-[180px] shrink-0 rounded-[20px] overflow-hidden shadow-sm bg-neutral-100 dark:bg-neutral-900", children: /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: img,
                    alt: "Marquee item",
                    className: "w-full h-full object-cover",
                    loading: "lazy"
                  }
                ) }, idx))
              }
            )
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            ref: contentWrapperRef,
            className: "spotlight-content-wrapper relative w-full h-full flex flex-col items-center justify-center px-6 md:px-12 lg:px-24 z-30 pointer-events-none mix-blend-difference",
            children: [
              /* @__PURE__ */ jsx(
                "h1",
                {
                  className: "text-[15vw] md:text-[12rem] font-normal leading-[0.85] tracking-tighter mb-20 text-center flex flex-col items-center",
                  style: { fontFamily: "'Instrument Serif', serif" },
                  children: title.map((line, idx) => /* @__PURE__ */ jsxs("div", { className: "wake-target inline-block relative", children: [
                    line,
                    line === "Studio" && /* @__PURE__ */ jsx("span", { className: "absolute right-[0.45em] top-[0.1em] w-[0.25em] h-[0.25em] bg-white rounded-full" })
                  ] }, idx))
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start mt-8 px-4 md:px-8 gap-8 md:gap-4", children: [
                /* @__PURE__ */ jsx("div", { className: "flex-1 md:max-w-[280px] text-right md:text-right mt-1", children: /* @__PURE__ */ jsx("h3", { className: "text-xl md:text-3xl uppercase tracking-tight font-medium leading-[1.1]", children: subtitle.map((line, idx) => /* @__PURE__ */ jsx("div", { className: "wake-target", children: line }, idx)) }) }),
                /* @__PURE__ */ jsx("div", { className: "flex-1 flex flex-col sm:flex-row gap-6 md:gap-12 text-[10px] md:text-xs leading-[1.6]", children: paragraphs.map((para, pIdx) => /* @__PURE__ */ jsx("div", { className: "flex-1 flex flex-col", children: para.map((line, lIdx) => /* @__PURE__ */ jsx("div", { className: "wake-target whitespace-nowrap", children: line }, lIdx)) }, pIdx)) })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-full p-8 z-40 flex justify-center pointer-events-none mix-blend-difference", children: /* @__PURE__ */ jsx("p", { className: "text-[8px] md:text-[10px] text-white/70 max-w-2xl text-center leading-[1.6]", children: footerText }) })
      ]
    }
  );
}
var magnetic_spotlight_marquee_default = MagneticSpotlightMarquee;

// entry.jsx
import React2 from "react";

// registry:components/docs/magnetic-spotlight-marquee-demo.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
function MagneticSpotlightMarqueeDemo() {
  return /* @__PURE__ */ jsx2("div", { className: "w-full flex items-center justify-center bg-background py-10 rounded-xl overflow-hidden", children: /* @__PURE__ */ jsx2(magnetic_spotlight_marquee_default, {}) });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(MagneticSpotlightMarqueeDemo, {}) }) });
}
export {
  MagneticSpotlightMarquee,
  Component as default
};

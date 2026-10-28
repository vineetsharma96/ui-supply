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
// Adapted from https://www.vengenceui.com/components/staggered-grid
// Copyright (c) 2025-2026 Ashutoshx7. See licenses/vengeance.txt for usage terms.
// registry:components/ui/staggered-grid.tsx
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import imagesLoaded from "imagesloaded";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/staggered-grid.tsx
import { FaGithub, FaSlack, FaTwitter } from "react-icons/fa";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
gsap.registerPlugin(ScrollTrigger);
function StaggeredGrid({
  images,
  bentoItems,
  centerText = "Halcyon",
  credits = {
    madeBy: { text: "@codrops", href: "https://x.com/codrops" },
    moreDemos: { text: "More demos", href: "https://tympanus.net/codrops/demos" }
  },
  className,
  showFooter = true,
  scroller
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const gridFullRef = useRef(null);
  const textRef = useRef(null);
  const [activeBento, setActiveBento] = useState(0);
  const splitText = (text) => {
    return text.split("").map((char, i) => /* @__PURE__ */ jsx("span", { className: "char inline-block", style: { willChange: "transform" }, children: char === " " ? "\xA0" : char }, i));
  };
  useEffect(() => {
    const handleLoad = () => {
      document.body.classList.remove("loading");
      setIsLoaded(true);
    };
    const imgLoad = imagesLoaded(document.querySelectorAll(".grid__item-img"), { background: true }, handleLoad);
    return () => {
    };
  }, []);
  useEffect(() => {
    if (!isLoaded) return;
    if (textRef.current) {
      const chars = textRef.current.querySelectorAll(".char");
      gsap.timeline({
        scrollTrigger: {
          trigger: textRef.current,
          scroller: scroller || void 0,
          start: "top bottom",
          end: "center center-=25%",
          scrub: 1
        }
      }).from(chars, {
        ease: "sine.out",
        yPercent: 300,
        autoAlpha: 0,
        stagger: {
          each: 0.05,
          from: "center"
        }
      });
    }
    if (gridFullRef.current) {
      const gridFullItems = gridFullRef.current.querySelectorAll(".grid__item");
      const numColumns = getComputedStyle(gridFullRef.current).getPropertyValue("grid-template-columns").split(" ").length;
      const middleColumnIndex = Math.floor(numColumns / 2);
      const columns = Array.from({ length: numColumns }, () => []);
      gridFullItems.forEach((item) => {
        const colAttr = item.getAttribute("data-col");
        const columnIndex = colAttr !== null ? parseInt(colAttr, 10) : 0;
        if (columns[columnIndex]) {
          columns[columnIndex].push(item);
        }
      });
      columns.forEach((columnItems, columnIndex) => {
        const delayFactor = Math.abs(columnIndex - middleColumnIndex) * 0.2;
        gsap.timeline({
          scrollTrigger: {
            trigger: gridFullRef.current,
            scroller: scroller || void 0,
            start: "top bottom",
            end: "center center",
            scrub: 1.5
          }
        }).from(columnItems, {
          yPercent: 450,
          autoAlpha: 0,
          delay: delayFactor,
          ease: "sine.out"
        }).from(columnItems.map((item) => item.querySelector(".grid__item-img")), {
          transformOrigin: "50% 0%",
          ease: "sine.out"
        }, 0);
      });
      const bentoContainer = gridFullRef.current.querySelector(".bento-container");
      if (bentoContainer) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: gridFullRef.current,
            scroller: scroller || void 0,
            start: "top top+=15%",
            end: "bottom center",
            scrub: 1,
            invalidateOnRefresh: true
          }
        });
        tl.to(bentoContainer, {
          y: window.innerHeight * 0.1,
          // Move down relative to grid
          scale: 1.5,
          // Scale up the whole group
          zIndex: 1e3,
          ease: "power2.out",
          // Smooth easing
          duration: 1,
          force3D: true
          // Force hardware acceleration
        }, 0);
      }
    }
  }, [isLoaded]);
  const mixedGridItems = Array.from({ length: 21 }, (_, i) => images[i % images.length]);
  mixedGridItems[16] = "BENTO_GROUP";
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn("shadow relative overflow-hidden w-full", className),
      style: {
        "--grid-item-translate": "0px"
      },
      children: [
        /* @__PURE__ */ jsx("section", { className: "grid place-items-center w-full relative mt-[10vh]", children: /* @__PURE__ */ jsx("div", { ref: textRef, className: "text font-alt uppercase flex content-center text-[clamp(3rem,14vw,10rem)] leading-[0.7] text-neutral-900 dark:text-white", children: splitText(centerText) }) }),
        /* @__PURE__ */ jsx("section", { className: "grid place-items-center w-full relative", children: /* @__PURE__ */ jsxs("div", { ref: gridFullRef, className: "grid--full relative w-full my-[10vh] h-auto aspect-[1.1] max-w-none p-4 grid gap-4 grid-cols-7 grid-rows-5", children: [
          /* @__PURE__ */ jsx("div", { className: "grid-overlay absolute inset-0 z-[15] pointer-events-none opacity-0 bg-white/80 dark:bg-black/80 rounded-lg transition-opacity duration-500" }),
          mixedGridItems.map((item, i) => {
            if (item === "BENTO_GROUP") {
              if (!bentoItems || bentoItems.length === 0) return null;
              return /* @__PURE__ */ jsx("div", { "data-col": 2, className: "grid__item bento-container col-span-3 row-span-1 relative z-20 flex items-center justify-center gap-2 h-full w-full will-change-transform", children: bentoItems.map((bentoItem, index) => {
                const isActive = activeBento === index;
                return /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: cn(
                      "relative cursor-pointer overflow-hidden rounded-2xl h-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]",
                      isActive ? "bg-zinc-900/10 shadow-2xl" : "bg-zinc-950"
                    ),
                    style: { width: isActive ? "60%" : "20%" },
                    onMouseEnter: () => setActiveBento(index),
                    onClick: () => setActiveBento(index),
                    children: [
                      /* @__PURE__ */ jsx("div", { className: cn(
                        "absolute inset-0 rounded-2xl border z-50 pointer-events-none transition-colors duration-700",
                        isActive ? "border-zinc-500/50" : "border-zinc-800/50 group-hover:border-zinc-700"
                      ) }),
                      /* @__PURE__ */ jsx("div", { className: "relative z-10 w-full h-full flex flex-col p-0", children: /* @__PURE__ */ jsxs("div", { className: cn(
                        "absolute inset-0 flex flex-col transition-all duration-500 ease-in-out",
                        isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
                      ), children: [
                        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-zinc-900 overflow-hidden z-0 group/img", children: bentoItem.image && /* @__PURE__ */ jsxs(Fragment, { children: [
                          /* @__PURE__ */ jsx(
                            "img",
                            {
                              src: bentoItem.image,
                              alt: bentoItem.title,
                              className: "absolute inset-0 w-full h-full object-cover transition-transform duration-700 opacity-90 group-hover/img:opacity-100"
                            }
                          ),
                          /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" })
                        ] }) }),
                        /* @__PURE__ */ jsxs("div", { className: "absolute bottom-0 left-0 w-full h-20 flex items-center justify-between px-5 z-20", children: [
                          /* @__PURE__ */ jsx("div", { className: "flex flex-col relative z-10", children: /* @__PURE__ */ jsx("h3", { className: "text-sm font-bold text-white drop-shadow-md leading-none tracking-tight", children: bentoItem.title }) }),
                          /* @__PURE__ */ jsx("div", { className: "text-white/90 transition-colors hover:text-white drop-shadow-md relative z-10", children: bentoItem.icon })
                        ] })
                      ] }) }),
                      /* @__PURE__ */ jsxs("div", { className: cn(
                        "absolute inset-0 flex flex-col items-center justify-center gap-2 transition-all duration-500",
                        isActive ? "opacity-0 scale-90 pointer-events-none" : "opacity-100 scale-100"
                      ), children: [
                        /* @__PURE__ */ jsx("div", { className: "text-white/50 group-hover:text-white transition-colors", children: bentoItem.icon }),
                        /* @__PURE__ */ jsx("span", { className: "text-[10px] font-medium text-zinc-500 group-hover:text-zinc-300 transition-colors uppercase tracking-wider", children: bentoItem.title })
                      ] })
                    ]
                  },
                  bentoItem.id
                );
              }) }, "bento-group");
            }
            if (i === 17 || i === 18) return null;
            if (typeof item === "string") {
              const Icon = i % 3 === 0 ? FaGithub : i % 3 === 1 ? FaSlack : FaTwitter;
              const label = i % 3 === 0 ? "Github" : i % 3 === 1 ? "Slack" : "Twitter";
              return /* @__PURE__ */ jsx("figure", { "data-col": i % 7, className: "grid__item m-0 relative z-10 [perspective:800px] will-change-[transform,opacity] group cursor-pointer", children: /* @__PURE__ */ jsxs("div", { className: "grid__item-img w-full h-full [backface-visibility:hidden] will-change-transform rounded-xl overflow-hidden shadow-sm border border-zinc-200 dark:border-zinc-900 bg-zinc-100 dark:bg-zinc-950 flex items-center justify-center transition-all duration-500 ease-out group-hover:scale-105 group-hover:shadow-xl group-hover:border-transparent", children: [
                /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-black/40 via-black/80 to-black backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" }),
                /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex flex-col items-center justify-center gap-3", children: [
                  /* @__PURE__ */ jsx(Icon, { className: "w-8 h-8 text-zinc-400 dark:text-zinc-500 transition-all duration-300 group-hover:text-white group-hover:scale-110" }),
                  /* @__PURE__ */ jsxs("div", { className: "text-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-75", children: [
                    /* @__PURE__ */ jsx("span", { className: "block text-[10px] font-medium text-white/90 uppercase tracking-wider mb-0.5", children: "Build with" }),
                    /* @__PURE__ */ jsx("span", { className: "block text-sm font-bold text-white tracking-tight", children: label })
                  ] })
                ] })
              ] }) }, `img-${i}`);
            }
            return null;
          })
        ] }) }),
        showFooter && /* @__PURE__ */ jsxs("footer", { className: "frame__footer w-full p-8 flex justify-between items-center relative z-50 text-neutral-900 dark:text-white uppercase font-medium text-xs tracking-wider", children: [
          /* @__PURE__ */ jsx("a", { href: credits.madeBy.href, className: "hover:opacity-60 transition-opacity", children: credits.madeBy.text }),
          /* @__PURE__ */ jsx("a", { href: credits.moreDemos.href, className: "hover:opacity-60 transition-opacity", children: credits.moreDemos.text })
        ] })
      ]
    }
  );
}

// entry.jsx
import React2 from "react";

// registry:components/docs/staggered-grid.tsx
import { FaGithub as FaGithub2, FaSlack as FaSlack2, FaTwitter as FaTwitter2 } from "react-icons/fa";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function StaggeredGridDemo({ className }) {
  const images = [
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1614854262318-831574f15f1f?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1614850715649-1d0106293bd1?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1618367588411-d9a90fefa881?w=400&h=300&fit=crop"
  ];
  const bentoItems = [
    {
      id: 1,
      title: "Repository",
      subtitle: "Version Control",
      description: "Secure, scalable, and collaborative code management.",
      icon: /* @__PURE__ */ jsx2(FaGithub2, { className: "w-4 h-4" }),
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop"
    },
    {
      id: 2,
      title: "Connect",
      subtitle: "Team Communication",
      description: "Real-time messaging, file sharing, and instant collaboration.",
      icon: /* @__PURE__ */ jsx2(FaSlack2, { className: "w-4 h-4" }),
      image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&h=600&fit=crop"
    },
    {
      id: 3,
      title: "Reach",
      subtitle: "Audience Engagement",
      description: "Amplify your voice and connect globally in real-time.",
      icon: /* @__PURE__ */ jsx2(FaTwitter2, { className: "w-4 h-4" }),
      image: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800&h=600&fit=crop"
    }
  ];
  return /* @__PURE__ */ jsxs2("div", { className: `relative w-full h-full overflow-y-auto overflow-x-hidden staggered-demo-scroller ${className || ""}`, children: [
    /* @__PURE__ */ jsx2("div", { className: "sticky top-4 left-0 right-0 z-50 flex justify-center pointer-events-none", children: /* @__PURE__ */ jsxs2("div", { className: "px-4 py-2 bg-black/80 dark:bg-white/80 backdrop-blur-md rounded-full text-xs font-medium text-white dark:text-black shadow-xl flex items-center gap-2", children: [
      /* @__PURE__ */ jsxs2("span", { className: "relative flex h-2 w-2", children: [
        /* @__PURE__ */ jsx2("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-white dark:bg-black opacity-75" }),
        /* @__PURE__ */ jsx2("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-white dark:bg-black" })
      ] }),
      "Scroll down to animate"
    ] }) }),
    /* @__PURE__ */ jsx2("div", { className: "w-full flex flex-col items-center pb-[20vh] min-h-[150vh]", children: /* @__PURE__ */ jsx2(
      StaggeredGrid,
      {
        images,
        bentoItems,
        centerText: "STAGGERED",
        showFooter: false,
        scroller: ".staggered-demo-scroller",
        className: "scale-[0.85] origin-top md:scale-100"
      }
    ) })
  ] });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(StaggeredGridDemo, {}) }) });
}
export {
  StaggeredGrid,
  Component as default
};

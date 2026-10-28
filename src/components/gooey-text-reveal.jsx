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
// Adapted from https://www.vengenceui.com/components/gooey-text-reveal
// Copyright (c) 2025-2026 Ashutoshx7. See licenses/vengeance.txt for usage terms.
// registry:components/ui/gooey-text-reveal.tsx
import * as React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);
var LINE_EDGE_BLUR = 0.4;
function wrapLine(line) {
  const inner = document.createElement("span");
  inner.dataset.gooeyRevealInner = "";
  inner.style.display = "inline-block";
  inner.style.willChange = "filter";
  while (line.firstChild) {
    inner.appendChild(line.firstChild);
  }
  line.appendChild(inner);
  return inner;
}
function getRevealTargets(container) {
  const explicitTargets = Array.from(
    container.querySelectorAll("[data-gooey-reveal-item]")
  );
  if (explicitTargets.length > 0) return explicitTargets;
  const directChildren = Array.from(container.children).filter(
    (child) => child instanceof HTMLElement
  );
  return directChildren.length > 0 ? directChildren : [container];
}
var GooeyTextReveal = React.forwardRef(function GooeyTextReveal2({
  children,
  mode = "immediate",
  delay = 0,
  duration = 1.5,
  stagger = 0.1,
  blurAmount = 0.35,
  ease = "power3.out",
  start = "top 80%",
  end = "bottom 75%",
  scroller,
  once = true,
  disabled = false,
  onComplete,
  ...props
}, forwardedRef) {
  const containerRef = React.useRef(null);
  const reactId = React.useId();
  const filterId = React.useMemo(
    () => `gooey-text-reveal-${reactId.replace(/:/g, "")}`,
    [reactId]
  );
  const setContainerRef = React.useCallback(
    (node) => {
      containerRef.current = node;
      if (typeof forwardedRef === "function") {
        forwardedRef(node);
      } else if (forwardedRef) {
        forwardedRef.current = node;
      }
    },
    [forwardedRef]
  );
  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container || disabled) return;
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reducedMotion) return;
      let splits = [];
      let tween = null;
      let animationFrame = 0;
      let measuredWidth = container.getBoundingClientRect().width;
      let disposed = false;
      const revert = () => {
        tween?.scrollTrigger?.kill();
        tween?.kill();
        tween = null;
        splits.forEach((split) => split.revert());
        splits = [];
      };
      const build = () => {
        if (disposed) return;
        revert();
        const layers = [];
        getRevealTargets(container).forEach((target) => {
          const split = SplitText.create(target, {
            type: "lines",
            linesClass: "gooey-text-reveal-line",
            aria: "auto"
          });
          split.lines.forEach((line) => {
            const lineElement = line;
            lineElement.style.display = "block";
            lineElement.style.filter = `url(#${filterId}) blur(${LINE_EDGE_BLUR}px)`;
            lineElement.style.willChange = "filter";
            layers.push(wrapLine(lineElement));
          });
          splits.push(split);
        });
        if (layers.length === 0) return;
        gsap.set(layers, { filter: `blur(${blurAmount}em)` });
        const animation = {
          filter: "blur(0em)",
          duration,
          ease,
          stagger,
          onComplete
        };
        if (mode === "scrub") {
          const resolvedScroller = typeof scroller === "string" || scroller instanceof HTMLElement ? scroller : scroller?.current ?? void 0;
          animation.scrollTrigger = {
            trigger: container,
            start,
            end,
            scrub: true,
            invalidateOnRefresh: true,
            scroller: resolvedScroller
          };
        } else if (mode === "scroll") {
          const resolvedScroller = typeof scroller === "string" || scroller instanceof HTMLElement ? scroller : scroller?.current ?? void 0;
          animation.delay = delay;
          animation.scrollTrigger = {
            trigger: container,
            start,
            once,
            toggleActions: once ? "play none none none" : "play none none reverse",
            invalidateOnRefresh: true,
            scroller: resolvedScroller
          };
        } else {
          animation.delay = delay;
        }
        tween = gsap.to(layers, animation);
      };
      build();
      if (document.fonts && document.fonts.status !== "loaded") {
        document.fonts.ready.then(() => {
          if (!disposed) build();
        });
      }
      const resizeObserver = new ResizeObserver(([entry]) => {
        const nextWidth = entry.contentRect.width;
        if (Math.abs(nextWidth - measuredWidth) < 0.5) return;
        measuredWidth = nextWidth;
        window.cancelAnimationFrame(animationFrame);
        animationFrame = window.requestAnimationFrame(build);
      });
      resizeObserver.observe(container);
      return () => {
        disposed = true;
        resizeObserver.disconnect();
        window.cancelAnimationFrame(animationFrame);
        revert();
      };
    },
    {
      scope: containerRef,
      dependencies: [
        mode,
        delay,
        duration,
        stagger,
        blurAmount,
        ease,
        start,
        end,
        scroller,
        once,
        disabled,
        onComplete,
        filterId,
        children
      ]
    }
  );
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { ref: setContainerRef, ...props, children }),
    /* @__PURE__ */ jsx(
      "svg",
      {
        "aria-hidden": "true",
        focusable: "false",
        width: "0",
        height: "0",
        style: { position: "absolute", pointerEvents: "none" },
        children: /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsx("filter", { id: filterId, x: "-50%", y: "-50%", width: "200%", height: "200%", children: /* @__PURE__ */ jsx(
          "feColorMatrix",
          {
            in: "SourceGraphic",
            type: "matrix",
            values: "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 255 -140"
          }
        ) }) })
      }
    )
  ] });
});
GooeyTextReveal.displayName = "GooeyTextReveal";

// entry.jsx
import React3 from "react";

// registry:components/docs/gooey-text-reveal-demo.tsx
import * as React2 from "react";

// registry:next/image
import { jsx as jsx2 } from "react/jsx-runtime";
function Image({ fill, priority, quality, unoptimized, loader, placeholder, blurDataURL, onLoadingComplete, ...props }) {
  return /* @__PURE__ */ jsx2("img", { ...props, style: { ...fill ? { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" } : {}, ...props.style } });
}

// registry:components/docs/gooey-text-reveal-demo.tsx
import { ArrowDown } from "lucide-react";
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var paintings = [
  {
    src: "https://www.vengenceui.com/gooey-text-reveal/img1.jpg",
    alt: "A classical painting lit against a deep shadow"
  },
  {
    src: "https://www.vengenceui.com/gooey-text-reveal/img2.jpg",
    alt: "A dramatic old master painting"
  },
  {
    src: "https://www.vengenceui.com/gooey-text-reveal/img3.jpg",
    alt: "A historic painting rendered in warm light"
  },
  {
    src: "https://www.vengenceui.com/gooey-text-reveal/img4.jpg",
    alt: "A classical figure emerging from darkness"
  }
];
function Painting({ index }) {
  const painting = paintings[index];
  return /* @__PURE__ */ jsx3("div", { className: "relative min-h-full w-full overflow-hidden bg-[#181816]", children: /* @__PURE__ */ jsx3(
    Image,
    {
      src: painting.src,
      alt: painting.alt,
      fill: true,
      sizes: "(max-width: 1024px) 100vw, 900px",
      className: "object-cover",
      priority: index === 0
    }
  ) });
}
function GooeyTextRevealDemo() {
  const scrollAreaRef = React2.useRef(null);
  const scrollToFirstPainting = () => {
    scrollAreaRef.current?.scrollTo({
      top: scrollAreaRef.current.clientHeight,
      behavior: "smooth"
    });
  };
  return /* @__PURE__ */ jsxs2(
    "div",
    {
      ref: scrollAreaRef,
      "data-lenis-prevent": true,
      className: "relative h-full w-full overflow-y-auto overscroll-contain bg-[#f6f6f3] text-[#1a1a18] transition-colors dark:bg-[#10100f] dark:text-[#f1eee6]",
      children: [
        /* @__PURE__ */ jsx3("style", { children: `
        @font-face {
          font-family: "Gooey Reveal Display";
          src: url("/gooey-text-reveal/de-fonte-plus.ttf") format("truetype");
          font-weight: 800;
          font-style: normal;
          font-display: swap;
        }

        .gooey-reveal-display {
          font-family: "Gooey Reveal Display", Georgia, serif;
          font-weight: 800;
        }
      ` }),
        /* @__PURE__ */ jsx3("div", { className: "pointer-events-none sticky top-0 z-30 h-0", children: /* @__PURE__ */ jsxs2("div", { className: "flex items-center justify-between px-5 pt-5 font-mono text-[9px] uppercase tracking-[0.25em] text-white mix-blend-difference sm:px-8", children: [
          /* @__PURE__ */ jsx3("span", { children: "The Weight of Old Light" }),
          /* @__PURE__ */ jsx3("span", { children: "Scroll inside" })
        ] }) }),
        /* @__PURE__ */ jsxs2("section", { className: "relative flex min-h-full items-center justify-center px-6 text-center sm:px-12", children: [
          /* @__PURE__ */ jsx3(
            GooeyTextReveal,
            {
              delay: 0.25,
              duration: 1.6,
              blurAmount: 0.42,
              className: "flex w-full justify-center",
              children: /* @__PURE__ */ jsx3("h2", { className: "gooey-reveal-display max-w-3xl text-[clamp(3.25rem,9vw,7rem)] leading-[0.88] tracking-[-0.045em]", children: "The Weight of Old Light" })
            }
          ),
          /* @__PURE__ */ jsxs2(
            "button",
            {
              type: "button",
              onClick: scrollToFirstPainting,
              className: "absolute bottom-7 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 border border-black/20 bg-white/50 px-3 py-2 font-mono text-[9px] uppercase tracking-wider backdrop-blur transition-colors hover:bg-white dark:border-white/20 dark:bg-black/45 dark:hover:bg-black/75",
              children: [
                "Scroll to reveal",
                /* @__PURE__ */ jsx3(ArrowDown, { className: "size-3.5" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx3(Painting, { index: 0 }),
        /* @__PURE__ */ jsxs2("section", { className: "flex min-h-[155%] flex-col justify-center gap-24 px-6 py-24 sm:px-12", children: [
          /* @__PURE__ */ jsx3(
            GooeyTextReveal,
            {
              mode: "scroll",
              scroller: scrollAreaRef,
              start: "top 80%",
              duration: 1.5,
              stagger: 0.1,
              blurAmount: 0.4,
              className: "max-w-5xl",
              children: /* @__PURE__ */ jsx3("h3", { className: "gooey-reveal-display text-[clamp(2.2rem,6vw,5.5rem)] leading-[0.94] tracking-[-0.035em]", children: "Before the camera, there was only the patient hand. Pigment ground by candlelight, flesh rendered warm against a dark that swallows everything at the edges of the frame." })
            }
          ),
          /* @__PURE__ */ jsx3(
            GooeyTextReveal,
            {
              mode: "scroll",
              scroller: scrollAreaRef,
              start: "top 80%",
              duration: 1.5,
              stagger: 0.1,
              blurAmount: 0.4,
              className: "ml-auto max-w-5xl",
              children: /* @__PURE__ */ jsx3("h3", { className: "gooey-reveal-display text-[clamp(2.2rem,6vw,5.5rem)] leading-[0.94] tracking-[-0.035em]", children: "This is a room of Spanish shadow: gods caught mid-argument, men caught mid-breath. Each canvas holds a single suspended moment, stretched thin across four centuries, still refusing to look away." })
            }
          )
        ] }),
        /* @__PURE__ */ jsx3(Painting, { index: 1 }),
        /* @__PURE__ */ jsx3("section", { className: "flex min-h-[135%] items-center justify-center px-6 py-28 text-center sm:px-12", children: /* @__PURE__ */ jsxs2(
          GooeyTextReveal,
          {
            mode: "scrub",
            scroller: scrollAreaRef,
            start: "top 80%",
            end: "bottom 48%",
            stagger: 0.08,
            blurAmount: 0.48,
            className: "w-full",
            children: [
              /* @__PURE__ */ jsx3("h3", { className: "gooey-reveal-display text-[clamp(2.8rem,8vw,6.5rem)] leading-[0.9] tracking-[-0.045em]", children: "Ground Pigment" }),
              /* @__PURE__ */ jsx3("h3", { className: "gooey-reveal-display text-[clamp(2.8rem,8vw,6.5rem)] leading-[0.9] tracking-[-0.045em]", children: "Falling Shadow" }),
              /* @__PURE__ */ jsx3("h3", { className: "gooey-reveal-display text-[clamp(2.8rem,8vw,6.5rem)] leading-[0.9] tracking-[-0.045em]", children: "Warm Flesh" }),
              /* @__PURE__ */ jsx3("h3", { className: "gooey-reveal-display text-[clamp(2.8rem,8vw,6.5rem)] leading-[0.9] tracking-[-0.045em]", children: "Suspended Gesture" }),
              /* @__PURE__ */ jsx3("h3", { className: "gooey-reveal-display text-[clamp(2.8rem,8vw,6.5rem)] leading-[0.9] tracking-[-0.045em]", children: "Held Silence" })
            ]
          }
        ) }),
        /* @__PURE__ */ jsx3(Painting, { index: 2 }),
        /* @__PURE__ */ jsx3("section", { className: "flex min-h-[135%] items-center px-6 py-28 sm:px-12", children: /* @__PURE__ */ jsx3(
          GooeyTextReveal,
          {
            mode: "scrub",
            scroller: scrollAreaRef,
            start: "top 82%",
            end: "bottom 50%",
            stagger: 0.08,
            blurAmount: 0.45,
            className: "max-w-5xl",
            children: /* @__PURE__ */ jsx3("h3", { className: "gooey-reveal-display text-[clamp(2.2rem,6vw,5.5rem)] leading-[0.94] tracking-[-0.035em]", children: "We collect the paintings that hold their breath. The wine that never spills from a tilted cup, the note that never finishes leaving the reed, the eye that has watched the same doorway since 1628. Every frame is a single second refusing to end." })
          }
        ) }),
        /* @__PURE__ */ jsx3(Painting, { index: 3 }),
        /* @__PURE__ */ jsx3("section", { className: "flex min-h-full items-center justify-center px-6 text-center sm:px-12", children: /* @__PURE__ */ jsx3(
          GooeyTextReveal,
          {
            mode: "scroll",
            scroller: scrollAreaRef,
            start: "top 78%",
            duration: 1.8,
            blurAmount: 0.46,
            className: "flex w-full justify-center",
            children: /* @__PURE__ */ jsx3("h2", { className: "gooey-reveal-display text-[clamp(3.5rem,10vw,8rem)] leading-none tracking-[-0.045em]", children: "Step Closer" })
          }
        ) })
      ]
    }
  );
}

// entry.jsx
import { jsx as jsx4 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx4("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx4("div", { className: "vendor-content", children: /* @__PURE__ */ jsx4(GooeyTextRevealDemo, {}) }) });
}
export {
  GooeyTextReveal,
  Component as default
};

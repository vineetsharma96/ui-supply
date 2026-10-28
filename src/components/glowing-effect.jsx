// Adapted from https://ui.aceternity.com/components/glowing-effect
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:components/ui/glowing-effect.tsx
import { memo, useCallback, useEffect, useRef } from "react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/glowing-effect.tsx
import { animate } from "motion/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var GlowingEffect = memo(
  ({
    blur = 0,
    inactiveZone = 0.7,
    proximity = 0,
    spread = 20,
    variant = "default",
    glow = false,
    className,
    movementDuration = 2,
    borderWidth = 1,
    disabled = true
  }) => {
    const containerRef = useRef(null);
    const lastPosition = useRef({ x: 0, y: 0 });
    const animationFrameRef = useRef(0);
    const handleMove = useCallback(
      (e) => {
        if (!containerRef.current) return;
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        animationFrameRef.current = requestAnimationFrame(() => {
          const element = containerRef.current;
          if (!element) return;
          const { left, top, width, height } = element.getBoundingClientRect();
          const mouseX = e?.x ?? lastPosition.current.x;
          const mouseY = e?.y ?? lastPosition.current.y;
          if (e) {
            lastPosition.current = { x: mouseX, y: mouseY };
          }
          const center = [left + width * 0.5, top + height * 0.5];
          const distanceFromCenter = Math.hypot(
            mouseX - center[0],
            mouseY - center[1]
          );
          const inactiveRadius = 0.5 * Math.min(width, height) * inactiveZone;
          if (distanceFromCenter < inactiveRadius) {
            element.style.setProperty("--active", "0");
            return;
          }
          const isActive = mouseX > left - proximity && mouseX < left + width + proximity && mouseY > top - proximity && mouseY < top + height + proximity;
          element.style.setProperty("--active", isActive ? "1" : "0");
          if (!isActive) return;
          const currentAngle = parseFloat(element.style.getPropertyValue("--start")) || 0;
          let targetAngle = 180 * Math.atan2(mouseY - center[1], mouseX - center[0]) / Math.PI + 90;
          const angleDiff = (targetAngle - currentAngle + 180) % 360 - 180;
          const newAngle = currentAngle + angleDiff;
          animate(currentAngle, newAngle, {
            duration: movementDuration,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (value) => {
              element.style.setProperty("--start", String(value));
            }
          });
        });
      },
      [inactiveZone, proximity, movementDuration]
    );
    useEffect(() => {
      if (disabled) return;
      const handleScroll = () => handleMove();
      const handlePointerMove = (e) => handleMove(e);
      window.addEventListener("scroll", handleScroll, { passive: true });
      document.body.addEventListener("pointermove", handlePointerMove, {
        passive: true
      });
      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        window.removeEventListener("scroll", handleScroll);
        document.body.removeEventListener("pointermove", handlePointerMove);
      };
    }, [handleMove, disabled]);
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: cn(
            "pointer-events-none absolute -inset-px hidden rounded-[inherit] border opacity-0 transition-opacity",
            glow && "opacity-100",
            variant === "white" && "border-white",
            disabled && "!block"
          )
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          ref: containerRef,
          style: {
            "--blur": `${blur}px`,
            "--spread": spread,
            "--start": "0",
            "--active": "0",
            "--glowingeffect-border-width": `${borderWidth}px`,
            "--repeating-conic-gradient-times": "5",
            "--gradient": variant === "white" ? `repeating-conic-gradient(
                  from 236.84deg at 50% 50%,
                  var(--black),
                  var(--black) calc(25% / var(--repeating-conic-gradient-times))
                )` : `radial-gradient(circle, #dd7bbb 10%, #dd7bbb00 20%),
                radial-gradient(circle at 40% 40%, #d79f1e 5%, #d79f1e00 15%),
                radial-gradient(circle at 60% 60%, #5a922c 10%, #5a922c00 20%),
                radial-gradient(circle at 40% 60%, #4c7894 10%, #4c789400 20%),
                repeating-conic-gradient(
                  from 236.84deg at 50% 50%,
                  #dd7bbb 0%,
                  #d79f1e calc(25% / var(--repeating-conic-gradient-times)),
                  #5a922c calc(50% / var(--repeating-conic-gradient-times)),
                  #4c7894 calc(75% / var(--repeating-conic-gradient-times)),
                  #dd7bbb calc(100% / var(--repeating-conic-gradient-times))
                )`
          },
          className: cn(
            "pointer-events-none absolute inset-0 rounded-[inherit] opacity-100 transition-opacity",
            glow && "opacity-100",
            blur > 0 && "blur-[var(--blur)] ",
            className,
            disabled && "!hidden"
          ),
          children: /* @__PURE__ */ jsx(
            "div",
            {
              className: cn(
                "glow",
                "rounded-[inherit]",
                'after:content-[""] after:rounded-[inherit] after:absolute after:inset-[calc(-1*var(--glowingeffect-border-width))]',
                "after:[border:var(--glowingeffect-border-width)_solid_transparent]",
                "after:[background:var(--gradient)] after:[background-attachment:fixed]",
                "after:opacity-[var(--active)] after:transition-opacity after:duration-300",
                "after:[mask-clip:padding-box,border-box]",
                "after:[mask-composite:intersect]",
                "after:[mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2deg))]"
              )
            }
          )
        }
      )
    ] });
  }
);
GlowingEffect.displayName = "GlowingEffect";

// entry.jsx
import React from "react";

// registry:components/glowing-effect-demo.tsx
import { Box, Lock, Search, Settings, Sparkles } from "lucide-react";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function GlowingEffectDemo() {
  return /* @__PURE__ */ jsxs2("ul", { className: "grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2", children: [
    /* @__PURE__ */ jsx2(
      GridItem,
      {
        area: "md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]",
        icon: /* @__PURE__ */ jsx2(Box, { className: "h-4 w-4 text-black dark:text-neutral-400" }),
        title: "Do things the right way",
        description: "Running out of copy so I'll write anything."
      }
    ),
    /* @__PURE__ */ jsx2(
      GridItem,
      {
        area: "md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]",
        icon: /* @__PURE__ */ jsx2(Settings, { className: "h-4 w-4 text-black dark:text-neutral-400" }),
        title: "The best AI code editor ever.",
        description: "Yes, it's true. I'm not even kidding. Ask my mom if you don't believe me."
      }
    ),
    /* @__PURE__ */ jsx2(
      GridItem,
      {
        area: "md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]",
        icon: /* @__PURE__ */ jsx2(Lock, { className: "h-4 w-4 text-black dark:text-neutral-400" }),
        title: "You should buy Aceternity UI Pro",
        description: "It's the best money you'll ever spend"
      }
    ),
    /* @__PURE__ */ jsx2(
      GridItem,
      {
        area: "md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]",
        icon: /* @__PURE__ */ jsx2(Sparkles, { className: "h-4 w-4 text-black dark:text-neutral-400" }),
        title: "This card is also built by Cursor",
        description: "I'm not even kidding. Ask my mom if you don't believe me."
      }
    ),
    /* @__PURE__ */ jsx2(
      GridItem,
      {
        area: "md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]",
        icon: /* @__PURE__ */ jsx2(Search, { className: "h-4 w-4 text-black dark:text-neutral-400" }),
        title: "Coming soon on Aceternity UI",
        description: "I'm writing the code as I record this, no shit."
      }
    )
  ] });
}
var GridItem = ({ area, icon, title, description }) => {
  return /* @__PURE__ */ jsx2("li", { className: `min-h-[14rem] list-none ${area}`, children: /* @__PURE__ */ jsxs2("div", { className: "relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3", children: [
    /* @__PURE__ */ jsx2(
      GlowingEffect,
      {
        spread: 40,
        glow: true,
        disabled: false,
        proximity: 64,
        inactiveZone: 0.01
      }
    ),
    /* @__PURE__ */ jsx2("div", { className: "border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]", children: /* @__PURE__ */ jsxs2("div", { className: "relative flex flex-1 flex-col justify-between gap-3", children: [
      /* @__PURE__ */ jsx2("div", { className: "w-fit rounded-lg border border-gray-600 p-2", children: icon }),
      /* @__PURE__ */ jsxs2("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsx2("h3", { className: "-tracking-4 pt-0.5 font-sans text-xl/[1.375rem] font-semibold text-balance text-black md:text-2xl/[1.875rem] dark:text-white", children: title }),
        /* @__PURE__ */ jsx2("h2", { className: "font-sans text-sm/[1.125rem] text-black md:text-base/[1.375rem] dark:text-neutral-400 [&_b]:md:font-semibold [&_strong]:md:font-semibold", children: description })
      ] })
    ] }) })
  ] }) });
};

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(GlowingEffectDemo, {}) }) });
}
export {
  GlowingEffect,
  Component as default
};

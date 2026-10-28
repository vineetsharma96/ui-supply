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
// Adapted from https://www.vengenceui.com/components/research-bento-grid
// Copyright (c) 2025-2026 Ashutoshx7. See licenses/vengeance.txt for usage terms.
// registry:components/ui/research-bento-grid.tsx
import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { SiCloudflare, SiDocker, SiGithub, SiSupabase, SiVercel } from "react-icons/si";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/research-bento-grid.tsx
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var spring = { type: "spring", stiffness: 230, damping: 24 };
var LIFTED_TILES = /* @__PURE__ */ new Set([5, 14, 23, 34, 41, 53, 62, 71, 79, 88, 97, 108, 119, 131, 146, 157, 169, 184, 199, 213, 226, 241]);
var BRIGHT_TILES = /* @__PURE__ */ new Set([17, 45, 76, 103, 138, 176, 205, 234]);
var INVOICE_BARS = [62, 44, 70, 36, 56];
var DEFAULT_COPY = {
  showcaseTitle: "One team for your entire stack",
  showcaseDescription: "From product UI to production code, ship focused improvements with the tools your team already trusts.",
  pricingTitle: /* @__PURE__ */ jsxs(Fragment, { children: [
    "Senior execution.",
    /* @__PURE__ */ jsx("br", {}),
    "Predictable cost."
  ] }),
  pricingDescription: "Skip expanding headcount for every sprint. Get consistent product and engineering support at a predictable monthly cost.",
  pauseTitle: /* @__PURE__ */ jsxs(Fragment, { children: [
    "Build on your terms.",
    /* @__PURE__ */ jsx("br", {}),
    "Pause at any time."
  ] }),
  activeDescription: "Between releases? Pause your workspace and resume when the next sprint is ready.",
  pausedDescription: "Your workspace is paused. Resume whenever the next feature is ready to move."
};
function ArrowCursor({
  className,
  label,
  inverted = false,
  delay = 0,
  active,
  targetLeft,
  targetTop
}) {
  const reduceMotion = useReducedMotion();
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      "aria-hidden": true,
      className: cn("absolute z-30 flex flex-col items-start", className),
      animate: reduceMotion ? void 0 : active !== void 0 ? active ? { x: -3, y: -36, rotate: -1.5 } : { x: 0, y: 0, rotate: 0 } : targetLeft ? { left: targetLeft, top: targetTop, x: 0, y: [0, -3, 0], rotate: [0, 1.5, 0] } : { x: 0, y: [0, -3, 0], rotate: [0, 1.5, 0] },
      transition: active !== void 0 ? {
        duration: active ? 0.68 : 0.82,
        ease: active ? [0.16, 1, 0.3, 1] : [0.22, 1, 0.36, 1]
      } : targetLeft ? {
        left: spring,
        top: spring,
        y: { duration: 4.6, delay, repeat: Infinity, ease: "easeInOut" },
        rotate: { duration: 4.6, delay, repeat: Infinity, ease: "easeInOut" }
      } : { duration: 4.6, delay, repeat: Infinity, ease: "easeInOut" },
      children: [
        /* @__PURE__ */ jsx("svg", { width: "26", height: "30", viewBox: "0 0 26 30", fill: "none", className: "h-auto w-[18px] drop-shadow-md sm:w-[22px] lg:w-[26px]", children: /* @__PURE__ */ jsx(
          "path",
          {
            d: "M2.2 2.5 22 15.1l-9.4 2.1-4.1 9.1L2.2 2.5Z",
            className: cn(
              inverted ? "fill-zinc-950 stroke-white dark:fill-white dark:stroke-[#080808]" : "fill-[#edff00] stroke-white dark:stroke-white/70"
            ),
            strokeWidth: "2.1",
            strokeLinejoin: "round"
          }
        ) }),
        /* @__PURE__ */ jsx(
          "span",
          {
            className: cn(
              "ml-2.5 -mt-1 px-2.5 py-1 text-[12px] font-semibold tracking-[-0.04em] sm:ml-3 sm:px-3 sm:text-[14px] lg:ml-4 lg:px-4 lg:py-1.5 lg:text-[17px]",
              inverted ? "rounded-full bg-[#f2f2f2] text-black shadow-[0_5px_18px_rgba(0,0,0,0.28)]" : cn(
                "rounded-[22px] border border-white/60 bg-[#edff00] text-black",
                active ? "shadow-[0_5px_18px_rgba(0,0,0,0.24),0_0_14px_rgba(237,255,0,0.18)]" : "shadow-[0_5px_18px_rgba(0,0,0,0.22)]"
              )
            ),
            children: label
          }
        )
      ]
    }
  );
}
var DEFAULT_BRANDS = [
  { name: "Vercel", icon: SiVercel },
  { name: "GitHub", icon: SiGithub },
  { name: "Supabase", icon: SiSupabase },
  { name: "Cloudflare", icon: SiCloudflare },
  { name: "Docker", icon: SiDocker }
];
function BrandMark({ brand }) {
  const Icon = brand.icon;
  return /* @__PURE__ */ jsx(Icon, { className: "size-[58%]", "aria-hidden": true });
}
function Panel({ className, children, ...props }) {
  const grainId = React.useId().replace(/:/g, "");
  return /* @__PURE__ */ jsxs(
    "section",
    {
      ...props,
      className: cn(
        "relative isolate overflow-hidden rounded-[15px] border border-[#c8c8c4] bg-[#f7f7f5]",
        "shadow-[inset_0_1px_rgba(255,255,255,0.9),0_12px_32px_rgba(24,24,27,0.08)]",
        "dark:border-[#292929] dark:bg-[#080808] dark:shadow-[inset_0_1px_rgba(255,255,255,0.02),0_12px_32px_rgba(0,0,0,0.22)]",
        className
      ),
      children: [
        /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.88),transparent_45%)] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.025),transparent_45%)]" }),
        children,
        /* @__PURE__ */ jsxs(
          "svg",
          {
            "aria-hidden": true,
            className: "pointer-events-none absolute inset-0 z-50 size-full opacity-[0.07] mix-blend-multiply dark:opacity-[0.1] dark:mix-blend-soft-light",
            children: [
              /* @__PURE__ */ jsxs("filter", { id: grainId, x: "0", y: "0", width: "100%", height: "100%", children: [
                /* @__PURE__ */ jsx("feTurbulence", { type: "fractalNoise", baseFrequency: "0.72", numOctaves: "4", seed: "11", stitchTiles: "stitch" }),
                /* @__PURE__ */ jsx("feColorMatrix", { type: "saturate", values: "0" }),
                /* @__PURE__ */ jsx("feComponentTransfer", { children: /* @__PURE__ */ jsx("feFuncA", { type: "table", tableValues: "0 0.55" }) })
              ] }),
              /* @__PURE__ */ jsx("rect", { width: "100%", height: "100%", filter: `url(#${grainId})` })
            ]
          }
        )
      ]
    }
  );
}
function FeatureCopy({ title, children, className }) {
  return /* @__PURE__ */ jsxs("div", { className: cn("absolute inset-x-0 bottom-0 z-20 px-5 pb-5 sm:px-7 sm:pb-7", className), children: [
    /* @__PURE__ */ jsx("h3", { className: "text-[16px] font-medium leading-[1.08] tracking-[-0.045em] text-zinc-950 sm:text-[18px] dark:text-[#f1f1f1]", children: title }),
    /* @__PURE__ */ jsx("p", { className: "mt-2.5 max-w-[330px] text-[12px] leading-[1.35] tracking-[-0.015em] text-zinc-600 sm:mt-3 sm:text-[13px] dark:text-[#858585]", children })
  ] });
}
function DesignsPanel({
  brands,
  selectedBrand,
  defaultSelectedBrand,
  autoPlay,
  rotationInterval,
  userLabel,
  collaboratorLabel,
  title,
  description,
  onSelectedBrandChange
}) {
  const [internalSelected, setInternalSelected] = React.useState(defaultSelectedBrand);
  const reduceMotion = useReducedMotion();
  const isControlled = selectedBrand !== void 0;
  const selected = Math.min(Math.max(isControlled ? selectedBrand : internalSelected, 0), brands.length - 1);
  const cursorStops = brands.map((_, index) => `${15 + 70 * index / Math.max(brands.length - 1, 1)}%`);
  const selectBrand = React.useCallback((index) => {
    if (!isControlled) setInternalSelected(index);
    onSelectedBrandChange?.(index);
  }, [isControlled, onSelectedBrandChange]);
  React.useEffect(() => {
    if (!autoPlay || reduceMotion || brands.length < 2) return;
    const interval = setInterval(() => {
      const next = (selected + 1) % brands.length;
      selectBrand(next);
    }, rotationInterval);
    return () => clearInterval(interval);
  }, [autoPlay, brands.length, reduceMotion, rotationInterval, selectBrand, selected]);
  return /* @__PURE__ */ jsxs(Panel, { className: "min-h-[350px] sm:min-h-[320px] @min-[840px]:col-span-12 @min-[840px]:min-h-[302px] @min-[840px]:row-span-1", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        "aria-hidden": true,
        className: "pointer-events-none absolute inset-x-0 top-0 grid h-[78%] grid-cols-[repeat(28,minmax(0,1fr))] grid-rows-[repeat(9,minmax(0,1fr))] gap-px overflow-hidden",
        style: { maskImage: "linear-gradient(to bottom,black 0%,black 62%,transparent 100%)" },
        children: Array.from({ length: 252 }, (_, index) => /* @__PURE__ */ jsx(
          "span",
          {
            className: cn(
              "border border-black/[0.035] bg-[#ededeb] dark:border-white/[0.018] dark:bg-[#0b0b0b]",
              LIFTED_TILES.has(index) && "bg-[#e4e4e1] dark:bg-[#101010]",
              BRIGHT_TILES.has(index) && "bg-[#dadad6] dark:bg-[#151515]"
            )
          },
          index
        ))
      }
    ),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        "aria-hidden": true,
        className: "pointer-events-none absolute -top-[8%] z-[1] hidden h-[66%] w-[24%] rounded-full bg-white/[0.022] blur-[48px] dark:block",
        animate: reduceMotion ? void 0 : { x: ["-120%", "520%"] },
        transition: { duration: 14, repeat: Infinity, repeatDelay: 2.5, ease: "easeInOut" }
      }
    ),
    /* @__PURE__ */ jsx("div", { "aria-hidden": true, className: "pointer-events-none absolute inset-x-0 top-0 h-[76%] bg-[radial-gradient(ellipse_at_50%_18%,transparent_12%,rgba(247,247,245,.12)_58%,#f7f7f5_100%)] dark:bg-[radial-gradient(ellipse_at_50%_18%,transparent_12%,rgba(8,8,8,.1)_58%,#080808_100%)]" }),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-x-4 top-[9%] z-10 mx-auto flex max-w-[760px] items-center gap-1.5 sm:inset-x-7 sm:top-[12%] sm:gap-2.5", children: brands.map((brand, index) => /* @__PURE__ */ jsxs(
      motion.button,
      {
        type: "button",
        onClick: () => selectBrand(index),
        "aria-label": `Select ${brand.name}`,
        "aria-pressed": selected === index,
        className: cn(
          "relative flex aspect-square min-w-0 flex-1 items-center justify-center overflow-hidden rounded-[9px] border bg-[linear-gradient(145deg,#f2f2f0_0%,#e7e7e4_46%,#dcdcd8_100%)] shadow-[inset_0_1px_rgba(255,255,255,.9),0_12px_24px_rgba(24,24,27,.12)] sm:rounded-[10px] dark:bg-[linear-gradient(145deg,#222_0%,#1a1a1a_48%,#141414_100%)] dark:shadow-[inset_0_1px_rgba(255,255,255,.025),0_10px_22px_rgba(0,0,0,.32)]",
          selected === index ? "border-[#b5c200]/45 text-[#a9b500] shadow-[inset_0_1px_rgba(255,255,255,.8),0_12px_28px_rgba(24,24,27,.14),0_0_22px_rgba(190,204,0,.12)] dark:border-[#edff00]/15 dark:text-[#edff00] dark:shadow-[inset_0_1px_rgba(255,255,255,.025),0_10px_24px_rgba(0,0,0,.34),0_0_18px_rgba(237,255,0,.045)]" : "border-black/[0.11] text-zinc-800 dark:border-white/[0.055] dark:text-[#e8e8e8]"
        ),
        animate: reduceMotion ? void 0 : {
          y: selected === index ? -3 : [0, index % 2 ? 1.5 : -1.5, 0],
          scale: selected === index ? 1.018 : 1
        },
        whileHover: { y: -4, scale: 1.02 },
        whileTap: { scale: 0.97 },
        transition: { y: { duration: 5 + index * 0.3, delay: index * 0.2, repeat: Infinity, ease: "easeInOut" }, scale: spring },
        children: [
          selected === index && /* @__PURE__ */ jsx(
            motion.span,
            {
              "aria-hidden": true,
              className: "absolute inset-[12%] rounded-full bg-[#edff00]/20 blur-xl dark:bg-[#edff00]/[0.11]",
              initial: { opacity: 0, scale: 0.7 },
              animate: { opacity: [0.35, 0.7, 0.35], scale: [0.9, 1.08, 0.9] },
              transition: { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
            }
          ),
          /* @__PURE__ */ jsx(
            motion.span,
            {
              className: "relative flex size-full items-center justify-center",
              animate: { scale: selected === index ? 1.06 : 1 },
              transition: spring,
              children: /* @__PURE__ */ jsx(BrandMark, { brand })
            }
          )
        ]
      },
      brand.name
    )) }),
    /* @__PURE__ */ jsx(
      ArrowCursor,
      {
        label: userLabel,
        className: "left-[35%] top-[40%]",
        targetLeft: cursorStops[selected],
        targetTop: "40%",
        delay: 0.2
      }
    ),
    /* @__PURE__ */ jsx(ArrowCursor, { label: collaboratorLabel, inverted: true, className: "left-[58%] top-[54%] sm:left-[62%] sm:top-[56%]", delay: 0.9 }),
    /* @__PURE__ */ jsx(FeatureCopy, { title, children: description })
  ] });
}
function InvoicePanel({ monthlyPrice, previousPrice, currency, locale, autoPlay, title, description }) {
  const reduceMotion = useReducedMotion();
  const [invoiceIndex, setInvoiceIndex] = React.useState(0);
  const formatPrice = React.useMemo(
    () => new Intl.NumberFormat(locale, { style: "currency", currency, maximumFractionDigits: 0 }),
    [currency, locale]
  );
  const invoices = [
    { label: "Invoice", price: previousPrice, previousPrice: null, accent: false },
    { label: "Invoice", price: monthlyPrice, previousPrice, accent: true }
  ];
  React.useEffect(() => {
    if (!autoPlay || reduceMotion) return;
    const interval = setInterval(() => {
      setInvoiceIndex((current) => (current + 1) % invoices.length);
    }, 3900);
    return () => clearInterval(interval);
  }, [autoPlay, invoices.length, reduceMotion]);
  const invoice = invoices[invoiceIndex];
  return /* @__PURE__ */ jsxs(Panel, { className: "min-h-[420px] [container-type:inline-size] sm:min-h-[360px] @min-[840px]:col-span-7 @min-[840px]:min-h-[302px] @min-[840px]:row-span-1", children: [
    /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0 opacity-[0.055] dark:opacity-[0.045]", style: { backgroundImage: "radial-gradient(circle,currentColor .65px,transparent .75px)", backgroundSize: "11px 11px" } }),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 top-0 h-[58%] overflow-hidden sm:inset-y-0 sm:left-auto sm:right-0 sm:h-auto sm:w-[53%]", children: /* @__PURE__ */ jsx(AnimatePresence, { initial: false, mode: "wait", children: /* @__PURE__ */ jsxs(
      motion.div,
      {
        className: "absolute left-[21%] top-5 h-[225px] w-[58%] overflow-hidden rounded-[10px] border border-black/[0.16] bg-[linear-gradient(145deg,#f5f5f2_0%,#eaeae6_46%,#dededa_100%)] p-3.5 shadow-[inset_0_1px_rgba(255,255,255,.9),0_18px_42px_rgba(24,24,27,.14),0_3px_8px_rgba(24,24,27,.08)] sm:left-auto sm:right-4 sm:h-[250px] sm:w-[89%] dark:border-[#343434]/80 dark:bg-[linear-gradient(145deg,#1c1c1c_0%,#161616_48%,#101010_100%)] dark:shadow-[inset_0_1px_rgba(255,255,255,.02),0_16px_36px_rgba(0,0,0,.38),0_3px_8px_rgba(0,0,0,.25)] @min-[520px]:right-7 @min-[520px]:p-5",
        initial: reduceMotion ? false : { y: 270, opacity: 0, rotate: -1.25 },
        animate: { y: 0, opacity: 1, rotate: 0 },
        exit: reduceMotion ? { opacity: 0 } : { y: 285, opacity: 0, rotate: 1.1 },
        transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between text-zinc-500 dark:text-[#a0a0a0]", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[12px]", children: invoice.label }),
            /* @__PURE__ */ jsx("span", { className: "relative mt-0.5 size-4 rounded-full bg-zinc-500 dark:bg-[#9e9e9e]", children: /* @__PURE__ */ jsx("span", { className: "absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-l-full bg-[#e7e7e3] dark:bg-[#222]" }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-2 flex items-baseline gap-2 whitespace-nowrap", children: [
            /* @__PURE__ */ jsx("span", { className: cn("text-[26px] font-medium tracking-[-0.055em] @min-[520px]:text-[30px]", invoice.accent ? "text-[#a4b000] dark:text-[#edff00]" : "text-zinc-500 dark:text-[#8e8e8e]"), children: formatPrice.format(invoice.price) }),
            invoice.previousPrice && /* @__PURE__ */ jsx("span", { className: "text-[14px] text-zinc-500 line-through @min-[520px]:text-[16px] dark:text-[#767676]", children: formatPrice.format(invoice.previousPrice) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-5 space-y-2.5", children: [
            /* @__PURE__ */ jsx("div", { className: "h-1 w-[42%] rounded-full bg-black/[0.08] dark:bg-white/[0.07]" }),
            /* @__PURE__ */ jsx("div", { className: "h-1 w-[27%] rounded-full bg-black/[0.055] dark:bg-white/[0.045]" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-4 space-y-2.5", children: INVOICE_BARS.map((width, index) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-4", children: [
            /* @__PURE__ */ jsx(
              motion.span,
              {
                className: "h-2.5 rounded-[3px] bg-black/[0.055] dark:bg-white/[0.045]",
                style: { width: `${width}%` },
                animate: reduceMotion ? void 0 : { opacity: [0.35, 0.62, 0.35] },
                transition: { duration: 3.5, delay: index * 0.28, repeat: Infinity, ease: "easeInOut" }
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "h-3 w-[28%] rounded-[4px] bg-black/[0.08] dark:bg-white/[0.07]" })
          ] }, index)) }),
          /* @__PURE__ */ jsx(
            "div",
            {
              "aria-hidden": true,
              className: "pointer-events-none absolute inset-x-0 bottom-0 h-[42%] bg-[linear-gradient(to_bottom,transparent,rgba(222,222,218,.55)_52%,#dededa_100%)] dark:bg-[linear-gradient(to_bottom,transparent,rgba(17,17,17,.55)_52%,#111_100%)]"
            }
          )
        ]
      },
      invoiceIndex
    ) }) }),
    /* @__PURE__ */ jsx(
      "div",
      {
        "aria-hidden": true,
        className: "pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[48%] bg-[linear-gradient(to_bottom,rgba(247,247,245,0)_0%,rgba(247,247,245,.12)_24%,rgba(247,247,245,.48)_58%,rgba(247,247,245,.88)_86%,#f7f7f5_100%)] dark:bg-[linear-gradient(to_bottom,rgba(8,8,8,0)_0%,rgba(8,8,8,.12)_24%,rgba(8,8,8,.48)_58%,rgba(8,8,8,.88)_86%,#080808_100%)]"
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        "aria-hidden": true,
        className: "pointer-events-none absolute inset-x-[-8%] -bottom-[24%] z-10 h-[48%] rounded-[50%] bg-[#f7f7f5]/75 blur-[38px] dark:bg-[#080808]/75"
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        "aria-hidden": true,
        className: "pointer-events-none absolute inset-x-0 bottom-0 z-10 h-px bg-black/[0.04] dark:bg-white/[0.025]"
      }
    ),
    /* @__PURE__ */ jsx(FeatureCopy, { className: "sm:right-1/2 sm:pr-3", title, children: description })
  ] });
}
function PausePanel({
  paused: controlledPaused,
  defaultPaused,
  autoPlay,
  spotlightInterval,
  userLabel,
  title,
  activeDescription,
  pausedDescription,
  onPausedChange
}) {
  const [internalPaused, setInternalPaused] = React.useState(defaultPaused);
  const [demoLit, setDemoLit] = React.useState(true);
  const reduceMotion = useReducedMotion();
  const isControlled = controlledPaused !== void 0;
  const paused = isControlled ? controlledPaused : internalPaused;
  const arrowLit = autoPlay && demoLit && !reduceMotion;
  React.useEffect(() => {
    if (!autoPlay || reduceMotion) return;
    let offTimer;
    const illuminate = () => {
      setDemoLit(true);
      offTimer = setTimeout(() => setDemoLit(false), 1500);
    };
    const firstTimer = setTimeout(() => setDemoLit(false), 1500);
    const loopTimer = setInterval(illuminate, spotlightInterval);
    return () => {
      clearTimeout(firstTimer);
      if (offTimer) clearTimeout(offTimer);
      clearInterval(loopTimer);
    };
  }, [autoPlay, reduceMotion, spotlightInterval]);
  const toggle = () => {
    const next = !paused;
    if (!isControlled) setInternalPaused(next);
    onPausedChange?.(next);
  };
  return /* @__PURE__ */ jsxs(Panel, { className: "min-h-[340px] sm:min-h-[320px] @min-[840px]:col-span-5 @min-[840px]:min-h-[302px] @min-[840px]:row-span-1", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        "aria-hidden": true,
        className: "pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-multiply dark:opacity-[0.09] dark:mix-blend-screen",
        style: {
          backgroundImage: "radial-gradient(circle at 20% 30%,currentColor 0 .45px,transparent .7px),radial-gradient(circle at 70% 65%,currentColor 0 .45px,transparent .75px)",
          backgroundSize: "4px 4px,5px 5px"
        }
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "absolute inset-x-0 top-0 flex h-[66%] items-center justify-center", children: [
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((ring) => /* @__PURE__ */ jsx(
        motion.div,
        {
          "aria-hidden": true,
          className: "absolute border border-black/[0.07] dark:border-white/[0.04]",
          style: {
            width: 190 + ring * 23,
            height: 100 + ring * 16,
            borderRadius: 23 + ring * 3,
            opacity: Math.max(0.18, 0.72 - ring * 0.045)
          },
          animate: reduceMotion ? void 0 : { scale: [0.995, 1.008, 0.995] },
          transition: { duration: 5.2, delay: ring * 0.11, repeat: Infinity, ease: "easeInOut" }
        },
        ring
      )),
      /* @__PURE__ */ jsxs(
        motion.button,
        {
          type: "button",
          onClick: toggle,
          whileHover: { scale: 1.025 },
          whileTap: { scale: 0.97 },
          transition: spring,
          animate: { scale: arrowLit ? 1.012 : 1 },
          className: cn(
            "relative z-10 flex h-[78px] min-w-[174px] items-center justify-center overflow-hidden rounded-[20px] border bg-gradient-to-br from-white to-[#deded9] px-8 text-[28px] font-semibold tracking-[-0.055em] transition-[border-color,color,box-shadow] duration-500 dark:from-[#181818] dark:to-[#0d0d0d]",
            arrowLit ? "border-[#edff00] text-[#050505] shadow-[0_10px_24px_rgba(24,24,27,.12)] dark:border-[#edff00] dark:text-[#050505] dark:shadow-[0_10px_24px_rgba(0,0,0,.28)]" : "border-black/[0.18] text-zinc-950 shadow-[inset_0_1px_rgba(255,255,255,.9),0_12px_38px_rgba(24,24,27,.14)] dark:border-white/[0.14] dark:text-[#f1f1f1] dark:shadow-[inset_0_1px_rgba(255,255,255,.035),0_10px_30px_rgba(0,0,0,.32)]"
          ),
          "aria-pressed": paused,
          children: [
            /* @__PURE__ */ jsx(
              motion.span,
              {
                "aria-hidden": true,
                className: "absolute inset-0 bg-[#edff00]",
                animate: { opacity: arrowLit ? 1 : 0 },
                transition: { duration: arrowLit ? 0.64 : 0.76, ease: arrowLit ? [0.16, 1, 0.3, 1] : [0.22, 1, 0.36, 1] }
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "relative", children: paused ? "Resume" : "Pause" })
          ]
        }
      ),
      /* @__PURE__ */ jsx(ArrowCursor, { label: userLabel, className: "left-[57%] top-[70%]", delay: 0.5, active: arrowLit })
    ] }),
    /* @__PURE__ */ jsx(FeatureCopy, { title, children: paused ? pausedDescription : activeDescription })
  ] });
}
function ResearchBentoGrid({
  monthlyPrice = 1990,
  previousPrice = 32e3,
  currency = "USD",
  locale = "en-US",
  paused,
  defaultPaused = false,
  selectedBrand,
  defaultSelectedBrand = 1,
  brands = DEFAULT_BRANDS,
  copy,
  autoPlay = true,
  brandRotationInterval = 2600,
  spotlightInterval = 4400,
  userLabel = "You",
  collaboratorLabel = "X7",
  className,
  onPausedChange,
  onSelectedBrandChange,
  ...props
}) {
  const content = { ...DEFAULT_COPY, ...copy };
  if (brands.length === 0) {
    throw new Error("ResearchBentoGrid requires at least one brand.");
  }
  return /* @__PURE__ */ jsx(
    "div",
    {
      ...props,
      className: cn(
        "flex h-full w-full overflow-y-auto bg-[#eeeeeb] p-2 text-zinc-950 [--bento-tile-cutout:#e4e4e1] [container-type:inline-size] sm:p-3",
        "dark:bg-[#020202] dark:text-white dark:[--bento-tile-cutout:#171717]",
        className
      ),
      children: /* @__PURE__ */ jsxs("div", { className: "m-auto grid w-full max-w-[1120px] grid-cols-1 gap-2.5 sm:gap-3 @min-[840px]:h-[min(100%,656px)] @min-[840px]:grid-cols-12 @min-[840px]:grid-rows-2", children: [
        /* @__PURE__ */ jsx(
          DesignsPanel,
          {
            brands,
            selectedBrand,
            defaultSelectedBrand,
            autoPlay,
            rotationInterval: brandRotationInterval,
            userLabel,
            collaboratorLabel,
            title: content.showcaseTitle,
            description: content.showcaseDescription,
            onSelectedBrandChange
          }
        ),
        /* @__PURE__ */ jsx(
          InvoicePanel,
          {
            monthlyPrice,
            previousPrice,
            currency,
            locale,
            autoPlay,
            title: content.pricingTitle,
            description: content.pricingDescription
          }
        ),
        /* @__PURE__ */ jsx(
          PausePanel,
          {
            paused,
            defaultPaused,
            autoPlay,
            spotlightInterval,
            userLabel,
            title: content.pauseTitle,
            activeDescription: content.activeDescription,
            pausedDescription: content.pausedDescription,
            onPausedChange
          }
        )
      ] })
    }
  );
}

// entry.jsx
import React2 from "react";

// registry:components/docs/research-bento-grid-demo.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
function ResearchBentoGridDemo() {
  return /* @__PURE__ */ jsx2(ResearchBentoGrid, {});
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(ResearchBentoGridDemo, {}) }) });
}
export {
  ResearchBentoGrid,
  Component as default
};

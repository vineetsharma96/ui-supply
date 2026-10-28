/*
MIT License

Copyright (c) Magic UI

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
// Adapted from https://magicui.design/docs/components/glare-hover
// Copyright (c) Magic UI. See licenses/magic.txt for usage terms.
// registry:components/ui/glare-hover.tsx
import { useMemo } from "react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/glare-hover.tsx
import { jsx } from "react/jsx-runtime";
function parseHEX(color, opacity) {
  const hex = color.replace("#", "");
  const parse = (h) => Number.parseInt(h, 16);
  if (/^[0-9A-Fa-f]{6}$/.test(hex)) {
    return `rgba(${parse(hex.slice(0, 2))},${parse(hex.slice(2, 4))},${parse(hex.slice(4, 6))},${opacity})`;
  }
  if (/^[0-9A-Fa-f]{3}$/.test(hex)) {
    return `rgba(${parse(hex[0] + hex[0])},${parse(hex[1] + hex[1])},${parse(hex[2] + hex[2])},${opacity})`;
  }
  return color;
}
function GlareHover({
  background = "#000",
  children,
  color = "#ffffff",
  opacity = 0.5,
  angle = -45,
  size = 250,
  duration = 650,
  playOnce = false,
  className,
  style,
  width,
  height,
  ...props
}) {
  const rgba = useMemo(() => parseHEX(color, opacity), [color, opacity]);
  const cssVars = {
    "--gh-angle": `${angle}deg`,
    "--gh-duration": `${duration}ms`,
    "--gh-size": `${size}%`,
    "--gh-rgba": rgba,
    background,
    ...style,
    ...width !== void 0 ? { width } : {},
    ...height !== void 0 ? { height } : {}
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      ...props,
      className: cn(
        "relative grid size-fit cursor-pointer place-items-center overflow-hidden bg-transparent",
        // BEFORE ELEMENT
        "before:pointer-events-none before:absolute before:inset-0 before:z-10 before:bg-no-repeat before:content-['']",
        // GRADIENT
        "before:[background-image:linear-gradient(var(--gh-angle),transparent_60%,var(--gh-rgba)_70%,transparent,transparent_100%)]",
        // SIZE + POSITION
        "before:[background-size:var(--gh-size)_var(--gh-size),100%_100%]",
        "before:[background-position:-100%_-100%,0_0]",
        // TRANSITION
        !playOnce && "before:transition-[background-position] before:duration-[var(--gh-duration)] before:ease-in-out",
        playOnce && "before:transition-none hover:before:transition-[background-position] hover:before:duration-[var(--gh-duration)]",
        // HOVER EFFECT
        "hover:before:[background-position:100%_100%,0_0]",
        className
      ),
      style: cssVars,
      children
    }
  );
}

// entry.jsx
import React from "react";

// registry:components/ui/badge.tsx
import { cva } from "class-variance-authority";
import { Slot } from "radix-ui";
import { jsx as jsx2 } from "react/jsx-runtime";
var badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive: "bg-destructive text-white focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40 [a&]:hover:bg-destructive/90",
        outline: "border-border text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        ghost: "[a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        link: "text-primary underline-offset-4 [a&]:hover:underline"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot.Root : "span";
  return /* @__PURE__ */ jsx2(
    Comp,
    {
      "data-slot": "badge",
      "data-variant": variant,
      className: cn(badgeVariants({ variant }), className),
      ...props
    }
  );
}

// registry:components/ui/button.tsx
import { cva as cva2 } from "class-variance-authority";
import { Slot as Slot2 } from "radix-ui";
import { jsx as jsx3 } from "react/jsx-runtime";
var buttonVariants = cva2(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot2.Root : "button";
  return /* @__PURE__ */ jsx3(
    Comp,
    {
      "data-slot": "button",
      "data-variant": variant,
      "data-size": size,
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}

// registry:components/ui/card.tsx
import { jsx as jsx4 } from "react/jsx-runtime";
function Card({ className, ...props }) {
  return /* @__PURE__ */ jsx4(
    "div",
    {
      "data-slot": "card",
      className: cn(
        "flex flex-col gap-6 rounded-xl border bg-card py-6 text-card-foreground shadow-sm",
        className
      ),
      ...props
    }
  );
}
function CardHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx4(
    "div",
    {
      "data-slot": "card-header",
      className: cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      ),
      ...props
    }
  );
}
function CardTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx4(
    "div",
    {
      "data-slot": "card-title",
      className: cn("leading-none font-semibold", className),
      ...props
    }
  );
}
function CardDescription({ className, ...props }) {
  return /* @__PURE__ */ jsx4(
    "div",
    {
      "data-slot": "card-description",
      className: cn("text-sm text-muted-foreground", className),
      ...props
    }
  );
}
function CardContent({ className, ...props }) {
  return /* @__PURE__ */ jsx4(
    "div",
    {
      "data-slot": "card-content",
      className: cn("px-6", className),
      ...props
    }
  );
}
function CardFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx4(
    "div",
    {
      "data-slot": "card-footer",
      className: cn("flex items-center px-6 [.border-t]:pt-6", className),
      ...props
    }
  );
}

// registry:glare-hover.tsx
import { useMemo as useMemo2 } from "react";
import { jsx as jsx5 } from "react/jsx-runtime";
function parseHEX2(color, opacity) {
  const hex = color.replace("#", "");
  const parse = (h) => Number.parseInt(h, 16);
  if (/^[0-9A-Fa-f]{6}$/.test(hex)) {
    return `rgba(${parse(hex.slice(0, 2))},${parse(hex.slice(2, 4))},${parse(hex.slice(4, 6))},${opacity})`;
  }
  if (/^[0-9A-Fa-f]{3}$/.test(hex)) {
    return `rgba(${parse(hex[0] + hex[0])},${parse(hex[1] + hex[1])},${parse(hex[2] + hex[2])},${opacity})`;
  }
  return color;
}
function GlareHover2({
  background = "#000",
  children,
  color = "#ffffff",
  opacity = 0.5,
  angle = -45,
  size = 250,
  duration = 650,
  playOnce = false,
  className,
  style,
  width,
  height,
  ...props
}) {
  const rgba = useMemo2(() => parseHEX2(color, opacity), [color, opacity]);
  const cssVars = {
    "--gh-angle": `${angle}deg`,
    "--gh-duration": `${duration}ms`,
    "--gh-size": `${size}%`,
    "--gh-rgba": rgba,
    background,
    ...style,
    ...width !== void 0 ? { width } : {},
    ...height !== void 0 ? { height } : {}
  };
  return /* @__PURE__ */ jsx5(
    "div",
    {
      ...props,
      className: cn(
        "relative grid size-fit cursor-pointer place-items-center overflow-hidden bg-transparent",
        // BEFORE ELEMENT
        "before:pointer-events-none before:absolute before:inset-0 before:z-10 before:bg-no-repeat before:content-['']",
        // GRADIENT
        "before:[background-image:linear-gradient(var(--gh-angle),transparent_60%,var(--gh-rgba)_70%,transparent,transparent_100%)]",
        // SIZE + POSITION
        "before:[background-size:var(--gh-size)_var(--gh-size),100%_100%]",
        "before:[background-position:-100%_-100%,0_0]",
        // TRANSITION
        !playOnce && "before:transition-[background-position] before:duration-[var(--gh-duration)] before:ease-in-out",
        playOnce && "before:transition-none hover:before:transition-[background-position] hover:before:duration-[var(--gh-duration)]",
        // HOVER EFFECT
        "hover:before:[background-position:100%_100%,0_0]",
        className
      ),
      style: cssVars,
      children
    }
  );
}

// registry:components/ui/glare-hover-demo.tsx
import { jsx as jsx6, jsxs } from "react/jsx-runtime";
function PricingCard() {
  return /* @__PURE__ */ jsx6(GlareHover2, { className: "rounded-xl", duration: 600, children: /* @__PURE__ */ jsxs(Card, { className: "w-[340px]", children: [
    /* @__PURE__ */ jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsx6(CardTitle, { children: "Pro" }),
        /* @__PURE__ */ jsx6(Badge, { children: "Popular" })
      ] }),
      /* @__PURE__ */ jsx6(CardDescription, { children: "For teams that need more." }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-1 pt-2", children: [
        /* @__PURE__ */ jsx6("span", { className: "text-4xl font-semibold tracking-tight", children: "$49" }),
        /* @__PURE__ */ jsx6("span", { className: "text-muted-foreground text-sm", children: "/mo" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(CardContent, { className: "flex flex-col gap-2.5", children: [
      [
        "Unlimited projects",
        "Team collaboration",
        "Advanced analytics"
      ].map((f) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
        /* @__PURE__ */ jsx6("svg", { width: "15", height: "15", viewBox: "0 0 15 15", fill: "none", children: /* @__PURE__ */ jsx6(
          "path",
          {
            d: "M12.5 3.5L6 10L2.5 6.5",
            stroke: "currentColor",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ) }),
        f
      ] }, f)),
      /* @__PURE__ */ jsxs("div", { className: "text-muted-foreground flex items-center gap-2 text-sm", children: [
        /* @__PURE__ */ jsx6("svg", { width: "15", height: "15", viewBox: "0 0 15 15", fill: "none", children: /* @__PURE__ */ jsx6(
          "circle",
          {
            cx: "7.5",
            cy: "7.5",
            r: "1.5",
            fill: "currentColor",
            opacity: "0.4"
          }
        ) }),
        "SSO (coming soon)"
      ] })
    ] }),
    /* @__PURE__ */ jsx6(CardFooter, { children: /* @__PURE__ */ jsx6(Button, { className: "w-full", children: "Get started" }) })
  ] }) });
}

// entry.jsx
import { jsx as jsx7 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx7("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx7("div", { className: "vendor-content", children: /* @__PURE__ */ jsx7(PricingCard, {}) }) });
}
export {
  GlareHover,
  Component as default
};

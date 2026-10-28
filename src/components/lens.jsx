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
// Adapted from https://magicui.design/docs/components/lens
// Copyright (c) Magic UI. See licenses/magic.txt for usage terms.
// registry:components/ui/lens.tsx
import { useCallback, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionTemplate } from "motion/react";
import { jsx, jsxs } from "react/jsx-runtime";
function Lens({
  children,
  zoomFactor = 1.3,
  lensSize = 170,
  isStatic = false,
  position = { x: 0, y: 0 },
  defaultPosition,
  duration = 0.1,
  lensColor = "black",
  ariaLabel = "Zoom Area"
}) {
  if (zoomFactor < 1) {
    throw new Error("zoomFactor must be greater than 1");
  }
  if (lensSize < 0) {
    throw new Error("lensSize must be greater than 0");
  }
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState(position);
  const containerRef = useRef(null);
  const currentPosition = useMemo(() => {
    if (isStatic) return position;
    if (defaultPosition && !isHovering) return defaultPosition;
    return mousePosition;
  }, [isStatic, position, defaultPosition, isHovering, mousePosition]);
  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  }, []);
  const handleKeyDown = useCallback((e) => {
    if (e.key === "Escape") setIsHovering(false);
  }, []);
  const maskImage = useMotionTemplate`radial-gradient(circle ${lensSize / 2}px at ${currentPosition.x}px ${currentPosition.y}px, ${lensColor} 100%, transparent 100%)`;
  const LensContent = useMemo(() => {
    const { x, y } = currentPosition;
    return /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.58 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.8 },
        transition: { duration },
        className: "absolute inset-0 overflow-hidden",
        style: {
          maskImage,
          WebkitMaskImage: maskImage,
          transformOrigin: `${x}px ${y}px`,
          zIndex: 50
        },
        children: /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute inset-0",
            style: {
              transform: `scale(${zoomFactor})`,
              transformOrigin: `${x}px ${y}px`
            },
            children
          }
        )
      }
    );
  }, [currentPosition, maskImage, zoomFactor, children, duration]);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: containerRef,
      className: "relative z-20 overflow-hidden rounded-xl",
      onMouseEnter: () => setIsHovering(true),
      onMouseLeave: () => setIsHovering(false),
      onMouseMove: handleMouseMove,
      onKeyDown: handleKeyDown,
      role: "region",
      "aria-label": ariaLabel,
      tabIndex: 0,
      children: [
        children,
        isStatic || defaultPosition ? LensContent : /* @__PURE__ */ jsx(AnimatePresence, { mode: "popLayout", children: isHovering && LensContent })
      ]
    }
  );
}

// entry.jsx
import React3 from "react";

// registry:components/ui/button.tsx
import { cva } from "class-variance-authority";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/button.tsx
import { Slot } from "radix-ui";
import { jsx as jsx2 } from "react/jsx-runtime";
var buttonVariants = cva(
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
  const Comp = asChild ? Slot.Root : "button";
  return /* @__PURE__ */ jsx2(
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
import { jsx as jsx3 } from "react/jsx-runtime";
function Card({ className, ...props }) {
  return /* @__PURE__ */ jsx3(
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
  return /* @__PURE__ */ jsx3(
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
  return /* @__PURE__ */ jsx3(
    "div",
    {
      "data-slot": "card-title",
      className: cn("leading-none font-semibold", className),
      ...props
    }
  );
}
function CardDescription({ className, ...props }) {
  return /* @__PURE__ */ jsx3(
    "div",
    {
      "data-slot": "card-description",
      className: cn("text-sm text-muted-foreground", className),
      ...props
    }
  );
}
function CardContent({ className, ...props }) {
  return /* @__PURE__ */ jsx3(
    "div",
    {
      "data-slot": "card-content",
      className: cn("px-6", className),
      ...props
    }
  );
}
function CardFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx3(
    "div",
    {
      "data-slot": "card-footer",
      className: cn("flex items-center px-6 [.border-t]:pt-6", className),
      ...props
    }
  );
}

// registry:lens.tsx
import { useCallback as useCallback2, useMemo as useMemo2, useRef as useRef2, useState as useState2 } from "react";
import { AnimatePresence as AnimatePresence2, motion as motion2, useMotionTemplate as useMotionTemplate2 } from "motion/react";
import { jsx as jsx4, jsxs as jsxs2 } from "react/jsx-runtime";
function Lens2({
  children,
  zoomFactor = 1.3,
  lensSize = 170,
  isStatic = false,
  position = { x: 0, y: 0 },
  defaultPosition,
  duration = 0.1,
  lensColor = "black",
  ariaLabel = "Zoom Area"
}) {
  if (zoomFactor < 1) {
    throw new Error("zoomFactor must be greater than 1");
  }
  if (lensSize < 0) {
    throw new Error("lensSize must be greater than 0");
  }
  const [isHovering, setIsHovering] = useState2(false);
  const [mousePosition, setMousePosition] = useState2(position);
  const containerRef = useRef2(null);
  const currentPosition = useMemo2(() => {
    if (isStatic) return position;
    if (defaultPosition && !isHovering) return defaultPosition;
    return mousePosition;
  }, [isStatic, position, defaultPosition, isHovering, mousePosition]);
  const handleMouseMove = useCallback2((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  }, []);
  const handleKeyDown = useCallback2((e) => {
    if (e.key === "Escape") setIsHovering(false);
  }, []);
  const maskImage = useMotionTemplate2`radial-gradient(circle ${lensSize / 2}px at ${currentPosition.x}px ${currentPosition.y}px, ${lensColor} 100%, transparent 100%)`;
  const LensContent = useMemo2(() => {
    const { x, y } = currentPosition;
    return /* @__PURE__ */ jsx4(
      motion2.div,
      {
        initial: { opacity: 0, scale: 0.58 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.8 },
        transition: { duration },
        className: "absolute inset-0 overflow-hidden",
        style: {
          maskImage,
          WebkitMaskImage: maskImage,
          transformOrigin: `${x}px ${y}px`,
          zIndex: 50
        },
        children: /* @__PURE__ */ jsx4(
          "div",
          {
            className: "absolute inset-0",
            style: {
              transform: `scale(${zoomFactor})`,
              transformOrigin: `${x}px ${y}px`
            },
            children
          }
        )
      }
    );
  }, [currentPosition, maskImage, zoomFactor, children, duration]);
  return /* @__PURE__ */ jsxs2(
    "div",
    {
      ref: containerRef,
      className: "relative z-20 overflow-hidden rounded-xl",
      onMouseEnter: () => setIsHovering(true),
      onMouseLeave: () => setIsHovering(false),
      onMouseMove: handleMouseMove,
      onKeyDown: handleKeyDown,
      role: "region",
      "aria-label": ariaLabel,
      tabIndex: 0,
      children: [
        children,
        isStatic || defaultPosition ? LensContent : /* @__PURE__ */ jsx4(AnimatePresence2, { mode: "popLayout", children: isHovering && LensContent })
      ]
    }
  );
}

// registry:components/ui/lens-demo.tsx
import { jsx as jsx5, jsxs as jsxs3 } from "react/jsx-runtime";
function LensDemo() {
  return /* @__PURE__ */ jsxs3(Card, { className: "relative max-w-md shadow-none", children: [
    /* @__PURE__ */ jsx5(CardHeader, { children: /* @__PURE__ */ jsx5(
      Lens2,
      {
        zoomFactor: 2,
        lensSize: 150,
        isStatic: false,
        ariaLabel: "Zoom Area",
        children: /* @__PURE__ */ jsx5(
          "img",
          {
            src: "https://images.unsplash.com/photo-1736606355698-5efdb410fe93?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            alt: "image placeholder",
            width: 500,
            height: 500
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsxs3(CardContent, { children: [
      /* @__PURE__ */ jsx5(CardTitle, { className: "text-2xl", children: "Your next camp" }),
      /* @__PURE__ */ jsx5(CardDescription, { children: "See our latest and best camp destinations all across the five continents of the globe." })
    ] }),
    /* @__PURE__ */ jsxs3(CardFooter, { className: "space-x-4", children: [
      /* @__PURE__ */ jsx5(Button, { children: "Let's go" }),
      /* @__PURE__ */ jsx5(Button, { variant: "secondary", children: "Another time" })
    ] })
  ] });
}

// entry.jsx
import { jsx as jsx6 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx6("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx6("div", { className: "vendor-content", children: /* @__PURE__ */ jsx6(LensDemo, {}) }) });
}
export {
  Lens,
  Component as default
};

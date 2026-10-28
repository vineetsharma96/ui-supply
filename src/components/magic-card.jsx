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
// Adapted from https://magicui.design/docs/components/magic-card
// Copyright (c) Magic UI. See licenses/magic.txt for usage terms.
// registry:components/ui/magic-card.tsx
import { useCallback, useEffect as useEffect2, useMemo, useRef, useState as useState2 } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring
} from "motion/react";

// registry:next-themes
import { useState, useEffect } from "react";
function useTheme() {
  const [theme, set] = useState(document.documentElement.dataset.theme || "dark");
  useEffect(() => {
    const o = new MutationObserver(() => set(document.documentElement.dataset.theme || "dark"));
    o.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => o.disconnect();
  }, []);
  return { theme, resolvedTheme: theme, setTheme: (t) => {
    document.documentElement.dataset.theme = t;
    localStorage.setItem("ui-supply-theme", t);
  } };
}

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/magic-card.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function isOrbMode(props) {
  return props.mode === "orb";
}
function MagicCard(props) {
  const {
    children,
    className,
    gradientSize = 200,
    gradientColor = "#262626",
    gradientOpacity = 0.8,
    gradientFrom = "#9E7AFF",
    gradientTo = "#FE8BBB",
    mode = "gradient"
  } = props;
  const glowFrom = isOrbMode(props) ? props.glowFrom ?? "#ee4f27" : "#ee4f27";
  const glowTo = isOrbMode(props) ? props.glowTo ?? "#6b21ef" : "#6b21ef";
  const glowAngle = isOrbMode(props) ? props.glowAngle ?? 90 : 90;
  const glowSize = isOrbMode(props) ? props.glowSize ?? 420 : 420;
  const glowBlur = isOrbMode(props) ? props.glowBlur ?? 60 : 60;
  const glowOpacity = isOrbMode(props) ? props.glowOpacity ?? 0.9 : 0.9;
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState2(false);
  useEffect2(() => setMounted(true), []);
  const isDarkTheme = useMemo(() => {
    if (!mounted) return true;
    const currentTheme = theme === "system" ? systemTheme : theme;
    return currentTheme === "dark";
  }, [theme, systemTheme, mounted]);
  const mouseX = useMotionValue(-gradientSize);
  const mouseY = useMotionValue(-gradientSize);
  const orbX = useSpring(mouseX, { stiffness: 250, damping: 30, mass: 0.6 });
  const orbY = useSpring(mouseY, { stiffness: 250, damping: 30, mass: 0.6 });
  const orbVisible = useSpring(0, { stiffness: 300, damping: 35 });
  const modeRef = useRef(mode);
  const glowOpacityRef = useRef(glowOpacity);
  const gradientSizeRef = useRef(gradientSize);
  useEffect2(() => {
    modeRef.current = mode;
  }, [mode]);
  useEffect2(() => {
    glowOpacityRef.current = glowOpacity;
  }, [glowOpacity]);
  useEffect2(() => {
    gradientSizeRef.current = gradientSize;
  }, [gradientSize]);
  const reset = useCallback(
    (reason = "leave") => {
      const currentMode = modeRef.current;
      if (currentMode === "orb") {
        if (reason === "enter") orbVisible.set(glowOpacityRef.current);
        else orbVisible.set(0);
        return;
      }
      const off = -gradientSizeRef.current;
      mouseX.set(off);
      mouseY.set(off);
    },
    [mouseX, mouseY, orbVisible]
  );
  const handlePointerMove = useCallback(
    (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY]
  );
  useEffect2(() => {
    reset("init");
  }, [reset]);
  useEffect2(() => {
    const handleGlobalPointerOut = (e) => {
      if (!e.relatedTarget) reset("global");
    };
    const handleBlur = () => reset("global");
    const handleVisibility = () => {
      if (document.visibilityState !== "visible") reset("global");
    };
    window.addEventListener("pointerout", handleGlobalPointerOut);
    window.addEventListener("blur", handleBlur);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      window.removeEventListener("pointerout", handleGlobalPointerOut);
      window.removeEventListener("blur", handleBlur);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [reset]);
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      className: cn(
        "group relative isolate overflow-hidden rounded-[inherit] border border-transparent",
        className
      ),
      onPointerMove: handlePointerMove,
      onPointerLeave: () => reset("leave"),
      onPointerEnter: () => reset("enter"),
      style: {
        background: useMotionTemplate`
          linear-gradient(var(--color-background) 0 0) padding-box,
          radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
            ${gradientFrom},
            ${gradientTo},
            var(--color-border) 100%
          ) border-box
        `
      },
      children: [
        /* @__PURE__ */ jsx("div", { className: "bg-background absolute inset-px z-20 rounded-[inherit]" }),
        mode === "gradient" && /* @__PURE__ */ jsx(
          motion.div,
          {
            suppressHydrationWarning: true,
            className: "pointer-events-none absolute inset-px z-30 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100",
            style: {
              background: useMotionTemplate`
              radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
                ${gradientColor},
                transparent 100%
              )
            `,
              opacity: gradientOpacity
            }
          }
        ),
        mode === "orb" && /* @__PURE__ */ jsx(
          motion.div,
          {
            suppressHydrationWarning: true,
            "aria-hidden": "true",
            className: "pointer-events-none absolute z-30",
            style: {
              width: glowSize,
              height: glowSize,
              x: orbX,
              y: orbY,
              translateX: "-50%",
              translateY: "-50%",
              borderRadius: 9999,
              filter: `blur(${glowBlur}px)`,
              opacity: orbVisible,
              background: `linear-gradient(${glowAngle}deg, ${glowFrom}, ${glowTo})`,
              mixBlendMode: isDarkTheme ? "screen" : "multiply",
              willChange: "transform, opacity"
            }
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "relative z-40", children })
      ]
    }
  );
}

// entry.jsx
import React3 from "react";

// registry:components/ui/button.tsx
import { cva } from "class-variance-authority";
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

// registry:components/ui/input.tsx
import { jsx as jsx4 } from "react/jsx-runtime";
function Input({ className, type, ...props }) {
  return /* @__PURE__ */ jsx4(
    "input",
    {
      type,
      "data-slot": "input",
      className: cn(
        "h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30",
        "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
        className
      ),
      ...props
    }
  );
}

// registry:components/ui/label.tsx
import { Label as LabelPrimitive } from "radix-ui";
import { jsx as jsx5 } from "react/jsx-runtime";
function Label({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx5(
    LabelPrimitive.Root,
    {
      "data-slot": "label",
      className: cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      ),
      ...props
    }
  );
}

// registry:magic-card.tsx
import { useCallback as useCallback2, useEffect as useEffect3, useMemo as useMemo2, useRef as useRef2, useState as useState3 } from "react";
import {
  motion as motion2,
  useMotionTemplate as useMotionTemplate2,
  useMotionValue as useMotionValue2,
  useSpring as useSpring2
} from "motion/react";
import { jsx as jsx6, jsxs as jsxs2 } from "react/jsx-runtime";
function isOrbMode2(props) {
  return props.mode === "orb";
}
function MagicCard2(props) {
  const {
    children,
    className,
    gradientSize = 200,
    gradientColor = "#262626",
    gradientOpacity = 0.8,
    gradientFrom = "#9E7AFF",
    gradientTo = "#FE8BBB",
    mode = "gradient"
  } = props;
  const glowFrom = isOrbMode2(props) ? props.glowFrom ?? "#ee4f27" : "#ee4f27";
  const glowTo = isOrbMode2(props) ? props.glowTo ?? "#6b21ef" : "#6b21ef";
  const glowAngle = isOrbMode2(props) ? props.glowAngle ?? 90 : 90;
  const glowSize = isOrbMode2(props) ? props.glowSize ?? 420 : 420;
  const glowBlur = isOrbMode2(props) ? props.glowBlur ?? 60 : 60;
  const glowOpacity = isOrbMode2(props) ? props.glowOpacity ?? 0.9 : 0.9;
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState3(false);
  useEffect3(() => setMounted(true), []);
  const isDarkTheme = useMemo2(() => {
    if (!mounted) return true;
    const currentTheme = theme === "system" ? systemTheme : theme;
    return currentTheme === "dark";
  }, [theme, systemTheme, mounted]);
  const mouseX = useMotionValue2(-gradientSize);
  const mouseY = useMotionValue2(-gradientSize);
  const orbX = useSpring2(mouseX, { stiffness: 250, damping: 30, mass: 0.6 });
  const orbY = useSpring2(mouseY, { stiffness: 250, damping: 30, mass: 0.6 });
  const orbVisible = useSpring2(0, { stiffness: 300, damping: 35 });
  const modeRef = useRef2(mode);
  const glowOpacityRef = useRef2(glowOpacity);
  const gradientSizeRef = useRef2(gradientSize);
  useEffect3(() => {
    modeRef.current = mode;
  }, [mode]);
  useEffect3(() => {
    glowOpacityRef.current = glowOpacity;
  }, [glowOpacity]);
  useEffect3(() => {
    gradientSizeRef.current = gradientSize;
  }, [gradientSize]);
  const reset = useCallback2(
    (reason = "leave") => {
      const currentMode = modeRef.current;
      if (currentMode === "orb") {
        if (reason === "enter") orbVisible.set(glowOpacityRef.current);
        else orbVisible.set(0);
        return;
      }
      const off = -gradientSizeRef.current;
      mouseX.set(off);
      mouseY.set(off);
    },
    [mouseX, mouseY, orbVisible]
  );
  const handlePointerMove = useCallback2(
    (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY]
  );
  useEffect3(() => {
    reset("init");
  }, [reset]);
  useEffect3(() => {
    const handleGlobalPointerOut = (e) => {
      if (!e.relatedTarget) reset("global");
    };
    const handleBlur = () => reset("global");
    const handleVisibility = () => {
      if (document.visibilityState !== "visible") reset("global");
    };
    window.addEventListener("pointerout", handleGlobalPointerOut);
    window.addEventListener("blur", handleBlur);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      window.removeEventListener("pointerout", handleGlobalPointerOut);
      window.removeEventListener("blur", handleBlur);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [reset]);
  return /* @__PURE__ */ jsxs2(
    motion2.div,
    {
      className: cn(
        "group relative isolate overflow-hidden rounded-[inherit] border border-transparent",
        className
      ),
      onPointerMove: handlePointerMove,
      onPointerLeave: () => reset("leave"),
      onPointerEnter: () => reset("enter"),
      style: {
        background: useMotionTemplate2`
          linear-gradient(var(--color-background) 0 0) padding-box,
          radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
            ${gradientFrom},
            ${gradientTo},
            var(--color-border) 100%
          ) border-box
        `
      },
      children: [
        /* @__PURE__ */ jsx6("div", { className: "bg-background absolute inset-px z-20 rounded-[inherit]" }),
        mode === "gradient" && /* @__PURE__ */ jsx6(
          motion2.div,
          {
            suppressHydrationWarning: true,
            className: "pointer-events-none absolute inset-px z-30 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100",
            style: {
              background: useMotionTemplate2`
              radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
                ${gradientColor},
                transparent 100%
              )
            `,
              opacity: gradientOpacity
            }
          }
        ),
        mode === "orb" && /* @__PURE__ */ jsx6(
          motion2.div,
          {
            suppressHydrationWarning: true,
            "aria-hidden": "true",
            className: "pointer-events-none absolute z-30",
            style: {
              width: glowSize,
              height: glowSize,
              x: orbX,
              y: orbY,
              translateX: "-50%",
              translateY: "-50%",
              borderRadius: 9999,
              filter: `blur(${glowBlur}px)`,
              opacity: orbVisible,
              background: `linear-gradient(${glowAngle}deg, ${glowFrom}, ${glowTo})`,
              mixBlendMode: isDarkTheme ? "screen" : "multiply",
              willChange: "transform, opacity"
            }
          }
        ),
        /* @__PURE__ */ jsx6("div", { className: "relative z-40", children })
      ]
    }
  );
}

// registry:components/ui/magic-card-demo.tsx
import { jsx as jsx7, jsxs as jsxs3 } from "react/jsx-runtime";
function MagicCardDemo() {
  const { theme } = useTheme();
  return /* @__PURE__ */ jsx7(Card, { className: "w-full max-w-sm border-none p-0 shadow-none", children: /* @__PURE__ */ jsxs3(
    MagicCard2,
    {
      gradientColor: theme === "dark" ? "#262626" : "#D9D9D955",
      className: "p-0",
      children: [
        /* @__PURE__ */ jsxs3(CardHeader, { className: "border-border border-b p-4 [.border-b]:pb-4", children: [
          /* @__PURE__ */ jsx7(CardTitle, { children: "Login" }),
          /* @__PURE__ */ jsx7(CardDescription, { children: "Enter your credentials to access your account" })
        ] }),
        /* @__PURE__ */ jsx7(CardContent, { className: "p-4", children: /* @__PURE__ */ jsx7("form", { children: /* @__PURE__ */ jsxs3("div", { className: "grid gap-4", children: [
          /* @__PURE__ */ jsxs3("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsx7(Label, { htmlFor: "email", children: "Email" }),
            /* @__PURE__ */ jsx7(Input, { id: "email", type: "email", placeholder: "name@example.com" })
          ] }),
          /* @__PURE__ */ jsxs3("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsx7(Label, { htmlFor: "password", children: "Password" }),
            /* @__PURE__ */ jsx7(Input, { id: "password", type: "password" })
          ] })
        ] }) }) }),
        /* @__PURE__ */ jsx7(CardFooter, { className: "border-border border-t p-4 [.border-t]:pt-4", children: /* @__PURE__ */ jsx7(Button, { className: "w-full", children: "Sign In" }) })
      ]
    }
  ) });
}

// entry.jsx
import { jsx as jsx8 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx8("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx8("div", { className: "vendor-content", children: /* @__PURE__ */ jsx8(MagicCardDemo, {}) }) });
}
export {
  MagicCard,
  Component as default
};

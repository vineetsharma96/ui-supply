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
// Adapted from https://magicui.design/docs/components/confetti
// Copyright (c) Magic UI. See licenses/magic.txt for usage terms.
// registry:components/ui/confetti.tsx
import {
  createContext,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef
} from "react";
import confetti from "canvas-confetti";

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
import { jsx } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsx(
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

// registry:components/ui/confetti.tsx
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var ConfettiContext = createContext(null);
var ConfettiComponent = forwardRef((props, ref) => {
  const {
    options,
    globalOptions = { resize: true, useWorker: true },
    manualstart = false,
    children,
    className,
    ...rest
  } = props;
  const canvasNodeRef = useRef(null);
  const instanceRef = useRef(null);
  const optionsRef = useRef(options);
  const globalOptionsRef = useRef(globalOptions);
  useEffect(() => {
    optionsRef.current = options;
  }, [options]);
  useEffect(() => {
    globalOptionsRef.current = globalOptions;
  }, [globalOptions]);
  useEffect(() => {
    if (canvasNodeRef.current && !instanceRef.current) {
      instanceRef.current = confetti.create(canvasNodeRef.current, {
        resize: true,
        useWorker: true,
        ...globalOptionsRef.current
      });
    }
    return () => {
      instanceRef.current?.reset();
      instanceRef.current = null;
    };
  }, []);
  const fire = useCallback(async (opts = {}) => {
    try {
      await instanceRef.current?.({
        ...optionsRef.current,
        ...opts
      });
    } catch (error) {
      console.error("Confetti error:", error);
    }
  }, []);
  const api = useMemo(() => ({ fire }), [fire]);
  useImperativeHandle(ref, () => api, [api]);
  useEffect(() => {
    if (!manualstart) {
      void fire();
    }
  }, [manualstart, fire]);
  return /* @__PURE__ */ jsxs(ConfettiContext.Provider, { value: api, children: [
    /* @__PURE__ */ jsx2("canvas", { ref: canvasNodeRef, className, ...rest }),
    children
  ] });
});
ConfettiComponent.displayName = "Confetti";
var Confetti = ConfettiComponent;
var ConfettiButton = forwardRef(({ options, children, onClick, ...props }, ref) => {
  const handleClick = async (event) => {
    try {
      onClick?.(event);
      if (event?.defaultPrevented) return;
      const target = event?.currentTarget;
      if (target && "getBoundingClientRect" in target) {
        const rect = target.getBoundingClientRect();
        const origin = {
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top + rect.height / 2) / window.innerHeight
        };
        await confetti({
          zIndex: 9999,
          ...options,
          origin
        });
      }
    } catch (error) {
      console.error("Confetti button error:", error);
    }
  };
  return /* @__PURE__ */ jsx2(Button, { ref, type: "button", onClick: handleClick, ...props, children });
});
ConfettiButton.displayName = "ConfettiButton";

// entry.jsx
import React3 from "react";

// registry:components/ui/confetti-demo.tsx
import { useRef as useRef3 } from "react";

// registry:confetti.tsx
import {
  createContext as createContext2,
  forwardRef as forwardRef2,
  useCallback as useCallback2,
  useEffect as useEffect2,
  useImperativeHandle as useImperativeHandle2,
  useMemo as useMemo2,
  useRef as useRef2
} from "react";
import confetti2 from "canvas-confetti";
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var ConfettiContext2 = createContext2(null);
var ConfettiComponent2 = forwardRef2((props, ref) => {
  const {
    options,
    globalOptions = { resize: true, useWorker: true },
    manualstart = false,
    children,
    className,
    ...rest
  } = props;
  const canvasNodeRef = useRef2(null);
  const instanceRef = useRef2(null);
  const optionsRef = useRef2(options);
  const globalOptionsRef = useRef2(globalOptions);
  useEffect2(() => {
    optionsRef.current = options;
  }, [options]);
  useEffect2(() => {
    globalOptionsRef.current = globalOptions;
  }, [globalOptions]);
  useEffect2(() => {
    if (canvasNodeRef.current && !instanceRef.current) {
      instanceRef.current = confetti2.create(canvasNodeRef.current, {
        resize: true,
        useWorker: true,
        ...globalOptionsRef.current
      });
    }
    return () => {
      instanceRef.current?.reset();
      instanceRef.current = null;
    };
  }, []);
  const fire = useCallback2(async (opts = {}) => {
    try {
      await instanceRef.current?.({
        ...optionsRef.current,
        ...opts
      });
    } catch (error) {
      console.error("Confetti error:", error);
    }
  }, []);
  const api = useMemo2(() => ({ fire }), [fire]);
  useImperativeHandle2(ref, () => api, [api]);
  useEffect2(() => {
    if (!manualstart) {
      void fire();
    }
  }, [manualstart, fire]);
  return /* @__PURE__ */ jsxs2(ConfettiContext2.Provider, { value: api, children: [
    /* @__PURE__ */ jsx3("canvas", { ref: canvasNodeRef, className, ...rest }),
    children
  ] });
});
ConfettiComponent2.displayName = "Confetti";
var Confetti2 = ConfettiComponent2;
var ConfettiButton2 = forwardRef2(({ options, children, onClick, ...props }, ref) => {
  const handleClick = async (event) => {
    try {
      onClick?.(event);
      if (event?.defaultPrevented) return;
      const target = event?.currentTarget;
      if (target && "getBoundingClientRect" in target) {
        const rect = target.getBoundingClientRect();
        const origin = {
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top + rect.height / 2) / window.innerHeight
        };
        await confetti2({
          zIndex: 9999,
          ...options,
          origin
        });
      }
    } catch (error) {
      console.error("Confetti button error:", error);
    }
  };
  return /* @__PURE__ */ jsx3(Button, { ref, type: "button", onClick: handleClick, ...props, children });
});
ConfettiButton2.displayName = "ConfettiButton";

// registry:components/ui/confetti-demo.tsx
import { jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
function ConfettiDemo() {
  const confettiRef = useRef3(null);
  return /* @__PURE__ */ jsxs3("div", { className: "bg-background relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border", children: [
    /* @__PURE__ */ jsx4("span", { className: "pointer-events-none bg-linear-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl leading-none font-semibold whitespace-pre-wrap text-transparent dark:from-white dark:to-slate-900/10", children: "Confetti" }),
    /* @__PURE__ */ jsx4(
      Confetti2,
      {
        ref: confettiRef,
        className: "absolute top-0 left-0 z-0 size-full",
        onMouseEnter: () => {
          confettiRef.current?.fire({});
        }
      }
    )
  ] });
}

// entry.jsx
import { jsx as jsx5 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx5("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx5("div", { className: "vendor-content", children: /* @__PURE__ */ jsx5(ConfettiDemo, {}) }) });
}
export {
  Confetti,
  ConfettiButton,
  Component as default
};

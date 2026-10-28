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
// Adapted from https://magicui.design/docs/components/shine-border
// Copyright (c) Magic UI. See licenses/magic.txt for usage terms.
// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/shine-border.tsx
import { jsx } from "react/jsx-runtime";
function ShineBorder({
  borderWidth = 1,
  duration = 14,
  shineColor = "#000000",
  className,
  style,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      style: {
        "--border-width": `${borderWidth}px`,
        "--duration": `${duration}s`,
        backgroundImage: `radial-gradient(transparent,transparent, ${Array.isArray(shineColor) ? shineColor.join(",") : shineColor},transparent,transparent)`,
        backgroundSize: "300% 300%",
        mask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
        WebkitMask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
        padding: "var(--border-width)",
        ...style
      },
      className: cn(
        "motion-safe:animate-shine pointer-events-none absolute inset-0 size-full rounded-[inherit] will-change-[background-position]",
        className
      ),
      ...props
    }
  );
}

// entry.jsx
import React from "react";

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

// registry:shine-border.tsx
import { jsx as jsx6 } from "react/jsx-runtime";
function ShineBorder2({
  borderWidth = 1,
  duration = 14,
  shineColor = "#000000",
  className,
  style,
  ...props
}) {
  return /* @__PURE__ */ jsx6(
    "div",
    {
      style: {
        "--border-width": `${borderWidth}px`,
        "--duration": `${duration}s`,
        backgroundImage: `radial-gradient(transparent,transparent, ${Array.isArray(shineColor) ? shineColor.join(",") : shineColor},transparent,transparent)`,
        backgroundSize: "300% 300%",
        mask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
        WebkitMask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
        padding: "var(--border-width)",
        ...style
      },
      className: cn(
        "motion-safe:animate-shine pointer-events-none absolute inset-0 size-full rounded-[inherit] will-change-[background-position]",
        className
      ),
      ...props
    }
  );
}

// registry:components/ui/shine-border-demo.tsx
import { jsx as jsx7, jsxs } from "react/jsx-runtime";
function ShineBorderDemo() {
  return /* @__PURE__ */ jsxs(Card, { className: "relative w-full max-w-[350px] overflow-hidden", children: [
    /* @__PURE__ */ jsx7(ShineBorder2, { shineColor: ["#A07CFE", "#FE8FB5", "#FFBE7B"] }),
    /* @__PURE__ */ jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsx7(CardTitle, { children: "Login" }),
      /* @__PURE__ */ jsx7(CardDescription, { children: "Enter your credentials to access your account" })
    ] }),
    /* @__PURE__ */ jsx7(CardContent, { children: /* @__PURE__ */ jsx7("form", { children: /* @__PURE__ */ jsxs("div", { className: "grid gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
        /* @__PURE__ */ jsx7(Label, { htmlFor: "email", children: "Email" }),
        /* @__PURE__ */ jsx7(Input, { id: "email", type: "email", placeholder: "name@example.com" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
        /* @__PURE__ */ jsx7(Label, { htmlFor: "password", children: "Password" }),
        /* @__PURE__ */ jsx7(Input, { id: "password", type: "password" })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx7(CardFooter, { children: /* @__PURE__ */ jsx7(Button, { className: "w-full", children: "Sign In" }) })
  ] });
}

// entry.jsx
import { jsx as jsx8 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx8("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx8("div", { className: "vendor-content", children: /* @__PURE__ */ jsx8(ShineBorderDemo, {}) }) });
}
export {
  ShineBorder,
  Component as default
};

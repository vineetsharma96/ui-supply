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
// Adapted from https://magicui.design/docs/components/dock
// Copyright (c) Magic UI. See licenses/magic.txt for usage terms.
// registry:components/ui/dock.tsx
import React, { useRef } from "react";
import { cva } from "class-variance-authority";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform
} from "motion/react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/dock.tsx
import { jsx } from "react/jsx-runtime";
var DEFAULT_SIZE = 40;
var DEFAULT_MAGNIFICATION = 60;
var DEFAULT_DISTANCE = 140;
var DEFAULT_DISABLEMAGNIFICATION = false;
var dockVariants = cva(
  "supports-backdrop-blur:bg-white/10 supports-backdrop-blur:dark:bg-black/10 mx-auto mt-8 flex h-[58px] w-max items-center justify-center gap-2 rounded-2xl border p-2 backdrop-blur-md"
);
var Dock = React.forwardRef(
  ({
    className,
    children,
    iconSize = DEFAULT_SIZE,
    iconMagnification = DEFAULT_MAGNIFICATION,
    disableMagnification = DEFAULT_DISABLEMAGNIFICATION,
    iconDistance = DEFAULT_DISTANCE,
    direction = "middle",
    ...props
  }, ref) => {
    const mouseX = useMotionValue(Infinity);
    const renderChildren = () => {
      return React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === DockIcon) {
          return React.cloneElement(child, {
            ...child.props,
            mouseX,
            size: iconSize,
            magnification: iconMagnification,
            disableMagnification,
            distance: iconDistance
          });
        }
        return child;
      });
    };
    return /* @__PURE__ */ jsx(
      motion.div,
      {
        ref,
        onMouseMove: (e) => mouseX.set(e.pageX),
        onMouseLeave: () => mouseX.set(Infinity),
        ...props,
        className: cn(dockVariants({ className }), {
          "items-start": direction === "top",
          "items-center": direction === "middle",
          "items-end": direction === "bottom"
        }),
        children: renderChildren()
      }
    );
  }
);
Dock.displayName = "Dock";
var DockIcon = ({
  size = DEFAULT_SIZE,
  magnification = DEFAULT_MAGNIFICATION,
  disableMagnification,
  distance = DEFAULT_DISTANCE,
  mouseX,
  className,
  children,
  ...props
}) => {
  const ref = useRef(null);
  const padding = Math.max(6, size * 0.2);
  const defaultMouseX = useMotionValue(Infinity);
  const distanceCalc = useTransform(mouseX ?? defaultMouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });
  const targetSize = disableMagnification ? size : magnification;
  const sizeTransform = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [size, targetSize, size]
  );
  const scaleSize = useSpring(sizeTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12
  });
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      ref,
      style: { width: scaleSize, height: scaleSize, padding },
      className: cn(
        "flex aspect-square cursor-pointer items-center justify-center rounded-full",
        disableMagnification && "hover:bg-muted-foreground transition-colors",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx("div", { children })
    }
  );
};
DockIcon.displayName = "DockIcon";

// entry.jsx
import React3 from "react";

// registry:next/link
import { jsx as jsx2 } from "react/jsx-runtime";
function Link({ prefetch, replace, scroll, legacyBehavior, passHref, ...props }) {
  return /* @__PURE__ */ jsx2("a", { ...props });
}

// registry:components/ui/dock-demo.tsx
import { CalendarIcon, HomeIcon, MailIcon, PencilIcon } from "lucide-react";

// registry:components/ui/button.tsx
import { cva as cva2 } from "class-variance-authority";
import { Slot } from "radix-ui";
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

// registry:components/ui/separator.tsx
import { Separator as SeparatorPrimitive } from "radix-ui";
import { jsx as jsx4 } from "react/jsx-runtime";
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return /* @__PURE__ */ jsx4(
    SeparatorPrimitive.Root,
    {
      "data-slot": "separator",
      decorative,
      orientation,
      className: cn(
        "shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      ),
      ...props
    }
  );
}

// registry:components/ui/tooltip.tsx
import { Tooltip as TooltipPrimitive } from "radix-ui";
import { jsx as jsx5, jsxs } from "react/jsx-runtime";
function TooltipProvider({
  delayDuration = 0,
  ...props
}) {
  return /* @__PURE__ */ jsx5(
    TooltipPrimitive.Provider,
    {
      "data-slot": "tooltip-provider",
      delayDuration,
      ...props
    }
  );
}
function Tooltip({
  ...props
}) {
  return /* @__PURE__ */ jsx5(TooltipPrimitive.Root, { "data-slot": "tooltip", ...props });
}
function TooltipTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx5(TooltipPrimitive.Trigger, { "data-slot": "tooltip-trigger", ...props });
}
function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx5(TooltipPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
    TooltipPrimitive.Content,
    {
      "data-slot": "tooltip-content",
      sideOffset,
      className: cn(
        "z-50 w-fit origin-(--radix-tooltip-content-transform-origin) animate-in rounded-md bg-foreground px-3 py-1.5 text-xs text-balance text-background fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx5(TooltipPrimitive.Arrow, { className: "z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] bg-foreground fill-foreground" })
      ]
    }
  ) });
}

// registry:dock.tsx
import React2, { useRef as useRef2 } from "react";
import { cva as cva3 } from "class-variance-authority";
import {
  motion as motion2,
  useMotionValue as useMotionValue2,
  useSpring as useSpring2,
  useTransform as useTransform2
} from "motion/react";
import { jsx as jsx6 } from "react/jsx-runtime";
var DEFAULT_SIZE2 = 40;
var DEFAULT_MAGNIFICATION2 = 60;
var DEFAULT_DISTANCE2 = 140;
var DEFAULT_DISABLEMAGNIFICATION2 = false;
var dockVariants2 = cva3(
  "supports-backdrop-blur:bg-white/10 supports-backdrop-blur:dark:bg-black/10 mx-auto mt-8 flex h-[58px] w-max items-center justify-center gap-2 rounded-2xl border p-2 backdrop-blur-md"
);
var Dock2 = React2.forwardRef(
  ({
    className,
    children,
    iconSize = DEFAULT_SIZE2,
    iconMagnification = DEFAULT_MAGNIFICATION2,
    disableMagnification = DEFAULT_DISABLEMAGNIFICATION2,
    iconDistance = DEFAULT_DISTANCE2,
    direction = "middle",
    ...props
  }, ref) => {
    const mouseX = useMotionValue2(Infinity);
    const renderChildren = () => {
      return React2.Children.map(children, (child) => {
        if (React2.isValidElement(child) && child.type === DockIcon2) {
          return React2.cloneElement(child, {
            ...child.props,
            mouseX,
            size: iconSize,
            magnification: iconMagnification,
            disableMagnification,
            distance: iconDistance
          });
        }
        return child;
      });
    };
    return /* @__PURE__ */ jsx6(
      motion2.div,
      {
        ref,
        onMouseMove: (e) => mouseX.set(e.pageX),
        onMouseLeave: () => mouseX.set(Infinity),
        ...props,
        className: cn(dockVariants2({ className }), {
          "items-start": direction === "top",
          "items-center": direction === "middle",
          "items-end": direction === "bottom"
        }),
        children: renderChildren()
      }
    );
  }
);
Dock2.displayName = "Dock";
var DockIcon2 = ({
  size = DEFAULT_SIZE2,
  magnification = DEFAULT_MAGNIFICATION2,
  disableMagnification,
  distance = DEFAULT_DISTANCE2,
  mouseX,
  className,
  children,
  ...props
}) => {
  const ref = useRef2(null);
  const padding = Math.max(6, size * 0.2);
  const defaultMouseX = useMotionValue2(Infinity);
  const distanceCalc = useTransform2(mouseX ?? defaultMouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });
  const targetSize = disableMagnification ? size : magnification;
  const sizeTransform = useTransform2(
    distanceCalc,
    [-distance, 0, distance],
    [size, targetSize, size]
  );
  const scaleSize = useSpring2(sizeTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12
  });
  return /* @__PURE__ */ jsx6(
    motion2.div,
    {
      ref,
      style: { width: scaleSize, height: scaleSize, padding },
      className: cn(
        "flex aspect-square cursor-pointer items-center justify-center rounded-full",
        disableMagnification && "hover:bg-muted-foreground transition-colors",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx6("div", { children })
    }
  );
};
DockIcon2.displayName = "DockIcon";

// registry:components/ui/dock-demo.tsx
import { jsx as jsx7, jsxs as jsxs2 } from "react/jsx-runtime";
var Icons = {
  calendar: (props) => /* @__PURE__ */ jsx7(CalendarIcon, { ...props }),
  email: (props) => /* @__PURE__ */ jsx7(MailIcon, { ...props }),
  linkedin: (props) => /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", ...props, children: [
    /* @__PURE__ */ jsx7("title", { children: "LinkedIn" }),
    /* @__PURE__ */ jsx7(
      "path",
      {
        fill: "currentColor",
        d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      }
    )
  ] }),
  x: (props) => /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", ...props, children: [
    /* @__PURE__ */ jsx7("title", { children: "X" }),
    /* @__PURE__ */ jsx7(
      "path",
      {
        fill: "currentColor",
        d: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
      }
    )
  ] }),
  youtube: (props) => /* @__PURE__ */ jsxs2(
    "svg",
    {
      width: "32px",
      height: "32px",
      viewBox: "0 0 32 32",
      fill: "currentColor",
      xmlns: "http://www.w3.org/2000/svg",
      ...props,
      children: [
        /* @__PURE__ */ jsx7("title", { children: "youtube" }),
        /* @__PURE__ */ jsx7("path", { d: "M29.41,9.26a3.5,3.5,0,0,0-2.47-2.47C24.76,6.2,16,6.2,16,6.2s-8.76,0-10.94.59A3.5,3.5,0,0,0,2.59,9.26,36.13,36.13,0,0,0,2,16a36.13,36.13,0,0,0,.59,6.74,3.5,3.5,0,0,0,2.47,2.47C7.24,25.8,16,25.8,16,25.8s8.76,0,10.94-.59a3.5,3.5,0,0,0,2.47-2.47A36.13,36.13,0,0,0,30,16,36.13,36.13,0,0,0,29.41,9.26ZM13.2,20.2V11.8L20.47,16Z" })
      ]
    }
  ),
  github: (props) => /* @__PURE__ */ jsx7("svg", { viewBox: "0 0 438.549 438.549", ...props, children: /* @__PURE__ */ jsx7(
    "path",
    {
      fill: "currentColor",
      d: "M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
    }
  ) })
};
var DATA = {
  navbar: [
    { href: "#", icon: HomeIcon, label: "Home" },
    { href: "#", icon: PencilIcon, label: "Blog" }
  ],
  contact: {
    social: {
      GitHub: {
        name: "GitHub",
        url: "#",
        icon: Icons.github
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "#",
        icon: Icons.linkedin
      },
      X: {
        name: "X",
        url: "#",
        icon: Icons.x
      },
      email: {
        name: "Send Email",
        url: "#",
        icon: Icons.email
      }
    }
  }
};
function DockDemo() {
  return /* @__PURE__ */ jsxs2("div", { className: "flex flex-col items-center justify-center", children: [
    /* @__PURE__ */ jsx7("span", { className: "pointer-events-none bg-linear-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl leading-none font-semibold whitespace-pre-wrap text-transparent dark:from-white dark:to-slate-900/10", children: "Dock" }),
    /* @__PURE__ */ jsx7(TooltipProvider, { children: /* @__PURE__ */ jsxs2(Dock2, { direction: "middle", children: [
      DATA.navbar.map((item) => /* @__PURE__ */ jsx7(DockIcon2, { children: /* @__PURE__ */ jsxs2(Tooltip, { children: [
        /* @__PURE__ */ jsx7(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx7(
          Link,
          {
            href: item.href,
            "aria-label": item.label,
            className: cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "size-12 rounded-full"
            ),
            children: /* @__PURE__ */ jsx7(item.icon, { className: "size-4" })
          }
        ) }),
        /* @__PURE__ */ jsx7(TooltipContent, { children: /* @__PURE__ */ jsx7("p", { children: item.label }) })
      ] }) }, item.label)),
      /* @__PURE__ */ jsx7(Separator, { orientation: "vertical", className: "h-full" }),
      Object.entries(DATA.contact.social).map(([name, social]) => /* @__PURE__ */ jsx7(DockIcon2, { children: /* @__PURE__ */ jsxs2(Tooltip, { children: [
        /* @__PURE__ */ jsx7(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx7(
          Link,
          {
            href: social.url,
            "aria-label": social.name,
            className: cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "size-12 rounded-full"
            ),
            children: /* @__PURE__ */ jsx7(social.icon, { className: "size-4" })
          }
        ) }),
        /* @__PURE__ */ jsx7(TooltipContent, { children: /* @__PURE__ */ jsx7("p", { children: name }) })
      ] }) }, name))
    ] }) })
  ] });
}

// entry.jsx
import { jsx as jsx8 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx8("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx8("div", { className: "vendor-content", children: /* @__PURE__ */ jsx8(DockDemo, {}) }) });
}
export {
  Dock,
  DockIcon,
  Component as default,
  dockVariants
};

// Adapted from https://ui.aceternity.com/components/link-preview
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:components/ui/link-preview.tsx
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { encode } from "qss";
import React from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring
} from "motion/react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/link-preview.tsx
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var LinkPreview = ({
  children,
  url,
  className,
  width = 200,
  height = 125,
  quality = 50,
  layout = "fixed",
  isStatic = false,
  imageSrc = ""
}) => {
  let src;
  if (!isStatic) {
    const params = encode({
      url,
      screenshot: true,
      meta: false,
      embed: "screenshot.url",
      colorScheme: "dark",
      "viewport.isMobile": true,
      "viewport.deviceScaleFactor": 1,
      "viewport.width": width * 3,
      "viewport.height": height * 3
    });
    src = `https://api.microlink.io/?${params}`;
  } else {
    src = imageSrc;
  }
  const [isOpen, setOpen] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);
  React.useEffect(() => {
    setIsMounted(true);
  }, []);
  const springConfig = { stiffness: 100, damping: 15 };
  const x = useMotionValue(0);
  const translateX = useSpring(x, springConfig);
  const handleMouseMove = (event) => {
    const targetRect = event.target.getBoundingClientRect();
    const eventOffsetX = event.clientX - targetRect.left;
    const offsetFromCenter = (eventOffsetX - targetRect.width / 2) / 2;
    x.set(offsetFromCenter);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    isMounted ? /* @__PURE__ */ jsx("div", { className: "hidden", children: /* @__PURE__ */ jsx(
      "img",
      {
        src,
        width,
        height,
        alt: "hidden image"
      }
    ) }) : null,
    /* @__PURE__ */ jsxs(
      HoverCardPrimitive.Root,
      {
        openDelay: 50,
        closeDelay: 100,
        onOpenChange: (open) => {
          setOpen(open);
        },
        children: [
          /* @__PURE__ */ jsx(
            HoverCardPrimitive.Trigger,
            {
              onMouseMove: handleMouseMove,
              className: cn("text-black dark:text-white", className),
              href: url,
              children
            }
          ),
          /* @__PURE__ */ jsx(
            HoverCardPrimitive.Content,
            {
              className: "[transform-origin:var(--radix-hover-card-content-transform-origin)]",
              side: "top",
              align: "center",
              sideOffset: 10,
              children: /* @__PURE__ */ jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsx(
                motion.div,
                {
                  initial: { opacity: 0, y: 20, scale: 0.6 },
                  animate: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      type: "spring",
                      stiffness: 260,
                      damping: 20
                    }
                  },
                  exit: { opacity: 0, y: 20, scale: 0.6 },
                  className: "shadow-xl rounded-xl",
                  style: {
                    x: translateX
                  },
                  children: /* @__PURE__ */ jsx(
                    "a",
                    {
                      href: url,
                      className: "block p-1 bg-white border-2 border-transparent shadow rounded-xl hover:border-neutral-200 dark:hover:border-neutral-800",
                      style: { fontSize: 0 },
                      children: /* @__PURE__ */ jsx(
                        "img",
                        {
                          src: isStatic ? imageSrc : src,
                          width,
                          height,
                          className: "rounded-lg",
                          alt: "preview image"
                        }
                      )
                    }
                  )
                }
              ) })
            }
          )
        ]
      }
    )
  ] });
};

// entry.jsx
import React2 from "react";

// registry:components/link-preview-demo.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function LinkPreviewDemo() {
  return /* @__PURE__ */ jsxs2("div", { className: "flex justify-center items-center h-[40rem] flex-col px-4", children: [
    /* @__PURE__ */ jsxs2("p", { className: "text-neutral-500 dark:text-neutral-400 text-xl md:text-3xl max-w-3xl mx-auto mb-10", children: [
      /* @__PURE__ */ jsx2(LinkPreview, { url: "https://tailwindcss.com", className: "font-bold", children: "Tailwind CSS" }),
      " ",
      "and",
      " ",
      /* @__PURE__ */ jsx2(LinkPreview, { url: "https://framer.com/motion", className: "font-bold", children: "Framer Motion" }),
      " ",
      "are a great way to build modern websites."
    ] }),
    /* @__PURE__ */ jsxs2("p", { className: "text-neutral-500 dark:text-neutral-400 text-xl md:text-3xl max-w-3xl mx-auto", children: [
      "Visit",
      " ",
      /* @__PURE__ */ jsx2(
        LinkPreview,
        {
          url: "https://ui.aceternity.com",
          className: "font-bold bg-clip-text text-transparent bg-gradient-to-br from-purple-500 to-pink-500",
          children: "Aceternity UI"
        }
      ),
      " ",
      "for amazing Tailwind and Framer Motion components."
    ] })
  ] });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(LinkPreviewDemo, {}) }) });
}
export {
  LinkPreview,
  Component as default
};

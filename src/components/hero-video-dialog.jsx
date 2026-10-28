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
// Adapted from https://magicui.design/docs/components/hero-video-dialog
// Copyright (c) Magic UI. See licenses/magic.txt for usage terms.
// registry:components/ui/hero-video-dialog.tsx
import { useState } from "react";
import { Play, XIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/hero-video-dialog.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var animationVariants = {
  "from-bottom": {
    initial: { y: "100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "100%", opacity: 0 }
  },
  "from-center": {
    initial: { scale: 0.5, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.5, opacity: 0 }
  },
  "from-top": {
    initial: { y: "-100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "-100%", opacity: 0 }
  },
  "from-left": {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 }
  },
  "from-right": {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 }
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  "top-in-bottom-out": {
    initial: { y: "-100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "100%", opacity: 0 }
  },
  "left-in-right-out": {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 }
  }
};
function HeroVideoDialog({
  animationStyle = "from-center",
  videoSrc,
  thumbnailSrc,
  thumbnailAlt = "Video thumbnail",
  className
}) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const selectedAnimation = animationVariants[animationStyle];
  return /* @__PURE__ */ jsxs("div", { className: cn("relative", className), children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        "aria-label": "Play video",
        className: "group relative cursor-pointer border-0 bg-transparent p-0",
        onClick: () => setIsVideoOpen(true),
        children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: thumbnailSrc,
              alt: thumbnailAlt,
              width: 1920,
              height: 1080,
              className: "w-full rounded-md border shadow-lg transition-all duration-200 ease-out group-hover:brightness-[0.8]"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex scale-[0.9] items-center justify-center rounded-2xl transition-all duration-200 ease-out group-hover:scale-100", children: /* @__PURE__ */ jsx("div", { className: "bg-primary/10 flex size-28 items-center justify-center rounded-full backdrop-blur-md", children: /* @__PURE__ */ jsx(
            "div",
            {
              className: `from-primary/30 to-primary relative flex size-20 scale-100 items-center justify-center rounded-full bg-linear-to-b shadow-md transition-all duration-200 ease-out group-hover:scale-[1.2]`,
              children: /* @__PURE__ */ jsx(
                Play,
                {
                  className: "size-8 scale-100 fill-white text-white transition-transform duration-200 ease-out group-hover:scale-105",
                  style: {
                    filter: "drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))"
                  }
                }
              )
            }
          ) }) })
        ]
      }
    ),
    /* @__PURE__ */ jsx(AnimatePresence, { children: isVideoOpen && /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        role: "button",
        tabIndex: 0,
        onKeyDown: (e) => {
          if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
            setIsVideoOpen(false);
          }
        },
        onClick: () => setIsVideoOpen(false),
        exit: { opacity: 0 },
        className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md",
        children: /* @__PURE__ */ jsxs(
          motion.div,
          {
            ...selectedAnimation,
            transition: { type: "spring", damping: 30, stiffness: 300 },
            className: "relative mx-4 aspect-video w-full max-w-4xl md:mx-0",
            children: [
              /* @__PURE__ */ jsx(motion.button, { className: "absolute -top-16 right-0 rounded-full bg-neutral-900/50 p-2 text-xl text-white ring-1 backdrop-blur-md dark:bg-neutral-100/50 dark:text-black", children: /* @__PURE__ */ jsx(XIcon, { className: "size-5" }) }),
              /* @__PURE__ */ jsx("div", { className: "relative isolate z-1 size-full overflow-hidden rounded-2xl border-2 border-white", children: /* @__PURE__ */ jsx(
                "iframe",
                {
                  src: videoSrc,
                  title: "Hero Video player",
                  className: "mt-0 size-full rounded-2xl",
                  allowFullScreen: true,
                  allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                }
              ) })
            ]
          }
        )
      }
    ) })
  ] });
}

// entry.jsx
import React from "react";

// registry:hero-video-dialog.tsx
import { useState as useState2 } from "react";
import { Play as Play2, XIcon as XIcon2 } from "lucide-react";
import { AnimatePresence as AnimatePresence2, motion as motion2 } from "motion/react";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var animationVariants2 = {
  "from-bottom": {
    initial: { y: "100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "100%", opacity: 0 }
  },
  "from-center": {
    initial: { scale: 0.5, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.5, opacity: 0 }
  },
  "from-top": {
    initial: { y: "-100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "-100%", opacity: 0 }
  },
  "from-left": {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 }
  },
  "from-right": {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 }
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  "top-in-bottom-out": {
    initial: { y: "-100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "100%", opacity: 0 }
  },
  "left-in-right-out": {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 }
  }
};
function HeroVideoDialog2({
  animationStyle = "from-center",
  videoSrc,
  thumbnailSrc,
  thumbnailAlt = "Video thumbnail",
  className
}) {
  const [isVideoOpen, setIsVideoOpen] = useState2(false);
  const selectedAnimation = animationVariants2[animationStyle];
  return /* @__PURE__ */ jsxs2("div", { className: cn("relative", className), children: [
    /* @__PURE__ */ jsxs2(
      "button",
      {
        type: "button",
        "aria-label": "Play video",
        className: "group relative cursor-pointer border-0 bg-transparent p-0",
        onClick: () => setIsVideoOpen(true),
        children: [
          /* @__PURE__ */ jsx2(
            "img",
            {
              src: thumbnailSrc,
              alt: thumbnailAlt,
              width: 1920,
              height: 1080,
              className: "w-full rounded-md border shadow-lg transition-all duration-200 ease-out group-hover:brightness-[0.8]"
            }
          ),
          /* @__PURE__ */ jsx2("div", { className: "absolute inset-0 flex scale-[0.9] items-center justify-center rounded-2xl transition-all duration-200 ease-out group-hover:scale-100", children: /* @__PURE__ */ jsx2("div", { className: "bg-primary/10 flex size-28 items-center justify-center rounded-full backdrop-blur-md", children: /* @__PURE__ */ jsx2(
            "div",
            {
              className: `from-primary/30 to-primary relative flex size-20 scale-100 items-center justify-center rounded-full bg-linear-to-b shadow-md transition-all duration-200 ease-out group-hover:scale-[1.2]`,
              children: /* @__PURE__ */ jsx2(
                Play2,
                {
                  className: "size-8 scale-100 fill-white text-white transition-transform duration-200 ease-out group-hover:scale-105",
                  style: {
                    filter: "drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))"
                  }
                }
              )
            }
          ) }) })
        ]
      }
    ),
    /* @__PURE__ */ jsx2(AnimatePresence2, { children: isVideoOpen && /* @__PURE__ */ jsx2(
      motion2.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        role: "button",
        tabIndex: 0,
        onKeyDown: (e) => {
          if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
            setIsVideoOpen(false);
          }
        },
        onClick: () => setIsVideoOpen(false),
        exit: { opacity: 0 },
        className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md",
        children: /* @__PURE__ */ jsxs2(
          motion2.div,
          {
            ...selectedAnimation,
            transition: { type: "spring", damping: 30, stiffness: 300 },
            className: "relative mx-4 aspect-video w-full max-w-4xl md:mx-0",
            children: [
              /* @__PURE__ */ jsx2(motion2.button, { className: "absolute -top-16 right-0 rounded-full bg-neutral-900/50 p-2 text-xl text-white ring-1 backdrop-blur-md dark:bg-neutral-100/50 dark:text-black", children: /* @__PURE__ */ jsx2(XIcon2, { className: "size-5" }) }),
              /* @__PURE__ */ jsx2("div", { className: "relative isolate z-1 size-full overflow-hidden rounded-2xl border-2 border-white", children: /* @__PURE__ */ jsx2(
                "iframe",
                {
                  src: videoSrc,
                  title: "Hero Video player",
                  className: "mt-0 size-full rounded-2xl",
                  allowFullScreen: true,
                  allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                }
              ) })
            ]
          }
        )
      }
    ) })
  ] });
}

// registry:components/ui/hero-video-dialog-demo.tsx
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
function HeroVideoDialogDemo() {
  return /* @__PURE__ */ jsxs3("div", { className: "relative", children: [
    /* @__PURE__ */ jsx3(
      HeroVideoDialog2,
      {
        className: "block dark:hidden",
        animationStyle: "from-center",
        videoSrc: "https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb",
        thumbnailSrc: "https://startup-template-sage.vercel.app/hero-light.png",
        thumbnailAlt: "Hero Video"
      }
    ),
    /* @__PURE__ */ jsx3(
      HeroVideoDialog2,
      {
        className: "hidden dark:block",
        animationStyle: "from-center",
        videoSrc: "https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb",
        thumbnailSrc: "https://startup-template-sage.vercel.app/hero-dark.png",
        thumbnailAlt: "Hero Video"
      }
    )
  ] });
}

// entry.jsx
import { jsx as jsx4 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx4("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx4("div", { className: "vendor-content", children: /* @__PURE__ */ jsx4(HeroVideoDialogDemo, {}) }) });
}
export {
  HeroVideoDialog,
  Component as default
};

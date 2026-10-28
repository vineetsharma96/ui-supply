// Adapted from https://ui.aceternity.com/components/images-badge
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:components/ui/images-badge.tsx
import { useState } from "react";
import { motion } from "motion/react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/images-badge.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function ImagesBadge({
  text,
  images,
  className,
  href,
  target,
  folderSize = { width: 32, height: 24 },
  teaserImageSize = { width: 20, height: 14 },
  hoverImageSize = { width: 48, height: 32 },
  hoverTranslateY = -35,
  hoverSpread = 20,
  hoverRotation = 15
}) {
  const [isHovered, setIsHovered] = useState(false);
  const displayImages = images.slice(0, 3);
  const tabWidth = folderSize.width * 0.375;
  const tabHeight = folderSize.height * 0.25;
  const Component2 = href ? "a" : "div";
  return /* @__PURE__ */ jsxs(
    Component2,
    {
      href,
      target,
      rel: target === "_blank" ? "noopener noreferrer" : void 0,
      className: cn(
        "inline-flex cursor-pointer items-center gap-2 perspective-[1000px] transform-3d",
        className
      ),
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false),
      children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            className: "relative",
            style: {
              width: folderSize.width,
              height: folderSize.height,
              transformStyle: "preserve-3d"
            },
            children: [
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-[4px] bg-gradient-to-b from-amber-400 to-amber-500 shadow-sm dark:from-amber-500 dark:to-amber-600", children: /* @__PURE__ */ jsx(
                "div",
                {
                  className: "absolute left-0.5 rounded-t-[2px] bg-gradient-to-b from-amber-300 to-amber-400 dark:from-amber-400 dark:to-amber-500",
                  style: {
                    top: -tabHeight * 0.65,
                    width: tabWidth,
                    height: tabHeight
                  }
                }
              ) }),
              displayImages.map((image, index) => {
                const totalImages = displayImages.length;
                const baseRotation = totalImages === 1 ? 0 : totalImages === 2 ? (index - 0.5) * hoverRotation : (index - 1) * hoverRotation;
                const hoverY = hoverTranslateY - (totalImages - 1 - index) * 3;
                const hoverX = totalImages === 1 ? 0 : totalImages === 2 ? (index - 0.5) * hoverSpread : (index - 1) * hoverSpread;
                const teaseY = -4 - (totalImages - 1 - index) * 1;
                const teaseRotation = totalImages === 1 ? 0 : totalImages === 2 ? (index - 0.5) * 3 : (index - 1) * 3;
                return /* @__PURE__ */ jsx(
                  motion.div,
                  {
                    className: "absolute top-0.5 left-1/2 origin-bottom overflow-hidden rounded-[3px] bg-white shadow-sm ring-1 shadow-black/10 ring-black/10 dark:bg-neutral-800 dark:shadow-white/10 dark:ring-white/10",
                    animate: {
                      x: `calc(-50% + ${isHovered ? hoverX : 0}px)`,
                      y: isHovered ? hoverY : teaseY,
                      rotate: isHovered ? baseRotation : teaseRotation,
                      width: isHovered ? hoverImageSize.width : teaserImageSize.width,
                      height: isHovered ? hoverImageSize.height : teaserImageSize.height
                    },
                    transition: {
                      type: "spring",
                      stiffness: 400,
                      damping: 25,
                      delay: index * 0.03
                    },
                    style: {
                      zIndex: 10 + index
                    },
                    children: /* @__PURE__ */ jsx(
                      "img",
                      {
                        src: image,
                        alt: `Preview ${index + 1}`,
                        className: "h-full w-full object-cover"
                      }
                    )
                  },
                  index
                );
              }),
              /* @__PURE__ */ jsx(
                motion.div,
                {
                  className: "absolute inset-x-0 bottom-0 h-[85%] origin-bottom rounded-[4px] bg-gradient-to-b from-amber-300 to-amber-400 shadow-sm dark:from-amber-400 dark:to-amber-500",
                  animate: {
                    rotateX: isHovered ? -45 : -25,
                    scaleY: isHovered ? 0.8 : 1
                  },
                  transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 25
                  },
                  style: {
                    transformStyle: "preserve-3d",
                    zIndex: 20
                  },
                  children: /* @__PURE__ */ jsx("div", { className: "absolute top-1 right-1 left-1 h-px bg-amber-200/50 dark:bg-amber-300/50" })
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-neutral-700 dark:text-neutral-200", children: text })
      ]
    }
  );
}

// entry.jsx
import React2 from "react";

// registry:components/images-badge-demo.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
function ImagesBadgeDemo() {
  return /* @__PURE__ */ jsx2("div", { className: "flex h-[10rem] w-full items-center justify-center", children: /* @__PURE__ */ jsx2(
    ImagesBadge,
    {
      text: "Introducing Agenforce Marketing Template",
      images: [
        "https://assets.aceternity.com/pro/agenforce-1.webp",
        "https://assets.aceternity.com/pro/agenforce-2.webp",
        "https://assets.aceternity.com/pro/agenforce-3.webp"
      ]
    }
  ) });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(ImagesBadgeDemo, {}) }) });
}
export {
  ImagesBadge,
  Component as default
};

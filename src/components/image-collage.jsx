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
// Adapted from https://www.vengenceui.com/components/image-collage
// Copyright (c) 2025-2026 Ashutoshx7. See licenses/vengeance.txt for usage terms.
// registry:components/ui/image-collage.tsx
import React, { useState } from "react";
import { motion } from "motion/react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/image-collage.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var ImageCollage = React.forwardRef(
  ({ images, className, containerClassName, imageClassName, ...props }, ref) => {
    const [isOrganized, setIsOrganized] = useState(false);
    const toggleLayout = () => {
      setIsOrganized((prev) => !prev);
    };
    return /* @__PURE__ */ jsxs(
      "div",
      {
        ref,
        className: cn(
          "flex flex-col items-center justify-center gap-12 select-none w-full min-h-[400px] cursor-pointer",
          className
        ),
        onClick: toggleLayout,
        ...props,
        children: [
          /* @__PURE__ */ jsx("div", { className: "text-zinc-800 dark:text-zinc-200 text-xl font-medium tracking-tight", children: "Click anywhere to toggle the layout" }),
          /* @__PURE__ */ jsx(motion.div, { className: cn("h-40 flex items-center justify-center", containerClassName), children: images.map((img, i) => /* @__PURE__ */ jsx(
            motion.div,
            {
              className: cn(
                "w-24 sm:w-32 shrink-0 aspect-[4/5]",
                !isOrganized && "shadow-lg",
                imageClassName
              ),
              initial: { opacity: 0, scale: 0.7 },
              transition: { type: "spring", bounce: 0.6 },
              animate: {
                opacity: 1,
                scale: 1,
                x: isOrganized ? 0 : img.x,
                y: isOrganized ? 0 : img.y,
                rotate: isOrganized ? 0 : img.rotate,
                zIndex: isOrganized ? 1 : i
              },
              children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: img.src,
                  alt: img.alt || `Collage image ${i}`,
                  className: "w-full h-full object-cover"
                }
              )
            },
            i
          )) })
        ]
      }
    );
  }
);
ImageCollage.displayName = "ImageCollage";

// entry.jsx
import React2 from "react";

// registry:components/docs/image-collage-demo.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var IMAGES = [
  { src: "https://i.imgur.com/204kqgz.jpeg", x: 10, y: -15, rotate: 15 },
  { src: "https://i.imgur.com/nBksCod.jpeg", x: 0, y: 10, rotate: -20 },
  { src: "https://i.imgur.com/JDLYJFm.jpeg", x: -10, y: -30, rotate: 10 },
  { src: "https://i.imgur.com/7c4BovS.jpeg", x: 10, y: -10, rotate: -15 },
  { src: "https://i.imgur.com/38W5F3l.jpeg", x: 5, y: 10, rotate: 5 },
  { src: "https://i.imgur.com/ndwsoNf.jpeg", x: 10, y: -20, rotate: -10 },
  { src: "https://i.imgur.com/HRiPI1C.jpeg", x: 20, y: 40, rotate: 10 },
  { src: "https://i.imgur.com/Aznco02.jpeg", x: 0, y: -20, rotate: -20 }
];
function ImageCollageDemo() {
  return /* @__PURE__ */ jsx2("div", { className: "w-full flex items-center justify-center overflow-hidden py-10", children: /* @__PURE__ */ jsx2(ImageCollage, { images: IMAGES }) });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(ImageCollageDemo, {}) }) });
}
export {
  ImageCollage,
  Component as default
};

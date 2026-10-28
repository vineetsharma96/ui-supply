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
// Adapted from https://www.vengenceui.com/components/folder-preview
// Copyright (c) 2025-2026 Ashutoshx7. See licenses/vengeance.txt for usage terms.
// registry:components/ui/folder-preview.tsx
import * as React from "react";
import { motion } from "motion/react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/folder-preview.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var FolderBackIcon = ({ className }) => /* @__PURE__ */ jsx("svg", { viewBox: "0 0 20 16", className: cn("w-full h-full fill-current", className), children: /* @__PURE__ */ jsx("path", { d: "M7.5,0C7.4,0,2,0,2,0C0.9,0,0,0.9,0,2l0,12c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V4c0-1.1-0.9-2-2-2c0,0-7.5,0-8,0C9,2,9.9,0,7.5,0z" }) });
var FolderCoverIcon = ({ className }) => /* @__PURE__ */ jsx("svg", { viewBox: "0 0 20 16", className: cn("w-full h-full fill-current", className), children: /* @__PURE__ */ jsx("path", { d: "M2,2h16c1.1,0,2,0.9,2,2v10c0,1.1-0.9,2-2,2H2c-1.1,0-2-0.9-2-2V4C0,2.9,0.9,2,2,2z" }) });
var UsersIcon = ({ className }) => /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 24 24", className: cn("w-full h-full fill-current", className), children: [
  /* @__PURE__ */ jsx(
    "path",
    {
      opacity: "0.3",
      d: "M22.2,17.7l-4-2c-0.5-0.3-0.8-0.8-0.8-1.3v-1.6c0.1-0.1,0.2-0.3,0.4-0.5c0.5-0.8,0.9-1.6,1.2-2.5c0.5-0.2,0.9-0.6,0.9-1.2V7c0-0.4-0.2-0.7-0.4-0.9V3.7c0,0,0.5-3.7-4.6-3.7c-5,0-4.6,3.7-4.6,3.7v2.4C10.1,6.3,9.9,6.7,9.9,7v1.7c0,0.4,0.2,0.8,0.6,1c0.4,1.8,1.5,3.1,1.5,3.1v1.5c0,0.6-0.3,1.1-0.8,1.3l-3.7,2c-1.1,0.6-1.7,1.7-1.7,2.9v1.3H24v-1.3C24,19.4,23.3,18.3,22.2,17.7z"
    }
  ),
  /* @__PURE__ */ jsx(
    "path",
    {
      opacity: "0.5",
      d: "M7.5,17.7l2.5-1.3c0,0,0,0,0,0l1.2-0.7c0.5-0.3,0.8-0.8,0.8-1.3v-1.5c0,0-0.4-0.5-0.9-1.4l0,0c0,0,0,0,0,0c-0.1-0.1-0.1-0.2-0.2-0.3c0,0,0,0,0-0.1c-0.1-0.1-0.1-0.3-0.2-0.4c0,0,0,0,0,0c0-0.1-0.1-0.2-0.1-0.4c0,0,0-0.1,0-0.1c0-0.1-0.1-0.3-0.1-0.4c-0.3-0.2-0.6-0.6-0.6-1V7c0-0.4,0.2-0.7,0.4-0.9V3.8C9.8,3.3,8.9,2.9,7.4,2.9c-4,0-4.1,3.3-4.1,3.3v2.1C3.1,8.5,2.9,8.8,2.9,9.1v1.4c0,0.4,0.2,0.7,0.5,0.9c0.4,1.6,1.6,2.7,1.6,2.7v1.3c0,0.5-0.3,0.9-0.7,1.1l-2.8,1.7C0.6,18.8,0,19.7,0,20.8v1.2h5.8v-1.3C5.8,19.4,6.5,18.3,7.5,17.7z"
    }
  )
] });
var GlobeIcon = ({ className }) => /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 24 24", className: cn("w-full h-full fill-current", className), children: [
  /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "10", opacity: "0.3" }),
  /* @__PURE__ */ jsx("path", { d: "M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M12,20c-4.4,0-8-3.6-8-8s3.6-8,8-8s8,3.6,8,8S16.4,20,12,20z" })
] });
var PadlockIcon = ({ className }) => /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 33.6", className: cn("w-full h-full fill-current", className), children: /* @__PURE__ */ jsx("path", { d: "M23,13.5h-1.7V9.4C21.4,4.2,17.2,0,12,0C6.8,0,2.6,4.2,2.6,9.4v4.1H1c-0.5,0-1,0.4-1,1v18.2c0,0.5,0.4,1,1,1H23c0.5,0,1-0.4,1-1V14.4C24,13.9,23.6,13.5,23,13.5z M13.5,24.5v3.9c0,0.3-0.3,0.6-0.6,0.6h-1.8c-0.3,0-0.6-0.3-0.6-0.6v-3.9c-0.7-0.5-1.1-1.3-1.1-2.1c0-1.4,1.2-2.6,2.6-2.6c1.4,0,2.6,1.2,2.6,2.6C14.6,23.3,14.2,24.1,13.5,24.5z M16.9,13.5H7.1V9.4c0-2.7,2.2-4.9,4.9-4.9c2.7,0,4.9,2.2,4.9,4.9V13.5z" }) });
var CloudIcon = ({ className }) => /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 22.2", className: cn("w-full h-full fill-current", className), children: /* @__PURE__ */ jsx("path", { d: "M19.5,5.8c-0.3-1.5-1-2.9-2.2-4c-1.3-1.2-3-1.8-4.7-1.8C11.3,0,10,0.4,8.9,1.1C8,1.7,7.2,2.5,6.6,3.5c-0.2,0-0.5-0.1-0.7-0.1c-2.1,0-3.8,1.7-3.8,3.8c0,0.3,0,0.5,0.1,0.8C0.8,9,0,10.6,0,12.3C0,13.6,0.5,15,1.4,16c1,1.1,2.2,1.7,3.6,1.8c0,0,0,0,0,0h4.2c0.4,0,0.7-0.3,0.7-0.7s-0.3-0.7-0.7-0.7H5c-2-0.1-3.7-2-3.7-4.2c0-1.4,0.8-2.7,2-3.4c0.3-0.2,0.4-0.5,0.3-0.8C3.5,7.8,3.4,7.5,3.4,7.2c0-1.4,1.1-2.5,2.5-2.5c0.3,0,0.6,0,0.8,0.1c0.3,0.1,0.7,0,0.8-0.3c0.9-2,2.9-3.2,5.1-3.2c2.9,0,5.3,2.2,5.6,5.1c0,0.3,0.3,0.5,0.6,0.6c2.2,0.4,3.9,2.4,3.9,4.7c0,2.5-1.9,4.6-4.3,4.8h-3.6c-0.4,0-0.7,0.3-0.7,0.7s0.3,0.7,0.7,0.7h3.7c0,0,0,0,0,0c1.5-0.1,2.9-0.8,4-2c1-1.1,1.6-2.6,1.6-4.1C24,8.9,22.1,6.5,19.5,5.8z M16,12.9c0.3-0.3,0.3-0.7,0-0.9l-3.5-3.5c-0.1-0.1-0.3-0.2-0.5-0.2c-0.2,0-0.3,0.1-0.5,0.2L8,12c-0.3,0.3-0.3,0.7,0,0.9c0.1,0.1,0.3,0.2,0.5,0.2c0.2,0,0.3-0.1,0.5-0.2l2.4-2.4v11c0,0.4,0.3,0.7,0.7,0.7s0.7-0.3,0.7-0.7v-11l2.4,2.4C15.3,13.2,15.7,13.2,16,12.9z" }) });
var FileIcon = ({ className }) => /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 20 26.8", className: cn("w-full h-full fill-current", className), children: [
  /* @__PURE__ */ jsx("path", { d: "M2.3,0C1,0,0,1,0,2.3v22.2c0,1.2,1,2.3,2.3,2.3h15.4c1.2,0,2.3-1,2.3-2.3V6l-6-6H2.3z" }),
  /* @__PURE__ */ jsx("path", { opacity: "0.1", d: "M13.9,3.7V0l6,6h-3.7C14.9,6,13.9,5,13.9,3.7z" })
] });
var variantColors = {
  devi: {
    back: "text-gray-500",
    cover: "text-gray-400",
    deco: "text-gray-400 brightness-125",
    caption: "text-gray-800 dark:text-gray-200",
    bg: "bg-gray-100 dark:bg-gray-900"
  },
  rudras: {
    back: "text-gray-700 dark:text-gray-600",
    cover: "text-gray-600 dark:text-gray-500",
    deco: "text-gray-400",
    caption: "text-blue-600 dark:text-blue-400",
    bg: "bg-slate-200 dark:bg-slate-800"
  },
  ardra: {
    back: "text-blue-800 dark:text-blue-700",
    cover: "text-blue-600 dark:text-blue-500",
    deco: "text-blue-700 dark:text-blue-600",
    caption: "text-blue-500 dark:text-blue-400",
    bg: "bg-gray-800 dark:bg-gray-950"
  },
  shakti: {
    back: "text-indigo-800",
    cover: "text-indigo-700",
    deco: "text-indigo-800",
    caption: "text-green-400",
    bg: "bg-blue-600 dark:bg-blue-800"
  },
  kubera: {
    back: "text-gray-900",
    cover: "text-gray-700",
    deco: "text-gray-600",
    caption: "text-gray-900 dark:text-gray-100",
    bg: "bg-emerald-400 dark:bg-emerald-600"
  },
  hari: {
    back: "text-blue-800",
    cover: "text-blue-700",
    deco: "text-blue-800",
    caption: "text-yellow-400",
    bg: "bg-sky-500 dark:bg-sky-700"
  },
  ravi: {
    back: "text-gray-900",
    cover: "text-gray-700",
    deco: "text-black dark:text-white",
    caption: "text-gray-900 dark:text-gray-100",
    bg: "bg-gray-200 dark:bg-gray-800"
  },
  durga: {
    back: "text-green-600",
    cover: "text-green-500",
    deco: "text-green-600",
    caption: "text-green-400 font-mono",
    bg: "bg-gray-900 dark:bg-black"
  },
  nandi: {
    back: "text-amber-500",
    cover: "text-amber-400",
    deco: "text-amber-500",
    caption: "text-gray-900 dark:text-gray-100",
    bg: "bg-green-100 dark:bg-green-950"
  }
};
var sizeConfig = {
  sm: {
    folder: "w-16",
    thumb: "w-10 h-10",
    deco: "w-4 h-4",
    caption: "text-xs"
  },
  md: {
    folder: "w-24",
    thumb: "w-14 h-14",
    deco: "w-6 h-6",
    caption: "text-sm"
  },
  lg: {
    folder: "w-32",
    thumb: "w-20 h-20",
    deco: "w-8 h-8",
    caption: "text-base"
  }
};
var createCircularPositions = (count, radius = 120) => {
  return Array.from({ length: count }, (_, i) => {
    const startAngle = Math.PI / count;
    const angle = startAngle / 2 + startAngle * i;
    return {
      x: Math.round(radius * Math.cos(angle)),
      y: Math.round(-radius * Math.sin(angle))
    };
  });
};
var DeviFolder = ({ images, isHovered, colors, sizes, label }) => {
  const positions = createCircularPositions(images.length, 80);
  return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center pointer-events-none z-10", children: images.map((img, i) => /* @__PURE__ */ jsx(
      motion.img,
      {
        src: img,
        alt: "",
        className: "absolute w-12 h-12 object-cover rounded-full border-2 border-white shadow-md",
        initial: { opacity: 0, scale: 0.7, x: 0, y: 0 },
        animate: isHovered ? {
          opacity: 1,
          scale: 1,
          x: positions[i]?.x || 0,
          y: positions[i]?.y || 0
        } : { opacity: 0, scale: 0.7, x: 0, y: 0 },
        transition: {
          duration: 0.6,
          delay: (images.length - i - 1) * 0.04,
          ease: [0.2, 1, 0.3, 1]
        }
      },
      i
    )) }),
    /* @__PURE__ */ jsxs("div", { className: "relative cursor-pointer aspect-[20/16]", style: { perspective: "800px" }, children: [
      /* @__PURE__ */ jsx("div", { className: cn("absolute inset-0 transition-colors duration-150", colors.back), children: /* @__PURE__ */ jsx(FolderBackIcon, {}) }),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          className: cn(
            "relative transition-colors duration-150",
            isHovered ? "text-gray-600" : colors.cover
          ),
          children: [
            /* @__PURE__ */ jsx(FolderCoverIcon, {}),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: cn(
                  "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                  sizes.deco,
                  colors.deco
                ),
                children: /* @__PURE__ */ jsx(UsersIcon, {})
              }
            )
          ]
        }
      )
    ] }),
    label && /* @__PURE__ */ jsx("h3", { className: cn("mt-3 font-medium text-center", sizes.caption, colors.caption), children: label })
  ] });
};
var RudrasFolder = ({ images, isHovered, colors, sizes, label }) => {
  const positions = createCircularPositions(images.length, 80);
  return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center pointer-events-none z-10", children: images.map((img, i) => /* @__PURE__ */ jsx(
      motion.img,
      {
        src: img,
        alt: "",
        className: "absolute w-12 h-12 object-cover rounded-full border-2 border-white shadow-md",
        initial: { opacity: 0, scale: 0, x: 0, y: 0 },
        animate: isHovered ? {
          opacity: 1,
          scale: 1,
          x: -positions[i]?.x || 0,
          y: positions[i]?.y || 0
        } : { opacity: 0, scale: 0, x: 0, y: 0 },
        transition: {
          duration: 0.8,
          delay: (images.length - i - 1) * 0.08,
          type: "spring",
          stiffness: 200,
          damping: 15
        }
      },
      i
    )) }),
    /* @__PURE__ */ jsxs("div", { className: "relative cursor-pointer aspect-[20/16]", style: { perspective: "800px" }, children: [
      /* @__PURE__ */ jsx("div", { className: cn("absolute inset-0", colors.back), children: /* @__PURE__ */ jsx(FolderBackIcon, {}) }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-0.5 left-0.5 right-0.5 h-3/4 bg-white dark:bg-gray-200 rounded-lg" }),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          className: cn("relative", colors.cover),
          style: { transformOrigin: "50% 100%", transformStyle: "preserve-3d" },
          animate: isHovered ? { rotateX: -30 } : { rotateX: 0 },
          transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
          children: [
            /* @__PURE__ */ jsx(FolderCoverIcon, {}),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: cn(
                  "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                  sizes.deco,
                  colors.deco
                ),
                children: /* @__PURE__ */ jsx(UsersIcon, {})
              }
            )
          ]
        }
      )
    ] }),
    label && /* @__PURE__ */ jsx("h3", { className: cn("mt-3 font-medium text-center", sizes.caption, colors.caption), children: label })
  ] });
};
var ArdraFolder = ({ images, isHovered, colors, sizes, label }) => {
  const [randomPositions] = React.useState(
    () => images.map((_, i) => {
      const radius = 60 + Math.random() * 20;
      const angle = 2 * (i + 1) * Math.PI / images.length;
      return {
        x: Math.round(radius * Math.cos(angle)),
        y: Math.round(radius * Math.sin(angle)),
        rotate: Math.random() * 6 - 3
      };
    })
  );
  return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsx(
      motion.div,
      {
        className: "absolute inset-0 flex items-center justify-center pointer-events-none",
        initial: { opacity: 0 },
        animate: isHovered ? { opacity: 1 } : { opacity: 0 },
        children: /* @__PURE__ */ jsx(
          motion.div,
          {
            className: "w-10 h-10 rounded-full bg-gray-900/50",
            initial: { scale: 1 },
            animate: isHovered ? { opacity: [1, 0], scale: [1, 6] } : { opacity: 0, scale: 1 },
            transition: { duration: 0.9, ease: [0.1, 1, 0.3, 1] }
          }
        )
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center pointer-events-none z-10", children: images.map((img, i) => /* @__PURE__ */ jsx(
      motion.img,
      {
        src: img,
        alt: "",
        className: "absolute w-10 h-10 object-cover rounded-full border-2 border-white shadow-lg",
        initial: { opacity: 0, scale: 0.4, x: 0, y: 0, rotate: 0 },
        animate: isHovered ? {
          opacity: 1,
          scale: 1,
          x: randomPositions[i]?.x || 0,
          y: randomPositions[i]?.y || 0,
          rotate: randomPositions[i]?.rotate || 0
        } : { opacity: 0, scale: 0.4, x: 0, y: 0, rotate: 0 },
        transition: { duration: 0.5, ease: [0.1, 1, 0.3, 1] }
      },
      i
    )) }),
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        className: "relative cursor-pointer aspect-[20/16]",
        animate: isHovered ? { scale: 0.85 } : { scale: 1 },
        transition: { duration: 0.5, ease: [0.1, 1, 0.3, 1] },
        children: [
          /* @__PURE__ */ jsx("div", { className: cn("absolute inset-0", colors.back), children: /* @__PURE__ */ jsx(FolderBackIcon, {}) }),
          /* @__PURE__ */ jsxs("div", { className: cn("relative", colors.cover), children: [
            /* @__PURE__ */ jsx(FolderCoverIcon, {}),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: cn(
                  "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                  sizes.deco,
                  colors.deco
                ),
                children: /* @__PURE__ */ jsx(GlobeIcon, {})
              }
            )
          ] })
        ]
      }
    ),
    label && /* @__PURE__ */ jsx("h3", { className: cn("mt-3 font-medium text-center", sizes.caption, colors.caption), children: label })
  ] });
};
var ShaktiFolder = ({ images, isHovered, colors, sizes, label }) => {
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      className: "relative",
      animate: isHovered ? { y: 15 } : { y: 0 },
      transition: { duration: 0.4, ease: [0.2, 1, 0.3, 1] },
      children: [
        /* @__PURE__ */ jsxs("div", { className: "relative cursor-pointer", children: [
          /* @__PURE__ */ jsx("div", { className: cn("absolute inset-0", colors.back), children: /* @__PURE__ */ jsx(FolderBackIcon, {}) }),
          /* @__PURE__ */ jsx("div", { className: cn("absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2", sizes.thumb), children: images.map((img, i) => /* @__PURE__ */ jsx(
            motion.img,
            {
              src: img,
              alt: "",
              className: "absolute w-12 h-16 object-cover rounded shadow-lg origin-[-600%_50%]",
              initial: { opacity: 0, rotate: 0 },
              animate: isHovered ? { opacity: 1, rotate: -10 * (images.length - i - 1) - 15 } : { opacity: 0, rotate: 0 },
              transition: {
                duration: 0.5,
                delay: i * 0.08,
                ease: [0.1, 1, 0.3, 1]
              }
            },
            i
          )) }),
          /* @__PURE__ */ jsxs("div", { className: cn("relative", colors.cover), children: [
            /* @__PURE__ */ jsx(FolderCoverIcon, {}),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: cn(
                  "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-1",
                  sizes.deco,
                  colors.deco
                ),
                children: /* @__PURE__ */ jsx(PadlockIcon, {})
              }
            )
          ] })
        ] }),
        label && /* @__PURE__ */ jsx("h3", { className: cn("mt-3 font-medium text-center", sizes.caption, colors.caption), children: label })
      ]
    }
  );
};
var KuberaFolder = ({ images, isHovered, colors, sizes, label }) => {
  const floatingMotions = React.useMemo(
    () => images.map((_, i) => ({
      y: -200 - i * 17 % 50,
      x: i * 29 % 50 - 25,
      rotate: i * 19 % 40 - 20
    })),
    [images]
  );
  return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative cursor-pointer", style: { perspective: "800px" }, children: [
      /* @__PURE__ */ jsx("div", { className: cn("absolute inset-0", colors.back), children: /* @__PURE__ */ jsx(FolderBackIcon, {}) }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-0.5 left-0.5 right-0.5 h-3/4 bg-white dark:bg-gray-200 rounded-lg" }),
      /* @__PURE__ */ jsx("div", { className: cn("absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2", sizes.thumb), children: images.map((img, i) => /* @__PURE__ */ jsx(
        motion.img,
        {
          src: img,
          alt: "",
          className: "absolute w-full h-full object-cover rounded-lg shadow-lg",
          initial: { opacity: 0 },
          animate: isHovered ? {
            opacity: [1, 0],
            y: [0, floatingMotions[i]?.y ?? -200],
            x: floatingMotions[i]?.x ?? 0,
            rotate: floatingMotions[i]?.rotate ?? 0
          } : { opacity: 0 },
          transition: {
            duration: 0.4,
            delay: i * 0.3,
            repeat: isHovered ? Infinity : 0,
            ease: "linear"
          }
        },
        i
      )) }),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          className: cn("relative", colors.cover),
          style: { transformOrigin: "50% 100%", transformStyle: "preserve-3d" },
          animate: isHovered ? { rotateX: -40 } : { rotateX: 0 },
          transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
          children: [
            /* @__PURE__ */ jsx(FolderCoverIcon, {}),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: cn(
                  "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-1",
                  sizes.deco,
                  colors.deco
                ),
                children: /* @__PURE__ */ jsx(CloudIcon, {})
              }
            )
          ]
        }
      )
    ] }),
    label && /* @__PURE__ */ jsx("h3", { className: cn("mt-3 font-medium text-center", sizes.caption, colors.caption), children: label })
  ] });
};
var HariFolder = ({ images, isHovered, colors, sizes, label }) => {
  const positions = createCircularPositions(images.length, 120);
  return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsx(
      motion.div,
      {
        className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-sky-500",
        initial: { opacity: 0, scale: 1 },
        animate: isHovered ? { opacity: [1, 0], scale: [1, 15] } : { opacity: 0, scale: 1 },
        transition: { duration: 1.1, delay: 0.2, ease: [0.1, 1, 0.3, 1] }
      }
    ),
    /* @__PURE__ */ jsx("div", { className: cn("absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2", sizes.thumb), children: images.map((img, i) => /* @__PURE__ */ jsx(
      motion.img,
      {
        src: img,
        alt: "",
        className: "absolute w-12 h-16 object-cover rounded shadow-lg",
        initial: { opacity: 0, scale: 0.5, x: 0, y: 0 },
        animate: isHovered ? {
          opacity: 1,
          scale: 1,
          x: -positions[i]?.x || 0,
          y: -positions[i]?.y || 0
        } : { opacity: 0, scale: 0.5, x: 0, y: 0 },
        transition: {
          duration: 0.8,
          delay: 0.2,
          type: "spring",
          stiffness: 200,
          damping: 15
        }
      },
      i
    )) }),
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        className: "relative cursor-pointer",
        style: { perspective: "800px", transformOrigin: "50% 100%" },
        animate: isHovered ? { y: -20, scaleX: 0.9, scaleY: 0.9 } : { y: 0, scaleX: 1, scaleY: 1 },
        transition: {
          duration: 0.8,
          type: "spring",
          stiffness: 200,
          damping: 15
        },
        children: [
          /* @__PURE__ */ jsx("div", { className: cn("absolute inset-0", colors.back), children: /* @__PURE__ */ jsx(FolderBackIcon, {}) }),
          /* @__PURE__ */ jsx("div", { className: "absolute bottom-0.5 left-0.5 right-0.5 h-3/4 bg-white/80 rounded-lg" }),
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              className: cn("relative", colors.cover),
              style: { transformOrigin: "50% 100%", transformStyle: "preserve-3d" },
              animate: isHovered ? { rotateX: -25 } : { rotateX: 0 },
              transition: { duration: 0.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] },
              children: [
                /* @__PURE__ */ jsx(FolderCoverIcon, {}),
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: cn(
                      "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-1",
                      sizes.deco,
                      colors.deco
                    ),
                    children: /* @__PURE__ */ jsx(GlobeIcon, {})
                  }
                )
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      motion.h3,
      {
        className: cn("mt-3 font-medium text-center", sizes.caption, colors.caption),
        animate: isHovered ? { opacity: 0 } : { opacity: 1 },
        transition: { delay: isHovered ? 0.3 : 0 },
        children: label
      }
    )
  ] });
};
var RaviFolder = ({ images, isHovered, colors, sizes, label }) => {
  const reorder = (arr) => {
    const result = [];
    let i = Math.ceil(arr.length / 2);
    let j = i - 1;
    while (j >= 0) {
      result.push(arr[j--]);
      if (i < arr.length) result.push(arr[i++]);
    }
    return result;
  };
  const orderedImages = React.useMemo(() => reorder(images), [images]);
  return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsx(
      motion.div,
      {
        className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white",
        initial: { opacity: 0, scale: 1 },
        animate: !isHovered ? { opacity: [1, 0], scale: [1, 5] } : { opacity: 0, scale: 1 },
        transition: { duration: 0.8, delay: 0.35, ease: [0.1, 1, 0.3, 1] }
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "relative cursor-pointer", style: { perspective: "800px" }, children: [
      /* @__PURE__ */ jsx("div", { className: cn("absolute inset-0", colors.back), children: /* @__PURE__ */ jsx(FolderBackIcon, {}) }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-0.5 left-0.5 right-0.5 h-3/4 bg-white rounded-lg" }),
      /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75px] h-[65px]", children: orderedImages.map((img, i) => {
        const interval = 60;
        const c = orderedImages.length;
        const x = -interval * Math.floor(c / 2) + interval * i + (c % 2 === 0 ? interval / 2 : 0);
        const rotateInterval = 20;
        const rotate = -rotateInterval * Math.floor(c / 2) + rotateInterval * i + (c % 2 === 0 ? rotateInterval / 2 : 0);
        return /* @__PURE__ */ jsx(
          motion.img,
          {
            src: img,
            alt: "",
            className: "absolute w-full h-full object-cover rounded shadow-lg",
            initial: { opacity: 0, x: 0, y: 0, rotate: 0, scale: 1 },
            animate: isHovered ? { opacity: 1, y: -70, x, rotate } : { opacity: 0, x: 0, y: 0, rotate: 0, scale: 0.5 },
            transition: {
              duration: isHovered ? 0.4 : 0.3,
              ease: isHovered ? [0.1, 1, 0.3, 1] : "easeInOut"
            }
          },
          i
        );
      }) }),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          className: cn("relative", colors.cover),
          style: { transformOrigin: "50% 100%", transformStyle: "preserve-3d" },
          animate: isHovered ? { rotateX: -30 } : { rotateX: 0 },
          transition: {
            duration: 0.4,
            delay: isHovered ? 0 : 0.3,
            ease: [0.16, 1, 0.3, 1]
          },
          children: [
            /* @__PURE__ */ jsx(FolderCoverIcon, {}),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: cn(
                  "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-1",
                  sizes.deco,
                  colors.deco
                ),
                children: /* @__PURE__ */ jsx(PadlockIcon, {})
              }
            )
          ]
        }
      )
    ] }),
    label && /* @__PURE__ */ jsx("h3", { className: cn("mt-3 font-medium text-center", sizes.caption, colors.caption), children: label })
  ] });
};
var DurgaFolder = ({ files, isHovered, colors, sizes, label }) => {
  return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsx(
      motion.div,
      {
        className: "absolute -right-2 top-0 bg-gray-800 dark:bg-gray-900 rounded-lg px-3 py-2 shadow-lg z-20 min-w-[100px]",
        initial: { opacity: 0, x: -10, scale: 0.9 },
        animate: isHovered ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: -10, scale: 0.9 },
        transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
        style: { transform: "translateX(100%)" },
        children: files.slice(0, 6).map((file, i) => /* @__PURE__ */ jsx(
          motion.div,
          {
            className: "text-gray-100 font-mono text-xs py-0.5 whitespace-nowrap",
            initial: { opacity: 0 },
            animate: { opacity: isHovered ? 1 : 0 },
            transition: { duration: 0.05, delay: i * 0.03 },
            children: file.name
          },
          i
        ))
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "relative cursor-pointer aspect-[20/16]", style: { perspective: "800px" }, children: [
      /* @__PURE__ */ jsx("div", { className: cn("absolute inset-0", colors.back), children: /* @__PURE__ */ jsx(FolderBackIcon, {}) }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-0.5 left-0.5 right-0.5 h-3/4 bg-white dark:bg-gray-200 rounded-lg" }),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          className: cn("relative", colors.cover),
          style: { transformOrigin: "50% 100%", transformStyle: "preserve-3d" },
          animate: isHovered ? { rotateX: -30 } : { rotateX: 0 },
          transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
          children: [
            /* @__PURE__ */ jsx(FolderCoverIcon, {}),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: cn(
                  "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                  sizes.deco,
                  colors.deco
                ),
                children: /* @__PURE__ */ jsx(GlobeIcon, {})
              }
            )
          ]
        }
      )
    ] }),
    label && /* @__PURE__ */ jsx("h3", { className: cn("mt-3 font-medium text-center", sizes.caption, colors.caption), children: label })
  ] });
};
var NandiFolder = ({ files, isHovered, colors, sizes, label }) => {
  const fileColorMap = {
    txt: "fill-blue-300",
    gif: "fill-teal-400",
    mp3: "fill-amber-400",
    default: "fill-gray-400"
  };
  return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsx(
      motion.div,
      {
        className: "absolute left-1/2 -translate-x-1/2 bg-white dark:bg-gray-100 rounded-2xl shadow-xl z-20 p-3 grid grid-cols-3 gap-2",
        style: { bottom: "100%", marginBottom: "8px", minWidth: "120px" },
        initial: { opacity: 0, scale: 0.8, y: 10 },
        animate: isHovered ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 10 },
        transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
        children: files.slice(0, 6).map((file, i) => /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsx(
            FileIcon,
            {
              className: cn("w-5 h-5 mx-auto", fileColorMap[file.type || "default"])
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "text-[8px] text-gray-600 block mt-0.5 truncate max-w-[35px]", children: file.name })
        ] }, i))
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "relative cursor-pointer aspect-[20/16]", style: { perspective: "800px" }, children: [
      /* @__PURE__ */ jsx("div", { className: cn("absolute inset-0", colors.back), children: /* @__PURE__ */ jsx(FolderBackIcon, {}) }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-0.5 left-0.5 right-0.5 h-3/4 bg-white dark:bg-gray-200 rounded-lg" }),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          className: cn("relative", colors.cover),
          style: { transformOrigin: "50% 100%", transformStyle: "preserve-3d" },
          animate: isHovered ? { rotateX: -30 } : { rotateX: 0 },
          transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
          children: [
            /* @__PURE__ */ jsx(FolderCoverIcon, {}),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: cn(
                  "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                  sizes.deco,
                  colors.deco
                ),
                children: /* @__PURE__ */ jsx(CloudIcon, {})
              }
            )
          ]
        }
      )
    ] }),
    label && /* @__PURE__ */ jsx("h3", { className: cn("mt-3 font-medium text-center", sizes.caption, colors.caption), children: label })
  ] });
};
var FolderPreview = React.forwardRef(
  ({
    variant = "devi",
    images = [],
    files = [],
    label,
    size = "md",
    className,
    onClick
  }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const colors = variantColors[variant];
    const sizes = sizeConfig[size];
    const defaultImages = [
      "https://www.vengenceui.com/folder-preview/user1.svg",
      "https://www.vengenceui.com/folder-preview/user2.svg",
      "https://www.vengenceui.com/folder-preview/user3.svg",
      "https://www.vengenceui.com/folder-preview/user4.svg",
      "https://www.vengenceui.com/folder-preview/user5.svg"
    ];
    const defaultFiles = [
      { name: "docs", type: "default" },
      { name: "template", type: "default" },
      { name: "readme.md", type: "txt" },
      { name: "app.js", type: "txt" },
      { name: "test.sh", type: "txt" },
      { name: "package.json", type: "txt" },
      { name: "logo.svg", type: "default" },
      { name: "...", type: "default" }
    ];
    const imageList = images.length > 0 ? images : defaultImages;
    const fileList = files.length > 0 ? files : defaultFiles;
    const renderFolder = () => {
      const props = { isHovered, colors, sizes, label };
      switch (variant) {
        case "devi":
          return /* @__PURE__ */ jsx(DeviFolder, { images: imageList, ...props });
        case "rudras":
          return /* @__PURE__ */ jsx(RudrasFolder, { images: imageList, ...props });
        case "ardra":
          return /* @__PURE__ */ jsx(ArdraFolder, { images: imageList, ...props });
        case "shakti":
          return /* @__PURE__ */ jsx(ShaktiFolder, { images: imageList, ...props });
        case "kubera":
          return /* @__PURE__ */ jsx(KuberaFolder, { images: imageList, ...props });
        case "hari":
          return /* @__PURE__ */ jsx(HariFolder, { images: imageList, ...props });
        case "ravi":
          return /* @__PURE__ */ jsx(RaviFolder, { images: imageList, ...props });
        case "durga":
          return /* @__PURE__ */ jsx(DurgaFolder, { files: fileList, ...props });
        case "nandi":
          return /* @__PURE__ */ jsx(NandiFolder, { files: fileList, ...props });
        default:
          return /* @__PURE__ */ jsx(DeviFolder, { images: imageList, ...props });
      }
    };
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: cn("inline-flex flex-col items-center overflow-visible", sizes.folder, className),
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
        onClick,
        children: renderFolder()
      }
    );
  }
);
FolderPreview.displayName = "FolderPreview";

// entry.jsx
import React2 from "react";

// registry:components/docs/folder-preview.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var variants = [
  { variant: "devi", label: "Devi" },
  { variant: "rudras", label: "Rudras" },
  { variant: "ardra", label: "Ardra" },
  { variant: "shakti", label: "Shakti" },
  { variant: "kubera", label: "Kubera" },
  { variant: "hari", label: "Hari" },
  { variant: "ravi", label: "Ravi" },
  { variant: "durga", label: "Durga" },
  { variant: "nandi", label: "Nandi" }
];
function FolderPreviewDemo() {
  return /* @__PURE__ */ jsx2("div", { className: "grid grid-cols-3 gap-8 p-8", children: variants.map(({ variant, label }) => /* @__PURE__ */ jsx2(
    "div",
    {
      className: "flex items-center justify-center min-h-[200px] rounded-xl p-8",
      children: /* @__PURE__ */ jsx2(FolderPreview, { variant, label, size: "lg" })
    },
    variant
  )) });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(FolderPreviewDemo, {}) }) });
}
export {
  FolderPreview,
  Component as default
};

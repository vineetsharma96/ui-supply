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
// Adapted from https://www.vengenceui.com/components/masked-avatars
// Copyright (c) 2025-2026 Ashutoshx7. See licenses/vengeance.txt for usage terms.
// registry:components/ui/masked-avatars.tsx
import React, { useState } from "react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/masked-avatars.tsx
import { motion } from "motion/react";
import { jsx, jsxs } from "react/jsx-runtime";
var defaultAvatars = [
  { avatar: "https://i.pravatar.cc/150?u=a", name: "Garou" },
  { avatar: "https://i.pravatar.cc/150?u=b", name: "Johan" },
  { avatar: "https://i.pravatar.cc/150?u=c", name: "Light Yagami" },
  { avatar: "https://i.pravatar.cc/150?u=d", name: "Vegeta" },
  { avatar: "https://i.pravatar.cc/150?u=e", name: "Light Yagami" }
];
function MaskedAvatars({
  avatars = defaultAvatars,
  size = 70,
  border = 8,
  column = 40,
  movement = 0.72,
  transition = 0.18,
  ringed = true,
  offset = -3,
  blurOnRest = true,
  className
}) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const { dynamicSize, maskImage } = React.useMemo(() => {
    const dynamicSize2 = `clamp(${size - 20}px, ${size}px, ${size + 30}px)`;
    const circle = (border * 2 + size) / 2;
    const radX = circle - column - border;
    const maskImage2 = `radial-gradient(${circle}px ${circle}px at ${radX}px 50%, transparent ${circle - 0.5}px, white ${circle}px)`;
    return { dynamicSize: dynamicSize2, maskImage: maskImage2 };
  }, [size, border, column]);
  const transitionConfig = React.useMemo(() => ({
    type: "spring",
    stiffness: 260,
    damping: 20
  }), []);
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn("relative flex items-center", className),
      style: {
        gap: `min(6vw, ${size * 0.5}px)`,
        "--size": dynamicSize
      },
      role: "group",
      "aria-label": "Animated avatar group",
      children: /* @__PURE__ */ jsx("div", { className: "relative flex items-center", children: /* @__PURE__ */ jsx(
        "ul",
        {
          className: "m-0 p-0 list-none grid grid-flow-col content-end",
          style: {
            height: column,
            gridAutoColumns: column,
            transform: `translateX(${(size - column) * 0.5}px)`
          },
          role: "list",
          children: avatars.map((person, index) => {
            const isHovered = hoveredIndex === index;
            const isPrevHovered = hoveredIndex === index - 1;
            const baseOffset = -size * 1.5;
            const moveOffset = size * movement;
            const maskPosition = isPrevHovered ? `0 ${baseOffset - moveOffset}px` : isHovered ? `0 ${baseOffset + moveOffset}px` : `0 ${baseOffset}px`;
            return /* @__PURE__ */ jsxs(
              motion.li,
              {
                className: "relative grid content-end outline-none pointer-events-none will-change-transform",
                role: "listitem",
                style: {
                  width: dynamicSize,
                  aspectRatio: "1/3",
                  transform: `translate(
                    ${(size - column) * -0.5}px,
                    ${(size - column) * 0.5}px
                  )`,
                  zIndex: avatars.length - index
                },
                tabIndex: 0,
                "aria-label": `Avatar of ${person.name}`,
                onMouseEnter: () => setHoveredIndex(index),
                onMouseLeave: () => setHoveredIndex(null),
                onFocus: () => setHoveredIndex(index),
                onBlur: () => setHoveredIndex(null),
                onTouchStart: () => setHoveredIndex(index),
                children: [
                  ringed && /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: "name absolute left-1/2 text-center uppercase font-mono font-normal pointer-events-none",
                      "aria-hidden": "true",
                      style: {
                        width: size,
                        height: size,
                        borderRadius: "50%",
                        bottom: 0,
                        transform: `translate(-50%, ${isHovered ? -movement * 100 : 0}%)`,
                        transition: `transform ${transition}s ease-out`
                      },
                      children: person.name.split("").map((char, i) => /* @__PURE__ */ jsx(
                        "span",
                        {
                          className: "absolute will-change-transform",
                          style: {
                            offsetPath: "border-box",
                            offsetDistance: `${(offset + i) * 0.75}ch`,
                            offsetAnchor: "50% 130%",
                            transform: isHovered ? "translate(0, 0)" : "translate(0, 100%)",
                            filter: isHovered ? "blur(0px)" : blurOnRest ? "blur(4px)" : "blur(0px)",
                            opacity: isHovered ? 1 : 0,
                            transition: `transform ${transition}s ease-out, opacity ${transition}s ease-out, filter ${transition}s ease-out`
                          },
                          children: char
                        },
                        i
                      ))
                    }
                  ),
                  /* @__PURE__ */ jsx("div", { className: "avatar-holder absolute inset-0 grid content-end", children: /* @__PURE__ */ jsx(
                    motion.span,
                    {
                      className: cn(
                        "avatar inline-block w-full aspect-square rounded-full relative overflow-hidden pointer-events-auto border-[3px] border-background will-change-transform",
                        "focus:ring-2 focus:ring-offset-2 focus:ring-foreground"
                      ),
                      role: "img",
                      "aria-label": person.name,
                      style: {
                        maskImage: index === 0 ? "none" : maskImage,
                        WebkitMaskImage: index === 0 ? "none" : maskImage,
                        maskSize: "100% 400%",
                        WebkitMaskSize: "100% 400%",
                        maskRepeat: "no-repeat"
                      },
                      animate: {
                        maskPosition: index === 0 ? "0 0" : maskPosition,
                        y: isHovered ? -movement * 100 + "%" : "0%",
                        scale: isHovered ? 1.05 : 1,
                        opacity: hoveredIndex !== null && hoveredIndex !== index ? 0.7 : 1
                      },
                      transition: transitionConfig,
                      children: /* @__PURE__ */ jsx(
                        "img",
                        {
                          src: person.avatar,
                          alt: person.name,
                          className: "absolute inset-0 w-full h-full object-cover bg-muted"
                        }
                      )
                    }
                  ) }),
                  /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 w-full aspect-square pointer-events-auto" })
                ]
              },
              index
            );
          })
        }
      ) })
    }
  );
}

// entry.jsx
import React2 from "react";

// registry:components/docs/masked-avatars.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
function MaskedAvatarsDemo() {
  const avatars = [
    { avatar: "https://www.vengenceui.com/Avatar11.jpg", name: "Tyler" },
    { avatar: "https://www.vengenceui.com/Avatar6.jpg", name: "Dora" },
    { avatar: "https://www.vengenceui.com/186330c41b3d12d96bdaa03e0c0db30d.jpg", name: "Johan" },
    { avatar: "https://www.vengenceui.com/f318d62afa39731a0a371388d400a773.jpg", name: "Vegeta" },
    { avatar: "https://www.vengenceui.com/Avatar4.svg", name: "Robin" }
  ];
  return /* @__PURE__ */ jsx2("div", { className: "relative flex h-full w-full items-center justify-center overflow-hidden border-neutral-200 dark:border-[#222]", children: /* @__PURE__ */ jsx2(MaskedAvatars, { avatars }) });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(MaskedAvatarsDemo, {}) }) });
}
export {
  MaskedAvatars,
  Component as default
};

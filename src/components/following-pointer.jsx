// Adapted from https://ui.aceternity.com/components/following-pointer
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:components/ui/following-pointer.tsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue } from "motion/react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/following-pointer.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var FollowerPointerCard = ({
  children,
  className,
  title
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const ref = React.useRef(null);
  const [rect, setRect] = useState(null);
  const [isInside, setIsInside] = useState(false);
  useEffect(() => {
    if (ref.current) {
      setRect(ref.current.getBoundingClientRect());
    }
  }, []);
  const handleMouseMove = (e) => {
    if (rect) {
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;
      x.set(e.clientX - rect.left + scrollX);
      y.set(e.clientY - rect.top + scrollY);
    }
  };
  const handleMouseLeave = () => {
    setIsInside(false);
  };
  const handleMouseEnter = () => {
    setIsInside(true);
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      onMouseLeave: handleMouseLeave,
      onMouseEnter: handleMouseEnter,
      onMouseMove: handleMouseMove,
      style: {
        cursor: "none"
      },
      ref,
      className: cn("relative", className),
      children: [
        /* @__PURE__ */ jsx(AnimatePresence, { children: isInside && /* @__PURE__ */ jsx(FollowPointer, { x, y, title }) }),
        children
      ]
    }
  );
};
var FollowPointer = ({
  x,
  y,
  title
}) => {
  const colors = [
    "#0ea5e9",
    "#737373",
    "#14b8a6",
    "#22c55e",
    "#3b82f6",
    "#ef4444",
    "#eab308"
  ];
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      className: "absolute z-50 h-4 w-4 rounded-full",
      style: {
        top: y,
        left: x,
        pointerEvents: "none"
      },
      initial: {
        scale: 1,
        opacity: 1
      },
      animate: {
        scale: 1,
        opacity: 1
      },
      exit: {
        scale: 0,
        opacity: 0
      },
      children: [
        /* @__PURE__ */ jsx(
          "svg",
          {
            stroke: "currentColor",
            fill: "currentColor",
            strokeWidth: "1",
            viewBox: "0 0 16 16",
            className: "h-6 w-6 -translate-x-[12px] -translate-y-[10px] -rotate-[70deg] transform stroke-sky-600 text-sky-500",
            height: "1em",
            width: "1em",
            xmlns: "http://www.w3.org/2000/svg",
            children: /* @__PURE__ */ jsx("path", { d: "M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z" })
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            style: {
              backgroundColor: colors[Math.floor(Math.random() * colors.length)]
            },
            initial: {
              scale: 0.5,
              opacity: 0
            },
            animate: {
              scale: 1,
              opacity: 1
            },
            exit: {
              scale: 0.5,
              opacity: 0
            },
            className: "min-w-max rounded-full bg-neutral-200 px-2 py-2 text-xs whitespace-nowrap text-white",
            children: title || `William Shakespeare`
          }
        )
      ]
    }
  );
};

// entry.jsx
import React2 from "react";

// registry:components/following-pointer-demo.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function FollowingPointerDemo() {
  return /* @__PURE__ */ jsx2("div", { className: "mx-auto w-80", children: /* @__PURE__ */ jsx2(
    FollowerPointerCard,
    {
      title: /* @__PURE__ */ jsx2(
        TitleComponent,
        {
          title: blogContent.author,
          avatar: blogContent.authorAvatar
        }
      ),
      children: /* @__PURE__ */ jsxs2("div", { className: "group relative h-full overflow-hidden rounded-2xl border border-zinc-100 bg-white transition duration-200 hover:shadow-xl", children: [
        /* @__PURE__ */ jsx2("div", { className: "relative aspect-[16/10] w-full overflow-hidden rounded-tl-lg rounded-tr-lg bg-gray-100", children: /* @__PURE__ */ jsx2(
          "img",
          {
            src: blogContent.image,
            alt: "thumbnail",
            className: "h-full transform object-cover transition duration-200 group-hover:scale-95 group-hover:rounded-2xl"
          }
        ) }),
        /* @__PURE__ */ jsxs2("div", { className: "p-4", children: [
          /* @__PURE__ */ jsx2("h2", { className: "my-4 text-lg font-bold text-zinc-700", children: blogContent.title }),
          /* @__PURE__ */ jsx2("h2", { className: "my-4 text-sm font-normal text-zinc-500", children: blogContent.description }),
          /* @__PURE__ */ jsxs2("div", { className: "mt-10 flex flex-row items-center justify-between", children: [
            /* @__PURE__ */ jsx2("span", { className: "text-sm text-gray-500", children: blogContent.date }),
            /* @__PURE__ */ jsx2("div", { className: "relative z-10 block rounded-xl bg-black px-6 py-2 text-xs font-bold text-white", children: "Read More" })
          ] })
        ] })
      ] })
    }
  ) });
}
var blogContent = {
  slug: "amazing-tailwindcss-grid-layouts",
  author: "Manu Arora",
  date: "28th March, 2023",
  title: "Amazing Tailwindcss Grid Layout Examples",
  description: "Grids are cool, but Tailwindcss grids are cooler. In this article, we will learn how to create amazing Grid layouts with Tailwindcs grid and React.",
  image: "https://ui.aceternity.com/demo/thumbnail.png",
  authorAvatar: "https://ui.aceternity.com/manu.png"
};
var TitleComponent = ({
  title,
  avatar
}) => /* @__PURE__ */ jsxs2("div", { className: "flex items-center space-x-2", children: [
  /* @__PURE__ */ jsx2(
    "img",
    {
      src: avatar,
      height: "20",
      width: "20",
      alt: "thumbnail",
      className: "rounded-full border-2 border-white"
    }
  ),
  /* @__PURE__ */ jsx2("p", { children: title })
] });

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(FollowingPointerDemo, {}) }) });
}
export {
  FollowPointer,
  FollowerPointerCard,
  Component as default
};

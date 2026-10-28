// Adapted from https://ui.aceternity.com/components/floating-dock
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/floating-dock.tsx
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform
} from "motion/react";
import { useRef, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName
}) => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(FloatingDockDesktop, { items, className: desktopClassName }),
    /* @__PURE__ */ jsx(FloatingDockMobile, { items, className: mobileClassName })
  ] });
};
var FloatingDockMobile = ({
  items,
  className
}) => {
  const [open, setOpen] = useState(false);
  return /* @__PURE__ */ jsxs("div", { className: cn("relative block md:hidden", className), children: [
    /* @__PURE__ */ jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsx(
      motion.div,
      {
        layoutId: "nav",
        className: "absolute inset-x-0 bottom-full mb-2 flex flex-col gap-2",
        children: items.map((item, idx) => /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 10 },
            animate: {
              opacity: 1,
              y: 0
            },
            exit: {
              opacity: 0,
              y: 10,
              transition: {
                delay: idx * 0.05
              }
            },
            transition: { delay: (items.length - 1 - idx) * 0.05 },
            children: /* @__PURE__ */ jsx(
              "a",
              {
                href: item.href,
                className: "flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 dark:bg-neutral-900",
                children: /* @__PURE__ */ jsx("div", { className: "h-4 w-4", children: item.icon })
              },
              item.title
            )
          },
          item.title
        ))
      }
    ) }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => setOpen(!open),
        className: "flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 dark:bg-neutral-800",
        children: /* @__PURE__ */ jsx(IconLayoutNavbarCollapse, { className: "h-5 w-5 text-neutral-500 dark:text-neutral-400" })
      }
    )
  ] });
};
var FloatingDockDesktop = ({
  items,
  className
}) => {
  let mouseX = useMotionValue(Infinity);
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      onMouseMove: (e) => mouseX.set(e.pageX),
      onMouseLeave: () => mouseX.set(Infinity),
      className: cn(
        "mx-auto hidden h-16 items-end gap-4 rounded-2xl bg-gray-50 px-4 pb-3 md:flex dark:bg-neutral-900",
        className
      ),
      children: items.map((item) => /* @__PURE__ */ jsx(IconContainer, { mouseX, ...item }, item.title))
    }
  );
};
function IconContainer({
  mouseX,
  title,
  icon,
  href
}) {
  let ref = useRef(null);
  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });
  let widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  let heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  let widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
  let heightTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [20, 40, 20]
  );
  let width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12
  });
  let height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12
  });
  let widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12
  });
  let heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12
  });
  const [hovered, setHovered] = useState(false);
  return /* @__PURE__ */ jsx("a", { href, children: /* @__PURE__ */ jsxs(
    motion.div,
    {
      ref,
      style: { width, height },
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      className: "relative flex aspect-square items-center justify-center rounded-full bg-gray-200 dark:bg-neutral-800",
      children: [
        /* @__PURE__ */ jsx(AnimatePresence, { children: hovered && /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 10, x: "-50%" },
            animate: { opacity: 1, y: 0, x: "-50%" },
            exit: { opacity: 0, y: 2, x: "-50%" },
            className: "absolute -top-8 left-1/2 w-fit rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs whitespace-pre text-neutral-700 dark:border-neutral-900 dark:bg-neutral-800 dark:text-white",
            children: title
          }
        ) }),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            style: { width: widthIcon, height: heightIcon },
            className: "flex items-center justify-center",
            children: icon
          }
        )
      ]
    }
  ) });
}

// entry.jsx
import React from "react";

// registry:components/floating-dock-demo.tsx
import {
  IconBrandGithub,
  IconBrandX,
  IconExchange,
  IconHome,
  IconNewSection,
  IconTerminal2
} from "@tabler/icons-react";
import { jsx as jsx2 } from "react/jsx-runtime";
function FloatingDockDemo() {
  const links = [
    {
      title: "Home",
      icon: /* @__PURE__ */ jsx2(IconHome, { className: "h-full w-full text-neutral-500 dark:text-neutral-300" }),
      href: "#"
    },
    {
      title: "Products",
      icon: /* @__PURE__ */ jsx2(IconTerminal2, { className: "h-full w-full text-neutral-500 dark:text-neutral-300" }),
      href: "#"
    },
    {
      title: "Components",
      icon: /* @__PURE__ */ jsx2(IconNewSection, { className: "h-full w-full text-neutral-500 dark:text-neutral-300" }),
      href: "#"
    },
    {
      title: "Aceternity UI",
      icon: /* @__PURE__ */ jsx2(
        "img",
        {
          src: "https://assets.aceternity.com/logo-dark.png",
          width: 20,
          height: 20,
          alt: "Aceternity Logo"
        }
      ),
      href: "#"
    },
    {
      title: "Changelog",
      icon: /* @__PURE__ */ jsx2(IconExchange, { className: "h-full w-full text-neutral-500 dark:text-neutral-300" }),
      href: "#"
    },
    {
      title: "Twitter",
      icon: /* @__PURE__ */ jsx2(IconBrandX, { className: "h-full w-full text-neutral-500 dark:text-neutral-300" }),
      href: "#"
    },
    {
      title: "GitHub",
      icon: /* @__PURE__ */ jsx2(IconBrandGithub, { className: "h-full w-full text-neutral-500 dark:text-neutral-300" }),
      href: "#"
    }
  ];
  return /* @__PURE__ */ jsx2("div", { className: "flex items-center justify-center h-[35rem] w-full", children: /* @__PURE__ */ jsx2(
    FloatingDock,
    {
      mobileClassName: "translate-y-20",
      items: links
    }
  ) });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(FloatingDockDemo, {}) }) });
}
export {
  FloatingDock,
  Component as default
};

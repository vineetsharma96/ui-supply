// Adapted from https://ui.aceternity.com/components/floating-navbar
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:components/ui/floating-navbar.tsx
import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent
} from "motion/react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/floating-navbar.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var FloatingNav = ({
  navItems,
  className
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current - scrollYProgress.getPrevious();
      if (scrollYProgress.get() < 0.05) {
        setVisible(false);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });
  return /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: {
        opacity: 1,
        y: -100
      },
      animate: {
        y: visible ? 0 : -100,
        opacity: visible ? 1 : 0
      },
      transition: {
        duration: 0.2
      },
      className: cn(
        "flex max-w-fit fixed top-10 inset-x-0 mx-auto z-[5000] items-center justify-center",
        className
      ),
      children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/80 px-2 py-1.5 shadow-lg shadow-black/10 backdrop-blur-md dark:border-white/10 dark:bg-black/50", children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1", children: navItems.map((navItem, idx) => /* @__PURE__ */ jsxs(
          "a",
          {
            href: navItem.link,
            className: cn(
              "relative flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-white/10 dark:hover:text-white"
            ),
            children: [
              /* @__PURE__ */ jsx("span", { className: "block sm:hidden", children: navItem.icon }),
              /* @__PURE__ */ jsx("span", { className: "hidden sm:block", children: navItem.name })
            ]
          },
          `link-${idx}`
        )) }),
        /* @__PURE__ */ jsx("div", { className: "h-5 w-px bg-neutral-200 dark:bg-white/10" }),
        /* @__PURE__ */ jsx("button", { className: "relative rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-neutral-800 hover:shadow-lg hover:shadow-neutral-900/20 dark:bg-white dark:text-black dark:hover:bg-neutral-100 dark:hover:shadow-white/20", children: /* @__PURE__ */ jsx("span", { children: "Login" }) })
      ] })
    }
  ) });
};

// entry.jsx
import React2 from "react";

// registry:components/floating-navbar-demo.tsx
import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function FloatingNavDemo() {
  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: /* @__PURE__ */ jsx2(IconHome, { className: "h-4 w-4 text-neutral-500 dark:text-white" })
    },
    {
      name: "About",
      link: "#about",
      icon: /* @__PURE__ */ jsx2(IconUser, { className: "h-4 w-4 text-neutral-500 dark:text-white" })
    },
    {
      name: "Contact",
      link: "#contact",
      icon: /* @__PURE__ */ jsx2(IconMessage, { className: "h-4 w-4 text-neutral-500 dark:text-white" })
    }
  ];
  return /* @__PURE__ */ jsxs2("div", { className: "relative w-full translate-z-0", children: [
    /* @__PURE__ */ jsx2(FloatingNav, { navItems }),
    /* @__PURE__ */ jsx2(DummyContent, {})
  ] });
}
var DummyContent = () => {
  return /* @__PURE__ */ jsxs2("div", { className: "relative grid h-[40rem] w-full grid-cols-1 rounded-md border border-neutral-200 bg-white dark:border-white/[0.2] dark:bg-black", children: [
    /* @__PURE__ */ jsx2("p", { className: "mt-40 text-center text-4xl font-bold text-neutral-600 dark:text-white", children: "Scroll back up to reveal Navbar" }),
    /* @__PURE__ */ jsx2("div", { className: "bg-grid-black/[0.1] dark:bg-grid-white/[0.2] absolute inset-0" })
  ] });
};

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(FloatingNavDemo, {}) }) });
}
export {
  FloatingNav,
  Component as default
};

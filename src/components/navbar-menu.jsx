// Adapted from https://ui.aceternity.com/components/navbar-menu
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:components/ui/navbar-menu.tsx
import { motion } from "motion/react";
import { jsx, jsxs } from "react/jsx-runtime";
var transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 1e-3,
  restSpeed: 1e-3
};
var MenuItem = ({
  setActive,
  active,
  item,
  children
}) => {
  return /* @__PURE__ */ jsxs("div", { onMouseEnter: () => setActive(item), className: "relative ", children: [
    /* @__PURE__ */ jsx(
      motion.p,
      {
        transition: { duration: 0.3 },
        className: "cursor-pointer text-black hover:opacity-[0.9] dark:text-white",
        children: item
      }
    ),
    active !== null && /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.85, y: 10 },
        animate: { opacity: 1, scale: 1, y: 0 },
        transition,
        children: active === item && /* @__PURE__ */ jsx("div", { className: "absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4", children: /* @__PURE__ */ jsx(
          motion.div,
          {
            transition,
            layoutId: "active",
            className: "bg-white dark:bg-black backdrop-blur-sm rounded-2xl overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl",
            children: /* @__PURE__ */ jsx(
              motion.div,
              {
                layout: true,
                className: "w-max h-full p-4",
                children
              }
            )
          }
        ) })
      }
    )
  ] });
};
var Menu = ({
  setActive,
  children
}) => {
  return /* @__PURE__ */ jsx(
    "nav",
    {
      onMouseLeave: () => setActive(null),
      className: "relative rounded-full border border-transparent dark:bg-black dark:border-white/[0.2] bg-white shadow-input flex justify-center space-x-4 px-8 py-6 ",
      children
    }
  );
};
var ProductItem = ({
  title,
  description,
  href,
  src
}) => {
  return /* @__PURE__ */ jsxs("a", { href, className: "flex space-x-2", children: [
    /* @__PURE__ */ jsx(
      "img",
      {
        src,
        width: 140,
        height: 70,
        alt: title,
        className: "shrink-0 rounded-md shadow-2xl"
      }
    ),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold mb-1 text-black dark:text-white", children: title }),
      /* @__PURE__ */ jsx("p", { className: "text-neutral-700 text-sm max-w-[10rem] dark:text-neutral-300", children: description })
    ] })
  ] });
};
var HoveredLink = ({ children, ...rest }) => {
  return /* @__PURE__ */ jsx(
    "a",
    {
      ...rest,
      className: "text-neutral-700 dark:text-neutral-200 hover:text-black ",
      children
    }
  );
};

// entry.jsx
import React2 from "react";

// registry:components/navbar-menu-demo.tsx
import { useState } from "react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/navbar-menu-demo.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function NavbarDemo() {
  return /* @__PURE__ */ jsxs2("div", { className: "relative flex min-h-120 w-full translate-z-0 items-center justify-center", children: [
    /* @__PURE__ */ jsx2(Navbar, { className: "top-2" }),
    /* @__PURE__ */ jsx2("p", { className: "text-black dark:text-white", children: "Hover over the navbar to see the menu" })
  ] });
}
function Navbar({ className }) {
  const [active, setActive] = useState(null);
  return /* @__PURE__ */ jsx2(
    "div",
    {
      className: cn("fixed inset-x-0 top-10 z-50 mx-auto max-w-2xl", className),
      children: /* @__PURE__ */ jsxs2(Menu, { setActive, children: [
        /* @__PURE__ */ jsx2(MenuItem, { setActive, active, item: "Services", children: /* @__PURE__ */ jsxs2("div", { className: "flex flex-col space-y-4 text-sm", children: [
          /* @__PURE__ */ jsx2(HoveredLink, { href: "/web-dev", children: "Web Development" }),
          /* @__PURE__ */ jsx2(HoveredLink, { href: "/interface-design", children: "Interface Design" }),
          /* @__PURE__ */ jsx2(HoveredLink, { href: "/seo", children: "Search Engine Optimization" }),
          /* @__PURE__ */ jsx2(HoveredLink, { href: "/branding", children: "Branding" })
        ] }) }),
        /* @__PURE__ */ jsx2(MenuItem, { setActive, active, item: "Products", children: /* @__PURE__ */ jsxs2("div", { className: "grid grid-cols-2 gap-10 p-4 text-sm", children: [
          /* @__PURE__ */ jsx2(
            ProductItem,
            {
              title: "Algochurn",
              href: "https://algochurn.com",
              src: "https://assets.aceternity.com/demos/algochurn.webp",
              description: "Prepare for tech interviews like never before."
            }
          ),
          /* @__PURE__ */ jsx2(
            ProductItem,
            {
              title: "Tailwind Master Kit",
              href: "https://tailwindmasterkit.com",
              src: "https://assets.aceternity.com/demos/tailwindmasterkit.webp",
              description: "Production ready Tailwind css components for your next project"
            }
          ),
          /* @__PURE__ */ jsx2(
            ProductItem,
            {
              title: "Moonbeam",
              href: "https://gomoonbeam.com",
              src: "https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png",
              description: "Never write from scratch again. Go from idea to blog in minutes."
            }
          ),
          /* @__PURE__ */ jsx2(
            ProductItem,
            {
              title: "Rogue",
              href: "https://userogue.com",
              src: "https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png",
              description: "Respond to government RFPs, RFIs and RFQs 10x faster using AI"
            }
          )
        ] }) }),
        /* @__PURE__ */ jsx2(MenuItem, { setActive, active, item: "Pricing", children: /* @__PURE__ */ jsxs2("div", { className: "flex flex-col space-y-4 text-sm", children: [
          /* @__PURE__ */ jsx2(HoveredLink, { href: "/hobby", children: "Hobby" }),
          /* @__PURE__ */ jsx2(HoveredLink, { href: "/individual", children: "Individual" }),
          /* @__PURE__ */ jsx2(HoveredLink, { href: "/team", children: "Team" }),
          /* @__PURE__ */ jsx2(HoveredLink, { href: "/enterprise", children: "Enterprise" })
        ] }) })
      ] })
    }
  );
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(NavbarDemo, {}) }) });
}
export {
  HoveredLink,
  Menu,
  MenuItem,
  ProductItem,
  Component as default
};

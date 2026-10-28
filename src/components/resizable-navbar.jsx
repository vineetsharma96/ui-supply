// Adapted from https://ui.aceternity.com/components/resizable-navbar
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/resizable-navbar.tsx
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent
} from "motion/react";
import React, { useRef, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var Navbar = ({ children, className }) => {
  const ref = useRef(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const [visible, setVisible] = useState(false);
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      ref,
      className: cn("sticky inset-x-0 top-20 z-40 w-full", className),
      children: React.Children.map(
        children,
        (child) => React.isValidElement(child) ? React.cloneElement(
          child,
          { visible }
        ) : child
      )
    }
  );
};
var NavBody = ({ children, className, visible }) => {
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      animate: {
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset" : "none",
        width: visible ? "40%" : "100%",
        y: visible ? 20 : 0
      },
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 50
      },
      style: {
        minWidth: "800px"
      },
      className: cn(
        "relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full bg-transparent px-4 py-2 lg:flex dark:bg-transparent",
        visible && "bg-white/80 dark:bg-neutral-950/80",
        className
      ),
      children
    }
  );
};
var NavItems = ({ items, className, onItemClick }) => {
  const [hovered, setHovered] = useState(null);
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      onMouseLeave: () => setHovered(null),
      className: cn(
        "absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-zinc-600 transition duration-200 hover:text-zinc-800 lg:flex lg:space-x-2",
        className
      ),
      children: items.map((item, idx) => /* @__PURE__ */ jsxs(
        "a",
        {
          onMouseEnter: () => setHovered(idx),
          onClick: onItemClick,
          className: "relative px-4 py-2 text-neutral-600 dark:text-neutral-300",
          href: item.link,
          children: [
            hovered === idx && /* @__PURE__ */ jsx(
              motion.div,
              {
                layoutId: "hovered",
                className: "absolute inset-0 h-full w-full rounded-full bg-gray-100 dark:bg-neutral-800"
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "relative z-20", children: item.name })
          ]
        },
        `link-${idx}`
      ))
    }
  );
};
var MobileNav = ({ children, className, visible }) => {
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      animate: {
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset" : "none",
        width: visible ? "90%" : "100%",
        paddingRight: visible ? "12px" : "0px",
        paddingLeft: visible ? "12px" : "0px",
        borderRadius: visible ? "4px" : "2rem",
        y: visible ? 20 : 0
      },
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 50
      },
      className: cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-transparent px-0 py-2 lg:hidden",
        visible && "bg-white/80 dark:bg-neutral-950/80",
        className
      ),
      children
    }
  );
};
var MobileNavHeader = ({
  children,
  className
}) => {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "flex w-full flex-row items-center justify-between",
        className
      ),
      children
    }
  );
};
var MobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose
}) => {
  return /* @__PURE__ */ jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      className: cn(
        "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-lg bg-white px-4 py-8 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] dark:bg-neutral-950",
        className
      ),
      children
    }
  ) });
};
var MobileNavToggle = ({
  isOpen,
  onClick
}) => {
  return isOpen ? /* @__PURE__ */ jsx(IconX, { className: "text-black dark:text-white", onClick }) : /* @__PURE__ */ jsx(IconMenu2, { className: "text-black dark:text-white", onClick });
};
var NavbarLogo = () => {
  return /* @__PURE__ */ jsxs(
    "a",
    {
      href: "#",
      className: "relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black",
      children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: "https://assets.aceternity.com/logo-dark.png",
            alt: "logo",
            width: 30,
            height: 30
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "font-medium text-black dark:text-white", children: "Startup" })
      ]
    }
  );
};
var NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}) => {
  const baseStyles = "px-4 py-2 rounded-md bg-white button bg-white text-black text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center";
  const variantStyles = {
    primary: "shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    secondary: "bg-transparent shadow-none dark:text-white",
    dark: "bg-black text-white shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    gradient: "bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]"
  };
  return /* @__PURE__ */ jsx(
    Tag,
    {
      href: href || void 0,
      className: cn(baseStyles, variantStyles[variant], className),
      ...props,
      children
    }
  );
};

// entry.jsx
import React2 from "react";

// registry:components/resizable-navbar-demo.tsx
import { useState as useState2 } from "react";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function NavbarDemo() {
  const navItems = [
    {
      name: "Features",
      link: "#features"
    },
    {
      name: "Pricing",
      link: "#pricing"
    },
    {
      name: "Contact",
      link: "#contact"
    }
  ];
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState2(false);
  return /* @__PURE__ */ jsxs2("div", { className: "relative w-full", children: [
    /* @__PURE__ */ jsxs2(Navbar, { children: [
      /* @__PURE__ */ jsxs2(NavBody, { children: [
        /* @__PURE__ */ jsx2(NavbarLogo, {}),
        /* @__PURE__ */ jsx2(NavItems, { items: navItems }),
        /* @__PURE__ */ jsxs2("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsx2(NavbarButton, { variant: "secondary", children: "Login" }),
          /* @__PURE__ */ jsx2(NavbarButton, { variant: "primary", children: "Book a call" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs2(MobileNav, { children: [
        /* @__PURE__ */ jsxs2(MobileNavHeader, { children: [
          /* @__PURE__ */ jsx2(NavbarLogo, {}),
          /* @__PURE__ */ jsx2(
            MobileNavToggle,
            {
              isOpen: isMobileMenuOpen,
              onClick: () => setIsMobileMenuOpen(!isMobileMenuOpen)
            }
          )
        ] }),
        /* @__PURE__ */ jsxs2(
          MobileNavMenu,
          {
            isOpen: isMobileMenuOpen,
            onClose: () => setIsMobileMenuOpen(false),
            children: [
              navItems.map((item, idx) => /* @__PURE__ */ jsx2(
                "a",
                {
                  href: item.link,
                  onClick: () => setIsMobileMenuOpen(false),
                  className: "relative text-neutral-600 dark:text-neutral-300",
                  children: /* @__PURE__ */ jsx2("span", { className: "block", children: item.name })
                },
                `mobile-link-${idx}`
              )),
              /* @__PURE__ */ jsxs2("div", { className: "flex w-full flex-col gap-4", children: [
                /* @__PURE__ */ jsx2(
                  NavbarButton,
                  {
                    onClick: () => setIsMobileMenuOpen(false),
                    variant: "primary",
                    className: "w-full",
                    children: "Login"
                  }
                ),
                /* @__PURE__ */ jsx2(
                  NavbarButton,
                  {
                    onClick: () => setIsMobileMenuOpen(false),
                    variant: "primary",
                    className: "w-full",
                    children: "Book a call"
                  }
                )
              ] })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx2(DummyContent, {})
  ] });
}
var DummyContent = () => {
  return /* @__PURE__ */ jsxs2("div", { className: "container mx-auto p-8 pt-24", children: [
    /* @__PURE__ */ jsx2("h1", { className: "mb-4 text-center text-3xl font-bold", children: "Check the navbar at the top of the container" }),
    /* @__PURE__ */ jsxs2("p", { className: "mb-10 text-center text-sm text-zinc-500", children: [
      "For demo purpose we have kept the position as",
      " ",
      /* @__PURE__ */ jsx2("span", { className: "font-medium", children: "Sticky" }),
      ". Keep in mind that this component is ",
      /* @__PURE__ */ jsx2("span", { className: "font-medium", children: "fixed" }),
      " and will not move when scrolling."
    ] }),
    /* @__PURE__ */ jsx2("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-4", children: [
      {
        id: 1,
        title: "The",
        width: "md:col-span-1",
        height: "h-60",
        bg: "bg-neutral-100 dark:bg-neutral-800"
      },
      {
        id: 2,
        title: "First",
        width: "md:col-span-2",
        height: "h-60",
        bg: "bg-neutral-100 dark:bg-neutral-800"
      },
      {
        id: 3,
        title: "Rule",
        width: "md:col-span-1",
        height: "h-60",
        bg: "bg-neutral-100 dark:bg-neutral-800"
      },
      {
        id: 4,
        title: "Of",
        width: "md:col-span-3",
        height: "h-60",
        bg: "bg-neutral-100 dark:bg-neutral-800"
      },
      {
        id: 5,
        title: "F",
        width: "md:col-span-1",
        height: "h-60",
        bg: "bg-neutral-100 dark:bg-neutral-800"
      },
      {
        id: 6,
        title: "Club",
        width: "md:col-span-2",
        height: "h-60",
        bg: "bg-neutral-100 dark:bg-neutral-800"
      },
      {
        id: 7,
        title: "Is",
        width: "md:col-span-2",
        height: "h-60",
        bg: "bg-neutral-100 dark:bg-neutral-800"
      },
      {
        id: 8,
        title: "You",
        width: "md:col-span-1",
        height: "h-60",
        bg: "bg-neutral-100 dark:bg-neutral-800"
      },
      {
        id: 9,
        title: "Do NOT TALK about",
        width: "md:col-span-2",
        height: "h-60",
        bg: "bg-neutral-100 dark:bg-neutral-800"
      },
      {
        id: 10,
        title: "F Club",
        width: "md:col-span-1",
        height: "h-60",
        bg: "bg-neutral-100 dark:bg-neutral-800"
      }
    ].map((box) => /* @__PURE__ */ jsx2(
      "div",
      {
        className: `${box.width} ${box.height} ${box.bg} flex items-center justify-center rounded-lg p-4 shadow-sm`,
        children: /* @__PURE__ */ jsx2("h2", { className: "text-xl font-medium", children: box.title })
      },
      box.id
    )) })
  ] });
};

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(NavbarDemo, {}) }) });
}
export {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavBody,
  NavItems,
  Navbar,
  NavbarButton,
  NavbarLogo,
  Component as default
};

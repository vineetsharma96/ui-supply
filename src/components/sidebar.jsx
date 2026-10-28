// Adapted from https://ui.aceternity.com/components/sidebar
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/sidebar.tsx
import { useState, createContext, useContext } from "react";
import { AnimatePresence, motion } from "motion/react";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var SidebarContext = createContext(
  void 0
);
var useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
var SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true
}) => {
  const [openState, setOpenState] = useState(false);
  const open = openProp !== void 0 ? openProp : openState;
  const setOpen = setOpenProp !== void 0 ? setOpenProp : setOpenState;
  return /* @__PURE__ */ jsx(SidebarContext.Provider, { value: { open, setOpen, animate }, children });
};
var Sidebar = ({
  children,
  open,
  setOpen,
  animate
}) => {
  return /* @__PURE__ */ jsx(SidebarProvider, { open, setOpen, animate, children });
};
var SidebarBody = (props) => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(DesktopSidebar, { ...props }),
    /* @__PURE__ */ jsx(MobileSidebar, { ...props })
  ] });
};
var DesktopSidebar = ({
  className,
  children,
  ...props
}) => {
  const { open, setOpen, animate } = useSidebar();
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
    motion.div,
    {
      className: cn(
        "h-full px-4 py-4 hidden  md:flex md:flex-col bg-neutral-100 dark:bg-neutral-800 w-[300px] shrink-0",
        className
      ),
      animate: {
        width: animate ? open ? "300px" : "60px" : "300px"
      },
      onMouseEnter: () => setOpen(true),
      onMouseLeave: () => setOpen(false),
      ...props,
      children
    }
  ) });
};
var MobileSidebar = ({
  className,
  children,
  ...props
}) => {
  const { open, setOpen } = useSidebar();
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "h-10 px-4 py-4 flex flex-row md:hidden  items-center justify-between bg-neutral-100 dark:bg-neutral-800 w-full"
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx("div", { className: "flex justify-end z-20 w-full", children: /* @__PURE__ */ jsx(
          IconMenu2,
          {
            className: "text-neutral-800 dark:text-neutral-200",
            onClick: () => setOpen(!open)
          }
        ) }),
        /* @__PURE__ */ jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { x: "-100%", opacity: 0 },
            animate: { x: 0, opacity: 1 },
            exit: { x: "-100%", opacity: 0 },
            transition: {
              duration: 0.3,
              ease: "easeInOut"
            },
            className: cn(
              "fixed h-full w-full inset-0 bg-white dark:bg-neutral-900 p-10 z-[100] flex flex-col justify-between",
              className
            ),
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "absolute right-10 top-10 z-50 text-neutral-800 dark:text-neutral-200",
                  onClick: () => setOpen(!open),
                  children: /* @__PURE__ */ jsx(IconX, {})
                }
              ),
              children
            ]
          }
        ) })
      ]
    }
  ) });
};
var SidebarLink = ({
  link,
  className,
  ...props
}) => {
  const { open, animate } = useSidebar();
  return /* @__PURE__ */ jsxs(
    "a",
    {
      href: link.href,
      className: cn(
        "flex items-center justify-start gap-2  group/sidebar py-2",
        className
      ),
      ...props,
      children: [
        link.icon,
        /* @__PURE__ */ jsx(
          motion.span,
          {
            animate: {
              display: animate ? open ? "inline-block" : "none" : "inline-block",
              opacity: animate ? open ? 1 : 0 : 1
            },
            className: "text-neutral-700 dark:text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0",
            children: link.label
          }
        )
      ]
    }
  );
};

// entry.jsx
import React3 from "react";

// registry:components/sidebar-demo.tsx
import { useState as useState2 } from "react";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt
} from "@tabler/icons-react";
import { motion as motion2 } from "motion/react";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function SidebarDemo() {
  const links = [
    {
      label: "Dashboard",
      href: "#",
      icon: /* @__PURE__ */ jsx2(IconBrandTabler, { className: "h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" })
    },
    {
      label: "Profile",
      href: "#",
      icon: /* @__PURE__ */ jsx2(IconUserBolt, { className: "h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" })
    },
    {
      label: "Settings",
      href: "#",
      icon: /* @__PURE__ */ jsx2(IconSettings, { className: "h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" })
    },
    {
      label: "Logout",
      href: "#",
      icon: /* @__PURE__ */ jsx2(IconArrowLeft, { className: "h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" })
    }
  ];
  const [open, setOpen] = useState2(false);
  return /* @__PURE__ */ jsxs2(
    "div",
    {
      className: cn(
        "mx-auto flex w-full max-w-7xl flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
        "h-[60vh]"
        // for your use case, use `h-screen` instead of `h-[60vh]`
      ),
      children: [
        /* @__PURE__ */ jsx2(Sidebar, { open, setOpen, children: /* @__PURE__ */ jsxs2(SidebarBody, { className: "justify-between gap-10", children: [
          /* @__PURE__ */ jsxs2("div", { className: "flex flex-1 flex-col overflow-x-hidden overflow-y-auto", children: [
            open ? /* @__PURE__ */ jsx2(Logo, {}) : /* @__PURE__ */ jsx2(LogoIcon, {}),
            /* @__PURE__ */ jsx2("div", { className: "mt-8 flex flex-col gap-2", children: links.map((link, idx) => /* @__PURE__ */ jsx2(SidebarLink, { link }, idx)) })
          ] }),
          /* @__PURE__ */ jsx2("div", { children: /* @__PURE__ */ jsx2(
            SidebarLink,
            {
              link: {
                label: "Manu Arora",
                href: "#",
                icon: /* @__PURE__ */ jsx2(
                  "img",
                  {
                    src: "https://assets.aceternity.com/manu.png",
                    className: "h-7 w-7 shrink-0 rounded-full",
                    width: 50,
                    height: 50,
                    alt: "Avatar"
                  }
                )
              }
            }
          ) })
        ] }) }),
        /* @__PURE__ */ jsx2(Dashboard, {})
      ]
    }
  );
}
var Logo = () => {
  return /* @__PURE__ */ jsxs2(
    "a",
    {
      href: "#",
      className: "relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black",
      children: [
        /* @__PURE__ */ jsx2("div", { className: "h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" }),
        /* @__PURE__ */ jsx2(
          motion2.span,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            className: "font-medium whitespace-pre text-black dark:text-white",
            children: "Acet Labs"
          }
        )
      ]
    }
  );
};
var LogoIcon = () => {
  return /* @__PURE__ */ jsx2(
    "a",
    {
      href: "#",
      className: "relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black",
      children: /* @__PURE__ */ jsx2("div", { className: "h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" })
    }
  );
};
var Dashboard = () => {
  return /* @__PURE__ */ jsx2("div", { className: "flex flex-1", children: /* @__PURE__ */ jsxs2("div", { className: "flex h-full w-full flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 md:p-10 dark:border-neutral-700 dark:bg-neutral-900", children: [
    /* @__PURE__ */ jsx2("div", { className: "flex gap-2", children: [...new Array(4)].map((i, idx) => /* @__PURE__ */ jsx2(
      "div",
      {
        className: "h-20 w-full animate-pulse rounded-lg bg-gray-100 dark:bg-neutral-800"
      },
      "first-array-demo-1" + idx
    )) }),
    /* @__PURE__ */ jsx2("div", { className: "flex flex-1 gap-2", children: [...new Array(2)].map((i, idx) => /* @__PURE__ */ jsx2(
      "div",
      {
        className: "h-full w-full animate-pulse rounded-lg bg-gray-100 dark:bg-neutral-800"
      },
      "second-array-demo-1" + idx
    )) })
  ] }) });
};

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(SidebarDemo, {}) }) });
}
export {
  DesktopSidebar,
  MobileSidebar,
  Sidebar,
  SidebarBody,
  SidebarLink,
  SidebarProvider,
  Component as default,
  useSidebar
};

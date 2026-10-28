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
// Adapted from https://www.vengenceui.com/components/awwwards-nav
// Copyright (c) 2025-2026 Ashutoshx7. See licenses/vengeance.txt for usage terms.
// registry:components/ui/awwwards-nav.tsx
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { List, X } from "@phosphor-icons/react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/awwwards-nav.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var DEFAULT_ITEMS = [
  { label: "Home", href: "#" },
  { label: "Nominees", href: "#" },
  { label: "Directory", href: "#" },
  { label: "Collections", href: "#" }
];
var DEFAULT_COLUMNS = [
  {
    title: "Awards",
    links: [
      { label: "Winners", href: "#" },
      { label: "Site of the Day", href: "#" },
      { label: "Nominees", href: "#" }
    ]
  },
  {
    title: "Inspiration",
    links: [
      { label: "Collections", href: "#" },
      { label: "Elements", href: "#" },
      { label: "Resources", href: "#" }
    ]
  },
  {
    title: "Directory",
    links: [
      { label: "Professionals", href: "#" },
      { label: "Agencies", href: "#" },
      { label: "Freelancers", href: "#" }
    ]
  },
  {
    title: "Market",
    links: [
      { label: "Jobs", href: "#" },
      { label: "New Events", href: "#" },
      { label: "Products", href: "#" }
    ]
  }
];
var COLLAPSED_HEIGHT = 60;
var EXPANDED_HEIGHT = 370;
function AwwwardsNav({
  items = DEFAULT_ITEMS,
  columns = DEFAULT_COLUMNS,
  moreLabel = "More",
  onOpenChange,
  className
}) {
  const navRef = useRef(null);
  const navTopRef = useRef(null);
  const navItemsRef = useRef(null);
  const navHomeRef = useRef(null);
  const openRef = useRef(false);
  const animatingRef = useRef(false);
  const [showClose, setShowClose] = useState(false);
  const onOpenChangeRef = useRef(onOpenChange);
  useEffect(() => {
    onOpenChangeRef.current = onOpenChange;
  }, [onOpenChange]);
  useEffect(() => {
    const nav = navRef.current;
    const navTop = navTopRef.current;
    const navItems = navItemsRef.current;
    const navHome = navHomeRef.current;
    if (!nav || !navTop || !navItems || !navHome) return;
    gsap.set(nav, { height: COLLAPSED_HEIGHT });
    gsap.set(navTop, { opacity: 0, scale: 0.9, display: "none" });
    gsap.set(navItems, { opacity: 1, display: "flex" });
    gsap.set(navHome, { flexGrow: 0 });
    return () => {
      gsap.killTweensOf([nav, navTop, navItems, navHome]);
    };
  }, []);
  const toggle = () => {
    const nav = navRef.current;
    const navTop = navTopRef.current;
    const navItems = navItemsRef.current;
    const navHome = navHomeRef.current;
    if (!nav || !navTop || !navItems || !navHome || animatingRef.current) return;
    animatingRef.current = true;
    const opening = !openRef.current;
    openRef.current = opening;
    onOpenChangeRef.current?.(opening);
    if (opening) {
      gsap.to(nav, { height: EXPANDED_HEIGHT, duration: 0.75, ease: "power4.inOut" });
      gsap.to(navItems, {
        opacity: 0,
        duration: 0.1,
        onComplete: () => gsap.set(navItems, { display: "none" })
      });
      gsap.to(navHome, {
        flexGrow: 1,
        duration: 0.2,
        ease: "power4.inOut",
        onComplete: () => setShowClose(true)
      });
      gsap.to(navTop, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        delay: 0.5,
        onStart: () => gsap.set(navTop, { display: "block" }),
        onComplete: () => {
          animatingRef.current = false;
        }
      });
    } else {
      gsap.to(nav, { height: COLLAPSED_HEIGHT, duration: 0.75, ease: "power4.inOut", delay: 0.2 });
      gsap.to(navTop, {
        opacity: 0,
        scale: 0.9,
        duration: 0.2,
        onComplete: () => gsap.set(navTop, { display: "none" })
      });
      gsap.to(navHome, {
        flexGrow: 0,
        duration: 0.2,
        ease: "power4.inOut",
        onComplete: () => setShowClose(false)
      });
      gsap.to(navItems, {
        opacity: 1,
        duration: 0.2,
        delay: 0.5,
        onStart: () => gsap.set(navItems, { display: "flex" }),
        onComplete: () => {
          animatingRef.current = false;
        }
      });
    }
  };
  return /* @__PURE__ */ jsxs(
    "nav",
    {
      ref: navRef,
      className: cn(
        "fixed bottom-6 left-1/2 z-50 -translate-x-1/2",
        "h-[60px] w-[min(680px,92vw)] overflow-hidden rounded-xl border backdrop-blur-xl",
        "border-black/10 bg-white/70 dark:border-white/25 dark:bg-black/75",
        className
      ),
      children: [
        /* @__PURE__ */ jsx("div", { ref: navTopRef, className: "absolute inset-x-0 top-0 bottom-[60px] hidden p-2.5", children: /* @__PURE__ */ jsx("div", { className: "flex h-full w-full gap-0 rounded-[10px] border border-black/[0.06] bg-black/[0.03] p-5 dark:border-white/[0.06] dark:bg-white/[0.04]", children: columns.map((col, ci) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: cn(
              "flex flex-1 flex-col gap-1",
              ci > 0 && "border-l border-dashed border-black/15 pl-4 dark:border-white/20"
            ),
            children: [
              /* @__PURE__ */ jsxs("div", { className: "mb-3 flex items-center gap-2", children: [
                /* @__PURE__ */ jsx("span", { className: "h-1 w-1 shrink-0 rounded-full bg-black dark:bg-white" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-black/70 dark:text-white/75", children: col.title })
              ] }),
              col.links.map((link) => /* @__PURE__ */ jsx(
                "a",
                {
                  href: link.href,
                  className: "block py-2 text-sm text-black transition-colors hover:text-black/50 dark:text-white dark:hover:text-white/60",
                  children: link.label
                },
                link.label
              ))
            ]
          },
          col.title
        )) }) }),
        /* @__PURE__ */ jsxs("div", { className: "absolute inset-x-0 bottom-0 flex h-[60px] gap-1.5 p-2.5", children: [
          /* @__PURE__ */ jsxs(
            "div",
            {
              ref: navHomeRef,
              role: "button",
              tabIndex: 0,
              "aria-expanded": showClose,
              "aria-label": showClose ? "Close menu" : "Open menu",
              onClick: toggle,
              onKeyDown: (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggle();
                }
              },
              className: cn(
                "flex shrink-0 cursor-pointer select-none items-center justify-center gap-2.5 rounded-[10px] border px-5 text-sm transition-colors",
                "border-black/10 bg-black/[0.04] text-neutral-600 hover:bg-black/[0.08] hover:text-black",
                "dark:border-white/10 dark:bg-white/[0.06] dark:text-neutral-300 dark:hover:bg-white/[0.12] dark:hover:text-white",
                showClose && "bg-black/[0.08] text-black dark:bg-white/[0.12] dark:text-white"
              ),
              children: [
                showClose ? /* @__PURE__ */ jsx(X, { weight: "light", className: "h-4 w-4 text-black dark:text-white" }) : /* @__PURE__ */ jsx(List, { weight: "light", className: "h-4 w-4 text-black dark:text-white" }),
                /* @__PURE__ */ jsx("span", { children: moreLabel })
              ]
            }
          ),
          /* @__PURE__ */ jsx("div", { ref: navItemsRef, className: "flex min-w-0 flex-[4] items-center gap-1.5", children: items.map((item) => /* @__PURE__ */ jsx(
            "div",
            {
              className: "flex h-full flex-1 items-center justify-center rounded-[10px] border border-black/15 transition-colors hover:border-black/40 dark:border-white/20 dark:hover:border-white/50",
              children: /* @__PURE__ */ jsx(
                "a",
                {
                  href: item.href,
                  className: "px-2 text-center text-sm text-neutral-600 transition-colors hover:text-black dark:text-neutral-400 dark:hover:text-white",
                  children: item.label
                }
              )
            },
            item.label
          )) })
        ] })
      ]
    }
  );
}

// entry.jsx
import React from "react";

// registry:components/docs/awwwards-nav-demo.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
function AwwwardsNavDemo() {
  return /* @__PURE__ */ jsx2("div", { className: "relative flex h-full w-full items-end justify-center overflow-hidden", children: /* @__PURE__ */ jsx2(AwwwardsNav, { className: "absolute bottom-6 left-1/2 -translate-x-1/2" }) });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(AwwwardsNavDemo, {}) }) });
}
export {
  AwwwardsNav,
  Component as default
};

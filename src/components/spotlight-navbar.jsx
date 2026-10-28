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
// Adapted from https://www.vengenceui.com/components/spotlight-navbar
// Copyright (c) 2025-2026 Ashutoshx7. See licenses/vengeance.txt for usage terms.
// registry:components/ui/spotlight-navbar.tsx
import { useEffect, useRef, useState } from "react";
import { animate } from "motion/react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/spotlight-navbar.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function SpotlightNavbar({
  items = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Events", href: "#events" },
    { label: "Sponsors", href: "#sponsors" },
    { label: "Pricing", href: "#pricing" }
  ],
  className,
  onItemClick,
  defaultActiveIndex = 0
}) {
  const navRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
  const [hoverX, setHoverX] = useState(null);
  const [isDark, setIsDark] = useState(false);
  const spotlightX = useRef(0);
  const ambienceX = useRef(0);
  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!navRef.current) return;
    const nav = navRef.current;
    const handleMouseMove = (e) => {
      const rect = nav.getBoundingClientRect();
      const x = e.clientX - rect.left;
      setHoverX(x);
      spotlightX.current = x;
      nav.style.setProperty("--spotlight-x", `${x}px`);
    };
    const handleMouseLeave = () => {
      setHoverX(null);
      const activeItem = nav.querySelector(`[data-index="${activeIndex}"]`);
      if (activeItem) {
        const navRect = nav.getBoundingClientRect();
        const itemRect = activeItem.getBoundingClientRect();
        const targetX = itemRect.left - navRect.left + itemRect.width / 2;
        animate(spotlightX.current, targetX, {
          type: "spring",
          stiffness: 200,
          damping: 20,
          onUpdate: (v) => {
            spotlightX.current = v;
            nav.style.setProperty("--spotlight-x", `${v}px`);
          }
        });
      }
    };
    nav.addEventListener("mousemove", handleMouseMove);
    nav.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      nav.removeEventListener("mousemove", handleMouseMove);
      nav.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [activeIndex]);
  useEffect(() => {
    if (!navRef.current) return;
    const nav = navRef.current;
    const activeItem = nav.querySelector(`[data-index="${activeIndex}"]`);
    if (activeItem) {
      const navRect = nav.getBoundingClientRect();
      const itemRect = activeItem.getBoundingClientRect();
      const targetX = itemRect.left - navRect.left + itemRect.width / 2;
      animate(ambienceX.current, targetX, {
        type: "spring",
        stiffness: 200,
        damping: 20,
        onUpdate: (v) => {
          ambienceX.current = v;
          nav.style.setProperty("--ambience-x", `${v}px`);
        }
      });
    }
  }, [activeIndex]);
  const handleItemClick = (item, index) => {
    setActiveIndex(index);
    onItemClick?.(item, index);
  };
  return /* @__PURE__ */ jsxs("div", { className: cn("relative flex justify-center pt-10", className), children: [
    /* @__PURE__ */ jsxs(
      "nav",
      {
        ref: navRef,
        className: cn(
          "spotlight-nav spotlight-nav-bg glass-border spotlight-nav-shadow",
          "relative h-11 rounded-full transition-all duration-300 overflow-hidden"
        ),
        children: [
          /* @__PURE__ */ jsx("ul", { className: "relative flex items-center h-full px-2 gap-0 z-[10]", children: items.map((item, idx) => /* @__PURE__ */ jsx("li", { className: "relative h-full flex items-center justify-center", children: /* @__PURE__ */ jsx(
            "a",
            {
              href: item.href,
              "data-index": idx,
              onClick: (e) => {
                e.preventDefault();
                handleItemClick(item, idx);
              },
              className: cn(
                "px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-full",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-white/30",
                // Active vs Inactive Text
                activeIndex === idx ? "text-black dark:text-white" : "text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white"
              ),
              children: item.label
            }
          ) }, idx)) }),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "pointer-events-none absolute bottom-0 left-0 w-full h-full z-[1] opacity-0 transition-opacity duration-300",
              style: {
                opacity: hoverX !== null ? 1 : 0,
                background: `
              radial-gradient(
                120px circle at var(--spotlight-x) 100%,
                var(--spotlight-color, rgba(0,0,0,0.1)) 0%,
                transparent 50%
              )
            `
              }
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "pointer-events-none absolute bottom-0 left-0 w-full h-[2px] z-[2]",
              style: {
                background: `
                  radial-gradient(
                    60px circle at var(--ambience-x) 0%,
                    var(--ambience-color, rgba(0,0,0,1)) 0%,
                    transparent 100%
                  )
                `
              }
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsx("style", { jsx: true, children: `
        nav {
          /* Light Mode Colors: Dark Gray/Black lights */
          --spotlight-color: rgba(0,0,0,0.08);
          --ambience-color: rgba(0,0,0,0.8);
        }
        :global(.dark) nav {
          /* Dark Mode Colors: White lights */
          --spotlight-color: rgba(255,255,255,0.15);
          --ambience-color: rgba(255,255,255,1);
        }
      ` })
  ] });
}

// entry.jsx
import React2 from "react";

// registry:components/docs/spotlight-navbar-demo.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
function SpotlightNavbarDemo() {
  return /* @__PURE__ */ jsx2("div", { className: "w-full flex items-center justify-center p-8", children: /* @__PURE__ */ jsx2(SpotlightNavbar, {}) });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(SpotlightNavbarDemo, {}) }) });
}
export {
  SpotlightNavbar,
  Component as default
};

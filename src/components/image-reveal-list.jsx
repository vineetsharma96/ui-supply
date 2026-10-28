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
// Adapted from https://www.vengenceui.com/components/image-reveal-list
// Copyright (c) 2025-2026 Ashutoshx7. See licenses/vengeance.txt for usage terms.
// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/image-reveal-list.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function ImageRevealList({ items, className }) {
  return /* @__PURE__ */ jsx("div", { className: cn("relative max-w-[500px] w-full mx-auto", className), children: /* @__PURE__ */ jsx("ul", { className: "list-none bg-white/60 dark:bg-black/40 rounded-xl p-2 backdrop-blur-md border border-neutral-200 dark:border-white/10", children: items.map((item) => /* @__PURE__ */ jsx("li", { className: "relative", children: /* @__PURE__ */ jsxs(
    "a",
    {
      href: item.href || "#",
      className: "group flex items-center p-4 text-neutral-800 dark:text-neutral-200 no-underline text-[15px] font-medium rounded-lg transition-all duration-200 hover:bg-white/90 dark:hover:bg-white/10 hover:translate-x-1",
      children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: item.image,
            alt: item.title,
            className: "absolute -left-[100px] top-1/2 -translate-y-1/2 scale-90 w-[80px] h-[110px] rounded-md object-cover shadow-2xl opacity-0 pointer-events-none transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-[100] group-hover:opacity-100 group-hover:scale-100 group-hover:-left-[90px]"
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "text-neutral-400 dark:text-neutral-500 text-[13px] mr-4 min-w-[24px] font-normal", children: item.number }),
        item.title,
        item.subtitle && /* @__PURE__ */ jsx("span", { className: "ml-auto text-neutral-400 dark:text-neutral-500 text-[13px] font-normal", children: item.subtitle })
      ]
    }
  ) }, item.id)) }) });
}

// entry.jsx
import React from "react";

// registry:components/docs/image-reveal-list-demo.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var demoItems = [
  {
    id: "1",
    title: "The Great Gatsby",
    subtitle: "F. Scott Fitzgerald",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=280&fit=crop",
    number: "01"
  },
  {
    id: "2",
    title: "To Kill a Mockingbird",
    subtitle: "Harper Lee",
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=200&h=280&fit=crop",
    number: "02"
  },
  {
    id: "3",
    title: "1984",
    subtitle: "George Orwell",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200&h=280&fit=crop",
    number: "03"
  },
  {
    id: "4",
    title: "Pride and Prejudice",
    subtitle: "Jane Austen",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=200&h=280&fit=crop",
    number: "04"
  }
];
function ImageRevealListDemo() {
  return /* @__PURE__ */ jsxs2("div", { className: "w-full min-h-[500px] flex flex-col items-center justify-center relative p-8 overflow-hidden", children: [
    /* @__PURE__ */ jsx2(
      "div",
      {
        className: "absolute inset-0 pointer-events-none opacity-50 dark:opacity-20",
        style: {
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.04) 1px, transparent 1px)`,
          backgroundSize: "32px 32px"
        }
      }
    ),
    /* @__PURE__ */ jsx2(
      "div",
      {
        className: "absolute inset-0 pointer-events-none hidden dark:block opacity-10",
        style: {
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: "32px 32px"
        }
      }
    ),
    /* @__PURE__ */ jsx2("div", { className: "relative z-10 w-full max-w-[500px] flex flex-col items-center", children: /* @__PURE__ */ jsx2(ImageRevealList, { items: demoItems, className: "mb-8 pl-[100px] sm:pl-0" }) })
  ] });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(ImageRevealListDemo, {}) }) });
}
export {
  ImageRevealList,
  Component as default
};

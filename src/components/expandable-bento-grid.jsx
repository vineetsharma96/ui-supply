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
// Adapted from https://www.vengenceui.com/components/expandable-bento-grid
// Copyright (c) 2025-2026 Ashutoshx7. See licenses/vengeance.txt for usage terms.
// registry:components/ui/expandable-bento-grid.tsx
import { useEffect as useEffect2, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

// registry:hooks/use-outside-click.ts
import { useEffect } from "react";
var useOutsideClick = (ref, callback) => {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      callback(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, callback]);
};

// registry:components/ui/expandable-bento-grid.tsx
import { X } from "lucide-react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
function ExpandableBentoGrid({ items: items2 }) {
  const [active, setActive] = useState(null);
  const ref = useRef(null);
  const id = useId();
  useEffect2(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }
    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);
  useOutsideClick(ref, () => setActive(null));
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(AnimatePresence, { children: active && typeof active === "object" && /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        className: "fixed inset-0 bg-black/20 h-full w-full z-[10000]"
      }
    ) }),
    /* @__PURE__ */ jsx(AnimatePresence, { children: active && typeof active === "object" ? /* @__PURE__ */ jsxs("div", { className: " fixed inset-0 top-16 grid place-items-center z-[10001] ", children: [
      /* @__PURE__ */ jsx(
        motion.button,
        {
          layout: true,
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0, transition: { duration: 0.05 } },
          className: "flex absolute top-2 right-2 md:right-10 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6",
          onClick: () => setActive(null),
          children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4 dark:text-white text-black" })
        },
        `button-${active.title}-${id}`
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          layoutId: `card-${active.title}-${id}`,
          ref,
          className: "w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden",
          children: [
            /* @__PURE__ */ jsx(motion.div, { layoutId: `image-${active.title}-${id}`, children: /* @__PURE__ */ jsx("div", { className: "w-full h-40 md:h-50 lg:h-60 bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center perspective-distant transform-3d", children: active.icon ? /* @__PURE__ */ jsx("div", { className: "scale-[2] text-blue-500", children: active.icon }) : /* @__PURE__ */ jsx("div", { className: "w-full h-full bg-gray-200" }) }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between p-4  items-center", children: [
                /* @__PURE__ */ jsxs("div", { className: "", children: [
                  /* @__PURE__ */ jsx(
                    motion.h3,
                    {
                      layoutId: `title-${active.title}-${id}`,
                      className: "font-bold text-neutral-700 dark:text-neutral-200 md:text-sm ",
                      children: active.title
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    motion.p,
                    {
                      layoutId: `description-${active.title}-${id}`,
                      className: "text-neutral-600 dark:text-neutral-400 text-[14px] text-balance",
                      children: active.description
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx(
                  motion.a,
                  {
                    layoutId: `button-${active.title}-${id}`,
                    href: "#",
                    target: "_blank",
                    className: "px-4 py-3 text-sm rounded-2xl font-bold bg-blue-100 dark:bg-blue-900/30 text-white",
                    children: "Visit"
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("div", { className: "pt-4  px-4  flex justify-center mx-auto overflow-auto", children: /* @__PURE__ */ jsx(
                motion.div,
                {
                  layout: true,
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  exit: { opacity: 0 },
                  className: "text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-5 flex flex-col items-start gap-4  dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]",
                  children: active.content
                }
              ) })
            ] })
          ]
        }
      )
    ] }) : null }),
    /* @__PURE__ */ jsx("ul", { className: "max-w-4xl mx-auto w-full gap-2 lg:gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  items-start ", children: items2.map((item) => /* @__PURE__ */ jsx(
      motion.div,
      {
        layoutId: `card-${item.title}-${id}`,
        onClick: () => setActive(item),
        className: "p-4 flex flex-col md:flex-row justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer bg-blue-50/60 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 transition-colors",
        children: /* @__PURE__ */ jsxs("div", { className: "flex gap-3 flex-row items-center justify-center mx-auto ", children: [
          /* @__PURE__ */ jsx(motion.div, { layoutId: `image-${item.title}-${id}`, children: /* @__PURE__ */ jsx("div", { className: "h-14 w-14 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-500 p-1", children: item.icon }) }),
          /* @__PURE__ */ jsxs("div", { className: "", children: [
            /* @__PURE__ */ jsx(
              motion.h3,
              {
                layoutId: `title-${item.title}-${id}`,
                className: "font-medium  text-neutral-800 dark:text-neutral-200  text-left",
                children: item.title
              }
            ),
            /* @__PURE__ */ jsx(
              motion.p,
              {
                layoutId: `description-${item.title}-${id}`,
                className: "text-neutral-600 dark:text-neutral-400 text-left  text-xs md:text-[14px]",
                children: item.subtitle
              }
            )
          ] })
        ] })
      },
      item.id
    )) })
  ] });
}

// entry.jsx
import React3 from "react";

// registry:components/docs/expandable-bento-grid.tsx
import { Layout } from "lucide-react";
import { FaGithub, FaSlack, FaTwitter } from "react-icons/fa";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var items = [
  {
    id: 1,
    title: "Repository",
    subtitle: "Version Control",
    description: "Secure, scalable, and collaborative code management for modern teams.",
    icon: /* @__PURE__ */ jsx2(FaGithub, { className: "w-6 h-6" }),
    content: /* @__PURE__ */ jsxs2("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsx2("p", { children: "Collaborate on code with your team in a secure environment." }),
      /* @__PURE__ */ jsx2("div", { className: "h-40 bg-zinc-100 dark:bg-zinc-800 rounded-lg w-full flex items-center justify-center text-zinc-400", children: "Repo Visualization" })
    ] })
  },
  {
    id: 2,
    title: "Connect",
    subtitle: "Team Communication",
    description: "Real-time messaging, file sharing, and powerful search for instant collaboration.",
    icon: /* @__PURE__ */ jsx2(FaSlack, { className: "w-6 h-6" }),
    content: /* @__PURE__ */ jsxs2("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsx2("p", { children: "Stay connected with your team wherever you are." }),
      /* @__PURE__ */ jsxs2("ul", { className: "list-disc pl-5 space-y-2", children: [
        /* @__PURE__ */ jsx2("li", { children: "Instant messaging" }),
        /* @__PURE__ */ jsx2("li", { children: "File sharing" }),
        /* @__PURE__ */ jsx2("li", { children: "Video calls" })
      ] })
    ] })
  },
  {
    id: 3,
    title: "Reach",
    subtitle: "Audience Engagement",
    description: "Amplify your voice and connect with your community globally in real-time.",
    icon: /* @__PURE__ */ jsx2(FaTwitter, { className: "w-6 h-6" }),
    content: /* @__PURE__ */ jsxs2("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsx2("p", { children: "Engage with your audience on social media platforms." }),
      /* @__PURE__ */ jsxs2("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsx2("div", { className: "h-20 bg-blue-100 rounded-md" }),
        /* @__PURE__ */ jsx2("div", { className: "h-20 bg-blue-100 rounded-md" })
      ] })
    ] })
  },
  {
    id: 4,
    title: "Analytics",
    subtitle: "Data Insights",
    description: "Understand your users with powerful analytics tools.",
    icon: /* @__PURE__ */ jsx2(Layout, { className: "w-6 h-6" }),
    content: /* @__PURE__ */ jsx2("div", { className: "space-y-4", children: /* @__PURE__ */ jsx2("p", { children: "Track user behavior and optimize your application." }) })
  }
];
function ExpandableBentoGridDemo() {
  return /* @__PURE__ */ jsxs2("div", { className: "w-full h-full h-full flex items-center justify-center p-4 relative overflow-hidden", children: [
    /* @__PURE__ */ jsx2("div", { className: "absolute inset-0 bg-grid-black/[0.1] dark:bg-grid-white/[0.1] -z-10" }),
    /* @__PURE__ */ jsx2(ExpandableBentoGrid, { items })
  ] });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(ExpandableBentoGridDemo, {}) }) });
}
export {
  Component as default
};

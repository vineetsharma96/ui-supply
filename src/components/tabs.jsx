// Adapted from https://ui.aceternity.com/components/tabs
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:components/ui/tabs.tsx
import { useState } from "react";
import { motion } from "motion/react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/tabs.tsx
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var Tabs = ({
  tabs: propTabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName
}) => {
  const [active, setActive] = useState(propTabs[0]);
  const [tabs, setTabs] = useState(propTabs);
  const moveSelectedTabToTop = (idx) => {
    const newTabs = [...propTabs];
    const selectedTab = newTabs.splice(idx, 1);
    newTabs.unshift(selectedTab[0]);
    setTabs(newTabs);
    setActive(newTabs[0]);
  };
  const [hovering, setHovering] = useState(false);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: cn(
          "flex flex-row items-center justify-start [perspective:1000px] relative overflow-auto sm:overflow-visible no-visible-scrollbar max-w-full w-full",
          containerClassName
        ),
        children: propTabs.map((tab, idx) => /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => {
              moveSelectedTabToTop(idx);
            },
            onMouseEnter: () => setHovering(true),
            onMouseLeave: () => setHovering(false),
            className: cn("relative px-4 py-2 rounded-full", tabClassName),
            style: {
              transformStyle: "preserve-3d"
            },
            children: [
              active.value === tab.value && /* @__PURE__ */ jsx(
                motion.div,
                {
                  layoutId: "clickedbutton",
                  transition: { type: "spring", bounce: 0.3, duration: 0.6 },
                  className: cn(
                    "absolute inset-0 bg-gray-200 dark:bg-zinc-800 rounded-full ",
                    activeTabClassName
                  )
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "relative block text-black dark:text-white", children: tab.title })
            ]
          },
          tab.title
        ))
      }
    ),
    /* @__PURE__ */ jsx(
      FadeInDiv,
      {
        tabs,
        active,
        hovering,
        className: cn("mt-32", contentClassName)
      },
      active.value
    )
  ] });
};
var FadeInDiv = ({
  className,
  tabs,
  hovering
}) => {
  const isActive = (tab) => {
    return tab.value === tabs[0].value;
  };
  return /* @__PURE__ */ jsx("div", { className: "relative w-full h-full", children: tabs.map((tab, idx) => /* @__PURE__ */ jsx(
    motion.div,
    {
      layoutId: tab.value,
      style: {
        scale: 1 - idx * 0.1,
        top: hovering ? idx * -50 : 0,
        zIndex: -idx,
        opacity: idx < 3 ? 1 - idx * 0.1 : 0
      },
      animate: {
        y: isActive(tab) ? [0, 40, 0] : 0
      },
      className: cn("w-full h-full absolute top-0 left-0", className),
      children: tab.content
    },
    tab.value
  )) });
};

// entry.jsx
import React from "react";

// registry:components/tabs-demo.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function TabsDemo() {
  const tabs = [
    {
      title: "Product",
      value: "product",
      content: /* @__PURE__ */ jsxs2("div", { className: "w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900", children: [
        /* @__PURE__ */ jsx2("p", { children: "Product Tab" }),
        /* @__PURE__ */ jsx2(DummyContent, {})
      ] })
    },
    {
      title: "Services",
      value: "services",
      content: /* @__PURE__ */ jsxs2("div", { className: "w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900", children: [
        /* @__PURE__ */ jsx2("p", { children: "Services tab" }),
        /* @__PURE__ */ jsx2(DummyContent, {})
      ] })
    },
    {
      title: "Playground",
      value: "playground",
      content: /* @__PURE__ */ jsxs2("div", { className: "w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900", children: [
        /* @__PURE__ */ jsx2("p", { children: "Playground tab" }),
        /* @__PURE__ */ jsx2(DummyContent, {})
      ] })
    },
    {
      title: "Content",
      value: "content",
      content: /* @__PURE__ */ jsxs2("div", { className: "w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900", children: [
        /* @__PURE__ */ jsx2("p", { children: "Content tab" }),
        /* @__PURE__ */ jsx2(DummyContent, {})
      ] })
    },
    {
      title: "Random",
      value: "random",
      content: /* @__PURE__ */ jsxs2("div", { className: "w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900", children: [
        /* @__PURE__ */ jsx2("p", { children: "Random tab" }),
        /* @__PURE__ */ jsx2(DummyContent, {})
      ] })
    }
  ];
  return /* @__PURE__ */ jsx2("div", { className: "h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start my-40", children: /* @__PURE__ */ jsx2(Tabs, { tabs }) });
}
var DummyContent = () => {
  return /* @__PURE__ */ jsx2(
    "img",
    {
      src: "https://ui.aceternity.com/linear.webp",
      alt: "dummy image",
      width: "1000",
      height: "1000",
      className: "object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
    }
  );
};

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(TabsDemo, {}) }) });
}
export {
  FadeInDiv,
  Tabs,
  Component as default
};

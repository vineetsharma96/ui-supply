// Adapted from https://ui.aceternity.com/components/notch
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:components/ui/notch.tsx
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/notch.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var SHELL_SPRING = { type: "spring", stiffness: 380, damping: 34 };
var LIST_VARIANTS = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045, delayChildren: 0.08 } }
};
var OPTION_VARIANTS = {
  hidden: { opacity: 0, y: -10, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 420, damping: 30 }
  }
};
function NotchDivider() {
  return /* @__PURE__ */ jsx(
    "span",
    {
      "aria-hidden": true,
      className: "mx-0.5 h-5 w-px shrink-0 self-center",
      style: {
        backgroundImage: "repeating-linear-gradient(180deg, rgba(255,255,255,0.35) 0px, rgba(255,255,255,0.35) 1px, transparent 1px, transparent 5px)",
        backgroundSize: "1px 4px",
        backgroundRepeat: "repeat-y"
      }
    }
  );
}
var Notch = ({
  items,
  position = "bottom",
  align = "center",
  onItemChange,
  closeOnSelect = true,
  showSelectedValue = true,
  showDividers = true,
  accentColor = "var(--color-blue-500, #3b82f6)",
  offset = 16,
  reveal = true,
  className,
  itemClassName,
  panelClassName
}) => {
  const shellRef = useRef(null);
  const shellLayoutId = useId();
  const [openItemId, setOpenItemId] = useState(null);
  const [internalSelected, setInternalSelected] = useState(() => {
    const map = {};
    for (const item of items) {
      if (item.value === void 0) {
        map[item.id] = item.defaultValue ?? item.options[0]?.id ?? "";
      }
    }
    return map;
  });
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setOpenItemId(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => {
    if (!openItemId) return;
    function onPointerDown(e) {
      if (!shellRef.current?.contains(e.target)) setOpenItemId(null);
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [openItemId]);
  const getSelectedId = (item) => item.value ?? internalSelected[item.id] ?? item.options[0]?.id;
  const getSelectedOption = (item) => item.options.find((o) => o.id === getSelectedId(item));
  const handleSelect = (item, option) => {
    if (item.value === void 0) {
      setInternalSelected((prev) => ({ ...prev, [item.id]: option.id }));
    }
    item.onChange?.(option.id, option);
    onItemChange?.(item.id, option.id, option);
    if (closeOnSelect) setOpenItemId(null);
  };
  const alignClass = align === "start" ? "justify-start" : align === "end" ? "justify-end" : "justify-center";
  const edgeOffset = (offset + 20) * (position === "top" ? -1 : 1);
  const openItem = items.find((i) => i.id === openItemId) ?? null;
  const optionsPanel = openItem ? /* @__PURE__ */ jsx(
    motion.div,
    {
      role: "listbox",
      "aria-label": typeof openItem.label === "string" ? openItem.label : openItem.id,
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.15 },
      className: cn("w-fit", panelClassName),
      children: /* @__PURE__ */ jsx(
        motion.div,
        {
          className: "flex flex-col gap-1.5 p-2",
          variants: LIST_VARIANTS,
          initial: "hidden",
          animate: "visible",
          children: openItem.options.map((option) => {
            const active = option.id === getSelectedId(openItem);
            return /* @__PURE__ */ jsxs(
              motion.button,
              {
                role: "option",
                "aria-selected": active,
                type: "button",
                variants: OPTION_VARIANTS,
                onClick: () => handleSelect(openItem, option),
                className: cn(
                  "flex w-full items-center justify-between gap-6 rounded-md px-3 py-2 text-left text-xs font-medium whitespace-nowrap transition-colors",
                  active ? "text-white" : "text-neutral-300 hover:bg-white/5 hover:text-white"
                ),
                style: active ? {
                  background: `color-mix(in oklab, ${accentColor} 85%, transparent)`,
                  boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${accentColor} 40%, transparent)`
                } : void 0,
                children: [
                  /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2.5", children: [
                    option.icon ? /* @__PURE__ */ jsx("span", { className: "flex shrink-0 items-center justify-center", children: option.icon }) : null,
                    /* @__PURE__ */ jsx("span", { children: option.label })
                  ] }),
                  active ? /* @__PURE__ */ jsx(
                    "span",
                    {
                      className: "size-1.5 shrink-0 rounded-full",
                      style: { background: accentColor }
                    }
                  ) : null
                ]
              },
              option.id
            );
          })
        }
      )
    },
    openItem.id
  ) : /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.15 },
      className: "flex w-fit items-center gap-1 p-1",
      children: items.map((item, index) => {
        const selected = getSelectedOption(item);
        const isLast = index === items.length - 1;
        return /* @__PURE__ */ jsxs(React.Fragment, { children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              "aria-haspopup": "listbox",
              "aria-expanded": false,
              onClick: () => setOpenItemId(item.id),
              className: cn(
                "group flex items-center gap-2 rounded-full px-3 py-2 text-xs font-medium whitespace-nowrap text-neutral-300 transition-colors hover:bg-white/6 hover:text-white",
                itemClassName
              ),
              children: [
                item.icon ? /* @__PURE__ */ jsx("span", { className: "flex shrink-0 items-center justify-center", children: item.icon }) : null,
                /* @__PURE__ */ jsx("span", { className: "text-neutral-100", children: item.label }),
                (item.showValue ?? showSelectedValue) && selected ? /* @__PURE__ */ jsx("span", { className: "text-neutral-400", children: selected.label }) : null
              ]
            }
          ),
          showDividers && !isLast ? /* @__PURE__ */ jsx(NotchDivider, {}) : null
        ] }, item.id);
      })
    },
    "__notch-triggers"
  );
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "pointer-events-none fixed inset-x-0 z-100 flex translate-z-0 px-4",
        position === "top" ? "top-0" : "bottom-0",
        alignClass
      ),
      style: position === "top" ? { paddingTop: `max(${offset}px, env(safe-area-inset-top))` } : { paddingBottom: `max(${offset}px, env(safe-area-inset-bottom))` },
      children: /* @__PURE__ */ jsx(
        motion.div,
        {
          ref: shellRef,
          layoutId: shellLayoutId,
          layout: true,
          initial: reveal ? { opacity: 0, y: edgeOffset, filter: "blur(6px)" } : false,
          animate: { opacity: 1, y: 0, filter: "blur(0px)" },
          transition: SHELL_SPRING,
          className: cn(
            "pointer-events-auto flex w-fit flex-col overflow-hidden rounded-xl border border-white/10 bg-neutral-950/95 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.55)] ring-1 ring-neutral-800 backdrop-blur-2xl ring-inset",
            className
          ),
          children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "popLayout", initial: false, children: optionsPanel })
        }
      )
    }
  );
};

// entry.jsx
import React3 from "react";

// registry:components/notch-demo.tsx
import { useState as useState2 } from "react";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var COLORS = [
  { id: "#3b82f6", label: "Blue" },
  { id: "#8b5cf6", label: "Violet" },
  { id: "#10b981", label: "Emerald" },
  { id: "#f43f5e", label: "Rose" }
];
var ALIGNMENTS = [
  { id: "left", label: "Left" },
  { id: "center", label: "Center" },
  { id: "right", label: "Right" }
];
function NotchDemo() {
  const [bg, setBg] = useState2("#3b82f6");
  const [align, setAlign] = useState2("center");
  const items = [
    {
      id: "background",
      label: "Background",
      options: COLORS,
      value: bg,
      onChange: (id) => setBg(id)
    },
    {
      id: "alignment",
      label: "Alignment",
      options: ALIGNMENTS,
      value: align,
      onChange: (id) => setAlign(id)
    }
  ];
  const alignClass = align === "left" ? "items-start text-left" : align === "right" ? "items-end text-right" : "items-center text-center";
  return /* @__PURE__ */ jsxs2("div", { className: "relative flex min-h-screen w-full translate-z-0 items-center justify-center overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-950 [&_.fixed]:absolute", children: [
    /* @__PURE__ */ jsxs2(
      "div",
      {
        className: cn(
          `relative flex w-80 flex-col justify-center gap-2 overflow-hidden rounded-2xl px-1 pt-1 pb-8 text-white shadow-xl transition-colors duration-300`,
          alignClass
        ),
        children: [
          /* @__PURE__ */ jsx2(
            "div",
            {
              style: { background: bg },
              className: cn(
                "absolute inset-0 mask-t-from-10% transition-colors duration-300"
              )
            }
          ),
          /* @__PURE__ */ jsx2(
            "img",
            {
              src: "https://images.unsplash.com/photo-1559825481-12a05cc00344?q=80&w=1365&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              alt: "The serenity of the sea",
              className: "relative z-20 h-full w-full rounded-xl object-cover shadow-2xl"
            }
          ),
          /* @__PURE__ */ jsxs2("div", { className: "px-4", children: [
            /* @__PURE__ */ jsx2("h3", { className: "relative mt-4 text-xl font-semibold", children: "The serenity of the sea" }),
            /* @__PURE__ */ jsx2("p", { className: "relative text-sm text-white/80", children: "Use the notch below to change my background color and text alignment." })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxs2("div", { className: "absolute bottom-16 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1.5 text-neutral-600 sm:bottom-20 sm:gap-2 dark:text-neutral-300", children: [
      /* @__PURE__ */ jsxs2(
        "svg",
        {
          viewBox: "0 0 120 80",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          className: "h-14 w-20 sm:h-20 sm:w-30",
          children: [
            /* @__PURE__ */ jsx2("path", { d: "M110 18 C70 0, 20 20, 12 60", strokeDasharray: "6 6" }),
            /* @__PURE__ */ jsx2("path", { d: "M4 48l8 14" }),
            /* @__PURE__ */ jsx2("path", { d: "M28 56l-16 6" })
          ]
        }
      ),
      /* @__PURE__ */ jsx2("span", { className: "text-xs font-medium sm:text-sm", children: "Click over here" })
    ] }),
    /* @__PURE__ */ jsx2(Notch, { items, position: "bottom" })
  ] });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(NotchDemo, {}) }) });
}
export {
  Notch,
  Component as default
};

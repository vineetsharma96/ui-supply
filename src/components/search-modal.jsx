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
// Adapted from https://www.vengenceui.com/components/search-modal
// Copyright (c) 2025-2026 Ashutoshx7. See licenses/vengeance.txt for usage terms.
// registry:components/ui/search-modal.tsx
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Buildings,
  ChatTeardropText,
  Checks,
  EnvelopeSimple,
  FileArrowDown,
  ListPlus,
  MagnifyingGlass,
  Plus,
  RadioButton,
  ShareFat,
  SlidersHorizontal,
  Users,
  X
} from "@phosphor-icons/react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/search-modal.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var ICON = "h-[18px] w-[18px] text-neutral-400 dark:text-neutral-500";
var DEFAULT_TAGS = [
  { label: "Reactions", icon: /* @__PURE__ */ jsx(RadioButton, { className: "h-4 w-4" }) },
  { label: "People", icon: /* @__PURE__ */ jsx(Users, { className: "h-4 w-4" }) },
  { label: "Companies", icon: /* @__PURE__ */ jsx(Buildings, { className: "h-4 w-4" }) }
];
var DEFAULT_RESULTS = [
  {
    name: "Jason Woordheart",
    meta: "jason@dribbble.com",
    actions: [
      { icon: /* @__PURE__ */ jsx(ChatTeardropText, { className: "h-4 w-4" }), label: "Message" },
      { icon: /* @__PURE__ */ jsx(ListPlus, { className: "h-4 w-4" }), label: "Add to list" }
    ]
  },
  {
    name: "Rob Miller",
    meta: "rob@icloud.com",
    actions: [{ icon: /* @__PURE__ */ jsx(ListPlus, { className: "h-4 w-4" }), label: "Add to list" }]
  },
  {
    name: "Hannah Steward",
    meta: "replied on thread",
    actions: [
      { icon: /* @__PURE__ */ jsx(EnvelopeSimple, { className: "h-4 w-4" }), label: "Email" },
      { icon: /* @__PURE__ */ jsx(ListPlus, { className: "h-4 w-4" }), label: "Add to list" }
    ]
  }
];
var DEFAULT_QUICK_ACTIONS = [
  { label: "Create new task", shortcut: "E" },
  { label: "Create note", shortcut: "S" },
  { label: "Add member", shortcut: "R" }
];
var DEFAULT_FILES = [
  { name: "Invoice", ext: ".pdf", verified: true }
];
function SearchModal({
  placeholder = "Search for action, people, instruments",
  tags = DEFAULT_TAGS,
  results = DEFAULT_RESULTS,
  quickActions = DEFAULT_QUICK_ACTIONS,
  files = DEFAULT_FILES,
  defaultQuery = "",
  onQueryChange,
  onSelectResult,
  className,
  modal = false,
  open,
  defaultOpen = false,
  onOpenChange,
  hotkey = "k",
  closeOnEscape = true,
  overlayClassName
}) {
  const [query, setQuery] = useState(defaultQuery);
  const [activeTags, setActiveTags] = useState(tags);
  const inputRef = useRef(null);
  const isControlled = open !== void 0;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const actualOpen = isControlled ? open : internalOpen;
  const setOpen = useCallback(
    (value) => {
      if (!isControlled) setInternalOpen(value);
      onOpenChange?.(value);
    },
    [isControlled, onOpenChange]
  );
  const openRef = useRef(actualOpen);
  const setOpenRef = useRef(setOpen);
  useEffect(() => {
    openRef.current = actualOpen;
    setOpenRef.current = setOpen;
  });
  useEffect(() => {
    if (!modal) return;
    const onKeyDown = (e) => {
      if (hotkey && e.key.toLowerCase() === hotkey.toLowerCase() && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpenRef.current(!openRef.current);
      } else if (closeOnEscape && e.key === "Escape" && openRef.current) {
        setOpenRef.current(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [modal, hotkey, closeOnEscape]);
  useEffect(() => {
    if (modal && actualOpen) {
      const id = requestAnimationFrame(() => inputRef.current?.focus());
      return () => cancelAnimationFrame(id);
    }
  }, [modal, actualOpen]);
  const filteredResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return results;
    return results.filter((r) => `${r.name} ${r.meta ?? ""}`.toLowerCase().includes(q));
  }, [query, results]);
  const handleQuery = (value) => {
    setQuery(value);
    onQueryChange?.(value);
  };
  const removeTag = (index) => setActiveTags((prev) => prev.filter((_, i) => i !== index));
  const panel = /* @__PURE__ */ jsxs(
    "div",
    {
      role: modal ? "dialog" : void 0,
      "aria-modal": modal ? true : void 0,
      className: cn(
        "mx-auto w-full max-w-xl overflow-hidden rounded-2xl border backdrop-blur-xl",
        "border-black/[0.07] bg-white/85 text-neutral-900 shadow-[0_10px_40px_-14px_rgba(0,0,0,0.22)]",
        "dark:border-white/[0.08] dark:bg-neutral-900/85 dark:text-white dark:shadow-[0_18px_50px_-16px_rgba(0,0,0,0.7)]",
        className
      ),
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 border-b border-black/[0.06] px-4 py-3.5 dark:border-white/[0.06]", children: [
          /* @__PURE__ */ jsx(MagnifyingGlass, { className: ICON }),
          /* @__PURE__ */ jsx(
            "input",
            {
              ref: inputRef,
              type: "text",
              value: query,
              onChange: (e) => handleQuery(e.target.value),
              placeholder,
              "aria-label": "Search",
              className: "min-w-0 flex-1 bg-transparent px-3 text-sm text-current outline-none placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "flex shrink-0 items-center gap-2.5", children: [
            /* @__PURE__ */ jsx("button", { type: "button", "aria-label": "Filters", className: "text-neutral-400 transition-colors hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-200", children: /* @__PURE__ */ jsx(SlidersHorizontal, { className: "h-[18px] w-[18px]" }) }),
            /* @__PURE__ */ jsxs("kbd", { className: "flex items-center gap-0.5 rounded-md border border-black/[0.06] bg-black/[0.03] px-1.5 py-0.5 font-sans text-[11px] font-medium text-neutral-400 dark:border-white/[0.08] dark:bg-white/[0.06] dark:text-neutral-500", children: [
              /* @__PURE__ */ jsx("span", { className: "text-[13px] leading-none", children: "\u2318" }),
              modal && hotkey ? hotkey.toUpperCase() : "F"
            ] })
          ] })
        ] }),
        activeTags.length > 0 ? /* @__PURE__ */ jsxs("div", { className: "border-b border-black/[0.06] px-4 py-3.5 dark:border-white/[0.06]", children: [
          /* @__PURE__ */ jsx("span", { className: "text-[13px] text-neutral-400 dark:text-neutral-500", children: "I'm looking for..." }),
          /* @__PURE__ */ jsx("div", { className: "mt-3 flex flex-wrap gap-2", children: activeTags.map((tag, i) => /* @__PURE__ */ jsxs(
            "span",
            {
              className: "flex items-center gap-1.5 rounded-full bg-black/[0.04] py-1 pl-2.5 pr-2 text-[13px] ring-1 ring-inset ring-black/[0.04] dark:bg-white/[0.06] dark:ring-white/[0.06]",
              children: [
                tag.icon,
                /* @__PURE__ */ jsx("span", { children: tag.label }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => removeTag(i),
                    "aria-label": `Remove ${tag.label}`,
                    className: "text-neutral-400 transition-colors hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-200",
                    children: /* @__PURE__ */ jsx(X, { className: "h-3.5 w-3.5" })
                  }
                )
              ]
            },
            `${tag.label}-${i}`
          )) })
        ] }) : null,
        results.length > 0 ? /* @__PURE__ */ jsxs("div", { className: "border-b border-black/[0.06] dark:border-white/[0.06]", children: [
          /* @__PURE__ */ jsxs("p", { className: "px-4 pt-3.5 pb-2 text-[13px] text-neutral-400 dark:text-neutral-500", children: [
            "Last search\xA0\xA0",
            /* @__PURE__ */ jsx("span", { className: "text-neutral-600 dark:text-neutral-300", children: filteredResults.length })
          ] }),
          /* @__PURE__ */ jsx("ul", { className: "px-1.5 pb-1.5", children: filteredResults.map((result, i) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
            "a",
            {
              href: result.href ?? "#",
              onClick: () => onSelectResult?.(result, i),
              className: "group relative flex items-center rounded-lg px-2.5 py-2 transition-colors hover:bg-black/[0.03] dark:hover:bg-white/[0.04]",
              children: [
                result.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: result.avatar,
                      alt: "",
                      className: "h-6 w-6 shrink-0 rounded-full object-cover ring-1 ring-black/5 dark:ring-white/10"
                    }
                  )
                ) : /* @__PURE__ */ jsx("span", { className: "h-6 w-6 shrink-0 rounded-full bg-neutral-300 ring-1 ring-black/5 dark:bg-neutral-600 dark:ring-white/10" }),
                /* @__PURE__ */ jsxs("span", { className: "ml-2.5 truncate text-sm", children: [
                  result.name,
                  result.meta ? /* @__PURE__ */ jsx("span", { className: "pl-1.5 text-neutral-400 dark:text-neutral-500", children: result.meta }) : null
                ] }),
                result.actions && result.actions.length > 0 ? /* @__PURE__ */ jsx("span", { className: "ml-auto flex items-center gap-2.5 pl-3 text-neutral-400 opacity-70 transition-opacity group-hover:opacity-100 dark:text-neutral-500", children: result.actions.map((action, ai) => /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    "aria-label": action.label,
                    onClick: (e) => {
                      e.preventDefault();
                      action.onClick?.();
                    },
                    className: "transition-colors hover:text-neutral-700 dark:hover:text-neutral-200",
                    children: action.icon
                  },
                  ai
                )) }) : null
              ]
            }
          ) }, `${result.name}-${i}`)) })
        ] }) : null,
        quickActions.length > 0 ? /* @__PURE__ */ jsxs("div", { className: "border-b border-black/[0.06] px-1.5 py-1.5 dark:border-white/[0.06]", children: [
          /* @__PURE__ */ jsx("p", { className: "px-2.5 pt-2 pb-1 text-[13px] text-neutral-400 dark:text-neutral-500", children: "Quick actions" }),
          quickActions.map((action, i) => /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: action.onClick,
              className: "relative flex w-full items-center rounded-lg px-2.5 py-2 text-left transition-colors hover:bg-black/[0.03] dark:hover:bg-white/[0.04]",
              children: [
                /* @__PURE__ */ jsx("span", { className: "flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-lg bg-black/[0.04] text-neutral-500 dark:bg-white/[0.06] dark:text-neutral-300", children: action.icon ?? /* @__PURE__ */ jsx(Plus, { className: "h-[15px] w-[15px]" }) }),
                /* @__PURE__ */ jsx("span", { className: "pl-3 text-sm", children: action.label }),
                action.shortcut ? /* @__PURE__ */ jsx("kbd", { className: "ml-auto flex h-[26px] w-[26px] items-center justify-center rounded-md bg-black/[0.04] font-sans text-[13px] text-neutral-500 ring-1 ring-inset ring-black/[0.04] dark:bg-white/[0.06] dark:text-neutral-300 dark:ring-white/[0.06]", children: action.shortcut }) : null
              ]
            },
            `${action.label}-${i}`
          ))
        ] }) : null,
        files.length > 0 ? /* @__PURE__ */ jsxs("div", { className: "px-1.5 py-1.5", children: [
          /* @__PURE__ */ jsxs("p", { className: "px-2.5 pt-2 pb-1 text-[13px] text-neutral-400 dark:text-neutral-500", children: [
            "Files\xA0\xA0",
            /* @__PURE__ */ jsx("span", { className: "text-neutral-600 dark:text-neutral-300", children: files.length })
          ] }),
          files.map((file, i) => /* @__PURE__ */ jsxs(
            "div",
            {
              className: "group relative flex items-center rounded-lg px-2.5 py-2 transition-colors hover:bg-black/[0.03] dark:hover:bg-white/[0.04]",
              children: [
                /* @__PURE__ */ jsx("span", { className: "flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-lg bg-black/[0.04] text-neutral-500 dark:bg-white/[0.06] dark:text-neutral-300", children: file.icon ?? /* @__PURE__ */ jsx(FileArrowDown, { className: "h-[15px] w-[15px]" }) }),
                /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5 pl-3 text-sm", children: [
                  /* @__PURE__ */ jsxs("span", { children: [
                    file.name,
                    file.ext ? /* @__PURE__ */ jsx("span", { className: "text-neutral-400 dark:text-neutral-500", children: file.ext }) : null
                  ] }),
                  file.verified ? /* @__PURE__ */ jsx(Checks, { className: "h-4 w-4 text-emerald-500" }) : null
                ] }),
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: file.onShare,
                    className: "ml-auto flex items-center gap-1.5 text-sm text-neutral-400 opacity-80 transition-all hover:text-neutral-700 group-hover:opacity-100 dark:text-neutral-500 dark:hover:text-neutral-200",
                    children: [
                      /* @__PURE__ */ jsx(ShareFat, { weight: "bold", className: "h-4 w-4" }),
                      /* @__PURE__ */ jsx("span", { children: "Share" })
                    ]
                  }
                )
              ]
            },
            `${file.name}-${i}`
          ))
        ] }) : null
      ]
    }
  );
  if (!modal) return panel;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      onClick: () => setOpen(false),
      "aria-hidden": !actualOpen,
      className: cn(
        "fixed inset-0 z-50 flex items-start justify-center p-4 pt-[12vh] transition-opacity duration-200",
        actualOpen ? "opacity-100" : "pointer-events-none opacity-0",
        overlayClassName
      ),
      children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/40 backdrop-blur-sm dark:bg-black/60" }),
        /* @__PURE__ */ jsx(
          "div",
          {
            onClick: (e) => e.stopPropagation(),
            className: cn(
              "relative z-10 w-full max-w-xl transition-all duration-200 ease-out",
              actualOpen ? "translate-y-0 scale-100 opacity-100" : "-translate-y-2 scale-[0.98] opacity-0"
            ),
            children: panel
          }
        )
      ]
    }
  );
}

// entry.jsx
import React from "react";

// registry:components/docs/search-modal-demo.tsx
import { useState as useState2 } from "react";
import { ChatTeardropText as ChatTeardropText2, EnvelopeSimple as EnvelopeSimple2, ListPlus as ListPlus2, MagnifyingGlass as MagnifyingGlass2 } from "@phosphor-icons/react";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var RESULTS = [
  {
    name: "Jason Woordheart",
    meta: "jason@dribbble.com",
    avatar: "https://www.vengenceui.com/avatars/johan.jpg",
    actions: [
      { icon: /* @__PURE__ */ jsx2(ChatTeardropText2, { className: "h-4 w-4" }), label: "Message" },
      { icon: /* @__PURE__ */ jsx2(ListPlus2, { className: "h-4 w-4" }), label: "Add to list" }
    ]
  },
  {
    name: "Rob Miller",
    meta: "rob@icloud.com",
    avatar: "https://www.vengenceui.com/avatars/shinji.jpg",
    actions: [{ icon: /* @__PURE__ */ jsx2(ListPlus2, { className: "h-4 w-4" }), label: "Add to list" }]
  },
  {
    name: "Hannah Steward",
    meta: "replied on thread",
    avatar: "https://www.vengenceui.com/avatars/aizen.jpg",
    actions: [
      { icon: /* @__PURE__ */ jsx2(EnvelopeSimple2, { className: "h-4 w-4" }), label: "Email" },
      { icon: /* @__PURE__ */ jsx2(ListPlus2, { className: "h-4 w-4" }), label: "Add to list" }
    ]
  }
];
function SearchModalDemo() {
  const [open, setOpen] = useState2(false);
  return /* @__PURE__ */ jsxs2("div", { className: "relative flex h-full w-full flex-col items-center justify-center gap-4 overflow-hidden bg-neutral-50 p-8 dark:bg-neutral-950", children: [
    /* @__PURE__ */ jsx2(
      "div",
      {
        "aria-hidden": true,
        className: "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,0,0,0.05),transparent_60%)] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.06),transparent_60%)]"
      }
    ),
    /* @__PURE__ */ jsxs2(
      "button",
      {
        type: "button",
        onClick: () => setOpen(true),
        className: "relative flex w-full max-w-sm items-center gap-2 rounded-xl border border-black/[0.08] bg-white/70 px-3.5 py-2.5 text-sm text-neutral-400 shadow-sm transition-colors hover:border-black/[0.14] dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-neutral-500 dark:hover:border-white/20",
        children: [
          /* @__PURE__ */ jsx2(MagnifyingGlass2, { className: "h-[18px] w-[18px]" }),
          /* @__PURE__ */ jsx2("span", { children: "Search\u2026" }),
          /* @__PURE__ */ jsxs2("kbd", { className: "ml-auto flex items-center gap-0.5 rounded-md border border-black/[0.06] bg-black/[0.03] px-1.5 py-0.5 font-sans text-[11px] font-medium dark:border-white/[0.08] dark:bg-white/[0.06]", children: [
            /* @__PURE__ */ jsx2("span", { className: "text-[13px] leading-none", children: "\u2318" }),
            "K"
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxs2("p", { className: "relative text-xs text-neutral-400 dark:text-neutral-600", children: [
      "Press ",
      /* @__PURE__ */ jsx2("span", { className: "font-medium text-neutral-500 dark:text-neutral-400", children: "\u2318K" }),
      " to toggle"
    ] }),
    /* @__PURE__ */ jsx2(
      SearchModal,
      {
        modal: true,
        open,
        onOpenChange: setOpen,
        results: RESULTS,
        overlayClassName: "absolute items-center p-6"
      }
    )
  ] });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(SearchModalDemo, {}) }) });
}
export {
  SearchModal,
  Component as default
};

// Adapted from https://ui.aceternity.com/components/gooey-input
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:components/ui/gooey-input.tsx
import {
  useState,
  useRef,
  useEffect,
  useId,
  useMemo,
  useCallback
} from "react";
import { motion } from "motion/react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/gooey-input.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function GooeyFilter({
  filterId,
  blur
}) {
  return /* @__PURE__ */ jsx("svg", { className: "absolute hidden h-0 w-0", "aria-hidden": true, children: /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("filter", { id: filterId, x: "-50%", y: "-50%", width: "200%", height: "200%", children: [
    /* @__PURE__ */ jsx("feGaussianBlur", { in: "SourceGraphic", stdDeviation: blur, result: "blur" }),
    /* @__PURE__ */ jsx(
      "feColorMatrix",
      {
        in: "blur",
        type: "matrix",
        values: "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10",
        result: "goo"
      }
    ),
    /* @__PURE__ */ jsx("feComposite", { in: "SourceGraphic", in2: "goo", operator: "atop" })
  ] }) }) });
}
function SearchIcon({ layoutId }) {
  return /* @__PURE__ */ jsxs(
    motion.svg,
    {
      layoutId,
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      className: "size-4 shrink-0",
      children: [
        /* @__PURE__ */ jsx("circle", { cx: "11", cy: "11", r: "8" }),
        /* @__PURE__ */ jsx("path", { d: "m21 21-4.3-4.3" })
      ]
    }
  );
}
var transition = {
  duration: 0.4,
  type: "spring",
  bounce: 0.25
};
var iconBubbleVariants = {
  collapsed: { scale: 0, opacity: 0 },
  expanded: { scale: 1, opacity: 1 }
};
function GooeyInput({
  placeholder = "Type to search...",
  className,
  classNames,
  collapsedWidth = 115,
  expandedWidth = 200,
  expandedOffset = 50,
  gooeyBlur = 5,
  value: valueProp,
  defaultValue = "",
  onValueChange,
  onOpenChange,
  disabled = false
}) {
  const reactId = useId();
  const safeId = reactId.replace(/:/g, "");
  const filterId = `gooey-filter-${safeId}`;
  const iconLayoutId = `gooey-input-icon-${safeId}`;
  const inputLayoutId = `gooey-input-field-${safeId}`;
  const inputRef = useRef(null);
  const prevExpandedRef = useRef(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const isControlled = valueProp !== void 0;
  const searchText = isControlled ? valueProp : uncontrolledValue;
  const setSearchText = useCallback(
    (next) => {
      if (!isControlled) {
        setUncontrolledValue(next);
      }
      onValueChange?.(next);
    },
    [isControlled, onValueChange]
  );
  const setExpanded = useCallback(
    (next) => {
      setIsExpanded(next);
      onOpenChange?.(next);
    },
    [onOpenChange]
  );
  useEffect(() => {
    if (isExpanded) {
      inputRef.current?.focus();
    } else if (prevExpandedRef.current) {
      setSearchText("");
    }
    prevExpandedRef.current = isExpanded;
  }, [isExpanded, setSearchText]);
  const buttonVariants = useMemo(
    () => ({
      collapsed: { width: collapsedWidth, marginLeft: 0 },
      expanded: { width: expandedWidth, marginLeft: expandedOffset }
    }),
    [collapsedWidth, expandedWidth, expandedOffset]
  );
  const handleExpand = useCallback(() => {
    if (!disabled) setExpanded(true);
  }, [disabled, setExpanded]);
  const handleChange = useCallback(
    (e) => {
      setSearchText(e.target.value);
    },
    [setSearchText]
  );
  const handleBlur = useCallback(() => {
    if (!searchText) setExpanded(false);
  }, [searchText, setExpanded]);
  const surfaceClass = "bg-foreground text-background shadow-sm ring-1 ring-border/60";
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "relative flex items-center justify-center",
        className,
        classNames?.root
      ),
      children: [
        /* @__PURE__ */ jsx(GooeyFilter, { filterId, blur: gooeyBlur }),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: cn(
              "relative flex h-10 items-center justify-center",
              classNames?.filterWrap
            ),
            style: { filter: `url(#${filterId})` },
            children: [
              /* @__PURE__ */ jsx(
                motion.div,
                {
                  className: cn("flex h-10 items-center justify-center", classNames?.buttonRow),
                  variants: buttonVariants,
                  initial: "collapsed",
                  animate: isExpanded ? "expanded" : "collapsed",
                  transition,
                  children: /* @__PURE__ */ jsxs(
                    "button",
                    {
                      type: "button",
                      disabled,
                      onClick: handleExpand,
                      className: cn(
                        "flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-full px-4 text-sm font-medium outline-none transition-[color,box-shadow] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
                        surfaceClass,
                        classNames?.trigger
                      ),
                      children: [
                        !isExpanded ? /* @__PURE__ */ jsx(SearchIcon, { layoutId: iconLayoutId }) : null,
                        /* @__PURE__ */ jsx(
                          motion.input,
                          {
                            layoutId: inputLayoutId,
                            ref: inputRef,
                            type: "search",
                            enterKeyHint: "search",
                            autoComplete: "off",
                            value: searchText,
                            onChange: handleChange,
                            onBlur: handleBlur,
                            disabled: disabled || !isExpanded,
                            placeholder,
                            className: cn(
                              "h-full min-w-0 flex-1 bg-transparent text-sm text-background outline-none",
                              isExpanded ? "placeholder:text-background/50 dark:placeholder:text-background/45" : "pointer-events-none placeholder:text-background/80 dark:placeholder:text-background/70",
                              classNames?.input
                            )
                          }
                        )
                      ]
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx(
                motion.div,
                {
                  className: cn(
                    "absolute top-1/2 left-0 flex size-10 -translate-y-1/2 items-center justify-center",
                    classNames?.bubble
                  ),
                  variants: iconBubbleVariants,
                  initial: "collapsed",
                  animate: isExpanded ? "expanded" : "collapsed",
                  transition,
                  children: /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: cn(
                        "flex size-10 items-center justify-center rounded-full",
                        surfaceClass,
                        classNames?.bubbleSurface
                      ),
                      children: /* @__PURE__ */ jsx(SearchIcon, { layoutId: iconLayoutId })
                    }
                  )
                }
              )
            ]
          }
        )
      ]
    }
  );
}

// entry.jsx
import React from "react";

// registry:components/gooey-input-demo.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
function GooeyInputDemo() {
  return /* @__PURE__ */ jsx2("div", { className: "flex h-40 w-full items-center justify-center", children: /* @__PURE__ */ jsx2(GooeyInput, { placeholder: "Search..." }) });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(GooeyInputDemo, {}) }) });
}
export {
  GooeyInput,
  Component as default
};

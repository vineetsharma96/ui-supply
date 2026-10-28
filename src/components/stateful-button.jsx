// Adapted from https://ui.aceternity.com/components/stateful-button
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/stateful-button.tsx
import { motion, useAnimate } from "motion/react";
import { jsx, jsxs } from "react/jsx-runtime";
var Button = ({ className, children, ...props }) => {
  const [scope, animate] = useAnimate();
  const animateLoading = async () => {
    await animate(
      ".loader",
      {
        width: "20px",
        scale: 1,
        display: "block"
      },
      {
        duration: 0.2
      }
    );
  };
  const animateSuccess = async () => {
    await animate(
      ".loader",
      {
        width: "0px",
        scale: 0,
        display: "none"
      },
      {
        duration: 0.2
      }
    );
    await animate(
      ".check",
      {
        width: "20px",
        scale: 1,
        display: "block"
      },
      {
        duration: 0.2
      }
    );
    await animate(
      ".check",
      {
        width: "0px",
        scale: 0,
        display: "none"
      },
      {
        delay: 2,
        duration: 0.2
      }
    );
  };
  const handleClick = async (event) => {
    await animateLoading();
    await props.onClick?.(event);
    await animateSuccess();
  };
  const {
    onClick,
    onDrag,
    onDragStart,
    onDragEnd,
    onAnimationStart,
    onAnimationEnd,
    ...buttonProps
  } = props;
  return /* @__PURE__ */ jsx(
    motion.button,
    {
      layout: true,
      layoutId: "button",
      ref: scope,
      className: cn(
        "flex min-w-[120px] cursor-pointer items-center justify-center gap-2 rounded-full bg-green-500 px-4 py-2 font-medium text-white ring-offset-2 transition duration-200 hover:ring-2 hover:ring-green-500 dark:ring-offset-black",
        className
      ),
      ...buttonProps,
      onClick: handleClick,
      children: /* @__PURE__ */ jsxs(motion.div, { layout: true, className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Loader, {}),
        /* @__PURE__ */ jsx(CheckIcon, {}),
        /* @__PURE__ */ jsx(motion.span, { layout: true, children })
      ] })
    }
  );
};
var Loader = () => {
  return /* @__PURE__ */ jsxs(
    motion.svg,
    {
      animate: {
        rotate: [0, 360]
      },
      initial: {
        scale: 0,
        width: 0,
        display: "none"
      },
      style: {
        scale: 0.5,
        display: "none"
      },
      transition: {
        duration: 0.3,
        repeat: Infinity,
        ease: "linear"
      },
      xmlns: "http://www.w3.org/2000/svg",
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: "loader text-white",
      children: [
        /* @__PURE__ */ jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
        /* @__PURE__ */ jsx("path", { d: "M12 3a9 9 0 1 0 9 9" })
      ]
    }
  );
};
var CheckIcon = () => {
  return /* @__PURE__ */ jsxs(
    motion.svg,
    {
      initial: {
        scale: 0,
        width: 0,
        display: "none"
      },
      style: {
        scale: 0.5,
        display: "none"
      },
      xmlns: "http://www.w3.org/2000/svg",
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: "check text-white",
      children: [
        /* @__PURE__ */ jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
        /* @__PURE__ */ jsx("path", { d: "M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" }),
        /* @__PURE__ */ jsx("path", { d: "M9 12l2 2l4 -4" })
      ]
    }
  );
};

// entry.jsx
import React from "react";

// registry:components/stateful-button-demo.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
function StatefulButtonDemo() {
  const handleClick = () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 4e3);
    });
  };
  return /* @__PURE__ */ jsx2("div", { className: "flex h-40 w-full items-center justify-center", children: /* @__PURE__ */ jsx2(Button, { onClick: handleClick, children: "Send message" }) });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(StatefulButtonDemo, {}) }) });
}
export {
  Button,
  Component as default
};

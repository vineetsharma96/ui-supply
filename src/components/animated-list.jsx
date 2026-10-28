/*
MIT License

Copyright (c) Magic UI

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
// Adapted from https://magicui.design/docs/components/animated-list
// Copyright (c) Magic UI. See licenses/magic.txt for usage terms.
// registry:components/ui/animated-list.tsx
import React, {
  useEffect,
  useMemo,
  useState
} from "react";
import { AnimatePresence, motion } from "motion/react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/animated-list.tsx
import { jsx } from "react/jsx-runtime";
function AnimatedListItem({ children }) {
  const animations = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1, originY: 0 },
    exit: { scale: 0, opacity: 0 },
    transition: { type: "spring", stiffness: 350, damping: 40 }
  };
  return /* @__PURE__ */ jsx(motion.div, { ...animations, layout: true, className: "mx-auto w-full", children });
}
var AnimatedList = React.memo(
  ({ children, className, delay = 1e3, ...props }) => {
    const [index, setIndex] = useState(0);
    const childrenArray = useMemo(
      () => React.Children.toArray(children),
      [children]
    );
    useEffect(() => {
      let timeout = null;
      if (index < childrenArray.length - 1) {
        timeout = setTimeout(() => {
          setIndex((prevIndex) => (prevIndex + 1) % childrenArray.length);
        }, delay);
      }
      return () => {
        if (timeout !== null) {
          clearTimeout(timeout);
        }
      };
    }, [index, delay, childrenArray.length]);
    const itemsToShow = useMemo(() => {
      const result = childrenArray.slice(0, index + 1).reverse();
      return result;
    }, [index, childrenArray]);
    return /* @__PURE__ */ jsx(
      "div",
      {
        className: cn(`flex flex-col items-center gap-4`, className),
        ...props,
        children: /* @__PURE__ */ jsx(AnimatePresence, { children: itemsToShow.map((item) => /* @__PURE__ */ jsx(AnimatedListItem, { children: item }, item.key)) })
      }
    );
  }
);
AnimatedList.displayName = "AnimatedList";

// entry.jsx
import React3 from "react";

// registry:animated-list.tsx
import React2, {
  useEffect as useEffect2,
  useMemo as useMemo2,
  useState as useState2
} from "react";
import { AnimatePresence as AnimatePresence2, motion as motion2 } from "motion/react";
import { jsx as jsx2 } from "react/jsx-runtime";
function AnimatedListItem2({ children }) {
  const animations = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1, originY: 0 },
    exit: { scale: 0, opacity: 0 },
    transition: { type: "spring", stiffness: 350, damping: 40 }
  };
  return /* @__PURE__ */ jsx2(motion2.div, { ...animations, layout: true, className: "mx-auto w-full", children });
}
var AnimatedList2 = React2.memo(
  ({ children, className, delay = 1e3, ...props }) => {
    const [index, setIndex] = useState2(0);
    const childrenArray = useMemo2(
      () => React2.Children.toArray(children),
      [children]
    );
    useEffect2(() => {
      let timeout = null;
      if (index < childrenArray.length - 1) {
        timeout = setTimeout(() => {
          setIndex((prevIndex) => (prevIndex + 1) % childrenArray.length);
        }, delay);
      }
      return () => {
        if (timeout !== null) {
          clearTimeout(timeout);
        }
      };
    }, [index, delay, childrenArray.length]);
    const itemsToShow = useMemo2(() => {
      const result = childrenArray.slice(0, index + 1).reverse();
      return result;
    }, [index, childrenArray]);
    return /* @__PURE__ */ jsx2(
      "div",
      {
        className: cn(`flex flex-col items-center gap-4`, className),
        ...props,
        children: /* @__PURE__ */ jsx2(AnimatePresence2, { children: itemsToShow.map((item) => /* @__PURE__ */ jsx2(AnimatedListItem2, { children: item }, item.key)) })
      }
    );
  }
);
AnimatedList2.displayName = "AnimatedList";

// registry:components/ui/animated-list-demo.tsx
import { jsx as jsx3, jsxs } from "react/jsx-runtime";
import { createElement } from "react";
var notifications = [
  {
    name: "Payment received",
    description: "Magic UI",
    time: "15m ago",
    icon: "\u{1F4B8}",
    color: "#00C9A7"
  },
  {
    name: "User signed up",
    description: "Magic UI",
    time: "10m ago",
    icon: "\u{1F464}",
    color: "#FFB800"
  },
  {
    name: "New message",
    description: "Magic UI",
    time: "5m ago",
    icon: "\u{1F4AC}",
    color: "#FF3D71"
  },
  {
    name: "New event",
    description: "Magic UI",
    time: "2m ago",
    icon: "\u{1F5DE}\uFE0F",
    color: "#1E86FF"
  }
];
notifications = Array.from({ length: 10 }, () => notifications).flat();
var Notification = ({ name, description, icon, color, time }) => {
  return /* @__PURE__ */ jsx3(
    "figure",
    {
      className: cn(
        "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
        // animation styles
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        // light styles
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        // dark styles
        "transform-gpu dark:bg-transparent dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)]"
      ),
      children: /* @__PURE__ */ jsxs("div", { className: "flex flex-row items-center gap-3", children: [
        /* @__PURE__ */ jsx3(
          "div",
          {
            className: "flex size-10 items-center justify-center rounded-2xl",
            style: {
              backgroundColor: color
            },
            children: /* @__PURE__ */ jsx3("span", { className: "text-lg", children: icon })
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col overflow-hidden", children: [
          /* @__PURE__ */ jsxs("figcaption", { className: "flex flex-row items-center text-lg font-medium whitespace-pre dark:text-white", children: [
            /* @__PURE__ */ jsx3("span", { className: "text-sm sm:text-lg", children: name }),
            /* @__PURE__ */ jsx3("span", { className: "mx-1", children: "\xB7" }),
            /* @__PURE__ */ jsx3("span", { className: "text-xs text-gray-500", children: time })
          ] }),
          /* @__PURE__ */ jsx3("p", { className: "text-sm font-normal dark:text-white/60", children: description })
        ] })
      ] })
    }
  );
};
function AnimatedListDemo({
  className
}) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "relative flex h-[500px] w-full flex-col overflow-hidden p-2",
        className
      ),
      children: [
        /* @__PURE__ */ jsx3(AnimatedList2, { children: notifications.map((item, idx) => /* @__PURE__ */ createElement(Notification, { ...item, key: idx })) }),
        /* @__PURE__ */ jsx3("div", { className: "from-background pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t" })
      ]
    }
  );
}

// entry.jsx
import { jsx as jsx4 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx4("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx4("div", { className: "vendor-content", children: /* @__PURE__ */ jsx4(AnimatedListDemo, {}) }) });
}
export {
  AnimatedList,
  AnimatedListItem,
  Component as default
};

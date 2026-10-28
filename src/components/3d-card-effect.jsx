// Adapted from https://ui.aceternity.com/components/3d-card-effect
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/3d-card.tsx
import {
  createContext,
  useState,
  useContext,
  useRef,
  useEffect
} from "react";
import { jsx } from "react/jsx-runtime";
var MouseEnterContext = createContext(void 0);
var CardContainer = ({
  children,
  className,
  containerClassName
}) => {
  const containerRef = useRef(null);
  const [isMouseEntered, setIsMouseEntered] = useState(false);
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;
    containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
  };
  const handleMouseEnter = (e) => {
    setIsMouseEntered(true);
    if (!containerRef.current) return;
  };
  const handleMouseLeave = (e) => {
    if (!containerRef.current) return;
    setIsMouseEntered(false);
    containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
  };
  return /* @__PURE__ */ jsx(MouseEnterContext.Provider, { value: [isMouseEntered, setIsMouseEntered], children: /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "py-20 flex items-center justify-center",
        containerClassName
      ),
      style: {
        perspective: "1000px"
      },
      children: /* @__PURE__ */ jsx(
        "div",
        {
          ref: containerRef,
          onMouseEnter: handleMouseEnter,
          onMouseMove: handleMouseMove,
          onMouseLeave: handleMouseLeave,
          className: cn(
            "flex items-center justify-center relative transition-all duration-200 ease-linear",
            className
          ),
          style: {
            transformStyle: "preserve-3d"
          },
          children
        }
      )
    }
  ) });
};
var CardBody = ({
  children,
  className
}) => {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "h-96 w-96 [transform-style:preserve-3d]  [&>*]:[transform-style:preserve-3d]",
        className
      ),
      children
    }
  );
};
var CardItem = ({
  as: Tag = "div",
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}) => {
  const ref = useRef(null);
  const [isMouseEntered] = useMouseEnter();
  useEffect(() => {
    handleAnimations();
  }, [isMouseEntered]);
  const handleAnimations = () => {
    if (!ref.current) return;
    if (isMouseEntered) {
      ref.current.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
    } else {
      ref.current.style.transform = `translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;
    }
  };
  return /* @__PURE__ */ jsx(
    Tag,
    {
      ref,
      className: cn("w-fit transition duration-200 ease-linear", className),
      ...rest,
      children
    }
  );
};
var useMouseEnter = () => {
  const context = useContext(MouseEnterContext);
  if (context === void 0) {
    throw new Error("useMouseEnter must be used within a MouseEnterProvider");
  }
  return context;
};

// entry.jsx
import React2 from "react";

// registry:components/3d-card-demo.tsx
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
function ThreeDCardDemo() {
  return /* @__PURE__ */ jsx2(CardContainer, { className: "inter-var", children: /* @__PURE__ */ jsxs(CardBody, { className: "bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ", children: [
    /* @__PURE__ */ jsx2(
      CardItem,
      {
        translateZ: "50",
        className: "text-xl font-bold text-neutral-600 dark:text-white",
        children: "Make things float in air"
      }
    ),
    /* @__PURE__ */ jsx2(
      CardItem,
      {
        as: "p",
        translateZ: "60",
        className: "text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300",
        children: "Hover over this card to unleash the power of CSS perspective"
      }
    ),
    /* @__PURE__ */ jsx2(CardItem, { translateZ: "100", className: "w-full mt-4", children: /* @__PURE__ */ jsx2(
      "img",
      {
        src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        height: "1000",
        width: "1000",
        className: "h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl",
        alt: "thumbnail"
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mt-20", children: [
      /* @__PURE__ */ jsx2(
        CardItem,
        {
          translateZ: 20,
          as: "a",
          href: "https://twitter.com/mannupaaji",
          target: "__blank",
          className: "px-4 py-2 rounded-xl text-xs font-normal dark:text-white",
          children: "Try now \u2192"
        }
      ),
      /* @__PURE__ */ jsx2(
        CardItem,
        {
          translateZ: 20,
          as: "button",
          className: "px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold",
          children: "Sign up"
        }
      )
    ] })
  ] }) });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(ThreeDCardDemo, {}) }) });
}
export {
  CardBody,
  CardContainer,
  CardItem,
  Component as default,
  useMouseEnter
};

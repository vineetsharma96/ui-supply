// Adapted from https://ui.aceternity.com/components/container-scroll-animation
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:components/ui/container-scroll-animation.tsx
import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "motion/react";
import { jsx, jsxs } from "react/jsx-runtime";
var ContainerScroll = ({
  titleComponent,
  children
}) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef
  });
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);
  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1];
  };
  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "h-[60rem] md:h-[80rem] flex items-center justify-center relative p-2 md:p-20",
      ref: containerRef,
      children: /* @__PURE__ */ jsxs(
        "div",
        {
          className: "py-10 md:py-40 w-full relative",
          style: {
            perspective: "1000px"
          },
          children: [
            /* @__PURE__ */ jsx(Header, { translate, titleComponent }),
            /* @__PURE__ */ jsx(Card, { rotate, translate, scale, children })
          ]
        }
      )
    }
  );
};
var Header = ({ translate, titleComponent }) => {
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      style: {
        translateY: translate
      },
      className: "div max-w-5xl mx-auto text-center",
      children: titleComponent
    }
  );
};
var Card = ({
  rotate,
  scale,
  children
}) => {
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      style: {
        rotateX: rotate,
        scale,
        boxShadow: "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003"
      },
      className: "max-w-5xl -mt-12 mx-auto h-[30rem] md:h-[40rem] w-full border-4 border-[#6C6C6C] p-2 md:p-6 bg-[#222222] rounded-[30px] shadow-2xl",
      children: /* @__PURE__ */ jsx("div", { className: " h-full w-full  overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-900 md:rounded-2xl md:p-4 ", children })
    }
  );
};

// entry.jsx
import React2 from "react";

// registry:components/container-scroll-animation-demo.tsx
import { Fragment, jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function HeroScrollDemo() {
  return /* @__PURE__ */ jsx2("div", { className: "flex flex-col overflow-hidden", children: /* @__PURE__ */ jsx2(
    ContainerScroll,
    {
      titleComponent: /* @__PURE__ */ jsx2(Fragment, { children: /* @__PURE__ */ jsxs2("h1", { className: "text-4xl font-semibold text-black dark:text-white", children: [
        "Unleash the power of ",
        /* @__PURE__ */ jsx2("br", {}),
        /* @__PURE__ */ jsx2("span", { className: "text-4xl md:text-[6rem] font-bold mt-1 leading-none", children: "Scroll Animations" })
      ] }) }),
      children: /* @__PURE__ */ jsx2(
        "img",
        {
          src: `https://ui.aceternity.com/linear.webp`,
          alt: "hero",
          height: 720,
          width: 1400,
          className: "mx-auto rounded-2xl object-cover h-full object-left-top",
          draggable: false
        }
      )
    }
  ) });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(HeroScrollDemo, {}) }) });
}
export {
  Card,
  ContainerScroll,
  Header,
  Component as default
};

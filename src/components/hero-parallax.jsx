// Adapted from https://ui.aceternity.com/components/hero-parallax
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:components/ui/hero-parallax.tsx
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring
} from "motion/react";
import { jsx, jsxs } from "react/jsx-runtime";
var HeroParallax = ({
  products: products2
}) => {
  const firstRow = products2.slice(0, 5);
  const secondRow = products2.slice(5, 10);
  const thirdRow = products2.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };
  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1e3]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1e3]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      className: "h-[300vh] py-40 overflow-hidden  antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]",
      children: [
        /* @__PURE__ */ jsx(Header, {}),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            style: {
              rotateX,
              rotateZ,
              translateY,
              opacity
            },
            className: "",
            children: [
              /* @__PURE__ */ jsx(motion.div, { className: "flex flex-row-reverse space-x-reverse space-x-20 mb-20", children: firstRow.map((product) => /* @__PURE__ */ jsx(
                ProductCard,
                {
                  product,
                  translate: translateX
                },
                product.title
              )) }),
              /* @__PURE__ */ jsx(motion.div, { className: "flex flex-row  mb-20 space-x-20 ", children: secondRow.map((product) => /* @__PURE__ */ jsx(
                ProductCard,
                {
                  product,
                  translate: translateXReverse
                },
                product.title
              )) }),
              /* @__PURE__ */ jsx(motion.div, { className: "flex flex-row-reverse space-x-reverse space-x-20", children: thirdRow.map((product) => /* @__PURE__ */ jsx(
                ProductCard,
                {
                  product,
                  translate: translateX
                },
                product.title
              )) })
            ]
          }
        )
      ]
    }
  );
};
var Header = () => {
  return /* @__PURE__ */ jsxs("div", { className: "max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full  left-0 top-0", children: [
    /* @__PURE__ */ jsxs("h1", { className: "text-2xl md:text-7xl font-bold dark:text-white", children: [
      "The Ultimate ",
      /* @__PURE__ */ jsx("br", {}),
      " development studio"
    ] }),
    /* @__PURE__ */ jsx("p", { className: "max-w-2xl text-base md:text-xl mt-8 dark:text-neutral-200", children: "We build beautiful products with the latest technologies and frameworks. We are a team of passionate developers and designers that love to build amazing products." })
  ] });
};
var ProductCard = ({
  product,
  translate
}) => {
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      style: {
        x: translate
      },
      whileHover: {
        y: -20
      },
      className: "group/product h-96 w-[30rem] relative shrink-0",
      children: [
        /* @__PURE__ */ jsx(
          "a",
          {
            href: product.link,
            className: "block group-hover/product:shadow-2xl ",
            children: /* @__PURE__ */ jsx(
              "img",
              {
                src: product.thumbnail,
                height: "600",
                width: "600",
                className: "object-cover object-left-top absolute h-full w-full inset-0",
                alt: product.title
              }
            )
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none" }),
        /* @__PURE__ */ jsx("h2", { className: "absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white", children: product.title })
      ]
    },
    product.title
  );
};

// entry.jsx
import React2 from "react";

// registry:components/hero-parallax-demo.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
function HeroParallaxDemo() {
  return /* @__PURE__ */ jsx2(HeroParallax, { products });
}
var products = [
  {
    title: "Moonbeam",
    link: "https://gomoonbeam.com",
    thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/moonbeam.png"
  },
  {
    title: "Cursor",
    link: "https://cursor.so",
    thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/cursor.png"
  },
  {
    title: "Rogue",
    link: "https://userogue.com",
    thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/rogue.png"
  },
  {
    title: "Editorially",
    link: "https://editorially.org",
    thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/editorially.png"
  },
  {
    title: "Editrix AI",
    link: "https://editrix.ai",
    thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/editrix.png"
  },
  {
    title: "Pixel Perfect",
    link: "https://app.pixelperfect.quest",
    thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/pixelperfect.png"
  },
  {
    title: "Algochurn",
    link: "https://algochurn.com",
    thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/algochurn.png"
  },
  {
    title: "Aceternity UI",
    link: "https://ui.aceternity.com",
    thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/aceternityui.png"
  },
  {
    title: "Tailwind Master Kit",
    link: "https://tailwindmasterkit.com",
    thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/tailwindmasterkit.png"
  },
  {
    title: "SmartBridge",
    link: "https://smartbridgetech.com",
    thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/smartbridge.png"
  },
  {
    title: "Renderwork Studio",
    link: "https://renderwork.studio",
    thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/renderwork.png"
  },
  {
    title: "Creme Digital",
    link: "https://cremedigital.com",
    thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/cremedigital.png"
  },
  {
    title: "Golden Bells Academy",
    link: "https://goldenbellsacademy.com",
    thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/goldenbellsacademy.png"
  },
  {
    title: "Invoker Labs",
    link: "https://invoker.lol",
    thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/invoker.png"
  },
  {
    title: "E Free Invoice",
    link: "https://efreeinvoice.com",
    thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/efreeinvoice.png"
  }
];

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(HeroParallaxDemo, {}) }) });
}
export {
  Header,
  HeroParallax,
  ProductCard,
  Component as default
};

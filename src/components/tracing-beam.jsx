// Adapted from https://ui.aceternity.com/components/tracing-beam
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:components/ui/tracing-beam.tsx
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useTransform,
  useScroll,
  useSpring
} from "motion/react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/tracing-beam.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var TracingBeam = ({
  children,
  className
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const contentRef = useRef(null);
  const [svgHeight, setSvgHeight] = useState(0);
  useEffect(() => {
    if (contentRef.current) {
      setSvgHeight(contentRef.current.offsetHeight);
    }
  }, []);
  const y1 = useSpring(
    useTransform(scrollYProgress, [0, 0.8], [50, svgHeight]),
    {
      stiffness: 500,
      damping: 90
    }
  );
  const y2 = useSpring(
    useTransform(scrollYProgress, [0, 1], [50, svgHeight - 200]),
    {
      stiffness: 500,
      damping: 90
    }
  );
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      ref,
      className: cn("relative mx-auto h-full w-full max-w-4xl", className),
      children: [
        /* @__PURE__ */ jsxs("div", { className: "absolute top-3 -left-4 md:-left-20", children: [
          /* @__PURE__ */ jsx(
            motion.div,
            {
              transition: {
                duration: 0.2,
                delay: 0.5
              },
              animate: {
                boxShadow: scrollYProgress.get() > 0 ? "none" : "rgba(0, 0, 0, 0.24) 0px 3px 8px"
              },
              className: "border-netural-200 ml-[27px] flex h-4 w-4 items-center justify-center rounded-full border shadow-sm",
              children: /* @__PURE__ */ jsx(
                motion.div,
                {
                  transition: {
                    duration: 0.2,
                    delay: 0.5
                  },
                  animate: {
                    backgroundColor: scrollYProgress.get() > 0 ? "white" : "#10b981",
                    borderColor: scrollYProgress.get() > 0 ? "white" : "#059669"
                  },
                  className: "h-2 w-2 rounded-full border border-neutral-300 bg-white"
                }
              )
            }
          ),
          /* @__PURE__ */ jsxs(
            "svg",
            {
              viewBox: `0 0 20 ${svgHeight}`,
              width: "20",
              height: svgHeight,
              className: "ml-4 block",
              "aria-hidden": "true",
              children: [
                /* @__PURE__ */ jsx(
                  motion.path,
                  {
                    d: `M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`,
                    fill: "none",
                    stroke: "#9091A0",
                    strokeOpacity: "0.16",
                    transition: {
                      duration: 10
                    }
                  }
                ),
                /* @__PURE__ */ jsx(
                  motion.path,
                  {
                    d: `M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`,
                    fill: "none",
                    stroke: "url(#gradient)",
                    strokeWidth: "1.25",
                    className: "motion-reduce:hidden",
                    transition: {
                      duration: 10
                    }
                  }
                ),
                /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs(
                  motion.linearGradient,
                  {
                    id: "gradient",
                    gradientUnits: "userSpaceOnUse",
                    x1: "0",
                    x2: "0",
                    y1,
                    y2,
                    children: [
                      /* @__PURE__ */ jsx("stop", { stopColor: "#18CCFC", stopOpacity: "0" }),
                      /* @__PURE__ */ jsx("stop", { stopColor: "#18CCFC" }),
                      /* @__PURE__ */ jsx("stop", { offset: "0.325", stopColor: "#6344F5" }),
                      /* @__PURE__ */ jsx("stop", { offset: "1", stopColor: "#AE48FF", stopOpacity: "0" })
                    ]
                  }
                ) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { ref: contentRef, children })
      ]
    }
  );
};

// entry.jsx
import React2 from "react";

// registry:@/fonts/calsans
var calSans = { className: "font-sans" };
var calsans = calSans;

// registry:components/tracing-beam-demo.tsx
import { twMerge as twMerge2 } from "tailwind-merge";
import { Fragment, jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function TracingBeamDemo() {
  return /* @__PURE__ */ jsx2(TracingBeam, { className: "px-6", children: /* @__PURE__ */ jsx2("div", { className: "max-w-2xl mx-auto antialiased pt-4 relative", children: dummyContent.map((item, index) => /* @__PURE__ */ jsxs2("div", { className: "mb-10", children: [
    /* @__PURE__ */ jsx2("h2", { className: "bg-black text-white rounded-full text-sm w-fit px-4 py-1 mb-4", children: item.badge }),
    /* @__PURE__ */ jsx2("p", { className: twMerge2(calsans.className, "text-xl mb-4"), children: item.title }),
    /* @__PURE__ */ jsxs2("div", { className: "text-sm  prose prose-sm dark:prose-invert", children: [
      item?.image && /* @__PURE__ */ jsx2(
        "img",
        {
          src: item.image,
          alt: "blog thumbnail",
          height: "1000",
          width: "1000",
          className: "rounded-lg mb-10 object-cover"
        }
      ),
      item.description
    ] })
  ] }, `content-${index}`)) }) });
}
var dummyContent = [
  {
    title: "Lorem Ipsum Dolor Sit Amet",
    description: /* @__PURE__ */ jsxs2(Fragment, { children: [
      /* @__PURE__ */ jsx2("p", { children: "Sit duis est minim proident non nisi velit non consectetur. Esse adipisicing laboris consectetur enim ipsum reprehenderit eu deserunt Lorem ut aliqua anim do. Duis cupidatat qui irure cupidatat incididunt incididunt enim magna id est qui sunt fugiat. Laboris do duis pariatur fugiat Lorem aute sit ullamco. Qui deserunt non reprehenderit dolore nisi velit exercitation Lorem qui do enim culpa. Aliqua eiusmod in occaecat reprehenderit laborum nostrud fugiat voluptate do Lorem culpa officia sint labore. Tempor consectetur excepteur ut fugiat veniam commodo et labore dolore commodo pariatur." }),
      /* @__PURE__ */ jsx2("p", { children: "Dolor minim irure ut Lorem proident. Ipsum do pariatur est ad ad veniam in commodo id reprehenderit adipisicing. Proident duis exercitation ad quis ex cupidatat cupidatat occaecat adipisicing." }),
      /* @__PURE__ */ jsx2("p", { children: "Tempor quis dolor veniam quis dolor. Sit reprehenderit eiusmod reprehenderit deserunt amet laborum consequat adipisicing officia qui irure id sint adipisicing. Adipisicing fugiat aliqua nulla nostrud. Amet culpa officia aliquip deserunt veniam deserunt officia adipisicing aliquip proident officia sunt." })
    ] }),
    badge: "React",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=3540&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "Lorem Ipsum Dolor Sit Amet",
    description: /* @__PURE__ */ jsxs2(Fragment, { children: [
      /* @__PURE__ */ jsx2("p", { children: "Ex irure dolore veniam ex velit non aute nisi labore ipsum occaecat deserunt cupidatat aute. Enim cillum dolor et nulla sunt exercitation non voluptate qui aliquip esse tempor. Ullamco ut sunt consectetur sint qui qui do do qui do. Labore laborum culpa magna reprehenderit ea velit id esse adipisicing deserunt amet dolore. Ipsum occaecat veniam commodo proident aliqua id ad deserunt dolor aliquip duis veniam sunt." }),
      /* @__PURE__ */ jsx2("p", { children: "In dolore veniam excepteur eu est et sunt velit. Ipsum sint esse veniam fugiat esse qui sint ad sunt reprehenderit do qui proident reprehenderit. Laborum exercitation aliqua reprehenderit ea sint cillum ut mollit." })
    ] }),
    badge: "Changelog",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=3540&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "Lorem Ipsum Dolor Sit Amet",
    description: /* @__PURE__ */ jsx2(Fragment, { children: /* @__PURE__ */ jsx2("p", { children: "Ex irure dolore veniam ex velit non aute nisi labore ipsum occaecat deserunt cupidatat aute. Enim cillum dolor et nulla sunt exercitation non voluptate qui aliquip esse tempor. Ullamco ut sunt consectetur sint qui qui do do qui do. Labore laborum culpa magna reprehenderit ea velit id esse adipisicing deserunt amet dolore. Ipsum occaecat veniam commodo proident aliqua id ad deserunt dolor aliquip duis veniam sunt." }) }),
    badge: "Launch Week",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=3506&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
];

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(TracingBeamDemo, {}) }) });
}
export {
  TracingBeam,
  Component as default
};

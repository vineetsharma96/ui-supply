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
// Adapted from https://www.vengenceui.com/components/interactive-book
// Copyright (c) 2025-2026 Ashutoshx7. See licenses/vengeance.txt for usage terms.
// registry:components/ui/interactive-book.tsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/interactive-book.tsx
import { RefreshCcw, X } from "lucide-react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
function InteractiveBook({
  coverImage,
  bookTitle = "Book Title",
  bookAuthor = "Author Name",
  pages,
  className,
  width = 350,
  height = 500
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPageIndex, setCurrentPageIndex] = useState(-1);
  const [isHovering, setIsHovering] = useState(false);
  const widthNum = typeof width === "number" ? width : 350;
  const BOOK_OPEN_DURATION = 1.5;
  const EASING = [0.25, 0, 0, 1];
  const handleOpenBook = () => setIsOpen(true);
  const handleCloseBook = (e) => {
    e?.stopPropagation();
    setIsOpen(false);
    setCurrentPageIndex(-1);
  };
  const nextPage = (e) => {
    e?.stopPropagation();
    if (currentPageIndex < pages.length - 1) {
      setCurrentPageIndex((prev) => prev + 1);
    }
  };
  const prevPage = (e) => {
    e?.stopPropagation();
    if (currentPageIndex >= 0) {
      setCurrentPageIndex((prev) => prev - 1);
    }
  };
  const restartBook = (e) => {
    e?.stopPropagation();
    setCurrentPageIndex(-1);
  };
  const handleSliderChange = (e) => {
    setCurrentPageIndex(parseInt(e.target.value, 10));
  };
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") nextPage();
      if (e.key === "ArrowLeft") prevPage();
      if (e.key === "Escape") handleCloseBook();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentPageIndex]);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn("relative flex items-center justify-center perspective-[2000px]", className),
      style: {
        width: typeof width === "number" ? width * 3.5 : "100%",
        height: typeof height === "number" ? height + 100 : "auto"
      },
      children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            className: cn(
              "relative preserve-3d"
            ),
            style: { width, height },
            initial: { x: 0 },
            animate: { x: isOpen ? widthNum / 2 : 0 },
            transition: { duration: BOOK_OPEN_DURATION, ease: EASING },
            children: [
              /* @__PURE__ */ jsxs(
                motion.div,
                {
                  className: "absolute inset-0 w-full h-full origin-left",
                  initial: { rotateY: 0, zIndex: 100 },
                  animate: {
                    rotateY: isOpen ? -180 : isHovering ? -15 : 0,
                    zIndex: isOpen ? 0 : 100
                  },
                  transition: {
                    rotateY: { duration: BOOK_OPEN_DURATION, ease: EASING },
                    zIndex: { delay: isOpen ? BOOK_OPEN_DURATION * 0.6 : BOOK_OPEN_DURATION * 0.4 }
                  },
                  style: { transformStyle: "preserve-3d" },
                  onClick: !isOpen ? handleOpenBook : void 0,
                  onHoverStart: () => !isOpen && setIsHovering(true),
                  onHoverEnd: () => setIsHovering(false),
                  children: [
                    /* @__PURE__ */ jsxs(
                      "div",
                      {
                        className: "absolute inset-0 w-full h-full backface-hidden rounded-r-md rounded-l-sm shadow-2xl cursor-pointer overflow-hidden group",
                        style: { transform: "translateZ(0.5px)" },
                        children: [
                          /* @__PURE__ */ jsx(
                            "div",
                            {
                              className: "absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105",
                              style: { backgroundImage: `url(${coverImage})` }
                            }
                          ),
                          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" }),
                          /* @__PURE__ */ jsxs("div", { className: "absolute bottom-4 left-3 right-3 text-white text-left", children: [
                            /* @__PURE__ */ jsx("h1", { className: "text-sm font-serif font-bold tracking-wide mb-1 drop-shadow-md leading-tight", children: bookTitle }),
                            /* @__PURE__ */ jsx("p", { className: "text-[8px] font-sans tracking-widest opacity-90 uppercase border-t border-white/30 pt-1 inline-block", children: bookAuthor })
                          ] }),
                          /* @__PURE__ */ jsx("div", { className: "absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-white/30 to-transparent opacity-40" }),
                          /* @__PURE__ */ jsx("div", { className: "absolute left-[12px] top-0 bottom-0 w-[1px] bg-black/30" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: "absolute inset-0 w-full h-full backface-hidden rounded-l-md rounded-r-sm bg-[#fdfbf7] rotate-y-180 flex flex-col p-8 border-r border-neutral-200 shadow-xl cursor-pointer hover:bg-[#fcfaf5] transition-colors",
                        style: { transform: "rotateY(180deg) translateZ(0.5px)" },
                        onClick: (e) => {
                          e.stopPropagation();
                          prevPage();
                        },
                        children: /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col justify-center items-center text-center opacity-80", children: [
                          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-serif text-neutral-800 mb-2 tracking-wide", children: bookTitle }),
                          /* @__PURE__ */ jsx("div", { className: "w-8 h-[1px] bg-neutral-300 mb-3" }),
                          /* @__PURE__ */ jsx("p", { className: "text-xs text-neutral-500 uppercase tracking-widest", children: "Interactive Edition" })
                        ] })
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 w-full h-full z-0", style: { transformStyle: "preserve-3d" }, children: [
                pages.map((page, index) => {
                  const isFlipped = index <= currentPageIndex;
                  return /* @__PURE__ */ jsxs(
                    motion.div,
                    {
                      className: "absolute inset-0 w-full h-full origin-left bg-[#fdfbf7] rounded-r-md rounded-l-sm shadow-sm border border-neutral-100",
                      style: { transformStyle: "preserve-3d" },
                      initial: { rotateY: 0, zIndex: pages.length - index },
                      animate: {
                        rotateY: isFlipped ? -180 : 0,
                        zIndex: isFlipped ? index + 1 : pages.length - index
                      },
                      transition: {
                        duration: 0.6,
                        ease: [0.645, 0.045, 0.355, 1]
                      },
                      children: [
                        /* @__PURE__ */ jsxs(
                          "div",
                          {
                            className: "absolute inset-0 w-full h-full backface-hidden p-8 flex flex-col bg-[#fdfbf7] cursor-pointer hover:bg-[#fcfaf5] transition-colors",
                            style: { transform: "translateZ(0.5px)" },
                            onClick: (e) => {
                              e.stopPropagation();
                              nextPage();
                            },
                            children: [
                              /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                                /* @__PURE__ */ jsx("div", { className: "text-xs text-neutral-400 text-right mb-4 font-sans tracking-wider", children: page.pageNumber * 2 - 1 }),
                                /* @__PURE__ */ jsxs("div", { className: "prose prose-neutral prose-sm max-w-none font-serif text-neutral-700 leading-relaxed select-none", children: [
                                  page.title && /* @__PURE__ */ jsx("h3", { className: "text-xl font-medium text-center mb-6 text-neutral-800 tracking-tight", children: page.title }),
                                  page.content
                                ] })
                              ] }),
                              /* @__PURE__ */ jsx("div", { className: "absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/5 to-transparent pointer-events-none mix-blend-multiply" })
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxs(
                          "div",
                          {
                            className: "absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-[#fdfbf7] border-r border-neutral-200 overflow-hidden p-8 flex flex-col cursor-pointer hover:bg-[#fcfaf5] transition-colors",
                            style: { transform: "rotateY(180deg) translateZ(0.5px)" },
                            onClick: (e) => {
                              e.stopPropagation();
                              prevPage();
                            },
                            children: [
                              /* @__PURE__ */ jsx("div", { className: "absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/5 to-transparent pointer-events-none mix-blend-multiply" }),
                              /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-hidden", children: [
                                /* @__PURE__ */ jsx("div", { className: "text-xs text-neutral-400 text-left mb-4 font-sans tracking-wider", children: page.pageNumber * 2 }),
                                /* @__PURE__ */ jsx("div", { className: "prose prose-neutral prose-sm max-w-none font-serif text-neutral-700 leading-relaxed select-none h-full flex flex-col", children: page.backContent ? /* @__PURE__ */ jsx("div", { className: "flex-1", children: page.backContent }) : /* @__PURE__ */ jsx("div", { className: "w-full h-full flex items-center justify-center opacity-[0.03]", children: /* @__PURE__ */ jsx("span", { className: "font-serif text-8xl italic font-bold text-black", children: page.pageNumber * 2 }) }) })
                              ] })
                            ]
                          }
                        )
                      ]
                    },
                    index
                  );
                }),
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "absolute inset-0 w-full h-full bg-[#fdfbf7] rounded-r-md rounded-l-sm shadow-xl border border-neutral-200",
                    style: { transform: "translateZ(-1px)", zIndex: -1 },
                    children: /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 p-8 flex flex-col items-center justify-center text-center opacity-40", children: [
                      /* @__PURE__ */ jsx("p", { className: "font-serif text-neutral-500 italic", children: "The End" }),
                      /* @__PURE__ */ jsxs(
                        "button",
                        {
                          onClick: restartBook,
                          className: "mt-4 flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors text-sm text-neutral-600 cursor-pointer",
                          children: [
                            /* @__PURE__ */ jsx(RefreshCcw, { size: 14 }),
                            " Read Again"
                          ]
                        }
                      )
                    ] })
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
          motion.button,
          {
            initial: { opacity: 0, scale: 0.8 },
            animate: { opacity: 1, scale: 1 },
            exit: { opacity: 0, scale: 0.8 },
            onClick: handleCloseBook,
            className: "absolute top-8 right-8 p-2 rounded-full bg-white/50 dark:bg-neutral-800/50 hover:bg-white dark:hover:bg-neutral-800 border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700 backdrop-blur-sm text-neutral-800 dark:text-neutral-100 z-[1000] transition-all hover:scale-110 shadow-sm hover:shadow-xl",
            children: /* @__PURE__ */ jsx(X, { size: 24 })
          }
        ) }) }),
        !isOpen && /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 1, duration: 1 },
            className: "absolute bottom-4 text-neutral-500 dark:text-neutral-400 text-sm font-medium tracking-widest uppercase cursor-pointer z-50 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors",
            onClick: handleOpenBook,
            children: "Click to Open"
          }
        )
      ]
    }
  );
}

// entry.jsx
import React2 from "react";

// registry:components/docs/interactive-book.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function InteractiveBookDemo() {
  const pages = [
    {
      title: "Chapter 1: The Beginning",
      content: /* @__PURE__ */ jsxs2("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsx2("p", { children: '"The most important characteristics of good design are discoverability and understanding. Discoverability: Is it possible to even figure out what actions are possible?"' }),
        /* @__PURE__ */ jsx2("p", { children: '"Understanding: What does it all mean? How is the product supposed to be used? What do all the different controls and settings mean?"' })
      ] }),
      pageNumber: 1
    },
    {
      title: "Chapter 2: The Psychology",
      content: /* @__PURE__ */ jsxs2("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsx2("p", { children: '"When people try to use something, they first form a goal, then they plan an action, then they execute the action. Then they perceive what happened, interpret the result, and compare it with the goal."' }),
        /* @__PURE__ */ jsx2("p", { children: '"This is the seven stages of action. It forms the core of human-computer interaction psychology."' })
      ] }),
      pageNumber: 2
    },
    {
      title: "Chapter 3: Knowledge",
      content: /* @__PURE__ */ jsxs2("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsx2("p", { children: '"Knowledge is in the head and in the world. Precise behavior can emerge from imprecise knowledge for four reasons:"' }),
        /* @__PURE__ */ jsxs2("ul", { className: "list-disc pl-5 space-y-1", children: [
          /* @__PURE__ */ jsx2("li", { children: "Information is in the world" }),
          /* @__PURE__ */ jsx2("li", { children: "Great precision is not required" }),
          /* @__PURE__ */ jsx2("li", { children: "Natural constraints are present" }),
          /* @__PURE__ */ jsx2("li", { children: "Cultural constraints are present" })
        ] })
      ] }),
      pageNumber: 3
    },
    {
      title: "Chapter 4: Constraints",
      content: /* @__PURE__ */ jsxs2("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsx2("p", { children: '"Constraint: specific limits on possible actions. Constraints guide our behavior by limiting the possible options."' }),
        /* @__PURE__ */ jsx2("p", { children: '"Physical constraints rely on the properties of the physical world for their operation. Semantic constraints rely on the meaning of the situation."' })
      ] }),
      pageNumber: 4
    },
    {
      title: "Chapter 5: Error and Mistake",
      content: /* @__PURE__ */ jsxs2("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsx2("p", { children: `"Human error is defined as any deviance from 'appropriate' behavior. Errors are divided into two categories: slips and mistakes."` }),
        /* @__PURE__ */ jsx2("p", { children: '"A slip occurs when a person intends to do one action and ends up doing something else. A mistake occurs when the wrong goal is established."' })
      ] }),
      pageNumber: 5
    },
    {
      title: "Conclusion",
      content: /* @__PURE__ */ jsxs2("div", { className: "space-y-4 flex flex-col justify-center h-full text-center italic", children: [
        /* @__PURE__ */ jsx2("p", { children: '"Good design is actually a lot harder to notice than poor design, in part because good designs fit our needs so well that the design is invisible."' }),
        /* @__PURE__ */ jsx2("p", { className: "font-bold mt-4", children: "- Don Norman" })
      ] }),
      pageNumber: 6
    }
  ];
  return /* @__PURE__ */ jsx2("div", { className: "relative w-full h-[600px] flex items-center justify-center bg-gray-100 dark:bg-neutral-900 border rounded-lg", children: /* @__PURE__ */ jsx2(
    InteractiveBook,
    {
      coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1974&auto=format&fit=crop",
      bookTitle: "The Design of Everyday Things",
      bookAuthor: "Don Norman",
      pages
    }
  ) });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(InteractiveBookDemo, {}) }) });
}
export {
  Component as default
};
